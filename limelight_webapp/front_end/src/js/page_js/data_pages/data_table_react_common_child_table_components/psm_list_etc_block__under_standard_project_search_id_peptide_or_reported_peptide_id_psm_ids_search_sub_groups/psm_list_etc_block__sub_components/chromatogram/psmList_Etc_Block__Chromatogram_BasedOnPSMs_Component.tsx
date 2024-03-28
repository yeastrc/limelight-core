/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component.tsx
 *
 *
 * One Overall assumption is that all PSMs will map to Reported Peptides with the same or very similar Peptide sequences.
 *
 * 'console.log' is commented out
 */


import React from 'react'

import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { Spinner_Limelight_Component } from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";

//  Use to get Typescript typings, but then switch since it does NOT build with this import
// import Plotly from "plotly.js"

//  Plotly ONLY imports successfully for a Build using this import
import Plotly from 'plotly.js-dist/plotly'
import {
    DataTable_DataRowEntry
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId,
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId";
import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { C13_MASS_DELTA, PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";
import { psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus";
import { SpectrumRetrieveAndDisplay_Use_lorikeet } from "page_js/data_pages/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences";
import { CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import { CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import { CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import { smoothLowess, smoothSavitzkyGolay } from "page_js/data_pages/peptide_mass_utils/SmoothingUtils";
import {
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId,
    PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber,
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import { CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Scan_Summary_Data";
import { commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


const _CHART_WIDTH = 800
const _CHART_HEIGHT = 600


//   !!!  IMPORTANT:  The number of elements in '_ISOTOPE_PLOT_TRACE_COLORS' MUST be equal to '_ISOTOPE_MAX__FOR_CHART_TRACES + 1'

//    !!!   NUMBER OF ISOTOPES to DISPLAY
const _ISOTOPE_MAX__FOR_CHART_TRACES = 3  //  Show Lines in Plot for 'Monoisotopic' and then +1, +2, ... Up To Isotope Max

const _ISOTOPE_PLOT_TRACE_COLORS = [
    "UNUSED",  // Start with "UUSED" since isotope numbers start at 1
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

const _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT = 2;

const _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS = [ 0, 1, _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT, 3, 4, 5 ]

limelight__Sort_ArrayOfNumbers_SortArrayInPlace( _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS )

{
    if ( ! _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS.find( value => {
        return value === _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT
    } ) ) {
        const msg = "Array _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS does NOT contain value _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT: " + _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT
        console.warn(msg)
        throw Error(msg)
    }

    {
        let prevValue = undefined
        for ( const selectValue of _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS ) {
            if ( prevValue !== undefined ) {
                if ( prevValue === selectValue ) {
                    const msg = "Array _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS has duplicate value: " + selectValue
                    console.warn(msg)
                    throw Error(msg)
                }
            }
            prevValue = selectValue
        }
    }
}

const _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues = 30;
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

let maxScanDataWithPeaksReturnCount__FromServer: number  // Will be retrieved at start of each get Data for SearchScanFileId

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

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params {

    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
}

/**
 *
 */
interface PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props {

    projectSearchId: number
    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result //  Used for tooltip on PSM
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
}

/**
 *
 */
interface PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component extends React.Component< PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props, PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State > {

    private _DO_NOT_CALL() { //  Test Cast of method
    }

    private _triggerPlotUpdate_Object: object = {}

    private _loadingInitialChromatogram = true

    private _show_Show_Chromatogram_Button = true
    private _show_LoadingData_Message = false
    private _loadingData_ScanNumberCount: { totalCount: number, currentCount: number }
    private _show_LoadingData_ERROR_Message = false

    private _show_NO_MS_1_Scans_ForScanFile = false

    private _showUpdatingMessage = false

    private _reportedPeptideIds_On_PSMs: Set<number>

    //   Initially loaded data

    private _variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    private _staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
    private _peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    private _peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    private _reportedPeptideSequences_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder

    private _dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId: Map<number, Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId> = new Map()
    private _dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId

    private _dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId: Map<number, Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId> = new Map()
    private _dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId

    private _dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId: Map<number, Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId> = new Map()
    private _dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId

    private _scanFilename_Map_Key_searchScanFileId: Map<number, string>
    private _scanFilename_SearchScanFileId_Array: Array<{ scanFilename: string, searchScanFileId: number}>

    private _searchScanFileId_Selected: number

    private _searchScanFileId_Selected__Previous: number

    private _searchScanFileId_Selected__Reset_To_Previous: boolean

    private _anyPsm_Have_OpenModifications: boolean

    private _ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray: Array<Internal__Selection_ReportedPeptide_OpenModMass_Charge>   // Used for 'select' of

    //  Single Selected
    private _ionSelection__reportedPeptide_OpenModMass_Charge_Selection: Internal__Selection_ReportedPeptide_OpenModMass_Charge

    private _scanPeakSelect: ScanPeakSelect_Enum = _scanPeakSelect_DEFAULT  //  Requires Same Default in the Scan Peak Select Component  Internal__RetentionTime_Min_Max_UserEditable_Component

    private _smoothingOption_Selection: SmoothingOption_Enum = _smoothingOption_Selection_DEFAULT  //  Requires Same Default in the Smoothing Select Component  Internal__SmoothingSelection_Component


    //  Set default. Requires Same Default in the Component Internal__MS1_Window_Size_Selection_Component
    private _precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection = _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues


    //  Set to default
    private _open_modification_mass_decimal_place_rounding__user_selection: number = _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT;
    private _open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection: number = Math.pow( 10, _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION__DEFAULT );

    private _retentionTimeSeconds_Range_ComputedFromPSMs_Min_Max: Internal__RetentionTimeSeconds_Range_Min_Max

    //  Pass to Component to create chart

    private _retentionTimeSeconds_Range_ForChart_Min_Max: Internal__RetentionTimeSeconds_Range_Min_Max

    private _retentionTimeSeconds_Range_ForChart_Min_Max__PreviousValues: Internal__RetentionTimeSeconds_Range_Min_Max

    private _retentionTimeSeconds_Range_ForChart_Min_Max__Reset_To_Previous: boolean



    private _psmList_PossiblyFiltered_ForChart_ForDisplay: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>


    private _force_SetTo_ValueFromParent__FOR__Internal__RetentionTime_Min_Max_UserEditable_Component: object


    private _currentSelection_ObjectReference: object

    /**
     *
     */
    constructor(props : PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props) {
        super( props );

        if ( props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params ) {

            this._computeFromProps( props )
        }
    }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props>, prevState: Readonly<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State>, snapshot?: any ) {
        try {
            if ( this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params ) {
                if ( prevProps.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter !== this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
                    || prevProps.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results !== this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results ) {

                    //  Reset

                    this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId = new Map()
                    this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = undefined

                    this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId = new Map()
                    this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = undefined

                    this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId = new Map()
                    this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = undefined


                    this._computeFromProps( this.props )

                    this._currentSelection_ObjectReference = {}

                    this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })
                }
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _computeFromProps( props : PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props ) {

        const scanFilename_Map_Key_searchScanFileId: Map<number, string> = new Map()
        const searchScanFileId_Count_Map_Key_searchScanFileId: Map<number, number> = new Map()

        const reportedPeptideIds_On_PSMs: Set<number> = new Set()

        for ( const psmItem of props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList ) {

            reportedPeptideIds_On_PSMs.add( psmItem.reportedPeptideId )

            if ( psmItem.searchScanFileId && psmItem.scanFilename ) {
                scanFilename_Map_Key_searchScanFileId.set(psmItem.searchScanFileId, psmItem.scanFilename)
            }
            {
                let count = searchScanFileId_Count_Map_Key_searchScanFileId.get( psmItem.searchScanFileId );
                if ( count ) {
                    searchScanFileId_Count_Map_Key_searchScanFileId.set( psmItem.searchScanFileId, count + 1 )
                } else {
                    searchScanFileId_Count_Map_Key_searchScanFileId.set( psmItem.searchScanFileId, 1 )
                }
            }
        }

        this._reportedPeptideIds_On_PSMs = reportedPeptideIds_On_PSMs

        ////

        const searchScanFileId_Count_Map_Key_searchScanFileId_Entries_SortedOn_SearchScanFileId: Array<{ searchScanFileId: number, count: number }> = []
        for ( const mapEntry of searchScanFileId_Count_Map_Key_searchScanFileId.entries() ) {
            searchScanFileId_Count_Map_Key_searchScanFileId_Entries_SortedOn_SearchScanFileId.push({ searchScanFileId: mapEntry[0], count: mapEntry[1] })
        }
        searchScanFileId_Count_Map_Key_searchScanFileId_Entries_SortedOn_SearchScanFileId.sort( (a,b) => {
            if ( a.searchScanFileId < b.searchScanFileId ) {
                return -1
            }
            if ( a.searchScanFileId > b.searchScanFileId ) {
                return 1
            }
            //  fallback sort. should never need.
            if ( a.count < b.count ) {
                return -1
            }
            if ( a.count > b.count ) {
                return 1
            }
            return 0
        })

        let searchScanFileId_ForMaxCount: number = undefined
        let countMax: number = undefined

        for ( const entry of searchScanFileId_Count_Map_Key_searchScanFileId_Entries_SortedOn_SearchScanFileId ) {
            if ( searchScanFileId_ForMaxCount === undefined ) {
                searchScanFileId_ForMaxCount = entry.searchScanFileId
                countMax = entry.count
            } else {
                if ( countMax < entry.count ) {
                    searchScanFileId_ForMaxCount = entry.searchScanFileId
                    countMax = entry.count
                }
            }
        }

        //  Start with display data for searchScanFileId_ForMaxCount.  If > 1 searchScanFileId then display <select> for user change which one to show data for

        this._searchScanFileId_Selected = searchScanFileId_ForMaxCount
        this._scanFilename_Map_Key_searchScanFileId = scanFilename_Map_Key_searchScanFileId

        this._scanFilename_SearchScanFileId_Array = []

        for ( const mapEntry of scanFilename_Map_Key_searchScanFileId.entries() ) {
            this._scanFilename_SearchScanFileId_Array.push({ searchScanFileId: mapEntry[0], scanFilename: mapEntry[1] })
        }
        this._scanFilename_SearchScanFileId_Array.sort( (a,b) => {
            const scanFilename_Compare = a.scanFilename.localeCompare(b.scanFilename)
            if ( scanFilename_Compare !== 0 ) {
                return scanFilename_Compare
            }
            if ( a.searchScanFileId < b.searchScanFileId ) {
                return -1
            }
            if ( a.searchScanFileId > b.searchScanFileId ) {
                return 1
            }
            return 0
        })

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

        if ( this._searchScanFileId_Selected__Previous ) {

            //  Reset to Previous
            this._searchScanFileId_Selected = this._searchScanFileId_Selected__Previous

            //  set previous to null
            this._searchScanFileId_Selected__Previous = null

            this._searchScanFileId_Selected__Reset_To_Previous = true;

            this._compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile()

            this._compute_RetentionTime_MinMax_PSM_List_For_Chart()

            //   Only call when change scan file
            this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId( { currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference } )

        } else if ( this._retentionTimeSeconds_Range_ForChart_Min_Max__PreviousValues ) {

            //  Reset to Previous
            this._retentionTimeSeconds_Range_ForChart_Min_Max = this._retentionTimeSeconds_Range_ForChart_Min_Max__PreviousValues

            //  set previous to null
            this._retentionTimeSeconds_Range_ForChart_Min_Max__PreviousValues = null

            this._retentionTimeSeconds_Range_ForChart_Min_Max__Reset_To_Previous = true;

            this._compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile()

            this._compute_RetentionTime_MinMax_PSM_List_For_Chart()

            //   Only call when change scan file
            this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId( { currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference } )

        } else {

            const msg = "In _clickOn_Button_Cancel_LoadingData_Button(): this._searchScanFileId_Selected__Previous has no value"
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

            const promise_load_InitialDataFromServer = this._load_InitialDataFromServer()

            promise_load_InitialDataFromServer.catch(reason => { try {
                throw Error("promise_load_InitialDataFromServer.catch: reason: " + reason )
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promise_load_InitialDataFromServer.then(novalue => { try {

                this._compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile()

                this._compute_RetentionTime_MinMax_PSM_List_For_Chart()

                this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *      Populate
     *
     *   this._ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray
     *   this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection
     */
    private _compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile() {

        const selection_ReportedPeptide_OpenModMass_Charge__Array: Array<Internal__Selection_ReportedPeptide_OpenModMass_Charge> = []

        {
            let no_PSM_hasOpenModMass = true;

            for ( const psmItem of this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList ) {

                if ( psmItem.searchScanFileId !== this._searchScanFileId_Selected ) {
                    // psmItem NOT for current searchScanFileId so SKIP
                    continue; // EARLY CONTINUE
                }

                let psm_NO_OpenModMasses = false

                let openModMass_Sum_Rounded = 0

                if ( psmItem.openModificationMassAndPositionsList && psmItem.openModificationMassAndPositionsList.length > 0 ) {

                    no_PSM_hasOpenModMass = false;

                    let psm_OpenModMass_Sum = 0;

                    for ( const openModificationMassAndPositions_Item of psmItem.openModificationMassAndPositionsList ) {
                        psm_OpenModMass_Sum += openModificationMassAndPositions_Item.openModMass
                    }

                    openModMass_Sum_Rounded = _openModMassRounding_For_OpenModMassSelection({
                        openModificationMass: psm_OpenModMass_Sum,
                        open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection: this._open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection
                    } )

                } else {
                    psm_NO_OpenModMasses = true;
                }

                {  //  Update existing Selection entry or add new Selection Entry

                    let found_Selection_Entry = false

                    for ( const selection_Entry of selection_ReportedPeptide_OpenModMass_Charge__Array ) {

                        if ( selection_Entry.reportedPeptide_Id === psmItem.reportedPeptideId
                            && selection_Entry.no_openModMass === psm_NO_OpenModMasses
                            && selection_Entry.openModMass_Sum_Rounded === openModMass_Sum_Rounded
                            && selection_Entry.charge === psmItem.charge ) {

                            //  Found Existing Entry to update

                            selection_Entry.psmCount++
                            found_Selection_Entry = true

                            break
                        }
                    }

                    if ( ! found_Selection_Entry ) {

                        //  Add selection entry

                        const reportedPeptide_String = this._reportedPeptideSequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( psmItem.reportedPeptideId );
                        if ( ! reportedPeptide_String ) {
                            const msg = "this._reportedPeptideSequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId ); returned NOTHING for " + psmItem.reportedPeptideId;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const selection_Entry_New: Internal__Selection_ReportedPeptide_OpenModMass_Charge = {
                            reportedPeptide_Id: psmItem.reportedPeptideId,
                            reportedPeptide_String,
                            openModMass_Sum_Rounded: openModMass_Sum_Rounded,
                            no_openModMass: psm_NO_OpenModMasses,
                            charge: psmItem.charge,
                            psmCount: 1,
                            no_PSM_hasOpenModMass: false,

                            // Set Later when have arrayIndex after sort
                            arrayIndex: undefined,
                            selectElement_ValueString: undefined
                        }

                        selection_ReportedPeptide_OpenModMass_Charge__Array.push( selection_Entry_New )
                    }
                }
            }

            selection_ReportedPeptide_OpenModMass_Charge__Array.sort( (a,b) => {
                if ( a.reportedPeptide_String < b.reportedPeptide_String ) {
                    return -1;
                }
                if ( a.reportedPeptide_String > b.reportedPeptide_String ) {
                    return 1;
                }
                //  NO open mod mass before open mod mass
                if ( ( a.no_openModMass ) && ( ! b.no_openModMass ) ) {
                    return -1;
                }
                if ( ( ! a.no_openModMass ) && ( b.no_openModMass ) ) {
                    return 1;
                }
                if ( a.openModMass_Sum_Rounded < b.openModMass_Sum_Rounded ) {
                    return -1;
                }
                if ( a.openModMass_Sum_Rounded > b.openModMass_Sum_Rounded ) {
                    return 1;
                }
                if ( a.charge < b.charge ) {
                    return -1;
                }
                if ( a.charge > b.charge ) {
                    return 1;
                }
                if ( a.psmCount < b.psmCount ) {
                    return -1;
                }
                if ( a.psmCount > b.psmCount ) {
                    return 1;
                }
            })

            {   //  Update arrayIndex, no_PSM_hasOpenModMass, selectElement_ValueString

                let arrayIndex = 0;  // Set after sort

                for ( const selection_Entry of selection_ReportedPeptide_OpenModMass_Charge__Array ) {

                    selection_Entry.arrayIndex = arrayIndex

                    selection_Entry.no_PSM_hasOpenModMass = no_PSM_hasOpenModMass;

                    //  Must put Array Index First with a non-number so parseInt returns array index
                    selection_Entry.selectElement_ValueString =
                        selection_Entry.arrayIndex + ":" +
                        selection_Entry.reportedPeptide_Id + ":" +
                        selection_Entry.openModMass_Sum_Rounded + ":" + selection_Entry.no_openModMass + ":" +
                        selection_Entry.charge

                    arrayIndex++
                }
            }

            //  Find Default.  First entry with most PSM Count

            let selection_ReportedPeptide_OpenModMass_Charge__defaultEntry: Internal__Selection_ReportedPeptide_OpenModMass_Charge = undefined

            {
                let defaultEntry_PsmCount = 0;

                for ( const entry of selection_ReportedPeptide_OpenModMass_Charge__Array ) {
                    if ( entry.psmCount > defaultEntry_PsmCount ) {
                        selection_ReportedPeptide_OpenModMass_Charge__defaultEntry = entry
                        defaultEntry_PsmCount = entry.psmCount
                    }
                }
            }
            if ( ! selection_ReportedPeptide_OpenModMass_Charge__defaultEntry ) {
                throw Error("selection_ReportedPeptide_OpenModMass_Charge__defaultEntry not set and end of create this._ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray")
            }

            this._anyPsm_Have_OpenModifications = ! no_PSM_hasOpenModMass

            this._ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray = selection_ReportedPeptide_OpenModMass_Charge__Array
            this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection = selection_ReportedPeptide_OpenModMass_Charge__defaultEntry
        }

    }

    /**
     *
     * @private
     */
    private _compute_RetentionTime_MinMax_PSM_List_For_Chart() {

        let psmList_LOCAL_PossiblyFiltered = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList;

        {  //  Filter PSMs on reportedPeptide_IdAndString_Selected

            const psmList_New: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item> = []

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( psmItem.reportedPeptideId !== this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.reportedPeptide_Id ) {
                    //  Not for selected reportedPeptide_IdAndString_Selected so SKIP
                    continue
                }

                psmList_New.push( psmItem )
            }

            psmList_LOCAL_PossiblyFiltered = psmList_New
        }

        {  //  Filter PSMs on searchScanFileId_Selected

            const psmList_New: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item> = []

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( psmItem.searchScanFileId !== this._searchScanFileId_Selected ) {
                    //  Not for selected searchScanFileId_Selected so SKIP
                    continue
                }

                psmList_New.push( psmItem )
            }

            psmList_LOCAL_PossiblyFiltered = psmList_New
        }

        if ( ! this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.no_PSM_hasOpenModMass ) {

            //  Filtering PSM List on Open Mod Mass Selection

            // console.log( "Filtering PSM List on Open Mod Mass Selection" )

            const psmList_New: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item> = []

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.no_openModMass ) {

                    //  Open Mod Mass Selection is NO Open Mod Mass  --  Selection option available when have PSMs with and without Open Mod Mass

                    if ( psmItem.openModificationMassAndPositionsList && psmItem.openModificationMassAndPositionsList.length > 0 ) {

                        //  PSM Contains Open Mod Mass SO SKIP

                        continue // EARLY CONTINUE
                    }

                } else {

                    if ( psmItem.openModificationMassAndPositionsList && psmItem.openModificationMassAndPositionsList.length > 0 ) {

                        let openModMass_Total = 0;
                        for ( const openModificationMassAndPositions_Item of psmItem.openModificationMassAndPositionsList ) {
                            openModMass_Total += openModificationMassAndPositions_Item.openModMass
                        }

                        const openModMass_Rounded = _openModMassRounding_For_OpenModMassSelection({
                            openModificationMass: openModMass_Total,
                            open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection: this._open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection
                        })

                        //  Check of open mod mass is selected is SUM of open mod mass (probably only 1 entry) and then rounded same as selection options

                        if ( openModMass_Rounded !== this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.openModMass_Sum_Rounded ) {

                            //  PSM NOT Contains Selected Open Mod Mass SO SKIP

                            continue // EARLY CONTINUE
                        }
                    }
                }

                psmList_New.push( psmItem )
            }

            psmList_LOCAL_PossiblyFiltered = psmList_New  //  Update PsmList with updated List
        }

        //  Compute Min and Max Retention Time Range For Chart -  AFTER Filter on Open Mod Mass and BEFORE filter on Charge

        let retentionTimeSeconds_Range_ForChart_Min: number = undefined
        let retentionTimeSeconds_Range_ForChart_Max: number = undefined

        {
            let retentionTimeSeconds_On_PSMs_Min: number = undefined
            let retentionTimeSeconds_On_PSMs_Max: number = undefined

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( retentionTimeSeconds_On_PSMs_Min === undefined ) {
                    retentionTimeSeconds_On_PSMs_Min = psmItem.retentionTimeSeconds
                    retentionTimeSeconds_On_PSMs_Max = psmItem.retentionTimeSeconds
                } else {
                    if ( retentionTimeSeconds_On_PSMs_Min > psmItem.retentionTimeSeconds ) {
                        retentionTimeSeconds_On_PSMs_Min = psmItem.retentionTimeSeconds
                    }
                    if ( retentionTimeSeconds_On_PSMs_Max < psmItem.retentionTimeSeconds ) {
                        retentionTimeSeconds_On_PSMs_Max = psmItem.retentionTimeSeconds
                    }
                }
            }

            retentionTimeSeconds_On_PSMs_Min = Math.floor( retentionTimeSeconds_On_PSMs_Min )
            retentionTimeSeconds_On_PSMs_Max = Math.ceil( retentionTimeSeconds_On_PSMs_Max )

            retentionTimeSeconds_Range_ForChart_Min = retentionTimeSeconds_On_PSMs_Min - _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
            retentionTimeSeconds_Range_ForChart_Max = retentionTimeSeconds_On_PSMs_Max + _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
        }

        {  //  Filter PSMs on selected Charge

            const psmList_New: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item> = []

            const psmChargeValue_Selected = this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.charge;

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( psmItem.charge !== psmChargeValue_Selected ) {
                    //  Not for selected charge so SKIP
                    continue
                }

                psmList_New.push( psmItem )
            }

            psmList_LOCAL_PossiblyFiltered = psmList_New
        }

        this._psmList_PossiblyFiltered_ForChart_ForDisplay = psmList_LOCAL_PossiblyFiltered

        this._retentionTimeSeconds_Range_ComputedFromPSMs_Min_Max = {
            retentionTimeSeconds_Range_Min: retentionTimeSeconds_Range_ForChart_Min, retentionTimeSeconds_Range_Max: retentionTimeSeconds_Range_ForChart_Max
        }

        this._retentionTimeSeconds_Range_ForChart_Min_Max = this._retentionTimeSeconds_Range_ComputedFromPSMs_Min_Max

        this._force_SetTo_ValueFromParent__FOR__Internal__RetentionTime_Min_Max_UserEditable_Component = {}
    }

    /**
     *
     * @private
     */
    private _load_InitialDataFromServer() : Promise<void> {

        return new Promise<void>((resolve, reject) => { try {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId

            const promises: Array<Promise<void>> = []

            {  //  get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder AllForSearch

                const get_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

                if ( get_Result.data ) {

                    this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch() Result no data or promise")
                }
            }

            {  // get_StaticModsHolder

                const get_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();

                if ( get_Result.data ) {

                    this._staticMods_Holder = get_Result.data.staticMods_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._staticMods_Holder = value.staticMods_Holder
                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_StaticModsHolder() Result no data or promise")
                }
            }

            { // get_PeptideIdsHolder_AllForSearch

                const get_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

                if ( get_Result.data ) {

                    this._peptideIds_For_MainFilters_Holder = get_Result.data.peptideIds_For_MainFilters_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder
                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_PeptideIdsHolder_AllForSearch() Result no data or promise")
                }
            }

            {  //  get_PeptideSequencesHolder_AllForAllSearches

                const get_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer__CommonAcrossSearches().get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                    get_PeptideSequencesHolder_AllForAllSearches();

                if ( get_Result.data ) {

                    this._peptideSequences_For_MainFilters_Holder = get_Result.data.peptideSequences_For_MainFilters_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder
                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_PeptideIdsHolder_AllForSearch() Result no data or promise")
                }
            }

            {  //  get_ReportedPeptideSequences

                const get_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().
                    get__commonData_LoadedFromServer__CommonAcrossSearches().get_commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences().
                    get_ReportedPeptideSequences({ reportedPeptideIds: this._reportedPeptideIds_On_PSMs })

                if ( get_Result.data ) {

                    this._reportedPeptideSequences_Holder = get_Result.data.reportedPeptideSequences_Holder

                } else if ( get_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => { try {
                            get_Result.promise.catch( reason =>  { reject(reason)})
                            get_Result.promise.then( value => { try {

                                this._reportedPeptideSequences_Holder = value.reportedPeptideSequences_Holder
                                resolve()

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
                    )
                    promises.push(promise)
                } else {
                    throw Error("get_PeptideIdsHolder_AllForSearch() Result no data or promise")
                }
            }

            if ( promises.length === 0 ) {

                resolve()

                return  //  EARLY RETURN
            }

            const promiseAll = Promise.all( promises )

            promiseAll.catch(reason => {  reject })
            promiseAll.then(novalue => { try {

                resolve()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId(
        {
            currentSelection_ObjectReference_AtStartOf_Request
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
        }
    ) {
        const compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result =
            psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId({

                psmList: this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList,
                searchScanFileId: this._searchScanFileId_Selected,
                retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
            })

        const retentionTimeRange_Min__LoadDataForScansFor = compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result.psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Min
        const retentionTimeRange_Max__LoadDataForScansFor = compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result.psm_RetentionTime_Seconds__With_ExtendRange_AddSubtract_Applied_Max

        this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( this._searchScanFileId_Selected )
        this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( this._searchScanFileId_Selected )
        this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( this._searchScanFileId_Selected )

        if ( ( ! this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) ||
            ( ! this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.is_Data_FullyLoaded({
                dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId: this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId,
                dataFromServer_Scans_NO_For_Single_SearchScanFileId: this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
            }) ) ) {

            this._load_Chromatogram_For_Selected_SearchScanFileId({
                currentSelection_ObjectReference_AtStartOf_Request,

                retentionTimeRange_Min__LoadDataForScansFor,
                retentionTimeRange_Max__LoadDataForScansFor
            })

            return // EARLY RETURN
        }

        const searchScanFileId_Selected_AtStartOf_LoadRequest = this._searchScanFileId_Selected;

        this._load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage({
            currentSelection_ObjectReference_AtStartOf_Request,
            searchScanFileId_Selected_AtStartOf_LoadRequest
        })
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_SearchScanFileId(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTimeRange_Min__LoadDataForScansFor,
            retentionTimeRange_Max__LoadDataForScansFor
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTimeRange_Min__LoadDataForScansFor: number
            retentionTimeRange_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            const searchScanFileId_Selected_AtStartOf_LoadRequest = this._searchScanFileId_Selected;

            this._show_Show_Chromatogram_Button = false
            this._show_LoadingData_Message = true;
            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => { try {

                if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                    //  No longer current request so exit

                    return; // EARLY RETURN
                }

                this._load_Chromatogram_For_Selected_SearchScanFileId__CallAfterSetTimeout({
                    searchScanFileId_Selected_AtStartOf_LoadRequest,
                    currentSelection_ObjectReference_AtStartOf_Request,

                    retentionTimeRange_Min__LoadDataForScansFor,
                    retentionTimeRange_Max__LoadDataForScansFor
                })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _load_Chromatogram_For_Selected_SearchScanFileId__CallAfterSetTimeout(
        {
            searchScanFileId_Selected_AtStartOf_LoadRequest,
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTimeRange_Min__LoadDataForScansFor,
            retentionTimeRange_Max__LoadDataForScansFor
        } : {
            searchScanFileId_Selected_AtStartOf_LoadRequest: number
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTimeRange_Min__LoadDataForScansFor: number
            retentionTimeRange_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            const get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result =
                this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_For_Single_SearchScanFileId_MainClass().
                get_ScanData_Summary_DataHolder_For_SearchScanFileId(searchScanFileId_Selected_AtStartOf_LoadRequest)

            if ( get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result.data ) {

                const scanData_Summary_Data_For_SearchScanFileId =
                    get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result.data.commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder.
                    get_ScanData_Summary_Data_For_SearchScanFileId(searchScanFileId_Selected_AtStartOf_LoadRequest)

                if ( ! scanData_Summary_Data_For_SearchScanFileId ) {
                    const msg = "commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder.get_SpectralStorage_Summary_Data_For_SearchScanFileId(searchScanFileId_Selected_AtStartOf_LoadRequest) returned NOTHING for " + searchScanFileId_Selected_AtStartOf_LoadRequest;
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( this._is_Any_MS_1_Scans_For_SearchScanFileId__PassIn_SpectralStorage_Summary_Data_For_SearchScanFileId( scanData_Summary_Data_For_SearchScanFileId ) ) {

                    this._show_NO_MS_1_Scans_ForScanFile = false;

                    this._load_Chromatogram_For_Selected_SearchScanFileId__CallAfterSetTimeout__AfterValidate_SearchScanFileId_Has_MS1_Scans({
                        searchScanFileId_Selected_AtStartOf_LoadRequest,
                        currentSelection_ObjectReference_AtStartOf_Request,
                        retentionTimeRange_Min__LoadDataForScansFor,
                        retentionTimeRange_Max__LoadDataForScansFor
                    })

                } else {
                    this._show_LoadingData_Message = false
                    this._loadingInitialChromatogram = false

                    this._show_NO_MS_1_Scans_ForScanFile = true;

                    this.setState({ forceRerenderObject: {} })
                }

            } else if ( get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result.promise ) {

                get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result.promise.catch(reason => {})
                get_ScanData_Summary_DataHolder_For_SearchScanFileId_Result.promise.then(value_scanData_Summary_Data_For_SearchScanFileId => { try {

                    if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                        //  No longer current request so exit

                        return; // EARLY RETURN
                    }

                    const scanData_Summary_Data_For_SearchScanFileId =
                        value_scanData_Summary_Data_For_SearchScanFileId.commonData_LoadedFromServer_SingleSearch__ScanData_Summary_Data_Holder.
                        get_ScanData_Summary_Data_For_SearchScanFileId(searchScanFileId_Selected_AtStartOf_LoadRequest)

                    if ( ! scanData_Summary_Data_For_SearchScanFileId ) {
                        const msg = "commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder.get_SpectralStorage_Summary_Data_For_SearchScanFileId(searchScanFileId_Selected_AtStartOf_LoadRequest) returned NOTHING for " + searchScanFileId_Selected_AtStartOf_LoadRequest;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    if ( this._is_Any_MS_1_Scans_For_SearchScanFileId__PassIn_SpectralStorage_Summary_Data_For_SearchScanFileId( scanData_Summary_Data_For_SearchScanFileId ) ) {

                        this._show_NO_MS_1_Scans_ForScanFile = false;

                        this._load_Chromatogram_For_Selected_SearchScanFileId__CallAfterSetTimeout__AfterValidate_SearchScanFileId_Has_MS1_Scans({
                            searchScanFileId_Selected_AtStartOf_LoadRequest,
                            currentSelection_ObjectReference_AtStartOf_Request,
                            retentionTimeRange_Min__LoadDataForScansFor,
                            retentionTimeRange_Max__LoadDataForScansFor
                        })

                    } else {

                        this._show_LoadingData_Message = false
                        this._loadingInitialChromatogram = false

                        this._show_NO_MS_1_Scans_ForScanFile = true;

                        this.setState({ forceRerenderObject: {} })
                    }

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } else {
                const msg = "get_SpectralStorage_Summary_DataHolder_For_SearchScanFileId_Result  no data or promise"
                console.warn(msg)
                throw Error(msg)
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _is_Any_MS_1_Scans_For_SearchScanFileId__PassIn_SpectralStorage_Summary_Data_For_SearchScanFileId(

        scanData_Summary_Data_For_SearchScanFileId: CommonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId
    ) : boolean {

        if ( scanData_Summary_Data_For_SearchScanFileId.scanLevelEntries ) {
            for ( const scanLevel of scanData_Summary_Data_For_SearchScanFileId.scanLevelEntries ) {
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
    private _load_Chromatogram_For_Selected_SearchScanFileId__CallAfterSetTimeout__AfterValidate_SearchScanFileId_Has_MS1_Scans(
        {
            searchScanFileId_Selected_AtStartOf_LoadRequest,
            currentSelection_ObjectReference_AtStartOf_Request,
            retentionTimeRange_Min__LoadDataForScansFor,
            retentionTimeRange_Max__LoadDataForScansFor
        } : {
            searchScanFileId_Selected_AtStartOf_LoadRequest: number
            currentSelection_ObjectReference_AtStartOf_Request: object

            retentionTimeRange_Min__LoadDataForScansFor: number
            retentionTimeRange_Max__LoadDataForScansFor: number
        }
    ) : void {
        try {
            if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                //  No longer current request so exit

                return; // EARLY RETURN
            }

            const promises: Array<Promise<void>> = []

            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    //  Get MaxScanDataWithPeaksReturnCount every request and Store in module wide variable
                    const promise_Get_MaxScanDataWithPeaksReturnCount = commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId({ projectSearchId: this.props.projectSearchId })
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

            {
                const promise = new Promise<void>((resolve, reject) => { try {

                    const promise_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId({

                        retentionTimeRange_Min: retentionTimeRange_Min__LoadDataForScansFor,
                        retentionTimeRange_Max: retentionTimeRange_Max__LoadDataForScansFor,

                        searchScanFileId: searchScanFileId_Selected_AtStartOf_LoadRequest,
                        psmList: this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList,
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                    })

                    promise_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.catch(reason => {
                        reject(reason)
                    })
                    promise_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.then(value_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId => { try {

                        const compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result =
                            psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId({

                                psmList: this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList,
                                searchScanFileId: this._searchScanFileId_Selected,
                                retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__retentionTime_Seconds_ExtendRange_AddSubtract_ToMinMaxValues
                            })

                        const dataForChromatogram_For_SearchScanFileId = new Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId({
                            data: {
                                searchScanFileId: searchScanFileId_Selected_AtStartOf_LoadRequest,
                                retentionTimeSeconds_Range_Min_Max__LoadingDataFor: {
                                    retentionTimeSeconds_Range_Min: retentionTimeRange_Min__LoadDataForScansFor,
                                    retentionTimeSeconds_Range_Max: retentionTimeRange_Max__LoadDataForScansFor
                                },
                                data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId: value_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId,
                                compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result
                            }
                        })
                        this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.set( searchScanFileId_Selected_AtStartOf_LoadRequest, dataForChromatogram_For_SearchScanFileId )

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise)
            }

            const promises_All = Promise.all( promises );

            promises_All.catch(reason => {
                this._show_LoadingData_Message = false;
                this._show_LoadingData_ERROR_Message = true
                this.setState({ forceRerenderObject: {} })
            })
            promises_All.then(novalue => { try {

                if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                    //  No longer current request so exit

                    return; // EARLY RETURN
                }

                const promise_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks = this._load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks({
                    currentSelection_ObjectReference_AtStartOf_Request, searchScanFileId_Selected_AtStartOf_LoadRequest
                })
                promise_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.catch(reason => { try {
                    throw Error("promise_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.catch(reason: " + reason )

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promise_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks.then(novalue => { try {

                    if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
                        //  No longer current request so exit

                        return; // EARLY RETURN
                    }

                    this._load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage({
                        currentSelection_ObjectReference_AtStartOf_Request, searchScanFileId_Selected_AtStartOf_LoadRequest
                    })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    //////

    /**
     *
     */
    private async _load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            searchScanFileId_Selected_AtStartOf_LoadRequest
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            searchScanFileId_Selected_AtStartOf_LoadRequest: number
        }
    ) : Promise<void> {
        try {
            const dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest )
            if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId ) {
                throw Error("_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanNumbers__NowGet_ScansWithPeaks(...):  No value in this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId for searchScanFileId_Selected_AtStartOf_LoadRequest: " + searchScanFileId_Selected_AtStartOf_LoadRequest )
            }

            let dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest );
            if ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId ) {
                dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId = new Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId()
                this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.set( searchScanFileId_Selected_AtStartOf_LoadRequest, dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId );
            }

            let dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest );
            if ( ! dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) {
                dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = new Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId()
                this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.set( searchScanFileId_Selected_AtStartOf_LoadRequest, dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId );
            }

            //  Scan Numbers to get Scan Data with Peaks from server

            const scanNumbers_ToLoad_Array: Array<number> = []
            {
                for ( const scanNumber of dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.scanNumberArray ) {

                    if ( ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) )
                        && ( ! dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) ) {

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
                for ( const reportedPeptideId of this._reportedPeptideIds_On_PSMs ) {

                    const peptideId = this._peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId )
                    if ( ! peptideId ) {
                        const msg = "peptideIdsHolder_AllForSearch.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ) returned NOTHING for " + reportedPeptideId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const peptideSequence_String = this._peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                    if ( ! peptideSequence_String ) {
                        const msg = "peptideSequencesHolder_AllForAllSearches.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const staticModMasses_At_ReportedPeptide_Level: Array<number> = []
                    {
                        const staticMods = this._staticMods_Holder.get_StaticMods()
                        if ( staticMods && staticMods.length > 0 ) {

                            for ( const staticMod of staticMods ) {
                                for ( const peptideSequenceLetter of peptideSequence_String ) {
                                    if ( peptideSequenceLetter == staticMod.residue ) {
                                        staticModMasses_At_ReportedPeptide_Level.push( staticMod.mass )
                                    }
                                }
                            }
                        }
                    }

                    const variableModMasses_At_ReportedPeptide_Level: Array<number> = []
                    {
                        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId =
                            this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId )
                        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                            for ( const modificationEntry of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {
                                variableModMasses_At_ReportedPeptide_Level.push( modificationEntry.mass )
                            }
                        }
                    }

                    const modificationMasses_VariableAndStatic: Array<number> = []
                    if ( variableModMasses_At_ReportedPeptide_Level && variableModMasses_At_ReportedPeptide_Level.length > 0 ) {
                        for ( const mass of variableModMasses_At_ReportedPeptide_Level ) {
                            modificationMasses_VariableAndStatic.push(mass)
                        }
                    }
                    if ( staticModMasses_At_ReportedPeptide_Level && staticModMasses_At_ReportedPeptide_Level.length > 0 ) {
                        for ( const mass of staticModMasses_At_ReportedPeptide_Level ) {
                            modificationMasses_VariableAndStatic.push(mass)
                        }
                    }

                    const openModMass_MinMax__Map__Value_MinMax_Key_Charge =
                        dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.data.
                            compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result.
                            openModMass_MinMax__Map__Value_MinMax_Key_Charge

                    const found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set =
                        dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.data.
                            compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result.
                            found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set

                    if ( openModMass_MinMax__Map__Value_MinMax_Key_Charge && openModMass_MinMax__Map__Value_MinMax_Key_Charge.size > 0 ) {

                        //  Have Open Mod Masses so use open mod mass min and max

                        for ( const openModMass_MinMax__Map__Value_MinMax of openModMass_MinMax__Map__Value_MinMax_Key_Charge.values() ) {

                            //  Map Entry per charge.  Charge is the key and is also in the value object.

                            const for_Charge = openModMass_MinMax__Map__Value_MinMax.for_Charge

                            let m_over_Z_Range_Min: number
                            let m_over_Z_Range_Max: number

                            { // m_over_Z_Range_Min
                                let openModMass = openModMass_MinMax__Map__Value_MinMax.min_OpenModMass

                                if ( openModMass > 0 && found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set.has( for_Charge ) ) {
                                    openModMass = 0;  //  lower to zero since also have PSM with NO open mod mass
                                }

                                const modificationMasses = Array.from( modificationMasses_VariableAndStatic ) // make copy
                                modificationMasses.push( openModMass )
                                const m_over_z_Peptide_And_Mods = PeptideMassCalculator.calculateMZ( peptideSequence_String, modificationMasses, for_Charge );
                                const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                                    ppm_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues,  //  Max value for loading data from server
                                    m_Over_Z_Mass: m_over_z_Peptide_And_Mods
                                })
                                m_over_Z_Range_Min = m_over_z_Peptide_And_Mods - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                            }
                            { // m_over_Z_Range_Max
                                let openModMass = openModMass_MinMax__Map__Value_MinMax.max_OpenModMass

                                if ( openModMass < 0 && found_AtLeastOne_PSM_With_NO_OpenModMasses_For_Charge_Set.has( for_Charge ) ) {
                                    openModMass = 0;  //  increase to zero since also have PSM with NO open mod mass
                                }

                                const modificationMasses = Array.from( modificationMasses_VariableAndStatic ) // make copy
                                modificationMasses.push( openModMass )
                                const m_over_z_Peptide_And_Mods = PeptideMassCalculator.calculateMZ( peptideSequence_String, modificationMasses, for_Charge );

                                const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number({ isotope_Number: _ISOTOPE_MAX__FOR_CHART_TRACES, charge: for_Charge });

                                const m_over_z_Peptide_And_Mods_Plus_2_Isotopes = m_over_z_Peptide_And_Mods + isotope_M_Over_Z_Addition;

                                const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                                    ppm_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues,  //  Max value for loading data from server
                                    m_Over_Z_Mass: m_over_z_Peptide_And_Mods_Plus_2_Isotopes
                                })
                                m_over_Z_Range_Max = m_over_z_Peptide_And_Mods_Plus_2_Isotopes + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                            }

                            m_over_Z_Ranges__ForGet_MS_1_Scans.push({ m_over_Z_Range_Min, m_over_Z_Range_Max })
                        }

                    } else {
                        //  NO Open Mod Mass

                        const psmChargeValues_Set = new Set<number>()

                        for ( const psmItem of this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.webserviceResult_Root.resultList ) {
                            psmChargeValues_Set.add( psmItem.charge )
                        }

                        const psmChargeValues_Array = Array.from( psmChargeValues_Set )
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( psmChargeValues_Array )

                        for ( const charge of psmChargeValues_Array ) {

                            const m_over_z_Peptide_And_Mods = PeptideMassCalculator.calculateMZ( peptideSequence_String, modificationMasses_VariableAndStatic, charge );
                            const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                                ppm_ExtendRange_AddSubtract_ToMinMaxValues: _MAX_VALUE_FOR_GET_FROM_SERVER__M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues,  //  Max value for loading data from server
                                m_Over_Z_Mass: m_over_z_Peptide_And_Mods
                            })

                            const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number({ isotope_Number: _ISOTOPE_MAX__FOR_CHART_TRACES, charge: charge });

                            const m_over_z_Peptide_And_Mods_Plus_MAX_Isotopes = m_over_z_Peptide_And_Mods + isotope_M_Over_Z_Addition;

                            const m_over_Z_Range_Min = m_over_z_Peptide_And_Mods - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                            const m_over_Z_Range_Max = m_over_z_Peptide_And_Mods_Plus_MAX_Isotopes + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                            m_over_Z_Ranges__ForGet_MS_1_Scans.push({ m_over_Z_Range_Min, m_over_Z_Range_Max })
                        }
                    }
                }
            }

            //////////////////

            if ( scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount.length > 0 ) {

                await this._get_ScanData_ForScanNumbers({
                    currentSelection_ObjectReference_AtStartOf_Request,
                    scanNumbers_ToLoad_TotalCount: scanNumbers_ToLoad_Array.length,
                    scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount,
                    searchScanFileId_Selected: searchScanFileId_Selected_AtStartOf_LoadRequest,
                    m_over_Z_Ranges__ForGet_MS_1_Scans,
                    dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId,
                    dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
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
            searchScanFileId_Selected, m_over_Z_Ranges__ForGet_MS_1_Scans,
            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId,
            dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            scanNumbers_ToLoad_TotalCount: number
            scanNumberList_RetrieveScanDataFromServer_SplitBy_MaxRetrieveScanCount: Array<Array<number>>
            searchScanFileId_Selected: number
            m_over_Z_Ranges__ForGet_MS_1_Scans: Array<{
                m_over_Z_Range_Min: number;
                m_over_Z_Range_Max: number;
            }>
            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId   // Updated
            dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId   // Updated
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
                    this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_YES_Peaks_Data().get_ScanData_ALL_For_Single_SearchScanFileId_YES_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise({
                    searchScanFileId: searchScanFileId_Selected,
                    scanNumberList: scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH,
                    m_over_Z_Ranges: m_over_Z_Ranges__ForGet_MS_1_Scans
                } )
                promise_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.catch(reason => {
                    anyRequest_Rejected = true
                    reject(reason)
                })
                promise_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.then(value_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges => { try {

                    //  Store returned scans

                    for ( const scan of value_Get_SingleScanFile_MS_1_ScanData_For_M_Over_Z_Ranges.scanData_Single_SearchScanFileId_YES_Peaks_Data_Holder.scanData_YES_Peaks_Data_Holder.scanData.scansArray ) {

                        if ( scan.peaks && scan.peaks.length > 0 ) {

                            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId.scanData_Map_Key_ScanNumber.set( scan.scanNumber, scan )
                        }
                    }

                    //  Add to scans to get NO Peaks for
                    for ( const scanNumber of scanNumberList_RetrieveScanDataFromServer_SINGLE_BATCH ) {
                        if ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) {
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


                        const promise_ScansNoPeaks = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers({
                            searchScanFileId: searchScanFileId_Selected,
                            scanNumberSet: scanNumbers_Get_NonPeaksDataFor_Set,
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                        })

                        promise_ScansNoPeaks.catch(reason => { reject(reason) })
                        promise_ScansNoPeaks.then(scanData_NO_Peaks_Data_Holder => { try {

                            //  resolve parent Promise

                            for ( const scan of scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                                dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.scanData_Map_Key_ScanNumber.set( scan.scanNumber, scan )
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
    private _load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage(
        {
            currentSelection_ObjectReference_AtStartOf_Request,
            searchScanFileId_Selected_AtStartOf_LoadRequest
        } : {
            currentSelection_ObjectReference_AtStartOf_Request: object
            searchScanFileId_Selected_AtStartOf_LoadRequest: number
        }
    ) : void {

        if ( currentSelection_ObjectReference_AtStartOf_Request !== this._currentSelection_ObjectReference ) {
            //  No longer current request so stop

            return // EARLY RETURN
        }

        const dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_Map_Key_SearchScanFileId for searchScanFileId_Selected_AtStartOf_LoadRequest: " + searchScanFileId_Selected_AtStartOf_LoadRequest )
        }

        const dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_Map_Key_SearchScanFileId for searchScanFileId_Selected_AtStartOf_LoadRequest: " + searchScanFileId_Selected_AtStartOf_LoadRequest )
        }

        const dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId.get( searchScanFileId_Selected_AtStartOf_LoadRequest )
        if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) {
            throw Error("_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage(...):  No value in this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Map_Key_SearchScanFileId for searchScanFileId_Selected_AtStartOf_LoadRequest: " + searchScanFileId_Selected_AtStartOf_LoadRequest )
        }
        if ( ! dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.is_Data_FullyLoaded({
            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId: dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId,
            dataFromServer_Scans_NO_For_Single_SearchScanFileId: dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
        }) ) {
            throw Error("_load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage(...):  dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.is_Data_FullyLoaded returns FALSE for searchScanFileId_Selected_AtStartOf_LoadRequest: " + searchScanFileId_Selected_AtStartOf_LoadRequest )
        }

        this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
        this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId
        this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId = dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId

        this._loadingInitialChromatogram = false

        this._show_LoadingData_Message = false;

        this._triggerPlotUpdate_Object = {}

        this.setState({ forceRerenderObject: {} })
    }

    //////////////////   RENDER

    /**
     *
     */
    render() {
        try {
            if ( ! this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params ) {

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

                                    { this._scanFilename_SearchScanFileId_Array ? (

                                        this._scanFilename_SearchScanFileId_Array.length > 1 ? (

                                            <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                                <div style={ { marginBottom: 5 } }>
                                                    <span>Scan Filename:</span>

                                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                        title={
                                                            <span>
                                                                Select the scan file from which to pull MS1 data to build the chromatogram.
                                                            </span>
                                                        }
                                                    />

                                                    <span>&nbsp;&nbsp;</span>

                                                    <select
                                                        value={ this._searchScanFileId_Selected }
                                                        onChange={ event => { try {

                                                            const selectedValueString = event.target.value
                                                            const selectedValueNumber = Number.parseInt( selectedValueString )
                                                            if ( Number.isNaN(selectedValueNumber)) {
                                                                throw Error("Selected Value is not a number for DOM Element [select] value={ this._searchScanFileId_Selected }>. selectedValueString: " + selectedValueString )
                                                            }

                                                            this._searchScanFileId_Selected__Previous = this._searchScanFileId_Selected

                                                            this._searchScanFileId_Selected = selectedValueNumber

                                                            this._currentSelection_ObjectReference = {}

                                                            const currentSelection_ObjectReference_Local = this._currentSelection_ObjectReference

                                                            this._show_Show_Chromatogram_Button = false
                                                            this._show_LoadingData_Message = true;
                                                            this.setState({ forceRerenderObject: {} })

                                                            window.setTimeout( () => { try {

                                                                if ( currentSelection_ObjectReference_Local !== this._currentSelection_ObjectReference ) {
                                                                    //  this._currentSelection_ObjectReference not match currentSelection_ObjectReference_Local so exit
                                                                    return // EARLY RETURN
                                                                }

                                                                this._compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile()

                                                                this._compute_RetentionTime_MinMax_PSM_List_For_Chart()

                                                                //   Only call when change scan file
                                                                this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                                // this.setState({ forceRerenderObject: {} })

                                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                                    >
                                                        { this._scanFilename_SearchScanFileId_Array.map((value, index, array) => {
                                                            return (
                                                                <option
                                                                    key={ value.searchScanFileId }
                                                                    value={ value.searchScanFileId }
                                                                >
                                                                    { value.scanFilename }
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : null
                                    ) : null }

                                    <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                        <div style={ { marginBottom: 5 } }>
                                            <span>Select ion:</span>

                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={
                                                    <span>
                                                        Select the combination of peptide (plus any modifications) and charge state for which to build a chromatogram.
                                                    </span>
                                                }
                                            />

                                            <span>&nbsp;&nbsp;</span>

                                            <select
                                                value={ this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.selectElement_ValueString }
                                                onChange={ event => { try {

                                                    const selectedValueString = event.target.value
                                                    const arrayIndex = Number.parseInt( selectedValueString )
                                                    if ( Number.isNaN(arrayIndex)) {
                                                        throw Error("Selected Value is not a number for DOM Element [select] defaultValue={ this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.selectElement_ValueString }>. selectedValueString: " + selectedValueString )
                                                    }

                                                    const selectionEntry = this._ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray[ arrayIndex ]
                                                    if ( ! selectionEntry ) {
                                                        throw Error("Selected Value not found in array for DOM Element [select] defaultValue={ this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.selectElement_ValueString }>. arrayIndex: " + arrayIndex + ", selectedValueString: " + selectedValueString )
                                                    }
                                                    if ( selectionEntry.selectElement_ValueString !== selectedValueString ) {
                                                        throw Error("( selectionEntry.selectElement_ValueString !== selectedValueString ) for DOM Element [select] defaultValue={ this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection.selectElement_ValueString }>. arrayIndex: " +
                                                            arrayIndex +
                                                            ", selectionEntry.selectElement_ValueString: " + selectionEntry.selectElement_ValueString +
                                                            ", selectedValueString: " + selectedValueString )
                                                    }

                                                    this._showUpdatingMessage = true;

                                                    this.setState({ forceRerenderObject: {} })

                                                    this._currentSelection_ObjectReference = {}

                                                    const currentSelection_ObjectReference_Local = this._currentSelection_ObjectReference

                                                    window.setTimeout( () => { try {

                                                        if ( currentSelection_ObjectReference_Local !== this._currentSelection_ObjectReference ) {
                                                            return
                                                        }

                                                        this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection = selectionEntry

                                                        this._compute_RetentionTime_MinMax_PSM_List_For_Chart()

                                                        this._currentSelection_ObjectReference = {}

                                                        //   Only call when change scan file
                                                        // this._displayChromatogram_For_Selected_SearchScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                        this._showUpdatingMessage = false;

                                                        this._triggerPlotUpdate_Object = {}

                                                        this.setState({ forceRerenderObject: {} })

                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                            >
                                                { this._ionSelection__reportedPeptide_OpenModMass_Charge_SelectionArray.map((value, index, array) => {
                                                    return (
                                                        <option
                                                            key={ value.selectElement_ValueString }
                                                            value={ value.selectElement_ValueString }
                                                        >
                                                            {
                                                                value.reportedPeptide_String +
                                                                    " (z=" +  value.charge + ")" +
                                                                (
                                                                    ( ( ! value.no_PSM_hasOpenModMass ) && ( ! value.no_openModMass ) ) ? (
                                                                        " (" +
                                                                        ( value.openModMass_Sum_Rounded > 0 ? "+" : "" ) +
                                                                        value.openModMass_Sum_Rounded.toFixed( this._open_modification_mass_decimal_place_rounding__user_selection ) +
                                                                         ")"
                                                                    ) : ""
                                                                )
                                                            }
                                                        </option>
                                                    )
                                                })}
                                            </select>

                                            { this._anyPsm_Have_OpenModifications ? (
                                                <>
                                                    <span> </span>
                                                    <span>
                                                        Open Mod Rounding:
                                                    </span>

                                                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                        title={
                                                            <span>
                                                                Open modification masses are typically the difference between the observed mass for a peptide ion and the calculated mass for the peptide ion.
                                                                Since this value inherently includes error the exact values for the open modification associated with PSMs can vary slightly.
                                                                The chromatogram viewer rounds the open modification mass using the scale selected here,
                                                                and bins which PSMs are included in the chromatogram based on which PSMs have observed m/z values in that bin.
                                                                The calculated m/z that is the center of the window for peak finding the MS1 scan (see below) will be the mean observed m/z of the PSMs in this bin.
                                                                Very specific rounding (i.e., more decimal places) risks including only a subset of the PSMs that have a true underlying open modification.
                                                                Very general rounding (fewer decimal places) risks including PSMs with different underlying true open modifications.
                                                            </span>
                                                        }
                                                    />

                                                    <span>&nbsp;</span>

                                                    <span> </span>
                                                    <select
                                                        defaultValue={ this._open_modification_mass_decimal_place_rounding__user_selection }
                                                        onChange={ event => { try {

                                                            const valueString = event.target.value

                                                            const valueNumber = Number.parseInt( valueString )

                                                            if ( Number.isNaN( valueNumber ) ) {
                                                                const msg = "valueString is NOT an Integer.  valueString: " + valueString
                                                                console.warn(msg)
                                                                throw Error(msg)
                                                            }

                                                            this._showUpdatingMessage = true;

                                                            this.setState({ forceRerenderObject: {} })

                                                            window.setTimeout( () => { try {

                                                                this._open_modification_mass_decimal_place_rounding__user_selection = valueNumber

                                                                this._open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection = Math.pow( 10, this._open_modification_mass_decimal_place_rounding__user_selection );

                                                                this._compute_selection_ReportedPeptide_OpenModMass_Charge__Array__DefaultSelection__For_ScanFile()

                                                                this._currentSelection_ObjectReference = {}

                                                                const searchScanFileId_Selected_AtStartOf_LoadRequest = this._searchScanFileId_Selected;

                                                                this._load_Chromatogram_For_Selected_SearchScanFileId__AfterGet_ScanData_RenderOnPage({
                                                                    currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference,
                                                                    searchScanFileId_Selected_AtStartOf_LoadRequest
                                                                })

                                                                this._showUpdatingMessage = false;

                                                                this._triggerPlotUpdate_Object = {}

                                                                this.setState({ forceRerenderObject: {} })

                                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

                                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                                    >
                                                        { _OPEN_MODIFICATION_MASS_DECIMAL_PLACE_ROUNDING__FOR_USER_SELECTION_OPTIONS.map( (value, index) => {
                                                            return (
                                                                <option
                                                                    key={ index }
                                                                    value={ value }
                                                                >
                                                                    { value }
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                    <span> decimal places</span>
                                                </>
                                            ) : null }
                                        </div>
                                    </div>

                                    <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                                        <div style={ { marginBottom: 5 } }>
                                            <Internal__PeakSelection_Component
                                                onChange_Callback={ (newSelectionValue) => { try {

                                                    this._scanPeakSelect = newSelectionValue

                                                    this._currentSelection_ObjectReference = {}

                                                    //   Only call when change scan file
                                                    // this._displayChromatogram_For_Selected_SearchScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

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
                                                    // this._displayChromatogram_For_Selected_SearchScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

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
                                                    // this._displayChromatogram_For_Selected_SearchScanFileId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

                                                    this._triggerPlotUpdate_Object = {}

                                                    this.setState({ forceRerenderObject: {} })

                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}}
                                                />
                                        </div>
                                    </div>

                                    <div style={ { marginBottom: 5 } }>
                                        <Internal__RetentionTime_Min_Max_UserEditable_Component
                                            force_SetTo_ValueFromParent={ this._force_SetTo_ValueFromParent__FOR__Internal__RetentionTime_Min_Max_UserEditable_Component }  // On object reference change, the input values will be set to the values from Parent

                                            retentionTimeSeconds_Range_ForChart_Min__ValueFromParent={ this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Min }
                                            retentionTimeSeconds_Range_ForChart_Max__ValueFromParent={ this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Max }

                                            retentionTimeSeconds_Range_ForChart_Min__DefaultValue={ this._retentionTimeSeconds_Range_ComputedFromPSMs_Min_Max.retentionTimeSeconds_Range_Min }
                                            retentionTimeSeconds_Range_ForChart_Max__DefaultValue={ this._retentionTimeSeconds_Range_ComputedFromPSMs_Min_Max.retentionTimeSeconds_Range_Max }

                                            updatedValues_Callback={ ( params ) => {

                                                this._retentionTimeSeconds_Range_ForChart_Min_Max__PreviousValues = this._retentionTimeSeconds_Range_ForChart_Min_Max

                                                this._retentionTimeSeconds_Range_ForChart_Min_Max = {
                                                    retentionTimeSeconds_Range_Min: params.retentionTimeSeconds_Range_ForChart_Min, retentionTimeSeconds_Range_Max: params.retentionTimeSeconds_Range_ForChart_Max
                                                }


                                                if ( this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ) {

                                                    const retentionTimeSeconds_Range_Min_Max__LoadingDataFor = this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.data.retentionTimeSeconds_Range_Min_Max__LoadingDataFor

                                                    if ( this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Min < retentionTimeSeconds_Range_Min_Max__LoadingDataFor.retentionTimeSeconds_Range_Min ||
                                                        this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Max > retentionTimeSeconds_Range_Min_Max__LoadingDataFor.retentionTimeSeconds_Range_Max ) {

                                                        //  Load data based on NEW Retention Time Range


                                                        this._currentSelection_ObjectReference = {}

                                                        this._load_Chromatogram_For_Selected_SearchScanFileId({
                                                            currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference,
                                                            retentionTimeRange_Min__LoadDataForScansFor: this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Min,
                                                            retentionTimeRange_Max__LoadDataForScansFor: this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Max
                                                        })

                                                        return // EARLY RETURN
                                                    }
                                                }

                                                //  Else Update for new NEW Retention Time Range

                                                this._displayChromatogram_For_Selected_SearchScanFileId_Selected_ReportedPeptideId({ currentSelection_ObjectReference_AtStartOf_Request: this._currentSelection_ObjectReference })

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
                                        { this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId &&
                                            this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId ? (
                                            <Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component
                                                triggerPlotUpdate_Object={ this._triggerPlotUpdate_Object }
                                                open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection={ this._open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection }
                                                projectSearchId={ this.props.projectSearchId }
                                                selection_ReportedPeptide_OpenModMass_Charge={ this._ionSelection__reportedPeptide_OpenModMass_Charge_Selection }
                                                searchScanFileId_Selected={ this._searchScanFileId_Selected }
                                                open_modification_mass_decimal_place_rounding__user_selection={ this._open_modification_mass_decimal_place_rounding__user_selection }
                                                scanPeakSelect={ this._scanPeakSelect }
                                                smoothingOption_Selection={ this._smoothingOption_Selection }

                                                precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection={ this._precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection }

                                                retentionTimeSeconds_Range_ForChart_Min={ this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Min }
                                                retentionTimeSeconds_Range_ForChart_Max={ this._retentionTimeSeconds_Range_ForChart_Min_Max.retentionTimeSeconds_Range_Max }

                                                psmList_FilteredForDisplay={ this._psmList_PossiblyFiltered_ForChart_ForDisplay }


                                                dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId={ this._dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId }
                                                dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId={ this._dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId }
                                                dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId={ this._dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId }

                                                psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results={ this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results }
                                                psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params={ this.props.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params }

                                                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder={ this._variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder }
                                                staticMods_Holder={ this._staticMods_Holder }
                                                peptideIds_For_MainFilters_Holder={ this._peptideIds_For_MainFilters_Holder }
                                                peptideSequences_For_MainFilters_Holder={ this._peptideSequences_For_MainFilters_Holder }
                                                reportedPeptideSequences_Holder={ this._reportedPeptideSequences_Holder }
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
                                { this._searchScanFileId_Selected__Reset_To_Previous ? (
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
                                                    this._searchScanFileId_Selected__Reset_To_Previous = false
                                                    this.setState({ forceRerenderObject: {} })
                                                }}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                ) : null }

                                {/*  Overlay for Updated Retention Time selection to previous selection  */}
                                { this._retentionTimeSeconds_Range_ForChart_Min_Max__Reset_To_Previous ? (
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
                                                    this._retentionTimeSeconds_Range_ForChart_Min_Max__Reset_To_Previous = false
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
interface Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props {

    //   When Change this change method 'componentDidUpdate(...)'

    triggerPlotUpdate_Object: object

    open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection: number

    projectSearchId: number

    searchScanFileId_Selected: number

    open_modification_mass_decimal_place_rounding__user_selection: number

    //  Single Selected Reported Peptide Open Mod Mass Charge
    selection_ReportedPeptide_OpenModMass_Charge: Internal__Selection_ReportedPeptide_OpenModMass_Charge

    scanPeakSelect: ScanPeakSelect_Enum

    smoothingOption_Selection: SmoothingOption_Enum

    precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection: number

    retentionTimeSeconds_Range_ForChart_Min: number
    retentionTimeSeconds_Range_ForChart_Max: number

    psmList_FilteredForDisplay: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>

    dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId
    dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId
    dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId

    psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params

    //  ONLY Use for the DataTable Contents for Tooltip
    psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result

    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
    peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
    peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
    reportedPeptideSequences_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences_Holder
}

/**
 *
 */
interface Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State {

    forceRerenderObject?: object
}

/**
 *
 */
export class Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component extends React.Component< Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props, Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State > {


    private _DO_NOT_CALL() { //  Test Cast of method
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _showCreatingMessage = true
    private _showUpdatingMessage = false
    private _show_NO_DATA_ForSelection_Message = false

    private _psms_NOT_PutOnChart_ShowMessage = false
    private _psms_NOT_PutOnChart_Count: number

    private _psms_Contain_PSM_Level_VariableModifications_ShowMessage = false

    /**
     *
     */
    constructor( props: Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props ) {
        super( props );

        this.plot_Ref = React.createRef();

    }

    componentWillUnmount() {
        try {
            try {
                Plotly.purge(this.plot_Ref.current)
            } catch (e) {
                //  Eat Exception
            }
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    componentDidUpdate( prevProps: Readonly<Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Props>, prevState: Readonly<Internal_ShowPlot_PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_State>, snapshot?: any ) {
        try {
            if (
                prevProps.triggerPlotUpdate_Object !== this.props.triggerPlotUpdate_Object
            ) {

                this._showUpdatingMessage = true
                this._show_NO_DATA_ForSelection_Message = false;

                this._psms_NOT_PutOnChart_ShowMessage = false
                this._psms_Contain_PSM_Level_VariableModifications_ShowMessage = false

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
     *
     */
    private _createOnMount_And_OnUpdate() {

        const retentionTimeSeconds_Range_ForChart_Min = this.props.retentionTimeSeconds_Range_ForChart_Min
        const retentionTimeSeconds_Range_ForChart_Max = this.props.retentionTimeSeconds_Range_ForChart_Max

        const psmList_LOCAL_PossiblyFiltered = this.props.psmList_FilteredForDisplay;

        if ( psmList_LOCAL_PossiblyFiltered.length === 0 ) {

            console.log( "NO PSMs found for Scan File, charge and optionally Open Mod Mass")

            this._show_NO_DATA_ForSelection_Message = true

            this._showCreatingMessage = false
            this._showUpdatingMessage = false
            this.setState({ forceRerenderObject: {} })

            return; // EARLY EXIT
        }

        const scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime: Array<{
            scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
            scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
            scan_RetentionTime: number
            scanNumber: number
            scanLevel: number
        }> = []

        for ( const scanNumber of this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.scanNumberArray ) {

            let found_ScanWithPeaks = false
            {
                const scanItem_YES_Peaks = this.props.dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.scanData_Map_Key_ScanNumber.get( scanNumber )
                if ( scanItem_YES_Peaks ) {
                    if ( scanItem_YES_Peaks.peaks.length > 0 ) {

                        //  Scan Number found With Peaks

                        if ( scanItem_YES_Peaks.retentionTime < retentionTimeSeconds_Range_ForChart_Min || scanItem_YES_Peaks.retentionTime > retentionTimeSeconds_Range_ForChart_Max ) {

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

                const scanItem_NO_Peaks = this.props.dataFromServer_Scans_NO_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.scanData_Map_Key_ScanNumber.get(  scanNumber )
                if ( scanItem_NO_Peaks ) {

                    if ( scanItem_NO_Peaks.retentionTime_InSeconds < retentionTimeSeconds_Range_ForChart_Min || scanItem_NO_Peaks.retentionTime_InSeconds > retentionTimeSeconds_Range_ForChart_Max ) {

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


        const psmList_DataTable_DataRowEntry_Map_Key_PsmId: Map<number, DataTable_DataRowEntry> = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_DataRowEntries_Map_Key_Psm_Id

        const trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass: Array<any> = []

        const trace_Psm_Points_X: Array<number> = []
        const trace_Psm_Points_Y: Array<number> = []
        const trace_Psm_Points_Tooltips: Array<string> = []

        const psmItem_Map_Key_PsmTooltip: Map<string, PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item> = new Map()

        const psms_NOT_PutOnChart_PSM_IDs: Set<number> = new Set()  //  Remove each PSM ID added to the plot. Left with PSM IDs NOT put on the chart

        for ( const psmEntry of psmList_LOCAL_PossiblyFiltered ) {
            psms_NOT_PutOnChart_PSM_IDs.add( psmEntry.psmId )
        }

        const reportedPeptideId = this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id

        const reportedPeptideSequence = this.props.reportedPeptideSequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId )
        if ( ! reportedPeptideSequence ) {
            const msg = "reportedPeptideSequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId ) returned NOTHING for " + reportedPeptideId;
            console.warn(msg)
            throw Error(msg)
        }

        const peptideId = this.props.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId )
        if ( ! peptideId ) {
            const msg = "peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( reportedPeptideId ) returned NOTHING for " + reportedPeptideId;
            console.warn(msg)
            throw Error(msg)
        }

        const peptideSequence_String = this.props.peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
        if ( ! peptideSequence_String ) {
            const msg = "peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId) returned NOTHING for peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId;
            console.warn(msg)
            throw Error(msg)
        }

        ////////
        {
            //  m/z ranges for scan peaks and PSMs

            {

                const staticModMasses_At_ReportedPeptide_Level: Array<number> = []
                {
                    const staticMods = this.props.staticMods_Holder.get_StaticMods()
                    if ( staticMods && staticMods.length > 0 ) {

                        for ( const staticMod of staticMods ) {
                            for ( const peptideSequenceLetter of peptideSequence_String ) {
                                if ( peptideSequenceLetter == staticMod.residue ) {
                                    staticModMasses_At_ReportedPeptide_Level.push( staticMod.mass )
                                }
                            }
                        }
                    }
                }

                const variableModMasses_At_ReportedPeptide_Level: Array<number> = []
                {
                    const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId =
                        this.props.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId )
                    if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                        for ( const modificationEntry of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {
                            variableModMasses_At_ReportedPeptide_Level.push( modificationEntry.mass )
                        }
                    }
                }

                const modificationMasses_For_calculateMZ: Array<number> = []

                if ( variableModMasses_At_ReportedPeptide_Level && variableModMasses_At_ReportedPeptide_Level.length > 0 ) {
                    for ( const mass of variableModMasses_At_ReportedPeptide_Level ) {
                        modificationMasses_For_calculateMZ.push(mass)
                    }
                }
                if ( staticModMasses_At_ReportedPeptide_Level && staticModMasses_At_ReportedPeptide_Level.length > 0 ) {
                    for ( const mass of staticModMasses_At_ReportedPeptide_Level ) {
                        modificationMasses_For_calculateMZ.push(mass)
                    }
                }

                {
                    let openModMasses_All_PSM_Summed = 0;
                    for ( const psmEntry of psmList_LOCAL_PossiblyFiltered ) {
                        if ( psmEntry.openModificationMassAndPositionsList && psmEntry.openModificationMassAndPositionsList.length > 0 ) {
                            for ( const openModificationMassAndPositions of psmEntry.openModificationMassAndPositionsList ) {
                                openModMasses_All_PSM_Summed += openModificationMassAndPositions.openModMass
                            }
                        }
                    }
                    const openModMasses_All_PSM_Average = openModMasses_All_PSM_Summed / psmList_LOCAL_PossiblyFiltered.length

                    modificationMasses_For_calculateMZ.push(openModMasses_All_PSM_Average)
                }

                const m_over_z_Peptide_And_Mods = PeptideMassCalculator.calculateMZ( peptideSequence_String, modificationMasses_For_calculateMZ, this.props.selection_ReportedPeptide_OpenModMass_Charge.charge );

                {    //  Window: main m/z

                    const plotlyTrace_Label = "Monoisotopic";

                    const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus({
                        ppm_ExtendRange_AddSubtract_ToMinMaxValues: this.props.precursor_M_Over_Z_PPM_ExtendRange_AddSubtract_ToMinMaxValues_Selection,
                        m_Over_Z_Mass: m_over_z_Peptide_And_Mods
                    })


                    const m_Over_Z_Window_Min = m_over_z_Peptide_And_Mods - ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus
                    const m_Over_Z_Window_Max = m_over_z_Peptide_And_Mods + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus

                    // console.log(
                    //     "Calculated m/z (Monoisotopic) for Peptide and Mods and Charge (from PeptideMassCalculator.calculateMZ(...)): " + m_over_z_Peptide_And_Mods +
                    //     ", Peptide Sequence: " + peptideSequence_String +
                    //     ", Modification Masses used (Last one is open mod mass if applicable): " + modificationMasses_For_calculateMZ.join() +
                    //     ", Charge: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.charge +
                    //     ".  Separate: For main m/z window: ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus: " + ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus +
                    //     ", m_Over_Z_Window_Min: " + m_Over_Z_Window_Min +
                    //     ", m_Over_Z_Window_Max: " + m_Over_Z_Window_Max
                    // )

                    const plotlyTrace = this._create_Single_PlotlyTrace_For_MZ_OR_MZ_Plus_X_Isotope({

                        plotlyTrace_Label,
                        plotlyTrace_Color: "rgb(31, 119, 180)",

                        m_Over_Z_Window_Min,
                        m_Over_Z_Window_Max,
                        m_Over_Z_Window_Index: 0,  // Not sure used

                        scanItem_Array_SortOn_RetentionTime: scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime,
                        psmList_LOCAL_PossiblyFiltered: psmList_LOCAL_PossiblyFiltered,

                        //  Updated
                        psmList_DataTable_DataRowEntry_Map_Key_PsmId,
                        psmItem_Map_Key_PsmTooltip,
                        psms_NOT_PutOnChart_PSM_IDs,

                        trace_Psm_Points_X,
                        trace_Psm_Points_Y,
                        trace_Psm_Points_Tooltips
                    })

                    if ( plotlyTrace ) {

                        trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.push( plotlyTrace )
                    }
                }

                //  LOOP For Isotopes to Display: up to _ISOTOPE_MAX__FOR_CHART_TRACES

                for ( let isotope_Number = 1; isotope_Number <= _ISOTOPE_MAX__FOR_CHART_TRACES; isotope_Number++ ) {  //  Window:  m/z window for main m/z + X isotope

                    const plotlyTrace_Label = "13C x " + isotope_Number

                    const isotope_M_Over_Z_Addition = _compute_Isotope_M_Over_Z_Addition_For_Isotope_Number({ isotope_Number, charge: this.props.selection_ReportedPeptide_OpenModMass_Charge.charge });

                    const m_over_z_Peptide_And_Mods__Plus_X_Isotope = m_over_z_Peptide_And_Mods + isotope_M_Over_Z_Addition

                    const ppm_Mass_For_precursor_M_Over_Z_Max_PlusMinus = psmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_PPM_Mass_For_Precursor_M_Over_Z_PlusMinus( {
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

                    const plotlyTrace = this._create_Single_PlotlyTrace_For_MZ_OR_MZ_Plus_X_Isotope({

                        plotlyTrace_Label,
                        plotlyTrace_Color: _ISOTOPE_PLOT_TRACE_COLORS[ isotope_Number ],

                        m_Over_Z_Window_Min,
                        m_Over_Z_Window_Max,
                        m_Over_Z_Window_Index: isotope_Number,  // Not sure used

                        scanItem_Array_SortOn_RetentionTime: scanItem_WithPeaks_WithoutPeaks_Array_SortOn_RetentionTime,
                        psmList_LOCAL_PossiblyFiltered: psmList_LOCAL_PossiblyFiltered,

                        //  Updated
                        psmList_DataTable_DataRowEntry_Map_Key_PsmId,
                        psmItem_Map_Key_PsmTooltip,
                        psms_NOT_PutOnChart_PSM_IDs,

                        trace_Psm_Points_X,
                        trace_Psm_Points_Y,
                        trace_Psm_Points_Tooltips
                    })

                    if ( plotlyTrace ) {

                        trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.push( plotlyTrace )
                    }
                }
            }
        }

        if ( trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.length === 0 ) {

            console.log( "NO Plotly traces created for MS 1 Scans. trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass.length === 0")

            this._show_NO_DATA_ForSelection_Message = true

            this._showCreatingMessage = false
            this._showUpdatingMessage = false
            this.setState({ forceRerenderObject: {} })

            return; // EARLY EXIT
        }

        //  PSM Points
        const trace_Psm_Points = {
            name: "PSM",
            x: trace_Psm_Points_X,
            y: trace_Psm_Points_Y,
            // type: 'scatter',
            mode: 'markers',
            hoverinfo: "text", //  Hover contents
            hovertext: trace_Psm_Points_Tooltips,
            marker: {
                color: "rgb(214, 39, 40)",  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                size: 8 // marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
            }
        };

        const chart_Data = Array.from( trace_RT_Intensity_Line_ForEach_Unique_IsotopeMass ) //  Start with Traces for MS 1 Scans

        chart_Data.push( trace_Psm_Points )  //  Add trace for PSMs

        let openModMass_Display_For_ChartTitle = ""
        {
            if ( ( ! this.props.selection_ReportedPeptide_OpenModMass_Charge.no_PSM_hasOpenModMass ) && ( ! this.props.selection_ReportedPeptide_OpenModMass_Charge.no_openModMass ) ) {

                const openModMass_Sum_Rounded = this.props.selection_ReportedPeptide_OpenModMass_Charge.openModMass_Sum_Rounded
                let openModMass_Sum_Rounded_Display = openModMass_Sum_Rounded.toString()
                if ( openModMass_Sum_Rounded.toFixed ) {
                    openModMass_Sum_Rounded_Display = openModMass_Sum_Rounded.toFixed( this.props.open_modification_mass_decimal_place_rounding__user_selection )
                }
                let plusSign = ""
                if ( openModMass_Sum_Rounded > 0 ) {
                    plusSign = "+"
                }
                openModMass_Display_For_ChartTitle = " (" + plusSign + openModMass_Sum_Rounded_Display + " Da)"
            }
        }

        const chartTitle = "Chromatogram - " + reportedPeptideSequence + "<sup>" + this.props.selection_ReportedPeptide_OpenModMass_Charge.charge + "+</sup>" + openModMass_Display_For_ChartTitle
        const chart_X_Axis_Label ="Time (min)"
        const chart_Y_Axis_Label = "Intensity"
        const showlegend_Local = true

        const chart_Layout = {
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
                range: [ retentionTimeSeconds_Range_ForChart_Min / 60, retentionTimeSeconds_Range_ForChart_Max / 60 ],

                exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
            },
            yaxis: {
                title: {
                    text: chart_Y_Axis_Label
                },
                exponentformat: 'e'
            },
            showlegend: showlegend_Local
        }

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        const newPlotResulting_Promise = Plotly.newPlot(
            this.plot_Ref.current,
            chart_Data,
            chart_Layout,
            chart_config
        )

        {
            //  Click handler NOT specific to a trace so need to accept click on point on any trace

            const projectSearchId = this.props.projectSearchId

            // @ts-ignore
            this.plot_Ref.current.on('plotly_click', function(data) {
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

                    // console.log( "In 'plotly_click': data.points[i] (point): ", point )

                    const psmItem_For_Associated_MS_1_ScanNumber = psmItem_Map_Key_PsmTooltip.get( point.hovertext )

                    // console.log( "In 'plotly_click': psmItem_For_Associated_MS_1_ScanNumber: ", psmItem_For_Associated_MS_1_ScanNumber )

                    if ( ! psmItem_For_Associated_MS_1_ScanNumber ) {
                        //  NOT PSM point
                        return; // EARLY RETURN
                    }

                    // console.log( "PSM: PSM ID: " + psmItem_For_Associated_MS_1_ScanNumber.psmId + ", Scan Number: " + psmItem_For_Associated_MS_1_ScanNumber.scanNumber )

                    //  Open Lorikeet window for PSM ID

                    const spectrumRetrieveAndDisplay_Use_lorikeet = new SpectrumRetrieveAndDisplay_Use_lorikeet(); // Params not used in constructor

                    spectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow( {
                        psmId: psmItem_For_Associated_MS_1_ScanNumber.psmId,
                        projectSearchId,
                        openModPosition: undefined  //  TODO For now until figure out what to pass
                    } );

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            })
        }

        if ( psms_NOT_PutOnChart_PSM_IDs.size > 0 ) {

            //   NOT all PSMs put on the chart, Display These PSMs at zero on Y axis

            const scanData_NO_Peaks_Entry_Map_Key_ScanNumber: Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()

            for ( const scanItem of this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                scanData_NO_Peaks_Entry_Map_Key_ScanNumber.set( scanItem.scanNumber, scanItem )
            }

            // let logMessage = "PSMs NOT in m/z ranges so put on zero on Y axis: "

            for ( const psmEntry of psmList_LOCAL_PossiblyFiltered ) {
                if ( psms_NOT_PutOnChart_PSM_IDs.has( psmEntry.psmId ) ) {

                    let scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( psmEntry.scanNumber )
                    if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                        throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( psmEntry.scanNumber ) returned NOTHING for psmEntry.scanNumber: " + psmEntry.scanNumber )
                    }
                    while ( scanData_NO_Peaks_Entry_MS_1.level > 1 ) {
                        scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber )
                        if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                            throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber ) returned NOTHING for scanData_NO_Peaks_Entry_MS_1.parentScanNumber: " + scanData_NO_Peaks_Entry_MS_1.parentScanNumber + ", psmEntry.scanNumber: " + psmEntry.scanNumber )
                        }
                    }

                    this._plot_PSM(
                        {
                            psmItem_ToPlot: psmEntry,
                            scanData_NO_Peaks_Entry_MS_1: scanData_NO_Peaks_Entry_MS_1,
                            scanItem: undefined,
                            peakToUse: undefined,  //  May NOT be populated
                            plot_Y_Value: 0,  // hard code to zero for these PSMs

                            psmList_DataTable_DataRowEntry_Map_Key_PsmId,

                            psmItem_Map_Key_PsmTooltip,
                            trace_Psm_Points_X,
                            trace_Psm_Points_Y,
                            trace_Psm_Points_Tooltips
                        } )

                    // logMessage += "\n PSM: PsmId: " + psmEntry.psmId + ", scanNumber: " + psmEntry.scanNumber + ", precursor_M_Over_Z: " + psmEntry.precursor_M_Over_Z + ", scan_RetentionTimeSeconds: " + psmEntry.retentionTimeSeconds +
                    //     ", Associated MS 1 Scan Data:  scan number: " + scanData_NO_Peaks_Entry_MS_1.scanNumber +
                    //     ", retention time seconds: " + scanData_NO_Peaks_Entry_MS_1.retentionTime + ",  retention time minutes: " + scanData_NO_Peaks_Entry_MS_1.retentionTime / 60
                }
            }

            // console.log( logMessage )

        } else {

            //   YES all PSMs put on the chart, NOT show overlay

            this._psms_NOT_PutOnChart_Count = psms_NOT_PutOnChart_PSM_IDs.size

            this._psms_NOT_PutOnChart_ShowMessage = false
        }

        {  //  Find PSMs Contain variable modification

            for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

                if ( psmItem.hasVariableModifications ) {
                    //  PSM has PSM level Variable modifications
                    this._psms_Contain_PSM_Level_VariableModifications_ShowMessage = true;
                    break
                }
            }
        }


        this._showCreatingMessage = false
        this._showUpdatingMessage = false

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     * @param plotlyTrace_Label
     * @param m_Over_Z_Window_Min
     * @param m_Over_Z_Window_Max
     * @param m_Over_Z_Window_Index
     * @param scanItem_Array_SortOn_RetentionTime
     * @param psmList_LOCAL_PossiblyFiltered
     * @param psmList_DataTable_DataRowEntry_Map_Key_PsmId
     * @param psmItem_Map_Key_PsmTooltip
     * @param psms_NOT_PutOnChart_PSM_IDs
     * @param trace_Psm_Points_X
     * @param trace_Psm_Points_Y
     * @param trace_Psm_Points_Tooltips
     * @private
     */
    private _create_Single_PlotlyTrace_For_MZ_OR_MZ_Plus_X_Isotope(
        {
            plotlyTrace_Label,
            plotlyTrace_Color,

            m_Over_Z_Window_Min,
            m_Over_Z_Window_Max,
            m_Over_Z_Window_Index,  // Not sure used

            scanItem_Array_SortOn_RetentionTime,
            psmList_LOCAL_PossiblyFiltered,

            //  Updated
            psmList_DataTable_DataRowEntry_Map_Key_PsmId,
            psmItem_Map_Key_PsmTooltip,
            psms_NOT_PutOnChart_PSM_IDs,

            trace_Psm_Points_X,
            trace_Psm_Points_Y,
            trace_Psm_Points_Tooltips
        } : {

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

            psmList_LOCAL_PossiblyFiltered: Array<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>

            //  Updated
            psmList_DataTable_DataRowEntry_Map_Key_PsmId: Map<number, DataTable_DataRowEntry>
            psmItem_Map_Key_PsmTooltip: Map<string, PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>
            psms_NOT_PutOnChart_PSM_IDs: Set<number>

            trace_Psm_Points_X: Array<number>
            trace_Psm_Points_Y: Array<number>
            trace_Psm_Points_Tooltips: Array<string>

        }
    ) : any { // return any since return plotly trace

        // console.log( "START Plotly Trace for plotlyTrace_Label: " + plotlyTrace_Label )

        //  Middle between m_Over_Z_Window_Min and m_Over_Z_Window_Max
        const m_Over_Z_Window_Middle_Between_Min_Max = m_Over_Z_Window_Min + ( ( m_Over_Z_Window_Max - m_Over_Z_Window_Min ) / 2 )

        const psmItem_Array_Map_Key_Associated_MS_1_ScanNumber: Map<number, Array<{ psmItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item, psmItem_m_Over_Z_Min_Max__Ranges_Index: number }>> = new Map()

        const ms_1_ScanNumber_Map_Key_PsmId: Map<number, number> = new Map()

        const scanData_NO_Peaks_Entry_Map_Key_ScanNumber: Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()

        for ( const scanItem of this.props.dataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_For_Selected_SearchScanFileId.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.value_CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

            scanData_NO_Peaks_Entry_Map_Key_ScanNumber.set( scanItem.scanNumber, scanItem )
        }

        for ( const psmItem of psmList_LOCAL_PossiblyFiltered ) {

             if ( psmItem.precursor_M_Over_Z < m_Over_Z_Window_Min || psmItem.precursor_M_Over_Z > m_Over_Z_Window_Max ) {
                 // psmItem NOT for mz window so SKIP
                 continue; // EARLY CONTINUE
             }

            let scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( psmItem.scanNumber )
            if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( psmItem.scanNumber ) returned NOTHING for psmItem.scanNumber: " + psmItem.scanNumber )
            }
            while ( scanData_NO_Peaks_Entry_MS_1.level > 1 ) {
                scanData_NO_Peaks_Entry_MS_1 = scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber )
                if ( ! scanData_NO_Peaks_Entry_MS_1 ) {
                    throw Error("scanData_NO_Peaks_Entry_Map_Key_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.parentScanNumber ) returned NOTHING for scanData_NO_Peaks_Entry_MS_1.parentScanNumber: " + scanData_NO_Peaks_Entry_MS_1.parentScanNumber + ", psmItem.scanNumber: " + psmItem.scanNumber )
                }
            }

            let psmItem_Array = psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanData_NO_Peaks_Entry_MS_1.scanNumber )
            if ( ! psmItem_Array ) {
                psmItem_Array = []
                psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.set( scanData_NO_Peaks_Entry_MS_1.scanNumber, psmItem_Array )
            }

            psmItem_Array.push({ psmItem, psmItem_m_Over_Z_Min_Max__Ranges_Index: m_Over_Z_Window_Index })

            ms_1_ScanNumber_Map_Key_PsmId.set( psmItem.psmId, scanData_NO_Peaks_Entry_MS_1.scanNumber )
        }

        //  For the PSMs to go with the scans/peaks on this trace

        const psm_And_Its_ScanData: Array<{
            psmItem: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
            scanItem: {
                scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
                scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
                scan_RetentionTime: number
                scanNumber: number
            }
            peakToUse: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
            y_Trace_Index: number
        }> = []

        //  For the Scan Trace

        const trace_rt_Intensity_Line_X: Array<number> = []
        let trace_rt_Intensity_Line_Y: Array<number> = []  // 'let' to allow replace after smoothing
        const trace_rt_Intensity_Tooltips: Array<string> = []

        //  Processing for each charge value
        {
            let scanCount_Where_MoreThanOnePeak_InsideWindow = 0;

            for ( const scanItem of scanItem_Array_SortOn_RetentionTime ) {

                const scan_retentionTime_Minutes = scanItem.scan_RetentionTime / 60 // convert RT to minutes

                if ( scan_retentionTime_Minutes === undefined || scan_retentionTime_Minutes === null ) {
                    const msg = "( scan_retentionTime_Minutes === undefined || scan_retentionTime_Minutes === null ) "
                    console.warn(msg)
                    throw Error(msg)
                }

                const psmItem_Array_For_Associated_MS_1_ScanNumber = psmItem_Array_Map_Key_Associated_MS_1_ScanNumber.get( scanItem.scanNumber )

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

                            if ( this.props.scanPeakSelect === ScanPeakSelect_Enum.MAX_PEAK_INTENSITY ) {
                                if ( peakToUse.intensity < peak.intensity ) {
                                    peakToUse = peak
                                }
                            } else if ( this.props.scanPeakSelect === ScanPeakSelect_Enum.PEAK_MZ_CENTER_OF_MZ_RANGE ) {

                                const peak_DifferenceFrom_M_Over_Z_RangeCenter = Math.abs( peak.mz - m_Over_Z_Window_Middle_Between_Min_Max )

                                if ( peak_DifferenceFrom_M_Over_Z_RangeCenter < peakToUse_DifferenceFrom_M_Over_Z_RangeCenter ) {
                                    peakToUse = peak
                                    peakToUse_DifferenceFrom_M_Over_Z_RangeCenter = Math.abs( peak.mz - m_Over_Z_Window_Middle_Between_Min_Max )
                                }
                            } else {
                                throw Error("Unknown value for this.props.scanPeakSelect: " + this.props.scanPeakSelect )
                            }
                        }
                    }

                    if ( ! peakToUse ) {
                        //  NO Peak on Scan is in the mz range for this charge so Set NO Peak In M/Z range flag to true

                        noPeak_In_M_Over_Z_Range = true

                    } else {

                        trace_rt_Intensity_Line_X.push( scan_retentionTime_Minutes )
                        trace_rt_Intensity_Line_Y.push( peakToUse.intensity )
                        trace_rt_Intensity_Tooltips.push(
                            "MS 1" +
                            "<br><b>Scan Number</b>: " + scanItem.scanNumber +
                            "<br><b>Scan Level</b>: " + scanItem.scanLevel +
                            "<br><b>Peak mz</b>: " + peakToUse.mz.toFixed( _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                            "<br><b>Peak Intensity</b>: " + peakToUse.intensity.toPrecision( _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY ) +
                            "<br><b>Retention Time (Min)</b>: " + scan_retentionTime_Minutes.toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) )

                        const trace_rt_Intensity_Line_Y_LastIndexAdded = trace_rt_Intensity_Line_Y.length - 1;

                        if ( psmItem_Array_For_Associated_MS_1_ScanNumber ) {
                            //  Have PSM Items for this MS 1 scan number

                            for ( const psmItem_Array_For_Associated_MS_1_ScanNumber_Item of psmItem_Array_For_Associated_MS_1_ScanNumber ) {

                                const psmItem_For_Associated_MS_1_ScanNumber = psmItem_Array_For_Associated_MS_1_ScanNumber_Item.psmItem

                                psm_And_Its_ScanData.push({
                                    psmItem: psmItem_For_Associated_MS_1_ScanNumber,
                                    scanItem, peakToUse,
                                    y_Trace_Index: trace_rt_Intensity_Line_Y_LastIndexAdded
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

                    if ( psmItem_Array_For_Associated_MS_1_ScanNumber ) {
                        //  Have PSM Items for this MS 1 scan number

                        for ( const psmItem_Array_For_Associated_MS_1_ScanNumber_Item of psmItem_Array_For_Associated_MS_1_ScanNumber ) {

                            const psmItem_For_Associated_MS_1_ScanNumber = psmItem_Array_For_Associated_MS_1_ScanNumber_Item.psmItem

                            psm_And_Its_ScanData.push({
                                psmItem: psmItem_For_Associated_MS_1_ScanNumber,
                                scanItem,
                                peakToUse: undefined,  //  May NOT be populated
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

            if ( this.props.smoothingOption_Selection === SmoothingOption_Enum.SAVITZKY_GOLAY ) {

                const result = smoothSavitzkyGolay( trace_rt_Intensity_Line_X, trace_rt_Intensity_Line_Y /* , smoothingFactor - Has Default */)

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

            } else if ( this.props.smoothingOption_Selection === SmoothingOption_Enum.LOWESS ) {

                // console.log( "BEFORE call to 'smoothLowess'.  Input X array: ", trace_rt_Intensity_Line_X )
                // console.log( "BEFORE call to 'smoothLowess'.  Input Y array: ", trace_rt_Intensity_Line_Y )
                // console.log( "BEFORE call to 'smoothLowess'.  NO 'smoothingFactor' parameter" )
                // console.log( "BEFORE call to 'smoothLowess'.  Reported Peptide Id: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id )

                const result = smoothLowess( trace_rt_Intensity_Line_X, trace_rt_Intensity_Line_Y /* , smoothingFactor - Has Default */)

                // console.log( "AFTER call to 'smoothLowess'.  result: ", result )

                if ( ! result ) {
                    const msg = "smoothLowess returned nothing.  Reported Peptide Id: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! result.x ) {
                    const msg = "smoothLowess returned an object without a property 'x'.  Reported Peptide Id: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! Array.isArray( result.x )  ) {
                    const msg = "smoothLowess returned an object ( ! Array.isArray( result.x )  ).  Reported Peptide Id: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! Array.isArray( result.y)  ) {
                    const msg = "smoothLowess returned an object ( ! Array.isArray( result.y )  ).  Reported Peptide Id: " + this.props.selection_ReportedPeptide_OpenModMass_Charge.reportedPeptide_Id
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
            }


            //   PSM Trace Additions

            {
                for ( const psm_And_Its_ScanData_Entry of psm_And_Its_ScanData ) {

                    const plot_Y_Value = trace_rt_Intensity_Line_Y[ psm_And_Its_ScanData_Entry.y_Trace_Index ]

                    if ( plot_Y_Value === undefined ) {
                        const msg = "( plot_Y_Value === undefined ) psmId: " + psm_And_Its_ScanData_Entry.psmItem.psmId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    this._plot_PSM(
                        {
                            psmItem_ToPlot: psm_And_Its_ScanData_Entry.psmItem,
                            scanItem: psm_And_Its_ScanData_Entry.scanItem,
                            scanData_NO_Peaks_Entry_MS_1: undefined,
                            peakToUse: psm_And_Its_ScanData_Entry.peakToUse,  //  May NOT be populated

                            plot_Y_Value,

                            psmList_DataTable_DataRowEntry_Map_Key_PsmId,

                            psmItem_Map_Key_PsmTooltip,
                            trace_Psm_Points_X,
                            trace_Psm_Points_Y,
                            trace_Psm_Points_Tooltips
                        } )

                    psms_NOT_PutOnChart_PSM_IDs.delete( psm_And_Its_ScanData_Entry.psmItem.psmId )  //  Delete since did put this psm id on the chart
                }
            }

            //  Scan Trace

            const trace_RT_Intensity_Line = {
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

            return trace_RT_Intensity_Line // EARLY RETURN
        }

        // console.log( "END Plotly Trace for plotlyTrace_Label: " + plotlyTrace_Label + ", NOT returning a plotly trace object since NO points added to the trace" )

        return null //  NO data for trace so return null
    }

    ///////////////

    private _plot_PSM(
        {
            psmItem_ToPlot,
            scanData_NO_Peaks_Entry_MS_1,
            scanItem,
            peakToUse,  //  May NOT be populated

            plot_Y_Value,   //  The 'Y' value for plotting.  Added to support smoothing

            psmList_DataTable_DataRowEntry_Map_Key_PsmId,

            psmItem_Map_Key_PsmTooltip,
            trace_Psm_Points_X,
            trace_Psm_Points_Y,
            trace_Psm_Points_Tooltips
        } : {
            psmItem_ToPlot: PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item
            scanData_NO_Peaks_Entry_MS_1:  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber

            scanItem: {
                scan_WithPeaks: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber
                scan_NO_Peaks: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
                scan_RetentionTime: number
                scanNumber: number
            }

            peakToUse: CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak

            plot_Y_Value: number

            psmList_DataTable_DataRowEntry_Map_Key_PsmId: Map<number, DataTable_DataRowEntry>

            psmItem_Map_Key_PsmTooltip: Map<string, PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_getPSMDataFromServer_Result_PSM_Item>
            trace_Psm_Points_X: Array<number>
            trace_Psm_Points_Y: Array<number>
            trace_Psm_Points_Tooltips: Array<string>
        }
    ) {

        const psmList_DataTable_DataRowEntry = psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psmItem_ToPlot.psmId )
        if ( ! psmList_DataTable_DataRowEntry ) {
            throw Error("psmList_DataTable_DataRowEntry_Map_Key_PsmId.get( psmItem_ToPlot.psmId ) returned NOTHING for psmItem_ToPlot.psmId: " + psmItem_ToPlot.psmId )
        }

        let psmTooltip: string = undefined

        let scanNumber: number = undefined
        let scanRetentionTime_Seconds: number = undefined

        if ( scanData_NO_Peaks_Entry_MS_1 ) {

            scanNumber = scanData_NO_Peaks_Entry_MS_1.scanNumber
            scanRetentionTime_Seconds = scanData_NO_Peaks_Entry_MS_1.retentionTime_InSeconds

        } else if ( scanItem ) {

            scanNumber = scanItem.scanNumber
            scanRetentionTime_Seconds = scanItem.scan_RetentionTime

        } else {
            const msg = "Neither Populated: scanData_NO_Peaks_Entry_MS_1 or scanItem"
            console.warn(msg)
            throw Error(msg)
        }

        {
            const psmTooltipLines: Array<string> = []

            if ( this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length !== psmList_DataTable_DataRowEntry.columnEntries.length ) {
                throw Error("( this.props.psmList_DataTable_RootTableObject.tableDataObject.columns.length !== psmList_DataTable_DataRowEntry.columnEntries.length )")
            }

            const columnCount = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns.length

            // Start at index 1 to skip first column - The link to lorikeet

            for ( let columnIndex = 1; columnIndex < columnCount; columnIndex++  ) {

                const tableColumnData = this.props.psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Results.dataTable_Data.dataTable_RootTableObject.tableDataObject.columns[ columnIndex ]
                if ( ! tableColumnData ) {
                    throw Error("this.props.psmList_DataTable_RootTableObject.tableDataObject.columns[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
                }
                const tableRowData_ForColumn = psmList_DataTable_DataRowEntry.columnEntries[ columnIndex ]
                if ( ! tableRowData_ForColumn ) {
                    throw Error("psmList_DataTable_DataRowEntry.columnEntries[ columnIndex ] returned nothing for columnIndex: " + columnIndex )
                }

                const psmTooltipLine = "<b>" + tableColumnData.displayName + "</b>: " + tableRowData_ForColumn.valueDisplay;
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
                        psmTooltipLines.join("<br>" + _TOOLTIP_LINE_INDENT ) +
                        '<br>' +
                        '<br>' +
                        '<b>Associated MS 1 Scan</b>: ' +
                        '<br>' +
                        _TOOLTIP_LINE_INDENT +
                        '<b>MS 1 Scan Number</b>: ' +  scanNumber +
                        '<br>' +
                        _TOOLTIP_LINE_INDENT +
                        '<b>MS 1 Scan RT(Min)</b>: ' + ( scanRetentionTime_Seconds / 60 ).toFixed( _RETENTION_TIME_MINUTES_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                        "<br>" +
                        (
                            peakToUse ? (
                                _TOOLTIP_LINE_INDENT +
                                '<b>MS 1 Scan Peak M/Z</b>: ' + peakToUse.mz.toFixed( _M_OVER_Z_DECIMAL_PLACE_ROUNDING__FOR_TOOLTIP_DISPLAY ) +
                                '<br>' +
                                _TOOLTIP_LINE_INDENT +
                                '<b>MS 1 Scan Peak Intensity</b>: ' + peakToUse.intensity.toPrecision( _PEAK_INTENSITY_TO_PRECISION_FOR_TOOLTIP_DISPLAY )
                            ) : ""
                        )
                    )

                    if ( ! psmItem_Map_Key_PsmTooltip.has( psmTooltip ) ) {

                        //  psmTooltip string is unique in map keys

                        psmItem_Map_Key_PsmTooltip.set( psmTooltip, psmItem_ToPlot )

                        psmTooltip_Unique = true;

                    } else {

                        psmTooltip_Unique_TryCount++
                    }
                }
            }
        }

        const retentionTimeSeconds = scanRetentionTime_Seconds;  //  PSM positioned using retention time of MS 1 Scan

        const retentionTime_Minutes = retentionTimeSeconds / 60

        trace_Psm_Points_X.push( retentionTime_Minutes )
        trace_Psm_Points_Y.push( plot_Y_Value )
        trace_Psm_Points_Tooltips.push( psmTooltip )
    }

    ////////////////////    RENDER

    /**
     *
     */
    render() {
        return (
            <div style={ { position: "relative", borderStyle: "solid", borderWidth: 1, borderColor: "black", width: _CHART_WIDTH, height: _CHART_HEIGHT } }>

                <div
                    ref={this.plot_Ref}
                    style={ { width: _CHART_WIDTH, height: _CHART_HEIGHT } }
                ></div>

                {/*  Overlay for Creating or Updating  */}
                { this._showCreatingMessage || this._showUpdatingMessage || this._show_NO_DATA_ForSelection_Message || this._psms_NOT_PutOnChart_ShowMessage || this._psms_Contain_PSM_Level_VariableModifications_ShowMessage ? (
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
                        { this._psms_NOT_PutOnChart_ShowMessage || this._psms_Contain_PSM_Level_VariableModifications_ShowMessage ? (
                            <div>
                                { this._psms_NOT_PutOnChart_ShowMessage ? (
                                    <>
                                        <div>
                                            <span>
                                                Warning: Found
                                            </span>
                                            <span> </span>
                                            <span>
                                                { this._psms_NOT_PutOnChart_Count }
                                            </span>
                                            <span> </span>
                                            <span>
                                                PSMs that were not within +/-
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

                                { this._psms_Contain_PSM_Level_VariableModifications_ShowMessage ? (
                                    <>
                                        <div style={ { marginTop: 10 } }>
                                            WARNING: Variable modification is rounded and
                                        </div>
                                        <div>
                                            chromatogram may not be accurate.
                                        </div>
                                    </>
                                ) : null }

                                <div style={ { marginTop: 10 } }>
                                    <button
                                        onClick={ event => {
                                            this._psms_NOT_PutOnChart_ShowMessage = false
                                            this._psms_Contain_PSM_Level_VariableModifications_ShowMessage = false
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

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Apply no smoothing
                            </span>
                        }
                    />

                </label>
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

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Apply the LOWESS (locally weighted least squares) smoother. Performs better with wider peaks.
                            </span>
                        }
                    />

                </label>
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

                    <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                        title={
                            <span>
                                Apply the Savitzky–Golay filter to smooth the data, a popular method for signal smoothing in analytical chemistry.
                            </span>
                        }
                    />

                </label>
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
    retentionTimeSeconds_Range_ForChart_Min: number
    retentionTimeSeconds_Range_ForChart_Max: number
}

type Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback =
    (params: Internal__RetentionTime_Min_Max_UserEditable_Component_UpdatedValues_Callback_Params) => void


/**
 *
 */
interface Internal__RetentionTime_Min_Max_UserEditable_Component_Props {

    force_SetTo_ValueFromParent: object  // On object reference change, the input values will be set to the values from Parent

    retentionTimeSeconds_Range_ForChart_Min__ValueFromParent: number
    retentionTimeSeconds_Range_ForChart_Max__ValueFromParent: number

    retentionTimeSeconds_Range_ForChart_Min__DefaultValue: number
    retentionTimeSeconds_Range_ForChart_Max__DefaultValue: number

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

    private readonly _NUMBER_NOT_ASSIGNED = undefined

    private _retentionTimeMinutes_Range_ForChart_Min__Current__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current__Number: number

    private _retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString: string
    private _retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString: string

    private _retentionTimeMinutes_Range_ForChart_Min__Current_InSeconds__Number: number
    private _retentionTimeMinutes_Range_ForChart_Max__Current_InSeconds__Number: number


    private _retentionTimeMinutes_Range_ForChart_Min__PrevValue: number
    private _retentionTimeMinutes_Range_ForChart_Max__PrevValue: number


    private _updateButton_Enabled = true

    /**
     *
     */
    constructor( props: Internal__RetentionTime_Min_Max_UserEditable_Component_Props ) {
        super( props );

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

        if ( this._retentionTimeMinutes_Range_ForChart_Min__Current_InSeconds__Number === props.retentionTimeSeconds_Range_ForChart_Min__ValueFromParent
            && this._retentionTimeMinutes_Range_ForChart_Max__Current_InSeconds__Number === props.retentionTimeSeconds_Range_ForChart_Max__ValueFromParent ) {

            //  Already have current values

            return // EARLY RETURN
        }

        this._retentionTimeMinutes_Range_ForChart_Min__Current_InSeconds__Number = props.retentionTimeSeconds_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current_InSeconds__Number = props.retentionTimeSeconds_Range_ForChart_Max__ValueFromParent


        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this._compute_RT_Minutes_FromSeconds_ForDataFromUpstream( props.retentionTimeSeconds_Range_ForChart_Min__ValueFromParent, INTERNAL__MATH_FLOOR_CEIL.FLOOR )
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this._compute_RT_Minutes_FromSeconds_ForDataFromUpstream( props.retentionTimeSeconds_Range_ForChart_Max__ValueFromParent, INTERNAL__MATH_FLOOR_CEIL.CEIL )

        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number.toString()
        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number.toString()

        this._retentionTimeMinutes_Range_ForChart_Min__PrevValue = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number
        this._retentionTimeMinutes_Range_ForChart_Max__PrevValue = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number

        this._retentionTimeMinutes_Range_ForChart_Min__Current_InSeconds__Number = props.retentionTimeSeconds_Range_ForChart_Min__ValueFromParent
        this._retentionTimeMinutes_Range_ForChart_Max__Current_InSeconds__Number = props.retentionTimeSeconds_Range_ForChart_Max__ValueFromParent


        this._updateButton_Enabled = true
    }

    /**
     *
     */
    private _set_LocalProperties_On_Create_Or_SetTo_Defaults() {

        this._retentionTimeMinutes_Range_ForChart_Min__Current__Number = this._compute_RT_Minutes_FromSeconds_ForDataFromUpstream( this.props.retentionTimeSeconds_Range_ForChart_Min__DefaultValue, INTERNAL__MATH_FLOOR_CEIL.FLOOR )
        this._retentionTimeMinutes_Range_ForChart_Max__Current__Number = this._compute_RT_Minutes_FromSeconds_ForDataFromUpstream( this.props.retentionTimeSeconds_Range_ForChart_Max__DefaultValue, INTERNAL__MATH_FLOOR_CEIL.CEIL )

        this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number.toString()
        this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number.toString()

        this._updateButton_Enabled = true

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     */
    private _compute_RT_Minutes_FromSeconds_ForDataFromUpstream( retentionTimeSeconds: number, math_FloorCeil: INTERNAL__MATH_FLOOR_CEIL ) {

        const retentionTimeMinutes = ( retentionTimeSeconds / 60 )

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
    private _updateButton_Clicked() {
        try {
            if ( ! this._is_AllNumbersValid() ) {
                return // EARLY RETURN
            }

            if ( this._retentionTimeMinutes_Range_ForChart_Min__Current__Number === this._retentionTimeMinutes_Range_ForChart_Min__PrevValue
                && this._retentionTimeMinutes_Range_ForChart_Max__Current__Number === this._retentionTimeMinutes_Range_ForChart_Max__PrevValue ) {

                //  Min/Max NOT changed so no need to update
                return // EARLY RETURN
            }

            this._retentionTimeMinutes_Range_ForChart_Min__PrevValue = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number
            this._retentionTimeMinutes_Range_ForChart_Max__PrevValue = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number

            this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number.toString()
            this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number.toString()

            this._retentionTimeMinutes_Range_ForChart_Min__Current_InSeconds__Number = this._retentionTimeMinutes_Range_ForChart_Min__Current__Number * 60
            this._retentionTimeMinutes_Range_ForChart_Max__Current_InSeconds__Number = this._retentionTimeMinutes_Range_ForChart_Max__Current__Number * 60

            this.setState({ forceRerenderObject: {} })

            window.setTimeout( () => {
                try {
                    this.props.updatedValues_Callback({
                        retentionTimeSeconds_Range_ForChart_Min: this._retentionTimeMinutes_Range_ForChart_Min__Current__Number * 60,
                        retentionTimeSeconds_Range_ForChart_Max: this._retentionTimeMinutes_Range_ForChart_Max__Current__Number * 60
                    })
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            }, 10 )
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        const _INPUT_FIELD_MAX_LENGTH = 15
        const _INPUT_FIELD_WIDTH = 60

        return (
            <div>
                <div style={ { paddingTop: _PADDING_TOP_ABOVE_HELP_SYMBOL } }>
                    <div>
                        <form
                            onSubmit={ event => {
                                event.preventDefault()
                                if ( ! this._updateButton_Enabled ) {
                                    return
                                }
                                this._updateButton_Clicked()
                            }}
                        >
                            <span>Retention time range (minutes):</span>

                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                title={
                                    <span>
                                        A chromatogram will be built for this range of retention times.
                                        By default the range will be the retention time of the earliest PSM (minus 30 seconds) to the retention time of the latest PSM (plus 30 seconds).
                                        When making the retention time range smaller,
                                        the smoothing algorithm will be reapplied to the resulting chromatogram,
                                        which does not occur when zooming in using the chromatogram graphical interface.
                                    </span>
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

                                    this._retentionTimeMinutes_Range_ForChart_Min__Current__DisplayString = valueString

                                    this._set_UpdateButton_Enabled()

                                } }
                            />
                            <span>  End: </span>
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

                                    this._retentionTimeMinutes_Range_ForChart_Max__Current__DisplayString = valueString

                                    this._set_UpdateButton_Enabled()
                                } }
                            />
                            <span> </span>
                            <div style={ { position: "relative", display: "inline-block" } }>
                                <button
                                    disabled={ ! this._updateButton_Enabled }
                                    //  containing form has onSubmit
                                >
                                    Update
                                </button>
                                { ! this._updateButton_Enabled ? (
                                    <div
                                        style={ { position: "absolute", inset: 0 } }
                                        title="Start and End must be populated with decimal numbers"
                                    >
                                    </div>
                                ) : null }
                            </div>
                            <span> </span>
                            <button
                                title="Reset to Defaults"
                                onClick={ event => {
                                    event.preventDefault()   //  Stop containing form onSubmit from running

                                    this._set_LocalProperties_On_Create_Or_SetTo_Defaults()

                                    this._updateButton_Clicked()
                                }}
                            >
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
 *
 */
class Internal__RetentionTimeSeconds_Range_Min_Max {
    readonly retentionTimeSeconds_Range_Min: number
    readonly retentionTimeSeconds_Range_Max: number
}

/**
 *
 */
class Internal__Selection_ReportedPeptide_OpenModMass_Charge {
    arrayIndex: number
    selectElement_ValueString: string
    reportedPeptide_Id: number
    reportedPeptide_String: string
    openModMass_Sum_Rounded: number
    no_openModMass: boolean  //  True for PSMs with NO Open Mod Mass
    charge: number

    no_PSM_hasOpenModMass: boolean  //  NONE of the PSM in the array have Open Mod Mass
    psmCount: number
}

/**
 *
 */
class Internal_DataFromServer_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId {

    readonly data: {
        readonly searchScanFileId: number

        readonly compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root

        readonly retentionTimeSeconds_Range_Min_Max__LoadingDataFor: Internal__RetentionTimeSeconds_Range_Min_Max

        readonly data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root
    }

    constructor(
        {
            data
        } : {
            data: {
                readonly searchScanFileId: number

                readonly compute_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Compute_DataFrom_PSMs_For_Single_SearchScanFileId__Result_Root

                readonly retentionTimeSeconds_Range_Min_Max__LoadingDataFor: Internal__RetentionTimeSeconds_Range_Min_Max

                readonly data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId_Root
            }
        }
    ) {
        this.data = data
    }

    is_Data_FullyLoaded(
        {
            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId, dataFromServer_Scans_NO_For_Single_SearchScanFileId
        } : {
            dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId
            dataFromServer_Scans_NO_For_Single_SearchScanFileId: Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId
        }
    ) : boolean {

        if ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId ) {
            return  false
        }
        if ( ! dataFromServer_Scans_NO_For_Single_SearchScanFileId ) {
            return  false
        }

        for ( const scanNumber of this.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.scanNumberArray ) {

            if ( ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) )
                && ( ! dataFromServer_Scans_NO_For_Single_SearchScanFileId.scanData_Map_Key_ScanNumber.has( scanNumber ) ) ) {
                return  false
            }
        }

        return true
    }

    //  WARNING:  Untested
    // get_ScanNumbersToLoad(
    //     {
    //         dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId
    //     } : {
    //         dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId: Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId
    //     }
    // ) : Array<number> {
    //
    //     const scanNumbers_ToLoad: Array<number> = []
    //
    //     for ( const scanNumber of this.data.data_BasedOnPSMs_Get_MS1_ScanNumbers_Etc_For_Single_SearchScanFileId.psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result.scanNumber_List ) {
    //
    //         if ( ! dataFromServer_ScansWithPeaks_For_Single_SearchScanFileId.scanNumbers_SubmittedRetrievalFor.has( scanNumber ) ) {
    //             scanNumbers_ToLoad.push(scanNumber)
    //         }
    //     }
    //
    //     return scanNumbers_ToLoad
    // }
}


class Internal_DataFromServer_ScansWithPeaks_For_Single_SearchScanFileId {

    readonly searchScanFileId: number
    readonly scanData_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber> = new Map()
}


class Internal_DataFromServer_Scans_NO_Peaks_For_Single_SearchScanFileId {

    readonly searchScanFileId: number
    readonly scanData_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map()
}

enum INTERNAL__MATH_FLOOR_CEIL {
    FLOOR = "FLOOR",
    CEIL = "CEIL"
}

/**
 *
 * @param openModificationMass
 * @private
 */
const _openModMassRounding_For_OpenModMassSelection = function (
    {
        openModificationMass, open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection
    } : {
        openModificationMass: number
        open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection: number
    } ) : number {
    const openModificationMass_Times_places = openModificationMass * open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection
    const openModificationMass_Times_places_rounded = Math.round( openModificationMass_Times_places );
    const openModificationMassRounded = openModificationMass_Times_places_rounded / open_modification_mass_decimal_place_rounding__10_POWER___for_user_selection;
    return openModificationMassRounded;
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
