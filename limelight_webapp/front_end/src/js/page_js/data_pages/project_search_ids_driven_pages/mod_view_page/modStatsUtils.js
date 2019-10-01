import jStat from 'jstat'
import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';
import {ModViewDataVizRenderer_MultiSearch} from "./modViewMainDataVizRender_MultiSearch";

export class ModStatsUtils {

    static downloadSignificantMods({
                                       reportedPeptideModData,
                                       aminoAcidModStats,
                                       vizOptionsData,
                                       sortedModMasses,
                                       totalPSMCount,
                                       projectSearchIds,
                                       searchDetailsBlockDataMgmtProcessing
    }) {

        console.log(searchDetailsBlockDataMgmtProcessing);

        let output = "search1\tsearch2\tmod mass\tpsm count 1\tpsm count 2\tz-score\tp-value\n";

        const modMap = ModViewDataVizRenderer_MultiSearch.buildModMap({
            reportedPeptideModData,
            aminoAcidModStats,
            projectSearchIds,
            totalPSMCount,
            vizOptionsData,
            countsOverride: true
        });

        for( const projectSearchId1 of projectSearchIds ) {

            let n1 = totalPSMCount[projectSearchId1].psmCount;

            for( const projectSearchId2 of projectSearchIds ) {

                let n2 = totalPSMCount[projectSearchId2].psmCount;

                if( projectSearchId1 < projectSearchId2 ) {

                    for (const modMass of sortedModMasses) {

                        let x1 = modMap[modMass][projectSearchId1];
                        if (x1 === undefined) {
                            x1 = 0;
                        }

                        let x2 = modMap[modMass][projectSearchId2];
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
