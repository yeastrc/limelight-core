
// limelight__Sort_ArrayOfNumbers_SortArrayInPlace.ts

/**
 * Sort existing array in place
 *
 * @param arrayOfNumbers
 */
export function limelight__Sort_ArrayOfNumbers_SortArrayInPlace(arrayOfNumbers : Array<number> ) : void {

    arrayOfNumbers.sort((a, b) => {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    })
}
