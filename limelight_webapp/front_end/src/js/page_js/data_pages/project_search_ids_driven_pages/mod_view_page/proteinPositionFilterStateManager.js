/*
 * Manage state related to which proteins/positions the user
 * has selected for viewing mod data for. 
 */

"use strict";


export class ProteinPositionFilterStateManager {

    constructor( params ) {
        this.selectedProteinPositions = { };
        this.overlay = undefined;
    }

    /**
     * Hold the overlay that has been constructed for for the user
     * interface for managing these data
     * 
     * @param {*} overlay 
     */
    setOverlay( overlay ) {
        this.overlay = overlay;
    }

    /**
     * Get the overlay that has been constructed for for the user
     * interface for managing these data
     * 
     * @param {*} overlay 
     */
    getOverlay() {
        return this.overlay;
    }

    /**
     * Returns true if no positons of any proteins have been selected
     */
    getNoProteinsSelected() {
        if( Object.keys(this.selectedProteinPositions).length < 1 ) { return true; }
        return false;
    }

    /**
     * Returns true if at least one position in the supplied protein has
     * been selected for viewing
     * 
     * @param {*} param0 
     */
    getIsProteinSelected( { proteinId } ) {

        proteinId = parseInt( proteinId );

        if( this.getNoProteinsSelected() ) { return false; }
        if( this.selectedProteinPositions[ proteinId ] !== undefined  ) { return true; }
        return false;
    }

    /**
     * Returns true if one of the protein sequences in the supplied array is selected
     * 
     * @param {*} param0 
     */
    getIsAProteinInArraySelected( { proteinIdArray } ) {

        for( let proteinId of proteinIdArray ) {
            if( this.getIsProteinSelected( { proteinId : parseInt( proteinId ) } ) ) { return true; }
        }

        return false;
    }

    /**
     * Returns true if one of the positions in the array for this protein is selected
     * @param {*} param0 
     */
    getIsProteinPositionArraySelected( { proteinId, proteinPositionArray } ) {

        proteinId = parseInt( proteinId );

        for( let proteinPosition of proteinPositionArray ) {
            if( this.getIsProteinPositionSelected( { proteinId, position : parseInt( proteinPosition ) } ) ) { return true; }
        }

        return false;
    }

    /**
     * Returns true if the supplied position in the supplied protein has
     * been selected for viewing
     * 
     * @param {*} param0 
     */
    getIsProteinPositionSelected( { proteinId, position } ) {

        position = parseInt( position );
        proteinId = parseInt( proteinId );

        if( this.getNoProteinsSelected() ) { return false; }
        if( this.selectedProteinPositions[ proteinId ] === undefined  ) { return false; }

        if( this.selectedProteinPositions[ proteinId ].has( position ) ) { return true; }
        return false;
    }

    /**
     * Remove the supplied protein and all positions from the
     * underlying data structure
     */
    removeProtein( { proteinId } ) {

        proteinId = parseInt( proteinId );

        delete this.selectedProteinPositions[ proteinId ];
    }

    /**
     * Adds the supplied protein to the underlying data structure.
     * @param {*} param0 
     */
    addProtein( { proteinId } ) {

        proteinId = parseInt( proteinId );

        if( this.selectedProteinPositions[ proteinId ] === undefined ) {
            this.selectedProteinPositions[ proteinId ] = { };
            this.selectedProteinPositions[ proteinId ] = new Set();
        }
    }

    /**
     * De-select the given position in the given protein
     * 
     * @param {*} param0 
     */
    markUnSelected( { proteinId, position } ) {

        position = parseInt( position );
        proteinId = parseInt( proteinId );

        if( this.selectedProteinPositions[ proteinId ] !== undefined ) {
            this.selectedProteinPositions[ proteinId ].delete( position );
        }

        if( this.selectedProteinPositions[ proteinId ].size === 0 ) {
            this.removeProtein( { proteinId } );
        }
    }

    /**
     * Mark the given position in the given protein as to-be-viewed
     * 
     * @param {*} param0 
     */
    markSelected( { proteinId, position } ) {

        position = parseInt( position );
        proteinId = parseInt( proteinId );

        this.addProtein( { proteinId } );
        this.selectedProteinPositions[ proteinId ].add( parseInt( position ) );
    }

}