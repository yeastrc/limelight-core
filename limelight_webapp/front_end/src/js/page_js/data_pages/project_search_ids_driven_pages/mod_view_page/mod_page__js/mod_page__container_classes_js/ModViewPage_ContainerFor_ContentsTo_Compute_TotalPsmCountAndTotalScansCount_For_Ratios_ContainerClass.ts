/**
 * ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.ts
 */

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";

/**
 *
 */
export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass {

    private _modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager

    private _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    ///////////

    constructor(
        {
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._modViewPage_DataVizOptions_VizSelections_PageStateManager = modViewPage_DataVizOptions_VizSelections_PageStateManager
        this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }

    /**
     *
     * @param projectSearchIds
     */
    getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds: Array<number> )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result>
    } {
        if ( this._modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() ) {

            //  EARLY RETURN
            return { promise: undefined, data: this._getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__Filtered(projectSearchIds) }
        }

        return this._getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__NOT_Filtered( projectSearchIds )
    }

    /**
     * NOT Filtered
     *
     * @param projectSearchIds
     */
    _getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__NOT_Filtered( projectSearchIds: Array<number> )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result>
    } {

        const psmCount_Map_Key_ProjectSearchId: Map<number, number> = new Map()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                psmCount_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_EntryCount() )

            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        psmCount_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_EntryCount() )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }

        if ( promises.length === 0 ) {

            return { promise: undefined, data: { psmCount_Map_Key_ProjectSearchId } }  // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result>( (resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    resolve( { psmCount_Map_Key_ProjectSearchId })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }


    /**
     * YES Filtered
     *
     * @param projectSearchIds
     */
    private _getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__Filtered( projectSearchIds: Array<number> )
        : {
        psmCount_Map_Key_ProjectSearchId: ReadonlyMap<number, number>
    } {
        if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {
            const msg = "NOT CODED For SubSearchId"
            console.warn(msg)
            throw Error(msg)
        }

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId = this._get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_For_RatiosDenominator_For_ProjectSearchIds__Filtered()

        //  Convert to PSM Count Map for result

        const psmCount_Map_Key_ProjectSearchId: Map<number, number> = new Map()

        for ( const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry of psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId ) {

            const projectSearchId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 0 ]

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 1 ]

            psmCount_Map_Key_ProjectSearchId.set( projectSearchId, psmTblData_Map_Key_PsmId.size )
        }

        return { psmCount_Map_Key_ProjectSearchId }
    }

    /**
     *
     * @param projectSearchIds
     */
    get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result>
    } {
         if ( this._modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() ) {

            //  EARLY RETURN
            return this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__YES__Filtered( projectSearchIds )
        }

        return this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__NOT__Filtered( projectSearchIds )
    }

    /**
     * NOT Filtered
     *
     * @param projectSearchIds
     */
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__NOT__Filtered( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result>
    } {

        const scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId: Map<number, number> = new Map()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_ScanNumber_SearchScanFileId_Pair_Unique_Count() )
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_ScanNumber_SearchScanFileId_Pair_Unique_Count() )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }

        if ( promises.length === 0 ) {

            return { promise: undefined, data: { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId } } // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result>( (resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    resolve( { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * YES Filtered
     *
     * @param projectSearchIds
     */
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__YES__Filtered( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result>
    } {

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

            const result = this.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
                projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })

            //  EARLY RETURN
            return {
                promise: undefined,
                data: result }
        }

        const promisesAll = Promise.all(promises)

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result>(
                (resolve, reject) => { try {

                    promisesAll.catch(reason => reject(reason))
                    promisesAll.then(novalue => { try {

                        const result = this.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
                            projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                        })
                        resolve( result )

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
    ) : ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result {

        //   Compute Total Unique scanNumber/SearchScanFileId pair per projectSearchId_Or_SubSearchId

        //   Computed for ALL PSMs that pass the PSM/Peptide filters at the top of the page AND filters in 'Click to Hide Filters and Options'

        const scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId: Map<number, number> = new Map()

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId = this._get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_For_RatiosDenominator_For_ProjectSearchIds__Filtered()

        for ( const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry of psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId ) {

            const projectSearchId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 0 ]

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 1 ]

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const _SearchScanFileId_Value_ForWhen_NullOrUndefined = -999999

            const scanNumber_Set_Map_Key_SearchScanFileId: Map<number, Set<number>> = new Map()

            for ( const psmTblData_For_PsmId of psmTblData_Map_Key_PsmId.values() ) {

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

            //  Sum SearchScanFileId / ScanNumber Pairs

            let scanNumber_SearchScanFileId_Pair_Unique_Count = 0

            for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                scanNumber_SearchScanFileId_Pair_Unique_Count += scanNumber_Set.size
            }

            scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.set( projectSearchId, scanNumber_SearchScanFileId_Pair_Unique_Count )
        }

        return { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId }
    }

    /**
     * YES Filtered
     *
     * @private
     */
    private _get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_For_RatiosDenominator_For_ProjectSearchIds__Filtered() {

        if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {
            const msg = "NOT CODED For SubSearchId"
            console.warn(msg)
            throw Error(msg)
        }

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId: Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

        // Process data under all mod masses that passed all filters to reach this point

        for ( const data_For_ModMass of this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_Data_For_ModMasses_AllEntries() ) {

            for ( const  data_For_ModMass_Entry of data_For_ModMass.get_All() ) {

                let psmTblData_Map_Key_PsmId_Map = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId.get( data_For_ModMass_Entry.projectSearchId_Or_SubSearchId )
                if ( ! psmTblData_Map_Key_PsmId_Map ) {
                    psmTblData_Map_Key_PsmId_Map = new Map()
                    psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId.set( data_For_ModMass_Entry.projectSearchId_Or_SubSearchId, psmTblData_Map_Key_PsmId_Map )
                }

                for ( const dataFor_SinglePsm of data_For_ModMass_Entry.get_DataFor_SinglePsm_All() ) {

                    psmTblData_Map_Key_PsmId_Map.set( dataFor_SinglePsm.psmTblData.psmId, dataFor_SinglePsm.psmTblData )
                }
            }
        }

        //  Add in values for "Unmodified PSMs" including PSMs where had open modifications but the open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked (checked by default)

        //  Since 'open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked' are treated as unmodified, whether or not they are unlocalized is ignored re-guarding filtering "Exclude unlocalized mods:"

        for (
            const psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry of
            this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId()
            ) {

            const projectSearchId = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry[ 0 ]
            const psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId__MapEntry[ 1 ]

            let psmTblData_Map_Key_PsmId_Map = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! psmTblData_Map_Key_PsmId_Map ) {
                psmTblData_Map_Key_PsmId_Map = new Map()
                psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId.set( projectSearchId, psmTblData_Map_Key_PsmId_Map )
            }

            for ( const psmTblData_With_NO_Modifications of psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map.values() ) {

                psmTblData_Map_Key_PsmId_Map.set( psmTblData_With_NO_Modifications.psmId, psmTblData_With_NO_Modifications )
            }
        }

        return psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId
    }


}


export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result {

    psmCount_Map_Key_ProjectSearchId: ReadonlyMap<number, number>
}

export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result {

    scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId: ReadonlyMap<number, number>
}
