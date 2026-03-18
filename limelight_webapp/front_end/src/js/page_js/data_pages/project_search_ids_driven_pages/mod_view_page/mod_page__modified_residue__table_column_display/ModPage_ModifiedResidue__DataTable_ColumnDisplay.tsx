/**
 * ModPage_ModifiedResidue__DataTable_ColumnDisplay.tsx
 */

import React from "react";

import {
    LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT
} from "page_js/constants_across_webapp/residue_letter_constants/limelight__ResidueLetters_All_InAlphaOrder_Constant";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants
} from "page_js/common_all_pages/limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants";
import {
    ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator";
import {
    open_ModPage_ModifiedResidue__Overlay
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__modified_residue__overlay/ModPage_ModifiedResidue__Overlay";
import { tooltipClasses } from "@mui/material/Tooltip";


const _BAR_COLOR__YES_LOCALIZED = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_very_dark
const _BAR_COLOR__NOT_LOCALIZED_UNLOCALIZED = limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants.site_color_orange


const _BAR_HEIGHT_MAX = 20
const _BAR_HEIGHT_MIN = 2

const _SINGLE_LETTER_FONT_SIZE = 12

const _SINGLE_LETTER_WIDTH = 10   // will be centered in that space
const _SINGLE_LETTER_HEIGHT = 15  //  Observed for font size of 12

const _SINGLE_LETTER_Y_OFFSET_FROM_BAR = 7  //  looks like 2 but needed 7 to properly position

const _RESIDUE_LETTERS_ALL_LENGTH = LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT.length


const _SVG_WIDTH = _SINGLE_LETTER_WIDTH * _RESIDUE_LETTERS_ALL_LENGTH
const _SVG_HEIGHT = _BAR_HEIGHT_MAX + _SINGLE_LETTER_HEIGHT - 3  // - 3 since that positions the bottom of the svg at the bottom of the letters

/**
 *
 */
export const ModPage_ModifiedResidue__DataTable_ColumnDisplay = {

    columnWidth: _SVG_WIDTH,

    get_DataTable_ModifiedResidues_Column_Contents: function (
        {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
        } : {
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
        }
    ) : React.JSX.Element {

        return _get_DataTable_ModifiedResidues_Column_Contents({
            modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
        })
    }

} as const

//////////


//
//      Linear scale.
//

/**
 *
 * @param modifiedResidues_Map__Value_PsmCount_Key_ModifiedResidueLetter
 */
const _get_DataTable_ModifiedResidues_Column_Contents = function (
    {
        modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
    } : {
        modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator: ModPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator
    }
) : React.JSX.Element {

    //  Compute Max Value

    const _MIN_MAX_NOT_SET: number = undefined

    let count_Localized_Unlocalized_Combined_MAX_VALUE = _MIN_MAX_NOT_SET

    if ( modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.is_No_ResidueLetters() ) {

        count_Localized_Unlocalized_Combined_MAX_VALUE = 0

    } else {

        for ( let letterIndex = 0; letterIndex < _RESIDUE_LETTERS_ALL_LENGTH; letterIndex++ ) {

            const residueLetter = LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT[ letterIndex ]

            let count_Localized_Unlocalized_Combined = 0

            {
                let count_Entry = modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ModificationCount_For_ResidueLetter__YES_Localized_Modifications( residueLetter )
                if ( count_Entry ) {
                    count_Localized_Unlocalized_Combined += count_Entry
                }
            }
            {
                let count_Entry = modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ModificationCount_For_ResidueLetter__NOT_Localized_Unlocalized( residueLetter )
                if ( count_Entry ) {
                    count_Localized_Unlocalized_Combined += count_Entry
                }
            }

            if ( count_Localized_Unlocalized_Combined_MAX_VALUE === _MIN_MAX_NOT_SET ) {
                count_Localized_Unlocalized_Combined_MAX_VALUE = count_Localized_Unlocalized_Combined
            } else {
                if ( count_Localized_Unlocalized_Combined_MAX_VALUE < count_Localized_Unlocalized_Combined ) {
                    count_Localized_Unlocalized_Combined_MAX_VALUE = count_Localized_Unlocalized_Combined
                }
            }
        }
    }

    // Process to produce JSX Elements

    ///////

    const entries_ForLetters_JSX: Array<React.JSX.Element> = []

    const tooltipRowValues_Array: Array<INTERNAL__SVG_OVERALL_TOOLTIP_ROW_Values> = []

    for ( let letterIndex = 0; letterIndex < _RESIDUE_LETTERS_ALL_LENGTH; letterIndex++ ) {

        const residueLetter = LIMELIGHT__RESIDUE_LETTERS_ALL_IN_ALPHA_ORDER_CONSTANT[ letterIndex ]

        let count__YES_Localized = 0
        let count__NOT_Localized_Unlocalized = 0

        {
            let count_Entry = modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ModificationCount_For_ResidueLetter__YES_Localized_Modifications( residueLetter )
            if ( count_Entry ) {
                count__YES_Localized += count_Entry
            }
        }
        {
            let count_Entry = modPage_ResidueLetters_AndTheir_ModificationCounts_Unlocalized_ModificationCounts_RollupAccumulator.get_ModificationCount_For_ResidueLetter__NOT_Localized_Unlocalized( residueLetter )
            if ( count_Entry ) {
                count__NOT_Localized_Unlocalized += count_Entry
            }
        }

        let barHeight__YES_Localized: number = undefined

        let count_FractionOfMaxCount__YES_Localized = 0

        {
            if ( count__YES_Localized === 0 ) {

                barHeight__YES_Localized = 0

            } else {

                count_FractionOfMaxCount__YES_Localized = count__YES_Localized / count_Localized_Unlocalized_Combined_MAX_VALUE

                barHeight__YES_Localized = Math.ceil( count_FractionOfMaxCount__YES_Localized * _BAR_HEIGHT_MAX )

                if ( barHeight__YES_Localized < _BAR_HEIGHT_MIN ) {
                    barHeight__YES_Localized = _BAR_HEIGHT_MIN  // count not zero so barHeight Must be at least _BAR_HEIGHT_MIN
                }
            }
        }

        let barHeight__NOT_Localized_Unlocalized: number = undefined

        let count_FractionOfMaxCount__NOT_Localized_Unlocalized = 0

        {
            if ( count__NOT_Localized_Unlocalized === 0 ) {

                barHeight__NOT_Localized_Unlocalized = 0

            } else {

                count_FractionOfMaxCount__NOT_Localized_Unlocalized = count__NOT_Localized_Unlocalized / count_Localized_Unlocalized_Combined_MAX_VALUE

                barHeight__NOT_Localized_Unlocalized = Math.ceil( count_FractionOfMaxCount__NOT_Localized_Unlocalized * _BAR_HEIGHT_MAX )

                if ( barHeight__NOT_Localized_Unlocalized < _BAR_HEIGHT_MIN ) {
                    barHeight__NOT_Localized_Unlocalized = _BAR_HEIGHT_MIN  // count not zero so barHeight Must be at least _BAR_HEIGHT_MIN
                }
            }
        }

        tooltipRowValues_Array.push({
            residueLetter: residueLetter,
            count__YES_Localized,
            count_FractionOfMaxCount__YES_Localized,
            barHeight__YES_Localized,
            //  NOT Localized - Unlocalized
            count__NOT_Localized_Unlocalized,
            count_FractionOfMaxCount__NOT_Localized_Unlocalized,
            barHeight__NOT_Localized_Unlocalized
        })

        // if ( Number.isNaN( barHeight ) ) {
        //     var z = 0
        // }

        // if ( barHeight < 0 ) {
        //     var z = 0
        // }

        const letter_X_Position = Math.floor( ( letterIndex * _SINGLE_LETTER_WIDTH ) + ( _SINGLE_LETTER_WIDTH / 2 ) )
        const letter_Y_Position = _BAR_HEIGHT_MAX + _SINGLE_LETTER_Y_OFFSET_FROM_BAR

        const element = (

            <React.Fragment key={ letterIndex }>
                <text
                    x={ letter_X_Position }
                    y={ letter_Y_Position }
                    textAnchor="middle"
                    dy=".35em"
                    style={ {
                        fontFamily: "monospace",
                        fontSize: _SINGLE_LETTER_FONT_SIZE,
                        textAnchor: "middle",
                    } }

                >
                    <tspan
                        textAnchor="middle"
                        dy=".35em"
                        style={ {
                            fontFamily: "monospace",
                            fontSize: _SINGLE_LETTER_FONT_SIZE,
                            textAnchor: "middle",
                        } }
                    >
                        { residueLetter }
                    </tspan>
                </text>

                { barHeight__YES_Localized !== 0 ? (
                    <rect
                        x={ ( letterIndex * _SINGLE_LETTER_WIDTH ) + 1 }
                        y={ _BAR_HEIGHT_MAX - barHeight__YES_Localized }
                        width={ _SINGLE_LETTER_WIDTH - 2 }
                        height={ barHeight__YES_Localized }
                        style={ { fill: _BAR_COLOR__YES_LOCALIZED } }
                    />
                ) : null }

                { barHeight__NOT_Localized_Unlocalized !== 0 ? (
                    <rect
                        x={ ( letterIndex * _SINGLE_LETTER_WIDTH ) + 1 }
                        y={ _BAR_HEIGHT_MAX - barHeight__YES_Localized - barHeight__NOT_Localized_Unlocalized }
                        width={ _SINGLE_LETTER_WIDTH - 2 }
                        height={ barHeight__NOT_Localized_Unlocalized }
                        style={ { fill: _BAR_COLOR__NOT_LOCALIZED_UNLOCALIZED } }
                    />
                ) : null }

            </React.Fragment>
        )

        entries_ForLetters_JSX.push( element )
    }

    const Get_SVG_Overall_Tooltip = _get_SVG_Overall_Tooltip  // Make function a component

    return (
        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
            title={
                <Get_SVG_Overall_Tooltip
                    tooltipRowValues_Array={ tooltipRowValues_Array }
                />
            }
            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_NOT_FollowMousePointer_DefaultPosition() }
            disableInteractive={ true }
            placement={ "top" }
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [ 0, -14 ], // [ Skidding <value in px>, Distance  <value in px> ]

                                // "Skidding": The popper is offset along the reference.
                                // "Distance": The popper is offset away from the reference.  Negative value to position closer to reference.

                                //  "Distance" of -14 to overlap what it is tooltip for
                            },
                        },
                    ],
                },
            }}
        >
            <div
                className=" standard-on-hover-show-cover-div-contents--root-element "

                onClick={ event => {
                    event.stopPropagation()
                    open_ModPage_ModifiedResidue__Overlay( { params: { modifiedResidue_RowValues: tooltipRowValues_Array } } )
                } }
            >

                {/*  Render the tooltip on the main page for testing only  */}

                {/*<div style={ { marginTop: 10 } }>*/}
                {/*    REMOVE*/}
                {/*    { _get_SVG_Overall_Tooltip( { tooltipRowValues_Array } ) }*/}
                {/*</div>*/}

                <svg
                    width={ _SVG_WIDTH }
                    height={ _SVG_HEIGHT }
                >
                    { entries_ForLetters_JSX }
                </svg>

                {/*  Cover shown when on hover of parent  */ }

                {/*  Bottom of cover.  black background 0.5 opacity  */ }
                <div
                    className=" standard-on-hover-show-cover-div-contents--shown-cover-root-element standard-black-background-point-5-opacity "
                ></div>
                {/*  Top of cover.  white background centered text  */ }
                <div
                    className=" standard-on-hover-show-cover-div-contents--shown-cover-root-element "
                    style={ {
                        display: "flex",
                        justifyContent: "center", alignItems: "center", height: "100%",
                    } }
                >
                    <div
                        className=" standard-background-color "
                        style={ { margin: 5, padding: 5, fontWeight: "bold" } }
                    >
                        Click for info
                    </div>
                </div>

            </div>
        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
    )

}

/**
 *
 * @param tooltipRowValues_Array
 */
const _get_SVG_Overall_Tooltip = function (
    {
        tooltipRowValues_Array
    }: {
        tooltipRowValues_Array: Array<INTERNAL__SVG_OVERALL_TOOLTIP_ROW_Values>
    }
): React.JSX.Element {

    const _LETTERS_MARGIN_RIGHT = 20
    const _COUNT_MARGIN_RIGHT = 8

    const _DATA_ROWS_MARGIN_BOTTOM = 3

    // const entries_ForLetters_TextLines_ForLogging: Array<string> = []

    const entries_ForLetters_Tooltip_Overall_JSX: Array<React.JSX.Element> = []

    const _BAR_HEIGHT = "80%"

    let max__barHeight__YES_Localized = 0
    let max__barHeight__NOT_Localized_Unlocalized = 0

    for ( const rowValue of tooltipRowValues_Array ) {

        if ( max__barHeight__YES_Localized < rowValue.barHeight__YES_Localized ) {
            max__barHeight__YES_Localized = rowValue.barHeight__YES_Localized
        }
        if ( max__barHeight__NOT_Localized_Unlocalized < rowValue.barHeight__NOT_Localized_Unlocalized ) {
            max__barHeight__NOT_Localized_Unlocalized = rowValue.barHeight__NOT_Localized_Unlocalized
        }
    }

    for ( const rowValue of tooltipRowValues_Array ) {

        // entries_ForLetters_TextLines_ForLogging.push( rowValue.residueLetter + "\t" + rowValue.count )

        const rowElement = (
            <React.Fragment
                key={ rowValue.residueLetter }
            >
                {/*  Localized Data  */ }
                <div
                    style={ {
                        textAlign: "right",
                        // marginRight: _COUNT_MARGIN_RIGHT,
                        // marginBottom: _DATA_ROWS_MARGIN_BOTTOM
                    } }
                >
                    { rowValue.count__YES_Localized.toLocaleString() }
                </div>
                <div
                    style={
                        {
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                            // width: max__barHeight__YES_Localized,
                            // textAlign: "right",
                            // marginBottom: _DATA_ROWS_MARGIN_BOTTOM,
                            // marginRight: 15,
                        }
                    }
                >
                    {/*  Actual Bar */ }
                    <div
                        style={
                            {
                                // display: "inline-block",
                                // fontSize: _BAR_HEIGHT,
                                height: _BAR_HEIGHT,
                                width: rowValue.barHeight__YES_Localized,  //  Using barHeight since that is named for the main page rendering
                                backgroundColor: _BAR_COLOR__YES_LOCALIZED
                            }
                        }
                    >
                        &nbsp;
                    </div>
                </div>

                {/*  Residue Letter  */ }
                <div
                    style={ {
                        textAlign: "center",
                        fontFamily: "monospace",
                        fontWeight: "bold",
                        // paddingLeft: 10,
                        // paddingRight: 10,
                        // paddingBottom: _DATA_ROWS_MARGIN_BOTTOM,
                    } }
                >
                    { rowValue.residueLetter }
                </div>

                {/*  Unlocalized Data  */ }

                <div
                    style={
                        {
                            // marginBottom: _DATA_ROWS_MARGIN_BOTTOM,
                            // marginRight: 15,
                            display: "flex", alignItems: "center"
                        }
                    }
                >
                    {/*  Actual Bar */ }
                    <div
                        style={
                            {
                                height: _BAR_HEIGHT,
                                width: rowValue.barHeight__NOT_Localized_Unlocalized,  //  Using barHeight since that is named for the main page rendering
                                backgroundColor: _BAR_COLOR__NOT_LOCALIZED_UNLOCALIZED
                            }
                        }
                    >
                    </div>
                </div>
                <div
                    style={ {
                        // marginBottom: _DATA_ROWS_MARGIN_BOTTOM
                    } }
                >
                    { rowValue.count__NOT_Localized_Unlocalized.toLocaleString() }
                </div>

            </React.Fragment>
        )


        entries_ForLetters_Tooltip_Overall_JSX.push( rowElement )
    }

    // entries_ForLetters_TextLines_ForLogging.push("")
    // console.log( "entries_ForLetters_TextLines_ForLogging: \n\n" + entries_ForLetters_TextLines_ForLogging.join("\n"))

    return (
        <div>
            <div style={ { textAlign: "center", fontWeight: "bold", marginBottom: 8 } }>
                Modified Residue Counts
            </div>
            <div
                style={ {
                    display: "grid",
                    columnGap: 10, rowGap: 3,
                    gridTemplateColumns: "auto " + max__barHeight__YES_Localized + "px" + " max-content " + max__barHeight__NOT_Localized_Unlocalized + "px" + " auto"
                    //  Columns:  'Yes localized Count' 'Yes localized bar' 'residue' 'Not localized bar' 'Not localized Count'
                    // marginLeft: "auto", marginRight: "auto"
                } }
            >
                {/*  Columns 1, 2  */ }
                <div style={ {
                    textAlign: "right",
                    // marginRight: _COUNT_MARGIN_RIGHT,
                    // marginBottom: 10,
                    gridColumn: " 1 / 3 "
                } }>
                    Localized
                </div>
                <div
                    // style={ { textAlign: "right", marginRight: _LETTERS_MARGIN_RIGHT } }
                >
                    {/*Residue*/}
                </div>
                {/*  Columns 4, 5  */ }
                <div style={ {
                    // marginBottom: 10,
                    gridColumn: " 4 / 6 "
                } }>
                    Unlocalized
                </div>

                { entries_ForLetters_Tooltip_Overall_JSX }
            </div>
        </div>
    )

}


class INTERNAL__SVG_OVERALL_TOOLTIP_ROW_Values {

    residueLetter: string
    //  YES Localized
    count__YES_Localized: number
    count_FractionOfMaxCount__YES_Localized: number
    barHeight__YES_Localized: number
    //  NOT Localized - Unlocalized
    count__NOT_Localized_Unlocalized: number
    count_FractionOfMaxCount__NOT_Localized_Unlocalized: number
    barHeight__NOT_Localized_Unlocalized: number
}
