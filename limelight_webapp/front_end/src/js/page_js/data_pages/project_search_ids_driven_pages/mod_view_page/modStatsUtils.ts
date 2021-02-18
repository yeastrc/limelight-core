import jStat from 'jstat'
import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';
import {ModViewDataVizRenderer_MultiSearch} from "./modViewMainDataVizRender_MultiSearch";
import {ModViewDataManager} from "./modViewDataManager";
import {ModalOverlay} from 'page_js/data_pages/display_utilities/modalOverlay';
import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

export class ModStatsUtils {

    static async downloadSummaryStatistics(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            modViewDataManager : ModViewDataManager,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        let output = "# Search Id Key:\n"

        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server })
            output += "#\t" + searchId + "\t" + ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server }) + "\n";
        }
        output += "#\n";

        output += "# Data transformation: " + ModViewDataVizRenderer_MultiSearch.getDataTransformationTypeString(vizOptionsData) + "\n";

        output += "\n";

        output += "mod mass";
        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, dataPageStateManager_DataFrom_Server })
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


    /**
     * Assume first n/2 searches are 1 rep and the second n/2 searches are the second rep
     *
     * @param vizOptionsData
     * @param sortedModMasses
     * @param projectSearchIds
     * @param searchDetailsBlockDataMgmtProcessing
     * @param modViewDataManager
     */
    static async viewSignificantMods_CombineReps(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            modViewDataManager:ModViewDataManager,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
        }) {

        // do nothing if it's not an even number of searches
        if( projectSearchIds.length % 2 != 0 ) {
            console.log("Didn't get an even # of searches, doing nothing.");
            return;
        }

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        const resultsArray = new Array<any>();

        let output = "<div><table><tr>";
        output += "<th style='text-align: left;'>rep1 (searches)</th>";
        output += "<th style='text-align: left;'>rep2 (searches)</th>";
        output += "<th style='text-align: left;'>mod mass</th>";
        output += "<th style='text-align: left;'>" + quantTypeString + "count 1</th>";
        output += "<th style='text-align: left;'>" + quantTypeString + "count 2</th>";
        output += "<th style='text-align: left;'>z-score</th>";
        output += "<th style='text-align: left;'>p-value</th>";
        output += "<th style='text-align: left;'>filtered z-score</th>";
        output += "<th style='text-align: left;'>filtered p-value</th>";
        output += "<th style='text-align: left;'>rank</th>";
        output += "</tr>";


        const modMap_PreCombine:Map<number,Map<number,any>> = await ModViewDataVizRenderer_MultiSearch.buildModMap({
            projectSearchIds,
            vizOptionsData,
            countsOverride: true,
            modViewDataManager
        });

        const filteredCountMap:Map<number,number> = await ModViewDataVizRenderer_MultiSearch.getFilteredTotalCountForEachSearch({
            projectSearchIds,
            vizOptionsData,
            modViewDataManager
        });

        const group0 = projectSearchIds.slice(0, projectSearchIds.length / 2);
        const group1 = projectSearchIds.slice(projectSearchIds.length / 2, projectSearchIds.length);

        // combine psm counts for reps into single row in new mod map
        const combinedModMap:Map<number, Map<number, number>> = new Map();
        for(const [modMass, projectMap] of modMap_PreCombine) {
            combinedModMap.set(modMass, new Map());
            combinedModMap.get(modMass).set(0, 0);
            combinedModMap.get(modMass).set(1, 0);

            for(const projectSearchId of group0) {
                let count = projectMap.has(projectSearchId) ? projectMap.get(projectSearchId) : 0;
                combinedModMap.get(modMass).set(0, combinedModMap.get(modMass).get(0) + count );
            }

            for(const projectSearchId of group1) {
                let count = projectMap.has(projectSearchId) ? projectMap.get(projectSearchId) : 0;
                combinedModMap.get(modMass).set(1, combinedModMap.get(modMass).get(1) + count );
            }
        }

        // get combined total psm count for each rep group
        let psmCount0 = 0;
        let psmCount1 = 0;
        for(const projectSearchId of group0) {
            const n:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId) : await modViewDataManager.getTotalScanCount(projectSearchId);
            psmCount0 += n;
        }
        for(const projectSearchId of group1) {
            const n:number = psmQuantType ? await modViewDataManager.getTotalPSMCount(projectSearchId) : await modViewDataManager.getTotalScanCount(projectSearchId);
            psmCount1 += n;
        }

        // get combined filtered psm count for each rep group
        let filteredPsmCount0 = 0;
        let filteredPsmCount1 = 0;
        for(const projectSearchId of group0) {
            const n:number = filteredCountMap.get(projectSearchId);
            filteredPsmCount0 += n;
        }
        for(const projectSearchId of group1) {
            const n:number = filteredCountMap.get(projectSearchId);
            filteredPsmCount1 += n;
        }

        let selectedData = undefined;
        if( vizOptionsData.data.selectedStateObject !== undefined && vizOptionsData.data.selectedStateObject.data !== undefined && Object.keys(vizOptionsData.data.selectedStateObject.data).length > 0) {
            selectedData = vizOptionsData.data.selectedStateObject.data
        }

        for (const modMass of sortedModMasses) {

            let x1:number = combinedModMap.get(modMass).get(0); // modMap[modMass][projectSearchId1];
            if (x1 === undefined) {
                x1 = 0;
            }

            let x2:number = combinedModMap.get(modMass).get(1); // modMap[modMass][projectSearchId2];
            if (x2 === undefined) {
                x2 = 0;
            }

            let zscore = ModStatsUtils.getZScoreForTwoRatios({x1, n1:psmCount0, x2, n2:psmCount1});

            let pvalue = ModStatsUtils.getPValueForTwoRatios({x1, n1:psmCount0, x2, n2:psmCount1});
            pvalue = pvalue * sortedModMasses.length;
            if (pvalue > 1) {
                pvalue = 1;
            }

            let filteredZscore = ModStatsUtils.getZScoreForTwoRatios({x1, n1:filteredPsmCount0, x2, n2:filteredPsmCount1});

            let filteredPvalue = ModStatsUtils.getPValueForTwoRatios({x1, n1:filteredPsmCount0, x2, n2:filteredPsmCount1});
            filteredPvalue = filteredPvalue * sortedModMasses.length;
            if (filteredPvalue > 1) {
                filteredPvalue = 1;
            }

            console.log('modMass', 'rep_group', 'n1', 'filteredn1', 'search2', 'n2', 'filteredn2', 'x1', 'x2', 'zscore', 'filteredZscore');
            console.log(modMass, 0, psmCount0, filteredPsmCount0, 1, psmCount1, filteredPsmCount1, x1, x2, zscore, filteredZscore);

            const ob = {
                group0:group0.map( function(x) {
                    return ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                        projectSearchId: x,
                        dataPageStateManager_DataFrom_Server
                    })
                }).sort().join(','),
                group1:group1.map( function(x) {
                    return ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                        projectSearchId: x,
                        dataPageStateManager_DataFrom_Server
                    })
                }).sort().join(','),
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
            output += "<td>" + ob.group0 + "</td>";
            output += "<td>" + ob.group1 + "</td>";
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


    static async viewSignificantMods(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            modViewDataManager:ModViewDataManager,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
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
                                dataPageStateManager_DataFrom_Server
                            }),
                            name2:ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                                projectSearchId: projectSearchId2,
                                dataPageStateManager_DataFrom_Server
                            }),
                            search1:ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                                projectSearchId: projectSearchId1,
                                dataPageStateManager_DataFrom_Server
                            }),
                            search2:ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({
                                projectSearchId: projectSearchId2,
                                dataPageStateManager_DataFrom_Server
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
            modViewDataManager,
            dataPageStateManager_DataFrom_Server
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses,
            projectSearchIds: Array<number>,
            modViewDataManager:ModViewDataManager,
            dataPageStateManager_DataFrom_Server:DataPageStateManager
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
                            dataPageStateManager_DataFrom_Server
                        }) + "\t";
                        output += ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({
                            projectSearchId: projectSearchId2,
                            dataPageStateManager_DataFrom_Server
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
