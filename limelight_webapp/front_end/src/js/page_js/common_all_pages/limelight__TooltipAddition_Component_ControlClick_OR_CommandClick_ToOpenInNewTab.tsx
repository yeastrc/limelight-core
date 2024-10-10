/**
 * limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab.tsx
 *
 * Addition or whole Tooltip contents - Tells user to Control-click or Command-click to open in new tab
 */

import React from "react";


/**
 * Addition or whole Tooltip contents - Tells user to Control-click or Command-click to open in new tab
 *
 * May return null to not show any contents
 */
export const limelight__TooltipAddition_Component_ControlClick_OR_CommandClick_ToOpenInNewTab = function (  ) {

    // return null //  NOT SHOW anyting and if is only thing in tooltip then tooltip is not shown

    return (
        <div style={ { wordBreak: "break-word" } }>
            <div style={ { wordBreak: "break-word" } }>
                Control-click or Command-click
            </div>
            <div style={ { wordBreak: "break-word" } }>
                to open in new tab.
            </div>
        </div>
    )
}