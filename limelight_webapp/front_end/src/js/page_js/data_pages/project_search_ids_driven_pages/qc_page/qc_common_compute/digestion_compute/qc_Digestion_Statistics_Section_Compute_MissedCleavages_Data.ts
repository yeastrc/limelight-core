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
import {
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_ForSingle_ReportedPeptide,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";


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
)  : Promise<Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result> {
    try {
        const projectSearchIds = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
            qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set =
            _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__Get_ProjectSearchIds_Load_PsmIds_For( {
                compute_MissedCleavages_Initial_Data_Result_Root,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent
            })

        //  Load Data

        const numPsmsForReportedPeptideIdMap_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map()

        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

        const promises: Array<Promise<void>> = []

        {
            for (const projectSearchId of projectSearchIds) {
                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    //  TODO  throw Error
                    continue; // EARLY CONTINUE
                }

                {
                    const get_numPsmsForReportedPeptideIdMap_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap();
                    if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {
                        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap )
                    } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {
                        const promise = new Promise<void>( ( resolve, reject ) => {
                            get_numPsmsForReportedPeptideIdMap_Result.promise.catch( reason => {
                                try {
                                    reject( reason );
                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e;
                                }
                            } );
                            get_numPsmsForReportedPeptideIdMap_Result.promise.then( result => {
                                try {
                                    numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.set( projectSearchId, result.numPsmsForReportedPeptideIdMap )

                                    resolve();

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e;
                                }
                            } );
                        } )
                        promises.push( promise );
                    } else {
                        const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
                        console.warn( msg )
                        throw Error( msg )
                    }
                }

                ///

                if ( psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder__Load_For_ProjectSearchId_Set.has( projectSearchId ) ) {

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
                    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                        throw Error(" Inside for ( const dataPerReportedPeptideId_Map_Key_reportedPeptideId_EntryValue of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) :: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId)
                    }

                    const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch()
                    if (get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                    } else if (get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
                        const promise = new Promise<void>((resolve, reject) => {
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                try {
                                    reject(reason);
                                } catch (e) {
                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                    throw e;
                                }
                            });
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(result => {
                                try {
                                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                                    resolve(); //  resolve
                                } catch (e) {
                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                    throw e;
                                }
                            });
                        })
                        promises.push(promise);
                    } else {
                        const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
                        console.warn(msg)
                        throw Error(msg)
                    }
                }
            }
        }

        if ( promises.length === 0 ) {

            const result = _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__ProcessAfterLoadedData({
                compute_MissedCleavages_Initial_Data_Result_Root,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })

            return Promise.resolve(result) // EARLY RETURN
        }

        const promisesAll = Promise.all(promises)

        return new Promise<Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result>((resolve, reject) => {
            promisesAll.catch(reason => {
                try {
                    reject(reason);
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
            promisesAll.then(result => {
                try {
                    const result = _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__ProcessAfterLoadedData({
                        compute_MissedCleavages_Initial_Data_Result_Root,
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })

                    resolve(result); //  resolve
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
        })

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
 * @param compute_MissedCleavages_Initial_Data_Result_Root
 * @param qcViewPage_CommonData_To_AllComponents_From_MainComponent
 * @param numPsmsForReportedPeptideIdMap_Key_ProjectSearchId
 * @param psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
 */
const _qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__ProcessAfterLoadedData = function (
    {
        compute_MissedCleavages_Initial_Data_Result_Root,
        qcViewPage_CommonData_To_AllComponents_From_MainComponent,
        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        compute_MissedCleavages_Initial_Data_Result_Root: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
        qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent

        // Loaded data
        numPsmsForReportedPeptideIdMap_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder>
    }
) : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data_Result {
    try {
        const projectSearchIds = qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
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

                const qcPage_Flags = qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
                if ( ! qcPage_Flags ) {
                    const msg = "qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get( projectSearchId )
                if ( ! numPsmsForReportedPeptideIdMap ) {
                    const msg = "numPsmsForReportedPeptideIdMap_Key_ProjectSearchId.get( projectSearchId ); returned nothing. projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                {
                    let distinctPeptide_Count = distinctPeptide_Count_Map_Key_ProjectSearchId.get(projectSearchId);
                    distinctPeptide_Count_Map_Key_ProjectSearchId.set( projectSearchId, distinctPeptide_Count + 1 );
                }

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

                    if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        if ( qcPage_Flags.anyPsmHas_OpenModifications ) {

                            const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
                            if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) {
                                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ); returned nothing AND ( qcPage_Flags.anyPsmHas_OpenModifications ). projectSearchId: " + projectSearchId;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            if ( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) {
                                //  Failed to load this data above
                                throw Error("( ! psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder ) when ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND ( qcPage_Flags.anyPsmHas_OpenModifications )")
                            }

                            const psmIds_For_ReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(dataPerReportedPeptideId.reportedPeptideId)

                            if ( ! psmIds_For_ReportedPeptideId ) {
                                throw Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(dataPerReportedPeptideId.reportedPeptideId) returned NOTHING for dataPerReportedPeptideId.reportedPeptideId: " + dataPerReportedPeptideId.reportedPeptideId )
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

                                foundMissedCleavage_For_DistinctPeptide_For_SingleSearch = true;
                            }

                        } else {

                            //  NO Open Mods in search so follow standard processing

                            const numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                            if ( numPsms === undefined || numPsms === null ) {
                                const msg = "numPsmsForReportedPeptideIdMap.get( reportedPeptideId ); returned nothing for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            psmCount_AllPSMs_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                            if ( computeDataForCharts_Result__ForSingle_ReportedPeptide.get_isMissedCleavage() ) {

                                psmCount_PSMs_With_MissedCleavage_NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, numPsms );

                                const missedCleavageCount = computeDataForCharts_Result__ForSingle_ReportedPeptide.get_missedCleavageCount()

                                const missedCleavage_Count__NoPSMFiltering_Value = numPsms * missedCleavageCount

                                missedCleavage_Count__NoPSMFiltering_Map_Key_ReportedPeptideId.set( reportedPeptideId, missedCleavage_Count__NoPSMFiltering_Value );

                                foundMissedCleavage_For_DistinctPeptide_For_SingleSearch = true;

                            } else {
                                var zunused = 0;
                            }

                        }

                    } else {
                        if ( ! dataPerReportedPeptideId.psmIdsSet ) {
                            const msg = "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) and ( ! dataPerReportedPeptideId.psmIdsSet ). projectSearchId: " + projectSearchId
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const process_PsmIds_For_ReportedPeptideId_Result =
                            _process_PsmIds_For_ReportedPeptideId({
                                psmIdsSet: dataPerReportedPeptideId.psmIdsSet,
                                reportedPeptideId,
                                computeDataForCharts_Result__ForSingle_ReportedPeptide,
                                psmIds_AllPSMs_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                missedCleavage_Count_PerPsmId_Map_Key_PsmId_Map_Key_ReportedPeptideId,
                                psmIds_PSMs_With_MissedCleavage_YesPSMFiltering_Map_Key_ReportedPeptideId,
                                projectSearchId_ForErrorLogging: projectSearchId
                            })

                        if ( process_PsmIds_For_ReportedPeptideId_Result.allPsms_Have_AtLeastOne_MissedCleavage ) {

                            foundMissedCleavage_For_DistinctPeptide_For_SingleSearch = true;
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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
        psmIdsSet: Set<number>
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
