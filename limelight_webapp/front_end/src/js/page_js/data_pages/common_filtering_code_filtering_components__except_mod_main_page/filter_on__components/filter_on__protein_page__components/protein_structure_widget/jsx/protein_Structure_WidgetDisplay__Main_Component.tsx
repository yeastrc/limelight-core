/**
 * protein_Structure_WidgetDisplay__Main_Component.tsx
 *
 * Protein Structure Widget Display - On Search Based pages --  Different for Experiment pages
 *
 */


import React from 'react'


//  Google search:  molstar StructureProperties.residue.label_seq_id vs StructureProperties.residue.auth_seq_id
//
// In Mol*, Structure Properties.residue.label_seq_id and Structure Properties.residue.auth_seq_id are both used to identify residues, but they refer to two different numbering schemes within the mmCIF file format.
// label_seq_id (PDB-assigned): This is a sequential integer (1, 2, 3...) assigned by the PDB, representing the order of residues as they appear in the experimental data, usually starting from 1.
// auth_seq_id (Author-provided): This is the residue number provided by the original author of the structure. It is used to match numbering in publications, sequence databases (like UniProt), or homologous structures, and may contain gaps or non-integer suffixes (like insertion codes).
//
// Key Considerations in Mol*
// When to use label_seq_id: Use this for algorithmic loops or when you need a guaranteed contiguous index for every atom, such as when building expressions or custom queries, as it is a mandatory field.
//     When to use auth_seq_id: Use this for user-facing applications, tooltips, or when searching for specific residues mentioned in literature (e.g., in 3D Motif Search).
// Missing Residues: label_seq_id will skip numbers for residues missing in the electron density, whereas auth_seq_id will reflect the intended sequence number.
//     auth_seq_id is for compatibility: It is generally preferred for mapping residues to their biological context, as it corresponds directly to the author-defined identifiers.




//  Mol*  Structure Viewer imports

import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18";
import { createPluginUI } from "molstar/lib/mol-plugin-ui";
import { DefaultPluginUISpec, PluginUISpec } from "molstar/lib/mol-plugin-ui/spec";
import { PluginConfig } from "molstar/lib/mol-plugin/config";
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import { Expression } from "molstar/lib/mol-script/language/expression";
import { MolScriptBuilder } from 'molstar/lib/mol-script/language/builder';
import { BuiltInTrajectoryFormat } from "molstar/lib/mol-plugin-state/formats/trajectory";
import { InteractivityManager } from "molstar/lib/mol-plugin-state/manager/interactivity";
import { StructureElement, StructureProperties, StructureSelection, Unit as Molstar_Unit } from "molstar/lib/mol-model/structure";
import { Color as Molstar_Color } from "molstar/lib/commonjs/mol-util/color";
import { LociLabelProvider } from "molstar/lib/mol-plugin-state/manager/loci-label";

import { Structure } from "molstar/lib/mol-model/structure";
import { Script } from 'molstar/lib/mol-script/script';

import { Vec3 as Molstar_Vec3 } from 'molstar/lib/mol-math/linear-algebra';

import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms';

import { PluginStateObject as SO } from 'molstar/lib/mol-plugin-state/objects';

import { Task } from 'molstar/lib/mol-task';
import { Shape, ShapeGroup } from 'molstar/lib/mol-model/shape';
import { Mesh } from 'molstar/lib/mol-geo/geometry/mesh/mesh';
import { MeshBuilder } from 'molstar/lib/mol-geo/geometry/mesh/mesh-builder';
import { Circle } from 'molstar/lib/mol-geo/primitive/circle';
import { Mat4, Vec3, Quat } from 'molstar/lib/mol-math/linear-algebra';
import { StateSelection, StateTransformer } from 'molstar/lib/mol-state';
import { ParamDefinition as PD } from 'molstar/lib/mol-util/param-definition';

import { PluginStateTransform } from "molstar/lib/mol-plugin-state/objects";
import { OrderedSet } from "molstar/lib/mol-data/int";


//  Limelight Import that is Molstar oriented
import {
    molstar__read_structure_create_chimerax_file__ConvertToCXC,
    Molstar__read_structure_create_chimerax_file__DiskSpec,
    Molstar__read_structure_create_chimerax_file__ResidueColorSpec,
    Molstar__read_structure_create_chimerax_file__ResidueSymbolSpec,
} from "page_js/data_pages/molstar__read_structure_create_chimerax_file/molstar__read_structure_create_chimerax_file___Index";



//  Molstar_Unit.Kind
//          TS2748: Cannot access ambient const enums when isolatedModules is enabled.
//          TS2475: const enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.

// @ts-ignore
const Molstar_Unit_Kind = Molstar_Unit.Kind

// @ts-ignore
if ( ! Molstar_Unit_Kind ) {

    const msg = "Molstar_Unit.Kind is NOT a value. if ( ! Molstar_Unit_Kind ) { "
    console.warn(msg)
    throw Error(msg)
}

// @ts-ignore
const Molstar_Unit_Kind_Atomic = Molstar_Unit_Kind.Atomic


// @ts-ignore
if ( Molstar_Unit_Kind_Atomic === undefined || Molstar_Unit_Kind_Atomic === null ) {

    const msg = "Molstar_Unit.Kind.Atomic is undefined or null. if ( Molstar_Unit_Kind_Atomic === undefined || Molstar_Unit_Kind_Atomic === null ) { "
    console.warn(msg)
    throw Error(msg)
}


//  MaterialUI imports

import { Box, Box as MUI_Box, FormControl, MenuItem, Select, Slider, Slider as MUI_Slider, SliderProps as MUI_SliderProps } from "@mui/material";

//  No longer works in Typescript 5.4.x:  Replace with next statement 'MUI_SliderProps_Marks': import { Mark } from "@mui/material/Slider/useSlider.types";
export type MUI_SliderProps_Marks = Extract<NonNullable<MUI_SliderProps['marks']>, Array<any>>

//  Limelight imports

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
import { DataPageStateManager, SearchNames_AsMap } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    SearchDetailsBlockDataMgmtProcessing
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    ProteinSequenceWidget_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { Limelight_AnyFilter__HasFilterValue } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/any_filter__has_filter_value/Limelight_AnyFilter__HasFilterValue";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import { ModificationMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";

import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { limelight__variable_is_type_number_Check } from "page_js/common_all_pages/limelight__variable_is_type_number_Check";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    open_Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component,
    Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_Callback_Params, Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_OnlyChangeAlignment_Callback_Params
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import { Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import { modificationMass_CommonRounding_ReturnNumber } from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import { limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants } from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import { trypsin_CutPointsForSequence_Compute, trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions } from "page_js/common_all_pages/trypsinCutPointsForSequence";
import { currentProjectId_ProjectSearchId_Based_DataPages_FromDOM } from "page_js/data_pages/data_pages_common/currentProjectId_ProjectSearchId_Based_DataPages_FromDOM";
import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT";
import {
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry,
    CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value, get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry
} from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO";
import { Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component } from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import { LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT } from "page_js/constants_across_webapp/residue_letter_constants/limelight__ResidueLetters_All_InAlphaOrder_Constant";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";
import {
    colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay,
    ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback, ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params
} from "page_js/common_all_pages/ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent/ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component";
import {
    open_protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component,
    Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_AlignmentComplete_Callback_Params
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component";
import { setStructureOverpaint } from "molstar/lib/mol-plugin-state/helpers/structure-overpaint";
import { Limelight__scaleColor_BasedOn_Fraction } from "page_js/common_all_pages/Limelight__scaleColor_BasedOn_Fraction";
import {
    Protein_Structure_Widget_StateObject,
    Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants,
    Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants,
    Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry,
    Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/js/protein_Structure_Widget_StateObject";
import {
    protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay,
    Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback, Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback_Params
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_structure_widget/jsx/protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component";
import { CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry } from "page_js/data_pages/common_data_loaded_from_server__project_level_data/common_data_loaded_from_server__project_level_data__structure_file_data/CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value";



///////////////////

//     Taken from the values for 'type'.  May be incomplete or have values that are not valid for the way the 'type' is used in this file.  This is ALL the values found by Webstorm for this 'type' parameter.
// const _MOLSTAR_REPRESENTATION_TYPES = [ "orientation" , "label" , "line" , "cartoon" , "backbone" , "ball-and-stick" , "carbohydrate" , "ellipsoid" , "gaussian-surface" , "gaussian-volume" , "molecular-surface" , "plane" , "point" , "putty" , "spacefill" ]

/**
 * Taken from the values for 'type'.  May be incomplete or have values that are not valid for the way the 'type' is used in this file.
 *
 * This is the sub part of values assumed valid for display for user to select from.
 */
const _MOLSTAR_REPRESENTATION_TYPES_PARTIAL = [ "orientation" , "label" , "line" , "cartoon" , "backbone" , "ball-and-stick" , "carbohydrate" , "ellipsoid" , "gaussian-surface" , "gaussian-volume" , "molecular-surface" , "plane" , "point" , "putty" , "spacefill" ]

const _MOLSTAR_REPRESENTATION_TYPES__DEFAULT = "cartoon"

///////

/**
 * All of structure is color this and then use Molstar Overpaint to add other colors on top
 */
const _Molstar_StructureColor_ChainNotAlignedOrNotCurrentlyDisplayed__ResiduesInChainNotAligned = Molstar_Color( 0x333333 )  //  Very Dark Grey


const _MOLSTAR_VIEWER_DEFAULT_WIDTH__SUBTRACT_FROM_WINDOW_WIDTH = 80 //  Currently left grey width is 40 so subtract 80 when compute size for default of Viewer
const _USER_INPUTS_TO_RIGHT_OF_VIEWER__MIN_WIDTH = 380
const _USER_INPUTS_TO_RIGHT_OF_VIEWER__MAX_WIDTH = 460

///////

const _SEQUENCE_COVERAGE_COLOR_MIN = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_medium
const _SEQUENCE_COVERAGE_COLOR_MAX = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_dark

const _SEQUENCE_COVERAGE_LEGEND_WIDTH_PIXELS = 400
const _SEQUENCE_COVERAGE_LEGEND_BAR_HEIGHT_PIXELS = 20

//   Molstar Color requires for hex string to start with '0x' instead of the typical '#'

const _LIMELIGHT_COLORS_FORMATTED_FOR_MOLSTAR__HEX_COLOR_STRING_PREFIX = "0x"

/**
 * Sequence Coverage Color Scaling:  From site_color_medium to site_color_dark
 */
const _scaleColor_BasedOn_Fraction_Object = new Limelight__scaleColor_BasedOn_Fraction({
    min_Color_SixHex_WithLeading_Hash: _SEQUENCE_COVERAGE_COLOR_MIN,
    max_Color_SixHex_WithLeading_Hash: _SEQUENCE_COVERAGE_COLOR_MAX
})

/**
 * Rescale the 'Fraction of PSM Max Count'.  currently zero and one so NO rescaling really done.
 */
const _Molstar__SequenceCoverage_MinMax_Colors__Fraction = {
    min_Fraction_PassedTo_Molstar_Interpolate: 0,
    max_Fraction_PassedTo_Molstar_Interpolate: 1,
} as const

//    Molstar Sequence Coverage using Fuschia

// const _Molstar__SequenceCoverage_MinMax_Colors = {
//     minColor: Molstar_Color( 0x550055 ),  //  trend darker
//     // minColor: Molstar_Color( 0xFFBBFF ),     //  trend whiter
//     maxColor: Molstar_Color( 0xFF00FF )
// }

//  't' is fraction between zero and 1
//  Usage is:  const color = Molstar_Color.interpolate( _Molstar__SequenceCoverage_MinMax_Colors.minColor, _Molstar__SequenceCoverage_MinMax_Colors.maxColor, t )

///////////

const _PROTEIN_STRUCTURE_ALIGNMENT_FILLER_CHARACTER_USER_DISPLAY = "-"


const _MODIFICATION_BALL__IN_HTML__RADIUS = 8
const _MODIFICATION_BALL__IN_HTML__STROKE_COLOR = "black"
const _MODIFICATION_BALL__IN_HTML__STROKE_WIDTH = 1

const _MODIFICATION_BALL_MOLSTAR_REPRESENTATION_TAG_STRING = "modification_ball_representation"

const _MODIFICATION_BALL__DEFAULT_COLOR__ALL_MODIFICATIONS = "#00ACFF"

const _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS = "#FF00FF"

const _SEQUENCE_SINGLE_POSITION__COLOR_FOR_LIMELIGHT_PROTEIN_SEQUENCE_LETTER__DEFAULT_COLOR = "#FF00FF"

////

const _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS = "red"

//   For Trypsin Cut Points - In Tooltip between residues - vertical line

const _STANDARD_COLOR__TRYPSIN_CUT_POINTS = "#FF0000"  // Red

//   For Trypsin Cut Points - Represented as disks

const _TRYPSIN_CUT_POINT__DISK_RADIUS = 2.5

const _TRYPSIN_CUT_POINT__DISK_COLOR = Molstar_Color( 0xFF0000 )

const _TRYPSIN_CUT_POINT_DISKS__DEFAULT_COLOR = _TRYPSIN_CUT_POINT__DISK_COLOR


/**
 * Molstar create Disk usage:
 */
const _TRYPSIN_CUT_POINT__DISKS_REF = 'trypsin-cut-point-residue-disks-provider';

/**
 * Molstar create Disk usage:
 */
const _TRYPSIN_CUT_POINT__DISKS_REPR_REF = 'trypsin-cut-point-residue-disks-repr';


const _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME = 'Trypsin Cut Point Residue Disks'  //  WAS 'Residue Disks'

const _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__SIZE = 1

///////////


const _MAX_PROTEIN_LENGTH_TO_DISPLAY = 100000


const _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__NOT_SET: number = undefined

/**
 * Border Width of border around the Mol* Viewer.  Set to zero if NO border.  Used to compute positioning of tooltip HTML
 */
const _proteinStructure_ViewerContainer_Ref__BORDER_WIDTH = 0


//  Viewer Width/Height Selection Values:

const _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX = {

    WIDTH_HEIGHT: {
        MIN: 400,  //  MIN MUST be a multiple of STEP
        MAX: 2000,
        MAX_INITIAL_VALUE: 700
    },
    STEP: 100
    //  OLD
    // WIDTH: {
    //     MIN: 500,
    //     MAX: 1400
    // },
    // HEIGHT: {
    //     MIN: 400,
    //     MAX: 1000
    // }
} as const

{
    if ( ( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP )
        !== ( Math.floor( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP ) ) ) {

        const msg = "_VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN is NOT a multiple of _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP"
        console.warn(msg)
        throw Error(msg)
    }
    if ( ( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP )
        !== ( Math.floor( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP ) ) ) {

        const msg = "_VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX is NOT a multiple of _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP"
        console.warn(msg)
        throw Error(msg)
    }
    if ( ( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP )
        !== ( Math.floor( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP ) ) ) {

        const msg = "_VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE is NOT a multiple of _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP"
        console.warn(msg)
        throw Error(msg)
    }
    if ( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE > _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX ) {

        const msg = "_VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE  > _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX"
        console.warn(msg)
        throw Error(msg)
    }
    if ( _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE < _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN ) {

        const msg = "_VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE  < _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN"
        console.warn(msg)
        throw Error(msg)
    }
}

// const _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS = {
//
//     WIDTH_DEFAULT: 1000,
//     HEIGHT_DEFAULT: 800
// } as const
//
// const _VIEWER__WIDTH__SELECTION_OPTIONS: MUI_SliderProps_Marks = [
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH.MIN
//         // label: '400pxl',  //  Remove label since do not want it displayed below the slider
//     },
//     {
//         value: 700
//     },
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.WIDTH_DEFAULT
//     },
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH.MAX
//     },
// ] as const
//
// const _VIEWER__HEIGHT__SELECTION_OPTIONS: MUI_SliderProps_Marks = [
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.HEIGHT.MIN
//         // label: '400pxl',  //  Remove label since do not want it displayed below the slider
//     },
//     {
//         value: 600
//     },
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.HEIGHT_DEFAULT
//     },
//     {
//         value: _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.HEIGHT.MAX
//     },
// ] as const


/**
 *
 */
export interface Protein_Structure_WidgetDisplay__Main_Component_Props {

    protein_Structure_Widget_StateObject: Protein_Structure_Widget_StateObject

    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

    modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

    limelight_AnyFilter__HasFilterValue: Limelight_AnyFilter__HasFilterValue

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    /**
     * Use change of object to trigger computation of new data to display
     */
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    projectSearchIds: Array<number>;
    proteinSequenceVersionId: number;
    proteinNames: string;
    proteinDescriptions: string
    proteinSequenceString: string

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    dataPageStateManager: DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing;

    searchNamesMap_KeyProjectSearchId: SearchNames_AsMap;
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root;

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void
}

interface Protein_Structure_WidgetDisplay__Main_Component_State {

    _placeholder?: unknown
}

/**
 * Protein Structure Main Widget
 */
export class Protein_Structure_WidgetDisplay__Main_Component extends React.Component<Protein_Structure_WidgetDisplay__Main_Component_Props, Protein_Structure_WidgetDisplay__Main_Component_State> {

    private _map_To_NewStructure_PDB_Etc_Button_Clicked_BindThis = this._map_To_NewStructure_PDB_Etc_Button_Clicked.bind( this )
    private _deleteStructure_PDB_Etc_Button_Clicked_BindThis = this._deleteStructure_PDB_Etc_Button_Clicked.bind( this )
    private _changeStructure_PDB_Etc_Description_Button_Clicked_BindThis = this._changeStructure_PDB_Etc_Description_Button_Clicked.bind( this )

    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged_BindThis = this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged.bind( this )
    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged_BindThis = this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged.bind( this )

    private _show_TrypsinCutPoints_SelectionChanged_BindThis = this._show_TrypsinCutPoints_SelectionChanged.bind( this )

    private _mouseMove_Listener__StoreMousePosition_BindThis = this._mouseMove_Listener__StoreMousePosition.bind( this )

    private _download_ChimeraX_File_BindThis = this._download_ChimeraX_File.bind(this)

    private _currentMousePosition_X_Y: {
        currentMousePosition_offsetX: number
        currentMousePosition_clientX: number
        currentMousePosition_offsetY: number
        currentMousePosition_clientY: number
    }


    private _proteinStructure_ViewerContainer_Ref: React.RefObject<HTMLDivElement>

    private _proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref: React.RefObject<HTMLDivElement>

    private _proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref: React.RefObject<HTMLDivElement>

    private _proteinStructure_ViewerContainer_Tooltip_Ref_IsDisplayed: boolean = false

    private _INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component

    private _INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__onMount_Callback_BindThis = this._INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__onMount_Callback.bind( this )

    //  Populated in Constructor
    private _neverRender_ActualValue = false

    private _renderMsg__ProteinLength_TooLong = false

    private _searchIds_Set: Set<number>

    private _searchIds_CommaDelimited: string

    /////////


    private _molstar_PluginUIContext_Reference: PluginUIContext

    /**
     *
     */
    private _molstar_PluginUIContext_Reference_Promise: Promise<PluginUIContext>

    private _molstar_modificationSphere_RepresentationRef: string

    private _show_Structure_PageBlock = false

    /**
     * undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
     */
    private _trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    /**
     * All Parsed Chain data in the Structure.  The order the chains were retrieved from structure file.
     */
    private _chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>

    /**
     * All Parsed Chain data in the Structure.  Sorted to order of Label (label is most common label for chain id)
     */
    private _chainData_Parsed_From_OnStructure_In_Label_Order_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>

    private _chainData_Parsed_From_OnStructure_Map_Key_Label: Map<string, CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry>

    private _sequenceInChain_Map_Key_LimelightAssigned_ChainId: Map<number, string>

    private _structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT = new INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT()

    private _structureFile_Contents_Entry_Value__CurrentlyDisplayed: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_Entry

    private _structureFile_PDB_Etc_Contents__CurrentlyDisplayed: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value__GetResult_Entry

    private _mainData_Computed_For_ComponentsInThisFile_Root_Result: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root

    private _viewer_Size_Selection: number

    private _viewer_Size_Selection_InitialValue: number

    // private _width_Selection: number = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.WIDTH_DEFAULT
    // private _width_Selection_InitialValue: number = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.WIDTH_DEFAULT
    //
    // private _height_Selection: number = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.HEIGHT_DEFAULT
    // private _height_Selection_InitialValue: number = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_DEFAULTS.HEIGHT_DEFAULT

    private _selected__STRUCTURE_Display_Type = _MOLSTAR_REPRESENTATION_TYPES__DEFAULT

    /////////////

    //  _add_StructureData_PDB_Etc__TO__MolStar_Instance... properties are to ensure
    //          method '_add_StructureData_PDB_Etc__TO__MolStar_Instance' only has one execution in progress at a time
    //          and if called while in progress it is called again with the new parameters when the current execution finishes

    /**
     * For method '_add_StructureData_PDB_Etc__TO__MolStar_Instance(...)'
     */
    private _add_StructureData_PDB_Etc__TO__MolStar_Instance__CallInProgress = false

    /**
     * For method '_add_StructureData_PDB_Etc__TO__MolStar_Instance(...)'
     */
    private _add_StructureData_PDB_Etc__TO__MolStar_Instance__LastCalled: number

    /**
     * For method '_add_StructureData_PDB_Etc__TO__MolStar_Instance(...)'
     */
    private _add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function: () => void

    private _commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT

    private _userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject: boolean


    /////////////

    //   Stored data for ChimeraX Download

    private _dataFor_ChimeraX_Download: {
        colorSpecs_Internal: Array<{
            chainId__label_asym_id: string
            residueSeqId__label_seq_id__Array: Array<number>
            color__MolstarColor: Molstar_Color
        }>
        modificationBalls_Internal: Array<{
            chainId__label_asym_id: string
            residueSeqId__label_seq_id__Array: Array<number>
            color__MolstarColor: Molstar_Color
        }>
        diskSpecs_Internal: Array<{
            chainId__label_asym_id: string
            residueSeqId1: number;
            residueSeqId2: number;
            opacity?: number;      // 0.0–1.0, default 0.8
            radius_In_Angstroms__Default_OnePointZero?: number;       // cylinder radius in Angstroms, default 1.0
            color__MolstarColor: Molstar_Color
        }>
    }

    /////////////

    /**
     *
     */
    constructor( props: Protein_Structure_WidgetDisplay__Main_Component_Props ) {
        try {
            super( props );

            this._proteinStructure_ViewerContainer_Ref = React.createRef();

            this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref = React.createRef();
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref = React.createRef();


            const projectIdentifier = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM() // string

            const projectId = Number.parseInt( projectIdentifier )
            if ( Number.isNaN( projectId ) ) {
                const msg = "currentProjectId_ProjectSearchId_Based_DataPages_FromDOM() returned a string that does NOT parse to an integer.  projectIdentifier: " + projectIdentifier
                console.warn( msg )
                throw Error( msg )
            }

            this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT = new CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT( {
                projectId
            } )

            if ( this.props.proteinSequenceString.length > _MAX_PROTEIN_LENGTH_TO_DISPLAY ) {

                this._renderMsg__ProteinLength_TooLong = true

                this._neverRender_ActualValue = true
            } else {

                this._populate_From_Constructor( props )
            }

            this.state = {};

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    private _mouseMove_Listener__StoreMousePosition( event: MouseEvent ) {
        try {
            this._currentMousePosition_X_Y = {
                currentMousePosition_offsetX: event.offsetX,
                currentMousePosition_clientX: event.clientX,
                currentMousePosition_offsetY: event.offsetY,
                currentMousePosition_clientY: event.clientY
            }

            if ( this._proteinStructure_ViewerContainer_Tooltip_Ref_IsDisplayed ) {

                //  Update position since showing at least one of the tooltips
                this._position_Residue_Tooltip_BasedOn_CurrentMousePosition()
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * After render()
     */
    componentDidMount() {
        try {

            if ( this._neverRender_ActualValue ) {
                return // EARLY RETURN
            }

            window.addEventListener( 'mousemove', this._mouseMove_Listener__StoreMousePosition_BindThis )

            this._callOn_ComponentDidMount()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * Clean Up
     */
    componentWillUnmount() {
        try {
            window.removeEventListener( 'mousemove', this._mouseMove_Listener__StoreMousePosition_BindThis )

            if ( this._molstar_PluginUIContext_Reference ) {

                this._molstar_PluginUIContext_Reference.dispose()

            } else if ( this._molstar_PluginUIContext_Reference_Promise ) {

                this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                    try {

                        molstar_Plugin_Reference?.dispose()

                    } catch ( e ) {

                        console.warn( "In 'componentWillUnmount()': 'this._molstar_PluginUIContext_Reference_Promise.then': molstar_Plugin_Reference?.dispose() threw exception: ", e )
                        // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        // throw e
                    }
                } )
            }

        } catch ( e ) {

            console.warn( "In 'componentWillUnmount()': molstar_Plugin_Reference?.dispose() threw exception: ", e )
            // reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            // throw e
        }
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps: Readonly<Protein_Structure_WidgetDisplay__Main_Component_Props>, nextState: Readonly<Protein_Structure_WidgetDisplay__Main_Component_State>, nextContext: any ): boolean {
        try {

            if ( nextProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
                || nextProps.projectSearchIds !== this.props.projectSearchIds
            ) {

                return true
            }

            return false

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * After render()
     *
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate( prevProps: Readonly<Protein_Structure_WidgetDisplay__Main_Component_Props>, prevState: Readonly<Protein_Structure_WidgetDisplay__Main_Component_State>, snapshot?: any ) {
        try {

            if ( prevProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
                || prevProps.projectSearchIds !== this.props.projectSearchIds
            ) {
                if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                    window.setTimeout( async () => {
                        try {

                            await this._compute_DerivedDisplay()

                            if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                                await this._update_AllParts_Of_CurrentStructure()
                            }

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    }, 50 )
                }
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    ////////////////

    /**
     *
     * @param props
     */
    private _populate_From_Constructor( props: Protein_Structure_WidgetDisplay__Main_Component_Props ) {

        const searchData_SearchName_Etc_Root = props.dataPageStateManager.get_searchData_SearchName_Etc_Root()

        this._searchIds_Set = new Set()

        for ( const projectSearchId of props.projectSearchIds ) {

            const searchData_For_ProjectSearchId = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId )
            if ( ! searchData_For_ProjectSearchId ) {
                throw Error( "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const searchId = searchData_For_ProjectSearchId.searchId
            this._searchIds_Set.add( searchId )
        }

        const searchIds_Array = Array.from( this._searchIds_Set )

        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( searchIds_Array )

        this._searchIds_CommaDelimited = searchIds_Array.join( "," )


        {
            const trypsin_CutPoints_For_ProteinSequence_Array = trypsin_CutPointsForSequence_Compute( this.props.proteinSequenceString )
            if ( trypsin_CutPoints_For_ProteinSequence_Array ) {
                this._trypsin_CutPoints_For_ProteinSequence_Set = new Set( trypsin_CutPoints_For_ProteinSequence_Array )
            }
        }
        {
            const viewerSize_UnRounded = window.innerWidth - _USER_INPUTS_TO_RIGHT_OF_VIEWER__MIN_WIDTH - _MOLSTAR_VIEWER_DEFAULT_WIDTH__SUBTRACT_FROM_WINDOW_WIDTH

            const viewerSize_UnRounded_Divided_Floor = Math.floor( viewerSize_UnRounded / _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP )

            this._viewer_Size_Selection = viewerSize_UnRounded_Divided_Floor * _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP

            if ( this._viewer_Size_Selection < _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN ) {
                this._viewer_Size_Selection = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN
            }
            if ( this._viewer_Size_Selection > _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE ) {
                this._viewer_Size_Selection = _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX_INITIAL_VALUE
            }
            this._viewer_Size_Selection_InitialValue = this._viewer_Size_Selection
        }

    }


    /**
     *
     * @private
     */
    private async _callOn_ComponentDidMount() {

        //  TODO  NOTE: If decide to hide this Protein Structure Tab when no data and NOT logged in user then move this first call to the main Single Protein page.

        // Get if user can create/edit/delete Structure file and alignment

        const get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete_Result =
            await
                this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete().get_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete_WebserviceCall()

        this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject =
            get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__UserAccess_CreateEditDelete_Result.userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject

        //  Get Has ANY entries for all users that have alignment for this protein.  This access must match page access

        const get_StructureFile_HasEntries_AllFor_ProjectId_ProteinSequenceVersionId_Result =
            await
                this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO().get_StructureFile_HasEntries_AllFor_ProjectId_ProteinSequenceVersionId_WebserviceCall( {
                    proteinSequenceVersionId: this.props.proteinSequenceVersionId
                } )

        if ( get_StructureFile_HasEntries_AllFor_ProjectId_ProteinSequenceVersionId_Result.hasAnyEntries ) {

            //  'hasAnyEntries' is specific to having any entries for ProjectId AND ProteinSequenceVersionId as those are what is displayed for Public users

            //  If have user that can create/edit/delete then need to retrieve anyway for Structure files without alignment for this Protein Sequence Version Id

            //  Get entries for all users that have alignment for this protein.  This access must match page access

            const get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_Result =
                await
                    this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO().get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_WebserviceCall( {
                        proteinSequenceVersionId: this.props.proteinSequenceVersionId
                    } )

            for ( const entryFromServer of get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_Result.resultEntries ) {

                const entryToAdd = new INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_Entry( {
                    structureFile_Data_Entry: entryFromServer
                } )
                this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.set( entryFromServer.structureFileId, entryToAdd )
            }

            let have_Existing_StructureFileId_Selection_AND_FoundIt_in_CurrentStructureFiles = false

            let structureFile_Contents_Entry_Value__ToDisplay: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

            {
                const selected_StructureFile_Id = this.props.protein_Structure_Widget_StateObject.get_selected_StructureFile_Id()
                if ( selected_StructureFile_Id !== undefined ) {

                    structureFile_Contents_Entry_Value__ToDisplay =
                        get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_Result.resultEntries.find( value => {
                            if ( value.structureFileId === selected_StructureFile_Id ) {
                                return value
                            }
                            return undefined
                        } )
                    if ( structureFile_Contents_Entry_Value__ToDisplay ) {
                        have_Existing_StructureFileId_Selection_AND_FoundIt_in_CurrentStructureFiles = true
                    } else {
                        //  NOT found so clear alignment selections
                        this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CLEAR()
                    }
                }
            }

            if ( ! structureFile_Contents_Entry_Value__ToDisplay ) {
                //  No Selection or selected NOT FOUND
                if ( get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_Result.resultEntries.length > 0 ) {

                    //  At least 1 so set first as current

                    structureFile_Contents_Entry_Value__ToDisplay = get_StructureFile_Entries_AllFor_ProjectId_ProteinSequenceVersionId_Result.resultEntries[ 0 ]

                    this.props.protein_Structure_Widget_StateObject.set_selected_StructureFile_Id( structureFile_Contents_Entry_Value__ToDisplay.structureFileId )
                }
            }

            if ( structureFile_Contents_Entry_Value__ToDisplay ) {

                //  Have entry for initial display

                this._structureFile_Contents_Entry_Value__CurrentlyDisplayed =
                    this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.get( structureFile_Contents_Entry_Value__ToDisplay.structureFileId )

                const alignmentEntryResult =
                    await
                        this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().get_StructureFile_Alignment_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall( {
                            structureFileId: structureFile_Contents_Entry_Value__ToDisplay.structureFileId,
                            proteinSequenceVersionId: this.props.proteinSequenceVersionId
                        } )

                for ( const alignmentEntry of alignmentEntryResult.resultEntries ) {

                    const alignmentEntry_Internal: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
                        structureFile__ProteinAlignment__CurrentProtein: alignmentEntry
                    }

                    this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.set( alignmentEntry.limelightAssigned_ChainId, alignmentEntry_Internal )

                    if ( ! have_Existing_StructureFileId_Selection_AND_FoundIt_in_CurrentStructureFiles ) {
                        this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__ADD( alignmentEntry.limelightAssigned_ChainId )
                    }
                }
            }

            await this._compute_DerivedDisplay()

            if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                await this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
            }
        } else {

            //  TODO  ssss  Need something here to indicate that initial load is complete.

            this.forceUpdate()
        }
    }

    /**
     *
     * @param INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance
     */
    private _INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__onMount_Callback( INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component ) {

        this._INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance = INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance
    }

    //  Commented out since 'get_StructureFile_Entries_AllFor_ProjectUId_WebserviceCall_RestrictedTo_Researcher_ProjectOwner' is commented out
    // /**
    //  *
    //  */
    // private async _get_StructureFile_Entries_AllForProject_RestrictedTo_Researcher_ProjectOwner() { try {
    //
    //     const get_StructureFile_Entries_AllForProject_Result =
    //         await
    //             this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
    //             get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO().
    //             get_StructureFile_Entries_AllFor_ProjectUId_WebserviceCall_RestrictedTo_Researcher_ProjectOwner()
    //
    //     window.alert("NOTHING done with results")
    //
    // } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     * @private
     */
    private _compute_DerivedDisplay() {

        const compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result =
            _compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root( {

                anyFilter__HasFilterValue: this.props.limelight_AnyFilter__HasFilterValue.is_AnyFilter__HasFilterValue(),

                add_open_modifications_unlocalized_in_all_peptide_positions: this.props.protein_Structure_Widget_StateObject.get_add_open_modifications_unlocalized_in_all_peptide_positions(),

                show_only_modifications_filtered_on__excluding_static: this.props.protein_Structure_Widget_StateObject.get_show_only_modifications_filtered_on__excluding_static(),

                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count(),
                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count(),

                modificationMass_UserSelections_StateObject: this.props.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                proteinSequence_Length: this.props.proteinSequenceString.length,
                projectSearchIds: this.props.projectSearchIds,
                proteinSequenceVersionId: this.props.proteinSequenceVersionId,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                dataPageStateManager: this.props.dataPageStateManager,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            } )

        if ( compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.data ) {

            this._mainData_Computed_For_ComponentsInThisFile_Root_Result = compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.data
            this.forceUpdate()  //  React FORCE rerender

            return Promise.resolve() // EARLY RETURN
        }

        return new Promise<void>( ( resolve, reject ) => {
            try {

                compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.promise.catch( reason => {
                    reject()
                } )
                compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.promise.then( value => {
                    try {

                        this._mainData_Computed_For_ComponentsInThisFile_Root_Result = compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.data
                        this.forceUpdate()  //  React FORCE rerender

                        resolve()

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } )

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e
            }
        } )
    }

    //////////////

    /**
     * User clicked on "Map to new structure" button.  Open Overlay
     *
     * @param event
     */
    private _map_To_NewStructure_PDB_Etc_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {

            const uploadComplete_Callback = ( params: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_Callback_Params ) => {

                this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CLEAR()

                this._processPDBUpload_Create_Or_Clear_MolstarInstance__Add_New_StructureFileToIt( params )
            }

            open_Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component( {
                commonParams: {
                    proteinSequence: this.props.proteinSequenceString,
                    proteinNames: this.props.proteinNames,
                    proteinSequenceVersionId: this.props.proteinSequenceVersionId,
                    searchIds_CommaDelimited: this._searchIds_CommaDelimited,
                    limelight_SequenceCoverageColor_For_MaxValue: _color__SixHex_WithLeading_Hash__TO__MolstarColor( _SEQUENCE_COVERAGE_COLOR_MAX ),
                    commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT,
                    existingAlignment_SubParams: undefined,
                    uploadComplete_Callback
                }
            } )
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * View and/or Update Alignment of Limelight Protein Sequence to Structure Chain.
     *
     * Called for existing alignment
     */
    private _view_Update__Align_LimelightProteinSequence_TO_StructureChain_Sequence(
        {
            chainData
        } : {
            chainData: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry
        }
    ) {

        const alignmentEntry_Internal = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
        if ( ! alignmentEntry_Internal ) {
            const msg = "_view_Update__Align_LimelightProteinSequence_TO_StructureChain_Sequence(..): this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING: chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
            console.warn(msg)
            throw Error(msg)
        }

        const structureSequence_InChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
        if ( ! structureSequence_InChain ) {
            const msg = "_view_Update__Align_LimelightProteinSequence_TO_StructureChain_Sequence(..): this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING. chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
            console.warn( msg )
            throw Error( msg )
        }

        const onlyChangeAlignment_Callback = ( params: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_OnlyChangeAlignment_Callback_Params ) => {

            const newEntry: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
                structureFile__ProteinAlignment__CurrentProtein: params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
            }

            this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.set(
                params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.limelightAssigned_ChainId, newEntry
            )

            this._update_AllParts_Of_CurrentStructure()
        }

        open_Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component( {
            commonParams: {
                proteinSequence: this.props.proteinSequenceString,
                proteinNames: this.props.proteinNames,
                proteinSequenceVersionId: this.props.proteinSequenceVersionId,
                searchIds_CommaDelimited: this._searchIds_CommaDelimited,
                limelight_SequenceCoverageColor_For_MaxValue: _color__SixHex_WithLeading_Hash__TO__MolstarColor( _SEQUENCE_COVERAGE_COLOR_MAX ),
                commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT,
                existingAlignment_SubParams: {
                    canEditAlignment: this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject,
                    chainData,
                    structureFile__ProteinAlignment__CurrentProtein: alignmentEntry_Internal.structureFile__ProteinAlignment__CurrentProtein,
                    structureSequence_InChain,
                    structureFile_Contents_Entry_Value: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry,
                    onlyChangeAlignment_Callback
                },
                uploadComplete_Callback: undefined
            }
        } )
    }

    /**
     * User clicked to delete structure
     */
    private async _deleteStructure_PDB_Etc_Button_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {

            if ( ! window.confirm( "Delete Structure File?" ) ) {
                return
            }

            await
                this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_DAO()
                    .delete_FromServer( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId )

            this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.delete( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId )

            this._structureFile_Contents_Entry_Value__CurrentlyDisplayed = undefined

            this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CLEAR()

            if ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.size === 0 ) {

                //   THIS DOES NOT WORK.  THEN After upload new file it not display in Molstar.  Need new flag for show/hide with display: none.  That or Dispose of molstar and then redraw molstar


                if ( this._molstar_PluginUIContext_Reference ) {

                    this._molstar_PluginUIContext_Reference.dispose()

                    this._molstar_PluginUIContext_Reference = undefined

                } else if ( this._molstar_PluginUIContext_Reference_Promise ) {

                    const molstar_Plugin_Reference = await this._molstar_PluginUIContext_Reference_Promise


                    molstar_Plugin_Reference?.dispose()

                    this._molstar_PluginUIContext_Reference_Promise = undefined

                    this._molstar_PluginUIContext_Reference = undefined
                }

                this._show_Structure_PageBlock = false

            } else {

                //  change selection to a random entry

                let structureFileId_Random: number = undefined

                for ( const entry of this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.values() ) {
                    structureFileId_Random = entry.structureFile_Data_Entry.structureFileId
                    break
                }

                this._structureFile_Contents_Entry_Value__CurrentlyDisplayed =
                    this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.get( structureFileId_Random )

                //  Default select all alignments
                // for ( const alignment_ChainId of this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map_ChainId.keys() )
                //     this._chainMapping_ForCurrentProtein_Selected_Set_Values_LimelightAssigned_ChainId.add( alignment_ChainId )
            }

            this.forceUpdate()

            window.setTimeout( async () => {
                try {

                    await this._compute_DerivedDisplay()

                    if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                        this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
                    }

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * Open overlay to
     */
    private _changeStructure_PDB_Etc_Description_Button_Clicked( event: React.MouseEvent<HTMLImageElement, MouseEvent> ) {
        try {
            const clickedItem_BoundingRect = event.currentTarget.getBoundingClientRect()

            let position_top =  clickedItem_BoundingRect.top;
            let position_left =  clickedItem_BoundingRect.left;

            const change_Callback: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback =
                (params: Protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component_Change_Callback_Params) : void => {

                    this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.description = params.new_Description

                    this.forceUpdate()  //  TODO must do more if display the description somewhere besides where the React rerender will update it
                }

            protein_Structure_WidgetDisplay__StructureFile_Description_Change_Overlay_Component__openOverlay({
                structureFileId: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId,
                existing_Description: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.description,
                position_top,
                position_left,
                change_Callback,
                cancel_Callback: () : void => {}
            })

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private async _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {

            this.props.protein_Structure_Widget_StateObject.set_shade_by_PSM_Count( event.target.checked )

            await this._compute_DerivedDisplay()

            if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                await this._update_AllParts_Of_CurrentStructure()
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {

            if ( event.target.value === "" ) {

                this.props.protein_Structure_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET )

            } else {

                const newValue_Number = Number.parseInt( event.target.value )

                if ( Number.isNaN( newValue_Number ) ) {
                    this.props.protein_Structure_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET )
                } else {
                    this.props.protein_Structure_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( newValue_Number )
                }
            }

            this.forceUpdate()

            window.setTimeout( async () => {
                try {

                    await this._compute_DerivedDisplay()

                    if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                        await this._update_AllParts_Of_CurrentStructure()

                    }

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 50 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }


    /**
     *
     * @param event
     */
    private _show_TrypsinCutPoints_SelectionChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {

            this.props.protein_Structure_Widget_StateObject.set_show_TrypsinCutPoints( event.target.checked )

            this.forceUpdate()

            window.setTimeout( async () => {
                try {
                    await this._addDisks_for_TrypsinCutPoints__FirstDeleteExistingDisks()

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 50 )


        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private async _processPDBUpload_Create_Or_Clear_MolstarInstance__Add_New_StructureFileToIt( params: Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component_Complete_Callback_Params ) {
        try {
            let internalHolder_At_StructureFileLevel = this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.get( params.structureFile_Contents_Entry_Value.structureFileId )

            if ( ! internalHolder_At_StructureFileLevel ) {

                //  NO internalHolder_At_StructureFileLevel for incoming structureFileId so create and add to Map

                internalHolder_At_StructureFileLevel = new INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_Entry( {
                    structureFile_Data_Entry: params.structureFile_Contents_Entry_Value
                } )

                this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.set( internalHolder_At_StructureFileLevel.structureFile_Data_Entry.structureFileId, internalHolder_At_StructureFileLevel )
            }

            this._structureFile_Contents_Entry_Value__CurrentlyDisplayed = internalHolder_At_StructureFileLevel  //  Set to Currently displayed

            this.props.protein_Structure_Widget_StateObject.set_selected_StructureFile_Id( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId )

            //  Save proteinSequenceStructureFile_Contents in case it was uploaded
            this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value().set_proteinSequenceStructureFile_Contents_for_StructureFileId( {
                structureFileId: params.structureFile_Contents_Entry_Value.structureFileId,
                proteinSequenceStructureFile_Contents: params.proteinSequenceStructureFile_Contents
            } )

            const newEntry: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
                structureFile__ProteinAlignment__CurrentProtein: params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
            }

            this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.set(
                params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.limelightAssigned_ChainId, newEntry
            )

            //  Preselect this chain
            this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__ADD( params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.limelightAssigned_ChainId )

            this._show_Structure_PageBlock = true

            this.forceUpdate()

            window.setTimeout( async () => {
                try {

                    await this._compute_DerivedDisplay()

                    this._add_StructureData_PDB_Etc__TO__MolStar_Instance()

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 50 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    private _create_Or_Clear_MolStar_Instance__RetryCount_Waitingfor_ContainerRef = 0

    private _trypsinCutPoints_Current_Data_For_Molstar_Disks: Array<INTERNAL__Molstar_DiskData> = [];

    /**
     * Create Mol* Instance
     *
     * this._molstar_Plugin_Reference is assigned when the promise returned resolves
     *
     * Called from this._add_StructureData_PDB_Etc__TO__MolStar_Instance(...)
     */
    private _create_Or_Clear_MolStar_Instance() {
        try {

            // console.warn( "Start: _loadData_OnMount_After_LoadData__Create_MolStar_Instance() in: Protein_Structure_WidgetDisplay__Main_Component" )

            if ( ! this._proteinStructure_ViewerContainer_Ref.current ) {
                const msg = "In _loadData_OnMount_After_LoadData: ( ! this._proteinStructure_ViewerContainer_Ref.current ) "
                console.warn( msg )

                return  //  FAKE  return.  Unclear why .current not populated

                throw Error( msg )
            }

            this._create_Or_Clear_MolStar_Instance__RetryCount_Waitingfor_ContainerRef = 0

            if ( this._molstar_PluginUIContext_Reference_Promise ) {

                //  Already have pending Molstar create in progress.  when complete clear it and resolve new returned promise

                //  EARLY RETURN
                return new Promise<void>( ( resolve, reject ) => {
                    try {

                        this._molstar_PluginUIContext_Reference_Promise.catch( reason => {

                            this._molstar_PluginUIContext_Reference_Promise = undefined

                            reject( reason )
                        } )
                        this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                            try {
                                const clear_Promise = this._molstar_PluginUIContext_Reference.clear()

                                clear_Promise.catch( reason => {

                                    reject( reason )
                                } )

                                clear_Promise.then( novalue => {
                                    try {

                                        resolve()

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } )

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        } )

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } )
            }

            if ( this._molstar_PluginUIContext_Reference ) {

                //  Already have Molstar instance.  clear it and resolve new returned promise

                //  EARLY RETURN
                return new Promise<void>( ( resolve, reject ) => {
                    try {
                        const clear_Promise = this._molstar_PluginUIContext_Reference.clear()

                        clear_Promise.catch( reason => {

                            reject( reason )
                        } )

                        clear_Promise.then( novalue => {
                            try {

                                resolve()

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        } )
                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                } )
            }

            //  Show only the canvas without everything around it

            const spec: PluginUISpec = {
                ...DefaultPluginUISpec(),
                layout: {
                    initial: {
                        showControls: false, // Hides the side panels
                        isExpanded: false
                    }
                },
                config: [
                    [ PluginConfig.Viewport.ShowControls, false ],         // Hides the wrench/canvas overlay buttons
                    [ PluginConfig.Viewport.ShowExpand, false ],           // Hides the Full screen
                    [ PluginConfig.Viewport.ShowToggleFullscreen, false ], // Hides the Full screen if present
                    [ PluginConfig.Viewport.ShowSettings, false ],        // Hides the settings gear if present
                    [ PluginConfig.Viewport.ShowIllumination, false ],    // Hides the Illumination (SSGI) toggle button
                    [ PluginConfig.Viewport.ShowXR, false ],              // Hides the Augmented Reality / XR toggle button
                ],
            }
            //  Create using 'createPluginUI'

            this._molstar_PluginUIContext_Reference_Promise = createPluginUI( {
                target: this._proteinStructure_ViewerContainer_Ref.current,
                render: renderReact18,
                spec: spec,

                // UI layout options
                // layoutIsExpanded: true,
                // layoutShowControls: false, // hides the side controls panel
                // layoutShowSequence: false, // hides sequence panel
                // layoutShowLog: false,      // hides bottom log
                // layoutShowLeftPanel: false,
                // layoutShowTopPanel: true,  // keep top bar (optional)
                // viewportShowExpand: true,  // keep expand button (optional)
                // viewportShowSelectionMode: false
            } );

            return new Promise<void>( ( resolve, reject ) => {
                try {

                    this._molstar_PluginUIContext_Reference_Promise.catch( reason => {

                        this._molstar_PluginUIContext_Reference_Promise = undefined

                        reject( reason )
                    } )
                    this._molstar_PluginUIContext_Reference_Promise.then( molstar_Plugin_Reference => {
                        try {

                            this._molstar_PluginUIContext_Reference_Promise = undefined

                            this._molstar_PluginUIContext_Reference = molstar_Plugin_Reference

                            //  Set the background color of viewer
                            this._molstar_PluginUIContext_Reference.canvas3d?.setProps( {
                                renderer: {
                                    backgroundColor: Molstar_Color( 0xFFFFFF )
                                }
                            } );

                            //  !!!!!!!!!  'lociLabelProvider' NOT currently used.  Requires work if it will be used

                            //   LOCI Label Provider.  Output is appended to the tooltip that Molstar displays

                            // const lociLabelProvider: LociLabelProvider = {
                            //     label: (loci) => {
                            //         if ( StructureElement.Loci.is( loci ) ) {
                            //
                            //             const location = StructureElement.Loci.getFirstLocation( loci ) // which is ok to use if you dont do many sequential queries
                            //
                            //             //  Alternate solution to get 'location'
                            //             // const location = StructureElement.Location.create();
                            //             // StructureElement.Loci.getFirstLocation( event.current.loci, location );
                            //
                            //             // const residueNumber = StructureProperties.residue.label_seq_id( location )
                            //
                            //             const residueNumber = StructureProperties.residue.label_seq_id( location )
                            //
                            //             const chainId_LabelAsymId = StructureProperties.chain.label_asym_id( location );
                            //
                            //             const chainData = this._chainData_Parsed_From_OnStructure_Map_Key_Label.get( chainId_LabelAsymId )
                            //             if ( ! chainData ) {
                            //                 const msg = ""
                            //             }
                            //
                            //             let limelight_ResidueNumber = "No Matched Residue Number"
                            //
                            //             let limelight_PSM_Count_WithLabel_String = ""
                            //
                            //             let limelight_Modifications_At_Position_WithLabel_String = ""
                            //
                            //             if ( this._chainMapping_ForCurrentProtein_Selected_Set_Values_LimelightAssigned_ChainId.has( chainId ) ) {
                            //
                            //                 //  Only add if displaying for this chain
                            //
                            //                 const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainId )
                            //                 if ( sequenceAlignment_DataForChain ) {
                            //
                            //                     const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
                            //                     if ( sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
                            //
                            //                         const limelightProteinSequence_Position =
                            //                             sequenceAlignment_DataForChain.
                            //                             structureFile__ProteinAlignment__CurrentProtein.
                            //                             get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( residueNumber )
                            //
                            //                         if ( limelightProteinSequence_Position ) {
                            //
                            //                             limelight_ResidueNumber = limelightProteinSequence_Position.toString()
                            //
                            //                             const proteinSequenceCoverage_Data_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )
                            //
                            //                             if ( proteinSequenceCoverage_Data_For_Position && proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters ) {
                            //                                 //  YES data at limelight position
                            //                                 limelight_PSM_Count_WithLabel_String = ", Limelight PSM Count pass all filters: " + proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters.toLocaleString()
                            //
                            //
                            //                                 const modifications_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.modifications_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )
                            //
                            //                                 if ( modifications_For_Position ) {
                            //                                     //  YES data at limelight position
                            //
                            //                                     if ( modifications_For_Position.modifications_Passes_PSM_Etc_Filters !== undefined && modifications_For_Position.modifications_Passes_PSM_Etc_Filters !== null ) {
                            //                                         //  YES data at modifications_Passes_PSM_Etc_Filters
                            //
                            //                                         limelight_Modifications_At_Position_WithLabel_String = ", YES modifications at position"
                            //                                     }
                            //                                 }
                            //
                            //                             }
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //
                            //             console.log( "Tooltip Addition: residueNumber: ( using label_seq_id( location ) ): " + residueNumber + ", chainId: " + chainId + ", limelight_ResidueNumber: " + limelight_ResidueNumber );
                            //
                            //             // const resultString = 'Custom Additional tooltip text.  Residue Number: ( using label_seq_id( location ) ): ' + residueNumber + ", chainId: " + chainId
                            //
                            //             const resultString = 'Custom Additional tooltip text.  Residue Number: ( using label_seq_id( location ) ): ' + residueNumber +
                            //                 ", chainId: " + chainId +
                            //                 ", limelight_ResidueNumber: " + limelight_ResidueNumber +
                            //                 limelight_PSM_Count_WithLabel_String +
                            //                 limelight_Modifications_At_Position_WithLabel_String +
                            //                 " END TOOLTIP ADDITION"
                            //
                            //             // const resultString = 'Custom.  Residue Number ' + residueNumber + ", chainId: " + chainId + ", ReNbr " + limelight_ResidueNumber
                            //
                            //             console.log( "Tooltip Addition: String added to Tooltip: ", resultString )
                            //
                            //             //  Text displayed in the tooltip shown in the lower right corner when hover over a part of the structure.   The string returned by the provider is rendered as HTML, so you can use <b>, <i>, or <br/> for formatting.
                            //             return resultString
                            //         }
                            //         return undefined
                            //     },
                            //     group: (entry) => { return 'custom' },
                            //     priority: undefined  //   Providers are called in the order they are added. Returning a string stops the chain; returning undefined allows the next provider (like the default "Chain A | Res 10") to run.
                            // }

                            //   TODO 'clearProviders()':  Remove the default Tooltip provider.  May want this.
                            this._molstar_PluginUIContext_Reference.managers.lociLabels.clearProviders()

                            // this._molstar_PluginUIContext_Reference.managers.lociLabels.addProvider(lociLabelProvider);

                            //  Remove it later (e.g., on a button click or component unmount)

                            // this._molstar_PluginUIContext_Reference.managers.lociLabels.removeProvider( lociLabelProvider )


                            /////////////////////////////////////

                            //  Click Handlers

                            //  Add Click Handler - Select/Unselect Residue

                            this._molstar_PluginUIContext_Reference.behaviors.interaction.click.subscribe( ( event: InteractivityManager.ClickEvent ) => {

                                // console.warn( "this._molstar_PluginUIContext_Reference.behaviors.interaction.click.subscribe callback START: event: ", event )

                                //  Code for click handler to get residue location taken from here: https://github.com/molstar/molstar/discussions/111#discussioncomment-457466

                                if ( event.modifiers.control || event.modifiers.meta ) {

                                    if ( StructureElement.Loci.is( event.current?.loci ) ) {

                                        const location = StructureElement.Loci.getFirstLocation( event.current?.loci ) // which is ok to use if you dont do many sequential queries

                                        //  Alternate solution to get 'location'
                                        // const location = StructureElement.Location.create();
                                        // StructureElement.Loci.getFirstLocation( event.current.loci, location );

                                        const sequenceInChain_Position = StructureProperties.residue.label_seq_id( location )

                                        // Extract the chain ID (label_asym_id is the standard mmCIF ID)
                                        const chain_label_asym_id = StructureProperties.chain.label_asym_id( location );

                                        const chainData = this._chainData_Parsed_From_OnStructure_Map_Key_Label.get( chain_label_asym_id )
                                        if ( ! chainData ) {

                                            const msg = "'.click.' handler:  this._chainData_Parsed_From_OnStructure_Map_Key_Label.get( chain_label_asym_id ) returned NOTHING for chain_label_asym_id '" + chain_label_asym_id + "' so ignoring the click"
                                            console.warn( msg )

                                        } else {

                                            const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )

                                            if ( sequenceAlignment_DataForChain ) {
                                                //  YES Alignment data for this chain

                                                const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )

                                                if ( sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
                                                    //  YES  Alignment data for this proteinSequenceVersionId

                                                    const limelightProteinSequence_Position =
                                                        sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )

                                                    console.log( "Clicked control or meta key held:  sequenceAlignment_DataForChain in : " + sequenceAlignment_DataForChain + ", limelightProteinSequence_Position: " + limelightProteinSequence_Position );

                                                    //  Toggle position

                                                    if ( this.props.proteinSequenceWidget_StateObject.has_selectedProteinSequencePosition( { position: limelightProteinSequence_Position } ) ) {
                                                        this.props.proteinSequenceWidget_StateObject.delete_selectedProteinSequencePosition( { position: limelightProteinSequence_Position } )
                                                    } else {
                                                        this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition( { position: limelightProteinSequence_Position } )
                                                    }

                                                    this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()
                                                }
                                            }
                                        }
                                    }
                                }
                            } );

                            //   END Click handler

                            //////////////////////////////

                            //  Add Mouse Over / Mouse Out callback when mouse over Sequence Position.   MAYBE use this for own HTML Tooltip???

                            {
                                const _PREV_LIMELIGHT_ASSIGNED__CHAIN_ID_NOT_SET: number = undefined
                                const _PREV_POSITION_NOT_SET: number = undefined
                                const _PREV_DISK_INDEX_NOT_SET: number = -1  // Index when NOT found

                                //  Hold some 'PREV' values here instead of creating more component object level properties

                                let prev_Hover_LimelightAssigned_ChainId: number = _PREV_LIMELIGHT_ASSIGNED__CHAIN_ID_NOT_SET

                                let prev_Hover_StructurePosition: number = _PREV_POSITION_NOT_SET

                                let prev_Hover_TrypsinCutPoint_DiskIndex = _PREV_DISK_INDEX_NOT_SET

                                // plugin is an instance of PluginUIContext
                                this._molstar_PluginUIContext_Reference.behaviors.interaction.hover.subscribe( event => {
                                    try {

                                        let found_Structure_Sequence_Location = false

                                        let found_TrypsinCutPoint_DiskIndex = false

                                        {
                                            const loci = event?.current?.loci;

                                            if ( loci ) {

                                                // console.warn( "IN 'behaviors.interaction.hover.subscribe': event?.current?.loci: ", event?.current?.loci )

                                                if ( loci.kind === 'element-loci' ) {

                                                    // MOUSE OVER: Cursor is over an element
                                                    if ( StructureElement.Loci.is( loci ) ) {
                                                        const location = StructureElement.Loci.getFirstLocation( loci );
                                                        if ( location ) {

                                                            found_Structure_Sequence_Location = true

                                                            // Extract sequence information
                                                            const structureSequence_InChain_Position = StructureProperties.residue.label_seq_id( location );

                                                            // Extract the chain ID (label_asym_id is the standard mmCIF ID)
                                                            const chain_label_asym_id = StructureProperties.chain.label_asym_id( location );

                                                            const chainData = this._chainData_Parsed_From_OnStructure_Map_Key_Label.get( chain_label_asym_id )
                                                            if ( ! chainData ) {

                                                                const msg = "'.hover.' handler:  this._chainData_Parsed_From_OnStructure_Map_Key_Label.get( chain_label_asym_id ) returned NOTHING for chain_label_asym_id '" + chain_label_asym_id + "' so ignoring the mouse over"
                                                                console.warn( msg )

                                                                return  // EARLY RETURN
                                                            }

                                                            if ( prev_Hover_LimelightAssigned_ChainId !== chainData.limelightAssigned_ChainId || prev_Hover_StructurePosition !== structureSequence_InChain_Position ) {

                                                                //  Change from previous hover.  Chain Id or Position.

                                                                //  Build new data and store for display tooltip on hover or update tooltip on hover.

                                                                const structure_ResidueName = StructureProperties.residue.label_comp_id( location );

                                                                let limelightProteinSequence_Position__ONE_BASED: number = undefined

                                                                const structureSequence_InChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                                                                if ( ! structureSequence_InChain ) {
                                                                    const msg = "this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING. chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
                                                                    console.warn( msg )
                                                                    throw Error( msg )
                                                                }

                                                                const subpart_FOR__Structure_ONLY: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Structure_ONLY = {
                                                                    chainData,
                                                                    structure_ResidueName,
                                                                    structureSequence_InChain,
                                                                    structureSequence_InChain_PositionNumber__From_label_seq_id__ONE_BASED: structureSequence_InChain_Position,
                                                                    sequenceAlignment_DataFor_ProteinSequenceVersionId: undefined  // set below
                                                                }

                                                                //  Create object to store

                                                                let subpart_FOR__Limelight_ONLY: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Limelight_ONLY = undefined

                                                                const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )

                                                                if ( sequenceAlignment_DataForChain ) {
                                                                    //  YES Alignment data for this chain

                                                                    const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )

                                                                    if ( sequenceAlignment_DataFor_ProteinSequenceVersionId ) {

                                                                        subpart_FOR__Structure_ONLY.sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataFor_ProteinSequenceVersionId

                                                                        //  YES  Alignment data for this proteinSequenceVersionId

                                                                        //   Residue Letters are computed here for BOTH Limelight Protein Sequence AND Structure Sequence. Structure Sequence position computed from adjacent Limelight Protein Sequence

                                                                        limelightProteinSequence_Position__ONE_BASED =
                                                                            sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( structureSequence_InChain_Position )

                                                                        if ( limelightProteinSequence_Position__ONE_BASED !== undefined && limelightProteinSequence_Position__ONE_BASED !== null ) {

                                                                            //  NOTE:  'limelightProteinSequence_Position' is ONE based and 'substring' is ZERO based

                                                                            const proteinSequenceCoverage_Data_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( limelightProteinSequence_Position__ONE_BASED )

                                                                            if ( proteinSequenceCoverage_Data_For_Position && proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters ) {

                                                                                //  YES data at limelight position

                                                                                subpart_FOR__Limelight_ONLY = {
                                                                                    limelight_PSM_Count: proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters,
                                                                                    modifications_At_Position__PassesAllFilters: false,
                                                                                    modifications_For_Position: undefined
                                                                                }

                                                                                const modifications_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.modifications_Map_Key_ProteinPosition.get( limelightProteinSequence_Position__ONE_BASED )

                                                                                if ( modifications_For_Position ) {
                                                                                    //  YES data at limelight position

                                                                                    if ( modifications_For_Position.modifications_Passes_ALL_Filters !== undefined && modifications_For_Position.modifications_Passes_ALL_Filters !== null ) {
                                                                                        //  YES data at modifications_Passes_PSM_Etc_Filters

                                                                                        subpart_FOR__Limelight_ONLY.modifications_At_Position__PassesAllFilters = true

                                                                                        subpart_FOR__Limelight_ONLY.modifications_For_Position = modifications_For_Position
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }


                                                                const newContents: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Root = {
                                                                    for__StructurePosition: {
                                                                        subpart_FOR__Limelight_ONLY,
                                                                        subpart_FOR__Structure_ONLY
                                                                    },
                                                                    for__TrypsinCutPoint_Disk: undefined
                                                                }

                                                                this._INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance.update_Contents__Residue_Tooltip__Tooltip_Contents__Component( newContents )

                                                                if ( this._currentMousePosition_X_Y ) {

                                                                    // mousePosition_X = this._currentMousePosition_X_Y.currentMousePosition_offsetX.toString()
                                                                    // mousePosition_Y = this._currentMousePosition_X_Y.currentMousePosition_offsetY.toString()

                                                                    this._position_Residue_Tooltip_BasedOn_CurrentMousePosition()
                                                                }

                                                                // console.log("*****************************************")
                                                                // console.log( `Hovering over: ${ structure_ResidueName } sequenceInChain_Position: ${ structureSequence_InChain_Position } (Chain ${ chainId }) label_entity_id: ${ label_entity_id }.  mousePosition_X: ${ mousePosition_X }, mousePosition_Y: ${ mousePosition_Y }` );
                                                                // console.log("*****************************************")

                                                            }

                                                            prev_Hover_LimelightAssigned_ChainId = chainData.limelightAssigned_ChainId
                                                            prev_Hover_StructurePosition = structureSequence_InChain_Position
                                                        }
                                                    }
                                                }


                                                if (
                                                    ShapeGroup.isLoci( loci )
                                                    && loci.shape.name === _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME
                                                    && loci.groups.length > 0 ) {

                                                    found_TrypsinCutPoint_DiskIndex = true

                                                    const diskIndex = OrderedSet.getAt( loci.groups[ 0 ].ids, 0 );

                                                    if ( diskIndex !== prev_Hover_TrypsinCutPoint_DiskIndex ) {

                                                        const disk = this._trypsinCutPoints_Current_Data_For_Molstar_Disks[ diskIndex ];
                                                        if ( disk ) {

                                                            // console.warn( "Disk Hovered On: ", disk )

                                                            const newContents: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Root = {
                                                                for__TrypsinCutPoint_Disk: disk,
                                                                for__StructurePosition: undefined
                                                            }

                                                            this._INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__ComponentInstance.update_Contents__Residue_Tooltip__Tooltip_Contents__Component( newContents )

                                                            if ( this._currentMousePosition_X_Y ) {

                                                                this._position_Residue_Tooltip_BasedOn_CurrentMousePosition()
                                                            }

                                                        }

                                                        prev_Hover_TrypsinCutPoint_DiskIndex = diskIndex;
                                                    }
                                                }
                                            }
                                        }


                                        if (
                                            (
                                                ( ! found_Structure_Sequence_Location ) && prev_Hover_StructurePosition !== _PREV_POSITION_NOT_SET
                                                && ( ! found_TrypsinCutPoint_DiskIndex )
                                            )
                                            ||
                                            (
                                                ( ! found_TrypsinCutPoint_DiskIndex ) && prev_Hover_TrypsinCutPoint_DiskIndex !== _PREV_DISK_INDEX_NOT_SET
                                                && ( ! found_Structure_Sequence_Location )
                                            )
                                        ) {

                                            // MOUSE OUT: The cursor moved away from a sequence position or structure element
                                            // console.log( 'Mouse out' );

                                            this._proteinStructure_ViewerContainer_Tooltip_Ref_IsDisplayed = false

                                            //  Hide tooltip
                                            this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref.current.style.display = "none"

                                        }

                                        if ( ! found_Structure_Sequence_Location ) {

                                            prev_Hover_LimelightAssigned_ChainId = _PREV_LIMELIGHT_ASSIGNED__CHAIN_ID_NOT_SET
                                            prev_Hover_StructurePosition = _PREV_POSITION_NOT_SET
                                        }

                                        if ( ! found_TrypsinCutPoint_DiskIndex ) {

                                            prev_Hover_TrypsinCutPoint_DiskIndex = _PREV_DISK_INDEX_NOT_SET
                                        }

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } );
                            }

                            // console.log( "Object.keys( this._molstar_PluginUIContext_Reference.managers ): " + Object.keys( this._molstar_PluginUIContext_Reference.managers ) );

                            resolve()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    } )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _position_Residue_Tooltip_BasedOn_CurrentMousePosition() {

        const left_Offset = 10

        let top_Bottom_Offset = 30
        // console.warn("top_Bottom_Offset = 30. window.innerHeight: " + window.innerHeight )
        if ( window.innerHeight > 1200 ) {
            top_Bottom_Offset = 110
            // console.warn("top_Bottom_Offset = 110. window.innerHeight: " + window.innerHeight )
        } else if ( window.innerHeight > 900 ) {
            top_Bottom_Offset = 80
            // console.warn("top_Bottom_Offset = 80. window.innerHeight: " + window.innerHeight )
        } else if ( window.innerHeight > 700 ) {
            top_Bottom_Offset = 55
            // console.warn("top_Bottom_Offset = 55. window.innerHeight: " + window.innerHeight )
        }


        this._proteinStructure_ViewerContainer_Tooltip_Ref_IsDisplayed = true

        this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref.current.style.display = "block"

        {
            // Position Outer container under mouse position

            const leftPx = this._currentMousePosition_X_Y.currentMousePosition_offsetX + left_Offset + _proteinStructure_ViewerContainer_Ref__BORDER_WIDTH
            this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref.current.style.left = leftPx + "px"

            this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref.current.style.top = ( this._currentMousePosition_X_Y.currentMousePosition_offsetY + left_Offset ) + "px"
        }

        // The use of 'left' vs right needs to take into account the scroll position

        if ( ( this._currentMousePosition_X_Y.currentMousePosition_clientX ) < ( window.innerWidth / 2 ) ) {

            // Set 'left' to offset to the right of mouse pointer
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.left = left_Offset + "px"
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.right = ""
        } else {

            // Set 'right' to offset to the left of mouse pointer
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.right = left_Offset + 20 + "px"
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.left = ""
        }

        // The use of 'top' vs bottom needs to take into account the scroll position

        if ( ( this._currentMousePosition_X_Y.currentMousePosition_clientY ) < ( window.innerHeight / 2 ) ) {

            // Set 'top' to offset to the bottom of mouse pointer
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.top = top_Bottom_Offset + "px"
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.bottom = ""
        } else {

            // Set 'bottom' to offset to the top of mouse pointer
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.bottom = top_Bottom_Offset + "px"
            this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref.current.style.top = ""
        }
    }

    /**
     * Initialize Mol* Instance - this._molstar_PluginUIContext_Reference
     */
    private _add_StructureData_PDB_Etc__TO__MolStar_Instance(): Promise<void> {
        try {
            /////////////

            if ( ! this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {
                return Promise.resolve()
            }

            {
                if ( this._add_StructureData_PDB_Etc__TO__MolStar_Instance__CallInProgress ||
                    Date.now() < ( this._add_StructureData_PDB_Etc__TO__MolStar_Instance__LastCalled + 1000 )
                ) {

                    //  Create a function that will be called at the end of this method.  If this method is called multiple times the last call will be saved to execute here.

                    this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function = async () => {
                        try {
                            this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function = null

                            await this._add_StructureData_PDB_Etc__TO__MolStar_Instance()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    }

                    return Promise.resolve()  // EARLY RETURN
                }
            }

            this._add_StructureData_PDB_Etc__TO__MolStar_Instance__CallInProgress = true


            this._show_Structure_PageBlock = true

            this.forceUpdate()

            return new Promise( ( resolve, reject ) => {
                try {

                    window.setTimeout( () => {
                        try {

                            const promise = this._add_StructureData_PDB_Etc__TO__MolStar_Instance__After__Set___show_Structure_PageBlock_true()
                            promise.catch( reason => reject( reason ) )
                            promise.then( value => {
                                try {

                                    resolve()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            } )

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    }, 50 )

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            } )


        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }


    /**
     * Initialize Mol* Instance - this._molstar_PluginUIContext_Reference
     */
    private async _add_StructureData_PDB_Etc__TO__MolStar_Instance__After__Set___show_Structure_PageBlock_true() {
        try {
            /////////////

            const structureFileId = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId
            const structureFile_PDB_ETC__DataFormat = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFile_PDB_ETC__DataFormat

            const structureFile_PDB_Etc_Contents =
                await
                    this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
                    get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value().
                    get_proteinSequenceStructureFile_Contents_for_StructureFileId_ReturnsPromise( structureFileId )

            //  Start creating Mol* instance
            await this._create_Or_Clear_MolStar_Instance()

            if ( ! this._molstar_PluginUIContext_Reference ) {
                return
            }

            this._structureFile_PDB_Etc_Contents__CurrentlyDisplayed = structureFile_PDB_Etc_Contents


            //  Reset saved data

            this._dataFor_ChimeraX_Download = {
                colorSpecs_Internal: [], modificationBalls_Internal: [], diskSpecs_Internal: []
            }


            /////////

            //  Then Render the contents of structureFile_PDB_Etc_Contents using format structureFile_PDB_ETC__DataFormat

            //  NOTE  This works with pdbString being the contents of the PDB file
            const proteinStructureFile_Data = await this._molstar_PluginUIContext_Reference.builders.data.rawData( {
                data: structureFile_PDB_Etc_Contents.proteinSequenceStructureFile_Contents,
                label: 'Structure Label Parameter Value'  //  TODO  Used in the Default tooltip in the lower right corner
            } );

            //   Do NOT use '.applyPreset(...,"default")' causes it to be harder to color everything later
            // await this._molstar_PluginUIContext_Reference.builders.structure.hierarchy.applyPreset(
            //     trajectory,
            //     "default"
            // );

            /////////

            //  Create Structure for below

            const proteinStructureFile_Trajectory = await this._molstar_PluginUIContext_Reference.builders.structure.parseTrajectory( proteinStructureFile_Data, structureFile_PDB_ETC__DataFormat );

            // Create a structure hierarchy
            const proteinStructureFile_Model = await this._molstar_PluginUIContext_Reference.builders.structure.createModel( proteinStructureFile_Trajectory );

            // console.warn( "*************  proteinStructureFile_Model  START" )
            //
            // console.warn( "proteinStructureFile_Model: ", proteinStructureFile_Model )
            // console.warn( "proteinStructureFile_Model.data: ", proteinStructureFile_Model.data )
            // console.warn( "proteinStructureFile_Model.data.label: ", proteinStructureFile_Model.data.label )
            // console.warn( "proteinStructureFile_Model.cell: ", proteinStructureFile_Model.cell )
            //
            // console.warn( "*************  proteinStructureFile_Model  END" )

            const structure_StateObjectSelector = await this._molstar_PluginUIContext_Reference.builders.structure.createStructure( proteinStructureFile_Model );

            // console.warn( "*************  structure_StateObjectSelector  START" )
            //
            // console.warn( "structure_StateObjectSelector: ", structure_StateObjectSelector )
            // console.warn( "structure_StateObjectSelector.data: ", structure_StateObjectSelector.data )
            // console.warn( "structure_StateObjectSelector.data.label: ", structure_StateObjectSelector.data.label )
            //
            // console.warn( "structure_StateObjectSelector.cell: ", structure_StateObjectSelector.cell )
            //
            // console.warn( "structure_StateObjectSelector.cell.obj: ", structure_StateObjectSelector.cell.obj )
            // console.warn( "structure_StateObjectSelector.cell.obj?.data: ", structure_StateObjectSelector.cell.obj?.data )
            //
            // console.warn( "*************  structure_StateObjectSelector  END" )

            const structure: Structure = structure_StateObjectSelector.cell.obj?.data

            if ( ! structure ) {
                const msg = "structure_StateObjectSelector.cell.obj?.data is null or undefined"
                console.warn( msg )
                throw Error( msg )
            }

            // console.warn( "*************  structure: Structure  START" )
            //
            // console.warn( "structure: ", structure )
            //
            // console.warn( "structure.label: ", structure.label )
            //
            // console.warn( "*************  structure: Structure  END" )

            {
                const compute_FromStructure_Result = _molstar_ListChains_SingleStructure_Returns__ChainData_Parsed__SequenceInChain_Map_Key_LimelightAssigned_ChainId( structure )

                this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array = compute_FromStructure_Result.result__structureFile_Contents__ChainsData_Entry_Array
                this._chainData_Parsed_From_OnStructure_In_Label_Order_Array = compute_FromStructure_Result.result__structureFile_Contents__ChainsData_Entry_Array
                this._sequenceInChain_Map_Key_LimelightAssigned_ChainId = compute_FromStructure_Result.sequenceInChain_Map_Key_LimelightAssigned_ChainId

                this._chainData_Parsed_From_OnStructure_Map_Key_Label = new Map()

                if ( ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) || this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length === 0 ) {

                    //  NO structures to retrieve Chain Labels from

                    //  TODO

                    // const msg = "NO structures to retrieve Chain Labels from"
                    // console.warn(msg)
                    // throw Error(msg)

                } else {

                    this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.sort( ( a, b ) => {
                        if ( a.chainId_Label_AssignedAt_StructureFileCreation < b.chainId_Label_AssignedAt_StructureFileCreation ) {
                            return -1
                        }
                        if ( a.chainId_Label_AssignedAt_StructureFileCreation > b.chainId_Label_AssignedAt_StructureFileCreation ) {
                            return 1
                        }
                        return 0
                    } )

                    for ( const entry of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {
                        this._chainData_Parsed_From_OnStructure_Map_Key_Label.set( entry.chainId_Label_AssignedAt_StructureFileCreation, entry )
                    }
                }

                // console.warn( "*************  Chains  Sequence Length and Sequence  START" )
                //
                // for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {
                //
                //     const sequenceInChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                //
                //     if ( sequenceInChain ) {
                //
                //         console.warn( "chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId + ":  sequenceInChain Length: " + sequenceInChain.length + ":    sequenceInChain: " + sequenceInChain )
                //     } else {
                //
                //         console.warn( "chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId + ":  NO entry in this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainId ) " )
                //     }
                // }
                //
                // console.warn( "*************  Chains  Sequence Length and Sequence  END" )

            }

            if ( ( ! this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) || this._chainData_Parsed_From_OnStructure_In_Label_Order_Array.length === 0 ) {

                //  NO structures to retrieve Chain Labels from

                //  TODO

                // const msg = "NO structures to retrieve Chain Labels from"
                // console.warn(msg)
                // throw Error(msg)

                // this._chainLabels_Array_Sorted_OnStructure = null
            } else {

                // this._chainLabels_Array_Sorted_OnStructure = Array.from( this._chainLabels_Set_OnStructure ).sort()

                this.forceUpdate()
            }

            // this._molstar_PluginUIContext_Reference.labelProvider.add
            //
            // this._molstar_PluginUIContext_Reference.managers.labels
            //
            // this._molstar_PluginUIContext_Reference.managers.labels.add({
            //     label: (loci) => {
            //         // e.current.repr is usually available in the hover stream,
            //         // but for a provider, we check the loci's source.
            //         if (StructureElement.Loci.is(loci)) {
            //             const location = StructureElement.Loci.getFirstLocation(loci);
            //             if (location) {
            //                 const seqId = StructureProperties.residue.label_seq_id(location);
            //
            //                 // Option A: Check against a list of residue numbers you added
            //                 if ([10, 25, 40].includes(seqId)) {
            //                     return `<b>Active Site Ball</b>: Residue ${seqId}`;
            //                 }
            //             }
            //         }
            //         return undefined; // Fallback to default labels
            //     }
            // });
            //
            // this._molstar_PluginUIContext_Reference.managers.labels.add({
            //     label: (loci) => {
            //         if (StructureElement.Loci.is(loci)) {
            //             const location = StructureElement.Loci.getFirstLocation(loci);
            //             if (location) {
            //                 // Check if this residue is part of your 'ball' component
            //                 // You can check by residue ID or by the representation ref
            //                 const seqId = StructureProperties.residue.label_seq_id(location);
            //
            //                 // Example: If it's one of the residues you highlighted
            //                 if ([10, 25, 40].includes(seqId)) {
            //                     return `<b>Active Site</b>: Residue ${seqId}`;
            //                 }
            //             }
            //         }
            //         return undefined;
            //     }
            // });
            //
            // this._molstar_PluginUIContext_Reference.managers.structure.label.addProvider({
            //     label: (loci) => {
            //         if (StructureElement.Loci.is(loci)) {
            //             const location = StructureElement.Loci.getFirstLocation(loci);
            //             if (location) {
            //                 const seqId = StructureProperties.residue.label_seq_id(location);
            //                 // Only show custom tooltip for specific residues
            //                 if ([10, 25, 40].includes(seqId)) {
            //                     return `<b>Critical Residue</b>: Important for binding`;
            //                 }
            //             }
            //         }
            //         return undefined; // Fall back to default Mol* tooltip
            //     },
            //     name: 'custom-residue-tooltip'
            // });

            ////////////////////////////////////////////////////////

            //  TODO  NEW CODE for Overpaint

            ////////    New code to render the structure and then later use OverPaint so set a color

            //   Add all chains with dark grey / black and then use OverPaint so set a color

            for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {

                const polymer_Full_Expression = _molstar__PolymerExpression( chainData.chainId_Label_AssignedAt_StructureFileCreation );


                {  //   Render/Color positions in color that indicates that do not align to limelight protein sequence.
                    //      Will use Overpaint to change color to indicate otherwise

                    const componentKey = 'structure_not_align_protein_chain_' + chainData.limelightAssigned_ChainId  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
                    const componentLabel = 'Structure NOT Align Protein Chain ' + chainData.limelightAssigned_ChainId

                    const color = _Molstar_StructureColor_ChainNotAlignedOrNotCurrentlyDisplayed__ResiduesInChainNotAligned

                    const component = await this._molstar_PluginUIContext_Reference.builders.structure.
                    tryCreateComponentFromExpression( structure_StateObjectSelector, polymer_Full_Expression, componentKey, { label: componentLabel } )

                    if ( component ) {

                        const type_Representation = this._selected__STRUCTURE_Display_Type as any

                        await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
                            type: type_Representation, //   "cartoon",
                            color: 'uniform',
                            colorParams: { value: color },
                        } );
                    }
                }
            }

            // Wait until the structure propagates to the hierarchy manager
            await new Promise<void>( ( resolve ) => {
                const iv = setInterval( () => {
                    if ( this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures.length > 0 ) {
                        clearInterval( iv );
                        resolve();
                    }
                }, 100 );
            } );


            //  Reset Molstar viewer Camera to ensure whole structure is visible.  Viewer sometimes ends up zoomed in after structure is added

            this._molstar_PluginUIContext_Reference.managers.camera.reset();

            /////////////

            //   NOTE:  IF uncomment following call to 'this._addRepresentation_ToStructure_TO_Format_and_Color'
            //              need to comment out code above block 'Add all chains with dark grey / black and then use OverPaint so set a color'


            //  TODO  OLD CODE before Overpaint

            // console.warn( "REMOVED  CALL   this._addRepresentation_ToStructure_TO_Format_and_Color(...)" )

            // await this._addRepresentation_ToStructure_TO_Format_and_Color( { structure_StateObjectSelector_Param: structure_StateObjectSelector } )

            /////////////

            //  TODO  NEW CODE for Overpaint

            await this._update_AllParts_Of_CurrentStructure()

            //////////////////

            // Render Done.  Check if triggered to render again during render and do another render so displaying the latest data.

            if ( this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function ) {

                //  This method was called while a previous call was in progress.  Now execute this new call

                window.setTimeout( async () => () => {
                    try {

                        console.warn( "Populated: this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function.  Inside window.setTimeout(...)" )

                        if ( this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function ) {

                            console.warn( "Populated: this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function.  Inside window.setTimeout(...). Populated: this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function.  " )

                            this._add_StructureData_PDB_Etc__TO__MolStar_Instance__ExecuteAgain_Function()
                        }

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                }, 1000 )
            }

            this._add_StructureData_PDB_Etc__TO__MolStar_Instance__CallInProgress = false

            this._add_StructureData_PDB_Etc__TO__MolStar_Instance__LastCalled = Date.now()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * Update Residue Color, Modification Balls, and Trypsin Cut Point disks for current structure.
     *
     * Does NOT redraw the structure
     *
     */
    private async _update_AllParts_Of_CurrentStructure() { try {

        console.log( "_update_AllParts_Of_CurrentStructure() called" )

        if ( ! this._molstar_PluginUIContext_Reference ) {

            //  NO this._molstar_PluginUIContext_Reference so problem

            try {
                const msg = "_update_AllParts_Of_CurrentStructure(): Throw Error: if ( ! this._molstar_PluginUIContext_Reference ) { "
                console.warn(msg)
                throw Error(msg)

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e, skipDisplayErrorOverlay_SkipCall__errorDisplay_WhenHave_Javascript_Typescript_Error: true } );
                // throw e
            }

            //  return and assume this will be called again after 'this._molstar_PluginUIContext_Reference' is populated.

            const msg = "_update_AllParts_Of_CurrentStructure(): WARN: if ( ! this._molstar_PluginUIContext_Reference ) { "
            console.warn(msg)
            return  // EARLY RETURN
        }

        //   Set color of residues in structure chains, setting the color of each residue as required for sequence coverage or user selected color for residue letter

        await this._set_Color_To_Residues_In_Chains_In_Structure_TO_Format_and_Color()


        //////////////////

        //  Add Balls for Modifications

        await this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

        //  Next call to add Disks for Trypsin Cut Points

        await this._addDisks_for_TrypsinCutPoints__FirstDeleteExistingDisks()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }}

    /**
     * Set the color of each residue as required for sequence coverage or user selected color for residue letter.
     *
     * Set across chains.
     *
     * Use Molstar Overpaint
     *
     */
    private async _set_Color_To_Residues_In_Chains_In_Structure_TO_Format_and_Color() {
        try {
            //  Get structure_StateObjectSelector

            if ( ! this._molstar_PluginUIContext_Reference ) {

                //  NO this._molstar_PluginUIContext_Reference so problem

                const msg = "_set_Color_To_Residues_In_Chains_In_Structure_TO_Format_and_Color Throw Error: if ( ! this._molstar_PluginUIContext_Reference ) { "
                console.warn(msg)
                throw Error(msg)

                // return  // EARLY RETURN
            }

            const structureRef_Array = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
            if ( structureRef_Array.length === 0 ) {

                //  NO Structures so problem

                const msg = "_set_Color_To_Residues_In_Chains_In_Structure_TO_Format_and_Color Throw Error: if ( structureRef_Array.length === 0 ) { "
                console.warn(msg)
                throw Error(msg)

                // return  // EARLY RETURN
            }
            if ( structureRef_Array.length > 1 ) {

                //  > 1 Structures so problem

                const msg = "_set_Color_To_Residues_In_Chains_In_Structure_TO_Format_and_Color throw error: if ( structureRef_Array.length > 1 ) { "
                console.warn(msg)
                throw Error(msg)

                // return  // EARLY RETURN
            }

            const structureRef_First = structureRef_Array[ 0 ]

            { // Remove existing Overpaint

                await setStructureOverpaint(
                    this._molstar_PluginUIContext_Reference,
                    structureRef_First.components,
                    // -1 is the sentinel value Molstar uses to mean "remove colour"
                    -1 as unknown as Molstar_Color,
                    // StructureElement.Loci.all covers every atom — safe for clearing
                    async (structure: Structure) => StructureElement.Loci.all(structure)
                );
            }
            {
                //  Reset residue colors passed to ChimeraX

                this._dataFor_ChimeraX_Download.colorSpecs_Internal = []
            }

            // const structure_StateObjectSelector = structureRef_First?.cell
            //
            // if ( ! structure_StateObjectSelector ) {
            //
            //     const msg = "structure_StateObjectSelector = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]?.cell and also structure_StateObjectSelector_Param NOT Populated"
            //     console.warn(msg)
            //     throw Error(msg)
            // }

            ///////////

            // Process Chains

            for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {

                if ( ! this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) ) {
                    // NOT currently displaying data for this chain so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                if ( ! sequenceAlignment_DataForChain ) {
                    //  NO Alignment data for this chain so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
                if ( ! sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
                    //  NO Alignment data for this proteinSequenceVersionId so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceInChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                if ( ! sequenceInChain ) {
                    const msg = "this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING. chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
                    console.warn( msg )
                    throw Error( msg )
                }

                let componentCounter_WithinCurrentChain = 0

                ////////

                //   Inline function to actually add Color to Residue Positions that will be called from just below it

                const _inlineFcn_InMethod__Add_Color_For_ResiduePositions_And_Color__Using_Molstar_Overpaint = async (
                    {
                        sequenceInChain_Positions,
                        color__MolstarColor
                    }: {
                        sequenceInChain_Positions: Array<number>
                        color__MolstarColor: Molstar_Color
                    }
                ) => {
                    try {
                        if ( ! color__MolstarColor ) {

                            const msg = "( ! color__MolstarColor ) IN _inlineFcn_InMethod__Add_Color_For_ResiduePositions_And_Color__Using_Molstar_Overpaint"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        this._dataFor_ChimeraX_Download.colorSpecs_Internal.push({
                            chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
                            residueSeqId__label_seq_id__Array: sequenceInChain_Positions,
                            color__MolstarColor: color__MolstarColor
                        })

                        const sequenceIdProperty = MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id();

                        const targetChain = chainData.chainId_Label_AssignedAt_StructureFileCreation; // The chain ID

                        const molstar_AtomGroup_Params: Record<string, Expression> = {
                            'chain-test': MolScriptBuilder.core.rel.eq( [ MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(), targetChain ] ),
                            'residue-test': MolScriptBuilder.core.set.has( [
                                MolScriptBuilder.core.type.set( sequenceInChain_Positions ),
                                sequenceIdProperty,
                            ] ),
                        }

                        const molstarExpression_SelectPositions = MolScriptBuilder.struct.generator.atomGroups( molstar_AtomGroup_Params );

                        //  'setStructureOverpaint' definition:
                        // export async function setStructureOverpaint(plugin: PluginContext, components: StructureComponentRef[], color: Color | -1, lociGetter: (structure: Structure) => Promise<StructureElement.Loci | EmptyLoci>, types?: string[]) {
                        //     await eachRepr(plugin, components, async (update, repr, overpaintCell) => {

                        await setStructureOverpaint(
                            this._molstar_PluginUIContext_Reference,
                            structureRef_First.components,
                            color__MolstarColor,
                            async ( structure: Structure ) => {
                                const sel = Script.getStructureSelection(
                                    molstarExpression_SelectPositions,
                                    structure
                                );
                                return StructureSelection.toLociWithSourceUnits( sel );
                            }
                        );

                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }
                }   //  END  function: _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color

                {
                    const sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions = new Set( sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set() )

                    const structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter: Set<number> = new Set()

                    {
                        //  Color Residue Positions for User selection of residue letters and their colors

                        const stateObject__ResidueLetter_AND_Color_Selection_Root = this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root()

                        const structurePositions_Set_Map_Key_ResidueLetter: Map<string, Set<number>> = new Map()

                        for ( let sequenceInChain_Position = 1; sequenceInChain_Position <= sequenceInChain.length; sequenceInChain_Position++ ) {

                            const limelightProteinSequence_Position = sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )

                            if ( limelightProteinSequence_Position === undefined || limelightProteinSequence_Position === null ) {
                                //  Does NOT map to a limelight position
                                continue  // EARLY CONTINUE
                            }

                            const residueLetter_AtPosition = this.props.proteinSequenceString.charAt( limelightProteinSequence_Position - 1 ) // '- 1' since position is ONE based

                            const entry_For_ResidueLetter = stateObject__ResidueLetter_AND_Color_Selection_Root.get_Entry_For_ResidueLetter( residueLetter_AtPosition )

                            if ( entry_For_ResidueLetter && entry_For_ResidueLetter.residueLetter_SelectedForDisplay ) {

                                let structurePositions_Set = structurePositions_Set_Map_Key_ResidueLetter.get( residueLetter_AtPosition )
                                if ( ! structurePositions_Set ) {
                                    structurePositions_Set = new Set()
                                    structurePositions_Set_Map_Key_ResidueLetter.set( residueLetter_AtPosition, structurePositions_Set )
                                }

                                structurePositions_Set.add( sequenceInChain_Position )

                                structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.add( sequenceInChain_Position )

                                sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions.delete( sequenceInChain_Position )
                            }
                        }

                        for ( const structurePositions_Set_Map_Key_ResidueLetter_Entry of structurePositions_Set_Map_Key_ResidueLetter.entries() ) {

                            const residueLetter = structurePositions_Set_Map_Key_ResidueLetter_Entry[ 0 ]
                            const structurePositions_Set = structurePositions_Set_Map_Key_ResidueLetter_Entry[ 1 ]

                            const structurePositions_Array = Array.from( structurePositions_Set )

                            const residueLetter_AND_Color_Selection = stateObject__ResidueLetter_AND_Color_Selection_Root.get_Entry_For_ResidueLetter( residueLetter )

                            let color_Selection = residueLetter_AND_Color_Selection.color__SixHex_WithLeading_Hash

                            if ( ! color_Selection ) {

                                color_Selection = _SEQUENCE_SINGLE_POSITION__COLOR_FOR_LIMELIGHT_PROTEIN_SEQUENCE_LETTER__DEFAULT_COLOR
                            }

                            const color_Selection_For_Molstar = _color__SixHex_WithLeading_Hash__TO__MolstarColor( color_Selection )

                            {
                                const residueIds: Array<number> = structurePositions_Array //  TODO Unclear if need to map from Auth

                                // structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );

                                await _inlineFcn_InMethod__Add_Color_For_ResiduePositions_And_Color__Using_Molstar_Overpaint( {
                                    color__MolstarColor: color_Selection_For_Molstar, sequenceInChain_Positions: residueIds
                                } )
                            }
                        }
                    }

                    //  Color Residue Position based on Sequence Coverage.  Scale color for PSM Count if user input 'Shade by PSM Count'.  Have User input 'Max PSM Count for shading'

                    const psmCount_PassesAllFilters_Fraction_FAKE_VALUE_1 = 1  // Set local fraction to 1 if no fraction value

                    //  Combine sequenceInChain_Position values with same color from Fraction.  This reduces the call to 'addRepresentation'
                    const sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: Map<number, {
                        sequenceInChain_Position_Entry_Array: Array<number>
                        psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: number
                    }> = new Map()

                    for ( let sequenceInChain_Position = 1; sequenceInChain_Position <= sequenceInChain.length; sequenceInChain_Position++ ) {

                        if ( structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.has( sequenceInChain_Position ) ) {
                            //  Already rendered this position in "Color By Residue Letter" so SKIP

                            continue  // EARLY CONTINUE
                        }

                        const limelightProteinSequence_Position = sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )

                        if ( limelightProteinSequence_Position === undefined || limelightProteinSequence_Position === null ) {
                            //  Does NOT map to a limelight position
                            continue  // EARLY CONTINUE
                        }

                        const proteinSequenceCoverage_Data_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )

                        if ( ! proteinSequenceCoverage_Data_For_Position ) {
                            //  No data at limelight position
                            continue  // EARLY CONTINUE
                        }

                        if ( proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === undefined || proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === null ) {
                            //  No psmCount_PassesAllFilters data at limelight position
                            continue  // EARLY CONTINUE

                            //  TODO  Need something different if color different between NOT covered at current filters and Not covered due to no map from Limelight protein to structure protein at position
                        }

                        sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions.delete( sequenceInChain_Position )

                        let psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 = psmCount_PassesAllFilters_Fraction_FAKE_VALUE_1

                        if ( this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count() ) {

                            if ( proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction !== undefined && proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction !== null ) {

                                psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 = proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction
                            }
                        }

                        {
                            let sequenceInChain_Position_Array_Entry = sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.get( psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 )
                            if ( ! sequenceInChain_Position_Array_Entry ) {
                                sequenceInChain_Position_Array_Entry = {
                                    psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1,
                                    sequenceInChain_Position_Entry_Array: []

                                }
                                sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.set( psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1, sequenceInChain_Position_Array_Entry )
                            }
                            sequenceInChain_Position_Array_Entry.sequenceInChain_Position_Entry_Array.push( sequenceInChain_Position )
                        }
                    }

                    {
                        const sequenceInChain_Position_Array_Entry_Array = Array.from( sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.values() )

                        sequenceInChain_Position_Array_Entry_Array.sort( ( a, b ) => {
                            if ( a.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 < b.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 ) {
                                return -1
                            }
                            if ( a.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 > b.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 ) {
                                return 1
                            }
                            return 0
                        } )

                        {
                            for ( let sequenceInChain_Position_Array_Entry_Array_Index = 0; sequenceInChain_Position_Array_Entry_Array_Index < sequenceInChain_Position_Array_Entry_Array.length; sequenceInChain_Position_Array_Entry_Array_Index++ ) {

                                const sequenceInChain_Position_Array_Entry = sequenceInChain_Position_Array_Entry_Array[ sequenceInChain_Position_Array_Entry_Array_Index ]

                                const sequenceInChain_Position_Entry_Array__BEFORE__FilterOn_ColorByResidueLetter = sequenceInChain_Position_Array_Entry.sequenceInChain_Position_Entry_Array

                                const sequenceInChain_Position_Entry_Array__AFTER__FilterOn_ColorByResidueLetter =
                                    sequenceInChain_Position_Entry_Array__BEFORE__FilterOn_ColorByResidueLetter.filter( value => {
                                        if ( structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.has( value ) ) {
                                            //  Already rendered this position in "Color By Residue Letter" so SKIP
                                            return false
                                        }
                                        return true
                                    } )

                                let colorInterpolate_Fraction = sequenceInChain_Position_Array_Entry.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1

                                //  Rescale 'colorInterpolate_Fraction'.  Assume input is zero to one.

                                {
                                    const rescale_Range = _Molstar__SequenceCoverage_MinMax_Colors__Fraction.max_Fraction_PassedTo_Molstar_Interpolate - _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate

                                    const colorInterpolate_Fraction__FractionOf_RescaleRange = colorInterpolate_Fraction * rescale_Range

                                    colorInterpolate_Fraction = colorInterpolate_Fraction__FractionOf_RescaleRange + _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate
                                }

                                const color_SequenceCoverage = _color__SixHex_WithLeading_Hash__TO__MolstarColor (
                                    _scaleColor_BasedOn_Fraction_Object.scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat( colorInterpolate_Fraction )
                                )

                                {
                                    const residueIds: Array<number> = sequenceInChain_Position_Entry_Array__AFTER__FilterOn_ColorByResidueLetter //  TODO Unclear if need to map from Auth

                                    // const residues_Expression = _molstar__ResidueSetExpression( {
                                    //     residueIds,
                                    //     chainId: chainData.chainId_Label_AssignedAt_StructureFileCreation
                                    // } )

                                    // structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );

                                    await _inlineFcn_InMethod__Add_Color_For_ResiduePositions_And_Color__Using_Molstar_Overpaint( {
                                        color__MolstarColor: color_SequenceCoverage, sequenceInChain_Positions: residueIds
                                    } )
                                }
                            }
                        }
                    }

                    {  //   Render/Color positions that aligns to Limelight sequence but NO sequence coverage

                        const residueIds: Array<number> = Array.from( sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions ) //  TODO Unclear if need to map from Auth

                        // const residues_Expression = _molstar__ResidueSetExpression( {
                        //     residueIds,
                        //     chainId: chainData.chainId_Label_AssignedAt_StructureFileCreation
                        // } )


                        // structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );

                        const color = Molstar_Color( 0xCCCCCC ) // Grey for aligns to Limelight sequence but NO sequence coverage

                        await _inlineFcn_InMethod__Add_Color_For_ResiduePositions_And_Color__Using_Molstar_Overpaint( {
                            color__MolstarColor: color, sequenceInChain_Positions: residueIds
                        } )
                    }
                }
            }


        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }


    //   OLD CODE BEFORE use Overpaint.  This code applied residue color while add residues to structure in viewer using addRepresentation

    // /**
    //  * Add the structure chains, setting the color of each residue as required for sequence coverage or user selected color for residue letter
    //  *
    //  * @private
    //  */
    // private async _addRepresentation_ToStructure_TO_Format_and_Color(
    //     {
    //         structure_StateObjectSelector_Param
    //     }: {
    //         structure_StateObjectSelector_Param: any
    //     }
    // ) {
    //     try {
    //
    //
    //         //  Remove Existing Representations
    //
    //         {
    //             const structures = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
    //
    //
    //             // Flatten the list of all components from all structures
    //             const allComponents = structures.flatMap( s => s.components );
    //
    //
    //             // This now matches the expected type: readonly StructureComponentRef[]
    //             await this._molstar_PluginUIContext_Reference.managers.structure.component.removeRepresentations( allComponents );
    //         }
    //
    //         // this._molstar_PluginUIContext_Reference.builders.structure
    //
    //         /////////////
    //
    //         //  OLD code for call '.addRepresentation(...)'
    //         // Add it to the plugin’s hierarchy for visualization
    //         //         await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation(structure_StateObjectSelector, {
    //         //             type: 'cartoon',
    //         //             color: 'chain-id'
    //         //         });
    //
    //
    //         // const structureRef_FirstStructureUnder_Current_FromPlugin = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]
    //
    //         let structure_StateObjectSelector = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]?.cell
    //
    //         if ( ! structure_StateObjectSelector ) {
    //
    //             structure_StateObjectSelector = structure_StateObjectSelector_Param
    //         }
    //
    //         {
    //
    //             //  Color by Protein Coverage.  TODO   how to color different shades.  Maybe need a call to '.addRepresentation(...)' for each shade of coverage color.
    //
    //             //  Color by Sequence Coverage
    //
    //             for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {
    //
    //                 const polymer_Full_Expression = _molstar__PolymerExpression( chainData.chainId_Label_AssignedAt_StructureFileCreation );
    //                 let structure_NOT_Align_To_LimelightProteinSequence_Expression = polymer_Full_Expression
    //
    //                 if ( this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) ) {
    //
    //                     // YES displaying data for this chain id
    //
    //                     const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
    //
    //                     if ( sequenceAlignment_DataForChain ) {
    //                         //  YES Alignment data for this chain
    //
    //                         const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
    //
    //                         if ( sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
    //                             //  YES  Alignment data for this proteinSequenceVersionId
    //
    //                             const sequenceInChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
    //                             if ( ! sequenceInChain ) {
    //                                 const msg = "this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING. chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
    //                                 console.warn( msg )
    //                                 throw Error( msg )
    //                             }
    //
    //                             const sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions = new Set( sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__sequenceInChain_Positions_ThatAlignTo_LimelightProteinSequencePositions_Set() )
    //
    //                             const structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter: Set<number> = new Set()
    //
    //                             {
    //                                 const stateObject__ResidueLetter_AND_Color_Selection_Root = this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root()
    //
    //                                 const structurePositions_Set_Map_Key_ResidueLetter: Map<string, Set<number>> = new Map()
    //
    //                                 for ( let sequenceInChain_Position = 1; sequenceInChain_Position <= sequenceInChain.length; sequenceInChain_Position++ ) {
    //
    //                                     const limelightProteinSequence_Position = sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )
    //
    //                                     if ( limelightProteinSequence_Position === undefined || limelightProteinSequence_Position === null ) {
    //                                         //  Does NOT map to a limelight position
    //                                         continue  // EARLY CONTINUE
    //                                     }
    //
    //                                     const residueLetter_AtPosition = this.props.proteinSequenceString.substring( ( limelightProteinSequence_Position - 1 ), limelightProteinSequence_Position ) // '- 1' since position is ONE based
    //
    //                                     if ( stateObject__ResidueLetter_AND_Color_Selection_Root.get_Entry_For_ResidueLetter( residueLetter_AtPosition ) ) {
    //
    //                                         let structurePositions_Set = structurePositions_Set_Map_Key_ResidueLetter.get( residueLetter_AtPosition )
    //                                         if ( ! structurePositions_Set ) {
    //                                             structurePositions_Set = new Set()
    //                                             structurePositions_Set_Map_Key_ResidueLetter.set( residueLetter_AtPosition, structurePositions_Set )
    //                                         }
    //
    //                                         structurePositions_Set.add( sequenceInChain_Position )
    //
    //                                         structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.add( sequenceInChain_Position )
    //
    //                                         sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions.delete( sequenceInChain_Position )
    //                                     }
    //                                 }
    //
    //                                 for ( const structurePositions_Set_Map_Key_ResidueLetter_Entry of structurePositions_Set_Map_Key_ResidueLetter.entries() ) {
    //
    //                                     //
    //                                     const residueLetter = structurePositions_Set_Map_Key_ResidueLetter_Entry[ 0 ]
    //                                     const structurePositions_Set = structurePositions_Set_Map_Key_ResidueLetter_Entry[ 1 ]
    //
    //                                     const structurePositions_Array = Array.from( structurePositions_Set )
    //
    //                                     const residueLetter_AND_Color_Selection = stateObject__ResidueLetter_AND_Color_Selection_Root.get_Entry_For_ResidueLetter( residueLetter )
    //
    //                                     let color_Selection = residueLetter_AND_Color_Selection.color__SixHex_WithLeading_Hash
    //
    //                                     if ( ! color_Selection ) {
    //
    //                                         color_Selection = _SEQUENCE_SINGLE_POSITION__COLOR_FOR_LIMELIGHT_PROTEIN_SEQUENCE_LETTER__DEFAULT_COLOR
    //                                     }
    //
    //                                     if ( color_Selection.substring( 0, 1 ) !== "#" ) {
    //                                         const msg = "residueLetter_AND_Color_Selection.color__SixHex_WithLeading_Hash does NOT start with '#'. is: " + color_Selection
    //                                         console.warn( msg )
    //                                         throw Error( msg )
    //                                     }
    //
    //                                     const color_Selection_WithoutHash = color_Selection.substring( 1 )
    //
    //                                     if ( color_Selection_WithoutHash.length !== 6 ) {
    //                                         const msg = "( color_Selection_WithoutHash.length !== 6 )  color_Selection_WithoutHash: " + color_Selection_WithoutHash
    //                                         console.warn( msg )
    //                                         throw Error( msg )
    //                                     }
    //
    //                                     const color_Selection_Formatted_For_Molstar = _LIMELIGHT_COLORS_FORMATTED_FOR_MOLSTAR__HEX_COLOR_STRING_PREFIX + color_Selection_WithoutHash
    //
    //                                     const color_Selection_For_Molstar = Molstar_Color.fromHexString( color_Selection_Formatted_For_Molstar )
    //
    //                                     {
    //                                         const residueIds: Array<number> = structurePositions_Array //  TODO Unclear if need to map from Auth
    //
    //                                         const residues_Expression = _molstar__ResidueSetExpression( {
    //                                             residueIds,
    //                                             chainId: chainData.chainId_Label_AssignedAt_StructureFileCreation
    //                                         } )
    //
    //                                         structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );
    //
    //                                         const color = color_Selection_For_Molstar
    //
    //                                         const componentKey = 'color_by_residue_chain_' + chainData.limelightAssigned_ChainId + "_color_by_residue_" + residueLetter  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
    //                                         const componentLabel = 'Residue_' + residueLetter
    //
    //                                         const component = await this._molstar_PluginUIContext_Reference.builders.structure
    //                                             .tryCreateComponentFromExpression( structure_StateObjectSelector, residues_Expression, componentKey, { label: componentLabel } );
    //
    //                                         if ( component ) {
    //
    //                                             this._dataFor_ChimeraX_Download.colorSpecs_Internal.push( {
    //                                                 chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
    //                                                 residueSeqId__label_seq_id__Array: residueIds,
    //                                                 color__MolstarColor: color
    //                                             } )
    //
    //                                             const type_Representation = this._selected__STRUCTURE_Display_Type as any
    //
    //                                             await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
    //                                                 type: type_Representation,
    //                                                 color: 'uniform',
    //                                                 // ssss: null,  //  TODO  Shows that the Typescript type does NOT validate these properties
    //                                                 colorParams: { value: color },
    //                                             } );
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //
    //                             const psmCount_PassesAllFilters_Fraction_FAKE_VALUE_1 = 1  // Set local fraction to 1 if no fraction value
    //
    //                             //  Combine sequenceInChain_Position values with same color from Fraction.  This reduces the call to 'addRepresentation'
    //                             const sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: Map<number, {
    //                                 sequenceInChain_Position_Entry_Array: Array<number>
    //                                 psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: number
    //                             }> = new Map()
    //
    //                             for ( let sequenceInChain_Position = 1; sequenceInChain_Position <= sequenceInChain.length; sequenceInChain_Position++ ) {
    //
    //                                 if ( structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.has( sequenceInChain_Position ) ) {
    //                                     //  Already rendered this position in "Color By Residue Letter" so SKIP
    //
    //                                     continue  // EARLY CONTINUE
    //                                 }
    //
    //                                 const limelightProteinSequence_Position = sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )
    //
    //                                 if ( limelightProteinSequence_Position === undefined || limelightProteinSequence_Position === null ) {
    //                                     //  Does NOT map to a limelight position
    //                                     continue  // EARLY CONTINUE
    //                                 }
    //
    //                                 const proteinSequenceCoverage_Data_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )
    //
    //                                 if ( ! proteinSequenceCoverage_Data_For_Position ) {
    //                                     //  No data at limelight position
    //                                     continue  // EARLY CONTINUE
    //                                 }
    //
    //                                 if ( proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === undefined || proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === null ) {
    //                                     //  No psmCount_PassesAllFilters data at limelight position
    //                                     continue  // EARLY CONTINUE
    //
    //                                     //  TODO  Need something different if color different between NOT covered at current filters and Not covered due to no map from Limelight protein to structure protein at position
    //                                 }
    //
    //                                 sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions.delete( sequenceInChain_Position )
    //
    //                                 let psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 = psmCount_PassesAllFilters_Fraction_FAKE_VALUE_1
    //
    //                                 if ( this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count() ) {
    //
    //                                     if ( proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction !== undefined && proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction !== null ) {
    //
    //                                         psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 = proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters_Fraction
    //                                     }
    //                                 }
    //
    //                                 {
    //                                     let sequenceInChain_Position_Array_Entry = sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.get( psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 )
    //                                     if ( ! sequenceInChain_Position_Array_Entry ) {
    //                                         sequenceInChain_Position_Array_Entry = {
    //                                             psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1: psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1,
    //                                             sequenceInChain_Position_Entry_Array: []
    //
    //                                         }
    //                                         sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.set( psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1, sequenceInChain_Position_Array_Entry )
    //                                     }
    //                                     sequenceInChain_Position_Array_Entry.sequenceInChain_Position_Entry_Array.push( sequenceInChain_Position )
    //                                 }
    //                             }
    //
    //                             {
    //                                 const sequenceInChain_Position_Array_Entry_Array = Array.from( sequenceInChain_Position_Array_Entry__Map_Key__psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1.values() )
    //
    //                                 sequenceInChain_Position_Array_Entry_Array.sort( ( a, b ) => {
    //                                     if ( a.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 < b.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 ) {
    //                                         return -1
    //                                     }
    //                                     if ( a.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 > b.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1 ) {
    //                                         return 1
    //                                     }
    //                                     return 0
    //                                 } )
    //
    //                                 {
    //                                     for ( let sequenceInChain_Position_Array_Entry_Array_Index = 0; sequenceInChain_Position_Array_Entry_Array_Index < sequenceInChain_Position_Array_Entry_Array.length; sequenceInChain_Position_Array_Entry_Array_Index++ ) {
    //
    //                                         const sequenceInChain_Position_Array_Entry = sequenceInChain_Position_Array_Entry_Array[ sequenceInChain_Position_Array_Entry_Array_Index ]
    //
    //                                         const sequenceInChain_Position_Entry_Array__BEFORE__FilterOn_ColorByResidueLetter = sequenceInChain_Position_Array_Entry.sequenceInChain_Position_Entry_Array
    //
    //                                         const sequenceInChain_Position_Entry_Array__AFTER__FilterOn_ColorByResidueLetter =
    //                                             sequenceInChain_Position_Entry_Array__BEFORE__FilterOn_ColorByResidueLetter.filter( value => {
    //                                                 if ( structureSequence_Positions_Set_AlreadyRendered_For_ColorBy_ResidueLetter.has( value ) ) {
    //                                                     //  Already rendered this position in "Color By Residue Letter" so SKIP
    //                                                     return false
    //                                                 }
    //                                                 return true
    //                                             } )
    //
    //                                         let colorInterpolate_Fraction = sequenceInChain_Position_Array_Entry.psmCount_PassesAllFilters_Fraction_OR_FAKE_VALUE_1
    //
    //                                         //  Rescale 'colorInterpolate_Fraction'.  Assume input is zero to one.
    //
    //                                         {
    //                                             const rescale_Range = _Molstar__SequenceCoverage_MinMax_Colors__Fraction.max_Fraction_PassedTo_Molstar_Interpolate - _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate
    //
    //                                             const colorInterpolate_Fraction__FractionOf_RescaleRange = colorInterpolate_Fraction * rescale_Range
    //
    //                                             colorInterpolate_Fraction = colorInterpolate_Fraction__FractionOf_RescaleRange + _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate
    //                                         }
    //
    //                                         const color_SequenceCoverage = Molstar_Color.interpolate( _Molstar__SequenceCoverage_MinMax_Colors.minColor, _Molstar__SequenceCoverage_MinMax_Colors.maxColor, colorInterpolate_Fraction )
    //
    //                                         {
    //                                             const residueIds: Array<number> = sequenceInChain_Position_Entry_Array__AFTER__FilterOn_ColorByResidueLetter //  TODO Unclear if need to map from Auth
    //
    //                                             const residues_Expression = _molstar__ResidueSetExpression( {
    //                                                 residueIds,
    //                                                 chainId: chainData.chainId_Label_AssignedAt_StructureFileCreation
    //                                             } )
    //
    //                                             structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );
    //
    //                                             const color = color_SequenceCoverage
    //
    //                                             const componentKey = 'seq-coverage-covered_chain_' + chainData.limelightAssigned_ChainId + "_index_" + sequenceInChain_Position_Array_Entry_Array_Index  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
    //                                             const componentLabel = 'Covered'
    //
    //                                             const component = await this._molstar_PluginUIContext_Reference.builders.structure
    //                                                 .tryCreateComponentFromExpression( structure_StateObjectSelector, residues_Expression, componentKey, { label: componentLabel } );
    //
    //                                             if ( component ) {
    //
    //                                                 this._dataFor_ChimeraX_Download.colorSpecs_Internal.push( {
    //                                                     chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
    //                                                     residueSeqId__label_seq_id__Array: residueIds,
    //                                                     color__MolstarColor: color
    //                                                 } )
    //
    //                                                 const type_Representation = this._selected__STRUCTURE_Display_Type as any
    //
    //                                                 await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
    //                                                     type: type_Representation,
    //                                                     color: 'uniform',
    //                                                     // ssss: null,  //  TODO  Shows that the Typescript type does NOT validate these properties
    //                                                     colorParams: { value: color },
    //                                                 } );
    //                                             }
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //
    //                             {  //   Render/Color positions that aligns to Limelight sequence but NO sequence coverage
    //
    //                                 const residueIds: Array<number> = Array.from( sequenceInChain_Positions_YES_Aligned_NOT_Covered__StartWithAll_ThenDeleteCoveredPositions ) //  TODO Unclear if need to map from Auth
    //
    //                                 const residues_Expression = _molstar__ResidueSetExpression( {
    //                                     residueIds,
    //                                     chainId: chainData.chainId_Label_AssignedAt_StructureFileCreation
    //                                 } )
    //
    //
    //                                 structure_NOT_Align_To_LimelightProteinSequence_Expression = _molstar__ExceptByExpression( structure_NOT_Align_To_LimelightProteinSequence_Expression, residues_Expression );
    //
    //                                 const color = Molstar_Color( 0xCCCCCC ) // Grey for aligns to Limelight sequence but NO sequence coverage
    //
    //                                 const componentKey = 'seq--not-coverage-covered_chain_' + chainData.limelightAssigned_ChainId  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
    //                                 const componentLabel = 'Not Covered'
    //
    //                                 const component = await this._molstar_PluginUIContext_Reference.builders.structure
    //                                     .tryCreateComponentFromExpression( structure_StateObjectSelector, residues_Expression, componentKey, { label: componentLabel } );
    //
    //                                 if ( component ) {
    //
    //                                     this._dataFor_ChimeraX_Download.colorSpecs_Internal.push( {
    //                                         chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
    //                                         residueSeqId__label_seq_id__Array: residueIds,
    //                                         color__MolstarColor: color
    //                                     } )
    //
    //                                     const type_Representation = this._selected__STRUCTURE_Display_Type as any
    //
    //                                     await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
    //                                         type: type_Representation,
    //                                         color: 'uniform',
    //                                         // ssss: null,  //  TODO  Shows that the Typescript type does NOT validate these properties
    //                                         colorParams: { value: color },
    //                                     } );
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //
    //                 {  //   Render/Color positions that do not align to limelight protein sequence
    //
    //                     const componentKey = 'structure_not_align_protein_chain_' + chainData.limelightAssigned_ChainId  //  TODO: NOTE every call to '.addRepresentation(...)' needs a different  componentKey value.  Otherwise it is more positions but old color.
    //                     const componentLabel = 'Structure NOT Align Protein Chain ' + chainData.limelightAssigned_ChainId
    //
    //                     let color: Molstar_Color = undefined
    //
    //                     if ( ! this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__HAS_ANY() ) {
    //                         color = Molstar_Color( 0xCCCCCC )  //  Grey
    //                     } else {
    //                         color = Molstar_Color( 0x333333 )  //  Very Dark Grey
    //                     }
    //
    //                     const component = await this._molstar_PluginUIContext_Reference.builders.structure
    //                         .tryCreateComponentFromExpression( structure_StateObjectSelector, structure_NOT_Align_To_LimelightProteinSequence_Expression, componentKey, { label: componentLabel } );
    //
    //                     if ( component ) {
    //
    //                         //  TODO  For Now Skip color of "NO Coverage"
    //
    //                         // this._dataFor_ChimeraX_Download.colorSpecs.push({
    //                         //     chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
    //                         //     residueSeqId__label_seq_id__Array: residueIds,
    //                         //     color__MolstarColor: color
    //                         // })
    //
    //                         const type_Representation = this._selected__STRUCTURE_Display_Type as any
    //
    //                         await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation( component, {
    //                             type: type_Representation, //   "cartoon",
    //                             color: 'uniform',
    //                             colorParams: { value: color },
    //                         } );
    //                     }
    //                 }
    //             }
    //         }
    //
    //         // const structure = structure_StateObjectSelector.cell.obj!.data
    //
    //         //////
    //
    //         //   TODO   Testing Sequence Coverage: Color by PSM Count
    //
    //
    //         // const layers: Overpaint.Layer[] = [];
    //         //
    //         // for (const [residueIndexStr, count] of Object.entries(coverageMap)) {
    //         //     const residueIndex = parseInt(residueIndexStr);
    //         //     const lociElements: StructureElement.Loci['elements'] = [];
    //         //
    //         //     for (const unit of structure.units) {
    //         //         const residueSegments = unit.model.atomicHierarchy.residueAtomSegments;
    //         //         if (residueIndex >= residueSegments.offsets.length - 1) continue;
    //         //
    //         //         const start = residueSegments.offsets[residueIndex];
    //         //         const end = residueSegments.offsets[residueIndex + 1];
    //         //         const indices = Int32Array.from({ length: end - start }, (_, i) => start + i);
    //         //
    //         //         lociElements.push({ unit, indices });
    //         //     }
    //         //
    //         //     if (lociElements.length === 0) continue;
    //         //
    //         //     const loci = StructureElement.Loci(structure, lociElements);
    //         //     layers.push({
    //         //         loci,
    //         //         color: getColorForCoverage(count),
    //         //         clear: false,
    //         //     });
    //         // }
    //         //
    //         // const overpaint = Overpaint.ofBundle(layers, structure);
    //         // this._molstar_PluginUIContext_Reference.managers.structure.overpaint.add(overpaint);
    //         // await this._molstar_PluginUIContext_Reference.managers.structure.overpaint.commit();
    //
    //     } catch ( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
    //         throw e
    //     }
    // }

    /**
     * Add Balls for Modifications
     */
    private async _add_Balls_For_Modifications__FirstDeleteExistingBalls(): Promise<void> {  try {

        //   Modification balls/spheres

        // console.warn("_add_Balls_For_Modifications__FirstDeleteExistingBalls CALLED")

        {
            /////////////   Delete all existing balls/spheres for Modifications

            const selector = StateSelection.Generators.root.subtree().withTag( _MODIFICATION_BALL_MOLSTAR_REPRESENTATION_TAG_STRING );
            const cells = this._molstar_PluginUIContext_Reference.state.data.select( selector );
            const update = this._molstar_PluginUIContext_Reference.state.data.build();
            cells.forEach( c => update.delete( c.transform.ref ) );
            await update.commit();
        }
        {
            //  Reset Modification Balls passed to ChimeraX

            this._dataFor_ChimeraX_Download.modificationBalls_Internal = []
        }


        /////////////   Add balls for Modifications

        if ( this.props.protein_Structure_Widget_StateObject.get_show_Modification_Symbols()
            || ( ! this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().isEmpty_For_Entries_SelectionActivelySelected_True() )
            || ( ! this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().isEmpty_For_Entries_SelectionActivelySelected_True() )) {

            //  Get structure_StateObjectSelector

            const structureRef_Array = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
            if ( structureRef_Array.length === 0 ) {

                //  NO Structures so problem

                const msg = "_add_Balls_For_Modifications__FirstDeleteExistingBalls _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color EARLY EXIT: if ( structureRef_Array.length === 0 ) { "
                console.warn(msg)
                throw Error(msg)

                // return  // EARLY RETURN
            }

            const structure_StateObjectSelector = structureRef_Array[ 0 ]?.cell

            if ( ! structure_StateObjectSelector ) {

                const msg = "structure_StateObjectSelector = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures[ 0 ]?.cell and also structure_StateObjectSelector_Param NOT Populated"
                console.warn(msg)
                throw Error(msg)
            }

            ///////////

            // Process Chains

            for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {

                if ( ! this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) ) {
                    // NOT currently displaying data for this chain so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                if ( ! sequenceAlignment_DataForChain ) {
                    //  NO Alignment data for this chain so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
                if ( ! sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
                    //  NO Alignment data for this proteinSequenceVersionId so skip
                    continue  // EARLY CONTINUE
                }

                const sequenceInChain = this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                if ( ! sequenceInChain ) {
                    const msg = "this._sequenceInChain_Map_Key_LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING. chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
                    console.warn( msg )
                    throw Error( msg )
                }

                let componentCounter_WithinCurrentChain = 0

                ////////

                //   Inline function to actually add Modification balls that will be called from just below it

                const _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color = async (
                    {
                        sequenceInChain_Positions_WithModifications,
                        color__SixHex_WithLeading_Hash
                    }: {
                        sequenceInChain_Positions_WithModifications: Array<number>
                        color__SixHex_WithLeading_Hash: string
                    }
                ) => { try {

                    // console.warn("_add_Balls_For_Modifications__FirstDeleteExistingBalls _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color CALLED ")

                    // Example: Select residues 10, 25, and 40 on Chain A
                    const targetResidues = sequenceInChain_Positions_WithModifications; // The specific numbers from your PDB
                    const targetChain = chainData.chainId_Label_AssignedAt_StructureFileCreation; // The chain ID

                    const modificationPositions_SingleBallSelection = MolScriptBuilder.struct.generator.atomGroups( {
                        'chain-test': MolScriptBuilder.core.rel.eq( [ MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(), targetChain ] ),
                        'residue-test': MolScriptBuilder.core.set.has( [
                            MolScriptBuilder.set( ...targetResidues ),
                            MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id()
                        ] ),
                        // KEY: Select only the Alpha Carbon (CA) to get a single ball per residue
                        'atom-test': MolScriptBuilder.core.rel.eq( [ MolScriptBuilder.struct.atomProperty.macromolecular.label_atom_id(), 'CA' ] )
                    } );

                    componentCounter_WithinCurrentChain++  //  Required since each component MUST have a unique key

                    // 2. Create the component
                    const modifiedResidues_Component = await this._molstar_PluginUIContext_Reference.builders.structure.tryCreateComponentFromExpression(
                        structure_StateObjectSelector,
                        modificationPositions_SingleBallSelection,
                        "modified-residue_counter_for_chain_" + componentCounter_WithinCurrentChain + "_chain_id_" + chainData.limelightAssigned_ChainId
                    );

                    if ( ! modifiedResidues_Component ) {
                        console.warn("_add_Balls_For_Modifications__FirstDeleteExistingBalls _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color if ( ! modifiedResidues_Component ) { ")
                    }

                    // 3. Add the representation
                    if ( modifiedResidues_Component ) {

                        const color = _color__SixHex_WithLeading_Hash__TO__MolstarColor( color__SixHex_WithLeading_Hash )

                        const ball_Molstar_SizeFactor__At_100_Percent = 0.55  // was 0.35  Make 50% larger

                        const ball_Molstar_SizeFactor = (
                            ball_Molstar_SizeFactor__At_100_Percent
                            * ( this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Size_Percentage_Value() / 100 )
                        )

                        this._dataFor_ChimeraX_Download.modificationBalls_Internal.push( {
                            chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
                            residueSeqId__label_seq_id__Array: targetResidues,
                            color__MolstarColor: color
                        } )

                        // const stateObjectSelector =
                        const representationAdded =
                            await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation(
                                modifiedResidues_Component,
                                {
                                    type: 'ball-and-stick',
                                    // Optional: customize ball size or color
                                    typeParams: { sizeFactor: ball_Molstar_SizeFactor },
                                    color: 'uniform',
                                    colorParams: { value: color }
                                },
                                { tag: _MODIFICATION_BALL_MOLSTAR_REPRESENTATION_TAG_STRING }
                            );



                        this._molstar_modificationSphere_RepresentationRef = representationAdded.ref

                        // this._molstar_PluginUIContext_Reference.managers.structure.component.removeRepresentations(component, repRef);
                        //
                        // this._molstar_PluginUIContext_Reference.state.data.remove(representationAdded_Reference);
                        //
                        //
                        // this._molstar_PluginUIContext_Reference.builders.structure.representation.buildRepresentation(modifiedResidues_Component, {
                        //     type: 'ball-and-stick',
                        //     // Optional: customize ball size or color
                        //     typeParams: { sizeFactor: ball_Molstar_SizeFactor },
                        //     color: 'uniform',
                        //     colorParams: { value: color }
                        // })

                        // Add label on the canvas - always shown, not a tooltip
                        // await this._molstar_PluginUIContext_Reference.builders.structure.representation.addRepresentation(modifiedResidues_Component, {
                        //     type: 'label',
                        //     typeParams: {
                        //         // Options: 'auth_seq_id', 'label_seq_id', 'resname', etc.
                        //         labelType: 'label_seq_id',
                        //         // Offset to prevent the label from sitting directly inside the ball
                        //         offsetY: 2,
                        //         // Font size
                        //         sizeFactor: 1.5
                        //     },
                        //     color: 'uniform',
                        //     colorParams: { value: 0xFFFFFF } // White labels
                        // });

                        //  Add text displayed in the tooltip shown in the lower right corner when hover over a part of the structure.
                        //    This text is displayed below the existing tooltip text.
                    }

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
                }   //  END  function: _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color



                // Need to color these first and then NOT color them again.  Variable then open mod mass.  Smallest mod mass to largest.

                const variable_Modifications_Selections_Array = Array.from( this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().getAll_For_Entries_SelectionActivelySelected_True() )
                const open_Modifications_Selections_Array = Array.from( this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().getAll_For_Entries_SelectionActivelySelected_True() )

                // Sort ascending by modificationMass
                variable_Modifications_Selections_Array.sort( ( a, b ) => {
                    if ( a.modificationMass < b.modificationMass ) {
                        return -1
                    }
                    if ( a.modificationMass > b.modificationMass ) {
                        return 1
                    }
                    return 0
                } )
                // Sort ascending by modificationMass
                open_Modifications_Selections_Array.sort( ( a, b ) => {
                    if ( a.modificationMass < b.modificationMass ) {
                        return -1
                    }
                    if ( a.modificationMass > b.modificationMass ) {
                        return 1
                    }
                    return 0
                } )


                const _MODIFICATION_MASS__MAP_KEY__VARIABLE = "VARIABLE"
                const _MODIFICATION_MASS__MAP_KEY__OPEN = "OPEN"

                const _MODIFICATION_MASS__MAP_KEY__OTHER = "OTHER"  //  map key for modification mass when not a modification mass with its own color

                const sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open__Keys_ProcessOrder =
                    [ _MODIFICATION_MASS__MAP_KEY__VARIABLE, _MODIFICATION_MASS__MAP_KEY__OPEN, _MODIFICATION_MASS__MAP_KEY__OTHER ]

                //   Search modifications_Passes_ALL_Filters for modification mass type and mass that has specific color

                const sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open: Map<string, Map<number | string, Array<number>>> = new Map()

                for ( let sequenceInChain_Position = 1; sequenceInChain_Position <= sequenceInChain.length; sequenceInChain_Position++ ) {

                    const limelightProteinSequence_Position = sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequenceInChain_Position )

                    if ( limelightProteinSequence_Position === undefined || limelightProteinSequence_Position === null ) {
                        //  Does NOT map to a limelight position
                        continue  // EARLY CONTINUE
                    }

                    {  //  First confirm have Sequence coverage at position

                        const proteinSequenceCoverage_Data_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )

                        if ( ! proteinSequenceCoverage_Data_For_Position ) {
                            //  No data at limelight position
                            continue  // EARLY CONTINUE
                        }

                        if ( proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === undefined || proteinSequenceCoverage_Data_For_Position.psmCount_PassesAllFilters === null ) {
                            //  No psmCount_PassesAllFilters data at limelight position
                            continue  // EARLY CONTINUE

                            //  TODO  Need something different if color different between NOT covered at current filters and Not covered due to no map from Limelight protein to structure protein at position
                        }
                    }

                    const modifications_For_Position = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.modifications_Map_Key_ProteinPosition.get( limelightProteinSequence_Position )

                    if ( ! modifications_For_Position ) {
                        //  No data at limelight position
                        continue  // EARLY CONTINUE
                    }

                    if ( modifications_For_Position.modifications_Passes_ALL_Filters === undefined || modifications_For_Position.modifications_Passes_ALL_Filters === null ) {
                        //  No data at modifications_Passes_ALL_Filters
                        continue  // EARLY CONTINUE
                    }

                    if ( ! modifications_For_Position.modifications_Passes_ALL_Filters.hasAny_Modifications() ) {
                        //  No data at position
                        continue  // EARLY CONTINUE
                    }

                    let found_Selection_For_SpecificModMass = false

                    for ( const variable_Modifications_Selection_Entry of variable_Modifications_Selections_Array ) {

                        if ( modifications_For_Position?.modifications_Passes_ALL_Filters?.variableModification_Masses_RoundedPer_VariableModMassRoundingRules
                            && modifications_For_Position.modifications_Passes_ALL_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.has( variable_Modifications_Selection_Entry.modificationMass ) ) {

                            //  Found a specific selection for this mod mass so save this position for this mod mass so can set specific color below

                            found_Selection_For_SpecificModMass = true

                            let sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER =
                                sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.get( _MODIFICATION_MASS__MAP_KEY__VARIABLE )
                            if ( ! sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER ) {
                                sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER = new Map()
                                sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.set( _MODIFICATION_MASS__MAP_KEY__VARIABLE, sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER )
                            }
                            let sequenceInChain_Positions_WithModifications_Array = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.get( variable_Modifications_Selection_Entry.modificationMass )
                            if ( ! sequenceInChain_Positions_WithModifications_Array ) {
                                sequenceInChain_Positions_WithModifications_Array = []
                                sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.set( variable_Modifications_Selection_Entry.modificationMass, sequenceInChain_Positions_WithModifications_Array )
                            }
                            sequenceInChain_Positions_WithModifications_Array.push( sequenceInChain_Position )

                            //   Exit since found entry

                            break  // EARLY BREAK
                        }
                    }

                    if ( ! found_Selection_For_SpecificModMass ) {

                        //  NOT found any match for Variable mod so search Open Mods

                        for ( const open_Modifications_Selection_Entry of open_Modifications_Selections_Array ) {

                            if ( modifications_For_Position?.modifications_Passes_ALL_Filters?.openModifications_Masses_RoundToWholeNumber
                                && modifications_For_Position.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber.has( open_Modifications_Selection_Entry.modificationMass ) ) {

                                //  Found a specific selection for this mod mass so save this position for this mod mass so can set specific color below

                                found_Selection_For_SpecificModMass = true

                                let sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER =
                                    sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.get( _MODIFICATION_MASS__MAP_KEY__OPEN )
                                if ( ! sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER ) {
                                    sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER = new Map()
                                    sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.set( _MODIFICATION_MASS__MAP_KEY__OPEN, sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER )
                                }
                                let sequenceInChain_Positions_WithModifications_Array = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.get( open_Modifications_Selection_Entry.modificationMass )
                                if ( ! sequenceInChain_Positions_WithModifications_Array ) {
                                    sequenceInChain_Positions_WithModifications_Array = []
                                    sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.set( open_Modifications_Selection_Entry.modificationMass, sequenceInChain_Positions_WithModifications_Array )
                                }
                                sequenceInChain_Positions_WithModifications_Array.push( sequenceInChain_Position )

                                //   Exit since found entry

                                break  // EARLY BREAK
                            }
                        }
                    }

                    if ( ( ! found_Selection_For_SpecificModMass ) && this.props.protein_Structure_Widget_StateObject.get_show_Modification_Symbols() ) {

                        //  NOT found any match for sequenceInChain_Position in Variable mod or Open Mod AND Yes Showing modifications for ALL mod masses
                        //          so ADD to "OTHER".  Use "OTHER" for both Variable/Open key and mod mass key

                        let sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER =
                            sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.get( _MODIFICATION_MASS__MAP_KEY__OTHER )
                        if ( ! sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER ) {
                            sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER = new Map()
                            sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.set( _MODIFICATION_MASS__MAP_KEY__OTHER, sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER )
                        }
                        let sequenceInChain_Positions_WithModifications_Array = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.get( _MODIFICATION_MASS__MAP_KEY__OTHER )
                        if ( ! sequenceInChain_Positions_WithModifications_Array ) {
                            sequenceInChain_Positions_WithModifications_Array = []
                            sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER.set( _MODIFICATION_MASS__MAP_KEY__OTHER, sequenceInChain_Positions_WithModifications_Array )
                        }
                        sequenceInChain_Positions_WithModifications_Array.push( sequenceInChain_Position )
                    }
                }

                //  Process positions put in the map/map above by variable/open and mod mass

                for ( const key_TopLevelMap of sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open__Keys_ProcessOrder ) {

                    const sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass_OR_OTHER__MAP_KEY__Variable_Open.get( key_TopLevelMap )
                    if ( ! sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass ) {
                        //  NO data for key_TopLevelMap so SKIP

                        continue //  EARLY CONTINUE
                    }

                    //  Get selection array for Variable or Open based on key_TopLevelMap

                    let variable_OR_Open_Modifications_Selections_Array: Array<Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry> = undefined

                    if ( key_TopLevelMap === _MODIFICATION_MASS__MAP_KEY__VARIABLE ) {
                        variable_OR_Open_Modifications_Selections_Array = variable_Modifications_Selections_Array
                    } else if ( key_TopLevelMap === _MODIFICATION_MASS__MAP_KEY__OPEN ) {
                        variable_OR_Open_Modifications_Selections_Array = open_Modifications_Selections_Array
                    }

                    if ( variable_OR_Open_Modifications_Selections_Array ) {

                        //  Have selection array so key_TopLevelMap is Variable or Open.  Process the selection array.

                        for ( const variable_OR_Open_Modifications_Selection of variable_OR_Open_Modifications_Selections_Array ) {
                            const sequenceInChain_Positions_WithModifications_Array = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass.get( variable_OR_Open_Modifications_Selection.modificationMass )

                            if ( sequenceInChain_Positions_WithModifications_Array ) {

                                //  Have positions for this mod mass selection so add them to the chain with color selection color

                                let color__SixHex_WithLeading_Hash = variable_OR_Open_Modifications_Selection.color__SixHex_WithLeading_Hash

                                if ( ! color__SixHex_WithLeading_Hash  ) {

                                    color__SixHex_WithLeading_Hash = _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS
                                }

                                await _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color( {
                                    sequenceInChain_Positions_WithModifications: sequenceInChain_Positions_WithModifications_Array,
                                    color__SixHex_WithLeading_Hash
                                } )
                            }
                        }
                    } else if ( key_TopLevelMap === _MODIFICATION_MASS__MAP_KEY__OTHER ) {

                        //  Type is "OTHER"

                        const sequenceInChain_Positions_WithModifications_Array = sequenceInChain_Positions_WithModifications_Array__Map_Key_ModificationMass.get( _MODIFICATION_MASS__MAP_KEY__OTHER )

                        if ( sequenceInChain_Positions_WithModifications_Array ) {

                            //  Have positions for this mod mass selection so add them to the chain with color selection color

                            //  Call inline function above in this method

                            let color__SixHex_WithLeading_Hash = this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash() //  Color for mod balls when NOT specified a color for a specific mod mass

                            if ( ! color__SixHex_WithLeading_Hash  ) {

                                color__SixHex_WithLeading_Hash = _MODIFICATION_BALL__DEFAULT_COLOR__ALL_MODIFICATIONS
                            }

                            await _inlineFcn_InMethod__Add_ModificationBalls_For_Positions_And_Color( {
                                sequenceInChain_Positions_WithModifications: sequenceInChain_Positions_WithModifications_Array,
                                color__SixHex_WithLeading_Hash
                            } )
                        }
                    } else {
                        const msg = "key_TopLevelMap is unknown value: " + key_TopLevelMap
                        console.warn( msg )
                        throw Error( msg )
                    }
                }
            }
        }

        // console.warn("_add_Balls_For_Modifications__FirstDeleteExistingBalls EXIT at END")

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /////////////////////

    /**
     * Add Disks for Trypsin Cut Points
     */
    private async _addDisks_for_TrypsinCutPoints__FirstDeleteExistingDisks(): Promise<void> { try {

        {  //  Delete all existing Trypsin Cut Points

            const state = this._molstar_PluginUIContext_Reference.state.data;
            const b = state.build().delete( _TRYPSIN_CUT_POINT__DISKS_REF );
            await this._molstar_PluginUIContext_Reference.runTask( state.updateTree( b ) );
        }

        {
            //  Reset Disks passed to ChimeraX

            this._dataFor_ChimeraX_Download.diskSpecs_Internal = []
        }

        if ( ( ! this.props.protein_Structure_Widget_StateObject.get_show_TrypsinCutPoints() )
            || ( ! this._trypsin_CutPoints_For_ProteinSequence_Set ) ) {
            // NOT show Trypsin Cut Points OR NOT have Trypsin Cut Points
            return // EARLY RETURN
        }

        /**
         * trypsin_CutPoints_For_ProteinSequence_Set: undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
         */
        const trypsin_CutPoints_For_ProteinSequence_Set = this._trypsin_CutPoints_For_ProteinSequence_Set

        const structures = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
        if ( structures.length === 0 ) {
            return  // EARLY RETURN
        }

        const structure: Structure | undefined = structures[ 0 ].cell.obj?.data;
        if ( ! structure ) {
            return  // EARLY RETURN
        }

        this._trypsinCutPoints_Current_Data_For_Molstar_Disks = [];

        for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {

            if ( ! this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) ) {
                //  NOT Selected so SKIP
                continue // EARLY CONTINUE
            }

            const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )

            if ( ! sequenceAlignment_DataForChain ) {
                continue  // EARLY CONTINUE
            }

            const sequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment =
                sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )

            if ( ! sequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment ) {
                continue  // EARLY CONTINUE
            }


            const proteinLength = this.props.proteinSequenceString.length

            for ( let proteinPosition = 1; proteinPosition <= ( proteinLength - 1 ); proteinPosition++ ) {

                const proteinPosition_CenterAfter = proteinPosition + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions

                if ( trypsin_CutPoints_For_ProteinSequence_Set.has( proteinPosition_CenterAfter ) ) {

                    const residue_A_Position_LimelightProtein = proteinPosition
                    const residue_B_Position_LimelightProtein = proteinPosition + 1

                    const residue_A_Position_Structure =
                        sequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment.structureFile__ProteinAlignment__CurrentProtein.get__structureFile_AlignedSequence_Position__FOR__limelightProteinSequence_Position( residue_A_Position_LimelightProtein )
                    const residue_B_Position_Structure =
                        sequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment.structureFile__ProteinAlignment__CurrentProtein.get__structureFile_AlignedSequence_Position__FOR__limelightProteinSequence_Position( residue_B_Position_LimelightProtein )

                    if ( ( ! residue_A_Position_Structure ) || ( ! residue_B_Position_Structure ) ) {
                        //  One of Residues NOT Map to Structure
                        continue  // EARLY CONTINUE
                    }

                    if ( residue_A_Position_Structure + 1 !== residue_B_Position_Structure ) {
                        //  Residue positions on Structure are NOT adjacent
                        continue  // EARLY CONTINUE
                    }

                    //  Have trypsin cut point so render

                    const posA = _getCAPosition( structure, chainData.chainId_Label_AssignedAt_StructureFileCreation, residue_A_Position_Structure );
                    const posB = _getCAPosition( structure, chainData.chainId_Label_AssignedAt_StructureFileCreation, residue_B_Position_Structure );

                    if ( ! posA ) {
                        const msg = `CA not found: chain label ${ chainData.chainId_Label_AssignedAt_StructureFileCreation } residue_A_Position_Structure ${ residue_A_Position_Structure }`
                        console.warn( msg )
                        // throw Error( msg )

                        continue  // EARLY CONTINUE
                    }
                    if ( ! posB ) {
                        const msg = `CA not found: chain label ${ chainData.chainId_Label_AssignedAt_StructureFileCreation } residue_B_Position_Structure ${ residue_B_Position_Structure }`
                        console.warn( msg )
                        // throw Error( msg )

                        continue  // EARLY CONTINUE
                    }

                    const bondVec = Molstar_Vec3.sub( Molstar_Vec3.zero(), posB, posA );
                    const bondLen = Molstar_Vec3.magnitude( bondVec );
                    if ( bondLen < 0.001 ) {
                        console.warn( `residue_A_Position_Structure ${ residue_A_Position_Structure } and residue_B_Position_Structure ${ residue_B_Position_Structure } are at the same position` );
                        continue;
                    }

                    const center = Molstar_Vec3.scale( Molstar_Vec3.zero(), Molstar_Vec3.add( Molstar_Vec3.zero(), posA, posB ), 0.5 );
                    const normal = Molstar_Vec3.scale( Molstar_Vec3.zero(), bondVec, 1 / bondLen );

                    //  TODO:  Since 'label' is no longer passed to Molstar for its tooltip, the label can instead be a callback that returns a JSX.Element and be fully formatted
                    const label = `Trypsin cut point: Chain ${ get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData ) } Limelight Sequence Positions: After ${ residue_A_Position_LimelightProtein }, Before: ${ residue_B_Position_LimelightProtein }`

                    this._trypsinCutPoints_Current_Data_For_Molstar_Disks.push( {
                        label: undefined,  //  Used for Molstar tooltip in lower right corner
                        centerX: center[ 0 ],
                        centerY: center[ 1 ],
                        centerZ: center[ 2 ],
                        normalX: normal[ 0 ],
                        normalY: normal[ 1 ],
                        normalZ: normal[ 2 ],
                        radius: _TRYPSIN_CUT_POINT__DISK_RADIUS,
                        color: _TRYPSIN_CUT_POINT__DISK_COLOR,

                        limelight_Only_HTML_TooltipContent: label,
                        limelight_Only_ChainId: get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData ),
                        limelight_Only_Residue_A_Position_LimelightProtein: residue_A_Position_LimelightProtein,
                        limelight_Only_Residue_B_Position_LimelightProtein: residue_B_Position_LimelightProtein
                    } );


                    this._dataFor_ChimeraX_Download.diskSpecs_Internal.push( {
                        chainId__label_asym_id: chainData.chainId_Label_AssignedAt_StructureFileCreation,
                        residueSeqId1: residue_A_Position_Structure,
                        residueSeqId2: residue_B_Position_Structure,
                        opacity: 1,
                        radius_In_Angstroms__Default_OnePointZero: _TRYPSIN_CUT_POINT__DISK_RADIUS,
                        color__MolstarColor: _TRYPSIN_CUT_POINT__DISK_COLOR
                    } )

                }
            }
        }

        const state = this._molstar_PluginUIContext_Reference.state.data;
        const hasProvider = !! state.select( _TRYPSIN_CUT_POINT__DISKS_REF ).length;

        if ( this._trypsinCutPoints_Current_Data_For_Molstar_Disks.length === 0 ) {
            // Remove existing disks if any
            if ( hasProvider ) {
                const b = state.build().delete( _TRYPSIN_CUT_POINT__DISKS_REF );
                await this._molstar_PluginUIContext_Reference.runTask( state.updateTree( b ) );
            }
            return  // EARLY RETURN
        }

        if ( ! hasProvider ) {
            // Create new: ShapeProvider -> ShapeRepresentation3D
            const b = state.build()
                .toRoot()
                .apply( INTERNAL__Molstar_ResidueDisks3D, { disks: this._trypsinCutPoints_Current_Data_For_Molstar_Disks }, { ref: _TRYPSIN_CUT_POINT__DISKS_REF } )
                .apply( StateTransforms.Representation.ShapeRepresentation3D, {}, { ref: _TRYPSIN_CUT_POINT__DISKS_REPR_REF } );
            await this._molstar_PluginUIContext_Reference.runTask( state.updateTree( b ) );
        } else {
            // Update params of existing provider
            const b = state.build()
                .to( _TRYPSIN_CUT_POINT__DISKS_REF )
                .update( INTERNAL__Molstar_ResidueDisks3D, () => ( { disks: this._trypsinCutPoints_Current_Data_For_Molstar_Disks } ) );
            await this._molstar_PluginUIContext_Reference.runTask( state.updateTree( b ) );
        }

        return

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param event
     */
    private _download_ChimeraX_File( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {

            if ( ! this._dataFor_ChimeraX_Download ) {

                return
            }

            const structures = this._molstar_PluginUIContext_Reference.managers.structure.hierarchy.current.structures;
            if ( structures.length === 0 ) {
                return  // EARLY RETURN
            }

            const structure: Structure | undefined = structures[ 0 ].cell.obj?.data;
            if ( ! structure ) {
                return  // EARLY RETURN
            }

            const colorSpecs: Array<Molstar__read_structure_create_chimerax_file__ResidueColorSpec> = []
            {
                for ( const colorSpecLocal of this._dataFor_ChimeraX_Download.colorSpecs_Internal ) {

                    const molstar_ColorFormat = Molstar_Color.toHexString( colorSpecLocal.color__MolstarColor )
                    const color_RGB_WithPreceedingHash_OR_CSS_NamedColor = "#" + molstar_ColorFormat.substring( 2 ) // Cut off "0x" at start and prepend "#" for standard RGB syntax

                    for ( const residueSeqId__label_seq_id of colorSpecLocal.residueSeqId__label_seq_id__Array ) {

                        colorSpecs.push( {
                            chainId__label_asym_id: colorSpecLocal.chainId__label_asym_id,
                            residueSeqId__label_seq_id,
                            color_RGB_WithPreceedingHash_OR_CSS_NamedColor
                        } )
                    }
                }
            }

            const symbolSpecs: Array<Molstar__read_structure_create_chimerax_file__ResidueSymbolSpec> = []
            {
                const ball_Radius_In_Angstroms = 1.5

                for ( const modificationBall of this._dataFor_ChimeraX_Download.modificationBalls_Internal ) {

                    const molstar_ColorFormat = Molstar_Color.toHexString( modificationBall.color__MolstarColor )
                    const color_RGB_WithPreceedingHash = "#" + molstar_ColorFormat.substring( 2 ) // Cut off "0x" at start and prepend "#" for standard RGB syntax

                    for ( const residueSeqId__label_seq_id of modificationBall.residueSeqId__label_seq_id__Array ) {

                        symbolSpecs.push( {
                            chainId__label_asym_id: modificationBall.chainId__label_asym_id,
                            residueSeqId__label_seq_id,
                            symbol: 'sphere',
                            color_RGB_WithPreceedingHash,
                            radius_In_Angstroms__Default_ZeroPointFive: ball_Radius_In_Angstroms,
                            // label: "Modification location one or more masses"  //  Error in ChimeraX:  "Expected a keyword"
                        } )
                    }
                }
            }

            const diskSpecs: Array<Molstar__read_structure_create_chimerax_file__DiskSpec> = []
            {
                for ( const diskSpec_Internal of this._dataFor_ChimeraX_Download.diskSpecs_Internal ) {

                    const molstar_ColorFormat = Molstar_Color.toHexString( diskSpec_Internal.color__MolstarColor )
                    const color_RGB_WithPreceedingHash_HasDefault = "#" + molstar_ColorFormat.substring( 2 ) // Cut off "0x" at start and prepend "#" for standard RGB syntax

                    diskSpecs.push( {
                        chainId__label_asym_id: diskSpec_Internal.chainId__label_asym_id,
                        residueSeqId1: diskSpec_Internal.residueSeqId1,
                        residueSeqId2: diskSpec_Internal.residueSeqId2,
                        color_RGB_WithPreceedingHash_HasDefault,
                        opacity: diskSpec_Internal.opacity,
                        radius_In_Angstroms__Default_OnePointZero: diskSpec_Internal.radius_In_Angstroms__Default_OnePointZero
                    } )
                }
            }

            const result = molstar__read_structure_create_chimerax_file__ConvertToCXC( {
                structure,
                colorSpecs,
                symbolSpecs,
                diskSpecs
            } )

            if ( result.warnings?.length > 0 ) {
                window.alert( "Create result returned warnings.  See browser console for warnings" )
                console.warn( "molstar__read_structure_create_chimerax_file__ConvertToCXC(...) result warnings", result.warnings )
                // throw Error( "molstar__read_structure_create_chimerax_file__ConvertToCXC(...) result contains warnings" )
            }

            const searchIds: Array<string> = []

            for ( const projectSearchId of this.props.projectSearchIds ) {

                const searchData_For_ProjectSearchId =
                    this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )
                if ( ! searchData_For_ProjectSearchId ) {
                    throw Error( "Download ChimeraX file: this.props.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                searchIds.push( searchData_For_ProjectSearchId.searchId.toString() )
            }

            const searchIds_UnderlineSeparated = searchIds.join("_")


            const structure_Filename = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.name

            const filename =  "chimerax_Script_" +
                structure_Filename +
                "_limelight_" +
                searchIds_UnderlineSeparated +
                ".cxc"

            StringDownloadUtils.downloadStringAsFile( { stringToDownload: result.script, filename } );

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    //  Comment out since the Overlay needs work if it will be kept

    // /**
    //  *
    //  * @param chainId
    //  */
    // private async _edit_Alignment_StructureChain_To_ProteinSequence(
    //     {
    //         chainId
    //     } : {
    //         chainId: string
    //     }
    // )  {
    //     const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map_ChainId.get( chainId )
    //     if ( ! sequenceAlignment_DataForChain ) {
    //         return // EARLY RETURN
    //     }
    //
    //     const dataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // dataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
    //
    //     if ( ! this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {
    //
    //         const msg = "NO currently displayed Structure File to add alignment to"
    //         window.alert( msg )
    //         console.warn(msg)
    //         throw Error(msg)
    //     }
    //
    //     const structureFileId = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId
    //
    //     const structureFile_PDB_Etc_Contents =
    //         await
    //             this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.
    //             get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Contents_Value().
    //             get_proteinSequenceStructureFile_Contents_for_StructureFileId_ReturnsPromise( structureFileId )
    //
    //     open_protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component({
    //         commonParams: {
    //
    //             structureFile_Like_PDB_File_Id: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId,
    //
    //             limelight_Max_SequenceCoverageColor: _Molstar__SequenceCoverage_MinMax_Colors.maxColor,
    //
    //             structureFile_PDB_Etc_Contents: structureFile_PDB_Etc_Contents.proteinSequenceStructureFile_Contents,
    //             structureFile_PDB_ETC__DataFormat: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFile_PDB_ETC__DataFormat,
    //
    //             chainLabels_ALL_Array_Sorted_OnStructure: this._chainLabels_Array_Sorted_OnStructure,
    //             sequenceInChain_Map_Key_ChainId: this._sequenceInChain_Map_Key_LimelightAssigned_ChainId,
    //             chainIds_Aligned_To_Limelight_ProteinSequence:
    //                 new Set( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map_ChainId.keys() ),
    //             proteinSequence: this.props.proteinSequenceString,
    //             proteinSequenceVersionId: this.props.proteinSequenceVersionId,
    //             proteinNames: this.props.proteinNames,
    //             searchIds_CommaDelimited: this._searchIds_CommaDelimited,
    //             existing__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value: dataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein, // Populate if edit existing entry
    //             commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT: this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT,
    //
    //             alignmentComplete_Callback: ( params: Protein_Structure_WidgetDisplay__SequenceAlignment_Overlay_Component_AlignmentComplete_Callback_Params ) => {
    //
    //                 const newEntry: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
    //                     structureFile__ProteinAlignment__CurrentProtein: params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
    //                 }
    //
    //                 this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map_ChainId.set(
    //                     params.structureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value.limelightAssigned_ChainId, newEntry
    //                     )
    //
    //                 //  Preselect this chain
    //                 // this._chainMapping_ForCurrentProtein_Selected_Set_Values_LimelightAssigned_ChainId.add( params.proteinStructure_LikePDB__SequenceAlignment_Chain_FileSequence_to_LimelightSequence__SingleProteinSequenceAlignment.chainId )
    //
    //                 this.forceUpdate()
    //
    //                 window.setTimeout( async () => { try {
    //
    //                     await this._create_Or_Clear_MolStar_Instance()
    //
    //                     this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
    //
    //                     //  TODO  May need more code here
    //
    //                 } catch ( e ) {
    //                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
    //                     throw e
    //                 } }, 50 )
    //             }
    //         }
    //     })
    // }

    /**
     *
     */
    render() {
        try {

            if ( ! this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {
                const msg = "No value for this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds";
                console.warn( msg );
                throw Error( msg );
            }

            {
                if ( this._renderMsg__ProteinLength_TooLong ) {

                    //  Protein sequence is too long to display so display this message instead

                    return (
                        <div style={ { marginTop: 10 } }>
                            <div>
                                Unable to display sequence coverage for proteins with length greater than { _MAX_PROTEIN_LENGTH_TO_DISPLAY.toLocaleString() }.
                            </div>
                            <div style={ { marginTop: 5 } }>
                                Length of current protein sequence is { this.props.proteinSequenceString.length.toLocaleString() }.
                            </div>
                        </div>
                    )
                }
            }

            if ( this._neverRender_ActualValue ) {

                return null  // EARLY RETURN
            }

            // { TODO  Need to figure out when to display this for NOT signed in  }

            if ( ( ( ! this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId )
                    || ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.size === 0 ) )
                && ( ! this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ) ) {

                return (   // EARLY RETURN

                    <div style={ { fontWeight: "bold", fontSize: 20, marginTop: 20, marginBottom: 20 } }>

                        No Structure files available for this protein.
                    </div>
                )
            }


            let structureFile_SelectionList_CurrentlySelected_TooltipContents: React.JSX.Element = undefined
            let structureFile_SelectionList_ElementArray: Array<React.JSX.Element> = undefined

            if ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.size > 1 ) {

                structureFile_SelectionList_ElementArray = []

                { //  Selection of Structure File to display

                    for ( const structureFile_Contents_Entry of this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.get_In_ID_Order() ) {

                        structureFile_SelectionList_ElementArray.push(
                            <React.Fragment
                                key={ structureFile_Contents_Entry.structureFile_Data_Entry.structureFileId }
                            >
                                <option
                                    value={ structureFile_Contents_Entry.structureFile_Data_Entry.structureFileId }
                                    title={ "Structure filename: \n" + structureFile_Contents_Entry.structureFile_Data_Entry.name + "\n\n" + "Structure Description:\n " + structureFile_Contents_Entry.structureFile_Data_Entry.description }
                                >
                                    { structureFile_Contents_Entry.structureFile_Data_Entry.name}
                                </option>
                            </React.Fragment>
                        )

                        if ( structureFile_Contents_Entry.structureFile_Data_Entry.structureFileId === this.props.protein_Structure_Widget_StateObject.get_selected_StructureFile_Id() ) {
                            structureFile_SelectionList_CurrentlySelected_TooltipContents = (
                                <div>
                                    <div style={ { marginTop: 10 } }>
                                        Currently Selected Structure File:
                                    </div>
                                    <div style={ { marginTop: 15 } }>
                                        Structure Filename: { structureFile_Contents_Entry.structureFile_Data_Entry.name }
                                    </div>
                                    <div style={ { marginTop: 10, marginBottom: 10 } }>
                                        Structure Description: { structureFile_Contents_Entry.structureFile_Data_Entry.description }
                                    </div>
                                </div>
                            )
                        }


                        // OLD

                        // structureFile_SelectionList_ElementArray.push(
                        //     <React.Fragment
                        //         key={ structureFile_Contents_Entry.structureFile_Data_Entry.structureFileId }
                        //     >
                        //         <div>
                        //             { this._structureFile_Contents_Entry_Value__CurrentlyDisplayed
                        //             && this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId === structureFile_Contents_Entry.structureFile_Data_Entry.structureFileId ? (
                        //
                        //                 <span>
                        //                     Currently Selected
                        //                 </span>
                        //             ) : (
                        //                 <button
                        //                     onClick={ async event => {
                        //
                        //                         this._structureFile_Contents_Entry_Value__CurrentlyDisplayed = structureFile_Contents_Entry
                        //
                        //                         this.props.protein_Structure_Widget_StateObject.set_selected_StructureFile_Id( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId )
                        //
                        //                         this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CLEAR()
                        //
                        //                         if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.size === 0 ) {
                        //
                        //                             const alignmentEntryResult =
                        //                                 await
                        //                                     this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().get_StructureFile_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall( {
                        //                                         structureFileId: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId,
                        //                                         proteinSequenceVersionId: this.props.proteinSequenceVersionId
                        //                                     } )
                        //
                        //                             for ( const alignmentEntry of alignmentEntryResult.resultEntries ) {
                        //
                        //                                 const alignmentEntry_Internal: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
                        //                                     structureFile__ProteinAlignment__CurrentProtein: alignmentEntry
                        //                                 }
                        //
                        //                                 this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.set( alignmentEntry.limelightAssigned_ChainId, alignmentEntry_Internal )
                        //
                        //                                 this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__ADD( alignmentEntry_Internal.structureFile__ProteinAlignment__CurrentProtein.limelightAssigned_ChainId )
                        //                             }
                        //                         }
                        //
                        //                         await this._compute_DerivedDisplay()
                        //
                        //                         if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {
                        //
                        //                             await this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
                        //                         }
                        //
                        //                         this.forceUpdate()
                        //                     } }
                        //                 >
                        //                     Select
                        //                 </button>
                        //             ) }
                        //         </div>
                        //         <div>
                        //             <span
                        //
                        //             >
                        //                 { structureFile_Contents_Entry.structureFile_Data_Entry.name }
                        //             </span>
                        //             <span> </span>
                        //             <span
                        //
                        //             >
                        //                 { structureFile_Contents_Entry.structureFile_Data_Entry.description }
                        //             </span>
                        //
                        //         </div>
                        //     </React.Fragment>
                        // )
                    }
                }
            }

            ///

            //  Sequence Coverage color by Shade by PSM Count legend - create if doing Shade by PSM Count

            let sequenceCoverage_ColorBy_ShadeBy_PSM_Count_Legend: React.JSX.Element = undefined

            if ( this._mainData_Computed_For_ComponentsInThisFile_Root_Result && this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count() ) {

                const legendWidth = _SEQUENCE_COVERAGE_LEGEND_WIDTH_PIXELS
                const legend_Bar_Height = _SEQUENCE_COVERAGE_LEGEND_BAR_HEIGHT_PIXELS

                const legend_TickMark_Height = 5
                const legend_TickMark_Label_Height = 15

                /**
                 * NOTE:  MUST start with zero and end with one
                 */
                const legend_TickMark_Position_Fraction_Array = [ 0, .25, .5, .75, 1 ]


                // Final Height
                const legend_Height = legend_Bar_Height + legend_TickMark_Height + legend_TickMark_Label_Height + 5

                const tickMarks_And_Values: Array<React.JSX.Element> = []

                for ( const legend_TickMark_Position_Fraction_Entry of legend_TickMark_Position_Fraction_Array ) {

                    //  '- 2' and '+ 1' to shift in tick marks on end since align to center of stroke
                    const x = Math.floor( ( legendWidth - 2 ) * legend_TickMark_Position_Fraction_Entry ) + 1

                    { // line

                        const element = (
                            <React.Fragment
                                key={ "line_" + legend_TickMark_Position_Fraction_Entry }
                            >
                                <line
                                    x1={ x }
                                    x2={ x }
                                    y1={ legend_Bar_Height }
                                    y2={ legend_Bar_Height + legend_TickMark_Height }
                                    stroke={ "gray" }
                                    strokeWidth={ 1 }
                                />
                            </React.Fragment>
                        )
                        tickMarks_And_Values.push( element )
                    }
                    {  //  Label
                        const text_SVG_Element_Props: React.SVGProps<SVGTextElement> = {
                            textAnchor: "middle",
                            x,
                            y: legend_Bar_Height + legend_TickMark_Height + legend_TickMark_Label_Height
                        }

                        if ( legend_TickMark_Position_Fraction_Entry === 0 ) {
                            text_SVG_Element_Props.textAnchor = "start" //  first tick mark label left align
                        }
                        if ( legend_TickMark_Position_Fraction_Entry === 1 ) {
                            text_SVG_Element_Props.textAnchor = "end"  //  last tick mark label right align
                        }

                        let tickMark_Label = Math.round( this._mainData_Computed_For_ComponentsInThisFile_Root_Result.max_PsmCount__PassesAllFilters * legend_TickMark_Position_Fraction_Entry )
                        if ( tickMark_Label < 1 ) {
                            tickMark_Label = 1
                        }
                        const element = (
                            <React.Fragment
                                key={ "label_" + legend_TickMark_Position_Fraction_Entry }
                            >
                                <text
                                    { ...text_SVG_Element_Props }
                                >
                                    { tickMark_Label }
                                </text>
                            </React.Fragment>
                        )
                        tickMarks_And_Values.push( element )
                    }

                }

                const lineForEach_PixelWidth_ElementArray: Array<React.JSX.Element> = []

                for ( let position = 1; position < legendWidth; position++ ) {

                    let colorInterpolate_Fraction = position / legendWidth

                    //  Rescale 'colorInterpolate_Fraction'.  Assume input is zero to one.

                    {
                        const rescale_Range = _Molstar__SequenceCoverage_MinMax_Colors__Fraction.max_Fraction_PassedTo_Molstar_Interpolate - _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate

                        const colorInterpolate_Fraction__FractionOf_RescaleRange = colorInterpolate_Fraction * rescale_Range

                        colorInterpolate_Fraction = colorInterpolate_Fraction__FractionOf_RescaleRange + _Molstar__SequenceCoverage_MinMax_Colors__Fraction.min_Fraction_PassedTo_Molstar_Interpolate
                    }

                    const color_SequenceCoverage =
                        _scaleColor_BasedOn_Fraction_Object.scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat( colorInterpolate_Fraction )

                    const element = (
                        <React.Fragment
                            key={ position }
                        >
                            <line
                                x1={ position }
                                x2={ position }
                                y1={ 0 }
                                y2={ legend_Bar_Height }
                                stroke={ color_SequenceCoverage }
                                strokeWidth={ 1 }
                            />
                        </React.Fragment>
                    )
                    lineForEach_PixelWidth_ElementArray.push( element )
                }

                //  Main element to render below
                sequenceCoverage_ColorBy_ShadeBy_PSM_Count_Legend = (
                    <div>
                        <div>
                            Sequence coverage 'Shade by PSM Count' color legend
                        </div>
                        <svg
                            width={ legendWidth }
                            height={ legend_Height }
                        >
                            { lineForEach_PixelWidth_ElementArray }

                            { tickMarks_And_Values }
                        </svg>
                    </div>
                )
            }


            /////////////////////  'return'

            return (
                <div style={ { marginBottom: 10 } }>

                    {/*  NOT USED
                    <div>
                        Protein Structure - Main Component
                    </div>

                    */ }

                    { ! this._show_Structure_PageBlock ? (

                        <div style={ { fontSize: 18, marginTop: 20, marginBottom: 10 } }>
                            { ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.size > 0 ) ? (
                                <div>
                                    Select or upload a Structure File.
                                </div>
                            ) : (
                                <div>
                                    Upload a Structure File.
                                </div>

                            ) }
                        </div>

                    ) : null }

                    {/*  NOT USED
                    { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                        <div style={ { marginTop: 20, marginBottom: 20 } }>

                            RestrictedTo_Researcher_ProjectOwner:&nbsp;
                            <button
                                onClick={ event => { this._get_StructureFile_Entries_AllForProject_RestrictedTo_Researcher_ProjectOwner() } }
                            >
                                this._get_StructureFile_Entries_AllForProject_RestrictedTo_Researcher_ProjectOwner()
                            </button> This will be used to get all entries for project so can add alignment for this protein sequence version id
                        </div>
                    ) : null }
                    */ }

                    {/*  Replaced next part with <select> under it */}
                    {/*
                    { ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.size > 1 ) ? (

                         // User selects from entries since more than one
                        <div style={ { marginBottom: 20 } }>
                            <div style={ { marginTop: 20, marginBottom: 20, fontSize: 18, fontWeight: "bold" } }>
                                Select a structure file:
                            </div>
                            { ( structureFile_SelectionList_ElementArray && structureFile_SelectionList_ElementArray.length > 0 ) ? (

                                <div style={ { display: "grid", gridTemplateColumns: "max-content auto", columnGap: 10, rowGap: 5 } }>

                                    { structureFile_SelectionList_ElementArray }
                                </div>

                            ) : null }
                        </div>
                    ) : null }
                    */}

                    {/*OLD*/}
                    {/*{ ( structureFile_SelectionList_ElementArray && structureFile_SelectionList_ElementArray.length > 0 ) ? (*/}

                    {/*//  User selects from entries since more than one*/}
                    {/*END OLD*/}

                    { this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ? (

                        <div style={ { marginTop: 20, marginBottom: 20 } }>

                            <div style={ { display: "grid", gridTemplateColumns: "max-content auto", alignItems: "baseline", width: "calc( 100vw - 100px )" } }>
                                {/*2 column grid*/}
                                <div>

                                    <span style={ { fontSize: 18, fontWeight: "bold", marginRight: 10 } }>
                                        {/*Select a structure file:*/}
                                        Structure file: Name:
                                    </span>
                                    { ( ( ! structureFile_SelectionList_ElementArray ) || structureFile_SelectionList_ElementArray.length === 0 ) ? (

                                        //  Single Structure File so display filename
                                        <span style={ { fontSize: 18, fontWeight: "bold" } }>
                                            { this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.name }
                                        </span>
                                    ) : (

                                        // Multiple Structure Files so <select>

                                        <span style={ { fontSize: 18, fontWeight: "bold" } }>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={ structureFile_SelectionList_CurrentlySelected_TooltipContents }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <select
                                                    style={ { fontSize: 18 } }
                                                    value={ this.props.protein_Structure_Widget_StateObject.get_selected_StructureFile_Id() }
                                                    onChange={ event => { try {

                                                        const selectedValue_String = event.currentTarget.value

                                                        const structureFileId = Number.parseInt( selectedValue_String )
                                                        if ( Number.isNaN( structureFileId ) ) {
                                                            const msg = "Under 'structureFile_SelectionList_ElementArray': Select Onchange Value does NOT parse to number. selectedValue_String: " + selectedValue_String
                                                            console.warn(msg)
                                                            throw Error(msg)
                                                        }

                                                        const structureFile_Contents_Entry_Value =
                                                            this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.get( structureFileId )
                                                        if ( ! structureFile_Contents_Entry_Value ) {
                                                            const msg = "Under 'structureFile_SelectionList_ElementArray':  this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT.single_StructureFile_Entry__Map_Key_StructureFileId.get( structureFileId ) returned NOTHING. structureFileId: " + structureFileId + ", selectedValue_String: " + selectedValue_String
                                                            console.warn(msg)
                                                            throw Error(msg)
                                                        }

                                                        this._structureFile_Contents_Entry_Value__CurrentlyDisplayed = structureFile_Contents_Entry_Value

                                                        this.props.protein_Structure_Widget_StateObject.set_selected_StructureFile_Id( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId )

                                                        this.forceUpdate()

                                                        window.setTimeout( async () => { try {

                                                            this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CLEAR()

                                                            if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.size === 0 ) {

                                                                const alignmentEntryResult =
                                                                    await
                                                                        this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().get_StructureFile_Alignment_Entries_AllFor_StructureFileId_ProteinSequenceVersionId_WebserviceCall( {
                                                                            structureFileId: this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.structureFileId,
                                                                            proteinSequenceVersionId: this.props.proteinSequenceVersionId
                                                                        } )

                                                                for ( const alignmentEntry of alignmentEntryResult.resultEntries ) {

                                                                    const alignmentEntry_Internal: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry = {
                                                                        structureFile__ProteinAlignment__CurrentProtein: alignmentEntry
                                                                    }

                                                                    this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.set( alignmentEntry.limelightAssigned_ChainId, alignmentEntry_Internal )
                                                                }
                                                            }

                                                            for ( const alignmentEntry_Internal of this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.values() ) {

                                                                this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__ADD( alignmentEntry_Internal.structureFile__ProteinAlignment__CurrentProtein.limelightAssigned_ChainId )
                                                            }

                                                            await this._compute_DerivedDisplay()

                                                            if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                                                                await this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
                                                            }

                                                            this.forceUpdate()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }})

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }}}
                                                >
                                                    { structureFile_SelectionList_ElementArray }
                                                </select>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </span>
                                    ) }

                                    { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                        <>
                                            <span style={ { paddingLeft: 6 } }> </span>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <div>
                                                        Delete Structure file from Limelight
                                                    </div>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <img
                                                    className=" fake-link-image icon-small "
                                                    src="static/images/icon-circle-delete.png"
                                                    onClick={ this._deleteStructure_PDB_Etc_Button_Clicked_BindThis }
                                                />
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </>
                                    ) : null }

                                    <span style={ { fontWeight: "bold", paddingLeft: 6, paddingRight: 4 } }> Description: </span>

                                </div>
                                <div>

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={ "Structure File Description" }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <span>
                                            { this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.description }
                                        </span>

                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                    { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                        <>
                                            <span> </span>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <div>
                                                        Change Structure file description
                                                    </div>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <img
                                                    className=" fake-link-image icon-small "
                                                    src="static/images/icon-edit.png"
                                                    onClick={ this._changeStructure_PDB_Etc_Description_Button_Clicked_BindThis }
                                                />
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                        </>
                                    ) : null }
                                </div>
                            </div>
                        </div>

                    ) : null }

                    { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                        <div style={ { marginTop: 20, marginBottom: 20 } }>

                            <button
                                onClick={ this._map_To_NewStructure_PDB_Etc_Button_Clicked_BindThis }
                            >
                                Map to new structure
                            </button>
                        </div>
                    ) : null }


                    { /* false && this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ? (
                        <>
                            <div>
                                <span>Structure Filename: </span>
                                <span>{ this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.name }</span>

                                { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                    <>
                                        <span> </span>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <div>
                                                    Delete Structure file from Limelight
                                                </div>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <img
                                                className=" fake-link-image icon-small "
                                                src="static/images/icon-circle-delete.png"
                                                onClick={ this._deleteStructure_PDB_Etc_Button_Clicked_BindThis }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </>
                                ) : null }
                            </div>
                            <div>
                                <span>Structure File description: </span>
                                <span>{ this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.description }</span>

                                { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                    <>
                                        <span> </span>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <div>
                                                    Change Structure file description
                                                </div>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <img
                                                className=" fake-link-image icon-small "
                                                src="static/images/icon-edit.png"
                                                onClick={ this._changeStructure_PDB_Etc_Description_Button_Clicked_BindThis }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </>
                                ) : null }
                            </div>
                        </>
                    ) : null */ }

                    { this._show_Structure_PageBlock ? (
                        <>
                            {/*  Remove since was for testing.

                            <div style={ { marginBottom: 10 } }>
                                <button
                                    onClick={ event => {
                                        this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div = ! this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div
                                        this.forceUpdate()
                                    } }
                                >
                                    Flip Structure Viewer and User Inputs Layout
                                </button>
                                <span> -- TEMP to demo switch position of inputs. (can change to programatically based on viewport width)</span>
                            </div>
                            */}

                            <div style={ {
                                display: "grid",
                                gridTemplateColumns: this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ? "min-content auto" : undefined
                            } }>
                                <div
                                    className=" standard-border-color-gray "
                                    style={ {
                                        minWidth: _USER_INPUTS_TO_RIGHT_OF_VIEWER__MIN_WIDTH,
                                        maxWidth: _USER_INPUTS_TO_RIGHT_OF_VIEWER__MAX_WIDTH,
                                        overflowY: "auto",
                                        // Use 'order' along with change grid columns above to position the user inputs above or to the right of the structure viewer
                                        order: this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ? 2 : undefined,
                                        borderStyle: "solid",
                                        borderWidth: 1,
                                        //  next is attempt at half width border where adjoins the border of structure viewer:
                                        // borderBottomWidth: ( ! this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ) ? 0.5 : undefined,
                                        // borderLeftWidth: ( this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ) ? 0.5 : undefined,
                                    } }
                                >

                                    <div
                                        hidden={ this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div }
                                        style={ { marginBottom: 5 } }
                                    >
                                        <span
                                            className=" clickable "
                                            onClick={ event => {
                                                this._structureViewer__UserInputs_Expand = ! this._structureViewer__UserInputs_Expand
                                                this.forceUpdate()
                                            }}
                                        >
                                            { this._structureViewer__UserInputs_Expand ? (
                                                <span>
                                                    <img className="icon-small fake-link-image " src="static/images/pointer-right.png"/>
                                                    <span> </span>
                                                    <span>
                                                        Hide Structure viewer inputs
                                                    </span>
                                                </span>
                                            ) : (
                                                <span>
                                                    <img className="icon-small fake-link-image " src="static/images/pointer-right.png"/>
                                                    <span> </span>
                                                    <span>
                                                        Show Structure viewer inputs
                                                    </span>
                                                </span>
                                            ) }
                                        </span>
                                    </div>

                                    <div
                                        hidden={ ( ! this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ) && ( ! this._structureViewer__UserInputs_Expand ) }
                                        style={ {
                                            marginLeft: this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ? 20 : undefined,
                                            marginRight: this._structureViewer_UserInputs_ToRight_Of_StructureViewer_Div ? 20 : undefined
                                        } }
                                    >
                                        { this._render__UserInputs_Above_OR_Right_Of_StructureViewer() }
                                    </div>
                                </div>

                                <div
                                    className=" standard-border-color-gray "
                                    style={ {
                                        //  Border added during development to identify border of viewer.  Turns out viewer has its own border so this was never needed.
                                        borderStyle: "solid", borderWidth: 1 // _proteinStructure_ViewerContainer_Ref__BORDER_WIDTH, borderColor: "red",
                                    } }
                                >
                                    { this._render__StructureViewer_ContainingDiv_And_Tooltip_Div_AboveIt() }

                                    {/*  Sequence Coverage Color Legend  */}
                                    { sequenceCoverage_ColorBy_ShadeBy_PSM_Count_Legend }

                                </div>
                            </div>
                        </>
                    ) : null }

                </div>
            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    //  TODO  These Properties if kept should be moved above the constructor

    private _structureViewer_UserInputs_ToRight_Of_StructureViewer_Div = true
    private _structureViewer__UserInputs_Expand = false

    /**
     *
     */
    private _render__UserInputs_Above_OR_Right_Of_StructureViewer() {

        return (
            <div>
                { this._render__Show_ProteinStructureFile_Chains_AndTheir_SequenceAlignments() }

                {/*   Protein Structure - Viewer - Width and Height Selection */ }

                { this._render_ProteinStructure_Viewer_Width_And_Height() }

                { this._render_DataDisplayOptions_SpecificTo_ProteinStructure_Viewer_Width_And_Height() }

                { this._render_ModificationBalls_UserSelections() }

                <div style={ { marginTop: 20, marginBottom: 20 } }>
                    <INTERNAL__Color_ResidueLetters_UserSelect__Component
                        protein_Structure_Widget_StateObject={ this.props.protein_Structure_Widget_StateObject }
                        stateObject_Change_CallbackFunction={ () => {
                            try {
                                this._update_AllParts_Of_CurrentStructure()

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                        } }
                    />
                </div>

                <div style={ { marginTop: 20, marginBottom: 20 } }>
                    <label>
                        <span>
                            Structure Display Format
                        </span>
                        {/*<span> (NOT in URL State)</span>*/ }
                        <span>:</span>
                        <span> </span>

                        <select
                            value={ this._selected__STRUCTURE_Display_Type }
                            onChange={ async event => {

                                const value = event.currentTarget.value

                                let found_selectValue_Match_Value = false
                                for ( const selectValue of _MOLSTAR_REPRESENTATION_TYPES_PARTIAL ) {
                                    if ( selectValue === value ) {
                                        this._selected__STRUCTURE_Display_Type = selectValue
                                        found_selectValue_Match_Value = true
                                        break
                                    }
                                }
                                if ( ! found_selectValue_Match_Value ) {
                                    const msg = "new value from <select> not match any entry in _STRUCTURE_FILENAME_ALLOWED_TYPES.  new value from <select>: " + value
                                    console.warn( msg )
                                    throw Error()
                                }

                                this.forceUpdate()

                                this._add_StructureData_PDB_Etc__TO__MolStar_Instance()
                            } }
                        >
                            {
                                _MOLSTAR_REPRESENTATION_TYPES_PARTIAL.map( ( selectValue, index, array ) => {
                                    const selectEntry = (
                                        <option
                                            key={ selectValue }
                                            value={ selectValue }
                                        >
                                            { selectValue }
                                        </option>
                                    )
                                    return selectEntry
                                } )
                            }
                        </select>
                    </label>
                </div>

                <div style={ { marginTop: 20, marginBottom: 20 } }>

                    <span
                        className=" fake-link "
                        onClick={ this._download_ChimeraX_File_BindThis }
                    >
                        Download ChimeraX file
                    </span>

                </div>

                <div>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={
                            <div>
                                Download structure file contents
                            </div>
                        }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <span
                            className=" fake-link "
                            onClick={ event => { try {

                                const stringToDownload = this._structureFile_PDB_Etc_Contents__CurrentlyDisplayed.proteinSequenceStructureFile_Contents

                                const filename = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.name

                                StringDownloadUtils.downloadStringAsFile( { stringToDownload, filename } );

                            } catch ( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                throw e
                            }
                            }}
                        >
                            Download { this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile_Data_Entry.name }
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>

                {/*  END Block of User Inputs to go above or to right of structure viewer  */}

            </div>
        )
    }

    /**
     *
     */
    private _render__StructureViewer_ContainingDiv_And_Tooltip_Div_AboveIt() {

        return (
            <>

                {/*  START div to contain the viewer and the div above the viewer for tooltip  */}

                {/* Div to anchor the HTML tooltip over the Structure Viewer */ }
                <div
                    style={ {
                        position: "relative",
                        pointerEvents: "none"
                    } }
                >
                    <div
                        ref={ this._proteinStructure_ViewerContainer_Tooltip_Outer_Container_AbsolutePositioned_Ref }
                        className=" standard-background-color  standard-border-color-very-dark "
                        style={ {
                            display: "none",    // Initialize to "none"
                            position: "absolute",
                            height: 0,
                            top: 0,             //  Initialize to zero.  directly changed in code
                            left: 0,             //  Initialize to zero.  directly changed in code
                        } }
                    >
                        <div style={ { position: "relative" } }>
                            <div
                                ref={ this._proteinStructure_ViewerContainer_Tooltip_Inner_Container_AbsolutePositioned_Ref }
                                className=" standard-background-color  standard-border-color-very-dark "
                                style={ {
                                    position: "absolute",
                                    zIndex: 9999,
                                    width: "calc( min( (50vw - 40px), 400px) )",  // width is smaller of (50% - 40px) or 400px
                                    padding: 10,
                                    borderStyle: "solid",
                                    borderWidth: 1
                                } }
                            >
                                <INTERNAL__Residue_Tooltip__Tooltip_Contents__Component
                                    limelight_AnyFilter__HasFilterValue={ this.props.limelight_AnyFilter__HasFilterValue }
                                    trypsin_CutPoints_For_ProteinSequence_Set={ this._trypsin_CutPoints_For_ProteinSequence_Set }
                                    proteinSequence={ this.props.proteinSequenceString }
                                    onMount_CallbackFunction={ this._INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__onMount_Callback_BindThis }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Outer Container Div to hold actual Mol* instance  */ }
                <div
                    style={ {
                        position: "relative",
                        width: "fit-content",  //  "fit-content" so width is same as contained <div> so border is right around contained <div>
                        //  Border added during development to identify border of viewer.  Turns out viewer has its own border so this was never needed.
                    } }
                >
                    {/*  Container Div to hold actual Mol* instance  */ }
                    <div
                        ref={ this._proteinStructure_ViewerContainer_Ref }
                        style={ {
                            position: "relative",
                            width: this._viewer_Size_Selection,   //  The Mol* library appears to require the 'width' and 'height' set on the <div> it is installed into.
                            height: this._viewer_Size_Selection
                        } }
                    />
                </div>

                {/*END div to contain the viewer and the div above the viewer for tooltip*/}

            </>
        )

    }

    /**
     *
     */
    private _render__Show_ProteinStructureFile_Chains_AndTheir_SequenceAlignments() {

        if ( ( ! this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) || ( ! ( this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array.length > 0 ) ) ) {
            //  NO Chains on Structure so SKIP

            // EARLY RETURN

            return (
                <div style={ { marginTop: 20, marginBottom: 20 } }>
                    This structure file contains no chains.
                </div>
            )
        }

        /**
         * Create Element for each chain that is aligned to the protein
         */
        const alignedChains_Elements: Array<React.JSX.Element> = []

        if ( this._structureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT ) {
            for ( const chainData of this._chainData_Parsed_From_OnStructure_In_Label_Order_Array ) {

                if ( ! this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.has( chainData.limelightAssigned_ChainId ) ) {

                    //  NO alignment for this chain so SKIP

                    continue  // EARLY CONTINUE
                }

                const perChain_Element = (
                    <div>
                        <div>
                            <label>

                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <div>
                                            Select to show the data in Limelight on this chain
                                        </div>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span>
                                        <input
                                            type="checkbox"
                                            checked={ this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) }
                                            onChange={ async event => {
                                                try {

                                                    if ( event.target.checked ) {
                                                        this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__ADD( chainData.limelightAssigned_ChainId )
                                                    } else {
                                                        this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__DELETE( chainData.limelightAssigned_ChainId )
                                                    }

                                                    this.forceUpdate()

                                                    window.setTimeout( async () => {      try {

                                                        await this._update_AllParts_Of_CurrentStructure()

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                    }, 50 )

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }
                                            }
                                        />
                                        &nbsp;
                                        <span>
                                            Chain: { get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData ) }
                                        </span>
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </label>


                            <>
                                &nbsp;

                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                            <div>
                                                View/Edit alignment
                                            </div>
                                        ) : (
                                            <div>
                                                View alignment
                                            </div>
                                        )
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <img
                                        className=" fake-link-image icon-small "
                                        src="static/images/icon-edit.png"
                                        onClick={ event => {
                                            try {
                                                this._view_Update__Align_LimelightProteinSequence_TO_StructureChain_Sequence( { chainData } )

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        } }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </>

                            { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                                <>
                                    &nbsp;

                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div>
                                                Delete alignment
                                            </div>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img
                                            onClick={ async event => {
                                                try {
                                                    if ( ! window.confirm( "Delete Alignment '" + get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( chainData ) + "'?" ) ) {

                                                        return // EARLY RETURN
                                                    }

                                                    const structureFile__ProteinAlignment_Entry =
                                                        this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )

                                                    if ( ! structureFile__ProteinAlignment_Entry ) {
                                                        const msg = "this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId ) returned NOTHING for chainData.limelightAssigned_ChainId: " + chainData.limelightAssigned_ChainId
                                                        console.warn( msg )
                                                        throw Error( msg )
                                                    }

                                                    await
                                                        this._commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project____ROOT.get_commonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO().delete_FromServer( {
                                                            structureFile_Like_PDB_File_Id: structureFile__ProteinAlignment_Entry.structureFile__ProteinAlignment__CurrentProtein.structureFileId,
                                                            limelightAssigned_ChainId: structureFile__ProteinAlignment_Entry.structureFile__ProteinAlignment__CurrentProtein.limelightAssigned_ChainId,
                                                            proteinSequenceVersionId: structureFile__ProteinAlignment_Entry.structureFile__ProteinAlignment__CurrentProtein.proteinSequenceVersionId
                                                        } )

                                                    this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.delete( chainData.limelightAssigned_ChainId )

                                                    this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__DELETE( chainData.limelightAssigned_ChainId )

                                                    await this._update_AllParts_Of_CurrentStructure()

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }
                                            }
                                            className=" icon-small clickable " src="static/images/icon-circle-delete.png"
                                        />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </>
                            ) : null }
                        </div>

                    </div>
                )

                alignedChains_Elements.push( perChain_Element )
            }
        }

        return (

            <div style={ { marginTop: 20, marginBottom: 20 } }>

                { alignedChains_Elements.length > 0 ? (
                    <div>
                        <span>Structure chain</span>
                        {/*  Add the 's' for plural if needed  */ }
                        { alignedChains_Elements.length > 1 ? <span>s</span> : null }
                        <span> aligned to this protein:</span>
                    </div>
                ) : (
                    <div>
                        NO alignments for this protein
                    </div>
                ) }
                {/*) }*/ }
                { alignedChains_Elements }

                {/*
                { this._userAccessForStructureFileAndAlignment_YES_Can_CreateEditDelete_AllForProject ? (
                    alignedChains_Elements.length === 0 ? (
                        this._chainLabels_Array_Sorted_OnStructure.length === 1 ? (
                            <div>
                                <button
                                    onClick={ this._add_Alignment_StructureChain_To_ProteinSequence_Clicked_BindThis }
                                >
                                    Align the Sequence Chain to the Protein
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    onClick={ this._add_Alignment_StructureChain_To_ProteinSequence_Clicked_BindThis }
                                >
                                    Align a Sequence Chain to the Protein
                                </button>
                            </div>
                        )
                    ) : (
                        //  alignedChains_Elements.length is > 0
                        this._chainLabels_Array_Sorted_OnStructure.length > alignedChains_Elements.length ) ? (
                        <div>
                            <button
                                onClick={ this._add_Alignment_StructureChain_To_ProteinSequence_Clicked_BindThis }
                            >
                                Align another Sequence Chain to the Protein
                            </button>
                        </div>
                    ) : null
                ) : null }
*/ }
                {/*{ alignedChains_Elements.length > 0 ? (*/ }
                {/*    <div style={ { color: "red", marginTop: 5 } }>*/ }
                {/*        Chain Selection NOT in URL State*/ }
                {/*    </div>*/ }
                {/*) : null }*/ }
            </div>
        )
    }

    /**
     * Protein Structure - Viewer - Width and Height Selection
     */
    private _render_ProteinStructure_Viewer_Width_And_Height() {

        return (

            <>
                <div style={ { display: "flex" } }>

                    <div
                        style={ { alignSelf: "anchor-center", textWrap: "balance", paddingRight: 15, marginBottom: 8 } }
                    >
                        <span>
                            Protein Structure Viewer Size:
                        </span>
                        {/*<span> (NOT in URL State)</span>*/ }
                    </div>

                    <div
                        style={ { alignSelf: "anchor-center" } }
                    >
                        <MUI_Box sx={ { width: 100 } }>
                            <MUI_Slider
                                track={ false }
                                size="small"
                                aria-label="Width"
                                defaultValue={ this._viewer_Size_Selection_InitialValue }
                                min={ _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MIN }
                                max={ _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.WIDTH_HEIGHT.MAX }
                                step={ _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.STEP }

                                // marks={ _VIEWER__WIDTH__SELECTION_OPTIONS }  // Only discrete points

                                getAriaValueText={ ( value: number ) => {
                                    // console.warn("getAriaValueText: value: " + value )
                                    return value + "px"
                                } }

                                valueLabelDisplay="auto" //  Shows value as user drags.
                                valueLabelFormat={ ( value: number, index: number ) => {
                                    // console.warn("valueLabelFormat: value: " + value )
                                    return value + "px"
                                } }

                                onChangeCommitted={ ( event: React.SyntheticEvent | Event, value: unknown ) => {
                                    try {

                                        // console.warn( "onChangeCommitted called. event: ", event )
                                        // console.warn( "onChangeCommitted called. value: ", value )

                                        if ( ! limelight__variable_is_type_number_Check( value ) ) {

                                            const msg = "onChangeCommitted called. value is NOT a number.  value: " + value
                                            console.warn( msg )
                                            throw Error( msg )
                                        }

                                        // console.warn( "onChangeCommitted called. value IS a number.  value: " + value )

                                        this._viewer_Size_Selection = value

                                        this.forceUpdate()

                                        window.setTimeout( () => {

                                            if ( this._molstar_PluginUIContext_Reference && this._molstar_PluginUIContext_Reference.canvas3d ) {
                                                this._molstar_PluginUIContext_Reference.canvas3d.handleResize()
                                            }

                                        }, 50 )

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                }
                                }
                            />
                        </MUI_Box>
                    </div>

                    <div
                        style={ { alignSelf: "anchor-center", paddingLeft: 15 } }
                    >

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    Current selection
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span>
                                {/*  Show current value  */ }
                                { this._viewer_Size_Selection }px
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>

                {/*

                <div style={ { display: "flex" } }>

                    <div
                        style={ { alignSelf: "anchor-center", paddingRight: 15 } }
                    >
                        <span>
                            Protein Structure Viewer Height:
                        </span>
                        {/ *<span> (NOT in URL State)</span>* / }
                    </div>

                    <MUI_Box sx={ { width: 100 } }>
                        <MUI_Slider
                            track={ false }
                            size="small"
                            aria-label="Width"
                            defaultValue={ this._height_Selection_InitialValue }
                            min={ _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.HEIGHT.MIN }
                            max={ _VIEWER_WIDTH_HEIGHT_SELECTION_OPTIONS_MIN_MAX.HEIGHT.MAX }
                            step={ null }

                            marks={ _VIEWER__HEIGHT__SELECTION_OPTIONS }  // Only discrete points

                            getAriaValueText={ ( value: number ) => {
                                // console.warn("getAriaValueText: value: " + value )
                                return value + "px"
                            } }

                            valueLabelDisplay="auto" //  Shows value as user drags.
                            valueLabelFormat={ ( value: number, index: number ) => {
                                // console.warn("valueLabelFormat: value: " + value )
                                return value + "px"
                            } }

                            onChangeCommitted={ ( event: React.SyntheticEvent | Event, value: unknown ) => {
                                try {

                                    // console.warn( "onChangeCommitted called. event: ", event )
                                    // console.warn( "onChangeCommitted called. value: ", value )

                                    if ( ! limelight__variable_is_type_number_Check( value ) ) {

                                        const msg = "onChangeCommitted called. value is NOT a number.  value: " + value
                                        console.warn( msg )
                                        throw Error( msg )
                                    }

                                    // console.warn( "onChangeCommitted called. value IS a number.  value: " + value )

                                    this._height_Selection = value

                                    this.forceUpdate()

                                    window.setTimeout( () => {

                                        if ( this._molstar_PluginUIContext_Reference && this._molstar_PluginUIContext_Reference.canvas3d ) {
                                            this._molstar_PluginUIContext_Reference.canvas3d.handleResize()
                                        }

                                    }, 50 )

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            }
                            }
                        />
                    </MUI_Box>

                    <div
                        style={ { alignSelf: "anchor-center", paddingLeft: 15 } }
                    >

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    Current selection
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span>
                                {/ *  Show current value  * / }
                                { this._height_Selection }px
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>
                */}
            </>
        )
    }

    /**
     * Protein Structure - Viewer - Data Display Options specific to this viewer
     */
    private _render_DataDisplayOptions_SpecificTo_ProteinStructure_Viewer_Width_And_Height() {

        let anySearch_Has_OpenModifications = false

        {
            const common_Searches_Flags = this.props.dataPageStateManager.get_DataPage_common_Searches_Flags()

            for ( const projectSearchId of this.props.projectSearchIds ) {

                const common_Flags_SingleSearch_ForProjectSearchId = common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
                if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
                    throw Error( "common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {
                    anySearch_Has_OpenModifications = true
                    break
                }
            }
        }


        return (
            <>
                <div>
                    <label>
                        <span>Shade by PSM Count: </span>
                        <input
                            type="checkbox"
                            checked={ this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count() }
                            onChange={ this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged_BindThis }
                        />
                    </label>
                    <span style={ { width: 8 } }>&nbsp;</span>
                    <span> </span>
                    <span style={ { whiteSpace: "nowrap" }}>
                        <span>Max PSM Count for shading: </span>
                        <input
                            style={ { width: 50 } }
                            value={
                                (
                                    this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count()
                                    !== Protein_Structure_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET
                                        ? this.props.protein_Structure_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count()
                                        : ""
                                )
                            }
                            onChange={ this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged_BindThis }
                        />
                    </span>
                </div>

                <div>
                    <label>
                        <span>Show Trypsin Cut points: </span>
                        <input
                            type="checkbox"
                            checked={ this.props.protein_Structure_Widget_StateObject.get_show_TrypsinCutPoints() }
                            onChange={ this._show_TrypsinCutPoints_SelectionChanged_BindThis }
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <span>Hide unmatched modifications: </span>
                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                "If filtering on variable or open modifications, hide all unmatched modifications."
                            }
                        />
                        <input
                            type="checkbox"
                            checked={ this.props.protein_Structure_Widget_StateObject.get_show_only_modifications_filtered_on__excluding_static() }
                            onChange={ async event => {

                                this.props.protein_Structure_Widget_StateObject.set_show_only_modifications_filtered_on__excluding_static( event.currentTarget.checked )

                                await this._compute_DerivedDisplay()

                                if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                                    await this._update_AllParts_Of_CurrentStructure()
                                }
                            } }
                        />
                    </label>
                </div>

                { anySearch_Has_OpenModifications ? (
                    <div>
                        <label>
                            <span>Include unlocalized modifications: </span>
                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                title={
                                    "Show any unlocalized modification as modifying all possible positions in its respective PSM."
                                }
                            />
                            <input
                                type="checkbox"
                                checked={ this.props.protein_Structure_Widget_StateObject.get_add_open_modifications_unlocalized_in_all_peptide_positions() }
                                onChange={ async event => {

                                    this.props.protein_Structure_Widget_StateObject.set_add_open_modifications_unlocalized_in_all_peptide_positions( event.currentTarget.checked )

                                    await this._compute_DerivedDisplay()

                                    if ( this._structureFile_Contents_Entry_Value__CurrentlyDisplayed ) {

                                        await this._update_AllParts_Of_CurrentStructure()
                                    }
                                } }
                            />
                        </label>
                    </div>
                ) : null }
            </>
        )
    }

    /**
     * Protein Structure - Viewer - Modification Balls - User Selections
     */
    private _render_ModificationBalls_UserSelections() {

        return (

            <div style={ { marginTop: 20, marginBottom: 20 } }>

                {/*  TEST ONLY code

                <div style={ { marginTop: 20, marginBottom: 20 } }>
                    Test ONLY to validate can remove all Modification balls without redraw structure:
                    <button
                        title="Test ONLY to validate can remove all Modification balls without redraw structure"
                        onClick={ async event => {

                            // const state = this._molstar_PluginUIContext_Reference.state.data;
                            //
                            // const update = state.build();
                            //
                            // update.delete( this._molstar_modificationSphere_RepresentationRef );
                            //
                            // await update.commit();

                            //  OR

                            const selector = StateSelection.Generators.root.subtree().withTag( _MODIFICATION_BALL_MOLSTAR_REPRESENTATION_TAG_STRING );
                            const cells = this._molstar_PluginUIContext_Reference.state.data.select( selector );
                            const update = this._molstar_PluginUIContext_Reference.state.data.build();
                            cells.forEach( c => update.delete( c.transform.ref ) );
                            await update.commit();
                        } }
                    >
                        Remove Modification Balls
                    </button>
                </div>
                */}

                <div
                    // style={ { display: "flex" } }
                >
                    <div>
                        <label>
                            <span>
                                Show Modification Balls
                            </span>
                            {/*<span> (NOT in URL State)</span>*/ }
                            <span>:</span>
                            <input
                                type="checkbox"
                                checked={ this.props.protein_Structure_Widget_StateObject.get_show_Modification_Symbols() }
                                onChange={ async event => {
                                    try {
                                        this.props.protein_Structure_Widget_StateObject.set_show_Modification_Symbols( event.target.checked )

                                        this.forceUpdate()

                                        window.setTimeout( () => {
                                            try {

                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        }, 50 )


                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } }
                            />
                        </label>
                    </div>
                    <div>
                        <span>
                            Modification ball color:
                        </span>

                        <>
                            <span> </span>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Display color of modification balls.
                                        </div>
                                        <div style={ { marginTop: 10 } }>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <svg
                                    width={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                    height={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                >
                                    <circle
                                        cx={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        cy={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        r={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        fill={
                                            this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash() ?
                                                this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash() :
                                                _MODIFICATION_BALL__DEFAULT_COLOR__ALL_MODIFICATIONS
                                        }
                                        stroke={ _MODIFICATION_BALL__IN_HTML__STROKE_COLOR }
                                        strokeWidth={ _MODIFICATION_BALL__IN_HTML__STROKE_WIDTH }
                                        className=" clickable "
                                        onClick={ event => {

                                            const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                            const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                                ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                    const newColor = params.newColor

                                                    // Require format #RRGGBB
                                                    if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                        const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                        console.warn( msg )
                                                        throw Error( msg )
                                                    }

                                                    this.props.protein_Structure_Widget_StateObject.set_modification_Symbols_Color__SixHex_WithLeading_Hash( newColor )

                                                    this.forceUpdate()

                                                    window.setTimeout( () => {
                                                        try {

                                                            this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    }, 50 )

                                                }

                                            colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                                existingColor:
                                                    this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash() ?
                                                        this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash() :
                                                        _MODIFICATION_BALL__DEFAULT_COLOR__ALL_MODIFICATIONS,
                                                position_top: targetBoundingRect.top,
                                                position_left: targetBoundingRect.left,
                                                cancel_Callback: () => {
                                                },
                                                change_Callback
                                            } )
                                        } }
                                    />
                                </svg>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    style={ { marginLeft: 4 } }
                                    className=" icon-small clickable "
                                    src="static/images/icon-edit.png"
                                    onClick={ event => {

                                        const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                        const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                            ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                const newColor = params.newColor

                                                // Require format #RRGGBB
                                                if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                    const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                    console.warn( msg )
                                                    throw Error( msg )
                                                }

                                                this.props.protein_Structure_Widget_StateObject.set_modification_Symbols_Color__SixHex_WithLeading_Hash( newColor )

                                                this.forceUpdate()

                                                window.setTimeout( () => {
                                                    try {

                                                        this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                }, 50 )

                                            }

                                        colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                            existingColor: this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Color__SixHex_WithLeading_Hash(),
                                            position_top: targetBoundingRect.top,
                                            position_left: targetBoundingRect.left,
                                            cancel_Callback: () => {
                                            },
                                            change_Callback
                                        } )
                                    } }
                                />

                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </>

                    </div>

                </div>

                { this._render_ModificationBalls_UserSelections_SpecificFor_Variable_Open_Mods_And_ModMass() }

                <INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component

                    protein_Structure_Widget_StateObject={ this.props.protein_Structure_Widget_StateObject }
                    stateObject_Change_CallbackFunction={ () => {
                        try {
                            this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }
                    } }
                />

            </div>
        )
    }

    /**
     * Protein Structure - Viewer - Modification Balls - User Selections - Selections for specific Variable/Open Mods and Mod Mass
     */
    private _render_ModificationBalls_UserSelections_SpecificFor_Variable_Open_Mods_And_ModMass() {


        const _SingleModificationEntry_OutermostDiv_Style: React.CSSProperties = { marginTop: 3, marginBottom: 3 }

        //  Variable Mods Selections

        let variableMods_Selections_Element: React.JSX.Element = undefined

        if ( ! this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().isEmpty() ) {

            const variableMods_SelectionEntries_Element_Array: Array<React.JSX.Element> = []

            const variable_Modifications_Selections = Array.from( this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().getAll() )

            variable_Modifications_Selections.sort( ( a, b ) => {
                if ( a.modificationMass < b.modificationMass ) {
                    return -1
                }
                if ( a.modificationMass > b.modificationMass ) {
                    return 1
                }
                return 0
            } )

            for ( const variable_Modifications_Selection_Entry of variable_Modifications_Selections ) {

                const element = (
                    <React.Fragment
                        key={ variable_Modifications_Selection_Entry.modificationMass }
                    >
                        <div style={ _SingleModificationEntry_OutermostDiv_Style }>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={ variable_Modifications_Selection_Entry.selectionActivelySelected }
                                    onChange={ event => {
                                        try {

                                            const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                modificationMass: variable_Modifications_Selection_Entry.modificationMass,
                                                color__SixHex_WithLeading_Hash: variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash,
                                                selectionActivelySelected: event.currentTarget.checked
                                            } )

                                            this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().insert_Entry( entry )

                                            this.forceUpdate()

                                            window.setTimeout( () => {
                                                try {

                                                    this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }, 50 )

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    } }
                                />

                                <span> </span>
                                <span>
                                    { variable_Modifications_Selection_Entry.modificationMass }
                                </span>
                            </label>

                            <span> choose color </span>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Display color of modification balls for this variable mod mass { variable_Modifications_Selection_Entry.modificationMass }.
                                        </div>
                                        <div style={ { marginTop: 10 } }>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    className=" clickable "
                                >
                                    <svg
                                        width={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                        height={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                    >
                                        <circle
                                            cx={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            cy={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            r={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            fill={
                                                variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                    variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                    _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS }
                                            stroke={ _MODIFICATION_BALL__IN_HTML__STROKE_COLOR }
                                            strokeWidth={ _MODIFICATION_BALL__IN_HTML__STROKE_WIDTH }
                                            onClick={ event => {

                                                const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                                const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                                    ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                        const newColor = params.newColor

                                                        // Require format #RRGGBB
                                                        if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                            const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                            console.warn( msg )
                                                            throw Error( msg )
                                                        }

                                                        const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                            modificationMass: variable_Modifications_Selection_Entry.modificationMass,
                                                            color__SixHex_WithLeading_Hash: newColor,
                                                            selectionActivelySelected: variable_Modifications_Selection_Entry.selectionActivelySelected
                                                        } )

                                                        this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().insert_Entry( entry )

                                                        this.forceUpdate()

                                                        window.setTimeout( () => {
                                                            try {

                                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                            } catch ( e ) {
                                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                                throw e
                                                            }
                                                        }, 50 )

                                                    }

                                                colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                                    existingColor:
                                                        variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                            variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                            _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                                    position_top: targetBoundingRect.top,
                                                    position_left: targetBoundingRect.left,
                                                    cancel_Callback: () => {
                                                    },
                                                    change_Callback
                                                } )
                                            } }
                                        />
                                    </svg>
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>


                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    style={ { marginLeft: 4 } }
                                    className=" icon-small clickable "
                                    src="static/images/icon-edit.png"
                                    onClick={ event => {

                                        const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                        const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                            ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                const newColor = params.newColor

                                                // Require format #RRGGBB
                                                if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                    const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                    console.warn( msg )
                                                    throw Error( msg )
                                                }

                                                const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                    modificationMass: variable_Modifications_Selection_Entry.modificationMass,
                                                    color__SixHex_WithLeading_Hash: newColor,
                                                    selectionActivelySelected: variable_Modifications_Selection_Entry.selectionActivelySelected
                                                } )

                                                this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().insert_Entry( entry )

                                                this.forceUpdate()

                                                window.setTimeout( () => {
                                                    try {

                                                        this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                }, 50 )

                                            }

                                        colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                            existingColor:
                                                variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                    variable_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                    _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                            position_top: targetBoundingRect.top,
                                            position_left: targetBoundingRect.left,
                                            cancel_Callback: () => {
                                            },
                                            change_Callback
                                        } )
                                    } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            <span> </span>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Delete Modification Mass/Color selection"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    className=" fake-link-image icon-small "
                                    src="static/images/icon-circle-delete.png"
                                    onClick={ event => {

                                        this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().delete_Entry_For_ModificationMass( variable_Modifications_Selection_Entry.modificationMass )

                                        this.forceUpdate()

                                        window.setTimeout( () => {
                                            try {

                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        }, 50 )

                                        this.forceUpdate()
                                    } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    </React.Fragment>
                )

                variableMods_SelectionEntries_Element_Array.push( element )
            }

            variableMods_Selections_Element = (
                <div>
                    <div>
                        Custom variable mod mass colors:
                    </div>
                    { variableMods_SelectionEntries_Element_Array }
                </div>
            )
        }


        //  Open Mods Selections

        let openMods_Selections_Element: React.JSX.Element = undefined

        if ( ! this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().isEmpty() ) {

            const openMods_SelectionEntries_Element_Array: Array<React.JSX.Element> = []

            const open_Modifications_Selections = Array.from( this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().getAll() )

            open_Modifications_Selections.sort( ( a, b ) => {
                if ( a.modificationMass < b.modificationMass ) {
                    return -1
                }
                if ( a.modificationMass > b.modificationMass ) {
                    return 1
                }
                return 0
            } )

            for ( const open_Modifications_Selection_Entry of open_Modifications_Selections ) {

                const element = (
                    <React.Fragment
                        key={ open_Modifications_Selection_Entry.modificationMass }
                    >
                        <div style={ _SingleModificationEntry_OutermostDiv_Style }>

                            <label>
                                <input
                                    type="checkbox"
                                    checked={ open_Modifications_Selection_Entry.selectionActivelySelected }
                                    onChange={ event => {
                                        try {

                                            const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                modificationMass: open_Modifications_Selection_Entry.modificationMass,
                                                color__SixHex_WithLeading_Hash:
                                                    open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                        open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                        _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                                selectionActivelySelected: event.currentTarget.checked
                                            } )

                                            this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().insert_Entry( entry )

                                            this.forceUpdate()

                                            window.setTimeout( () => {
                                                try {

                                                    this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }, 50 )

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    } }
                                />

                                <span> </span>
                                <span>
                                    { open_Modifications_Selection_Entry.modificationMass }
                                </span>
                            </label>

                            <span> choose color </span>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Display color of modification balls for this open mod mass { open_Modifications_Selection_Entry.modificationMass }.
                                        </div>
                                        <div style={ { marginTop: 10 } }>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <span
                                    className=" clickable "
                                >
                                    <svg
                                        width={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                        height={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                    >
                                        <circle
                                            cx={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            cy={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            r={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                            fill={
                                                open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                    open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                    _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS }
                                            stroke={ _MODIFICATION_BALL__IN_HTML__STROKE_COLOR }
                                            strokeWidth={ _MODIFICATION_BALL__IN_HTML__STROKE_WIDTH }
                                            onClick={ event => {

                                                const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                                const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                                    ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                        const newColor = params.newColor

                                                        // Require format #RRGGBB
                                                        if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                            const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                            console.warn( msg )
                                                            throw Error( msg )
                                                        }

                                                        const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                            modificationMass: open_Modifications_Selection_Entry.modificationMass,
                                                            color__SixHex_WithLeading_Hash: newColor,
                                                            selectionActivelySelected: open_Modifications_Selection_Entry.selectionActivelySelected
                                                        } )

                                                        this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().insert_Entry( entry )

                                                        this.forceUpdate()

                                                        window.setTimeout( () => {
                                                            try {

                                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                            } catch ( e ) {
                                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                                throw e
                                                            }
                                                        }, 50 )

                                                    }

                                                colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                                    existingColor:
                                                        open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                            open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                            _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                                    position_top: targetBoundingRect.top,
                                                    position_left: targetBoundingRect.left,
                                                    cancel_Callback: () => {
                                                    },
                                                    change_Callback
                                                } )
                                            } }
                                        />
                                    </svg>
                                </span>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Click to change color.
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    style={ { marginLeft: 4 } }
                                    className=" icon-small clickable "
                                    src="static/images/icon-edit.png"
                                    onClick={ event => {

                                        const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                        const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                            ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {
                                                const newColor = params.newColor

                                                // Require format #RRGGBB
                                                if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                                    const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                                    console.warn( msg )
                                                    throw Error( msg )
                                                }

                                                const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                    modificationMass: open_Modifications_Selection_Entry.modificationMass,
                                                    color__SixHex_WithLeading_Hash: newColor,
                                                    selectionActivelySelected: open_Modifications_Selection_Entry.selectionActivelySelected
                                                } )

                                                this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().insert_Entry( entry )

                                                this.forceUpdate()

                                                window.setTimeout( () => {
                                                    try {

                                                        this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                                    } catch ( e ) {
                                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                        throw e
                                                    }
                                                }, 50 )

                                            }

                                        colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                            existingColor:
                                                open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash ?
                                                    open_Modifications_Selection_Entry.color__SixHex_WithLeading_Hash :
                                                    _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                            position_top: targetBoundingRect.top,
                                            position_left: targetBoundingRect.left,
                                            cancel_Callback: () => {
                                            },
                                            change_Callback
                                        } )
                                    } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                            <span> </span>

                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Delete Modification Mass/Color selection"
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <img
                                    className=" fake-link-image icon-small "
                                    src="static/images/icon-circle-delete.png"
                                    onClick={ event => {

                                        this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().delete_Entry_For_ModificationMass( open_Modifications_Selection_Entry.modificationMass )

                                        this.forceUpdate()

                                        window.setTimeout( () => {
                                            try {

                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        }, 50 )

                                        this.forceUpdate()
                                    } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        </div>
                    </React.Fragment>
                )

                openMods_SelectionEntries_Element_Array.push( element )
            }

            openMods_Selections_Element = (
                <div>
                    <div>
                        Custom open mod mass colors:
                    </div>
                    { openMods_SelectionEntries_Element_Array }
                </div>
            )
        }


        return (

            <div style={ { marginLeft: 0, marginTop: 10 } }>

                {/*
                <div>
                    Balls for specific modification masses (A Position that has the selected modification mass will be shown in that color and will be shown if "Show Modification Balls" just above is not checked):
                </div>
                <div>
                    Removing the checkbox selection for one of these specific modification masses will let that position be colored by a different specific modification masses or the general "Show Modification Balls" color just above.
                </div>
                <div>
                    NOTE:  For Color Select of mod ball, First mod mass match is used. search variable then open mod selections. search smallest mass first. Search ONLY mod masses that pass ALL filters.
                </div>
                */}

                { variableMods_Selections_Element }

                { openMods_Selections_Element }

                <div style={ { marginTop: 10, marginBottom: 10 } }>
                    <span
                        className=" fake-link "
                        onClick={ event => {

                            const variable_Mods_Pass_ALL_Filters_Set: Set<number> = new Set()
                            const open_Mods_Pass_ALL_Filters_Set: Set<number> = new Set()

                            {
                                const modificationMass_AND_Color_Selections__Root = this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root()

                                for ( const modifications_Map_Key_ProteinPosition_MapEntry of this._mainData_Computed_For_ComponentsInThisFile_Root_Result.modifications_Map_Key_ProteinPosition.entries() ) {

                                    const limelight_ProteinPosition = modifications_Map_Key_ProteinPosition_MapEntry[ 0 ]
                                    const modifications_Values = modifications_Map_Key_ProteinPosition_MapEntry[ 1 ]

                                    {
                                        let found_ProteinPosition_IN_StructureSequence_Mapping = false


                                        for ( const chainData of this._chainData_Parsed_From_OnStructure_In_StructureFile_Order_Array ) {

                                            if ( ! this.props.protein_Structure_Widget_StateObject.selected_LimelightAssigned_ChainId_Set__CONTAINS( chainData.limelightAssigned_ChainId ) ) {
                                                // NOT currently displaying so skip
                                                continue  // EARLY CONTINUE
                                            }

                                            const sequenceAlignment_DataForChain = this._structureFile_Contents_Entry_Value__CurrentlyDisplayed.structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId.get( chainData.limelightAssigned_ChainId )
                                            if ( ! sequenceAlignment_DataForChain ) {
                                                //  NO Alignment data for this chain so skip
                                                continue  // EARLY CONTINUE
                                            }

                                            const sequenceAlignment_DataFor_ProteinSequenceVersionId = sequenceAlignment_DataForChain // sequenceAlignment_DataForChain.get_DataFor_ProteinSequenceVersionId( this.props.proteinSequenceVersionId )
                                            if ( ! sequenceAlignment_DataFor_ProteinSequenceVersionId ) {
                                                //  NO Alignment data for this proteinSequenceVersionId so skip
                                                continue  // EARLY CONTINUE
                                            }

                                            if ( sequenceAlignment_DataFor_ProteinSequenceVersionId.structureFile__ProteinAlignment__CurrentProtein.get__structureFile_AlignedSequence_Position__FOR__limelightProteinSequence_Position( limelight_ProteinPosition ) ) {

                                                found_ProteinPosition_IN_StructureSequence_Mapping = true

                                                break
                                            }

                                        }

                                        if ( ! found_ProteinPosition_IN_StructureSequence_Mapping ) {

                                            //  Limelight Protein Position NOT MAPPED to Structure Sequence Position so SKIP.  Assume would check all chains.

                                            continue  //  EARLY CONTINUE
                                        }
                                    }

                                    if ( modifications_Values.modifications_Passes_ALL_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules ) {

                                        const variable_Modifications_Selections = modificationMass_AND_Color_Selections__Root.get_variable_Modifications_Selections()

                                        for ( const variable_Mod of modifications_Values.modifications_Passes_ALL_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules ) {

                                            if ( ! variable_Modifications_Selections.get_Entry_For_ModificationMass( variable_Mod ) ) {
                                                //  NOT already selected so add it
                                                variable_Mods_Pass_ALL_Filters_Set.add( variable_Mod )
                                            }
                                        }
                                    }
                                    if ( modifications_Values.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber ) {

                                        const open_Modifications_Selections = modificationMass_AND_Color_Selections__Root.get_open_Modifications_Selections()

                                        for ( const open_Mod of modifications_Values.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber ) {

                                            if ( ! open_Modifications_Selections.get_Entry_For_ModificationMass( open_Mod ) ) {
                                                //  NOT already selected so add it
                                                open_Mods_Pass_ALL_Filters_Set.add( open_Mod )
                                            }
                                        }
                                    }
                                }
                            }

                            open_protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component( {
                                commonParams: {
                                    variable_Mods_Pass_ALL_Filters_Set,
                                    open_Mods_Pass_ALL_Filters_Set,
                                    alignmentComplete_Callback: ( params: Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_AlignmentComplete_Callback_Params ) => {

                                        if ( params.variable_Mod_Mass_Selected !== undefined ) {

                                            const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                modificationMass: params.variable_Mod_Mass_Selected,
                                                color__SixHex_WithLeading_Hash: undefined,
                                                selectionActivelySelected: true
                                            } )

                                            this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_variable_Modifications_Selections().insert_Entry( entry )

                                        } else if ( params.open_Mod_Mass_Selected !== undefined ) {

                                            const entry = new Protein_Structure_Widget_StateObject__ModificationMass_AND_Color_Selections__SingleEntry( {
                                                modificationMass: params.open_Mod_Mass_Selected,
                                                color__SixHex_WithLeading_Hash: undefined,
                                                selectionActivelySelected: true
                                            } )

                                            this.props.protein_Structure_Widget_StateObject.get_modificationMass_AND_Color_Selections__Root().get_open_Modifications_Selections().insert_Entry( entry )

                                        } else {
                                            const msg = "Neither of params.variable_Mod_Mass_Selected or params.open_Mod_Mass_Selected populated"
                                            console.warn( msg )
                                            throw Error( msg )
                                        }

                                        this.forceUpdate()

                                        window.setTimeout( () => {
                                            try {

                                                this._add_Balls_For_Modifications__FirstDeleteExistingBalls()

                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        }, 50 )

                                    }
                                }
                            } )
                        } }
                    >
                        Choose color for specific mod mass
                    </span>
                </div>

            </div>
        )
    }
}



////////////////////////



///////////////////////

/////  Actual component

/**
 *
 */
interface INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component_Props {

    protein_Structure_Widget_StateObject: Protein_Structure_Widget_StateObject

    stateObject_Change_CallbackFunction: () => void
}

/**
 *
 */
class INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component_State {

    _placeholder?: unknown
}

/**
 * Search Based -- as opposed to Experiment Based
 */
class INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component extends React.Component<INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component_Props, INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component_State> {

    private _modification_Ball_Size_Scale_Percentage_Value__Selection_InitialValue: number

    /**
     *
     */
    constructor( props: INTERNAL__Modification_Symbols_Size_Percentage_Value_UserSelect__Component_Props ) {
        try {
            super( props );

            this._modification_Ball_Size_Scale_Percentage_Value__Selection_InitialValue = props.protein_Structure_Widget_StateObject.get_modification_Symbols_Size_Percentage_Value()

            this.state = {};

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <div style={ { display: "flex" } }>

                    <div
                        style={ { alignSelf: "anchor-center", paddingRight: 15 } }
                    >
                        Modification Ball Size:
                    </div>

                    <Box sx={ { width: 100 } }>
                        <Slider
                            track={ false }
                            size="small"
                            aria-label="Modification Ball Size Scale"
                            defaultValue={ this._modification_Ball_Size_Scale_Percentage_Value__Selection_InitialValue }
                            //  Update min/max for limits in 'marks'
                            min={ Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_MIN }
                            max={ Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_MAX }
                            step={ Protein_Structure_Widget_StateObject__ModificationBall_Size_Scale_Percentage_Value_Constants._BALL_SIZE_SCALE_SELECTION_STEP }

                            getAriaValueText={ ( value: number ) => {
                                return value + "%"
                            } }

                            valueLabelDisplay="auto" //  Shows value as user drags.
                            valueLabelFormat={ ( value: number, index: number ) => {
                                return value + "%"
                            } }

                            marks={ true }  // show dots at each discrete point

                            onChangeCommitted={ ( event: React.SyntheticEvent | Event, value: unknown ) => {
                                try {

                                    // console.warn( "onChangeCommitted called. event: ", event )
                                    // console.warn( "onChangeCommitted called. value: ", value )

                                    if ( ! limelight__variable_is_type_number_Check( value ) ) {

                                        const msg = "onChangeCommitted called. value is NOT a number.  value: " + value
                                        console.warn( msg )
                                        throw Error( msg )
                                    }

                                    // console.warn( "onChangeCommitted called. value IS a number.  value: " + value )

                                    this.props.protein_Structure_Widget_StateObject.set_modification_Symbols_Size_Percentage_Value( value )

                                    this.forceUpdate()

                                    window.setTimeout( () => {
                                        try {

                                            this.props.stateObject_Change_CallbackFunction()

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    }, 50 )

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }

                            } }
                        />
                    </Box>

                    <div
                        style={ { alignSelf: "anchor-center", paddingLeft: 15 } }
                    >

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    Current selection
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span>
                                {/*  Show current value  */ }
                                { this.props.protein_Structure_Widget_StateObject.get_modification_Symbols_Size_Percentage_Value() }%
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>
            </div>
        )
    }

}

///////////////////////

/////  Actual component

/**
 *
 */
interface INTERNAL__Color_ResidueLetters_UserSelect__Component_Props {

    protein_Structure_Widget_StateObject: Protein_Structure_Widget_StateObject

    stateObject_Change_CallbackFunction: () => void
}

/**
 *
 */
class INTERNAL__Color_ResidueLetters_UserSelect__Component_State {

    _placeholder?: unknown
}

/**
 * Search Based -- as opposed to Experiment Based
 */
class INTERNAL__Color_ResidueLetters_UserSelect__Component extends React.Component<INTERNAL__Color_ResidueLetters_UserSelect__Component_Props, INTERNAL__Color_ResidueLetters_UserSelect__Component_State> {

    private readonly _RESIDUE_VALUE__NO_SELECTION: string = "ZZ_NO_SELECTION_ZZ"  // MUST not be in LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT

    private _show_SelectAResidue_Entry = false

    /**
     *
     */
    constructor( props: INTERNAL__Color_ResidueLetters_UserSelect__Component_Props ) {
        try {
            super( props );

            {  //  Validate that 'this._RESIDUE_VALUE__NO_SELECTION' is NOT IN LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT
                if ( LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT.includes( this._RESIDUE_VALUE__NO_SELECTION ) ) {
                    const msg = "ERROR:  Value assigned to this._RESIDUE_VALUE__NO_SELECTION: '" + this._RESIDUE_VALUE__NO_SELECTION + "' is IN array LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT"
                    console.warn( msg )
                    throw Error( msg )
                }
            }

            this.state = {};

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <div>
                    { ( ! this._show_SelectAResidue_Entry )
                    && this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().isEmpty() ? (
                        // fake link here when NO selections
                        <>
                            <span
                                className=" fake-link "
                                onClick={ event => {

                                    this._show_SelectAResidue_Entry = true

                                    this.forceUpdate()
                                } }
                            >
                                Add custom color for amino acid
                            </span>
                        </>
                    ) : (

                        <span style={ { fontWeight: "bold" } }>
                            Custom amino acid colors
                        </span>
                    ) }
                </div>
                <div style={ { marginLeft: 30, marginTop: 10 } }>

                    {/* Current Selections  */ }
                    { this._render__CurrentSelections() }

                    { ( ! this._show_SelectAResidue_Entry )
                    && ( ! this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().isEmpty() ) ? (
                        // Button here Below selections when YES selections
                        <div style={ { marginTop: 5 } }>
                            <span
                                className=" fake-link "
                                onClick={ event => {

                                    this._show_SelectAResidue_Entry = true

                                    this.forceUpdate()
                                } }
                            >
                                Add custom color for amino acid
                            </span>
                        </div>
                    ) : null }

                </div>
            </div>
        )
    }

    /**
     *
     */
    private _render__CurrentSelections() {

        const residueLetter_AND_Color_Selection__Array_Local = Array.from( this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().getAll() )

        residueLetter_AND_Color_Selection__Array_Local.sort( ( a, b ) => {
            if ( a.residueLetter < b.residueLetter ) {
                return -1
            }
            if ( a.residueLetter > b.residueLetter ) {
                return 1
            }
            return 0
        } )

        let show_SelectAResidue_Entry_Element: React.JSX.Element = undefined

        if ( this._show_SelectAResidue_Entry ) {

            const item = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry( {
                residueLetter: this._RESIDUE_VALUE__NO_SELECTION,
                color__SixHex_WithLeading_Hash: undefined,
                residueLetter_SelectedForDisplay: true  // default to true
            } )

            show_SelectAResidue_Entry_Element = this._render__Single_CurrentSelection( item )
        }


        return (
            <>
                { residueLetter_AND_Color_Selection__Array_Local.map( item => {

                    return this._render__Single_CurrentSelection( item )
                } ) }

                { show_SelectAResidue_Entry_Element }
            </>
        )
    }

    /**
     *
     */
    private _render__Single_CurrentSelection( item: Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry ) {

        const residueLetter_SelectOptions_ElementArray: Array<React.JSX.Element> = []

        { //  Selection of residue letter to set color

            if ( item.residueLetter === this._RESIDUE_VALUE__NO_SELECTION ) {

                residueLetter_SelectOptions_ElementArray.push(
                    <React.Fragment
                        key={ this._RESIDUE_VALUE__NO_SELECTION }
                    >
                        <option
                            value={ this._RESIDUE_VALUE__NO_SELECTION }
                        >
                            Select a residue
                        </option>
                        {/*<MenuItem*/ }
                        {/*    value={ this._RESIDUE_VALUE__NO_SELECTION }*/ }
                        {/*>*/ }
                        {/*    Select a residue*/ }
                        {/*</MenuItem>*/ }
                    </React.Fragment>
                )
            }

            for ( const residueLetter of LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT ) {

                //  Include current selected letter and Exclude all other selected letters

                if ( residueLetter === item.residueLetter ) {
                    //  keep
                } else {
                    if ( this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().get_Entry_For_ResidueLetter( residueLetter ) ) {
                        // Skip since selected in other entry
                        continue // EARLY CONTINUE
                    }
                }

                residueLetter_SelectOptions_ElementArray.push(
                    <React.Fragment
                        key={ residueLetter }
                    >
                        <option
                            value={ residueLetter }
                        >
                            { residueLetter }
                        </option>
                        {/*    <MenuItem*/ }
                        {/*        value={ residueLetter }*/ }
                        {/*    >*/ }
                        {/*        { residueLetter }*/ }
                        {/*    </MenuItem>*/ }
                    </React.Fragment>
                )
            }
        }

        return (

            <div style={ { marginTop: 5 } }>

                { item.residueLetter !== this._RESIDUE_VALUE__NO_SELECTION ? (
                    <>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        Display color of residue letter.
                                    </div>
                                    <div style={ { marginTop: 10 } }>
                                        Check to display residue color on structure.
                                    </div>
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <input
                                type="checkbox"
                                checked={ item.residueLetter_SelectedForDisplay }
                                onChange={ event => {

                                    event.target.blur()

                                    const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry( {
                                        residueLetter: item.residueLetter,
                                        color__SixHex_WithLeading_Hash: item.color__SixHex_WithLeading_Hash,
                                        residueLetter_SelectedForDisplay: event.currentTarget.checked
                                    } )

                                    this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().insert_Entry( entry )

                                    this.forceUpdate()

                                    window.setTimeout( () => {
                                        try {

                                            this.props.stateObject_Change_CallbackFunction()

                                        } catch ( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                            throw e
                                        }
                                    }, 50 )

                                }}
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                    </>
                ) : null }

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={
                        "Residue to specify color for"
                    }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <select
                        value={ item.residueLetter }
                        onChange={ event => {

                            event.target.blur()

                            const new_ResidueLetter = event.target.value

                            if ( ! limelight__IsVariableAString( new_ResidueLetter ) ) {
                                const msg = "in 'XXXX': 'event.target.value' is NOT type string"
                                console.warn( msg )
                                throw Error( msg )
                            }

                            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().delete_Entry_For_ResidueLetter( item.residueLetter ) // Delete from old residueLetter

                            const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry( {
                                residueLetter: new_ResidueLetter,
                                color__SixHex_WithLeading_Hash: item.color__SixHex_WithLeading_Hash,
                                residueLetter_SelectedForDisplay: item.residueLetter_SelectedForDisplay
                            } )

                            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().insert_Entry( entry )

                            if ( item.residueLetter === this._RESIDUE_VALUE__NO_SELECTION ) {

                                this._show_SelectAResidue_Entry = false  // Set to false since set to a value
                            }

                            this.forceUpdate()

                            window.setTimeout( () => {
                                try {

                                    this.props.stateObject_Change_CallbackFunction()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            }, 50 )
                        } }
                    >
                        { residueLetter_SelectOptions_ElementArray }
                    </select>

                    {/*<FormControl size="small">*/ }
                    {/*    <Select*/ }
                    {/*        size="small"*/ }
                    {/*        sx={ {*/ }
                    {/*            // maxWidth: searchName_Select_MenuItem_MaxWidth,*/ }
                    {/*            fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number*/ }
                    {/*        } }*/ }
                    {/*        // sx={ { width: searchName_Select_MenuItem_MaxWidth } }*/ }
                    {/*        MenuProps={*/ }
                    {/*            {*/ }
                    {/*                sx: {*/ }
                    {/*                    // maxWidth: searchName_Select_MenuItem_MaxWidth,*/ }
                    {/*                    fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number*/ }
                    {/*                }*/ }
                    {/*            }*/ }
                    {/*        }*/ }
                    {/*        value={ item.residueLetter }*/ }
                    {/*        onChange={ event => {*/ }

                    {/*            const new_ResidueLetter = event.target.value*/ }

                    {/*            if ( ! limelight__IsVariableAString( new_ResidueLetter ) ) {*/ }
                    {/*                const msg = "in 'XXXX': 'event.target.value' is NOT type string"*/ }
                    {/*                console.warn( msg )*/ }
                    {/*                throw Error( msg )*/ }
                    {/*            }*/ }

                    {/*            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().delete_Entry_For_ResidueLetter( item.residueLetter ) // Delete from old residueLetter*/ }

                    {/*            const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry({*/ }
                    {/*                residueLetter: new_ResidueLetter,*/ }
                    {/*                color__SixHex_WithLeading_Hash: item.color__SixHex_WithLeading_Hash*/ }
                    {/*            })*/ }

                    {/*            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().insert_Entry( entry )*/ }

                    {/*            if ( item.residueLetter === this._RESIDUE_VALUE__NO_SELECTION ) {*/ }

                    {/*                this._show_SelectAResidue_Entry = false  // Set to false since set to a value*/ }
                    {/*            }*/ }

                    {/*            window.setTimeout( () => { try {*/ }

                    {/*                this.props.stateObject_Change_CallbackFunction()*/ }

                    {/*            } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e }}, 50 )*/ }
                    {/*        } }*/ }
                    {/*    >*/ }
                    {/*        { residueLetter_SelectOptions_ElementArray }*/ }
                    {/*    </Select>*/ }
                    {/*</FormControl>*/ }

                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                { item.residueLetter !== this._RESIDUE_VALUE__NO_SELECTION ? (
                    <>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        Display color of residue letter.
                                    </div>
                                    <div style={ { marginTop: 10 } }>
                                        Click to change color.
                                    </div>
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" clickable "
                            >
                                <svg
                                    width={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                    height={ _MODIFICATION_BALL__IN_HTML__RADIUS * 2 }
                                >
                                    <circle
                                        cx={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        cy={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        r={ _MODIFICATION_BALL__IN_HTML__RADIUS }
                                        fill={
                                            item.color__SixHex_WithLeading_Hash ?
                                                item.color__SixHex_WithLeading_Hash :
                                                _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS
                                        }
                                        stroke={ _MODIFICATION_BALL__IN_HTML__STROKE_COLOR }
                                        strokeWidth={ _MODIFICATION_BALL__IN_HTML__STROKE_WIDTH }
                                        onClick={ event => {

                                            const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                            const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                                ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {

                                                    const newColor = params.newColor

                                                    this.forceUpdate()

                                                    const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry( {
                                                        residueLetter: item.residueLetter,
                                                        color__SixHex_WithLeading_Hash: newColor,
                                                        residueLetter_SelectedForDisplay: item.residueLetter_SelectedForDisplay
                                                    } )

                                                    this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().insert_Entry( entry )

                                                    window.setTimeout( () => {
                                                        try {

                                                            this.props.stateObject_Change_CallbackFunction()

                                                        } catch ( e ) {
                                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                            throw e
                                                        }
                                                    }, 50 )

                                                }

                                            colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                                existingColor:
                                                    item.color__SixHex_WithLeading_Hash ?
                                                        item.color__SixHex_WithLeading_Hash :
                                                        _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                                position_top: targetBoundingRect.top,
                                                position_left: targetBoundingRect.left,
                                                cancel_Callback: () => {
                                                },
                                                change_Callback
                                            } )
                                        } }
                                    />
                                </svg>
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <div>
                                    <div>
                                        Click to change color.
                                    </div>
                                </div>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <img
                                style={ { marginLeft: 4 } }
                                className=" icon-small clickable "
                                src="static/images/icon-edit.png"
                                onClick={ event => {

                                    const targetBoundingRect = event.currentTarget.getBoundingClientRect()

                                    const change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
                                        ( params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ): void => {

                                            const newColor = params.newColor

                                            this.forceUpdate()

                                            const entry = new Protein_Structure_Widget_StateObject__ResidueLetter_AND_Color_Selections__SingleEntry( {
                                                residueLetter: item.residueLetter,
                                                color__SixHex_WithLeading_Hash: newColor,
                                                residueLetter_SelectedForDisplay: item.residueLetter_SelectedForDisplay
                                            } )

                                            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().insert_Entry( entry )

                                            window.setTimeout( () => {
                                                try {

                                                    this.props.stateObject_Change_CallbackFunction()

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }, 50 )

                                        }

                                    colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay( {
                                        existingColor:
                                            item.color__SixHex_WithLeading_Hash ?
                                                item.color__SixHex_WithLeading_Hash :
                                                _MODIFICATION_BALL__DEFAULT_COLOR__MODIFICATION_SPECIFIC_MASS,
                                        position_top: targetBoundingRect.top,
                                        position_left: targetBoundingRect.left,
                                        cancel_Callback: () => {
                                        },
                                        change_Callback
                                    } )
                                } }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </>
                ) : null }

                <span> </span>

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={
                        "Delete Residue/Color selection"
                    }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <img
                        className=" fake-link-image icon-small "
                        src="static/images/icon-circle-delete.png"
                        onClick={ event => {

                            this.props.protein_Structure_Widget_StateObject.get_residueLetter_AND_Color_Selection_Root().delete_Entry_For_ResidueLetter( item.residueLetter )

                            window.setTimeout( () => {
                                try {

                                    this.props.stateObject_Change_CallbackFunction()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            }, 50 )

                            this.forceUpdate()
                        } }
                    />
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

            </div>
        )
    }
}

/////////////////

//    Tooltip Component displayed when hover on Residue in structure - Component

//     Create this component so that React render/virtual dom diff/update dom will be fast given limited scope

//   Parameter to method on component

/**
 * Parameter to method on component to update component contents
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Root {

    /**
     * Mouse over Structure Position
     */
    for__StructurePosition: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter__FOR__StructurePosition

    for__TrypsinCutPoint_Disk: INTERNAL__Molstar_DiskData
}

//  TODO  CLean up commented out properties in next class and remove class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__LimelightOrStructure

/**
 * Parameter to method on component to update component contents
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter__FOR__StructurePosition {

    subpart_FOR__Limelight_ONLY: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Limelight_ONLY
    subpart_FOR__Structure_ONLY: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Structure_ONLY
}

/**
 * Sub part - data for ONLY Limelight Sequence based
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Limelight_ONLY {

    limelight_PSM_Count: number
    modifications_At_Position__PassesAllFilters: boolean

    modifications_For_Position: INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry
}

/**
 * Sub part - data for ONLY Structure Sequence based
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Subpart__Structure_ONLY {

    /**
     * Data for chain hover over.  Limelight id, label_asym_id, ...
     *
     * Limelight Class
     */
    chainData: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry

    structure_ResidueName: string

    structureSequence_InChain: string

    /**
     * Position in structure
     *
     * Computed from StructureProperties.residue.label_seq_id( location )
     *
     * ONE based
     */
    structureSequence_InChain_PositionNumber__From_label_seq_id__ONE_BASED: number

    /**
     *
     */
    sequenceAlignment_DataFor_ProteinSequenceVersionId: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry

}

/////  Actual component

/**
 *
 */
interface INTERNAL__Residue_Tooltip__Tooltip_Contents__Component_Props {

    limelight_AnyFilter__HasFilterValue: Limelight_AnyFilter__HasFilterValue
    trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    proteinSequence: string

    onMount_CallbackFunction: ( component: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component ) => void
}

/**
 *
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component_State {

    _placeholder?: unknown
}

/**
 *
 */
class INTERNAL__Residue_Tooltip__Tooltip_Contents__Component extends React.Component<INTERNAL__Residue_Tooltip__Tooltip_Contents__Component_Props, INTERNAL__Residue_Tooltip__Tooltip_Contents__Component_State> {

    private _contents_Object_Root: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Root

    /**
     *
     */
    constructor( props: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component_Props ) {
        try {
            super( props );

            this.state = {};

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }


    /**
     * After render()
     */
    componentDidMount() {
        try {
            if ( this.props.onMount_CallbackFunction ) {
                this.props.onMount_CallbackFunction(this)
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param contents_Object_Root
     */
    update_Contents__Residue_Tooltip__Tooltip_Contents__Component( contents_Object_Root: INTERNAL__Residue_Tooltip__Tooltip_Contents__Component__MethodParameter_Root ) {

        this._contents_Object_Root = contents_Object_Root

        this.forceUpdate()
    }

    /**
     *
     */
    render() {  try {

        if ( ! this._contents_Object_Root ) {

            return null
        }

        if ( this._contents_Object_Root.for__StructurePosition ) {

            return this._render__for__StructurePosition()
        }

        return this._render__for__TrypsinCutPoint_Disk()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    private _render__for__TrypsinCutPoint_Disk() {

        return (
            <div>
                { this._contents_Object_Root.for__TrypsinCutPoint_Disk.limelight_Only_HTML_TooltipContent }
            </div>
        )
    }

    /**
     *
     */
    private _render__for__StructurePosition() {  try {

        const anyFilter__HasFilterValue = this.props.limelight_AnyFilter__HasFilterValue.is_AnyFilter__HasFilterValue()


        ////  Pass PSM_Etc Filters

        let variableModification_Masses_Passes_PSM_Etc_Filters_String: string = undefined

        let open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String: string = undefined

        ////  Pass ALL Filters AND anyFilter__HasFilterValue is true

        let variableModification_Masses_Passes_ALL_Filters_String: string = undefined

        let open_Rounded_Modification_Masses_Passes_ALL_Filters_String: string = undefined

        {
            const modifications_At_ProteinPosition = this._contents_Object_Root?.for__StructurePosition?.subpart_FOR__Limelight_ONLY?.modifications_For_Position

            if ( modifications_At_ProteinPosition ) {

                ////  Pass PSM_Etc Filters

                {
                    if ( modifications_At_ProteinPosition?.modifications_Passes_PSM_Etc_Filters?.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.size > 0 ) {

                        const variableModification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( variableModification_Masses_Array )
                        variableModification_Masses_Passes_PSM_Etc_Filters_String = variableModification_Masses_Array.join( ", " )
                    }

                    if ( modifications_At_ProteinPosition?.modifications_Passes_PSM_Etc_Filters?.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

                        const open_Rounded_Modification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( open_Rounded_Modification_Masses_Array )
                        open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String = open_Rounded_Modification_Masses_Array.join( ", " )
                    }
                }

                ////  Pass ALL Filters AND anyFilter__HasFilterValue is true

                if ( anyFilter__HasFilterValue ) {

                    if ( modifications_At_ProteinPosition?.modifications_Passes_ALL_Filters?.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.size > 0 ) {

                        const variableModification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( variableModification_Masses_Array )
                        variableModification_Masses_Passes_ALL_Filters_String = variableModification_Masses_Array.join( ", " )
                    }

                    if ( modifications_At_ProteinPosition?.modifications_Passes_ALL_Filters?.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

                        const open_Rounded_Modification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( open_Rounded_Modification_Masses_Array )
                        open_Rounded_Modification_Masses_Passes_ALL_Filters_String = open_Rounded_Modification_Masses_Array.join( ", " )
                    }
                }
            }
        }

        const structureSequence_InChain__CenterPosition = this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.structureSequence_InChain_PositionNumber__From_label_seq_id__ONE_BASED

        const limelightProteinSequence_Position__ONE_BASED =
            this._contents_Object_Root?.
            for__StructurePosition?.
            subpart_FOR__Structure_ONLY?.
            sequenceAlignment_DataFor_ProteinSequenceVersionId?.
            structureFile__ProteinAlignment__CurrentProtein?.
            get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( structureSequence_InChain__CenterPosition )

        const limelightSequence_Label_And_ResidueLettersAtPositions = this._render_Label_And_ResidueLettersAtPositions({ is_LimelightSequence: true })

        const leftGridElement_MarginRight = 10
        const leftAndRightGridElement_MarginTop = 5

        return (
            <div>
                <div style={ { marginTop: 10 } }>

                    <div
                        style={ {
                            marginLeft: "auto", marginRight: "auto", width: "min-content",
                        } }
                    >
                        <div style={ { display: "grid", gridTemplateColumns: "max-content min-content", columnGap: 10, rowGap: 4 } }>

                            {  limelightSequence_Label_And_ResidueLettersAtPositions ? (

                                <React.Fragment
                                    key={ "limelight" }  //  Add Key so React keeps them separate.
                                >
                                    <div style={ { display: "flex", alignItems: "center" } }>
                                        <div>
                                            Limelight Sequence
                                        </div>
                                    </div>
                                    <div>
                                        { limelightSequence_Label_And_ResidueLettersAtPositions }
                                    </div>
                                </React.Fragment>
                            ) : null }

                            <React.Fragment
                                key={ "structure" } //   Add Key so React keeps them separate.
                            >
                                <div style={ { display: "flex", alignItems: "center" } }>
                                    <div>
                                        Structure Sequence
                                    </div>
                                </div>
                                <div>
                                    { this._render_Label_And_ResidueLettersAtPositions({ is_LimelightSequence: false }) }
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                    <div style={ { textAlign: "center", marginTop: 6 } }>
                        <span>Limelight sequence position: </span>
                        { limelightProteinSequence_Position__ONE_BASED ? (
                            <span>
                                { limelightProteinSequence_Position__ONE_BASED.toLocaleString() }
                            </span>
                        ) : (
                            <span>
                                no aligned position
                            </span>
                        )}
                    </div>
                    <div style={ { textAlign: "center", marginTop: 6 } }>
                        Structure sequence position: { structureSequence_InChain__CenterPosition.toLocaleString() }
                    </div>
                    <div style={ { textAlign: "center", marginTop: 3} }>
                        Structure Chain Id: { get_DisplayNameString_From_CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry( this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.chainData ) }
                    </div>

                    { limelightProteinSequence_Position__ONE_BASED ? (
                        this._contents_Object_Root.for__StructurePosition.subpart_FOR__Limelight_ONLY ? (
                            <div style={ { textAlign: "center", marginTop: 10 } }>
                                <span>Filtered PSM Count: </span>
                                <span>
                                    { this._contents_Object_Root.for__StructurePosition.subpart_FOR__Limelight_ONLY.limelight_PSM_Count.toLocaleString() }
                                </span>
                            </div>
                        ) : (
                            <div style={ { textAlign: "center", marginTop: 10 } }>
                                No sequence coverage at Limelight sequence position
                            </div>
                        )
                    ) : null }

                    { variableModification_Masses_Passes_PSM_Etc_Filters_String || open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String ? (
                        <div
                            className=" word-break-break-word-backup-break-all "
                            style={ {
                                display: "grid", gridTemplateColumns: "max-content 1fr",
                                marginTop: 10,
                                width: "fit-content", marginLeft: "auto", marginRight: "auto"
                            } }
                        >

                            {/*  Modifications that pass the top level PSM Reported Peptide Filters  */}

                            { variableModification_Masses_Passes_PSM_Etc_Filters_String ? (
                                <>
                                    <div style={ { marginRight: leftGridElement_MarginRight, marginTop: leftAndRightGridElement_MarginTop } }>
                                        <div style={ { fontWeight: "bold" } }>
                                            Variable modifications:
                                        </div>
                                    </div>
                                    <div
                                        className=" word-break-break-word-backup-break-all "
                                        style={ { marginTop: leftAndRightGridElement_MarginTop } }
                                    >
                                        { variableModification_Masses_Passes_PSM_Etc_Filters_String }
                                    </div>
                                </>
                            ) : null }

                            { open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String ? (
                                <>
                                    <div style={ { marginRight: leftGridElement_MarginRight, marginTop: leftAndRightGridElement_MarginTop } }>
                                        <div style={ { fontWeight: "bold" } }>
                                            Open modifications:
                                        </div>
                                        <div>
                                            (rounded)
                                        </div>
                                    </div>
                                    <div
                                        className=" word-break-break-word-backup-break-all "
                                        style={ { marginTop: leftAndRightGridElement_MarginTop } }
                                    >
                                        { open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String }
                                    </div>
                                </>
                            ) : null }

                            {/*  Modifications that pass ALL Filters.  ONLY displayed when any filters.  */}

                            { variableModification_Masses_Passes_ALL_Filters_String || open_Rounded_Modification_Masses_Passes_ALL_Filters_String ? (

                                // Span all columns
                                <div style={ { gridColumn: "1 / -1 ", fontWeight: "bold", marginTop: 10 } }>
                                    Modification that pass ALL filters
                                </div>

                            ) : null }

                            { variableModification_Masses_Passes_ALL_Filters_String ? (
                                <>
                                    <div style={ { marginRight: leftGridElement_MarginRight, marginTop: leftAndRightGridElement_MarginTop } }>
                                        <div style={ { fontWeight: "bold" } }>
                                            Variable modifications:
                                        </div>
                                    </div>
                                    <div
                                        className=" word-break-break-word-backup-break-all "
                                        style={ { marginTop: leftAndRightGridElement_MarginTop, color: _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS } }
                                    >
                                        { variableModification_Masses_Passes_ALL_Filters_String }
                                    </div>
                                </>
                            ) : null }

                            { open_Rounded_Modification_Masses_Passes_ALL_Filters_String ? (
                                <>
                                    <div style={ { marginRight: leftGridElement_MarginRight, marginTop: leftAndRightGridElement_MarginTop } }>
                                        <div style={ { fontWeight: "bold" } }>
                                            Open modifications:
                                        </div>
                                        <div>
                                            (rounded)
                                        </div>
                                    </div>
                                    <div
                                        className=" word-break-break-word-backup-break-all "
                                        style={ { marginTop: leftAndRightGridElement_MarginTop, color: _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS } }
                                    >
                                        { open_Rounded_Modification_Masses_Passes_ALL_Filters_String }
                                    </div>
                                </>
                            ) : null }
                        </div>

                    ) : null }

                    <div style={ { marginTop: 10 } }>
                        <div style={ { textAlign: "center" } }>
                            Control/Command Click to toggle filter on this position
                        </div>
                    </div>
                </div>

            </div>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    private readonly _NO_RESIDUE_LETTER_RETURNED: string = undefined

    /**
     * Get Residue Letter
     *
     * if position outside structure sequence, return this._NO_RESIDUE_LETTER_RETURNED
     *
     * if is_LimelightSequence is true,
     *      map to Limelight sequence and return letter or '-'
     * else
     *      return Structure sequence letter
     *
     * @param structurePosition
     * @param is_LimelightSequence
     *
     * @returns this._NO_RESIDUE_LETTER_RETURNED if structure position is not within structure sequence length
     */
    private _getResidueLetter_For_StructurePosition_AND__is_LimelightSequence(
        {
            structurePosition,
            is_LimelightSequence
        } : {
            structurePosition: number
            is_LimelightSequence: boolean
        }) : string {

        const structureSequence_InChain = this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.structureSequence_InChain

        if ( structurePosition < 1 || structurePosition >= structureSequence_InChain.length ) {
            return this._NO_RESIDUE_LETTER_RETURNED
        }


        let residueLetter_FromSequence_At_Position: string = undefined

        if ( is_LimelightSequence ) {

            const limelightProteinSequence_Position__ONE_BASED =
                this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.sequenceAlignment_DataFor_ProteinSequenceVersionId?.
                structureFile__ProteinAlignment__CurrentProtein?.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( structurePosition )

            if ( limelightProteinSequence_Position__ONE_BASED !== undefined && limelightProteinSequence_Position__ONE_BASED !== null  ) {

                const sequencePositionZeroBased = limelightProteinSequence_Position__ONE_BASED - 1

                residueLetter_FromSequence_At_Position = this.props.proteinSequence.charAt( sequencePositionZeroBased );
            } else {
                residueLetter_FromSequence_At_Position = _PROTEIN_STRUCTURE_ALIGNMENT_FILLER_CHARACTER_USER_DISPLAY
            }
        } else {
            const sequencePositionZeroBased = structurePosition - 1

            residueLetter_FromSequence_At_Position = structureSequence_InChain.charAt( ( sequencePositionZeroBased ) );
        }

        return residueLetter_FromSequence_At_Position
    }


    /**
     *
     */
    private _render_Label_And_ResidueLettersAtPositions(
        {
            is_LimelightSequence
        } : {
            is_LimelightSequence: boolean
        }) : React.JSX.Element  {

        const structureSequence_InChain__CenterPosition = this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.structureSequence_InChain_PositionNumber__From_label_seq_id__ONE_BASED

        //* !!!   sequence letter at position !!!!

        const residueLetter_FromSequence_At_Position =
            this._getResidueLetter_For_StructurePosition_AND__is_LimelightSequence({ structurePosition: structureSequence_InChain__CenterPosition, is_LimelightSequence })

        if ( ( ! residueLetter_FromSequence_At_Position )
            || residueLetter_FromSequence_At_Position === this._NO_RESIDUE_LETTER_RETURNED
            || residueLetter_FromSequence_At_Position === _PROTEIN_STRUCTURE_ALIGNMENT_FILLER_CHARACTER_USER_DISPLAY ) {

            //  NO residue letter at sequence position

            if ( ! is_LimelightSequence ) {
                //  BUG:  No Structure residue letter at structure position
                const msg = "'if ( ( ! residueLetter_FromSequence_At_Position ) || residueLetter_FromSequence_At_Position === this._NO_RESIDUE_LETTER_RETURNED ) {' AND 'if ( ! is_LimelightSequence ) {' from this._getResidueLetter_For_StructurePosition_AND__is_LimelightSequence({ structurePosition: structureSequence_InChain__CenterPosition, is_LimelightSequence })  structureSequence_InChain__CenterPosition: " + structureSequence_InChain__CenterPosition
                console.warn(msg)
                throw Error(msg)
            }

            //  NO Limelight Protein Sequence residue letter at sequence position (NOT Aligned) so do NOT render

            return null  // EARLY RETURN
        }

        const svgWidth = 190
        const svgHeight = 26
        const borderWidth = 1
        const borderColor = "red"


        const residue_And_TrypsinCutPoint_ElementArray: Array<React.JSX.Element> = []

        const fontSize_MiddleCharacter = 24
        const x_MiddleCharacter = svgWidth / 2
        const y_MiddleCharacter = 20

        {
            //* !!!   sequence letter at position !!!!

            const element = (

                <React.Fragment
                    key="Middle Residue"
                >
                    <text
                        x={ x_MiddleCharacter }
                        y={ y_MiddleCharacter }
                        textAnchor="middle"
                    >
                        <tspan style={ { fontSize: fontSize_MiddleCharacter } }>{ residueLetter_FromSequence_At_Position }</tspan>
                    </text>
                </React.Fragment>
            )
            residue_And_TrypsinCutPoint_ElementArray.push( element )
        }

        ////////   Residue Letters

        {   //  Compute Left Side Residue Letters

            this._create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight( {
                is_LimelightSequence,
                computeLeft: true,
                elementArray_Result: residue_And_TrypsinCutPoint_ElementArray,  // Updated
                structureSequence_InChain__CenterPosition,
                fontSize_MiddleCharacter, x_MiddleCharacter, y_MiddleCharacter
            } )
        }

        {  //  Compute Right Side Residue Letters

            this._create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight( {
                is_LimelightSequence,
                computeLeft: false,
                elementArray_Result: residue_And_TrypsinCutPoint_ElementArray,  // Updated
                structureSequence_InChain__CenterPosition,
                fontSize_MiddleCharacter, x_MiddleCharacter, y_MiddleCharacter
            } )
        }

        if ( is_LimelightSequence ) {

            //  ONLY add Trypsin Cut Point lines for Limelight Sequence

            ////////   Trypsin Cut Point Lines

            {  //  Compute Left Side Trypsin Cut Point Lines

                //  Compute Left Side Trypsin Cut Point Lines
                this._create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight( {
                    computeLeft: true,
                    elementArray_Result: residue_And_TrypsinCutPoint_ElementArray,  // Updated
                    structureSequence_InChain__CenterPosition,
                    x_MiddleCharacter,
                    y_MiddleCharacter_Baseline: y_MiddleCharacter,
                    trypsin_CutPoints_For_ProteinSequence_Set: this.props.trypsin_CutPoints_For_ProteinSequence_Set
                } )
            }

            {  //  Compute Right Side Trypsin Cut Point Lines
                this._create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight( {
                    computeLeft: false,
                    elementArray_Result: residue_And_TrypsinCutPoint_ElementArray,  // Updated
                    structureSequence_InChain__CenterPosition,
                    x_MiddleCharacter,
                    y_MiddleCharacter_Baseline: y_MiddleCharacter,
                    trypsin_CutPoints_For_ProteinSequence_Set: this.props.trypsin_CutPoints_For_ProteinSequence_Set
                } )
            }
        }

        const elementResult = (

            <React.Fragment
                key={ is_LimelightSequence ? "limelight" : "structure" }  //  Required so React keeps them separate
            >
                <svg width={ svgWidth } height={ svgHeight }>

                    {/*  Rectangle the size of SVG to make border */ }

                    <rect
                        x={ 0.5 }
                        y={ 0.5 }
                        width={ svgWidth - 1 }
                        height={ svgHeight - 1 }
                        stroke={ borderColor }
                        strokeWidth={ borderWidth }
                        fill={ limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_standard_background_color }
                    />

                    { residue_And_TrypsinCutPoint_ElementArray }

                </svg>
            </React.Fragment>
        )

        return elementResult
    }


    /**
     *
     */
    private _create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight(
        {
            is_LimelightSequence,
            computeLeft,
            elementArray_Result,
            structureSequence_InChain__CenterPosition,
            fontSize_MiddleCharacter, y_MiddleCharacter, x_MiddleCharacter
        }: {
            is_LimelightSequence: boolean

            computeLeft: boolean /* false then compute right */

            /**
             * Updated
             */
            elementArray_Result: Array<React.JSX.Element>

            structureSequence_InChain__CenterPosition: number

            fontSize_MiddleCharacter: number
            x_MiddleCharacter: number
            y_MiddleCharacter: number

        } ): void {

        let x = x_MiddleCharacter
        let y = y_MiddleCharacter
        let fontSize = fontSize_MiddleCharacter

        //  Compute Residue Letters for the Left or Right side
        for ( let index = 0; index < _positionTooltip_ResidueLetters_EachSide_Formatting.length; index++ ) {

            const entry = _positionTooltip_ResidueLetters_EachSide_Formatting[ index ]

            let sequencePositionZeroBased_For_ThisResidue: number = undefined

            let offset_Multiplier: number = undefined

            if ( computeLeft ) {

                sequencePositionZeroBased_For_ThisResidue = ( structureSequence_InChain__CenterPosition ) - ( index + 1 )
                offset_Multiplier = -1

                // if ( sequencePositionZeroBased_For_ThisResidue < 0 ) {
                //     //  Outside of sequence range so skip
                //     return  // EARLY RETURN
                // }
            } else {
                sequencePositionZeroBased_For_ThisResidue = ( structureSequence_InChain__CenterPosition ) + ( index + 1 )

                offset_Multiplier = 1

                // if ( sequencePositionZeroBased_For_ThisResidue >= proteinSequence.length ) {
                //     //  Outside of sequence range so return
                //     return  // EARLY RETURN
                // }
            }

            x = x + ( entry.x_offset_From_PrevPosition_OR_CenterPosition * offset_Multiplier )
            y = y + entry.y_offset_From_PrevPosition_OR_CenterPosition
            fontSize = fontSize + entry.fontSize_Offset_From_PrevPosition_OR_CenterPosition


            const residueLetter_At_This_Position =
                this._getResidueLetter_For_StructurePosition_AND__is_LimelightSequence({ structurePosition: sequencePositionZeroBased_For_ThisResidue, is_LimelightSequence })

            if ( residueLetter_At_This_Position === this._NO_RESIDUE_LETTER_RETURNED ) {

                //  Outside of sequence range so return
                return  // EARLY RETURN
            }

            let key = "right"
            if ( computeLeft ) {
                key = "left"
            }
            key += "_index_" + index

            const element = (
                <React.Fragment
                    key={ key }
                >
                    <text
                        data-key={ key }
                        x={ x }
                        y={ y }
                        textAnchor="middle"
                    >
                        <tspan style={ { fontSize } }>{ residueLetter_At_This_Position }</tspan>
                    </text>
                </React.Fragment>
            )

            elementArray_Result.push( element )
        }
    }

    /**
     *
     */
    _create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight(
        {
            computeLeft,
            elementArray_Result,
            structureSequence_InChain__CenterPosition,
            x_MiddleCharacter, y_MiddleCharacter_Baseline,
            trypsin_CutPoints_For_ProteinSequence_Set
        } : {
            computeLeft: boolean /* false then compute right */

            /**
             * Updated
             */
            elementArray_Result: Array<React.JSX.Element>

            structureSequence_InChain__CenterPosition: number

            x_MiddleCharacter: number

            /**
             * Baseline of middle character
             */
            y_MiddleCharacter_Baseline: number

            trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

        }) : void {
        const structureSequence_InChain = this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.structureSequence_InChain

        let x1_x2 = x_MiddleCharacter
        let y2 = y_MiddleCharacter_Baseline
        let lineLength = 0

        //  Compute Trypsin Cut Point Lines for the left or right side
        for ( let index = 0; index < _positionTooltip_TrypsinCutPointLines_EachSide_Formatting.length; index++ ) {

            const entry = _positionTooltip_TrypsinCutPointLines_EachSide_Formatting[ index ]

            let sequencePositionZeroBased_For_ThisResidue: number = undefined

            let offset_Multiplier: number = undefined

            if ( computeLeft ) {

                sequencePositionZeroBased_For_ThisResidue = ( structureSequence_InChain__CenterPosition - 1 ) - index - 1 // '- index' Subtract to move to the left.  '- 1' to use position on left side of cut point
                offset_Multiplier = -1

                if ( sequencePositionZeroBased_For_ThisResidue < 0 ) {
                    //  Outside of sequence range so skip
                    return  // EARLY RETURN
                }
            } else {
                sequencePositionZeroBased_For_ThisResidue = ( structureSequence_InChain__CenterPosition - 1 )  + index  // '+ index' Add to move to the right

                offset_Multiplier = 1

                if ( sequencePositionZeroBased_For_ThisResidue >= structureSequence_InChain.length ) {
                    //  Outside of sequence range so return
                    return  // EARLY RETURN
                }
            }

            x1_x2 = x1_x2 + ( entry.x_Offset_From_PrevLine_Position_OR_MiddleCharacter * offset_Multiplier )
            y2 = y2 + entry.y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline
            lineLength = lineLength + entry.lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength

            const y1 = y2 - lineLength

            //  Check here after update the above values for this position ('x1_x2', 'y2', 'lineLength') so they are the correct value for later positions since they are computed from the previous position.

            const limelightProteinSequence_Position__ONE_BASED =
                this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.sequenceAlignment_DataFor_ProteinSequenceVersionId?.
                structureFile__ProteinAlignment__CurrentProtein?.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequencePositionZeroBased_For_ThisResidue + 1 )
            {

                const limelightProteinSequence_Position__ONE_BASED__PositionPlus_One =
                    this._contents_Object_Root.for__StructurePosition.subpart_FOR__Structure_ONLY.sequenceAlignment_DataFor_ProteinSequenceVersionId?.
                    structureFile__ProteinAlignment__CurrentProtein?.get__limelightProteinSequence_Position__FOR__structureFile_AlignedSequence_Position( sequencePositionZeroBased_For_ThisResidue + 1 + 1 )

                if ( ( limelightProteinSequence_Position__ONE_BASED + 1 ) !== limelightProteinSequence_Position__ONE_BASED__PositionPlus_One ) {
                    //  The aligned Limelight Protein Sequence positions are NOT adjacent so skip
                    continue  // EARLY CONTINUE
                }
            }


            //  '+ 1' since the value in the set is ONE based AND then ADD the '...AddForCenter...' value of 0.5
            if ( ! trypsin_CutPoints_For_ProteinSequence_Set.has( ( limelightProteinSequence_Position__ONE_BASED ) + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions ) ) {
                //   NO Trypsin cut point at this position so skip
                continue  // EARLY CONTINUE
            }

            let key = "right"
            if ( computeLeft ) {
                key = "left"
            }
            key += "_trypsin_cut_point_line_" + index

            const element = (
                <React.Fragment
                    key={ key }
                >
                    <line
                        x1={ x1_x2 }
                        y1={ y1 }
                        x2={ x1_x2 }
                        y2={ y2 }
                        stroke={ _STANDARD_COLOR__TRYPSIN_CUT_POINTS } strokeWidth="2"
                    />
                </React.Fragment>
            )

            elementArray_Result.push( element )
        }
    }
}

/////////////////

//  Tooltip Residue Letter data per position offset from center

class INTERNAL__PositionTooltip_ResidueLetters_Entry {
    x_offset_From_PrevPosition_OR_CenterPosition: number
    y_offset_From_PrevPosition_OR_CenterPosition: number
    fontSize_Offset_From_PrevPosition_OR_CenterPosition: number
}

/**
 * All are offsets.  Negative if next value is smaller (Except for 'x_Offset...')
 */
const _positionTooltip_ResidueLetters_EachSide_Formatting: Array<INTERNAL__PositionTooltip_ResidueLetters_Entry> =[
    {
        x_offset_From_PrevPosition_OR_CenterPosition: 19,
        y_offset_From_PrevPosition_OR_CenterPosition: -3,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -9,
    }, {
        x_offset_From_PrevPosition_OR_CenterPosition: 15,
        y_offset_From_PrevPosition_OR_CenterPosition: -1,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -2,
    }, {
        x_offset_From_PrevPosition_OR_CenterPosition: 14,
        y_offset_From_PrevPosition_OR_CenterPosition: -0,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -1,
    }, {
        x_offset_From_PrevPosition_OR_CenterPosition: 14,
        y_offset_From_PrevPosition_OR_CenterPosition: -1,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -1,
    }, {
        x_offset_From_PrevPosition_OR_CenterPosition: 13,
        y_offset_From_PrevPosition_OR_CenterPosition: -0,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -1,
    }, {
        x_offset_From_PrevPosition_OR_CenterPosition: 12,
        y_offset_From_PrevPosition_OR_CenterPosition: -1,
        fontSize_Offset_From_PrevPosition_OR_CenterPosition: -1,
    }
] as const

/////////////////

//  Tooltip Trypsin Cut Point data per position offset from center

class INTERNAL__PositionTooltip_TrypsinCutPointLines_Entry {
    x_Offset_From_PrevLine_Position_OR_MiddleCharacter: number
    y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: number
    lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: number
}

/**
 * All are offsets.  Negative if next value is smaller (Except for 'x_Offset...')
 */
const _positionTooltip_TrypsinCutPointLines_EachSide_Formatting: Array<INTERNAL__PositionTooltip_TrypsinCutPointLines_Entry> =[
    {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 11,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: 2,  //  Positive to put the starting bottom end of line below the character baseline
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: 20
    }, {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 16,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -2,  //  Rest Negative to move the bottom end of the line up
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -5
    }, {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 14,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -1,
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -2
    }, {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 14,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -2,
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -2
    }, {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 13,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -1,
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -1
    }, {
        x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 13,
        y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -0,
        lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -1
    }
] as const

///   END Structure Tooltip Component

///////////////////


///////////////////

// /**
//  *
//  * @param residueIds
//  * @param chainId
//  * @param useLabel
//  */
// const _molstar__ResidueSetExpression = function (
//     {
//         residueIds, chainId
//         // , useLabel
//     }: {
//         residueIds: number[],
//         chainId: string | null,
//         // useLabel: boolean,
//     }
// ): Expression {
//
//     const seqIdProp = MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id();
//
//     // const seqIdProp = useLabel
//     //     ? MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id()
//     //     : MolScriptBuilder.struct.atomProperty.macromolecular.auth_seq_id();
//
//     const params: Record<string, Expression> = {
//         'residue-test': MolScriptBuilder.core.set.has( [
//             MolScriptBuilder.core.type.set( residueIds ),
//             seqIdProp,
//         ] ),
//     };
//     if ( chainId ) {
//         params[ 'chain-test' ] = MolScriptBuilder.core.rel.eq( [
//             MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(),
//             chainId,
//         ] );
//     }
//     return MolScriptBuilder.struct.generator.atomGroups( params );
// }

/**
 *
 * @param chainId
 */
const _molstar__PolymerExpression = function ( chainId: string | null ): Expression {
    const params: Record<string, Expression> = {
        'entity-test': MolScriptBuilder.core.rel.eq( [
            MolScriptBuilder.struct.atomProperty.macromolecular.entityType(),
            'polymer',
        ] ),
    };
    if ( chainId ) {
        params[ 'chain-test' ] = MolScriptBuilder.core.rel.eq( [
            MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id(),
            chainId,
        ] );
    }
    return MolScriptBuilder.struct.generator.atomGroups( params );
}

// /**
//  *
//  * @param target
//  * @param by
//  */
// const _molstar__ExceptByExpression = function (
//     target: Expression,
//     by: Expression
// ): Expression {
//     return MolScriptBuilder.struct.modifier.exceptBy( { 0: target, by } );
// }

//////////////////////////

/**
 * SPECIAL NOTE:
 *
 * Duplicated in file Protein_Structure_WidgetDisplay__StructureFile_MapNewStructure_Overlay_Component.tsx  protein_Structure_WidgetDisplay__Main_Component.tsx
 *
 *
 * Molstar processing:
 *
 * Lists all unique chain IDs (label_asym_id) in the single structure.
 *
 * @returns Chain Data Parsed, SequenceInChain_Map_Key_LimelightAssigned_ChainId
 */
const _molstar_ListChains_SingleStructure_Returns__ChainData_Parsed__SequenceInChain_Map_Key_LimelightAssigned_ChainId = function ( structure: Structure ) {

    /**
     * Used to prevent duplicate additions to the array.  First entry with label_asym_id is added to result array 'structureFile_Contents__ChainsData_Entry_Array'.
     */
    const chainId_From_label_asym_id__Set: Set<string> = new Set();

    const result__structureFile_Contents__ChainsData_Entry_Array: Array<CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry> = []

    const sequenceInChain_Map_Key_LimelightAssigned_ChainId: Map<number, string> = new Map()

    const location = StructureElement.Location.create( structure );

    /**
     * Limelight Assigned sequence number.  Incremented before used so starts at 1
     */
    let limelightAssigned_ChainId = 0

    // 2. Iterate through units in the structure
    for ( const unit of structure.units ) {

        // Focus on atomic units (proteins, nucleic acids, etc.)
        if ( unit.kind === Molstar_Unit_Kind_Atomic ) {

            location.unit = unit;
            // Get the first element of the unit to identify the chain
            location.element = unit.elements[ 0 ];

            // 3. Extract the chain ID (label_asym_id is the standard mmCIF ID)
            const chainId__From__label_asym_id = StructureProperties.chain.label_asym_id( location );

            // 'auth_asym_id':  mmCIF new version of ChainId that allows longer text.  Other documentation is this is the Author assigned value.
            const chain_authAsymId = StructureProperties.chain.auth_asym_id( location );
            // console.log( "chain.auth_asym_id: '" + chain_authAsymId + "', chainId__From__label_asym_id: " + chainId__From__label_asym_id )

            const entityKey = StructureProperties.entity.key( location );

            const structureSequence_Entity = structure.model.sequence.byEntityKey[ entityKey ];

            if ( ! structureSequence_Entity ) {

                // const msg = "Chain " + chainId__From__label_asym_id + " does NOT have a sequence. structure.model.sequence.byEntityKey[ entityKey ]; returned nothing for entityKey: " + entityKey
                //
                // console.warn( msg )

                continue  // EARLY CONTINUE

            } else {

                // const msg = "Chain " + chainId__From__label_asym_id + " does have a sequence. structure.model.sequence.byEntityKey[ entityKey ]; returned data for entityKey: " + entityKey
                //
                // console.log( msg )

            }

            {
                if ( chainId_From_label_asym_id__Set.has( chainId__From__label_asym_id ) ) {
                    //  Already saved this chain id so skip

                    continue // EARLY CONTINUE
                }

                chainId_From_label_asym_id__Set.add( chainId__From__label_asym_id )  // store as having been stored
            }

            limelightAssigned_ChainId++  // Increment - First used is value 1. Initialized to zero.

            const structureFile_Contents__ChainsData_Entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents__ChainsData_Entry = {
                limelightAssigned_ChainId,
                chainId_Label_AssignedAt_StructureFileCreation: chainId__From__label_asym_id,
                chainId_AuthorId_AssignedAt_StructureFileCreation: chain_authAsymId
            }

            result__structureFile_Contents__ChainsData_Entry_Array.push( structureFile_Contents__ChainsData_Entry )

            const label_ToArray = Array.from( structureSequence_Entity.sequence.label.toArray() )

            const label_String = label_ToArray.join( "" )

            sequenceInChain_Map_Key_LimelightAssigned_ChainId.set( limelightAssigned_ChainId, label_String )

            // const model = structure.model
            //
            // const model_entities_data_details = model.entities.data.details.value( entityKey )

        }
    }

    return { result__structureFile_Contents__ChainsData_Entry_Array, sequenceInChain_Map_Key_LimelightAssigned_ChainId }
}


/////////////////////////////////////////

//  Compute MainData for the components in this file for display.  Computed whenever the incoming data changes

/**
 *
 */
const _compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root = function (
    {
        anyFilter__HasFilterValue,

        add_open_modifications_unlocalized_in_all_peptide_positions,
        show_only_modifications_filtered_on__excluding_static,

        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox,
        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount,

        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        modificationMass_UserSelections_StateObject,
        proteinSequence_Length,
        projectSearchIds,
        proteinSequenceVersionId,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        dataPageStateManager,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }: {
        anyFilter__HasFilterValue: boolean

        add_open_modifications_unlocalized_in_all_peptide_positions: boolean

        show_only_modifications_filtered_on__excluding_static: boolean

        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: boolean
        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: number

        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

        proteinSequence_Length: number

        projectSearchIds: Array<number>
        proteinSequenceVersionId: number

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        dataPageStateManager: DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
): {
    data: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root
    promise: Promise<INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root>
} {

    const proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()
    const numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map()
    const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder> = new Map()
    const openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder> = new Map()
    const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const common_Flags_SingleSearch_ForProjectSearchId = dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
        if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn( msg )
            throw Error( msg )
        }

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn( msg )
            throw Error( msg )
        }

        {
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( ( resolve, reject ) => {
                    try {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch( reason => {
                            reject( reason )
                        } )
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then( value => {
                            try {
                                proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                                resolve();
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result NO data or promise")
            }
        }
        {
            const get_numPsmsForReportedPeptideIdMap_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().
                get_numPsmsForReportedPeptideIdMap()

            if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {
                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.
                set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap )
            } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => { reject(reason) })
                    get_numPsmsForReportedPeptideIdMap_Result.promise.then(value => { try {
                        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.
                        set( projectSearchId, value.numPsmsForReportedPeptideIdMap )
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_numPsmsForReportedPeptideIdMap_Result NO data or promise")
            }
        }
        {
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                set( projectSearchId, get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => { try {
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                        set( projectSearchId, value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result NO data or promise")
            }
        }
        if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {

            {
                const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch()

                if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                    set( projectSearchId, get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder )
                } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => { try {
                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                            set( projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result NO data or promise")
                }
            }
            {
                const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                    set( projectSearchId, get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                            set( projectSearchId, value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result NO data or promise")
                }
            }
        }
    }

    if ( promises.length === 0 ) {

        return { promise: undefined, data: _compute_INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root__After_LoadData({
                anyFilter__HasFilterValue,
                add_open_modifications_unlocalized_in_all_peptide_positions,
                show_only_modifications_filtered_on__excluding_static,
                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox,
                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount,
                modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                proteinSequence_Length,
                projectSearchIds,
                proteinSequenceVersionId,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
            })}
    }

    const promisesAll = Promise.all( promises )

    return {
        data: undefined,
        promise: new Promise<INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root>( (resolve, reject) => { try {

            promisesAll.catch( reason => reject(reason) )
            promisesAll.then(novalue => { try {

                const result = _compute_INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root__After_LoadData({
                    anyFilter__HasFilterValue,
                    add_open_modifications_unlocalized_in_all_peptide_positions,
                    show_only_modifications_filtered_on__excluding_static,
                    scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox,
                    scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount,
                    modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    proteinSequence_Length,
                    projectSearchIds,
                    proteinSequenceVersionId,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })

                resolve( result )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}


/**
 *
 */
const _compute_INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root__After_LoadData = function (
    {
        anyFilter__HasFilterValue,

        add_open_modifications_unlocalized_in_all_peptide_positions,
        show_only_modifications_filtered_on__excluding_static,

        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox,
        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount,

        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        proteinSequence_Length,
        projectSearchIds,
        proteinSequenceVersionId,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        anyFilter__HasFilterValue: boolean

        add_open_modifications_unlocalized_in_all_peptide_positions: boolean

        show_only_modifications_filtered_on__excluding_static: boolean

        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: boolean
        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: number

        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        proteinSequence_Length: number
        projectSearchIds : Array<number>
        proteinSequenceVersionId : number

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder>
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder>
    }
) : INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root {

    const psmCount__Passes_ALL_Filters__At_ProteinPosition_Map_Key_ProteinPosition: Map<number, number> = new Map()
    const psmCount__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition_Map_Key_ProteinPosition: Map<number, number> = new Map()

    /**
     * Inline Function used below in this function
     * @param proteinCoverage_Entry
     */
    const inlineFunction_Generate_MapKey_String__PeptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String = ( proteinCoverage_Entry: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry ) => {

        const PROTEIN_START_END_SEPARATOR_STRING_FOR_MAP_KEY = ":" // ONLY for Internal use to generate Map Key string

        const protein_Start_End_Positions_As_DelimitedString_For_MapKey = proteinCoverage_Entry.proteinStartPosition.toString() + PROTEIN_START_END_SEPARATOR_STRING_FOR_MAP_KEY + proteinCoverage_Entry.proteinEndPosition.toString()

        return protein_Start_End_Positions_As_DelimitedString_For_MapKey
    }

    const modifications_Map_Key_ProteinPosition: Map<number, INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry> = new Map()

    const peptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String: Map<string, INTERNAL__PeptidePositions_SingleEntry_InRow> = new Map()

    for ( const projectSearchId of projectSearchIds ) {

        //  Use 'reportedPeptideId_Set__' so NOT count PSM count for Reported Peptide Id more than once
        const reportedPeptideId_Set__Passes_ALL_Filters__Map_Key_ProteinPosition: Map<number, Set<number>> = new Map()
        const reportedPeptideId_Set__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition__Map_Key_ProteinPosition: Map<number, Set<number>> = new Map()

        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder ) {
            const msg = "proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn( msg )
            throw Error( msg )
        }

        const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! numPsmsForReportedPeptideIdMap ) {
            const msg = "numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn( msg )
            throw Error( msg )
        }

        const proteinCoverage_Entries_For_ProteinSequenceVersionId = proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_proteinCoverage_Entries_For_ProteinSequenceVersionId( proteinSequenceVersionId )
        if ( ! proteinCoverage_Entries_For_ProteinSequenceVersionId ) {
            //  No data for proteinSequenceVersionId so skip
            continue // EARLY CONTINUE
        }

        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

        const openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
        const psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

        const reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )

        for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ProteinSequenceVersionId ) {

            let proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = false

            let reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = undefined

            if ( reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {

                reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds = reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_EntryFor_reportedPeptideId( proteinCoverage_Entry.reportedPeptideId )
            }

            if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds ) {

                //  YES in current filtered reportedPeptideIds

                //  proteinCoverage_Entry.reportedPeptideId YES in current filtered reportedPeptideIds

                proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = true
            }

            let anyFilters_ON_Variable_Or_Open_Modification_Masses = false
            {
                if ( modificationMass_UserSelections_StateObject.get_VariableModificationSelections()?.is_Any_Modification_Selected()
                    || modificationMass_UserSelections_StateObject.get_OpenModificationSelections()?.is_Any_Modification_Selected() ) {

                    anyFilters_ON_Variable_Or_Open_Modification_Masses = true
                }
            }

            if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder ) {

                //  Process reported Peptide Level Variable Mods

                const variable_Dynamic_ModificationsOnReportedPeptide =
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( proteinCoverage_Entry.reportedPeptideId )

                if ( variable_Dynamic_ModificationsOnReportedPeptide ) {

                    for ( const variable_Dynamic_ModificationsOnReportedPeptide_Entry of variable_Dynamic_ModificationsOnReportedPeptide ) {

                        const modMass_RoundedTo_VariableModMassValue = modificationMass_CommonRounding_ReturnNumber( variable_Dynamic_ModificationsOnReportedPeptide_Entry.mass )  // Call external function

                        if ( show_only_modifications_filtered_on__excluding_static
                            && anyFilters_ON_Variable_Or_Open_Modification_Masses ) {

                            if ( ! modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Modification_Selected( modMass_RoundedTo_VariableModMassValue ) ) {

                                //  Variable Modification Mass is NOT filtered on so SKIP

                                continue  // EARLY CONTINUE
                            }
                        }

                        const position_InPeptide = variable_Dynamic_ModificationsOnReportedPeptide_Entry.position

                        const position_InProtein = proteinCoverage_Entry.proteinStartPosition + position_InPeptide - 1

                        const mass = modMass_RoundedTo_VariableModMassValue

                        let modifications_Entry_At_ProteinPosition = modifications_Map_Key_ProteinPosition.get( position_InProtein )
                        if ( ! modifications_Entry_At_ProteinPosition ) {
                            modifications_Entry_At_ProteinPosition = new INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry()
                            modifications_Map_Key_ProteinPosition.set( position_InProtein, modifications_Entry_At_ProteinPosition )
                        }

                        modifications_Entry_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.add( mass )

                        if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds ) {

                            modifications_Entry_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.add( mass )
                        }
                    }
                }
            }

            if ( openModifications_On_PSM_For_MainFilters_Holder ) {

                //  Process PSM Level Open Mods

                const psmOpenModificationMassPerPSM_ForPsmIdMap = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( proteinCoverage_Entry.reportedPeptideId )

                if ( psmOpenModificationMassPerPSM_ForPsmIdMap ) {

                    // Have Open Mods for PSMs under reportedPeptideId

                    const psm_IDs_For_ReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( proteinCoverage_Entry.reportedPeptideId )
                    if ( ! numPsmsForReportedPeptideIdMap ) {
                        const msg = "numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                        console.warn( msg )
                        throw Error( msg )
                    }

                    //  Process ALL PSM Ids for Reported Peptide Id

                    for ( const psmId of psm_IDs_For_ReportedPeptideId ) {

                        const psmOpenModificationMass_Entry_For_PSM =
                            psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId )

                        if ( ! psmOpenModificationMass_Entry_For_PSM ) {
                            //  NO Open Mods for PsmId so SKIP
                            continue  // EARLY CONTINUE
                        }

                        if ( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded === 0
                            && modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                            //   Open Mod Mass rounds to ZERO  AND  Treat Zero as unmodified selected so SKIP

                            continue  // EARLY CONTINUE
                        }

                        if ( show_only_modifications_filtered_on__excluding_static
                            && anyFilters_ON_Variable_Or_Open_Modification_Masses ) {

                            if ( ! modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Modification_Selected( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded ) ) {

                                //  Open Modification Mass is NOT filtered on so SKIP

                                continue  // EARLY CONTINUE
                            }
                        }

                        let psmId_IN_FilteredData = false

                        if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds ) {

                            if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.psmEntries_Include_Map_Key_PsmId ) {

                                const psmEntry = reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.psmEntries_Include_Map_Key_PsmId.get( psmId )

                                if ( psmEntry ) {

                                    psmId_IN_FilteredData = true
                                }
                            } else {

                                psmId_IN_FilteredData = true
                            }
                        }

                        if ( psmOpenModificationMass_Entry_For_PSM.positionsMap_KeyPosition ) {

                            //  YES Position for Open Mod for PsmId

                            for ( const position_Entries_MapValue of psmOpenModificationMass_Entry_For_PSM.positionsMap_KeyPosition.values() ) {

                                for ( const position_Entry of position_Entries_MapValue ) {

                                    const position_InPeptide = position_Entry.position

                                    const position_InProtein = proteinCoverage_Entry.proteinStartPosition + position_InPeptide - 1

                                    let modifications_Entry_At_ProteinPosition = modifications_Map_Key_ProteinPosition.get( position_InProtein )
                                    if ( ! modifications_Entry_At_ProteinPosition ) {
                                        modifications_Entry_At_ProteinPosition = new INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry()
                                        modifications_Map_Key_ProteinPosition.set( position_InProtein, modifications_Entry_At_ProteinPosition )
                                    }

                                    modifications_Entry_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber.add( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded )

                                    if ( psmId_IN_FilteredData ) {

                                        modifications_Entry_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber.add( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded )
                                    }
                                }
                            }
                        } else {

                            //  NO Position for Open Mod for PsmId

                            if ( add_open_modifications_unlocalized_in_all_peptide_positions ) {

                                //  User selected add_open_modifications_unlocalized_in_all_peptide_positions SO show open mod mass rounded at ALL positions for Peptide in Protein

                                for ( let position_InProtein = proteinCoverage_Entry.proteinStartPosition; position_InProtein <= proteinCoverage_Entry.proteinEndPosition; position_InProtein++ ) {

                                    let modifications_Entry_At_ProteinPosition = modifications_Map_Key_ProteinPosition.get( position_InProtein )
                                    if ( ! modifications_Entry_At_ProteinPosition ) {
                                        modifications_Entry_At_ProteinPosition = new INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry()
                                        modifications_Map_Key_ProteinPosition.set( position_InProtein, modifications_Entry_At_ProteinPosition )
                                    }

                                    modifications_Entry_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber.add( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded )

                                    if ( psmId_IN_FilteredData ) {

                                        modifications_Entry_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber.add( psmOpenModificationMass_Entry_For_PSM.openModificationMass_Rounded )
                                    }
                                }
                            }
                        }
                    }
                }
            }


            const protein_Start_End_Positions_As_DelimitedString_For_MapKey = inlineFunction_Generate_MapKey_String__PeptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String( proteinCoverage_Entry )

            let peptidePositions_SingleEntry_FromMap = peptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String.get( protein_Start_End_Positions_As_DelimitedString_For_MapKey )
            if ( ! peptidePositions_SingleEntry_FromMap ) {

                peptidePositions_SingleEntry_FromMap = new INTERNAL__PeptidePositions_SingleEntry_InRow({
                    start_Position: proteinCoverage_Entry.proteinStartPosition,
                    end_Position: proteinCoverage_Entry.proteinEndPosition,
                    peptideLength: proteinCoverage_Entry.proteinEndPosition - proteinCoverage_Entry.proteinStartPosition + 1,  // ' + 1 ' since End Position is last position of peptide NOT position after last position of peptide like many things 'end' function like substring
                    proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId
                })

                peptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String.set( protein_Start_End_Positions_As_DelimitedString_For_MapKey, peptidePositions_SingleEntry_FromMap )
            }

            {  //  Add to 'All Data' for Peptides

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( proteinCoverage_Entry.reportedPeptideId )
                if ( numPsmsForReportedPeptideId === undefined ) {
                    const msg = "numPsmsForReportedPeptideIdMap.get( proteinCoverage_Entry.reportedPeptideId ) returned undefined for proteinCoverage_Entry.reportedPeptideId: " + proteinCoverage_Entry.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( numPsmsForReportedPeptideId ) {

                    let psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId = peptidePositions_SingleEntry_FromMap.all_Data__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( ! psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId ) {
                        psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId = new Map()
                        peptidePositions_SingleEntry_FromMap.all_Data__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId )
                    }

                    if ( ! psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId.has( proteinCoverage_Entry.reportedPeptideId ) ) {
                        //   ONLY add if not already in map
                        psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId.set( proteinCoverage_Entry.reportedPeptideId, numPsmsForReportedPeptideId )
                    }
                }
            }

            if ( proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {

                peptidePositions_SingleEntry_FromMap.proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = true
            }

            if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds ) {

                //  Add to 'Passes ALL Filters'

                if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.psmIds_Include ) {

                    let psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId = peptidePositions_SingleEntry_FromMap.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmIds_Set_Map_ReportedPeptideId__Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( ! psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId ) {
                        psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId = new Map()
                        peptidePositions_SingleEntry_FromMap.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmIds_Set_Map_ReportedPeptideId__Map_Key_ProjectSearchId.set( projectSearchId, psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId )
                    }

                    let psmIds_ThatPasses_ALL_Filters_Set = psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId.get( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId )
                    if ( ! psmIds_ThatPasses_ALL_Filters_Set ) {
                        psmIds_ThatPasses_ALL_Filters_Set = new Set()
                        psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId.set( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId, psmIds_ThatPasses_ALL_Filters_Set )
                    }

                    for ( const psmId of reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.psmIds_Include ) {
                        psmIds_ThatPasses_ALL_Filters_Set.add( psmId )
                    }

                } else {

                    const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId )
                    if ( numPsmsForReportedPeptideId === undefined ) {
                        const msg = "numPsmsForReportedPeptideIdMap.get( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId ) returned undefined for reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId: " + reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    let psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId =
                        peptidePositions_SingleEntry_FromMap.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId )
                    if ( ! psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId ) {
                        psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId = new Map()
                        peptidePositions_SingleEntry_FromMap.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.set( projectSearchId, psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId )
                    }

                    if ( ! psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId.has( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId ) ) {
                        //   ONLY add if not already in map
                        psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId.set( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds.reportedPeptideId, numPsmsForReportedPeptideId )
                    }
                }
            }

            for ( let proteinPosition = proteinCoverage_Entry.proteinStartPosition; proteinPosition <= proteinCoverage_Entry.proteinEndPosition; proteinPosition++ ) {

                let reportedPeptideId_Set = reportedPeptideId_Set__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition__Map_Key_ProteinPosition.get( proteinPosition )
                if ( ! reportedPeptideId_Set ) {
                    reportedPeptideId_Set = new Set()
                    reportedPeptideId_Set__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition__Map_Key_ProteinPosition.set( proteinPosition, reportedPeptideId_Set )
                }
                reportedPeptideId_Set.add( proteinCoverage_Entry.reportedPeptideId )
            }

            if ( proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {

                for ( let proteinPosition = proteinCoverage_Entry.proteinStartPosition; proteinPosition <= proteinCoverage_Entry.proteinEndPosition; proteinPosition++ ) {

                    let reportedPeptideId_Set = reportedPeptideId_Set__Passes_ALL_Filters__Map_Key_ProteinPosition.get( proteinPosition )
                    if ( ! reportedPeptideId_Set ) {
                        reportedPeptideId_Set = new Set()
                        reportedPeptideId_Set__Passes_ALL_Filters__Map_Key_ProteinPosition.set( proteinPosition, reportedPeptideId_Set )
                    }
                    reportedPeptideId_Set.add( proteinCoverage_Entry.reportedPeptideId )
                }

            }
        }

        //  Process local Maps and update outer loop Maps

        //  reportedPeptideId_Set for Pass All filters

        for ( const mapEntry of reportedPeptideId_Set__Passes_ALL_Filters__Map_Key_ProteinPosition.entries() ) {

            const proteinPosition = mapEntry[ 0 ]
            const reportedPeptideId_Set = mapEntry[ 1 ]

            let psmCount_Total_ForProteinPosition = 0

            for ( const reportedPeptideId of reportedPeptideId_Set ) {
                const reportedPeptideIds_AndTheir_PSM_IDs_ENTRY = reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
                psmCount_Total_ForProteinPosition += reportedPeptideIds_AndTheir_PSM_IDs_ENTRY.psmCount_after_Include
            }

            let psmCount__Passes_ALL_Filters__At_ProteinPosition_InMap = psmCount__Passes_ALL_Filters__At_ProteinPosition_Map_Key_ProteinPosition.get( proteinPosition )
            if ( ! psmCount__Passes_ALL_Filters__At_ProteinPosition_InMap ) {
                psmCount__Passes_ALL_Filters__At_ProteinPosition_InMap = 0
            }
            const psmCount__Passes_ALL_Filters__At_ProteinPosition_New = psmCount__Passes_ALL_Filters__At_ProteinPosition_InMap + psmCount_Total_ForProteinPosition
            psmCount__Passes_ALL_Filters__At_ProteinPosition_Map_Key_ProteinPosition.set( proteinPosition, psmCount__Passes_ALL_Filters__At_ProteinPosition_New )
        }

        //  reportedPeptideId_Set for PSM_ReportedPeptide_Etc_Filters

        for ( const mapEntry of reportedPeptideId_Set__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition__Map_Key_ProteinPosition.entries() ) {
            const proteinPosition = mapEntry[ 0 ]
            const reportedPeptideId_Set = mapEntry[ 1 ]

            let psmCount_Total_ForProteinPosition = 0

            for ( const reportedPeptideId of reportedPeptideId_Set ) {
                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId )
                psmCount_Total_ForProteinPosition += numPsmsForReportedPeptideId
            }

            let psmCount__Passes_ONLY_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition = psmCount__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition_Map_Key_ProteinPosition.get( proteinPosition )
            if ( ! psmCount__Passes_ONLY_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition ) {
                psmCount__Passes_ONLY_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition = 0
            }
            const psmCount__At_ProteinPosition_New = psmCount__Passes_ONLY_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition + psmCount_Total_ForProteinPosition
            psmCount__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition_Map_Key_ProteinPosition.set( proteinPosition, psmCount__At_ProteinPosition_New )
        }
    }

    const peptidePositions_SingleEntry_AllUnique_Start_End_Array = Array.from( peptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String.values() )

    {  //  Compute psmCount_ThatPasses_ALL_Filters_FinalResult

        for ( const peptidePositions_SingleEntry of peptidePositions_SingleEntry_AllUnique_Start_End_Array ) {

            {
                let psmCount_Total = 0

                for ( const psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId of
                    peptidePositions_SingleEntry.all_Data__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.values() ) {

                    for ( const psmCount_For_ReportedPeptideIds_WithoutPsmIds of psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId.values() ) {

                        psmCount_Total += psmCount_For_ReportedPeptideIds_WithoutPsmIds
                    }
                }

                peptidePositions_SingleEntry.all_Data__PsmIds_PsmCount.psmCount__FinalResult = psmCount_Total
            }

            {
                let psmCount_ThatPasses_ALL_Filters_FinalResult = 0

                for ( const psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId of
                    peptidePositions_SingleEntry.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.values() ) {

                    for ( const psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters of psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId.values() ) {

                        psmCount_ThatPasses_ALL_Filters_FinalResult += psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters
                    }
                }

                for ( const mapEntry_Key_ProjectSearchId of peptidePositions_SingleEntry.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmIds_Set_Map_ReportedPeptideId__Map_Key_ProjectSearchId.entries() ) {

                    const projectSearchId_MapKey = mapEntry_Key_ProjectSearchId[ 0 ]
                    const psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId = mapEntry_Key_ProjectSearchId[ 1 ]

                    const psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId =
                        peptidePositions_SingleEntry.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId.get( projectSearchId_MapKey )

                    for ( const mapEntry_Key_ReportedPeptideId of psmIds_ThatPasses_ALL_Filters_Set_Map_ReportedPeptideId.entries() ) {

                        const reportedPeptideId_MapKey = mapEntry_Key_ReportedPeptideId[ 0 ]
                        const psmIds_ThatPasses_ALL_Filters_Set = mapEntry_Key_ReportedPeptideId[ 1 ]

                        if ( psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId ) {

                            const psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters = psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters_Map_ReportedPeptideId.get( reportedPeptideId_MapKey )
                            if ( psmCount_For_ReportedPeptideIds_WithoutPsmIds_ThatPasses_ALL_Filters ) {

                                //  Already processed PSM Count for whole reportedPeptideId_MapKey so SKIP
                                continue  // EARLY CONTINUE
                            }
                        }

                        psmCount_ThatPasses_ALL_Filters_FinalResult += psmIds_ThatPasses_ALL_Filters_Set.size
                    }
                }

                peptidePositions_SingleEntry.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount__FinalResult = psmCount_ThatPasses_ALL_Filters_FinalResult
            }
        }
    }




    peptidePositions_SingleEntry_AllUnique_Start_End_Array.sort( ( a, b ) => {

        //  Sort on length descending
        if ( a.peptideLength > b.peptideLength ) {
            return -1
        }
        if ( a.peptideLength < b.peptideLength ) {
            return 1
        }

        //  Sort on start then end ascending
        if ( a.start_Position < b.start_Position ) {
            return -1
        }
        if ( a.start_Position > b.start_Position ) {
            return 1
        }
        if ( a.end_Position < b.end_Position ) {
            return -1
        }
        if ( a.end_Position > b.end_Position ) {
            return 1
        }
        return 0
    } )

    //  Put in result rows

    const peptidePositions_SingleRow_Array: Array<INTERNAL__PeptidePositions_SingleRow> = []

    for ( const peptidePositions_SingleEntry of peptidePositions_SingleEntry_AllUnique_Start_End_Array ) {

        let addedToExistingRow = false

        for ( const peptidePositions_SingleRow of peptidePositions_SingleRow_Array ) {

            let foundOverlap_With_ExistingEntriesInRow = false

            for ( const peptidePositions_SingleEntry_InRow of peptidePositions_SingleRow.peptidePositions_SingleEntry_InRow_Array ) {

                //  Changed from 'WAS' since that allowed overlapping peptides on same row.  Overlapping by 1 position.
                // WAS if ( ! ( peptidePositions_SingleEntry.end_Position <= peptidePositions_SingleEntry_InRow.start_Position || peptidePositions_SingleEntry.start_Position >= peptidePositions_SingleEntry_InRow.end_Position ) ) {

                if ( ! ( peptidePositions_SingleEntry.end_Position < peptidePositions_SingleEntry_InRow.start_Position || peptidePositions_SingleEntry.start_Position > peptidePositions_SingleEntry_InRow.end_Position ) ) {

                    foundOverlap_With_ExistingEntriesInRow = true
                }
            }

            if ( ! foundOverlap_With_ExistingEntriesInRow ) {

                peptidePositions_SingleRow.peptidePositions_SingleEntry_InRow_Array.push( peptidePositions_SingleEntry )

                addedToExistingRow = true

                // break loop processing rows to add to

                break  // EARLY BREAK
            }
        }

        if ( ! addedToExistingRow ) {

            //  NOT added to existing rows so add to new row

            const peptidePositions_SingleEntry_InRow_Array: Array<INTERNAL__PeptidePositions_SingleEntry_InRow> = []

            peptidePositions_SingleRow_Array.push( {
                peptidePositions_SingleEntry_InRow_Array
            } )

            peptidePositions_SingleEntry_InRow_Array.push( peptidePositions_SingleEntry )
        }
    }


    for ( const peptidePositions_SingleRow of peptidePositions_SingleRow_Array ) {

        peptidePositions_SingleRow.peptidePositions_SingleEntry_InRow_Array.sort( ( a, b ) => {

            if ( a.start_Position < b.start_Position ) {
                return -1
            }
            if ( a.start_Position > b.start_Position ) {
                return 1
            }
            //  Cannot have same start position in a single row so error
            const msg = "ERROR: peptidePositions_SingleRow.peptidePositions_SingleEntry_InRow_Array.sort: a.start_Position === b.start_Position "
            console.warn( msg )
            throw Error( msg )
        } )
    }


    const proteinSequenceCoverage_Positions_Array_ConvertFromMaps: Array<INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry> = []

    {
        for ( let proteinPosition = 1; proteinPosition <= proteinSequence_Length; proteinPosition++ ) {

            const psmCount__Passes_PSM_ReportedPeptide_Etc_Filters = psmCount__Passes_PSM_ReportedPeptide_Etc_Filters__At_ProteinPosition_Map_Key_ProteinPosition.get( proteinPosition )
            if ( ! psmCount__Passes_PSM_ReportedPeptide_Etc_Filters ) {
                //  NO data for even passes PSM Reported Peptide filters so SKIP
                continue  // EARLY CONTINUE
            }

            const psmCount__Passes_ALL_Filters = psmCount__Passes_ALL_Filters__At_ProteinPosition_Map_Key_ProteinPosition.get( proteinPosition )
            if ( psmCount__Passes_ALL_Filters ) {

                const saveEntry: INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry = {

                    start_Position: proteinPosition,
                    end_Position: proteinPosition,
                    passes_All_Filters: true,
                    psmCount_All: psmCount__Passes_PSM_ReportedPeptide_Etc_Filters,
                    psmCount_PassesAllFilters: psmCount__Passes_ALL_Filters,
                    psmCount_PassesAllFilters_Fraction: undefined
                }

                proteinSequenceCoverage_Positions_Array_ConvertFromMaps.push( saveEntry )

            } else {

                const saveEntry: INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry = {

                    start_Position: proteinPosition,
                    end_Position: proteinPosition,
                    passes_All_Filters: false,

                    psmCount_All: psmCount__Passes_PSM_ReportedPeptide_Etc_Filters,

                    psmCount_PassesAllFilters: undefined,

                    psmCount_PassesAllFilters_Fraction: undefined
                }

                proteinSequenceCoverage_Positions_Array_ConvertFromMaps.push( saveEntry )
            }
        }
    }

    //   Merge adjacent positions with same meets_All_Filters and psmCount

    const proteinSequenceCoverage_Positions_Array_Merged: Array<INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry> = []

    if ( proteinSequenceCoverage_Positions_Array_ConvertFromMaps.length > 0 ) {

        const proteinSequenceCoverage_Positions_Array_ConvertFromMaps_Length = proteinSequenceCoverage_Positions_Array_ConvertFromMaps.length

        //  Init to first entry
        let prevEntry: INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry = proteinSequenceCoverage_Positions_Array_ConvertFromMaps[ 0 ]

        // Start at second entry
        for ( let index = 1; index < proteinSequenceCoverage_Positions_Array_ConvertFromMaps_Length; index++ ) {

            const entry = proteinSequenceCoverage_Positions_Array_ConvertFromMaps[ index ]
            if (
                entry.start_Position === ( prevEntry.end_Position + 1 )
                && entry.passes_All_Filters === prevEntry.passes_All_Filters
                && entry.psmCount_All === prevEntry.psmCount_All
                && entry.psmCount_PassesAllFilters === prevEntry.psmCount_PassesAllFilters ) {

                prevEntry.end_Position = entry.end_Position
            } else {
                proteinSequenceCoverage_Positions_Array_Merged.push( prevEntry )

                prevEntry = entry
            }
        }

        // Insert last entry
        proteinSequenceCoverage_Positions_Array_Merged.push( prevEntry )
    }

    let max_PsmCount__PassesAllFilters = 0

    if ( scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox ) {

        //   Compute PSM Count Fraction and assign to each entry

        for ( const entry of proteinSequenceCoverage_Positions_Array_Merged ) {
            if ( entry.passes_All_Filters ) {
                if ( max_PsmCount__PassesAllFilters < entry.psmCount_PassesAllFilters ) {
                    max_PsmCount__PassesAllFilters = entry.psmCount_PassesAllFilters
                }
            }
        }

        if ( scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount !== _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__NOT_SET ) {

            if ( max_PsmCount__PassesAllFilters > scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount ) {

                max_PsmCount__PassesAllFilters = scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount
            }
        }

        // Assign fraction to Protein Coverage Entries
        for ( const entry of proteinSequenceCoverage_Positions_Array_Merged ) {

            if ( entry.psmCount_PassesAllFilters !== undefined && entry.psmCount_PassesAllFilters !== null ) {
                entry.psmCount_PassesAllFilters_Fraction = entry.psmCount_PassesAllFilters / max_PsmCount__PassesAllFilters
            }

            if ( entry.psmCount_PassesAllFilters_Fraction > 1 ) {
                entry.psmCount_PassesAllFilters_Fraction = 1  // Max of 1
            }
        }

        // Assign fraction to Peptide Entries
        {
            for ( const peptidePositions_SingleRow_Entry of peptidePositions_SingleRow_Array ) {

                for ( const peptidePosition of peptidePositions_SingleRow_Entry.peptidePositions_SingleEntry_InRow_Array ) {


                    if ( peptidePosition.only_Data_Passes_AllFilters__PsmIds_PsmCount ) {

                        peptidePosition.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_FractionOf_Max_ProteinCoverage_PSM_Count =
                            peptidePosition.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount__FinalResult / max_PsmCount__PassesAllFilters
                    }
                }
            }
        }
    }

    const proteinSequenceCoverage_Positions_Map_Key_ProteinPosition: Map<number, INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry> = new Map()

    for ( const proteinSequenceCoverage_Positions_Array_Merged_Entry of proteinSequenceCoverage_Positions_Array_Merged ) {

        for ( let proteinPosition = proteinSequenceCoverage_Positions_Array_Merged_Entry.start_Position; proteinPosition <= proteinSequenceCoverage_Positions_Array_Merged_Entry.end_Position; proteinPosition++ ) {
            proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.set( proteinPosition, proteinSequenceCoverage_Positions_Array_Merged_Entry )
        }
    }

    const peptidePositions_Root: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root = {
        peptidePositions_SingleRow_Array,
        proteinSequenceCoverage_Positions_Array: proteinSequenceCoverage_Positions_Array_Merged,
        proteinSequenceCoverage_Positions_Map_Key_ProteinPosition,
        modifications_Map_Key_ProteinPosition,
        max_PsmCount__PassesAllFilters
    }

    return peptidePositions_Root
}

/**
 *
 */
class INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root {

    proteinSequenceCoverage_Positions_Array: Array<INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry>

    proteinSequenceCoverage_Positions_Map_Key_ProteinPosition: Map<number, INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry>

    modifications_Map_Key_ProteinPosition: Map<number, INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry>

    peptidePositions_SingleRow_Array: Array<INTERNAL__PeptidePositions_SingleRow>

    /**
     * Zero if NOT Scaling on PSM Count
     */
    max_PsmCount__PassesAllFilters : number
}


/**
 *
 */
class INTERNAL__ProteinSequenceCoverage_Positions_And_Info_SingleEntry {


    start_Position: number
    end_Position: number
    passes_All_Filters: boolean
    psmCount_All: number
    psmCount_PassesAllFilters: number
    psmCount_PassesAllFilters_Fraction: number
}


/**
 *
 */
class INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry {

    /**
     *  Passes PSM Reported Peptide etc filters.  Only filtered on the top level PSM Reported Peptide etc filters.
     *
     *  Those that pass "ALL filters" are included here
     */
    readonly modifications_Passes_PSM_Etc_Filters: INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc

    /**
     *  Passes ALL filters
     */
    readonly modifications_Passes_ALL_Filters: INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc

    constructor() {
        this.modifications_Passes_PSM_Etc_Filters = new INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc()
        this.modifications_Passes_ALL_Filters = new INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc()
    }

    private _fakeForceCallContructor() {}
}


/**
 *
 */
class INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc {

    readonly variableModification_Masses_RoundedPer_VariableModMassRoundingRules: Set<number>
    readonly openModifications_Masses_RoundToWholeNumber: Set<number>

    constructor() {
        this.variableModification_Masses_RoundedPer_VariableModMassRoundingRules = new Set()
        this.openModifications_Masses_RoundToWholeNumber = new Set()
    }

    hasAny_Modifications() {

        if ( this.variableModification_Masses_RoundedPer_VariableModMassRoundingRules.size > 0 || this.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

            return true
        }

        return false
    }

    private _fakeForceCallContructor() {}
}

/**
 *
 */
class INTERNAL__PeptidePositions_SingleRow {


    peptidePositions_SingleEntry_InRow_Array: Array<INTERNAL__PeptidePositions_SingleEntry_InRow>
}

/**
 *
 */
class INTERNAL__PeptidePositions_SingleEntry_InRow {


    readonly start_Position: number
    readonly end_Position: number
    readonly peptideLength: number
    proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId: boolean

    readonly all_Data__PsmIds_PsmCount = new INTERNAL__PeptidePositions_SingleEntry_InRow__All_OR_OnlyPasses_AllFilters()
    readonly only_Data_Passes_AllFilters__PsmIds_PsmCount = new INTERNAL__PeptidePositions_SingleEntry_InRow__All_OR_OnlyPasses_AllFilters()

    constructor(
        {
            start_Position, end_Position, peptideLength, proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId
        } : {
            start_Position: number
            end_Position: number
            peptideLength: number
            proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId: boolean
        }
    ) {
        this.start_Position = start_Position
        this.end_Position = end_Position
        this.peptideLength = peptideLength
        this.proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId
    }

    private _fakeForceCallContructor() {}
}

/**
 *
 */
class INTERNAL__PeptidePositions_SingleEntry_InRow__All_OR_OnlyPasses_AllFilters {

    //  Data goes in one of the 2 following for a given ProjectSearchId/ReportedPeptideId

    readonly psmIds_Set_Map_ReportedPeptideId__Map_Key_ProjectSearchId: Map<number, Map<number, Set<number>>> = new Map()
    readonly psmCount_For_ReportedPeptideIds_WithoutPsmIds_Map_ReportedPeptideId_Map_Key_ProjectSearchId: Map<number, Map<number, number>> = new Map()

    psmCount__FinalResult: number = 0
    psmCount_FractionOf_Max_ProteinCoverage_PSM_Count: number = 0

    constructor() {
    }

    private _fakeForceCallContructor() {}
}


/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

//   INTERNAL  classes for holding Structure File data (Root, Structure File Contents, and Protein Alignments) from server and/or upload/created

class INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__ROOT {

    readonly single_StructureFile_Entry__Map_Key_StructureFileId: Map<number, INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_Entry> = new Map()

    get_In_ID_Order() {

        const entries = Array.from( this.single_StructureFile_Entry__Map_Key_StructureFileId.values() )

        entries.sort( (a,b) => {
            if ( a.structureFile_Data_Entry.structureFileId < b.structureFile_Data_Entry.structureFileId ) {
                return -1
            }
            if ( a.structureFile_Data_Entry.structureFileId > b.structureFile_Data_Entry.structureFileId ) {
                return 1
            }
            return 0
        })

        return entries
    }

    private _dummyMethod_TO_ForceUseConstructor() {}
}

class INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_Entry {

    readonly structureFile_Data_Entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value

    // readonly structureFile__FileContents_Entry: INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_FileContents_Entry

    readonly structureFile__ProteinAlignment__CurrentProtein__Map__LimelightAssigned_ChainId: Map<number, INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry> = new Map()

    constructor(
        {
            structureFile_Data_Entry
        } : {
            structureFile_Data_Entry: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_Contents_Entry_Value
        }
    ) {
        this.structureFile_Data_Entry = structureFile_Data_Entry
    }

    private _dummyMethod_TO_ForceUseConstructor() {}
}

// class INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile_FileContents_Entry {
//
//     readonly structureFile__FileContents_String: string
// }

/**
 * Protein Alignments for Structure File for CURRENT Protein
 */
class INTERNAL__StructureFile_Data__FromServer_AND_OR_Uploaded_OR_Created__HOLDER__Single_StructureFile__ProteinAlignment__CurrentProtein__Entry {

    readonly structureFile__ProteinAlignment__CurrentProtein: CommonData_LoadedFromServer_StructureFile_Data_Within_ONE_Project__StructureFile_ProteinSequenceAlignment_Entry_DAO__Single_Entry_Value
}




//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

//  Code to create disks for Trypsin cut points

/**
 *
 * @param structure
 * @param labelAsymId
 * @param labelSeqId
 */
function _getCAPosition( structure: Structure, labelAsymId: string, labelSeqId: number ): Vec3 | null {

    const hierarchy = structure.model.atomicHierarchy;
    const conformation = structure.model.atomicConformation;
    const chains = hierarchy.chains;

    for ( let chainIndex = 0; chainIndex < chains.label_asym_id.rowCount; chainIndex++ ) {

        const chain_label_asym_id = chains.label_asym_id.value( chainIndex )
        const chain_auth_asym_id = chains.auth_asym_id.value( chainIndex )

        if ( chain_label_asym_id !== labelAsymId )
            continue;

        const entityId = chains.label_entity_id.value( chainIndex );
        const residueIndex = hierarchy.index.findResidueLabel( {
            label_entity_id: entityId,
            label_asym_id: labelAsymId,
            label_seq_id: labelSeqId,
            pdbx_PDB_ins_code: '',
        } );
        if ( residueIndex < 0 )
            continue;

        const atomIndex = hierarchy.index.findAtomOnResidue( residueIndex, 'CA' );
        if ( atomIndex < 0 )
            continue;

        return Vec3.create(
            conformation.x[ atomIndex ],
            conformation.y[ atomIndex ],
            conformation.z[ atomIndex ]
        );
    }
    return null;
}

/**
 *
 */
interface INTERNAL__Molstar_DiskData {
    label: string;
    centerX: number;
    centerY: number;
    centerZ: number;
    normalX: number;
    normalY: number;
    normalZ: number;
    radius: number;
    color: Molstar_Color // Color

    //   Data stored for tooltip

    limelight_Only_HTML_TooltipContent: string
    limelight_Only_ChainId: string

    limelight_Only_Residue_A_Position_LimelightProtein: number
    limelight_Only_Residue_B_Position_LimelightProtein: number
}

/**
 *
 */
const INTERNAL__Molstar_ResidueDisks3D = PluginStateTransform.BuiltIn({
    name: 'residue-disks-3d',
    display: _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME,
    from: SO.Root,
    to: SO.Shape.Provider,
    params: {
        disks: PD.Value<INTERNAL__Molstar_DiskData[]>([]),
    },
})({
    canAutoUpdate() {
        return true;
    },
    apply({ params }) {
        return Task.create(_TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME, async () => {
            return new SO.Shape.Provider(
                {
                    label: _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME,
                    data: params.disks,
                    params: Mesh.Params,
                    getShape: (_ctx, data) => _INTERNAL__Molstar_buildDisksShape(data),
                    geometryUtils: Mesh.Utils,
                },
                { label: _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME }
            );
        });
    },
    update() {
        return StateTransformer.UpdateResult.Recreate;
    },
});

/**
 *
 * @param disks
 */
function _INTERNAL__Molstar_buildDisksShape(disks: INTERNAL__Molstar_DiskData[]): Shape<Mesh> {
    const state = MeshBuilder.createState(4096, 1024);
    const yAxis = Vec3.create(0, 1, 0);

    disks.forEach((disk, groupIndex) => {
        const normal = Vec3.create(disk.normalX, disk.normalY, disk.normalZ);
        Vec3.normalize(normal, normal);

        let rotMat: Mat4;

        // If normal is already Y-axis (or anti-parallel), handle carefully
        const dot = Vec3.dot(yAxis, normal);
        if (Math.abs(dot + 1) < 1e-6) {
            // Anti-parallel: rotate 180 degrees around X
            rotMat = Mat4.fromRotation(Mat4.zero(), Math.PI, Vec3.create(1, 0, 0));
        } else {
            const q = Quat.rotationTo(Quat.zero(), yAxis, normal);
            rotMat = Mat4.fromQuat(Mat4.zero(), q);
        }

        const center = Vec3.create(disk.centerX, disk.centerY, disk.centerZ);
        Mat4.setTranslation(rotMat, center);

        const circle = Circle({ radius: disk.radius, segments: 64 });
        state.currentGroup = groupIndex;

        MeshBuilder.addPrimitive(state, rotMat, circle);
        MeshBuilder.addPrimitiveFlipped(state, rotMat, circle);  // Add flipped to be visible from other side
    });

    const mesh = MeshBuilder.getMesh(state);

    return Shape.create(
        _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__NAME,
        disks,
        mesh,
        ( groupId ) => Molstar_Color( disks[ groupId ]?.color ?? _TRYPSIN_CUT_POINT_DISKS__DEFAULT_COLOR ),
        ( _groupId ) => _TRYPSIN_CUT_POINT_DISKS__FOR_Shape_create__SIZE,
        ( groupId ) => disks[ groupId ]?.label ?? '',
        [ Mat4.identity() ],
        disks.length
    );
}

/////////////////////////////////
/////////////////////////////////

/**
 *    Convert standard color hex string ( 6 hex characters with leading '#' ) to Molstar Color
 */
const _color__SixHex_WithLeading_Hash__TO__MolstarColor = function ( color__SixHex_WithLeading_Hash: string ) {

    if ( color__SixHex_WithLeading_Hash.substring( 0, 1 ) !== "#" ) {
        const msg = "_color__SixHex_WithLeading_Hash__TO__MolstarColor:: color__SixHex_WithLeading_Hash does NOT start with '#'. is: " + color__SixHex_WithLeading_Hash
        console.warn( msg )
        throw Error( msg )
    }

    const color_WithoutHash = color__SixHex_WithLeading_Hash.substring( 1 )

    if ( color_WithoutHash.length !== 6 ) {
        const msg = "_color__SixHex_WithLeading_Hash__TO__MolstarColor:: ( color_WithoutHash.length !== 6 )  color_Selecolor_WithoutHashction_WithoutHash: " + color_WithoutHash
        console.warn( msg )
        throw Error( msg )
    }

    const color_Formatted_For_Molstar = _LIMELIGHT_COLORS_FORMATTED_FOR_MOLSTAR__HEX_COLOR_STRING_PREFIX + color_WithoutHash

    const color_For_Molstar = Molstar_Color.fromHexString( color_Formatted_For_Molstar )

    return color_For_Molstar
}

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

///////    Section of calls to Molstar Static Methods



//  Have Calls to:

//  MolScriptBuilder
//      MolScriptBuilder.struct.generator.atomGroups(...)
//      MolScriptBuilder.struct.atomProperty.macromolecular.auth_asym_id()
//      MolScriptBuilder.set(...)
//      MolScriptBuilder.struct.atomProperty.macromolecular.label_seq_id()
//      MolScriptBuilder.struct.atomProperty.macromolecular.label_atom_id()
//      MolScriptBuilder.struct.generator.atomGroups(...)
//      MolScriptBuilder.struct.modifier.exceptBy(...)

//  StructureElement
//      StructureElement.Loci.is( loci )
//      StructureElement.Loci.getFirstLocation( event.current?.loci )
//      StructureElement.Location.create( structure );  ==  const location = StructureElement.Location.create( structure );

//  StructureProperties
//    residue
//      StructureProperties.residue.label_seq_id( location ) ==  const residueNumber = StructureProperties.residue.label_seq_id( location )
//      StructureProperties.residue.label_comp_id( location );  ==  const structure_ResidueName = StructureProperties.residue.label_comp_id( location );
//    chain
//      StructureProperties.chain.label_asym_id( location );  == const chainId = StructureProperties.chain.label_asym_id( location );
//      StructureProperties.chain.auth_asym_id( location );   == const chainId = StructureProperties.chain.auth_asym_id( location );  ALSO   const chain_authAsymId = StructureProperties.chain.auth_asym_id( location );
//      StructureProperties.chain.label_entity_id( location ) ==  const label_entity_id = StructureProperties.chain.label_entity_id( location )
//    entity
//      StructureProperties.entity.key( location ); == const entityKey = StructureProperties.entity.key( location );




