/**
 * ModPage_View_Replicate_ZScore_Report_Overlay.tsx
 */


import React from "react";
import {
    ModalOverlay_Limelight_Component_v001_B_FlexBox
} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/////

const _Overlay_Title = "Significant Mods Table"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1300;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Absolute_Max = 1500; // Max is computed.  This is absolute max

//////


/**
 *
 */
export type ModPage_View_Replicate_ZScore_Report_Overlay_Params = {

    quantTypeString: string
    tableRows: Array<ModPage_View_Replicate_ZScore_Report_Overlay_Params_TableRow>
}


/**
 *
 */
export type ModPage_View_Replicate_ZScore_Report_Overlay_Params_TableRow = {

    group0: string
    group1: string
    modMass: number
    count1: number
    count2: number
    zscore: number
    pvalue: number
    filteredZscore: number
    filteredPvalue: number
    rank: number
}

/**
 *
 * @param tableRows
 */
export const open_ModPage_View_Replicate_ZScore_Report_Overlay = function( params: ModPage_View_Replicate_ZScore_Report_Overlay_Params ) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = () => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = (
        <ModPage_View_Replicate_ZScore_Report_Overlay
            props_value={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

/////////

//  React Component

/**
 *
 */
interface ModPage_View_Replicate_ZScore_Report_Overlay_Props {

    props_value: ModPage_View_Replicate_ZScore_Report_Overlay_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface ModPage_View_Replicate_ZScore_Report_Overlay_State {

    _placeholder?: unknown
}

/**
 *
 */
class ModPage_View_Replicate_ZScore_Report_Overlay extends React.Component< ModPage_View_Replicate_ZScore_Report_Overlay_Props, ModPage_View_Replicate_ZScore_Report_Overlay_State > {

    /**
     *
     */
    constructor( props: ModPage_View_Replicate_ZScore_Report_Overlay_Props ) {
        super( props );

        this.state = {};
    }

    /**
     *
     */
    render() {

        const columnHeader_Style: React.CSSProperties = { textAlign: "left" }

        let overlay_Height_Max = 200 + 15 * this.props.props_value.tableRows.length;

        if ( overlay_Height_Max < _Overlay_Height_Min ) {
            overlay_Height_Max = _Overlay_Height_Min
        }
        if ( overlay_Height_Max > _Overlay_Height_Absolute_Max ) {
            overlay_Height_Max = _Overlay_Height_Absolute_Max
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ true }>


                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "auto", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >
                    <table>
                        <thead>
                        <th style={ columnHeader_Style }>
                            rep1 (searches)
                        </th>
                        <th style={ columnHeader_Style }>
                            rep2 (searches)
                        </th>
                        <th style={ columnHeader_Style }>
                            mod mass
                        </th>
                        <th style={ columnHeader_Style }>
                            { this.props.props_value.quantTypeString + "count 1" }
                        </th>
                        <th style={ columnHeader_Style }>
                            { this.props.props_value.quantTypeString + "count 2" }
                        </th>
                        <th style={ columnHeader_Style }>
                            z-score
                        </th>
                        <th style={ columnHeader_Style }>
                            p-value
                        </th>
                        <th style={ columnHeader_Style }>
                            filtered z-score
                        </th>
                        <th style={ columnHeader_Style }>
                            filtered p-value
                        </th>
                        <th style={ columnHeader_Style }>
                            rank
                        </th>
                        </thead>
                        <tbody>
                        { this.props.props_value.tableRows.map( ( tableRow_Entry, index) => {
                            return (
                                <tr key={ index }>
                                    <td>{ tableRow_Entry.group0 }</td>
                                    <td>{ tableRow_Entry.group1 }</td>
                                    <td>{ tableRow_Entry.modMass }</td>
                                    <td>{ tableRow_Entry.count1 }</td>
                                    <td>{ tableRow_Entry.count2 }</td>
                                    <td>{ tableRow_Entry.zscore }</td>
                                    <td>{ tableRow_Entry.pvalue }</td>
                                    <td>{ tableRow_Entry.filteredZscore }</td>
                                    <td>{ tableRow_Entry.filteredPvalue }</td>
                                    <td>{ tableRow_Entry.rank }</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }
}