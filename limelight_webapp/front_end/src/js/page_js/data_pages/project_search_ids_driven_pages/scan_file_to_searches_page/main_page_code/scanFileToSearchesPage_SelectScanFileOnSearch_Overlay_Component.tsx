/**
 * scanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component.tsx
 *
 * Select Scan file from scan files on a single search for override
 */

import React from "react";

import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModalOverlay_Limelight_Component_v001_B_FlexBox
} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";


//////////////

const _Overlay_Title = "Change Scan File for Search"

const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 600;
const _Overlay_Height_Max = 1200;



/**
 *
 */
interface ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Params {
    projectSearchId: number
    searchScanFileId_CurrentSelection: number
    scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry

    callback_Selected_SearchScanFileId: ( searchScanFileId: number ) => void
}


/**
 *
 */
export const open_ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component = function (
    {
        params
    } : {
        params: ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Params
    }
) {

    let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = (): void => {
        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
    }

    const overlayComponent = (
        <ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component
            params={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
}


////  React Components

/**
 *
 */
interface ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component_Props {

    params: ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component extends React.Component< ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component_Props, ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component_State > {

    /**
     *
     */
    constructor(props: ScanFileToSearchesPage_SelectScanFileOnSearch_Overlay_Component_Component_Props) {  try {
        super( props );

        this.state = {
            objectForceRerender: {}
        };

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    render() {  try {

        const scanFileElements_Array: Array<React.JSX.Element> = []

        for ( const searchScanFileData of this.props.params.scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() ) {

            const scanFile_Element = (
                <div
                    key={ searchScanFileData.searchScanFileId }
                    style={ { marginBottom: 10 } }
                    onClick={ event => { try {

                        this.props.callbackOn_Cancel_Close_Clicked()

                        window.setTimeout( () => { try {

                            this.props.params.callback_Selected_SearchScanFileId( searchScanFileData.searchScanFileId )

                        } catch ( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                            throw e
                        }}, 10 )
                    } catch ( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                        throw e
                    }}}
                >
                    <button

                    >
                        Select
                    </button>
                    &nbsp;
                    &nbsp;
                    <span className=" fake-link ">
                        { searchScanFileData.filename }
                    </span>
                    { searchScanFileData.searchScanFileId === this.props.params.searchScanFileId_CurrentSelection ? (
                        <>
                            &nbsp;
                            &nbsp;
                            <span>
                                (current selection)
                            </span>
                        </>
                    ) : null }
                </div>
            )

            scanFileElements_Array.push( scanFile_Element )
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <React.Fragment>

                    <div
                        className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                        style={ { paddingBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            <button
                                onClick={ event => { this.props.callbackOn_Cancel_Close_Clicked() }}
                            >
                                Close
                            </button>
                        </div>
                        <div style={ { marginTop: 10 } }>
                            Select a scan file to add to the comparison
                        </div>

                    </div>
                    <div
                        className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                        style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */ }

                        { scanFileElements_Array }

                    </div>
                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }
}

