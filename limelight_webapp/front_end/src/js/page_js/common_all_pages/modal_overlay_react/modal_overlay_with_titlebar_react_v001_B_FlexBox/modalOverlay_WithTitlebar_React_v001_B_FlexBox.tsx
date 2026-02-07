/**
 * modal_overlay_with_titlebar_react_v001_B_FlexBox.tsx
 *
 * Version v001_B_FlexBox
 * 
 * Modal Overlay with Title Bar on Top - Built using React
 * 
 * Has React component in this file
 */


import React from 'react'
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";


const _minimumPaddingFromViewPort_WidthComputation = 50;
const _minimumPaddingFromViewPort_HeightComputation = 50;

enum Internal__PositionToUse_Fixed_Absolute_Enum {
    FIXED, ABSOLUTE
}

/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component_v001_B_FlexBox_Props {

    readonly children: React.ReactNode

    readonly set_CSS_Position_Fixed? : boolean  //  USE WITH CARE:  Setting position: flex;  eliminates the ability to use browser scrollbars to get to parts of modal dialog outside of the viewport
    readonly heightMaximum : number
    readonly heightMinimum : number
    readonly widthMaximum : number
    readonly widthMinimum : number
    readonly title : string                  // No Title if null or undefined
    readonly title_Component_Callback? : () => JSX.Element   //  ONLY evaluated if 'title' is null or undefined
    readonly close_OnBackgroundClick : boolean
    readonly callbackOnClicked_Close : () => void;    //  Don't show "X" if callbackOnClicked_Close is not populated
    readonly titleBar_LeaveSpaceFor_CloseX?: boolean  //  In formatting the title bar, leave space for the Close "X" even if don't show it
}

interface ModalOverlay_Limelight_Component_v001_B_FlexBox_State {

    _placeholder: unknown
    // modalOverlay_Left? : number;
    // modalOverlay_Top_PositionAbsolute? : number;  // modalOverlay_Top when use position absolute
}


/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component_v001_B_FlexBox extends React.Component< ModalOverlay_Limelight_Component_v001_B_FlexBox_Props, ModalOverlay_Limelight_Component_v001_B_FlexBox_State > {

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _rootDiv_Ref :  React.RefObject<HTMLDivElement>

    private _top__Absolute_Position: string
    private _top__Fixed_Position: string

    private _left__Absolute_Position: string
    private _left__Fixed_Position: string

    private _currentPosition_Fixed: boolean

    /**
     *
     *
     */
    constructor(props : ModalOverlay_Limelight_Component_v001_B_FlexBox_Props) {
        super(props);

        this._rootDiv_Ref = React.createRef();
    }

    /**
     *
     */
    componentDidMount() {

        if ( ! this.props.set_CSS_Position_Fixed ) {
            this._resizeWindow_Handler_Attach()
        }
    }

    /**
     *
     */
    componentWillUnmount() {

        this._resizeWindow_Handler_Remove()
    }

    /**
     *
     */
    private _resizeWindow_Handler_Attach() : void {

        //  Attach resize handler
        window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     *
     */
    private _resizeWindow_Handler_Remove() : void {

        //  Remove resize handler
        window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     * Switch between position of 'absolute' and 'fixed' as needed
     */
    private _resizeWindow_Handler() : void {
        try {

            if ( ! this._rootDiv_Ref.current ) {
                return; // EARLY RETURN
            }

            if ( this._compute_Use_Position_Fixed_Absolute() === Internal__PositionToUse_Fixed_Absolute_Enum.ABSOLUTE ) {

                if ( this._currentPosition_Fixed ) {

                    this._rootDiv_Ref.current.style.position = "absolute"
                    this._rootDiv_Ref.current.style.top = this._top__Absolute_Position
                    this._rootDiv_Ref.current.style.left = this._left__Absolute_Position

                    this._currentPosition_Fixed = false
                }

            } else {

                if ( ! this._currentPosition_Fixed ) {

                    this._rootDiv_Ref.current.style.position = "fixed"
                    this._rootDiv_Ref.current.style.top = this._top__Fixed_Position
                    this._rootDiv_Ref.current.style.left = this._left__Fixed_Position

                    this._currentPosition_Fixed = true
                }
            }

        } catch( e ) {
            console.log("Exception caught in _resizeWindow_Handler()");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _compute_Use_Position_Fixed_Absolute() : Internal__PositionToUse_Fixed_Absolute_Enum {

        const window_innerWidth = window.innerWidth;
        const window_innerHeight = window.innerHeight;

        if ( ( window_innerWidth - this.props.widthMinimum < _minimumPaddingFromViewPort_WidthComputation ) ||
            ( window_innerHeight - this.props.heightMinimum < _minimumPaddingFromViewPort_HeightComputation ) ) {
            //  Min window size NOT fit in viewport so use position absolute
            return Internal__PositionToUse_Fixed_Absolute_Enum.ABSOLUTE
        }

        return Internal__PositionToUse_Fixed_Absolute_Enum.FIXED
    }

    /**
     *
     */
    render () {

        const background_ClassName_Main = "modal-overlay-page-background "

        let background_ClassName_Addition = "";

        let backgroundOnClickHandler = null;

        if ( this.props.close_OnBackgroundClick ) {
            background_ClassName_Addition = " modal-overlay-page-background-clickable "
            backgroundOnClickHandler = this.props.callbackOnClicked_Close
        }

        const background_ClassName = background_ClassName_Main + background_ClassName_Addition;

        //  Adjust for scrolled window
        const leftAddition_Position_Absolute = window.scrollX;
        const topAddition_Position_Absolute = window.scrollY;

        //  Width and Height:
        //          Starting size Computation: Smaller of  ( {percentageOfViewPort_...}% of viewport) OR (100% viewport - 100 px)  --  100px to provide 50 px margin on each side
        //          Restricted by provided __Minimum and __Maximum values

        //  Left and Top compute to center in the viewport

        //  When viewport too small to fit __Minimum values, the __Minimum are used and the browser main scrollbars provide access all parts of the overlay.

        const percentageOfViewPort_Width = "93vw";
        const percentageOfViewPort_Height = "93vh";

        //  'left' has 'final' min value of 10px.  'top' has 'final' min value of 10px.   These are so overlay cannot positioned off left or top of screen where it would be impossible to scroll to.

        //   '6px' is space for scrollbar when present since 100vx 100vh don't take that space taken into account

        const width = "min( max( min( " + percentageOfViewPort_Width + ", calc( 100vw - " + _minimumPaddingFromViewPort_WidthComputation + "px ) ), " +
            this.props.widthMinimum + "px), " + this.props.widthMaximum + "px )";

        const left_MostOf_Value =
            "px + max( calc( calc( calc( 100vw - 6px ) / 2) " +
            " - calc( min( max( min( " + percentageOfViewPort_Width + ", calc( 100vw - " + _minimumPaddingFromViewPort_WidthComputation + "px ) ), " +
            this.props.widthMinimum + "px), " + this.props.widthMaximum + "px ) / 2 ) ), 10px) )";

        this._left__Absolute_Position = "calc( " + leftAddition_Position_Absolute /* window.scrollX */ + left_MostOf_Value;
        this._left__Fixed_Position = "calc( " + 0 + left_MostOf_Value;

        const height = "min( max( min( " + percentageOfViewPort_Height + ", calc( 100vh - " + _minimumPaddingFromViewPort_HeightComputation + "px ) ), " +
            this.props.heightMinimum + "px), " + this.props.heightMaximum + "px )";

        const top_MostOf_Value =
            "px + max( calc( calc( calc( 100vh - 6px ) / 2) " +
            " - calc( min( max( min( " + percentageOfViewPort_Height + ", calc( 100vh - " + _minimumPaddingFromViewPort_HeightComputation + "px ) ), " +
            this.props.heightMinimum + "px), " + this.props.heightMaximum + "px ) / 2 ) ), 10px) )"

        this._top__Absolute_Position = "calc( " + topAddition_Position_Absolute /* window.scrollY */ + top_MostOf_Value;
        this._top__Fixed_Position = "calc( " + 0 + top_MostOf_Value;

        //

        let positionToUse_Fixed_Absolute_Enum: Internal__PositionToUse_Fixed_Absolute_Enum = Internal__PositionToUse_Fixed_Absolute_Enum.ABSOLUTE

        if ( this.props.set_CSS_Position_Fixed ) {

            positionToUse_Fixed_Absolute_Enum = Internal__PositionToUse_Fixed_Absolute_Enum.FIXED;
        } else {
            if ( this._compute_Use_Position_Fixed_Absolute() === Internal__PositionToUse_Fixed_Absolute_Enum.FIXED ) {

                positionToUse_Fixed_Absolute_Enum = Internal__PositionToUse_Fixed_Absolute_Enum.FIXED;
            }
        }

        let left = this._left__Absolute_Position;
        let top = this._top__Absolute_Position;

        this._currentPosition_Fixed = false

        if ( positionToUse_Fixed_Absolute_Enum === Internal__PositionToUse_Fixed_Absolute_Enum.FIXED ) {

            left = this._left__Fixed_Position;
            top = this._top__Fixed_Position;

            this._currentPosition_Fixed = true
        }

        const modal_overlay_container_css : React.CSSProperties = {
            position: "absolute",   // repeat what is in CSS
            width: width,
            height: height,
            left: left,
            top: top
        }

        if ( positionToUse_Fixed_Absolute_Enum === Internal__PositionToUse_Fixed_Absolute_Enum.FIXED ) {
            modal_overlay_container_css.position = "fixed"
        }

        return (
            <div >
                <div className={ background_ClassName }
                    onClick={ backgroundOnClickHandler }
                >
                </div>

                <div
                    ref={ this._rootDiv_Ref }
                    className="modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container"
                    style={ modal_overlay_container_css }
                >

                    { (this.props.title || this.props.title_Component_Callback) ? (

                            <div className="top-level fixed-height modal-overlay-header" style={ { width: "100%" } }>
                                { ( this.props.callbackOnClicked_Close ) ? (
                                    <h1 className="modal-overlay-X-icon" onClick={ this.props.callbackOnClicked_Close } >X</h1>
                                ): null }
                                { ( ( ! this.props.callbackOnClicked_Close ) && ( this.props.titleBar_LeaveSpaceFor_CloseX ) ) ? (
                                    <h1 className="modal-overlay-X-icon" style={ { visibility: "hidden" } } >X</h1>
                                ): null }
                                <h1 className="modal-overlay-header-text">
                                    { ( this.props.title ) ? (
                                        this.props.title
                                    ) : (
                                        this.props.title_Component_Callback()
                                    )}
                                </h1>
                            </div>
                    ): null }

                    { this.props.children }

                </div>

            </div>
        );
    }
}
