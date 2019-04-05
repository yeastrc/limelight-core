/**
 * Code related to generating the protein listing subtable when expanding
 * rows on the mod view page.
 */

"use strict";

let Handlebars = require('handlebars/runtime');

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import { ProteinPositionDataListingManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/proteinPositionDataListingManager.js';
import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';


export class ProteinDataListingManager {

    constructor( params ) {
	
    }

    createJQueryElementForProteinListing( { searchDetailsBlockDataMgmtProcessing, proteinData, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, $clickedRow, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } ) {

		let template = Handlebars.templates.proteinListingExpansionDiv;
        let $containerDiv = $( template() );
        let proteinDataListingManager = new ProteinDataListingManager();
        let modMass = proteinDataListingManager.getModMassFromClickedRow( { $clickedRow } );

        proteinDataListingManager.populateProteinListingDiv( { searchDetailsBlockDataMgmtProcessing, $containerDiv, proteinData, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, modMass, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } );

        return $containerDiv;        
    }

    getModMassFromClickedRow( { $clickedRow } ) {
        return $clickedRow.data( 'id' );
    }

    populateProteinListingDiv( { searchDetailsBlockDataMgmtProcessing, $containerDiv, proteinData, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, modMass, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionFilterStateManager } ) {

        let objectThis = this;
        let proteinDataObjectArray = [ ];

		let totalInstancesOfModdableResiduesForProteinCacheObject = { };


        this.getProteinDataObjectArray( { projectSearchId, $containerDiv, proteinData, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, modMass, proteinDataObjectArray, proteinPositionFilterStateManager } ).then( function( result ) {
			try {
				let tableDisplayHandler = new TableDisplayHandler();
				let proteinPositionDataListingManager = new ProteinPositionDataListingManager();

				let tableObject = { };
				tableObject.columns = objectThis.getColumnsSingleSearch();
				tableObject.dataObjects = proteinDataObjectArray;
				tableDisplayHandler.addGraphWidths( { dataObjects : proteinDataObjectArray, columns : tableObject.columns } );

				tableObject.expandableRows = true;
		
				let template = Handlebars.templates.dataTable;
				let html = template( { tableObject } );
				let $tableContainerDiv = $( html );

				let $myContentDiv = $containerDiv.children( 'div.protein-list-content' );

				$myContentDiv.empty();
				$myContentDiv.append( $tableContainerDiv );

				tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );
				
				let functionParams = { };
				functionParams.reportedPeptideModData = reportedPeptideModData;
				functionParams.projectSearchId = projectSearchId;
				functionParams.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
				functionParams.modMass = modMass;
				functionParams.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
				functionParams.proteinPositionResidues = proteinPositionResidues;
				functionParams.aminoAcidModStats = aminoAcidModStats;
				functionParams.proteinPositionFilterStateManager = proteinPositionFilterStateManager;
		
				tableDisplayHandler.addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction : proteinPositionDataListingManager.createJQueryElementForProteinPositionListing, functionParams } );
				tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });

	};
	
	getProteinNameForProtein({ proteinId, proteinData } ) {

		let proteinNames = [ ];

		for (let annotation of proteinData[ proteinId ][ 'annotations' ] ) {
			proteinNames.push( annotation[ 'name' ] );
		}

		return proteinNames.join( ', ' );

	}

    getProteinDataObjectArray({ projectSearchId, $containerDiv, proteinData, reportedPeptideModData, proteinPositionResidues, totalPSMCount, aminoAcidModStats, modMass, proteinDataObjectArray, proteinPositionFilterStateManager }) {

		const objectThis = this;

        return new Promise(function (resolve, reject) {
			try {
				let proteinIds = ModViewDataUtilities.getProteinIdSetForModMass({ modMass, reportedPeptideModData,proteinPositionFilterStateManager });

				for (let proteinId of proteinIds) {

					let proteinDataObject = {};

					proteinDataObject.uniqueId = proteinId;
					proteinDataObject.id = proteinId;
					proteinDataObject.name = objectThis.getProteinNameForProtein( { proteinId, proteinData } );

					let residues = ModViewDataUtilities.getResiduesForModMass({ modMass, reportedPeptideModData, proteinPositionResidues, proteinId, proteinPositionFilterStateManager });
					proteinDataObject.residues = residues.join( ', ' );

					let positions = ModViewDataUtilities.getPositionsModifiedInProteinForModMass({ proteinId, modMass, reportedPeptideModData, proteinPositionFilterStateManager });
					proteinDataObject.positions = positions.join( ', ' );

					proteinDataObject.psmCount = ModViewDataUtilities.getPSMCountForModMass({ modMass, reportedPeptideModData, aminoAcidModStats, proteinId, proteinPositionFilterStateManager });
					proteinDataObject.peptideCount = ModViewDataUtilities.getPeptideCountForModMass({ modMass, reportedPeptideModData, proteinId, proteinPositionFilterStateManager });

					let totalPSMsContainingResidues = ModViewDataUtilities.getTotalPSMsContainingResiduesForProtein( { residues, proteinId, aminoAcidModStats } );
					proteinDataObject.percentPSMsModified = ModViewDataUtilities.getFormattedDecimal( proteinDataObject.psmCount / totalPSMsContainingResidues * 100 );
					
					let totalInstancesOfModifiedResiduesForProtein = ModViewDataUtilities.getTotalInstancesOfModifiedResiduesForProtein( { modMass, residues, proteinId, reportedPeptideModData, aminoAcidModStats, proteinPositionResidues, proteinPositionFilterStateManager } );
					let totalInstancesOfModdableResiduesForProtein = ModViewDataUtilities.getTotalInstancesOfModdableResiduesForProtein( { residues, proteinId, aminoAcidModStats } );
					proteinDataObject.percentResiduesModified = ModViewDataUtilities.getFormattedDecimal( totalInstancesOfModifiedResiduesForProtein / totalInstancesOfModdableResiduesForProtein * 100 );

					proteinDataObjectArray.push(proteinDataObject);
				};

				resolve();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });
    }
    
    getColumnsSingleSearch() {

		let columns = [ ];

		{
			let column = {
				id :           'name',
				width :        '220px',
				displayName :  'Protein(s)',
				dataProperty : 'name',
				sort : 'string',
				style_override : 'white-space:auto;overflow-x:auto;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }
        
        {
			let column = {
				id :           'res',
				width :        '100px',
				displayName :  'Residues',
				dataProperty : 'residues',
				sort : 'string',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'pos',
				width :        '100px',
				displayName :  'Position(s) Modified',
				dataProperty : 'positions',
				sort : false,
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'psms',
				width :        '80px',
				displayName :  'PSMs w/ Mod',
				dataProperty : 'psmCount',
				sort : 'number',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'peps',
				width :        '100px',
				displayName :  'Peptides w/ Mod',
				dataProperty : 'peptideCount',
				sort : 'number',
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'psms_modded',
				width :        '150px',
				displayName :  '% PSMs Modified',
				dataProperty : 'percentPSMsModified',
				sort : 'number',

				showHorizontalGraph: true,
				graphMaxValue: 100,
				graphWidth:50,
			};
			
			columns.push( column );
		}

		{
			let column = {
				id :           'res_modded',
				width :        '175px',
				displayName :  '% Residues Modified',
				dataProperty : 'percentResiduesModified',
                sort : 'number',
                lastItem : true,

				showHorizontalGraph: true,
				graphMaxValue: 100,
				graphWidth:50,
			};
			
			columns.push( column );
		}

		return columns;
	};

}