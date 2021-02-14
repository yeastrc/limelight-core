/**
 * psm_list_view_spectrum_cell_ExternalComponent.tsx
 * 
 * Cell in PSM List for "View Spectrum"
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { SpectrumRetrieveAndDisplay_Use_lorikeet } from 'page_js/data_pages/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet';
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";



/**
 * 
 */
export interface PsmList_ViewSpectrumCell_ExternalReactComponent_Props {

    cellMgmt_ExternalReactComponent_Data : {
        psmId : number
        projectSearchId : number
        openModPosition : OpenModPosition_DataType
    }
}



/**
 * 
 */
export class PsmList_ViewSpectrumCell_ExternalReactComponent extends React.Component< PsmList_ViewSpectrumCell_ExternalReactComponent_Props, {} > {

    private _viewSpectrumFakeLinkClicked_BindThis = this._viewSpectrumFakeLinkClicked.bind(this);

    /**
     * 
     */
    constructor(props : PsmList_ViewSpectrumCell_ExternalReactComponent_Props) {
        super(props);

        this.state = {};
    }

    /**
     * 
     */
    _viewSpectrumFakeLinkClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) : void {
      try {
  
        event.preventDefault();   //  Prevent Default Action of event
        event.stopPropagation();  // Stop bubbling of event
  
        //  Comment out since breaks the Shift Key to sort on additional columns.
        //     Shift Click is causing a text selection from the previous click to the current click
  
        //  Using selectionObj.removeAllRanges();  sometimes works but not well enough to not be frustrating to the user
  
        try { // In try/catch block in case not supported in browser
          const selectionObj = window.getSelection();
          const selection = selectionObj.toString()
          if ( selection ) {
             //  Found a Selection so exit with no further action
            return; //  EARLY RETURN
          }
  
          selectionObj.removeAllRanges();
  
          var znothing = 0;
  
        } catch (e) {
          //  Eat exception
          const znothing = 0;
        }
   
        const projectSearchId = this.props.cellMgmt_ExternalReactComponent_Data.projectSearchId;
        const psmId = this.props.cellMgmt_ExternalReactComponent_Data.psmId;
        const openModPosition = this.props.cellMgmt_ExternalReactComponent_Data.openModPosition;

        
        const spectrumRetrieveAndDisplay_Use_lorikeet = new SpectrumRetrieveAndDisplay_Use_lorikeet(); // Params not used in constructor

        spectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow( { 
          psmId, projectSearchId, openModPosition
        } );

  
      } catch( e ) {
        console.warn( "Error in DataTable_Table_HeaderRowEntry._viewSpectrumFakeLinkClicked: ", e )
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
      }
    }
  

    render() {

        return (
            // <div style={ { width: "100%", backgroundColor: "orange"}} >
            <span className="table-data-cell-property-value fake-link"
                onClick={ this._viewSpectrumFakeLinkClicked_BindThis }
            >
                View Scan
            </span>
            // </div>
        );
    }
}

