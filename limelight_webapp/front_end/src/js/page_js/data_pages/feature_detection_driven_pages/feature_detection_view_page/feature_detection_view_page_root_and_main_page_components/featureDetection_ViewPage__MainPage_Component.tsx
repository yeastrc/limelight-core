/**
 * featureDetection_ViewPage__MainPage_Component.tsx
 *
 * MainPage of Scan File Browser -
 *
 */


import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import { featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
import {
    CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries,
    CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder,
    CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { FeatureDetection_ViewPage__Chromatogram_Component_Params } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/chromatogram/featureDetection_ViewPage__Chromatogram_Component";
import { CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import {
    Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches,
    Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params,
    open_Common_Search_Selection_For_ProjectScanFileId_Overlay
} from "page_js/data_pages/common__search_selection__for__project_scan_file_id__component__react/common_Search_Selection_For_ProjectScanFileId_OverlayLayout";
import { SearchDetailsAndOtherFiltersOuterBlock_Layout } from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";
import { ParseURL_Into_PageStateParts } from "page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts";
import { ControllerPath_forCurrentPage_FromDOM } from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId } from "page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId";
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    GetSearchDataLookupParametersFromPage_Result,
} from "page_js/data_pages/data_pages_common/getSearchDataLookupParametersFromPage";
import { SearchDetailsBlockDataMgmtProcessing } from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import { SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param } from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import { ScanFilenameId_On_PSM_Filter_UserSelection_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import { CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component } from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component";
import { FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_GetData_ForDataTable";
import {
    Qc_SingleSearch_FeatureDetection_Statistics_Section,
    Qc_SingleSearch_FeatureDetection_Statistics_Section_ExternallySpecified_FeatureDetection_Entry__PassedInObject
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_FeatureDetection_Statistics_Section";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {
    QcViewPage_CommonData_To_AllComponents_From_MainComponent,
    QcViewPage_DisplayData__Main_Component_Props_Prop
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { PeptidePage_Display_MainContent_Component_Props_Prop } from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import { currentProjectId_ProjectSearchId_Based_DataPages_FromDOM } from "page_js/data_pages/data_pages_common/currentProjectId_ProjectSearchId_Based_DataPages_FromDOM";
import { Qc_compute_Cache_create_GeneratedReportedPeptideListData } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/generatedReportedPeptideList_Compute/qc_compute_Cache_create_GeneratedReportedPeptideListData";
import { QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import { QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    FeatureDetection_ViewPage_RootTableSelection_StateObject
} from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_ViewPage_RootTableSelection_StateObject";
import {
    FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc
} from "page_js/data_pages/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc";
import {
    ScanFileBrowserPage_SingleScan_UserSelections_StateObject
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import {
    ScanFileBrowserPageRoot_CentralStateManagerObjectClass
} from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass";
import { CentralPageStateManager } from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {
    _REFERRER_PATH_STRING,
    _STANDARD_PAGE_STATE_IDENTIFIER
} from "page_js/data_pages/data_pages_common/a_dataPagesCommonConstants";
import {
    CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";

/////////////////////////

/**
 *
 */
export interface FeatureDetection_ViewPage__MainPage_Component_Props_Prop {

    featureDetectionId_Encoded: string
    feature_detection_root__project_scnfl_mapping_tbl_id: number
    project_scan_file_id: number

    searchDataLookupParametersFromPage : GetSearchDataLookupParametersFromPage_Result

    /**
     * Store data from server
     */
    dataPageStateManager_DataFrom_Server: DataPageStateManager

    /**
     * Project Search Ids, their filters and Annotation Type Ids to display that user entered.  The values used for filters for displaying data and how to display the data
     */
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager

    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing

    featureDetection_ViewPage_RootTableSelection_StateObject: FeatureDetection_ViewPage_RootTableSelection_StateObject
}

/**
 *
 */
export interface FeatureDetection_ViewPage__MainPage_Component_Props {

    propsValue : FeatureDetection_ViewPage__MainPage_Component_Props_Prop
}

/**
 *
 */
interface FeatureDetection_ViewPage__MainPage_Component_State {

    showLoadingMessage?: boolean
    force_ReRender?: object
}

/**
 *
 */
export class FeatureDetection_ViewPage__MainPage_Component extends React.Component< FeatureDetection_ViewPage__MainPage_Component_Props, FeatureDetection_ViewPage__MainPage_Component_State > {

    private _callback_updateSelected_Searches_BindThis = this._callback_updateSelected_Searches.bind(this)
    private _callback_RemoveSearches_BindThis = this._callback_RemoveSearches.bind(this)
    private _download_MS2_Collated_Features_ClickHandler_BindThis = this._download_MS2_Collated_Features_ClickHandler.bind(this)

    private _DONOTCALL() {

        const callback_updateSelected_Searches: Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches = this._callback_updateSelected_Searches
    }

    private _featureDetection_PersistentFeature_Entries: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries

    private _featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder
    
    private _featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder: CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

    private _featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder

    private _featureDetection_Page_TopLevelTable_DataTable_RootTableObject: DataTable_RootTableObject

    private _qc_SingleSearch_FeatureDetection_Statistics_Section_ExternallySpecified_FeatureDetection_Entry: Qc_SingleSearch_FeatureDetection_Statistics_Section_ExternallySpecified_FeatureDetection_Entry__PassedInObject

    private _commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT

    private _commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT

    //  Next 3 populated ONLY when have Searches in URL

    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    private _scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject

    //  Main Filtering object
    private _getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    private _qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent

    private _qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent


    private _qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = new QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot()  //  Common across all Plotly Plots


    private _dataLoaded_For_Either_MainTable = false

    /**
     *
     */
    constructor(props : FeatureDetection_ViewPage__MainPage_Component_Props) {
        super(props);
        try {
            this._featureDetection_PersistentFeature_Entries = CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries.getNewInstance()

            this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT = CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.getNewInstance()

            this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT = CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT.getNewInstance()

            if ( props.propsValue.searchDataLookupParametersFromPage ) {

                //   Have a Search

                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.getNewInstance( {
                    projectSearchIds: props.propsValue.searchDataLookupParametersFromPage.projectSearchIds,
                    searchDataLookupParameters_Root: props.propsValue.searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
                    dataPageStateManager: props.propsValue.dataPageStateManager_DataFrom_Server,
                    commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
                    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
                } );
            }

            this.state = {
                showLoadingMessage: true,
                force_ReRender: {}
            };

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._loadData()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _loadData() {
        try {
            const getFeatureDetection_DisplayNameDescription_ProjectScanFileId_Result =
                await
                    this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.get_commonData_LoadedFromServer_FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id().get_CommonData_LoadedFromServer__FeatureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_ReturnPromise( {
                        feature_detection_root__project_scnfl_mapping_tbl__id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id
                    } )
            this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder = getFeatureDetection_DisplayNameDescription_ProjectScanFileId_Result.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

            const get_CommonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_Result =
                await
                    this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.get_commonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id().
                    get_CommonData_LoadedFromServer__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_ReturnPromise({
                        feature_detection_root__project_scnfl_mapping_tbl__id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id
                    })
            this._featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder =
                get_CommonData_LoadedFromServer_SingleSearch__FeatureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder_Result.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder

            const get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnPromise_Result =
                await
                    this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT.get_commonData_LoadedFromServer__ProjectScanFilenames_Data_For_Single_ProjectScanFileId_MainClass().get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnPromise( this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.projectScanFileId )
            const commonData_LoadedFromServer__ProjectScanFilenames_Data_Holder = get_ProjectScanFilenames_DataHolder_For_ProjectScanFileId_ReturnPromise_Result.commonData_LoadedFromServer__ProjectScanFilenames_Data_Holder

            const scanFilenames_Unique_Sorted_Array =
                commonData_LoadedFromServer__ProjectScanFilenames_Data_Holder.get_ProjectScanFilenames_Data_For_ProjectScanFileId( this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.projectScanFileId ).projectScanFilenames_ForScanFile_List

            this._qc_SingleSearch_FeatureDetection_Statistics_Section_ExternallySpecified_FeatureDetection_Entry = {
                feature_detection_root__project_scnfl_mapping_tbl__id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id,
                projectScanFileId: this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.projectScanFileId,

                featureDetection_Description: this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.description,
                featureDetection_DisplayLabel: this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.displayLabel,

                scanFilenames_Unique_Sorted_Array,

                commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT,
                commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: new QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot()
            }

            const get_FeatureDetection_PersistentFeature_EntriesHolder_Result =
                await
                    this._featureDetection_PersistentFeature_Entries.get_FeatureDetection_PersistentFeature_EntriesHolder_ReturnPromise( {
                        feature_detection_root__project_scnfl_mapping_tbl__id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id
                    } )
            this._featureDetection_PersistentFeature_Entries_Holder = get_FeatureDetection_PersistentFeature_EntriesHolder_Result.featureDetection_PersistentFeature_Entries_Holder

            if ( this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root ) {

                //  Have Searches

                const searchScanFileIds_For_ProjectScanFileId: Set<number> = new Set()

                for ( const projectSearchId of this.props.propsValue.dataPageStateManager_DataFrom_Server.get_projectSearchIds() ) {

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId )
                    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                        const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ). projectSearchId: " + projectSearchId
                        console.warn( msg )
                        throw Error( msg )
                    }

                    const scanFile_ProjectScanFileId_SearchScanFileId =
                        await
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

                    const scanFile_ProjectScanFileId_SearchScanFileId__FOR__ProjectScanFileId =
                        scanFile_ProjectScanFileId_SearchScanFileId.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_ProjectScanFileId( this.props.propsValue.project_scan_file_id )
                    if ( ! scanFile_ProjectScanFileId_SearchScanFileId__FOR__ProjectScanFileId ) {
                        const msg = "scanFile_ProjectScanFileId_SearchScanFileId.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_ProjectScanFileId(this.props.propsValue.project_scan_file_id) returned NOTHING for this.props.propsValue.project_scan_file_id: " + this.props.propsValue.project_scan_file_id
                        console.warn( msg )
                        throw Error( msg )
                    }

                    searchScanFileIds_For_ProjectScanFileId.add( scanFile_ProjectScanFileId_SearchScanFileId__FOR__ProjectScanFileId.searchScanFileId )
                }

                //  scanFilenameId_On_PSM_Filter_UserSelection_StateObject Object

                this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject = new ScanFilenameId_On_PSM_Filter_UserSelection_StateObject( {
                    valueChangedCallback: () => {
                    }
                } ) // Dummy callback since never called

                this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject.set__scanFilenameIds_Selected( searchScanFileIds_For_ProjectScanFileId );

                //  Main Filtering object
                this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object = GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance( {
                    projectSearchIds: this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds,
                    dataPage_common_Searches_Flags: this.props.propsValue.dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Flags(),
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                } );

                /////////

                {

                    const peptidePage_Display_MainContent_Component_Props_Prop: PeptidePage_Display_MainContent_Component_Props_Prop = new PeptidePage_Display_MainContent_Component_Props_Prop();


                    const currentProjectId_FromDOM = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM();

                    const qcViewPage_DisplayData__Main_Component_Props_Prop: QcViewPage_DisplayData__Main_Component_Props_Prop = {

                        currentProjectId_FromDOM,
                        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: undefined,
                        qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject: undefined
                    }

                    //  Main Filtering object  Populated in 'this._loadData(...)

                    const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = await this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise( {

                        not_filtered_position_modification_selections: false,
                        proteinSequenceVersionId: undefined,
                        searchSubGroup_Ids_Selected: undefined,
                        proteinSequenceWidget_StateObject: undefined,
                        modificationMass_UserSelections_StateObject: undefined,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: undefined,
                        reporterIonMass_UserSelections_StateObject: undefined,
                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject: undefined,
                        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: undefined,
                        scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: undefined,
                        scan_RetentionTime_MZ_UserSelection_StateObject: undefined,
                        peptideUnique_UserSelection_StateObject: undefined,
                        peptideSequence_UserSelections_StateObject: undefined,
                        peptideSequence_MissedCleavageCount_UserSelections_StateObject: undefined,
                        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: undefined,
                        userSearchString_LocationsOn_ProteinSequence_Root: null,
                        proteinPositionFilter_UserSelections_StateObject: undefined,
                        proteinPosition_Of_Modification_Filter_UserSelections_StateObject: undefined,
                        psm_Charge_Filter_UserSelection_StateObject: undefined,
                        psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                    } );

                    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
                        getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                    const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
                        await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides( {
                            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: undefined, // this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: undefined, // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                            dataPageStateManager: this.props.propsValue.dataPageStateManager_DataFrom_Server,
                            searchSubGroup_Ids_Selected: undefined, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                            projectSearchIds: this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                        } );


                    const qc_compute_Cache_create_GeneratedReportedPeptideListData = new Qc_compute_Cache_create_GeneratedReportedPeptideListData( {
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: undefined,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: undefined,
                        dataPageStateManager: this.props.propsValue.dataPageStateManager_DataFrom_Server,
                        projectSearchIds: this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                    } );

                    this._qcViewPage_CommonData_To_AllComponents_From_MainComponent = {
                        qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback: new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback(),
                        qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput(),
                        projectSearchIds: this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds,
                        currentProjectId_FromDOM: qcViewPage_DisplayData__Main_Component_Props_Prop.currentProjectId_FromDOM,
                        searchSubGroup_Ids_Selected: undefined,
                        propsValue: peptidePage_Display_MainContent_Component_Props_Prop,
                        propsValue_QC: qcViewPage_DisplayData__Main_Component_Props_Prop,
                        commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT,
                        searchDataLookupParamsRoot: this.props.propsValue.searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load,
                        qcPage_Searches_Flags: this.props.propsValue.dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Flags(),
                        qcPage_Searches_Info: this.props.propsValue.dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Info(),
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                        getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        dataPageStateManager: this.props.propsValue.dataPageStateManager_DataFrom_Server,
                        qc_compute_Cache_create_GeneratedReportedPeptideListData,
                        updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback: () => {
                        },
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING: undefined,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: undefined,
                        getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: undefined,
                        qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: this._qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
                    };


                    const commonData = this._qcViewPage_CommonData_To_AllComponents_From_MainComponent;

                    const projectSearchId = commonData.projectSearchIds[ 0 ];

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
                    if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                        const msg = "commonData.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    const qcPage_Flags_SingleSearch_ForProjectSearchId =
                        this._qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
                    if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
                        const msg = "this._qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const qcPage_Searches_Info_SingleSearch_ForProjectSearchId =
                        this._qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId );
                    if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
                        const msg = "this._qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Info.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent = {
                        projectSearchId,
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                        qcPage_Flags_SingleSearch_ForProjectSearchId,
                        qcPage_Searches_Info_SingleSearch_ForProjectSearchId
                    }

                }
            }

            this._dataLoaded_For_Either_MainTable = true

            if ( ! this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.get_rootTableSelection_MS2_Scan() ) {

                //  Top level Table is "Persistent Feature List"

                const persistentFeatureList_TopLevelTable_createTableData_Result =
                this._persistentFeatureList_TopLevelTable_createTableData({
                    featureDetection_PersistentFeature_Entries_Array: this._featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries()
                })

                this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject = persistentFeatureList_TopLevelTable_createTableData_Result.dataTable_RootTableObject;

                this.setState({ force_ReRender: {}, showLoadingMessage: false })

            } else {

                //  Top level Table is "MS 2 Scan List"

                const ms2_Scan_List_TopLevelTable_createTableData_Result =
                    this._ms2_Scan_List_TopLevelTable_createTableData({
                        featureDetection_PersistentFeature_Entries_Array: this._featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries()
                    })

                this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject = ms2_Scan_List_TopLevelTable_createTableData_Result.dataTable_RootTableObject;

                this.setState({ force_ReRender: {}, showLoadingMessage: false })

            }

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     * Create Table Data for Top Level Table:  MS 2 Scan List  (MS2 Scans for Persistent Features)
     */
    private _ms2_Scan_List_TopLevelTable_createTableData(
        {
            featureDetection_PersistentFeature_Entries_Array
        } : {
            featureDetection_PersistentFeature_Entries_Array: Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>
        }
    ) : {
        dataTable_RootTableObject : DataTable_RootTableObject
    } {
        try {
            /////////////

            //  Create Table Columns (Header info and Data Info)

            const dataTable_Columns : Array<DataTable_Column> = [];
            const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

            { // Vew Scan

                const dataTable_Column = new DataTable_Column({
                    id : "viewScan", // Used for tracking sort order. Keep short
                    displayName : "",
                    width : 70,
                    sortable : false,
                    hideColumnHeader : true
                });
                dataTable_Columns.push( dataTable_Column );
            }

            {  //  MS 2 Scan Number

                const displayName = "MS 2 Scan Number";

                const dataTable_Column = new DataTable_Column({
                    id : "scannum", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  //

                const displayName = "Persistent Feature Count for Scan Number";

                const dataTable_Column = new DataTable_Column({
                    id : "pfcount", // Used for tracking sort order. Keep short
                    displayName,
                    width : 400,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            //  Create Table Body

            const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

            {
                //  Put PersistentFeature_Entries in Array map key MS_2_ScanNumber
                const featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber: Map<number, {
                    featureDetection_PersistentFeature_Entry_Array: Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>
                    ms_2_scanNumber: number
                }> = new Map()

                for ( const featureDetection_PersistentFeature_Entry of featureDetection_PersistentFeature_Entries_Array ) {

                    for ( const ms_2_scanNumber of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                        let featureDetection_PersistentFeature_Entries_Array_For_Key_MS_2_ScanNumber = featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber.get( ms_2_scanNumber )

                        if ( ! featureDetection_PersistentFeature_Entries_Array_For_Key_MS_2_ScanNumber ) {
                            featureDetection_PersistentFeature_Entries_Array_For_Key_MS_2_ScanNumber = { ms_2_scanNumber, featureDetection_PersistentFeature_Entry_Array: [] }
                            featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber.set( ms_2_scanNumber, featureDetection_PersistentFeature_Entries_Array_For_Key_MS_2_ScanNumber )
                        }
                        featureDetection_PersistentFeature_Entries_Array_For_Key_MS_2_ScanNumber.featureDetection_PersistentFeature_Entry_Array.push( featureDetection_PersistentFeature_Entry )
                    }
                }

                const featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber__Values_SortedOn__MS_2_ScanNumber = Array.from( featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber.values() )
                featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber__Values_SortedOn__MS_2_ScanNumber.sort( (a,b) => {
                    if ( a.ms_2_scanNumber < b.ms_2_scanNumber ) {
                        return -1
                    } else if ( a.ms_2_scanNumber > b.ms_2_scanNumber ) {
                        return 1
                    }
                    return 0
                })

                let listCounter = 0;

                for ( const featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber of featureDetection_PersistentFeature_Entries_Array_Map_Key_MS_2_ScanNumber__Values_SortedOn__MS_2_ScanNumber ) {

                    listCounter++


                    const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];
                    const dataColumns_tableDownload: Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                    { //  Open Scan Number Fake Link

                        const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                            ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                                return (
                                    <span className="table-data-cell-property-value fake-link"
                                          onClick={ event => {
                                              event.preventDefault()
                                              event.stopPropagation()

                                              if ( limelight__IsTextSelected() ) {
                                                  return
                                              }

                                              const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result =
                                                  scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc({
                                                      projectScanFileId: this._featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.get_projectScanFileId(),
                                                      scanFile_Code_FirstSix: this._featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.get_scanFile_Code_FirstSix()
                                                  })

                                              const scanFileBrowserPage_SingleScan_UserSelections_StateObject = new ScanFileBrowserPage_SingleScan_UserSelections_StateObject({ valueChangedCallback: undefined })
                                              scanFileBrowserPage_SingleScan_UserSelections_StateObject.setScanNumber_Selected( featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.ms_2_scanNumber )

                                              //  Sample code from Singular Feature
                                              // {
                                              //     scanFileBrowserPage_SingleScan_UserSelections_StateObject.set_featureDetection_IndividualFeature_OR_PSM__Root({
                                              //         baseIsotopePeak__Containing_M_Over_Z: featureDetection_SingularFeature_Entry.base_isotope_peak,
                                              //         charge: featureDetection_SingularFeature_Entry.charge,
                                              //         monoisotopicMass: featureDetection_SingularFeature_Entry.monoisotopic_mass
                                              //     })
                                              // }

                                              const singleSingleScanData = scanFileBrowserPage_SingleScan_UserSelections_StateObject.getEncodedStateData()

                                              const scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow = new ScanFileBrowserPageRoot_CentralStateManagerObjectClass({ centralPageStateManager: undefined, no_centralPageStateManager: true })
                                              scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow.set_SingleScanDataEncodedStateData({ singleSingleScanData })


                                              const centralPageStateManager = new CentralPageStateManager()

                                              const stateAsJSON_Compressed = centralPageStateManager.get_CurrentState_AsStringForUrl({ componentOverridesAdditions: [ scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow ]})

                                              let newWindowURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                                                  pageControllerPath: scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.basePathURL,
                                                  experimentId: undefined,
                                                  featureDetectionId_Encoded: undefined,
                                                  projectScanFileId_Encoded: scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.codeForProjectScanFileId,
                                                  searchDataLookupParamsCode: undefined,
                                                  pageStateIdentifier: _STANDARD_PAGE_STATE_IDENTIFIER,
                                                  pageStateString: stateAsJSON_Compressed,
                                                  referrer: _REFERRER_PATH_STRING
                                              });

                                              const newWindow = window.open( newWindowURL, "_blank", "noopener" );
                                          } }
                                    >
                                        View Scan
                                    </span>
                                )
                            }

                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                            //  NO Data for searchTableData
                        })
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.ms_2_scanNumber.toString();
                        const searchEntriesForColumn: Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry( {
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.ms_2_scanNumber
                        } );
                        dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay } )
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.featureDetection_PersistentFeature_Entry_Array.length.toString();
                        const searchEntriesForColumn: Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry( {
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.featureDetection_PersistentFeature_Entry_Array.length
                        } );
                        dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay } )
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }


                    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable( { dataColumns_tableDownload } );

                    const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                        ( params: DataTable_DataRowEntry__GetChildTableData_CallbackParams ): DataTable_RootTableObject => {

                            const persistentFeatureList_TopLevelTable_createTableData_Result = this._persistentFeatureList_TopLevelTable_createTableData({
                                featureDetection_PersistentFeature_Entries_Array: featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.featureDetection_PersistentFeature_Entry_Array
                            })
                            return persistentFeatureList_TopLevelTable_createTableData_Result.dataTable_RootTableObject
                        }

                    const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                        uniqueId: featureDetection_PersistentFeature_Entry_Array_For_MS_2_ScanNumber.ms_2_scanNumber,
                        sortOrder_OnEquals: listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                        columnEntries: dataTable_DataRow_ColumnEntries,
                        dataTable_DataRowEntry_DownloadTable,

                        dataRow_GetChildTableData_Return_DataTable_RootTableObject
                    } );

                    dataTable_DataRowEntries.push( dataTable_DataRowEntry );
                }
            }

            const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
                columns : dataTable_Columns,
                columns_tableDownload: dataTable_Column_DownloadTable_Entries,
                dataTable_DataRowEntries
            });

            const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

            const dataTable_RootTableObject = new DataTable_RootTableObject({
                dataTableId : "MS2 Scan Numbers for Feature Detection Persistent Features",
                tableOptions,
                tableDataObject : dataTable_RootTableDataObject
            });

            return {
                dataTable_RootTableObject
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Create Table Data for Top Level Table:  Persistent Feature List  (Persistent Features)
     */
    private _persistentFeatureList_TopLevelTable_createTableData(
        {
            featureDetection_PersistentFeature_Entries_Array
        } : {
            featureDetection_PersistentFeature_Entries_Array: Array<CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entry>
        }
    ) : {
        dataTable_RootTableObject : DataTable_RootTableObject
    } {
        try {
            /////////////

            //  Create Table Columns (Header info and Data Info)

            const dataTable_Columns : Array<DataTable_Column> = [];
            const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

            {  //  id

                const displayName = "Feature Id";

                const dataTable_Column = new DataTable_Column({
                    id : "id", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  //

                const displayName = "Charge";

                const dataTable_Column = new DataTable_Column({
                    id : "charge", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  //

                const displayName = "Monoisotopic Mass";

                const dataTable_Column = new DataTable_Column({
                    id : "monoisotopicMass", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  //

                const displayName = "Retention Time Range (Start)";

                const dataTable_Column = new DataTable_Column({
                    id : "retentionTimeRange_Start", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {  //

                const displayName = "Retention Time Range (End)";

                const dataTable_Column = new DataTable_Column({
                    id : "retentionTimeRange_End", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            {  //

                const displayName = "Retention Time Range (Apex)";

                const dataTable_Column = new DataTable_Column({
                    id : "retentionTimeRange_Apex", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }



            {  //

                const displayName = "Abundance (Retention Time Range Apex)";

                const dataTable_Column = new DataTable_Column({
                    id : "abundance_RetentionTimeRange_Apex", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            {  //

                const displayName = "Abundance (Total)";

                const dataTable_Column = new DataTable_Column({
                    id : "abundance_Total", // Used for tracking sort order. Keep short
                    displayName,
                    width : 200,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            //  Create Table Body

            const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

            {
                const featureDetection_PersistentFeature_Entries = Array.from( featureDetection_PersistentFeature_Entries_Array )

                featureDetection_PersistentFeature_Entries.sort( (a,b) => {
                    //  Sort abundance_Total descending then id_PersistentFeature_Entry ascending
                    if ( a.abundance_Total > b.abundance_Total ) {
                        return -1
                    }
                    if ( a.abundance_Total < b.abundance_Total ) {
                        return 1
                    }
                    if ( a.id_PersistentFeature_Entry < b.id_PersistentFeature_Entry ) {
                        return -1
                    }
                    if ( a.id_PersistentFeature_Entry > b.id_PersistentFeature_Entry ) {
                        return 1
                    }
                    return 0
                })

                let listCounter = 0;

                for ( const featureDetection_PersistentFeature_Entry of featureDetection_PersistentFeature_Entries ) {

                    listCounter++


                    const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];
                    const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.charge.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.charge
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.monoisotopicMass.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.monoisotopicMass
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.retentionTimeRange_Start.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.retentionTimeRange_Start
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.retentionTimeRange_End.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.retentionTimeRange_End
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.retentionTimeRange_Apex.toString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.retentionTimeRange_Apex
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.abundance_RetentionTimeRange_Apex.toPrecision( 3 );
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.abundance_RetentionTimeRange_Apex
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    {
                        const valueDisplay = featureDetection_PersistentFeature_Entry.abundance_Total.toPrecision( 3 );
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: featureDetection_PersistentFeature_Entry.abundance_Total
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                    const featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter = {
                        feature_detection_root__project_scnfl_mapping_tbl_Id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id,
                        featureDetection_PersistentFeature_Entry,
                        commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT,
                        commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT
                    }

                    let projectSearchIds: Array<number> = undefined

                    if ( this.props.propsValue.searchDataLookupParametersFromPage ) {
                        projectSearchIds = this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds
                    }

                    let searchDataLookupParamsRoot: SearchDataLookupParameters_Root = undefined

                    if ( this.props.propsValue.searchDataLookupParametersFromPage ) {
                        searchDataLookupParamsRoot = this.props.propsValue.searchDataLookupParametersFromPage.search_data_lookup_parameters_at_page_load
                    }

                    const featureDetection_ViewPage__Chromatogram_Component_Params: FeatureDetection_ViewPage__Chromatogram_Component_Params = {
                        feature_detection_root__project_scnfl_mapping_tbl__id: this.props.propsValue.feature_detection_root__project_scnfl_mapping_tbl_id,
                        projectScanFileId: this.props.propsValue.project_scan_file_id,
                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this._scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                        commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this._commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT,
                        commonData_LoadedFromServer_From_ProjectScanFileId___ROOT: this._commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
                        //  When have Searches
                        projectSearchIds,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                        getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this._getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                        searchDataLookupParamsRoot,
                        dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager_DataFrom_Server
                    }

                    const dataRow_Get_RowChildContent_Return_Promise_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent =
                        ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> => {

                            return featureDetection_ViewPage__PersistentFeature_DataTable_ExpandChild_ReactComponent__ReturnsComponent({
                                params_DataTableCallback: params,
                                featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Parameter,
                                featureDetection_ViewPage__Chromatogram_Component_Params
                            })
                        }

                    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId: featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry,
                        sortOrder_OnEquals: listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                        columnEntries: dataTable_DataRow_ColumnEntries,
                        dataTable_DataRowEntry_DownloadTable,

                        dataRow_Get_RowChildContent_Return_Promise_ChildContent,
                    });

                    dataTable_DataRowEntries.push( dataTable_DataRowEntry );
                }

            }

            const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
                columns : dataTable_Columns,
                columns_tableDownload: dataTable_Column_DownloadTable_Entries,
                dataTable_DataRowEntries
            });

            const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

            const dataTable_RootTableObject = new DataTable_RootTableObject({
                dataTableId : "Feature Detection Persistent Features",
                tableOptions,
                tableDataObject : dataTable_RootTableDataObject
            });

            return {
                dataTable_RootTableObject
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    ////////////////////////////////////////

    /**
     *
     */
    private _callback_updateSelected_Searches( params: Common_Search_Selection_For_ProjectScanFileId_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) {
        try {
            const updated_selected_ProjectSearchIds__Object = params.updated_selected_ProjectSearchIds__Object;

            if ( ! updated_selected_ProjectSearchIds__Object ) {

                //  NO Changes so EXIT after closing Overlay

                return; // EARLY RETURN
            }

            let projectSearchIds_CreateDefault: ReadonlyArray<number>
            if ( updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder().length > 0 ) {
                projectSearchIds_CreateDefault = updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder()
            }

            const promise = new Promise((resolve,reject) => {
                try {
                    const requestObj = {
                        projectSearchIds_CreateDefault,
                        searchDataLookupParamsRoot: undefined,
                        sjklwuiowerzUIryhnIOWzq : true
                    };

                    const url = "d/rws/for-page/psb/get-search-data-lookup-params-code";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => {
                        reject()
                    }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }) => {
                        try {
                            console.warn( "responseData.searchDataLookupParamsCode: ", responseData.searchDataLookupParamsCode )
                            console.warn( "responseData.searchDataLookupParamsRoot: ", responseData.searchDataLookupParamsRoot )

                            const searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
                            const searchDataLookupParamsRoot = responseData.searchDataLookupParamsRoot;

                            if ( ! searchDataLookupParamsCode ) {
                                const msg = "SearchDetailsAndFilterBlock_ChangeSearches.changeSearches(): No value for responseData.searchDataLookupParamsCode";
                                console.warn( msg );
                                reject( msg );
                            }

                            if ( ! searchDataLookupParamsRoot ) {
                                const msg = "SearchDetailsAndFilterBlock_ChangeSearches.changeSearches(): No value for responseData.searchDataLookupParamsRoot";
                                console.warn( msg );
                                reject( msg );
                            }

                            if ( ! limelight__IsVariableAString( searchDataLookupParamsCode ) ) {
                                const msg = "_getSearchDataLookupParamsCode_ForUpdatedFilterCutoffs: searchDataLookupParamsCode is not a string. searchDataLookupParamsCode: " + searchDataLookupParamsCode;
                                console.warn( msg );
                                reject( msg );
                            }

                            resolve({ searchDataLookupParamsCode, searchDataLookupParamsRoot })

                        } catch (e) {
                            reportWebErrorToServer.reportErrorObjectToServer({errorException : e});
                            reject(e);
                            throw e;
                        }
                    });
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise.then( ( { searchDataLookupParamsCode, searchDataLookupParamsRoot } ) => {
                try {
                    const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();

                    // Current URL contents
                    const pageStatePartsFromURL = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

                    let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

                    let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                        pageControllerPath,
                        searchDataLookupParamsCode,
                        pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
                        pageStateString : pageStatePartsFromURL.pageStateString,
                        referrer : pageStatePartsFromURL.referrer,
                        experimentId : undefined,
                        featureDetectionId_Encoded: this.props.propsValue.featureDetectionId_Encoded
                    } );

                    //  TODO  Change to update the URL and then update all JS variables on page for updated list of searches,
                    //          rather than load new page with new URL

                    // Reload page with new URL

                    window.location.href = newURL;

                    //  Remove "Updating" overlay displayed in this method if NO LONGER use window.location.href to change to new page


                    // window.history.replaceState( null, null, newURL );
                    //
                    // navigation_dataPages_Maint_Instance.updateNavLinks();
                    //
                    //  !! MORE steps needed here to load data for added searches (Search names, Annotation Types, ...) !!
                    //
                    // this._dataUpdated_Callback();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    ////////////////////////////////////////

    /**
     *
     */
    private _callback_RemoveSearches() {
        try {
            const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();

            // Current URL contents
            const pageStatePartsFromURL = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

            let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

            let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                pageControllerPath,
                searchDataLookupParamsCode: undefined,  //  undefined since NO Searches
                pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
                pageStateString : pageStatePartsFromURL.pageStateString,
                referrer : pageStatePartsFromURL.referrer,
                experimentId : undefined,
                featureDetectionId_Encoded: this.props.propsValue.featureDetectionId_Encoded
            } );

            //  TODO  Change to update the URL and then update all JS variables on page for updated list of searches,
            //          rather than load new page with new URL

            // Reload page with new URL

            window.location.href = newURL;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    ///////////////

    private _download_MS2_Collated_Features_ClickHandler( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) {
        try {
            window.alert( "clicked")

            const rows_StringArray: Array<string> = []

            {
                const columnTitles_Row_StringArray: Array<string> = []

                columnTitles_Row_StringArray.push("MS2 Scan Number")
                columnTitles_Row_StringArray.push("Feature Id")
                columnTitles_Row_StringArray.push("Charge")
                columnTitles_Row_StringArray.push("Monoisotopic Mass")
                columnTitles_Row_StringArray.push("Retention Time Range (Start)")
                columnTitles_Row_StringArray.push("Retention Time Range (End)")
                columnTitles_Row_StringArray.push("Retention Time Range (Apex)")
                columnTitles_Row_StringArray.push("Abundance (Retention Time Range Apex)")
                columnTitles_Row_StringArray.push("Abundance (Total)")

                const columnTitles_Row_StringDelim = columnTitles_Row_StringArray.join("\t")

                rows_StringArray.push(columnTitles_Row_StringDelim)
            }

            for ( const featureDetection_PersistentFeature_Entry of this._featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries() ) {

                for ( const ms_2_scanNumber of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                    const singleRow_Columns_StringArray: Array<string> = []

                    singleRow_Columns_StringArray.push( ms_2_scanNumber.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.id_PersistentFeature_Entry.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.charge.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.monoisotopicMass.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.retentionTimeRange_Start.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.retentionTimeRange_End.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.retentionTimeRange_Apex.toString() )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.abundance_RetentionTimeRange_Apex.toPrecision( 3 ) )
                    singleRow_Columns_StringArray.push( featureDetection_PersistentFeature_Entry.abundance_Total.toPrecision( 3 ) )


                    const singleRow_Columns_StringDelim = singleRow_Columns_StringArray.join("\t")

                    rows_StringArray.push(singleRow_Columns_StringDelim)
                }
            }

            const stringToDownload = rows_StringArray.join("\n") + "\n"

            StringDownloadUtils.downloadStringAsFile({ stringToDownload : stringToDownload, filename: 'features.txt' });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {
        try {
            if ( this.state.showLoadingMessage || ( ! this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject ) ) {

                return (  //  EARLY RETURN

                    <div>
                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            Loading Data...
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80 } }>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>
                )
            }

            let searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = undefined

            //  ONLY Execute if have Search Data in URL

            if ( this.props.propsValue.searchDetailsBlockDataMgmtProcessing ) {

                const filterValuesChanged_Callback = (params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param) : void => {

                    console.warn("filterValuesChanged_Callback called: params: ", params )

                    // throw Error("filterValuesChanged_Callback callback not handled")

                    limelight__ReloadPage_Function()  // TODO
                }

                searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
                    displayOnly : false,
                    dataPages_LoggedInUser_CommonObjectsFactory : null,
                    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                    dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager_DataFrom_Server,
                    searchDetailsBlockDataMgmtProcessing: this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
                    filterValuesChanged_Callback,
                    callback_Before_ReadURLtoGenerateNewURL_ReOrderSearchesOverlay: null,
                    searchSubGroup_PropValue: null,
                    limelight_Colors_For_MultipleSearches: undefined
                }
            }

            return (
                <div >
                    <h2>
                        <span>{ this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.description }</span>
                        <span> ({ this._featureDetection_DisplayNameDescription_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.displayLabel })</span>
                    </h2>

                    { searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue ? (

                        <div style={ { marginBottom: 20 } }>

                            <SearchDetailsAndOtherFiltersOuterBlock_Layout
                                projectSearchIds={ this.props.propsValue.searchDataLookupParametersFromPage.projectSearchIds }
                            >
                                <SearchDetailsAndFilterBlock_MainPage_Root
                                    propValue={ searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                    select_ONLY_ONE_Search={ true }
                                    changeSearches_Clicked_Override_Callback={ () => {  try {

                                        let projectSearchIds_Previously_Selected : Array<number> = undefined //  Existing selection.  Array to preserve the existing selection order
                                        if ( this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay ) {
                                            projectSearchIds_Previously_Selected = this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()
                                        }

                                        open_Common_Search_Selection_For_ProjectScanFileId_Overlay({
                                            projectScanFileId: this.props.propsValue.project_scan_file_id,
                                            projectSearchIds_Previously_Selected,
                                            callbackOn_Cancel_Close_Clicked: () => {
                                                // const msg = "callback from callbackOn_Cancel_Close_Clicked.  NOT HANDLED. written to log"
                                                // console.warn(msg)
                                                // window.alert(msg)
                                            },
                                            callback_updateSelected_Searches: this._callback_updateSelected_Searches_BindThis
                                        })

                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                                    } }
                                    removeSearchesClickedCallback={ this._callback_RemoveSearches_BindThis }
                                    searchSubGroup_CentralStateManagerObjectClass={ null }
                                    searchSubGroup_SelectionsChanged_Callback={ null }
                                    searchSubGroup_ManageGroupNames_Clicked_Callback={ () => { window.alert("searchSubGroup_ManageGroupNames_Clicked_Callback called"); throw Error("callback not handled")} }
                                />
                            </SearchDetailsAndOtherFiltersOuterBlock_Layout>
                        </div>

                    ) : (  //  Add Search

                        <div
                            style={ { display: "inline-block", padding: 5, marginTop: 5, marginBottom: 5, borderWidth: 2, borderStyle: "dashed" }}
                            onClick={ event => { try {

                                event.stopPropagation()

                                if ( limelight__IsTextSelected() ) {
                                    //  Text is selected so exit
                                    return // EARLY RETURN
                                }

                                let projectSearchIds_Previously_Selected : Array<number> = undefined //  Existing selection.  Array to preserve the existing selection order
                                if ( this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay ) {
                                    projectSearchIds_Previously_Selected = this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()
                                }

                                open_Common_Search_Selection_For_ProjectScanFileId_Overlay({
                                    projectScanFileId: this.props.propsValue.project_scan_file_id,
                                    projectSearchIds_Previously_Selected,
                                    callbackOn_Cancel_Close_Clicked: () => {
                                        // const msg = "callback from callbackOn_Cancel_Close_Clicked.  NOT HANDLED. written to log"
                                        // console.warn(msg)
                                        // window.alert(msg)
                                    },
                                    callback_updateSelected_Searches: this._callback_updateSelected_Searches_BindThis
                                })

                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                            }}
                        >
                            <span
                                className=" clickable " // " fake-link "
                                style={ { fontSize: 18,fontWeight: 700 } }
                            >
                                Add Search
                            </span>
                        </div>
                    ) }

                    <div className="  filter-common-block-selection-container-block yes-section-labels  ">

                        {/* Filter On ... */}

                        <FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>   {/*  Show/Hide the filters */ }

                            {/*Insert a blank line*/}
                            <div  style={ { gridColumn: "1/-1" } }>&nbsp;
                            </div>

                            <div className=" filter-common-filter-label " style={ { fontWeight: "bold" } }>
                                Collate by MS 2 Scan:

                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                    title={
                                        <span>
                                            Organize predicted features by the MS2 scans that resulted from their fragmentation.
                                        </span>
                                    }
                                />
                            </div>
                            <div className=" filter-common-selection-block ">
                                <input
                                    type="checkbox"
                                    checked={ this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.get_rootTableSelection_MS2_Scan() }
                                    onChange={ event => {
                                        this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.set_rootTableSelection_MS2_Scan( ! this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.get_rootTableSelection_MS2_Scan() )
                                        this.setState( { force_ReRender: {} } )

                                        if ( ! this._dataLoaded_For_Either_MainTable ) {

                                            //  Main table data NOT loaded yet so return

                                            return // EARLY RETURN
                                        }

                                        window.setTimeout( () => {
                                            try {
                                                if ( ! this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.get_rootTableSelection_MS2_Scan() ) {

                                                    //  Top level Table is "Persistent Feature List"

                                                    const persistentFeatureList_TopLevelTable_createTableData_Result =
                                                        this._persistentFeatureList_TopLevelTable_createTableData( {
                                                            featureDetection_PersistentFeature_Entries_Array: this._featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries()
                                                        } )

                                                    this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject = persistentFeatureList_TopLevelTable_createTableData_Result.dataTable_RootTableObject;

                                                    this.setState( { force_ReRender: {}, showLoadingMessage: false } )

                                                } else {

                                                    //  Top level Table is "MS 2 Scan List"

                                                    const ms2_Scan_List_TopLevelTable_createTableData_Result =
                                                        this._ms2_Scan_List_TopLevelTable_createTableData( {
                                                            featureDetection_PersistentFeature_Entries_Array: this._featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries()
                                                        } )

                                                    this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject = ms2_Scan_List_TopLevelTable_createTableData_Result.dataTable_RootTableObject;

                                                    this.setState( { force_ReRender: {}, showLoadingMessage: false } )

                                                }
                                            } catch ( e ) {
                                                reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                                throw e
                                            }
                                        } )
                                    } }
                                />
                            </div>

                            {/*Insert a blank line*/}
                            <div  style={ { gridColumn: "1/-1" } }>&nbsp;
                            </div>

                        </FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>

                    </div>


                    {/*  Feature Detection Charts from QC Page Single Search  */ }

                    { (
                        ( this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root && this._qcViewPage_CommonData_To_AllComponents_From_MainComponent )
                            || ( ! this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root ) ) ? (
                        <div>
                            <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 10 } }>
                                Feature Detection Statistics
                            </div>

                            <Qc_SingleSearch_FeatureDetection_Statistics_Section

                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this._qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this._qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                externallySpecified_FeatureDetection_Entry={ this._qc_SingleSearch_FeatureDetection_Statistics_Section_ExternallySpecified_FeatureDetection_Entry }
                            />
                        </div>
                    ) : null }

                    <div style={ { marginTop: 10, marginBottom: 10 } }>

                        <div>
                            {/*  Display Label above table based on root table contents  */}
                            <span style={ { fontSize: 18, fontWeight: "bold" } }>
                                { this.props.propsValue.featureDetection_ViewPage_RootTableSelection_StateObject.get_rootTableSelection_MS2_Scan() ? (
                                    <span>
                                        MS2 Scans with Predicted Features
                                    </span>
                                ) : (
                                    <span>
                                        Persistent Feature List
                                    </span>
                                ) }
                            </span>
                            <span> </span>
                            <span
                                className=" fake-link "
                                style={ { marginLeft: 20 } }
                                onClick={ this._download_MS2_Collated_Features_ClickHandler_BindThis }
                            >
                                Download MS2-Collated Features
                            </span>
                        </div>

                    </div>

                    <div>
                        <DataTable_TableRoot
                            tableObject={ this._featureDetection_Page_TopLevelTable_DataTable_RootTableObject }
                        />
                    </div>

                </div>
            );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

}
