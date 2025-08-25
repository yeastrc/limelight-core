/**
 * modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable.ts
 *
 */

import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm,
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    ModPage_QValueCalculator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_QValueCalculator";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls
} from "page_js/common_all_pages/external_libraries_without_typescript_definition__calls/jstat_ExternalLibrary_Without_TypescriptDefinition_Calls";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";

///////////////////


//    Search this file for:   MAIN exported function



export enum ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum {
    ProjectSearchId = "ProjectSearchId",
    SubSearchId = "SubSearchId"
}

export class ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root {

    readonly projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum

    private _dataEntry_SingleModMass__Map_Key_ModMass: Map<number, ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass> = new Map()

    private _modMassValues_Set: Set<number>
    private _modMassValues_OrderedArray: Array<number>

    /**
     * Copied from ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
     */
    private _psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId : ReadonlyMap<number, ReadonlyMap<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>

    constructor(
        {
            projectSearchId_Or_SubSearchId_Enum,
            psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId
        } : {
            projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum
            psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId : ReadonlyMap<number, ReadonlyMap<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>
        }) { try {

        this.projectSearchId_Or_SubSearchId_Enum = projectSearchId_Or_SubSearchId_Enum

        //  All Down Stream uses of this._psmIds_With_NO_Modifications_Set_Map_Key_ProjectSearchId have to change as well

        this._psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId = psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     * Get the whole result in "Readonly" form
     */
    get_psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId() : ReadonlyMap<number, ReadonlyMap<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> {
        return this._psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass ) {

        //  Clear cached values
        this._modMassValues_Set = undefined
        this._modMassValues_OrderedArray = undefined

        this._dataEntry_SingleModMass__Map_Key_ModMass.set( entry.modMass, entry )
    }

    /**
     *
     */
    get_Data_AllValues() {
        return this._dataEntry_SingleModMass__Map_Key_ModMass.values()
    }

    /**
     *
     * @param modMass
     *
     * @returns undefined if modMass Not found
     */
    get_Data_For_ModMass(modMass: number) {
        return this._dataEntry_SingleModMass__Map_Key_ModMass.get(modMass)
    }

    /**
     *
     */
    get_ModMass_Values_Set() : ReadonlySet<number> {

        if ( ! this._modMassValues_Set ) {

            this._modMassValues_Set = new Set( this._dataEntry_SingleModMass__Map_Key_ModMass.keys() )
        }

        return this._modMassValues_Set
    }

    /**
     *
     */
    get_ModMass_Values_OrderedArray() : ReadonlyArray<number> {

        if ( ! this._modMassValues_OrderedArray ) {

            this._modMassValues_OrderedArray = Array.from( this.get_ModMass_Values_Set().keys() )
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( this._modMassValues_OrderedArray )
        }

        return this._modMassValues_OrderedArray
    }
}

export class ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass {

    readonly modMass: number
    readonly modifiedResidues: ReadonlySet<string>
    private _dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId>

    constructor(
        {
            modMass, modifiedResidues
        } : {
            modMass: number
            modifiedResidues: Set<string>
        }
    ) {
        this.modMass = modMass
        this.modifiedResidues = modifiedResidues
        this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId = new Map()
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId ) {

        this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId.set( entry.projectSearchId_Or_SubSearchId, entry )
    }

    /**
     *
     */
    get_Data_AllValues() {

        return this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId.values()
    }

    /**
     *
     * @param projectSearchId_Or_SubSearchId - SubSearchId IF Single Search with Sub Groups OTHERWISE ProjectSearchId
     */
    get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId: number ) {

        return this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
    }

}

export class ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId {

    readonly projectSearchId_Or_SubSearchId: number

    readonly projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum

    readonly projectSearchId_ForUseWhereRequire_projectSearchId: number

    readonly modifiedResidues: ReadonlySet<string>

    /**
     * Display Value for Mod Page Top Level table showing Mod Masses as chosen by user based on "Transform"
     */
    private _topLevelTable_DisplayValue: number

    private _dataFor_SinglePsm_Map_Key_PsmId: Map<number, ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm>

    constructor(
        {
            projectSearchId_Or_SubSearchId,
            projectSearchId_Or_SubSearchId_Enum,
            projectSearchId_ForUseWhereRequire_projectSearchId,
            modifiedResidues,
            topLevelTable_DisplayValue,
            psmData_Entries_Iterator
        } : {
            projectSearchId_Or_SubSearchId: number
            projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum
            projectSearchId_ForUseWhereRequire_projectSearchId: number
            modifiedResidues: Set<string>

            topLevelTable_DisplayValue: number
            psmData_Entries_Iterator: IterableIterator<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm>
        }
    ) {
        this.projectSearchId_Or_SubSearchId = projectSearchId_Or_SubSearchId
        this.projectSearchId_Or_SubSearchId_Enum = projectSearchId_Or_SubSearchId_Enum
        this.projectSearchId_ForUseWhereRequire_projectSearchId = projectSearchId_ForUseWhereRequire_projectSearchId
        this.modifiedResidues = modifiedResidues

        this._topLevelTable_DisplayValue = topLevelTable_DisplayValue

        this._dataFor_SinglePsm_Map_Key_PsmId = new Map()

        for ( const modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm of psmData_Entries_Iterator ) {

            const data_ForSingle_Psm = new ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm( {
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm
            } )

            this._dataFor_SinglePsm_Map_Key_PsmId.set( data_ForSingle_Psm.psmId, data_ForSingle_Psm )
        }
    }

    get topLevelTable_DisplayValue() {
        return this._topLevelTable_DisplayValue
    }

    INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue: number ) {
        this._topLevelTable_DisplayValue = topLevelTable_DisplayValue
    }

    // /**
    //  * !!  INTERNAL ONLY to the code file for this class
    //  *
    //  * @param entry
    //  */
    // INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm ) {
    //
    //     this._dataFor_SinglePsm_Map_Key_PsmId.set( entry.psmId, entry )
    // }

    get_PsmIdCount() {
        return this._dataFor_SinglePsm_Map_Key_PsmId.size
    }

    get_PsmIds() {
        return this._dataFor_SinglePsm_Map_Key_PsmId.keys()
    }

    get_DataFor_SinglePsm_For_PsmId( psmId: number ) {
        return this._dataFor_SinglePsm_Map_Key_PsmId.get(psmId)
    }

    get_DataFor_SinglePsm_All() {
        return this._dataFor_SinglePsm_Map_Key_PsmId.values()
    }
}

export class ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm {

    readonly psmId: number
    readonly modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm

    constructor(
        {
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm
        }: {
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm
        }
    ) {
        this.psmId = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmId
        this.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm
    }
}


///////////////////

///  !!!!!!!!   MAIN exported function

/**
 *
 * @param override_UserInput_For_PsmQuant_ToUse_Counts_Boolean
 * @param override_UserInput_For_DataTransformation_ToUse_NONE_Boolean
 * @param modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
 */
export const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable = function (
    {
        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean, // Ignore UserInput For PsmQuant and use Counts

        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,  // Ignore UserInput  For DataTransformation and use None

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass  // Used for Ratios
    } : {
        /**
         * Ignore UserInput  For PsmQuant and use Counts
         */
        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: boolean

        /**
         * Ignore UserInput  For DataTransformation and use None
         */
        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: boolean

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    }
): {
    data: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    promise: Promise<ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root>
} {

    if ( ( ! override_UserInput_For_PsmQuant_ToUse_Counts_Boolean )
        && ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ) ) {

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSM Quant is Ratio AND QuantType is PSMs.  Need Total PSM Count per Project SearchId

            let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result

            const promises: Array<Promise<void>> = []

            {
                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                const getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result =
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds )

                if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data ) {
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data
                } else if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.then(value => { try {
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = value
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push( promise )
                } else {
                    throw Error("getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result no 'data' or 'promise'")
                }
            }

            if ( promises.length === 0 ) {

                //  EARLY RETURN
                return { promise: undefined, data: _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData({
                        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean,
                        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,
                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: undefined
                    })}
            }

            const promisesAll = Promise.all(promises)

            return { data: undefined, promise: new Promise<ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root>((resolve, reject) => { try {
                    promisesAll.catch(reason => reject(reason))
                    promisesAll.then(novalue => { try {

                        const result = _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData({
                            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean,
                            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,
                            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: undefined
                        })
                        resolve(result)

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})}

        } else if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  PSM Quant is Ratio AND QuantType is Scans.  Need Total Scan Count per Project SearchId for computing Total Count of: Scan Number / Search Scan File Id Pair Count

            let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result

            const promises: Array<Promise<void>> = []

            {
                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                const getScanCount_For_ProjectSearchIds_Result =
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds )

                if ( getScanCount_For_ProjectSearchIds_Result.data ) {
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = getScanCount_For_ProjectSearchIds_Result.data
                } else if ( getScanCount_For_ProjectSearchIds_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        getScanCount_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                        getScanCount_For_ProjectSearchIds_Result.promise.then(value => { try {
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = value
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push( promise )
                } else {
                    throw Error("getScanCount_For_ProjectSearchIds_Result no 'data' or 'promise'")
                }
            }

            if ( promises.length === 0 ) {

                //  EARLY RETURN
                return { promise: undefined, data: _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData({
                        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean,
                        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,
                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: undefined
                    })}
            }

            const promisesAll = Promise.all(promises)

            return { data: undefined, promise: new Promise<ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root>((resolve, reject) => { try {
                    promisesAll.catch(reason => reject(reason))
                    promisesAll.then(novalue => { try {

                        const result = _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData({
                            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean,
                            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,
                            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: undefined
                        })
                        resolve(result)

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})}

        }
    } else {

        return { promise: undefined, data: _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData({
                override_UserInput_For_PsmQuant_ToUse_Counts_Boolean,
                override_UserInput_For_DataTransformation_ToUse_NONE_Boolean,
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
                all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: undefined,  //  NOT 'PSM Quant is Ratio'
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: undefined  //  NOT 'PSM Quant is Ratio'
            })}
    }
}

///////////////////////

const _modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_AfterLoadData = function (
    {
        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean, // Ignore UserInput_For_PsmQuant and use Counts

        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean, // Ignore UserInput  For DataTransformation and use None

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,  //  undefined if NOT ( 'QuantType is Ratio' and 'scans'
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result  //  undefined if NOT ( 'QuantType is Ratio' and 'scans'
    } : {
        /**
         * Ignore UserInput  For PsmQuant and use Counts
         */
        override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: boolean

        /**
         * Ignore UserInput  For DataTransformation and use None
         */
        override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: boolean


        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
    }
) : ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root {

    let projectSearchId_Or_SubSearchId_Enum = ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId
    if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {
        projectSearchId_Or_SubSearchId_Enum = ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId
    }

    const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = new ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
        projectSearchId_Or_SubSearchId_Enum,
        psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId: modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId()
    })

    _create_MainDisplayValues_BasedOn_PSM_Count_For_Input_Root({
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        projectSearchId_Or_SubSearchId_Enum,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root  // Updated
    })

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

        //  Scans Quant Type

        _set_from_ScanCount_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
    }

    if ( ( ! override_UserInput_For_PsmQuant_ToUse_Counts_Boolean )
        && ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ) ) {

        //  PSM Quant is Ratio

        _set_To_Ratio_OfTotal_For_SearchOrSubSearch_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
        })
    }

    {
        const dataTransformation_UserSelection = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation()

        if ( ( ! override_UserInput_For_DataTransformation_ToUse_NONE_Boolean )
            && dataTransformation_UserSelection !== undefined && dataTransformation_UserSelection !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {

            //  Transformations selection other than 'none'

            switch ( dataTransformation_UserSelection ) {

                case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.per_mod_zscore:
                    _set_PerModZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
                    break

                case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_zscore:
                    _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
                    break

                case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_pvalue_bonf:
                    _set_GlobalPValue_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
                    break

                case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.scaled_mean_diff:
                    _set_ScaledMeanDiff_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
                    break

                case ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.global_qvalue_bh:
                    _set_GlobalQValue_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root )
                    break
            }
        }
    }

    return modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
}



////////////

const _create_MainDisplayValues_BasedOn_PSM_Count_For_Input_Root = function (
    {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        projectSearchId_Or_SubSearchId_Enum,

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root  // Updated
    } : {
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    }
) {

    for ( const dataEntry_SingleModMass of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_All_Values() ) {

        const modMass = dataEntry_SingleModMass.modMass

        const modifiedResidues: Set<string> = new Set()

        for ( const singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId of dataEntry_SingleModMass.get_All() ) {

            for ( const dataFor_SinglePsm of singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {
                if ( dataFor_SinglePsm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                    for ( const peptideResidueLetter of dataFor_SinglePsm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                        modifiedResidues.add( peptideResidueLetter )
                    }
                }
            }
        }

        const output_dataEntry_SingleModMass = new ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass({ modMass, modifiedResidues })
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.INTERNAL_ONLY__AddEntry( output_dataEntry_SingleModMass )

        for ( const singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId of dataEntry_SingleModMass.get_All() ) {

            const modifiedResidues: Set<string> = new Set()  // Computed for projectSearchId_Or_SubSearchId

            for ( const dataFor_SinglePsm of singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {
                if ( dataFor_SinglePsm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                    for ( const peptideResidueLetter of dataFor_SinglePsm.get__allMods_PeptideResidueLetters_At_ModificationPositions() ) {
                        modifiedResidues.add( peptideResidueLetter )
                    }
                }
            }

            // topLevelTable_DisplayValue Initially set to PsmCount

            const output_Data_ForSingle_ProjectSearchId_Or_SubSearchId = new ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ProjectSearchId_Or_SubSearchId({
                projectSearchId_Or_SubSearchId: singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                projectSearchId_Or_SubSearchId_Enum,
                projectSearchId_ForUseWhereRequire_projectSearchId: singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId,
                modifiedResidues,
                topLevelTable_DisplayValue: singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.get_PsmCount(),
                psmData_Entries_Iterator: singleEntry_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All()
            })

            output_dataEntry_SingleModMass.INTERNAL_ONLY__AddEntry( output_Data_ForSingle_ProjectSearchId_Or_SubSearchId )
        }
    }
}


/**
 * Using Scan Count
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 *
 */
const _set_from_ScanCount_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (  modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    const SEARCH_SCAN_FILE_ID_NOT_POPULATED__VALUE_FOR_MAP_KEY = -999999999999;

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            const scanNumber_Set_Map_Key_SearchScanFileId: Map<number, Set<number>> = new Map()

            for ( const dataFor_SinglePsm of data_ForSingle_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_All() ) {

                const psmTblData = dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData

                const scanNumber = psmTblData.scanNumber
                let searchScanFileId = psmTblData.searchScanFileId
                if ( searchScanFileId === undefined || searchScanFileId === null ) {
                    searchScanFileId = SEARCH_SCAN_FILE_ID_NOT_POPULATED__VALUE_FOR_MAP_KEY
                }

                let scanNumber_Set = scanNumber_Set_Map_Key_SearchScanFileId.get( searchScanFileId )
                if ( ! scanNumber_Set ) {
                    scanNumber_Set = new Set()
                    scanNumber_Set_Map_Key_SearchScanFileId.set( searchScanFileId, scanNumber_Set )
                }
                scanNumber_Set.add( scanNumber )
            }

            let scanNumber_SearchScanFileId_Pair_Count = 0;

            for ( const scanNumber_Set of scanNumber_Set_Map_Key_SearchScanFileId.values() ) {
                scanNumber_SearchScanFileId_Pair_Count += scanNumber_Set.size
            }

            const topLevelTable_DisplayValue = scanNumber_SearchScanFileId_Pair_Count

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue )
        }
    }
}

/**
 * Ratio
 *
 *
 * Change topLevelTable_DisplayValue to a fraction of the values for topLevelTable_DisplayValue for a given projectSearchId or subSearchId
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 *
 */
const _set_To_Ratio_OfTotal_For_SearchOrSubSearch_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result, //  Used for Ratios

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
    }) {

    //    WARNING:   This code assumes that the VALUE in "data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue"

    //       is the correct PSM COUNT  or  SCAN COUNT
    //
    //       when this function starts processing


    ///  Compute Total Summed Value

    const totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, number> = new Map()


    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

        //  PSM Quant Type

        //   Computed for ALL PSMs that pass the PSM/Peptide filters at the top of the page AND filters in 'Click to Hide Filters and Options'

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            {  //  Validate only 1 search

                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                if ( projectSearchIds.length !== 1 ) {
                    const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
                    console.warn( msg )
                    throw Error( msg )
                }
            }

            for ( const mapEntry of modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId_or_SubSearchId.entries() ) {

                const mapKey = mapEntry[ 0 ]
                const mapValue = mapEntry[ 1 ]

                totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.set( mapKey, mapValue )
            }

        } else {

            for ( const projectSearchId of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() ) {

                const psmCount_For__ProjectSearchId = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId )
                if ( psmCount_For__ProjectSearchId === undefined || psmCount_For__ProjectSearchId === null ) {
                    throw Error( "= modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId, psmCount_For__ProjectSearchId )
            }
        }

    } else if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

        //  Scans Quant Type

        if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
            throw Error("_set_To_Ratio_OfTotal_For_SearchOrSubSearch_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root(...): 'PSM Quant is Ratio' AND 'QuantType is Scans': ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.ratios ) AND ( !  psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) AND ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) ")
        }

        //   Compute Total Unique scanNumber/SearchScanFileId pair per projectSearchId_Or_SubSearchId

        //   Computed for ALL PSMs that pass the PSM/Peptide filters at the top of the page AND filters in 'Click to Hide Filters and Options'

        if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum ===
            ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

            {  //  Validate only 1 search

                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                if ( projectSearchIds.length !== 1 ) {
                    const msg = "if ( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
                    console.warn( msg )
                    throw Error( msg )
                }
            }

            for ( const mapEntry of modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.entries() ) {

                const mapKey = mapEntry[ 0 ]
                const mapValue = mapEntry[ 1 ]

                totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.set( mapKey, mapValue )
            }

        } else {

            for ( const projectSearchId of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() ) {

                const scanNumber_SearchScanFileId_Pair_Unique_Count = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId )
                if ( scanNumber_SearchScanFileId_Pair_Unique_Count === undefined || scanNumber_SearchScanFileId_Pair_Unique_Count === null ) {
                    throw Error( "modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId, scanNumber_SearchScanFileId_Pair_Unique_Count )
            }
        }

    } else {
        throw Error("modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() IS NOT ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms OR ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans")
    }

    ///  Compute and Set Ratio/Fraction

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            const topLevelTable_DisplayValue_Existing = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            const projectSearchId_Or_SubSearchId = data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId

            const totalSummed_PsmCount_Or_ScanCount = totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
            if ( totalSummed_PsmCount_Or_ScanCount === undefined || totalSummed_PsmCount_Or_ScanCount === null ) {
                throw Error("totalSummed_PsmCount_Or_ScanCount__Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId ) returned undefined or null for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId +
                    ", _set_To_Ratio_OfTotal_For_SearchOrSubSearch_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root(...): in second loop for 'Compute and Set Ratio/Fraction'"
                )
            }

            const topLevelTable_DisplayValue_NEW = topLevelTable_DisplayValue_Existing / totalSummed_PsmCount_Or_ScanCount

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue_NEW )
        }
    }
}


/**
 * Per Mod ZScore
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 *
 * was ModViewDataVizRenderer_MultiSearch._convertModMapToPerModZScore
 */
const _set_PerModZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (  modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        const mean = _getMeanForModMass({modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass});
        const standardDeviation = _getStandardDeviationForModMass({ modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass, mean });

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            const topLevelTable_DisplayValue = _getZScoreForModMassProjectSearchId({
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                modMass,
                mean,
                standardDeviation,
                projectSearchId_Or_SubSearchId: data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
            })

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue )
        }
    }
}


/**
 * GlobalZScore
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 *
 * was ModViewDataVizRenderer_MultiSearch._convertModMapToGlobalZScore
 */
const _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function (  modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    const globalMean = _getGlobalMean( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root );
    const globalStandardDeviation = _getGlobalStandardDeviation( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, globalMean );

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            const topLevelTable_DisplayValue = _getZScoreForModMassProjectSearchId({
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                modMass,
                mean: globalMean,
                standardDeviation: globalStandardDeviation,
                projectSearchId_Or_SubSearchId: data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
            })

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue )
        }
    }
}


/**
 * Get Bonferroni corrected p-values from global zscores
 *
 * was ModViewDataVizRenderer_MultiSearch._convertModMapToGlobalPValue
 */
const _set_GlobalPValue_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root) {

    _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root );

    let numTests = 0;

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            //  topLevelTable_DisplayValue set in call to _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

            const topLevelTable_DisplayValue_OLD = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            const topLevelTable_DisplayValue_New = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_ztest( topLevelTable_DisplayValue_OLD, 2)

            numTests++;

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue_New )
        }
    }

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        // const modMass = data_For_ModMass.modMass

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            //  topLevelTable_DisplayValue set in above loop

            const topLevelTable_DisplayValue_OLD = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            const correctedPvalue = (topLevelTable_DisplayValue_OLD * numTests) > 1 ? 1 : (topLevelTable_DisplayValue_OLD * numTests);

            const topLevelTable_DisplayValue_New = correctedPvalue

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue_New )
        }
    }
}

/**
 * ScaledMeanDiff
 *
 * WAS ModViewDataVizRenderer_MultiSearch._convertModMapToPerModScaledMeanDelta
 */
const  _set_ScaledMeanDiff_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        const mean = _getMeanForModMass({modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass});

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            // for (const [projectSearchId, count] of searchCountMap) {

            const topLevelTable_DisplayValue = _getScaledMeanDelta({
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass, mean, projectSearchId_Or_SubSearchId: data_ForSingle_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
            })

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue )
        }
    }
}


/**
 * GlobalQValue
 *
 * Get Benjamini-Hochberg q-values from global zscores
 *
 * was ModViewDataVizRenderer_MultiSearch._convertModMapToGlobalQValue
 */
const _set_GlobalQValue_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root = function ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root );

    const pValueArray = new Array<number>();

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            //  topLevelTable_DisplayValue set in call to _set_GlobalZScore_In_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

            const topLevelTable_DisplayValue_OLD = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            const pvalue = Jstat_ExternalLibrary_Without_TypescriptDefinition_Calls.call_jStat_ztest( topLevelTable_DisplayValue_OLD, 2 );

            const topLevelTable_DisplayValue_New = pvalue

            pValueArray.push( pvalue )

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue_New )
        }
    }

    const qvalueCalculator = new ModPage_QValueCalculator({ pValueArray });

    for ( const data_For_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        const modMass = data_For_ModMass.modMass

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

            //  topLevelTable_DisplayValue set in above loop

            const topLevelTable_DisplayValue_OLD = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

            const pvalue = topLevelTable_DisplayValue_OLD

            const topLevelTable_DisplayValue_New = qvalueCalculator.getQvalueForPValue(pvalue)

            data_ForSingle_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__Set_topLevelTable_DisplayValue( topLevelTable_DisplayValue_New )
        }
    }
}


const _getZScoreForModMassProjectSearchId = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass, mean, standardDeviation, projectSearchId_Or_SubSearchId
    }: {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modMass: number
        mean: number
        standardDeviation: number
        projectSearchId_Or_SubSearchId: number
    }) {

    const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )

    if ( ! data_For_ModMass ) {
        return 0;
    }

    const data_ForSingle_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId )

    if ( ! data_ForSingle_ProjectSearchId_Or_SubSearchId ) {
        return 0;
    }

    const count = data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue

    return (count - mean) / standardDeviation;
}


const _getGlobalMean = function ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

    let n = 0;
    let sum = 0;

    for ( const data_ForSingle_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_ForSingle_ModMass.get_Data_AllValues() ) {

            sum += data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
            n++
        }
    }

    return (n > 0 ? sum / n : 0);
}

/**
 *
 * @param modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
 * @param mean
 */
const _getGlobalStandardDeviation = function ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, mean: number) {

    let n = 0;
    let sum = 0;

    for ( const data_ForSingle_ModMass of modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_AllValues() ) {

        for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_ForSingle_ModMass.get_Data_AllValues() ) {

            sum += ( data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue - mean ) ** 2
            n++
        }
    }

    if ( n === 0 ) {
        return 0;
    }

    sum = sum / n;
    return Math.sqrt(sum);
}

const _getStandardDeviationForModMass = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass, mean
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modMass: number
        mean: number
    }) {

    const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass(modMass);

    if ( ! data_For_ModMass ) {
        return 0  // EARLY RETURN
    }

    let sum = 0;
    let count_ProjectSearchId_Or_SubSearchId = 0

    for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

        sum += ( data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue- mean) ** 2;
        count_ProjectSearchId_Or_SubSearchId++
    }

    sum = sum / count_ProjectSearchId_Or_SubSearchId;
    return Math.sqrt(sum);
}


const _getScaledMeanDelta = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass, mean, projectSearchId_Or_SubSearchId
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modMass: number
        mean: number
        projectSearchId_Or_SubSearchId: number
    }) {

    const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass );

    if ( ! data_For_ModMass ) {
        return 0  // EARLY RETURN
    }

    const data_For_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId_Or_SubSearchId )

    if ( ! data_For_ProjectSearchId_Or_SubSearchId ) {
        return 0  // EARLY RETURN
    }

    const count = data_For_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
    return (count - mean) / mean
}


const _getMeanForModMass = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root, modMass
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modMass: number
    }) {

    const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass );

    if ( ! data_For_ModMass ) {
        return 0  // EARLY RETURN
    }

    let sum_PsmCount = 0
    let count_ProjectSearchId_Or_SubSearchId = 0

    for ( const data_ForSingle_ProjectSearchId_Or_SubSearchId of data_For_ModMass.get_Data_AllValues() ) {

        sum_PsmCount += data_ForSingle_ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
        count_ProjectSearchId_Or_SubSearchId++
    }

    return sum_PsmCount / count_ProjectSearchId_Or_SubSearchId;
}
