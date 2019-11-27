/**
 * proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList.ts
 * 
 * Javascript for proteinView.jsp page - Single Protein Miltiple Searches Overlay - Show Reported Peptide List
 * 
 * Companion file to proteinViewPage_DisplayData_MultipleSearches.js
 * 
 * 
 * 
 */

import { Handlebars, _common_template_bundle, _protein_table_template_bundle } from './proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_ImportHandlebarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler';

import { peptideSequence_CreateCommonDisplayString } from 'page_js/data_pages/peptide_sequence_display_string_common/peptideSequence_CreateCommonDisplayString';

import { modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
import { reporterIonMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';

// import { PSMListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/psmListingUtilsSingleSearch';

import { ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns } from './proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns';

const _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX = 'numPsms_';

const _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX = 'reportedPeptideIds_';

/**
 * 
 */
export class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList {

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

	
	private _proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns : ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns;

	private _current_reportedPeptideDisplayData;

	/**
	 * 
	 */
	constructor( 
			{ containing_ProteinViewPage_Display_MultipleSearches_SingleProtein,
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
				annotationTypeData_ReturnSpecifiedTypes,
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
		reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
		any_ReporterIonMasses_ForAllSearches,
		reporterIonMassesSelected,
		variableModificationMassesToFilterOn, staticModificationMassesToFilterOn,
		proteinSequenceVersionId, projectSearchIds, $reported_peptides_outer_container } ) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, reporterIonMassesSelected, variableModificationMassesToFilterOn, staticModificationMassesToFilterOn, proteinSequenceVersionId, projectSearchIds } );

		// Save this data
		this._current_reportedPeptideDisplayData = reportedPeptideDisplayData;

		this._createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, any_ReporterIonMasses_ForAllSearches, reporterIonMassesSelected, projectSearchIds } );
	}


	/**
	 * Create Reported Peptide Data as String, for Download
	 * 
	 */
	createReportedPeptideDisplayDownloadDataAsString({ reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, reporterIonMassesSelected, proteinSequenceVersionId, projectSearchIds }) {

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { 
			reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, reporterIonMassesSelected, 
			variableModificationMassesToFilterOn : undefined, staticModificationMassesToFilterOn : undefined, 
			proteinSequenceVersionId, projectSearchIds 
		} );

		const peptideList = reportedPeptideDisplayData.peptideList;


		//  For getting search info for projectSearchIds
		const searchNamesKeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames();


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
	_createReportedPeptideDisplayData( { 
		
		reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, reporterIonMassesSelected, variableModificationMassesToFilterOn, staticModificationMassesToFilterOn, proteinSequenceVersionId, projectSearchIds 
	} ) {

		const peptideItems_Map_Key_peptideSequenceDisplayString = new Map();

		const reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to external function psm_ReporterIonMasses_FilterOnSelectedValues
			transformMass_ReturnNumber : function({ mass }) {
				return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
			}
		}
		
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

			//  Map<(reported peptide), Map<(position),Array<(mod mass rounded strings)>>
			const variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = this._getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({ loadedDataPerProjectSearchIdHolder, reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId });

			//   The selected static modifications, filtered for this project search id
			const selectedStaticModificationsForProjectSearchId = this._get_selectedStaticModificationsForProjectSearchId({ staticModificationMassesToFilterOn, loadedDataPerProjectSearchIdHolder });

			const numPsmsForProjectSearchId_ObjectPropertyName = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

			const reportedPeptideIdsForProjectSearchId_ObjectPropertyName = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

			//  Various Maps, key Reported Peptide Id
			const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

			let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = undefined;

			if ( reporterIonMassesSelected ) {
				//  User has selected Reporter Ion Masses so need to compute psm count
	
				psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
				if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
					throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()" );
				}
			}
	
			//  reportedPeptideIds filtered if applicable so now create display peptide row objects

			for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
			
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

				numberOfPsmsForReportedPeptides += numPsms;

				const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
				if ( ! peptideId ) {
					throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				const peptideSequenceString = this._loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } );
				if ( ! peptideSequenceString ) {
					throw Error("_createReportedPeptideDisplayData: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
				}

				const variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;

				const staticModificationsRounded_KeyPosition = this._get_staticModificationsRounded_KeyPosition_ForSelectedStaticModsAndPeptideSequence({ peptideSequenceString, selectedStaticModificationsForProjectSearchId });

				//   Call external function
				const peptideSequenceDisplay = peptideSequence_CreateCommonDisplayString({ peptideSequence : peptideSequenceString, variableModificationsRoundedArray_KeyPosition, staticModificationsRounded_KeyPosition });

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
		
		return { peptideList : peptideListResult, peptideItems_Map_Key_peptideSequenceDisplayString, numberOfReportedPeptides, numberOfPsmsForReportedPeptides };
	}

	/////

	/**
	 * Get Static Modifications (rounded) String
	 * 
	 * @returns Map<residue, roundedMass>: subset of staticModificationMassesToFilterOn;
	 */	
	_get_selectedStaticModificationsForProjectSearchId({ staticModificationMassesToFilterOn, loadedDataPerProjectSearchIdHolder }) {

		const selectedStaticModificationsForProjectSearchId = new Map();

		if ( ! staticModificationMassesToFilterOn || staticModificationMassesToFilterOn.size === 0 ) {
			return selectedStaticModificationsForProjectSearchId;
		}

		const staticMods = loadedDataPerProjectSearchIdHolder.get_staticMods(); // Array [{ String residue, BigDecimal mass }] : [Static Mods]

		const staticModsForSearchMap = new Map(); // Map<residue, roundedMass>

		// from staticMods: Build Map<residue, roundedMass>
		for ( const staticMod of staticMods ) {
			const massRounded = modificationMass_CommonRounding_ReturnNumber( staticMod.mass );  // Call external function
			staticModsForSearchMap.set( staticMod.residue, massRounded );
		}

		for ( const entry of staticModificationMassesToFilterOn.entries() ) {
			const residue = entry[ 0 ];
			const massesSet = entry[ 1 ];
			const staticModsForSearchMapEntry_mass = staticModsForSearchMap.get( residue );
			if ( staticModsForSearchMapEntry_mass ) {
				if ( massesSet.has( staticModsForSearchMapEntry_mass ) ) {
					selectedStaticModificationsForProjectSearchId.set( residue, staticModsForSearchMapEntry_mass );
				}
			}
		}

		return selectedStaticModificationsForProjectSearchId;
	}


	/**
	 * Get Static Modifications (rounded) String
	 * 
	 * @param selectedStaticModificationsForProjectSearchId - Map<residue, roundedMass>: from this._get_selectedStaticModificationsForProjectSearchId(...)
	 * 
	 * @returns  Map<(position),(mod mass rounded string)>
	 */	
	_get_staticModificationsRounded_KeyPosition_ForSelectedStaticModsAndPeptideSequence({ peptideSequenceString, selectedStaticModificationsForProjectSearchId }) {

		const staticModificationsRounded_KeyPosition = new Map();

		if ( ( ! selectedStaticModificationsForProjectSearchId ) || selectedStaticModificationsForProjectSearchId.size === 0 ) {
			//  User not select any modifications so return empty map
			return staticModificationsRounded_KeyPosition;
		}

		const peptideSequenceStringArray = peptideSequenceString.split(""); //  split into array with 1 char per element;
		const peptideSequenceStringArrayLength = peptideSequenceStringArray.length;

		for ( let index = 0; index < peptideSequenceStringArrayLength; index++ ) {
			const peptideResidueAtIndex = peptideSequenceStringArray[ index ];
			const staticModificationMass_ForResidue = selectedStaticModificationsForProjectSearchId.get( peptideResidueAtIndex );
			if ( staticModificationMass_ForResidue ) {
				const position = index + 1;  //  position is 1 based
				const massString = staticModificationMass_ForResidue.toString();
				staticModificationsRounded_KeyPosition.set( position, massString );
			}
		}

		return staticModificationsRounded_KeyPosition;
	}

	////////////////////////////////////

	/**
	 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
	 * 
	 * @returns  Map<(reported peptide), Map<(position),Array<(mod mass rounded strings sorted)>>
	 */	
	_getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({ loadedDataPerProjectSearchIdHolder, reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId }) {

				//  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
				// Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
		const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

		if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {

			return new Map(); //  EARLY RETURN
		}

		const reportedPeptideIdsForDisplay_Set = new Set( reportedPeptideIdsForDisplay );

		//  Use proteinCoverage_KeyProteinSequenceVersionId since by proteinSequenceVersionId

		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinCoverageObject === undefined ) {

			return new Map(); //  EARLY RETURN
			//  Since Multiple Search, return instead of throw:  throw Error("_getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
		}
		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		if ( proteinCoverageEntries_PerReportedPeptideId_Array === undefined ) {

			return new Map(); //  EARLY RETURN
		}

		const modsRoundedSet_KeyPosition_KeyReportedPeptideId = new Map();
        
		for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

			const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;

			if ( ! reportedPeptideIdsForDisplay_Set.has( reportedPeptideId ) ) {
				// Not for selected reported peptide ids
				continue;  // EARLY CONTINUE
			}

			let modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId );
			if ( ! modsRoundedSet_KeyPosition ) {
				modsRoundedSet_KeyPosition = new Map();
				modsRoundedSet_KeyPosition_KeyReportedPeptideId.set( reportedPeptideId, modsRoundedSet_KeyPosition );
			}
			
			const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
			if ( dynamicModificationsOnReportedPeptideArray ) {
				
				//  Have Mods for this reportedPeptideId
				for ( const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray ) {
				
					const mass = dynamicModificationOnReportedPeptide.mass;
					const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

					//   Currently ignoring is_C_Terminal and is_N_Terminal
					// const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;
					// const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
					
					// if (  entry.is_N_Terminal !== undefined || entry.is_C_Terminal !== undefined ) {
					// 	const msg = "ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList: ERROR: entry.is_N_Terminal or entry.is_C_Terminal exists.  This code does not handle those properties being true.";
					// 	console.log( msg );
					// 	throw Error( msg );
					// }

					let modsRoundedSet = modsRoundedSet_KeyPosition.get( positionOnReportedPeptide );
					if ( ! modsRoundedSet ) {
						modsRoundedSet = new Set();
						modsRoundedSet_KeyPosition.set( positionOnReportedPeptide, modsRoundedSet );
					}

					const massRounded = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
					modsRoundedSet.add( massRounded );
				}
			}
		}

		const modsRoundedArray_KeyPosition_KeyReportedPeptideId = new Map(); // Map<(reported peptide), Map<(position),Set<(mod mass rounded sorted, to strings )>>

		for ( const modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry of modsRoundedSet_KeyPosition_KeyReportedPeptideId.entries() ) {
			const modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 0 ];
			const modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 1 ];

			const modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry = new Map();
			modsRoundedArray_KeyPosition_KeyReportedPeptideId.set( modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey, modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry );

			for ( const modsRoundedSet_KeyPosition_Entry of modsRoundedSet_KeyPosition.entries() ) {
				const modsRoundedSet_KeyPosition_EntryKey = modsRoundedSet_KeyPosition_Entry[ 0 ];
				const modsRoundedSet = modsRoundedSet_KeyPosition_Entry[ 1 ];

				const modsRoundedArray = Array.from( modsRoundedSet );
				modsRoundedArray.sort( (a,b) => {
					if ( a < b ) {
						return -1;
					} else if ( a > b ) {
						return 1;
					} else {
						return 0;
					}
				});
				const modsRoundedStringsArray = [];
				for ( const modRounded of modsRoundedArray ) {
					const modRoundedString = modRounded.toString();
					modsRoundedStringsArray.push( modRoundedString );
				}
				modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry.set( modsRoundedSet_KeyPosition_EntryKey, modsRoundedStringsArray );
			}
		}

		return modsRoundedArray_KeyPosition_KeyReportedPeptideId
	}

	//  Comment out since currently not used

	// /**
	//  * Get Selected Static Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
	//  * 
	//  * Only for/when Static Modifications are selected for filtering
	//  * 
	//  * @returns  Map<(reported peptide), Map<(position),Array<(mod mass rounded strings sorted)>>
	//  */	
	// _getSelectedStaticModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({ loadedDataPerProjectSearchIdHolder, reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId }) {

	// 			//  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
	// 			// Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
	// 	const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

	// 	if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {

	// 		return new Map(); //  EARLY RETURN
	// 	}

	// 	const reportedPeptideIdsForDisplay_Set = new Set( reportedPeptideIdsForDisplay );

	// 	//  Use proteinCoverage_KeyProteinSequenceVersionId since by proteinSequenceVersionId

	// 	const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

	// 	const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
	// 	if ( proteinCoverageObject === undefined ) {
	// 		return new Map(); //  EARLY RETURN
	// 		//  Since Multiple Search, return instead of throw:  throw Error("_combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId );
	// 	}
	// 	const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

	// 	if ( proteinCoverageEntries_PerReportedPeptideId_Array === undefined ) {

	// 		return new Map(); //  EARLY RETURN
	// 	}

	// 	const modsRoundedSet_KeyPosition_KeyReportedPeptideId = new Map();

	// 	for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

	// 		const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;

	// 		if ( ! reportedPeptideIdsForDisplay_Set.has( reportedPeptideId ) ) {
	// 			// Not for selected reported peptide ids
	// 			continue;  // EARLY CONTINUE
	// 		}

	// 		let modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId );
	// 		if ( ! modsRoundedSet_KeyPosition ) {
	// 			modsRoundedSet_KeyPosition = new Map();
	// 			modsRoundedSet_KeyPosition_KeyReportedPeptideId.set( reportedPeptideId, modsRoundedSet_KeyPosition );
	// 		}
			
	// 		const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
	// 		if ( dynamicModificationsOnReportedPeptideArray ) {
				
	// 			//  Have Mods for this reportedPeptideId
	// 			for ( const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray ) {
				
	// 				const mass = dynamicModificationOnReportedPeptide.mass;
	// 				const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

	// 				//   Currently ignoring is_C_Terminal and is_N_Terminal
	// 				// const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;
	// 				// const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
					
	// 				// if (  entry.is_N_Terminal !== undefined || entry.is_C_Terminal !== undefined ) {
	// 				// 	const msg = "ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList: ERROR: entry.is_N_Terminal or entry.is_C_Terminal exists.  This code does not handle those properties being true.";
	// 				// 	console.log( msg );
	// 				// 	throw Error( msg );
	// 				// }

	// 				let modsRoundedSet = modsRoundedSet_KeyPosition.get( positionOnReportedPeptide );
	// 				if ( ! modsRoundedSet ) {
	// 					modsRoundedSet = new Set();
	// 					modsRoundedSet_KeyPosition.set( positionOnReportedPeptide, modsRoundedSet );
	// 				}

	// 				const massRounded = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
	// 				modsRoundedSet.add( massRounded );
	// 			}
	// 		}
	// 	}

	// 	const modsRoundedArray_KeyPosition_KeyReportedPeptideId = new Map(); // Map<(reported peptide), Map<(position),Set<(mod mass rounded sorted, to strings )>>

	// 	for ( const modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry of modsRoundedSet_KeyPosition_KeyReportedPeptideId.entries() ) {
	// 		const modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 0 ];
	// 		const modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 1 ];

	// 		const modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry = new Map();
	// 		modsRoundedArray_KeyPosition_KeyReportedPeptideId.set( modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey, modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry );

	// 		for ( const modsRoundedSet_KeyPosition_Entry of modsRoundedSet_KeyPosition.entries() ) {
	// 			const modsRoundedSet_KeyPosition_EntryKey = modsRoundedSet_KeyPosition_Entry[ 0 ];
	// 			const modsRoundedSet = modsRoundedSet_KeyPosition_Entry[ 1 ];

	// 			const modsRoundedArray = Array.from( modsRoundedSet );
	// 			modsRoundedArray.sort( (a,b) => {
	// 				if ( a < b ) {
	// 					return -1;
	// 				} else if ( a > b ) {
	// 					return 1;
	// 				} else {
	// 					return 0;
	// 				}
	// 			});
	// 			const modsRoundedStringsArray = [];
	// 			for ( const modRounded of modsRoundedArray ) {
	// 				const modRoundedString = modRounded.toString();
	// 				modsRoundedStringsArray.push( modRoundedString );
	// 			}
	// 			modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry.set( modsRoundedSet_KeyPosition_EntryKey, modsRoundedStringsArray );
	// 		}
	// 	}

	// 	return modsRoundedArray_KeyPosition_KeyReportedPeptideId
	// 	}

	//////////

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
	_createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, any_ReporterIonMasses_ForAllSearches, reporterIonMassesSelected, projectSearchIds } ) {
		
		// const objectThis = this;
		
		const peptideList = reportedPeptideDisplayData.peptideList;

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

		//  Container element
		let $selector_reported_peptides_data_table_container = $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container");
		if ( $selector_reported_peptides_data_table_container.length === 0 ) {
			throw Error('$reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container") found no DOM elements')
		}
		if ( $selector_reported_peptides_data_table_container.length > 1 ) {
			throw Error('$reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container") found > 1 DOM elements')
		}
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

		const tableObject = { columns, dataObjects : tableObjects, expandableRows : true };

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
				any_ReporterIonMasses_ForAllSearches, 
				reporterIonMassesSelected,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
			};

			//   Callback function called by TableDisplayHandler
			//   when user clicks on a row in the top level "combined" reported peptide

			const combinedReportedPeptideRow_expansionCallbackFunction = ( functionParams ) => {
				try {
					return this._proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList_Drilldowns
							.combinedReportedPeptideRow_ShowSearches( functionParams );
				} catch( e ) {
					console.log("Exception caught in _combinedReportedPeptideRow_expansionCallbackFunction(...)");
					console.log( e );
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}
			//  value in functionParams will be passed to function specified in property 'getElementToInsertFunction' as the parameter

			tableDisplayHandler.addExpansionHandlerToRows( 
					{ $tableContainerDiv, getElementToInsertFunction : combinedReportedPeptideRow_expansionCallbackFunction, functionParams } );
		}


		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
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
			this._dataPageStateManager_DataFrom_Server.get_searchNames();


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
    }


}
