/**
 * proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.ts
 * 
 * Javascript for proteinView.jsp page - Single Protein Overlay - Show Reported Peptide List
 * 
 * Companion file to proteinViewPage_DisplayData_SingleSearch.js
 * 
 * 
 * 
 */

import { Handlebars, _common_template_bundle, _protein_table_template_bundle } from './proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList_ImportHandlebarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/data_pages_common/searchDetailsBlockDataMgmtProcessing';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler';

import { PSMListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/psmListingUtilsSingleSearch';

import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';

import { reporterIonMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList {

	private _containing_ProteinViewPage_Display_SingleProtein_SingleSearch;
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
	private _annotationTypeData_ReturnSpecifiedTypes;
	
	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	
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
	constructor({ 
		containing_ProteinViewPage_Display_SingleProtein_SingleSearch,
		loadedDataCommonHolder, 
		loadedDataPerProjectSearchIdHolder, 
		annotationTypeData_ReturnSpecifiedTypes,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server, 
		searchDetailsBlockDataMgmtProcessing
	} : { 
		containing_ProteinViewPage_Display_SingleProtein_SingleSearch,
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder, 
		annotationTypeData_ReturnSpecifiedTypes,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
	}) {

		this._containing_ProteinViewPage_Display_SingleProtein_SingleSearch = containing_ProteinViewPage_Display_SingleProtein_SingleSearch;
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
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
	 * Called from Multiple Search Single Protein to display Reported Peptides
	 * 
	 * @param forMultipleSearchesPage - true when call from Multiple Search Single Protein, which is the only way it is currently called
	 */
	createReportedPeptideDisplayData_From_reportedPeptideIds( { 
		
		$reported_peptides_outer_container, reportedPeptideIdsForDisplay, reporterIonMassesSelected, projectSearchId, forMultipleSearchesPage
	}) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { 
			reportedPeptideIdsForDisplay, reporterIonMassesSelected, proteinSequenceVersionId : undefined /* proteinSequenceVersionId for error reporting */, projectSearchId, forMultipleSearchesPage 
		} );

		this._createAndPopulate_ReportedPeptidesDataTable( { 
			$reported_peptides_outer_container, reportedPeptideDisplayData, any_ReporterIonMasses_ForAllSearches : undefined, reporterIonMassesSelected, projectSearchId, skip_HideLoadingMessage : true , forMultipleSearchesPage
		} );
	}


	/**
	 * 
	 */
	showLoadingMessage( {  $reported_peptides_outer_container } ) {
		{
			const $selector_reported_peptides_loading_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_loading_message_container");
			if ( $selector_reported_peptides_loading_message_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_loading_message_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_loading_message_container.show();
		}
		{
			const $selector_reported_peptides_updating_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_updating_message_container");
			if ( $selector_reported_peptides_updating_message_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_updating_message_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_updating_message_container.hide();
		}
		{
			const $selector_reported_peptides_main_display_container = $reported_peptides_outer_container.find(".selector_reported_peptides_main_display_container");
			if ( $selector_reported_peptides_main_display_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_main_display_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_main_display_container.hide();
		}
		//  Not needed since not visible after $selector_reported_peptides_main_display_container.hide()

		let $selector_number_of_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_reported_peptides_shown");
		let $selector_number_of_psms_for_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_psms_for_reported_peptides_shown");

		$selector_number_of_reported_peptides_shown.text( "???" );
		$selector_number_of_psms_for_reported_peptides_shown.text( "???" );
	}

	/**
	 * 
	 */
	showUpdatingListMessage( {  $reported_peptides_outer_container } ) {
		{
			const $selector_reported_peptides_updating_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_updating_message_container");
			if ( $selector_reported_peptides_updating_message_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_updating_message_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_updating_message_container.show();
		}
		{
			const $selector_reported_peptides_loading_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_loading_message_container");
			if ( $selector_reported_peptides_loading_message_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_loading_message_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_loading_message_container.hide();
		}
		{
			const $selector_reported_peptides_main_display_container = $reported_peptides_outer_container.find(".selector_reported_peptides_main_display_container");
			if ( $selector_reported_peptides_main_display_container.length === 0 ) {
				const msg = "No DOM element with class 'selector_reported_peptides_main_display_container' found under $reported_peptides_outer_container";
				console.warn( msg + ".  $reported_peptides_outer_container: " );
				console.warn( $reported_peptides_outer_container );
				throw Error( msg )
			}
			$selector_reported_peptides_main_display_container.hide();
		}
		//  Not needed since not visible after $selector_reported_peptides_main_display_container.hide()

		let $selector_number_of_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_reported_peptides_shown");
		let $selector_number_of_psms_for_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_psms_for_reported_peptides_shown");

		$selector_number_of_reported_peptides_shown.text( "???" );
		$selector_number_of_psms_for_reported_peptides_shown.text( "???" );
	}


	/**
	 * 
	 */
	createOrUpdateReportedPeptideDisplayData( { 
		reportedPeptideIdsForDisplay,
		any_ReporterIonMasses_ForAllSearches,
		reporterIonMassesSelected, 
		proteinSequenceVersionId, 
		projectSearchId, 
		$reported_peptides_outer_container } ) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { 
			reportedPeptideIdsForDisplay, reporterIonMassesSelected, proteinSequenceVersionId, projectSearchId, forMultipleSearchesPage : undefined
		} );

		this._createAndPopulate_ReportedPeptidesDataTable( { 
			$reported_peptides_outer_container, reportedPeptideDisplayData, any_ReporterIonMasses_ForAllSearches, reporterIonMassesSelected, projectSearchId,
			skip_HideLoadingMessage : undefined, forMultipleSearchesPage : undefined
		} );
	}

	/**
	 * Create Reported Peptide Data as String, for Download
	 * 
	 * @param reportedPeptideIdsForDisplay
	 */
	createReportedPeptideDisplayDownloadDataAsString({ reportedPeptideIdsForDisplay, reporterIonMassesSelected, proteinSequenceVersionId, projectSearchId }) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { 
			reportedPeptideIdsForDisplay, reporterIonMassesSelected, proteinSequenceVersionId, projectSearchId, forMultipleSearchesPage : false
		} );

		const peptideList = reportedPeptideDisplayData.peptideList;
		const annotationTypeRecords_DisplayOrder = reportedPeptideDisplayData.annotationTypeRecords_DisplayOrder;

		const psmAnnotationTypes = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
		const reportedPeptideAnnotationTypes = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;

		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [ 'Reported Peptide', 'PSM Count' ]
			
			for ( let annotation of reportedPeptideAnnotationTypes ) {
				reportLineParts.push( annotation.name );
			}
			for ( let annotation of psmAnnotationTypes ) {
				reportLineParts.push( 'Best PSM: ' + annotation.name );
			}
			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines
		for ( const peptideItem of peptideList ) {
		
			const reportLineParts = [
				
				peptideItem.reportedPeptideSequence,
				peptideItem.numPsms,
			];

			if ( reportedPeptideAnnotationTypes ) {
				for ( let annotation of reportedPeptideAnnotationTypes ) {

					//  peptideAnnotationMap and psmAnnotationMap are Object with ann type id as property names

					const annData = peptideItem.peptideAnnotationMap[ annotation.annotationTypeId ];
					if ( ! annData ) {
						throw Error("No Ann Data for Ann Type Id: " + annotation.annotationTypeId );
					}
					reportLineParts.push( annData.valueString );
				}
			}
			if ( psmAnnotationTypes ) {
				for ( let annotation of psmAnnotationTypes ) {

					const annData = peptideItem.psmAnnotationMap[ annotation.annotationTypeId ];
					if ( ! annData ) {
						throw Error("No Ann Data for Ann Type Id: " + annotation.annotationTypeId );
					}
					reportLineParts.push( annData.valueString );
				}
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
		
		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

	/**
	 * Create Reported Peptide Data for Display or Download
	 * 
	 * return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
	 * Returns:
	 *    Reported Peptide List
	 *    Number of Reported Peptides
	 *    Number of PSMs total
	 */
	_createReportedPeptideDisplayData( { 
		
		reportedPeptideIdsForDisplay, reporterIonMassesSelected, proteinSequenceVersionId/* Only for error reporting */, projectSearchId, forMultipleSearchesPage 
	} ) {

		const peptideListResult = [];
		
		const loadedDataCommonHolder = this._loadedDataCommonHolder;
		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  Various Maps, key Reported Peptide Id
		const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
		// const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();
		//  These 3 may be undefined if not populated since not applicable.
		const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
		const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();
		const psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
		
		let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = undefined;

		let reporterIonMassTransformer = undefined;

		if ( reporterIonMassesSelected ) {
			//  User has selected Reporter Ion Masses so need to compute psm count

			psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
			if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
				throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()" );
			}

			if ( forMultipleSearchesPage ) {

				//  For Multiple Searches Page.
				//  Need to round Reporter Ion Masses to match selection
				reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to ProteinViewPage_DisplayData_SingleProtein_ReporterIonMasses_DisplayAndSelect
					transformMass_ReturnNumber : function({ mass }) {
						return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
					}
				}
			}
		}

		//  reportedPeptideIds filtered if applicable so now create display peptide row objects

		for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
		
			const peptideItem = { 
				reportedPeptideId : reportedPeptideId, 
				reportedPeptideSequence : undefined, numPsms : undefined, peptideAnnotationMap : undefined, psmAnnotationMap : undefined
			};

			const reportedPeptideStringData = loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );
			if ( ! reportedPeptideStringData ) {
				throw Error("_createReportedPeptideDisplayData: No reportedPeptideStringData for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
			}
			peptideItem.reportedPeptideSequence = reportedPeptideStringData.getReportedPeptideString();

			let numPsms = undefined;
			
			if ( reporterIonMassesSelected ) {
				//  User has selected Reporter Ion Masses so need to compute psm count

				const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

				if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
					// No data for this reported peptide
					throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId ). reportedPeptideId: " + reportedPeptideId );
				}

				const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

				const psm_ReporterIonMasses_FilterOnSelectedValues_Result = (
					psm_ReporterIonMasses_FilterOnSelectedValues({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds : false, reporterIonMassTransformer })
				);
				const numPsmsLocal = psm_ReporterIonMasses_FilterOnSelectedValues_Result.count;

				if ( ! numPsmsLocal ) {
					throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. No numPsmsLocal for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
				}

				numPsms = numPsmsLocal;
				
			} else {

				numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
				if ( ! numPsms ) {
					throw Error("_createReportedPeptideDisplayData: No numPsms for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
				}
			}
			peptideItem.numPsms = numPsms;
			
//			const modificationsArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
//			if ( modificationsArray && modificationsArray.length !== 0 ) {
//				//  [{mass, position, reportedPeptideId}]
//				peptideItem.modMassList = modificationsArray;
//			}
			
			{
				//  Reported Peptide Ann Values
				
				//  Create Object from Map since that is expected in other code
				let peptideAnnotationData = undefined; // property name will be ann type id

				{ //  Reported Peptide Filterable Ann Data
					if ( reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
						const reportedPeptideFilterable_annData_KeyAnnTypeId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
						if ( reportedPeptideFilterable_annData_KeyAnnTypeId ) {

							for ( const annDataEntry of reportedPeptideFilterable_annData_KeyAnnTypeId ) {
								const annTypeId = annDataEntry[ 0 ]; // key
								const annData = annDataEntry[ 1 ]; // value
								const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
								if ( ! peptideAnnotationData ) {
									peptideAnnotationData = {};
								}
								peptideAnnotationData[ annTypeId ] = annDataForDisplay;
							}
						}
					}
				}

				{ //  Reported Peptide Descriptive Ann Data
					if ( reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
						const reportedPeptideDescriptive_annData_KeyAnnTypeId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
						if ( reportedPeptideDescriptive_annData_KeyAnnTypeId ) {

							for ( const annDataEntry of reportedPeptideDescriptive_annData_KeyAnnTypeId ) {
								const annTypeId = annDataEntry[ 0 ]; // key
								const annData = annDataEntry[ 1 ]; // value
								const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
								if ( ! peptideAnnotationData ) {
									peptideAnnotationData = {};
								}
								peptideAnnotationData[ annTypeId ] = annDataForDisplay;
							}
						}
					}
				}
				peptideItem.peptideAnnotationMap = peptideAnnotationData;
			}

			{
				//  Best PSM Ann Values
				if ( psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
					//  Create Object from Map since that is expected in other code
					const psmBestFilterable_annData_KeyAnnTypeId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
					if ( psmBestFilterable_annData_KeyAnnTypeId ) {

						const psmAnnotationData = {}; // property name will be ann type id
						for ( const annDataEntry of psmBestFilterable_annData_KeyAnnTypeId ) {
							const annTypeId = annDataEntry[ 0 ]; // key
							const annData = annDataEntry[ 1 ]; // value
							const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
							psmAnnotationData[ annTypeId ] = annDataForDisplay;
						}
						peptideItem.psmAnnotationMap = psmAnnotationData;
					}
				}
			}
			
			peptideListResult.push( peptideItem )
		}

		/**
		 * Get array ann type entries, sorted on sortOrder
		 */
		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated =
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

		//  Get AnnotationType records for Displaying Annotation data in display order in peptideList
		let annotationTypeRecords_DisplayOrder = this._getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList : peptideListResult } );

		// Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
		this._sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } );
		
		const numberOfReportedPeptides = peptideListResult.length;
		
		let numberOfPsmsForReportedPeptides = 0;
		
		for ( const peptideItem of peptideListResult ) {
			numberOfPsmsForReportedPeptides += peptideItem.numPsms;
		}
		
		return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
	}

	/**
	 * Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
	 */
	_sortPeptideListOnSortOrder( { peptideList, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } ) {

		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
		let psmAnnotationTypesForPeptideListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.length;

		peptideList.sort( function( a, b ) {

			//  Compare Reported Peptide Ann Values, if they are populated
			let a_peptideAnnotationMap = a.peptideAnnotationMap;
			let b_peptideAnnotationMap = b.peptideAnnotationMap;
			if ( a_peptideAnnotationMap && b_peptideAnnotationMap ) {

				for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
					let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
					let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
					let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap[ annotationTypeId ];
					let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap[ annotationTypeId ];

					if ( a_peptideAnnotationMap_ForAnnType && b_peptideAnnotationMap_ForAnnType ) {
						if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}

			//  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
			let a_psmAnnotationMap = a.psmAnnotationMap;
			let b_psmAnnotationMap = b.psmAnnotationMap;
			if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

				for ( let psmAnnotationTypesForPeptideListEntriesLength_Index = 0; psmAnnotationTypesForPeptideListEntriesLength_Index < psmAnnotationTypesForPeptideListEntriesLength; psmAnnotationTypesForPeptideListEntriesLength_Index++ ) {
					let psmAnnotationTypesForPeptideListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries[ psmAnnotationTypesForPeptideListEntriesLength_Index ];
					let annotationTypeId = psmAnnotationTypesForPeptideListEntries_Entry.annotationTypeId;
					let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
					let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];

					if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
						if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionBelow ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionAbove ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}

			//  All Reported Peptide and PSM Ann Type Values match so order on reported peptide id
			if ( a.reportedPeptideId < b.reportedPeptideId ) {
				return -1;
			}
			if ( a.reportedPeptideId > b.reportedPeptideId ) {
				return 1;
			}
			return 0;

		});
	}
	

	/**
	 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
	 */
	_getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList } ) {

		//   Get all annotation type ids returned in all entries and produce a list of them to put in columns

		let resultObject = {};
		
		//  First get all Unique Reported Peptide and PSM Annotation Type Ids in the Peptide List
		
		let uniquePSMAnnotationTypeIds_InPeptideList = new Set();
		let uniqueReportedPeptideAnnotationTypeIds_InPeptideList = new Set();
//		let uniqueMatchedProteinAnnotationTypeIds_InPeptideList = new Set; // Not populated yet

		peptideList.forEach( function( peptideListItem, index, array ) {
			let psmAnnotationMap = peptideListItem.psmAnnotationMap;
			if ( psmAnnotationMap ) {
				Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
					let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
					uniquePSMAnnotationTypeIds_InPeptideList.add( psmAnnotationDTOItem.annotationTypeId );
				}, this );
			}
			let peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
			if ( peptideAnnotationMap ) {
				Object.keys ( peptideAnnotationMap ).forEach( function( peptideAnnotationMapKeyItem, index, array ) {
					let peptideAnnotationDTOItem = peptideAnnotationMap[ peptideAnnotationMapKeyItem ];
					uniqueReportedPeptideAnnotationTypeIds_InPeptideList.add( peptideAnnotationDTOItem.annotationTypeId );
				}, this );
			}
		}, this );
		
		//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InPeptideList } );
		let reportedPeptideAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_InPeptideList } );

		return {
			psmAnnotationTypesForPeptideListEntries : psmAnnotationTypesForPeptideListEntries,
			reportedPeptideAnnotationTypesForPeptideListEntries : reportedPeptideAnnotationTypesForPeptideListEntries
		};
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
	_createAndPopulate_ReportedPeptidesDataTable( { 
		$reported_peptides_outer_container, 
		reportedPeptideDisplayData, 
		any_ReporterIonMasses_ForAllSearches, 
		reporterIonMassesSelected, 
		projectSearchId,
		skip_HideLoadingMessage, // true when call from createReportedPeptideDisplayData_From_reportedPeptideIds for Multiple search
		forMultipleSearchesPage
	} ) {
		
		// const objectThis = this;

		// console.log("_createAndPopulate_ReportedPeptidesDataTable");
		
		const peptideList = reportedPeptideDisplayData.peptideList;
		const annotationTypeRecords_DisplayOrder = reportedPeptideDisplayData.annotationTypeRecords_DisplayOrder;

		if ( ! skip_HideLoadingMessage ) {  //  skip_HideLoadingMessage, // true when call from createReportedPeptideDisplayData_From_reportedPeptideIds for Multiple search
			
			{ //  Hide loading message and show data block
				const $selector_reported_peptides_loading_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_loading_message_container");
				if ( $selector_reported_peptides_loading_message_container.length === 0 ) {
					const msg = "No DOM element with class 'selector_reported_peptides_loading_message_container' found under $reported_peptides_outer_container";
					console.warn( msg + ".  $reported_peptides_outer_container: " );
					console.warn( $reported_peptides_outer_container );
					throw Error( msg )
				}
				$selector_reported_peptides_loading_message_container.hide();
			}
			{ //  Also Hide selector_reported_peptides_updating_message_container

				const $selector_reported_peptides_updating_message_container = $reported_peptides_outer_container.find(".selector_reported_peptides_updating_message_container");
				if ( $selector_reported_peptides_updating_message_container.length === 0 ) {
					const msg = "No DOM element with class 'selector_reported_peptides_updating_message_container' found under $reported_peptides_outer_container";
					console.warn( msg + ".  $reported_peptides_outer_container: " );
					console.warn( $reported_peptides_outer_container );
					throw Error( msg )
				}
				$selector_reported_peptides_updating_message_container.hide();
			}
			{
				const $selector_reported_peptides_main_display_container = $reported_peptides_outer_container.find(".selector_reported_peptides_main_display_container");
				if ( $selector_reported_peptides_main_display_container.length === 0 ) {
					const msg = "No DOM element with class 'selector_reported_peptides_main_display_container' found under $reported_peptides_outer_container";
					console.warn( msg + ".  $reported_peptides_outer_container: " );
					console.warn( $reported_peptides_outer_container );
					throw Error( msg )
				}
				$selector_reported_peptides_main_display_container.show();
			}
		}

		{
			//  Update display of data outside of actual table
			const numberOfReportedPeptides = reportedPeptideDisplayData.numberOfReportedPeptides;
			const numberOfPsmsForReportedPeptides = reportedPeptideDisplayData.numberOfPsmsForReportedPeptides;

			const numberOfReportedPeptidesFormatted = numberOfReportedPeptides.toLocaleString();
			const numberOfPsmsForReportedPeptidesFormatted = numberOfPsmsForReportedPeptides.toLocaleString();

			let $selector_number_of_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_reported_peptides_shown");
			let $selector_number_of_psms_for_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_psms_for_reported_peptides_shown");

			$selector_number_of_reported_peptides_shown.text( numberOfReportedPeptidesFormatted );
			$selector_number_of_psms_for_reported_peptides_shown.text( numberOfPsmsForReportedPeptidesFormatted );
		}

		//  Reported Peptides Table Container element
		let $selector_reported_peptides_data_table_container = $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container");
		if ( $selector_reported_peptides_data_table_container.length === 0 ) {
			//  Not found, search for alternate selector for Multiple Search subtable
			$selector_reported_peptides_data_table_container = $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container_in_multisearch_list");
			if ( $selector_reported_peptides_data_table_container.length === 0 ) {
				throw Error('$reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container") AND $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container_in_multisearch_list") found NO DOM elements');
			}
		}
		if ( $selector_reported_peptides_data_table_container.length > 1 ) {
			throw Error('$reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container") found > 1 DOM elements');
		}
		$selector_reported_peptides_data_table_container.empty();
		
		//   Peptide List of objects with properties for Data Table
		const peptideList_ForDataTable = this._createPeptideList_ForDataTable( { peptideList, annotationTypeRecords_DisplayOrder } );
		
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
		const columns = this._getReportedPeptideDataTableColumns( 
				{ psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries,
					reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries });

		// the data we're showing on the page
		const tableObjects = peptideList_ForDataTable;
		tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

		// add the table to the page

		const tableObject = { columns, dataObjects : tableObjects, expandableRows : true };

		const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		const $tableContainerDiv = $( dataTableContainer_HTML );
		$selector_reported_peptides_data_table_container.append( $tableContainerDiv );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		// add in the click and over handlers for the rows
		{
			const functionParams = { 
				projectSearchId, 
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				alwaysShow_ReporterIonMasses_Column : any_ReporterIonMasses_ForAllSearches
			};

			const psmExpansionHandler_Local = ( functionParams ) => {
				try {
					return this._psmExpansionHandler({ reporterIonMassesSelected, forMultipleSearchesPage, functionParams });
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}

			tableDisplayHandler.addExpansionHandlerToRows({ $tableContainerDiv, getElementToInsertFunction : psmExpansionHandler_Local, functionParams } );

			// tableDisplayHandler.addExpansionHandlerToRows({ $tableContainerDiv, getElementToInsertFunction : PSMListingUtilsSingleSearch.createJQueryElementForPSMListing, functionParams } );
		}

		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
	}

	/**
	 * called from const psmExpansionHandler_Local
	 * 
	 * Handle click on reported peptide row to show PSMs
	 */
	_psmExpansionHandler({ reporterIonMassesSelected, forMultipleSearchesPage, functionParams }) {

		const $clickedRow = functionParams.$clickedRow;

		if ( reporterIonMassesSelected ) {
			//  User has selected Reporter Ion Masses so need to get psm ids to display

			let reportedPeptideId = PSMListingUtilsSingleSearch.getReportedPeptideIdFromClickedRow( { $clickedRow } );

			const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = this._loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
			if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
				throw Error("_psmExpansionHandler: reporterIonMassesSelected is populated. nothing returned from this._loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()" );
			}

			const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

			if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
				// No data for this reported peptide
				throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId ). reportedPeptideId: " + reportedPeptideId );
			}

			const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

			let reporterIonMassTransformer = undefined;

			if ( forMultipleSearchesPage ) {

				reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to ProteinViewPage_DisplayData_SingleProtein_ReporterIonMasses_DisplayAndSelect
					transformMass_ReturnNumber : function({ mass }) {
						return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
					}
				}
			}

			const psm_ReporterIonMasses_FilterOnSelectedValues_Result = (
				psm_ReporterIonMasses_FilterOnSelectedValues({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds : true, reporterIonMassTransformer })
			);

			functionParams.psmIds = psm_ReporterIonMasses_FilterOnSelectedValues_Result.psmIds;
		}

		return PSMListingUtilsSingleSearch.createJQueryElementForPSMListing( functionParams );
	}



	/**
	 * Create object 
	 */
	_createPeptideList_ForDataTable( { peptideList, annotationTypeRecords_DisplayOrder } ) {

		const peptideList_ForDataTable = [];
		
		for ( const peptideListItem of peptideList ) {
			
			peptideList_ForDataTable.push( this._createPeptideItem_DataTableEntry( { peptideListItem, annotationTypeRecords_DisplayOrder } ) );
		}
		return peptideList_ForDataTable;
	}

	/**
	 * Create object 
	 */
	_createPeptideItem_DataTableEntry( { peptideListItem, annotationTypeRecords_DisplayOrder } ) {

		const context = {
		 	uniqueId : peptideListItem.reportedPeptideId, // Set for Data Table to identify the entry in the table
			reportedPeptideId : peptideListItem.reportedPeptideId,
			reportedPeptideSequence : peptideListItem.reportedPeptideSequence,
			numPsms : peptideListItem.numPsms,
			numUniquePsms : peptideListItem.numUniquePsms,
			numPsmsNotSet : undefined,
			numUniquePsmsNotSet : undefined
		};

		if ( peptideListItem.numPsms === undefined || peptideListItem.numPsms === null ) {
			context.numPsmsNotSet = true;
		}
		if ( peptideListItem.numUniquePsms === undefined || peptideListItem.numUniquePsms === null ) {
			context.numUniquePsmsNotSet = true;
		}

//		const modMassList = peptideListItem.modMassList;
//		if ( modMassList && modMassList.length !== 0 ) {
//			modMassList.sort( function( a, b ) {
//				if ( a.position < b.position ) {
//					return -1;
//				}
//				if ( a.position > b.position ) {
//					return 1;
//				}
//				if ( a.mass < b.mass ) {
//					return -1;
//				}
//				if ( a.mass > b.mass ) {
//					return 1;
//				}
//				return 0;
//			} );
//			
//			const modMassesArray = [];
//			//  formatted Mods
//			for ( const modMassEntry of modMassList ) {
//				modMassesArray.push( modMassEntry.position + ":" + modMassEntry.mass );
//			}
//			const modMassesString = modMassesArray.join( ", " );
//			context.mods = modMassesString;
//		}

		//  Put Reported Peptide and Best PSM annotations into the context per ann type id for display matching table headers

		const peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
		if ( peptideAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries ) {
				const entryForAnnTypeId = peptideAnnotationMap[ annTypeItem.annotationTypeId ];
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}
		const psmAnnotationMap = peptideListItem.psmAnnotationMap;
		if ( psmAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries ) {
				const entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}

		return context;
	}
	
	/**
	 * Create Table Columns 
	 */
	_getReportedPeptideDataTableColumns( { psmAnnotationTypes, reportedPeptideAnnotationTypes } ) {

		let columns = [ ];

		{
			let column = {
				id :           'sequence',
				width :        '500px',
				displayName :  'Reported Peptide',
				dataProperty : 'reportedPeptideSequence', // 'sequence',
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }

//		{
//			let column = {
//				id :           'mods',
//				width :        '70px',
//				displayName :  'Mods',
//				dataProperty : 'mods',
////                sort : 'number',
////                style_override : 'font-size:12px;',
//			};
//
//			columns.push( column );
//        }

		{
			let column = {
				id :           'psms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'numPsms', // 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        for( let annotation of reportedPeptideAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval 
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        for( let annotation of psmAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  'Best PSM: ' + annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    }
	
}