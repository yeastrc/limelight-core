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
import {navigation_dataPages_Maint_Instance} from "page_js/data_pages/data_pages_common/navigation_data_pages_maint/navigation_dataPages_Maint";

import { newURL_Build_PerProjectSearchIds_Or_ExperimentId }  from 'page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId';
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {
    get_SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Layout,
    SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params,
    SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_ChangeSearches_OverlayLayout";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {currentProjectId_ProjectSearchId_Based_DataPages_FromDOM} from "page_js/data_pages/data_pages_common/currentProjectId_ProjectSearchId_Based_DataPages_FromDOM";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

import { sortSearchesOnDisplayOrder_OrDefaultOrder, sortSearchesOnDisplayOrder_OrDefaultOrder_SingleSearchList } from 'page_js/data_pages/data_pages_common/sortSearchesOnDisplayOrder_OrDefaultOrder';


/**
 *
 */
export class SearchDetailsAndFilterBlock_ChangeSearches {

    private _callbackOn_Cancel_Close_Clicked_BindThis = this._callbackOn_Cancel_Close_Clicked.bind(this)
    private _callback_updateSelected_Searches_BindThis = this._callback_updateSelected_Searches.bind(this)

    private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
    private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    private _dataUpdated_Callback

    private _searchList_ForUserSelection : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>;

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

        const promise_getSearchList = this._getSearchList();

        promise_getSearchList.catch((reason => {}))

        promise_getSearchList.then( ( searchList ) => {

            this._searchList_ForUserSelection = searchList;

            const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds( )

            const projectSearchIdsSet = new Set( projectSearchIds );

            const overlayComponent = get_SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Layout({
                searchList,
                projectSearchIds_Selected : projectSearchIdsSet,
                callback_updateSelected_Searches: this._callback_updateSelected_Searches_BindThis,
                callbackOn_Cancel_Close_Clicked : this._callbackOn_Cancel_Close_Clicked_BindThis
            })

            this._changeSearches_Overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
        })
    }

    /**
     *
     */
    _getSearchList() : Promise<Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>> {

        return new Promise ( ( resolve, reject ) => {
            try {

                let projectIdentifier = currentProjectId_ProjectSearchId_Based_DataPages_FromDOM();

                let requestObj = {
                    projectIdentifier: projectIdentifier
                };

                const url = "d/rws/for-page/project-view-page-search-list";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch(() => {
                });

                promise_webserviceCallStandardPost.then(({responseData}) => {
                    try {
                        const resultList = this._getSearchList_FromServerResponseData(responseData);

                        resolve( resultList );

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({
                            errorException: e
                        });
                        throw e;
                    }
                });
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException: e
                });
                throw e;
            }
        });
    }

    /**
     *
     */
    private _getSearchList_FromServerResponseData( responseData ) : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem> {

        const searchList_Result : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem> = [];

        const folderList = responseData.folderList;
        const searchesNotInFolders = responseData.searchesNotInFolders;
        const noSearchesFound = responseData.noSearchesFound;

        if (noSearchesFound) {
            return searchList_Result; // EARLY RETURN
        }


        sortSearchesOnDisplayOrder_OrDefaultOrder({ folderList, searchesNotInFolders }); // External Function


        if (folderList && folderList.length !== 0) {

            for (const folderItem of folderList) {

                const searchesInFolder = folderItem.searchesInFolder;

                if (searchesInFolder && searchesInFolder.length !== 0) {

                    if ( ! variable_is_type_number_Check( folderItem.id ) ) {
                        const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( folderItem.id ) ). folderItem.id: " + folderItem.id
                        console.warn( msg )
                        throw  Error( msg )
                    }
                    if ( ! limelight__IsVariableAString( folderItem.folderName ) ) {
                        const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! limelight__IsVariableAString( folderItem.folderName ) ). folderItem.folderName: " + folderItem.folderName
                        console.warn( msg )
                        throw  Error( msg )
                    }
                    //  Build Folder Entry and put incoming folder's searches into output folder's searches
                    const searchesInFolder_Result : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem> = [];
                    const searchList_Entry = new SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem({
                        projectSearchId : undefined,
                        searchId : undefined,
                        searchName : undefined,
                        folderId : folderItem.id,
                        folderName : folderItem.folderName,
                        searchesInFolder : searchesInFolder_Result
                    })

                    searchList_Result.push( searchList_Entry );

                    this._getSearchList_FromServerResponseData_SpecificListOfSearches(searchesInFolder, searchesInFolder_Result);
                }
            }
        }

        if (searchesNotInFolders && searchesNotInFolders.length !== 0) {
            this._getSearchList_FromServerResponseData_SpecificListOfSearches(searchesNotInFolders, searchList_Result);
        }

        return searchList_Result;
    }

    /**
     *
     */
    private _getSearchList_FromServerResponseData_SpecificListOfSearches( searchList, searchList_Result : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem> ) : void {

        for (const searchItem of searchList) {

            if ( ! variable_is_type_number_Check( searchItem.projectSearchId ) ) {
                const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( searchItem.projectSearchId ) ). searchItem.projectSearchId: " + searchItem.projectSearchId
                console.warn( msg )
                throw  Error( msg )
            }
            if ( ! variable_is_type_number_Check( searchItem.searchId ) ) {
                const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! variable_is_type_number_Check( searchItem.searchId ) ). searchItem.searchId: " + searchItem.searchId
                console.warn( msg )
                throw  Error( msg )
            }
            if ( ! limelight__IsVariableAString( searchItem.name ) ) {
                const msg = "_getSearchList_FromServerResponseData_SpecificListOfSearches: ( ! limelight__IsVariableAString( searchItem.name ) ). searchItem.name: " + searchItem.name
                console.warn( msg )
                throw  Error( msg )
            }
            const searchList_Entry = new SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem({
                projectSearchId : searchItem.projectSearchId,
                searchId : searchItem.searchId,
                searchName : searchItem.name,
                folderId : undefined,
                folderName : undefined,
                searchesInFolder : undefined
            })
            searchList_Result.push( searchList_Entry );
        }
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
    _callback_updateSelected_Searches( params : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) : void {

        this._changeSearches( params.updated_selected_ProjectSearchIds );
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
    private _changeSearches( updated_selected_ProjectSearchIds : Set<number> ) {

        const projectSearchIds = this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds()

        let projectSearchIds_Changed = false;

        let projectSearchIds_Additions : Set<number> = new Set();
        let projectSearchIds_Removals : Set<number> = new Set();

        {
            const updated_selected_ProjectSearchIds_Copy = new Set( updated_selected_ProjectSearchIds );
            for ( const projectSearchId of projectSearchIds ) {
                if ( ! (  updated_selected_ProjectSearchIds_Copy.delete( projectSearchId ) ) ) {
                    //  Found Deletion
                    projectSearchIds_Removals.add( projectSearchId );

                    projectSearchIds_Changed = true;
                }
            }
            if ( updated_selected_ProjectSearchIds_Copy.size > 0 ) {
                // All entries left in updated_selected_ProjectSearchIds_Copy are Project Search Ids to Add
                projectSearchIds_Additions = updated_selected_ProjectSearchIds_Copy;

                projectSearchIds_Changed = true;
            }
        }

        if ( ! projectSearchIds_Changed ) {

            //  NO Changes so EXIT after closing Overlay

            //  ONLY run if updated_selected_ProjectSearchIds is NOT CHANGED from projectSearchIds since when changed will take browser to new URL
            this._remove_ModalOverlay();

            return; // EARLY RETURN
        }

        //  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
        //  An array in the same order as projectSearchIds
        // let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        let searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
            this._searchDetailsBlockDataMgmtProcessing.
            getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });

        let paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;

        if ( ! searchDataLookupParamsRoot ) {
            throw Error( "searchDataLookupParamsRoot not found" );
        }

        //  entries should be sorted on search id ascending
        let projectSearchIds_Additions_Final_Ordered : Array<number>  = undefined;

        if ( projectSearchIds_Additions.size > 0 ) {

            projectSearchIds_Additions_Final_Ordered = [];

            const searchesAdditions : Array<SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem> = [];

            for ( const searchList_ForUserSelectionEntry of this._searchList_ForUserSelection ) {

                if ( searchList_ForUserSelectionEntry.projectSearchId !== undefined ) {
                    if (projectSearchIds_Additions.has(searchList_ForUserSelectionEntry.projectSearchId)) {
                        searchesAdditions.push(searchList_ForUserSelectionEntry);
                    }
                } else {
                    //  Folder Entry
                    if ( searchList_ForUserSelectionEntry.searchesInFolder === undefined ) {
                        const msg = "_changeSearches(...): False 'searchList_ForUserSelectionEntry.projectSearchId !== undefined' and true 'searchList_ForUserSelectionEntry.searchesInFolder === undefined'";
                        console.warn( msg );
                        throw Error( msg )
                    }
                    for ( const searchInFolder of searchList_ForUserSelectionEntry.searchesInFolder ) {
                        if (projectSearchIds_Additions.has(searchInFolder.projectSearchId)) {
                            searchesAdditions.push(searchInFolder);
                        }
                    }
                }
            }

            //  Sort on search id
            searchesAdditions.sort(function(a, b) {
                if (a.searchId < b.searchId) {
                    return -1;
                }
                if (a.searchId > b.searchId) {
                    return 1;
                }
                return 0;
            })

            for ( const searchesAdditionEntry of searchesAdditions ) {

                projectSearchIds_Additions_Final_Ordered.push( searchesAdditionEntry.projectSearchId );
            }

            if ( projectSearchIds_Additions_Final_Ordered.length === 0 ) {
                const msg = "_changeSearches(...): projectSearchIds_Additions_Final_Ordered.length === 0 When projectSearchIds_Additions.size > 0";
                console.warn( msg );
                throw Error( msg )
            }
        }

        //  Not needed until update existing page
        // this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.set_projectSearchIds( projectSearchIds_Additions_Final_Ordered  )

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

        const promise = new Promise((resolve,reject) => {
            try {
                const requestObj = {
                    projectSearchIds_CreateDefault : projectSearchIds_Additions_Final_Ordered,
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