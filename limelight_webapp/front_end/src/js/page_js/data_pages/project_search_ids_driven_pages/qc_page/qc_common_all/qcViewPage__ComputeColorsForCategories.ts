/**
 * qcViewPage__ComputeColorsForCategories.ts
 *
 * QC Page : Color scheme for Categories
 *
 */

import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";
import {Limelight_Colors_For_MultipleSearches_and_OtherUses} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches_and_OtherUses";


/**
 *
 */
export class QcViewPage__ComputeColorsForCategories {


    private _colorsBy_Index_Array: Array<Limelight_Color_ForTheme_Holder>  = []

    constructor(
        {
            categoryCount
        } : {
            categoryCount: number
        }
    ) {
        const limelight_Colors_For_MultipleSearches_and_OtherUses = Limelight_Colors_For_MultipleSearches_and_OtherUses.getInstance({ numberOfColors: categoryCount });

        this._colorsBy_Index_Array = limelight_Colors_For_MultipleSearches_and_OtherUses.getColors_Array();
    }

    /**
     *
     * @param index
     */
    get_Color_By_Index(index: number ): Limelight_Color_ForTheme_Holder {
        const color = this._colorsBy_Index_Array[ index ];
        if ( ! color ) {
            const msg = "get_ColorBy_Index(...): No color for index " + index;
            console.warn(msg);
            throw Error(msg);
        }
        return color;
    }

    /**
     *
     * @param index
     */
    get_Color_AsHexString_By_Index(index: number ): string {
        const color = this._colorsBy_Index_Array[ index ];
        if ( ! color ) {
            const msg = "get_ColorBy_Index(...): No color for index " + index;
            console.warn(msg);
            throw Error(msg);
        }
        return color.hex_ColorString_NoHashPrefix;
    }
}