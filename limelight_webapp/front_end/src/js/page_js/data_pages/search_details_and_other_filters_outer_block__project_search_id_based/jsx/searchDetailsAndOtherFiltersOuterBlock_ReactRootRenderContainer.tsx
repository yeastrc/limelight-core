/**
 * searchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer.tsx
 *
 * Container for SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer when rendered directly into a DOM element
 *
 * This is added as outer container so it will provide React Error Boundary
 */


import React from 'react'

/**
 *
 */
export interface SearchDetailsAndOtherFiltersOuterBlock_ReactRootRenderContainer_Props {

    readonly children: React.ReactNode
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

        this.state = {
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
