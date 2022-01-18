/**
 * limelight_Colors_For_SingleSearch__SubSearches.ts
 *
 *  Get Colors for Search Search:  Search Sub Groups (Sub Searches)
 *
 */


import {ColorTheme_IF} from "page_js/data_pages/color_manager/colorTheme_IF";
import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";
import {Limelight_Colors_For_MultipleSearches_and_OtherUses} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches_and_OtherUses";


/**
 *
 */
export class Limelight_Colors_For_SingleSearch__SubSearches {

    private _colorsBy_Index_Array: Array<Limelight_Color_ForTheme_Holder>  = []
    private _colorsBy_SearchSubGroupId_Map_Key_SearchSubGroupId: Map<number, Limelight_Color_ForTheme_Holder> = new Map();

    /**
     * @param searchSubGroupIds
     * @param colorTheme - Optional.  has default colorTheme
     */
    static getInstance(
        {
            searchSubGroupIds,
            colorTheme
        } : {
            searchSubGroupIds: Array<number>
            colorTheme? : ColorTheme_IF

        }) : Limelight_Colors_For_SingleSearch__SubSearches {

        const instance = new Limelight_Colors_For_SingleSearch__SubSearches({ searchSubGroupIds });
        return instance;
    }

    constructor(
        {
            searchSubGroupIds,
            colorTheme
        } : {
            searchSubGroupIds: Array<number>
            colorTheme? : ColorTheme_IF
        }
    ) {
        const limelight_Colors_For_SingleSearch__SubSearches_and_OtherUses = Limelight_Colors_For_MultipleSearches_and_OtherUses.getInstance({ numberOfColors: searchSubGroupIds.length });

        this._colorsBy_Index_Array = limelight_Colors_For_SingleSearch__SubSearches_and_OtherUses.getColors_Array();

        let colorsIndex = 0;
        for ( const searchSubGroupId of searchSubGroupIds ) {

            const colorEntry = this._colorsBy_Index_Array[ colorsIndex ];
            if ( ! colorEntry ) {
                throw Error("this._colorsBy_Index_Array[ colorsIndex ]; returned NOTHING. colorsIndex: " + colorsIndex);
            }

            this._colorsBy_SearchSubGroupId_Map_Key_SearchSubGroupId.set( searchSubGroupId, colorEntry );

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
    get_Color_AsHexString_By_SearchSubGroupId(searchSubGroupId: number ): string {
        const color = this._colorsBy_SearchSubGroupId_Map_Key_SearchSubGroupId.get( searchSubGroupId );
        if ( ! color ) {
            const msg = "get_ColorBy_SearchSubGroupId(...): No color for searchSubGroupId " + searchSubGroupId;
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
    get_Color_AsRGBObject_By_SearchSubGroupId(searchSubGroupId: number ): {red: number, green: number, blue: number} {
        const color = this._colorsBy_SearchSubGroupId_Map_Key_SearchSubGroupId.get( searchSubGroupId );
        if ( ! color ) {
            const msg = "get_ColorBy_SearchSubGroupId(...): No color for searchSubGroupId " + searchSubGroupId;
            console.warn(msg);
            throw Error(msg);
        }
        return color.rgb_Color;
    }
}
