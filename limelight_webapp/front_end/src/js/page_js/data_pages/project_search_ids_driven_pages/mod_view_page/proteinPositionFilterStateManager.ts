/*
 * Manage state related to which proteins/positions the user
 * has selected for viewing mod data for. 
 */

"use strict";


export class ProteinPositionFilterStateManager {

    private _POSITIONS_KEY_NAME
    private _ALL_KEY_NAME
    private selectedProteinPositions
    private overlay

    constructor() {

        this._POSITIONS_KEY_NAME = 'positions';
        this._ALL_KEY_NAME = 'all';

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
     * Get the positions selected for the given protein. Will return undefined if specific positions
     * in this protein are not specified to be highlighted.
     *
     * @param proteinId
     * @returns {undefined|*}
     */
    getSelectedProteinPositions({proteinId}) {
        proteinId = parseInt( proteinId );

        if( this.getNoProteinsSelected() ) { return undefined; }
        if( this.getIsAllSelected({proteinId})) { return undefined; }
        if( this.selectedProteinPositions[ proteinId ] === undefined  ) { return undefined; }

        return this.selectedProteinPositions[proteinId][this._POSITIONS_KEY_NAME];
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
        if( this.getIsAllSelected({proteinId})) { return true; }
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
        if( this.getIsAllSelected({proteinId})) { return true; }

        if( this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME].has( position ) ) { return true; }
        return false;
    }

    /**
     * Returns true if all positions in the supplied proteinId are meant to be shown
     *
     * @param proteinId
     * @returns {boolean|*}
     */
    getIsAllSelected({ proteinId }) {
        proteinId = parseInt( proteinId );

        if( this.getNoProteinsSelected() ) { return false; }
        if( this.selectedProteinPositions[ proteinId ] === undefined  ) { return false; }

        return this.selectedProteinPositions[ proteinId ][this._ALL_KEY_NAME];
    }

    /**
     * Remove the supplied protein and all positions from the
     * underlying data structure
     */
    removeProtein({ proteinId }) {

        proteinId = parseInt( proteinId );

        delete this.selectedProteinPositions[ proteinId ];
    }

    /**
     * Clear all selections
     */
    clearAll() {
        this.selectedProteinPositions = { };
    }

    /**
     * Adds the supplied protein to the underlying data structure.
     * @param {*} param0 
     */
    addProtein( { proteinId } ) {

        proteinId = parseInt( proteinId );

        if( this.selectedProteinPositions[ proteinId ] === undefined ) {
            this.selectedProteinPositions[ proteinId ] = { };

            this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME] = new Set();
            this.selectedProteinPositions[ proteinId ][this._ALL_KEY_NAME] = false;
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
            this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME].delete( position );
        }

        if( !this.selectedProteinPositions[ proteinId ][this._ALL_KEY_NAME] && this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME].size === 0 ) {
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
        this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME].add( parseInt( position ) );
    }

    /**
     * Indicate that all positions in this protein should be considered
     * Note that this removes any previously indicated specific positions.
     *
     * @param proteinId
     */
    markAllSelected( { proteinId } ) {
        proteinId = parseInt( proteinId );

        this.addProtein( { proteinId } );
        this.selectedProteinPositions[ proteinId ][this._POSITIONS_KEY_NAME] = new Set();   // reset positions to empty set
        this.selectedProteinPositions[ proteinId ][this._ALL_KEY_NAME] = true;
    }

    /**
     * Remove the indicator that all positions in this protein should be considered.
     * Note that because marking all positions as indicated removes any specific positions that were
     * previously marked, unmarking all positions as selected can only mean that no positions are
     * selected. This is effectively equal to removing this protein from this data object.
     *
     * @param proteinId
     */
    unmarkAllSelected({ proteinId }) {
        this.removeProtein({proteinId});
    }

}