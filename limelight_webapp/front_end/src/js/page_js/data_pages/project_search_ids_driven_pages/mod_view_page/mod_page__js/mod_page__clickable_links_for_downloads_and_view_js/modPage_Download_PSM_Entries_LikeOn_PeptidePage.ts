/**
 * modPage_Download_PSM_Entries_LikeOn_PeptidePage.ts
 *
 *
 */


import { ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root } from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds, DownloadPSMs_PerProjectSearchId_Entry, DownloadPSMs_PerReportedPeptideId } from "page_js/data_pages/common__project_search_and_experiment_based_download_data/download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";



/**
 * Download PSM Entries Like On Peptide Page
 */
export const modPage_Download_PSM_Entries_LikeOn_PeptidePage = function (
    {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        searchDataLookupParamsRoot
    } : {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    }
) {

    const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

    const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
            get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

        if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result.data ) {

            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )

        } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result.promise.catch(reason => { reject(reason)})
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result.promise.then(value => { try {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push( promise )
        } else {
            throw Error( "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch__Result no 'data' or 'promise" )
        }
    }

    if ( promises.length === 0 ) {

        _modPage_Download_PSM_Entries_LikeOn_PeptidePage__AfterGetData({
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            searchDataLookupParamsRoot,
            projectSearchIds,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })

        return  // EARLY RETURN
    }

    const promisesAll = Promise.all(promises)

    promisesAll.catch(reason => {  })
    promisesAll.then(novalue => { try {

        _modPage_Download_PSM_Entries_LikeOn_PeptidePage__AfterGetData({
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            searchDataLookupParamsRoot,
            projectSearchIds,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
        })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

}

/**
 *
 */
const _modPage_Download_PSM_Entries_LikeOn_PeptidePage__AfterGetData = function (
    {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
        searchDataLookupParamsRoot,
        projectSearchIds,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId
    } : {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root

        projectSearchIds: Array<number>
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
    }
) {

    //  Build data for serializing to JSON

    const psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId: Map<number, Map<number, Set<number>>> = new Map()

    for ( const computeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId__ENTRY of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_All_Values() ) {

        var modMass = computeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId__ENTRY.modMass

        for ( const result_ForSingle_ProjectSearchId_Or_SubSearchId of computeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId__ENTRY.get_All() ) {

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder =
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId )
            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder__Map_Key_ProjectSearchId.get( result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId ) returned NOTHING for result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId: " + result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            let psmIds_Set__Map_Key_ReportedPeptideId = psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.get( result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId )
            if ( ! psmIds_Set__Map_Key_ReportedPeptideId ) {
                psmIds_Set__Map_Key_ReportedPeptideId = new Map()
                psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.set( result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId, psmIds_Set__Map_Key_ReportedPeptideId )
            }

            for ( const psmId of result_ForSingle_ProjectSearchId_Or_SubSearchId.get_PsmIds() ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId )
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId + ", result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId: " + result_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                let psmIds_Set = psmIds_Set__Map_Key_ReportedPeptideId.get( psmTblData_For_PsmId.reportedPeptideId )
                if ( ! psmIds_Set ) {
                    psmIds_Set = new Set()
                    psmIds_Set__Map_Key_ReportedPeptideId.set( psmTblData_For_PsmId.reportedPeptideId, psmIds_Set )
                }
                psmIds_Set.add( psmId )
            }
        }
    }

    const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

    for ( const psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId__Entry of psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.entries() ) {

        const projectSearchId = psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId__Entry[ 0 ]
        const psmIds_Set__Map_Key_ReportedPeptideId = psmIds_Set__Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId__Entry[ 1 ]

        const reportedPeptideIdsAndTheirPsmIds_Array: Array<DownloadPSMs_PerReportedPeptideId> = []

        for ( const psmIds_Set__Map_Key_ReportedPeptideId__Entry of psmIds_Set__Map_Key_ReportedPeptideId.entries() ) {

            const reportedPeptideId = psmIds_Set__Map_Key_ReportedPeptideId__Entry[ 0 ]
            const psmIds_Set = psmIds_Set__Map_Key_ReportedPeptideId__Entry[ 1 ]

            const reportedPeptideIdAndPsmIds: DownloadPSMs_PerReportedPeptideId = {
                reportedPeptideId: reportedPeptideId,
                psmIds_Include: Array.from( psmIds_Set )
            }

            reportedPeptideIdsAndTheirPsmIds_Array.push( reportedPeptideIdAndPsmIds )
        }

        const projectSearchIdsReportedPeptideIdsPsmIds_Entry : DownloadPSMs_PerProjectSearchId_Entry =
            { projectSearchId, reportedPeptideIdsAndTheirPsmIds: reportedPeptideIdsAndTheirPsmIds_Array, searchSubGroup_Ids_Selected: undefined };

        projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
    }

    if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
        return  // EARLY RETURN
    }

    download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
        experimentId : undefined,
        projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot,
        proteinSequenceVersionIds : undefined,  //  Peptide page
        include_ApexRetentionTime: false
    } );

}