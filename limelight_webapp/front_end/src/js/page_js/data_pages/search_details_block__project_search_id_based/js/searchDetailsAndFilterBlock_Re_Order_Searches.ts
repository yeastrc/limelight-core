/**
 * searchDetailsAndFilterBlock_Re_Order_Searches.ts
 *
 * Javascript for Searches Maint on Data Pages
 *
 * Re-Order Searches
 */



import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {ParseURL_Into_PageStateParts} from "page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts";
import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {navigation_dataPages_Maint_Instance} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint";

import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from 'page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId';
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {
    get_SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Layout,
    SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params,
    SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_Re_Order_Searches_OverlayLayout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {currentProjectId_ProjectSearchId_Based_DataPages_FromDOM} from "page_js/data_pages/data_pages_common/currentProjectId_ProjectSearchId_Based_DataPages_FromDOM";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {get_SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_Layout} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout";
import {get_SearchDetailsAndFilterBlock_Re_Order_Searches_UpdateInProgress_OverlayLayout_Layout} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_Re_Order_Searches_UpdateInProgress_OverlayLayout";


/**
 *
 */
export class SearchDetailsAndFilterBlock_Re_Order_Searches {

    private _callbackOn_Cancel_Close_Clicked_BindThis = this._callbackOn_Cancel_Close_Clicked.bind(this)
    private _callback_update_OrderOf_Searches_BindThis = this._callback_update_OrderOf_Searches.bind(this)

    private _dataPageStateManager_DataFrom_Server : DataPageStateManager
    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
    private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    private _dataUpdated_Callback

    private _searchList_ForUserSelection : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>;

    private _changeSearches_Overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    /**
     *
     */
    constructor({ dataPageStateManager_DataFrom_Server, dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, searchDetailsBlockDataMgmtProcessing, dataUpdated_Callback } : {

        dataPageStateManager_DataFrom_Server : DataPageStateManager
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
        searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        dataUpdated_Callback
    }) {
        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
        this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._dataUpdated_Callback = dataUpdated_Callback;
    }

    /**
     *
     */
    open_Re_Order_Searches_Overlay(  ) {

        const searchList: SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem[] = this._getSearchList();

        this._searchList_ForUserSelection = searchList;

        const overlayComponent = get_SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Layout({
            searchList,
            callback_update_OrderOf_Searches : this._callback_update_OrderOf_Searches_BindThis,
            callbackOn_Cancel_Close_Clicked : this._callbackOn_Cancel_Close_Clicked_BindThis
        })

        this._changeSearches_Overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
    }

    /**
     *
     */
    _getSearchList() : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem> {

        const searchList_Result : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem> = [];

        const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();


        const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()

        for ( const projectSearchId of projectSearchIds ) {

            const searchNameEntry = searchNamesMap_KeyProjectSearchId.get( projectSearchId )

            const searchList_Entry = new SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem({
                projectSearchId : searchNameEntry.projectSearchId,
                searchId : searchNameEntry.searchId,
                searchName : searchNameEntry.name
            })
            searchList_Result.push( searchList_Entry );
        }

        return searchList_Result;
    }

    /**
     *
     */
    _callbackOn_Cancel_Close_Clicked() : void {

        this._remove_ModalOverlay();
    }

    /**
     *
     */
    _callback_update_OrderOf_Searches( params : SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) : void {

        this._changeSearches( params.updated_searchList );
    }

    /**
     *
     */
    _remove_ModalOverlay() {

        this._changeSearches_Overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

        this._changeSearches_Overlay_AddedTo_DocumentBody_Holder = undefined;
    }

    /**
     *
     */
    private _changeSearches( updated_searchList : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem> ) {

        const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()

        if ( updated_searchList.length !== projectSearchIds.length ) {
            const msg = "_changeSearches(...): if ( updated_searchList.length !== projectSearchIds.length )"
            console.warn( msg )
            throw Error( msg )
        }

        {
            let projectSearchIds_Changed = false;

            const projectSearchIds_Length = projectSearchIds.length;

            for ( let index = 0; index < projectSearchIds_Length; index++ ) {
                if ( projectSearchIds[ index ] === undefined ) {
                    const msg = "_changeSearches(...): if ( projectSearchIds[ index ] === undefined )"
                    console.warn( msg )
                    throw Error( msg )
                }
                if ( updated_searchList[ index ] === undefined ) {
                    const msg = "_changeSearches(...): if ( updated_searchList[ index ] )"
                    console.warn( msg )
                    throw Error( msg )
                }
                const projectSearchId = projectSearchIds[ index ];
                const updated_searchList_Entry = updated_searchList[ index ];

                if ( projectSearchId !== updated_searchList_Entry.projectSearchId ) {

                    projectSearchIds_Changed = true;
                    // Skip break to ensure all elements of all index are not undefined
                }
            }

            if ( ! projectSearchIds_Changed ) {

                //  NO Changes so EXIT after closing Overlay

                //  ONLY run if updated_searchList is NOT CHANGED from projectSearchIds since when changed will take browser to new URL
                this._remove_ModalOverlay();

                return; // EARLY RETURN
            }
        }


        ///////////////

        this._remove_ModalOverlay();

        //  Show Updating Message

        {
            const overlayComponent = get_SearchDetailsAndFilterBlock_Re_Order_Searches_UpdateInProgress_OverlayLayout_Layout({});

            //  If change to NOT go to New URL, store the returned object and click the 'remove' method on it
            limelight_add_ReactComponent_JSX_Element_To_DocumentBody({componentToAdd: overlayComponent});
        }

        ///////////////

        //  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
        //  An array in the same order as projectSearchIds
        // let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
            this._searchDetailsBlockDataMgmtProcessing.
            getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

        if ( ! searchDataLookupParamsRoot ) {
            throw Error( "searchDataLookupParamsRoot not found" );
        }

        //  Not needed until update existing page
        // this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds_Additions_Final_Ordered  )

        // Update order of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList

        {
            const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;

            const paramsForProjectSearchIds_Map_Key_ProjectSearchId : Map<number, SearchDataLookupParams_For_Single_ProjectSearchId> = new Map();

            for ( const entry of paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                paramsForProjectSearchIds_Map_Key_ProjectSearchId.set( entry.projectSearchId, entry )
            }

            const paramsForProjectSearchIdsListNew: SearchDataLookupParams_For_Single_ProjectSearchId[] = [];

            for ( const updated_searchList_Entry of updated_searchList ) {
                const paramsForProjectSearchIds_Entry = paramsForProjectSearchIds_Map_Key_ProjectSearchId.get( updated_searchList_Entry.projectSearchId )
                if ( ! paramsForProjectSearchIds_Entry) {
                    const msg = "_changeSearches(...): paramsForProjectSearchIds_Map_Key_ProjectSearchId.get( updated_searchList_Entry.projectSearchId ) not return a value"
                    console.warn( msg )
                    throw Error( msg )
                }
                paramsForProjectSearchIdsListNew.push(paramsForProjectSearchIds_Entry)
            }

            paramsForProjectSearchIds.paramsForProjectSearchIdsList = paramsForProjectSearchIdsListNew
        }

        const promise = new Promise((resolve,reject) => {
            try {
                let requestObj = {
                    searchDataLookupParamsRoot,
                    sjklwuiowerzUIryhnIOWzq : true
                };

                const url = "d/rws/for-page/psb/get-search-data-lookup-params-code";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => { reject() }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        console.warn( "responseData.searchDataLookupParamsCode: ", responseData.searchDataLookupParamsCode )
                        console.warn( "responseData.searchDataLookupParamsRoot: ", responseData.searchDataLookupParamsRoot )

                        const searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
                        const searchDataLookupParamsRoot = responseData.searchDataLookupParamsRoot;

                        if ( ! searchDataLookupParamsCode ) {
                            const msg = "SearchDetailsAndFilterBlock_Re_Order_Searches.changeSearches(): No value for responseData.searchDataLookupParamsCode";
                            console.warn( msg );
                            reject( msg );
                        }

                        if ( ! searchDataLookupParamsRoot ) {
                            const msg = "SearchDetailsAndFilterBlock_Re_Order_Searches.changeSearches(): No value for responseData.searchDataLookupParamsRoot";
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

            const _parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();

            // Current URL contents
            const pageStatePartsFromURL = _parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

            let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

            let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                pageControllerPath,
                searchDataLookupParamsCode,
                pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
                pageStateString : pageStatePartsFromURL.pageStateString,
                referrer : pageStatePartsFromURL.referrer,
                experimentId : undefined
            } );

            //  TODO  Change to update the URL and then update all JS variables on page for updated list of searches,
            //          rather than load new page with new URL

            // Reload page with new URL

            window.location.href = newURL;

            // window.history.replaceState( null, null, newURL );
            //
            // navigation_dataPages_Maint_Instance.updateNavLinks();
            //
            //  !! MORE steps needed here to load data for added searches (Search names, Annotation Types, ...) !!
            //
            // this._dataUpdated_Callback();
        })
    }

}

/**
 *
 */
const _updateURL_withNew_searchDataLookupParamsCode = function( { searchDataLookupParamsCode_New, _parseURL_Into_PageStateParts } : {

    searchDataLookupParamsCode_New,
    _parseURL_Into_PageStateParts : ParseURL_Into_PageStateParts
} ) {

    // Current URL contents
    const pageStatePartsFromURL = _parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

    let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

    let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
        pageControllerPath,
        searchDataLookupParamsCode : searchDataLookupParamsCode_New,
        pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
        pageStateString : pageStatePartsFromURL.pageStateString,
        referrer : pageStatePartsFromURL.referrer,
        experimentId : undefined
    } );

    window.history.replaceState( null, null, newURL );

    navigation_dataPages_Maint_Instance.updateNavLinks();
}