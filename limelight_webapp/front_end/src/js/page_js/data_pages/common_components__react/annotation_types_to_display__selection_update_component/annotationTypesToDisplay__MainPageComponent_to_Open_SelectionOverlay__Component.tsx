/**
 * annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component.tsx
 *
 *  Annotation Types to Display (PSM, Peptide, ) :  Component for put fake link on main page for open Selection Overlay
 *
 */

import React from 'react'
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
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

    fakeLinkLabelText: string
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


        let found_PSM_AnnTypes = false;
        let found_Peptide_AnnTypes = false;
        let found_Protein_AnnTypes = false;

        for ( const annotationTypeItems_For_ProjectSearchId of this.props.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.values() ) {

            if ( ( annotationTypeItems_For_ProjectSearchId.psmFilterableAnnotationTypes && annotationTypeItems_For_ProjectSearchId.psmFilterableAnnotationTypes.size > 0 )
                ||  ( annotationTypeItems_For_ProjectSearchId.psmDescriptiveAnnotationTypes && annotationTypeItems_For_ProjectSearchId.psmDescriptiveAnnotationTypes.size > 0 ) ) {

                found_PSM_AnnTypes = true
            }
            if ( ( annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes && annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes.size > 0 )
                ||  ( annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes && annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes.size > 0 ) ) {

                found_Peptide_AnnTypes = true
            }
            if ( ( annotationTypeItems_For_ProjectSearchId.matchedProteinFilterableAnnotationTypes && annotationTypeItems_For_ProjectSearchId.matchedProteinFilterableAnnotationTypes.size > 0 )
                ||  ( annotationTypeItems_For_ProjectSearchId.matchedProteinDescriptiveAnnotationTypes && annotationTypeItems_For_ProjectSearchId.matchedProteinDescriptiveAnnotationTypes.size > 0 ) ) {

                found_Protein_AnnTypes = true
            }
        }


        const labelTypeStrings: Array<string> = []

        if ( found_PSM_AnnTypes ) {
            labelTypeStrings.push( "PSM" )
        }
        if ( found_Peptide_AnnTypes ) {
            labelTypeStrings.push( "Peptide" )
        }
        if ( found_Protein_AnnTypes ) {
            labelTypeStrings.push( "Protein" )
        }

        let fakeLinkLabelText: string

        if ( labelTypeStrings.length > 0 ) {

            fakeLinkLabelText = "Change Displayed " + labelTypeStrings.join( " and " ) + " data";
        }

        this.state = {
            fakeLinkLabelText
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

        if ( ! this.state.fakeLinkLabelText ) {
            //  Nothing so render nothing
            return null
        }

        return (
            <div>
                <span
                    className=" fake-link "
                    onClick={ this._openOverlay_ClickHandler_BindThis }
                >
                    { this.state.fakeLinkLabelText }
                </span>
            </div>
        );
    }
}
