/**
 * proteinViewPage_DisplayData_MultipleSearches__Main_Component.tsx
 *
 * Protein Page Main Content:
 *
 * Main Content of Protein Page
 *
 */



import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {SingleProtein_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    SearchDataLookupParameters_Root,
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import React from "react";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    ProteinPage_Display_MultipleSearches_SingleProtein,
    ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein";
import {
    ProteinPage_ProteinGroupingFilterSelection_Component_Root,
    ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload} from "page_js/data_pages/data_table_react/dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";
import {ProteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/js/proteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions";
import {
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler,
    ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params,
    renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/js/proteinViewPage_DisplayData_MultipleSearches_Create_ProteinList_DataTable_RootTableDataObject";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {
    CountsFor_proteinSequenceVersionIdEntry_MultipleSearches,
    ProteinDisplayData_From_createProteinDisplayData_MultipleSearches,
    ProteinNameDescriptionCacheEntry_MultipleSearches,
    proteinViewPage_DisplayData_MultipleSearches_CreateProteinDisplayData
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/js/proteinViewPage_DisplayData_MultipleSearches_CreateProteinDisplayData";
import {
    ProteinPageSearchesSummarySectionData_Component,
    ProteinPageSearchesSummarySectionData_Component_Props,
    ProteinPageSearchesSummarySectionData_PerSearchEntry,
    ProteinPageSearchesSummarySectionData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/jsx/proteinPageSearchesSummarySection";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

/**
 *
 */
export class ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props_Prop {

    projectSearchIds : Array<number>
    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    centralPageStateManager: CentralPageStateManager

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass

    singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 *
 */
export interface ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props {

    propsValue : ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props_Prop
}

/**
 *  Counts displayed on the page
 */
interface ProteinList_DataCounts {

    proteinCount: number
    proteinGroupCount: number

    //  Not currently displayed
    // peptideCount: number
    // psmCount: number
}

/**
 *
 */
interface ProteinViewPage_DisplayData_MultipleSearches__Main_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    show_InitialLoadingData_Message? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds?: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>; // : Map;
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue?: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue

    proteinPageSearchesSummarySectionData_Root?: ProteinPageSearchesSummarySectionData_Root
    show_proteinPageSearchesSummarySectionData_Root?: boolean


    tableObject_CurrentlyRendered_ProteinList? : DataTable_RootTableObject
    proteinList_DataCounts? : ProteinList_DataCounts

    show_UpdatingProteinList_Message?: boolean

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    //

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue
}

/**
 *
 */
export class ProteinViewPage_DisplayData_MultipleSearches__Main_Component extends React.Component< ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props, ProteinViewPage_DisplayData_MultipleSearches__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
    private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

    private _downloadProteinsClickHandler_BindThis = this._downloadProteinsClickHandler.bind(this);
    private _downloadPSMsClickHandler_BindThis = this._downloadPSMsClickHandler.bind(this);
    private _show_proteinPageSearchesSummarySectionData_ClickHandler_BindThis = this._show_proteinPageSearchesSummarySectionData_ClickHandler.bind(this);

    private _DO_NOT_CALL_CastTestOnly () {
        //  Test function cast
        const proteinGroup_SelectionValues_Changed_Callback : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback = this._proteinGroup_SelectionValues_Changed_Callback;
        const singleProteinRowClickHandler:ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler = this._singleProteinRowClickHandler;
    }

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry_MultipleSearches> = new Map();

    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_MultipleSearches>> = new Map();

    //   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
    private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry_MultipleSearches> = new Map();
             peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry_MultipleSearches>

    private _proteinViewPage_Display_MultipleSearches_SingleProtein: ProteinPage_Display_MultipleSearches_SingleProtein;

    private _data_LoadedFor_ComputedReportedPeptides_AllProteins: boolean = false;

    /**
     *
     */
    constructor(props: ProteinViewPage_DisplayData_MultipleSearches__Main_Component_Props) {
        super(props);

        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            ProteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
                propsValue : props.propsValue
            });

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = {
            show_InitialLoadingData_Message: true,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: new Map(), //  Will be replaced later
            loadedDataCommonHolder,
            saveView_Component_React,
            saveView_Component_Props_Prop
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._runOnPageLoad();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        if (this.props.propsValue.singleProtein_CentralStateManagerObject) {
            //  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

            const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

            if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
                //  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

                //  Hide Main Div inside of header/footer
                const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
                if (!data_page_overall_enclosing_block_divDOM) {
                    const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                    console.warn(msg);
                    throw Error(msg);
                }
                data_page_overall_enclosing_block_divDOM.style.display = "none";

                if (!this._proteinViewPage_Display_MultipleSearches_SingleProtein) {
                    this._instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({currentWindowScrollY: undefined});
                }
                this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay_OnlyLoadingMessage();
            }
        }

        this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });
    }

    /**
     * Called when the user updates the Protein Group selection and the page needs to be re-rendered
     *
     * Also called by searchSubGroup_SelectionsChanged_Callback passing in param: {}
     */
    _proteinGroup_SelectionValues_Changed_Callback( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) {

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

        this.setState({ proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue });

        window.setTimeout( () => {
            try {
                this._re_renderPage();
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();

        const projectSearchIds = this.props.propsValue.projectSearchIds;

        const getDataFromServer_AllPromises = [];

        for (const projectSearchId of projectSearchIds) {

            const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);


            let searchDataLookupParams_For_Single_ProjectSearchId = this.props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId({
                projectSearchId,
                dataPageStateManager: undefined
            });

            if (!searchDataLookupParams_For_Single_ProjectSearchId) {
                const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
                console.log(msg);
                throw Error(msg);
            }

            const promise_getDataFromServer = loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder({
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId,
                loadedDataPerProjectSearchIdHolder,
                load_searchSubGroupsData : false
                //  load_searchSubGroupsData : false since for now not processing subgroup data
            });

            getDataFromServer_AllPromises.push(promise_getDataFromServer);
        }

        const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);

        promise_getDataFromServer_AllPromises.catch((reason) => {
        });

        promise_getDataFromServer_AllPromises.catch( (reason) => {} );
        promise_getDataFromServer_AllPromises.then( (value) => {
            try {
                this.setState({ loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

                //  Delay To allow SetState to run
                window.setTimeout(() => {
                    try {
                        this._recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }, 20);

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage() : void {

        const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

        if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {

            //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay

            this._singleProteinRowShowSingleProteinOverlay({
                proteinSequenceVersionId: proteinSequenceVersionId_FromURL
            });

            //  Delay render List since currently hidden.  Probably could skip render until close Single Protein Overlay
            window.setTimeout(() => {
                try {
                    this._re_renderPage();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 2000);

        } else {

            //  render List immediately

            this._re_renderPage();
        }
    }

    private _re_renderPage() {

        this.setState({ show_UpdatingProteinList_Message: true });

        window.setTimeout(() => {
            try {
                if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping()) {

                    //  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

                    if (this._data_LoadedFor_ComputedReportedPeptides_AllProteins) {

                        //  Data already loaded

                        this._re_renderPage_Actually();

                    } else {

                        //  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

                        const promises_loadDataFor_ComputedReportedPeptides_AllProteins =
                            ProteinViewPage_DisplayData_MultipleSearches__Main_Component_nonClass_Functions.loadDataFor_ComputedReportedPeptides_AllProteins({
                                projectSearchIds : this.props.propsValue.projectSearchIds,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                            })

                        if (promises_loadDataFor_ComputedReportedPeptides_AllProteins.length !== 0) {

                            //  Already cover Protein List with "Updating" message so don't need additional "Loading Data" message

                            const promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises = Promise.all(promises_loadDataFor_ComputedReportedPeptides_AllProteins);

                            promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.catch((reason) => {
                            });

                            promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.then((value) => {
                                try {
                                    // Data Loaded for Computed Reported Peptides

                                    this._data_LoadedFor_ComputedReportedPeptides_AllProteins = true;

                                    this._re_renderPage_Actually();

                                } catch (e) {
                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                    throw e;
                                }
                            });
                        } else {

                            // NO data To Load for Computed Reported Peptides so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

                            this._re_renderPage_Actually();
                        }
                    }
                } else {

                    // Grouping Proteins NOT selected so immediately execute this._re_renderPage_Actually( );

                    this._re_renderPage_Actually();
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 20);
    }

    /**
     *
     */
    private _re_renderPage_Actually() {

                this.setState({ show_UpdatingProteinList_Message: false });

                this.setState({ show_InitialLoadingData_Message: false });

        const projectSearchIds = this.props.propsValue.projectSearchIds;

        //   Clear: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescription_Key_ProteinSequenceVersionId = new Map();

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = new Map();

        //   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
        // this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();

        // this._mainData_LoadedFor_displayProteinListOnPage = true; // Set to true once "Main Data" Loaded for current project search id.

        // const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
        //     dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager
        // } );

        const proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_MultipleSearches = proteinViewPage_DisplayData_MultipleSearches_CreateProteinDisplayData({

            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId: this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId,
            proteinNameDescription_Key_ProteinSequenceVersionId : this._proteinNameDescription_Key_ProteinSequenceVersionId,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass
        });

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

        const proteinList = proteinDisplayData.proteinList;

        //   Create Data Table
        const tableDataObject: DataTable_RootTableDataObject = renderToPageProteinList_MultipleSearches_Create_DataTable_RootTableDataObject({ // External Function
            singleProteinRowClickHandler_Callback : this._singleProteinRowClickHandler_BindThis,
            proteinList,
            proteinGroups_ArrayOf_ProteinGroup: proteinDisplayData.proteinGroups_ArrayOf_ProteinGroup,
            proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId: this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager
        });

        const tableObject_CurrentlyRendered_ProteinList = new DataTable_RootTableObject({ tableDataObject, tableOptions, dataTableId: "Single Search Protein List" });

        let proteinList_DataCounts : ProteinList_DataCounts = null;

        {
            let proteinCount = 0;
            if (proteinDisplayData.proteinList && proteinDisplayData.proteinList.length > 0) {
                proteinCount = proteinDisplayData.proteinList.length;
            }
            let proteinGroupCount: number = null;

            if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
                //  Update Protein Group Count
                if (tableDataObject.dataTable_DataGroupRowEntries === undefined) {
                    throw Error("groupProteinsInDataTable is true and tableObject.dataGroupObjects === undefined");
                }
                proteinGroupCount = tableDataObject.dataTable_DataGroupRowEntries.length
            }

            proteinList_DataCounts = {
                proteinCount,
                proteinGroupCount,
                // peptideCount: proteinDisplayData.,
                // psmCount: proteinDisplayData.
            }
        }
        const proteinPageSearchesSummarySectionData_Root = new ProteinPageSearchesSummarySectionData_Root();

        {
            const searchNames_AsMap = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap()

            proteinPageSearchesSummarySectionData_Root.perSearchEntries = [];

            for (const projectSearchId of this.props.propsValue.projectSearchIds) {

                const searchNameEntry = searchNames_AsMap.get(projectSearchId);
                if (!searchNameEntry) {
                    const msg = "Building ProteinPageSearchesSummarySectionData_Root: searchNames_AsMap.get( projectSearchId ); return nothing. projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                const summarySectionData_PerSearchEntry = new ProteinPageSearchesSummarySectionData_PerSearchEntry()
                summarySectionData_PerSearchEntry.searchId = searchNameEntry.searchId;
                summarySectionData_PerSearchEntry.searchName = searchNameEntry.name;

                const summaryMap_Key_ProjectSearchId = proteinDisplayData.summaryMap_Key_ProjectSearchId;

                const summary_For_ProjectSearchId = summaryMap_Key_ProjectSearchId.get(projectSearchId);

                if (summary_For_ProjectSearchId) {
                    summarySectionData_PerSearchEntry.proteinCount_TotalForSearch = summary_For_ProjectSearchId.proteinCount_TotalForSearch;
                    summarySectionData_PerSearchEntry.reportedPeptideCount_TotalForSearch = summary_For_ProjectSearchId.reportedPeptideCount_TotalForSearch;
                    summarySectionData_PerSearchEntry.psmCount_TotalForSearch = summary_For_ProjectSearchId.psmCount_TotalForSearch;
                } else {
                    console.warn("No value returned from summaryMap_Key_ProjectSearchId.get( projectSearchId ) projectSearchId: " + projectSearchId)
                }

                proteinPageSearchesSummarySectionData_Root.perSearchEntries.push(summarySectionData_PerSearchEntry);
            }
        }

        this.setState({
            tableObject_CurrentlyRendered_ProteinList,
            proteinList_DataCounts,
            proteinPageSearchesSummarySectionData_Root
        });

    }

    /**
     *
     */
    private _downloadProteinsClickHandler() {
        try {
            if ( ! this.state.tableObject_CurrentlyRendered_ProteinList ) {
                console.warn("_downloadProteinList(): No Protein List Table rendered to download");
                return;
            }

            const projectSearchIds = this.props.propsValue.projectSearchIds;

            const proteinDisplayDataAsString =
                dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload({
                    tableDataRootObject: this.state.tableObject_CurrentlyRendered_ProteinList.tableDataObject
                });

            const searchIds : Array<number> = []

            {
                //  For getting search info for projectSearchIds
                const searchNamesMap_KeyProjectSearchId = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap();

                for ( const projectSearchId of projectSearchIds ) {
                    const searchNameObject = searchNamesMap_KeyProjectSearchId.get(projectSearchId);
                    if (!searchNameObject) {
                        throw Error("No searchNameObject for projectSearchId: " + projectSearchId);
                    }
                    const searchId = searchNameObject.searchId;
                    searchIds.push( searchId )
                }
            }

            searchIds.sort( (a, b) => {
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return  1
                }
                return 0
            })

            const filename = 'proteins-search-' + searchIds.join("-") + '.txt';

            StringDownloadUtils.downloadStringAsFile( { stringToDownload : proteinDisplayDataAsString, filename: filename } );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _downloadPSMsClickHandler( ) {
        try {
            const projectSearchIds_InDownloadClickHandler =
                this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

            const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
                this.props.propsValue.searchDetailsBlockDataMgmtProcessing.
                getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

            if ( ! searchDataLookupParamsRoot ) {
                throw Error( "searchDataLookupParamsRoot not found" );
            }

            const projectSearchIdsReportedPeptideIdsPsmIds = [];

            for ( const projectSearchId_InDownloadClickHandler of projectSearchIds_InDownloadClickHandler ) {

                const single_projectSearchId_ReportedPeptideIdsPsmIds = {projectSearchId: projectSearchId_InDownloadClickHandler};

                projectSearchIdsReportedPeptideIdsPsmIds.push(single_projectSearchId_ReportedPeptideIdsPsmIds);
            }

            downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {
                projectSearchIdsReportedPeptideIdsPsmIds,
                searchDataLookupParamsRoot : searchDataLookupParamsRoot,
                proteinSequenceVersionIds : undefined,
                experimentId : undefined
            } );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _show_proteinPageSearchesSummarySectionData_ClickHandler() {

        this.setState({ show_proteinPageSearchesSummarySectionData_Root: true });
    }

    /**
     *
     */
    _singleProteinRowClickHandler( params : ProteinViewPage_Display_MultipleSearches_singleProteinRow_ClickHandler_Params ) {

        const proteinSequenceVersionId = params.proteinSequenceVersionId

        try {
            //  Exit if user selected content on the page
            const selectedContent = window.getSelection().toString();
            if( selectedContent ){
                //  user selected content on the page
                return false; //  EARLY RETURN
            }
        } catch (e) {
            //  Eat any exception
        }

        if (params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.ctrlKey_From_ClickEvent ||
            params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.metaKey_From_ClickEvent ) {

            //  Show Single Protein in New Window

            this._singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId } );

            return; //  EARLY RETURN
        }

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this.props.propsValue.singleProtein_CentralStateManagerObject.setProteinSequenceVersionId( { proteinSequenceVersionId } );

        this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId } );
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId }: {proteinSequenceVersionId: number} ) {

        //  Create URL for new Window about to open

        //  Create to override the value of proteinSequenceVersionId from the URL
        const singleProtein_CentralStateManagerObjectClass_ForNewWindow =
            new SingleProtein_CentralStateManagerObjectClass({ initialProteinSequenceVersionId: proteinSequenceVersionId, centralPageStateManager : undefined });

        const newWindowURL = this.props.propsValue.centralPageStateManager.getURL_ForCurrentState({ componentOverridesAdditions: [ singleProtein_CentralStateManagerObjectClass_ForNewWindow ] })

        // MUST open window before make AJAX Call.  This is a Browser Security requirement
        //  window.open(...): Must run in code directly triggered by click event

        const newWindow = window.open(newWindowURL, "_blank");
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId }: {proteinSequenceVersionId: number} ) : void {

        let proteinNameDescriptionParam : { name : string, description : string } = null; // If not found, Let Single Protein compute it

        const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( proteinNameDescription ) {
            proteinNameDescriptionParam = { name : proteinNameDescription.name, description : proteinNameDescription.description };
        }

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;

        //  Hide Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();

        if ( ! this._proteinViewPage_Display_MultipleSearches_SingleProtein ) {

            this._instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({ currentWindowScrollY });
        }

        this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,

            //  Pass Here since for sure populated by here
            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    _instantiateObject_Class__ProteinPage_Display_MultipleSearches_SingleProtein({ currentWindowScrollY }: { currentWindowScrollY: number }) {

        //  Create callback function to call on single protein close

        const singleProteinCloseCallback : ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback = () => {

            this._proteinViewPage_Display_MultipleSearches_SingleProtein = undefined;

            //  Show Main Div inside of header/footer
            const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
            if (!data_page_overall_enclosing_block_divDOM) {
                const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                console.warn(msg);
                throw Error(msg);
            }
            data_page_overall_enclosing_block_divDOM.style.display = "";

            if (currentWindowScrollY) {

                //  Scroll window down to original position when protein was clicked to open Single Protein view

                window.scrollTo({ top : currentWindowScrollY });
            }
        }

        const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = (
            this.props.propsValue.searchDetailsBlockDataMgmtProcessing.
            getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
        );

        this._proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinPage_Display_MultipleSearches_SingleProtein( {

            projectSearchIds : this.props.propsValue.projectSearchIds,
            searchDataLookupParamsRoot,

            dataPages_LoggedInUser_CommonObjectsFactory : this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            loadedDataCommonHolder : this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject,

            singleProteinCloseCallback : singleProteinCloseCallback
        } );
    }
    /**
     *
     */
    render() {

        let saveView_Component : JSX.Element = undefined;

        if ( this.state.saveView_Component_React ) {

            //  Create "Save View" Component

            //  variable must start with Constant "S" since is React Component
            const SaveView_Component_React = this.state.saveView_Component_React;
            const saveView_Component_Props_Prop = this.state.saveView_Component_Props_Prop;

            saveView_Component = (

                <React.Fragment>

                    <SaveView_Component_React
                        propsValue={ saveView_Component_Props_Prop }
                    />

                    <span >&nbsp;</span>

                </React.Fragment>
            );
        }

        //  Only create these once main display data is loaded

        let filterOnSection : JSX.Element = null;
        let generatedPeptideContents_UserSelections_Root_Component : JSX.Element = null;

        // if ( this.state.mainDisplayData_Loaded ) {
        //
        //     filterOnSection = this._render_FilterOn({  })
        //
        //     let searchContains_VariableModifications = false;
        //     let searchContains_OpenModifications = false;
        //     let searchContains_StaticModifications = false;
        //
        //     for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
        //
        //         const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        //         if ( ! loadedDataPerProjectSearchIdHolder ) {
        //             throw new Error("No value in this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        //         }
        //         if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications()
        //             && loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications().size > 0
        //         ) {
        //             searchContains_VariableModifications = true;
        //         }
        //         if ( loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()
        //             && loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId().size > 0
        //         ) {
        //             searchContains_OpenModifications = true;
        //         }
        //         if ( loadedDataPerProjectSearchIdHolder.get_staticMods()
        //             && loadedDataPerProjectSearchIdHolder.get_staticMods().length > 0
        //         ) {
        //             searchContains_StaticModifications = true;
        //         }
        //     }
        //
        //
        //     generatedPeptideContents_UserSelections_Root_Component = (
        //
        //         <div style={{ marginTop:10, marginBottom: 10 }}>
        //
        //             <GeneratedPeptideContents_UserSelections_Root_Component
        //                 generatedPeptideContents_UserSelections_StateObject={ this.props.propsValue.generatedPeptideContents_UserSelections_StateObject }
        //                 searchContains_VariableModifications={ searchContains_VariableModifications }
        //                 searchContains_OpenModifications={ searchContains_OpenModifications }
        //                 searchContains_StaticModifications={ searchContains_StaticModifications }
        //                 updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis  }
        //             />
        //         </div>
        //     );
        // }

        return (
            <React.Fragment>

                <div >

                    <div > {/* start display of data above Protein List */}

                        <div >
                            {/* Main Content above Protein List  */}

                            <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                                <SearchDetailsAndFilterBlock_MainPage_Root
                                    propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                    searchSubGroup_CentralStateManagerObjectClass={ null }
                                    searchSubGroup_SelectionsChanged_Callback={ null }
                                    searchSubGroup_ManageGroupNames_Clicked_Callback={ null }
                                />
                                <ProteinPage_ProteinGroupingFilterSelection_Component_Root
                                    propValue={ this.state.proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
                                />
                            </SearchDetailsAndOtherFiltersOuterBlock_Layout>

                            <div style={ { paddingBottom: 15 } }>

                                { saveView_Component }

                                <SharePage_Component
                                    projectSearchIds={ this.props.propsValue.projectSearchIds }
                                />
                            </div>

                            { filterOnSection }

                        </div>  {/* END: Main Content above Protein List  */}

                        { generatedPeptideContents_UserSelections_Root_Component }


                    </div>  {/* Close display of data above Protein List */}


                    {/* ***   Display of Protein List   *** */}

                    <h3> Protein List:</h3>

                    { ( this.state.show_InitialLoadingData_Message ) ? (

                        <div >
                            <div >
                                Loading Data
                            </div>
                            <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>

                    ) : null }


                    {/*  Outer Container for "Updating List" overlay  */}
                    <div style={ { position: "relative", display: "inline-block" } }> {/*    display: inline-block; so overlay doesn't extend right past the table right edge */}

                        <div style={ { position: "relative", display: "inline-block" } }>

                            { ( this.state.proteinList_DataCounts ) ? (

                                <div style={ { marginBottom: 10 } }>

                                    { ( this.state.proteinList_DataCounts.proteinGroupCount !== null && this.state.proteinList_DataCounts.proteinGroupCount !== undefined ) ? (

                                        <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                                    <span>
                                        Protein Group Count:
                                    </span>
                                    <span> </span>
                                    <span>{ this.state.proteinList_DataCounts.proteinGroupCount.toLocaleString() }</span>
                                </span>
                                    ): null }

                                    <span style={ { whiteSpace: "nowrap"  } }>
                                <span>
                                    Protein Count:
                                </span>
                                <span> </span>
                                <span>{ this.state.proteinList_DataCounts.proteinCount.toLocaleString() }</span>
                            </span>

                                    {/*
                                Multiple Search: No Peptide or PSM counts

                            <span  style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>
                                <span>
                                    Peptide Count:
                                </span>
                                <span> </span>
                                <span>{ this.state.proteinList_DataCounts.peptideCount.toLocaleString() }</span>
                            </span>

                            <span  style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>
                                <span>
                                    PSM Count:
                                </span>
                                <span> </span>
                                <span>{ this.state.proteinList_DataCounts.psmCount.toLocaleString() }</span>
                            </span>

                            */}

                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._downloadProteinsClickHandler_BindThis }
                                    >
                                Download Proteins
                            </span>

                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._downloadPSMsClickHandler_BindThis }
                                    >
                                Download PSMs
                            </span>

                                    {/*  Combined/Merged Searches Only */}
                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._show_proteinPageSearchesSummarySectionData_ClickHandler_BindThis }
                                    >
                                Show Summary Data Per Search
                            </span>
                                </div>
                            ): null }

                            {/*  Container for PSM Counts Per Search Only displayed for Combined/Merged Searches  */}
                            { ( this.state.show_proteinPageSearchesSummarySectionData_Root && this.state.proteinPageSearchesSummarySectionData_Root ) ? (
                                <ProteinPageSearchesSummarySectionData_Component
                                    summarySectionData={ this.state.proteinPageSearchesSummarySectionData_Root }
                                />
                            ) : null }

                        </div>

                        {/*  Protein List is displayed here */}

                        <div style={ { display: "inline-block" } }>

                            { ( this.state.tableObject_CurrentlyRendered_ProteinList ) ? (
                                <DataTable_TableRoot
                                    tableObject={ this.state.tableObject_CurrentlyRendered_ProteinList }
                                />
                            ): null }
                        </div>

                        {/*    Cover over protein list when updating */}
                        { ( this.state.show_UpdatingProteinList_Message && ( ! this.state.show_InitialLoadingData_Message ) ) ? (
                            <div className=" block-updating-overlay-container ">
                                <div style={ {  marginTop: 4, textAlign: "center" } }>
                                    Updating Protein List
                                </div>
                            </div>
                        ) : null }


                    </div>   {/*   Close:   everything main after <h3> Protein List:</h3>  */}

                </div>

            </React.Fragment>
        )
    }

}
