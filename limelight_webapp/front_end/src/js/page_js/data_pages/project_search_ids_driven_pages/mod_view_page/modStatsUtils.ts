import jStat from 'jstat'
import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';
import {ModViewDataVizRenderer_MultiSearch} from "./modViewMainDataVizRender_MultiSearch";

export class ModStatsUtils {

    static downloadSummaryStatistics({
                                         reportedPeptideModData,
                                         aminoAcidModStats,
                                         vizOptionsData,
                                         sortedModMasses,
                                         totalPSMCount,
                                         totalScanCount,
                                         projectSearchIds,
                                         searchDetailsBlockDataMgmtProcessing,
                                         psmModData,
                                         scanModData
                                     }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        let output = "# Currently NOT filtered on Protein and Position selection\n";
        output += "# Search Id Key:\n"

        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing })
            output += "#\t" + searchId + "\t" + ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing }) + "\n";
        }
        output += "\n";

        output += "mod mass";
        for(const projectSearchId of projectSearchIds) {
            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing })
            output += "\tSearch:" + searchId + " " + quantTypeString + " " + (vizOptionsData.data.psmQuant === 'counts' ? "count" : "ratio");
        }

        output += "\n";

        const modMap = ModViewDataVizRenderer_MultiSearch.buildModMap({
            reportedPeptideModData,
            aminoAcidModStats,
            projectSearchIds,
            totalPSMCount,
            totalScanCount,
            vizOptionsData,
            countsOverride: false,
            proteinPositionFilterStateManager : undefined,
            psmModData,
            scanModData
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


    static downloadSignificantMods({
                                       reportedPeptideModData,
                                       aminoAcidModStats,
                                       vizOptionsData,
                                       sortedModMasses,
                                       totalPSMCount,
                                       totalScanCount,
                                       projectSearchIds,
                                       searchDetailsBlockDataMgmtProcessing,
                                       psmModData,
                                       scanModData
    }) {

        const psmQuantType = vizOptionsData.data.quantType === undefined || vizOptionsData.data.quantType === 'psms';
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        let output = "Currently NOT filtered on Protein and Position selection\n";
        output += "search1\tsearch2\tmod mass\t" + quantTypeString + " count 1\t" + quantTypeString + " count 2\tz-score\tp-value\n";

        const modMap = ModViewDataVizRenderer_MultiSearch.buildModMap({
            reportedPeptideModData,
            aminoAcidModStats,
            projectSearchIds,
            totalPSMCount,
            totalScanCount,
            vizOptionsData,
            countsOverride: true,
            proteinPositionFilterStateManager : undefined,
            psmModData,
            scanModData
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

            let n1 = psmQuantType ? totalPSMCount[projectSearchId1].psmCount : totalScanCount[projectSearchId1].scanCount;

            for( let k = 0; k < projectSearchIds.length; k++ ) {

                if( i < k ) {

                    const projectSearchId2 = projectSearchIds[ k ];

                    // skip this search if we have selected data and none of it includes this project search id
                    if(selectedData !== undefined && !(projectSearchId2 in selectedData)) {
                        continue;
                    }

                    let n2 = psmQuantType ? totalPSMCount[projectSearchId2].psmCount : totalScanCount[projectSearchId2].scanCount;

                    for (const modMass of sortedModMasses) {

                        // if we have selected data and it doesn't include this combination of mod mass for both project search ids, skip it
                        if (selectedData !== undefined && (!selectedData[projectSearchId1].includes(modMass) || !selectedData[projectSearchId2].includes(modMass))) {
                            continue;
                        }


                        let x1 = modMap.get(modMass).get(projectSearchId1); // modMap[modMass][projectSearchId1];
                        if (x1 === undefined) {
                            x1 = 0;
                        }

                        let x2 = modMap.get(modMass).get(projectSearchId2); // modMap[modMass][projectSearchId2];
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
