//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { ColorUtils } from 'page_js/data_pages/color_manager/colorUtils';

/**
 * 
 */
export class ColorThemePretty {

    static getThemeName() {
        return "ColorThemePretty";
    }
    
    static getColors( count ) {

        let colors = [];
        
        for( let i = 0; i < count; i++ ) {

            var hueDivider = 360 / count;
            var saturation = 0.39;
            var brightness = 0.60;
        
            var hue =  (360 - (hueDivider * i ) - 1) / 360;
                
            var rgbObject = ColorUtils.HSVtoRGB( hue, saturation, brightness );
            colors.push( rgbObject );

        }
        
        return colors;
    }

    
}