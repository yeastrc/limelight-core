/**
 * proteinPageSearchesSummarySection__Compute_DisplayData.ts
 *
 * Javascript for proteinView.jsp page -
 *
 * Compute data to display in Component:  ProteinPageSearchesSummarySectionData_Component
 *
 */
import {
    ProteinPageSearchesSummarySectionData_PerSearchEntry,
    ProteinPageSearchesSummarySectionData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/protein_page__protein_list__multiple_searches_code/react_components/proteinPageSearchesSummarySection";
import {ProteinDisplayData_From_createProteinDisplayData_ProteinList} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


/**
 *
 * @param proteinDisplayData
 * @param projectSearchIds
 * @param dataPageStateManager
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
export const proteinPageSearchesSummarySection__Compute_DisplayData = function (
    {
        proteinDisplayData, projectSearchIds, dataPageStateManager, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        projectSearchIds : Array<number>
        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : {
    data: ProteinPageSearchesSummarySectionData_Root
    promise: Promise<ProteinPageSearchesSummarySectionData_Root>
} {

    if ( ! proteinDisplayData.summaryMap_Key_ProjectSearchId ) {
        const msg = "( ! proteinDisplayData.summaryMap_Key_ProjectSearchId ) in proteinPageSearchesSummarySection__Compute_DisplayData(...)";
        console.warn(msg)
        throw Error(msg)
    }

    const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map();

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned Nothing. projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
            get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();

        if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder );
        } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
            const promise = new Promise<void>( (resolve, reject) => { try {
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder );
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise);
        } else {
            throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no data or promise")
        }
    }

    if ( promises.length === 0 ) {
        return {                        //  EARLY RETURN
            promise: undefined,
            data: _proteinPageSearchesSummarySection__Compute_DisplayData__AfterGetData({
                proteinDisplayData, projectSearchIds, dataPageStateManager, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })
        }
    }

    const promises_All = Promise.all(promises)

    return {
        data: undefined,
        promise: new Promise<ProteinPageSearchesSummarySectionData_Root>((resolve, reject) => { try {
            promises_All.catch(reason => reject(reason))
            promises_All.then(noValue => { try {
                const data = _proteinPageSearchesSummarySection__Compute_DisplayData__AfterGetData({
                    proteinDisplayData, projectSearchIds, dataPageStateManager, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })
                resolve(data);

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

}

/**
 *
 * @param proteinDisplayData
 * @param projectSearchIds
 * @param dataPageStateManager
 * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
 * @private
 */
const _proteinPageSearchesSummarySection__Compute_DisplayData__AfterGetData = function (
    {
        proteinDisplayData, projectSearchIds, dataPageStateManager, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList
        projectSearchIds : Array<number>
        dataPageStateManager : DataPageStateManager
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
    }
) : ProteinPageSearchesSummarySectionData_Root {

    const summaryMap_Key_ProjectSearchId = proteinDisplayData.summaryMap_Key_ProjectSearchId;

    const proteinPageSearchesSummarySectionData_Root = new ProteinPageSearchesSummarySectionData_Root();

    const searchNames_AsMap = dataPageStateManager.get_searchNames_AsMap()

    proteinPageSearchesSummarySectionData_Root.perSearchEntries = [];

    for (const projectSearchId of projectSearchIds) {

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)
        if (!psmTblData_For_ReportedPeptideId_For_MainFilters_Holder) {
            const msg = "Building ProteinPageSearchesSummarySectionData_Root: searchNames_AsMap.get( projectSearchId ); return nothing. projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const searchNameEntry = searchNames_AsMap.get(projectSearchId);
        if (!searchNameEntry) {
            const msg = "Building ProteinPageSearchesSummarySectionData_Root: searchNames_AsMap.get( projectSearchId ); return nothing. projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const summarySectionData_PerSearchEntry = new ProteinPageSearchesSummarySectionData_PerSearchEntry()
        summarySectionData_PerSearchEntry.searchId = searchNameEntry.searchId;
        summarySectionData_PerSearchEntry.searchName = searchNameEntry.name;

        const summary_For_ProjectSearchId = summaryMap_Key_ProjectSearchId.get(projectSearchId);

        if (summary_For_ProjectSearchId) {
            summarySectionData_PerSearchEntry.proteinCount_TotalForSearch = summary_For_ProjectSearchId.proteinCount_TotalForSearch;
            summarySectionData_PerSearchEntry.distinct_PeptideCount_TotalForSearch = summary_For_ProjectSearchId.distinctPeptideCount_TotalForSearch;
            summarySectionData_PerSearchEntry.psmCount_TotalForSearch = summary_For_ProjectSearchId.psmCount_TotalForSearch;

            {  // Distinct Scan Count

                const scanNumber_Set_When_NO_SearchScanFileId = new Set<number>()

                const scanNumber_Set_Map_Key_SearchScanFileId = new Map<number, Set<number>>()

                for (const psmTblData_Entry of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator()) {
                    const scanNumber = psmTblData_Entry.scanNumber
                    const searchScanFileId = psmTblData_Entry.searchScanFileId

                    if ( searchScanFileId === undefined || searchScanFileId === null ) {
                        //  Handle when No searchScanFileId
                        scanNumber_Set_When_NO_SearchScanFileId.add(scanNumber)

                    } else {

                        let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get(searchScanFileId)
                        if ( ! scanNumber_Set ) {
                            scanNumber_Set = new Set()
                            scanNumber_Set_Map_Key_SearchScanFileId.set(searchScanFileId, scanNumber_Set)
                        }
                        scanNumber_Set.add(scanNumber)
                    }
                }

                let distinct_ScanCount_TotalForSearch : number = scanNumber_Set_When_NO_SearchScanFileId.size;

                for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                    distinct_ScanCount_TotalForSearch += scanNumber_Set.size
                }

                summarySectionData_PerSearchEntry.distinct_ScanCount_TotalForSearch = distinct_ScanCount_TotalForSearch;
            }

        } else {
            console.warn("No value returned from summaryMap_Key_ProjectSearchId.get( projectSearchId ) projectSearchId: " + projectSearchId)
        }

        proteinPageSearchesSummarySectionData_Root.perSearchEntries.push(summarySectionData_PerSearchEntry);
    }

    return proteinPageSearchesSummarySectionData_Root;
}