/**
 * proteinPositionFilter_UserInput__Component__UserSelectionData.ts
 *
 *  Protein Position Filter:  Overlay for user to add/change filters
 *
 *  User Selection Data:  List of User Selections of proteins and positions
 *
 *
 */

/**
 *
 */
export class ProteinPositionFilter_UserInput__Component__UserSelectionData_Root {

    proteins: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein>

    clone() : ProteinPositionFilter_UserInput__Component__UserSelectionData_Root {

        const clone = new ProteinPositionFilter_UserInput__Component__UserSelectionData_Root();
        if ( this.proteins ) {
            clone.proteins = [];
            for ( const protein of this.proteins ) {
                const protein_Clone = protein.clone()
                clone.proteins.push( protein_Clone );
            }
        }
        return clone;
    }
}

/**
 *
 */
export class ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein {

    proteinSequenceVersionId: number
    ranges: Array<ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange>

    clone() : ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein {

        const clone = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleProtein();
        clone.proteinSequenceVersionId = this.proteinSequenceVersionId;
        if ( this.ranges ) {
            clone.ranges = [];
            for ( const range of this.ranges ) {
                const range_Clone = range.clone()
                clone.ranges.push( range_Clone );
            }
        }
        return clone;
    }
}

/**
 *
 */
export class ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange {

    start: number
    end: number

    clone() : ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange {

        const clone = new ProteinPositionFilter_UserInput__Component__UserSelectionData_SingleRange();
        clone.start = this.start;
        clone.end = this.end;

        return clone;
    }
}