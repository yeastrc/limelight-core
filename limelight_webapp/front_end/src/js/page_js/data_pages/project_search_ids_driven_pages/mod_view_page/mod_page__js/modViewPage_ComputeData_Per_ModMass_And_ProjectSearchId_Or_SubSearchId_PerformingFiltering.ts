/**
 * modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering.ts
 *
 * compute Mod Masses per PsmId
 *
 */


import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {
    DataPage_common_Flags_SingleSearch
} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    modPage_ModMass_Rounding_UTIL
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_mod_mass_rounding_UTIL/modPage_ModMass_Rounding_UTIL";
import {
    ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    searchSubGroup_Get_Selected_SearchSubGroupIds
} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {
    SearchSubGroup_CentralStateManagerObjectClass
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";


///////////////////////


///  Search this file for the string:   MAIN exported function


export enum ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum {
    ProjectSearchId = "ProjectSearchId",
    SubSearchId = "SubSearchId"
}

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_UI_Selections_UsedForCreation {

    /**
     * Value for modViewPage_DataVizOptions_VizSelections_PageStateManager.get_excludeUnlocalizedOpenMods() used to create this result
     */
    readonly excludeUnlocalizedOpenMods_UI_Selection: boolean

    /**
     * Value for modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin() used to create this result
     */
    readonly modMassCutoffMin: number

    /**
     * Value for modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax() used to create this result
     */
    readonly modMassCutoffMax: number
}

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root {

    /**
     * Value used from modViewPage_DataVizOptions_VizSelections_PageStateManager to create this result
     */
    readonly ui_Selections_Used_ForCreation: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_UI_Selections_UsedForCreation

    readonly projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum

    private _dataEntry_SingleModMass__Map_Key_ModMass: Map<number, ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ModMass> = new Map()

    /**
     * A place to save "Unmodified" PSM IDs since need them in the denominator for "Filtered ZScore" and "Filtered P-Value";
     *
     * TODO  Update for SubSearchId when split on that
     */
    private _psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

    //  Following are derived from this._dataEntry_SingleModMass__Map_Key_ModMass

    private _modMassValues_Set: Set<number>
    private _modMassValues_OrderedArray: Array<number>

    private _projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set: Set<number>
    private _projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set: Set<number>


    constructor(
        {
            ui_Selections_Used_ForCreation, projectSearchId_Or_SubSearchId_Enum
        } : {
            ui_Selections_Used_ForCreation: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_UI_Selections_UsedForCreation
            projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum
        }) {
        this.ui_Selections_Used_ForCreation = ui_Selections_Used_ForCreation
        this.projectSearchId_Or_SubSearchId_Enum = projectSearchId_Or_SubSearchId_Enum
    }

    /**
     *
     */
    is_ContainsAnyData() {
        if ( this._dataEntry_SingleModMass__Map_Key_ModMass.size > 0 ) {
            return true
        }
        return false

        //  Data in this._psmIds_With_NO_Modifications_Set_Map_Key_ProjectSearchId does NOT count
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     */
    INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId_Or_SubSearchId(
        {
            psmTblData, projectSearchId_Or_SubSearchId
        } : {
            psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
            projectSearchId_Or_SubSearchId: number
        }
    ) : void {

        let psmTblData_With_NO_Modifications_Map_Key_PsmId_Map = this._psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId )
        if ( ! psmTblData_With_NO_Modifications_Map_Key_PsmId_Map ) {
            psmTblData_With_NO_Modifications_Map_Key_PsmId_Map = new Map()
            this._psmTblData_With_NO_Modifications_Map_Key_PsmId_Map_Key_ProjectSearchId_Or_SubSearchId.set( projectSearchId_Or_SubSearchId, psmTblData_With_NO_Modifications_Map_Key_PsmId_Map )
        }

        psmTblData_With_NO_Modifications_Map_Key_PsmId_Map.set( psmTblData.psmId, psmTblData )
    }

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
    INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ModMass ) {

        //  Clear cached values
        this._modMassValues_Set = undefined
        this._modMassValues_OrderedArray = undefined

        this._dataEntry_SingleModMass__Map_Key_ModMass.set( entry.modMass, entry )

        // the Map in 'entry' is empty when added here so process the map after it is populated

        //  Clear Cached data

        this._projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set = undefined
        this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set = undefined
    }

    get_All_Values() {
        return this._dataEntry_SingleModMass__Map_Key_ModMass.values()
    }

    get_Data_For_ModMasses_AllEntries() {
        return this._dataEntry_SingleModMass__Map_Key_ModMass.values()
    }

    /**
     *
     * @param projectSearchId
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

            this._modMassValues_OrderedArray = Array.from( this.get_ModMass_Values_Set() )
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( this._modMassValues_OrderedArray )
        }

        return this._modMassValues_OrderedArray
    }

    /**
     *
     */
    get_ProjectSearchId_Or_SubSearchId_AcrossAllModMasses() {

        if ( ! this._projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set ) {

            this._projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set = new Set()

            for ( const singleModMass_Entry of this._dataEntry_SingleModMass__Map_Key_ModMass.values() ) {

                for ( const entry_SubPart_For_ProjectSearchId_Or_SubSearchId of singleModMass_Entry.get_All() ) {

                    this._projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set.add( entry_SubPart_For_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId )
                    this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set.add( entry_SubPart_For_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId )
                }
            }
        }

        return this._projectSearchId_Or_SubSearchId_AcrossAllModMasses_Set.values()
    }

    /**
     *
     */
    get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() {

        if ( ! this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set ) {

            this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set = new Set()

            for ( const singleModMass_Entry of this._dataEntry_SingleModMass__Map_Key_ModMass.values() ) {

                for ( const entry_SubPart_For_ProjectSearchId_Or_SubSearchId of singleModMass_Entry.get_All() ) {

                    this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set.add( entry_SubPart_For_ProjectSearchId_Or_SubSearchId.projectSearchId_ForUseWhereRequire_projectSearchId )
                }
            }
        }

        return this._projectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses_Set.values()
    }

}

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ModMass {

    readonly modMass: number
    private _dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId>

    constructor(
        {
            modMass
        } : {
            modMass: number
        }
    ) {
        this.modMass = modMass
        this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId = new Map()
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId ) {

        this._dataEntry_SingleProjectSearchId_Or_SubSearchId__Map_Key_ProjectSearchId_Or_SubSearchId.set( entry.projectSearchId_Or_SubSearchId, entry )
    }

    get_All() {
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

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId {

    readonly projectSearchId_Or_SubSearchId: number
    readonly projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum

    readonly projectSearchId_ForUseWhereRequire_projectSearchId: number

    private _dataFor_SinglePsm_Map_Key_PsmId: Map<number, ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm>

    constructor(
        {
            projectSearchId_Or_SubSearchId, projectSearchId_Or_SubSearchId_Enum, projectSearchId_ForUseWhereRequire_projectSearchId
        } : {
            projectSearchId_Or_SubSearchId: number
            projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum
            projectSearchId_ForUseWhereRequire_projectSearchId: number
        }
    ) {
        this.projectSearchId_Or_SubSearchId = projectSearchId_Or_SubSearchId
        this.projectSearchId_Or_SubSearchId_Enum = projectSearchId_Or_SubSearchId_Enum

        this.projectSearchId_ForUseWhereRequire_projectSearchId = projectSearchId_ForUseWhereRequire_projectSearchId

        this._dataFor_SinglePsm_Map_Key_PsmId = new Map()
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__AddEntry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm ) {

        this._dataFor_SinglePsm_Map_Key_PsmId.set( entry.psmId, entry )
    }

    get_PsmCount() {
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

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm {

    readonly psmId: number
    readonly psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId

    private _psmOpen_ModificationMassPerPSM_ForPsmId_Array: Array<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelOpenModification> = []
    private _psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array: Array<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelVariableModification> = []

    private _variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry: Array<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_Single_ReportedPeptideLevelVariableModification> = []

    readonly variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
    readonly variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    readonly openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

    constructor(
        {
            psmTblData,
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder
        } : {
            psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId

            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
        }
    ) {
        this.psmId = psmTblData.psmId
        this.psmTblData = psmTblData
        this.variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder= variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        this.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        this.openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder
    }


    get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Length() {
        return this._psmOpen_ModificationMassPerPSM_ForPsmId_Array.length
    }
    get__psmOpen_ModificationMassPerPSM_ForPsmId_Array_Entries() {
        return this._psmOpen_ModificationMassPerPSM_ForPsmId_Array.values()
    }

    get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Length() {
        return this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array.length
    }
    get__psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array_Entries() {
        return this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array.values()
    }

    get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Length() {
        return this._variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.length
    }
    get__variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry__Array_Entries() {
        return this._variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.values()
    }


    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__Add_PsmOpenMod_Entry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelOpenModification ) {

        this._psmOpen_ModificationMassPerPSM_ForPsmId_Array.push(entry)
    }

    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__Add_PsmVariableMod_Entry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelVariableModification ) {

        this._psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId_Array.push(entry)
    }
    /**
     * !!  INTERNAL ONLY to the code file for this class
     *
     * @param entry
     */
    INTERNAL_ONLY__Add_ReportedPeptideVariableMod_Entry( entry: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_Single_ReportedPeptideLevelVariableModification ) {

        this._variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.push(entry)
    }
}

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelOpenModification {

    /**
     *    Round again here since may round to different value from whole number
     */
    readonly modMass_Rounded_ForModPage_Processing: number

    readonly psmId: number
    readonly psmOpenModificationForPsmId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_PsmId
}

export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_SinglePsmLevelVariableModification {

    /**
     *    Round again here since may round to different value from whole number
     */
    readonly modMass_Rounded_ForModPage_Processing: number

    readonly psmId: number
    readonly psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_PsmId_SingleEntry
}


export class ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm_Single_ReportedPeptideLevelVariableModification {

    /**
     *    Round again here since may round to different value from whole number
     */
    readonly modMass_Rounded_ForModPage_Processing: number

    readonly psmId: number

    readonly variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry:
        { reportedPeptideId: number, position: number, mass: number, is_N_Terminal: boolean, is_C_Terminal: boolean }
}

///////////////////

///  !!!!!!!!   MAIN exported function

/**
 *
 */
export const modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering = function (
    {
        modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass,
        projectSearchIds,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        searchSubGroup_CentralStateManagerObjectClass,
        dataPageStateManager,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass
        projectSearchIds : Array<number>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): {
    data: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
    promise: Promise<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root>
} {
    // console.warn( "NOT processing Sub Searches Yet")

    let singleSearch_WithSubSearches = false

    let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = undefined

    const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()
    const variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder> = new Map()
    const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder> = new Map()
    const openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder> = new Map()
    const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()

    const promises: Array<Promise<void>> = []

    // console.warn( "NOT processing Sub Searches Yet")

    if ( projectSearchIds.length === 1 ) {

        const projectSearchId = projectSearchIds[ 0 ]

        const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root()

        if ( searchSubGroups_Root ) {

            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("( projectSearchIds.length === 1 ) AND ( dataPageStateManager.get_SearchSubGroups_Root() ) AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId )
            }

            singleSearch_WithSubSearches = true

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("' if ( searchSubGroups_Root ) ' AND commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then( value => { try {
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = value.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result No data or promise")
            }
        }
    }

    for ( const projectSearchId of projectSearchIds ) {

        const dataPage_common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId)
        if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId ) {
            throw Error("dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then( value => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result No data or promise")
            }
        }

        if ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) {
            const get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters().
                get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch()
            if ( get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder )
            } else if ( get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result.promise.then( value => { try {
                        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_Variable_Dynamic_Modifications_On_PSMHolder_AllForSearch_Result No data or promise")
            }
        }
        {
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()
            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then( value => { try {
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result No data or promise")
            }
        }

        if ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {

            const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                get_OpenModifications_On_PSMHolder_AllForSearch()
            if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder )
            } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then( value => { try {
                        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result No data or promise")
            }
        }

        if ( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections()
            || proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()
            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch( reason => reject(reason) )
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then( value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result No data or promise")
            }
        }

    }

    if ( promises.length === 0 ) {

        const result = _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering__AfterLoadData({
            modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass,
            projectSearchIds,
            modViewPage_DataVizOptions_VizSelections_PageStateManager,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            searchSubGroup_CentralStateManagerObjectClass,
            dataPageStateManager,

            singleSearch_WithSubSearches,
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
        })

        return { promise: undefined, data: result }
    }

    const promisesAll = Promise.all( promises )

    return { data: undefined, promise: new Promise<ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root>( ( resolve, reject) => { try {

            promisesAll.catch( reason => reject(reason) )
            promisesAll.then( noVlue => { try {

                const result = _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering__AfterLoadData({
                    modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass,
                    projectSearchIds,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                    proteinPositionFilter_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    searchSubGroup_CentralStateManagerObjectClass,
                    dataPageStateManager,

                    singleSearch_WithSubSearches,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })
                resolve( result )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}




const _modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering__AfterLoadData = function (
    {
        modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        searchSubGroup_CentralStateManagerObjectClass,
        projectSearchIds,
        dataPageStateManager,

        singleSearch_WithSubSearches,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass : ModViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass
        projectSearchIds : Array<number>
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
        dataPageStateManager : DataPageStateManager

        singleSearch_WithSubSearches: boolean
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder>
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder>
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
    }
): ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
{
    const ui_Selections_Used_ForCreation : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_UI_Selections_UsedForCreation = {
        excludeUnlocalizedOpenMods_UI_Selection: modViewPage_DataVizOptions_VizSelections_PageStateManager.get_excludeUnlocalizedOpenMods(),
        modMassCutoffMin: modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMin(),
        modMassCutoffMax: modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMassCutoffMax()
    }



    let searchSubGroup_Ids_Selected : Set<number> = undefined;

    // if ( projectSearchIds.length === 1 && dataPageStateManager.get_SearchSubGroups_Root() ) {

    if ( singleSearch_WithSubSearches ) {

        //  Only display for 1 search

        const projectSearchId = projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
            searchSubGroup_CentralStateManagerObjectClass : searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    let projectSearchId_Or_SubSearchId_Enum = ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId
    if ( singleSearch_WithSubSearches ) {
        //  TODO  Single Search with Sub Searches: Process the Sub Searches
        projectSearchId_Or_SubSearchId_Enum = ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId
    }

    const modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root({
        ui_Selections_Used_ForCreation,
        projectSearchId_Or_SubSearchId_Enum
    })

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId)
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId ) {
            // No data so skip
            continue // EARLY CONTINUE
        }

        const dataPage_common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
        if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId ) {
            throw Error( "dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId)
        }

        const variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder = variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        const openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder = undefined
        if ( proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        }

        for ( const reportedPeptideIds_AndTheir_PSM_IDs_Entry of reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs_Entry.reportedPeptideId

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId )

            if ( reportedPeptideIds_AndTheir_PSM_IDs_Entry.psmIds_Include ) {

                for ( const psmId of reportedPeptideIds_AndTheir_PSM_IDs_Entry.psmIds_Include ) {

                    const psmTblData = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId( psmId )
                    if ( ! psmTblData ) {
                        throw Error("( reportedPeptideIds_AndTheir_PSM_IDs_Entry.psmIds_Include ) AND psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId + ", projectSearchId: " + projectSearchId)
                    }

                    _process_SinglePsm({
                        psmTblData,
                        projectSearchId,
                        searchSubGroup_Ids_Selected,
                        ui_Selections_Used_ForCreation,
                        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                        proteinPositionFilter_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root,  //  Updated

                        singleSearch_WithSubSearches,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                        dataPage_common_Flags_SingleSearch_ForProjectSearchId,
                        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                        openModifications_On_PSM_For_MainFilters_Holder,
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                    })
                }

            } else {
                const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId )

                for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {

                    _process_SinglePsm({
                        psmTblData,
                        projectSearchId,
                        searchSubGroup_Ids_Selected,
                        ui_Selections_Used_ForCreation,
                        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                        proteinPositionFilter_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root,  //  Updated

                        singleSearch_WithSubSearches,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                        dataPage_common_Flags_SingleSearch_ForProjectSearchId,
                        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                        openModifications_On_PSM_For_MainFilters_Holder,
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                    })
                }
            }
        }
    }

    // add in zero for missing values
    // assumes if a mod mass isn't present in a search then the count is 0 for that mod mass in that search
    // this is needed for subsequent z-score and p-value calculations

    {
        const modMass_AllAcrossSearchesOrSubSearches: Set<number> = new Set()

        for ( const data_For__ForSingle_ModMass of modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.get_All_Values() ) {
            modMass_AllAcrossSearchesOrSubSearches.add( data_For__ForSingle_ModMass.modMass )
        }

        for ( const modMass of modMass_AllAcrossSearchesOrSubSearches ) {

            let data_ForSingle_ModMass = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.get_Data_For_ModMass( modMass )
            if ( ! data_ForSingle_ModMass ) {
                data_ForSingle_ModMass = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ModMass( { modMass } )
                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL_ONLY__AddEntry( data_ForSingle_ModMass )
            }

            if ( projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

                if ( projectSearchIds.length !== 1 ) {
                    const msg = "if ( projectSearchId_Or_SubSearchId_Enum ) { AND if ( projectSearchIds.length !== 0 ) {"
                    console.warn(msg)
                    throw Error(msg)
                }

                const projectSearchId = projectSearchIds[ 0 ]

                for ( const  searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                    let data_For__ProjectSearchId_Or_SubSearchId = data_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( searchSubGroup_Id )
                    if ( ! data_For__ProjectSearchId_Or_SubSearchId ) {
                        data_For__ProjectSearchId_Or_SubSearchId = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId({
                            projectSearchId_Or_SubSearchId: searchSubGroup_Id, projectSearchId_Or_SubSearchId_Enum, projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchId
                        })
                        data_ForSingle_ModMass.INTERNAL_ONLY__AddEntry(data_For__ProjectSearchId_Or_SubSearchId)
                    }
                }

            } else {

                for ( const projectSearchId of projectSearchIds ) {

                    let data_For__ProjectSearchId_Or_SubSearchId = data_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                    if ( ! data_For__ProjectSearchId_Or_SubSearchId ) {
                        data_For__ProjectSearchId_Or_SubSearchId = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId({
                            projectSearchId_Or_SubSearchId: projectSearchId, projectSearchId_Or_SubSearchId_Enum, projectSearchId_ForUseWhereRequire_projectSearchId: projectSearchId
                        })
                        data_ForSingle_ModMass.INTERNAL_ONLY__AddEntry(data_For__ProjectSearchId_Or_SubSearchId)
                    }
                }
            }
        }
    }

    return modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root
}

//////

const _process_SinglePsm = function (
    {
        psmTblData,
        projectSearchId,
        singleSearch_WithSubSearches,
        searchSubGroup_Ids_Selected,
        ui_Selections_Used_ForCreation,

        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root,  //  Updated

        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
        dataPage_common_Flags_SingleSearch_ForProjectSearchId,
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder,
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
    } : {
        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
        projectSearchId: number
        singleSearch_WithSubSearches: boolean
        searchSubGroup_Ids_Selected : Set<number>
        ui_Selections_Used_ForCreation : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_UI_Selections_UsedForCreation

        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root


        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        dataPage_common_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
    }
) {

    //
    //   These 2 boolean variables track if ANY Modification found for PSM and if the Mod Mass entry passed the filters.
    //
    //        NOTE:
    //          Open Mod mass entries where mass rounds to zero
    //          and user selection modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass is Selected (Selected is default)
    //          Then those open mod mass entries are excluded from processing to identify the PSM as having mod mass entries
    //          and the PSM may end up in the "Unmodified" dependent on any other Mod Mass entries for that PSM.
    //
    //   At bottom of function have this conditional and method call:

    //       if ( ( ! psm_Any_ModMassEntry_ForPSM_Passed_Filters ) && ( ! psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked ) ) {
    //
    //           modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId({ psmTblData, projectSearchId })
    //       }

    /**
     * Used in conditional at end of function
     *
     *    For call to 'modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId({ psmTblData, projectSearchId })'
     *    For Storing "Unmodified" PSMs
     */
    let psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked = false

    /**
     * Used in conditional at end of function
     *
     *    For call to 'modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId({ psmTblData, projectSearchId })'
     *    For Storing "Unmodified" PSMs
     */
    let psm_Any_ModMassEntry_ForPSM_Passed_Filters = false

    /////////

    if ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) {

        //  anyPsmHas_DynamicModifications true so Process variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder

        if ( ! variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder ) {
            throw Error("( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) AND variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId)
        }
        const psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder.get_psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )
        if ( psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {

            const psmVariable_Dynamic_ModificationMass_Entries_PerPSM_ForPsmId = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psm_Variable_Dynamic_ModificationMass_Entry_Array_Map_Key_PsmId.get( psmTblData.psmId )
            if ( psmVariable_Dynamic_ModificationMass_Entries_PerPSM_ForPsmId ) {

                for ( const psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId of psmVariable_Dynamic_ModificationMass_Entries_PerPSM_ForPsmId.modificationsArray ) {

                    psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked = true

                    //                          Round again here since may round to different value from whole number
                    const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.modificationMass )

                    if (
                        ( ui_Selections_Used_ForCreation.modMassCutoffMin !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMin !== null
                            && ui_Selections_Used_ForCreation.modMassCutoffMin > modMass_Rounded_ForModPage_Processing )
                        || ( ui_Selections_Used_ForCreation.modMassCutoffMax !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMax !== null
                            && ui_Selections_Used_ForCreation.modMassCutoffMax < modMass_Rounded_ForModPage_Processing ) ) {

                        //   Mod Mass is < modMassCutoffMin OR Mod Mass is > modMassCutoffMax so skip

                    } else {

                        const modificationPositions_OnPeptide = [ psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.position ]

                        const filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result =
                            _filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter( {
                                modificationPositions_OnPeptide,
                                psmTblData,
                                proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                                proteinPositionFilter_UserSelections_StateObject,
                                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                            } )

                        if ( filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result.passesFilter ) {

                            const psmId = psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId.psmId

                            //  Does NO Filtering
                            const dataFor_SinglePsm_For_PsmId = _get_dataFor_SinglePsm_For_PsmId( {
                                psmId,
                                psmTblData,
                                modMass_Rounded_ForModPage_Processing,
                                projectSearchId,
                                singleSearch_WithSubSearches,
                                searchSubGroup_Ids_Selected,

                                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root, // Updated

                                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                                variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                openModifications_On_PSM_For_MainFilters_Holder
                            } )

                            dataFor_SinglePsm_For_PsmId.INTERNAL_ONLY__Add_PsmVariableMod_Entry( {
                                psmId,
                                modMass_Rounded_ForModPage_Processing,
                                psmVariable_Dynamic_ModificationMassPerPSM_ForPsmId
                            } )

                            psm_Any_ModMassEntry_ForPSM_Passed_Filters = true
                        }
                    }
                }
            }
        }

    } else {

        // ELSE of:  anyPsmHas_DynamicModifications true

        // So Process variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

        if ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder ) {
            throw Error("else of ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_DynamicModifications ) AND variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId)
        }
        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmTblData.reportedPeptideId )
        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

            for ( const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked = true

                //                          Round again here since may round to different value from whole number
                const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.mass )

                if (
                    ( ui_Selections_Used_ForCreation.modMassCutoffMin !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMin !== null
                        && ui_Selections_Used_ForCreation.modMassCutoffMin > modMass_Rounded_ForModPage_Processing )
                    || ( ui_Selections_Used_ForCreation.modMassCutoffMax !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMax !== null
                        && ui_Selections_Used_ForCreation.modMassCutoffMax < modMass_Rounded_ForModPage_Processing ) ) {

                    //   Mod Mass is < modMassCutoffMin OR Mod Mass is > modMassCutoffMax so skip

                } else {

                    const modificationPositions_OnPeptide = [ variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position ]

                    const filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result =
                        _filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter( {
                            modificationPositions_OnPeptide,
                            psmTblData,
                            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                            proteinPositionFilter_UserSelections_StateObject,
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        } )


                    if ( filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result.passesFilter ) {

                        const psmId = psmTblData.psmId

                        //  Does NO Filtering
                        const dataFor_SinglePsm_For_PsmId = _get_dataFor_SinglePsm_For_PsmId( {
                            psmId,
                            psmTblData,
                            modMass_Rounded_ForModPage_Processing,
                            projectSearchId,
                            singleSearch_WithSubSearches,
                            searchSubGroup_Ids_Selected,

                            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root, // Updated

                            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                            openModifications_On_PSM_For_MainFilters_Holder
                        } )

                        dataFor_SinglePsm_For_PsmId.INTERNAL_ONLY__Add_ReportedPeptideVariableMod_Entry( {
                            psmId,
                            modMass_Rounded_ForModPage_Processing,
                            variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry
                        } )

                        psm_Any_ModMassEntry_ForPSM_Passed_Filters = true
                    }
                }
            }
        }
    }

    if ( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {
        if ( ! openModifications_On_PSM_For_MainFilters_Holder ) {
            throw Error("( dataPage_common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) AND openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId)
        }

        const psmOpenModificationMassPerPSM_ForPsmIdMap = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )
        if ( psmOpenModificationMassPerPSM_ForPsmIdMap ) {

            const psmId = psmTblData.psmId

            const psmOpenModificationMassForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId );

            if ( psmOpenModificationMassForPsmId !== undefined && psmOpenModificationMassForPsmId !== null ) {

                //  Only for Open Mod
                let skipModificationEntry_Since_RoundedToZero_And_TreatingZeroAsUnmodified = false
                {
                    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                        const modificationMass_Rounded = Math.round( psmOpenModificationMassForPsmId.openModificationMass )
                        if ( modificationMass_Rounded === 0 ) {
                            //  Modification Mass rounded to Zero so SKIP Entry

                            skipModificationEntry_Since_RoundedToZero_And_TreatingZeroAsUnmodified = true
                        }
                    }
                }

                if ( ! skipModificationEntry_Since_RoundedToZero_And_TreatingZeroAsUnmodified ) {

                    psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked = true

                    //                          Round again here since may round to different value from whole number
                    const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( psmOpenModificationMassForPsmId.openModificationMass )

                    if (
                        ( ui_Selections_Used_ForCreation.modMassCutoffMin !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMin !== null
                            && ui_Selections_Used_ForCreation.modMassCutoffMin > modMass_Rounded_ForModPage_Processing )
                        || ( ui_Selections_Used_ForCreation.modMassCutoffMax !== undefined && ui_Selections_Used_ForCreation.modMassCutoffMax !== null
                            && ui_Selections_Used_ForCreation.modMassCutoffMax < modMass_Rounded_ForModPage_Processing )
                        || ( ui_Selections_Used_ForCreation.excludeUnlocalizedOpenMods_UI_Selection
                            && ( ( ! psmOpenModificationMassForPsmId.positionsMap_KeyPosition ) || psmOpenModificationMassForPsmId.positionsMap_KeyPosition.size === 0 ) ) ) {

                        //   Mod Mass is < modMassCutoffMin OR Mod Mass is > modMassCutoffMax OR ( excludeUnlocalizedOpenMods AND NO Localization ) so skip

                    } else {

                        let psm_PassesFilters = false

                        if ( psmOpenModificationMassForPsmId.positionsMap_KeyPosition ) {

                            const modificationPositions_OnPeptide: Array<number> = []

                            for ( const positionEntries of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.values() ) {
                                for ( const positionEntry of positionEntries ) {
                                    modificationPositions_OnPeptide.push( positionEntry.position )
                                }
                            }

                            const filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result =
                                _filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter( {
                                    modificationPositions_OnPeptide,
                                    psmTblData,
                                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                                    proteinPositionFilter_UserSelections_StateObject,
                                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                                } )


                            if ( filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter__ProteinPositions_Data_Result.passesFilter ) {

                                psm_PassesFilters = true
                            }

                        } else {

                            const filterOn_Modification_NOT_Localized__ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter_Result =
                                _filterOn_Modification_NOT_Localized__ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter({
                                    psmTblData,
                                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                                    proteinPositionFilter_UserSelections_StateObject,

                                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                                })

                            if ( filterOn_Modification_NOT_Localized__ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter_Result.passesFilter ) {

                                psm_PassesFilters = true
                            }
                        }

                        if ( psm_PassesFilters ) {

                            const psmId = psmTblData.psmId


                            //  Does NO Filtering
                            const dataFor_SinglePsm_For_PsmId = _get_dataFor_SinglePsm_For_PsmId( {
                                psmId,
                                psmTblData,
                                modMass_Rounded_ForModPage_Processing,
                                projectSearchId,
                                singleSearch_WithSubSearches,
                                searchSubGroup_Ids_Selected,

                                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root, // Updated

                                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                                variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                openModifications_On_PSM_For_MainFilters_Holder
                            } )

                            dataFor_SinglePsm_For_PsmId.INTERNAL_ONLY__Add_PsmOpenMod_Entry( {
                                psmId,
                                modMass_Rounded_ForModPage_Processing,
                                psmOpenModificationForPsmId: psmOpenModificationMassForPsmId
                            } )

                            psm_Any_ModMassEntry_ForPSM_Passed_Filters = true
                        }
                    }
                }
            }
        }
    }

    if ( ( ! psm_Any_ModMassEntry_ForPSM_Passed_Filters ) && ( ! psm_has_Any_ModMassEntries___Includes_ModificationsThat_NOT_PassesFilters___EXCLUDES__OpenModMassRoundsToZero_AND_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_Checked ) ) {

        if ( singleSearch_WithSubSearches ) {

            const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmTblData.psmId )
            if ( subGroupId === undefined ) {
                const msg = "searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmTblData.psmId ) returned UNDEFINED for psmTblData.psmId: " + psmTblData.psmId
                console.warn(msg)
                throw Error(msg)
            }

            if ( searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId_Or_SubSearchId({ psmTblData, projectSearchId_Or_SubSearchId: subGroupId })
            }
        } else {
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL__AddTo_psmIds_With_NO_Modifications_Set_For_ProjectSearchId_Or_SubSearchId({ psmTblData, projectSearchId_Or_SubSearchId: projectSearchId })
        }
    }
}

/**
 *
 * NO Filtering.
 *
 * Populates objects down from modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root down to the returned dataFor_SinglePsm_For_PsmId
 */
const _get_dataFor_SinglePsm_For_PsmId = function(
    {
        psmId,
        psmTblData,
        modMass_Rounded_ForModPage_Processing,
        projectSearchId,
        singleSearch_WithSubSearches,
        searchSubGroup_Ids_Selected,
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root, // !!!  Updated

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        openModifications_On_PSM_For_MainFilters_Holder
    } : {
        psmId: number
        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
        modMass_Rounded_ForModPage_Processing: number
        projectSearchId: number
        singleSearch_WithSubSearches: boolean
        searchSubGroup_Ids_Selected : Set<number>
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

        variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
    }
) : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm {

    let subGroupId_For_PsmId: number = undefined

    if ( singleSearch_WithSubSearches ) {

        subGroupId_For_PsmId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId )
        if ( subGroupId_For_PsmId === undefined || subGroupId_For_PsmId === null ) {
            throw Error( " ( singleSearch_WithSubSearches ) AND searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId )
        }

        if ( ! searchSubGroup_Ids_Selected ) {

            //  subGroupId_For_PsmId is NOT a selected Sub Group Id so return

            return // EARLY RETURN
        }
    }


    let data_For_ModMass = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.get_Data_For_ModMass( modMass_Rounded_ForModPage_Processing )
    if ( ! data_For_ModMass ) {
        data_For_ModMass = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ModMass({ modMass: modMass_Rounded_ForModPage_Processing })
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_Result_Root.INTERNAL_ONLY__AddEntry( data_For_ModMass )
    }

    let data_For_ProjectSearchId_Or_SubSearchId: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId

    if ( singleSearch_WithSubSearches ) {

        if ( subGroupId_For_PsmId === undefined ) {
            throw Error("if ( singleSearch_WithSubSearches ) { AND if ( subGroupId_For_PsmId === undefined ) {" )
        }

        data_For_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( subGroupId_For_PsmId )
        if ( ! data_For_ProjectSearchId_Or_SubSearchId ) {
            data_For_ProjectSearchId_Or_SubSearchId = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId({
                projectSearchId_Or_SubSearchId: subGroupId_For_PsmId,
                projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId,
                projectSearchId_ForUseWhereRequire_projectSearchId : projectSearchId
            })
            data_For_ModMass.INTERNAL_ONLY__AddEntry( data_For_ProjectSearchId_Or_SubSearchId )
        }

    } else {
        data_For_ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
        if ( ! data_For_ProjectSearchId_Or_SubSearchId ) {
            data_For_ProjectSearchId_Or_SubSearchId = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_ProjectSearchId_Or_SubSearchId({
                projectSearchId_Or_SubSearchId: projectSearchId,
                projectSearchId_Or_SubSearchId_Enum: ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result___ProjectSearchId_Or_SubSearchId_Enum.ProjectSearchId,
                projectSearchId_ForUseWhereRequire_projectSearchId : projectSearchId
            })
            data_For_ModMass.INTERNAL_ONLY__AddEntry( data_For_ProjectSearchId_Or_SubSearchId )
        }
    }

    let dataFor_SinglePsm_For_PsmId = data_For_ProjectSearchId_Or_SubSearchId.get_DataFor_SinglePsm_For_PsmId( psmId )
    if ( ! dataFor_SinglePsm_For_PsmId ) {
        dataFor_SinglePsm_For_PsmId = new ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_ForSingle_Psm({
            psmTblData,

            variable_Dynamic_Modifications_On_PSM_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder
        })
        data_For_ProjectSearchId_Or_SubSearchId.INTERNAL_ONLY__AddEntry( dataFor_SinglePsm_For_PsmId )
    }

    return dataFor_SinglePsm_For_PsmId
}


////////////////////


////////////////////

const _filterOn_Modification_YES_Localized_ModificationPositionsOnPeptide_ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter = function (
    {
        modificationPositions_OnPeptide,
        psmTblData,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
    } : {
        modificationPositions_OnPeptide: Array<number>

        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId

        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
    }
) : {
    passesFilter: boolean
} {

    if ( ( ! proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() )
        && ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

        //  NO Filtering so passesFilter: true

        return { passesFilter: true }  // EARLY RETURN
    }

    const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( psmTblData.reportedPeptideId );
    if ( ! proteinCoverage_Entries_For_ReportedPeptideId ) {
        throw Error( "_getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData(...): proteinCoverage_KeyReportedPeptideId.get( psmTblData.reportedPeptideId ); returned nothing.  psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
    }

    if ( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

        // Have values so require pass at least one filter entry

        let foundValueForAtLeast_OneFilterEntry = false

        const proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId;
        if ( ( ! proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 ) {
            throw Error( "( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) AND ( ( ! proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 )" )
        }

        for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

            //  Loop contains early 'break' to exit loop

            const proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
            if ( ! proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if ( proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                // Filter selection is Full Protein

                //  Have at least 1 Mod at Reported Peptide level so this proteinCoverageEntry passes the filter

                foundValueForAtLeast_OneFilterEntry = true;

                break;  // EARLY LOOP LOOP
            }

            if ( ! proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {
                throw Error("After ( proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) { ... break } AND ( ! proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries )")
            }

            for ( const proteinRange_UserSelectionsEntry of proteinPosition_Of_Modification_Filter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                for ( const modificationPosition_OnPeptide of modificationPositions_OnPeptide ) {

                    const modificationPosition_OnProtein = modificationPosition_OnPeptide + proteinCoverage_Entry.proteinStartPosition - 1

                    if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= modificationPosition_OnProtein && modificationPosition_OnProtein <= proteinRange_UserSelectionsEntry.proteinPosition_End ) {

                        foundValueForAtLeast_OneFilterEntry = true;

                        break;  // EARLY LOOP BREAK
                    }
                }
            }
        }

        if ( ! foundValueForAtLeast_OneFilterEntry ) {

            return { passesFilter: false } // EARLY RETURN
        }
    }

    if ( proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

        // Have values so require pass at least one filter entry

        let foundValueForAtLeast_OneFilterEntry = false

        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId;
        if ( ( ! proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 ) {
            throw Error( "( proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) AND ( ( ! proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 )" )
        }

        for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

            //  Loop contains early 'break' to exit loop

            const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                // Filter selection is Full Protein

                //  Have at least 1 Mod at Reported Peptide level so this proteinCoverageEntry passes the filter

                foundValueForAtLeast_OneFilterEntry = true;

                break;  // EARLY LOOP LOOP
            }

            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {
                throw Error("After ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) { ... break } AND ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries )")
            }


            for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                //  x1 <= y2 && y1 <= x2
                if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= proteinRange_UserSelectionsEntry.proteinPosition_End ) { // coverage entry overlaps select range

                    foundValueForAtLeast_OneFilterEntry = true;

                    break;  // EARLY LOOP BREAK
                }
            }
        }

        if ( ! foundValueForAtLeast_OneFilterEntry ) {

            return { passesFilter: false } // EARLY RETURN
        }
    }

    //  Made it through all filters so Passes Filters

    return { passesFilter: true }
}

///////////


/**
 * Currently for PSM Open Mod Unlocalized
 */
const _filterOn_Modification_NOT_Localized__ModPositionInProtein_PeptidePositionInProtein__Return_PassesFilter = function (
    {
        psmTblData,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
    } : {
        psmTblData: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId

        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject

        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
    }
) : {
    passesFilter: boolean
} {

    if ( ( ! proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() )
        && ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

        //  NO Filtering so passesFilter: true

        return { passesFilter: true }  // EARLY RETURN
    }

    const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( psmTblData.reportedPeptideId );
    if ( ! proteinCoverage_Entries_For_ReportedPeptideId ) {
        throw Error( "_getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData(...): proteinCoverage_KeyReportedPeptideId.get( psmTblData.reportedPeptideId ); returned nothing.  psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
    }

    if ( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

        // Have values so require pass at least one filter entry

        let foundValueForAtLeast_OneFilterEntry = false

        const proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId;
        if ( ( ! proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 ) {
            throw Error( "( proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) AND ( ( ! proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 )" )
        }

        for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

            //  Loop contains early 'break' to exit loop

            const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPosition_Of_Modification_Filter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                // Filter selection is Full Protein

                //  Have at least 1 Mod at Reported Peptide level so this proteinCoverageEntry passes the filter

                foundValueForAtLeast_OneFilterEntry = true;

                break;  // EARLY LOOP LOOP
            }

            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {
                throw Error("After ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) { ... break } AND ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries )")
            }

            for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                //  x1 <= y2 && y1 <= x2
                if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= proteinRange_UserSelectionsEntry.proteinPosition_End ) { // coverage entry overlaps select range

                    foundValueForAtLeast_OneFilterEntry = true;

                    break;  // EARLY LOOP BREAK
                }
            }
        }

        if ( ! foundValueForAtLeast_OneFilterEntry ) {

            return { passesFilter: false } // EARLY RETURN
        }
    }

    if ( proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

        // Have values so require pass at least one filter entry

        let foundValueForAtLeast_OneFilterEntry = false

        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId;
        if ( ( ! proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 ) {
            throw Error( "( proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) AND ( ( ! proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId ) || proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.size === 0 )" )
        }

        for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

            //  Loop contains early 'break' to exit loop

            const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                continue; // EARLY CONTINUE
            }

            if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                // Filter selection is Full Protein

                //  Have at least 1 Mod at Reported Peptide level so this proteinCoverageEntry passes the filter

                foundValueForAtLeast_OneFilterEntry = true;

                break;  // EARLY LOOP LOOP
            }

            if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {
                throw Error("After ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) { ... break } AND ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries )")
            }

            for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                //  x1 <= y2 && y1 <= x2
                if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= proteinRange_UserSelectionsEntry.proteinPosition_End ) { // coverage entry overlaps select range

                    foundValueForAtLeast_OneFilterEntry = true;

                    break;  // EARLY LOOP BREAK
                }
            }
        }

        if ( ! foundValueForAtLeast_OneFilterEntry ) {

            return { passesFilter: false } // EARLY RETURN
        }
    }

    //  Made it through all filters so Passes Filters

    return { passesFilter: true }
}

