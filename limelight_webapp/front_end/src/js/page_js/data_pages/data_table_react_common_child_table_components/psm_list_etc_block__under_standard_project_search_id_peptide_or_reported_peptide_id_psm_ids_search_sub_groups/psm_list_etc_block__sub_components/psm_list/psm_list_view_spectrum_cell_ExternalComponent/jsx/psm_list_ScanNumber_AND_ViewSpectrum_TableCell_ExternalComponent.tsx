/**
 * psm_list_ScanNumber_AND_ViewSpectrum_TableCell_ExternalComponent.tsx
 *
 * Cell in PSM List for Scan Number and  "View" link that opens Spectrum Viewer (Lorikeet)
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { SpectrumRetrieveAndDisplay_Use_lorikeet } from 'page_js/data_pages/data_pages_subparts_other/spectrumRetrieveAndDisplay_Use_lorikeet';
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";



export const get_PsmList_ScanNumber_AND_ViewSpectrum_TableCell_ExternalReactComponent = function (
    inputParams: Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_InputParams) : JSX.Element {

    return (
        <Internal__PsmList_ViewSpectrumCell_ExternalReactComponent
            inputParams={ inputParams }
        />
    )
}

/**
 *
 */
interface Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_InputParams {

    scanNumber: number
    searchHasScanData: boolean
    psmId : number
    projectSearchId : number
    openModPosition : OpenModPosition_DataType

    // Maybe null or undefined
    scanPeaks_That_PassFilters_Array__For_PsmId: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>
}

/**
 *
 */
interface Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props {

    inputParams: Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_InputParams
}

interface Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_State {

    _placeholder: unknown
}

/**
 *
 */
class Internal__PsmList_ViewSpectrumCell_ExternalReactComponent extends React.Component< Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props, Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_State > {

    private _viewSpectrumFakeLinkClicked_BindThis = this._viewSpectrumFakeLinkClicked.bind(this);

    /**
     *
     */
    constructor(props : Internal__PsmList_ViewSpectrumCell_ExternalReactComponent_Props) {
        super(props);

        this.state = { _placeholder : null };
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

            let scanPeaks_MZ_That_PassFilters_Array__For_PsmId: Array<number> = undefined

            if ( this.props.inputParams.scanPeaks_That_PassFilters_Array__For_PsmId ) {
                scanPeaks_MZ_That_PassFilters_Array__For_PsmId = []
                for ( const scanPeaks__Entry of this.props.inputParams.scanPeaks_That_PassFilters_Array__For_PsmId ) {
                    scanPeaks_MZ_That_PassFilters_Array__For_PsmId.push( scanPeaks__Entry.mz )
                }
            }

            const spectrumRetrieveAndDisplay_Use_lorikeet = new SpectrumRetrieveAndDisplay_Use_lorikeet(); // Params not used in constructor

            spectrumRetrieveAndDisplay_Use_lorikeet.viewSpectrum_NewWindow( {
                psmId: this.props.inputParams.psmId,
                projectSearchId: this.props.inputParams.projectSearchId,
                openModPosition: this.props.inputParams.openModPosition,
                scanPeaks_MZ_That_PassFilters_Array__For_PsmId
            } );


        } catch( e ) {
            console.warn( "Error in DataTable_Table_HeaderRowEntry._viewSpectrumFakeLinkClicked: ", e )
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    render() {

        return (
            <>
                <span>{ this.props.inputParams.scanNumber }</span>

                { this.props.inputParams.searchHasScanData ? (
                    <>
                        <span> </span>
                        <span className="table-data-cell-property-value fake-link"
                              onClick={ this._viewSpectrumFakeLinkClicked_BindThis }
                        >
                            [View]
                        </span>
                    </>
                ) : null }
            </>
        );
    }
}

