

import { ColorUtils } from 'page_js/data_pages/color_manager/colorUtils';
import {Limelight_Color_ForTheme_Holder} from "page_js/data_pages/color_manager/limelight_ColorHolderClasses";
import {ColorTheme_IF} from "page_js/data_pages/color_manager/colorTheme_IF";

/**
 * 
 */
export class ColorThemePretty implements ColorTheme_IF {

    getThemeName() {
        return ColorThemePretty.getThemeName_Static();
    }

    getColors( count ): Array<Limelight_Color_ForTheme_Holder>  {

        return ColorThemePretty.getColors_Static( count );
    }

    static getThemeName_Static() {
        return "ColorThemePretty";
    }

    static getColors_Static( count ): Array<Limelight_Color_ForTheme_Holder>  {

        let colors: Array<Limelight_Color_ForTheme_Holder> = [];
        
        for( let i = 0; i < count; i++ ) {

            const hueDivider = 360 / count;
            const saturation = 0.39;
            const brightness = 0.60;

            let hue =  (360 - (hueDivider * i ) - 1) / 360;
            hue += 0.3;
            if(hue >= 1) {
                hue = hue - 1;
            }

            const rgb_Color = ColorUtils.HSVtoRGB({ hue, saturation, brightness });

            const hex_ColorString_NoHashPrefix = ColorUtils.RGB_to_Hex_ColorString_NoHashPrefix(rgb_Color);

            const colorObject : Limelight_Color_ForTheme_Holder = {
                rgb_Color,
                hex_ColorString_NoHashPrefix
            }
            colors.push( colorObject );

        }
        
        return colors;
    }

    
}