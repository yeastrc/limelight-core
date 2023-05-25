/**
 * limelight__Limelight_Colors_Etc__SyncWith_global.scss__Constants.ts
 *
 * Main colors in Limelight:   Sync with CSS in file global.scss  the SASS variables
 *
 *
 */


//  listed here since used in multiple in main object
const  color_white = "#ffffff"

const font_color_dark = "#172B4D"


const site_color_very_dark = "#005606"
const site_color_dark = "#32cd32"
const site_color_medium = "#e4f9e4"
const site_color_light = "#f0f7f0"

//  color for "Filtering"
const filtering_display_color = "#FEDD00"

//  Default font size (Applied to <body> in all_pages.scss)
const default_font_size_number = 14
const default_font_size_string_px = default_font_size_number + "px"


//////////////////////////////

/////   MAIN EXPORTED OBJECT

/**
 *
 *
 * !!  DO NOT TRY TO ALTER THIS.  IT WILL FAIL since Object.freeze() is called on it
 */
export const limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants = {

    color_white,
    site_standard_background_color: color_white,

    font_color_dark: font_color_dark,

    font_color_default: font_color_dark,  // used on <body>

    font_color_light_gray: "#808080", // rgb(128,128,128): Used for 'fading out' text

    font_background_color_gray: "#969696",  // Currently NOT USED.  Was used in Sequence Coverage

    font_background_color_orange: "orange",  // Currently used in Sequence Coverage

    font_background_color_disabled: "#540000",  //  Currently used on "Share Data" on Project Page for Disabled

    site_color_very_dark,
    site_color_dark,
    site_color_medium,
    site_color_light,

    site_color_dark_alt: "#CDCD32",

    site_color_gray: "#d3d3d3",
    site_color_gray_text: "#a3a3a3",

    link_color_unvisited: "#005606",
    link_color_visited: "#005606",
    link_color_hover: site_color_dark,
    link_color_active: site_color_dark,
    link_color_underline: "#65A96A",

//  color for "Filtering"
    filtering_display_color,
    filtering_display_background_color: filtering_display_color, //  Background color for Data Page "Filtering On" and other uses
    filtering_display_border_color: filtering_display_color,

//  The border color used for the NOT of OR/AND/NOT Peptide Filters

    peptide_filter__not_border_color: "red",


//  Error Text

    error_text_color: "#A55353",

// our fonts
    theme_font: "arial, sans_serif",

//  Default font size (Applied to <body> in all_pages.scss)
    default_font_size_number,
    default_font_size_string_px
}

// Prevent changes
Object.freeze( limelight__Limelight_Colors_Etc__SyncWith_globalScss__Constants )
