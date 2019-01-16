
/**
 * Static utility methods used to display reported peptide lists
 * for single searches
 */

"use strict";

let Handlebars = require('handlebars/runtime');

let _common_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';
import { TableDataUtils } from 'page_js/data_pages/data_tables/tableDataUtils.js';
import { PageStateUtils } from 'page_js/data_pages/data_tables/pageStateUtils.js';
import { PSMListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/psmListingUtilsSingleSearch.js';

export class PeptideListingUtilsSingleSearch {

    static getPositionFromClickedRow( { $clickedRow } ) {
        return $clickedRow.data( 'id' );
    }

	static getContainerDiv() {
		let template = Handlebars.templates.peptideListingExpansionDiv;
		let $containerDiv = $( template() );
		
		return $containerDiv;
	}
	
	static populateDataObjectArrayFromWebServiceResponse( { peptideDataObjectArray, loadedData } ) {

		for (let peptideObject of loadedData.peptideList) {

			let dataObject = { };

			dataObject.uniqueId = peptideObject.reportedPeptideId;
			dataObject.id = peptideObject.reportedPeptideId;
			dataObject.sequence = peptideObject.reportedPeptideSequence;
			dataObject.psms = peptideObject.numPsms;
			dataObject.loadedData = peptideObject;

			for( let annoId of Object.keys( peptideObject.peptideAnnotationMap ) ) {
				dataObject[ annoId ] = peptideObject.peptideAnnotationMap[ annoId ][ 'valueString' ];
			}

			for( let annoId of Object.keys( peptideObject.psmAnnotationMap ) ) {
				dataObject[ annoId ] = peptideObject.psmAnnotationMap[ annoId ][ 'valueString' ];
			}

			peptideDataObjectArray.push( dataObject );
		}

	}


	static createAndAddTable( { $containerDiv, peptideDataObjectArray, dataPageStateManager_DataFrom_Server, searchDetailsBlockDataMgmtProcessing, projectSearchId } ) {

		let tableDisplayHandler = new TableDisplayHandler();

		let tableObject = { };
		tableObject.columns = PeptideListingUtilsSingleSearch.getColumns( { peptideDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
		tableObject.dataObjects = peptideDataObjectArray;
		tableDisplayHandler.addGraphWidths( { dataObjects : peptideDataObjectArray, columns : tableObject.columns } );

		tableObject.expandableRows = true;

		let template = Handlebars.templates.dataTable;
		let html = template( { tableObject } );
		let $tableContainerDiv = $( html );

		let $myContentDiv = $containerDiv.children( 'div.peptide-list-content' );

		$myContentDiv.empty();
		$myContentDiv.append( $tableContainerDiv );

		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );
		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );

		let functionParams = { };
		functionParams.projectSearchId = projectSearchId;
		functionParams.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		functionParams.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		tableDisplayHandler.addExpansionHandlerToRows( { $tableContainerDiv, getElementToInsertFunction : PSMListingUtilsSingleSearch.createJQueryElementForPSMListing, functionParams } );

	}


	static getColumns( { peptideDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } ) {

		console.log( peptideDataObjectArray );
		console.log( dataPageStateManager_DataFrom_Server );

		let columns = [ ];

		{
			let column = {
				id :           'sequence',
				width :        '500px',
				displayName :  'Reported Peptide',
				dataProperty : 'sequence',
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }

		{
			let column = {
				id :           'psms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        let sortedPeptideAnnotationsToShow = TableDataUtils.getOrderedPeptideAnnotationsToShowForSearch( { peptideDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
        for( let annotation of sortedPeptideAnnotationsToShow ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        let sortedPSMAnnotationsToShow = TableDataUtils.getOrderedPSMAnnotationsToShowForSearch( { dataObjectArray : peptideDataObjectArray, dataPageStateManager_DataFrom_Server, projectSearchId } );
        for( let annotation of sortedPSMAnnotationsToShow ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  'Best PSM: ' + annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    };

}