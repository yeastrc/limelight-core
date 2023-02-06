/**
 * searchDetailsAndFilterBlock_ChangeSearches.ts
 *
 * Javascript for Searches Maint on Data Pages
 *
 * Change Searches
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

import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from 'page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId';
import {
    get_SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Layout,
    SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_ChangeSearches_OverlayLayout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {currentProjectId_ProjectSearchId_Based_DataPages_FromDOM} from "page_js/data_pages/data_pages_common/currentProjectId_ProjectSearchId_Based_DataPages_FromDOM";

import {get_SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_Layout} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout";


/**
 *
 */
export class SearchDetailsAndFilterBlock_ChangeSearches {

    private _callbackOn_Cancel_Close_Clicked_BindThis = this._callbackOn_Cancel_Close_Clicked.bind(this)
    private _callback_updateSelected_Searches_BindThis = this._callback_updateSelected_Searches.bind(this)

    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
    private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    private _dataUpdated_Callback

    private _changeSearches_Overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    /**
     *
     */
    constructor({ dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, searchDetailsBlockDataMgmtProcessing, dataUpdated_Callback } : {

        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
        searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        dataUpdated_Callback
    }) {
        this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
        this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        this._dataUpdated_Callback = dataUpdated_Callback;
    }

    /**
     *
     */
    open_ChangeSearches_Overlay(  ) {

        const projectIdentifier : string = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM();

        const projectSearchIds_Selected = Array.from( this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds() )

        const overlayComponent = get_SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Layout({
            projectIdentifier,
            projectSearchIds_Selected,
            callback_updateSelected_Searches: this._callback_updateSelected_Searches_BindThis,
            callbackOn_Cancel_Close_Clicked : this._callbackOn_Cancel_Close_Clicked_BindThis
        })

        this._changeSearches_Overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
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
    _remove_ModalOverlay() {

        if ( this._changeSearches_Overlay_AddedTo_DocumentBody_Holder ) {

            this._changeSearches_Overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

            this._changeSearches_Overlay_AddedTo_DocumentBody_Holder = undefined;
        }
    }

    /**
     *
     */
    _callback_updateSelected_Searches( params : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) : void {

        const updated_selected_ProjectSearchIds__Object = params.updated_selected_ProjectSearchIds__Object;

        if ( ! updated_selected_ProjectSearchIds__Object ) {

            //  NO Changes so EXIT after closing Overlay

            this._remove_ModalOverlay();

            return; // EARLY RETURN
        }


        const projectSearchIds__All_CurrentDisplay = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()

        const projectSearchIds_Removals : Set<number> = new Set();

        {
            const updated_selected_ProjectSearchIds_Copy = new Set( updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_IterableIterator() );
            for ( const projectSearchId of projectSearchIds__All_CurrentDisplay ) {
                if ( ! (  updated_selected_ProjectSearchIds_Copy.delete( projectSearchId ) ) ) {
                    //  Found Deletion
                    projectSearchIds_Removals.add( projectSearchId );
                }
            }
        }

        if ( projectSearchIds_Removals.size === 0 && updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder().length === 0 ) {

            //  NO Changes so EXIT after closing Overlay

            //  ONLY run if updated_selected_ProjectSearchIds is NOT CHANGED from projectSearchIds since when changed will take browser to new URL
            this._remove_ModalOverlay();

            return; // EARLY RETURN
        }

        ///////////////

        this._remove_ModalOverlay();

        //  Show Updating Message

        {
            const overlayComponent = get_SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_Layout({});

            //  If change to NOT go to New URL, store the returned object and click the 'remove' method on it
            limelight_add_ReactComponent_JSX_Element_To_DocumentBody({componentToAdd: overlayComponent});
        }

        ///////////////

        //  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
        //  An array in the same order as projectSearchIds
        // let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        let searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
            this._searchDetailsBlockDataMgmtProcessing.
            getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

        if ( ! searchDataLookupParamsRoot ) {
            throw Error( "searchDataLookupParamsRoot not found" );
        }

        const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;

        // Remove removed project search ids from searchDataLookupParamsRoot

        if ( projectSearchIds_Removals.size > 0 ) {

            const paramsForProjectSearchIdsListNew : SearchDataLookupParams_For_Single_ProjectSearchId[] = [];

            for ( const paramsForProjectSearchIdEntry of paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                if ( ! projectSearchIds_Removals.has( paramsForProjectSearchIdEntry.projectSearchId ) ) {
                    paramsForProjectSearchIdsListNew.push( paramsForProjectSearchIdEntry )
                }
            }

            if ( paramsForProjectSearchIdsListNew.length > 0 ) {

                paramsForProjectSearchIds.paramsForProjectSearchIdsList = paramsForProjectSearchIdsListNew
            } else {
                //  All Existing Searches removed so remove
                searchDataLookupParamsRoot = undefined
            }
        }

        let projectSearchIds_CreateDefault: ReadonlyArray<number>
        if ( updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder().length > 0 ) {
            projectSearchIds_CreateDefault = updated_selected_ProjectSearchIds__Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder()
        }

        const promise = new Promise((resolve,reject) => {
            try {
                const requestObj = {
                    projectSearchIds_CreateDefault,
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

            //  Remove "Updating" overlay displayed in this method if NO LONGER use window.location.href to change to new page


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

// /**
//  *
//  */
// const _updateURL_withNew_searchDataLookupParamsCode = function( { searchDataLookupParamsCode_New, _parseURL_Into_PageStateParts } : {
//
//     searchDataLookupParamsCode_New,
//     _parseURL_Into_PageStateParts : ParseURL_Into_PageStateParts
// } ) {
//
//     // Current URL contents
//     const pageStatePartsFromURL = _parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();
//
//     let pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
//
//     let newURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
//         pageControllerPath,
//         searchDataLookupParamsCode : searchDataLookupParamsCode_New,
//         pageStateIdentifier : pageStatePartsFromURL.pageStateIdentifier,
//         pageStateString : pageStatePartsFromURL.pageStateString,
//         referrer : pageStatePartsFromURL.referrer,
//         experimentId : undefined
//     } );
//
//     window.history.replaceState( null, null, newURL );
//
//     navigation_dataPages_Maint_Instance.updateNavLinks();
// }