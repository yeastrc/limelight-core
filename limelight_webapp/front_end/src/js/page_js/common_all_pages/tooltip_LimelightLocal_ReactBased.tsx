/**
 * tooltip_LimelightLocal_ReactBased.tsx
 * 
 * Tooltip - Local to Limelight (Not use a Library) - React Based
 * 
 */

import React from 'react'
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

/**
 * Creates the tooltip and returns object of class tooltip_Limelight_Create_Tooltip
 * 
 * @param tooltip_target_DOM_Element - DOM element to position tooltip by
 * @param tooltipContents - React Component that contains what to put in the tooltip
 * 
 * @returns object of class tooltip_Limelight_Create_Tooltip
 */
export const tooltip_Limelight_Create_Tooltip = function({

    tooltip_target_DOM_Element,
    tooltipContents

} : {

    tooltip_target_DOM_Element : HTMLElement,
    tooltipContents : JSX.Element

}) : Tooltip_Limelight_Created_Tooltip {

    if ( ! tooltip_target_DOM_Element ) {

        const tooltip_Limelight_Created_Tooltip = new Tooltip_Limelight_Created_Tooltip({ tooltip_addedDivElementDOM: null });

        return tooltip_Limelight_Created_Tooltip; // EARLY RETURN
    }

    const tooltip_addedDivElementDOM = document.createElement("div");

    var documentBody = document.querySelector('body');

    documentBody.appendChild( tooltip_addedDivElementDOM );

    // console.log( "mainCellMouseEnter: this._tooltip_addedDivElementDOM:" );
    // console.log( this._tooltip_addedDivElementDOM );
    
    const renderCompletecallbackFcn = ( ) => { };

    //   Data for positioning tooltip at target

    //     The cell to show the tooltip for is target

    const targetDOMElement_domRect = tooltip_target_DOM_Element.getBoundingClientRect();

    /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

    const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
    const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
    const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
    const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

    const tooltip = (
        <Tooltip_Limelight_Component 
            tooltipContents={ tooltipContents }
            targetDOMElement_domRect_Left={ targetDOMElement_domRect_Left }
            targetDOMElement_domRect_Right={ targetDOMElement_domRect_Right }
            targetDOMElement_domRect_Top={ targetDOMElement_domRect_Top }
            targetDOMElement_domRect_Bottom={ targetDOMElement_domRect_Bottom }
        />
    );

    const renderedReactComponent = ReactDOM.render( 
        tooltip, 
        tooltip_addedDivElementDOM,
        renderCompletecallbackFcn 
    );

    const tooltip_Limelight_Created_Tooltip = new Tooltip_Limelight_Created_Tooltip({ tooltip_addedDivElementDOM });

    return tooltip_Limelight_Created_Tooltip;
}




/**
 * class returned from tooltip_Limelight_Create_Tooltip
 *
 */
export class Tooltip_Limelight_Created_Tooltip {

    private _tooltip_addedDivElementDOM : HTMLElement

    constructor({ tooltip_addedDivElementDOM } : { tooltip_addedDivElementDOM : HTMLElement }) {
        this._tooltip_addedDivElementDOM = tooltip_addedDivElementDOM;
    }

    /**
     * Remove the Tooltip
     *
     */
    removeTooltip() {

        if ( ! this._tooltip_addedDivElementDOM ) {
            // Nothing to remove

            return; // EARLY RETURN
        }

        try {

            const addedDivElementDOM_Local = this._tooltip_addedDivElementDOM;

            this._tooltip_addedDivElementDOM = undefined;

            addedDivElementDOM_Local.style.display = "none"; // Hide Tooltip from view

            //  Defer Removal from DOM so can draw anything else immediately as needed, like another tooltip

            const cleanupCallback = () => {
                try {
                    // console.log("removeTooltip(): cleanupCallback() called " );

                    //  React Unmount

                    ReactDOM.unmountComponentAtNode( addedDivElementDOM_Local );

                    //  Remove containing <div> from DOM

                    addedDivElementDOM_Local.remove();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }

            //  Not in all browsers: window.requestIdleCallback
            //  window.requestIdleCallback not in Typescript declaration since is experimental
            // @ts-ignore comment suppresses all errors in following line.
            if ( window.requestIdleCallback ) {
                try {
                    //  Not in all browsers: window.requestIdleCallback
                    //  window.requestIdleCallback not in Typescript declaration since is experimental
                    // @ts-ignore comment suppresses all errors in following line.
                    window.requestIdleCallback( cleanupCallback );

                } catch ( e ) {
                    //  fall back to window.setTimeout
                    // console.log("removeTooltip(): Exception caught: Falling back to calling window.setTimeout( cleanupCallback, 1000 ); e: ", e );
                    window.setTimeout( cleanupCallback, 1000 );
                }
            } else {
                //  fall back to window.setTimeout
                // console.log("removeTooltip(): No value for window.requestIdleCallback: Falling back to calling window.setTimeout( cleanupCallback, 1000 );" );
                window.setTimeout( cleanupCallback, 1000 );
            }

        } catch( e ) {
            console.warn("class Tooltip_Limelight_Created_Tooltip::removeTooltip: Exception: ", e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}


////////

//  <Tooltip_Limelight_Component>


interface Tooltip_Limelight_Component_Props {

    targetDOMElement_domRect_Left : number;
    targetDOMElement_domRect_Right : number;
    targetDOMElement_domRect_Top : number;
    targetDOMElement_domRect_Bottom : number;
    tooltipContents
}

interface Tooltip_Limelight_Component_State {

    tooltip_Left? : number;
    tooltip_Top_PositionAbsolute? : number;  // tooltip_Top when use position absolute
    tooltip_Bottom_tipTop?
    tooltip_width? : number;
}

/**
 * Tooltip - Local to Limelight (Not use a Library) - React Based
 * 
 */
class Tooltip_Limelight_Component extends React.Component< Tooltip_Limelight_Component_Props, Tooltip_Limelight_Component_State > {

    private tooltip_outer_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted: boolean = false;
    private _timeoutId_ComponentDidMount_RunAfter_SetTimeout: number

    constructor(props : Tooltip_Limelight_Component_Props) {
        super(props);

        this.tooltip_outer_Ref = React.createRef();

        this.state = { 
            tooltip_Top_PositionAbsolute : 0,
            tooltip_Left : -7000, //  Initially render where not visible, off to right of viewport
            tooltip_width: null  // NOT initially set
        };
        // console.log("class TooltipComponent: constructor()");
    }

    componentDidMount() {
        // console.log("class TooltipComponent: componentDidMount()");

        this._componentMounted = true;

        this._timeoutId_ComponentDidMount_RunAfter_SetTimeout =
            window.setTimeout( () => {

                this._processAfter_componentDidMount();

            }, 10 )

    }

    private _processAfter_componentDidMount() {

        if ( ! this._componentMounted ) {

            //  Component no longer mounted.

            return; // EARLY RETURN
        }

        const tooltip_outer_Ref_DOM = this.tooltip_outer_Ref.current;

        if ( ! tooltip_outer_Ref_DOM ) {

            //  DOM element NOT available

            return; // EARLY RETURN
        }

        //   Do this here so have width and height of rendered tooltip

        //  Compute and set tooltip_Left to set horizontal position of tooltip according to:
        //
        //    1)  position of cell (left edge)
        //    2)  width of viewport
        //    3)  width of tooltip
        const vertical_FromCell = 10;

        const minimumVertical_FromBottom = 20;
        const minimumHorizontal_FromRightEdge = 30;

        const targetDOMElement_domRect_Left = Math.min( this.props.targetDOMElement_domRect_Left );
        // const targetDOMElement_domRect_Right = Math.ceil( this.props.targetDOMElement_domRect_Right );
        const targetDOMElement_domRect_Top = Math.min( this.props.targetDOMElement_domRect_Top );
        const targetDOMElement_domRect_Bottom = Math.ceil( this.props.targetDOMElement_domRect_Bottom );


        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const windowScrollX = window.scrollX;
        const windowScrollY = window.scrollY;


        //   TODO   TEMP For seeing tooltip_outer_Ref_DOM
        // tooltip_outer_Ref_DOM.style.backgroundColor = "red"

        const tooltipDiv_domRect = tooltip_outer_Ref_DOM.getBoundingClientRect();

        /// tooltipDiv_domRect properties: left, top, right, bottom, x, y, width, and height

        // const tooltipDiv_domRect_Left = Math.min( tooltipDiv_domRect.left );
        // const tooltipDiv_domRect_Right = Math.ceil( tooltipDiv_domRect.right );
        // const tooltipDiv_domRect_Top = Math.min( tooltipDiv_domRect.top );
        // const tooltipDiv_domRect_Bottom = Math.ceil( tooltipDiv_domRect.bottom );

        const tooltipDiv_domRect_Width = Math.ceil( tooltipDiv_domRect.width );
        const tooltipDiv_domRect_Height = Math.ceil( tooltipDiv_domRect.height );

        //  Compute Tooltip horizontal position

        let tooltip_Left_FromLeftEdgeOfViewport = targetDOMElement_domRect_Left; // Align tooltip to left side of cell

        if ( ( tooltip_Left_FromLeftEdgeOfViewport + tooltipDiv_domRect_Width + minimumHorizontal_FromRightEdge ) > windowWidth ) {

            //  Tooltip CSS for width ensures that the tooltip will fit inside the viewport.
            //     Need to find a value for left that allows the full width of the tooltip to fit inside the viewport.

            //  Tooltip does not fit in viewport with that left so adjust left to the left so tooltip fits in viewport
            tooltip_Left_FromLeftEdgeOfViewport = windowWidth - tooltipDiv_domRect_Width - minimumHorizontal_FromRightEdge;
        }

        //  Compute Tooltip vertical position

        //  First position below DOM element

        //  tooltip_Top  is based on position from top of viewport

        let tooltip_Top_FromTopOfViewport = undefined;

        const tooltip_Top_FromTopOfViewport_Fit_Below_DOMElement = targetDOMElement_domRect_Bottom + vertical_FromCell;

        tooltip_Top_FromTopOfViewport = tooltip_Top_FromTopOfViewport_Fit_Below_DOMElement;  // Try this first

        const tooltipBottomPosition_Plus_MinVerticalDistance = targetDOMElement_domRect_Bottom + vertical_FromCell + tooltipDiv_domRect_Height + minimumVertical_FromBottom;

        if ( tooltipBottomPosition_Plus_MinVerticalDistance > windowHeight ) {
            
            //  Tooltip does not fit in viewport below the Cell

            //   Compute tooltip bottom to position above cell

            const tooltip_Bottom_FromBottom_Compute = windowHeight - ( targetDOMElement_domRect_Top - vertical_FromCell );  // From bottom of viewport

            //   Compute tooltip top when position above cell
            const tooltip_Top_Compute = ( /* bottom of tooltip from top of viewport */ windowHeight - tooltip_Bottom_FromBottom_Compute ) - tooltipDiv_domRect_Height;

            if ( tooltip_Top_Compute > 1 ) {
                
                //  Tooltip top fits in viewport

                tooltip_Top_FromTopOfViewport = tooltip_Top_Compute;
            }
        }

        const tooltip_Left_PositionAbsolute = tooltip_Left_FromLeftEdgeOfViewport + windowScrollX;
        const tooltip_Top_PositionAbsolute = tooltip_Top_FromTopOfViewport + windowScrollY;

        this.setState({ tooltip_width : tooltipDiv_domRect_Width, tooltip_Left: tooltip_Left_PositionAbsolute, tooltip_Top_PositionAbsolute });
    }

    componentWillUnmount() {
        // console.log("class TooltipComponent: componentWillUnmount()");

        this._componentMounted = false;

        try {
            window.clearTimeout( this._timeoutId_ComponentDidMount_RunAfter_SetTimeout );
        } catch (e) {
            //  eat exception
        }
    }

    /**
     * 
     */
    render () {

        const tooltip_Left = this.state.tooltip_Left;
        const tooltip_Top = this.state.tooltip_Top_PositionAbsolute;
        
        const tooltip = (
            <div ref={ this.tooltip_outer_Ref }
                className=" tooltip-limelight-react-based-outer-container "
                style={ { 
                    position: "absolute", 
                    zIndex: 100000,
                    pointerEvents: "none",
                    top: tooltip_Top,
                    left: tooltip_Left,
                    width: this.state.tooltip_width,
                    minWidth: 50, 
                    maxWidth: "calc( 100vw - 100px )", //  Viewport width (100vw) minus 100px.  100px chosen in part to allow for vertical scrollbar
                }}
            >
                <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */ 
                    //  overflowWrap set here since 'tooltipContents' is passed in
                } }
                >
                    { this.props.tooltipContents }
                </span>
            </div>
        );

        return tooltip;
    }
}
