/**
 * qcViewPage_SingleSearch__SubSearches__ComputeColorsForSearches.ts
 *
 * QC Page Search Search:  Search Sub Groups (Sub Searches) : Color scheme for Searches
 *
 */

import {Limelight_Colors_For_SingleSearch__SubSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_SingleSearch__SubSearches";

/**
 * Compute colors for searches
 */
export class QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches {

    private _limelight_Colors_For_SingleSearch__SubSearches: Limelight_Colors_For_SingleSearch__SubSearches

    constructor(
        {
            searchSubGroupIds
        } : {
            searchSubGroupIds: Array<number>
        }
    ) {
        this._limelight_Colors_For_SingleSearch__SubSearches = Limelight_Colors_For_SingleSearch__SubSearches.getInstance({ searchSubGroupIds });
    }

    /**
     *
     * @param index
     */
    get_Color_AsHexString_By_Index(index: number ): string {

        return this._limelight_Colors_For_SingleSearch__SubSearches.get_Color_AsHexString_By_Index( index );
    }

    /**
     *
     * @param searchSubGroupId
     */
    get_Color_AsHexString_By_SearchSubGroupId(searchSubGroupId: number ): string {

        return this._limelight_Colors_For_SingleSearch__SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroupId);
    }

    /**
     *
     * @param index
     */
    get_Color_AsRGBObject_By_Index(index: number ): {red: number, green: number, blue: number} {

        return this._limelight_Colors_For_SingleSearch__SubSearches.get_Color_AsRGBObject_By_Index(index);
    }

    /**
     *
     * @param searchSubGroupId
     */
    get_Color_AsRGBObject_By_SearchSubGroupId(searchSubGroupId: number ): {red: number, green: number, blue: number} {

        return this._limelight_Colors_For_SingleSearch__SubSearches.get_Color_AsRGBObject_By_SearchSubGroupId(searchSubGroupId);
    }
}