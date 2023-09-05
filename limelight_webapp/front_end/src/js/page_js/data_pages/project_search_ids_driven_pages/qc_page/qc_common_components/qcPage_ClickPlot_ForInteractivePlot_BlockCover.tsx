/**
 * qcPage_ClickPlot_ForInteractivePlot_BlockCover.tsx
 *
 * Cover Image version of plot so show message on mouse over and execute callback on click
 *
 */


import React from 'react'

/**
 *
 */
interface QcPage_ClickPlot_ForInteractivePlot_BlockCover_Props {

    clickHandler_Callback: () => void

    force_Render_WithoutCallback?: boolean
}

/**
 *
 */
interface QcPage_ClickPlot_ForInteractivePlot_BlockCover_State {

    clickHandler_Callback: () => void
}


/**
 *
 */
export class QcPage_ClickPlot_ForInteractivePlot_BlockCover extends React.Component< QcPage_ClickPlot_ForInteractivePlot_BlockCover_Props, QcPage_ClickPlot_ForInteractivePlot_BlockCover_State > {

    private _onClick_Handler_BindThis = this._onClick_Handler.bind(this);

    private background_Ref :  React.RefObject<HTMLDivElement>
    private containerDiv_Ref :  React.RefObject<HTMLDivElement>

    /**
     *
     */
    constructor(props: QcPage_ClickPlot_ForInteractivePlot_BlockCover_Props) {
        super(props);

        this.background_Ref = React.createRef();
        this.containerDiv_Ref = React.createRef();
    }

    private _onClick_Handler( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {

        if ( this.props.clickHandler_Callback ) {

            this.props.clickHandler_Callback();
        }
    }

    render() {

        if ( ( ! this.props.clickHandler_Callback ) && ( ! this.props.force_Render_WithoutCallback ) ) {

            //  No Click Handler so no render

            return null; // EARLY RETURN
        }

        // Use CSS :hover instead of JS onMouseEnter/onMouseLeave so displays when initially rendered instead of needing mouse enter event after render

        const container_3_Inset = 10; // PX:  sets it in from outer border so text never touches the outer border

        const container_3_Style : React.CSSProperties = {
            inset: container_3_Inset, // Could also set left, right, top, bottom to this value for same effect.
            height: "calc(100% - " + ( container_3_Inset * 2 ) + "px )"
        };

        const topLevel_ClassName__WITHOUT__clicable = " qc-click-plot-for-interactive--msg--cover-overlay-container-1 " // standard-background-color

        let topLevel_ClassName = topLevel_ClassName__WITHOUT__clicable

        if ( ! this.props.force_Render_WithoutCallback ) {

            topLevel_ClassName += " clickable "
        }

        return (

            <div
                ref={ this.containerDiv_Ref }
                className={ topLevel_ClassName }
                onClick={ this._onClick_Handler_BindThis }
            >
                {/*  Position relative to contain position absolute elements under it  */}
                <div className=" qc-click-plot-for-interactive--msg--cover-overlay-container-2 ">

                    {/* Translucent Background under following elements.  Has 'opacity' so keep separate from following elements  */}
                    <div className=" qc-click-plot-for-interactive--msg--cover-background " >
                    </div>

                    {/* Centering Div */}
                    <div
                        style={ container_3_Style }
                        className=" qc-click-plot-for-interactive--msg--cover-overlay-container-3 "
                    >

                        {/* Small Div around displayed text for opaque standard background */}
                        <div className=" qc-click-plot-for-interactive--msg--cover-overlay-container-4 ">
                            <span>
                                Click for Interactive Chart
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}