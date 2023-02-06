/**
 * qcViewPage__Track_LatestUpdates_For_UserInput.ts
 *
 * QC Page : Track "Latest Updates" at "Top Level" under "Click to Show Filters and Options" for User Input
 *
 * Object of this class will be passed via registration callback and also via normal React props flow
 *
 */

/**
 *
 */
export class QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput {

    private _track_LatestUpdates_For_UserInput: object

    constructor() {
        this._track_LatestUpdates_For_UserInput = {}
    }

    /**
     *
     * @param otherObject
     * @returns true if other object 'equals' this object
     */
    equals( otherObject : QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput ) : boolean {
        if ( ! otherObject ) {
            const msg = "equals(...)  otherObject is NOT populated"
            console.warn(msg)
            throw Error(msg)
        }

        if ( otherObject._track_LatestUpdates_For_UserInput === this._track_LatestUpdates_For_UserInput ) {
            return true
        }

        return false;
    }

}

