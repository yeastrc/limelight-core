/**
 * qcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component.tsx
 *
 * QC Page Common - Section - Feature Detection Statistics - Select Feature Detection entry
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";


const _Overlay_Title = "Select Feature Detection"

const _Overlay_Width_Min = 300;
const _Overlay_Width_Max = 800;

const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1200;


/**
 *
 */
export const open_QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component = function (
    {
        params
    } : {
        params: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Close = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component
            params={ params }
            callbackOn_Close={ callbackOn_Close }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}



export class QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry {
    currentlySelected: boolean
    feature_detection_root__project_scnfl_mapping_tbl__id: number
    // featureDetection_Id: number
    featureDetection_Label: string
    featureDetection_Description: string
    scanFilenames: string
    searchNameIdEtc: string
    projectSearchId: number
}

export class QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_CallbackParams {

    selectionEntry: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry
}

export type QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_Callback =
    ( params: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_CallbackParams) => void

/**
 *
 */
export interface QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params {

    selectionEntriesArray: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry>

    selectionChosen_Callback: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_Callback
}

/////////

//  React Component

/**
 *
 */
interface QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Props {

    params: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params
    callbackOn_Close: () => void
}

/**
 *
 */
interface QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_State {

    forceRerenderObject: object      //  Force Rerender object
}

/**
 *
 */
class QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component extends React.Component< QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Props, QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_State > {

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    /**
     *
     */
    constructor(props: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Props) {
        super(props);

        this.state = {
            forceRerenderObject: {}
        };
    }

    /**
     *
     */
    render() {

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                set_CSS_Position_Fixed={ true }
                callbackOnClicked_Close={ this.props.callbackOn_Close }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12, fontSize: 18, fontWeight: "bold" } }
                    >
                        Click a Feature Detection entry to display
                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */}

                        <ul>
                            { this.props.params.selectionEntriesArray.map((value, index, array) => {

                                let topLevel_ClassName = " fake-link "
                                let topLevel_Title = "Click to display this data"

                                if ( value.currentlySelected ) {

                                    topLevel_ClassName = " gray-text "
                                    topLevel_Title = "Currently displayed data"
                                }

                                return (
                                    <li
                                        key={ value.feature_detection_root__project_scnfl_mapping_tbl__id }
                                    >
                                        <div
                                            className={ topLevel_ClassName }
                                            title={ topLevel_Title }
                                            onClick={ event => {
                                                event.stopPropagation()

                                                if ( limelight__IsTextSelected() ) {
                                                    // Text selected so skip

                                                    return; // EARLY RETURN
                                                }

                                                //  Clear currentlySelected on all entries
                                                for ( const selectionEntry of this.props.params.selectionEntriesArray ) {
                                                    selectionEntry.currentlySelected = false;
                                                }

                                                // set currentlySelected on current entry
                                                value.currentlySelected = true

                                                this.props.params.selectionChosen_Callback({ selectionEntry: value })

                                                this.props.callbackOn_Close()
                                            }}
                                        >
                                            <div>

                                                { value.searchNameIdEtc ? (
                                                    <div>
                                                        <span style={ { fontWeight: "bold" } }>Search: </span>
                                                        <span>
                                                            { value.searchNameIdEtc }
                                                        </span>
                                                    </div>
                                                ) : null }
                                                <div>
                                                    <span style={ { fontWeight: "bold" } }>Scan File: </span>
                                                    {/*  Scan File(s) associated with this Feature Detection Run  */}
                                                    { value.scanFilenames }
                                                </div>
                                                <div>
                                                    <span style={ { fontWeight: "bold" } }>Feature Detection Run: </span>
                                                    <span>
                                                        { value.featureDetection_Description }
                                                    </span>
                                                                                <span style={ { whiteSpace: "nowrap" } }>
                                                        <span> (</span>
                                                        <span>
                                                            { value.featureDetection_Label }
                                                        </span>
                                                        <span>)</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/*  Dividing line between entries  */}
                                        <div
                                            className="bottom-border--no-border-color standard-border-color-dark"
                                        ></div>

                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginTop: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.callbackOn_Close();
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>

                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
