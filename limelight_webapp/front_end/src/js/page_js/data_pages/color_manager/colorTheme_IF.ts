/**
 * colorTheme_IF.ts
 *
 *
 */

import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";

export interface ColorTheme_IF {

    getThemeName(): any
    getColors( count: any ): Array<Limelight_Color_ForTheme_Holder>;
}