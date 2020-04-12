/**
 * limelight_add_ReactComponent_JSX_Element_To_DocumentBody.ts
 *
 * Accept a React Component and Insert it into <div> attached to <body>
 *
 *
 */


import ReactDOM from "react-dom";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 * Creates the tooltip and returns object of class tooltip_Limelight_Create_Tooltip
 *
 * @param componentToAdd - JSX Element to add
 *
 * @returns object of class Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder
 */
export const limelight_add_ReactComponent_JSX_Element_To_DocumentBody = function({ componentToAdd } : {

    componentToAdd : JSX.Element

}) : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder {

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
 * class returned from tooltip_Limelight_Create_Tooltip
 *
 */
export class Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder {

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
                    // console.log("removeTooltip(): cleanupCallback() called " );

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
            // @ts-ignore comment suppresses all errors in following line.
            if ( window.requestIdleCallback ) {
                try {
                    //  Not in all browsers: window.requestIdleCallback
                    //  window.requestIdleCallback not in Typescript declaration since is experimental
                    // @ts-ignore comment suppresses all errors in following line.
                    window.requestIdleCallback( cleanupCallback );

                } catch ( e ) {
                    //  fall back to window.setTimeout
                    // console.log("removeTooltip(): Exception caught: Falling back to calling window.setTimeout( cleanupCallback, 1000 ); e: ", e );
                    window.setTimeout( cleanupCallback, 1000 );
                }
            } else {
                //  fall back to window.setTimeout
                // console.log("removeTooltip(): No value for window.requestIdleCallback: Falling back to calling window.setTimeout( cleanupCallback, 1000 );" );
                window.setTimeout( cleanupCallback, 1000 );
            }

        } catch( e ) {
            console.warn("class Tooltip_Limelight_Created_Tooltip::removeTooltip: Exception: ", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
