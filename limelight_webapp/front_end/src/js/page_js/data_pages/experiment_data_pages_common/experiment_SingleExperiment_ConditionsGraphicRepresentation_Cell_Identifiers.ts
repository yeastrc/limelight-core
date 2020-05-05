/**
 * experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers.ts
 * 
 * Cell Identifiers in experiment_SingleExperiment_ConditionsGraphicRepresentation.tsx
 * 
 * Identifiers of:
 * 
 *   1)  Specific Condition Cells
 *   2)  'Main Cells': Main grid cells that the condition cells map to (currently hold searches)
 * 
 * 
 */



/**
 * An "Identifier" for a "Main Cell".  The set of Condition Ids that uniquely identify this "Main Cell"
 * 
 * A "Main Cell" contains things like Searches assigned to that cell
 */
export class ExperimentConditions_GraphicRepresentation_MainCell_Identifier {

    cell_ConditionIds_Set : Set<number>;

    constructor( { cell_ConditionIds_Set } : { cell_ConditionIds_Set : Set<number> } ) {

        if ( ! cell_ConditionIds_Set ) {
            const msg = "ExperimentConditions_GraphicRepresentation_MainCell_Identifier::constructor: cell_ConditionIds_Set not set";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( cell_ConditionIds_Set.size > 0 ) ) {
            const msg = "ExperimentConditions_GraphicRepresentation_MainCell_Identifier::constructor: ( ! ( cell_ConditionIds_Set.size > 0 ) )";
            console.warn( msg );
            throw Error( msg );
        }

        this.cell_ConditionIds_Set = cell_ConditionIds_Set;
    }

    /**
     * @returns true if selectedCell_ConditionIds_Set same contents as otherObject.selectedCell_ConditionIds_Set
     */
    equals( otherObject : ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) : boolean {

        if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) ) {
            const msg = "ERROR: ExperimentConditions_GraphicRepresentation_MainCell_Identifier::equals. if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_MainCell_Identifier ) )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( this.cell_ConditionIds_Set.size !== otherObject.cell_ConditionIds_Set.size ) {
            return false; // EARLY RETURN
        }
        for ( const entry of this.cell_ConditionIds_Set ) {
            if ( ! otherObject.cell_ConditionIds_Set.has( entry ) ){
                return false; // EARLY RETURN
            }
        }
        return true;
    }

    /**
     * @returns cell_ConditionIds_Set copied to new Set - Not in any specific order
     */
    get_cell_ConditionIds_AsSet(): Set<number> {
        const result = new Set( this.cell_ConditionIds_Set );
        return result;
    }

    /**
     * @returns cell_ConditionIds_Set copied to Array - Not in any specific order
     */
    get_cell_ConditionIds_AsArray(): Array<number> {
        const result = Array.from( this.cell_ConditionIds_Set );
        return result;
    }
}


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

/**
 * An "Identifier" for a "Condition Cell".  The set of Condition Ids that uniquely identify this "Condition Cell"
 * 
 * A "Condition Cell" contains 1 instance of a specific condition in the Graphic
 * 
 * The cell_ConditionIds_Path_Array is the single condition_id for conditions across the top.
 * The cell_ConditionIds_Path_Array is the path of condition_ids for conditions on the left from the left edge to the specific condition
 */
export class ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier {

    cell_ConditionIds_Path_Array : Array<number>;

    constructor( { cell_ConditionIds_Path_Array } : { cell_ConditionIds_Path_Array : Array<number> } ) {

        if ( ! cell_ConditionIds_Path_Array ) {
            const msg = "ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier::constructor: cell_ConditionIds_Path_Array not set";
            console.warn( msg );
            throw Error( msg );
        }
        if ( ! ( cell_ConditionIds_Path_Array.length > 0 ) ) {
            const msg = "ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier::constructor: ( ! ( cell_ConditionIds_Path_Array.lengthe > 0 ) )";
            console.warn( msg );
            throw Error( msg );
        }

        this.cell_ConditionIds_Path_Array = cell_ConditionIds_Path_Array;
    }

    /**
     * @returns true if cell_ConditionIds_Path_Array same contents as otherObject.cell_ConditionIds_Path_Array
     */
    equals( otherObject : ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) : boolean {

        if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) ) {
            const msg = "ERROR: ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier::equals. if ( ! ( otherObject instanceof ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier ) )";
            console.warn( msg );
            throw Error( msg );
        }
        if ( this.cell_ConditionIds_Path_Array.length !== otherObject.cell_ConditionIds_Path_Array.length ) {
            return false; // EARLY RETURN
        }

        {
            const arrayLengths = this.cell_ConditionIds_Path_Array.length;
            for ( let index = 0; index < arrayLengths; index++ ) {
                const valThis = this.cell_ConditionIds_Path_Array[ index ];
                const valOther = otherObject.cell_ConditionIds_Path_Array[ index ];
                if ( valThis === undefined || valOther === undefined ) {
                    const msg = "ERROR: ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier::equals. if ( valThis === undefined || valOther === undefined ) {";
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( valThis !== valOther ) {
                    return false; // EARLY RETURN
                }
            }
        }
        return true;
    }

    /**
     * @returns true if selectedCell_ConditionIds_Set match parentPath with 1 more entry
     */
    matches_ParentPath_ConditionIds({ parentPath } : { parentPath : Array<number> }) : boolean {

        // - 1 since only check parent path
        if ( this.cell_ConditionIds_Path_Array.length - 1 !== parentPath.length ) {
            return false; // EARLY RETURN
        }

        {
            const arrayLengths = this.cell_ConditionIds_Path_Array.length - 1; // - 1 since only check parent path
            for ( let index = 0; index < arrayLengths; index++ ) {
                const valThis = this.cell_ConditionIds_Path_Array[ index ];
                const valOther =  parentPath[ index ];
                if ( valThis === undefined || valOther === undefined ) {
                    const msg = "ERROR: ExperimentConditions_GraphicRepresentation_ConditionCell_Identifier::matches_ParentPath_ConditionIds. if ( valThis === undefined || valOther === undefined ) {";
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( valThis !== valOther ) {
                    return false; // EARLY RETURN
                }
            }
        }
        return true;
    }

    /**
     * @returns cell_ConditionIds_Path_Array copied to new Array -
     */
    get_cell_ConditionIds_AsArray(): Array<number> {
        const result = Array.from( this.cell_ConditionIds_Path_Array );
        return result;
    }
}
