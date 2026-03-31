/**
 * Limelight__scaleColor_BasedOn_Fraction.ts
 */

/**
 *
 */
export class Limelight__scaleColor_BasedOn_Fraction {

    readonly min_Color_SixHex_WithLeading_Hash: string
    readonly max_Color_SixHex_WithLeading_Hash: string

    private _min_Color_As_RGB: INTERNAL__RGB

    private _max_Color_As_RGB: INTERNAL__RGB

    constructor(
        {
            min_Color_SixHex_WithLeading_Hash, max_Color_SixHex_WithLeading_Hash
        } : {
            min_Color_SixHex_WithLeading_Hash: string
            max_Color_SixHex_WithLeading_Hash: string
        }
    ) {
        this.min_Color_SixHex_WithLeading_Hash = min_Color_SixHex_WithLeading_Hash
        this.max_Color_SixHex_WithLeading_Hash = max_Color_SixHex_WithLeading_Hash

        this._min_Color_As_RGB = _hexColorToRgbColor( min_Color_SixHex_WithLeading_Hash )
        this._max_Color_As_RGB = _hexColorToRgbColor( max_Color_SixHex_WithLeading_Hash )
    }


    /**
     * Interpolates between the min and max colors (added in contructor) by a given factor.
     * @param fraction The scaling factor (0 to 1).
     * @returns The scaled color in Hex color format.
     */
    scaleColor_BetweenMinAndMax_BasedOn_Fraction__Return_HexColorFormat( fraction: number ) {

        const rgb1 = this._min_Color_As_RGB
        const rgb2 = this._max_Color_As_RGB

        const red = rgb1.red + fraction * ( rgb2.red - rgb1.red );
        const green = rgb1.green + fraction * ( rgb2.green - rgb1.green );
        const blue = rgb1.blue + fraction * ( rgb2.blue - rgb1.blue );

        return _rgbColorToHexColor( red, green, blue )
    }

}



/**
 * Converts an RGB object to a hex color string.
 * @param r Red value (0-255).
 * @param g Green value (0-255).
 * @param b Blue value (0-255).
 * @returns The hex color string (e.g., "#FF0000").
 */
function _rgbColorToHexColor(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join('');
}

/**
 * Converts a hex color string (e.g., "#FF0000" or "#ff0000") to an RGB object.
 * Handles both 3-digit and 6-digit hex codes.
 * @param hex The hex color string.
 * @returns An object with r, g, and b properties (0-255).
 */
function _hexColorToRgbColor( hex: string ): INTERNAL__RGB | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace( shorthandRegex, function ( m, r, g, b ) {
        return r + r + g + g + b + b;
    } );

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
    return result ? {
        red: parseInt( result[ 1 ], 16 ),
        green: parseInt( result[ 2 ], 16 ),
        blue: parseInt( result[ 3 ], 16 )
    } : null;
}


class INTERNAL__RGB {
    red: number
    green: number
    blue: number
}