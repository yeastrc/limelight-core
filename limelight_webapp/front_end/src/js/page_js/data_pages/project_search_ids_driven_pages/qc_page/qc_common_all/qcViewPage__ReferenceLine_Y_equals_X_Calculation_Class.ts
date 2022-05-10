/**
 * qcViewPage__ReferenceLine_Y_equals_X_Calculation_Class.tsx
 *
 * QC Page:  Reference Line at y = x
 *
 *
 *  top right of reference line: min(max(x), max(y))
 *  bottom left of reference line: max( min(x), min(y) )
 *
 *  top right should be 0,0 unless there are positive values
 *  bottom left should be 0,0 unless there are negative values
 *
 */

export class QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class {

    private _max_X;
    private _max_Y;

    private _min_X;
    private _min_Y;

    x_Entry( x_Entry ) {

        if ( this._max_X === undefined ) {
            this._max_X = x_Entry;
            this._min_X = x_Entry;
        } else {
            if ( this._max_X < x_Entry ) {
                this._max_X = x_Entry;
            }
            if ( this._min_X > x_Entry ) {
                this._min_X = x_Entry;
            }
        }
    }

    y_Entry( y_Entry ) {

        if ( this._max_Y === undefined ) {
            this._max_Y = y_Entry;
            this._min_Y = y_Entry;
        } else {
            if ( this._max_Y < y_Entry ) {
                this._max_Y = y_Entry;
            }
            if ( this._min_Y > y_Entry ) {
                this._min_X = y_Entry;
            }
        }
    }

    get_ReferenceLine_XY() {

        let topRight = Math.min( this._max_X, this._max_Y );

        let bottomLeft = Math.max( this._min_X, this._min_Y );

        //  Reference line should always touch 0,0 (zero,zero)

        if ( topRight < 0 ) {
            topRight = 0;
        }

        if ( bottomLeft > 0 ) {
            bottomLeft = 0;
        }

        return {
            referenceLine_TopRight_XY: topRight,
            referenceLine_BottomLeft_XY: bottomLeft
        }
    }
}