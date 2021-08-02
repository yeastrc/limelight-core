/**
 * annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component.tsx
 *
 *  Annotation Types to Display (PSM, Peptide, ) :  Component for put fake link on main page for open Selection Overlay
 *
 */

import React from 'react'
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Params,
    open_AnnotationTypesToDisplay__SelectionOverlay
} from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__SelectionOverlay__Component";


/**
 *
 */
export interface AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component_Props {

    projectSearchIds: Array<number>
    searchDataLookupParameters_Root: SearchDataLookupParameters_Root  //  Existing values
    dataPageStateManager_DataFrom_Server : DataPageStateManager

    // callbackOn_Save_Clicked: ?????
}

/**
 *
 */
interface AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component_State {

    _placeholder: any
}

/**
 *
 */
export class AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component extends React.Component< AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component_Props, AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component_State > {

    private _openOverlay_ClickHandler_BindThis = this._openOverlay_ClickHandler.bind(this);

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    /**
     *
     */
    constructor(props: AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component_Props) {
        super(props);

        this.state = {
            _placeholder: {}
        };
    }

    /**
     *
     */
    private _openOverlay_ClickHandler ( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {
        try {
            event.stopPropagation();

            const params : AnnotationTypesToDisplay__SelectionOverlayComponent__Component_Params = {
                projectSearchIds: this.props.projectSearchIds,
                dataPageStateManager_DataFrom_Server : this.props.dataPageStateManager_DataFrom_Server,
                searchDataLookupParameters_Root: this.props.searchDataLookupParameters_Root
            }

            open_AnnotationTypesToDisplay__SelectionOverlay({
                params
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let found_PSM_AnnTypes = false;
        let found_Peptide_AnnTypes = false;

        for ( const searchDataLookupParameters_Single_ProjectSearchId of this.props.searchDataLookupParameters_Root.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

            if ( searchDataLookupParameters_Single_ProjectSearchId.psmAnnTypeDisplay && searchDataLookupParameters_Single_ProjectSearchId.psmAnnTypeDisplay.length > 0 ) {
                found_PSM_AnnTypes = true;
            }
            if ( searchDataLookupParameters_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay && searchDataLookupParameters_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay.length > 0 ) {
                found_Peptide_AnnTypes = true;
            }
        }

        let peptideLabel = "";
        let andLabel = "";
        let psmLabel = "";

        if ( found_Peptide_AnnTypes ) {
            peptideLabel = "Peptide";
        }
        if ( found_Peptide_AnnTypes && found_PSM_AnnTypes ) {
            andLabel = " and ";
        }
        if ( found_PSM_AnnTypes ) {
            psmLabel = "PSM";
        }

        const fakeLinkLabelText = "Change Displayed " + peptideLabel + andLabel + psmLabel + " data";

        return (
            <div>
                <span
                    className=" fake-link "
                    onClick={ this._openOverlay_ClickHandler_BindThis }
                >
                    { fakeLinkLabelText }
                </span>
            </div>
        );
    }
}
