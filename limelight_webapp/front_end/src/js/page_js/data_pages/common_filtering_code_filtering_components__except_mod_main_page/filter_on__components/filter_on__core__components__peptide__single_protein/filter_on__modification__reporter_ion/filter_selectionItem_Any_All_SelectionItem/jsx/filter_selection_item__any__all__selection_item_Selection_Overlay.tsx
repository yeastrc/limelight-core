/**
 * filter_selection_item__any__all__selection_item_Selection_Overlay.tsx
 *
 * In Filter Section of Single Protein
 *
 * Selection Overlay of Buttons for "OR", "AND", "Remove", and "Close" for changing Single Selection Item Value
 *
 */

import React from 'react'
import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";

import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {filter_selection_item__any__all__selection_item_TooltipText__Buttons} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_TooltipText__Selected_and_Buttons";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/**
 *
 */
export const filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create = function (
    {
        current_selection_SelectionType,
        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
        position_Left,
        position_Top,
        any_Selected_Callback,
        all_Selected_Callback,
        not_Selected_Callback,
        remove_Selected_Callback
    } : {
        current_selection_SelectionType : SingleProtein_Filter_SelectionType
        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
        position_Left : number
        position_Top : number
        any_Selected_Callback : () => void;
        all_Selected_Callback : () => void;
        not_Selected_Callback : () => void;
        remove_Selected_Callback : () => void;
    }) {


    const overlay_addedDivElementDOM = document.createElement("div");

    const documentBody = document.querySelector('body');

    documentBody.appendChild( overlay_addedDivElementDOM );

    /**
     * Hold here for use in callback function
     */
    let overlay_reactRoot_InDOMElement: Root_ReactDOM_Client

    const close_Selected_Callback = () => {

        overlay_addedDivElementDOM.style.display = "none"; // Hide Tooltip from view

        //  React Unmount

        overlay_reactRoot_InDOMElement.unmount()

        //  Remove containing <div> from DOM

        overlay_addedDivElementDOM.remove();
    }


    const overlay_ComponentElement = (
        React.createElement(
            Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay,
            {
                current_selection_SelectionType,
                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
                position_Left,
                position_Top,
                any_Selected_Callback,
                all_Selected_Callback,
                not_Selected_Callback,
                remove_Selected_Callback,
                close_Selected_Callback
            },
            null
        )
    );


    overlay_reactRoot_InDOMElement = createRoot_ReactDOM_Client( overlay_addedDivElementDOM )

    overlay_reactRoot_InDOMElement.render( overlay_ComponentElement )
}

/**
 *
 */
interface Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props {

    current_selection_SelectionType : SingleProtein_Filter_SelectionType
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class: ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
    position_Left : number
    position_Top : number
    any_Selected_Callback : () => void;
    all_Selected_Callback : () => void;
    not_Selected_Callback : () => void;
    remove_Selected_Callback : () => void;
    close_Selected_Callback : () => void;
}

interface Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_State { //  Keep shouldComponentUpdate up to date
    placeHolder?: any
}

/**
 *
 */
class Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay extends React.Component< Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props, Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_State > {

    //  bind to 'this' for passing as parameters
    private _selectionOverlay_Background_Clicked_BindThis = this._selectionOverlay_Background_Clicked.bind(this);
    private _choice_ANY_Clicked_BindThis = this._choice_ANY_Clicked.bind(this)
    private _choice_ALL_Clicked_BindThis = this._choice_ALL_Clicked.bind(this)
    private _choice_NOT_Clicked_BindThis = this._choice_NOT_Clicked.bind(this)
    private _choice_Remove_Clicked_BindThis = this._choice_Remove_Clicked.bind(this)
    private _close_SelectionOverlay_Clicked_BindThis = this._close_SelectionOverlay_Clicked.bind(this)

    /**
     *
     */
    constructor(props: Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props) {
        super(props);

    }

    /**
     *
     */
    private _close_SelectionOverlay( ) {

        this.props.close_Selected_Callback()
    }

    /**
     * direct from onClick on element
     */
    private _selectionOverlay_Background_Clicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation()

            this.props.close_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ANY_Clicked() {
        try {
            this._close_SelectionOverlay()

            this.props.any_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_ALL_Clicked() {
        try {
            this._close_SelectionOverlay()

            this.props.all_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_NOT_Clicked() {
        try {
            this._close_SelectionOverlay()

            this.props.not_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _choice_Remove_Clicked() {
        try {
            this._close_SelectionOverlay()

            this.props.remove_Selected_Callback()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _close_SelectionOverlay_Clicked(  ) {
        try {
            this._close_SelectionOverlay()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }



    /**
     *
     */
    render() {

        let current_selection_SelectionType_ANY = false
        let current_selection_SelectionType_ALL = false
        let current_selection_SelectionType_NOT = false
        let current_selection_SelectionType_NotSelected = false

        if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ANY ) {
            current_selection_SelectionType_ANY = true
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {
            current_selection_SelectionType_ALL = true
        } else if ( this.props.current_selection_SelectionType === SingleProtein_Filter_SelectionType.NOT ) {
            current_selection_SelectionType_NOT = true
        } else if ( ! this.props.current_selection_SelectionType ) {
            current_selection_SelectionType_NotSelected = true
        } else {
            const msg = "Unexpected value for this.props.current_selection_SelectionType: " + this.props.current_selection_SelectionType
            console.warn( msg )
            throw Error( msg )
        }

        let show_Add_Option_InsteadOf_OR_AND = false;

        if ( this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
            && this.props.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class.show_Add_Option_InsteadOf_OR_AND ) {
            show_Add_Option_InsteadOf_OR_AND = true
        }

        const overlayPosition_Left = this.props.position_Left
        const overlayPosition_Top = this.props.position_Top

        return (
            <div >

                {/* Background under the dialog to close if clicked */}
                <div className="modal-overlay-page-background " style={ { backgroundColor: "transparent", zIndex: 1009 } } onClick={ this._selectionOverlay_Background_Clicked_BindThis } ></div> {/*  has z-index 1001  */}
                {/* Main Overlay */}
                <div style={ { position : "absolute", left: overlayPosition_Left, top: overlayPosition_Top, padding: 8, borderWidth: 3, borderStyle: "solid", backgroundColor: "white", zIndex: 1010 } }
                     className="standard-border-color-very-dark"
                >
                    <div>
                        { show_Add_Option_InsteadOf_OR_AND ? (
                            //  Show ADD button
                            <OverlayUpdateButton
                                buttonLabel={ "ADD" }
                                isCurrentSelection={ current_selection_SelectionType_ALL }
                                buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_TooltipText__Buttons._ADD__ONLY__TOOLTIP_MAIN_TEXT_STRING }
                                buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                buttonClicked_Callback={ this._choice_ALL_Clicked_BindThis }
                            />
                        ) : (
                            //  Show OR and AND buttons
                            <React.Fragment>
                                <OverlayUpdateButton
                                    buttonLabel={ "OR" }
                                    isCurrentSelection={ current_selection_SelectionType_ANY }
                                    buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_TooltipText__Buttons._OR__TOOLTIP_MAIN_TEXT_STRING }
                                    buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                    buttonClicked_Callback={ this._choice_ANY_Clicked_BindThis }
                                />
                                <span > </span>
                                <OverlayUpdateButton
                                    buttonLabel={ "AND" }
                                    isCurrentSelection={ current_selection_SelectionType_ALL }
                                    buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_TooltipText__Buttons._AND__TOOLTIP_MAIN_TEXT_STRING }
                                    buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                                    buttonClicked_Callback={ this._choice_ALL_Clicked_BindThis }
                                />
                            </React.Fragment>
                            )}
                        <span > </span>
                        <OverlayUpdateButton
                            buttonLabel={ "EXCLUDE" }
                            isCurrentSelection={ current_selection_SelectionType_NOT }
                            buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_TooltipText__Buttons._NOT__TOOLTIP_MAIN_TEXT_STRING }
                            buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                            buttonClicked_Callback={ this._choice_NOT_Clicked_BindThis }
                        />
                        <span > </span>
                        <OverlayUpdateButton
                            buttonLabel={ "Remove" }
                            isCurrentSelection={ current_selection_SelectionType_NotSelected }
                            buttonTooltip_MainText={ "Remove this item from peptides filters." }
                            buttonTooltip_WhenCurrentSelectionText={ "Value Not Selected" }
                            buttonClicked_Callback={ this._choice_Remove_Clicked_BindThis }
                        />
                        <span > </span>
                        <OverlayUpdateButton
                            buttonLabel={ "Close" }
                            isCurrentSelection={ false }
                            buttonTooltip_MainText={ "Close with no changes." }
                            buttonTooltip_WhenCurrentSelectionText={ null }
                            buttonClicked_Callback={ this._close_SelectionOverlay_Clicked_BindThis }
                        />
                    </div>

                </div>
            </div>
        )
    }
}


/**
 *
 */
interface OverlayUpdateButton_Props {

    isCurrentSelection : boolean
    buttonLabel : string
    buttonTooltip_MainText : string
    buttonTooltip_WhenCurrentSelectionText : string
    buttonClicked_Callback : () => void;
}

interface OverlayUpdateButton_State {
    _placeholder: any
}

/**
 *
 */
class OverlayUpdateButton extends React.Component< OverlayUpdateButton_Props, OverlayUpdateButton_State > {

    //  bind to 'this' for passing as parameters
    private _onClick_BindThis = this._onClick.bind(this)

    /**
     *
     */
    constructor(props: OverlayUpdateButton_Props) {
        super(props);

        // this.state = { };
    }

    /**
     *
     */
    private _onClick( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation()

        this.props.buttonClicked_Callback()
    }

    /**
     *
     */
    render() {
        let buttonDisabled = false

        if ( this.props.isCurrentSelection ) {
            buttonDisabled = true
        }

        let tooltipContents : React.JSX.Element = undefined
        if ( this.props.isCurrentSelection && this.props.buttonTooltip_WhenCurrentSelectionText ) {
            tooltipContents = (
                <div >
                    <div style={ { marginBottom: 10 } }>
                        { this.props.buttonTooltip_WhenCurrentSelectionText }
                    </div>
                    <div>
                        {this.props.buttonTooltip_MainText}
                    </div>
                </div>
            )
        } else {
            tooltipContents = (
                <div >
                    <div>
                        {this.props.buttonTooltip_MainText}
                    </div>
                </div>
            )
        }

        return (
            <div style={ { display : "inline-block", position: "relative" } }>
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltipContents }
                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                >
                    <input
                        type="button"
                        value={ this.props.buttonLabel }
                        disabled={ buttonDisabled }
                        onClick={ this._onClick_BindThis }
                    />
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                { (this.props.isCurrentSelection) ?
                    ( // Add Overlay Div to provide target for tooltip
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={ tooltipContents }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                        <div style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } }
                        >
                        </div>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    )
                    : null
                }
            </div>
        )
    }
}
