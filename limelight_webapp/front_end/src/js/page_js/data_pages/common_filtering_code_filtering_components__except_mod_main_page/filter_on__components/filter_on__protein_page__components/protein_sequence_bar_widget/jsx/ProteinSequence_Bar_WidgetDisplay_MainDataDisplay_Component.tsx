/**
 * ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component.tsx
 *
 * Protein Sequence Widget Display
 *
 * Goes with JS code:  proteinExperimentPage_SingleProtein_ProteinSequenceWidget_BuildDisplayObject.js
 */


import React from 'react'
import { Box, Slider } from "@mui/material";

import {
    limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants
} from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";

import {
    limelight__variable_is_type_number_Check
} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

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
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    ProteinSequenceWidget_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {
    ProteinSequence_Bar_Widget_StateObject,
    ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants,
    ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_bar_widget/js/proteinSequence_Bar_Widget_StateObject";
import { Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import { trypsin_CutPointsForSequence_Compute, trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions } from "page_js/common_all_pages/trypsinCutPointsForSequence";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import { Limelight_AnyFilter__HasFilterValue } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/any_filter__has_filter_value/Limelight_AnyFilter__HasFilterValue";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { ModificationMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import { modificationMass_CommonRounding_ReturnNumber } from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import { Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component } from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import { ProteinSequenceWidgetDisplay_Component_Data } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data";
import { Limelight__scaleColor_BasedOn_Fraction } from "page_js/common_all_pages/Limelight__scaleColor_BasedOn_Fraction";


const _STANDARD_COLOR__YES_PASS_FILTERS__OR__NO_FILTERS__FILL = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_dark
const _STANDARD_COLOR__NOT_PASS_FILTERS_FILL = "grey"

const _scaleColor_BasedOn_Fraction_Object = new Limelight__scaleColor_BasedOn_Fraction({
    min_Color_SixHex_WithLeading_Hash: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_medium,
    max_Color_SixHex_WithLeading_Hash: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_dark
})

const _STANDARD_COLOR__NO_COVERAGE_EVER_FILL = "#CCCCCC"  //  Light Grey - Protein Fill when NO Coverage filter or no filter. Modification when NOT pass filters.

const _STANDARD_COLOR__SELECTED__FOR_PEPTIDE_BORDER_STROKE_AND_PROTEIN_POSITION_SELECTION_SPOTS = "#FF00FF"  // Fuchsia (very bright)

const _STANDARD_COLOR__TRYPSIN_CUT_POINTS = "#FF0000"  // Red

const _TRYPSIN_CUT_POINTS__OPACITY = 0.6  //  Opacity opacity of Trypsin Cut Point Lines

const _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS = "red"

/**
 * This is on the edge of the <rect> and the border grows OUT and IN so subtract half of this to get a proper full width and height of the <rect>
 */
const _STANDARD_BORDER_WIDTH_STROKE_WIDTH = 1

const _STANDARD_BORDER_COLOR = "black"


const _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH = 100
const _STANDARD__LABELS_ON_LEFT_DISTANCE_FROM_RIGHT_EDGE_OF_TOTAL_WIDTH = 10

//  Protein Block
/**
 * This is on the edge of the <rect> and the border grows OUT and IN so subtract half of this to get a proper full width and height of the <rect>
 */
const _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH = _STANDARD_BORDER_WIDTH_STROKE_WIDTH

const _COLOR_PROTEIN_BAR_STROKE = _STANDARD_BORDER_COLOR

const _COLOR_PROTEIN_BAR__POSITIONS__COVERED__FILL = _STANDARD_COLOR__YES_PASS_FILTERS__OR__NO_FILTERS__FILL

const _COLOR_PROTEIN_BAR__POSITIONS__NOT_PASS_FILTERS__FILL = _STANDARD_COLOR__NOT_PASS_FILTERS_FILL

const _COLOR_PROTEIN_BAR__POSITIONS__NO_COVERAGE_EVER__FILL = _STANDARD_COLOR__NO_COVERAGE_EVER_FILL

const _PROTEIN_MIN_OPACITY = 0.2


//  Protein Position Selection shape values
const _PROTEIN_POSITION_SELECTION__COLOR__FILL = _STANDARD_COLOR__SELECTED__FOR_PEPTIDE_BORDER_STROKE_AND_PROTEIN_POSITION_SELECTION_SPOTS  // Fuchsia (very bright)

const _PROTEIN_POSITION_SELECTION__WIDTH = 12  // make even so divide by 2 is whole number
const _PROTEIN_POSITION_SELECTION__HEIGHT = 16

const _COLOR_PEPTIDE_BAR_FILL = _STANDARD_COLOR__YES_PASS_FILTERS__OR__NO_FILTERS__FILL
const _COLOR_PEPTIDE_BAR_STROKE = _STANDARD_BORDER_COLOR

/**
 * When the Peptide has been selected (The Protein Position Start/End is selected since that is what is stored)
 */
const _COLOR_PEPTIDE_BAR_SELECTED_STROKE = _STANDARD_COLOR__SELECTED__FOR_PEPTIDE_BORDER_STROKE_AND_PROTEIN_POSITION_SELECTION_SPOTS  // Fuchsia (very bright)

const _COLOR_PEPTIDE_BAR_NOT_PASS_FILTERS_FILL = _STANDARD_COLOR__NOT_PASS_FILTERS_FILL


const _COLOR_MODIFICATION_LOLLIPOP__POSITIONS__COVERED__FILL = _STANDARD_COLOR__YES_PASS_FILTERS__OR__NO_FILTERS__FILL

const _COLOR_MODIFICATION_LOLLIPOP__NOT_PASS_FILTERS__FILL = _STANDARD_COLOR__NO_COVERAGE_EVER_FILL


//   Width of single Protein Position when select 100% scale

const _WIDTH_PER_PROTEIN_POSITION__AT_100_PERCENT_SCALE = 2  //  Keep divisible by 2 so scale to 50% and 150% will work well

const _PROTEIN_COVERAGE_BLOCK__ADDITIONAL_WIDTH = 0.2  //  Add to the width to each Protein Coverage block so that it for sure overlaps with block to right and never leaves a white space


const _compute_Width_Per_ProteinPosition = function ( proteinSequence_Bar_Widget_StateObject: ProteinSequence_Bar_Widget_StateObject ) {

    const horizontalScale_Fraction = proteinSequence_Bar_Widget_StateObject.get_selected_HorizontalScale_Percentage_Value() / 100  // Convert percentage to fraction

    const width_Per_ProteinPosition = horizontalScale_Fraction * _WIDTH_PER_PROTEIN_POSITION__AT_100_PERCENT_SCALE

    return width_Per_ProteinPosition
}

//  Peptide Blocks
/**
 * This is on the edge of the <rect> and the border grows OUT and IN so subtract half of this to get a proper full width and height of the <rect>
 */
const _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH = _STANDARD_BORDER_WIDTH_STROKE_WIDTH

const _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__WIDTH_ADJUSTMENT = ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH / 2 ) - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH * .05 )

const _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__Y_AXIS_ADJUSTMENT = Math.ceil( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH )  // Shift down full width so on full pixel so top and bottom borders are fully visible

const _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__HEIGHT_ADJUSTMENT = ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH / 2 )

//  Peptide Blocks Vertical Layout
const _PEPTIDE_BLOCKS_BAR_HEIGHT = 10
const _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS = 4
const _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_FROM_PROTEIN_BAR = 5

//  Protein Bar Vertical Layout

const _PROTEIN_BAR__HEIGHT = _PEPTIDE_BLOCKS_BAR_HEIGHT * 3

//   Modifications Layout - Vertical and
const _LINE_HEIGHT_MODIFICATION_LINES = 10
const _CIRCLE_RADIUS_MODIFICATION_LINES = 2


/**
 * Offset everything from left edge to allow space for circles on Modifications.  If Scale Circle size for modifications then Scale this
 */
const _OFFSET_FROM_LEFT_AND_RIGHT_EDGE = _CIRCLE_RADIUS_MODIFICATION_LINES + 1

const _OFFSET_FROM_TOP_AND_BOTTOM_EDGE = 5

const _SVG_WIDTH_EXTRA = 6


/////   Height of each section

const _TOP_OF_SECTION__PROTEIN_POSITION_SELECTIONS = 2
const _HEIGHT_OF_SECTION__PROTEIN_POSITION_SELECTIONS = 15
const _HEIGHT_OF_SECTION__MODIFICATIONS = 18


const _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__NOT_SET: number = undefined

/**
 *
 */
export interface ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props_RootPassThrough {

    proteinSequence_Bar_Widget_StateObject: ProteinSequence_Bar_Widget_StateObject

    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

    modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

    limelight_AnyFilter__HasFilterValue: Limelight_AnyFilter__HasFilterValue

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    proteinSequenceWidgetDisplay_Component_Data: ProteinSequenceWidgetDisplay_Component_Data  // Use for sequence Coverage Percentage display

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

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void;
}


/**
 *
 */
export interface ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props extends ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props_RootPassThrough {


}

interface ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
export class ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component extends React.Component<ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props, ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_State> {

    private _widthScale_SelectionChanged_BindThis = this._widthScale_SelectionChanged.bind( this )

    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged_BindThis = this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged.bind( this )
    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged_BindThis = this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged.bind( this )

    private _show_TrypsinCutPoints_SelectionChanged_BindThis = this._show_TrypsinCutPoints_SelectionChanged.bind( this )

    private _download_Visualization_SVG_BindThis = this._download_Visualization_SVG.bind( this )

    private readonly _visualization_SVG_Ref: React.RefObject<SVGSVGElement>

    private _widthScaleSelection_InitialValue: number

    /**
     * undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
     */
    private _trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    private _mainData_Computed_For_ComponentsInThisFile_Root_Result: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root

    /**
     *
     */
    constructor( props: ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props ) {
        try {
            super( props );

            this._visualization_SVG_Ref = React.createRef();

            this._widthScaleSelection_InitialValue = props.proteinSequence_Bar_Widget_StateObject.get_selected_HorizontalScale_Percentage_Value()

            {
                const trypsin_CutPoints_For_ProteinSequence_Array = trypsin_CutPointsForSequence_Compute( this.props.proteinSequenceString )
                if ( trypsin_CutPoints_For_ProteinSequence_Array ) {
                    this._trypsin_CutPoints_For_ProteinSequence_Set = new Set( trypsin_CutPoints_For_ProteinSequence_Array )
                }
            }

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

            this._compute_DerivedDisplay()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * Clean Up
     */
    // componentWillUnmount() {

    // }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate( nextProps: Readonly<ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props>, nextState: Readonly<ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_State>, nextContext: any ): boolean {
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
    componentDidUpdate( prevProps: Readonly<ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_Props>, prevState: Readonly<ProteinSequence_Bar_WidgetDisplay_MainDataDisplay_Component_State>, snapshot?: any ) {
        try {

            if ( prevProps.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds !== this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
                || prevProps.projectSearchIds !== this.props.projectSearchIds
            ) {

                this._compute_DerivedDisplay()
            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @private
     */
    private _compute_DerivedDisplay() {

        const compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result =
            _compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root( {

                anyFilter__HasFilterValue: this.props.limelight_AnyFilter__HasFilterValue.is_AnyFilter__HasFilterValue(),

                add_open_modifications_unlocalized_in_all_peptide_positions: this.props.proteinSequence_Bar_Widget_StateObject.get_add_open_modifications_unlocalized_in_all_peptide_positions(),

                show_only_modifications_filtered_on__excluding_static: this.props.proteinSequence_Bar_Widget_StateObject.get_show_only_modifications_filtered_on__excluding_static(),

                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count(),
                scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count(),

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

            return // EARLY RETURN
        }

        compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.promise.catch( reason => {
        } )
        compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.promise.then( value => {
            try {

                this._mainData_Computed_For_ComponentsInThisFile_Root_Result = compute__INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root_Result.data
                this.forceUpdate()  //  React FORCE rerender

            } catch ( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                throw e
            }
        } )
    }

    private _widthScale_SelectionChanged( event: React.SyntheticEvent | Event, value: unknown ) {
        try {

            // console.warn( "onChangeCommitted called. event: ", event )
            // console.warn( "onChangeCommitted called. value: ", value )

            if ( ! limelight__variable_is_type_number_Check( value ) ) {

                const msg = "onChangeCommitted called. value is NOT a number.  value: " + value
                console.warn( msg )
                throw Error( msg )
            }

            // console.warn( "onChangeCommitted called. value IS a number.  value: " + value )

            this.props.proteinSequence_Bar_Widget_StateObject.set_selected_HorizontalScale_Percentage_Value( { selected_HorizontalScale_Percentage_Value: value } )

            this.forceUpdate()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged( event: React.ChangeEvent<HTMLInputElement> ) {
        try {

            this.props.proteinSequence_Bar_Widget_StateObject.set_shade_by_PSM_Count( event.target.checked )

            this._compute_DerivedDisplay()

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

                this.props.proteinSequence_Bar_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET )

            } else {

                const newValue_Number = Number.parseInt( event.target.value )

                if ( Number.isNaN( newValue_Number ) ) {
                    this.props.proteinSequence_Bar_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET )
                } else {
                    this.props.proteinSequence_Bar_Widget_StateObject.set_shade_by_PSM_Count__Max_PSM_Count( newValue_Number )
                }
            }

            this._compute_DerivedDisplay()

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

            this.props.proteinSequence_Bar_Widget_StateObject.set_show_TrypsinCutPoints( event.target.checked )

            this.forceUpdate()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _download_Visualization_SVG( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {

            event.stopPropagation()

            if ( limelight__IsTextSelected() ) {
                //  Text is selected so exit
                return  // EARLY RETURN
            }

            if ( ! this._visualization_SVG_Ref.current ) {
                return // EARLY RETURN
            }

            const svgContents = this._visualization_SVG_Ref.current.outerHTML

            const filename = 'protein-coverage-visualization.svg'

            StringDownloadUtils.downloadStringAsFile( { stringToDownload: svgContents, filename: filename } );

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

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


            const anyFilter__HasFilterValue = this.props.limelight_AnyFilter__HasFilterValue.is_AnyFilter__HasFilterValue()

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


            /////   TOP of each section

            const top_Of_Section__Protein_Position_Selections = _TOP_OF_SECTION__PROTEIN_POSITION_SELECTIONS

            let protein_Position_Selections_Height = 0  //  zero if NO selections

            if ( this.props.proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) {

                protein_Position_Selections_Height = top_Of_Section__Protein_Position_Selections + _HEIGHT_OF_SECTION__PROTEIN_POSITION_SELECTIONS
            }

            const top_Of_Section__Modifications = top_Of_Section__Protein_Position_Selections + protein_Position_Selections_Height
            const top_Of_Section__Protein_Bar = top_Of_Section__Modifications + _HEIGHT_OF_SECTION__MODIFICATIONS
            const top_Of_Section__Peptide_Blocks = top_Of_Section__Protein_Bar + _PROTEIN_BAR__HEIGHT + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_FROM_PROTEIN_BAR

            //////////

            //  Modifications

            const modificationLine_Elements_Array: Array<React.JSX.Element> = []

            //  Populate all grey first
            this._populate__modificationLine_Elements_Array( {
                populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue: false,
                modificationLine_Elements_Array,
                anyFilter__HasFilterValue,
                top_Of_Section__Modifications
            } )

            //  Populate all grey first
            this._populate__modificationLine_Elements_Array( {
                populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue: true,
                modificationLine_Elements_Array,
                anyFilter__HasFilterValue,
                top_Of_Section__Modifications
            } )


            //////////

            //  Display Selections of Protein Positions - Change to be computed internally in this file

            let selected_ProteinPosition_SVG_Elements: Array<React.JSX.Element> = undefined

            if ( this.props.proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) {

                selected_ProteinPosition_SVG_Elements = []

                const selectedProteinSequencePositions_Array = Array.from( this.props.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions() )

                limelight__Sort_ArrayOfNumbers_SortArrayInPlace( selectedProteinSequencePositions_Array )

                for ( const selectedProteinSequencePosition of selectedProteinSequencePositions_Array ) {

                    const width_Per_ProteinPosition = _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject )

                    const horizontalCenter = ( ( selectedProteinSequencePosition - 1 ) * width_Per_ProteinPosition ) + ( width_Per_ProteinPosition / 2 ) +
                        _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE

                    const horizontal_LeftEdge = horizontalCenter - ( _PROTEIN_POSITION_SELECTION__WIDTH / 2 )

                    // const triangle_Path_D =
                    //     "M" + horizontal_LeftEdge + " 0 " +
                    //     " L" + ( horizontal_LeftEdge + _PROTEIN_POSITION_SELECTION__WIDTH ) + " 0 " +
                    //     " L" + horizontalCenter + " " + _PROTEIN_POSITION_SELECTION__HEIGHT +
                    //     " Z"

                    const polygonPoints = (
                        //  Point 1 - Top Left
                        horizontal_LeftEdge + "," + top_Of_Section__Protein_Position_Selections
                        + " "
                        //  Point 2 - Top Right
                        + ( horizontal_LeftEdge + _PROTEIN_POSITION_SELECTION__WIDTH ) + "," + top_Of_Section__Protein_Position_Selections
                        + " "
                        //  Point 3 - Bottom Center
                        + ( horizontalCenter ) + "," + ( top_Of_Section__Protein_Position_Selections + _PROTEIN_POSITION_SELECTION__HEIGHT )
                    )

                    const selected_ProteinPosition_SVG_Element = (

                        <React.Fragment
                            key={ selectedProteinSequencePosition }
                        >
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <div>
                                        <div>
                                            Protein Selection at Position: { selectedProteinSequencePosition }
                                        </div>
                                        <div style={ { marginTop: 6 } }>
                                            Click to remove selection
                                        </div>
                                    </div>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                {/* Selected Protein Position Triangle */ }

                                {/*  Another option is <polygon points="100,20 180,180 20,180" fill="blue" stroke="black" stroke-width="3"/>  */ }

                                {/*<path d={ triangle_Path_D }*/ }
                                <polygon points={ polygonPoints }
                                         fill={ _PROTEIN_POSITION_SELECTION__COLOR__FILL }
                                    // stroke="black"
                                    // stroke-width="1"

                                         onClick={ event => {
                                             try {

                                                 this.props.proteinSequenceWidget_StateObject.delete_selectedProteinSequencePosition( { position: selectedProteinSequencePosition } )

                                                 this.forceUpdate()

                                                 window.setTimeout( () => {
                                                     try {

                                                         this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()

                                                     } catch ( e ) {
                                                         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                         throw e
                                                     }
                                                 }, 10 )
                                             } catch ( e ) {
                                                 reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                 throw e
                                             }
                                         } }
                                />
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        </React.Fragment>
                    )

                    selected_ProteinPosition_SVG_Elements.push( selected_ProteinPosition_SVG_Element )
                }
            }

            //  Trypsin Cut Points

            const trypsin_CutPoints_For_ProteinSequence_Elements_Array: Array<React.JSX.Element> = []

            if (
                this.props.proteinSequence_Bar_Widget_StateObject.get_show_TrypsinCutPoints()
                && this._trypsin_CutPoints_For_ProteinSequence_Set
                && this._mainData_Computed_For_ComponentsInThisFile_Root_Result ) {

                /**
                 * trypsin_CutPoints_For_ProteinSequence_Set: undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
                 */
                const trypsin_CutPoints_For_ProteinSequence_Set = this._trypsin_CutPoints_For_ProteinSequence_Set

                const width_Per_ProteinPosition = _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject )

                const y1 = top_Of_Section__Protein_Bar + _PROTEIN_BAR__HEIGHT + ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH * 2 )   // Just under the Protein Bar
                const y2 = (
                    top_Of_Section__Peptide_Blocks + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS +
                    //  First Row
                    ( _PEPTIDE_BLOCKS_BAR_HEIGHT ) +
                    //  All rows after fist row
                    ( ( _PEPTIDE_BLOCKS_BAR_HEIGHT + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS ) * ( this._mainData_Computed_For_ComponentsInThisFile_Root_Result.peptidePositions_SingleRow_Array.length - 1 ) ) +
                    //
                    ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH * 2 )
                )

                const proteinLength = this.props.proteinSequenceString.length

                for ( let proteinPosition = 1; proteinPosition <= proteinLength; proteinPosition++ ) {

                    const proteinPosition_CenterAfter = proteinPosition + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions

                    if ( trypsin_CutPoints_For_ProteinSequence_Set.has( proteinPosition_CenterAfter ) ) {

                        //  Have trypsin cut point so render

                        const x =
                            ( ( proteinPosition ) * width_Per_ProteinPosition ) +
                            _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH +
                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE

                        const element = (

                            <React.Fragment
                                key={ proteinPosition }
                            >
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <div>
                                            Trypsin Cut point at { proteinPosition }
                                        </div>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <line
                                        x1={ x }
                                        y1={ y1 }
                                        x2={ x }
                                        y2={ y2 }
                                        stroke={ _STANDARD_COLOR__TRYPSIN_CUT_POINTS }
                                        strokeWidth={ 1 }
                                        opacity={ _TRYPSIN_CUT_POINTS__OPACITY }
                                    />
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </React.Fragment>
                        )

                        trypsin_CutPoints_For_ProteinSequence_Elements_Array.push( element )
                    }
                }
            }


            let display_SequenceCoveragePercentage = this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_AllPeptides
            let display_SequenceCoverageCount = this.props.proteinSequenceWidgetDisplay_Component_Data.proteinPosition_Covered_AllPeptides_Count

            let display_SequenceCoveragePercentage_CSS_Class = " covered-and-not-filtered-not-a-position "

            if ( this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_FilteredPeptides !== undefined ) {

                display_SequenceCoveragePercentage = this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_FilteredPeptides

                display_SequenceCoverageCount = this.props.proteinSequenceWidgetDisplay_Component_Data.proteinPosition_Covered_UserSelectedPeptides_Count

                display_SequenceCoveragePercentage_CSS_Class = " covered-and-filtered-not-a-position "
            }

            if ( display_SequenceCoveragePercentage !== undefined ) {
                display_SequenceCoveragePercentage = Math.round( display_SequenceCoveragePercentage )
            }


            const sequenceCoveragePercentage_TooltipContents = (

                <div>
                    <div>
                        Protein sequence coverage is the fraction of the protein sequence covered by observed peptides. If filters are applied, only the filtered peptides are used.
                    </div>
                </div>
            )


            // let reportedPeptideIds_Count = 0
            //
            // {
            //     const reportedPeptideIds_Set: Set<number> = new Set()
            //
            //     for ( const projectSearchId of this.props.projectSearchIds ) {
            //
            //         const reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId = this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
            //         if ( ! reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {
            //             continue  // EARLY CONTINUE
            //         }
            //
            //         for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_reportedPeptideIds() ) {
            //             reportedPeptideIds_Set.add( reportedPeptideId )
            //         }
            //     }
            //
            //     reportedPeptideIds_Count = reportedPeptideIds_Set.size
            // }

            return (

                <div style={ { marginBottom: 20 } }>
                    {/*

                Debugging Info

                <div>
                    Protein Sequence Bar
                </div>

                <div>
                    Protein Sequence: { proteinSequence_Residues_Elements_Array }
                </div>

                <div>
                    reportedPeptideIds_Count: { reportedPeptideIds_Count }
                </div>
*/ }

                    { this._mainData_Computed_For_ComponentsInThisFile_Root_Result ? (

                        <>
                            {/*

                            Debugging Info

                        <div>
                            { this._peptidePositions_Root.peptidePositions_SingleRow_Array.map( ( rowValue, rowIndex) => {

                                return (
                                    <div key={ rowIndex }>
                                        {
                                            rowValue.peptidePositions_SingleEntry_InRow_Array.map( ( entryValue, entryIndex ) => {

                                                return (
                                                    <span key={ entryIndex }>
                                                        <span>start: { entryValue.start_Position } </span>
                                                        <span>end: { entryValue.end_Position } </span>
                                                    </span>
                                                )
                                            } )
                                        }
                                    </div>
                                )
                            })}

                        </div>
                        */ }

                            { this.props.proteinSequenceWidgetDisplay_Component_Data ? (

                                <div>
                                    <span style={ { fontSize: 18 } }>
                                        <span style={ { fontWeight: "bold" } }>Sequence Coverage: </span>

                                        { this.props.proteinSequenceWidgetDisplay_Component_Data.sequenceCoverage_Percentage_AllPeptides !== undefined ? (
                                            <>
                                                <span className="  protein-sequence-formatted-sequence-data-block  ">
                                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                        title={ sequenceCoveragePercentage_TooltipContents }
                                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                                    >
                                                        <span>
                                                            <span
                                                                className={ display_SequenceCoveragePercentage_CSS_Class }
                                                            >
                                                                <span>{ display_SequenceCoveragePercentage }</span>
                                                                <span>%</span>
                                                            </span>
                                                        </span>
                                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                                    <span> </span>
                                                    <span>(</span>
                                                    <span>{ display_SequenceCoverageCount.toString() }</span>
                                                    <span> / </span>
                                                    <span>{ this.props.proteinSequenceString.length.toString() }</span>
                                                    <span>)</span>

                                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                        title={ sequenceCoveragePercentage_TooltipContents }
                                                    />
                                                </span>
                                            </>
                                        ) : null }
                                    </span>
                                </div>

                            ) : null }

                            <div style={ { marginLeft: 40 } }>

                                {/*   Start Block for 'Width Scale Selection' down to the <svg> */ }

                                <div style={ { display: "flex" } }>

                                    <div
                                        style={ { alignSelf: "anchor-center", paddingRight: 15 } }
                                    >
                                        Protein Bar Width:
                                    </div>

                                    <Box sx={ { width: 100 } }>
                                        <Slider
                                            track={ false }
                                            size="small"
                                            aria-label="Horizontal Scale"
                                            defaultValue={ this._widthScaleSelection_InitialValue }
                                            //  Update min/max for limits in 'marks'
                                            min={ ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MIN }
                                            max={ ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_MAX }
                                            step={ ProteinSequence_Bar_Widget_StateObject__HorizontalScale_Percentage_Value_Constants._WIDTH_SCALE_SELECTION_STEP }

                                            getAriaValueText={ ( value: number ) => {
                                                return value + "%"
                                            } }

                                            valueLabelDisplay="auto" //  Shows value as user drags.
                                            valueLabelFormat={ ( value: number, index: number ) => {
                                                return value + "%"
                                            } }

                                            marks={ true }  // show dots at each discrete point

                                            onChangeCommitted={ this._widthScale_SelectionChanged_BindThis }

                                            //  Following ONLY puts the dots where the marks are so may imply to the user that only those values are selectable instead of the actual every 50 as set by the 'step' above
                                            // marks={[
                                            //     // {
                                            //     //     value: 50,
                                            //     //     label: '50%',
                                            //     // },
                                            //     {
                                            //         value: 100,
                                            //         label: '100%',
                                            //     },
                                            //     // {
                                            //     //     value: 150,
                                            //     //     label: '150%',
                                            //     // },
                                            //     {
                                            //         value: 200,
                                            //         label: '200%',
                                            //     },
                                            //     // {
                                            //     //     value: 250,
                                            //     //     label: '250%',
                                            //     // },
                                            //     {
                                            //         value: 300,
                                            //         label: '300%',
                                            //     },
                                            //     // {
                                            //     //     value: 350,
                                            //     //     label: '350%',
                                            //     // },
                                            //     {
                                            //         value: 400,
                                            //         label: '400%',
                                            //     },
                                            // ]}
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
                                                { this.props.proteinSequence_Bar_Widget_StateObject.get_selected_HorizontalScale_Percentage_Value() }%
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                </div>

                                <div>
                                    <label>
                                        <span>Shade by PSM Count: </span>
                                        <input
                                            type="checkbox"
                                            checked={ this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count() }
                                            onChange={ this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox__SelectionChanged_BindThis }
                                        />
                                    </label>
                                    <span style={ { width: 10 } }>&nbsp;</span>
                                    <span>Max PSM Count for shading: </span>
                                    <input
                                        style={ { width: 50 } }
                                        value={
                                            (
                                                this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count()
                                                !== ProteinSequence_Bar_Widget_StateObject___Shade_by_PSM_Count__Max_PSM_Count_Value_Constants.shade_by_PSM_Count__Max_PSM_Count_Value__NOT_SET
                                                    ? this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count__Max_PSM_Count()
                                                    : ""
                                            )
                                        }
                                        onChange={ this._scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount__SelectionChanged_BindThis }
                                    />

                                </div>

                                <div>
                                    <label>
                                        <span>Show Trypsin Cut points: </span>
                                        <input
                                            type="checkbox"
                                            checked={ this.props.proteinSequence_Bar_Widget_StateObject.get_show_TrypsinCutPoints() }
                                            onChange={ this._show_TrypsinCutPoints_SelectionChanged_BindThis }
                                        />
                                    </label>
                                </div>

                                <div>

                                    {/*  REMOVED

                                NOTE:  Also removed all usage of 'get_show_only_modifications_pass_all_filters()'

                                <div>
                                    <label>
                                        <span>Show only modifications on peptides that pass all filters: </span>
                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={
                                                "Show only modifications on the peptides that pass all filters"
                                            }
                                        />
                                        <input
                                            type="checkbox"
                                            checked={ this.props.proteinSequence_Bar_Widget_StateObject.get_show_only_modifications_pass_all_filters() }
                                            onChange={ event => {

                                                this.props.proteinSequence_Bar_Widget_StateObject.set_show_only_modifications_pass_all_filters( event.currentTarget.checked )

                                                this._compute_DerivedDisplay()
                                            } }
                                        />
                                    </label>
                                </div>
                                */ }

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
                                                checked={ this.props.proteinSequence_Bar_Widget_StateObject.get_show_only_modifications_filtered_on__excluding_static() }
                                                onChange={ event => {

                                                    this.props.proteinSequence_Bar_Widget_StateObject.set_show_only_modifications_filtered_on__excluding_static( event.currentTarget.checked )

                                                    this._compute_DerivedDisplay()
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
                                                    checked={ this.props.proteinSequence_Bar_Widget_StateObject.get_add_open_modifications_unlocalized_in_all_peptide_positions() }
                                                    onChange={ event => {

                                                        this.props.proteinSequence_Bar_Widget_StateObject.set_add_open_modifications_unlocalized_in_all_peptide_positions( event.currentTarget.checked )

                                                        this._compute_DerivedDisplay()
                                                    } }
                                                />
                                            </label>
                                        </div>
                                    ) : null }

                                </div>

                                {/*   End: Block for 'Width Scale Selection' down to the <svg> */ }

                            </div>

                            <div
                                className=" standard-on-hover-show-specific-child-element-div-contents--root-element "
                                style={ { marginTop: 10, position: "relative" } }
                            >
                                <svg
                                    ref={ this._visualization_SVG_Ref }
                                    width={
                                        _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH +
                                        this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) +
                                        ( _OFFSET_FROM_LEFT_AND_RIGHT_EDGE * 2 ) +
                                        _SVG_WIDTH_EXTRA
                                    }
                                    height={
                                        top_Of_Section__Peptide_Blocks
                                        + ( ( _PEPTIDE_BLOCKS_BAR_HEIGHT + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS ) * this._mainData_Computed_For_ComponentsInThisFile_Root_Result.peptidePositions_SingleRow_Array.length )
                                        + ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH * 2 )
                                        + 1 // Extra to ensure bottom edge of last row of peptide blocks are shown
                                    }
                                >
                                    { this.props.proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ? (

                                        //  Have Protein Position Selections so display them

                                        <>
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <div>
                                                        Protein Position Selections
                                                    </div>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <text
                                                    x={ _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - _STANDARD__LABELS_ON_LEFT_DISTANCE_FROM_RIGHT_EDGE_OF_TOTAL_WIDTH }
                                                    y={ top_Of_Section__Protein_Position_Selections }
                                                    textAnchor="end"
                                                    // dy=".35em"
                                                    style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                                >
                                                    <tspan
                                                        textAnchor="end"
                                                        // dy=".35em"
                                                        dy="1em"
                                                        style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                                    >
                                                        Selections:
                                                    </tspan>
                                                </text>
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                            { selected_ProteinPosition_SVG_Elements }
                                        </>
                                    ) : null }


                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div>
                                                <span>Variable modifications </span>
                                                { anySearch_Has_OpenModifications ? (
                                                    <>
                                                        <span>and Open localized </span>
                                                        { this.props.proteinSequence_Bar_Widget_StateObject.get_add_open_modifications_unlocalized_in_all_peptide_positions() ? (
                                                            <span> and unlocalized </span>
                                                        ) : null }
                                                    </>
                                                ) : null }
                                                <span>modifications</span>
                                            </div>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <text
                                            x={ _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - _STANDARD__LABELS_ON_LEFT_DISTANCE_FROM_RIGHT_EDGE_OF_TOTAL_WIDTH }
                                            y={ top_Of_Section__Modifications }
                                            textAnchor="end"
                                            // dy=".35em"
                                            style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            <tspan
                                                textAnchor="end"
                                                // dy=".35em"
                                                dy="1em"
                                                style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                            >
                                                Modifications:
                                            </tspan>
                                        </text>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                    { modificationLine_Elements_Array }

                                    <text
                                        x={ _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - _STANDARD__LABELS_ON_LEFT_DISTANCE_FROM_RIGHT_EDGE_OF_TOTAL_WIDTH }
                                        y={ top_Of_Section__Protein_Bar + ( _PROTEIN_BAR__HEIGHT / 2 ) }
                                        textAnchor="end"
                                        dominantBaseline="middle"
                                        // dy=".35em"
                                        style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                    >
                                        <tspan
                                            textAnchor="end"
                                            // dy=".35em"
                                            // dy="1em"  // fallback on dominantBaseline
                                            style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            Protein:
                                        </tspan>
                                    </text>

                                    <ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component

                                        top_Of_Section__Protein_Bar={ top_Of_Section__Protein_Bar }

                                        anyFilter__HasFilterValue={ anyFilter__HasFilterValue }

                                        proteinSequence_Bar_Widget_StateObject={ this.props.proteinSequence_Bar_Widget_StateObject }
                                        proteinSequenceWidget_StateObject={ this.props.proteinSequenceWidget_StateObject }
                                        proteinSequenceString={ this.props.proteinSequenceString }
                                        trypsin_CutPoints_For_ProteinSequence_Set={ this._trypsin_CutPoints_For_ProteinSequence_Set }

                                        mainData_Computed_For_ComponentsInThisFile_Root_Result={ this._mainData_Computed_For_ComponentsInThisFile_Root_Result }

                                        updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ () => {

                                            // this.forceUpdate()

                                            window.setTimeout( () => {
                                                try {

                                                    this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()

                                                } catch ( e ) {
                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                    throw e
                                                }
                                            }, 10 )
                                        } }
                                    />

                                    {/* Lines around rectangles.  Center of line is at X/Y */ }

                                    {/* Line Top */ }
                                    <line
                                        x1={ _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 ) }
                                        y1={ top_Of_Section__Protein_Bar + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH + 0.5 }
                                        x2={
                                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 )
                                            + ( this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) )
                                        }
                                        y2={ top_Of_Section__Protein_Bar + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH + 0.5 }
                                        stroke={ _COLOR_PROTEIN_BAR_STROKE }
                                        strokeWidth={ _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                    />

                                    {/* Line Bottom */ }
                                    <line
                                        x1={ _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 ) }
                                        y1={ top_Of_Section__Protein_Bar + ( _PROTEIN_BAR__HEIGHT ) + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH - 0.5 }
                                        x2={
                                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 )
                                            + ( this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) )
                                        }
                                        y2={ top_Of_Section__Protein_Bar + ( _PROTEIN_BAR__HEIGHT ) + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH - 0.5 }
                                        stroke={ _COLOR_PROTEIN_BAR_STROKE }
                                        strokeWidth={ _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                    />

                                    {/* Line Left */ }
                                    <line
                                        x1={ _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 ) }
                                        y1={ top_Of_Section__Protein_Bar + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                        x2={ _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 ) }
                                        y2={ top_Of_Section__Protein_Bar + ( _PROTEIN_BAR__HEIGHT ) + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                        stroke={ _COLOR_PROTEIN_BAR_STROKE }
                                        strokeWidth={ _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                    />

                                    {/* Line Right */ }
                                    <line
                                        x1={
                                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 )
                                            + ( this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) )
                                        }
                                        y1={ top_Of_Section__Protein_Bar + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                        x2={
                                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH / 2 )
                                            + ( this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) )
                                        }
                                        y2={ top_Of_Section__Protein_Bar + ( _PROTEIN_BAR__HEIGHT ) + ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                        stroke={ _COLOR_PROTEIN_BAR_STROKE }
                                        strokeWidth={ _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH }
                                    />

                                    <text
                                        x={ _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - _STANDARD__LABELS_ON_LEFT_DISTANCE_FROM_RIGHT_EDGE_OF_TOTAL_WIDTH }
                                        y={ top_Of_Section__Peptide_Blocks }
                                        textAnchor="end"
                                        // dy=".35em"
                                        style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                    >
                                        <tspan
                                            textAnchor="end"
                                            // dy=".35em"
                                            dy="1em"
                                            style={ { fontSize: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number, fontFamily: "Helvetica, Arial, sans-serif" } }
                                        >
                                            Peptides:
                                        </tspan>
                                    </text>

                                    {/*  Render Peptide Blocks - All Rows  */}

                                    { this._render_PeptideBlocks_AllRows({
                                        rendering_OnTopOf_TrypsinCutPointLines: false, anyFilter__HasFilterValue, top_Of_Section__Peptide_Blocks
                                    }) }

                                    {/*  trypsin Cut Points  */ }

                                    { trypsin_CutPoints_For_ProteinSequence_Elements_Array }

                                    {/*
                                        Render the same Peptide Blocks ON TOP of the Trypsin Cut Point lines so that the Peptide Blocks get the mouse enter/leave instead of the  Trypsin Cut Point lines.
                                        NOTE:  IF USE this then need to uncomment the change opacity "1" and "0" on mouse enter/leave in the called method.
                                    */}
                                    {/*{ this._render_PeptideBlocks_AllRows({*/}
                                    {/*    rendering_OnTopOf_TrypsinCutPointLines: true, anyFilter__HasFilterValue, top_Of_Section__Peptide_Blocks*/}
                                    {/*}) }*/}

                                    {/*  Close of single <svg> containing everything  */ }
                                </svg>

                                { this._mainData_Computed_For_ComponentsInThisFile_Root_Result?.peptidePositions_SingleRow_Array?.length < 2 ? (

                                    //  Less than 3 Peptide Rows so add space below to push down the "Download SVG" link

                                    <div style={ { height: "1.3rem" } }>
                                        &nbsp;
                                    </div>

                                ) : null }

                                <div
                                    // Always SHOW so remove: className=" standard-on-hover-show-specific-child-element-div-contents--child-element-container "
                                    style={ { position: "absolute", left: 0, bottom: 0, width: _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH - 2 } }
                                >
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <div>
                                                Download the visualization as SVG
                                            </div>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <span
                                            className=" fake-link "
                                            onClick={ this._download_Visualization_SVG_BindThis }
                                        >
                                            Download SVG
                                        </span>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                            </div>
                        </>

                    ) : null }

                </div>

            );
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param anyFilter__HasFilterValue
     * @param top_Of_Section__Peptide_Blocks
     * @private
     */
    private _render_PeptideBlocks_AllRows(
        {
            rendering_OnTopOf_TrypsinCutPointLines,
            anyFilter__HasFilterValue,
            top_Of_Section__Peptide_Blocks
        } : {
            rendering_OnTopOf_TrypsinCutPointLines: boolean
            anyFilter__HasFilterValue: boolean
            top_Of_Section__Peptide_Blocks: number
        }
    ) {


        return (
            <>
                { this._mainData_Computed_For_ComponentsInThisFile_Root_Result.peptidePositions_SingleRow_Array.map( ( rowValue, rowIndex ) => {

                    return (

                        <g key={ rowIndex }>
                            {
                                rowValue.peptidePositions_SingleEntry_InRow_Array.map( ( entryValue, entryIndex ) => {

                                    const x = ( ( entryValue.start_Position - 1 ) * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE
                                    const y = ( rowIndex * ( _PEPTIDE_BLOCKS_BAR_HEIGHT + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS ) ) + _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__Y_AXIS_ADJUSTMENT + top_Of_Section__Peptide_Blocks + _OFFSET_FROM_TOP_AND_BOTTOM_EDGE
                                    const width = ( entryValue.peptideLength * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__WIDTH_ADJUSTMENT * 1 )
                                    const height = _PEPTIDE_BLOCKS_BAR_HEIGHT - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__HEIGHT_ADJUSTMENT * 2 )

                                    //  Use if selected for <line>

                                    const line_X_1 = ( ( entryValue.start_Position - 1 ) * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH / 2 )
                                    const line_X_2 = ( ( entryValue.start_Position + entryValue.peptideLength - 1 ) * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE

                                    const line_Y_Above = ( rowIndex * ( _PEPTIDE_BLOCKS_BAR_HEIGHT + _PEPTIDE_BLOCKS_BAR_HEIGHT_SEPARATION_BETWEEN_PEPTIDE_ROWS ) ) +
                                        ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__WIDTH_ADJUSTMENT * 1 ) - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH / 2 ) +
                                        top_Of_Section__Peptide_Blocks +
                                        _OFFSET_FROM_TOP_AND_BOTTOM_EDGE
                                    const line_Y_Below = y + height + _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH

                                    let isSelected_Protein_StartEnd_Position = this.props.proteinSequenceWidget_StateObject.isSelected_Protein_StartEnd_Position( {
                                        protein_Start: entryValue.start_Position,
                                        protein_End: entryValue.end_Position
                                    } )
                                    let rect_StrokeColor = _COLOR_PEPTIDE_BAR_STROKE

                                    if ( isSelected_Protein_StartEnd_Position ) {

                                        rect_StrokeColor = _COLOR_PEPTIDE_BAR_SELECTED_STROKE
                                    }

                                    const clickFunction = ( event: React.MouseEvent<Element, MouseEvent> ) => {

                                        if ( event.ctrlKey || event.metaKey ) {
                                            //  CTRL or Meta (Command on Mac) Key Held
                                            if ( this.props.proteinSequenceWidget_StateObject.isSelected_Protein_StartEnd_Position( {
                                                protein_Start: entryValue.start_Position,
                                                protein_End: entryValue.end_Position
                                            } ) ) {
                                                //  Already exists so delete
                                                this.props.proteinSequenceWidget_StateObject.delete_selected_Protein_StartEnd_Position( {
                                                    protein_Start: entryValue.start_Position,
                                                    protein_End: entryValue.end_Position
                                                } )
                                            } else {
                                                //  NOT Already exists so add
                                                this.props.proteinSequenceWidget_StateObject.add_selected_Protein_StartEnd_Position( {
                                                    protein_Start: entryValue.start_Position,
                                                    protein_End: entryValue.end_Position
                                                } )
                                            }
                                        } else {

                                            //  Neither CTRL or Meta Key Held

                                            if ( isSelected_Protein_StartEnd_Position ) {

                                                //  Already selected so delete
                                                this.props.proteinSequenceWidget_StateObject.delete_selected_Protein_StartEnd_Position( {
                                                    protein_Start: entryValue.start_Position,
                                                    protein_End: entryValue.end_Position
                                                } )

                                            } else {

                                                // Clear all existing
                                                this.props.proteinSequenceWidget_StateObject.clearAll_Selections_Protein_StartEnd_Position()
                                                //  Add
                                                this.props.proteinSequenceWidget_StateObject.add_selected_Protein_StartEnd_Position( {
                                                    protein_Start: entryValue.start_Position,
                                                    protein_End: entryValue.end_Position
                                                } )
                                            }
                                        }

                                        this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()
                                    }

                                    const onMouseEnter_Function = ( event: React.MouseEvent<SVGRectElement, MouseEvent> ) => {

                                        // event.currentTarget.style.opacity = "1"

                                        event.currentTarget.style.strokeWidth = "4"
                                    }

                                    const onMouseLeave_Function = ( event: React.MouseEvent<SVGRectElement, MouseEvent> ) => {

                                        // event.currentTarget.style.opacity = "0"

                                        event.currentTarget.style.strokeWidth = _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH.toString()
                                    }

                                    let rect_Fill = _COLOR_PEPTIDE_BAR_NOT_PASS_FILTERS_FILL
                                    // let opacity = 1

                                    if ( entryValue.proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {

                                        rect_Fill = _COLOR_PEPTIDE_BAR_FILL

                                        if ( this.props.proteinSequence_Bar_Widget_StateObject.get_shade_by_PSM_Count()
                                            && entryValue.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_FractionOf_Max_ProteinCoverage_PSM_Count !== undefined ) {

                                            rect_Fill = _scaleColor_BasedOn_Fraction_Object.scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat(  entryValue.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_FractionOf_Max_ProteinCoverage_PSM_Count )

                                            // Scale opacity from _PROTEIN_MIN_OPACITY to 1

                                            // const opacity_MaxMinusMin = 1 - _PROTEIN_MIN_OPACITY
                                            //
                                            // opacity = _PROTEIN_MIN_OPACITY + ( opacity_MaxMinusMin * entryValue.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount_FractionOf_Max_ProteinCoverage_PSM_Count )
                                            //
                                            // if ( opacity > 1 ) {
                                            //     opacity = 1
                                            // }
                                            // if ( opacity < _PROTEIN_MIN_OPACITY ) {
                                            //     opacity = _PROTEIN_MIN_OPACITY // Min Opacity
                                            // }

                                            //   Different approach of no opacity under _PROTEIN_MIN_OPACITY

                                            // opacity = proteinSequenceCoverage_Position.psmCount_Fraction
                                            // if ( opacity < _PROTEIN_MIN_OPACITY ) {
                                            //     opacity = _PROTEIN_MIN_OPACITY // Min Opacity
                                            // }
                                        }
                                    }

                                    // let opacityString: string = undefined
                                    //
                                    // if ( opacity === 1 ) {
                                    //     opacityString = opacity.toString()
                                    // } else {
                                    //     opacityString = opacity.toFixed( 3 )
                                    // }

                                    let opacity = 1

                                    if ( rendering_OnTopOf_TrypsinCutPointLines ) {
                                        opacity = 0  // initialize to zero

                                        // rect_Fill = "red"  //  TODO  FAKE
                                    }


                                    return (
                                        <React.Fragment
                                            key={ entryValue.start_Position }
                                        >
                                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                                title={
                                                    <div>
                                                        <div>
                                                            { isSelected_Protein_StartEnd_Position ? (
                                                                <span>Selected</span>
                                                            ) : null }
                                                        </div>
                                                        <div style={ { marginTop: 10 } }>
                                                            Peptide position in protein: start: { entryValue.start_Position }, end: { entryValue.end_Position }
                                                        </div>

                                                        {/*
                                                        { anyFilter__HasFilterValue ? (
                                                            <div style={ { marginTop: 10 } }>
                                                                { entryValue.proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ? (

                                                                    <div>
                                                                        Peptide passes all filters.
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        Peptide passes ONLY filters on searches at top of page. Filters for PSM, etc.
                                                                    </div>
                                                                ) }
                                                            </div>
                                                        ) : null }
                                                        */ }

                                                        <div style={ { marginTop: 6 } }>
                                                            <div>
                                                                <span>PSM Count: </span>
                                                                <span>
                                                                    { entryValue.all_Data__PsmIds_PsmCount.psmCount__FinalResult.toLocaleString() }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        { anyFilter__HasFilterValue && entryValue.proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ? (
                                                            <div style={ { marginTop: 6 } }>
                                                                <div>
                                                                    <span>Filtered PSM count: </span>
                                                                    <span
                                                                        style={ { color: _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS } }
                                                                    >
                                                                        { entryValue.only_Data_Passes_AllFilters__PsmIds_PsmCount.psmCount__FinalResult.toLocaleString() }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ) : null }

                                                        <div style={ { marginTop: 10 } }>
                                                            { ! isSelected_Protein_StartEnd_Position ? (
                                                                <div>
                                                                    Click to add peptide selection.
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    Click to remove peptide selection.
                                                                </div>
                                                            ) }
                                                            <div>
                                                                Control/command click to toggle selection.
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                            >
                                                <rect
                                                    fill={ rect_Fill }
                                                    // opacity={ opacityString }
                                                    opacity={ opacity }
                                                    stroke={ rect_StrokeColor }
                                                    strokeWidth={ _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH }
                                                    // strokeWidth={ rendering_OnTopOf_TrypsinCutPointLines ? 4 : _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH }
                                                    x={ x }
                                                    y={ y }
                                                    width={ width }
                                                    height={ height }
                                                    className=" clickable "
                                                    onClick={ clickFunction }
                                                    onMouseEnter={ onMouseEnter_Function }
                                                    onMouseLeave={ onMouseLeave_Function }
                                                />
                                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                                            { isSelected_Protein_StartEnd_Position ? (
                                                <>
                                                    {/* Line Above */ }
                                                    <line
                                                        x1={ line_X_1 }
                                                        y1={ line_Y_Above }
                                                        x2={ line_X_2 }
                                                        y2={ line_Y_Above }
                                                        stroke={ rect_StrokeColor }
                                                        strokeWidth={ 2 }
                                                        onClick={ clickFunction }
                                                    />
                                                    {/* Line Below */ }
                                                    <line
                                                        x1={ line_X_1 }
                                                        y1={ line_Y_Below }
                                                        x2={ line_X_2 }
                                                        y2={ line_Y_Below }
                                                        stroke={ rect_StrokeColor }
                                                        strokeWidth={ 2 }
                                                        onClick={ clickFunction }
                                                    />
                                                </>
                                            ) : null }
                                        </React.Fragment>
                                    )
                                } )
                            }
                        </g>
                    )
                } ) }

            </>
        )
    }


    //   END of render methods

    //////////////

    /**
     *
     * @param populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue
     * @param modificationLine_Elements_Array
     * @param anyFilter__HasFilterValue
     * @param top_Of_Section__Modifications
     * @private
     */
    private _populate__modificationLine_Elements_Array(
        {
            populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue,
            modificationLine_Elements_Array,
            anyFilter__HasFilterValue,
            top_Of_Section__Modifications
        }: {

            populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue: boolean
            modificationLine_Elements_Array: Array<React.JSX.Element>
            anyFilter__HasFilterValue: boolean
            top_Of_Section__Modifications: number
        } ) {

        // const proteinSequence_Residues_Elements_Array: Array<React.JSX.Element> = []

        if ( this._mainData_Computed_For_ComponentsInThisFile_Root_Result ) {

            const proteinLength = this.props.proteinSequenceString.length

            for ( let proteinPosition = 1; proteinPosition <= proteinLength; proteinPosition++ ) {

                const modifications_At_ProteinPosition = this._mainData_Computed_For_ComponentsInThisFile_Root_Result.modifications_Map_Key_ProteinPosition.get( proteinPosition )

                if ( ! modifications_At_ProteinPosition ) {
                    //  NO modifications so SKIP
                    continue // EARLY CONTINUE
                }

                //  REMOVED:  Removed since removed UI Checkbox for this option.
                //
                // if (
                //     this.props.proteinSequence_Bar_Widget_StateObject.get_show_only_modifications_pass_all_filters()
                //     && (
                //         ( ! modifications_At_ProteinPosition.modifications_Passes_ALL_Filters )
                //         || ( ! modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications() )
                //     )
                // ) {
                //     //  NO modifications pass ALL Filters AND this._show_only_modifications_pass_all_filters is true so SKIP
                //     continue // EARLY CONTINUE
                // }

                //   If/else to separate the populate green from grey so all grey first

                if ( populate__modifications_Passes_ALL_Filters__hasAny_Modifications__OnlyTrue ) {

                    //  YES Only populate when 'modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications()' is true

                    if ( ! modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications() ) {
                        //  Is NOT true so skip
                        continue  // EARLY CONTINUE
                    }

                } else {

                    //  Else of YES Only populate when 'modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications()' is true

                    if ( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications() ) {
                        //  Is true so skip
                        continue  // EARLY CONTINUE
                    }
                }

                const fillColor = ( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.hasAny_Modifications() ) ?
                    _COLOR_MODIFICATION_LOLLIPOP__POSITIONS__COVERED__FILL : _COLOR_MODIFICATION_LOLLIPOP__NOT_PASS_FILTERS__FILL


                const width_Per_ProteinPosition = _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject )

                const x = ( ( proteinPosition - 1 ) * width_Per_ProteinPosition ) +
                    ( width_Per_ProteinPosition / 2 ) +  //  '/ 2' to get to center of protein position
                    _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH +
                    _OFFSET_FROM_LEFT_AND_RIGHT_EDGE

                const y_TopOffSet = 2 + top_Of_Section__Modifications

                ////  Pass PSM_Etc Filters

                let variableModification_Masses_Passes_PSM_Etc_Filters_String: string = undefined

                let open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String: string = undefined

                {
                    if ( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses && modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses.size > 0 ) {

                        const variableModification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( variableModification_Masses_Array )
                        variableModification_Masses_Passes_PSM_Etc_Filters_String = variableModification_Masses_Array.join( ", " )
                    }

                    if ( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber && modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

                        const open_Rounded_Modification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.openModifications_Masses_RoundToWholeNumber )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( open_Rounded_Modification_Masses_Array )
                        open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String = open_Rounded_Modification_Masses_Array.join( ", " )
                    }
                }

                ////  Pass ALL Filters AND anyFilter__HasFilterValue is true

                let variableModification_Masses_Passes_ALL_Filters_String: string = undefined

                let open_Rounded_Modification_Masses_Passes_ALL_Filters_String: string = undefined

                if ( anyFilter__HasFilterValue ) {

                    if ( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses && modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses.size > 0 ) {

                        const variableModification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( variableModification_Masses_Array )
                        variableModification_Masses_Passes_ALL_Filters_String = variableModification_Masses_Array.join( ", " )
                    }

                    if ( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber && modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

                        const open_Rounded_Modification_Masses_Array = Array.from( modifications_At_ProteinPosition.modifications_Passes_ALL_Filters.openModifications_Masses_RoundToWholeNumber )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( open_Rounded_Modification_Masses_Array )
                        open_Rounded_Modification_Masses_Passes_ALL_Filters_String = open_Rounded_Modification_Masses_Array.join( ", " )
                    }
                }

                const TooltipContent = () => {

                    const leftGridElement_MarginRight = 10
                    const leftAndRightGridElement_MarginTop = 5

                    return (

                        <div
                            className=" word-break-break-word-backup-break-all "
                        >
                            <div>
                                <span>Modifications at protein position: </span>
                                <span style={ { fontWeight: "bold" } }>
                                    { proteinPosition }
                                </span>
                            </div>

                            { variableModification_Masses_Passes_PSM_Etc_Filters_String || open_Rounded_Modification_Masses_Passes_PSM_Etc_Filters_String ? (
                                <div
                                    className=" word-break-break-word-backup-break-all "
                                    style={ { display: "grid", gridTemplateColumns: "max-content 1fr", marginTop: 10 } }
                                >
                                    {/*  Modifications that pass the top level PSM Reported Peptide Filters  */ }

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

                                    {/*  Modifications that pass ALL Filters.  ONLY displayed when any filters.  */ }

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
                        </div>
                    )
                }

                const modificationLine_Element = (

                    <React.Fragment
                        key={ modificationLine_Elements_Array.length }
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ <TooltipContent/> }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            {/* Modification Circle */ }
                            <circle
                                cx={ x }
                                cy={ y_TopOffSet + _CIRCLE_RADIUS_MODIFICATION_LINES }
                                r={ _CIRCLE_RADIUS_MODIFICATION_LINES }
                                fill={ fillColor }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ <TooltipContent/> }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <line
                                x1={ x }
                                y1={ y_TopOffSet + ( _CIRCLE_RADIUS_MODIFICATION_LINES * 2 ) }
                                x2={ x }
                                y2={ y_TopOffSet + ( _CIRCLE_RADIUS_MODIFICATION_LINES * 2 ) + _LINE_HEIGHT_MODIFICATION_LINES }
                                stroke={ fillColor }
                                strokeWidth={ 1 }
                            />
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </React.Fragment>
                )
                modificationLine_Elements_Array.push( modificationLine_Element )
            }
        }

    }
}


/**
 *
 */
interface ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component_Props {

    top_Of_Section__Protein_Bar: number

    anyFilter__HasFilterValue: boolean

    proteinSequence_Bar_Widget_StateObject: ProteinSequence_Bar_Widget_StateObject

    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

    proteinSequenceString: string

    /**
     * undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
     */
    trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    mainData_Computed_For_ComponentsInThisFile_Root_Result: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void;
}

interface ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
class ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component extends React.Component<ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component_Props, ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component_State> {

    /**
     *
     */
    constructor( props: ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY_Component_Props ) {
        try {
            super( props );

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
        try {

            const proteinCoverage_Rects_Elements_Array: Array<React.JSX.Element> = []

            {  //  First put light grey for all protein positions that are NOT covered

                let lastCoveredPosition_End = 0

                for ( const proteinSequenceCoverage_Position_ForCompare of this.props.mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Array ) {

                    if ( proteinSequenceCoverage_Position_ForCompare.start_Position !== ( lastCoveredPosition_End + 1 ) ) {

                        //  Need to add 'NOT Covered' block FROM ( lastCoveredPosition_End + 1 ) TO ( proteinSequenceCoverage_Position.start_Position - 1 )

                        const positionStart = ( lastCoveredPosition_End + 1 )
                        const positionEnd = ( proteinSequenceCoverage_Position_ForCompare.start_Position - 1 )


                        const x = ( ( positionStart - 1 ) * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE
                        const y = ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + this.props.top_Of_Section__Protein_Bar
                        const width = ( ( positionEnd - positionStart + 1 ) * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) // - ( _PEPTIDE_BLOCKS_BORDER_WIDTH_STROKE_WIDTH__WIDTH_ADJUSTMENT * 1 )
                        const height = _PROTEIN_BAR__HEIGHT

                        const element = (
                            <React.Fragment
                                key={ positionStart }
                            >
                                <rect
                                    fill={ _COLOR_PROTEIN_BAR__POSITIONS__NO_COVERAGE_EVER__FILL }
                                    x={ x }
                                    y={ y }
                                    width={ width }
                                    height={ height }
                                />
                            </React.Fragment>
                        )

                        proteinCoverage_Rects_Elements_Array.push( element )
                    }

                    lastCoveredPosition_End = proteinSequenceCoverage_Position_ForCompare.end_Position
                }
            }
            {
                // Scale opacity from _PROTEIN_MIN_OPACITY to 1

                const opacity_MaxMinusMin = 1 - _PROTEIN_MIN_OPACITY

                const width_Per_ProteinPosition = _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject )

                for ( const proteinSequenceCoverage_Position of this.props.mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Array ) {

                    const x = ( ( proteinSequenceCoverage_Position.start_Position - 1 ) * width_Per_ProteinPosition ) + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH + _OFFSET_FROM_LEFT_AND_RIGHT_EDGE
                    const y = ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + this.props.top_Of_Section__Protein_Bar
                    const width =
                        ( ( proteinSequenceCoverage_Position.end_Position - proteinSequenceCoverage_Position.start_Position + 1 ) * width_Per_ProteinPosition ) + _PROTEIN_COVERAGE_BLOCK__ADDITIONAL_WIDTH
                    const height = _PROTEIN_BAR__HEIGHT

                    let fillColor = proteinSequenceCoverage_Position.passes_All_Filters ? _COLOR_PROTEIN_BAR__POSITIONS__COVERED__FILL : _COLOR_PROTEIN_BAR__POSITIONS__NOT_PASS_FILTERS__FILL

                    // let opacity = 1

                    if ( proteinSequenceCoverage_Position.passes_All_Filters && proteinSequenceCoverage_Position.psmCount_PassesAllFilters_Fraction !== undefined ) {


                        fillColor = _scaleColor_BasedOn_Fraction_Object.scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat(  proteinSequenceCoverage_Position.psmCount_PassesAllFilters_Fraction )

                        // opacity = _PROTEIN_MIN_OPACITY + ( proteinSequenceCoverage_Position.psmCount_PassesAllFilters_Fraction * opacity_MaxMinusMin )
                        //
                        // if ( opacity > 1 ) {
                        //     opacity = 1
                        // }
                        // if ( opacity < _PROTEIN_MIN_OPACITY ) {
                        //     opacity = _PROTEIN_MIN_OPACITY // Min Opacity
                        // }

                        //   Different approach of no opacity under _PROTEIN_MIN_OPACITY

                        // opacity = proteinSequenceCoverage_Position.psmCount_Fraction
                        // if ( opacity < _PROTEIN_MIN_OPACITY ) {
                        //     opacity = _PROTEIN_MIN_OPACITY // Min Opacity
                        // }
                    }

                    // let opacityString: string = undefined
                    //
                    // if ( opacity === 1 ) {
                    //     opacityString = opacity.toString()
                    // } else {
                    //     opacityString = opacity.toFixed( 3 )
                    // }

                    const element = (
                        <React.Fragment
                            key={ proteinSequenceCoverage_Position.start_Position }
                        >
                            <rect
                                x={ x }
                                y={ y }
                                width={ width }
                                height={ height }
                                fill={ fillColor }
                                // opacity={ opacityString }
                            />
                        </React.Fragment>
                    )

                    proteinCoverage_Rects_Elements_Array.push( element )
                }
            }

            const trypsin_CutPoints_For_ProteinSequence_Elements_Array: Array<React.JSX.Element> = []

            if ( this.props.proteinSequence_Bar_Widget_StateObject.get_show_TrypsinCutPoints()
                && this.props.trypsin_CutPoints_For_ProteinSequence_Set ) {

                /**
                 * trypsin_CutPoints_For_ProteinSequence_Set: undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
                 */
                const trypsin_CutPoints_For_ProteinSequence_Set = this.props.trypsin_CutPoints_For_ProteinSequence_Set

                const width_Per_ProteinPosition = _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject )

                const proteinLength = this.props.proteinSequenceString.length

                for ( let proteinPosition = 1; proteinPosition <= proteinLength; proteinPosition++ ) {

                    const proteinPosition_CenterAfter = proteinPosition + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions

                    if ( trypsin_CutPoints_For_ProteinSequence_Set.has( proteinPosition_CenterAfter ) ) {

                        //  Have trypsin cut point so render


                        const x =
                            ( ( proteinPosition ) * width_Per_ProteinPosition ) +
                            _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH +
                            _OFFSET_FROM_LEFT_AND_RIGHT_EDGE

                        const y1 = ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + this.props.top_Of_Section__Protein_Bar
                        const y2 = y1 + ( _PROTEIN_BAR__HEIGHT )

                        const element = (
                            <line
                                key={ proteinPosition }
                                x1={ x }
                                y1={ y1 }
                                x2={ x }
                                y2={ y2 }
                                stroke={ _STANDARD_COLOR__TRYPSIN_CUT_POINTS }
                                strokeWidth={ 1 }
                                opacity={ _TRYPSIN_CUT_POINTS__OPACITY }
                            />
                        )

                        trypsin_CutPoints_For_ProteinSequence_Elements_Array.push( element )
                    }
                }
            }

            return (

                <>

                    { proteinCoverage_Rects_Elements_Array }

                    { trypsin_CutPoints_For_ProteinSequence_Elements_Array }

                    {/*  <rect> on top for Tooltip and Click Handler  */ }

                    <ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component

                        top_Of_Section__Protein_Bar={ this.props.top_Of_Section__Protein_Bar }

                        anyFilter__HasFilterValue={ this.props.anyFilter__HasFilterValue }

                        proteinSequence_Bar_Widget_StateObject={ this.props.proteinSequence_Bar_Widget_StateObject }
                        proteinSequenceWidget_StateObject={ this.props.proteinSequenceWidget_StateObject }
                        proteinSequenceString={ this.props.proteinSequenceString }

                        mainData_Computed_For_ComponentsInThisFile_Root_Result={ this.props.mainData_Computed_For_ComponentsInThisFile_Root_Result }

                        trypsin_CutPoints_For_ProteinSequence_Set={ this.props.trypsin_CutPoints_For_ProteinSequence_Set }

                        updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ () => {

                            // this.forceUpdate()

                            window.setTimeout( () => {
                                try {

                                    this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()

                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            }, 10 )
                        } }
                    />
                </>

            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

}


/**
 *
 */
interface ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component_Props {

    top_Of_Section__Protein_Bar: number

    anyFilter__HasFilterValue: boolean

    proteinSequence_Bar_Widget_StateObject: ProteinSequence_Bar_Widget_StateObject

    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject

    proteinSequenceString: string

    mainData_Computed_For_ComponentsInThisFile_Root_Result: INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root

    /**
     * undefined if proteinSequence is too short, else Set of positions plus '0.5' since between the positions
     */
    trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback: () => void;
}

interface ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component_State {

    _placeholder?: unknown
}

/**
 *
 */
class ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component extends React.Component<ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component_Props, ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component_State> {

    //  bind to 'this' for passing as parameters
    private _tooltipContents_FunctionComponent_BindThis = this._tooltipContents_FunctionComponent.bind( this )

    private _proteinBar_MouseMove_EventHandler_BindThis = this._proteinBar_MouseMove_EventHandler.bind( this );

    private _proteinBar_MouseClick_EventHandler_BindThis = this._proteinBar_MouseClick_EventHandler.bind( this );

    private _mousePointer_ProteinPosition: number = 0

    /**
     *
     */
    constructor( props: ProteinSequence_Bar_WidgetDisplay_ProteinSequenceBar_ONLY__OverlayRect_ForTooltip_And_ClickHandler_Component_Props ) {
        try {
            super( props );

            this.state = {};

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _proteinBar_MouseMove_EventHandler( event: React.MouseEvent<Element, MouseEvent> ) {
        try {
            // Update this._mousePointer_ProteinPosition so that Tooltip updates based on current mouse pointer position

            this._set__this_mousePointer_ProteinPosition__From_MousePosition_InEvent( event )

            this.forceUpdate()

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     */
    private _proteinBar_MouseClick_EventHandler( event: React.MouseEvent<Element, MouseEvent> ) {
        try {

            this._set__this_mousePointer_ProteinPosition__From_MousePosition_InEvent( event )

            let proteinSequencePosition = this._mousePointer_ProteinPosition

            if ( event.ctrlKey || event.metaKey ) {
                //  Invert Selection
                if ( this.props.proteinSequenceWidget_StateObject.has_selectedProteinSequencePosition( { position: proteinSequencePosition } ) ) {
                    this.props.proteinSequenceWidget_StateObject.delete_selectedProteinSequencePosition( { position: proteinSequencePosition } )
                } else {
                    this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition( { position: proteinSequencePosition } )
                }
            } else {
                //  Clear existing selections
                this.props.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions()
                //  Add new Selection
                this.props.proteinSequenceWidget_StateObject.add_selectedProteinSequencePosition( { position: proteinSequencePosition } )
            }

            this.forceUpdate()

            window.setTimeout( () => {
                try {

                    this.props.updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback()

                } catch ( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                    throw e
                }
            }, 10 )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @param event
     *
     * Set this._mousePointer_ProteinPosition
     */
    private _set__this_mousePointer_ProteinPosition__From_MousePosition_InEvent( event: React.MouseEvent<Element, MouseEvent> ) {

        const mouse_X = event.pageX

        // console.warn( "onMouseMove on <rect>. mouse_X: " + mouse_X )

        const targetDOM = event.target

        if ( ! ( targetDOM instanceof SVGElement ) ) {
            const msg = "In _proteinBar_MouseMove_EventHandler: ( ! ( event.target instanceof HTMLElement ) ) "
            console.error( msg + ": event.target: ", event.target )
            throw Error( msg )
        }

        const targetDOM_BoundingClientRect_X = targetDOM.getBoundingClientRect().x

        // console.warn( "onMouseMove on <rect>. targetDOM_BoundingClientRect_X: " + targetDOM_BoundingClientRect_X )

        const rect_X = Math.round( targetDOM_BoundingClientRect_X )

        // console.warn( "onMouseMove on <rect>. rect_X: " + rect_X )

        const scrollX = window.scrollX

        // console.warn( "onMouseMove on <rect>. scrollX: " + scrollX )

        const x_Offset = mouse_X - scrollX - rect_X

        // console.warn( "onMouseMove on <rect>. x_Offset: " + x_Offset )

        let mousePointer_ProteinPosition_NewValue = Math.floor( x_Offset / _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) + 1 // '+ 1' since x_Offset is zero based

        if ( mousePointer_ProteinPosition_NewValue < 1 ) {
            mousePointer_ProteinPosition_NewValue = 1
        }
        if ( mousePointer_ProteinPosition_NewValue > this.props.proteinSequenceString.length ) {
            mousePointer_ProteinPosition_NewValue = this.props.proteinSequenceString.length
        }

        // console.warn( "onMouseMove on <rect>. new this._mousePointer_ProteinPosition: " + mousePointer_ProteinPosition_NewValue )

        // const mousePointer_ProteinPosition_Difference = Math.abs( this._mousePointer_ProteinPosition - mousePointer_ProteinPosition_NewValue )
        //
        // if ( mousePointer_ProteinPosition_Difference > 3 ) {
        //
        //     console.warn( "onMouseMove on <rect>. new mousePointer_ProteinPosition_Difference: " + mousePointer_ProteinPosition_Difference + " <----" )
        // }

        this._mousePointer_ProteinPosition = mousePointer_ProteinPosition_NewValue
    }

    ///////////////////

    /**
     *
     */
    render() {
        try {

            const TooltipContents_FunctionComponent = this._tooltipContents_FunctionComponent_BindThis

            return (

                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={
                        <TooltipContents_FunctionComponent/>
                    }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <rect
                        opacity={ 0 }
                        // fill={ _COLOR_PROTEIN_BAR__POSITIONS__NO_COVERAGE_EVER__FILL }
                        x={ _OFFSET_FROM_LEFT_AND_RIGHT_EDGE + _STANDARD__LABELS_ON_LEFT_TOTAL_WIDTH }
                        y={ ( _PROTEIN_BLOCK_BORDER_WIDTH_STROKE_WIDTH * 2 ) + this.props.top_Of_Section__Protein_Bar }
                        width={ ( this.props.proteinSequenceString.length * _compute_Width_Per_ProteinPosition( this.props.proteinSequence_Bar_Widget_StateObject ) ) }
                        height={ _PROTEIN_BAR__HEIGHT }
                        onMouseMove={ this._proteinBar_MouseMove_EventHandler_BindThis }
                        onClick={ this._proteinBar_MouseClick_EventHandler_BindThis }
                    />
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
            )

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    private _tooltipContents_FunctionComponent() {

        const proteinSequence = this.props.proteinSequenceString

        var sequencePositionZeroBased = this._mousePointer_ProteinPosition - 1; //  subtract 1 for indexing since charAt starts at zero

        let psmCount_All_At_ProteinPosition: number = undefined
        let psmCount_PassesAllFilters_At_ProteinPosition: number = undefined

        {
            const proteinSequenceCoverage_Positions = this.props.mainData_Computed_For_ComponentsInThisFile_Root_Result.proteinSequenceCoverage_Positions_Map_Key_ProteinPosition.get( this._mousePointer_ProteinPosition )

            if ( proteinSequenceCoverage_Positions ) {

                psmCount_All_At_ProteinPosition = proteinSequenceCoverage_Positions.psmCount_All

                if ( proteinSequenceCoverage_Positions.passes_All_Filters ) {
                    psmCount_PassesAllFilters_At_ProteinPosition = proteinSequenceCoverage_Positions.psmCount_PassesAllFilters
                }
            }
        }

        const svgWidth = 190
        const svgHeight = 26
        const borderWidth = 1
        const borderColor = "red"

        const tooltip_ResidueLetters_AND_TrypsinCutPointLines_Elements = _create_Tooltip_ResidueLetters_AND_TrypsinCutPointLines_Elements({
            proteinSequence, sequencePositionZeroBased,
            trypsin_CutPoints_For_ProteinSequence_Set: this.props.trypsin_CutPoints_For_ProteinSequence_Set,
            svgWidth
        })

        return (
            <div>
                <div style={ { marginTop: 4 } }>

                    <div
                        style={ {
                            marginLeft: "auto", marginRight: "auto", width: "min-content",
                        } }
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

                            { tooltip_ResidueLetters_AND_TrypsinCutPointLines_Elements }

                        </svg>
                    </div>
                </div>

                <div style={ { marginTop: 10 } }>

                    <div style={ { textAlign: "center" } }>
                        Protein position: { this._mousePointer_ProteinPosition.toLocaleString() }
                    </div>

                    { psmCount_All_At_ProteinPosition ? (
                        <div style={ { textAlign: "center", marginTop: 10 } }>
                            <span>PSM Count: </span>
                            <span>
                                { psmCount_All_At_ProteinPosition.toLocaleString() }
                            </span>
                        </div>
                    ) : null }

                    { this.props.anyFilter__HasFilterValue && psmCount_PassesAllFilters_At_ProteinPosition ? (
                        <div style={ { textAlign: "center", marginTop: 10 } }>
                            <span>Filtered PSM count: </span>
                            <span style={ { color: _STANDARD_COLOR__PSM_COUNTS_MODIFICATION_MASSES_THAT_PASS_ALL_FILTERS } }>
                                { psmCount_PassesAllFilters_At_ProteinPosition.toLocaleString() }
                            </span>
                        </div>
                    ) : null }

                    <div style={ { marginTop: 10 } }>

                        <div>
                            Click to filter only on this position
                        </div>
                        <div>
                            Control/Command Click to toggle filter on this position
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

/**
 *
 * @param sequencePositionZeroBased
 * @param proteinSequence
 * @param svgWidth
 */
const _create_Tooltip_ResidueLetters_AND_TrypsinCutPointLines_Elements = function (
    {
        sequencePositionZeroBased, proteinSequence,
        trypsin_CutPoints_For_ProteinSequence_Set,
        svgWidth
    } : {
        sequencePositionZeroBased: number
        proteinSequence: string
        trypsin_CutPoints_For_ProteinSequence_Set: Set<number>
        svgWidth: number
    }) : Array<React.JSX.Element> {

    const elementArray_Result: Array<React.JSX.Element> = []

    const fontSize_MiddleCharacter = 24
    const x_MiddleCharacter = svgWidth / 2
    const y_MiddleCharacter = 20


    {
        //* !!!   sequence letter at position !!!!

        const sequenceAtPosition = proteinSequence.charAt( ( sequencePositionZeroBased ) );

        const element = (

            <React.Fragment
                key="Middle Residue"
            >
                <text
                    x={ x_MiddleCharacter }
                    y={ y_MiddleCharacter }
                    textAnchor="middle"
                >
                    <tspan style={ { fontSize: fontSize_MiddleCharacter } }>{ sequenceAtPosition }</tspan>
                </text>
            </React.Fragment>
        )
        elementArray_Result.push( element )
    }

    ////////   Residue Letters

    //  Compute Left Side Residue Letters
    _create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight({
        computeLeft: true,
        elementArray_Result,  // Updated
        sequencePositionZeroBased, proteinSequence, fontSize_MiddleCharacter, x_MiddleCharacter, y_MiddleCharacter
    })

    //  Compute Right Side Residue Letters
    _create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight({
        computeLeft: false,
        elementArray_Result,  // Updated
        sequencePositionZeroBased, proteinSequence, fontSize_MiddleCharacter, x_MiddleCharacter, y_MiddleCharacter
    })

    {      ////////   Trypsin Cut Point Lines

        {  //  Compute Left Side Trypsin Cut Point Lines

            //  Compute Left Side Trypsin Cut Point Lines
            _create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight( {
                computeLeft: true,
                elementArray_Result,  // Updated
                sequencePositionZeroBased,
                proteinSequence,
                x_MiddleCharacter,
                y_MiddleCharacter_Baseline: y_MiddleCharacter,
                trypsin_CutPoints_For_ProteinSequence_Set
            } )
        }

        {  //  Compute Right Side Trypsin Cut Point Lines
            _create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight( {
                computeLeft: false,
                elementArray_Result,  // Updated
                sequencePositionZeroBased,
                proteinSequence,
                x_MiddleCharacter,
                y_MiddleCharacter_Baseline: y_MiddleCharacter,
                trypsin_CutPoints_For_ProteinSequence_Set
            } )
        }
    }

    return elementArray_Result
}

/**
 *
 */
const _create_Tooltip_ResidueLetters_Elements__ComputeLeftOrRight = (
    {
        computeLeft,
        elementArray_Result,
        sequencePositionZeroBased, proteinSequence,
        fontSize_MiddleCharacter, y_MiddleCharacter, x_MiddleCharacter
    } : {
        computeLeft: boolean /* false then compute right */

        /**
         * Updated
         */
        elementArray_Result: Array<React.JSX.Element>

        sequencePositionZeroBased: number
        proteinSequence: string

        fontSize_MiddleCharacter: number
        x_MiddleCharacter: number
        y_MiddleCharacter: number

    }) : void => {


    let x = x_MiddleCharacter
    let y = y_MiddleCharacter
    let fontSize = fontSize_MiddleCharacter

    //  Compute Residue Letters for the Left or Right side
    for ( let index = 0; index < _positionTooltip_ResidueLetters_EachSide_Formatting.length; index++ ) {

        const entry = _positionTooltip_ResidueLetters_EachSide_Formatting[ index ]

        let sequencePositionZeroBased_For_ThisResidue: number = undefined

        let offset_Multiplier: number = undefined

        if ( computeLeft ) {

            sequencePositionZeroBased_For_ThisResidue = sequencePositionZeroBased - ( index + 1 )
            offset_Multiplier = -1

            if ( sequencePositionZeroBased_For_ThisResidue < 0 ) {
                //  Outside of sequence range so skip
                return  // EARLY RETURN
            }
        } else {
            sequencePositionZeroBased_For_ThisResidue = sequencePositionZeroBased + ( index + 1 )

            offset_Multiplier = 1

            if ( sequencePositionZeroBased_For_ThisResidue >= proteinSequence.length ) {
                //  Outside of sequence range so return
                return  // EARLY RETURN
            }
        }

        x = x + ( entry.x_offset_From_PrevPosition_OR_CenterPosition * offset_Multiplier )
        y = y + entry.y_offset_From_PrevPosition_OR_CenterPosition
        fontSize = fontSize + entry.fontSize_Offset_From_PrevPosition_OR_CenterPosition

        const residueLetter_At_This_Position = proteinSequence.charAt( sequencePositionZeroBased_For_ThisResidue )

        let key = "right"
        if ( computeLeft ) {
            key = "left"
        }
        key += "_residue_letter_" + index

        const element = (
            <React.Fragment
                key={ key }
            >
                <text
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
const _create_Tooltip_TrypsinCutPoints_Elements__ComputeLeftOrRight = (
    {
        computeLeft,
        elementArray_Result,
        sequencePositionZeroBased, proteinSequence,
        x_MiddleCharacter, y_MiddleCharacter_Baseline,
        trypsin_CutPoints_For_ProteinSequence_Set
    } : {
        computeLeft: boolean /* false then compute right */

        /**
         * Updated
         */
        elementArray_Result: Array<React.JSX.Element>

        sequencePositionZeroBased: number
        proteinSequence: string

        x_MiddleCharacter: number

        /**
         * Baseline of middle character
         */
        y_MiddleCharacter_Baseline: number

        trypsin_CutPoints_For_ProteinSequence_Set: Set<number>

    }) : void => {

    let x1_x2 = x_MiddleCharacter
    let y2 = y_MiddleCharacter_Baseline
    let lineLength = 0

    //  Compute Trypsin Cut Point Lines for the left or right side
    for ( let index = 0; index < _positionTooltip_TrypsinCutPointLines_EachSide_Formatting.length; index++ ) {

        const entry = _positionTooltip_TrypsinCutPointLines_EachSide_Formatting[ index ]

        let sequencePositionZeroBased_For_ThisResidue: number = undefined

        let offset_Multiplier: number = undefined

        if ( computeLeft ) {

            sequencePositionZeroBased_For_ThisResidue = sequencePositionZeroBased - index - 1 // '- index' Subtract to move to the left.  '- 1' to use position on left side of cut point
            offset_Multiplier = -1

            if ( sequencePositionZeroBased_For_ThisResidue < 0 ) {
                //  Outside of sequence range so skip
                return  // EARLY RETURN
            }
        } else {
            sequencePositionZeroBased_For_ThisResidue = sequencePositionZeroBased + index  // '+ index' Add to move to the right

            offset_Multiplier = 1

            if ( sequencePositionZeroBased_For_ThisResidue >= proteinSequence.length ) {
                //  Outside of sequence range so return
                return  // EARLY RETURN
            }
        }

        x1_x2 = x1_x2 + ( entry.x_Offset_From_PrevLine_Position_OR_MiddleCharacter * offset_Multiplier )
        y2 = y2 + entry.y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline
        lineLength = lineLength + entry.lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength

        const y1 = y2 - lineLength

        //  Check here after update the above values for this position ('x1_x2', 'y2', 'lineLength') so they are the correct value for later positions since they are computed from the previous position.

        //  '+ 1' since the value in the set is ONE based AND then ADD the '...AddForCenter...' value of 0.5
        if ( ! trypsin_CutPoints_For_ProteinSequence_Set.has( ( sequencePositionZeroBased_For_ThisResidue + 1 ) + trypsin_CutPointsForSequence_Compute_Constant__AddForCenterBetweenPositions ) ) {
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

//  WAS  Font size smallest is -15 from middle, -6 from first from center to last from center

// /**
//  * All are offsets.  Negative if next value is smaller (Except for 'x_Offset...')
//  */
// const _positionTooltip_ResidueLetters_EachSide_Formatting: Array<INTERNAL__PositionTooltip_ResidueLetters_Entry> =[
//     {
//         x_offset_From_PrevPosition_OR_CenterPosition: 18,
//         y_offset_From_PrevPosition_OR_CenterPosition: -3,
//         fontSize_Offset_From_PrevPosition_OR_CenterPosition: -9,
//     }, {
//         x_offset_From_PrevPosition_OR_CenterPosition: 14,
//         y_offset_From_PrevPosition_OR_CenterPosition: -1,
//         fontSize_Offset_From_PrevPosition_OR_CenterPosition: -4,
//     }, {
//         x_offset_From_PrevPosition_OR_CenterPosition: 12,
//         y_offset_From_PrevPosition_OR_CenterPosition: -1,
//         fontSize_Offset_From_PrevPosition_OR_CenterPosition: -2,
//     }
// ] as const

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

//  WAS  Shortest line 14
// /**
//  * All are offsets.  Negative if next value is smaller (Except for 'x_Offset...')
//  */
// const _positionTooltip_TrypsinCutPointLines_EachSide_Formatting: Array<INTERNAL__PositionTooltip_TrypsinCutPointLines_Entry> =[
//     {
//         x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 10,
//         y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: 2,
//         lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: 22
//     }, {
//         x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 16,
//         y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -2,
//         lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -4
//     }, {
//         x_Offset_From_PrevLine_Position_OR_MiddleCharacter: 12,
//         y2_Offset_From_PrevLine_Position_OR__y_MiddleCharacter_Baseline: -2,
//         lineLength_Offset_PrevLine_Position_OR__Zero_For_FirstLine_LineLength: -4
//     }
// ] as const

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

        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses

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
                promises.push( promise );
            } else {
                throw Error( "get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result NO data or promise" )
            }
        }
        {
            const get_numPsmsForReportedPeptideIdMap_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap()

            if ( get_numPsmsForReportedPeptideIdMap_Result.data ) {
                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap )
            } else if ( get_numPsmsForReportedPeptideIdMap_Result.promise ) {
                const promise = new Promise<void>( ( resolve, reject ) => {
                    try {
                        get_numPsmsForReportedPeptideIdMap_Result.promise.catch( reason => {
                            reject( reason )
                        } )
                        get_numPsmsForReportedPeptideIdMap_Result.promise.then( value => {
                            try {
                                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set( projectSearchId, value.numPsmsForReportedPeptideIdMap )
                                resolve();
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
                promises.push( promise );
            } else {
                throw Error( "get_numPsmsForReportedPeptideIdMap_Result NO data or promise" )
            }
        }
        {
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( ( resolve, reject ) => {
                    try {
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch( reason => {
                            reject( reason )
                        } )
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then( value => {
                            try {
                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
                                resolve();
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
                promises.push( promise );
            } else {
                throw Error( "get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result NO data or promise" )
            }
        }
        if ( common_Flags_SingleSearch_ForProjectSearchId.anyPsmHas_OpenModifications ) {

            {
                const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().get_OpenModifications_On_PSMHolder_AllForSearch()

                if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder )
                } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( ( resolve, reject ) => {
                        try {
                            get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch( reason => {
                                reject( reason )
                            } )
                            get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then( value => {
                                try {
                                    openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder )
                                    resolve();
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
                    promises.push( promise );
                } else {
                    throw Error( "get_OpenModifications_On_PSMHolder_AllForSearch_Result NO data or promise" )
                }
            }
            {
                const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( ( resolve, reject ) => {
                        try {
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch( reason => {
                                reject( reason )
                            } )
                            get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then( value => {
                                try {
                                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder )
                                    resolve();
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
                    promises.push( promise );
                } else {
                    throw Error( "get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result NO data or promise" )
                }
            }
        }
    }

    if ( promises.length === 0 ) {

        return {
            promise: undefined, data: _compute_INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root__After_LoadData( {
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
            } )
        }
    }

    const promisesAll = Promise.all( promises )

    return {
        data: undefined,
        promise: new Promise<INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root>( ( resolve, reject ) => {
            try {

                promisesAll.catch( reason => reject( reason ) )
                promisesAll.then( novalue => {
                    try {

                        const result = _compute_INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root__After_LoadData( {
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
                        } )

                        resolve( result )

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
    }: {
        anyFilter__HasFilterValue: boolean

        add_open_modifications_unlocalized_in_all_peptide_positions: boolean

        show_only_modifications_filtered_on__excluding_static: boolean

        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: boolean
        scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: number

        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        proteinSequence_Length: number
        projectSearchIds: Array<number>
        proteinSequenceVersionId: number

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        proteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder>
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder>
    }
): INTERNAL__MainData_Computed_For_ComponentsInThisFile_Root {

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

            // anyFilter__HasFilterValue: boolean
            //
            // add_open_modifications_unlocalized_in_all_peptide_positions: boolean
            //
            // show_only_modifications_filtered_on__excluding_static: boolean
            //
            // scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox: boolean
            // scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count__MaxPsmCount: number
            //
            // modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;  // Used for filtering modification masses


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

                        modifications_Entry_At_ProteinPosition.modifications_Passes_PSM_Etc_Filters.variableModification_Masses.add( mass )

                        if ( reportedPeptideId_AndIts_PSM_IDs_ENTRY__From_Filtered_ReportedPeptideIds_AndTheir_PsmIds ) {

                            modifications_Entry_At_ProteinPosition.modifications_Passes_ALL_Filters.variableModification_Masses.add( mass )
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

                peptidePositions_SingleEntry_FromMap = new INTERNAL__PeptidePositions_SingleEntry_InRow( {
                    start_Position: proteinCoverage_Entry.proteinStartPosition,
                    end_Position: proteinCoverage_Entry.proteinEndPosition,
                    peptideLength: proteinCoverage_Entry.proteinEndPosition - proteinCoverage_Entry.proteinStartPosition + 1,  // ' + 1 ' since End Position is last position of peptide NOT position after last position of peptide like many things 'end' function like substring
                    proteinCoverage_Entry_reportedPeptideId_IN_reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId
                } )

                peptidePositions_SingleEntry_AllUnique_Start_End_Map_Key_StartEnd_String.set( protein_Start_End_Positions_As_DelimitedString_For_MapKey, peptidePositions_SingleEntry_FromMap )
            }

            {  //  Add to 'All Data' for Peptides

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( proteinCoverage_Entry.reportedPeptideId )
                if ( numPsmsForReportedPeptideId === undefined ) {
                    const msg = "numPsmsForReportedPeptideIdMap.get( proteinCoverage_Entry.reportedPeptideId ) returned undefined for proteinCoverage_Entry.reportedPeptideId: " + proteinCoverage_Entry.reportedPeptideId
                    console.warn( msg )
                    throw Error( msg )
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
                        console.warn( msg )
                        throw Error( msg )
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

    if ( scale_ProteinCoverage_ThatMeets_AllFilters_By_PSM_Count_UserSelection_Checkbox ) {

        //   Compute PSM Count Fraction and assign to each entry

        let max_PsmCount__PassesAllFilters = 0

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

            entry.psmCount_PassesAllFilters_Fraction = entry.psmCount_PassesAllFilters / max_PsmCount__PassesAllFilters

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
        modifications_Map_Key_ProteinPosition
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

    private _fakeForceCallContructor() {
    }
}


/**
 *
 */
class INTERNAL__Modifications_At_Single_Protein_Position_SingleEntry_Passes_ALL_Filters_OR_Passes_ONLY_PSM_Etc {

    readonly variableModification_Masses: Set<number>
    readonly openModifications_Masses_RoundToWholeNumber: Set<number>

    constructor() {
        this.variableModification_Masses = new Set()
        this.openModifications_Masses_RoundToWholeNumber = new Set()
    }

    hasAny_Modifications() {

        if ( this.variableModification_Masses.size > 0 || this.openModifications_Masses_RoundToWholeNumber.size > 0 ) {

            return true
        }

        return false
    }

    private _fakeForceCallContructor() {
    }
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
        }: {
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

    private _fakeForceCallContructor() {
    }
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

    private _fakeForceCallContructor() {
    }
}


////////
