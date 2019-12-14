/*
 * Manage the display of the protein position filter on the mod page
 */

"use strict";

import {ModalOverlay} from '../../display_utilities/modalOverlay';
import {ModViewDataTableRenderer} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataTableRenderer.js';

let Handlebars = require('handlebars/runtime');

export class ProteinPositionFilterOverlayDisplayManager {

    /**
     * Display the actual overlay. Create it if it doesn't yet exist.
     * 
     * @param {*} param0 
     */
    static displayOverlay( { reportedPeptideModData, proteinPositionFilterStateManager, totalPSMCount, proteinData, proteinPositionResidues, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        if( !proteinPositionFilterStateManager.getOverlay() ) {
            proteinPositionFilterStateManager.setOverlay( ProteinPositionFilterOverlayDisplayManager.createOverlay( { proteinPositionFilterStateManager, proteinData, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) )
        }

        proteinPositionFilterStateManager.getOverlay().show();

        return false;
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    static createOverlay( { proteinPositionFilterStateManager, proteinData, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let props = { };
        props.width = '800';
        props.height = '500'
        props.title = 'Select Proteins and Positions To Show';
        props.hideOnBackgroundClick = true;
        props.$containerDiv = $('body' );

        let $contentDiv = ProteinPositionFilterOverlayDisplayManager.getFilterDiv();
        props.$contentDiv = $contentDiv;

        let overlay = new ModalOverlay( props );

        ProteinPositionFilterOverlayDisplayManager.populateProteinList( { $contentDiv, proteinPositionFilterStateManager, proteinData, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );

        return overlay;
    }

    /**
     * Get the jquery handle to a div that contains the interface for
     * the protein position filter
     */
    static getFilterDiv() {

        let template = Handlebars.templates.proteinPositionFilterDiv;
        let html = template();

        return $( html );
    }

    /**
     * Populate the list of the proteins in the left panel
     * 
     * @param {*} param0 
     */
    static populateProteinList( { $contentDiv, proteinPositionFilterStateManager, proteinData, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let $proteinListingDiv = $contentDiv.find( 'div#protein-position-filter-protein-list' );

        let sortedProteinIds = Object.keys( proteinData ).filter( a => proteinPositionResidues[ a ] !== undefined ).sort( function( a, b ) {
            if( proteinData[ a ][ 'annotations' ][ 0 ][ 'name' ] > proteinData[ b ][ 'annotations' ][ 0 ][ 'name' ] ) { return 1; }
            if( proteinData[ a ][ 'annotations' ][ 0 ][ 'name' ] < proteinData[ b ][ 'annotations' ][ 0 ][ 'name' ] ) { return -1; }
            return 0;
        });

        for( let proteinId of sortedProteinIds ) {

            let proteinName = proteinData[ proteinId ][ 'annotations' ][ 0 ][ 'name' ];

            $proteinListingDiv.append( ProteinPositionFilterOverlayDisplayManager.getProteinListingDiv( { proteinData, proteinId, proteinPositionFilterStateManager, proteinName, $contentDiv, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) );
        }

    }

    /**
     * Get jquery handle for the div that contains the protein list in the left panel
     * @param {*} param0 
     */
    static getProteinListingDiv( { proteinData, proteinId, proteinPositionFilterStateManager, proteinName, $contentDiv, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server }  ) {

        let template = Handlebars.templates.proteinPositionFilterProteinListing;
        let isSelected = proteinPositionFilterStateManager.getIsProteinSelected( { proteinId } );
        let html = template( { proteinId, proteinName, isSelected }  );

        let $listingDiv = $( html );

        ProteinPositionFilterOverlayDisplayManager.addHoverHandlerToListingDiv( { proteinData, $listingDiv, proteinId, proteinPositionFilterStateManager, $contentDiv, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );

        return $listingDiv;

    }

    /**
     * Update the highlighting of a protein listed in the left panel as appropriate
     * 
     * @param {*} param0 
     */
    static updateListingHighlight( { proteinId, proteinPositionFilterStateManager, $listingDiv } ) {

        $listingDiv.removeClass( 'selected' );

        if( proteinPositionFilterStateManager.getIsProteinSelected( { proteinId } ) ) {
            $listingDiv.addClass( 'selected' );
        }
    }

    /**
     * Add the mousein/mouseout handler for a protein listed in the left hand panel
     * 
     * @param {*} param0 
     */
    static addHoverHandlerToListingDiv( { proteinData, $listingDiv, proteinId, proteinPositionFilterStateManager, $contentDiv, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        $listingDiv.hover(
            
            //mouse enter
            function( e ) { 

                $( 'div.protein-position-filter-protein-listing' ).removeClass( 'hovered' );
                $listingDiv.addClass( 'hovered' );

                ProteinPositionFilterOverlayDisplayManager.updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );

            },
        
            //mouse out
            function( e ) {

                //$listingDiv.removeClass( 'hovered' );

            });
    }


    /**
     * Update the protein information (right-hand) panel for a given protein
     * 
     * @param {*} param0 
     */
    static updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let $proteinInformationDiv = ProteinPositionFilterOverlayDisplayManager.getProteinInformationDiv( { $contentDiv } );

        let proteinName = proteinData[ proteinId ][ 'annotations' ][ 0 ][ 'name' ];
        let proteinDescription = proteinData[ proteinId ][ 'annotations' ][ 0 ][ 'description' ];

        let template = Handlebars.templates.proteinPositionFilterProteinInformation;

        let html = template( { proteinId, proteinName, proteinDescription }  );

        $proteinInformationDiv.empty();
        $proteinInformationDiv.append( $( html ) );

        //  Select all and deselect all links
        const $selector_select_all_positions = $proteinInformationDiv.find(".selector_select_all_positions");
        const $selector_deselect_all_positions = $proteinInformationDiv.find(".selector_deselect_all_positions");

        if ( $selector_select_all_positions.length === 0 ) {
        	console.log("No element with class 'selector_select_all_positions' found");
        }
        if ( $selector_deselect_all_positions.length === 0 ) {
        	console.log("No element with class 'selector_deselect_all_positions' found");
        }
        
        $selector_select_all_positions.click( function( e ) {
        	ProteinPositionFilterOverlayDisplayManager.clickedSelectAllProteinPositions( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server });
            return false;
        });
        $selector_deselect_all_positions.click( function( e ) {
            ProteinPositionFilterOverlayDisplayManager.clickedDeselectAllProteinPositions( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server });
            return false;
        });


        // add in check boxes for the modded positions, check the selected ones
        ProteinPositionFilterOverlayDisplayManager.addCheckBoxesForProteinPositions( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }

    /**
     * Get the jquery handle for the div to use to display protein information in the
     * right-hand panel
     * 
     * @param {*} param0 
     */
    static getProteinInformationDiv( { $contentDiv } ) {
        return $contentDiv.find( 'div#protein-position-filter-right-pane-content' );
    }

    /**
     * Add the checkbox and labels for the positions of a protein in the right-hand panel
     * 
     * @param {*} param0 
     */
    static addCheckBoxesForProteinPositions( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let $containerDiv = $contentDiv.find( 'div.protein-position-filter-position-list-container' );
        $containerDiv.empty();

        const allSelected = proteinPositionFilterStateManager.getIsAllSelected({ proteinId });

        {
            let props = { };
            props.isSelected = allSelected;

            let template = Handlebars.templates.proteinPositionFilterAllCheckbox;
            let html = template( props );

            //add click handler to this element
            let $checkBoxDiv = $( html );
            $checkBoxDiv.click( function( e ) {
                ProteinPositionFilterOverlayDisplayManager.clickedProteinAll({ $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server });
                return false;
            });

            $containerDiv.append( $checkBoxDiv );
        }

        if( proteinPositionResidues[ proteinId ] === undefined ) {
            $containerDiv.append( "<div>No modded positions found for protein.</div>" );
            return;
        }

        for( let position of Object.keys( proteinPositionResidues[ proteinId ] ) ) {

            let props = { };
            props.position = position;
            props.residue = proteinPositionResidues[ proteinId ][ position ];
            props.isSelected = proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } );
            props.allSelected = allSelected;

            let template = Handlebars.templates.proteinPositionFilterPositionCheckbox;
            let html = template( props );

            let $checkBoxDiv = $( html );

            //add click handler to this element IF all isn't selected
            if(!allSelected) {
                $checkBoxDiv.click(function (e) {
                    ProteinPositionFilterOverlayDisplayManager.clickedProteinPosition({
                        $listingDiv,
                        position,
                        proteinData,
                        $contentDiv,
                        proteinPositionFilterStateManager,
                        proteinId,
                        proteinPositionResidues,
                        reportedPeptideModData,
                        totalPSMCount,
                        aminoAcidModStats,
                        projectSearchId,
                        searchDetailsBlockDataMgmtProcessing,
                        dataPageStateManager_DataFrom_Server
                    });
                    return false;
                });
            }

            $containerDiv.append( $checkBoxDiv );
        }
    }

    /**
     * Handle what happens when a checkbox for a protein position is clicked
     * 
     * @param {*} param0 
     */
    static clickedProteinPosition( { $listingDiv, position, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server }) {

        if( proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } ) ) {
            proteinPositionFilterStateManager.markUnSelected( { proteinId, position } );
        } else {
            proteinPositionFilterStateManager.markSelected( { proteinId, position } );
        }

        ProteinPositionFilterOverlayDisplayManager.updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
        ProteinPositionFilterOverlayDisplayManager.updateListingHighlight( { proteinId, proteinPositionFilterStateManager, $listingDiv } );

		ModViewDataTableRenderer.renderDataTable( { reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }

    /**
     * Handle what happens when the 'show all' option for a protein is selected
     *
     * @param {*} param0
     */
    static clickedProteinAll( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server }) {

        const allSelected = proteinPositionFilterStateManager.getIsAllSelected({ proteinId });

        console.log('called clickedProteinAll()', allSelected);


        if( allSelected ) {
            proteinPositionFilterStateManager.unmarkAllSelected( { proteinId } );
        } else {
            proteinPositionFilterStateManager.markAllSelected( { proteinId } );
        }

        ProteinPositionFilterOverlayDisplayManager.updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
        ProteinPositionFilterOverlayDisplayManager.updateListingHighlight( { proteinId, proteinPositionFilterStateManager, $listingDiv } );

        ModViewDataTableRenderer.renderDataTable( { reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }
    


}