/**
 * searchSubGroup_Manage_GroupNames_OpenOverlay.ts
 *
 * Change Group Names, Open Overlay
 *
 */




import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
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

/**
 *
 */
export const searchSubGroup_Manage_GroupNames_OpenOverlay_Pass_DataPageStateManager_ProjectSearchId = function (
    {
        dataPageStateManager_DataFrom_Server,
        projectSearchId
    } : {
        dataPageStateManager_DataFrom_Server: DataPageStateManager
        projectSearchId : number
    }) : void {

    const subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = _create_SubGroupDisplayListObjects({ dataPageStateManager_DataFrom_Server, projectSearchId });

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const callbackOn_Update : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback = ( params : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params ) : void => {

        window.location.reload( true );
    }


    const overlayComponent = get_SearchSubGroup_Manage_GroupNames_Overlay_Layout({
        subGroup_Display_ObjectList,
        projectSearchId,
        callbackOn_Cancel_Close_Clicked,
        callbackOn_Update
    })

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}


/**
 *  Create Sub Group Objects for display to user
 */
const _create_SubGroupDisplayListObjects = function ({ dataPageStateManager_DataFrom_Server, projectSearchId } : {

    dataPageStateManager_DataFrom_Server: DataPageStateManager
    projectSearchId : number

}) : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> {

    const subGroup_Display_ObjectList_Result : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = [];

    const searchSubGroups_Root = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
    if ( ! searchSubGroups_Root ) {
        const msg = "dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() returned nothing"
        console.warn( msg )
        throw Error( msg )
    }

    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
    if ( ! searchSubGroups_ForProjectSearchId ) {
        const msg = "dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }


    for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

        const subGroup_Display_Object_Entry = new SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object({
            id : searchSubGroup.searchSubGroup_Id,
            displayName : searchSubGroup.subgroupName_Display,
            importedName : searchSubGroup.searchSubgroupName_fromImportFile
        });

        subGroup_Display_ObjectList_Result.push( subGroup_Display_Object_Entry );
    }

    return subGroup_Display_ObjectList_Result;
}

