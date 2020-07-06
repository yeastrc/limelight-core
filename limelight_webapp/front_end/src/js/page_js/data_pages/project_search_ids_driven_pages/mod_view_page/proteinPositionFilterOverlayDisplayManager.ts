/*
 * Manage the display of the protein position filter on the mod page
 */

"use strict";

import { Handlebars } from './mod_ViewPage_Import_Handlebars_AndTemplates_Generic'

import {ModalOverlay} from '../../display_utilities/modalOverlay';

export class ProteinPositionFilterOverlayDisplayManager {

    /**
     * Display the actual overlay. Create it if it doesn't yet exist.
     * 
     * @param {*} param0 
     */
    static displayOverlay( { callbackOnClickedHide, reportedPeptideModData, proteinPositionFilterStateManager, totalPSMCount, proteinData, proteinPositionResidues, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        if( !proteinPositionFilterStateManager.getOverlay() ) {
            proteinPositionFilterStateManager.setOverlay(ProteinPositionFilterOverlayDisplayManager.createOverlay({
                callbackOnClickedHide,
                proteinPositionFilterStateManager,
                proteinData,
                proteinPositionResidues,
                reportedPeptideModData,
                totalPSMCount,
                aminoAcidModStats,
                projectSearchId,
                searchDetailsBlockDataMgmtProcessing,
                dataPageStateManager_DataFrom_Server
            }));
        }

        proteinPositionFilterStateManager.getOverlay().show();

        return false;
    }

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    static createOverlay( { callbackOnClickedHide, proteinPositionFilterStateManager, proteinData, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

        let props : any = { };
        props.width = '800';
        props.height = '500'
        props.title = 'Select Proteins and Positions To Show';
        props.hideOnBackgroundClick = true;
        props.$containerDiv = $('body' );

        if(callbackOnClickedHide) {
            props.callbackOnClickedHide = callbackOnClickedHide;
        }

        let $contentDiv = ProteinPositionFilterOverlayDisplayManager.getFilterDiv();

        let $clear_link = $contentDiv.find('span#clear-all-link');
        $clear_link.click( function( e ) {

            // wipe the state manager
            proteinPositionFilterStateManager.clearAll();

            // unhighlight all
            $contentDiv.find("div.protein-position-filter-protein-listing").removeClass( 'selected' );

            // uncheck all
            $contentDiv.find("div.fake-checkbox.unchecked").css("display", "inline-block");
            $contentDiv.find("div.protein-position-filter-position-checkbox").css("opacity", "1.0");
            $contentDiv.find("div.fake-checkbox.checked").hide();

            return false;
        });

        props.$contentDiv = $contentDiv;

        let overlay = new ModalOverlay( props );

        ProteinPositionFilterOverlayDisplayManager.populateProteinList({
            $contentDiv,
            proteinPositionFilterStateManager,
            proteinData,
            proteinPositionResidues,
            reportedPeptideModData,
            totalPSMCount,
            aminoAcidModStats,
            projectSearchId,
            searchDetailsBlockDataMgmtProcessing,
            dataPageStateManager_DataFrom_Server
        });

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

        let proteinIdNameMap = new Map();

        console.log('proteinData', proteinData);

        for( let searchId of Object.keys( proteinData ) ) {
            for( let proteinId of Object.keys(proteinData[searchId])) {
                if(proteinPositionResidues[searchId][proteinId] !== undefined) {
                    proteinIdNameMap.set(proteinId, proteinData[searchId][proteinId]['annotations'][0]['name']);
                }
            }
        }

        let sortedProteinIds = Array.from(proteinIdNameMap.keys()).sort( function( a, b ) {
            if(proteinIdNameMap.get(a) > proteinIdNameMap.get(b) ) { return 1; }
            if(proteinIdNameMap.get(a) < proteinIdNameMap.get(b) ) { return -1; }
            return 0;
        });

        for( let proteinId of sortedProteinIds ) {

            let proteinName = proteinIdNameMap.get(proteinId);

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

        let proteinName = ProteinPositionFilterOverlayDisplayManager.getProteinName({ proteinId, proteinData });
        let proteinDescription = ProteinPositionFilterOverlayDisplayManager.getProteinDescription({ proteinId, proteinData });

        let template = Handlebars.templates.proteinPositionFilterProteinInformation;

        let html = template( { proteinId, proteinName, proteinDescription }  );

        $proteinInformationDiv.empty();
        $proteinInformationDiv.append( $( html ) );

        // add in check boxes for the modded positions, check the selected ones
        ProteinPositionFilterOverlayDisplayManager.addCheckBoxesForProteinPositions( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
    }

    /**
     * Get the name to use for a protein in the given data.
     * Currently just grabs first instance of it.
     *
     * @param proteinId
     * @param proteinData
     */
    static getProteinName({ proteinId, proteinData }) {
        for( let searchId of Object.keys( proteinData ) ) {
            if( proteinId in proteinData[searchId] ) {
                return proteinData[ searchId ][ proteinId ][ 'annotations' ][ 0 ][ 'name' ];
            }
        }

        return 'not found';     // troublesome
    }

    /**
     * Get the description to use for a protein in the given data
     * Currently just grabs first instance of it
     *
     * @param proteinId
     * @param proteinData
     * @returns {string|*}
     */
    static getProteinDescription({ proteinId, proteinData }) {
        for( let searchId of Object.keys( proteinData ) ) {
            if( proteinId in proteinData[searchId] ) {
                return proteinData[ searchId ][ proteinId ][ 'annotations' ][ 0 ][ 'description' ];
            }
        }

        return 'not found';     // troublesome
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

    static getPossibleModdedPositionsForProtein({ proteinId, proteinPositionResidues }) {

        let positions = new Set();

        for( let searchId of Object.keys( proteinPositionResidues ) ) {
            if(proteinId in (proteinPositionResidues[searchId])) {
                for (let position of Object.keys(proteinPositionResidues[searchId][proteinId])) {
                    positions.add(position);
                }
            }
        }

        const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        return Array.from(positions).sort(collator.compare);
    }

    /**
     * Get the residue located at the given position in the given protein
     *
     * @param proteinId
     * @param position
     * @param proteinPositionResidues
     * @returns {*}
     */
    static getProteinPositionResidue({ proteinId, position, proteinPositionResidues }) {

        //console.log('proteinPositionResidues', proteinPositionResidues);

        for( let searchId of Object.keys( proteinPositionResidues ) ) {
            if( proteinId in proteinPositionResidues[searchId] ) {
                if( position in proteinPositionResidues[searchId][proteinId] ) {
                    return proteinPositionResidues[searchId][ proteinId ][ position ];
                }
            }
        }
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
            let props : any = { };
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

        const moddedPositions = ProteinPositionFilterOverlayDisplayManager.getPossibleModdedPositionsForProtein({ proteinId, proteinPositionResidues });
        console.log('proteinId', proteinId);
        console.log('moddedPositions', moddedPositions);

        if( !moddedPositions || moddedPositions.length < 1) {
            $containerDiv.append( "<div>No modded positions found for protein.</div>" );
            return;
        }


        for( let position of moddedPositions ) {

            let props : any = { };
            props.position = position;
            props.residue = ProteinPositionFilterOverlayDisplayManager.getProteinPositionResidue({ proteinId, position, proteinPositionResidues });
            props.isSelected = proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } );
            props.allSelected = allSelected;

            let template = Handlebars.templates.proteinPositionFilterPositionCheckbox;
            let html = template( props );

            let $checkBoxDiv = $( html );

            //add click handler to this element
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

            $containerDiv.append( $checkBoxDiv );
        }
    }

    /**
     * Handle what happens when a checkbox for a protein position is clicked
     * 
     * @param {*} param0 
     */
    static clickedProteinPosition( { $listingDiv, position, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server }) {

        if(proteinPositionFilterStateManager.getIsAllSelected({ proteinId })) {
            return;
        }

        if( proteinPositionFilterStateManager.getIsProteinPositionSelected( { proteinId, position } ) ) {
            proteinPositionFilterStateManager.markUnSelected( { proteinId, position } );
        } else {
            proteinPositionFilterStateManager.markSelected( { proteinId, position } );
        }

        ProteinPositionFilterOverlayDisplayManager.updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
        ProteinPositionFilterOverlayDisplayManager.updateListingHighlight( { proteinId, proteinPositionFilterStateManager, $listingDiv } );
    }

    /**
     * Handle what happens when the 'show all' option for a protein is selected
     *
     * @param {*} param0
     */
    static clickedProteinAll( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server }) {

        const allSelected = proteinPositionFilterStateManager.getIsAllSelected({ proteinId });

        if( allSelected ) {
            proteinPositionFilterStateManager.unmarkAllSelected( { proteinId } );
        } else {
            proteinPositionFilterStateManager.markAllSelected( { proteinId } );
        }

        ProteinPositionFilterOverlayDisplayManager.updateProteinInformationDiv( { $listingDiv, proteinData, $contentDiv, proteinPositionFilterStateManager, proteinId, proteinPositionResidues, reportedPeptideModData, totalPSMCount, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
        ProteinPositionFilterOverlayDisplayManager.updateListingHighlight( { proteinId, proteinPositionFilterStateManager, $listingDiv } );
    }

    static getPropsForProteinPositionFilterList( { proteinPositionFilterStateManager, proteinData } ) {

        if( proteinPositionFilterStateManager.getNoProteinsSelected() ) {
            return { isEmpty : true }
        }

        let props : any = { };
        props.filterItems = [ ];

        for( let proteinId of Object.keys( proteinPositionFilterStateManager.selectedProteinPositions ) ) {

            let filterItem = { };
            let displayString = ProteinPositionFilterOverlayDisplayManager.getProteinName({ proteinId, proteinData });

            if(!proteinPositionFilterStateManager.getIsAllSelected({proteinId})) {
                const selectedPositions = proteinPositionFilterStateManager.getSelectedProteinPositions({proteinId});

                if(selectedPositions !== undefined) {
                    const selectedPositions_Array = Array.from(selectedPositions) as Array<any>;
                    displayString += ' (Position(s): ';
                    displayString += selectedPositions_Array.sort((a, b) => (a - b)).join(', ');
                    displayString += ')';
                }
            }

            filterItem[ 'displayString' ] = displayString;

            props.filterItems.push( filterItem );
        }

        return props;
    }

}