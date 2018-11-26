/**
 * Code related to generating the peptide  listing subtable when expanding
 * protein rows on the mod view page.
 */

"use strict";

let Handlebars = require('handlebars/runtime');

import { ModDataListingManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataListingManager.js';
import { ProteinDataListingManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinDataListingManager.js';
import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';
import { ProteinPositionFilterOverlayDisplayManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinPositionFilterOverlayDisplayManager.js';
import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import { ModViewDataDownloader } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataDownloader.js';

export class ModViewDataTableRenderer {

	static getPropsForProteinPositionFilterList( { proteinPositionFilterStateManager, proteinData } ) {

		if( proteinPositionFilterStateManager.getNoProteinsSelected() ) {
			return { isEmpty : true }
		}

		let props = { };
		props.filterItems = [ ];

		for( let proteinId of Object.keys( proteinPositionFilterStateManager.selectedProteinPositions ) ) {

			let filterItem = { };
			let displayString = proteinData[ proteinId ][ 'annotations' ][ 0 ][ 'name' ] + ' (Position(s): ';
			displayString += Array.from( proteinPositionFilterStateManager.selectedProteinPositions[ proteinId ] ).sort( (a,b) => (a-b) ).join( ', ' );
			displayString += ')';

			filterItem[ 'displayString' ] = displayString;

			props.filterItems.push( filterItem );
		}
		
		return props;
	}

	static renderDataTable( { reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinData, proteinPositionFilterStateManager, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } ) {

		let tableDisplayHandler = new TableDisplayHandler();
		let modViewDataListingManager = new ModDataListingManager();
		let proteinDataListingManager = new ProteinDataListingManager();

		let $mainContentDiv = $('#mod_list_container');
		$mainContentDiv.empty();

		let template = Handlebars.templates.tablePreHeader;
		let modCount = ModViewDataUtilities.getModCount({ reportedPeptideModData, proteinPositionFilterStateManager } );
		let html = template( { modCount } );
		$mainContentDiv.append( html );

		template = Handlebars.templates.currentProteinPositionFilterList;
		let props = ModViewDataTableRenderer.getPropsForProteinPositionFilterList( { proteinPositionFilterStateManager, proteinData } );
		html = template( props );
		$mainContentDiv.append( html );

		// the columns for the data being shown on the page
		let columns = modViewDataListingManager.getColumnsSingleSearch();

		// the data we're showing on the page
		let modObjects = modViewDataListingManager.getModDataArrayForPage( { reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, proteinPositionFilterStateManager } );
		tableDisplayHandler.addGraphWidths( { dataObjects : modObjects, columns } );

		// add the table to the page

		let tableObject = { };
		tableObject.columns = columns;
		tableObject.dataObjects = modObjects;
		tableObject.expandableRows = true;

		template = Handlebars.templates.dataTable;
		html = template( { tableObject } );
		let $tableContainerDiv = $( html );
		$mainContentDiv.append( $tableContainerDiv );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		// add in the click and over handlers for the rows

		let functionParams = { };
		functionParams.reportedPeptideModData = reportedPeptideModData;
		functionParams.proteinPositionResidues = proteinPositionResidues;
		functionParams.totalPSMCount = totalPSMCount;
		functionParams.aminoAcidModStats = aminoAcidModStats;
		functionParams.proteinData = proteinData;
		functionParams.projectSearchId = projectSearchId;
		functionParams.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
        functionParams.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
        functionParams.proteinPositionFilterStateManager = proteinPositionFilterStateManager;

		tableDisplayHandler.addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction : proteinDataListingManager.createJQueryElementForProteinListing, functionParams } );
		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );


		$( 'div#protein-position-filter-launch' ).click( function(e) {

			ProteinPositionFilterOverlayDisplayManager.displayOverlay( { reportedPeptideModData, proteinPositionFilterStateManager, totalPSMCount, proteinData, proteinPositionResidues, aminoAcidModStats, projectSearchId, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server } );
			return false;
		});

		$( 'div#report-download-link' ).click( function(e) {

			ModViewDataDownloader.downloadTopLevelTextReport( { reportedPeptideModData, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager, projectSearchId } );
			return false;
		});

	}

}