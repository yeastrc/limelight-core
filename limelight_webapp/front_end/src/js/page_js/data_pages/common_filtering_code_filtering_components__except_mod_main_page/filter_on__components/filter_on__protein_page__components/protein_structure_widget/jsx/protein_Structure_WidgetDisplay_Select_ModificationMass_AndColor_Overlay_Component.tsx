/**
 * protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component.tsx
 *
 * Select Modification mass and color for Modification balls
 */

//  Needs updating if will keep

import React from "react";

import { limelight_add_ReactComponent_JSX_Element_To_DocumentBody, Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { ModalOverlay_Limelight_Component_v001_B_FlexBox } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import { limelight__Sort_ArrayOfNumbers_SortArrayInPlace } from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";


const _Overlay_Title = "Select Modification"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 500;

const _Overlay_Height_Min = 500;
const _Overlay_Height_Max = 900;

export class Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_AlignmentComplete_Callback_Params {

    variable_Mod_Mass_Selected: number
    open_Mod_Mass_Selected: number
}

class Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_CommonParams {

    variable_Mods_Pass_ALL_Filters_Set: Set<number>
    open_Mods_Pass_ALL_Filters_Set: Set<number>

    alignmentComplete_Callback: ( params: Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_AlignmentComplete_Callback_Params ) => void
}


export const open_protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component = function (
    {
        commonParams
    } : {
        commonParams: Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_CommonParams
    }
) {

    let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = (): void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
    }

    const overlayComponent = (
        <Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component
            commonParams={ commonParams }
            close_Callback={ callbackOn_Cancel_Close_Clicked }
        />
    )

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
}


//  React Components

/**
 *
 */
interface Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_Props {

    commonParams: Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_CommonParams
    close_Callback: () => void
}

/**
 *
 */
interface Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_State {

    objectForceRerender?: object
}

/**
 *
 */
class Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component extends React.Component< Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_Props, Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_State > {

    // private _save_Button_In_Show_Clicked_BindThis = this._save_Button_In_Show_Clicked.bind(this)
    private _cancel_Button_Clicked_BindThis = this._cancel_Button_Clicked.bind(this)

    private _variable_ModMasses_ToSelectFrom: Array<number>
    private _open_ModMasses_ToSelectFrom: Array<number>

    /**
     *
     */
    constructor( props: Protein_Structure_WidgetDisplay_Select_ModificationMass_AndColor_Overlay_Component_Props ) {
        super( props );

        try {
            this._variable_ModMasses_ToSelectFrom = Array.from( props.commonParams.variable_Mods_Pass_ALL_Filters_Set )
            this._open_ModMasses_ToSelectFrom = Array.from( props.commonParams.open_Mods_Pass_ALL_Filters_Set )

            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( this._variable_ModMasses_ToSelectFrom )
            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( this._open_ModMasses_ToSelectFrom )

            this.state = {
                objectForceRerender: {}
            };

        } catch ( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
            throw e
        }
    }

    /**
     *
     */
    componentDidMount() {  try {

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     * @param event
     */
    private _cancel_Button_Clicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) { try {

        this.props.close_Callback()

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    render() {  try {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.close_Callback }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    { this.render_InsideOverlay() }

                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )

    } catch ( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
        throw e
    }
    }

    /**
     *
     */
    render_InsideOverlay() {

        const _BUTTON_MARGIN_BELOW = 3
        const _BUTTON_MARGIN_RIGHT = 10

        const variableMod_Elements: Array<React.JSX.Element> = []

        {
            for ( const mass of this._variable_ModMasses_ToSelectFrom ) {

                variableMod_Elements.push(
                    <div key={ mass }>
                        <span
                            className=" fake-link "
                            onClick={ event => {
                                //  Pass the mass in property 'variable_Mod_Mass_Selected'
                                this.props.commonParams.alignmentComplete_Callback({ variable_Mod_Mass_Selected: mass, open_Mod_Mass_Selected: undefined })
                                this.props.close_Callback()
                            }}
                        >
                            add
                        </span>
                        <span> </span>
                        { mass }
                    </div>
                )
            }
        }

        const openMod_Elements: Array<React.JSX.Element> = []

        {
            for ( const mass of this._open_ModMasses_ToSelectFrom ) {

                openMod_Elements.push(
                    <div key={ mass }>
                        <span
                            className=" fake-link "
                            onClick={ event => {
                                //  Pass the mass in property 'open_Mod_Mass_Selected'
                                this.props.commonParams.alignmentComplete_Callback( { open_Mod_Mass_Selected: mass, variable_Mod_Mass_Selected: undefined } )
                                this.props.close_Callback()
                            } }
                        >
                            add
                        </span>
                        <span> </span>
                        { mass }
                    </div>
                )
            }
        }

        return (
            <>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { marginBottom: 12 } }
                    // style={ { padding : 6 } }
                >
                    <div style={ { fontWeight: "bold", fontSize: 24, marginBottom: 10 } }>
                        Select a modification mass:
                    </div>
                    <div>
                        (Note: modification masses listed are ones that pass all filters)
                    </div>
                </div>

                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom"
                     style={ { overflowY: "auto" } }
                    // style={ { padding : 6 } }
                >
                    <div style={ {  } }>
                        { variableMod_Elements.length === 0 && openMod_Elements.length === 0 ? (
                            <div>
                                No Variable or Open modifications pass filters
                            </div>
                        ) : (
                            <div>
                                { variableMod_Elements.length > 0 ? (
                                    <>
                                        <div style={ { fontWeight: "bold", fontSize: 18, marginBottom: 10 } }>
                                            Select one of these variable modifications:
                                        </div>
                                        <div>
                                            { variableMod_Elements }
                                        </div>
                                    </>
                                ) : null }
                                { openMod_Elements.length > 0 ? (
                                    <>
                                        <div style={ { fontWeight: "bold", fontSize: 18, marginTop: 10, marginBottom: 10  } }>
                                            { variableMod_Elements.length > 0 ? (
                                                <span>or </span>
                                            ) : null }
                                            <span>select one of these open modifications:</span>
                                        </div>
                                        <div>
                                            { openMod_Elements }
                                        </div>
                                    </>
                                ) : null }
                            </div>
                        )}
                    </div>
                </div>
            </>
        )
    }

}
