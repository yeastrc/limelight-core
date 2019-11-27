/**
 * proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns.ts
 * 
 * Javascript for proteinView.jsp page - 
 * 
 * Single Protein Miltiple Searches Overlay - Reported Peptide List - Drill Downs
 * 
 * Companion file to proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList.js
 * 
 * 
 * 
 */

import { Handlebars, _common_template_bundle, _protein_table_template_bundle } from './proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns_ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from '../protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from '../protein_page_single_search/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList } from '../protein_page_single_search/proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList';



const _TABLE_EXPANSION_OUTER_CONTAINER_HTML = '<div style="padding: 15px; background-color: white;"></div>';

const _REPORTED_PEPTIDE_TABLE_EXPANSION_OUTER_CONTAINER_HTML = 
	'<div style="padding: 15px; background-color: white;"><div class="selector_reported_peptides_data_table_container_in_multisearch_list">Loading Peptides...</div></div>';

//  Constants set in constructor

let _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX = undefined;

let _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX = undefined;

/**
 * 
 */
export class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns {


	private _containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList;
	private _containing_ProteinViewPage_Display_MultipleSearches_SingleProtein;
	private _loadedDataCommonHolder;
	private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
	private _annotationTypeData_ReturnSpecifiedTypes;
	
	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
	private _dataPageStateManager_DataFrom_Server;
	private _searchDetailsBlockDataMgmtProcessing;
	
	// From common template:

	private _common_template_dataTable_Template = _common_template_bundle.dataTable;
	
	// From Protein template:
	
	private _protein_page_single_protein_reported_peptide_table_template_Template = 
		_protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template;
	private _protein_page_single_protein_reported_peptide_entry_template_Template = 
		_protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template;
	private _protein_page_single_protein_reported_peptide_child_row_template_Template = 
		_protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template;


	/**
	 * 
	 */
	constructor( 
			{ containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList,
                containing_ProteinViewPage_Display_MultipleSearches_SingleProtein,
				loadedDataCommonHolder, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server, 
                searchDetailsBlockDataMgmtProcessing,
                _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX_param,
                _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX_param
			}) {

        //  Set module wide 'constants'
        _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX_param;
        _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX_param;

        
        this._containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList = containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList;
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
	}

	/**
     * Show Searches for clicked "combined" reported peptide
     * 
     * Show expansion of top level "combined" reported peptide
     * 
	 * Callback function called by TableDisplayHandler
	 * when user clicks on a row in the top level "combined" reported peptide
	 */
	combinedReportedPeptideRow_ShowSearches({
		
		projectSearchIds, searchDetailsBlockDataMgmtProcessing, dataPageStateManager_DataFrom_Server, any_ReporterIonMasses_ForAllSearches, reporterIonMassesSelected,
		$clickedRow  //  Added by DataTableHandler
	}) {

        const peptideSequenceDisplayString = $clickedRow.data( 'id' );
        
        const current_reportedPeptideDisplayData = this._containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList._current_reportedPeptideDisplayData;

        const peptideItems_Map_Key_peptideSequenceDisplayString = current_reportedPeptideDisplayData.peptideItems_Map_Key_peptideSequenceDisplayString;

        const peptideItem = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplayString );

        if ( ! peptideItem ) {
            throw Error("No value for peptideSequenceDisplayString: " + peptideSequenceDisplayString );
        }

		//   Search List of objects with properties for Data Table
		const dataList_ForDataTable = this._createList_For_PerSearch_DataTable( { peptideItem, projectSearchIds } );

		if ( dataList_ForDataTable.length === 0 ) {
			throw Error("No Searches Found for peptideSequenceDisplayString: " + peptideSequenceDisplayString );
		}

		//  Create Data Table and insert on page

		const tableDisplayHandler = new TableDisplayHandler();

		// the columns for the data being shown on the page
		const columns = this._getDataTableColumns_PerSearch();

		// the data we're showing on the page
		const tableObjects = dataList_ForDataTable;
		tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

		// add the table to the page

		const tableObject = { columns, dataObjects : tableObjects, expandableRows : true };

		const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		const $tableContainerDiv = $( dataTableContainer_HTML );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		//  Show the Reported Peptides for the search

		// add in the click and over handlers for the rows
		{
			const functionParams = {
				peptideSequenceDisplayString : peptideSequenceDisplayString,
				projectSearchIds : projectSearchIds,
				any_ReporterIonMasses_ForAllSearches, 
				reporterIonMassesSelected,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			};

			const perSearchRow_expansionCallbackFunctionBindThis = this._showReportedPeptides_perSearchRow_expansion.bind(this);
			//  value in functionParams will be passed to function specified in property 'getElementToInsertFunction' as the parameter

			tableDisplayHandler.addExpansionHandlerToRows( 
					{ $tableContainerDiv, getElementToInsertFunction : perSearchRow_expansionCallbackFunctionBindThis, functionParams } );
		}


		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
		
		const $outerContainer = $( _TABLE_EXPANSION_OUTER_CONTAINER_HTML );
		$outerContainer.append( $tableContainerDiv );
		
		return $outerContainer;
    }


	/**
	 * Create object
	 */
	_createList_For_PerSearch_DataTable( { peptideItem, projectSearchIds } ) {

		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.get_searchNames();

        const resultList_ForDataTable = [];

		for ( const projectSearchId of projectSearchIds ) {

            const numPsmsForProjectSearchId_ObjectPropertyName = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;
    
            const numPsms = peptideItem[ numPsmsForProjectSearchId_ObjectPropertyName ];

            if ( numPsms === undefined || numPsms === null || numPsms === 0 ) {
				//  Most likely to be undefined if no data for this projectSearchId
                //  No PSMs for this search so skip
                continue; // EARLY CONTINUE
            }
                
			const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
			if ( ! searchNameObject ) {
				throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
            }
            const searchName = searchNameObject.name;
            const searchId = searchNameObject.searchId;

			const reportedPeptideIdsForProjectSearchId_ObjectPropertyName = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

            const reportedPeptideIds = peptideItem[ reportedPeptideIdsForProjectSearchId_ObjectPropertyName ];
    
            const context = 
            { uniqueId : projectSearchId, // Set for Data Table to identify the entry in the table
                projectSearchId : projectSearchId,
                searchNameDisplay : searchName + " (" + searchId + ")",
                numPsms : numPsms
            };
			resultList_ForDataTable.push( context );
		}
		return resultList_ForDataTable;
	}
	
	/**
	 * Create Table Columns - Per Search List
	 */
	_getDataTableColumns_PerSearch() {

		let columns = [ ];

		{ //  Search Name Display - TODO could remove the nowrap
			let column = {
				id :           'searchNameDisplay',
				width :        '500px',
				displayName :  'Search Name',
				dataProperty : 'searchNameDisplay',
                sort : 'string',
                // style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }
        {
			let column = {
				id :           'numPsms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'numPsms',
                sort : 'number',
                style_override : 'font-size:12px;',
                css_class : ' clickable ' 
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
	}
	
	//////////////////////////////////

	//    Reported Peptides for a Search - Expansion of Per Search Row

	/**
     * Show Reported Peptides for a Search for clicked Search row
     * 
     * Show expansion of second level Per Search
     * 
	 * Callback function called by TableDisplayHandler
	 * when user clicks on a row in the second level Per Search
	 */
	_showReportedPeptides_perSearchRow_expansion({

		peptideSequenceDisplayString,
		projectSearchIds,
		any_ReporterIonMasses_ForAllSearches, 
		reporterIonMassesSelected,
		searchDetailsBlockDataMgmtProcessing,
		dataPageStateManager_DataFrom_Server,
		$clickedRow  //  Added by DataTableHandler
	}) {
		try {
			const projectSearchIdFromElement = $clickedRow.data( 'id' );

			const projectSearchId = Number.parseInt( projectSearchIdFromElement ); // Ensure it is a number
			
			const current_reportedPeptideDisplayData = this._containing_ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList._current_reportedPeptideDisplayData;

			//  Top level table items
			const peptideItems_Map_Key_peptideSequenceDisplayString = current_reportedPeptideDisplayData.peptideItems_Map_Key_peptideSequenceDisplayString;

			//  Item from Top level table items
			const peptideItem = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplayString );

			if ( ! peptideItem ) {
				throw Error("No value for peptideSequenceDisplayString: " + peptideSequenceDisplayString );
			}
			
			//  Get reported Peptide Ids for chosen project search id

			const reportedPeptideIdsProperty = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;
			const reportedPeptideIds = peptideItem[ reportedPeptideIdsProperty ];

			if ( ! reportedPeptideIds ) {
				throw Error("No value for reportedPeptideIdsProperty: " + reportedPeptideIdsProperty + ", peptideSequenceDisplayString: " + peptideSequenceDisplayString );
			}

			const $outerContainer = $( _REPORTED_PEPTIDE_TABLE_EXPANSION_OUTER_CONTAINER_HTML );

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error("No entry in this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
			}

			const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
				new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
					loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
					searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
				});
				
			const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
				{
					loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
					loadedDataCommonHolder : this._loadedDataCommonHolder ,
					dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server ,
					searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing ,
					proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
				});

			const promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch =
				proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch( { reportedPeptideIds, projectSearchId } );

			if ( ! promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch ) {
				
				this._showReportedPeptides_perSearchRow_expansion_HaveLoadedData({ $outerContainer, reportedPeptideIds, reporterIonMassesSelected, projectSearchId, loadedDataPerProjectSearchIdHolder });

			} else {
				promise_loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch.then( () => {
					try {
						this._showReportedPeptides_perSearchRow_expansion_HaveLoadedData({ $outerContainer, reportedPeptideIds, reporterIonMassesSelected, projectSearchId, loadedDataPerProjectSearchIdHolder });
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				})
			}
			
			return $outerContainer;

		} catch( e ) {
			console.log("Exception caught in New Promise in _showReportedPeptides_perSearchRow_expansion(...)");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

	/**
     * Have Loaded the Data for:  Show Reported Peptides for a Search for clicked Search row
     * 
	 */
	_showReportedPeptides_perSearchRow_expansion_HaveLoadedData({ $outerContainer, reportedPeptideIds, reporterIonMassesSelected, projectSearchId, loadedDataPerProjectSearchIdHolder })  {

		const proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList(
			{
				containing_ProteinViewPage_Display_SingleProtein_SingleSearch : undefined,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
				annotationTypeData_ReturnSpecifiedTypes : this._annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
			});

		proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayData_From_reportedPeptideIds( { 
			$reported_peptides_outer_container : $outerContainer,
			reportedPeptideIdsForDisplay : reportedPeptideIds, 
			reporterIonMassesSelected,
			projectSearchId,
			forMultipleSearchesPage : true });
	}
}
