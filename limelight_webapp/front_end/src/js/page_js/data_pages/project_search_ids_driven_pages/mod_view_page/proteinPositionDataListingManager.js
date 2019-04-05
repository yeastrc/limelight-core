/**
 * Code related to generating the protein listing subtable when expanding
 * rows on the mod view page.
 */

"use strict";

let Handlebars = require('handlebars/runtime');

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { ModViewDataUtilities } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataUtilities.js';
import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';
import { PeptideDataListingManager } from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/peptideDataListingManager.js';

export class ProteinPositionDataListingManager {

    constructor( params ) {
	
    }

    createJQueryElementForProteinPositionListing( { searchDetailsBlockDataMgmtProcessing, modMass, reportedPeptideModData, $clickedRow, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } ) {

		let template = Handlebars.templates.proteinPositionListingExpansionDiv;
        let $containerDiv = $( template() );
        let thisDataListingManager = new ProteinPositionDataListingManager();

        let proteinId = thisDataListingManager.getProteinIdFromClickedRow( { $clickedRow } );

        thisDataListingManager.populateListingDiv( { $containerDiv, proteinId, searchDetailsBlockDataMgmtProcessing, modMass, reportedPeptideModData, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } );

        return $containerDiv;        
    }

    populateListingDiv( { $containerDiv, proteinId, searchDetailsBlockDataMgmtProcessing, modMass, reportedPeptideModData, projectSearchId, dataPageStateManager_DataFrom_Server, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager } ) {

        let objectThis = this;
        let dataObjectArray = [ ];

        this.getDataObjectArrayForProteinAndModMass({ dataObjectArray, searchDetailsBlockDataMgmtProcessing, proteinId, projectSearchId, reportedPeptideModData, modMass, dataPageStateManager_DataFrom_Server, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager }).then( function( result ) {
			try {
				let tableDisplayHandler = new TableDisplayHandler();

				let tableObject = { };
				tableObject.columns = objectThis.getColumnsSingleSearch( { dataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
				tableObject.dataObjects = dataObjectArray;
				tableDisplayHandler.addGraphWidths( { dataObjects : dataObjectArray, columns : tableObject.columns } );

				tableObject.expandableRows = true;
		
				let template = Handlebars.templates.dataTable;
				let html = template( { tableObject } );
				let $tableContainerDiv = $( html );

				let $myContentDiv = $containerDiv.children( 'div.protein-position-list-content' );

				$myContentDiv.empty();
				$myContentDiv.append( $tableContainerDiv );

				tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );
				tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );

				let functionParams = { };
				functionParams.reportedPeptideModData = reportedPeptideModData;
				functionParams.projectSearchId = projectSearchId;
				functionParams.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
				functionParams.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
				functionParams.proteinPositionResidues = proteinPositionResidues;
				functionParams.aminoAcidModStats = aminoAcidModStats;
				functionParams.modMass = modMass;
				functionParams.proteinId = proteinId;
				functionParams.proteinPositionFilterStateManager = proteinPositionFilterStateManager;

				tableDisplayHandler.addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction : PeptideDataListingManager.createJQueryElementForPeptideListing, functionParams } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });

    };

    getDataObjectArrayForProteinAndModMass({ dataObjectArray, searchDetailsBlockDataMgmtProcessing, proteinId, projectSearchId, reportedPeptideModData, modMass, dataPageStateManager_DataFrom_Server, proteinPositionResidues, aminoAcidModStats, proteinPositionFilterStateManager }) {

        return new Promise(function (resolve, reject) {
			try {
				let positions = ModViewDataUtilities.getPositionsModifiedInProteinForModMass({ proteinId, modMass, reportedPeptideModData, proteinPositionFilterStateManager });

				for (let position of positions) {

					let dataObject = {};

					dataObject.uniqueId = position;
					dataObject.id = position;
					dataObject.position = position;

					dataObject.residue = proteinPositionResidues[ proteinId ][ position ];

					dataObject.psmCount = ModViewDataUtilities.getPSMCountForModMass({ modMass, reportedPeptideModData, aminoAcidModStats, proteinId, proteinPosition : position, proteinPositionFilterStateManager });
					dataObject.peptideCount = ModViewDataUtilities.getPeptideCountForModMass({ modMass, reportedPeptideModData, proteinId, proteinPosition : position, proteinPositionFilterStateManager });

					/*
					let totalPSMsContainingResidues = ModViewDataUtilities.getTotalPSMsContainingResiduesForProtein( { residues, proteinId, aminoAcidModStats } );
					proteinDataObject.percentPSMsModified = ModViewDataUtilities.getFormattedDecimal( proteinDataObject.psmCount / totalPSMsContainingResidues * 100 );
					*/
					/*
					let totalInstancesOfModifiedResiduesForProtein = ModViewDataUtilities.getTotalInstancesOfModifiedResiduesForProtein( { modMass, residues, proteinId, reportedPeptideModData, aminoAcidModStats, proteinPositionResidues } );
					let totalInstancesOfModdableResiduesForProtein = ModViewDataUtilities.getTotalInstancesOfModdableResiduesForProtein( { residues, proteinId, aminoAcidModStats } );
					proteinDataObject.percentResiduesModified = ModViewDataUtilities.getFormattedDecimal( totalInstancesOfModifiedResiduesForProtein / totalInstancesOfModdableResiduesForProtein * 100 );
					*/                

					dataObjectArray.push( dataObject );
				};

				resolve();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
			
        });
    }




    getProteinIdFromClickedRow( { $clickedRow } ) {
        return $clickedRow.data( 'id' );
    }

    getColumnsSingleSearch() {

		let columns = [ ];

		{
			let column = {
				id :           'pos',
				width :        '100px',
				displayName :  'Position',
				dataProperty : 'position',
				sort : 'number',
				style_override : 'font-size:13px;', 
			};

			columns.push( column );
        }
        
        {
			let column = {
				id :           'res',
				width :        '100px',
				displayName :  'Residue',
				dataProperty : 'residue',
                sort : 'string',
                style_override : 'font-size:13px;', 
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
                style_override : 'font-size:13px;', 
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
                style_override : 'font-size:13px;', 
			};
			
			columns.push( column );
		}
        /*
		{
			let column = {
				id :           'psms_modded',
				width :        '150px',
				displayName :  '% PSMs Modified',
				dataProperty : 'percentPSMsModified',
                sort : 'number',
                style_override : 'font-size:13px;', 

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
                style_override : 'font-size:13px;', 

				showHorizontalGraph: true,
				graphMaxValue: 100,
				graphWidth:50,
			};
			
			columns.push( column );
        }
        */

        columns[ columns.length - 1 ].lastItem = true;

		return columns;
	};

}