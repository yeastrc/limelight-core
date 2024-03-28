/**
 * filtersDisplay_CommonDisplayContainer_Component.tsx
 *
 * used by XXX Page Filters Display Components for the actual display
 *
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


export interface Page_MainFiltersDisplay_CommonDisplayContainer_Component_Props {

    clearAllFiltersClickHandler: () => void
}

class Page_MainFiltersDisplay_CommonDisplayContainer_Component_State {

    _placeholder: any
}

/**
 *
 */
export class Page_MainFiltersDisplay_CommonDisplayContainer_Component extends React.Component< Page_MainFiltersDisplay_CommonDisplayContainer_Component_Props, Page_MainFiltersDisplay_CommonDisplayContainer_Component_State > {

    //  bind to 'this' for passing as parameters
    private _clearAllFiltersClickHandler_BindThis = this._clearAllFiltersClickHandler.bind(this);

    /**
     *
     */
    constructor(props : Page_MainFiltersDisplay_CommonDisplayContainer_Component_Props) {
        super(props);

        // this.state = {  };
    }

    /**
     *
     */
    _clearAllFiltersClickHandler( event : React.MouseEvent<HTMLSpanElement, MouseEvent> ) : void {

        // event.preventDefault();
        event.stopPropagation();

        if ( this.props.clearAllFiltersClickHandler ) {
            this.props.clearAllFiltersClickHandler();
        }
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {
        try {

            return (
                <React.Fragment>
                    <div className=" current-filters-label current-filters-label-and-display-block-common " style={ { height: "100%" } }>
                        <div className=" current-filters-label-inner-div ">
                            <span  style={ { fontWeight: "bold" } } >
                                Current filters:
                            </span>
                            <span> </span>
                            <span style={ { fontSize: 12, fontWeight: "normal" } } className="fake-link " onClick={ this._clearAllFiltersClickHandler_BindThis } >clear all</span>
                        </div>
                    </div>
                    <div className=" filter-common-selection-block  " >

                        <div >
                            <div
                                className=" current-filters-label-and-display-block-common "
                                style={ { display: "inline-block", paddingTop: 4, paddingBottom: 10, paddingLeft: 6, paddingRight: 6 } }
                            >

                                { this.props.children }

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );

        } catch( e ) {
            console.warn("Exception caught in render()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
