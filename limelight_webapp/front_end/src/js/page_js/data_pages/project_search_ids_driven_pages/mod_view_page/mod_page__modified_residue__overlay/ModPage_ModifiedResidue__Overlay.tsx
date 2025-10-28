/**
 * ModPage_ModifiedResidue__Overlay.tsx
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
    limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants
} from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


//////////////

const _Overlay_Title = "Modified Residues"

const _Overlay_Width_Min = 400;
const _Overlay_Width_Max = 400;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 550;



const _BAR_COLOR = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark

const _BAR_WIDTH_MAX = 60
const _BAR_WIDTH_MIN = 2


/**
 * Copied from ModPage_ModifiedResidue__DataTable_ColumnDisplay.tsx
 * since data is passed from there
 */
class Props__SVG_OVERALL_TOOLTIP_ROW_Values {

    residueLetter: string
    count: number
    count_FractionOfMaxCount: number
}


/**
 *
 */
interface ModPage_ModifiedResidue__Overlay_Params {

    modifiedResidue_RowValues: Array<Props__SVG_OVERALL_TOOLTIP_ROW_Values>
}


/**
 *
 */
export const open_ModPage_ModifiedResidue__Overlay = function (
    {
        params
    } : {
    params: ModPage_ModifiedResidue__Overlay_Params
}
) {
    if ( limelight__IsTextSelected() ) {
        return
    }

    let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = (): void => {
        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
    }

    const overlayComponent = (
        <ModPage_ModifiedResidue__Overlay_Component
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
interface ModPage_ModifiedResidue__Overlay_Component_Props {

    params: ModPage_ModifiedResidue__Overlay_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface ModPage_ModifiedResidue__Overlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class ModPage_ModifiedResidue__Overlay_Component extends React.Component< ModPage_ModifiedResidue__Overlay_Component_Props, ModPage_ModifiedResidue__Overlay_Component_State > {

    /**
     *
     */
    constructor(props: ModPage_ModifiedResidue__Overlay_Component_Props) {  try {
        super( props );

        this.state = {
            objectForceRerender: {}
        };
        
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    render() {  try {

        const _LETTERS_PADDING_RIGHT = 20
        const _COUNT_PADDING_RIGHT = 8

        const _HEADER_ROWS_PADDING_BOTTOM = 10
        const _DATA_ROWS_PADDING_BOTTOM = 3

        // const entries_ForLetters_TextLines_ForLogging: Array<string> = []

        const entries_For_ResidueLetters_JSX: Array<JSX.Element> = []

        for ( const rowValue of this.props.params.modifiedResidue_RowValues ) {

            // entries_ForLetters_TextLines_ForLogging.push( rowValue.residueLetter + "\t" + rowValue.count )

            let barWidth = _BAR_WIDTH_MAX

            if ( rowValue.count === 0 ) {

                barWidth = 0

            } else {

                barWidth = Math.ceil( rowValue.count_FractionOfMaxCount * _BAR_WIDTH_MAX )

                if ( barWidth < _BAR_WIDTH_MIN ) {
                    barWidth = _BAR_WIDTH_MIN  // count not zero so barWidth Must be at least _BAR_WIDTH_MIN
                }
            }

            const _BAR_HEIGHT = "80%"

            const dataForResidue_Element = (
                <tr
                    key={ rowValue.residueLetter + "_letter_row" }
                >
                    <td
                        key={ rowValue.residueLetter + "_letter" }
                        style={ { textAlign: "right", fontFamily: "monospace", paddingRight: _LETTERS_PADDING_RIGHT,  paddingBottom: _DATA_ROWS_PADDING_BOTTOM, paddingLeft: 10 } }
                    >
                        { rowValue.residueLetter  }
                    </td>

                    <td
                        key={ rowValue.residueLetter + "_count" }
                        style={ { textAlign: "right", paddingRight: _COUNT_PADDING_RIGHT,  paddingBottom: _DATA_ROWS_PADDING_BOTTOM } }
                    >
                        { rowValue.count.toLocaleString()  }
                    </td>


                    <td
                        key={ rowValue.residueLetter + "_bar" }
                        style={
                            {
                                paddingBottom: _DATA_ROWS_PADDING_BOTTOM, paddingRight: 15,
                                display: "flex", alignItems: "center"
                            }
                        }
                    >
                        {/*  Actual Bar */}
                        <div
                            style={
                                {
                                    display: "inline-block",
                                    height: _BAR_HEIGHT,
                                    width: barWidth,
                                    backgroundColor: _BAR_COLOR,
                                    fontSize: "90%"
                                }
                            }
                        >
                            &nbsp;
                        </div>

                        &nbsp;
                    </td>
                </tr>
            )

            entries_For_ResidueLetters_JSX.push( dataForResidue_Element )
        }

        // entries_ForLetters_TextLines_ForLogging.push("")
        // console.log( "entries_ForLetters_TextLines_ForLogging: \n\n" + entries_ForLetters_TextLines_ForLogging.join("\n"))

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

                    </div>
                    <div
                        className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                        style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */ }

                        <div style={ { width: "max-content", margin: "auto" } }>
                            <div>
                                <table
                                    cellSpacing={ 0 }
                                    cellPadding={ 0 }
                                    style={ {
                                        borderWidth: 0
                                    } }
                                >
                                    <thead>
                                    <tr>
                                        <th
                                            style={ { paddingRight: _LETTERS_PADDING_RIGHT, paddingBottom: _HEADER_ROWS_PADDING_BOTTOM } }
                                        >
                                            Residue
                                        </th>
                                        <th
                                            colSpan={ 2 }
                                            style={ { paddingBottom: _HEADER_ROWS_PADDING_BOTTOM } }
                                        >
                                            Modification Count


                                            <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                title={
                                                    <div>
                                                        <div style={ { marginTop: 5 } }>
                                                            Summary of Modification Counting Rules:
                                                        </div>

                                                        <ol>
                                                            <li style={ { marginTop: 5 } }>
                                                                Single Position: If a modification occurs at one position in a PSM, 1 is added to the residue that position.
                                                            </li>
                                                            <li style={ { marginTop: 5 } }>
                                                                Multiple Positions: If a modification has multiple positions in a PSM, 1 divided by the number of positions is added to the residue at each position.
                                                            </li>
                                                            <li style={ { marginTop: 5 } }>
                                                                If a modification has no positions in a PSM (unlocalized), 1 divided by the peptide's length is added to the residue at each position of the peptide.
                                                            </li>
                                                            <li style={ { marginTop: 5 } }>
                                                                Filtered Positions: When the “Filter on Modifications at Protein Position” is applied, only positions passing the filter are counted.
                                                                However, the divisor remains the total number of positions (for multi-position modifications) or the peptide length (for no-position modifications).
                                                            </li>
                                                        </ol>
                                                    </div>
                                                }
                                            />

                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { entries_For_ResidueLetters_JSX }
                                    </tbody>
                                </table>
                            </div>
                        </div>

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

