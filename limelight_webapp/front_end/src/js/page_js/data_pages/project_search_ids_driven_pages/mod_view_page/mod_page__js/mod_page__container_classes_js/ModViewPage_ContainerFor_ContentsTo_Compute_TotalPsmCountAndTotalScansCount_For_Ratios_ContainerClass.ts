/**
 * ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.ts
 */

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum
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
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";

/**
 *
 */
export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass {

    private _all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    private _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    ///////////

    constructor(
        {
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }

    /**
     *
     * @param projectSearchIds
     */
    getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds: Array<number> )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result>
    } {
        if ( this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP
            && this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() ) {

            //  EARLY RETURN
            return { promise: undefined, data: this._getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__After_SecondaryFiltering(projectSearchIds) }
        }

        if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            if ( projectSearchIds.length !== 1 ) {
                const msg = "if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {  AND if ( projectSearchIds.length !== 1 ) {"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = projectSearchIds[ 0 ]

            return this._getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchId )
        }

        return this._getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_NOT_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchIds )
    }

    /**
     * NOT Filtered - YES Search Sub Groups
     *
     * @param projectSearchId
     */
    _getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchId: number )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result>
    } {

        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        let searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder


        const promises: Array<Promise<void>> = []

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder

            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {

                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }
        {
            const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch();

            if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data ) {

                searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID_Holder

            } else if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.then(value => { try {

                        searchSubGroupId_ForPSM_ID_Holder = value.searchSubGroupId_ForPSM_ID_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }

        if ( promises.length === 0 ) {

            const result = this.__getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData({
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
            })

            return { promise: undefined, data: result }  // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result>( ( resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    const result = this.__getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData({
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
                    })

                    resolve( result )

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * NOT Filtered - YES Search Sub Groups  --   AFTER Get Data
     *
     * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
     * @param searchSubGroupId_ForPSM_ID_Holder
     */
    private __getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
        }
    ) : ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result {

        const psmCount_Map_Key_SubSearchIds: Map<number, number> = new Map()

        for ( const psmTblData of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {

            const searchSubGroupId = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psmTblData.psmId )
            if ( searchSubGroupId === undefined ) {
                const msg = "searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psmTblData.psmId ) returned NOTHING for psmTblData.psmId: " + psmTblData.psmId
                console.warn(msg)
                throw Error(msg)
            }

            let searchSubGroupId_PassesFilter = false

            if ( this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {

                searchSubGroupId_PassesFilter = false
            } else {

                const selectedSearchSubGroupIds = this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds() // Undefined if all are selected, to minimize storage needs
                if ( ( ! selectedSearchSubGroupIds ) || selectedSearchSubGroupIds.has( searchSubGroupId ) ) {

                    searchSubGroupId_PassesFilter = true
                }
            }

            if ( searchSubGroupId_PassesFilter ) {

                const prevCount = psmCount_Map_Key_SubSearchIds.get( searchSubGroupId )
                if ( prevCount ) {
                    psmCount_Map_Key_SubSearchIds.set( searchSubGroupId, prevCount + 1 )
                } else {
                    psmCount_Map_Key_SubSearchIds.set( searchSubGroupId, 1 )
                }
            }
        }

        const result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result = {
            psmCount_Map_Key_ProjectSearchId_or_SubSearchId: psmCount_Map_Key_SubSearchIds
        }

        return result
    }


    /**
     * NOT Filtered - NOT Search Sub Groups
     *
     * @param projectSearchIds
     */
    _getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_NOT_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchIds: Array<number> )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result>
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

            return { promise: undefined, data: { psmCount_Map_Key_ProjectSearchId_or_SubSearchId: psmCount_Map_Key_ProjectSearchId } }  // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result>( ( resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    resolve( { psmCount_Map_Key_ProjectSearchId_or_SubSearchId: psmCount_Map_Key_ProjectSearchId })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }




    /**
     * YES Filtered
     *
     * @param projectSearchIds
     */
    private _getPsmCount_ForRatiosDenominator_For_ProjectSearchIds__After_SecondaryFiltering( projectSearchIds: Array<number> )
        : ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result {

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_or_SubSearchId = this._get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_or_SubSearchId_For_RatiosDenominator_For_ProjectSearchIds_or_SubSearchIds__Filtered()

        //  Convert to PSM Count Map for result

        const psmCount_Map_Key_ProjectSearchId_or_SubSearchId: Map<number, number> = new Map()

        for ( const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry of psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_or_SubSearchId ) {

            const projectSearchId_or_SubSearchId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 0 ]

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 1 ]

            psmCount_Map_Key_ProjectSearchId_or_SubSearchId.set( projectSearchId_or_SubSearchId, psmTblData_Map_Key_PsmId.size )
        }

        return { psmCount_Map_Key_ProjectSearchId_or_SubSearchId }
    }


    ////////////////////

    /////   Scan Numbers and Search Scan File Id

    /**
     *
     * @param projectSearchIds
     */
    get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>
    } {
         if ( this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_visualization_DisplayTab()
             === ModViewPage_DataVizOptions_VizSelections_PageStateManager__VISUALIZATION_DISPLAY_TAB_Values_Enum.HEATMAP
             && this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant_Ratios_Use_SecondaryFilteringResultForDenominator() ) {

            //  EARLY RETURN
            return this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__YES__After_SecondaryFiltering( projectSearchIds )
        }

        if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            if ( projectSearchIds.length !== 1 ) {
                const msg = "if ( this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {  AND if ( projectSearchIds.length !== 1 ) {"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = projectSearchIds[ 0 ]

            return this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchId )
        }

        return this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__NOT__After_SecondaryFiltering( projectSearchIds )
    }

    /**
     * NOT Filtered - YES Search Sub Groups
     *
     * @param projectSearchId
     */
    _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering( projectSearchId: number )
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>
    } {

        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        let searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder

        const promises: Array<Promise<void>> = []

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder

            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {

                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }
        {
            const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch();

            if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data ) {

                searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID_Holder

            } else if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.then(value => { try {

                        searchSubGroupId_ForPSM_ID_Holder = value.searchSubGroupId_ForPSM_ID_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error( "get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result no 'data' or 'promise" )
            }
        }

        if ( promises.length === 0 ) {

            const result = this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData({
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
            })

            return { promise: undefined, data: result }  // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>( ( resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    const result = this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData({
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
                    })

                    resolve( result )

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * NOT Filtered - YES Search Sub Groups  --   AFTER Get Data
     *
     * @param psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
     * @param searchSubGroupId_ForPSM_ID_Holder
     */
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__For_ProjectSearchIds_YES_SearchSubGroups__NOT_After_SecondaryFiltering__AFTER_GetData(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID_Holder
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
        }
    ) : ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result {

        const _SearchScanFileId_Value_ForWhen_NullOrUndefined = -999999

        const scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId: Map<number, Map<number, Set<number>>> = new Map()

        for ( const psmTblData of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_Entries_IterableIterator() ) {

            const searchSubGroupId = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psmTblData.psmId )
            if ( searchSubGroupId === undefined ) {
                const msg = "searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psmTblData.psmId ) returned NOTHING for psmTblData.psmId: " + psmTblData.psmId
                console.warn(msg)
                throw Error(msg)
            }


            let searchSubGroupId_PassesFilter = false

            if ( this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {

                searchSubGroupId_PassesFilter = false
            } else {

                const selectedSearchSubGroupIds = this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds() // Undefined if all are selected, to minimize storage needs
                if ( ( ! selectedSearchSubGroupIds ) || selectedSearchSubGroupIds.has( searchSubGroupId ) ) {

                    searchSubGroupId_PassesFilter = true
                }
            }

            if ( searchSubGroupId_PassesFilter ) {

                let scanNumber_Set_Map_Key_SearchScanFileId = scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId.get( searchSubGroupId )
                if ( ! scanNumber_Set_Map_Key_SearchScanFileId ) {
                    scanNumber_Set_Map_Key_SearchScanFileId = new Map()
                    scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId.set( searchSubGroupId, scanNumber_Set_Map_Key_SearchScanFileId )
                }

                let searchScanFileId = psmTblData.searchScanFileId
                if ( searchScanFileId === null || searchScanFileId === undefined ) {
                    searchScanFileId = _SearchScanFileId_Value_ForWhen_NullOrUndefined // Override so not use null or undefined as Map key
                }

                let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId )
                if ( ! scanNumber_Set ) {
                    scanNumber_Set = new Set()
                    scanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId, scanNumber_Set )
                }
                scanNumber_Set.add( psmTblData.scanNumber )
            }
        }

        const scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: Map<number, number> = new Map()

        for ( const scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId__MapEntry of scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId.entries() ) {

            const searchSubGroupId = scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId__MapEntry[ 0 ]

            const scanNumber_Set_Map_Key_SearchScanFileId = scanNumber_Set_Map_Key_SearchScanFileId_Map_Key_SearchSubGroupId__MapEntry[ 1 ]

            //  Sum SearchScanFileId / ScanNumber Pairs

            let scanNumber_SearchScanFileId_Pair_Unique_Count = 0

            for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                scanNumber_SearchScanFileId_Pair_Unique_Count += scanNumber_Set.size
            }

            scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.set( searchSubGroupId, scanNumber_SearchScanFileId_Pair_Unique_Count )
        }

        const result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result = {
            scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId
        }

        return result
    }

    /**
     * NOT Filtered
     *
     * @param projectSearchIds
     */
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__NOT__After_SecondaryFiltering( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>
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

            return { promise: undefined, data: { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId } } // EARLY RETURN
        }

        const promisesAll  = Promise.all( promises )

        return {
            data: undefined,
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>( ( resolve, reject) => { try {

                promisesAll.catch( reason => reject(reason))
                promisesAll.then(novalue => { try {

                    resolve( { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * YES Filtered
     *
     * @param projectSearchIds
     */
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds__YES__After_SecondaryFiltering( projectSearchIds: Array<number>)
        : {
        data: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
        promise: Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>
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

            const result = this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
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
            promise: new Promise<ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result>(
                (resolve, reject) => { try {

                    promisesAll.catch(reason => reject(reason))
                    promisesAll.then(novalue => { try {

                        const result = this._get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData({
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
    private _get_ScanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_For_ProjectSearchIds__AfterLoadData(
        {
            projectSearchIds, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
        } : {
            projectSearchIds: Array<number>
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
        }
    ) : ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result {

        //   Compute Total Unique scanNumber/SearchScanFileId pair per projectSearchId_Or_SubSearchId

        //   Computed for ALL PSMs that pass the PSM/Peptide filters at the top of the page AND filters in 'Click to Hide Filters and Options'

        let processing_SubSearches = false
        let projectSearchId_For_SubSearchProcessing_GetFromPsmHolder: number = undefined

        {
            const searchGroups = this._all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

            if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                processing_SubSearches = true

                if ( projectSearchIds.length !== 1 ) {
                    const msg = "if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND if ( projectSearchIds.length !== 1 ) {"
                    console.warn(msg)
                    throw Error(msg)
                }

                projectSearchId_For_SubSearchProcessing_GetFromPsmHolder = projectSearchIds[ 0 ]
            }
        }

        const scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: Map<number, number> = new Map()

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId = this._get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_or_SubSearchId_For_RatiosDenominator_For_ProjectSearchIds_or_SubSearchIds__Filtered()

        for ( const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry of psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId ) {

            const projectSearchId_or_SubSearchId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 0 ]

            const psmTblData_Map_Key_PsmId = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_MapEntry[ 1 ]


            let projectSearchId_For_GetFromPsmHolder = projectSearchId_or_SubSearchId

            if ( processing_SubSearches ) {
                projectSearchId_For_GetFromPsmHolder = projectSearchId_For_SubSearchProcessing_GetFromPsmHolder
            }

            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId_For_GetFromPsmHolder )
            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId_For_GetFromPsmHolder ) returned NOTHING for projectSearchId_For_GetFromPsmHolder: " + projectSearchId_For_GetFromPsmHolder )
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

            scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.set( projectSearchId_or_SubSearchId, scanNumber_SearchScanFileId_Pair_Unique_Count )
        }

        return { scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId }
    }

    /**
     * YES Filtered
     *
     * @private
     */
    private _get_psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_or_SubSearchId_For_RatiosDenominator_For_ProjectSearchIds_or_SubSearchIds__Filtered() {

        const psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

        // Process data under all mod masses that passed all filters to reach this point

        for ( const data_For_ModMass of this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_Data_For_ModMasses_AllEntries() ) {

            for ( const  data_For_ModMass_Entry of data_For_ModMass.get_All() ) {

                let psmTblData_Map_Key_PsmId_Map = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.get( data_For_ModMass_Entry.projectSearchId_Or_SubSearchId )
                if ( ! psmTblData_Map_Key_PsmId_Map ) {
                    psmTblData_Map_Key_PsmId_Map = new Map()
                    psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.set( data_For_ModMass_Entry.projectSearchId_Or_SubSearchId, psmTblData_Map_Key_PsmId_Map )
                }

                for ( const dataFor_SinglePsm of data_For_ModMass_Entry.get_DataFor_SinglePsm_All() ) {

                    psmTblData_Map_Key_PsmId_Map.set( dataFor_SinglePsm.psmTblData.psmId, dataFor_SinglePsm.psmTblData )
                }
            }
        }

        //  Add in values for "Unmodified PSMs" including PSMs where had open modifications but the open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked (checked by default)

        //  Since 'open modifications rounded to zero and "Treat Mass 0 As Unmodified:" is checked' are treated as unmodified, whether or not they are unlocalized is ignored re-guarding filtering "Exclude unlocalized mods:"

        for (
            const psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId__MapEntry of
            this._modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId()
            ) {

            const projectSearchId_Or_SubSearchId = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId__MapEntry[ 0 ]
            const psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId__MapEntry[ 1 ]

            let psmTblData_Map_Key_PsmId_Map = psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( ! psmTblData_Map_Key_PsmId_Map ) {
                psmTblData_Map_Key_PsmId_Map = new Map()
                psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, psmTblData_Map_Key_PsmId_Map )
            }

            for ( const psmTblData_With_NO_Modifications of psmTblData_With_NO_Modifications_Map_Key_PsmId_With_NO_Modifications_Map.values() ) {

                psmTblData_Map_Key_PsmId_Map.set( psmTblData_With_NO_Modifications.psmId, psmTblData_With_NO_Modifications )
            }
        }

        return psmTblData_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId
    }


}


export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result {

    psmCount_Map_Key_ProjectSearchId_or_SubSearchId: ReadonlyMap<number, number>
}

export class ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result {

    scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId: ReadonlyMap<number, number>
}
