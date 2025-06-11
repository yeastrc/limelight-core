/**
 * limelight_add_ReactComponent_JSX_Element_To_DocumentBody.ts
 *
 * Accept a React Component and Insert it into <div> attached to <body>
 *
 *
 */


import ReactDOM from "react-dom";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

/**
 *
 * @param componentToAdd
 */
export const limelight_add_ReactComponent_JSX_Element_To_DocumentBody = function({ componentToAdd } : {

    componentToAdd : JSX.Element

}) : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    const addedDivElementDOM = document.createElement("div");

    const documentBody = document.querySelector('body');

    documentBody.appendChild( addedDivElementDOM );

    // console.log( "mainCellMouseEnter: this._tooltip_addedDivElementDOM:" );
    // console.log( this._tooltip_addedDivElementDOM );

    const renderCompletecallbackFcn = ( ) => { };

    const renderedReactComponent = ReactDOM.render(
        componentToAdd,
        addedDivElementDOM,
        renderCompletecallbackFcn
    );

    const result = new Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder({ addedDivElementDOM: addedDivElementDOM });

    return result;
}


/**
 * interface of class returned from limelight_add_ReactComponent_JSX_Element_To_DocumentBody
 *
 */
export interface Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    /**
     * Remove the React Component / JSX Element  rendered on page by limelight_add_ReactComponent_JSX_Element_To_DocumentBody
     *
     */
    removeContents_AndContainer_FromDOM();
}

/**
 *
 */
class Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder implements Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    private _addedDivElementDOM : HTMLElement

    constructor({ addedDivElementDOM } : { addedDivElementDOM : HTMLElement }) {
        this._addedDivElementDOM = addedDivElementDOM;
    }

    /**
     * Remove the React Component contained by the this._addedDivElementDOM
     *
     */
    removeContents_AndContainer_FromDOM() {

        if ( ! this._addedDivElementDOM ) {
            // Nothing to remove

            return; // EARLY RETURN
        }

        try {

            const addedDivElementDOM_Local = this._addedDivElementDOM;

            this._addedDivElementDOM = undefined;

            addedDivElementDOM_Local.style.display = "none"; // Hide from view

            //  Defer Removal from DOM so can draw anything else immediately as needed

            const cleanupCallback = () => {
                try {
                    // console.log("removeContents_AndContainer_FromDOM(): cleanupCallback() called " );

                    //  React Unmount

                    ReactDOM.unmountComponentAtNode( addedDivElementDOM_Local );

                    //  Remove containing <div> from DOM

                    addedDivElementDOM_Local.remove();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }

            //  Not in all browsers: window.requestIdleCallback
            //  window.requestIdleCallback not in Typescript declaration since is experimental
            if ( window.requestIdleCallback ) {
                try {
                    //  Not in all browsers: window.requestIdleCallback
                    //  window.requestIdleCallback not in Typescript declaration since is experimental
                    window.requestIdleCallback( cleanupCallback );

                } catch ( e ) {
                    //  fall back to window.setTimeout
                    // console.log("removeContents_AndContainer_FromDOM(): Exception caught: Falling back to calling window.setTimeout( cleanupCallback, 1000 ); e: ", e );
                    window.setTimeout( cleanupCallback, 1000 );
                }
            } else {
                //  fall back to window.setTimeout
                // console.log("removeContents_AndContainer_FromDOM(): No value for window.requestIdleCallback: Falling back to calling window.setTimeout( cleanupCallback, 1000 );" );
                window.setTimeout( cleanupCallback, 1000 );
            }

        } catch( e ) {
            console.warn("class Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder::removeContents_AndContainer_FromDOM: Exception: ", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
