/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Data
 *
 */

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data";
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result";


/**
 * Version for Single Search with Sub Searches
 *
 * @param compute_MissedCleavages_Initial_Data_Result_Root
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 */
export const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches = function (
    {
        compute_MissedCleavages_Initial_Data_Result_Root,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        compute_MissedCleavages_Initial_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
)  : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result {

    const searchSubGroup_Ids_Selected = qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

    const projectSearchId = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];
    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

    const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
    if (!loadedDataPerProjectSearchIdHolder) {
        throw Error("loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned NOTHING. projectSearchId: " + projectSearchId);
    }

    const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
    if (!numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map) {
        throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); returned NOTHING. projectSearchId: " + projectSearchId);
    }

    const computeDataForCharts_Result_ForSingle_ProjectSearchId = compute_MissedCleavages_Initial_Data_Result_Root.get_Result_ForSingle_ProjectSearchId(projectSearchId);
    if (!computeDataForCharts_Result_ForSingle_ProjectSearchId) {
        throw Error("compute_MissedCleavages_Initial_Data_Result_Root.get_Result_ForSingle_ProjectSearchId(projectSearchId); returned NOTHING. projectSearchId: " + projectSearchId);
    }

    //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

    const peptideDistinct_Array =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

    const distinctPeptide_Count_Map_Key_SearchSubGroup_Id : Map<number,number> = new Map();

    for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {
        distinctPeptide_Count_Map_Key_SearchSubGroup_Id.set(searchSubGroup_Id, 0);
    }

    const distinctPeptide_Contains_MissedCleavage_Count_Map_Key_SearchSubGroup_Id : Map<number,number> = new Map();

    const psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, number>> = new Map();
    const psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, number>> = new Map();

    const psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, Set<number>>> = new Map();
    const psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, Set<number>>> = new Map();

    const missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, Map<number, number>>> = new Map();
    const missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id : Map<number, Map<number, number>> = new Map();

    for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

        for ( const dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue of peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.values() ) {

            for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue.entries() ) {

                const searchSubgroupId = dataPerReportedPeptideId_MapEntry[0];
                const data_PerReportedPeptideId_SearchSubGroupId_Value = dataPerReportedPeptideId_MapEntry[1];
                const reportedPeptideId = data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId;

                {
                    let distinctPeptide_Count = distinctPeptide_Count_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                    distinctPeptide_Count_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, distinctPeptide_Count + 1 );
                }

                let psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                let psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                let psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                let psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);

                if ( ! psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId ) {
                    psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                    psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId );
                }
                if ( ! psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                    psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                    psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId );
                }
                if ( ! psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                    psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                    psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId );
                }
                if ( ! psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId ) {
                    psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                    psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId );
                }


                let missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                if ( ! missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId ) {
                    missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = new Map();
                    missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId );
                }
                let missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubgroupId);
                if ( ! missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId ) {
                    missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = new Map();
                    missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId );
                }

                let foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId = false;

                const computeDataForCharts_Result__ForSingle_ReportedPeptide = computeDataForCharts_Result_ForSingle_ProjectSearchId.get_Result_ForSingle_ReportedPeptide(reportedPeptideId);
                if ( !computeDataForCharts_Result__ForSingle_ReportedPeptide ) {
                    //  TODO  throw Error
                    continue; // EARLY CONTINUE
                }

                if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {

                    foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId = true;

                } else {
                    var zunused = 0;
                }

                if ( data_PerReportedPeptideId_SearchSubGroupId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                    const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId );
                    if ( numPsmsFor_SearchSubGroupId === undefined || numPsmsFor_SearchSubGroupId === null ) {
                        const msg = "numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId ); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const numPsms = numPsmsFor_SearchSubGroupId.get(searchSubgroupId);
                    if ( numPsms === undefined || numPsms === null ) {
                        const msg = "numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId ); numPsmsFor_SearchSubGroupId.get(searchSubgroupId); returned nothing for searchSubgroupId:" + searchSubgroupId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
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
                    if ( ! data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {
                        const msg = "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) and ( ! dataPerReportedPeptideId.psmIdsSet ). searchSubgroupId: " + searchSubgroupId + ", projectSearchId: " + projectSearchId
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

                        for ( const psmId of data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {

                            psmIds__For_psmIds_AllPSMs_YesPSMFiltering.add( psmId );  //  For Total PSM Count

                            const computeDataForCharts_Result__ForSingle_Psm = computeDataForCharts_Result__ForSingle_ReportedPeptide.get_Result_ForSingle_Psm( psmId );
                            if ( computeDataForCharts_Result__ForSingle_Psm ) {
                                //  Have value for psmId so use that
                                missedCleavage_Count_PerPsmId_Map_Key_PsmId.set( psmId, computeDataForCharts_Result__ForSingle_Psm.get_missedCleavageCount() );
                            } else {
                                //  No value for psmId so use value at Reported Peptide level
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
                        for ( const psmId of data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {
                            psmIds.add( psmId );
                        }
                    }
                }

                if ( foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId ) {

                    const distinctPeptide_Contains_MissedCleavage_Count = distinctPeptide_Contains_MissedCleavage_Count_Map_Key_SearchSubGroup_Id.get( searchSubgroupId );
                    if ( distinctPeptide_Contains_MissedCleavage_Count ) {
                        //  Have existing value so increment it
                        distinctPeptide_Contains_MissedCleavage_Count_Map_Key_SearchSubGroup_Id.set( searchSubgroupId, distinctPeptide_Contains_MissedCleavage_Count + 1 );
                    } else {
                        //  No existing value so set to 1
                        distinctPeptide_Contains_MissedCleavage_Count_Map_Key_SearchSubGroup_Id.set(searchSubgroupId, 1);
                    }
                }
            }
        }
    }

    const result = new Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result();

    for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

        const psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
        const psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
        const psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId = psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
        const psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);

        if ( ( ! psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId )
            || ( ! psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId )
        ) {
            //  NO Data for searchSubgroupId so skip
            continue;  //  EARLY CONTINUE
        }

        let total_PSM_Count = 0;
        let psm_Count_Containing_MissedCleavage = 0;

        let distinctPeptide_Contains_MissedCleavage_Count = distinctPeptide_Contains_MissedCleavage_Count_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
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
            const missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId = missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);
            const missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId = missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id);

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

        const resultFor_SubSearch : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch = {
            searchSubGroup_Id,
            distinctPeptide_Count_Containing_MissedCleavage: distinctPeptide_Contains_MissedCleavage_Count,
            missedCleavage_TotalCount_AcrossAllPSMs,
            psm_Count_Containing_MissedCleavage,
            total_PSM_Count,
            total_DistinctPeptide_Count: distinctPeptide_Count_Map_Key_SearchSubGroup_Id.get(searchSubGroup_Id)
        }

        result.add_result_For_SearchSubGroup_Id(resultFor_SubSearch);
    }
    return result;
}

