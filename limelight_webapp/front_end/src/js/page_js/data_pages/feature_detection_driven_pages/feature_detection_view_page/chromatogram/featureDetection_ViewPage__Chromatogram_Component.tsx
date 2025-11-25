/**
 * featureDetection_ViewPage__Chromatogram_Component.tsx
 *
 *
 * 'console.log' is commented out
 */

import React from 'react'

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";

//  Use to get Typescript typings, but then switch since it does NOT build with this import
// import Plotly from "plotly.js"

//  Plotly ONLY imports successfully for a Build using this import
import Plotly from "plotly.js-dist-min";
import { Layout } from "plotly.js-dist-min";


import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { C13_MASS_DELTA, PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";
import { smoothLowess, smoothSavitzkyGolay } from "page_js/data_pages/peptide_mass_utils/SmoothingUtils";
import { commonData_LoadedFromServer_From_ProjectScanFileId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectScanFileId_ReturnPromise } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectScanFileId";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber,
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import { CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Scan_Summary_Data";
import { CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";

import {
    CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";
import { CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import { ScanFilenameId_On_PSM_Filter_UserSelection_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import {
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches";
import {
    reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";
import {
    modificationMass_CommonRounding_ReturnString
} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {
    featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects,
    FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects";
import {
    FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,
    FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_GetData_ForDataTable";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";


const _CHART_WIDTH = 800
const _CHART_HEIGHT = 600


//   !!!  IMPORTANT:  The number of elements in '_ISOTOPE_PLOT_TRACE_COLORS' MUST be equal to '_ISOTOPE_MAX__FOR_CHART_TRACES + 1'

//    !!!   NUMBER OF ISOTOPES to DISPLAY
const _ISOTOPE_MAX__FOR_CHART_TRACES = 3  //  Show Lines in Plot for 'Monoisotopic' and then +1, +2, ... Up To Isotope Max

const _ISOTOPE_PLOT_TRACE_COLORS = [
    "UNUSED",  // Start with "UNUSED" since isotope numbers start at 1
    "rgb(255, 127, 14)",
    "rgb(44, 160, 44)",
    "#3BB2C4"
]

{
    if ( ( _ISOTOPE_MAX__FOR_CHART_TRACES + 1 ) !== _ISOTOPE_PLOT_TRACE_COLORS.length ) {
        const msg = "The number of elements in '_ISOTOPE_PLOT_TRACE_COLORS' MUST be equal to '_ISOTOPE_MAX__FOR_CHART_TRACES + 1'"
        console.warn( msg )
        window.alert(msg)
        throw Error(msg)
    }
}

const _PADDING_TOP_ABOVE_HELP_SYMBOL = 3

const _MARGIN_LEFT_AFTER_HELP_SYMBOL = 3

const _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY = 4

const _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY = 4

const _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY = 2

const _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT = 1;

const _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT__POW_10 = Math.pow( 10, _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT );

const _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Minutes_ExtendRange_AddSubtract_ToMinMaxValues = 0.5;  //   30 seconds
const _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues = 25;

const _MAX_GET_SCAN_DATA_WITH_PEAKS_PARALLEL_BATCH_SIZE = 3;  //  The common Webservice call code has a max parallel call so anything larger than that will just queue there which isn't good.

const _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues = [
    10,
    _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues  // MUST include _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues as LAST and Max value
]

{ //  Sort and validate _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues

    if ( ! ( _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length > 0 ) ) {
        const msg = "( ! ( _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length > 0 ) )"
        console.warn(msg)
        throw Error(msg)
    }
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace( _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues )
    if ( _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues[ _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.length - 1 ] != _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues ) {
        const msg = "Max value of _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues is NOT _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.  Required for correct get data from server"
        console.warn(msg)
        throw Error(msg)
    }
}

let maxScanDataWithPeaksReturnCount__FromServer: number  // Will be retrieved at start of each get Data for ProjectScanFileId

enum PlotType_IonCurrent_VS_Ions_Select_Enum {
    ION_CURRENT = "ION_CURRENT",
    IONS = "IONS"
}

const _plotType_IonCurrent_VS_Ions_Select_DEFAULT = PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT  //  Set to default of ION_CURRENT

enum ScanPeakSelect_Enum {
    MAX_PEAK_INTENSITY = "MAX_PEAK_INTENSITY",
    PEAK_MZ_CENTER_OF_MZ_RANGE = "PEAK_MZ_CENTER_OF_MZ_RANGE"
}

const _scanPeakSelect_DEFAULT = ScanPeakSelect_Enum.MAX_PEAK_INTENSITY  //  Set to default of MAX_PEAK_INTENSITY

enum SmoothingOption_Enum {
    NONE = "NONE",
    LOWESS = "LOWESS",
    SAVITZKY_GOLAY = "SAVITZKY_GOLAY"
}

const _smoothingOption_Selection_DEFAULT = SmoothingOption_Enum.SAVITZKY_GOLAY;




enum ChartCreate__IonCurrent__IonCount__Enum {
    ION_CURRENT = "ION_CURRENT",
    ION_COUNT = "ION_COUNT"
}




//////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////    !!!   MAIN COMPONENT

//////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export class FeatureDetection_ViewPage__Chromatogram_Component_Params {

    feature_detection_root__project_scnfl_mapping_tbl__id: number
    projectScanFileId: number

    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
    commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT

    //  When have Searches these will be populated

    projectSearchIds: Array<number>

    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject  // Populated with Search Scan File Ids for Project Scan File Id

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    //  Main Filtering object
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    searchDataLookupParamsRoot : SearchDataLookupParameters_Root

    /**
     * Store data from server
     */
    dataPageStateManager_DataFrom_Server: DataPageStateManager
}

/**
 *
 */
interface FeatureDetection_ViewPage__Chromatogram_Component_Props {

    feature_detection_root__project_scnfl_mapping_tbl__id: number
    featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params
    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results
    featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results
    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
}

/**
 *
 */
interface FeatureDetection_ViewPage__Chromatogram_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class FeatureDetection_ViewPage__Chromatogram_Component extends React.Component< FeatureDetection_ViewPage__Chromatogram_Component_Props, FeatureDetection_ViewPage__Chromatogram_Component_State > {

    private _DO_NOT_CALL() { //  Test Cast of method
    }

    private _triggerPlotUpdate_Object: object = {}

    private _loadingInitialChromatogram = true

    private _show_Show_Chromatogram_Button = true

    private _show_LoadingData_Message = false
    private _show_Loading_PSM_Data_Message = false  // Change Loading message when specifically loading PSM data for search

    private _loadingData_ScanNumberCount: { totalCount: number, currentCount: number }
    private _show_LoadingData_ERROR_Message = false

    private _show_NO_MS_1_Scans_ForScanFile = false

    private _showUpdatingMessage = false

    //   Initially loaded data


    private _featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

    private _reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    private _psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>

    private _scanData_NO_Peaks_Data_Holder__ALL_SCANS: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder


    private _dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId: Map<number, Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId> = new Map()
    private _dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId

    private _dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId: Map<number, Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId> = new Map()
    private _dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId

    private _dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId: Map<number, Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId> = new Map()
    private _dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId

    private _scanPeakSelect: ScanPeakSelect_Enum = _scanPeakSelect_DEFAULT  //  Requires Same Default in the Scan Peak Select Component  Internal__RetentionTime_Min_Max_UserEditable_Component

    private _plotType_IonCurrent_VS_Ions_Select: PlotType_IonCurrent_VS_Ions_Select_Enum = _plotType_IonCurrent_VS_Ions_Select_DEFAULT  //  Requires Same Default in the Internal Component with radio buttons

    private _smoothingOption_Selection: SmoothingOption_Enum = _smoothingOption_Selection_DEFAULT  //  Requires Same Default in the Smoothing Select Component  Internal__SmoothingSelection_Component


    //  Set default. Requires Same Default in the Component Internal__MS1_Window_Size_Selection_Component
    private _precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues

    private _retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max: Internal__RetentionTimeMinutes_Range_Min_Max

    //  Pass to Component to create chart

    private _retentionTime_Minutes_Range_ForChart_Min_Max: Internal__RetentionTimeMinutes_Range_Min_Max

    private _retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues: Internal__RetentionTimeMinutes_Range_Min_Max

    private _retentionTime_Minutes_Range_ForChart_Min_Max__Reset_To_Previous: boolean

    private _force_SetTo_ValueFromParent__FOR__Internal__RetentionTime_Min_Max_UserEditable_Component: object

    private _show__Plot_Ion_Count_Option_Div = false

    private _currentSelection_ObjectReference: object

    /**
     *
     */
    constructor(props : FeatureDetection_ViewPage__Chromatogram_Component_Props) {
        super( props );

        if ( props.featureDetection_ViewPage__Chromatogram_Component_Params ) {

            this._computeFromProps( props )
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<FeatureDetection_ViewPage__Chromatogram_Component_Props>, prevState: Readonly<FeatureDetection_ViewPage__Chromatogram_Component_State>, snapshot?: any ) {
        try {
            if ( this.props.featureDetection_ViewPage__Chromatogram_Component_Params ) {
                if ( prevProps.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter !== this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter
                    || prevProps.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results !== this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results ) {

                    //  Reset

                    this._show__Plot_Ion_Count_Option_Div = false

                    this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId = new Map()
                    this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = undefined

                    this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId = new Map()
                    this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = undefined

                    this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId = new Map()
                    this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = undefined


                    this._computeFromProps( this.props )

                    this._currentSelection_ObjectReference = {}

                    this._displayChromatogram({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })
                }
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _computeFromProps( props : FeatureDetection_ViewPage__Chromatogram_Component_Props ) {

        const retentionTime_Minutes_Range_ForChart_Min =
            _compute_RT_Minutes_FloorCeil_FromMinutes_Apply_Math_floor_or_ceil_To_NumberOfDecimalPlaces(
                ( this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.retentionTimeRange_Start -
                    _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Minutes_ExtendRange_AddSubtract_ToMinMaxValues ) ,
                INTERNAL__MATH_FLOOR_CEIL.FLOOR )

        const retentionTime_Minutes_Range_ForChart_Max =
            _compute_RT_Minutes_FloorCeil_FromMinutes_Apply_Math_floor_or_ceil_To_NumberOfDecimalPlaces(
                ( this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.retentionTimeRange_End +
                    _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Minutes_ExtendRange_AddSubtract_ToMinMaxValues ) ,
                INTERNAL__MATH_FLOOR_CEIL.CEIL )

        this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max = {
            retentionTime_Minutes_Range_Min: retentionTime_Minutes_Range_ForChart_Min, retentionTime_Minutes_Range_Max: retentionTime_Minutes_Range_ForChart_Max
        }

        this._retentionTime_Minutes_Range_ForChart_Min_Max = this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max

        this._currentSelection_ObjectReference = {}
    }

    /**
     *  Cancel Chromatogram
     */
    private _clickOn_Button_Cancel_Chromatogram_Button() {
        try {
            this._currentSelection_ObjectReference = {}

            this._loadingData_ScanNumberCount = null

            this._loadingInitialChromatogram = true

            this._show_Show_Chromatogram_Button = true

            this.setState({ forceRerenderObject: {} })

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *  Cancel Loading Data for Updated Chromatogram.
     *
     *  Reset to previous Search Scan File Id or previous Retention Time Range
     */
    private _clickOn_Button_Cancel_LoadingData_Button() {

        this._currentSelection_ObjectReference = {}

        this._loadingData_ScanNumberCount = null

        if ( this._retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues ) {

            //  Reset to Previous
            this._retentionTime_Minutes_Range_ForChart_Min_Max = this._retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues

            //  set previous to null
            this._retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues = null

            this._retentionTime_Minutes_Range_ForChart_Min_Max__Reset_To_Previous = true;

            //   Only call when change scan file
            this._displayChromatogram( { currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference } )

        } else {

            const msg = "In _clickOn_Button_Cancel_LoadingData_Button(): this._retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues has no value"
            console.warn(msg)
            throw Error(msg)
        }

        this.setState({ forceRerenderObject: {} })

    }

    /**
     *
     */
    private _clickOn_Button_Chromatogram_Button() {
        try {
            this._currentSelection_ObjectReference = {}

            this._show_Show_Chromatogram_Button = false
            this._show_LoadingData_Message = true;

            if ( this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {
                this._show_Loading_PSM_Data_Message = true
            }

            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => { try {
                const promise_load_InitialDataFromServer = this._load_InitialDataFromServer()

                promise_load_InitialDataFromServer.catch(reason => { try {
                    throw Error("promise_load_InitialDataFromServer.catch: reason: " + reason )
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promise_load_InitialDataFromServer.then(novalue => { try {

                    this._displayChromatogram({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, 10 )
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     * @private
     */
    private _load_InitialDataFromServer() : Promise<void> {

        return new Promise<void>((resolve, reject) => { try {

            const commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT = this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT

            const promises: Array<Promise<void>> = []

            { // featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

                const get_Result =
                    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.
                    get_commonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id().
                    get_CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder({ feature_detection_root__project_scnfl_mapping_tbl__id: this.props.feature_detection_root__project_scnfl_mapping_tbl__id });

                if ( get_Result.data ) {

                    this._featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder = get_Result.data.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder = value.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder() Result no data or promise")
                }
            }


            if ( ! this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {

                //  NO Searches

                this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = undefined

            } else {

                //  Have Searches

                { //  this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

                    const get_Result =
                        this.props.featureDetection_ViewPage__Chromatogram_Component_Params.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds({
                            not_filtered_position_modification_selections : undefined,
                            proteinSequenceVersionId : undefined,
                            searchSubGroup_Ids_Selected : undefined,
                            proteinSequenceWidget_StateObject : undefined,
                            modificationMass_UserSelections_StateObject : undefined,
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : undefined,
                            reporterIonMass_UserSelections_StateObject : undefined,
                            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.featureDetection_ViewPage__Chromatogram_Component_Params.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,  // Filter on select searches Search Scan File Id
                            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : undefined,
                            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: undefined,
                            scan_RetentionTime_MZ_UserSelection_StateObject : undefined,
                            peptideUnique_UserSelection_StateObject : undefined,
                            peptideSequence_UserSelections_StateObject : undefined,
                            userSearchString_LocationsOn_ProteinSequence_Root : undefined,
                            proteinPositionFilter_UserSelections_StateObject : undefined,
                            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: undefined,
                            psm_Charge_Filter_UserSelection_StateObject : undefined,
                            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : undefined,
                            peptideSequence_MissedCleavageCount_UserSelections_StateObject : undefined,
                            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : undefined
                        })


                    if ( get_Result.data ) {

                        this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = get_Result.data.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

                    } else if ( get_Result.promise ) {

                        const promise = new Promise<void>( (resolve, reject) => { try {
                                get_Result.promise.catch( reason =>  { reject(reason)})
                                get_Result.promise.then( value => { try {

                                    this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = value.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

                                    resolve()

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                        )
                        promises.push(promise)
                    } else {
                        throw Error("getReportedPeptideIdsForDisplay_AllProjectSearchIds() Result no data or promise")
                    }
                }

                { //  Per projectSearchId data

                    this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId = new Map()

                    for ( const projectSearchId of this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {

                        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                            this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                            get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)

                        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                            const msg = "this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                            console.warn(msg)
                            throw Error(msg)
                        }


                        { //  this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId

                            const get_Result =
                                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

                            if ( get_Result.data ) {

                                this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )

                            } else if ( get_Result.promise ) {

                                const promise = new Promise<void>( (resolve, reject) => { try {
                                        get_Result.promise.catch( reason =>  { reject(reason)})
                                        get_Result.promise.then( value => { try {

                                            this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )

                                            resolve()

                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                                )
                                promises.push(promise)
                            } else {
                                throw Error("getReportedPeptideIdsForDisplay_AllProjectSearchIds() Result no data or promise")
                            }
                        }
                    }
                }

            }

            { //  this._scanData_NO_Peaks_Data_Holder__ALL_SCANS

                const get_Result =
                    this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                    get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().
                    get_ScanData_NO_Peaks_DataHolder({
                        projectScanFileId: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId,
                        retrieved_ALL_Scans_ForFile: true,
                        scanNumbers_RetrievedDataFor: undefined,
                        get_ParentScanData: undefined
                    })

                if ( get_Result.data ) {

                    this._scanData_NO_Peaks_Data_Holder__ALL_SCANS = get_Result.data.scanData_NO_Peaks_Data_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason) })
                            get_Result.promise.then( value => { try {

                                this._scanData_NO_Peaks_Data_Holder__ALL_SCANS = value.scanData_NO_Peaks_Data_Holder

                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("getReportedPeptideIdsForDisplay_AllProjectSearchIds() Result no data or promise")
                }
            }

            if ( promises.length === 0 ) {

                resolve()

                return  //  EARLY RETURN
            }

            const promiseAll = Promise.all( promises )

            promiseAll.catch(reason => {  reject(reason) })
            promiseAll.then(novalue => { try {

                resolve()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _displayChromatogram(
        {
            currentSelection_ObjectReference_AtStartOf_Request
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
        }
    ) {
        const retentionTime_Minutes_Range_Min__LoadDataForScansFor = this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max.retentionTime_Minutes_Range_Min
        const retentionTime_Minutes_Range_Max__LoadDataForScansFor = this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max.retentionTime_Minutes_Range_Max

        this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId )
        this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId )
        this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId )

        if ( ( ! this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) ||
            ( ! this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.is_Data_FullyLoaded({
                dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId: this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId,
                dataFromServer_Scans_NO_For_Single_ProjectScanFileId: this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
            }) ) ) {

            this._load_Chromatogram_For_Selected_ProjectScanFileId({
                currentSelection_ObjectReference_AtStartOf_Request,

                retentionTime_Minutes_Range_Min__LoadDataForScansFor,
                retentionTime_Minutes_Range_Max__LoadDataForScansFor
            })

            return // EARLY RETURN
        }

        const projectScanFileId_Selected_AtStartOf_LoadRequest = this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId;

        this._load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage({
            currentSelection_ObjectReference_AtStartOf_Request,
            projectScanFileId_Selected_AtStartOf_LoadRequest
        })
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_ProjectScanFileId(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTime_Minutes_Range_Min__LoadDataForScansFor,
            retentionTime_Minutes_Range_Max__LoadDataForScansFor
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTime_Minutes_Range_Min__LoadDataForScansFor: number
            retentionTime_Minutes_Range_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            const projectScanFileId_Selected_AtStartOf_LoadRequest = this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId;

            this._show_Show_Chromatogram_Button = false
            this._show_LoadingData_Message = true;

            if (  this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {
                this._show_Loading_PSM_Data_Message = true
            }

            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => { try {

                if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                    //  No longer current request so exit

                    return; // EARLY RETURN
                }

                this._load_Chromatogram_For_Selected_ProjectScanFileId__CallAfterSetTimeout({
                    projectScanFileId_Selected_AtStartOf_LoadRequest,
                    currentSelection_ObjectReference_AtStartOf_Request,

                    retentionTime_Minutes_Range_Min__LoadDataForScansFor,
                    retentionTime_Minutes_Range_Max__LoadDataForScansFor
                })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_ProjectScanFileId__CallAfterSetTimeout(
        {
            projectScanFileId_Selected_AtStartOf_LoadRequest,
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTime_Minutes_Range_Min__LoadDataForScansFor,
            retentionTime_Minutes_Range_Max__LoadDataForScansFor
        } : {
            projectScanFileId_Selected_AtStartOf_LoadRequest: number
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTime_Minutes_Range_Min__LoadDataForScansFor: number
            retentionTime_Minutes_Range_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            const get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result =
                this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                get_commonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass().
                get_ScanData_Summary_DataHolder_For_ProjectScanFileId(projectScanFileId_Selected_AtStartOf_LoadRequest)

            if ( get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result.data ) {

                const scanData_Summary_Data_For_ProjectScanFileId =
                    get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result.data.commonData_LoadedFromServer__ScanData_Summary_Data_Holder.
                    get_ScanData_Summary_Data_For_ProjectScanFileId(projectScanFileId_Selected_AtStartOf_LoadRequest)

                if ( ! scanData_Summary_Data_For_ProjectScanFileId ) {
                    const msg = "commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder.get_SpectralStorage_Summary_Data_For_ProjectScanFileId(projectScanFileId_Selected_AtStartOf_LoadRequest) returned NOTHING for " + projectScanFileId_Selected_AtStartOf_LoadRequest;
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( this._is_Any_MS_1_Scans_For_ProjectScanFileId__PassIn_SpectralStorage_Summary_Data_For_ProjectScanFileId( scanData_Summary_Data_For_ProjectScanFileId ) ) {

                    this._show_NO_MS_1_Scans_ForScanFile = false;

                    this._load_Chromatogram_For_Selected_ProjectScanFileId__CallAfterSetTimeout__AfterValidate_ProjectScanFileId_Has_MS1_Scans({
                        projectScanFileId_Selected_AtStartOf_LoadRequest,
                        currentSelection_ObjectReference_AtStartOf_Request,
                        retentionTime_Minutes_Range_Min__LoadDataForScansFor,
                        retentionTime_Minutes_Range_Max__LoadDataForScansFor
                    })

                } else {
                    this._show_LoadingData_Message = false
                    this._show_Loading_PSM_Data_Message = false

                    this._loadingInitialChromatogram = false

                    this._show_NO_MS_1_Scans_ForScanFile = true;

                    this.setState({ forceRerenderObject: {} })
                }

            } else if ( get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result.promise ) {

                get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result.promise.catch(reason => {})
                get_ScanData_Summary_DataHolder_For_ProjectScanFileId_Result.promise.then(value_scanData_Summary_Data_For_ProjectScanFileId => { try {

                    if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                        //  No longer current request so exit

                        return; // EARLY RETURN
                    }

                    const scanData_Summary_Data_For_ProjectScanFileId =
                        value_scanData_Summary_Data_For_ProjectScanFileId.commonData_LoadedFromServer__ScanData_Summary_Data_Holder.
                        get_ScanData_Summary_Data_For_ProjectScanFileId(projectScanFileId_Selected_AtStartOf_LoadRequest)

                    if ( ! scanData_Summary_Data_For_ProjectScanFileId ) {
                        const msg = "commonData_LoadedFromServer__ScanData_Summary_Data_Holder.get_SpectralStorage_Summary_Data_For_ProjectScanFileId(projectScanFileId_Selected_AtStartOf_LoadRequest) returned NOTHING for " + projectScanFileId_Selected_AtStartOf_LoadRequest;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    if ( this._is_Any_MS_1_Scans_For_ProjectScanFileId__PassIn_SpectralStorage_Summary_Data_For_ProjectScanFileId( scanData_Summary_Data_For_ProjectScanFileId ) ) {

                        this._show_NO_MS_1_Scans_ForScanFile = false;

                        this._load_Chromatogram_For_Selected_ProjectScanFileId__CallAfterSetTimeout__AfterValidate_ProjectScanFileId_Has_MS1_Scans({
                            projectScanFileId_Selected_AtStartOf_LoadRequest,
                            currentSelection_ObjectReference_AtStartOf_Request,
                            retentionTime_Minutes_Range_Min__LoadDataForScansFor,
                            retentionTime_Minutes_Range_Max__LoadDataForScansFor
                        })

                    } else {

                        this._show_LoadingData_Message = false
                        this._show_Loading_PSM_Data_Message = false
                        this._loadingInitialChromatogram = false

                        this._show_NO_MS_1_Scans_ForScanFile = true;

                        this.setState({ forceRerenderObject: {} })
                    }

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } else {
                const msg = "get_SpectralStorage_Summary_DataHolder_For_ProjectScanFileId_Result  no data or promise"
                console.warn(msg)
                throw Error(msg)
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _is_Any_MS_1_Scans_For_ProjectScanFileId__PassIn_SpectralStorage_Summary_Data_For_ProjectScanFileId(

        scanData_Summary_Data_For_ProjectScanFileId: CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId
    ) : boolean {

        if ( scanData_Summary_Data_For_ProjectScanFileId.scanLevelEntries ) {
            for ( const scanLevel of scanData_Summary_Data_For_ProjectScanFileId.scanLevelEntries ) {
                if ( scanLevel.scanLevel === 1 ) {
                    if ( scanLevel.numberOfScans > 0 ) {

                        return true;
                    }
                }
            }
        }

        return false
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_ProjectScanFileId__CallAfterSetTimeout__AfterValidate_ProjectScanFileId_Has_MS1_Scans(
        {
            projectScanFileId_Selected_AtStartOf_LoadRequest,
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTime_Minutes_Range_Min__LoadDataForScansFor,
            retentionTime_Minutes_Range_Max__LoadDataForScansFor
        } : {
            projectScanFileId_Selected_AtStartOf_LoadRequest: number
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTime_Minutes_Range_Min__LoadDataForScansFor: number
            retentionTime_Minutes_Range_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                //  No longer current request so exit

                return; // EARLY RETURN
            }

            let ms_1_ScanNumbers_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder
            let scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

            const promises: Array<Promise<void>> = []

            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    //  Get MaxScanDataWithPeaksReturnCount every request and Store in module wide variable
                    const promise_Get_MaxScanDataWithPeaksReturnCount =
                        commonData_LoadedFromServer_From_ProjectScanFileId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectScanFileId_ReturnPromise({ projectScanFileId: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId })
                    promise_Get_MaxScanDataWithPeaksReturnCount.catch(reason => {
                        reject(reason)
                    })
                    promise_Get_MaxScanDataWithPeaksReturnCount.then(value_Get_MaxScanDataWithPeaksReturnCount => { try {

                        maxScanDataWithPeaksReturnCount__FromServer = value_Get_MaxScanDataWithPeaksReturnCount.maxScanDataWithPeaksReturnCount // Store in module wide variable

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise)
            }
            { // ms_1_ScanNumbers_Data_Holder

                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise =
                        this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                        get_commonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers().
                        get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise({
                            projectScanFileId: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId,
                            retentionTime_Seconds_Range_Min: retentionTime_Minutes_Range_Min__LoadDataForScansFor * 60,
                            retentionTime_Seconds_Range_Max: retentionTime_Minutes_Range_Max__LoadDataForScansFor * 60
                        })

                    promise_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise.catch(reason => {
                        reject(reason)
                    })
                    promise_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise.then(value_promise_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise => { try {

                        ms_1_ScanNumbers_Data_Holder = value_promise_get_MS_1_ScanNumbers_DataHolder_From_ProjectScanFileId_RetentionTimeRange_ReturnPromise.scanNumbers_Data_Holder

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise)
            }
            {  //  scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures

                const scanNumbers_Get_NonPeaksDataFor_Set: Set<number> = new Set()

                for ( const entry of this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.featureDetection_SingularFeature_Entries_For_PersistentId.values() ) {
                    scanNumbers_Get_NonPeaksDataFor_Set.add( entry.ms_1_scan_number )
                }

                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_ScansNoPeaks =
                        this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                        get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().
                        get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                            projectScanFileId: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId,
                            scanNumbers_RetrievedDataFor: scanNumbers_Get_NonPeaksDataFor_Set,
                            retrieved_ALL_Scans_ForFile: false,
                            get_ParentScanData: true
                        } )

                    promise_ScansNoPeaks.catch(reason => {
                        reject(reason)
                    })
                    promise_ScansNoPeaks.then(value_promise_ScansNoPeaks => { try {

                        scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures = value_promise_ScansNoPeaks.scanData_NO_Peaks_Data_Holder

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise)
            }

            const promises_All = Promise.all( promises );

            promises_All.catch(reason => {
                this._show_LoadingData_Message = false;
                this._show_Loading_PSM_Data_Message = false
                this._show_LoadingData_ERROR_Message = true
                this.setState({ forceRerenderObject: {} })
            })
            promises_All.then(novalue => { try {

                {
                    const dataForChromatogram_For_ProjectScanFileId = new Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId( {
                        data: {
                            projectScanFileId: projectScanFileId_Selected_AtStartOf_LoadRequest,
                            retentionTime_Minutes_Range_Min_Max__LoadingDataFor: {
                                retentionTime_Minutes_Range_Min: retentionTime_Minutes_Range_Min__LoadDataForScansFor,
                                retentionTime_Minutes_Range_Max: retentionTime_Minutes_Range_Max__LoadDataForScansFor
                            },
                            ms_1_scanNumbers_Data_Holder: ms_1_ScanNumbers_Data_Holder,
                            scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures
                        }
                    } )
                    this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.set( projectScanFileId_Selected_AtStartOf_LoadRequest, dataForChromatogram_For_ProjectScanFileId )
                }

                if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                    //  No longer current request so exit

                    return; // EARLY RETURN
                }

                const promise_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks = this._load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks({
                    currentSelection_ObjectReference_AtStartOf_Request, projectScanFileId_Selected_AtStartOf_LoadRequest
                })
                promise_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.catch(reason => { try {
                    throw Error("promise_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.catch(reason: " + reason )

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promise_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.then(novalue => { try {

                    if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                        //  No longer current request so exit

                        return; // EARLY RETURN
                    }

                    this._load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage({
                        currentSelection_ObjectReference_AtStartOf_Request, projectScanFileId_Selected_AtStartOf_LoadRequest
                    })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    //////

    /**
     *
     */
    private async _load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            projectScanFileId_Selected_AtStartOf_LoadRequest
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            projectScanFileId_Selected_AtStartOf_LoadRequest: number
        }
    ) : Promise<void> {
        try {
            const dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest )
            if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId ) {
                throw Error("_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks(...):  No value in this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId for projectScanFileId_Selected_AtStartOf_LoadRequest: " + projectScanFileId_Selected_AtStartOf_LoadRequest )
            }

            let dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest );
            if ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId ) {
                dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId = new Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId()
                this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.set( projectScanFileId_Selected_AtStartOf_LoadRequest, dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId );
            }

            let dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest );
            if ( ! dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) {
                dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = new Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId()
                this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.set( projectScanFileId_Selected_AtStartOf_LoadRequest, dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId );
            }

            //  Scan Numbers to get Scan Data with Peaks from server

            const scanNumbers_ToLoad_Array: Array<number> = []
            {
                for ( const scanNumber of dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId.data.ms_1_scanNumbers_Data_Holder.scanNumber_Array ) {

                    if ( ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) )
                        && ( ! dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) ) {

                        scanNumbers_ToLoad_Array.push( scanNumber )
                    }
                }
            }

            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( scanNumbers_ToLoad_Array )

            this._loadingData_ScanNumberCount = { currentCount: 0, totalCount: scanNumbers_ToLoad_Array.length }
            this.setState({ forceRerenderObject: {} })

            const scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount: Array<Array<number>> = []

            {
                let scanNumberList_RetrieveScanDataFromServer: Array<number>
                for ( const scanNumber of scanNumbers_ToLoad_Array ) {
                    if ( ! scanNumberList_RetrieveScanDataFromServer ) {
                        scanNumberList_RetrieveScanDataFromServer = []
                        scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount.push( scanNumberList_RetrieveScanDataFromServer )
                    }
                    scanNumberList_RetrieveScanDataFromServer.push( scanNumber )

                    if ( scanNumberList_RetrieveScanDataFromServer.length >= maxScanDataWithPeaksReturnCount__FromServer ) {
                        scanNumberList_RetrieveScanDataFromServer = undefined // Clear to start next array
                    }
                }
            }

            //  Compute m_over_Z_Ranges__ForGet_MS_1_Scans -- The m/z ranges (for scan peaks) for getting MS 1 Scans with Peaks from server

            const m_over_Z_Ranges__ForGet_MS_1_Scans: Array<{
                m_over_Z_Range_Min: number;
                m_over_Z_Range_Max: number;
            }> = [];

            {
                const m_over_z_PersistentFeature =
                    PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge({
                        monoisotopicMass: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.monoisotopicMass,
                        charge: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.charge
                    })

                const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = _compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                    ppm_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues,  //  Max value for loading data from server
                    m_Over_Z_Mass: m_over_z_PersistentFeature
                })

                const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number({
                    isotope_Number: _ISOTOPE_MAX__FOR_CHART_TRACES,
                    charge: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.charge
                });

                const m_over_z_Peptide_And_Mods_Plus_MAX_Isotopes = m_over_z_PersistentFeature + isotope_M_Over_Z_Addition;

                const m_over_Z_Range_Min = m_over_z_PersistentFeature - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                const m_over_Z_Range_Max = m_over_z_Peptide_And_Mods_Plus_MAX_Isotopes + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                m_over_Z_Ranges__ForGet_MS_1_Scans.push({ m_over_Z_Range_Min, m_over_Z_Range_Max })
            }

            //////////////////

            if ( scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount.length > 0 ) {

                await this._get_ScanData_ForScanNumbers({
                    currentSelection_ObjectReference_AtStartOf_Request,
                    scanNumbers_ToLoad_TotalCount: scanNumbers_ToLoad_Array.length,
                    scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount,
                    projectScanFileId_Selected: projectScanFileId_Selected_AtStartOf_LoadRequest,
                    m_over_Z_Ranges__ForGet_MS_1_Scans,
                    dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId,
                    dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
                })
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /////

    /**
     * Process a single batch of parallel requests for scan data with peaks for scan numbers.
     * The webservice calls are made in parallel.
     */
    private _get_ScanData_ForScanNumbers(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            scanNumbers_ToLoad_TotalCount,
            scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount,
            projectScanFileId_Selected, m_over_Z_Ranges__ForGet_MS_1_Scans,
            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId,
            dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            scanNumbers_ToLoad_TotalCount: number
            scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount: Array<Array<number>>
            projectScanFileId_Selected: number
            m_over_Z_Ranges__ForGet_MS_1_Scans: Array<{
                m_over_Z_Range_Min: number;
                m_over_Z_Range_Max: number;
            }>
            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId   // Updated
            dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId   // Updated
        }
    ) :  Promise<void> {

        return new Promise<void>((resolve, reject) => { try {

            let anyRequest_Rejected = false

            let scanNumberList_ProcessNext_Index = 0;                //  Index of next element in scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount to process

            const scanNumberList_Length = scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount.length

            let scanNumberList_ElementsFinishedProcessingCount = 0;  //  Incremented when an element has finished processing from scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount

            let scansProcessed_Count = 0;

            const scanNumbers_Get_NonPeaksDataFor_Set: Set<number> = new Set()

            //  INLINE Function
            const submit_OneRequest = () => {

                const scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH = scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount[ scanNumberList_ProcessNext_Index ]

                scanNumberList_ProcessNext_Index++  // Increment to next element of scan numbers to process

                //  !!! WARNING:  NOT all scan numbers requested may result in scans returned, since filtering on scan peak m/z

                const promise_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges =
                    this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                    get_commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data().
                    get_ScanData_YES_Peaks_DataHolder_ReturnPromise({
                        projectScanFileId: projectScanFileId_Selected,
                        scanNumberList: scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH,
                        m_over_Z_Ranges: m_over_Z_Ranges__ForGet_MS_1_Scans,
                        yes_CacheResults_InJS: false
                    } )
                promise_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.catch(reason => {
                    anyRequest_Rejected = true
                    reject(reason)
                })
                promise_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.then(value_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges => { try {

                    //  Store returned scans

                    for ( const scan of value_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.scanData_YES_Peaks_Data_Holder.scanData.scansArray ) {

                        if ( scan.peaks && scan.peaks.length > 0 ) {

                            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId.scanData_Map_Key_ScanNumber.set( scan.scanNumber, scan )
                        }
                    }

                    //  Add to scans to get NO Peaks for
                    for ( const scanNumber of scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH ) {
                        if ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) {
                            scanNumbers_Get_NonPeaksDataFor_Set.add( scanNumber )
                        }
                    }

                    if ( anyRequest_Rejected ) {
                        //  Another request was rejected so stop processing to get more scan data

                        return;  // EARLY RETURN
                    }

                    if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                        //  No longer current request so exit

                        return; // EARLY RETURN
                    }

                    scansProcessed_Count += scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH.length;

                    //  Cannot use currentCount: scanData_Map_Key_ScanNumber.size since not all scans end up in scanData_Map_Key_ScanNumber

                    this._loadingData_ScanNumberCount = { currentCount: scansProcessed_Count, totalCount: scanNumbers_ToLoad_TotalCount }

                    //  Force rerender to update the display of this._loadingData_ScanNumberCount

                    this.setState({ forceRerenderObject: {} })


                    scanNumberList_ElementsFinishedProcessingCount++

                    if ( scanNumberList_ElementsFinishedProcessingCount === scanNumberList_Length ) {

                        //  Last request to get Scans WITH Peaks has finished so get scans With NO Peaks

                        if ( scanNumbers_Get_NonPeaksDataFor_Set.size === 0 ) {

                            //  NO scan numbers to get for NO Peaks data

                            //  resolve parent Promise

                            this._loadingData_ScanNumberCount = undefined

                            resolve()

                            return;  // EARLY RETURN
                        }

                        const promise_ScansNoPeaks =
                            this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.
                            get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().
                            get_ScanData_NO_Peaks_DataHolder_ReturnPromise({
                                projectScanFileId: projectScanFileId_Selected,
                                scanNumbers_RetrievedDataFor: scanNumbers_Get_NonPeaksDataFor_Set,
                                retrieved_ALL_Scans_ForFile: false,
                                get_ParentScanData: false
                            } )

                        promise_ScansNoPeaks.catch(reason => { reject(reason) })
                        promise_ScansNoPeaks.then(scanData_NO_Peaks_Data_Holder => { try {

                            //  resolve parent Promise

                            for ( const scan of scanData_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {
                                dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.set( scan.scanNumber, scan )
                            }

                            this._loadingData_ScanNumberCount = undefined

                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    }

                    if ( scanNumberList_ProcessNext_Index < scanNumberList_Length ) {

                        //  Have more scan numbers to get data for so trigger next get data

                        submit_OneRequest()
                    }

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }

            //  Start first parallel requests - parallel size is _MAX_GET_SCAN_DATA_WITH_PEAKS_PARALLEL_BATCH_SIZE

            while ( scanNumberList_ProcessNext_Index < _MAX_GET_SCAN_DATA_WITH_PEAKS_PARALLEL_BATCH_SIZE
            && scanNumberList_ProcessNext_Index < scanNumberList_Length ) {

                //  scanNumberList_ProcessNext_Index is incremented in  submit_OneRequest()

                submit_OneRequest()
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            projectScanFileId_Selected_AtStartOf_LoadRequest
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            projectScanFileId_Selected_AtStartOf_LoadRequest: number
        }
    ) : void {

        if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
            //  No longer current request so stop

            return // EARLY RETURN
        }

        const dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId for projectScanFileId_Selected_AtStartOf_LoadRequest: " + projectScanFileId_Selected_AtStartOf_LoadRequest )
        }

        const dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId for projectScanFileId_Selected_AtStartOf_LoadRequest: " + projectScanFileId_Selected_AtStartOf_LoadRequest )
        }

        const dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId.get( projectScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Map_Key_ProjectScanFileId for projectScanFileId_Selected_AtStartOf_LoadRequest: " + projectScanFileId_Selected_AtStartOf_LoadRequest )
        }
        if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.is_Data_FullyLoaded({
            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId: dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId,
            dataFromServer_Scans_NO_For_Single_ProjectScanFileId: dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
        }) ) {
            throw Error("_load_Chromatogram_For_Selected_ProjectScanFileId__AfterGet_ScanData_RenderOnPage(...):  dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.is_Data_FullyLoaded returns FALSE for projectScanFileId_Selected_AtStartOf_LoadRequest: " + projectScanFileId_Selected_AtStartOf_LoadRequest )
        }

        {

            let allScans_Have__ionInjectionTime = true

            for ( const scanNumber of dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.data.ms_1_scanNumbers_Data_Holder.scanNumber_Array ) {

                let found_ScanWithPeaks = false
                {
                    {
                        const scanItem_YES_Peaks = dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.get( scanNumber )
                        if ( scanItem_YES_Peaks ) {
                            if ( scanItem_YES_Peaks.ionInjectionTime === undefined || scanItem_YES_Peaks.ionInjectionTime === null ) {

                                allScans_Have__ionInjectionTime = false
                                break
                            }
                        }
                    }
                    if ( ! found_ScanWithPeaks ) {
                        const scanItem_NO_Peaks = dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.get(  scanNumber )
                        if ( scanItem_NO_Peaks ) {
                            if ( scanItem_NO_Peaks.ionInjectionTime_InMilliseconds === undefined || scanItem_NO_Peaks.ionInjectionTime_InMilliseconds === null ) {

                                allScans_Have__ionInjectionTime = false
                                break
                            }
                        }
                    }
                }
            }

            this._show__Plot_Ion_Count_Option_Div = allScans_Have__ionInjectionTime

            if ( ! this._show__Plot_Ion_Count_Option_Div ) {
                //  Reset to since not displaying the radio button options
                this._plotType_IonCurrent_VS_Ions_Select = _plotType_IonCurrent_VS_Ions_Select_DEFAULT
            }
        }

        this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
        this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId
        this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId = dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId

        this._loadingInitialChromatogram = false

        this._show_LoadingData_Message = false;
        this._show_Loading_PSM_Data_Message = false

        this._triggerPlotUpdate_Object = {}

        this.setState({ forceRerenderObject: {} })
    }

    //////////////////   RENDER

    /**
     *
     */
    render() {
        try {
            if ( ! this.props.featureDetection_ViewPage__Chromatogram_Component_Params ) {

                return null
            }

            return (
                <div>
                    <div style={ { marginBottom: 20 } }>
                        { this._show_Show_Chromatogram_Button ? (
                            <div>
                                <button
                                    onClick={ event => {
                                        this._clickOn_Button_Chromatogram_Button()
                                    } }
                                >
                                    Show Chromatogram
                                </button>
                            </div>
                        ) : this._show_LoadingData_Message && this._loadingInitialChromatogram ? (
                            <div>
                                <div
                                    style={ { textAlign: "center" } }
                                >
                                    { this._show_Loading_PSM_Data_Message ? (
                                        <span>LOADING FEATURE AND PSM DATA</span>
                                    ) : (
                                        <span>LOADING FEATURE DATA</span>
                                    )}
                                    { this._loadingData_ScanNumberCount ? (
                                        <span>
                                            <span>: Currently loaded </span>
                                            <span>{ this._loadingData_ScanNumberCount.currentCount }</span>
                                            <span> scans of </span>
                                            <span>{ this._loadingData_ScanNumberCount.totalCount }</span>
                                            <span>.</span>
                                        </span>
                                    ) : null }
                                    <span>&nbsp;</span>
                                    <span>&nbsp;</span>
                                    <span> </span>
                                    { this._loadingInitialChromatogram ? (
                                        <button
                                            onClick={ event => {
                                                this._clickOn_Button_Cancel_Chromatogram_Button()
                                            } }
                                        >
                                            Cancel Show Chromatogram
                                        </button>
                                    ) : (
                                        <button
                                            onClick={ event => {
                                                this._clickOn_Button_Cancel_LoadingData_Button()
                                            } }
                                        >
                                            Cancel Loading Data
                                        </button>
                                    ) }
                                </div>

                                <div style={ { paddingTop: 80, paddingBottom: 80 } }>
                                    <div style={ { textAlign: "center" } }>
                                        <Spinner_Limelight_Component/>
                                    </div>
                                </div>
                            </div>
                        ) : this._show_LoadingData_ERROR_Message ? (
                            <div>
                                ERROR loading Data
                            </div>
                        ) : (
                            //  MAIN DISPLAY

                            <div style={ {
                                position: "relative",

                                minWidth: _CHART_WIDTH,
                                minHeight: _CHART_HEIGHT
                            } }>

                                <div style={ { marginBottom: 5 } }>
                                    Chromatogram Options:
                                </div>

                                <div style={ { marginLeft: 10 } }>


                                    { this._show__Plot_Ion_Count_Option_Div ? (

                                        <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                            <div style={ { marginBottom: 5 } }>

                                                <Internal__PlotType_IonCurrent_VS_Ions_Component

                                                    onChange_Callback={ (newSelectionValue) => { try {

                                                        this._plotType_IonCurrent_VS_Ions_Select = newSelectionValue

                                                        this._currentSelection_ObjectReference = {}

                                                        //   Only call when change scan file
                                                        // this._displayChromatogram_For_Selected_SearchScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                        this._triggerPlotUpdate_Object = {}

                                                        this.setState({ forceRerenderObject: {} })

                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                                />

                                            </div>
                                        </div>
                                    ) : null }

                                    <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                        <div style={ { marginBottom: 5 } }>

                                            <Internal__PeakSelection_Component
                                                onChange_Callback={ (newSelectionValue) => { try {

                                                    this._scanPeakSelect = newSelectionValue

                                                    this._currentSelection_ObjectReference = {}

                                                    //   Only call when change scan file
                                                    // this._displayChromatogram_For_Selected_ProjectScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                    this._triggerPlotUpdate_Object = {}

                                                    this.setState({ forceRerenderObject: {} })

                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                            />
                                        </div>
                                    </div>


                                    <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                        <div style={ { marginBottom: 5 } }>
                                            <Internal__SmoothingSelection_Component
                                                onChange_Callback={ (newSelectionValue) => { try {

                                                    this._smoothingOption_Selection = newSelectionValue

                                                    this._currentSelection_ObjectReference = {}

                                                    //   Only call when change scan file
                                                    // this._displayChromatogram_For_Selected_ProjectScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                    this._triggerPlotUpdate_Object = {}

                                                    this.setState({ forceRerenderObject: {} })

                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                            />
                                        </div>
                                    </div>


                                    <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>

                                        <div style={ { marginBottom: 5 } }>
                                            <Internal__MS1_Window_Size_Selection_Component

                                                onChange_Callback={ (newSelectionValue) => { try {

                                                    this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = newSelectionValue

                                                    this._currentSelection_ObjectReference = {}

                                                    //   Only call when change scan file
                                                    // this._displayChromatogram_For_Selected_ProjectScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                    this._triggerPlotUpdate_Object = {}

                                                    this.setState({ forceRerenderObject: {} })

                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                            />
                                        </div>
                                    </div>

                                    <div style={ { marginBottom: 5 } }>
                                        <Internal__RetentionTime_Min_Max_UserEditable_Component
                                            force_SetTo_ValueFromParent={ this._force_SetTo_ValueFromParent__FOR__Internal__RetentionTime_Min_Max_UserEditable_Component }  // On object reference change, the input values will be set to the values from Parent

                                            retentionTime_Minutes_Range_ForChart_Min__ValueFromParent={ this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Min }
                                            retentionTime_Minutes_Range_ForChart_Max__ValueFromParent={ this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Max }

                                            retentionTime_Minutes_Range_ForChart_Min__DefaultValue={ this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max.retentionTime_Minutes_Range_Min }
                                            retentionTime_Minutes_Range_ForChart_Max__DefaultValue={ this._retentionTime_Minutes_Range_ComputedFrom_PersistentFeature_Min_Max.retentionTime_Minutes_Range_Max }

                                            updatedValues_Callback={ ( params ) => {

                                                this._retentionTime_Minutes_Range_ForChart_Min_Max__PreviousValues = this._retentionTime_Minutes_Range_ForChart_Min_Max

                                                this._retentionTime_Minutes_Range_ForChart_Min_Max = {
                                                    retentionTime_Minutes_Range_Min: params.retentionTime_Minutes_Range_ForChart_Min, retentionTime_Minutes_Range_Max: params.retentionTime_Minutes_Range_ForChart_Max
                                                }


                                                if ( this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ) {

                                                    const retentionTime_Minutes_Range_Min_Max__LoadingDataFor = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.data.retentionTime_Minutes_Range_Min_Max__LoadingDataFor

                                                    if ( this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Min < retentionTime_Minutes_Range_Min_Max__LoadingDataFor.retentionTime_Minutes_Range_Min ||
                                                        this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Max > retentionTime_Minutes_Range_Min_Max__LoadingDataFor.retentionTime_Minutes_Range_Max ) {

                                                        //  Load data based on NEW Retention Time Range


                                                        this._currentSelection_ObjectReference = {}

                                                        this._load_Chromatogram_For_Selected_ProjectScanFileId({
                                                            currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference,
                                                            retentionTime_Minutes_Range_Min__LoadDataForScansFor: this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Min,
                                                            retentionTime_Minutes_Range_Max__LoadDataForScansFor: this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Max
                                                        })

                                                        return // EARLY RETURN
                                                    }
                                                }

                                                //  Else Update for new NEW Retention Time Range

                                                this._displayChromatogram({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                this.setState({ forceRerenderObject: {} })
                                            } }
                                        />
                                    </div>

                                </div>

                                <div style={ {
                                    position: "relative",

                                    minWidth: _CHART_WIDTH,
                                    minHeight: _CHART_HEIGHT
                                } }>

                                    <div>
                                        { this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId &&
                                        this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId ? (
                                            <Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component
                                                triggerPlotUpdate_Object={ this._triggerPlotUpdate_Object }
                                                plotType_IonCurrent_VS_Ions_Select={ this._plotType_IonCurrent_VS_Ions_Select }
                                                scanPeakSelect={ this._scanPeakSelect }
                                                smoothingOption_Selection={ this._smoothingOption_Selection }

                                                precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection={ this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection }

                                                retentionTime_Minutes_Range_ForChart_FromUserInput_Min={ this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Min }
                                                retentionTime_Minutes_Range_ForChart_FromUserInput_Max={ this._retentionTime_Minutes_Range_ForChart_Min_Max.retentionTime_Minutes_Range_Max }


                                                dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId={ this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId }
                                                dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId={ this._dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId }
                                                dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId={ this._dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId }

                                                featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results={ this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results }
                                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter={ this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter }
                                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results={ this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results }
                                                featureDetection_ViewPage__Chromatogram_Component_Params={ this.props.featureDetection_ViewPage__Chromatogram_Component_Params }


                                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }

                                                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId={ this._psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId }

                                                scanData_NO_Peaks_Data_Holder__ALL_SCANS={ this._scanData_NO_Peaks_Data_Holder__ALL_SCANS }
                                            />
                                        ) : null }
                                    </div>


                                    {/*  Overlay for  Scan File selection NOT have any MS 1 scans  */}
                                    { this._show_NO_MS_1_Scans_ForScanFile ? (
                                        <div
                                            className=" standard-background-color standard-border-color-gray "
                                            style={ {
                                                fontSize: 24,
                                                position: "absolute",
                                                left: 0,
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                //  Center text in block
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderWidth: 1,
                                                borderStyle: "solid",

                                            }}
                                        >
                                            <div>
                                                <span>No MS1 scan data could be found for scan file. </span>
                                            </div>
                                        </div>
                                    ) : null }

                                </div>



                                {/*  Overlay for Loading Data when NOT initial chromatogram  */}
                                { this._show_LoadingData_Message && ! this._loadingInitialChromatogram ? (
                                    <div
                                        className=" standard-background-color standard-border-color-gray "
                                        style={ {
                                            fontSize: 24,
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            //  Center text in block
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderStyle: "solid"
                                        }}
                                    >
                                        <div
                                            style={ { textAlign: "center" } }
                                        >
                                            <span>LOADING DATA</span>
                                            { this._loadingData_ScanNumberCount ? (
                                                <span>
                                                    <span>: Currently loaded </span>
                                                    <span>{ this._loadingData_ScanNumberCount.currentCount }</span>
                                                    <span> scans of </span>
                                                    <span>{ this._loadingData_ScanNumberCount.totalCount }</span>
                                                    <span>.</span>
                                                </span>
                                            ) : null }
                                            <span>&nbsp;</span>
                                            <span>&nbsp;</span>
                                            <span> </span>

                                            <button
                                                onClick={ event => {
                                                    this._clickOn_Button_Cancel_LoadingData_Button()
                                                } }
                                            >
                                                Cancel Loading Data
                                            </button>

                                        </div>

                                        <div style={ { paddingTop: 80, paddingBottom: 80 } }>
                                            <div style={ { textAlign: "center" } }>
                                                <Spinner_Limelight_Component/>
                                            </div>
                                        </div>
                                    </div>

                                ) : this._showUpdatingMessage ? (   /*  Overlay for Creating or Updating  */
                                    <div
                                        className=" standard-background-color standard-border-color-gray "
                                        style={ {
                                            fontSize: 24,
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            //  Center text in block
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderStyle: "solid"
                                        }}
                                    >
                                        <div>
                                            Updating Chart
                                        </div>
                                    </div>
                                ) : null }


                                {/*  Overlay for Updated Scan File selection to previous selection  */}
                                {/*
                                { this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId__Reset_To_Previous ? (
                                    <div
                                        className=" standard-background-color standard-border-color-gray "
                                        style={ {
                                            fontSize: 24,
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            //  Center text in block
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderStyle: "solid"
                                        }}
                                    >
                                        <div>
                                            <span>Scan Filename selection reset to previous selection. </span>
                                        </div>
                                        <div style={ { marginTop: 10 } }>
                                            <button
                                                onClick={ event => {
                                                    this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectScanFileId__Reset_To_Previous = false
                                                    this.setState({ forceRerenderObject: {} })
                                                }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                ) : null }
                                  */}

                                {/*  Overlay for Updated Retention Time selection to previous selection  */}
                                { this._retentionTime_Minutes_Range_ForChart_Min_Max__Reset_To_Previous ? (
                                    <div
                                        className=" standard-background-color standard-border-color-gray "
                                        style={ {
                                            fontSize: 24,
                                            position: "absolute",
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            //  Center text in block
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            borderWidth: 1,
                                            borderStyle: "solid"
                                        }}
                                    >
                                        <div>
                                            <span>Retention time range selection reset to previous selection. </span>
                                        </div>
                                        <div style={ { marginTop: 10 } }>
                                            <button
                                                onClick={ event => {
                                                    this._retentionTime_Minutes_Range_ForChart_Min_Max__Reset_To_Previous = false
                                                    this.setState({ forceRerenderObject: {} })
                                                }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                ) : null }
                            </div>
                        )}
                    </div>
                </div>
            )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
}

//////////////////////////
//////////////////////////
//////////////////////////

/**
 *
 */
interface Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_Props {

    //   When Change this change method 'componentDidUpdate(...)'

    triggerPlotUpdate_Object: object

    plotType_IonCurrent_VS_Ions_Select: PlotType_IonCurrent_VS_Ions_Select_Enum

    scanPeakSelect: ScanPeakSelect_Enum

    smoothingOption_Selection: SmoothingOption_Enum

    precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection: number

    retentionTime_Minutes_Range_ForChart_FromUserInput_Min: number
    retentionTime_Minutes_Range_ForChart_FromUserInput_Max: number

    dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId
    dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId
    dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId

    featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params

    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter

    featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results

    //  ONLY Use for the DataTable Contents for Tooltip
    featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results

    //  When Have Searches

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>

    scanData_NO_Peaks_Data_Holder__ALL_SCANS: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
}

/**
 *
 */
interface Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component extends React.Component< Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_Props, Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_State > {


    private _DO_NOT_CALL() { //  Test Cast of method
    }

    private plot_div_Ref :  React.RefObject<HTMLDivElement>

    private _retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min: number
    private _retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max: number

    private _areaUnderCurve_Display: number

    private _showCreatingMessage = true
    private _showUpdatingMessage = false
    private _show_NO_DATA_ForSelection_Message = false

    private _singularFeatures_NOT_PutOnChart_ShowMessage = false
    private _singularFeatures_NOT_PutOnChart_Count: number

    private _selected_SingularFeatureId: number

    private _for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results


    private _psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result

    private _peptideSequenceDisplay_Map_Key_PSM_Id: Map<number, string>

    private _selected_PsmId: number
    private _for_Selected_PsmId__dataTable_RootTableObject: DataTable_RootTableObject

    /**
     *
     */
    constructor( props: Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_Props ) {
        super( props );

        this.plot_div_Ref = React.createRef();

        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Min
        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Max
    }

    componentWillUnmount() {
        try {
            try {
                Plotly.purge(this.plot_div_Ref.current)
            } catch (e) {
                //  Eat Exception
            }

            // try {
            //     Plotly.purge(this.plot_Ion_Current_Ref.current)
            // } catch (e) {
            //     //  Eat Exception
            // }
            // try {
            //     Plotly.purge(this.plot_Ion_Count_Ref.current)
            // } catch (e) {
            //     //  Eat Exception
            // }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    componentDidUpdate( prevProps: Readonly<Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_Props>, prevState: Readonly<Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component_State>, snapshot?: any ) {
        try {
            if (
                prevProps.triggerPlotUpdate_Object !== this.props.triggerPlotUpdate_Object
            ) {
                this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Min
                this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Max

                this._showUpdatingMessage = true
                this._show_NO_DATA_ForSelection_Message = false;

                this._singularFeatures_NOT_PutOnChart_ShowMessage = false

                this._selected_SingularFeatureId = undefined
                this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results = undefined

                this._selected_PsmId = undefined
                this._for_Selected_PsmId__dataTable_RootTableObject = undefined

                this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results = undefined

                this._peptideSequenceDisplay_Map_Key_PSM_Id = undefined


                this.setState({ forceRerenderObject: {} })

                window.setTimeout( () => { try {

                    this._createOnMount_And_OnUpdate()

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    componentDidMount() {

        try {
            this._showCreatingMessage = true
            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => { try {

                this._createOnMount_And_OnUpdate()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * returned Promise ignored
     */
    private _createOnMount_And_OnUpdate(): void {

        const retentionTime_Minutes_Range_ForChart_Min = this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min
        const retentionTime_Minutes_Range_ForChart_Max = this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max

        const scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime: Array<{
            scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
            scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
            /**
             * In Seconds
             */
            scan_RetentionTime: number
            scanNumber: number
            scanLevel: number
        }> = []

        for ( const scanNumber of this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.data.ms_1_scanNumbers_Data_Holder.scanNumber_Array ) {

            let found_ScanWithPeaks = false
            {
                const scanItem_YES_Peaks = this.props.dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.get( scanNumber )
                if ( scanItem_YES_Peaks ) {
                    if ( scanItem_YES_Peaks.peaks.length > 0 ) {

                        //  Scan Number found With Peaks

                        if ( scanItem_YES_Peaks.retentionTime < ( retentionTime_Minutes_Range_ForChart_Min * 60 ) || scanItem_YES_Peaks.retentionTime > ( retentionTime_Minutes_Range_ForChart_Max * 60 ) ) {

                            //  Scan retentionTime not in range so SKIP

                            continue  // EARLY CONTINUE
                        }

                        // scanItem_With_Peaks_Key_ScanNumber.set( scanItem_YES_Peaks.scanNumber, scanItem_YES_Peaks )

                        scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime.push({
                            scan_RetentionTime: scanItem_YES_Peaks.retentionTime,
                            scanNumber: scanItem_YES_Peaks.scanNumber,
                            scanLevel: scanItem_YES_Peaks.level,
                            scan_WithPeaks: scanItem_YES_Peaks,
                            scan_NO_Peaks: undefined
                        })

                        found_ScanWithPeaks = true
                    }
                }
            }

            if ( ! found_ScanWithPeaks ) {

                const scanItem_NO_Peaks = this.props.dataFromServer_Scans_NO_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.scanData_Map_Key_ScanNumber.get(  scanNumber )
                if ( scanItem_NO_Peaks ) {

                    if ( scanItem_NO_Peaks.retentionTime_InSeconds < ( retentionTime_Minutes_Range_ForChart_Min * 60 ) || scanItem_NO_Peaks.retentionTime_InSeconds > ( retentionTime_Minutes_Range_ForChart_Max * 60 ) ) {

                        //  Scan retentionTime not in range so SKIP

                        continue  // EARLY CONTINUE
                    }

                    scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime.push({
                        scan_RetentionTime: scanItem_NO_Peaks.retentionTime_InSeconds,
                        scanNumber: scanItem_NO_Peaks.scanNumber,
                        scanLevel: scanItem_NO_Peaks.level,
                        scan_WithPeaks: undefined,
                        scan_NO_Peaks: scanItem_NO_Peaks
                    })
                }
            }
        }

        scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime.sort( ( a, b) => {
            if ( a.scan_RetentionTime < b.scan_RetentionTime ) {
                return -1;
            }
            if ( a.scan_RetentionTime > b.scan_RetentionTime ) {
                return 1;
            }
            //  fallback to sort on scan number
            if ( a.scanNumber < b.scanNumber ) {
                return -1;
            }
            if ( a.scanNumber > b.scanNumber ) {
                return 1;
            }
            return 0;
        })

        const promises: Array<Promise<void>> = []


        if ( this.props.plotType_IonCurrent_VS_Ions_Select === PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT ) {

            const promise = this._createOnMount_And_OnUpdate__SpecificChart( {

                chartCreate__IonCurrent__IonCount__Enum: ChartCreate__IonCurrent__IonCount__Enum.ION_CURRENT,

                retentionTime_Minutes_Range_ForChart_Min,
                retentionTime_Minutes_Range_ForChart_Max,
                scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime
            } )
            promises.push( promise )
        } else {
            const promise = this._createOnMount_And_OnUpdate__SpecificChart( {

                chartCreate__IonCurrent__IonCount__Enum: ChartCreate__IonCurrent__IonCount__Enum.ION_COUNT,

                retentionTime_Minutes_Range_ForChart_Min,
                retentionTime_Minutes_Range_ForChart_Max,
                scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime
            } )
            promises.push( promise )
        }


        const promisesAll = Promise.all( promises )

        promisesAll.catch(reason => {})
        promisesAll.then( novalue => { try {

            this._showCreatingMessage = false
            this._showUpdatingMessage = false

            this.setState({ forceRerenderObject: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param retentionTime_Minutes_Range_ForChart_Min
     * @param retentionTime_Minutes_Range_ForChart_Max
     * @param psmList_LOCAL_PossiblyFiltered
     * @param scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime
     */
    private async _createOnMount_And_OnUpdate__SpecificChart(
        {
            chartCreate__IonCurrent__IonCount__Enum,

            retentionTime_Minutes_Range_ForChart_Min,
            retentionTime_Minutes_Range_ForChart_Max,
            scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime
        } : {
            chartCreate__IonCurrent__IonCount__Enum: ChartCreate__IonCurrent__IonCount__Enum

            retentionTime_Minutes_Range_ForChart_Min: number
            retentionTime_Minutes_Range_ForChart_Max: number

            scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime: Array<{
                scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
                scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
                scan_RetentionTime: number
                scanNumber: number
                scanLevel: number
            }>
        }
    ) : Promise<void> { try {

        const singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId: Map<number, DataTable_DataRowEntry> = this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_DataRowEntries_Map_Key_SingularFeature_Id

        const trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass: Array<Plotly.Data> = []

        const trace_SingularFeature_Points_X: Array<number> = []
        const trace_SingularFeature_Points_Y: Array<number> = []
        const trace_SingularFeature_Points_Tooltips: Array<string> = []

        this._areaUnderCurve_Display = undefined

        let areaUnderCurve_Total = 0

        const singularFeatureItem_Map_Key_SingularFeatureTooltip: Map<string, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry> = new Map()

        const singularFeatureEntry_ToPlot_In_PointOrder_Array: Array<Internal__SingularFeature_Entry_ToPlot> = []

        const singularFeatures_NOT_PutOnChart_SingularFeature_IDs: Set<number> = new Set()  //  Remove each SingularFeature ID added to the plot. Left with SingularFeature IDs NOT put on the chart

        const m_over_z_PersistentFeature =
            PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge({
                monoisotopicMass: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.monoisotopicMass,
                charge: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.charge
            })


        let psmTblData_Array__Map_Key_ProjectSearchId: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>

        if ( this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {

            psmTblData_Array__Map_Key_ProjectSearchId = new Map()

            for ( const projectSearchId of this.props.featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {

                const reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId =
                    this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId)
                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId ) {
                    throw Error("this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
                }
                const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = this.props.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
                if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                    throw Error("this.props.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                const psmTblData_Array: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []

                for ( const reportedPeptideId_AndIts_PSM_Ids of reportedPeptideIds_AndTheir_PSM_IDs__For_ProjectSearchId.get_Entries_IterableIterator() ) {

                    if ( reportedPeptideId_AndIts_PSM_Ids.psmIds_Include ) {

                        for ( const psmId of reportedPeptideId_AndIts_PSM_Ids.psmIds_Include ) {

                            const psmTblData = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId )
                            if ( ! psmTblData ) {
                                throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId + ", projectSearchId: " + projectSearchId )
                            }
                            psmTblData_Array.push( psmTblData )
                        }
                    } else {
                        const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId_AndIts_PSM_Ids.reportedPeptideId )
                        if ( ! psmTblData_For_ReportedPeptideId ) {
                            throw Error("psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId_AndIts_PSM_Ids.reportedPeptideId ) returned NOTHING for reportedPeptideId_AndIts_PSM_Ids.reportedPeptideId: " + reportedPeptideId_AndIts_PSM_Ids.reportedPeptideId + ", projectSearchId: " + projectSearchId )
                        }
                        for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                            psmTblData_Array.push( psmTblData )
                        }
                    }
                }

                //  Filter PSMs to Retention Time Window

                const psmTblData_Array_Filtered_RetentionTime: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []
                psmTblData_Array__Map_Key_ProjectSearchId.set( projectSearchId, psmTblData_Array_Filtered_RetentionTime )

                for ( const psmItem of psmTblData_Array ) {

                    let retentionTimeSeconds = psmItem.retentionTimeSeconds

                    if ( retentionTimeSeconds === undefined || retentionTimeSeconds == null ) {

                        const scanData_NO_Peaks_For_ScanNumber = this.props.scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmItem.scanNumber )
                        if ( ! scanData_NO_Peaks_For_ScanNumber ) {
                            const msg = "this.props.scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmItem.scanNumber ) returned NOTHING for psmItem.scanNumber: " + psmItem.scanNumber
                            console.warn(msg)
                            throw Error(msg)
                        }
                        retentionTimeSeconds = scanData_NO_Peaks_For_ScanNumber.retentionTime_InSeconds
                    }

                    const retentionTimeMinutes = retentionTimeSeconds / 60

                    if ( retentionTimeMinutes < retentionTime_Minutes_Range_ForChart_Min || retentionTimeMinutes > retentionTime_Minutes_Range_ForChart_Max ) {

                        //  PSM retentionTime not in range so SKIP

                        continue  // EARLY CONTINUE
                    }

                    psmTblData_Array_Filtered_RetentionTime.push( psmItem )
                }

            }
        }

        const psm_ToPlot_All = new Internal__Psm_ToPlot_All()

        ////////
        {
            //  m/z ranges for scan peaks and SingularFeatures

            {

                {    //  Window: main m/z

                    const plotlyTrace_Label = "Monoisotopic";

                    const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = _compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                        ppm_ExtendRange_AddSubtract_ToMinMaxValues: this.props.precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection,
                        m_Over_Z_Mass: m_over_z_PersistentFeature
                    })


                    const m_Over_Z_Window_Min = m_over_z_PersistentFeature - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                    const m_Over_Z_Window_Max = m_over_z_PersistentFeature + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                    // console.log(
                    //     "Calculated m/z (Monoisotopic) for Peptide and Mods and Charge (from PeptideMassCalculator.calculateMZ(...)): " + m_over_z_Peptide_And_Mods +
                    //     ", Peptide Sequence: " + peptideSequence_String +
                    //     ", Modification Masses used (Last one is open mod mass if applicable): " + modificationMasses_For_calculateMZ.join() +
                    //     ", Charge: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.charge +
                    //     ".  Separate: For main m/z window: ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus: " + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus +
                    //     ", m_Over_Z_Window_Min: " + m_Over_Z_Window_Min +
                    //     ", m_Over_Z_Window_Max: " + m_Over_Z_Window_Max
                    // )

                    const plotlyTrace_Etc_Result = _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Create_Single_PlotlyTrace_Etc__For_MZ_OR_MZ_Plus_X_Isotope({

                        chartCreate__IonCurrent__IonCount__Enum,

                        scanPeakSelect: this.props.scanPeakSelect,
                        smoothingOption_Selection: this.props.smoothingOption_Selection,

                        plotlyTrace_Label,
                        plotlyTrace_Color: "rgb(31, 119, 180)",

                        m_Over_Z_Window_Min,
                        m_Over_Z_Window_Max,
                        m_Over_Z_Window_Index: 0,  // Not sure used

                        scanItem_Array_SortOn_RetentionTime: scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime,

                        psmTblData_Array__Map_Key_ProjectSearchId,

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                        dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId,

                        featureDetection_ViewPage__Chromatogram_Component_Params: this.props.featureDetection_ViewPage__Chromatogram_Component_Params,

                        scanData_NO_Peaks_Data_Holder__ALL_SCANS: this.props.scanData_NO_Peaks_Data_Holder__ALL_SCANS,

                        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

                        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,

                        //  Updated
                        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,
                        singularFeatureItem_Map_Key_SingularFeatureTooltip,
                        singularFeatureEntry_ToPlot_In_PointOrder_Array,
                        singularFeatures_NOT_PutOnChart_SingularFeature_IDs,

                        trace_SingularFeature_Points_X,
                        trace_SingularFeature_Points_Y,
                        trace_SingularFeature_Points_Tooltips,

                        psm_ToPlot_All
                    })

                    if ( plotlyTrace_Etc_Result ) {

                        trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.push( plotlyTrace_Etc_Result.plotly_TraceData )

                        areaUnderCurve_Total += plotlyTrace_Etc_Result.areaUnderCurve_SingleTrace
                    }
                }

                //  LOOP For Isotopes to Display: up to _ISOTOPE_MAX__FOR_CHART_TRACES

                for ( let isotope_Number = 1; isotope_Number <= _ISOTOPE_MAX__FOR_CHART_TRACES; isotope_Number++ ) {

                    //  Window:  m/z window for main m/z + X isotope

                    const plotlyTrace_Label = "13C x " + isotope_Number

                    const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number({
                        isotope_Number, charge: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.charge
                    });

                    const m_over_z_Peptide_And_Mods__Plus_X_Isotope = m_over_z_PersistentFeature + isotope_M_Over_Z_Addition

                    const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = _compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus( {
                        ppm_ExtendRange_AddSubtract_ToMinMaxValues: this.props.precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection,
                        m_Over_Z_Mass: m_over_z_Peptide_And_Mods__Plus_X_Isotope
                    } )

                    const m_Over_Z_Window_Min = m_over_z_Peptide_And_Mods__Plus_X_Isotope - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                    const m_Over_Z_Window_Max = m_over_z_Peptide_And_Mods__Plus_X_Isotope + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                    // console.log(
                    //     "Calculated m/z +" + isotope_Number + " Isotope (13C x " + isotope_Number + ") for Peptide and Mods and Charge (from PeptideMassCalculator.calculateMZ(...)): " + m_over_z_Peptide_And_Mods__Plus_X_Isotope +
                    //     ", Peptide Sequence: " + peptideSequence_String +
                    //     ", Modification Masses used (Last one is open mod mass if applicable): " + modificationMasses_For_calculateMZ.join() +
                    //     ", Charge: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.charge +
                    //     ".  Separate: For m/z +" + isotope_Number + " Isotope window: ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus: " + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus +
                    //     ", m_over_z_Peptide_And_Mods__Plus_X_Isotope: " + m_over_z_Peptide_And_Mods__Plus_X_Isotope +
                    //     ", m_Over_Z_Window_Min: " + m_Over_Z_Window_Min +
                    //     ", m_Over_Z_Window_Max: " + m_Over_Z_Window_Max
                    // )

                    const plotlyTrace_Etc_Result = _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Create_Single_PlotlyTrace_Etc__For_MZ_OR_MZ_Plus_X_Isotope({

                        chartCreate__IonCurrent__IonCount__Enum,

                        scanPeakSelect: this.props.scanPeakSelect,
                        smoothingOption_Selection: this.props.smoothingOption_Selection,

                        plotlyTrace_Label,
                        plotlyTrace_Color: _ISOTOPE_PLOT_TRACE_COLORS[ isotope_Number ],

                        m_Over_Z_Window_Min,
                        m_Over_Z_Window_Max,
                        m_Over_Z_Window_Index: isotope_Number,  // Not sure used

                        scanItem_Array_SortOn_RetentionTime: scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime,

                        psmTblData_Array__Map_Key_ProjectSearchId,

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                        dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId,

                        featureDetection_ViewPage__Chromatogram_Component_Params: this.props.featureDetection_ViewPage__Chromatogram_Component_Params,

                        scanData_NO_Peaks_Data_Holder__ALL_SCANS: this.props.scanData_NO_Peaks_Data_Holder__ALL_SCANS,

                        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

                        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,

                        //  Updated
                        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,
                        singularFeatureItem_Map_Key_SingularFeatureTooltip,
                        singularFeatureEntry_ToPlot_In_PointOrder_Array,
                        singularFeatures_NOT_PutOnChart_SingularFeature_IDs,

                        trace_SingularFeature_Points_X,
                        trace_SingularFeature_Points_Y,
                        trace_SingularFeature_Points_Tooltips,

                        psm_ToPlot_All
                    })

                    if ( plotlyTrace_Etc_Result ) {

                        trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.push( plotlyTrace_Etc_Result.plotly_TraceData )
                    }
                }
            }
        }

        const chart_Data = Array.from( trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass ) //  Start with Traces for MS 1 Scans

        let trace_SingularFeature_Points__ChartData_Index: number = undefined

        {
            //  SingularFeature Points
            const trace_SingularFeature_Points = {
                name: "Individual Feature",
                x: trace_SingularFeature_Points_X,
                y: trace_SingularFeature_Points_Y,
                // type: 'scatter',
                mode: 'markers',
                hoverinfo: "text", //  Hover contents
                hovertext: trace_SingularFeature_Points_Tooltips,
                marker: {
                    color: "rgb(214, 39, 40)",  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                    size: 8 // marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                }
            };

            chart_Data.push( trace_SingularFeature_Points )  //  Add trace for SingularFeatures

            trace_SingularFeature_Points__ChartData_Index = chart_Data.length - 1
        }

        let psm_Data_For_ClickHandler_Entry_Array: Array<Internal__Psm_Data_For_ClickHandler_Entry> = undefined
        let trace_Psm_Points__ChartData_Index: number = undefined
        {
            if ( psm_ToPlot_All.psm_ToPlot_For_ProjectSearchId_Map_Key_ProjectSearchId.size > 0 ) {

                const plot_PSMs_All_Result =
                    await this._plot_PSMs_All({ psm_ToPlot_All })

                psm_Data_For_ClickHandler_Entry_Array = plot_PSMs_All_Result.psm_Data_For_ClickHandler_Entry_Array

                //  PSM Points
                const trace_Psm_Points = {
                    name: "PSMs",
                    x: plot_PSMs_All_Result.trace_Psm_Points_X,
                    y: plot_PSMs_All_Result.trace_Psm_Points_Y,
                    // type: 'scatter',
                    mode: 'markers',
                    hoverinfo: "text", //  Hover contents
                    hovertext: plot_PSMs_All_Result.trace_Psm_Points_Tooltips,
                    marker: {
                        color: "rgb(0, 0, 0)",  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        size: 8 // marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                    }
                };

                chart_Data.push( trace_Psm_Points )  //  Add trace for PSMs

                trace_Psm_Points__ChartData_Index = chart_Data.length - 1
            }
        }


        this._areaUnderCurve_Display = areaUnderCurve_Total


        let chartTitle_Start = "Ion Current"

        if ( chartCreate__IonCurrent__IonCount__Enum === ChartCreate__IonCurrent__IonCount__Enum.ION_COUNT ) {
            chartTitle_Start = "Ions"
        }
        const chartTitle_FirstLine = chartTitle_Start + " Chromatogram - m/z " + m_over_z_PersistentFeature.toFixed( 4 )

        const chartTitle = chartTitle_FirstLine + "<br>" + "Peak Area: " + _areaUnderCurve_Display_FormattingFunction( areaUnderCurve_Total )

        const chart_X_Axis_Label ="Time (min)"

        let chart_Y_Axis_Label = "Ion Current"

        if ( chartCreate__IonCurrent__IonCount__Enum === ChartCreate__IonCurrent__IonCount__Enum.ION_COUNT ) {
            chart_Y_Axis_Label = "Ions"
        }

        const chart_Layout: Partial<Layout> = {
            title:{
                text: chartTitle
            },
            autosize: false,
            width: _CHART_WIDTH,
            height: _CHART_HEIGHT,
            xaxis: {
                title: {
                    text: chart_X_Axis_Label
                },
                range: [ retentionTime_Minutes_Range_ForChart_Min, retentionTime_Minutes_Range_ForChart_Max ],

                exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
            },
            yaxis: {
                title: {
                    text: chart_Y_Axis_Label
                },
                exponentformat: 'e'
            },
            showlegend: true,
            legend: {
                // https://plotly.com/javascript/reference/#layout-legend-itemsizing
                itemsizing: 'constant' // Legend marker size will be constant
            }
        }

        if ( trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.length === 0 ) {

            //  Add Center message that there is NO data

            chart_Layout.annotations = [
                {
                    text: 'No data for selections above<br>and retention times: <br>' + this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min + " to " + this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max,
                    //  Center
                    x: 0.5,
                    y: 0.5,
                    xanchor: 'center',
                    yanchor: 'middle',
                    xref: 'paper',
                    yref: 'paper',
                    showarrow: false,
                    font: { size: 24 },
                    bgcolor: "white",
                    borderpad: 20
                }
            ]
        }

        //   Add grey rectangle with Persistent Feature Start and End:  +/- 30 seconds or 0.5 minutes

        // @ts-ignore
        chart_Layout.shapes = [
            {
                name: "Predicted Range",    //  Shown in legend
                showlegend: true,           //  Add to legend.  requires min Plotly version 2.27.0
                type: 'rect',
                // x-reference is assigned to the x-values
                xref: 'x',
                // y-reference is assigned to the plot paper [0,1]
                yref: 'paper',
                x0: ( this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.retentionTimeRange_Start ), // - 0.5,
                y0: 0,
                x1: ( this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.featureDetection_PersistentFeature_Entry.retentionTimeRange_End ), // + 0.5,
                y1: 1,
                fillcolor: '#a3a3a3',
                opacity: 0.2,
                line: {
                    width: 0
                }
            }
        ]

        let plotly_DOM_Element: HTMLDivElement = this.plot_div_Ref.current

        // if ( chartCreate__IonCurrent__IonCount__Enum === ChartCreate__IonCurrent__IonCount__Enum.ION_COUNT ) {
        //
        //     plotly_DOM_Element = this.plot_Ion_Count_Ref.current
        //
        // } else {
        //
        //     plotly_DOM_Element = this.plot_Ion_Current_Ref.current
        //
        // }

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: plotly_DOM_Element });

        const newPlotResulting_Promise = Plotly.newPlot(
            plotly_DOM_Element,
            chart_Data,
            chart_Layout,
            chart_config
        )

        //  Click handler NOT specific to a trace so need to accept click on point on any trace

        // @ts-ignore
        plotly_DOM_Element.on('plotly_click', (data) => {
            try {

                // console.log( "In 'plotly_click': data: ", data )

                if ( ! data.points ) {
                    return
                }
                if ( ! data.points.length ) {  // No length or length is zero
                    return
                }
                if ( ! ( data.points instanceof  Array ) ) {
                    throw Error("( ! ( data.points instanceof  Array ) )")
                }

                //  Just take first point

                const point = data.points[ 0 ]

                // console.log( "In 'plotly_click': data.points[0] (point): ", point )

                if ( point.curveNumber === trace_Psm_Points__ChartData_Index ) { // point.curveNumber // index in data of the trace associated with the selected point

                    //  clicked on Point in PSM Trace

                    //       Show the Single PSM data in a DataTable under the Chromatogram


                    const psm_Data_For_ClickHandler_Entry = psm_Data_For_ClickHandler_Entry_Array[ point.pointNumber ]  //  point.pointNumber  // index of the selected point

                    if ( ! psm_Data_For_ClickHandler_Entry ) {
                        const msg = "( point.curveNumber === trace_Psm_Points__ChartData_Index ) BUT psm_Data_For_ClickHandler_Entry_Array[ point.pointNumber ] returned NOTHING. point.pointNumber: " + point.pointNumber
                        console.warn(msg)
                        throw Error(msg)

                    } else {

                        if ( psm_Data_For_ClickHandler_Entry.psm_Tooltip_String !== point.hovertext ) {
                            const msg = "( point.curveNumber === trace_Psm_Points__ChartData_Index ) BUT psm_Data_For_ClickHandler_Entry_Array[ point.pointNumber ].psm_Tooltip_String !== point.hovertext. point.pointNumber: " + point.pointNumber
                            console.warn(msg)
                            throw Error(msg)
                        }

                        //  The PSM List Under Peptide Data Object

                        const psmList_UnderPeptide_DataTableObject = this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject


                        //   Take the DataTable object generated for putting PSM List under Reported Peptide or Peptide and add a "Peptide" column

                        //  Update the Table Header Columns

                        const dataTable_Columns_NewList: Array<DataTable_Column> = []
                        const dataTable_Column_DownloadTable_Entries_NewList: Array<DataTable_Column_DownloadTable> = []

                        for ( let index = 0; index < psmList_UnderPeptide_DataTableObject.columns.length; index++ ) {

                            if ( index === 1 ) {
                                //  Inject a column after the first column for the Peptide

                                const displayName = "Peptide";

                                const dataTable_Column = new DataTable_Column({
                                    id : "peptide", // Used for tracking sort order. Keep short
                                    displayName,
                                    width : 400,
                                    sortable : true,
                                });
                                dataTable_Columns_NewList.push( dataTable_Column );

                                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                                dataTable_Column_DownloadTable_Entries_NewList.push( dataTable_Column_DownloadTable );
                            }

                            const column = psmList_UnderPeptide_DataTableObject.columns[ index ]
                            dataTable_Columns_NewList.push( column )

                            const column_tableDownload = psmList_UnderPeptide_DataTableObject.columns_tableDownload[ index ]
                            dataTable_Column_DownloadTable_Entries_NewList.push( column_tableDownload )
                        }

                        //  Update the Table Data Columns

                        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

                        //  Only row is for clicked on psmId

                        const psmId = psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId

                        {
                            const psmList_DataTable_DataRowEntry_Map_Key_PsmId: Map<number, DataTable_DataRowEntry> = this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_DataRowEntries_Map_Key_Psm_Id

                            const psmList_DataTable_DataRowEntry_For_PsmId = psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psmId )
                            if ( ! psmList_DataTable_DataRowEntry_For_PsmId ) {
                                const msg = "psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId ) returned NOTHING. psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId: " +
                                    psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId + ", point.pointNumber: " + point.pointNumber
                                console.warn(msg)
                                throw Error(msg)
                            }

                            //  Column entries for this data row in data table
                            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
                            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                            {
                                for ( let index = 0; index < psmList_DataTable_DataRowEntry_For_PsmId.columnEntries.length; index++ ) {

                                    if ( index === 1 ) {
                                        //  Inject column for peptide
                                        const peptideSequenceDisplay = this._peptideSequenceDisplay_Map_Key_PSM_Id.get( psmId )
                                        if ( ! peptideSequenceDisplay ) {
                                            const msg = "this._peptideSequenceDisplay_Map_Key_PSM_Id.get( psmId ) returned NOTHING. psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId: " +
                                                psm_Data_For_ClickHandler_Entry.psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId + ", point.pointNumber: " + point.pointNumber
                                            console.warn(msg)
                                            throw Error(msg)
                                        }

                                        const valueDisplay = peptideSequenceDisplay;
                                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                                            searchTableData,
                                            valueDisplay,
                                            valueSort : peptideSequenceDisplay
                                        })
                                        columnEntries.push( columnEntry );

                                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                                    }

                                    const columnEntry = psmList_DataTable_DataRowEntry_For_PsmId.columnEntries[ index ]
                                    columnEntries.push( columnEntry )
                                }
                            }

                            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable( { dataColumns_tableDownload } );

                            const psmCounter = 1

                            let row_CSS_Additions: string = undefined;

                            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                                uniqueId: psmId,
                                sortOrder_OnEquals: psmCounter, // Original Sort Order
                                columnEntries,
                                dataTable_DataRowEntry_DownloadTable,
                                row_CSS_Additions
                            } )

                            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
                        }

                        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
                            columns : dataTable_Columns_NewList,
                            columns_tableDownload: dataTable_Column_DownloadTable_Entries_NewList,
                            dataTable_DataRowEntries
                        });

                        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

                        const dataTable_RootTableObject = new DataTable_RootTableObject({
                            dataTableId : "PSM Selected",
                            tableOptions,
                            tableDataObject : dataTable_RootTableDataObject
                        });

                        this._selected_PsmId = psmId
                        this._for_Selected_PsmId__dataTable_RootTableObject = dataTable_RootTableObject

                        //  clear  Individual Feature display
                        this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results = undefined

                        this.setState({ forceRerenderObject: {} })
                    }

                } else if ( point.curveNumber === trace_SingularFeature_Points__ChartData_Index ) { // point.curveNumber // index in data of the trace associated with the selected point

                    //  clicked on Point in Singular Feature Trace

                    //       Show the Single Singular Feature data in a DataTable under the Chromatogram

                    const singularFeatureEntry_ToPlot = singularFeatureEntry_ToPlot_In_PointOrder_Array[ point.pointNumber ]  //  point.pointNumber  // index of the selected point

                    if ( ! singularFeatureEntry_ToPlot ) {

                        const msg = "( point.curveNumber === trace_SingularFeature_Points__ChartData_Index ) BUT singularFeatureEntry_ToPlot_In_PointOrder_Array[ point.pointNumber ] returned NOTHING. point.pointNumber: " + point.pointNumber
                        console.warn(msg)
                        throw Error(msg)

                    } else {

                        if ( singularFeatureEntry_ToPlot.singularFeature_Tooltip_String !== point.hovertext ) {

                            const msg = "( point.curveNumber === trace_SingularFeature_Points__ChartData_Index ) BUT singularFeatureEntry_ToPlot_In_PointOrder_Array[ point.pointNumber ].singularFeature_Tooltip_String !== point.hovertext. point.pointNumber: " + point.pointNumber
                            console.warn( msg )
                            throw Error( msg )
                        }

                        this._selected_SingularFeatureId = singularFeatureEntry_ToPlot.singularFeatureItem.id

                        const singularFeature_Ids_Filter: Set<number> = new Set()
                        singularFeature_Ids_Filter.add( this._selected_SingularFeatureId )

                        this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results =
                            featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects({
                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results: this.props.featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results,
                                singularFeature_Ids_Filter
                            })

                        //  Clear PSM Display

                        this._for_Selected_PsmId__dataTable_RootTableObject = undefined

                        this.setState({ forceRerenderObject: {} })
                    }
                }

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }


        })  //  END OF:  plotly_DOM_Element.on('plotly_click', (data) => {

        //  Register callback on user selects zoom area in chart
        {
            //   @ts-ignore   'on' is added to DOM Element by Plotly
            plotly_DOM_Element.on("plotly_relayout", (eventdata: any) => {
                try {

                    if ( eventdata["xaxis.autorange"] || eventdata["xaxis.range"] ) {

                        //  User clicked on the icon for 'Autoscale' (first value in 'if') or 'Reset Axes' (second value in 'if')

                        //  Reset Mod Mass Min/Max selection

                        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Min
                        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Max


                        this._showUpdatingMessage = true
                        this._show_NO_DATA_ForSelection_Message = false;

                        this._singularFeatures_NOT_PutOnChart_ShowMessage = false

                        this.setState({ forceRerenderObject: {} })

                        window.setTimeout( () => { try {

                            this._createOnMount_And_OnUpdate()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        // this._areaUnderCurve_Value_Container_div_Ref.current.style.display = "none"

                        return // EARLY RETURN
                    }

                    if (eventdata["xaxis.range[1]"] !== undefined) {

                        //  Selected Range  - X axis is Retention Time in Minutes.  Y axis is ion current

                        const xaxis_range_0 = eventdata["xaxis.range[0]"];
                        const xaxis_range_1 = eventdata["xaxis.range[1]"];

                        // const yaxis_range_0 = eventdata["yaxis.range[0]"];
                        // const yaxis_range_1 = eventdata["yaxis.range[1]"];

                        let selectedRange_Start = Number.parseFloat( xaxis_range_0 )
                        let selectedRange_End = Number.parseFloat( xaxis_range_1 )

                        if ( selectedRange_Start < this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Min ) {
                            selectedRange_Start = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Min
                        }

                        if ( selectedRange_End > this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Max ) {
                            selectedRange_End = this.props.retentionTime_Minutes_Range_ForChart_FromUserInput_Max
                        }

                        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min = selectedRange_Start
                        this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max = selectedRange_End

                        this._showUpdatingMessage = true
                        this._show_NO_DATA_ForSelection_Message = false;

                        this._singularFeatures_NOT_PutOnChart_ShowMessage = false

                        this.setState({ forceRerenderObject: {} })

                        window.setTimeout( () => { try {

                            this._createOnMount_And_OnUpdate()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                        return // EARLY RETURN
                    }

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }


        ////

        if ( singularFeatures_NOT_PutOnChart_SingularFeature_IDs.size > 0 ) {

            //   NOT all SingularFeatures put on the chart, Display These SingularFeatures at zero on Y axis

            const scanData_NO_Peaks_Entry_Map_Key_ScanNumber: Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()

            for ( const scanItem of this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.data.scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures.scanData.scansArray ) {

                scanData_NO_Peaks_Entry_Map_Key_ScanNumber.set( scanItem.scanNumber, scanItem )
            }

            // let logMessage = "SingularFeatures NOT in m/z ranges so put on zero on Y axis: "

            for ( const singularFeatureEntry of this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.featureDetection_SingularFeature_Entries_For_PersistentId ) {

                if ( singularFeatures_NOT_PutOnChart_SingularFeature_IDs.has( singularFeatureEntry.id ) ) {

                    let scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( singularFeatureEntry.ms_1_scan_number )
                    if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                        throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( singularFeatureEntry.ms_1_scan_number ) returned NOTHING for singularFeatureEntry.ms_1_scan_number: " + singularFeatureEntry.ms_1_scan_number )
                    }
                    while ( scanData_NO_Peaks_Entry_MS_1.level > 1 ) {
                        scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber )
                        if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                            throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber ) returned NOTHING for scanData_NO_Peaks_Entry_MS_1.parentScanNumber: " + scanData_NO_Peaks_Entry_MS_1.parentScanNumber + ", singularFeatureEntry.ms_1_scan_number: " + singularFeatureEntry.ms_1_scan_number )
                        }
                    }

                    _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Plot_SingularFeature(
                        {
                            singularFeatureItem_ToPlot: singularFeatureEntry,
                            scanData_NO_Peaks_Entry_MS_1: scanData_NO_Peaks_Entry_MS_1,
                            scanItem: undefined,
                            peakToUse_DisplayDataForSingularFeature_Tooltip: undefined,  //  May NOT be populated
                            plot_Y_Value: 0,  // hard code to zero for these SingularFeatures

                            singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,

                            featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: this.props.featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

                            singularFeatureItem_Map_Key_SingularFeatureTooltip,
                            singularFeatureEntry_ToPlot_In_PointOrder_Array,

                            trace_SingularFeature_Points_X,
                            trace_SingularFeature_Points_Y,
                            trace_SingularFeature_Points_Tooltips,
                        } )

                    // logMessage += "\n SingularFeature: PsmId: " + singularFeatureEntry.singularFeatureId + ", scanNumber: " + singularFeatureEntry.scanNumber + ", precursor_M_Over_Z: " + singularFeatureEntry.precursor_M_Over_Z + ", scan_RetentionTimeMinutes: " + singularFeatureEntry.retentionTimeMinutes +
                    //     ", Associated MS 1 Scan Data:  scan number: " + scanData_NO_Peaks_Entry_MS_1.scanNumber +
                    //     ", retention time seconds: " + scanData_NO_Peaks_Entry_MS_1.retentionTime + ",  retention time minutes: " + scanData_NO_Peaks_Entry_MS_1.retentionTime / 60
                }
            }

            // console.log( logMessage )

        } else {

            //   YES all SingularFeatures put on the chart, NOT show overlay

            this._singularFeatures_NOT_PutOnChart_Count = singularFeatures_NOT_PutOnChart_SingularFeature_IDs.size

            this._singularFeatures_NOT_PutOnChart_ShowMessage = false
        }


    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}


    ///////////////

    /**
     * Create Plotly Trace values for ALL PSMs
     *
     * @param psm_ToPlot_All
     * @private
     */
    private async _plot_PSMs_All(
        {
            psm_ToPlot_All
        } : {
            psm_ToPlot_All: Internal__Psm_ToPlot_All
        }
    ) : Promise<{
        trace_Psm_Points_X: Array<number>
        trace_Psm_Points_Y: Array<number>
        trace_Psm_Points_Tooltips: Array<string>
        psm_Data_For_ClickHandler_Entry_Array: Array<Internal__Psm_Data_For_ClickHandler_Entry>
    }> {

        this._peptideSequenceDisplay_Map_Key_PSM_Id = new Map()

        const psmTooltip_String_DuplicateCheck: Set<string> = new Set()  //  To ensure all psmTooltip_String values are unique

        const trace_Psm_Points_X: Array<number> = []
        const trace_Psm_Points_Y: Array<number> = []
        const trace_Psm_Points_Tooltips: Array<string> = []

        const psm_Data_For_ClickHandler_Entry_Array: Array<Internal__Psm_Data_For_ClickHandler_Entry> = []

        for ( const psm_ToPlot_For_ProjectSearchId_Entry of psm_ToPlot_All.psm_ToPlot_For_ProjectSearchId_Map_Key_ProjectSearchId.values() ) {

            const projectSearchId = psm_ToPlot_For_ProjectSearchId_Entry.projectSearchId

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error( "No commonData_LoadedFromServer_PerSearch_For_ProjectSearchId for projectSearchId: " + projectSearchId );
            }

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result =
                await
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_ReturnPromise();

            const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Result.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

            const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                await
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise();

            const openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_Result.openModifications_On_PSM_For_MainFilters_Holder

            const peptideIds_For_MainFilters_Holder_AllForSearch_Result =
                await
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch_ReturnPromise();

            const get_PeptideSequencesHolder_AllForAllSearches_Result =
                await
                    this.props.featureDetection_ViewPage__Chromatogram_Component_Params.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                    get__commonData_LoadedFromServer__CommonAcrossSearches().
                    get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                    get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise();

            const peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.peptideSequences_For_MainFilters_Holder

            const psmEntries_Include_Map_Key_PsmId : Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> = new Map()

            for ( const psm_ToPlot_Entry of psm_ToPlot_For_ProjectSearchId_Entry.psm_ToPlot_Entry_Array ) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId({
                    psmId: psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId
                })
                psmEntries_Include_Map_Key_PsmId.set( entry.psmId, entry )
            }

            const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
                projectSearchId,
                reportedPeptideId: undefined,
                searchSubGroupId : undefined,
                psmEntries_Include_Map_Key_PsmId,
                openModPositionOverride: undefined,
                searchDataLookupParamsRoot: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.searchDataLookupParamsRoot,
                dataPageStateManager: this.props.featureDetection_ViewPage__Chromatogram_Component_Params.dataPageStateManager_DataFrom_Server,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__WhenAvailable: undefined  // Since NO Filter on Scan Peaks on Feature Detection Page
            });

            this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results =
                await
                    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects({ params: psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter })

            const psmList_DataTable_DataRowEntry_Map_Key_PsmId: Map<number, DataTable_DataRowEntry> = this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_DataRowEntries_Map_Key_Psm_Id

            for ( const psm_ToPlot_Entry of psm_ToPlot_For_ProjectSearchId_Entry.psm_ToPlot_Entry_Array ) {

                const reportedPeptideId = psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.reportedPeptideId

                const peptideId = peptideIds_For_MainFilters_Holder_AllForSearch_Result.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId );
                if ( ! peptideId ) {
                    const msg = "featureDetection_ViewPage__Chromatogram_Component.tsx: No peptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const peptideSequenceString : string = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId( peptideId );
                if ( ! peptideSequenceString ) {
                    throw Error("featureDetection_ViewPage__Chromatogram_Component.tsx: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId );
                }

                //  First combine all positional mods together into single map since will display all as Variable Mods in '[' ']'

                const modifications_combine_temp__Map_Key_Position : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();


                const variable_Dynamic_Modifications_for_ReportedPeptide =
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId )

                if ( variable_Dynamic_Modifications_for_ReportedPeptide ) {

                    //  Have Variable Mods for this reportedPeptideId
                    for (const dynamicModificationOnReportedPeptide of variable_Dynamic_Modifications_for_ReportedPeptide) {

                        //   is_N_Terminal and is_C_Terminal
                        const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
                        const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;

                        const mass = dynamicModificationOnReportedPeptide.mass;
                        let positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

                        if ( is_N_Terminal ) {

                            positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;

                        } else if ( is_C_Terminal ) {

                            positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                        }

                        let modifications_combine_temp_Entry = modifications_combine_temp__Map_Key_Position.get( positionOnReportedPeptide );
                        if ( ! modifications_combine_temp_Entry ) {
                            modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                            modifications_combine_temp__Map_Key_Position.set( positionOnReportedPeptide, modifications_combine_temp_Entry );
                        }

                        const massString = modificationMass_CommonRounding_ReturnString( mass );
                        modifications_combine_temp_Entry.push({massNumber: mass, massString})
                    }
                }

                let open_Modification_Rounded_NoPosition: string = undefined

                {
                    const psmOpenModificationMassPerPSM_ForPsmIdMap = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId )
                    if ( psmOpenModificationMassPerPSM_ForPsmIdMap ) {

                        let psmOpenModificationMassForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId )

                        //  Add when pass in 'modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass'

                        // if ( psmOpenModificationMassForPsmId && psmOpenModificationMassForPsmId.openModificationMass_Rounded === 0
                        //     && modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                        //
                        //     //  Open Mod Mass Rounded is Zero and User has selected to Treat Open Mod Mass Zero as Unmodified
                        //     //    So Remove Open Mod Mass from for PSM from Generation of this Generated Reported Peptide for this PSM.
                        //
                        //     psmOpenModificationMassForPsmId = null;
                        // }

                        if ( psmOpenModificationMassForPsmId ) {

                            const openModificationMass_String = modificationMass_CommonRounding_ReturnString( psmOpenModificationMassForPsmId.openModificationMass_Rounded );

                            let positionsMap_KeyPosition = psmOpenModificationMassForPsmId.positionsMap_KeyPosition
                            if ( positionsMap_KeyPosition && positionsMap_KeyPosition.size > 1 ) {
                                //  More than 1 position so set to 'null' to treat as NO position
                                positionsMap_KeyPosition = null
                            }

                            if ( positionsMap_KeyPosition ) {

                                if ( positionsMap_KeyPosition.size > 1 ) {
                                    throw Error( "( positionsMap_KeyPosition.size > 1 ) Error since only expect size of 1 due to code above that sets 'positionsMap_KeyPosition' to 'null' if size is > 1 " )
                                }
                                if ( positionsMap_KeyPosition.size === 0 ) {
                                    throw Error( "( positionsMap_KeyPosition.size === 0 ) Error since only expect 'positionsMap_KeyPosition' to NOT be 'null' if size is > 0" )
                                }

                                for ( const positionEntries_AtPosition of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.values() ) {

                                    for ( const positionEntry of positionEntries_AtPosition ) {

                                        let open_Modification_Rounded_Position = positionEntry.position;
                                        if ( positionEntry.isNTerminal ) {
                                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                                        } else if ( positionEntry.isCTerminal ) {
                                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                                        }

                                        let modifications_combine_temp_Entry = modifications_combine_temp__Map_Key_Position.get( open_Modification_Rounded_Position );
                                        if ( ! modifications_combine_temp_Entry ) {
                                            modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                                            modifications_combine_temp__Map_Key_Position.set( open_Modification_Rounded_Position, modifications_combine_temp_Entry );
                                        }

                                        modifications_combine_temp_Entry.push({massNumber: psmOpenModificationMassForPsmId.openModificationMass_Rounded, massString: openModificationMass_String})
                                    }
                                }
                            } else {
                                //  NO Position
                                open_Modification_Rounded_NoPosition = openModificationMass_String
                            }
                        }
                    }
                }

                const variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall : Map<number, Array<string>> = new Map();

                for (const modifications_combine_temp_Entry of modifications_combine_temp__Map_Key_Position.entries()) {
                    const modifications_combine_tempKey = modifications_combine_temp_Entry[0];
                    const modsRounded_ObjectsArray = modifications_combine_temp_Entry[1];

                    modsRounded_ObjectsArray.sort((a, b) => {
                        if (a.massNumber < b.massNumber) {
                            return -1;
                        } else if (a.massNumber > b.massNumber) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    const modsRoundedStringsArray : Array<string> = [];
                    for (const modRounded of modsRounded_ObjectsArray) {
                        const modRoundedString = modRounded.massString.toString();
                        modsRoundedStringsArray.push(modRoundedString);
                    }
                    variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall.set(modifications_combine_tempKey, modsRoundedStringsArray);
                }

                //   Call external function
                const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
                    peptideSequence : peptideSequenceString,
                    variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
                    open_Modification_Rounded : undefined,
                    open_Modification_Rounded_Position : undefined,
                    open_Modification_Rounded_NoPosition,
                    staticModificationsRounded_KeyPosition : undefined
                });

                this._peptideSequenceDisplay_Map_Key_PSM_Id.set( psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId, peptideSequenceDisplay )

                const retentionTimeSeconds = psm_ToPlot_Entry.psm_And_Its_ScanData.scanItem.scan_RetentionTime;  //  PSM positioned using retention time of MS 1 Scan

                const retentionTime_Minutes = retentionTimeSeconds / 60

                let psmTooltip: string = undefined

                const psmTooltipLines: Array<string> = []

                const psmList_DataTable_DataRowEntry = psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId )
                if ( ! psmList_DataTable_DataRowEntry ) {
                    throw Error("psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId ) returned NOTHING for psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId: " + psm_ToPlot_Entry.psm_And_Its_ScanData.psmItem.psmId )
                }

                if ( this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length !== psmList_DataTable_DataRowEntry.columnEntries.length ) {
                    throw Error("( psmList_DataTable_RootTableObject.tableDataObject.columns.length !== psmList_DataTable_DataRowEntry.columnEntries.length )")
                }

                const columnCount = this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length

                // Start at index 1 to skip first column (The link to Scan Browser) and the second column (Component for Scan Number and link to Lorikeet)

                for ( let columnIndex = 1; columnIndex < columnCount; columnIndex++  ) {

                    const tableColumnData = this._psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns[ columnIndex ]
                    if ( ! tableColumnData ) {
                        throw Error("psmList_DataTable_RootTableObject.tableDataObject.columns[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
                    }
                    const tableRowData_ForColumn = psmList_DataTable_DataRowEntry.columnEntries[ columnIndex ]
                    if ( ! tableRowData_ForColumn ) {
                        throw Error("psmList_DataTable_DataRowEntry.columnEntries[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
                    }

                    let valueToDisplay = tableRowData_ForColumn.valueDisplay

                    if ( columnIndex === 1 ) {
                        //  Process second column (Component for Scan Number and link to Lorikeet) Separately to get Scan Number from Sort Property

                        if ( tableRowData_ForColumn.valueSort === undefined || tableRowData_ForColumn.valueSort === null ) {
                            throw Error( "( columnIndex === 1 ) For Scan Number Cell AND ( tableRowData_ForColumn.valueSort === undefined || tableRowData_ForColumn.valueSort === null )")
                        }

                        valueToDisplay = tableRowData_ForColumn.valueSort.toString()
                    }

                    const psmTooltipLine = "<b>" + tableColumnData.displayName + "</b>: " + valueToDisplay;
                    psmTooltipLines.push( psmTooltipLine )
                }

                {
                    //  Code to ensure each PSM has a unique string for the PSM Tooltip.
                    //     This allows using the tooltip as the key to the map psmItem_Map_Key_PsmTooltip to get the psmItem Object from the tooltip string for handing click on PSM in chart

                    let psmTooltip_Unique = false

                    let psmTooltip_Unique_TryCount = 0;

                    const _TOOLTIP_LINE_INDENT = "   ";

                    while ( ! psmTooltip_Unique ) {

                        //  Set psmTooltip variable (declared above) here

                        psmTooltip = (
                            "<b>PSM Data</b>" +
                            ":" +
                            " ".repeat( psmTooltip_Unique_TryCount ) + //  Inserted to make unique
                            "<br>" +
                            _TOOLTIP_LINE_INDENT +
                            '<b>Peptide</b>: ' +
                            peptideSequenceDisplay +
                            "<br>" +
                            _TOOLTIP_LINE_INDENT +
                            psmTooltipLines.join("<br>" + _TOOLTIP_LINE_INDENT ) +
                            '<br>' +
                            '<br>' +
                            '<b>Associated MS 1 Scan</b>: ' +
                            '<br>' +
                            _TOOLTIP_LINE_INDENT +
                            '<b>MS 1 Scan Number</b>: ' + psm_ToPlot_Entry.psm_And_Its_ScanData.scanItem.scanNumber +
                            '<br>' +
                            _TOOLTIP_LINE_INDENT +
                            '<b>MS 1 Scan RT(Min)</b>: ' + ( retentionTime_Minutes ).toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                            "<br>" +
                            (
                                psm_ToPlot_Entry.psm_And_Its_ScanData.peakToUse_DisplayDataForSingularFeature_Tooltip ? (
                                    _TOOLTIP_LINE_INDENT +
                                    '<b>MS 1 Scan Peak M/Z</b>: ' + psm_ToPlot_Entry.psm_And_Its_ScanData.peakToUse_DisplayDataForSingularFeature_Tooltip.peak_MZ.toFixed( _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                                    '<br>' +
                                    _TOOLTIP_LINE_INDENT +
                                    '<b>MS 1 Scan ' + psm_ToPlot_Entry.psm_And_Its_ScanData.peakToUse_DisplayDataForSingularFeature_Tooltip.peak_Intensity_Or_IonCount__Label +
                                    '</b>: ' + psm_ToPlot_Entry.psm_And_Its_ScanData.peakToUse_DisplayDataForSingularFeature_Tooltip.peak_Intensity_Or_IonCount__Value.toPrecision( _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY )
                                ) : ""
                            )
                        )

                        if ( ! psmTooltip_String_DuplicateCheck.has( psmTooltip ) ) {

                            //  psmTooltip string is unique

                            psmTooltip_String_DuplicateCheck.add( psmTooltip )

                            psmTooltip_Unique = true;

                        } else {

                            psmTooltip_Unique_TryCount++
                        }
                    }
                }

                trace_Psm_Points_X.push( retentionTime_Minutes )
                trace_Psm_Points_Y.push( psm_ToPlot_Entry.plot_Y_Value )
                trace_Psm_Points_Tooltips.push( psmTooltip )


                psm_Data_For_ClickHandler_Entry_Array.push({
                    psm_Tooltip_String: psmTooltip,
                    psm_ToPlot_Entry
                })
            }
        }

        return {
            trace_Psm_Points_X, trace_Psm_Points_Y, trace_Psm_Points_Tooltips, psm_Data_For_ClickHandler_Entry_Array
        }
    }

    ////////////////////    RENDER

    /**
     *
     */
    render() {

        return (
            <div>
                <div style={ { position: "relative" } }>

                    {/* Show Area under the curve and the  Retention Time Range used */}

                    { this._areaUnderCurve_Display !== undefined ? (

                        <div style={ { marginBottom: 10 } }>
                            <div style={ { fontSize: 18 } }>
                                <span style={ { fontWeight: "bold" } }>Peak area: </span>
                                <span>
                                    { _areaUnderCurve_Display_FormattingFunction( this._areaUnderCurve_Display ) }
                                </span>
                            </div>
                            <div>
                                <span>Boundaries for peak area calculation: </span>
                                <span>
                                    { this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Min.toString() }
                                </span>
                                <span> minutes to </span>
                                <span>
                                    { this._retentionTime_Minutes_Range_ForChart_Local_PossiblyZoomIn_Max.toString() }
                                </span>
                                <span> minutes (calculated using Δ in seconds).</span>

                            </div>
                        </div>
                    ) : null }

                    {/*  Outer container <div> of the actual Chart  */ }
                    <div
                        style={ { width: _CHART_WIDTH, height: _CHART_HEIGHT, borderStyle: "solid", borderWidth: 1, borderColor: "black" } }
                    >
                        <div
                            ref={this.plot_div_Ref}
                            style={ { width: _CHART_WIDTH, height: _CHART_HEIGHT } }
                        ></div>
                    </div>


                    {/*  Overlay for Creating or Updating  */}
                    { this._showCreatingMessage || this._showUpdatingMessage || this._show_NO_DATA_ForSelection_Message || this._singularFeatures_NOT_PutOnChart_ShowMessage ? (
                        <div
                            className=" standard-background-color "
                            style={ {
                                fontSize: 24,
                                position: "absolute",
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                //  Center text in block
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            { this._showCreatingMessage ? (
                                <div>
                                    Creating Chart
                                </div>
                            ) : null }
                            { this._showUpdatingMessage ? (
                                <div>
                                    Updating Chart
                                </div>
                            ) : null }
                            { this._show_NO_DATA_ForSelection_Message ? (
                                <div>
                                    NO Data for Selection
                                </div>
                            ) : null }
                            { this._singularFeatures_NOT_PutOnChart_ShowMessage ? (
                                <div>
                                    { this._singularFeatures_NOT_PutOnChart_ShowMessage ? (
                                        <>
                                            <div>
                                                <span>
                                                    Warning: Found
                                                </span>
                                                <span> </span>
                                                <span>
                                                    { this._singularFeatures_NOT_PutOnChart_Count }
                                                </span>
                                                <span> </span>
                                                <span>
                                                    Singular Features that were not within +/-
                                                </span>
                                                <span> </span>
                                                <span>
                                                    { this.props.precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection }
                                                </span>
                                                <span> </span>
                                                <span>
                                                    ppm
                                                </span>
                                            </div>
                                            <div>
                                                of the calculated m/z for this peptide (plus modifications if any).
                                            </div>
                                        </>
                                    ) : null }

                                    <div style={ { marginTop: 10 } }>
                                        <button
                                            onClick={ event => {
                                                this._singularFeatures_NOT_PutOnChart_ShowMessage = false
                                                this.setState({ forceRerenderObject: {} })
                                            }}
                                        >
                                            OK
                                        </button>
                                    </div>

                                </div>
                            ) : null }
                        </div>
                    ) : null }
                </div>

                { this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results ? (

                    <div style={ { borderStyle: "solid", borderWidth: 1, borderColor: "black", marginTop: 5, paddingLeft: 5 } }>
                        <div style={ { marginTop: 10, marginBottom: 5 } }>
                            <span style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10, marginRight: 10 } }>
                                Selected Individual Feature
                            </span>
                            <span
                                className="fake-link"
                                onClick={ event => { try {
                                    event.stopPropagation()

                                    this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results = undefined

                                    this._selected_SingularFeatureId = undefined

                                    this.setState({ forceRerenderObject: {} })

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                }}
                            >
                                clear selection
                            </span>
                        </div>
                        <DataTable_TableRoot
                            tableObject={ this._for_Selected_SingularFeatureId__featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject }
                        />
                    </div>
                ) : null }

                { this._for_Selected_PsmId__dataTable_RootTableObject ? (

                    <div style={ { borderStyle: "solid", borderWidth: 1, borderColor: "black", marginTop: 5, paddingLeft: 5 } }>
                        <div style={ { marginTop: 10, marginBottom: 5 } }>
                            <span style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10, marginRight: 10 } }>
                                Selected PSM
                            </span>
                            <span
                                className="fake-link"
                                onClick={ event => { try {
                                    event.stopPropagation()

                                    this._for_Selected_PsmId__dataTable_RootTableObject = undefined

                                    this._selected_PsmId = undefined

                                    this.setState({ forceRerenderObject: {} })

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                }}
                            >
                                clear selection
                            </span>
                        </div>
                        <DataTable_TableRoot
                            tableObject={ this._for_Selected_PsmId__dataTable_RootTableObject }
                        />
                    </div>
                ) : null }
            </div>
        );
    }
}

////////////

//

/**
 *
 * @param plotlyTrace_Label
 * @param m_Over_Z_Window_Min
 * @param m_Over_Z_Window_Max
 * @param m_Over_Z_Window_Index
 * @param scanItem_Array_SortOn_RetentionTime
 * @param singularFeatureList_LOCAL_PossiblyFiltered
 * @param singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId
 * @param singularFeatureItem_Map_Key_SingularFeatureTooltip
 * @param singularFeatures_NOT_PutOnChart_SingularFeature_IDs
 * @param trace_Psm_Points_X
 * @param trace_Psm_Points_Y
 * @param trace_Psm_Points_Tooltips
 * @private
 */
const _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Create_Single_PlotlyTrace_Etc__For_MZ_OR_MZ_Plus_X_Isotope = function (
    {
        chartCreate__IonCurrent__IonCount__Enum,

        scanPeakSelect,
        smoothingOption_Selection,

        plotlyTrace_Label,
        plotlyTrace_Color,

        m_Over_Z_Window_Min,
        m_Over_Z_Window_Max,
        m_Over_Z_Window_Index,  // Not sure used

        scanItem_Array_SortOn_RetentionTime,

        psmTblData_Array__Map_Key_ProjectSearchId,

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

        dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId,

        featureDetection_ViewPage__Chromatogram_Component_Params,

        scanData_NO_Peaks_Data_Holder__ALL_SCANS,

        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,

        //  Updated
        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,
        singularFeatureItem_Map_Key_SingularFeatureTooltip,
        singularFeatureEntry_ToPlot_In_PointOrder_Array,
        singularFeatures_NOT_PutOnChart_SingularFeature_IDs,

        trace_SingularFeature_Points_X,
        trace_SingularFeature_Points_Y,
        trace_SingularFeature_Points_Tooltips,

        psm_ToPlot_All
    } : {
        chartCreate__IonCurrent__IonCount__Enum: ChartCreate__IonCurrent__IonCount__Enum

        scanPeakSelect: ScanPeakSelect_Enum

        smoothingOption_Selection: SmoothingOption_Enum

        plotlyTrace_Label: string
        plotlyTrace_Color: string

        m_Over_Z_Window_Min: number
        m_Over_Z_Window_Max: number
        m_Over_Z_Window_Index: number  // Not sure used

        scanItem_Array_SortOn_RetentionTime: Array<{
            scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
            scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
            scan_RetentionTime: number
            scanNumber: number
            scanLevel: number
        }>

        //  ONLY if have Searches
        psmTblData_Array__Map_Key_ProjectSearchId: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId: Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId

        featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params

        scanData_NO_Peaks_Data_Holder__ALL_SCANS: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results

        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter

        //  Updated
        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId: Map<number, DataTable_DataRowEntry>
        singularFeatureItem_Map_Key_SingularFeatureTooltip: Map<string, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>
        singularFeatureEntry_ToPlot_In_PointOrder_Array: Array<Internal__SingularFeature_Entry_ToPlot>
        singularFeatures_NOT_PutOnChart_SingularFeature_IDs: Set<number>

        trace_SingularFeature_Points_X: Array<number>
        trace_SingularFeature_Points_Y: Array<number>
        trace_SingularFeature_Points_Tooltips: Array<string>

        psm_ToPlot_All: Internal__Psm_ToPlot_All

    }
) : {
    plotly_TraceData: Plotly.Data
    areaUnderCurve_SingleTrace: number
} { // return any since return plotly trace

    // console.log( "START Plotly Trace for plotlyTrace_Label: " + plotlyTrace_Label )

    //  Middle between m_Over_Z_Window_Min and m_Over_Z_Window_Max
    const m_Over_Z_Window_Middle_Between_Min_Max = m_Over_Z_Window_Min + ( ( m_Over_Z_Window_Max - m_Over_Z_Window_Min ) / 2 )

    const singularFeatureItem_Array_Map_Key_Associated_MS_1_ScanNumber: Map<number, Array<{ singularFeatureItem: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry, singularFeatureItem_m_Over_Z_Min_Max__Ranges_Index: number }>> = new Map()

    const ms_1_ScanNumber_Map_Key_SingularFeatureId: Map<number, number> = new Map()

    const scanData_NO_Peaks_Entry_Map_Key_ScanNumber: Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()

    for ( const scanItem of dataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_For_Selected_ProjectScanFileId.data.scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures.scanData.scansArray ) {

        scanData_NO_Peaks_Entry_Map_Key_ScanNumber.set( scanItem.scanNumber, scanItem )
    }


    let psmItem_Array_Map_Key_Associated_MS_1_ScanNumber: Map<number, Array<{
        psmItem: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId, psmItem_m_Over_Z_Min_Max__Ranges_Index: number, projectSearchId: number
    }>> = undefined
    let ms_1_ScanNumber_Map_Key_PsmId: Map<number, number> = undefined


    if ( reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) {

        psmItem_Array_Map_Key_Associated_MS_1_ScanNumber = new Map()
        ms_1_ScanNumber_Map_Key_PsmId = new Map()

        for ( const projectSearchId of featureDetection_ViewPage__Chromatogram_Component_Params.projectSearchIds ) {

            const psmTblData_Array = psmTblData_Array__Map_Key_ProjectSearchId.get( projectSearchId )
            if ( ! psmTblData_Array ) {
                // NONE for projectSearchId
                continue // EARLY CONTINUE
            }

            for ( const psmItem of psmTblData_Array ) {

                const scanData_NO_Peaks_For_ScanNumber_On_PSM: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber = scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmItem.scanNumber )
                if ( ! scanData_NO_Peaks_For_ScanNumber_On_PSM ) {
                    const msg = "scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmItem.scanNumber ) returned NOTHING for psmItem.scanNumber: " + psmItem.scanNumber
                    console.warn(msg)
                    throw Error(msg)
                }

                {
                    let precursor_M_Over_Z = psmItem.precursor_M_Over_Z

                    if ( precursor_M_Over_Z === undefined || precursor_M_Over_Z == null ) {

                        precursor_M_Over_Z = scanData_NO_Peaks_For_ScanNumber_On_PSM.precursor_M_Over_Z;
                    }

                    if ( precursor_M_Over_Z < m_Over_Z_Window_Min || precursor_M_Over_Z > m_Over_Z_Window_Max ) {
                        // psmItem NOT for mz window so SKIP

                        continue; // EARLY CONTINUE
                    }
                }

                let scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_For_ScanNumber_On_PSM //  Initialize to scan number on PSM and then go up parentScanNumber until get to level 1

                while ( scanData_NO_Peaks_Entry_MS_1.level > 1 ) {
                    scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( scanData_NO_Peaks_Entry_MS_1.parentScanNumber )
                    if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                        throw Error("scanData_NO_Peaks_Data_Holder__ALL_SCANS.scanData.get_ScanData_NO_Peaks_For_ScanNumber( scanData_NO_Peaks_Entry_MS_1.parentScanNumber ) returned NOTHING for scanData_NO_Peaks_Entry_MS_1.parentScanNumber: " + scanData_NO_Peaks_Entry_MS_1.parentScanNumber + ", psmItem.scanNumber: " + psmItem.scanNumber )
                    }
                }

                let psmItem_Array = psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.scanNumber )
                if ( ! psmItem_Array ) {
                    psmItem_Array = []
                    psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.set( scanData_NO_Peaks_Entry_MS_1.scanNumber, psmItem_Array )
                }

                psmItem_Array.push({ psmItem, psmItem_m_Over_Z_Min_Max__Ranges_Index: m_Over_Z_Window_Index, projectSearchId })

                ms_1_ScanNumber_Map_Key_PsmId.set( psmItem.psmId, scanData_NO_Peaks_Entry_MS_1.scanNumber )
            }
        }
    }

    for ( const singularFeatureItem of featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.featureDetection_SingularFeature_Entries_For_PersistentId ) {

        const m_over_z_SingularFeature = singularFeatureItem.base_isotope_peak
        // PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge({
        //     monoisotopicMass: singularFeatureItem.monoisotopic_mass,
        //     charge: singularFeatureItem.charge
        // })

        if ( m_over_z_SingularFeature < m_Over_Z_Window_Min || m_over_z_SingularFeature > m_Over_Z_Window_Max ) {
            // singularFeatureItem NOT for mz window so SKIP
            continue; // EARLY CONTINUE
        }

        let scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( singularFeatureItem.ms_1_scan_number )
        if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
            throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( singularFeatureItem.ms_1_scan_number ) returned NOTHING for singularFeatureItem.ms_1_scan_number: " + singularFeatureItem.ms_1_scan_number )
        }
        while ( scanData_NO_Peaks_Entry_MS_1.level > 1 ) {
            scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber )
            if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber ) returned NOTHING for scanData_NO_Peaks_Entry_MS_1.parentScanNumber: " + scanData_NO_Peaks_Entry_MS_1.parentScanNumber + ", singularFeatureItem.scanNumber: " + singularFeatureItem.ms_1_scan_number )
            }
        }

        let singularFeatureItem_Array = singularFeatureItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.scanNumber )
        if ( ! singularFeatureItem_Array ) {
            singularFeatureItem_Array = []
            singularFeatureItem_Array_Map_Key_Associated_MS_1_ScanNumber.set( scanData_NO_Peaks_Entry_MS_1.scanNumber, singularFeatureItem_Array )
        }

        singularFeatureItem_Array.push({ singularFeatureItem, singularFeatureItem_m_Over_Z_Min_Max__Ranges_Index: m_Over_Z_Window_Index })

        ms_1_ScanNumber_Map_Key_SingularFeatureId.set( singularFeatureItem.id, scanData_NO_Peaks_Entry_MS_1.scanNumber )
    }

    //  For the SingularFeatures to go with the scans/peaks on this trace

    const singularFeature_And_Its_ScanData: Array<{
        singularFeatureItem: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
        scanItem: {
            scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
            scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
            scan_RetentionTime: number
            scanNumber: number
        }
        peakToUse_DisplayDataForSingularFeature_Tooltip: Internal__PeakToUse_DisplayDataForSingularFeature_Tooltip
        y_Trace_Index: number
    }> = []

    //  For the PSMs to go with the scans/peaks on this trace

    const psm_And_Its_ScanData_All: Internal__Psm_And_Its_ScanData_All = {
        psm_And_Its_ScanData_Array: []
    }

    //  For the Scan Trace

    const trace_rt_Intensity_Line_X: Array<number> = []
    let trace_rt_Intensity_Line_Y: Array<number> = []  // 'let' to allow replace after smoothing
    const trace_rt_Intensity_Tooltips: Array<string> = []

    //  Compute 'areaUnderCurve_SingleTrace'

    let areaUnderCurve_SingleTrace = 0

    //  Processing for each charge value
    {
        let scanCount_Where_MoreThanOnePeak_InsideWindow = 0;

        for ( const scanItem of scanItem_Array_SortOn_RetentionTime ) {

            if ( scanItem.scan_RetentionTime === undefined || scanItem.scan_RetentionTime === null ) {
                const msg = "( scanItem.scan_RetentionTime === undefined || scanItem.scan_RetentionTime === null ) "
                console.warn(msg)
                throw Error(msg)
            }

            const scan_retentionTime_Minutes = scanItem.scan_RetentionTime / 60 // convert RT to minutes

            const singularFeatureItem_Array_For_Associated_MS_1_ScanNumber = singularFeatureItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanItem.scanNumber )


            let psmItem_Array_For_Associated_MS_1_ScanNumber: Array<{
                psmItem: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId, psmItem_m_Over_Z_Min_Max__Ranges_Index: number, projectSearchId: number
            }> = undefined

            if ( psmItem_Array_Map_Key_Associated_MS_1_ScanNumber ) {
                psmItem_Array_For_Associated_MS_1_ScanNumber = psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanItem.scanNumber )
            }


            let noPeak_In_M_Over_Z_Range = false

            const scanItem_WithPeaks = scanItem.scan_WithPeaks

            if ( ! scanItem_WithPeaks || scanItem_WithPeaks.peaks.length === 0 ) {

                noPeak_In_M_Over_Z_Range = true

            } else {

                let peakToUse: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak = undefined
                let peakToUse_DifferenceFrom_M_Over_Z_RangeCenter: number = undefined

                for ( const peak of scanItem_WithPeaks.peaks ) {

                    if ( peak.mz < m_Over_Z_Window_Min || peak.mz > m_Over_Z_Window_Max ) {
                        // peak NOT for current mz window so SKIP
                        continue; // EARLY CONTINUE
                    }

                    if ( peakToUse === undefined ) {
                        peakToUse = peak
                        peakToUse_DifferenceFrom_M_Over_Z_RangeCenter = Math.abs( peak.mz - m_Over_Z_Window_Middle_Between_Min_Max )
                    } else {
                        scanCount_Where_MoreThanOnePeak_InsideWindow++

                        if ( scanPeakSelect === ScanPeakSelect_Enum.MAX_PEAK_INTENSITY ) {
                            if ( peakToUse.intensity < peak.intensity ) {
                                peakToUse = peak
                            }
                        } else if ( scanPeakSelect === ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE ) {

                            const peak_DifferenceFrom_M_Over_Z_RangeCenter = Math.abs( peak.mz - m_Over_Z_Window_Middle_Between_Min_Max )

                            if ( peak_DifferenceFrom_M_Over_Z_RangeCenter < peakToUse_DifferenceFrom_M_Over_Z_RangeCenter ) {
                                peakToUse = peak
                                peakToUse_DifferenceFrom_M_Over_Z_RangeCenter = Math.abs( peak.mz - m_Over_Z_Window_Middle_Between_Min_Max )
                            }
                        } else {
                            throw Error("Unknown value for scanPeakSelect: " + scanPeakSelect )
                        }
                    }
                }

                if ( ! peakToUse ) {
                    //  NO Peak on Scan is in the mz range for this charge so Set NO Peak In M/Z range flag to true

                    noPeak_In_M_Over_Z_Range = true

                } else {

                    let tooltip_Peak_Value_Label = "Peak Intensity"

                    let lineY_Value = peakToUse.intensity

                    if ( chartCreate__IonCurrent__IonCount__Enum === ChartCreate__IonCurrent__IonCount__Enum.ION_COUNT ) {

                        //  Ion Count

                        tooltip_Peak_Value_Label = "Peak Ion Count"

                        // Ion Count = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).

                        lineY_Value = peakToUse.intensity /  scanItem_WithPeaks.ionInjectionTime / 1000
                    }

                    const peakToUse_DisplayDataForSingularFeature_Tooltip: Internal__PeakToUse_DisplayDataForSingularFeature_Tooltip = {
                        peak_MZ: peakToUse.mz,
                        peak_Intensity_Or_IonCount__Label: tooltip_Peak_Value_Label,
                        peak_Intensity_Or_IonCount__Value: lineY_Value
                    }

                    trace_rt_Intensity_Line_X.push( scan_retentionTime_Minutes )
                    trace_rt_Intensity_Line_Y.push( lineY_Value )
                    trace_rt_Intensity_Tooltips.push(
                        "MS 1" +
                        "<br><b>Scan Number</b>: " + scanItem.scanNumber +
                        "<br><b>Scan Level</b>: " + scanItem.scanLevel +
                        "<br><b>Peak mz</b>: " + peakToUse.mz.toFixed( _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                        "<br><b>" + tooltip_Peak_Value_Label + "</b>: " + lineY_Value.toPrecision( _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY ) +
                        "<br><b>Retention Time (Min)</b>: " + scan_retentionTime_Minutes.toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) )



                    if ( trace_rt_Intensity_Line_X.length > 1 ) {

                        const chart_Y_Average = ( trace_rt_Intensity_Line_Y[ trace_rt_Intensity_Line_Y.length - 1 ] + trace_rt_Intensity_Line_Y[ trace_rt_Intensity_Line_Y.length - 2 ] ) / 2

                        const area = chart_Y_Average * ( ( trace_rt_Intensity_Line_X[ trace_rt_Intensity_Line_X.length - 1 ] - trace_rt_Intensity_Line_X[ trace_rt_Intensity_Line_X.length - 2 ] ) * 60 )  // '* 60' to change X axis values to seconds

                        areaUnderCurve_SingleTrace += area
                    }



                    const trace_rt_Intensity_Line_Y_LastIndexAdded = trace_rt_Intensity_Line_Y.length - 1;

                    if ( singularFeatureItem_Array_For_Associated_MS_1_ScanNumber ) {
                        //  Have SingularFeature Items for this MS 1 scan number

                        for ( const singularFeatureItem_Array_For_Associated_MS_1_ScanNumber_Item of singularFeatureItem_Array_For_Associated_MS_1_ScanNumber ) {

                            const singularFeatureItem_For_Associated_MS_1_ScanNumber = singularFeatureItem_Array_For_Associated_MS_1_ScanNumber_Item.singularFeatureItem

                            singularFeature_And_Its_ScanData.push({
                                singularFeatureItem: singularFeatureItem_For_Associated_MS_1_ScanNumber,
                                scanItem,
                                peakToUse_DisplayDataForSingularFeature_Tooltip,
                                y_Trace_Index: trace_rt_Intensity_Line_Y_LastIndexAdded
                            })
                        }
                    }

                    if ( psmItem_Array_For_Associated_MS_1_ScanNumber ) {
                        //  Have PSM Items for this MS 1 scan number

                        for ( const psmItem_Array_For_Associated_MS_1_ScanNumber_Item of psmItem_Array_For_Associated_MS_1_ScanNumber ) {

                            const psmItem_For_Associated_MS_1_ScanNumber = psmItem_Array_For_Associated_MS_1_ScanNumber_Item.psmItem

                            psm_And_Its_ScanData_All.psm_And_Its_ScanData_Array.push({
                                psmItem: psmItem_For_Associated_MS_1_ScanNumber,
                                scanItem,
                                peakToUse_DisplayDataForSingularFeature_Tooltip,
                                y_Trace_Index: trace_rt_Intensity_Line_Y_LastIndexAdded,
                                projectSearchId: psmItem_Array_For_Associated_MS_1_ScanNumber_Item.projectSearchId
                            })
                        }
                    }
                }
            }

            if ( noPeak_In_M_Over_Z_Range ) {

                trace_rt_Intensity_Line_X.push( scan_retentionTime_Minutes )
                trace_rt_Intensity_Line_Y.push( 0 )
                trace_rt_Intensity_Tooltips.push(
                    "MS 1" +
                    "<br><b>Scan Number</b>: " + scanItem.scanNumber +
                    "<br><b>Scan Level</b>: " + scanItem.scanLevel +
                    "<br><b>No Scan Peak</b>" +
                    "<br><b>Retention Time (Min)</b>: " + scan_retentionTime_Minutes.toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) )

                const trace_rt_Intensity_Line_Y_LastIndexAdded = trace_rt_Intensity_Line_Y.length - 1;

                if ( singularFeatureItem_Array_For_Associated_MS_1_ScanNumber ) {
                    //  Have SingularFeature Items for this MS 1 scan number

                    for ( const singularFeatureItem_Array_For_Associated_MS_1_ScanNumber_Item of singularFeatureItem_Array_For_Associated_MS_1_ScanNumber ) {

                        const singularFeatureItem_For_Associated_MS_1_ScanNumber = singularFeatureItem_Array_For_Associated_MS_1_ScanNumber_Item.singularFeatureItem

                        singularFeature_And_Its_ScanData.push({
                            singularFeatureItem: singularFeatureItem_For_Associated_MS_1_ScanNumber,
                            scanItem,
                            peakToUse_DisplayDataForSingularFeature_Tooltip: undefined,  //  May NOT be populated
                            y_Trace_Index: trace_rt_Intensity_Line_Y_LastIndexAdded
                        })
                    }

                }
            }
        }

        // console.log( "scanCount_Where_MoreThanOnePeak_InsideWindow: " + scanCount_Where_MoreThanOnePeak_InsideWindow )
    }

    if ( trace_rt_Intensity_Line_X.length > 0 ) {

        //  Scan Trace Smoothing if needed

        if ( smoothingOption_Selection === SmoothingOption_Enum.SAVITZKY_GOLAY ) {

            try {
                const result = smoothSavitzkyGolay( trace_rt_Intensity_Line_X, trace_rt_Intensity_Line_Y /* , smoothingFactor - Has Default */ )

                if ( result.x.length !== trace_rt_Intensity_Line_X.length ) {
                    const msg = "( result.x.length !== trace_rt_Intensity_Line_X.length )"
                    console.warn( msg )
                    throw Error( msg )
                }

                for ( let index = 0; index < trace_rt_Intensity_Line_X.length; index++ ) {

                    if ( result.x[ index ] !== trace_rt_Intensity_Line_X[ index ] ) {
                        const msg = "( result.x[index] !== trace_rt_Intensity_Line_X[index] )  index: " + index
                        console.warn( msg )
                        throw Error( msg )
                    }
                }

                trace_rt_Intensity_Line_Y = result.y

            } catch ( e ) {
                //  Eat Exception  Leave it not smoothed
            }

        } else if ( smoothingOption_Selection === SmoothingOption_Enum.LOWESS ) {

            // console.log( "BEFORE call to 'smoothLowess'.  Input X array: ", trace_rt_Intensity_Line_X )
            // console.log( "BEFORE call to 'smoothLowess'.  Input Y array: ", trace_rt_Intensity_Line_Y )
            // console.log( "BEFORE call to 'smoothLowess'.  NO 'smoothingFactor' parameter" )
            // console.log( "BEFORE call to 'smoothLowess'.  Reported Peptide Id: " + selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id )

            try {
                const result = smoothLowess( trace_rt_Intensity_Line_X, trace_rt_Intensity_Line_Y /* , smoothingFactor - Has Default */)

                // console.log( "AFTER call to 'smoothLowess'.  result: ", result )

                if ( ! result ) {
                    const msg = "smoothLowess returned nothing.  feature_detection_root__project_scnfl_mapping_tbl_Id: " + featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.feature_detection_root__project_scnfl_mapping_tbl_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! result.x ) {
                    const msg = "smoothLowess returned an object without a property 'x'.  feature_detection_root__project_scnfl_mapping_tbl_Id: " + featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.feature_detection_root__project_scnfl_mapping_tbl_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! Array.isArray( result.x )  ) {
                    const msg = "smoothLowess returned an object ( ! Array.isArray( result.x )  ).  feature_detection_root__project_scnfl_mapping_tbl_Id: " + featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.feature_detection_root__project_scnfl_mapping_tbl_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! Array.isArray( result.y)  ) {
                    const msg = "smoothLowess returned an object ( ! Array.isArray( result.y )  ).  feature_detection_root__project_scnfl_mapping_tbl_Id: " + featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter.feature_detection_root__project_scnfl_mapping_tbl_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( result.x.length !== result.y.length ) {
                    const msg = "( result.x.length !== result.y.length )"
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( result.x.length !== trace_rt_Intensity_Line_X.length ) {
                    const msg = "( result.x.length !== trace_rt_Intensity_Line_X.length )"
                    console.warn(msg)
                    throw Error(msg)
                }

                for ( let index = 0; index < trace_rt_Intensity_Line_X.length; index++ ) {

                    if ( result.x[index] !== trace_rt_Intensity_Line_X[index] ) {
                        const msg = "( result.x[index] !== trace_rt_Intensity_Line_X[index] )  index: " + index
                        console.warn(msg)
                        throw Error(msg)
                    }
                }

                trace_rt_Intensity_Line_Y =  result.y

            } catch ( e ) {
                //  Eat Exception  Leave it not smoothed
            }
        }

        //   Singular Feature Trace Additions

        {
            for ( const singularFeature_And_Its_ScanData_Entry of singularFeature_And_Its_ScanData ) {

                const plot_Y_Value = trace_rt_Intensity_Line_Y[ singularFeature_And_Its_ScanData_Entry.y_Trace_Index ]

                if ( plot_Y_Value === undefined ) {
                    const msg = "( plot_Y_Value === undefined ) Singular Feature : " + singularFeature_And_Its_ScanData_Entry.singularFeatureItem.id
                    console.warn(msg)
                    throw Error(msg)
                }

                _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Plot_SingularFeature(
                    {
                        singularFeatureItem_ToPlot: singularFeature_And_Its_ScanData_Entry.singularFeatureItem,
                        scanItem: singularFeature_And_Its_ScanData_Entry.scanItem,
                        scanData_NO_Peaks_Entry_MS_1: undefined,
                        peakToUse_DisplayDataForSingularFeature_Tooltip: singularFeature_And_Its_ScanData_Entry.peakToUse_DisplayDataForSingularFeature_Tooltip,  //  May NOT be populated

                        plot_Y_Value,

                        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,

                        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

                        singularFeatureItem_Map_Key_SingularFeatureTooltip,
                        singularFeatureEntry_ToPlot_In_PointOrder_Array,

                        trace_SingularFeature_Points_X,
                        trace_SingularFeature_Points_Y,
                        trace_SingularFeature_Points_Tooltips,
                    } )

                singularFeatures_NOT_PutOnChart_SingularFeature_IDs.delete( singularFeature_And_Its_ScanData_Entry.singularFeatureItem.id )  //  Delete since did put this singular feature id on the chart
            }
        }

        //   PSM Trace Additions

        {
            for ( const psm_And_Its_ScanData_Entry of psm_And_Its_ScanData_All.psm_And_Its_ScanData_Array ) {

                const plot_Y_Value = trace_rt_Intensity_Line_Y[ psm_And_Its_ScanData_Entry.y_Trace_Index ]

                if ( plot_Y_Value === undefined ) {
                    const msg = "( plot_Y_Value === undefined ) psmId: " + psm_And_Its_ScanData_Entry.psmItem.psmId
                    console.warn( msg )
                    throw Error( msg )
                }

                let psm_ToPlot_For_ProjectSearchId = psm_ToPlot_All.psm_ToPlot_For_ProjectSearchId_Map_Key_ProjectSearchId.get( psm_And_Its_ScanData_Entry.projectSearchId )
                if ( ! psm_ToPlot_For_ProjectSearchId ) {
                    psm_ToPlot_For_ProjectSearchId = new Internal__Psm_ToPlot_For_ProjectSearchId({ projectSearchId: psm_And_Its_ScanData_Entry.projectSearchId })
                    psm_ToPlot_All.psm_ToPlot_For_ProjectSearchId_Map_Key_ProjectSearchId.set( psm_And_Its_ScanData_Entry.projectSearchId, psm_ToPlot_For_ProjectSearchId )
                }

                psm_ToPlot_For_ProjectSearchId.psm_ToPlot_Entry_Array.push({
                    plot_Y_Value,
                    psm_And_Its_ScanData: psm_And_Its_ScanData_Entry
                })
            }
        }

        //  Scan Trace

        const trace_RT_Intensity_Line: Plotly.Data = {
            name: plotlyTrace_Label,
            x: trace_rt_Intensity_Line_X,
            y: trace_rt_Intensity_Line_Y,
            // type: 'scatter',
            mode: 'lines',
            marker: {
                color: plotlyTrace_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
            },
            //  This
            hoverinfo: "text", //  Hover contents
            hovertext: trace_rt_Intensity_Tooltips,
        };

        // console.log( "END Plotly Trace for plotlyTrace_Label: " + plotlyTrace_Label + ", returning a plotly trace object" )

        return  {  // EARLY RETURN

            plotly_TraceData: trace_RT_Intensity_Line,
            areaUnderCurve_SingleTrace
        }
    }

    // console.log( "END Plotly Trace for plotlyTrace_Label: " + plotlyTrace_Label + ", NOT returning a plotly trace object since NO points added to the trace" )

    return null //  NO data for trace so return null
}

///////////////

/**
 *
 * @param singularFeatureItem_ToPlot
 * @param scanData_NO_Peaks_Entry_MS_1
 * @param scanItem
 * @param peakToUse_DisplayDataForSingularFeature_Tooltip
 * @param plot_Y_Value
 * @param singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId
 * @param featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results
 * @param singularFeatureItem_Map_Key_SingularFeatureTooltip
 * @param singularFeatureEntry_ToPlot_In_PointOrder_Array
 * @param trace_SingularFeature_Points_X
 * @param trace_SingularFeature_Points_Y
 * @param trace_SingularFeature_Points_Tooltips
 */
const _for_Component__Internal_ShowPlot_FeatureDetection_ViewPage__Chromatogram_Component___Plot_SingularFeature = function (
    {
        singularFeatureItem_ToPlot,
        scanData_NO_Peaks_Entry_MS_1,
        scanItem,
        peakToUse_DisplayDataForSingularFeature_Tooltip,  //  May NOT be populated

        plot_Y_Value,   //  The 'Y' value for plotting.  Added to support smoothing

        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId,

        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results,

        singularFeatureItem_Map_Key_SingularFeatureTooltip,
        singularFeatureEntry_ToPlot_In_PointOrder_Array,

        trace_SingularFeature_Points_X,
        trace_SingularFeature_Points_Y,
        trace_SingularFeature_Points_Tooltips
    } : {
        singularFeatureItem_ToPlot: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
        scanData_NO_Peaks_Entry_MS_1:  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber

        scanItem: {
            scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
            scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
            scan_RetentionTime: number
            scanNumber: number
        }

        peakToUse_DisplayDataForSingularFeature_Tooltip: Internal__PeakToUse_DisplayDataForSingularFeature_Tooltip

        plot_Y_Value: number

        singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId: Map<number, DataTable_DataRowEntry>

        featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results

        //  UPDATED

        singularFeatureItem_Map_Key_SingularFeatureTooltip: Map<string, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>
        singularFeatureEntry_ToPlot_In_PointOrder_Array: Array<Internal__SingularFeature_Entry_ToPlot>

        trace_SingularFeature_Points_X: Array<number>
        trace_SingularFeature_Points_Y: Array<number>
        trace_SingularFeature_Points_Tooltips: Array<string>
    }
) {

    const singularFeatureList_DataTable_DataRowEntry = singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId.get( singularFeatureItem_ToPlot.id )
    if ( ! singularFeatureList_DataTable_DataRowEntry ) {
        throw Error("singularFeatureList_DataTable_DataRowEntry_Map_Key_SingularFeatureId.get( singularFeatureItem_ToPlot.id ) returned NOTHING for singularFeatureItem_ToPlot.id: " + singularFeatureItem_ToPlot.id )
    }

    let singularFeatureTooltip: string = undefined

    let scanNumber: number = undefined
    let scanRetentionTime_Minutes: number = undefined

    if ( scanData_NO_Peaks_Entry_MS_1 ) {

        scanNumber = scanData_NO_Peaks_Entry_MS_1.scanNumber
        scanRetentionTime_Minutes = scanData_NO_Peaks_Entry_MS_1.retentionTime_InSeconds / 60

    } else if ( scanItem ) {

        scanNumber = scanItem.scanNumber
        scanRetentionTime_Minutes = scanItem.scan_RetentionTime / 60 // scan_RetentionTime is in seconds

    } else {
        const msg = "Neither Populated: scanData_NO_Peaks_Entry_MS_1 or scanItem"
        console.warn(msg)
        throw Error(msg)
    }

    {
        const singularFeatureTooltipLines: Array<string> = []

        if ( featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length !== singularFeatureList_DataTable_DataRowEntry.columnEntries.length ) {
            throw Error("( singularFeatureList_DataTable_RootTableObject.tableDataObject.columns.length !== singularFeatureList_DataTable_DataRowEntry.columnEntries.length )")
        }

        const columnCount = featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length

        //  Start at columnIndex 1 since index zero is link to Scan Browser page

        for ( let columnIndex = 0; columnIndex < columnCount; columnIndex++  ) {

            const tableColumnData = featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns[ columnIndex ]
            if ( ! tableColumnData ) {
                throw Error("singularFeatureList_DataTable_RootTableObject.tableDataObject.columns[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
            }
            const tableRowData_ForColumn = singularFeatureList_DataTable_DataRowEntry.columnEntries[ columnIndex ]
            if ( ! tableRowData_ForColumn ) {
                throw Error("singularFeatureList_DataTable_DataRowEntry.columnEntries[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
            }

            if ( tableColumnData.displayName === undefined || tableColumnData.displayName === null ||
                tableRowData_ForColumn.valueDisplay === undefined || tableRowData_ForColumn.valueDisplay === null ) {
                //  Cannot put into tooltip if displayName or valueDisplay is undefined or null so skip

                continue;
            }

            const singularFeatureTooltipLine = "<b>" + tableColumnData.displayName + "</b>: " + tableRowData_ForColumn.valueDisplay;
            singularFeatureTooltipLines.push( singularFeatureTooltipLine )
        }

        {
            //  Code to ensure each SingularFeature has a unique string for the SingularFeature Tooltip.
            //     This allows using the tooltip as the key to the map singularFeatureItem_Map_Key_SingularFeatureTooltip to get the singularFeatureItem Object from the tooltip string for handing click on SingularFeature in chart

            let singularFeatureTooltip_Unique = false

            let singularFeatureTooltip_Unique_TryCount = 0;

            const _TOOLTIP_LINE_INDENT = "   ";

            while ( ! singularFeatureTooltip_Unique ) {

                //  Set singularFeatureTooltip variable (declared above) here

                singularFeatureTooltip = (
                    "<b>Singular Feature Data</b>" +
                    ":" +
                    " ".repeat( singularFeatureTooltip_Unique_TryCount ) + //  Inserted to make unique
                    "<br>" +
                    _TOOLTIP_LINE_INDENT +
                    singularFeatureTooltipLines.join("<br>" + _TOOLTIP_LINE_INDENT ) +
                    '<br>' +
                    '<br>' +
                    '<b>Associated MS 1 Scan</b>: ' +
                    '<br>' +
                    _TOOLTIP_LINE_INDENT +
                    '<b>MS 1 Scan Number</b>: ' +  scanNumber +
                    '<br>' +
                    _TOOLTIP_LINE_INDENT +
                    '<b>MS 1 Scan RT(Min)</b>: ' + ( scanRetentionTime_Minutes ).toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                    "<br>" +
                    (
                        peakToUse_DisplayDataForSingularFeature_Tooltip ? (
                            _TOOLTIP_LINE_INDENT +
                            '<b>MS 1 Scan Peak M/Z</b>: ' + peakToUse_DisplayDataForSingularFeature_Tooltip.peak_MZ.toFixed( _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                            '<br>' +
                            _TOOLTIP_LINE_INDENT +
                            '<b>MS 1 Scan ' + peakToUse_DisplayDataForSingularFeature_Tooltip.peak_Intensity_Or_IonCount__Label +
                            '</b>: ' + peakToUse_DisplayDataForSingularFeature_Tooltip.peak_Intensity_Or_IonCount__Value.toPrecision( _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY )
                        ) : ""
                    )
                )

                if ( ! singularFeatureItem_Map_Key_SingularFeatureTooltip.has( singularFeatureTooltip ) ) {

                    //  singularFeatureTooltip string is unique in map keys

                    singularFeatureItem_Map_Key_SingularFeatureTooltip.set( singularFeatureTooltip, singularFeatureItem_ToPlot )

                    singularFeatureEntry_ToPlot_In_PointOrder_Array.push({
                        singularFeatureItem: singularFeatureItem_ToPlot, singularFeature_Tooltip_String: singularFeatureTooltip
                    } )

                    singularFeatureTooltip_Unique = true;

                } else {

                    singularFeatureTooltip_Unique_TryCount++
                }
            }

        }
    }

    trace_SingularFeature_Points_X.push( scanRetentionTime_Minutes )    //  SingularFeature positioned using retention time of MS 1 Scan
    trace_SingularFeature_Points_Y.push( plot_Y_Value )
    trace_SingularFeature_Points_Tooltips.push( singularFeatureTooltip )
}




////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Plot Type: Ion Current Vs Ions


/**
 *
 */
interface Internal__PlotType_IonCurrent_VS_Ions_Component_Props {

    onChange_Callback: (newSelectionValue: PlotType_IonCurrent_VS_Ions_Select_Enum ) => void
}

/**
 *
 */
interface Internal__PlotType_IonCurrent_VS_Ions_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__PlotType_IonCurrent_VS_Ions_Component extends React.Component< Internal__PlotType_IonCurrent_VS_Ions_Component_Props, Internal__PlotType_IonCurrent_VS_Ions_Component_State > {

    private _plotType_IonCurrent_VS_Ions_Select: PlotType_IonCurrent_VS_Ions_Select_Enum = _plotType_IonCurrent_VS_Ions_Select_DEFAULT

    /**
     *
     */
    constructor( props: Internal__PlotType_IonCurrent_VS_Ions_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Plot Using:</span>

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._plotType_IonCurrent_VS_Ions_Select === PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT }
                        onChange={ event => { try {

                            this._plotType_IonCurrent_VS_Ions_Select = PlotType_IonCurrent_VS_Ions_Select_Enum.ION_CURRENT

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._plotType_IonCurrent_VS_Ions_Select)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Ion Current</span>
                </label>
                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._plotType_IonCurrent_VS_Ions_Select === PlotType_IonCurrent_VS_Ions_Select_Enum.IONS }
                        onChange={ event => { try {

                            this._plotType_IonCurrent_VS_Ions_Select = PlotType_IonCurrent_VS_Ions_Select_Enum.IONS

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._plotType_IonCurrent_VS_Ions_Select)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Ions</span>
                </label>
            </div>
        );
    }
}

////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Peak Selection


/**
 *
 */
interface Internal__PeakSelection_Component_Props {

    onChange_Callback: (newSelectionValue: ScanPeakSelect_Enum ) => void
}

/**
 *
 */
interface Internal__PeakSelection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__PeakSelection_Component extends React.Component< Internal__PeakSelection_Component_Props, Internal__PeakSelection_Component_State > {

    private _scanPeakSelect: ScanPeakSelect_Enum = _scanPeakSelect_DEFAULT

    /**
     *
     */
    constructor( props: Internal__PeakSelection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Peak Selection:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            A m/z is calculated for the selected ion based on the peptide sequence, any modifications, and the charge state.
                            This m/z serves as the center of a m/z window of a specified width (see below).
                            This option determines which peak in the MS1 spectrum is used to build the chromatogram.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._scanPeakSelect === ScanPeakSelect_Enum.MAX_PEAK_INTENSITY }
                        onChange={ event => { try {

                            this._scanPeakSelect = ScanPeakSelect_Enum.MAX_PEAK_INTENSITY

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._scanPeakSelect)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Max Intensity</span>
                </label>
                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._scanPeakSelect === ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE }
                        onChange={ event => { try {

                            this._scanPeakSelect = ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._scanPeakSelect)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Nearest Peak</span>
                </label>
            </div>
        );
    }
}

////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Smoothing Selection

/**
 *
 */
interface Internal__SmoothingSelection_Component_Props {

    onChange_Callback: (newSelectionValue: SmoothingOption_Enum ) => void
}

/**
 *
 */
interface Internal__SmoothingSelection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__SmoothingSelection_Component extends React.Component< Internal__SmoothingSelection_Component_Props, Internal__SmoothingSelection_Component_State > {

    private _smoothingOption_Selection: SmoothingOption_Enum = _smoothingOption_Selection_DEFAULT

    /**
     *
     */
    constructor( props: Internal__SmoothingSelection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>Smoothing:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply a smoothing algorithm to reduce noise in the generated chromatogram while retaining overall patterns.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === SmoothingOption_Enum.NONE }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = SmoothingOption_Enum.NONE

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> None</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply no smoothing
                        </span>
                    }
                    no_Margin_Left={ true }
                />

                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === SmoothingOption_Enum.LOWESS }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = SmoothingOption_Enum.LOWESS

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> LOWESS</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply the LOWESS (locally weighted least squares) smoother. Performs better with wider peaks.
                        </span>
                    }
                    no_Margin_Left={ true }
                />

                <span> </span>
                <label>
                    <input
                        type="radio"
                        checked={ this._smoothingOption_Selection === SmoothingOption_Enum.SAVITZKY_GOLAY }
                        onChange={ event => { try {

                            this._smoothingOption_Selection = SmoothingOption_Enum.SAVITZKY_GOLAY

                            this.setState({ forceRerenderObject: {} })

                            window.setTimeout( () => { try {

                                this.props.onChange_Callback(this._smoothingOption_Selection)

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                    />
                    <span> Savitzky-Golay</span>
                </label>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            Apply the Savitzky–Golay filter to smooth the data, a popular method for signal smoothing in analytical chemistry.
                        </span>
                    }
                    no_Margin_Left={ true }
                />

            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the MS1 Window Size Selection

/**
 *
 */
interface Internal__MS1_Window_Size_Selection_Component_Props {

    onChange_Callback: (newSelectionValue: number ) => void
}

/**
 *
 */
interface Internal__MS1_Window_Size_Selection_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__MS1_Window_Size_Selection_Component extends React.Component< Internal__MS1_Window_Size_Selection_Component_Props, Internal__MS1_Window_Size_Selection_Component_State > {

    private _precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues  //  Set default

    /**
     *
     */
    constructor( props: Internal__MS1_Window_Size_Selection_Component_Props ) {
        super( props );

        this.state = { forceRerenderObject: {} }
    }

    render() {
        return (
            <div>
                <span>MS1 Window Size:</span>

                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                    title={
                        <span>
                            This is the size of the window to use when picking a peak from the MS1 scan to use to build the chromatogram.
                            The window will be centered on the m/z calculated for this ion and
                            will extend this distance both in the positive and negative direction.
                        </span>
                    }
                />

                <span>&nbsp;</span>

                { _SELECTION_VALUES__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues.map(( selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item, index, array) => {

                    return (
                        <React.Fragment key={ selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item }>
                            <span> </span>
                            <label>
                                <input
                                    type="radio"
                                    checked={ this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection === selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item }
                                    onChange={ event => { try {

                                        this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item

                                        window.setTimeout( () => { try {

                                            this.props.onChange_Callback(this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection)

                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                                        this.setState({ forceRerenderObject: {} })

                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                />
                                <span> +/-{ selectionValue__precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Item } ppm</span>
                            </label>

                        </React.Fragment>
                    )
                })}
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Retention Time Min/Max

class Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params {
    retentionTime_Minutes_Range_ForChart_Min: number
    retentionTime_Minutes_Range_ForChart_Max: number
}

type Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback =
    (params: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params) => void


/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserEditable_Component_Props {

    force_SetTo_ValueFromParent: object  // On object reference change, the input values will be set to the values from Parent

    retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: number
    retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: number

    retentionTime_Minutes_Range_ForChart_Min__DefaultValue: number
    retentionTime_Minutes_Range_ForChart_Max__DefaultValue: number

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
}

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserEditable_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__RetentionTime_Min_Max_UserEditable_Component extends React.Component< Internal__RetentionTime_Min_Max_UserEditable_Component_Props, Internal__RetentionTime_Min_Max_UserEditable_Component_State > {

    private _retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis = this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults.bind(this)

    private _retentionTime_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    private _retentionTimeMinutes_Range_ForChart_Min__Current__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current__Number: number

    /**
     *
     */
    constructor( props: Internal__RetentionTime_Min_Max_UserEditable_Component_Props ) {
        super( props );

        this._retentionTime_Div_Ref = React.createRef()

        this._set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(props)

        this.state = { forceRerenderObject: {} }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<Internal__RetentionTime_Min_Max_UserEditable_Component_Props>, prevState: Readonly<Internal__RetentionTime_Min_Max_UserEditable_Component_State>, snapshot?: any ) {

        if ( prevProps.force_SetTo_ValueFromParent !== this.props.force_SetTo_ValueFromParent ) {

            this._set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(this.props)

            this.setState({ forceRerenderObject: {} })
        }
    }

    /**
     *
     */
    private _set_LocalProperties_On_Create_Or_SetTo_ValuesFromParent(props: Internal__RetentionTime_Min_Max_UserEditable_Component_Props) {

        if ( this._retentionTimeMinutes_Range_ForChart_Min__Current__Number === props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
            && this._retentionTimeMinutes_Range_ForChart_Max__Current__Number=== props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent ) {

            //  Already have current values

            return // EARLY RETURN
        }

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent
    }

    /**
     *
     */
    private _set_LocalProperties_On_Create_Or_SetTo_Defaults() {

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     */
    private _retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults(
        params: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params
    ) {
        try {


            this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = params.retentionTime_Minutes_Range_ForChart_Min
            this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = params.retentionTime_Minutes_Range_ForChart_Max

            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => {
                try {
                    this.props.updatedValues_Callback({
                        retentionTime_Minutes_Range_ForChart_Min: this._retentionTimeMinutes_Range_ForChart_Min__Current__Number,
                        retentionTime_Minutes_Range_ForChart_Max: this._retentionTimeMinutes_Range_ForChart_Max__Current__Number
                    })
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, 10 )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>


                    <div
                        ref={ this._retentionTime_Div_Ref }
                    >
                        <span>Retention time range (minutes):</span>

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <div>
                                    <div>
                                        A chromatogram will be built for this range of retention times.
                                    </div>
                                    <div style={ { marginTop: 5 } }>
                                        By default the range will be the retention time of the earliest PSM (minus 30 seconds) to the retention time of the latest PSM (plus 30 seconds).
                                    </div>
                                </div>
                            }
                        />

                        <span style={ { marginLeft: _MARGIN_LEFT_AFTER_HELP_SYMBOL } }> Start: </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to change retention time start and end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" filter-single-value-display-block  clickable "
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                { this._retentionTimeMinutes_Range_ForChart_Min__Current__Number }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span>  End: </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Click to change retention time start and end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <span
                                className=" filter-single-value-display-block  clickable "
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                { this._retentionTimeMinutes_Range_ForChart_Max__Current__Number }
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Change retention time start and time end
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {  try {

                                    const retentionTime_Div_BoundingRect = this._retentionTime_Div_Ref.current.getBoundingClientRect();

                                    let position_top =  retentionTime_Div_BoundingRect.top;
                                    let position_left =  retentionTime_Div_BoundingRect.left;

                                    Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay({
                                        retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent,
                                        retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: this.props.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent,

                                        retentionTime_Minutes_Range_ForChart_Min__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max__DefaultValue: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue,

                                        position_top,
                                        position_left,

                                        updatedValues_Callback: this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults_BindThis
                                    })
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                Change
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>

                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Reset to Retention Time Defaults based on PSM retention times
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => { try {

                                    this._set_LocalProperties_On_Create_Or_SetTo_Defaults()

                                    this._retentionTimes_Updated_FromOverlay_OrFrom_ResetToDefaults({
                                        retentionTime_Minutes_Range_ForChart_Min: this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue,
                                        retentionTime_Minutes_Range_ForChart_Max: this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue
                                    })
                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Min__DefaultValue
                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.retentionTime_Minutes_Range_ForChart_Max__DefaultValue

                                    this.setState({ forceRerenderObject: {} })

                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                            >
                                Reset
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    </div>
                </div>
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////

//    Internal Component for User change the Retention Time Min/Max OVERLAY

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues {

    retentionTime_Minutes_Range_ForChart_Min__ValueFromParent: number
    retentionTime_Minutes_Range_ForChart_Max__ValueFromParent: number

    retentionTime_Minutes_Range_ForChart_Min__DefaultValue: number
    retentionTime_Minutes_Range_ForChart_Max__DefaultValue: number

    position_top: number
    position_left: number

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
}

const Internal__RetentionTime_Min_Max_UserInput_Overlay_Component__OpenOverlay = function (
    params: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues
) {

    if ( params.position_top > window.innerHeight - 160 ) {
        params.position_top = window.innerHeight - 160;
    }
    if ( params.position_top < 10 ) {
        params.position_top = 10;
    }

    if ( params.position_left < 10 ) {
        params.position_left = 10;
    }
    if ( params.position_left > 100 ) {
        params.position_left = 100;
    }

    const window_innerWidth = window.innerWidth - 10; // Subtract 10 for vertical scroll bar

    const width_OtherThan_searchName_InputField = 150;

    let searchName_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_searchName_InputField + searchName_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        searchName_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_searchName_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params ) => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.updatedValues_Callback( params_To_change_Callback_Local )
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();
    }

    const componentToAdd = (
        <Internal__RetentionTime_Min_Max_UserInput_Overlay_Component
            paramValues={ params }
            updatedValues_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    )

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}


/////////

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props {

    paramValues: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_ParamValues

    updatedValues_Callback: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
class Internal__RetentionTime_Min_Max_UserInput_Overlay_Component extends React.Component< Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props, Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_State > {

    private readonly _NUMBER_NOT_ASSIGNED: number = undefined

    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString: string
    private _retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString: string

    private _retentionTimeMinutes_Range_ForChart_Min__Current__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current__Number: number

    private _updateButton_Enabled = true

    /**
     *
     */
    constructor( props: Internal__RetentionTime_Min_Max_UserInput_Overlay_Component_Props ) {
        super( props );

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent

        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Min__ValueFromParent.toString()
        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = this.props.paramValues.retentionTime_Minutes_Range_ForChart_Max__ValueFromParent.toString()

        this.state = { forceRerenderObject: {} }
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            this.props.updatedValues_Callback({
                retentionTime_Minutes_Range_ForChart_Min: this._retentionTimeMinutes_Range_ForChart_Min__Current__Number,
                retentionTime_Minutes_Range_ForChart_Max: this._retentionTimeMinutes_Range_ForChart_Max__Current__Number
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _is_AllNumbersValid() {

        if ( this._retentionTimeMinutes_Range_ForChart_Min__Current__Number === this._NUMBER_NOT_ASSIGNED ||
            this._retentionTimeMinutes_Range_ForChart_Max__Current__Number === this._NUMBER_NOT_ASSIGNED ) {

            return false
        }

        return true
    }

    /**
     *
     */
    private _set_UpdateButton_Enabled() {

        if ( ! this._is_AllNumbersValid() ) {

            this._updateButton_Enabled = false

            this.setState({ forceRerenderObject: {} })

            return // EARLY RETURN
        }

        this._updateButton_Enabled = true

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     */
    render() {

        const _INPUT_FIELD_MAX_LENGTH = 15
        const _INPUT_FIELD_WIDTH = 60

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.paramValues.position_top, left: this.props.paramValues.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >

                            <span>Retention time range (minutes):</span>

                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                title={
                                    <div>
                                        <div>
                                            A chromatogram will be built for this range of retention times.
                                        </div>
                                    </div>
                                }
                            />

                            <span style={ { marginLeft: _MARGIN_LEFT_AFTER_HELP_SYMBOL } }> Start: </span>

                            <input
                                value={ this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString }
                                maxLength={ _INPUT_FIELD_MAX_LENGTH }
                                style={ { width: _INPUT_FIELD_WIDTH } }
                                onChange={ event => {
                                    const valueString = event.target.value
                                    if ( valueString === "" || valueString === "." || valueString === "-" ) {
                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = valueString
                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this._NUMBER_NOT_ASSIGNED

                                        this._set_UpdateButton_Enabled()

                                        return // EARLY RETURN
                                    }

                                    const valueNumber = Number.parseFloat( valueString )
                                    if ( Number.isNaN( valueNumber ) ) {
                                        //  Not a number so ignore new value
                                        return; // EARLY RETURN
                                    }

                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = valueNumber

                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = valueNumber.toString()

                                    if ( valueString.endsWith( "." ) ) {

                                        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString += "."
                                    }

                                    this._set_UpdateButton_Enabled()

                                } }
                            />

                            <span> End: </span>

                            <input
                                value={ this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString }
                                maxLength={ _INPUT_FIELD_MAX_LENGTH }
                                style={ { width: _INPUT_FIELD_WIDTH } }
                                onChange={ event => {
                                    const valueString = event.target.value
                                    if ( valueString === "" || valueString === "." || valueString === "-" ) {
                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = valueString
                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this._NUMBER_NOT_ASSIGNED

                                        this._set_UpdateButton_Enabled()

                                        return // EARLY RETURN
                                    }

                                    const valueNumber = Number.parseFloat( valueString )
                                    if ( Number.isNaN( valueNumber ) ) {
                                        //  Not a number so ignore new value
                                        return; // EARLY RETURN
                                    }

                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = valueNumber

                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = valueNumber.toString()

                                    if ( valueString.endsWith( "." ) ) {

                                        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString += "."
                                    }

                                    this._set_UpdateButton_Enabled()

                                } }
                            />

                            <span> </span>

                            <div style={ { position: "relative", display: "inline-block" } }>
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        this._updateButton_Enabled ? (
                                            <span>
                                                Update chart with retention time start and end entered
                                            </span>
                                        ) : (
                                            <span>
                                                Start and End must be populated with decimal numbers
                                            </span>
                                        )
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <span>
                                        <button
                                            type="submit"
                                            disabled={ ! this._updateButton_Enabled }
                                            //  containing form has onSubmit
                                        >
                                            Update
                                        </button>
                                    </span>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            </div>

                            <span> </span>

                            <button
                                onClick={ event => {
                                    try {
                                        event.preventDefault();  // Stop form.onsubmit code from running

                                        this.props.cancel_Callback()

                                    } catch ( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                        throw e
                                    }
                                } }
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


/////////////////////////


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////


/**
 * Apply Math floor or ceil to # decimal places in _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT__POW_10
 */
const _compute_RT_Minutes_FloorCeil_FromMinutes_Apply_Math_floor_or_ceil_To_NumberOfDecimalPlaces = function ( retentionTimeMinutes: number, math_FloorCeil: INTERNAL__MATH_FLOOR_CEIL ) {

    let retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil = retentionTimeMinutes * _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT__POW_10

    if ( math_FloorCeil === INTERNAL__MATH_FLOOR_CEIL.FLOOR ) {

        retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil = Math.floor( retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil )

    } else if ( math_FloorCeil === INTERNAL__MATH_FLOOR_CEIL.CEIL ) {

        retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil = Math.ceil( retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil )

    } else {
        const msg = "Unknown value for math_FloorCeil: " + math_FloorCeil
        console.warn(msg)
        throw Error(msg)
    }

    const retentionTimeMinutes_Floor_OR_Ceil_To_X_Decimal = retentionTimeMinutes_Times_X_DecimalPlaces__Then_Math_Floor_OR_Ceil / _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT__POW_10

    return retentionTimeMinutes_Floor_OR_Ceil_To_X_Decimal
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

////////////////////
////////////////////

////   Internal Classes

/**
 *
 */
class Internal__RetentionTimeMinutes_Range_Min_Max {
    readonly retentionTime_Minutes_Range_Min: number
    readonly retentionTime_Minutes_Range_Max: number
}

/**
 *
 */
class Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId {

    readonly data: {
        readonly projectScanFileId: number

        readonly ms_1_scanNumbers_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder

        readonly scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

        // readonly compute_BasedOnSingularFeatures_Compute_DataFrom_SingularFeatures_For_Single_ProjectScanFileId__Result: FeatureDetection_ViewPage__Chromatogram_Compute_DataFrom_SingularFeatures_For_Single_ProjectScanFileId__Result_Root

        readonly retentionTime_Minutes_Range_Min_Max__LoadingDataFor: Internal__RetentionTimeMinutes_Range_Min_Max

        // readonly data_BasedOnSingularFeatures_Get_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId: FeatureDetection_ViewPage__Chromatogram_Get_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Root
    }

    constructor(
        {
            data
        } : {
            data: {
                readonly projectScanFileId: number

                readonly ms_1_scanNumbers_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId_RetentionTimeRange__MS_1_ScanNumbers_Data_Holder

                readonly scanData_NO_Peaks_Data_Holder__For_ALL_SingularFeatures: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

                // readonly compute_BasedOnSingularFeatures_Compute_DataFrom_SingularFeatures_For_Single_ProjectScanFileId__Result: FeatureDetection_ViewPage__Chromatogram_Compute_DataFrom_SingularFeatures_For_Single_ProjectScanFileId__Result_Root

                readonly retentionTime_Minutes_Range_Min_Max__LoadingDataFor: Internal__RetentionTimeMinutes_Range_Min_Max

                // readonly data_BasedOnSingularFeatures_Get_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId: FeatureDetection_ViewPage__Chromatogram_Get_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId_Root
            }
        }
    ) {
        this.data = data
    }

    is_Data_FullyLoaded(
        {
            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId, dataFromServer_Scans_NO_For_Single_ProjectScanFileId
        } : {
            dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId
            dataFromServer_Scans_NO_For_Single_ProjectScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId
        }
    ) : boolean {

        if ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId ) {
            return  false
        }
        if ( ! dataFromServer_Scans_NO_For_Single_ProjectScanFileId ) {
            return  false
        }

        for ( const scanNumber of this.data.ms_1_scanNumbers_Data_Holder.scanNumber_Array ) {

            if ( ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) )
                && ( ! dataFromServer_Scans_NO_For_Single_ProjectScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) ) {
                return  false
            }
        }

        return true
    }

    //  WARNING:  Untested
    // get_ScanNumbersToLoad(
    //     {
    //         dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId
    //     } : {
    //         dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId
    //     }
    // ) : Array<number> {
    //
    //     const scanNumbers_ToLoad: Array<number> = []
    //
    //     for ( const scanNumber of this.data.data_BasedOnSingularFeatures_Get_MS1_ScanNumbers_Etc_For_Single_ProjectScanFileId.singularFeatureList_Etc_Block__Chromatogram_BasedOnSingularFeatures_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result.scanNumber_List ) {
    //
    //         if ( ! dataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId.scanNumbers_SubmittedRetrievalFor.has( scanNumber ) ) {
    //             scanNumbers_ToLoad.push(scanNumber)
    //         }
    //     }
    //
    //     return scanNumbers_ToLoad
    // }
}

/////////////////////////
/////////////////////////


/**
 *
 */
class Internal_DataFromServer_ScansWithPeaks_For_Single_ProjectScanFileId {

    readonly projectScanFileId: number
    readonly scanData_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber> = new Map()
}


/**
 *
 */
class Internal_DataFromServer_Scans_NO_Peaks_For_Single_ProjectScanFileId {

    readonly projectScanFileId: number
    readonly scanData_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()
}

/////////////

//   Singular Feature

class Internal__SingularFeature_Entry_ToPlot {

    readonly singularFeatureItem: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
    readonly singularFeature_Tooltip_String: string
}


/////////////

//   PSM

/**
 *
 */
class Internal__Psm_And_Its_ScanData_All {

    psm_And_Its_ScanData_Array: Array<Internal__Psm_And_Its_ScanData_Entry>
}

/**
 *
 */
class Internal__Psm_And_Its_ScanData_Entry {

    psmItem: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
    scanItem: {
        scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
        scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
        scan_RetentionTime: number
        scanNumber: number
    }
    // peakToUse: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
    peakToUse_DisplayDataForSingularFeature_Tooltip: Internal__PeakToUse_DisplayDataForSingularFeature_Tooltip
    y_Trace_Index: number
    projectSearchId: number
}

/**
 *
 */
class Internal__Psm_ToPlot_All {

    psm_ToPlot_For_ProjectSearchId_Map_Key_ProjectSearchId: Map<number, Internal__Psm_ToPlot_For_ProjectSearchId> = new Map()

    constructor() {
    }
}

/**
 *
 */
class Internal__Psm_ToPlot_For_ProjectSearchId {

    readonly projectSearchId: number
    psm_ToPlot_Entry_Array: Array<Internal__Psm_ToPlot_Entry> = []

    constructor({ projectSearchId } : { projectSearchId: number }
    ) {
        this.projectSearchId = projectSearchId
    }
}

/**
 *
 */
class Internal__Psm_ToPlot_Entry {

    psm_And_Its_ScanData: Internal__Psm_And_Its_ScanData_Entry
    plot_Y_Value: number
}



class Internal__PeakToUse_DisplayDataForSingularFeature_Tooltip {
    peak_MZ: number
    peak_Intensity_Or_IonCount__Label: string
    peak_Intensity_Or_IonCount__Value: number
}

/**
 *
 */
class Internal__Psm_Data_For_ClickHandler_Entry {

    readonly psm_ToPlot_Entry: Internal__Psm_ToPlot_Entry
    readonly psm_Tooltip_String: string
}

/////////////////

enum INTERNAL__MATH_FLOOR_CEIL {
    FLOOR = "FLOOR",
    CEIL = "CEIL"
}

/**
 *
 * @param isotope_Number
 * @param charge
 * @private
 */
const _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number = function(
    {
        isotope_Number, charge
    } : {
        isotope_Number: number  // the +1, +2, ...  Isotope
        charge: number
    }
) : number {
    return isotope_Number * C13_MASS_DELTA / charge
}


/**
 *
 * @param ppm_ExtendRange_AddSubtract_ToMinMaxValues
 * @param m_Over_Z_Mass
 */
const _compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus = function (
    {
        ppm_ExtendRange_AddSubtract_ToMinMaxValues, m_Over_Z_Mass
    } : {
        ppm_ExtendRange_AddSubtract_ToMinMaxValues: number
        m_Over_Z_Mass: number
    }
) : number {
    const ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus = m_Over_Z_Mass * ppm_ExtendRange_AddSubtract_ToMinMaxValues / 1000000;  //  1000000d is for 1E6;

    return ppm_Mass_For_precursor_M_Over_Z_Min_PlusMinus;
}


/**
 *
 * @param areaUnderCurve_Display
 */
const _areaUnderCurve_Display_FormattingFunction = function ( areaUnderCurve_Display: number ) {

    return areaUnderCurve_Display.toExponential( 3 )
}
