import lowess = require( '@stdlib/stats-lowess' );
import savitzkyGolay from 'ml-savitzky-golay';

/**
 * Applies a LOWESS (Locally Weighted Scatterplot Smoothing) algorithm
 * to a given set of data points to smooth the data.
 *
 * @param {number[]} xCoords - An array of x-coordinates.
 * @param {number[]} yCoords - An array of y-coordinates.
 * @param {number} [smoothingFactor=0.25] - The smoothing factor to be used by the LOWESS algorithm.
 *                                          A smaller value results in more smoothing,
 *                                          and a larger value results in less smoothing.
 *                                          If not provided, defaults to 0.25.
 * @returns {object} An object with properties 'x' and 'y', each an array of coordinates after smoothing.
 */
function smoothLowess(xCoords: number[], yCoords: number[], smoothingFactor: number = 0.25): {x: number[], y: number[]} {
    // Apply the lowess smoother
    const smoothed = lowess(xCoords, yCoords, {f: smoothingFactor});
    return smoothed;
}

/**
 * Applies a Savitzky Golay algorithm
 * to a given set of data points to smooth the data.
 *
 * @param {number[]} xCoords - An array of x-coordinates.
 * @param {number[]} yCoords - An array of y-coordinates.
 * @param {number} [windowSize=7] -  The number of points used to make the filtering evaluation, the default value is 7.
 * @param {number} [derivative=0] -  The grade for the derivative, the default value is 0.
 * @param {number} [polynomial=2] -  The grade of the polynomial function to
 *                                   use for calculation, the default value is 2.
 * @returns {object} An object with properties 'x' and 'y', each an array of coordinates after smoothing.
 */
function smoothSavitzkyGolay(
    xCoords: number[],
    yCoords: number[],
    windowSize: number = 7,
    derivative: number = 0,
    polynomial: number = 2)
    :{x: number[], y: number[]} {

        let pad = "pre" as const;
        let padValue = "replicate" as const;

        let options = {
            windowSize: windowSize,
            derivative: derivative,
            polynomial: polynomial,
            pad: pad,
            padValue: padValue
        }

        let ans = savitzkyGolay(yCoords, 1, options);
        return {x: xCoords, y: ans};
    }


export { smoothLowess, smoothSavitzkyGolay };
