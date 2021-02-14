/**
 * search_sub_group__manage__group_names__open_overlay__pass__project_search_id.ts
 *
 * Change Group Names, Open Overlay
 *
 */


import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    get_SearchSubGroup_Manage_GroupNames_Overlay_Layout,
    SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object,
    SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback,
    SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params
} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/jsx/searchSubGroup_Manage_GroupNames_OverlayComponent";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


export class SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params {

    updatedSubGroups : ReadonlyArray<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object>
}

/**
 *
 */
export type SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback = ( params : SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params ) => void ;

/**
 *
 */
export const searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId = function (
    {
        projectSearchId,
        searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback
    } : {
        projectSearchId : number
        searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback : SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback
    }) : void {

    const projectSearchIds = [ projectSearchId ];

    const promise = _retrieveSearchNamesAndSubGroupsFromAJAX({ projectSearchIds })

    promise.catch( reason => {
        throw Error("AJAX Failed")
    } )

    promise.then( (data) => {

        const subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = _create_SubGroupDisplayListObjects({ data, projectSearchId });

        let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

        const callbackOn_Cancel_Close_Clicked = () : void => {

            limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
        }

        const callbackOn_Update : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback = ( params : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params ) : void => {

            // console.warn( "In searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId:callbackOn_Update   params: ", params );

            if ( searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback ) {

                limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

                const searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params : SearchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params = {
                    updatedSubGroups : params.updatedSubGroups
                };

                searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback( searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_ProjectSearchId_UpdateCallback_Params );

            } else {
                window.location.reload( true );
            }
        }

        const overlayComponent = get_SearchSubGroup_Manage_GroupNames_Overlay_Layout({
            subGroup_Display_ObjectList,
            projectSearchId,
            callbackOn_Cancel_Close_Clicked,
            callbackOn_Update
        })

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

    })

}

/**
 * Getting the Searches Details from the server
 *
 * @param projectSearchIds - array of projectSearchIds to get data for
 */
const _retrieveSearchNamesAndSubGroupsFromAJAX = function ({ projectSearchIds } : {
    projectSearchIds: Array<number>
}) : Promise<any> {

    let retrieval = (resolve: any, reject: any) => {
        try {
            let requestObj = {projectSearchIds};

            const url = "d/rws/for-page/psb/search-name-list-from-psi";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch(() => {
                try {
                    reject();
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });

            promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => {
                try {
                    resolve( responseData );

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }

            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

    return new Promise(retrieval);
}


/**
 *  Create Sub Group Objects for display to user
 */
const _create_SubGroupDisplayListObjects = function ({ data, projectSearchId } : {

    data: any // From Server
    projectSearchId : number

}) : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> {

    const subGroup_Display_ObjectList_Result : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = [];

    const searchSubGroupsPerSearchList = data.searchSubGroupsPerSearchList;
    if ( ! searchSubGroupsPerSearchList ) {
        throw Error("searchSubGroupsPerSearchList Not Found");
    }
    if ( ! ( searchSubGroupsPerSearchList.length > 0 ) ) {
        throw Error("searchSubGroupsPerSearchList Not Array or is empty");
    }
    const searchSubGroupsPerSearch = searchSubGroupsPerSearchList[ 0 ];
    const searchSubgroupItems = searchSubGroupsPerSearch.searchSubgroupItems;
    if ( ! searchSubgroupItems ) {
        throw Error("searchSubgroupItems Not Found");
    }
    if ( ! ( searchSubgroupItems.length > 0 ) ) {
        throw Error("searchSubgroupItems Not Array or is empty");
    }

    for ( const searchSubGroup of searchSubgroupItems ) {

        const subGroup_Display_Object_Entry = new SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object({
            id : searchSubGroup.searchSubGroupId,
            displayName : searchSubGroup.subgroupName_Display,
            importedName : searchSubGroup.subgroupName_fromImportFile
        });

        subGroup_Display_ObjectList_Result.push( subGroup_Display_Object_Entry );
    }

    return subGroup_Display_ObjectList_Result;
}

