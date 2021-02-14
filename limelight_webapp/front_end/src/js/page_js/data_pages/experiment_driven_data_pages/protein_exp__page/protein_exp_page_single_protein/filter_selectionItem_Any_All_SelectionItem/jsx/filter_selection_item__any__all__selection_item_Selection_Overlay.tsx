/**
 * filter_selection_item__any__all__selection_item_Selection_Overlay.tsx
 *
 * In Filter Section of Single Protein
 *
 * Selection Overlay of Buttons for "OR", "AND", "Remove", and "Close" for changing Single Selection Item Value
 *
 */

import React from 'react'
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/filter_selectionItem_Any_All_SelectionItem/jsx/filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants";
import ReactDOM from "react-dom";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";


/**
 *
 */
export const filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Create = function (
    {
        current_selection_SelectionType,
        position_Left,
        position_Top,
        any_Selected_Callback,
        all_Selected_Callback,
        not_Selected_Callback,
        remove_Selected_Callback
    } : {
        current_selection_SelectionType : SingleProtein_Filter_SelectionType
        position_Left : number
        position_Top : number
        any_Selected_Callback : () => void;
        all_Selected_Callback : () => void;
        not_Selected_Callback : () => void;
        remove_Selected_Callback : () => void;
    }) {


    const overlay_addedDivElementDOM = document.createElement("div");

    var documentBody = document.querySelector('body');

    documentBody.appendChild( overlay_addedDivElementDOM );

    const close_Selected_Callback = () => {

        overlay_addedDivElementDOM.style.display = "none"; // Hide Tooltip from view

        //  React Unmount

        ReactDOM.unmountComponentAtNode( overlay_addedDivElementDOM );

        //  Remove containing <div> from DOM

        overlay_addedDivElementDOM.remove();
    }

    const renderCompletecallbackFcn = ( ) => { };

    const overlay_ComponentElement = (
        React.createElement(
            Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay,
            {
                current_selection_SelectionType,
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
    const overlay_Component = ReactDOM.render(
        overlay_ComponentElement,
        overlay_addedDivElementDOM,
        renderCompletecallbackFcn
    );
}

/**
 *
 */
interface Filter_selectionItem_Any_All_SelectionItem_Selection_Overlay_Props {

    current_selection_SelectionType : SingleProtein_Filter_SelectionType
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
    private _close_SelectionOverlay_Clicked( event : React.MouseEvent<HTMLElement, MouseEvent> ) {
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
                        <OverlayUpdateButton
                            buttonLabel={ "OR" }
                            isCurrentSelection={ current_selection_SelectionType_ANY }
                            buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._OR__TOOLTIP_MAIN_TEXT_STRING }
                            buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                            buttonClicked_Callback={ this._choice_ANY_Clicked_BindThis }
                        />
                        <span > </span>
                        <OverlayUpdateButton
                            buttonLabel={ "AND" }
                            isCurrentSelection={ current_selection_SelectionType_ALL }
                            buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._AND__TOOLTIP_MAIN_TEXT_STRING }
                            buttonTooltip_WhenCurrentSelectionText={ "Current Selection" }
                            buttonClicked_Callback={ this._choice_ALL_Clicked_BindThis }
                        />
                        <span > </span>
                        <OverlayUpdateButton
                            buttonLabel={ "NOT" }
                            isCurrentSelection={ current_selection_SelectionType_NOT }
                            buttonTooltip_MainText={ filter_selection_item__any__all__selection_item_Selection_Overlay_LocalConstants._NOT__TOOLTIP_MAIN_TEXT_STRING }
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
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this)
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this)

    private readonly _button_Ref :  React.RefObject<HTMLInputElement>

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

    /**
     *
     */
    constructor(props: OverlayUpdateButton_Props) {
        super(props);

        this._button_Ref = React.createRef();

        // this.state = { };
    }

    /**
     *
     */
    private _onClick( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        event.stopPropagation()

        this._removeTooltip()

        this.props.buttonClicked_Callback()
    }

    /**
     *
     */
    private _onMouseEnter() {

        let tooltipContents : JSX.Element = undefined
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
        this._tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltipContents, tooltip_target_DOM_Element : this._button_Ref.current })
    }

    /**
     *
     */
    private _onMouseLeave() {

        this._removeTooltip()
    }

    /**
     *
     */
    private _removeTooltip() {

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip()
        }
        this._tooltip_Limelight_Created_Tooltip = undefined
    }

    /**
     *
     */
    render() {
        let buttonDisabled = false

        if ( this.props.isCurrentSelection ) {
            buttonDisabled = true
        }

        return (
            <div style={ { display : "inline-block", position: "relative" } }>
                <input
                    type="button"
                    value={ this.props.buttonLabel }
                    disabled={ buttonDisabled }
                    ref={ this._button_Ref }
                    onClick={ this._onClick_BindThis }
                    onMouseEnter={ this._onMouseEnter_BindThis }
                    onMouseLeave={ this._onMouseLeave_BindThis }
                />
                { (this.props.isCurrentSelection) ?
                    ( // Add Overlay Div to provide target for tooltip
                        <div style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } }
                            onMouseEnter={ this._onMouseEnter_BindThis }
                            onMouseLeave={ this._onMouseLeave_BindThis }
                        >
                        </div>
                    )
                    : null
                }
            </div>
        )
    }
}
