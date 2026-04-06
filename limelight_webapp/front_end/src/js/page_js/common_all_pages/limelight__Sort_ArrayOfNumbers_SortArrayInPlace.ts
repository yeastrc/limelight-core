
// limelight__Sort_ArrayOfNumbers_SortArrayInPlace.ts

/**
 * Sort existing array in place
 *
 * @param arrayOfNumbers
 * @returns the input param arrayOfNumbers
 */
export function limelight__Sort_ArrayOfNumbers_SortArrayInPlace(arrayOfNumbers : Array<number> ) : Array<number> {

    arrayOfNumbers.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    })

    return arrayOfNumbers
}
