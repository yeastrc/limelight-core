/**
 * proteinViewPage_DisplayData_SingleSearch__Main_Component.tsx
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
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import React from "react";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {ProteinViewPage_DisplayData_SingleSearch__Main_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/js/proteinViewPage_DisplayData_SingleSearch__Main_Component_nonClass_Functions";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {
    CountsFor_proteinSequenceVersionIdEntry_SingleSearch,
    createProteinDisplayData_SingleSearch,
    ProteinDisplayData_From_createProteinDisplayData_SingleSearch, ProteinNameDescriptionCacheEntry_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData";
import {AnnotationTypeData_ReturnSpecifiedTypes} from "page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes";
import {
    DataTable_RootTableDataObject,
    DataTable_RootTableObject, DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function,
    ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Parameter,
    renderToPageProteinList_SingleSearch_Create_DataTable_RootTableDataObject
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject";
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
import {
    ProteinViewPage_StatsSection,
    ProteinViewPage_StatsSection_LoadingMessage, ProteinViewPage_StatsSection_Props
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group__shared/search_stats/proteinPageStatsSection";
import {proteinViewPage_GetStatsSectionData_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/protein_page_single_search__search_sub_group__shared/search_stats/proteinViewPage_GetStatsSectionData_SingleSearch";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

/**
 *
 */
export class ProteinViewPage_DisplayData_SingleSearch__Main_Component_Props_Prop {

    projectSearchId : number;
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
export interface ProteinViewPage_DisplayData_SingleSearch__Main_Component_Props {

    propsValue : ProteinViewPage_DisplayData_SingleSearch__Main_Component_Props_Prop
}

/**
 *  Counts displayed on the page
 */
interface ProteinList_DataCounts {

    proteinCount: number
    proteinGroupCount: number
    peptideCount: number
    psmCount: number
}

/**
 *
 */
interface ProteinViewPage_DisplayData_SingleSearch__Main_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    show_InitialLoadingData_Message? : boolean;

    loadedDataPerProjectSearchIdHolder? : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue?: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue

    tableObject_CurrentlyRendered_ProteinList? : DataTable_RootTableObject
    proteinList_DataCounts? : ProteinList_DataCounts

    show_UpdatingProteinList_Message?: boolean

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    //  Stats Section

    showSearchStats_LoadingMessage?: boolean
    showSearchStats_Data?: boolean

    proteinViewPage_StatsSection_Props?: ProteinViewPage_StatsSection_Props



    //

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue
}

/**
 *
 */
export class ProteinViewPage_DisplayData_SingleSearch__Main_Component extends React.Component< ProteinViewPage_DisplayData_SingleSearch__Main_Component_Props, ProteinViewPage_DisplayData_SingleSearch__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
    private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

    private _downloadProteinsClickHandler_BindThis = this._downloadProteinsClickHandler.bind(this);
    private _downloadPSMsClickHandler_BindThis = this._downloadPSMsClickHandler.bind(this);
    private _showStatsSectionClickHandler_BindThis = this._showStatsSectionClickHandler.bind(this);

    private _DO_NOT_CALL_CastTestOnly () {
        //  Test function cast
        const proteinGroup_SelectionValues_Changed_Callback : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback = this._proteinGroup_SelectionValues_Changed_Callback;
        const singleProteinRowClickHandler:ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Function = this._singleProteinRowClickHandler;
    }

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry_SingleSearch> = new Map();

    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_SingleSearch>> = new Map();

    //   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
    private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry_SingleSearch> = new Map();

    private _proteinViewPage_Display_MultipleSearches_SingleProtein: ProteinPage_Display_MultipleSearches_SingleProtein;

    /**
     *
     */
    constructor(props: ProteinViewPage_DisplayData_SingleSearch__Main_Component_Props) {
        super(props);

        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            ProteinViewPage_DisplayData_SingleSearch__Main_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
                propsValue : props.propsValue
            });

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

        //  Will be replaced later
        const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();

        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : [ props.propsValue.projectSearchId ], experimentId : undefined });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = {
            show_InitialLoadingData_Message: true,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
            loadedDataPerProjectSearchIdHolder,
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
                    this._instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein({currentWindowScrollY: undefined});
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
        const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();

        const projectSearchId = this.props.propsValue.projectSearchId;

        let searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId =
            this.props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );

        if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
            const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
            console.log( msg );
            throw Error( msg );
        }

        const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = (
            loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder( {
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId,
                load_searchSubGroupsData : false,
                loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
            } )
        );

        promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch( (reason) => {} );
        promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then( (value) => {
            try {
                this.setState({ loadedDataPerProjectSearchIdHolder });

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

    /**
     *
     */
    private _re_renderPage() {

        this.setState({ show_UpdatingProteinList_Message: true });

        window.setTimeout(() => {
            try {
                this.setState({ show_UpdatingProteinList_Message: false });

                this.setState({ show_InitialLoadingData_Message: false });

                this._re_renderPage_Actual();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 20);

    }

    /**
     *
     */
    private _re_renderPage_Actual() {

        const projectSearchId = this.props.propsValue.projectSearchId;

        //   Clear: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescription_Key_ProteinSequenceVersionId = new Map();

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = new Map();

        //   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
        this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();

        const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder;

        // this._mainData_LoadedFor_displayProteinListOnPage = true; // Set to true once "Main Data" Loaded for current project search id.

        const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager
        } );

        const proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData_SingleSearch = createProteinDisplayData_SingleSearch({

            projectSearchId : projectSearchId,
            loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            annotationTypeData_ReturnSpecifiedTypes : annotationTypeData_ReturnSpecifiedTypes,

            proteinNameDescription_Key_ProteinSequenceVersionId : this._proteinNameDescription_Key_ProteinSequenceVersionId,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
        });

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

        //   Create Data Table
        const tableDataObject : DataTable_RootTableDataObject = renderToPageProteinList_SingleSearch_Create_DataTable_RootTableDataObject({ // External Function
            proteinDisplayData,
            proteinGrouping_CentralStateManagerObjectClass : this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            projectSearchId,
            loadedDataPerProjectSearchIdHolder: loadedDataPerProjectSearchIdHolder,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            proteinRow_tableRowClickHandler_Callback_Function : this._singleProteinRowClickHandler_BindThis
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
                peptideCount: proteinDisplayData.reportedPeptideCount_TotalForSearch,
                psmCount: proteinDisplayData.psmCount_TotalForSearch
            }
        }

        this.setState({
            tableObject_CurrentlyRendered_ProteinList,
            proteinList_DataCounts
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

            const projectSearchId = this.props.propsValue.projectSearchId;

            const proteinDisplayDataAsString =
                dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload({
                    tableDataRootObject: this.state.tableObject_CurrentlyRendered_ProteinList.tableDataObject
                });

            //  For getting search info for projectSearchIds
            const searchNamesMap_KeyProjectSearchId = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap();

            const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
            if ( ! searchNameObject ) {
                throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
            }

            const filename = 'proteins-search-' + searchNameObject.searchId + '.txt';

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

            if ( projectSearchIds_InDownloadClickHandler.length !== 1 ) {
                alert("More than one Search is not supported" );
                throw Error( "More than one Search is not supported" );
            }

            let projectSearchId_InDownloadClickHandler = projectSearchIds_InDownloadClickHandler[0];

            const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
                this.props.propsValue.searchDetailsBlockDataMgmtProcessing.
                getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

            if ( ! searchDataLookupParamsRoot ) {
                throw Error( "searchDataLookupParamsRoot not found" );
            }

            const single_projectSearchId_ReportedPeptideIdsPsmIds = { projectSearchId : projectSearchId_InDownloadClickHandler };

            const projectSearchIdsReportedPeptideIdsPsmIds = [ single_projectSearchId_ReportedPeptideIdsPsmIds ];

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

    private _showStatsSectionClickHandler( ) {
        try {
            this.setState({ showSearchStats_LoadingMessage: true });

            const promise = proteinViewPage_GetStatsSectionData_SingleSearch({
                projectSearchId : this.props.propsValue.projectSearchId,
                proteinListData: {
                    psmCount: this.state.proteinList_DataCounts.psmCount,
                    reportedPeptideCount: this.state.proteinList_DataCounts.peptideCount,
                    proteinCount: this.state.proteinList_DataCounts.proteinCount,
                },
                loadedDataPerProjectSearchIdHolder : this.state.loadedDataPerProjectSearchIdHolder,
                dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager
            });

            promise.catch( reason => {

            });

            promise.then( result => {
                this.setState({ proteinViewPage_StatsSection_Props: result, showSearchStats_Data: true, showSearchStats_LoadingMessage: false });
            });

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    _singleProteinRowClickHandler( params : ProteinViewPage_DisplayData_SingleSearch_ProteinRow_tableRowClickHandler_Callback_Parameter ) {

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

            this._instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein({ currentWindowScrollY });
        }

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        {
            const projectSearchId = this.props.propsValue.projectSearchId;
            if ( ! projectSearchId ) {
                throw Error("this.props.propsValue.projectSearchId No Value or zero: _instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein(...) ")
            }
            const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder;
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("this.state.loadedDataPerProjectSearchIdHolder No Value: _instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein(...) ")
            }
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );
        }

        this._proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,

            //  Pass Here since for sure populated by here
            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    _instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein({ currentWindowScrollY }: { currentWindowScrollY: number }) {

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

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        {
            const projectSearchId = this.props.propsValue.projectSearchId;
            if ( ! projectSearchId ) {
                throw Error("this.props.propsValue.projectSearchId No Value or zero: _instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein(...) ")
            }
            const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder;
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw Error("this.state.loadedDataPerProjectSearchIdHolder No Value: _instantiateObject_Class__ProteinPage_Display_SingleSearch_SingleProtein(...) ")
            }
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );
        }

        this._proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinPage_Display_MultipleSearches_SingleProtein( {

            projectSearchIds : [ this.props.propsValue.projectSearchId ],
            searchDataLookupParamsRoot,

            dataPages_LoggedInUser_CommonObjectsFactory : this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            loadedDataCommonHolder : this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject,

            singleProteinCloseCallback : singleProteinCloseCallback
        } );
    }
    /**
     *
     */
    render() {

        let setDefaultView_Component : JSX.Element = undefined;

        if ( this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type =
                this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();

            const param = new SetDefaultView_Component_React_Params({ projectSearchId : this.props.propsValue.projectSearchId });
            setDefaultView_Component = get_SetDefaultView_Component_React( param );
        }

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

                                { setDefaultView_Component }
                                { saveView_Component }

                                <SharePage_Component
                                    projectSearchIds={ [ this.props.propsValue.projectSearchId ] }
                                />
                            </div>

                        </div>  {/* END: Main Content above Protein List  */}

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

                                    {/*  Single Search Only */}
                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._showStatsSectionClickHandler_BindThis }
                                    >
                                        Show Stats
                                    </span>
                                </div>
                            ): null }

                            { ( this.state.showSearchStats_LoadingMessage ) ? (
                                <div >
                                    <ProteinViewPage_StatsSection_LoadingMessage />
                                </div>
                            ) : null }

                            { ( this.state.showSearchStats_Data && this.state.proteinViewPage_StatsSection_Props ) ? (
                                <ProteinViewPage_StatsSection
                                    data={ this.state.proteinViewPage_StatsSection_Props.data }
                                    searchContainsSubGroups={ false }
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