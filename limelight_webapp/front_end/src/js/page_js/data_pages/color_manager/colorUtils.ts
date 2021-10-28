/**
 * colorUtils.ts
 *
 */

/**
 * 
 */
export class ColorUtils {

    /*
    * h, s, v
    * from: https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
    */
    static HSVtoRGB({ hue, saturation, brightness} : { hue: number, saturation: number, brightness: number }) {

        const h = hue;
        const s = saturation;
        const v = brightness;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        let r, g, b

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            red: Math.round(r * 255),
            green: Math.round(g * 255),
            blue: Math.round(b * 255)
        };
    }

    /**
     *
     * @param red
     * @param green
     * @param blue
     * @constructor
     */
    static RGB_to_Hex_ColorString_NoHashPrefix({ red, green, blue} : { red: number, green: number, blue: number }) : string {

        let redString = red.toString(16);
        if ( redString.length === 1 ) {
            redString = "0" + redString;
        }
        let greenString = green.toString(16);
        if ( greenString.length === 1 ) {
            greenString = "0" + greenString;
        }
        let blueString = blue.toString(16);
        if ( blueString.length === 1 ) {
            blueString = "0" + blueString;
        }

        const result = redString + greenString + blueString;

        return result;
    }
    
}