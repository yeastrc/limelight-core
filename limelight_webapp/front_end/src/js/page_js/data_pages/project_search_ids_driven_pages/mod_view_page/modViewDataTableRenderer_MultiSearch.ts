/**
 * Code related to generating the peptide  listing subtable when expanding
 * protein rows on the mod view page.
 */

"use strict";

import { Handlebars } from './mod_ViewPage_Import_Handlebars_AndTemplates_Generic'


import {ModDataListingManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modDataListingManager';
import {ProteinDataListingManager} from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinDataListingManager';
import {TableDisplayHandler} from 'page_js/data_pages/data_tables/tableDisplayHandler';

export class ModViewDataTableRenderer_MultiSearch {

	static isObjectEmpty(obj) {
		if( Object.keys(obj).length === 0 && obj.constructor === Object ) {
			return true;
		}

		return false;
	}

	static getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject }) {

		console.log('called getSortedModsToDisplay()');
		console.log('sortedModMasses', sortedModMasses);
		console.log('vizSelectedStateObject', vizSelectedStateObject);

		if(ModViewDataTableRenderer_MultiSearch.isObjectEmpty( vizSelectedStateObject.data )) {
			return sortedModMasses;
		}

		let sortedModsToDisplay = [ ];
		for( const modMass of sortedModMasses ) {
			for( const projectSearchId of Object.keys(vizSelectedStateObject.data) ) {
				if(vizSelectedStateObject.data[projectSearchId].includes(modMass)) {
					sortedModsToDisplay.push(modMass);
					break;
				}
			}
		}

		return sortedModsToDisplay;
	}

	static getProjectSearchIdsToShowForModMass({ modMass, vizSelectedStateObject, modMap, projectSearchIds }) {

		if(ModViewDataTableRenderer_MultiSearch.isObjectEmpty( vizSelectedStateObject.data )) {
			return [...projectSearchIds];	// return a copy of the array
		}

		let projectSearchIdsToShow = [ ];

		for( const projectSearchId of Object.keys(vizSelectedStateObject.data) ) {
			if (vizSelectedStateObject.data[projectSearchId].includes(modMass)) {
				projectSearchIdsToShow.push(projectSearchId);
			}
		}

		return projectSearchIdsToShow;
	}

	static renderDataTable({
								vizSelectedStateObject,
								reportedPeptideModData,
								proteinPositionResidues,
								aminoAcidModStats,
								proteinData,
								proteinPositionFilterStateManager,
								searchDetailsBlockDataMgmtProcessing,
								dataPageStateManager_DataFrom_Server,
								sortedModMasses,
								modMap,
								projectSearchIds,
								modViewDataManager
	}) {

		// based on user filter, these are the mods to show in the table
		const sortedModsToDisplay = ModViewDataTableRenderer_MultiSearch.getSortedModsToDisplay({ sortedModMasses, vizSelectedStateObject });

		// blow away existing table
		let $mainContainerDiv = $('#mod_list_container');
		$mainContainerDiv.find('#mod-mass-list-outer-container').remove();

		// add the element back in
		let template = Handlebars.templates.listModMassContainer_MultiSearch;
		let html = template( {  } );
		let $modListContainerDiv = $( html );
		$mainContainerDiv.append( $modListContainerDiv );

		// add in divs for each mod mass
		template = Handlebars.templates.listModMass_MultiSearch;
		for( const modMass of sortedModsToDisplay ) {

			let dataObject = { 'modMass': modMass };

			let html = template( dataObject );
			let $modDiv = $( html );
			$modListContainerDiv.append( $modDiv );

			// add click handler for opening and closing mod mass
			let modMassStatusObject = { data: { 'open':false } };

			$modDiv.find( 'div.mod-mass-listing-header' ).click( function(e) {
				ModViewDataTableRenderer_MultiSearch.toggleModMassListing({
					vizSelectedStateObject,
					reportedPeptideModData,
					proteinPositionResidues,
					aminoAcidModStats,
					proteinData,
					proteinPositionFilterStateManager,
					searchDetailsBlockDataMgmtProcessing,
					dataPageStateManager_DataFrom_Server,
					modMap,
					modMassStatusObject,
					modMass,
					$modDiv,
					projectSearchIds,
					modViewDataManager
				})
			});
		}
	}//end renderDataTable

	static toggleModMassListing({
									vizSelectedStateObject,
									reportedPeptideModData,
									proteinPositionResidues,
									aminoAcidModStats,
									proteinData,
									proteinPositionFilterStateManager,
									searchDetailsBlockDataMgmtProcessing,
									dataPageStateManager_DataFrom_Server,
									modMap,
									modMassStatusObject,
									modMass,
									$modDiv,
									projectSearchIds,
									modViewDataManager
								}) {


		modMassStatusObject.data.open = !modMassStatusObject.data.open;
		const shouldBeOpened = modMassStatusObject.data.open;

		// jquery items we need
		let $openArrowIndicator = $modDiv.find('div.open-indicator-image');
		let $closedArrowIndicator = $modDiv.find('div.closed-indicator-image');
		let $dataDiv = $modDiv.find('div.mod-mass-listing-data');

		if(shouldBeOpened) {

			// toggle arrow indicator
			$openArrowIndicator.show();
			$closedArrowIndicator.hide();

			$dataDiv.show();

			if(!modMassStatusObject.data.divExists) {
				// populate the data div

				let tableDisplayHandler = new TableDisplayHandler();
				let modViewDataListingManager = new ModDataListingManager();
				let proteinDataListingManager = new ProteinDataListingManager();

				// the columns for the data being shown on the page
				let columns = modViewDataListingManager.getColumnsMultiSearch();

				// project search ids that should be included for this mod mass
				let projectSearchIdsToShow = ModViewDataTableRenderer_MultiSearch.getProjectSearchIdsToShowForModMass({modMass, vizSelectedStateObject,modMap,projectSearchIds});

				// the data we're showing on the page
				let modObjects = modViewDataListingManager.getModDataArrayForModMassAndProjectSearchIds({
					roundedModMass: modMass,
					projectSearchIds: projectSearchIdsToShow,
					reportedPeptideModData,
					proteinPositionResidues,
					aminoAcidModStats,
					proteinPositionFilterStateManager,
					searchDetailsBlockDataMgmtProcessing
				});

				tableDisplayHandler.addGraphWidths( { dataObjects : modObjects, columns } );

				// add the table to the page

				let tableObject : any = { };
				tableObject.columns = columns;
				tableObject.dataObjects = modObjects;
				tableObject.expandableRows = true;

				let template = Handlebars.templates.dataTable;
				let html = template( { tableObject } );
				let $tableContainerDiv = $( html );
				$dataDiv.append( $tableContainerDiv );

				// add in the click handlers for sorting the table
				tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

				// add in the click and over handlers for the rows

				let functionParams : any = { };
				functionParams.reportedPeptideModData = reportedPeptideModData;
				functionParams.proteinPositionResidues = proteinPositionResidues;
				functionParams.modViewDataManager = modViewDataManager;
				functionParams.aminoAcidModStats = aminoAcidModStats;
				functionParams.proteinData = proteinData;
				functionParams.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
				functionParams.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
				functionParams.proteinPositionFilterStateManager = proteinPositionFilterStateManager;

				tableDisplayHandler.addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction : proteinDataListingManager.createJQueryElementForProteinListing_MultiSearch, functionParams } );
				tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );


			}

		} else {

			// toggle arrow indicator
			$openArrowIndicator.hide();
			$closedArrowIndicator.show();

			// hide the data
			$dataDiv.hide();

			// note that this div is already populated in the status object
			modMassStatusObject.data.divExists = true;
		}

	}


}