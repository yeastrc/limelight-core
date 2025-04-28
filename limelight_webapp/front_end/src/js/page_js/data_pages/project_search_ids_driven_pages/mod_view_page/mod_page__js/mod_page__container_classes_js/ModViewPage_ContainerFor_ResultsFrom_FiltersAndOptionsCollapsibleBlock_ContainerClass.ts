/**
 * ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass.ts
 */

import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

/**
 * The filtered results from the block "Click to Show Filters and Options"
 *
 * This is the filtering results
 */
export class ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass {

    readonly reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    ///////////

    //   Cached Derived Data

    private _cachedDerivedData: {
        psmCount_Map_Key_ProjectSearchId?: ReadonlyMap<number, number>
        getScanCount_For_ProjectSearchIds_Result?: ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result
    }

    constructor(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        this._set_reset__cachedDerivedData()
    }

    /**
     *
     */
    private _set_reset__cachedDerivedData() {
        this._cachedDerivedData = {}
    }

    /**
     *
     * @param projectSearchIds
     */
    getPsmCount_For_ProjectSearchIds( projectSearchIds: Array<number>)
    : {
        psmCount_Map_Key_ProjectSearchId: ReadonlyMap<number, number>
    } {
        if ( this._cachedDerivedData?.psmCount_Map_Key_ProjectSearchId ) {
            return { psmCount_Map_Key_ProjectSearchId: this._cachedDerivedData.psmCount_Map_Key_ProjectSearchId }
        }

        const psmCount_Map_Key_ProjectSearchId: Map<number, number> = new Map()

        for ( const projectSearchId of projectSearchIds ) {

            const reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {
                throw Error( "this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            let totalSummed_PsmCount_For_ProjectSearchId = 0

            for ( const reportedPeptideId_AndIts_PSM_IDs of reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_Entries_IterableIterator() ) {

                totalSummed_PsmCount_For_ProjectSearchId += reportedPeptideId_AndIts_PSM_IDs.psmCount_after_Include

                // reportedPeptideId_AndIts_PSM_IDs.psmCount_after_Include_Map_Key_SearchSubGroupId
            }

            psmCount_Map_Key_ProjectSearchId.set( projectSearchId, totalSummed_PsmCount_For_ProjectSearchId )
        }

        this._cachedDerivedData.psmCount_Map_Key_ProjectSearchId = psmCount_Map_Key_ProjectSearchId

        return { psmCount_Map_Key_ProjectSearchId }
    }

    /**
     *
     * @param projectSearchIds
     */
    get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds: Array<number>) :
        {
            data: ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result
            promise: Promise<ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result>
        } {

        if ( this._cachedDerivedData?.getScanCount_For_ProjectSearchIds_Result ) {
            return { promise: undefined, data: this._cachedDerivedData.getScanCount_For_ProjectSearchIds_Result }
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("getScanCount_For_ProjectSearchIds(...): this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {

            this._cachedDerivedData.getScanCount_For_ProjectSearchIds_Result = this.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
                projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })

            //  EARLY RETURN
            return {
                promise: undefined,
                data: this._cachedDerivedData.getScanCount_For_ProjectSearchIds_Result }
        }

        const promisesAll = Promise.all(promises)

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result>(
                (resolve, reject) => { try {

                promisesAll.catch(reason => reject(reason))
                promisesAll.then(novalue => { try {

                    this._cachedDerivedData.getScanCount_For_ProjectSearchIds_Result = this.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
                        projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })
                    resolve( this._cachedDerivedData.getScanCount_For_ProjectSearchIds_Result )

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})}
    }

    /**
     *
     * @param projectSearchIds
     * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
     */
    private get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData(
        {
            projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
        } : {
            projectSearchIds: Array<number>
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
        }
    ) : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result {

        //   Compute Total Unique scanNumber/SearchScanFileId pair per projectSearchId_Or_SubSearchId

        //   Computed for ALL PSMs that pass the PSM/Peptide filters at the top of the page AND filters in 'Click to Hide Filters and Options'

        const scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId: Map<number, number> = new Map()

        for ( const projectSearchId of projectSearchIds ) {

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {
                throw Error("this.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const _SearchScanFileId_Value_ForWhen_NullOrUndefined = -999999

            const scanNumber_Set_Map_Key_SearchScanFileId: Map<number, Set<number>> = new Map()

            for ( const reportedPeptideId_AndIts_PSM_IDs of reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_Entries_IterableIterator() ) {

                // reportedPeptideId_AndIts_PSM_IDs.psmCount_after_Include_Map_Key_SearchSubGroupId

                if ( reportedPeptideId_AndIts_PSM_IDs.psmIds_Include ) {

                    for ( const psmId of reportedPeptideId_AndIts_PSM_IDs.psmIds_Include ) {

                        const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId )
                        if ( ! psmTblData_For_PsmId ) {
                            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId )
                        }
                        let searchScanFileId = psmTblData_For_PsmId.searchScanFileId
                        if ( searchScanFileId === null || searchScanFileId === undefined ) {
                            searchScanFileId = _SearchScanFileId_Value_ForWhen_NullOrUndefined // Override so not use null or undefined as Map key
                        }

                        let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId )
                        if ( ! scanNumber_Set ) {
                            scanNumber_Set = new Set()
                            scanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId, scanNumber_Set )
                        }
                        scanNumber_Set.add( psmTblData_For_PsmId.scanNumber )
                    }
                } else {
                    const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId_AndIts_PSM_IDs.reportedPeptideId )
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId_AndIts_PSM_IDs.reportedPeptideId ) returned NOTHING for reportedPeptideId_AndIts_PSM_IDs.reportedPeptideId: " + reportedPeptideId_AndIts_PSM_IDs.reportedPeptideId )
                    }
                    for ( const psmTblData_For_PsmId of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                        let searchScanFileId = psmTblData_For_PsmId.searchScanFileId
                        if ( searchScanFileId === null || searchScanFileId === undefined ) {
                            searchScanFileId = _SearchScanFileId_Value_ForWhen_NullOrUndefined // Override so not use null or undefined as Map key
                        }

                        let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId )
                        if ( ! scanNumber_Set ) {
                            scanNumber_Set = new Set()
                            scanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId, scanNumber_Set )
                        }
                        scanNumber_Set.add( psmTblData_For_PsmId.scanNumber )
                    }
                }
            }

            //  Sum SearchScanFileId / ScanNumber Pairs

            let scanNumber_SearchScanFileId_Pair_Unique_Count = 0

            for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                scanNumber_SearchScanFileId_Pair_Unique_Count += scanNumber_Set.size
            }

            scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.set( projectSearchId, scanNumber_SearchScanFileId_Pair_Unique_Count )
        }

        return { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId }
    }
}


export class ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result {

    scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId: ReadonlyMap<number, number>
}
