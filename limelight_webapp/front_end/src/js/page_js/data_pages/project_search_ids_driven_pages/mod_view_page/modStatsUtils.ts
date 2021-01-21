import jStat from 'jstat'
import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';
import {ModViewDataVizRenderer_MultiSearch} from "./modViewMainDataVizRender_MultiSearch";
import {ModViewDataManager} from "./modViewDataManager";
import {ModalOverlay} from 'page_js/data_pages/display_utilities/modalOverlay.js';
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";

export class ModStatsUtils {

    static async downloadSummaryStatistics(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            searchDetailsBlockDataMgmtProcessing,
            modViewDataManager
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            modViewDataManager : ModViewDataManager
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        let output = "# Search Id Key:\n"

        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing })
            output += "#\t" + searchId + "\t" + ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing }) + "\n";
        }
        output += "#\n";

        output += "# Data transformation: " + ModViewDataVizRenderer_MultiSearch.getDataTransformationTypeString(vizOptionsData) + "\n";

        output += "\n";

        output += "mod mass";
        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing })
            output += "\tSearch:" + searchId + " " + quantTypeString + " " + (vizOptionsData.data.psmQuant === 'counts' ? "count" : "ratio");
        }

        output += "\n";

        const modMap:Map<number,Map<number,any>> = await ModViewDataVizRenderer_MultiSearch.buildModMap({
            projectSearchIds,
            vizOptionsData,
            countsOverride: false,
            modViewDataManager,
        });

        for (const modMass of sortedModMasses) {

            output += modMass;

            for(const projectSearchId of projectSearchIds) {

                let x1 = modMap.get(modMass).get(projectSearchId); // modMap[modMass][projectSearchId1];
                if (x1 === undefined) {
                    x1 = 0;
                }

                output += "\t" + x1;
            }

            output += "\n";
        }

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : output, filename: 'mod_summary_stats_report.txt' } );
    }


    static async viewSignificantMods(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            searchDetailsBlockDataMgmtProcessing,
            modViewDataManager
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            modViewDataManager:ModViewDataManager
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        const resultsArray = new Array<any>();

        let output = "<div><table><tr>";
        output += "<th style='text-align: left;'>search1</th>";
        output += "<th style='text-align: left;'>search2</th>";
        output += "<th style='text-align: left;'>mod mass</th>";
        output += "<th style='text-align: left;'>" + quantTypeString + "count 1</th>";
        output += "<th style='text-align: left;'>" + quantTypeString + "count 2</th>";
        output += "<th style='text-align: left;'>z-score</th>";
        output += "<th style='text-align: left;'>p-value</th>";
        output += "<th style='text-align: left;'>filtered z-score</th>";
        output += "<th style='text-align: left;'>filtered p-value</th>";
        output += "<th style='text-align: left;'>rank</th>";
        output += "</tr>";


        const modMap:Map<number,Map<number,any>> = await ModViewDataVizRenderer_MultiSearch.buildModMap({
            projectSearchIds,
            vizOptionsData,
            countsOverride: true,
            modViewDataManager
        });

        const filteredCountMap:Map<number,number> = await ModViewDataVizRenderer_MultiSearch.getFilteredTotalCountForEachSearch({
            projectSearchIds,
            vizOptionsData,
            modViewDataManager
        })

        let selectedData = undefined;
        if( vizOptionsData.data.selectedStateObject !== undefined && vizOptionsData.data.selectedStateObject.data !== undefined && Object.keys(vizOptionsData.data.selectedStateObject.data).length > 0) {
            selectedData = vizOptionsData.data.selectedStateObject.data
        }

        for( let i = 0; i < projectSearchIds.length; i++ ) {

            const projectSearchId1 = projectSearchIds[ i ];

            // skip this search if we have selected data and none of it includes this project search id
            if( selectedData !== undefined && !(projectSearchId1 in selectedData)) {
                continue;
            }

            const n1:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId1) : await modViewDataManager.getTotalScanCount(projectSearchId1);
            const filteredn1:number = filteredCountMap.get(projectSearchId1);

            for( let k = 0; k < projectSearchIds.length; k++ ) {

                if( i < k ) {

                    const projectSearchId2 = projectSearchIds[ k ];

                    // skip this search if we have selected data and none of it includes this project search id
                    if(selectedData !== undefined && !(projectSearchId2 in selectedData)) {
                        continue;
                    }

                    const n2:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId2) : await modViewDataManager.getTotalScanCount(projectSearchId2);
                    const filteredn2:number = filteredCountMap.get(projectSearchId2);

                    for (const modMass of sortedModMasses) {

                        // if we have selected data and it doesn't include this combination of mod mass for both project search ids, skip it
                        if (selectedData !== undefined && (!selectedData[projectSearchId1].includes(modMass) || !selectedData[projectSearchId2].includes(modMass))) {
                            continue;
                        }

                        let x1:number = modMap.get(modMass).get(projectSearchId1); // modMap[modMass][projectSearchId1];
                        if (x1 === undefined) {
                            x1 = 0;
                        }

                        let x2:number = modMap.get(modMass).get(projectSearchId2); // modMap[modMass][projectSearchId2];
                        if (x2 === undefined) {
                            x2 = 0;
                        }

                        let zscore = ModStatsUtils.getZScoreForTwoRatios({x1, n1, x2, n2});

                        let pvalue = ModStatsUtils.getPValueForTwoRatios({x1, n1, x2, n2});
                        pvalue = pvalue * sortedModMasses.length;
                        if (pvalue > 1) {
                            pvalue = 1;
                        }

                        let filteredZscore = ModStatsUtils.getZScoreForTwoRatios({x1, n1:filteredn1, x2, n2:filteredn2});

                        let filteredPvalue = ModStatsUtils.getPValueForTwoRatios({x1, n1:filteredn1, x2, n2:filteredn2});
                        filteredPvalue = filteredPvalue * sortedModMasses.length;
                        if (filteredPvalue > 1) {
                            filteredPvalue = 1;
                        }

                        console.log('modMass', 'search1', 'n1', 'filteredn1', 'search2', 'n2', 'filteredn2', 'x1', 'x2', 'zscore', 'filteredZscore');
                        console.log(modMass, projectSearchId1, n1, filteredn1, projectSearchId2, n2, filteredn2, x1, x2, zscore, filteredZscore);

                        const ob = {
                            name1:ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                                projectSearchId: projectSearchId1,
                                searchDetailsBlockDataMgmtProcessing
                            }),
                            name2:ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                                projectSearchId: projectSearchId2,
                                searchDetailsBlockDataMgmtProcessing
                            }),
                            search1:ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                                projectSearchId: projectSearchId1,
                                searchDetailsBlockDataMgmtProcessing
                            }),
                            search2:ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                                projectSearchId: projectSearchId2,
                                searchDetailsBlockDataMgmtProcessing
                            }),
                            modMass:modMass,
                            count1:x1,
                            count2:x2,
                            zscore:zscore,
                            pvalue:pvalue,
                            filteredZscore:filteredZscore,
                            filteredPvalue:filteredPvalue
                        };

                        resultsArray.push(ob);

                    }
                }
            }
        }

        // sort on the magnitude of the zscore (asc) first, then p-value (desc) second
        resultsArray.sort(function(a,b) {

            if(Math.abs(a.zscore) > Math.abs(b.zscore)) {
                return -1;
            }

            if(Math.abs(a.zscore) < Math.abs(b.zscore)) {
                return 1;
            }

            return a.pvalue - b.pvalue;
        });

        // assemble the table rows
        let rank = 1;
        for(const ob of resultsArray) {
            output += "<tr>";
            output += "<td>" + ob.search1 + "</td>";
            output += "<td>" + ob.search2 + "</td>";
            output += "<td>" + ob.modMass + "</td>";
            output += "<td>" + ob.count1 + "</td>";
            output += "<td>" + ob.count2 + "</td>";
            output += "<td>" + ob.zscore + "</td>";
            output += "<td>" + ob.pvalue + "</td>";
            output += "<td>" + ob.filteredZscore + "</td>";
            output += "<td>" + ob.filteredPvalue + "</td>";
            output += "<td>" + rank + "</td>";
            output += "</tr>";

            rank++;
        }

        // close table and div
        output += "</table></div>";

        // create and show the overlay
        const overlay = new ModalOverlay(
            {
                $containerDiv: $('body'),
                $contentDiv: $(output),
                width:750,
                height:500,
                title:'Significant Mods Table',
                hideBackgroundClick:true,
                callbackOnClickedHide:null
            }
        );

        overlay.show();

    }


    static async downloadSignificantMods(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            searchDetailsBlockDataMgmtProcessing,
            modViewDataManager
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            modViewDataManager:ModViewDataManager
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        let output = "search1\tsearch2\tmod mass\t" + quantTypeString + " count 1\t" + quantTypeString + " count 2\tz-score\tp-value\n";

        const modMap:Map<number,Map<number,any>> = await ModViewDataVizRenderer_MultiSearch.buildModMap({
            projectSearchIds,
            vizOptionsData,
            countsOverride: true,
            modViewDataManager
        });

        console.log('modMap', modMap);
        console.log('sortedModMasses', sortedModMasses);

        let selectedData = undefined;
        if( vizOptionsData.data.selectedStateObject !== undefined && vizOptionsData.data.selectedStateObject.data !== undefined && Object.keys(vizOptionsData.data.selectedStateObject.data).length > 0) {
            selectedData = vizOptionsData.data.selectedStateObject.data
        }

        for( let i = 0; i < projectSearchIds.length; i++ ) {

            const projectSearchId1 = projectSearchIds[ i ];

            // skip this search if we have selected data and none of it includes this project search id
            if( selectedData !== undefined && !(projectSearchId1 in selectedData)) {
                continue;
            }

            const n1:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId1) : await modViewDataManager.getTotalScanCount(projectSearchId1);

            for( let k = 0; k < projectSearchIds.length; k++ ) {

                if( i < k ) {

                    const projectSearchId2 = projectSearchIds[ k ];

                    // skip this search if we have selected data and none of it includes this project search id
                    if(selectedData !== undefined && !(projectSearchId2 in selectedData)) {
                        continue;
                    }

                    const n2:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId2) : await modViewDataManager.getTotalScanCount(projectSearchId2);

                    for (const modMass of sortedModMasses) {

                        // if we have selected data and it doesn't include this combination of mod mass for both project search ids, skip it
                        if (selectedData !== undefined && (!selectedData[projectSearchId1].includes(modMass) || !selectedData[projectSearchId2].includes(modMass))) {
                            continue;
                        }


                        let x1:number = modMap.get(modMass).get(projectSearchId1); // modMap[modMass][projectSearchId1];
                        if (x1 === undefined) {
                            x1 = 0;
                        }

                        let x2:number = modMap.get(modMass).get(projectSearchId2); // modMap[modMass][projectSearchId2];
                        if (x2 === undefined) {
                            x2 = 0;
                        }

                        let zscore = ModStatsUtils.getZScoreForTwoRatios({x1, n1, x2, n2});

                        let pvalue = ModStatsUtils.getPValueForTwoRatios({x1, n1, x2, n2});
                        pvalue = pvalue * sortedModMasses.length;
                        if (pvalue > 1) {
                            pvalue = 1;
                        }

                        output += ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                            projectSearchId: projectSearchId1,
                            searchDetailsBlockDataMgmtProcessing
                        }) + "\t";
                        output += ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                            projectSearchId: projectSearchId2,
                            searchDetailsBlockDataMgmtProcessing
                        }) + "\t";
                        output += modMass + "\t";
                        output += x1 + "\t";
                        output += x2 + "\t";
                        output += zscore + "\t";
                        output += pvalue + "\n";

                    }
                }
            }
        }

        StringDownloadUtils.downloadStringAsFile( { stringToDownload : output, filename: 'mod_pvalue_report.txt' } );
    }

    static getPValueForTwoRatios({ x1, n1, x2, n2 }) {
        return jStat.ztest( ModStatsUtils.getZScoreForTwoRatios({ x1, n1, x2, n2 }), 2);
    }

    static getZScoreForTwoRatios({ x1, n1, x2, n2 }) {

        //console.log('getZScoreForTwoRatios', x1, n1, x2, n2);

        x1 = parseInt(x1);
        n1 = parseInt(n1);
        x2 = parseInt(x2);
        n2 = parseInt(n2);


        const p = (x1 + x2) / (n1 + n2);
        const numerator = (x1 / n1) - (x2 / n2);
        const denominator = Math.sqrt( p * (1 - p) * (1 / n1 + 1 / n2) );

        return numerator / denominator;
    }

}
