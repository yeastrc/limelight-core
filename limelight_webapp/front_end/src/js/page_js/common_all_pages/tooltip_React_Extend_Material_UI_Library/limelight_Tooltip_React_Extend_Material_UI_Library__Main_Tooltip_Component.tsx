/**
 * limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component.tsx
 *
 * Tooltip from MUI (MaterialUI Library) Formatted for main Limelight Tooltip
 *
 * NOTE: property 'title' can be null which results in NO tooltip being triggered/rendered
 */

import {styled} from "@mui/material/styles";
import Tooltip, {tooltipClasses, TooltipProps} from "@mui/material/Tooltip";
import {limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants} from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import React from "react";




/**
 * Tooltip from MUI (MaterialUI Library) Formatted for main Limelight Tooltip
 *
 * NOTE: property 'title' can be a String in Quotes OR a JSX.ELEMENT (HTML Element)
 *
 * NOTE: property 'title' can be null which results in NO tooltip being triggered/rendered
 *
 * INFO: Set property 'open' on TooltipProps to true to force tooltip to remain displayed for testing so can use DOM inspector on the tooltip
 *
 */
export const Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        //  These override the defaults of the Tooltip
        backgroundColor: theme.palette.common.white,
        color: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.font_color_default,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark,
        fontSize: theme.typography.pxToRem(limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.default_font_size_number),
        fontFamily: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.theme_font,
        maxWidth: 600
    },
}));

/**
 * Create type since all uses will provide own title and children
 */
type Limelight_Tooltip_React_Extend_Material_UI_Library__Main__TooltipProps__Remove_title_children = Omit<TooltipProps, "title" | "children">

/**
 * For Follow Mouse Pointer
 *
 * Use for most properties in use of <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component> above like
 *
 * NOTE: property 'title' can be null which results in NO tooltip being triggered/rendered
 *
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
 *     title={  }
 *     { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
*    >
 *    Put child element here
 *    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
 *
 * Return object with all properties for <Tooltip> component from Material UI, MINUS "title" | "children"
 */
export const limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer = function() : Limelight_Tooltip_React_Extend_Material_UI_Library__Main__TooltipProps__Remove_title_children {

    //  Return a new object on every call since it may be altered
    const tooltipProps__Remove_title_children: Limelight_Tooltip_React_Extend_Material_UI_Library__Main__TooltipProps__Remove_title_children = {
        disableInteractive: true,
        followCursor: true,
        enterDelay: 0,
        leaveDelay: 0
    }

    return tooltipProps__Remove_title_children;
}

/**
 * For NOT Follow Mouse Pointer
 *
 * Use for most properties in use of <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component> above like
 *
 * NOTE: property 'title' can be null which results in NO tooltip being triggered/rendered
 *
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
 *     title={  }
 *     { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition() }
 *    >
 *    Put child element here
 *    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
 *
 *
 * Return object with all properties for <Tooltip> component from Material UI, MINUS "title" | "children"
 */
export const limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition = function() : Limelight_Tooltip_React_Extend_Material_UI_Library__Main__TooltipProps__Remove_title_children {

    //  Return a new object on every call since it may be altered
    const tooltipProps__Remove_title_children: Limelight_Tooltip_React_Extend_Material_UI_Library__Main__TooltipProps__Remove_title_children = {
        disableInteractive: true,
        followCursor: false,
        enterDelay: 0,
        leaveDelay: 0
    }

    return tooltipProps__Remove_title_children;
}
