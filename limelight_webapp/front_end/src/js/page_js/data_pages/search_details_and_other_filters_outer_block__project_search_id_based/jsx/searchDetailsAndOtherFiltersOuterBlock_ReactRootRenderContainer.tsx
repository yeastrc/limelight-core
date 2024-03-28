/**
 * searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer.tsx
 *
 * Container for SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer when rendered directly into a DOM element
 *
 * This is added as outer container so it will provide React Error Boundary
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import {
    SearchDetailsAndOtherFiltersOuterBlock_Layout,
    SearchDetailsAndOtherFiltersOuterBlock_Layout_Props
} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";


/**
 *
 */
export interface SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Props {

    // placeholder?
}

/**
 *
 */
interface SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_State {

    component_SubTree_Has_Error? : boolean
}

/**
 *
 */
export class SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer extends React.Component< SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Props, SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_State > {

    /**
     *
     */
    constructor(props : SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Props) {
        super(props);

        // this._view_single_protein_inner_overlay_div_Ref = React.createRef<HTMLDivElement>();
        // this._view_single_protein_overlay_body_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            // proteinPage_Display_SingleSearch_SingleProtein_MainContent_Component_Props_Prop : null
        };
    }

    /**
     *
     */
    static getDerivedStateFromError( error : any ) : SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_State {
        // Update state so the next render will show the fallback UI.
        return { component_SubTree_Has_Error: true };
    }

    /**
     *
     */
    componentDidCatch( error : any, errorInfo : any ) {
        // You can also log the error to an error reporting service

        console.warn("react Component 'SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer'. componentDidCatch: ", error, errorInfo );
        // logErrorToMyService(error, errorInfo);
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let component_SubTree_ErrorMessage : JSX.Element = undefined;
        let mainContent : JSX.Element = undefined;

        if ( this.state.component_SubTree_Has_Error ) {

            component_SubTree_ErrorMessage = (
                <div className={ " error-text " } >An Error has Occurred.  Please reload the page and try again.</div>
            );
        } else {
            mainContent = (
                <React.Fragment>
                    { this.props.children }
                </React.Fragment>
            )
        }

        //  Display error message or display children

        return (
            ( component_SubTree_ErrorMessage ? (
                    component_SubTree_ErrorMessage
                ) : (
                    mainContent
                )
                )
        );
    }


}
