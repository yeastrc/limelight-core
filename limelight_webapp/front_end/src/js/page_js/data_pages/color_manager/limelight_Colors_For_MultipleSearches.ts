/**
 * limelight_Colors_For_MultipleSearches.ts
 *
 *  Get Colors for Multiple Searches
 *
 */


import {ColorTheme_IF} from "page_js/data_pages/color_manager/colorTheme_IF";
import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";
import {Limelight_Colors_For_MultipleSearches_and_OtherUses} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches_and_OtherUses";


/**
 *
 */
export class Limelight_Colors_For_MultipleSearches {

    private _colorsBy_Index_Array: Array<Limelight_Color_ForTheme_Holder>  = []
    private _colorsBy_ProjectSearchId_Map_Key_ProjectSearchId: Map<number, Limelight_Color_ForTheme_Holder> = new Map();

    /**
     * @param projectSearchIds
     * @param colorTheme - Optional.  has default colorTheme
     */
    static getInstance(
        {
            projectSearchIds,
            colorTheme
        } : {
            projectSearchIds: Array<number>
            colorTheme? : ColorTheme_IF

        }) : Limelight_Colors_For_MultipleSearches {

        const instance = new Limelight_Colors_For_MultipleSearches({ projectSearchIds });
        return instance;
    }

    constructor(
        {
            projectSearchIds,
            colorTheme
        } : {
            projectSearchIds: Array<number>
            colorTheme? : ColorTheme_IF
        }
    ) {
        const limelight_Colors_For_MultipleSearches_and_OtherUses = Limelight_Colors_For_MultipleSearches_and_OtherUses.getInstance({ numberOfColors: projectSearchIds.length });

        this._colorsBy_Index_Array = limelight_Colors_For_MultipleSearches_and_OtherUses.getColors_Array();

        let colorsIndex = 0;
        for ( const projectSearchId of projectSearchIds ) {

            const colorEntry = this._colorsBy_Index_Array[ colorsIndex ];
            if ( ! colorEntry ) {
                throw Error("this._colorsBy_Index_Array[ colorsIndex ]; returned NOTHING. colorsIndex: " + colorsIndex);
            }

            this._colorsBy_ProjectSearchId_Map_Key_ProjectSearchId.set( projectSearchId, colorEntry );

            colorsIndex++;
        }

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

    /**
     *
     * @param index
     */
    get_Color_AsHexString_By_ProjectSearchId(projectSearchId: number ): string {
        const color = this._colorsBy_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! color ) {
            const msg = "get_ColorBy_ProjectSearchId(...): No color for projectSearchId " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        return color.hex_ColorString_NoHashPrefix;
    }

    /**
     *
     * @param index
     */
    get_Color_AsRGBObject_By_Index(index: number ): {red: number, green: number, blue: number} {
        const color = this._colorsBy_Index_Array[ index ];
        if ( ! color ) {
            const msg = "get_ColorBy_Index(...): No color for index " + index;
            console.warn(msg);
            throw Error(msg);
        }
        return color.rgb_Color;
    }

    /**
     *
     * @param index
     */
    get_Color_AsRGBObject_By_ProjectSearchId(projectSearchId: number ): {red: number, green: number, blue: number} {
        const color = this._colorsBy_ProjectSearchId_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! color ) {
            const msg = "get_ColorBy_ProjectSearchId(...): No color for projectSearchId " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        return color.rgb_Color;
    }
}
