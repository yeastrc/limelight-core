/**
 * chimeraXExport_AuthCollision_Overlay.tsx
 *
 * Shown ONLY when the ChimeraX (.cxc) export detects an auth-numbering collision: two or more residues
 * that share one ChimeraX residue spec (/auth:seq), which happens in an out-of-spec structure whose
 * author numbering duplicates a residue within one auth chain. ChimeraX cannot tell those residues
 * apart, so it colors them all the same -- the one case where the file is genuinely wrong relative to
 * the (label-based) Mol* viewer. So it is worth telling the user, unlike residues merely omitted for
 * having no coordinates (which match the viewer and are reported nowhere).
 *
 * The download is held until the user clicks a button here (the browser download dialog would otherwise
 * cover this overlay). See front_end/CLAUDE.md "Modal overlay (home-grown)" for the pattern.
 */

import React from 'react'

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { ModalOverlay_Limelight_Component_v001_B_FlexBox } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    Molstar__read_structure_create_chimerax_file__AuthCollision
} from "page_js/data_pages/molstar__read_structure_create_chimerax_file/molstar__read_structure_create_chimerax_file___Index";


const _Overlay_Title = "ChimeraX File — Duplicate Residue Numbering"

const _Overlay_Width_Min = 560;
const _Overlay_Width_Max = 940;
const _Overlay_Height_Min = 280;
const _Overlay_Height_Max = 800;


/**
 * Open the collision overlay. The download does NOT start until the user clicks "Download File" (which
 * calls download_Callback). Colocated with the component per the CLAUDE.md convention.
 */
export const chimeraXExport_AuthCollision_Overlay__openOverlay = function ( { collisions, download_Callback } : {
    collisions : Array<Molstar__read_structure_create_chimerax_file__AuthCollision>
    download_Callback : () => void
} ) : void {

    //  Forward-reference closure: declared before building the component so the close callback can close
    //  over it; assigned the holder immediately after.
    let holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const close_Callback = () => {
        try {
            if ( holder ) {
                holder.removeContents_AndContainer_FromDOM();
                holder = undefined;
            }
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    };

    const componentToAdd = (
        <Internal__ChimeraXExport_AuthCollision_Overlay_Component
            collisions={ collisions }
            download_Callback={ download_Callback }
            close_Callback={ close_Callback }
        />
    );

    holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd } );
}


//  One collision as a bullet. Shows each residue by its LABEL chain and its AUTH chain (they share the
//  auth chain, which is why they collide), plus the single ChimeraX spec they all fold into.
const _render_Collision_Bullet = function ( { bulletKey, collision } : {
    bulletKey : string
    collision : Molstar__read_structure_create_chimerax_file__AuthCollision
} ) : React.JSX.Element {

    const residue_Strings = collision.residues.map(
        ( r ) => `chain ${ r.labelAsymId } (auth ${ collision.authAsymId }) residue ${ r.labelSeqId }`
    );

    const chimeraX_Spec = `/${ collision.authAsymId }:${ collision.authSeqId }${ collision.insCode }`;

    return (
        <li key={ bulletKey } style={ { marginBottom: 8, lineHeight: 1.4 } }>
            { residue_Strings.join( ", " ) } — ChimeraX treats these as one residue ({ chimeraX_Spec }) and colors them the same.
        </li>
    );
}


interface Internal__ChimeraXExport_AuthCollision_Overlay_Component_Props {

    collisions : Array<Molstar__read_structure_create_chimerax_file__AuthCollision>
    download_Callback : () => void
    close_Callback : () => void
}

interface Internal__ChimeraXExport_AuthCollision_Overlay_Component_State {

    _placeholder : unknown
}


/**
 * File-local component (Internal__ prefix; capitalized so JSX treats it as a component).
 */
class Internal__ChimeraXExport_AuthCollision_Overlay_Component
    extends React.Component< Internal__ChimeraXExport_AuthCollision_Overlay_Component_Props, Internal__ChimeraXExport_AuthCollision_Overlay_Component_State > {

    private _downloadAndClose_BindThis = this._downloadAndClose.bind( this );
    private _close_BindThis = this._close.bind( this );

    constructor( props : Internal__ChimeraXExport_AuthCollision_Overlay_Component_Props ) {
        super( props );

        this.state = { _placeholder : undefined };
    }

    private _downloadAndClose() {
        try {
            this.props.download_Callback();
            this.props.close_Callback();
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _close() {
        try {
            this.props.close_Callback();
        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    render() : React.JSX.Element {

        const collisions = this.props.collisions ?? [];

        const bullets = collisions.map(
            ( collision, index ) => _render_Collision_Bullet( { bulletKey: "collision-" + index, collision } )
        );

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this._close_BindThis }
                close_OnBackgroundClick={ false }
            >

                {/*  Explanation -- the anchor (fixed height)  */}
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                    <div>
                        Your structure file has residues that share the same chain and residue number, so
                        ChimeraX cannot tell them apart. Each group below is colored the same in ChimeraX,
                        so some of them may get the wrong color. This does not affect the Limelight 3-D viewer.
                    </div>
                </div>

                {/*  Buttons -- kept at the top, next to the text (a trailing fixed block gets pushed to the
                     very bottom of this overlay, far from the content)  */}
                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    style={ { marginTop: 14 } }
                >
                    <button onClick={ this._downloadAndClose_BindThis }>
                        Download File
                    </button>
                    <button onClick={ this._close_BindThis } style={ { marginLeft: 10 } }>
                        Cancel
                    </button>
                </div>

                {/*  The colliding residues (the one variable-height entry; scrolls)  */}
                <div
                    className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom "
                    style={ { overflowY: "auto", marginTop: 16 } }
                >
                    <ul style={ { marginTop: 0, marginBottom: 0, paddingLeft: 22 } }>
                        { bullets }
                    </ul>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
