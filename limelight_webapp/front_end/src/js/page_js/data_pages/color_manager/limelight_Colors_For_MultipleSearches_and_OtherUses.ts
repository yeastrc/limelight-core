/**
 * limelight_Colors_For_MultipleSearches_and_OtherUses.ts
 *
 *  Get Colors based on Index for a range of index values
 *
 *  Used for Colors for Multiple Searches
 *
 *  Used for Colors for Other Uses like categories within a chart
 *
 */


import {ColorTheme_IF} from "page_js/data_pages/color_manager/colorTheme_IF";
import {ColorThemePretty} from "page_js/data_pages/color_manager/colorTheme_Pretty";
import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";

/**
 *
 */
export class Limelight_Colors_For_MultipleSearches_and_OtherUses {

    /**
     *
     * @param numberOfColors
     * @param colorTheme - Optional.  has default colorTheme
     */
    static getInstance(
        {
            numberOfColors, colorTheme
        } : {
            numberOfColors: number
            colorTheme? : ColorTheme_IF
        }) : Limelight_Colors_For_MultipleSearches_and_OtherUses {

        const instance = new Limelight_Colors_For_MultipleSearches_and_OtherUses({ numberOfColors, colorTheme });
        return instance;
    }

    private colorTheme : ColorTheme_IF
    private colorsComputedArray: Array<Limelight_Color_ForTheme_Holder>

    private constructor(
        {
            numberOfColors, colorTheme
        } : {
            numberOfColors: number
            colorTheme? : ColorTheme_IF
        }) {


        this.colorTheme = colorTheme;
        if ( ! this.colorTheme ) {
            this.colorTheme = new ColorThemePretty()
        }

        this.colorsComputedArray = this.colorTheme.getColors( numberOfColors );
    }

    getColors_Array() : Array<Limelight_Color_ForTheme_Holder> {
        return this.colorsComputedArray;
    }

    /**
     *
     * @param index - zero based index
     */
    getColor_ForIndex( index: number ) : Limelight_Color_ForTheme_Holder {
        if ( index < 0 ) {
            const msg = "getColor_ForIndex: index < 0";
            console.warn(msg);
            throw Error(msg);
        }
        if ( index > this.colorsComputedArray.length - 1 ) {
            const msg = "getColor_ForIndex: index > this.colorsComputedArray.length - 1. this.colorsComputedArray.length - 1: " + ( this.colorsComputedArray.length - 1 );
            console.warn(msg);
            throw Error(msg);
        }
        const result = this.colorsComputedArray[ index ];
        return  result;
    }

    private s() {

//         if( this._theme === undefined ) {
//             this._theme = ColorThemePretty;
//         }
//
//         if( this._searchIds === undefined || this._searchIds.length < 1 ) {
//             return;
//         }
//
//         let colors = this._theme.getColors( this._searchIds.length );
//
    }
}