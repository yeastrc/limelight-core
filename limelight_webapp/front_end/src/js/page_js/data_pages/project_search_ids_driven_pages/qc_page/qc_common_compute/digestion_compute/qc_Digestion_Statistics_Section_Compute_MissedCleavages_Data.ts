/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Data
 *
 */

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result";
import {Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data";


/**
 *
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 * @param qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
 * @param compute_MissedCleavages_Initial_Data_Result_Root
 */
export const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data = function (
    {
        compute_MissedCleavages_Initial_Data_Result_Root,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        compute_MissedCleavages_Initial_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
)  : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result {

    const projectSearchIds = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

    //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

    const peptideDistinct_Array =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

    const distinctPeptide_Count_Map_Key_ProjectSearchId : Map<number,number> = new Map();

    for ( const projectSearchId of projectSearchIds ) {
        distinctPeptide_Count_Map_Key_ProjectSearchId.set(projectSearchId, 0);
    }

    const distinctPeptide_Contains_MissedCleavage_Count_Map_Key_ProjectSearchId : Map<number,number> = new Map();

    const psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, number>> = new Map();
    const psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, number>> = new Map();

    const psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Set<number>>> = new Map();
    const psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Set<number>>> = new Map();

    const missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, Map<number, number>>> = new Map();
    const missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId : Map<number, Map<number, number>> = new Map();

    for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

        for (const projectSearchId of projectSearchIds) {

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
            if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                continue; // EARLY CONTINUE
            }

            const computeDataForCharts_Result_ForSingle_ProjectSearchId = compute_MissedCleavages_Initial_Data_Result_Root.get_Result_ForSingle_ProjectSearchId(projectSearchId);
            if (!computeDataForCharts_Result_ForSingle_ProjectSearchId) {
                //  TODO  throw Error
                continue; // EARLY CONTINUE
            }
            const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
            if (!loadedDataPerProjectSearchIdHolder) {
                //  TODO  throw Error
                continue; // EARLY CONTINUE
            }

            {
                let distinctPeptide_Count = distinctPeptide_Count_Map_Key_ProjectSearchId.get(projectSearchId);
                distinctPeptide_Count_Map_Key_ProjectSearchId.set( projectSearchId, distinctPeptide_Count + 1 );
            }

            const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();


            let psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            let psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            let psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            let psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);

            if ( ! psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId ) {
                psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId );
            }
            if ( ! psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId );
            }
            if ( ! psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId );
            }
            if ( ! psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId ) {
                psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId );
            }


            let missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId ) {
                missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = new Map();
                missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId );
            }
            let missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId );
            }

            let foundMissedCleavage_For_DistinctPeptide_For_SingleSearch = false;

            for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId;

                const computeDataForCharts_Result__ForSingle_ReportedPeptide = computeDataForCharts_Result_ForSingle_ProjectSearchId.get_Result_ForSingle_ReportedPeptide(reportedPeptideId);
                if ( !computeDataForCharts_Result__ForSingle_ReportedPeptide ) {
                    //  TODO  throw Error
                    continue; // EARLY CONTINUE
                }

                if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {

                    foundMissedCleavage_For_DistinctPeptide_For_SingleSearch = true;

                } else {
                    var zunused = 0;
                }

                if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.anyData_PerSingle_Psm() ) {
                    const msg = "Not Currently processing data per PSM from computeDataForCharts_Result__ForSingle_ReportedPeptide. returned true ( computeDataForCharts_Result__ForSingle_ReportedPeptide.anyData_PerSingle_Psm() ). projectSearchId: " + projectSearchId
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                    const numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                    if ( numPsms === undefined || numPsms === null ) {
                        const msg = "numPsmsForReportedPeptideIdMap.get( reportedPeptideId ); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                    if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {

                        psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                        missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms * computeDataForCharts_Result__ForSingle_ReportedPeptide.get_missedCleavageCount() );

                    } else {
                        var zunused = 0;
                    }

                } else {
                    if ( ! dataPerReportedPeptideId.psmIdsSet ) {
                        const msg = "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) and ( ! dataPerReportedPeptideId.psmIdsSet ). projectSearchId: " + projectSearchId
                        console.warn(msg);
                        throw Error(msg);
                    }
                    {
                        let psmIds__For_psmIds_AllPSMs_YesPSMFiltering = psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId.get(reportedPeptideId);
                        if ( ! psmIds__For_psmIds_AllPSMs_YesPSMFiltering ) {
                            psmIds__For_psmIds_AllPSMs_YesPSMFiltering = new Set();
                            psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIds__For_psmIds_AllPSMs_YesPSMFiltering);
                        }

                        let missedCleavage_Count_PerPsmId_Map_Key_PsmId = missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId.get( reportedPeptideId );
                        if ( ! missedCleavage_Count_PerPsmId_Map_Key_PsmId ) {
                            missedCleavage_Count_PerPsmId_Map_Key_PsmId = new Map();
                            missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId.set( reportedPeptideId, missedCleavage_Count_PerPsmId_Map_Key_PsmId );
                        }

                        for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {

                            psmIds__For_psmIds_AllPSMs_YesPSMFiltering.add( psmId );  //  For Total PSM Count

                            const computeDataForCharts_Result__ForSingle_Psm = computeDataForCharts_Result__ForSingle_ReportedPeptide.get_Result_ForSingle_Psm( psmId );
                            if ( computeDataForCharts_Result__ForSingle_Psm ) {

                                missedCleavage_Count_PerPsmId_Map_Key_PsmId.set( psmId, computeDataForCharts_Result__ForSingle_Psm.get_missedCleavageCount() );

                            } else {
                                missedCleavage_Count_PerPsmId_Map_Key_PsmId.set( psmId, computeDataForCharts_Result__ForSingle_ReportedPeptide.get_missedCleavageCount() );
                            }
                        }
                    }

                    if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {
                        let psmIds = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.get(reportedPeptideId);
                        if ( ! psmIds ) {
                            psmIds = new Set();
                            psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIds);
                        }
                        for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                            psmIds.add( psmId );
                        }
                    }
                }
            }
            if ( foundMissedCleavage_For_DistinctPeptide_For_SingleSearch ) {

                const distinctPeptide_Contains_MissedCleavage_Count = distinctPeptide_Contains_MissedCleavage_Count_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( distinctPeptide_Contains_MissedCleavage_Count ) {
                    //  Have existing value so increment it
                    distinctPeptide_Contains_MissedCleavage_Count_Map_Key_ProjectSearchId.set( projectSearchId, distinctPeptide_Contains_MissedCleavage_Count + 1 );
                } else {
                    //  No existing value so set to 1
                    distinctPeptide_Contains_MissedCleavage_Count_Map_Key_ProjectSearchId.set(projectSearchId, 1);
                }
            }
        }
    }

    const result = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result();

    for (const projectSearchId of projectSearchIds) {

        const psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
        const psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
        const psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
        const psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);

        if ( ( ! psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId )
        ) {
            //  NO Data for projectSearchId so skip
            continue;  //  EARLY CONTINUE
        }

        let total_PSM_Count = 0;
        let psm_Count_Containing_MissedCleavage = 0;

        let distinctPeptide_Contains_MissedCleavage_Count = distinctPeptide_Contains_MissedCleavage_Count_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! distinctPeptide_Contains_MissedCleavage_Count ) {
            //  Not found so set to zero
            distinctPeptide_Contains_MissedCleavage_Count = 0;
        }

        for ( const mapEntry of psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId.entries() ) {
            const reportedPeptideId = mapEntry[0];
            const psmCount = mapEntry[1];

            //  Delete Matching entry in psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId
            psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId.delete(reportedPeptideId);

            total_PSM_Count += psmCount;
        }

        for ( const mapEntry of psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId.entries() ) {
            const reportedPeptideId = mapEntry[0];
            const psmCount = mapEntry[1];

            //  Delete Matching entry in psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId
            psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.delete(reportedPeptideId);

            psm_Count_Containing_MissedCleavage += psmCount;
        }

        for ( const psmIds of psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId.values() ) {
            total_PSM_Count += psmIds.size;
        }

        for ( const psmIds of psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.values() ) {
            psm_Count_Containing_MissedCleavage += psmIds.size;
        }

        let missedCleavage_TotalCount_AcrossAllPSMs = 0;
        {
            const missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);
            const missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_ProjectSearchId.get(projectSearchId);

            if ( missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                for (const mapEntry of missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId.entries()) {
                    const reportedPeptideId = mapEntry[0];
                    const missedCleavage_Count = mapEntry[1];

                    if (missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId) {
                        missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId.delete(reportedPeptideId);
                    }
                    missedCleavage_TotalCount_AcrossAllPSMs += missedCleavage_Count;
                }
            }

            if ( missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId ) {
                for ( const missedCleavage_Count_PerPsmId of missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId.values() ) {
                    for ( const missedCleavage_Count of missedCleavage_Count_PerPsmId.values() ) {
                        missedCleavage_TotalCount_AcrossAllPSMs += missedCleavage_Count;
                    }
                }
            }
        }

        const resultForSearch : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result_PerSearch = {
            projectSearchId,
            distinctPeptide_Count_Containing_MissedCleavage: distinctPeptide_Contains_MissedCleavage_Count,
            missedCleavage_TotalCount_AcrossAllPSMs,
            psm_Count_Containing_MissedCleavage,
            total_PSM_Count,
            total_DistinctPeptide_Count: distinctPeptide_Count_Map_Key_ProjectSearchId.get(projectSearchId)
        }

        result.add_result_ForProjectSearchId( resultForSearch );
    }
    return result;
}

