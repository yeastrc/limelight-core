/**
 * proteinSequenceWidgetDisplay_SequencePosition_TooltipManager.ts
 * 
 * Protein Sequence Widget Display - Tooltip Manager for Tooltip on Sequence Positions
 * 
 * 
 */


import { tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip } from 'page_js/common_all_pages/tooltip_LimelightLocal_ReactBased';
import React from "react";

/**
 * Class to manage tooltip for Main Cell
 */
export class ProteinSequenceWidgetDisplay_SequencePosition_TooltipDisplayManager {

    private _tooltip_CurrentTooltip : Tooltip_Limelight_Created_Tooltip

    private _tooltip_TimeoutId: number;

	/**
	 * Called when onMouseEnter of Sequence Position
	 */
	mouseEnter_SequencePosition({ 
        
        event, 
        tooltipContents 
    } : {
        event: React.MouseEvent<HTMLElement, MouseEvent>
        tooltipContents : JSX.Element
    }) {

        // console.log("mouseEnter_SequencePosition(...): entered")

        const mouseEnter_target_DOM_Element : HTMLElement = event.target as HTMLElement;

        if ( ! ( mouseEnter_target_DOM_Element instanceof HTMLElement ) ) {
            const msg = "ouseEnter_SequencePosition(...): ( ! ( mouseEnter_target_DOM_Element instanceof HTMLElement ) )"
            console.warn( msg );
            throw Error( msg )
        }
        
        // this._tooltip_TimeoutId = window.setTimeout( ( ) => {

            // console.log("mouseEnter_SequencePosition(...): window.setTimeout entered")

            if ( this._tooltip_CurrentTooltip ) {

                // console.log("mouseEnter_SequencePosition(...): window.setTimeout this._tooltip_CurrentTooltip populated")

                //  Already have tooltip so remove it
    
                this._tooltip_CurrentTooltip.removeTooltip();
    
                this._tooltip_CurrentTooltip = undefined;
            }
    
            const tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element : mouseEnter_target_DOM_Element, tooltipContents });

            this._tooltip_CurrentTooltip = tooltip_Limelight_Created_Tooltip;

        // }, 30 );
        
	}

	/**
	 * Called when onMouseLeave of Sequence Position
	 */
	mouseLeave_SequencePosition({ 
        
        event
    } : {
        event: React.MouseEvent<HTMLElement, MouseEvent>
    }) {

        // console.log("mouseLeave_SequencePosition(...) entered");

        if ( ( ! this._tooltip_CurrentTooltip ) && ( ! this._tooltip_TimeoutId ) ) {

            // console.log("mouseLeave_SequencePosition(...) true: if ( ! this._tooltip_CurrentTooltip ) && ( ! this._tooltip_TimeoutId )");

            //  No <div> to hold tooltip exists so exit

            return; // EARLY EXIT
        }

        if ( this._tooltip_TimeoutId ) {

            // console.log("mouseLeave_SequencePosition(...) this._tooltip_TimeoutId populated");

            window.clearTimeout( this._tooltip_TimeoutId );
        }

        if ( this._tooltip_CurrentTooltip ) {

            // console.log("mouseLeave_SequencePosition(...) this._tooltip_CurrentTooltip populated");
               
            this._tooltip_CurrentTooltip.removeTooltip();
        }

        this._tooltip_TimeoutId = undefined;
        this._tooltip_CurrentTooltip = undefined;

	}

}
