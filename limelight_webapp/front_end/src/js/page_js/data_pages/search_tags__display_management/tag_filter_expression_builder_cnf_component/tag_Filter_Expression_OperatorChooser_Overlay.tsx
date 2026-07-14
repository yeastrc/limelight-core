/**
 * tag_Filter_Expression_OperatorChooser_Overlay.tsx
 *
 * Home-grown modal overlay ( ModalOverlay_Limelight_Component_v001_B_FlexBox ) that lets the user
 * choose how the grouped tag-filter combines tags:
 *
 *    'OR'  => OR within each group,  AND between groups     ( a OR b )  AND  ( c OR d )      [ CNF ]
 *    'AND' => AND within each group, OR  between groups     ( a AND b )  OR  ( c AND d )     [ DNF ]
 *
 * The within-group operator and the between-groups operator always swap together, so this is a single
 * choice.  The "open" function is colocated here ( next to the container factory ).
 */

import React from 'react'

import { limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants } from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";


/////


/**
 * The human-readable description + example for a within-group operator choice.  Shared so the tag-picker
 * overlay's OR/AND radios show the SAME wording ( as tooltips ) as this chooser overlay.
 */
export function tag_Filter_Expression_OperatorChooser_Overlay__Operator_Title_And_Example(
    withinGroup_Operator : 'AND' | 'OR'
) : { title : string, example : string } {

    const title = withinGroup_Operator === 'OR'
        ? "OR within each group, AND between groups"
        : "AND within each group, OR between groups";

    const example = withinGroup_Operator === 'OR'
        ? "( 'a' OR 'b' )   AND   ( 'c' OR 'd' )"
        : "( 'a' AND 'b' )   OR   ( 'c' AND 'd' )";

    return { title, example };
}


const _Overlay_Width_Min = 360;
const _Overlay_Width_Max = 620;
const _Overlay_Height_Min = 220;
const _Overlay_Height_Max = 460;


/**
 * Open the overlay.  Calls onChoose( withinGroup_Operator ) when the user picks, then closes itself.
 */
export function tagFilter_Expression_OperatorChooser_Overlay__openOverlay(
    {
        current_WithinGroup_Operator,
        onChoose
    } : {
        current_WithinGroup_Operator : 'AND' | 'OR'
        onChoose : ( withinGroup_Operator : 'AND' | 'OR' ) => void
    }
) : void {

    //  Forward-reference closure so the callbacks can close over 'holder'
    let holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const close = () => {
        if ( holder ) {
            holder.removeContents_AndContainer_FromDOM();
        }
    };

    const componentToAdd = get_TagFilter_Expression_OperatorChooser_Overlay_Container( {
        current_WithinGroup_Operator,
        onChoose: ( withinGroup_Operator ) => { onChoose( withinGroup_Operator ); close(); },
        onClose: () => { close(); }
    } );

    holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd } );
}


/**
 * Build the overlay JSX element ( ModalOverlay wrapping the chooser body )
 */
export function get_TagFilter_Expression_OperatorChooser_Overlay_Container(
    {
        current_WithinGroup_Operator,
        onChoose,
        onClose
    } : {
        current_WithinGroup_Operator : 'AND' | 'OR'
        onChoose : ( withinGroup_Operator : 'AND' | 'OR' ) => void
        onClose : () => void
    }
) : React.JSX.Element {

    return (
        <ModalOverlay_Limelight_Component_v001_B_FlexBox
            widthMinimum={ _Overlay_Width_Min }
            widthMaximum={ _Overlay_Width_Max }
            heightMinimum={ _Overlay_Height_Min }
            heightMaximum={ _Overlay_Height_Max }
            title={ "Choose how tags combine" }
            callbackOnClicked_Close={ onClose }
            close_OnBackgroundClick={ true }
        >
            <TagFilter_Expression_OperatorChooser_OverlayBody
                current_WithinGroup_Operator={ current_WithinGroup_Operator }
                onChoose={ onChoose }
            />
        </ModalOverlay_Limelight_Component_v001_B_FlexBox>
    );
}


//////


interface Internal__OverlayBody_Props {
    current_WithinGroup_Operator : 'AND' | 'OR'
    onChoose : ( withinGroup_Operator : 'AND' | 'OR' ) => void
}


class TagFilter_Expression_OperatorChooser_OverlayBody extends React.Component< Internal__OverlayBody_Props, { _placeholder?: unknown } > {

    private _render_Option( withinGroup_Operator : 'AND' | 'OR' ) : React.JSX.Element {

        const isCurrent = this.props.current_WithinGroup_Operator === withinGroup_Operator;

        const { title, example } = tag_Filter_Expression_OperatorChooser_Overlay__Operator_Title_And_Example( withinGroup_Operator );

        return (
            <div
                onClick={ () => this.props.onChoose( withinGroup_Operator ) }
                style={ {
                    borderWidth: isCurrent ? 2 : 1,
                    borderStyle: "solid",
                    borderColor: isCurrent ? limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark : "#bbbbbb",  //  Limelight green when selected
                    backgroundColor: isCurrent ? limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_medium : limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.color_white,
                    borderRadius: 6,
                    paddingTop: 12,
                    paddingRight: 12,
                    paddingBottom: 12,
                    paddingLeft: 12,
                    marginBottom: 10,
                    cursor: "pointer"
                } }
            >
                <div style={ { fontWeight: "bold", display: "flex", alignItems: "center" } }>
                    <input
                        type="radio"
                        checked={ isCurrent }
                        onChange={ () => this.props.onChoose( withinGroup_Operator ) }
                        style={ { marginRight: 8 } }
                    />
                    <span>{ title }{ isCurrent ? "   (current)" : "" }</span>
                </div>
                <div style={ { fontFamily: "monospace", color: "#555555", marginTop: 6, marginLeft: 26 } }>
                    { example }
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom ">

                <div style={ { color: "#555555", marginBottom: 14 } }>
                    Switching swaps the operator <b>inside</b> groups and the operator <b>between</b> groups together.
                </div>

                { this._render_Option( 'OR' ) }
                { this._render_Option( 'AND' ) }

            </div>
        );
    }
}
