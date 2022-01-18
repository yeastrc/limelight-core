/**
 * qcViewPage_MultipleSearches__ComputeColorsForSearches.ts
 *
 * QC Page Multiple Searches : Color scheme for Searches
 *
 */

import {Limelight_Colors_For_MultipleSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches";

/**
 * Compute colors for searches
 */
export class QcViewPage_MultipleSearches__ComputeColorsForSearches {

    private _limelight_Colors_For_MultipleSearches: Limelight_Colors_For_MultipleSearches

    constructor(
        {
            projectSearchIds
        } : {
            projectSearchIds: Array<number>
        }
    ) {
        this._limelight_Colors_For_MultipleSearches = Limelight_Colors_For_MultipleSearches.getInstance({ projectSearchIds });
    }

    /**
     *
     * @param index
     */
    get_Color_AsHexString_By_Index(index: number ): string {

        return this._limelight_Colors_For_MultipleSearches.get_Color_AsHexString_By_Index( index );
    }

    /**
     *
     * @param index
     */
    get_Color_AsHexString_By_ProjectSearchId(projectSearchId: number ): string {

        return this._limelight_Colors_For_MultipleSearches.get_Color_AsHexString_By_ProjectSearchId(projectSearchId);
    }

    /**
     *
     * @param index
     */
    get_Color_AsRGBObject_By_Index(index: number ): {red: number, green: number, blue: number} {

        return this._limelight_Colors_For_MultipleSearches.get_Color_AsRGBObject_By_Index(index);
    }

    /**
     *
     * @param index
     */
    get_Color_AsRGBObject_By_ProjectSearchId(projectSearchId: number ): {red: number, green: number, blue: number} {

        return this._limelight_Colors_For_MultipleSearches.get_Color_AsRGBObject_By_ProjectSearchId(projectSearchId);
    }
}