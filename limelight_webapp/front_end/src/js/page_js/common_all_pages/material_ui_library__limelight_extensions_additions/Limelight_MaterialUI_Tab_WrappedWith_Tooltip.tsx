/**
 * Limelight_MaterialUI_Tab_WrappedWith_Tooltip.tsx
 *
 * Special needed since MaterialUI <Tab> must be direct children of MaterialUI <Tabs>
 *
 * This component is for use as direct child under <Tabs>
 *
 * Returns:
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
 *     <Tab>
 *
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component> is extension of MUI <Tooltip>
 */


import React from 'react'
import { FC } from "react";

import { Tab, TabProps } from "@mui/material";

import { limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer, Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component } from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants } from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";

interface TabWithTooltipProps extends Omit<TabProps, "label"> {
    tooltipTitle: React.ReactNode
    tabLabel: React.ReactNode

    /**
     * The <Tabs> parent must have the following properties:
     *
     *      // remove the bottom border
     *                             sx={ {
     *                                 '.MuiTabs-indicator': {
     *                                     display: 'none', // Hides the bottom indicator line
     *                                 },
     *                             } }
     */
    tab_use_LimelightStandardFormatting?: boolean
}

/**
 * Special needed since MaterialUI <Tab> must be direct children of MaterialUI <Tabs>
 *
 * This component is for use as direct child under <Tabs>
 *
 * Returns:
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
 *     <Tab>
 *
 * <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component> is extension of MUI <Tooltip>
 *
 * @param tooltipTitle
 * @param tabLabel
 * @param restTabProps
 * @constructor
 */
export const Limelight_MaterialUI_Tab_WrappedWith_Tooltip: FC<TabWithTooltipProps> = function (
    {
        tooltipTitle,
        tabLabel,
        tab_use_LimelightStandardFormatting,
        ...restTabProps
    })  {

    let result: React.JSX.Element = undefined

    if ( tab_use_LimelightStandardFormatting ) {
        result =  (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={ tooltipTitle }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <Tab
                    label={ tabLabel }
                    {...restTabProps}
                    sx={ {
                        '&.Mui-selected': {
                            backgroundColor: limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark,   // 'primary.main', // Use a theme color or a specific color like 'red'
                            color: 'primary.contrastText', // Change text color for better contrast
                        },
                        //  For NOT selected
                        backgroundColor: 'lightgray',

                        //  NOT overridden so always applied
                        borderRadius: '10px', // Optional: add border radius
                        marginRight: '5px', // Optional: add some spacing
                    } }
                />
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        )

    } else {
        result =  (
            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                title={ tooltipTitle }
                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
            >
                <Tab
                    label={ tabLabel }
                    {...restTabProps}
                />
            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
        )


    }


    return result
}