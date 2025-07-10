/**
 * qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches.ts
 *
 * QC Page Digestion Statistics Section : Compute: Missed Cleavages - Data
 *
 */

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data";
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result_PerSubSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";


/**
 * Version for Single Search with Sub Searches
 *
 * @param compute_MissedCleavages_Initial_Data_Result_Root
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 */
export const qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches = async function (
    {
        compute_MissedCleavages_Initial_Data_Result_Root,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        compute_MissedCleavages_Initial_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
)  : Promise<Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result> {
    try {
        const searchSubGroup_Ids_Selected = qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

        const projectSearchId = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
            qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING. projectSearchId: " + projectSearchId);
        }

        const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result =
            await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters()
                .get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();

        const numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder;


        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set =
            _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__Get_ProjectSearchIds_Load_PsmIds_For( {
                compute_MissedCleavages_Initial_Data_Result_Root,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent
            })

        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder

        if ( psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set.has( projectSearchId ) ) {

            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()

            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        }


        const qcPage_Flags = qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
        if ( ! qcPage_Flags ) {
            const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
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

                    if ( data_PerReportedPeptideId_SearchSubGroupId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        if ( qcPage_Flags.anyPsmHas_OpenModifications ) {

                            const psmIds_For_ReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId)

                            if ( ! psmIds_For_ReportedPeptideId ) {
                                throw Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(dataPerReportedPeptideId.reportedPeptideId) returned NOTHING for data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId: " + data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId )
                            }

                            const psmIdsSet: Set<number> = new Set(psmIds_For_ReportedPeptideId)

                            const process_PsmIds_For_ReportedPeptideId_Result =
                                _process_PsmIds_For_ReportedPeptideId({
                                    psmIdsSet,
                                    reportedPeptideId,
                                    computeDataForCharts_Result__ForSingle_ReportedPeptide,
                                    psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                    missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId,
                                    psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                    projectSearchId_ForErrorLogging: projectSearchId
                                })

                            if ( process_PsmIds_For_ReportedPeptideId_Result.allPsms_Have_AtLeastOne_MissedCleavage ) {

                                foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId = true;
                            }

                        } else {

                            //  NO Open Mods in search so follow standard processing

                            const numPsmsFor_SearchSubGroupId = numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId );
                            if ( numPsmsFor_SearchSubGroupId === undefined || numPsmsFor_SearchSubGroupId === null ) {
                                const msg = "numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId ); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            const numPsms = numPsmsFor_SearchSubGroupId.get( searchSubgroupId );
                            if ( numPsms === undefined || numPsms === null ) {
                                const msg = "numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId ); numPsmsFor_SearchSubGroupId.get(searchSubgroupId); returned nothing for searchSubgroupId:" + searchSubgroupId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                            if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {

                                psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                                missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms * computeDataForCharts_Result__ForSingle_ReportedPeptide.get_missedCleavageCount() );

                                foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId = true;

                            } else {
                                var zunused = 0;
                            }
                        }

                    } else {
                        if ( ! data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {
                            const msg = "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) and ( ! dataPerReportedPeptideId.psmIdsSet ). searchSubgroupId: " + searchSubgroupId + ", projectSearchId: " + projectSearchId
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const process_PsmIds_For_ReportedPeptideId_Result =
                            _process_PsmIds_For_ReportedPeptideId({
                                psmIdsSet: data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet,
                                reportedPeptideId,
                                computeDataForCharts_Result__ForSingle_ReportedPeptide,
                                psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId,
                                psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                projectSearchId_ForErrorLogging: projectSearchId
                            })

                        if ( process_PsmIds_For_ReportedPeptideId_Result.allPsms_Have_AtLeastOne_MissedCleavage ) {

                            foundMissedCleavage_For_DistinctPeptide_For_SearchSubgroupId = true;
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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}




const _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__Get_ProjectSearchIds_Load_PsmIds_For = function (
    {
        compute_MissedCleavages_Initial_Data_Result_Root,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent
    } : {
        compute_MissedCleavages_Initial_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    }
) : Set<number> {

    const projectSearchIds = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

    //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

    const peptideDistinct_Array =
        qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

    const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set: Set<number> = new Set()

    for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

        for ( const projectSearchId of projectSearchIds ) {

            if ( psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set.has( projectSearchId ) ) {
                // Already loading for projectSearchId so skip
                continue // EARLY CONTINUE
            }

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                continue; // EARLY CONTINUE
            }

            const computeDataForCharts_Result_ForSingle_ProjectSearchId = compute_MissedCleavages_Initial_Data_Result_Root.get_Result_ForSingle_ProjectSearchId( projectSearchId );
            if ( ! computeDataForCharts_Result_ForSingle_ProjectSearchId ) {
                //  TODO  throw Error
                continue; // EARLY CONTINUE
            }

            const qcPage_Flags = qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
            if ( ! qcPage_Flags ) {
                const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            if ( qcPage_Flags.anyPsmHas_OpenModifications ) {

                for ( const dataPerReportedPeptideId_Map_Key_reportedPeptideId_EntryValue of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                    if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId_EntryValue.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        //  Need to load All PsmIds for search for use below

                        //  Add to Loading
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set.add( projectSearchId )

                        break // EARLY EXIT
                    }
                }
            }
        }
    }

    return psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set
}


/**
 *
 * @param psmIdsSet
 * @param reportedPeptideId
 * @param computeDataForCharts_Result__ForSingle_ReportedPeptide
 * @param psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId
 * @param missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId
 * @param psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId
 * @param projectSearchId_ForErrorLogging
 */
const _process_PsmIds_For_ReportedPeptideId = function (
    {
        psmIdsSet,
        reportedPeptideId,
        computeDataForCharts_Result__ForSingle_ReportedPeptide,

        //  Updated
        psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId,    //  For Total PSM Count
        missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId,
        psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId,
        // For logging
        projectSearchId_ForErrorLogging
    } : {
        psmIdsSet: ReadonlySet<number>
        reportedPeptideId: number
        computeDataForCharts_Result__ForSingle_ReportedPeptide: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide
        psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId: Map<number, Set<number>>
        missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId: Map<number, Map<number, number>>
        psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId: Map<number, Set<number>>
        projectSearchId_ForErrorLogging: number
    }
): {
    allPsms_Have_AtLeastOne_MissedCleavage: boolean
} {

    let allPsms_Have_AtLeastOne_MissedCleavage = true

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

        let psmIds = psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.get(reportedPeptideId);
        if ( ! psmIds ) {
            psmIds = new Set();
            psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIds);
        }

        for ( const psmId of psmIdsSet ) {

            psmIds__For_psmIds_AllPSMs_YesPSMFiltering.add( psmId );  //  For Total PSM Count

            let missedCleavageCount_ToSave: number = undefined

            {
                const computeDataForCharts_Result__ForSingle_Psm = computeDataForCharts_Result__ForSingle_ReportedPeptide.get_Result_ForSingle_Psm( psmId );
                if ( computeDataForCharts_Result__ForSingle_Psm ) {
                    //  Have value for psmId so use that
                    missedCleavageCount_ToSave = computeDataForCharts_Result__ForSingle_Psm.get_missedCleavageCount()
                } else {
                    //  No value for psmId so use value at Reported Peptide level
                    missedCleavageCount_ToSave = computeDataForCharts_Result__ForSingle_ReportedPeptide.get_missedCleavageCount()
                }
            }

            if ( missedCleavage_Count_PerPsmId_Map_Key_PsmId.has( psmId ) ) {
                //  missedCleavage_Count_PerPsmId_Map_Key_PsmId ALREADY HAS psmId

                //  Allow existing entries for same PSM ID with same Missed Cleavage count.  Same PsmID under multiple peptideDistinct_Entry for different localization of open mod.

                const existingEntry_missedCleavage_Count = missedCleavage_Count_PerPsmId_Map_Key_PsmId.get( psmId )

                if ( existingEntry_missedCleavage_Count !== missedCleavageCount_ToSave ) {
                    const msg = "missedCleavage_Count_PerPsmId_Map_Key_PsmId ALREADY HAS psmId and New missedCleavageCount_ToSave is DIFFERENT from entry in map:   " + psmId +
                        ", missedCleavageCount_ToSave: " + missedCleavageCount_ToSave +
                        ", existingEntry_missedCleavage_Count: " + existingEntry_missedCleavage_Count +
                        ", projectSearchId_ForErrorLogging: " + projectSearchId_ForErrorLogging
                    console.warn( msg )
                    throw Error( msg )
                }
            }

            missedCleavage_Count_PerPsmId_Map_Key_PsmId.set( psmId, missedCleavageCount_ToSave )

            if ( missedCleavageCount_ToSave > 0 ) {
                psmIds.add( psmId );
            }

            if ( missedCleavageCount_ToSave === 0 ) {

                allPsms_Have_AtLeastOne_MissedCleavage = false
            }

        }
    }

    return { allPsms_Have_AtLeastOne_MissedCleavage }
}
