/**
 * set_ProjectWide_DefaultFilter_Cutoffs_Overrides.ts
 *
 * User enters Search Annotation default filter cutoffs that override the values from the imported file.
 *
 *    These are applied every time a search or searches are opened from the project page.
 *    These are applied every time a search is added to a new or existing experiment.
 *
 * Currently on Project Page - Opened from "
 *
 */


import {get_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__set_project_wide_default_filter_cutoffs_overrides/jsx/set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/**
 *
 */
export class Set_ProjectWide_DefaultFilter_Cutoffs_Overrides {

    private _initializeCalled = false;

    private _projectIdentifierFromURL: string;


    /**
     *
     */
    constructor(
        {
            projectIdentifierFromURL
        } : {
            projectIdentifierFromURL: string
        } ) {

        this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;


    }

    /**
     *
     */
    initialize() {

        this._initializeCalled = true;
    }

    /**
     *
     */
    openSet_ProjectWide_DefaultFilter_Cutoffs_Overrides() {

        let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

        const callbackOn_Cancel_Close_Clicked = () : void => {

            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
        }

        const overlayComponent = get_Set_ProjectWide_DefaultFilter_Cutoffs_Overrides__Overlay_Component({
            projectIdentifierFromURL : this._projectIdentifierFromURL,
            callbackOn_Cancel_Close_Clicked
        });

        overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });

    }

}
