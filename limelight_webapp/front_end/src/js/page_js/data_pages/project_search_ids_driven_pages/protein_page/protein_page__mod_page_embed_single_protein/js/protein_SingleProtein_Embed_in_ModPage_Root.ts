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
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ProteinPage_Display_MultipleSearches_SingleProtein,
    ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass";
import {Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__mod_page_embed_single_protein/js/protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass";

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


    private _singleProteinCloseCallback: ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback

    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager
    private _dataPageStateManager_DataFrom_Server: DataPageStateManager
    private _searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing

    private _projectSearchIds: Array<number>
    private _searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    private _centralPageStateManager: CentralPageStateManager

    private _singleProtein_CentralStateManagerObject: SingleProtein_CentralStateManagerObjectClass
    private _dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

    private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    private _protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass
    private _protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass

    private _generatedPeptideContents_UserSelections_StateObject__FOR__SingleProteinOverlay : GeneratedPeptideContents_UserSelections_StateObject

    private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    private _dataLoaded_For_SingleProtein = false;

    /**
     *
     *
     */
    initialize(
        {
            singleProteinCloseCallback,

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing,
            projectSearchIds,
            searchDataLookupParamsRoot,
            dataPages_LoggedInUser_CommonObjectsFactory,

            centralPageStateManager

        }: {
            singleProteinCloseCallback: ProteinPage_Display_MultipleSearches_SingleProtein_singleProteinCloseCallback

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: DataPageStateManager,
            dataPageStateManager_DataFrom_Server: DataPageStateManager,
            searchDetailsBlockDataMgmtProcessing: SearchDetailsBlockDataMgmtProcessing,

            projectSearchIds: Array<number>,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            dataPages_LoggedInUser_CommonObjectsFactory: DataPages_LoggedInUser_CommonObjectsFactory

            centralPageStateManager: CentralPageStateManager

        }) : Protein_SingleProtein_Embed_in_ModPage_Root_Class_InitializeResult {

        this._singleProteinCloseCallback = singleProteinCloseCallback

        this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing
        this._projectSearchIds = projectSearchIds
        this._searchDataLookupParamsRoot = searchDataLookupParamsRoot
        this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory

        this._centralPageStateManager = centralPageStateManager;


        this._singleProtein_CentralStateManagerObject = new SingleProtein_CentralStateManagerObjectClass({
            centralPageStateManager,
            initialProteinSequenceVersionId: undefined
        })
        this._singleProtein_CentralStateManagerObject.initialize();

        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = new ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass({centralPageStateManager});
        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.initialize();

        this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass = new Protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass({centralPageStateManager});
        this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.initialize();

        this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass = new Protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass({centralPageStateManager});
        this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass.initialize();

        const valueChangedCallback = () : void => {

            const encodedStateData = this._generatedPeptideContents_UserSelections_StateObject__FOR__SingleProteinOverlay.getEncodedStateData();
            this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData : encodedStateData } );
        }
        this._generatedPeptideContents_UserSelections_StateObject__FOR__SingleProteinOverlay = new GeneratedPeptideContents_UserSelections_StateObject({valueChangedCallback });
        {
            const encodedStateData = this._protein_singleProtein_EmbedInModPage_CentralStateManagerObjectClass.getGeneratedPeptideContentsSelectedEncodedStateData();
            if ( encodedStateData ) {
                this._generatedPeptideContents_UserSelections_StateObject__FOR__SingleProteinOverlay.set_encodedStateData({ encodedStateData })
            }
        }

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

        const proteinViewPage_Display_MultipleSearches_SingleProtein = new ProteinPage_Display_MultipleSearches_SingleProtein({

            singleProteinCloseCallback,

            loadedDataCommonHolder: this._loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server: this._dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing: this._searchDetailsBlockDataMgmtProcessing,
            projectSearchIds: this._projectSearchIds,
            searchDataLookupParamsRoot: this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_searchDetailsCriteriaData(),
            singleProtein_CentralStateManagerObject: this._singleProtein_CentralStateManagerObject,
            dataPages_LoggedInUser_CommonObjectsFactory: this._dataPages_LoggedInUser_CommonObjectsFactory,

            searchSubGroup_CentralStateManagerObjectClass: null,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        });

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this._singleProtein_CentralStateManagerObject.setProteinSequenceVersionId({proteinSequenceVersionId});

        if ( this._dataLoaded_For_SingleProtein ) {
            //  Data already loaded for Single Protein so open overlay

            this._openOverlayActual({ proteinSequenceVersionId, modMass_Rounded_From_ModPage_ForInitialSelection, proteinViewPage_Display_MultipleSearches_SingleProtein });

        } else {
            //  Data NOT already loaded for Single Protein so open overlay loading msg and then load data then open overlay

            proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay_OnlyLoadingMessage()

            const promise_getDataFromServer_AllPromises = this._getDataFromServer_For_SingleProtein();

            promise_getDataFromServer_AllPromises.catch((reason) => {
            });

            promise_getDataFromServer_AllPromises.then((value) => {
                try {
                    this._dataLoaded_For_SingleProtein = true;

                    this._openOverlayActual({ proteinSequenceVersionId, modMass_Rounded_From_ModPage_ForInitialSelection, proteinViewPage_Display_MultipleSearches_SingleProtein });

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
            proteinViewPage_Display_MultipleSearches_SingleProtein
        }: {
            proteinSequenceVersionId: number
            modMass_Rounded_From_ModPage_ForInitialSelection: number
            proteinViewPage_Display_MultipleSearches_SingleProtein : ProteinPage_Display_MultipleSearches_SingleProtein

        }): void {


        proteinViewPage_Display_MultipleSearches_SingleProtein.openOverlay({
            proteinNameDescription: undefined,
            proteinSequenceVersionId,
            modMass_Rounded_From_ModPage_ForInitialSelection,
            generatedPeptideContents_UserSelections_StateObject: this._generatedPeptideContents_UserSelections_StateObject__FOR__SingleProteinOverlay,
            protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass: this._protein_singleProtein_EmbedInModPage_NewWindowContents_CentralStateManagerObjectClass
        });
    }

    /**
     *
     */
    private _getDataFromServer_For_SingleProtein() : Promise<unknown> {

        const getDataFromServer_AllPromises = [];

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
                load_searchSubGroupsData : false
                //  load_searchSubGroupsData : false since for now not processing subgroup data
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

