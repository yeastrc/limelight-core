/**
 * limelight_add_ReactComponent_JSX_Element_To_DocumentBody.ts
 *
 * Accept a React Component and Insert it into <div> attached to <body>
 *
 *
 */

import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


/**
 *
 * @param componentToAdd
 */
export const limelight_add_ReactComponent_JSX_Element_To_DocumentBody = function({ componentToAdd } : {

    componentToAdd : React.JSX.Element

}) : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    const addedDivElementDOM = document.createElement("div");

    const documentBody = document.querySelector('body');

    documentBody.appendChild( addedDivElementDOM );

    // console.log( "limelight_add_ReactComponent_JSX_Element_To_DocumentBody: this._tooltip_addedDivElementDOM:" );
    // console.log( this._tooltip_addedDivElementDOM );


    const reactRoot_InDOMElement = createRoot_ReactDOM_Client( addedDivElementDOM )

    reactRoot_InDOMElement.render( componentToAdd )

    const result = new Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF({
        addedDivElementDOM, reactRoot_InDOMElement
    });

    return result;
}


/**
 * class returned from limelight_add_ReactComponent_JSX_Element_To_DocumentBody
 *
 * Leave it named 'Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF' to reduce code churn
 */
export class Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    private _addedDivElementDOM : HTMLElement
    private _reactRoot_InDOMElement: Root_ReactDOM_Client

    constructor(
        {
            addedDivElementDOM, reactRoot_InDOMElement
        } : {
            addedDivElementDOM : HTMLElement
            reactRoot_InDOMElement: Root_ReactDOM_Client
        }) {

        this._addedDivElementDOM = addedDivElementDOM;
        this._reactRoot_InDOMElement = reactRoot_InDOMElement
    }

    /**
     * Remove the React Component contained by the this._addedDivElementDOM
     *
     */
    removeContents_AndContainer_FromDOM(): void {

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

                    this._reactRoot_InDOMElement.unmount()

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
