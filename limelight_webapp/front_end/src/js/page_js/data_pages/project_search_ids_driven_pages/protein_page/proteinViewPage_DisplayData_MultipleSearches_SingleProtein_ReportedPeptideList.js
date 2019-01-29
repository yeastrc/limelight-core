/**
 * proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList.js
 * 
 * Javascript for proteinView.jsp page - Single Protein Miltiple Searches Overlay - Show Reported Peptide List
 * 
 * Companion file to proteinViewPage_DisplayData_MultipleSearches.js
 * 
 * 
 * 
 */

const Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

const _protein_table_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';

import { peptideSequence_CreateCommonDisplayString } from 'page_js/data_pages/peptide_sequence_display_string_common/peptideSequence_CreateCommonDisplayString.js';

import { PSMListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/psmListingUtilsSingleSearch.js';

import { ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns.js';

const _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX = 'numPsms_';

const _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX = 'reportedPeptideIds_';

/**
 * 
 */
export class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList {

	/**
	 * 
	 */
	constructor( 
			{ containing_ProteinViewPage_Display_MultipleSearches_SingleProtein,
				loadedDataCommonHolder, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server, 
				searchDetailsBlockDataMgmtProcessing
			}) {
		
		this._containing_ProteinViewPage_Display_MultipleSearches_SingleProtein = containing_ProteinViewPage_Display_MultipleSearches_SingleProtein;
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
		this._annotationTypeData_ReturnSpecifiedTypes = annotationTypeData_ReturnSpecifiedTypes;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
		// From Protein template:
		
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template");
		}
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template");
		}
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template");
		}
		
		this._protein_page_single_protein_reported_peptide_table_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template;
		this._protein_page_single_protein_reported_peptide_entry_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template;
		this._protein_page_single_protein_reported_peptide_child_row_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template;

		
		this._proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns =
			new ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns({ 
				containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList : this,
				containing_ProteinViewPage_Display_MultipleSearches_SingleProtein,
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
				annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server, 
				searchDetailsBlockDataMgmtProcessing,
				_NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX_param : _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX,
				_REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX_param : _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX
			})
	}


	/**
	 * 
	 */
	createOrUpdateReportedPeptideDisplayData( { 
		proteinSequenceFormattedDisplay_Main_displayWidget, 
		proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, 
		proteinSequenceVersionId, projectSearchIds, $reported_peptides_outer_container } ) {

		const filteredOn_selectedProteinSequencePositions = this._is_filteredOn_selectedProteinSequencePositions( proteinSequenceFormattedDisplay_Main_displayWidget );

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._containing_ProteinViewPage_Display_MultipleSearches_SingleProtein._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, proteinSequenceVersionId, projectSearchIds } );
		reportedPeptideDisplayData.filteredOn_selectedProteinSequencePositions = filteredOn_selectedProteinSequencePositions;

		// Save this data
		this._current_reportedPeptideDisplayData = reportedPeptideDisplayData;

		this._createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, projectSearchIds } );
	}


	/**
	 * Create Reported Peptide Data as String, for Download
	 * 
	 */
	createReportedPeptideDisplayDownloadDataAsString({ reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, proteinSequenceVersionId, projectSearchIds }) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, proteinSequenceVersionId, projectSearchIds } );

		const peptideList = reportedPeptideDisplayData.peptideList;


		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );


		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [ 'Sequence' ];
			
			for ( const projectSearchId of projectSearchIds ) {
			
				const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
				if ( ! searchNameObject ) {
					throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
				}

				const headerString = 'PSM Count (' + searchNameObject.searchId + ")";
				reportLineParts.push( headerString );
			}

			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines
		for ( const peptideItem of peptideList ) {
		
			const reportLineParts = [
				
				peptideItem.peptideSequenceDisplay
			];

			for ( const projectSearchId of projectSearchIds ) {

				const numPsmsProperty = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;
				let numPsms = peptideItem[ numPsmsProperty ];
				if ( numPsms === undefined || numPsms === null ) {
					numPsms = 0;
				}
				reportLineParts.push( numPsms );
			}

			reportLineParts_AllLines.push( reportLineParts );
		}
		
		//  Join all line parts into strings, delimit on '\t'
		
		const reportLine_AllLines = [];
		
		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for ( const reportLineParts of reportLineParts_AllLines ) {
			
			reportLineParts_AllLinesIndex++;
			
			let reportLine = reportLineParts.join( "\t" );
			if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push( reportLine );
		}
7		
		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

	/**
	 * Is filtering on Protein Sequence Positions
	 * 
	 * @param proteinSequenceFormattedDisplay_Main_displayWidget 
	 */
	_is_filteredOn_selectedProteinSequencePositions( proteinSequenceFormattedDisplay_Main_displayWidget ) {

		if ( proteinSequenceFormattedDisplay_Main_displayWidget ) {
			
			//  Only filter if proteinSequenceFormattedDisplay_Main_displayWidget is passed in
			
			const selectedProteinSequencePositionsLocal = proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

			if ( selectedProteinSequencePositionsLocal && selectedProteinSequencePositionsLocal.size !== 0 ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Create Reported Peptide Data for Display or Download
	 * 
	 * proteinSequenceFormattedDisplay_Main_displayWidget only passed in when filtering on user selection of proteinSequence
	 * 
	 * proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect only passed in when filtering on user selection of modification masses
	 * 
	 * Reported Peptide List
	 * Number of Reported Peptides
	 * Number of PSMs total
	 */
	_createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, proteinSequenceVersionId, projectSearchIds } ) {

		const peptideItems_Map_Key_peptideSequenceDisplayString = new Map();
		
		const loadedDataCommonHolder = this._loadedDataCommonHolder;

		let numberOfPsmsForReportedPeptides = 0; // PSM Count Total
		
		for ( const projectSearchId of projectSearchIds ) {

			const reportedPeptideIdsForDisplay = reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.get( projectSearchId );
			if ( ! reportedPeptideIdsForDisplay ) {
				throw Error( "No reportedPeptideIdsForDisplay for projectSearchId: " + projectSearchId );
			}

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
			}

			const numPsmsForProjectSearchId_ObjectPropertyName = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

			const reportedPeptideIdsForProjectSearchId_ObjectPropertyName = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

			//  Various Maps, key Reported Peptide Id
			const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

			const modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId();
			
			//  reportedPeptideIds filtered if applicable so now create display peptide row objects

			for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
			
				const numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
				if ( ! numPsms ) {
					throw Error("_createReportedPeptideDisplayData: No numPsms for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				numberOfPsmsForReportedPeptides += numPsms;

				const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
				if ( ! peptideId ) {
					throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				const peptideSequenceString = this._loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } );
				if ( ! peptideSequenceString ) {
					throw Error("_createReportedPeptideDisplayData: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				let modificationsOnReportedPeptide = undefined;

				if ( modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId ) {

					modificationsOnReportedPeptide = modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
				}

				const peptideSequenceDisplay = peptideSequence_CreateCommonDisplayString({ peptideSequence : peptideSequenceString, modificationEntries : modificationsOnReportedPeptide });

				let peptideItemInMap = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplay );
				if ( peptideItemInMap ) {

					if ( peptideItemInMap[ numPsmsForProjectSearchId_ObjectPropertyName ] === undefined ) {
						peptideItemInMap[ numPsmsForProjectSearchId_ObjectPropertyName ] = numPsms;
					} else {
						peptideItemInMap[ numPsmsForProjectSearchId_ObjectPropertyName ] += numPsms;
					}

					if ( peptideItemInMap[ reportedPeptideIdsForProjectSearchId_ObjectPropertyName ] === undefined ) {
						peptideItemInMap[ reportedPeptideIdsForProjectSearchId_ObjectPropertyName ] = [ reportedPeptideId ];
					} else {
						peptideItemInMap[ reportedPeptideIdsForProjectSearchId_ObjectPropertyName ].push( reportedPeptideId );
					}

					continue;  // EARLY CONTINUE
				}
				
				//  peptideSequenceDisplay not already found in map so create new object and put in map

				const peptideItem = { peptideSequenceDisplay : peptideSequenceDisplay };
				peptideItem[ numPsmsForProjectSearchId_ObjectPropertyName ] = numPsms;
				peptideItem[ reportedPeptideIdsForProjectSearchId_ObjectPropertyName ] = [ reportedPeptideId ];

				peptideItems_Map_Key_peptideSequenceDisplayString.set( peptideSequenceDisplay, peptideItem );
			}
		}

		const peptideListResult = [];

		//  Copy to array
		for ( const peptideItemsEntry of peptideItems_Map_Key_peptideSequenceDisplayString.entries() ) {
			const peptideItem = peptideItemsEntry[ 1 ];
			peptideListResult.push( peptideItem );
		}

		// Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
		this._sortPeptideListOnSortOrder( { peptideList : peptideListResult } );
		
		const numberOfReportedPeptides = peptideListResult.length;
		
		//  Add property filteredOn_selectedProteinSequencePositions in calling function
		return { peptideList : peptideListResult, peptideItems_Map_Key_peptideSequenceDisplayString, numberOfReportedPeptides, numberOfPsmsForReportedPeptides };
	}

	/**
	 * Sort Peptides Array on PSM Count then Reported Peptide Id
	 */
	_sortPeptideListOnSortOrder( { peptideList } ) {

		peptideList.sort( function( a, b ) {

			//  Sort on PSM Counts, Descending
			if ( a.numPsms > b.numPsms ) {
				return -1;
			}
			if ( a.numPsms < b.numPsms ) {
				return 1;
			}

			//  PSM Counts match so order on reported peptide id, Ascending
			if ( a.reportedPeptideId < b.reportedPeptideId ) {
				return -1;
			}
			if ( a.reportedPeptideId > b.reportedPeptideId ) {
				return 1;
			}
			return 0;

		});
	}
	
	///////////////////////////////////////////
	
	///   Display
	
	/////////////////////////
	
	/**
	 * Create and Populate the Reported Peptides Data Table
	 * 
	 * peptideList is generated in JS code in this class
	 * 
	 * Could re-write to accept Annotation Data in Maps instead of Objects and change the code that generates peptideList
	 */
	_createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, projectSearchIds } ) {
		
		const objectThis = this;
		
		const peptideList = reportedPeptideDisplayData.peptideList;

		{
			//  Update display of data outside of actual table
			const numberOfReportedPeptides = reportedPeptideDisplayData.numberOfReportedPeptides;
			const numberOfPsmsForReportedPeptides = reportedPeptideDisplayData.numberOfPsmsForReportedPeptides;
			const filteredOn_selectedProteinSequencePositions = reportedPeptideDisplayData.filteredOn_selectedProteinSequencePositions;

			const numberOfReportedPeptidesFormatted = numberOfReportedPeptides.toLocaleString();
			const numberOfPsmsForReportedPeptidesFormatted = numberOfPsmsForReportedPeptides.toLocaleString();

			let $selector_number_of_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_reported_peptides_shown");
			let $selector_number_of_psms_for_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_psms_for_reported_peptides_shown");

			$selector_number_of_reported_peptides_shown.text( numberOfReportedPeptidesFormatted );
			$selector_number_of_psms_for_reported_peptides_shown.text( numberOfPsmsForReportedPeptidesFormatted );

			const $selector_reported_peptides_filtered_on_protein_sequence_positions = $reported_peptides_outer_container.find(".selector_reported_peptides_filtered_on_protein_sequence_positions");
			if ( filteredOn_selectedProteinSequencePositions ) {
				$selector_reported_peptides_filtered_on_protein_sequence_positions.show();
			} else {
				$selector_reported_peptides_filtered_on_protein_sequence_positions.hide();
			}
		}

		//  Container element
		let $selector_reported_peptides_data_table_container = $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container");
		$selector_reported_peptides_data_table_container.empty();
		
		//   Peptide List of objects with properties for Data Table
		const peptideList_ForDataTable = this._createPeptideList_ForDataTable( { peptideList, projectSearchIds } );
		
		const $selector_reported_peptides_none_to_display = $reported_peptides_outer_container.find(".selector_reported_peptides_none_to_display");
		$selector_reported_peptides_none_to_display.hide();
		
		if ( peptideList_ForDataTable.length === 0 ) {
			
			//  No Reported Peptides for filters so display msg and exit
			
			$selector_reported_peptides_none_to_display.show();
						
			return;  //  EARLY EXIT
		}
		
		//  Create Data Table and insert on page

		const tableDisplayHandler = new TableDisplayHandler();

		// the columns for the data being shown on the page
		const columns = this._getReportedPeptideDataTableColumns({ projectSearchIds });

		// the data we're showing on the page
		const tableObjects = peptideList_ForDataTable;
		tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

		// add the table to the page

		const tableObject = { };
		tableObject.columns = columns;
		tableObject.dataObjects = tableObjects;
		tableObject.expandableRows = true;

		const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		const $tableContainerDiv = $( dataTableContainer_HTML );
		$selector_reported_peptides_data_table_container.append( $tableContainerDiv );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		//  expansion at bottom level for PSMs

		// add in the click and over handlers for the rows
		// {
		// 	const functionParams = { };
		// 	functionParams.projectSearchId = projectSearchId;
		// 	functionParams.searchDetailsBlockDataMgmtProcessing = this._searchDetailsBlockDataMgmtProcessing;
		// 	functionParams.dataPageStateManager_DataFrom_Server = this._dataPageStateManager_DataFrom_Server;

		// 	tableDisplayHandler.addExpansionHandlerToRows( 
		// 			{ $tableContainerDiv, getElementToInsertFunction : PSMListingUtilsSingleSearch.createJQueryElementForPSMListing, functionParams } );
		// }

		//  Show the searches the Generated Reported Peptide is in

		// add in the click and over handlers for the rows
		{
			const functionParams = {
				projectSearchIds : projectSearchIds,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			};

			const combinedReportedPeptideRow_expansionCallbackFunctionBindThis = this._combinedReportedPeptideRow_expansionCallbackFunction.bind(this);
			//  value in functionParams will be passed to function specified in property 'getElementToInsertFunction' as the parameter

			tableDisplayHandler.addExpansionHandlerToRows( 
					{ $tableContainerDiv, getElementToInsertFunction : combinedReportedPeptideRow_expansionCallbackFunctionBindThis, functionParams } );
		}


		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
		
		{
			//  Adjust overlay width to fit reported peptide list
			
			let $selector_data_table_container = $tableContainerDiv;
			if ( ! $selector_data_table_container.hasClass( "selector_data_table_container" ) ) {

				let $selector_data_table_container = $tableContainerDiv.find(".selector_data_table_container");
			}
			if ( $selector_data_table_container.length === 0 ) {
				throw Error( '$tableContainerDiv not have class "selector_data_table_container" and $tableContainerDiv.find(".selector_data_table_container") found no elements' );
			}
			
			const data_table_container_Width = $selector_data_table_container.outerWidth();
			
			this._containing_ProteinViewPage_Display_MultipleSearches_SingleProtein
			.resize_OverlayWidth_BasedOnReportedPeptidesWidth( { reportedPeptidesWidth : data_table_container_Width });
		}
	}

	/**
	 * Create object
	 */
	_createPeptideList_ForDataTable( { peptideList, projectSearchIds } ) {

		const peptideList_ForDataTable = [];
		
		for ( const peptideListItem of peptideList ) {
			
			peptideList_ForDataTable.push( this._createPeptideItem_DataTableEntry( { peptideListItem, projectSearchIds } ) );
		}
		return peptideList_ForDataTable;
	}

	/**
	 * Create object 
	 */
	_createPeptideItem_DataTableEntry( { peptideListItem, projectSearchIds } ) {

		const context = 
		{ uniqueId : peptideListItem.peptideSequenceDisplay, // Set for Data Table to identify the entry in the table
				peptideSequenceDisplay : peptideListItem.peptideSequenceDisplay
		};

		for ( const projectSearchId of projectSearchIds ) {
			
			const numPsmsProperty = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;
			let numPsms = peptideListItem[ numPsmsProperty ];
			if ( numPsms === undefined ) {
				numPsms = 0;
			}
			context[ numPsmsProperty ] = numPsms;
		}

		return context;
	}
	
	/**
	 * Create Table Columns 
	 */
	_getReportedPeptideDataTableColumns( { projectSearchIds } ) {

		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );


		let columns = [ ];

		{
			let column = {
				id :           'sequence',
				width :        '500px',
				displayName :  'Sequence',
				dataProperty : 'peptideSequenceDisplay', // 'sequence',
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }

		for ( const projectSearchId of projectSearchIds ) {
			
			const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
			}
			
			let column = {
				id :           'psms_' + projectSearchId,
				width :        '80px',
				displayName :  'PSMs (' + searchNameObject.searchId + ")" ,
				dataProperty : _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId, // 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
                css_class : ' clickable ' 
			};

			columns.push( column );
        }


        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    };

	////////////
	
	/**
	 * Callback function called by TableDisplayHandler
	 * when user clicks on a row in the top level "combined" reported peptide
	 */
	_combinedReportedPeptideRow_expansionCallbackFunction( params ) {

		try {
			return this._proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns
					.combinedReportedPeptideRow_ShowSearches( params );
		} catch( e ) {
			console.log("Exception caught in New Promise in _getAndProcessStaticMods_forProjectSearchId(...)");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}



}
