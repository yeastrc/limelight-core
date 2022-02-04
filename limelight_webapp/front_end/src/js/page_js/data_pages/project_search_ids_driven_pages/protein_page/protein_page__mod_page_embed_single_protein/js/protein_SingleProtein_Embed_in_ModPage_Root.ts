/**
 * protein_SingleProtein_Embed_in_ModPage_Root.ts
 *
 * Display Javascript for modView.jsp page  - Displaying Data for Single Protein
 *
 */

import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {SingleProtein_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ProteinPage_Display__SingleProtein_Root,
    ProteinPage_Display__SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Root";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass";
import {Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass";
import {dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";

/**
 *
 */
export class Protein_SingleProtein_Embed_in_ModPage_Root_Class_InitializeResult {

    directlyShowing_SingleProteinOverlay : boolean
}

/**
 *
 */
class Protein_SingleProtein_Embed_in_ModPage_Root_Class {


    private _singleProteinCloseCallback: ProteinPage_Display__SingleProtein_singleProteinCloseCallback

    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager
    private _dataPageStateManager_DataFrom_Server: DataPageStateManager
    private _searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing

    private _projectSearchIds: Array<number>
    private _searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    private _centralPageStateManager: CentralPageStateManager

    private _singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass
    private _dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    private _allSearches_Have_ScanFilenames: boolean


    //  !!  When copy for Experiment, don't need this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass since only for pick up old values from URL

    private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    private _protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass
    private _protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass

    private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    private _dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

    private _dataLoaded_For_SingleProtein = false;

    /**
     *
     *
     */
    initialize(
        {
            referrerFromURL_Set,

            singleProteinCloseCallback,

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing,
            projectSearchIds,
            searchDataLookupParamsRoot,
            dataPages_LoggedInUser_CommonObjectsFactory,

            centralPageStateManager

        }: {
            referrerFromURL_Set: boolean //  was /r on the URL when page loaded

            singleProteinCloseCallback: ProteinPage_Display__SingleProtein_singleProteinCloseCallback

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager,
            dataPageStateManager_DataFrom_Server: DataPageStateManager,
            searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing,

            projectSearchIds: Array<number>,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

            centralPageStateManager: CentralPageStateManager

        }) : Protein_SingleProtein_Embed_in_ModPage_Root_Class_InitializeResult {


        ///   !!!!!   WARNING:


        this._singleProteinCloseCallback = singleProteinCloseCallback

        this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing
        this._projectSearchIds = projectSearchIds
        this._searchDataLookupParamsRoot = searchDataLookupParamsRoot
        this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory

        this._centralPageStateManager = centralPageStateManager;


        {
            let allSearches_Have_ScanFilenames = true;

            for (const projectSearchId of this._projectSearchIds) {

                const dataPage_common_Flags_SingleSearch_ForProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
                if (!dataPage_common_Flags_SingleSearch_ForProjectSearchId) {
                    const msg = "this._dataPageStateManager_DataFrom_Server.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if (!dataPage_common_Flags_SingleSearch_ForProjectSearchId.hasScanFilenames) {
                    allSearches_Have_ScanFilenames = false;
                }
            }

            this._allSearches_Have_ScanFilenames = allSearches_Have_ScanFilenames;
        }

        //////////////////////


        this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass({
            centralPageStateManager,
            initialProteinSequenceVersionId: undefined
        })
        this._singleProtein_CentralStateManagerObject.initialize();

        //  !!  When copy for Experiment, don't need this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass since only for pick up old values from URL

        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_MainPage({centralPageStateManager});
        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize_MainPageInstance();

        this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass = new Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass({centralPageStateManager});
        this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.initialize();

        this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass = new Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass({centralPageStateManager});
        this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass.initialize();

        //  Finished with ALL 'initialize'.  Now can transfer state values to locations for current code


        if ( referrerFromURL_Set ) {

            //  If referrer from another page (peptide, ...) clear TreatOpenModMassZeroAsUnmodified_Selection.

            //    TreatOpenModMassZeroAsUnmodified_Selection is only here to pick up for old Protein page URLs.  All new values are set only on Single Protein, never set on Protein main page.

            this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );

        } else {

            //  NOT referrer from another page (peptide, ...).  Copy TreatOpenModMassZeroAsUnmodified_Selection to Single Protein and then clear

            //    TreatOpenModMassZeroAsUnmodified_Selection is only here to pick up for old Protein page URLs.  All new values are set only on Single Protein, never set on Protein main page.

            let transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject = false;
            {
                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData_SingleProtein = this._singleProtein_CentralStateManagerObject.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
                if ( ! modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData_SingleProtein ) {

                    //  NOT Already populated

                    transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject = true;
                }
            }
            if ( transfer_OpenModMassZeroNotOpenMod_UserSelection_To_SingleProteinStateObject ) {

                //  Create new modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein with copy of Selection for main page
                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_SingleProtein();

                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.initialize_SingleProteinInstance({
                    encodedStateData: undefined
                });

                if ( this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( true );
                } else {
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( false );
                }

                //  Clear the Page level selection since NOT used at page level.  ONLY on Protein Page.
                this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );

                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.getDataForEncoding();

                this._singleProtein_CentralStateManagerObject.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
                this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.setTreatOpenModMassZeroAsUnmodified_Selection( false );
            }
        }
        {
            //  Transfer GeneratedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay to singleProtein_CentralStateManagerObject

            const encodedStateData = this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
            if (encodedStateData) {
                this._singleProtein_CentralStateManagerObject.setGeneratedPeptideContents_UserSelections__EncodedStateData({generatedPeptideContents_UserSelections__EncodedStateData: encodedStateData});
                //  clear value after transfer
                this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData({generatedPeptideContentsSelectedEncodedStateData: undefined});
            }
        }

        //  Transfers complete


        
        this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder()
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>();

        let directlyShowing_SingleProteinOverlay = false;

        if ( this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId() ) {

            directlyShowing_SingleProteinOverlay = true;

            const for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection = this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass.get_for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection();

            let modMass_Rounded_From_ModPage_ForInitialSelection : number = null;
            if ( for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection !== undefined && for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection !== null ) {
                modMass_Rounded_From_ModPage_ForInitialSelection = for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection;
            }

            this.show_SingleProtein_InOverlay({ proteinSequenceVersionId: this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId(), modMass_Rounded_From_ModPage_ForInitialSelection });
        }

        const returnResult : Protein_SingleProtein_Embed_in_ModPage_Root_Class_InitializeResult = { directlyShowing_SingleProteinOverlay }

        return returnResult;
    }

    /**
     *
     */
    show_SingleProtein_InNewWindow(
        {
            proteinSequenceVersionId,
            modMass_Rounded_From_ModPage_ForInitialSelection     //  modMass_Rounded_From_ModPage  Parent Table Row Mod Mass (Variable and/or Open Mod Mass which has been rounded with Math.round)
        }: {
            proteinSequenceVersionId: number
            modMass_Rounded_From_ModPage_ForInitialSelection: number

        }): void {

        //  Create URL for new Window about to open

        //  Create to override the value of proteinSequenceVersionId from the URL
        const singleProtein_CentralStateManagerObjectClass_ForNewWindow = new SingleProtein_CentralStateManagerObjectClass({
            initialProteinSequenceVersionId: proteinSequenceVersionId,
            centralPageStateManager: undefined
        });

        const protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass = new Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass({
            initial__for_Open_New_Window__modMass_Rounded_From_ModPage_ForInitialSelection: modMass_Rounded_From_ModPage_ForInitialSelection,
            centralPageStateManager: undefined
        })

        const newWindowURL = this._centralPageStateManager.getURL_ForCurrentState({
            componentOverridesAdditions: [singleProtein_CentralStateManagerObjectClass_ForNewWindow, protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass]
        })

        // MUST open window before make AJAX Call.  This is a Browser Security requirement
        //  window.open(...): Must run in code directly triggered by click event

        const newWindow = window.open(newWindowURL, "_blank");
    }

    /**
     *
     */
    show_SingleProtein_InOverlay(
        {
            proteinSequenceVersionId,
            modMass_Rounded_From_ModPage_ForInitialSelection     //  modMass_Rounded_From_ModPage  Parent Table Row Mod Mass (Variable and/or Open Mod Mass which has been rounded with Math.round)
        }: {
            proteinSequenceVersionId: number
            modMass_Rounded_From_ModPage_ForInitialSelection: number

        }): void {

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;


        //  Hide Main Div inside of header/footer
        const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
        if (!data_page_overall_enclosing_block_divDOM) {
            const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
            console.warn(msg);
            throw Error(msg);
        }
        data_page_overall_enclosing_block_divDOM.style.display = "none";

        //  Scroll to top since Mod page has formatting problems
        window.scrollTo({top: 0});


        const singleProteinCloseCallback = () => {

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

            if ( this._singleProteinCloseCallback ) {

                this._singleProteinCloseCallback();
            }
        }

        const proteinPage_Display__SingleProtein_Root = new ProteinPage_Display__SingleProtein_Root({

            singleProteinCloseCallback,

            loadedDataCommonHolder: this._loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing: this._searchDetailsBlockDataMgmtProcessing,
            projectSearchIds: this._projectSearchIds,
            searchDataLookupParamsRoot: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_searchDetailsCriteriaData(),
            singleProtein_CentralStateManagerObject: this._singleProtein_CentralStateManagerObject,
            dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory
        });

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this._singleProtein_CentralStateManagerObject.setProteinSequenceVersionId({proteinSequenceVersionId});

        if ( this._dataLoaded_For_SingleProtein ) {
            //  Data already loaded for Single Protein so open overlay

            this._openOverlayActual({ proteinSequenceVersionId, modMass_Rounded_From_ModPage_ForInitialSelection, proteinPage_Display__SingleProtein_Root });

        } else {
            //  Data NOT already loaded for Single Protein so open overlay loading msg and then load data then open overlay

            proteinPage_Display__SingleProtein_Root.openOverlay_OnlyLoadingMessage()

            const promise_getDataFromServer_AllPromises = this._getDataFromServer_For_SingleProtein();

            promise_getDataFromServer_AllPromises.catch((reason) => {
            });

            promise_getDataFromServer_AllPromises.then((value) => {
                try {
                    this._dataLoaded_For_SingleProtein = true;

                    this._openOverlayActual({ proteinSequenceVersionId, modMass_Rounded_From_ModPage_ForInitialSelection, proteinPage_Display__SingleProtein_Root });

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });
        }
    }

    /**
     * Called after have data loaded
     */
    private _openOverlayActual(
        {
            proteinSequenceVersionId,
            modMass_Rounded_From_ModPage_ForInitialSelection,     //  modMass_Rounded_From_ModPage  Parent Table Row Mod Mass (Variable and/or Open Mod Mass which has been rounded with Math.round)
            proteinPage_Display__SingleProtein_Root
        }: {
            proteinSequenceVersionId: number
            modMass_Rounded_From_ModPage_ForInitialSelection: number
            proteinPage_Display__SingleProtein_Root : ProteinPage_Display__SingleProtein_Root

        }): void {


        proteinPage_Display__SingleProtein_Root.openOverlay({
            proteinNameDescription: undefined,
            proteinSequenceVersionId,
            modMass_Rounded_From_ModPage_ForInitialSelection,
            protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        });
    }

    /**
     *
     */
    private _getDataFromServer_For_SingleProtein() : Promise<unknown> {

        let load_searchSubGroupsData = false;
        if ( this._projectSearchIds.length === 1 && this._dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) {
            load_searchSubGroupsData = true;
        }

        const getDataFromServer_AllPromises: Array< Promise<unknown>> = [];

        if ( this._allSearches_Have_ScanFilenames ) {  // allSearches_Have_ScanFilenames set in constructor

            const promise_ToAdd = new Promise<void>( (resolve, reject) => {
                try {
                    const promise = dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData({ projectSearchIds: this._projectSearchIds });
                    promise.catch( reason => {
                        try {
                            reject(reason)

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                    promise.then( dataPage_common_Data_Holder_Holder_SearchScanFileData_Root_PromiseResult => {

                        this._dataPage_common_Data_Holder_Holder_SearchScanFileData_Root = dataPage_common_Data_Holder_Holder_SearchScanFileData_Root_PromiseResult;

                        resolve();
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            getDataFromServer_AllPromises.push(promise_ToAdd);
        }

        for (const projectSearchId of this._projectSearchIds) {

            const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
            this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);


            let searchDataLookupParams_For_Single_ProjectSearchId = this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId({
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
                load_searchSubGroupsData
            });

            getDataFromServer_AllPromises.push(promise_getDataFromServer);
        }

        const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);

        return promise_getDataFromServer_AllPromises;
    }
}


/**
 *
 */
const protein_SingleProtein_Embed_in_ModPage_Root_Class__SingletonInstance = new Protein_SingleProtein_Embed_in_ModPage_Root_Class();

/**
 *
 */
export const get_SingletonInstance__Protein_SingleProtein_Embed_in_ModPage_Root = function () : Protein_SingleProtein_Embed_in_ModPage_Root_Class {

    return protein_SingleProtein_Embed_in_ModPage_Root_Class__SingletonInstance;
}

