/**
 * modPageRoot_CentralStateManagerObjectClass.ts.ts
 * 
 * Holds the state of the Mod Page.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { MOD_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";

const _COMPONENT_UNIQUE_ID = MOD_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';
const _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'c';
const _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';
const _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'e';
// const _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'f';
const _PROTEIN_POSITION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'g';
const _GENERATED_PEPTIDE_CONTENTS_SELECTION__SINGLE_PROTEIN_OVERLAY__ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'h';
const _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'i';
const _SCAN_FILENAME_ID_ON_PSM_FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'j';
const _SCAN_RETENTION_TIME_MZ__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'k';
const _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'l';
const _PSM_HIDE_INDEPENDENT_DECOY_PSMS__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'm';
const _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'n';
const _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'o';
const _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME = 'p';
const _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME = 'q';
const _PROTEIN_POSITION_OF_MODIFICATION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'r';
const _MOD_MASS_ROUNDED_FROM_MOD_PAGE_MAIN_PAGE_FOR_SINGLE_PROTEIN_INITIAL_SELECTION = "s"

class ModPageRoot_CentralStateManagerObjectClass__InitializeMethod_OptionalParam {
	optional_encodedStateData?: any
}

/**
 * 
 */
export class ModPageRoot_CentralStateManagerObjectClass {

	private _value : {
		reporterIonMassesSelectedEncodedStateData? : any
		modsSelectedEncodedStateData? : any
		peptideUniqueFilterSelectedEncodedStateData? : any
		peptideSequenceFilterSelectedEncodedStateData? : any
		proteinPositionFilter_UserSelections_EncodedStateData? : any
		proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData? : any  // ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
		// generatedPeptideContentsSelectedEncodedStateData? : any
		peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData?: any // PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
		scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData?: any  // ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
		scan_RetentionTime_MZ_UserSelections_EncodedStateData?: any // Scan_RetentionTime_MZ_UserSelections_StateObject
		psm_Charge_Filter_UserSelection_EncodedStateData?: any  // Psm_Charge_Filter_UserSelection_StateObject
		psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData? : any //  Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
		generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay? : any
		peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData? : any // PeptideSequence_MissedCleavageCount_UserSelections_StateObject
		peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData?: any // PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
		scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData? : any // ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
		scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData? : any //  ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
		modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection?: number
	}

	_centralPageStateManager? : CentralPageStateManager

	static isSetIn_CentralPageStateManager({centralPageStateManager}: { centralPageStateManager: CentralPageStateManager } ) : boolean {

		const temp_Object = new ModPageRoot_CentralStateManagerObjectClass({ centralPageStateManager: undefined })

		const encodedStateData = centralPageStateManager.getEncodedData__NO_ComponentRegisteredCheck__ONLY_USE_WHEN_HAVE_TO({component: temp_Object });

		if ( encodedStateData ) {
			return true
		}

		return false
	}

	/**
	 *
	 */
	constructor({centralPageStateManager}: { centralPageStateManager: CentralPageStateManager } ) {

		this._value = {};

		//  No centralPageStateManager value if used for an override

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}

	/**
	 *
	 * @param param.optional_encodedStateData --  If not passed, Uses value from this._centralPageStateManager.getEncodedData
	 */
	initialize( param? : ModPageRoot_CentralStateManagerObjectClass__InitializeMethod_OptionalParam ) {

		let encodedStateData = undefined;
		if ( param && param.optional_encodedStateData ) {
			encodedStateData = param.optional_encodedStateData;
		}
		if ( ! encodedStateData ) {
			encodedStateData = this._centralPageStateManager.getEncodedData({component: this});
		}
		if ( encodedStateData ) {
            this._value = {
				reporterIonMassesSelectedEncodedStateData : encodedStateData[ _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modsSelectedEncodedStateData : encodedStateData[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideUniqueFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequenceFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				proteinPositionFilter_UserSelections_EncodedStateData : encodedStateData[ _PROTEIN_POSITION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData : encodedStateData[ _PROTEIN_POSITION_OF_MODIFICATION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				// generatedPeptideContentsSelectedEncodedStateData : encodedStateData[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay :
					encodedStateData[ _GENERATED_PEPTIDE_CONTENTS_SELECTION__SINGLE_PROTEIN_OVERLAY__ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData : encodedStateData[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData : encodedStateData[ _SCAN_FILENAME_ID_ON_PSM_FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scan_RetentionTime_MZ_UserSelections_EncodedStateData : encodedStateData[ _SCAN_RETENTION_TIME_MZ__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				psm_Charge_Filter_UserSelection_EncodedStateData: encodedStateData[ _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData: encodedStateData[ _PSM_HIDE_INDEPENDENT_DECOY_PSMS__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData: encodedStateData[ _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ],
				scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData: encodedStateData[ _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ],
				modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection: encodedStateData[ _MOD_MASS_ROUNDED_FROM_MOD_PAGE_MAIN_PAGE_FOR_SINGLE_PROTEIN_INITIAL_SELECTION ]
			};
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } : { reporterIonMassesSelectedEncodedStateData: any } ) {
		this._value.reporterIonMassesSelectedEncodedStateData = reporterIonMassesSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getReporterIonMassesSelectedEncodedStateData() {
		return this._value.reporterIonMassesSelectedEncodedStateData;
	}

	setModsSelectedEncodedStateData( { modsSelectedEncodedStateData } : { modsSelectedEncodedStateData: any } ) {
		this._value.modsSelectedEncodedStateData = modsSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getModsSelectedEncodedStateData() {
		return this._value.modsSelectedEncodedStateData;
	}

	setPeptideUniqueFilterSelectedEncodedStateData( { peptideUniqueFilterSelectedEncodedStateData } : { peptideUniqueFilterSelectedEncodedStateData: any } ) {
		this._value.peptideUniqueFilterSelectedEncodedStateData = peptideUniqueFilterSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getPeptideUniqueFilterSelectedEncodedStateData() {
		return this._value.peptideUniqueFilterSelectedEncodedStateData;
	}

	setPeptideSequenceFilterSelectedEncodedStateData( { peptideSequenceFilterSelectedEncodedStateData } : { peptideSequenceFilterSelectedEncodedStateData: any } ) {
		this._value.peptideSequenceFilterSelectedEncodedStateData = peptideSequenceFilterSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	getPeptideSequenceFilterSelectedEncodedStateData() {
		return this._value.peptideSequenceFilterSelectedEncodedStateData;
	}

	set_proteinPositionFilter_UserSelections_EncodedStateData( { proteinPositionFilter_UserSelections_EncodedStateData } : { proteinPositionFilter_UserSelections_EncodedStateData: any } ) {
		this._value.proteinPositionFilter_UserSelections_EncodedStateData = proteinPositionFilter_UserSelections_EncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	get_proteinPositionFilter_UserSelections_EncodedStateData() {
		return this._value.proteinPositionFilter_UserSelections_EncodedStateData;
	}

	set_proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData( { proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData } : { proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData: any } ) {
		this._value.proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData = proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	get_proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData() {
		return this._value.proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData;
	}

	// setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData } :{ generatedPeptideContentsSelectedEncodedStateData: any } ) {
	// 	this._value.generatedPeptideContentsSelectedEncodedStateData = generatedPeptideContentsSelectedEncodedStateData;
	//
	// 	if ( ! this._centralPageStateManager ) {
	// 		throw Error( "this._centralPageStateManager not set" );
	// 	}
	// 	this._centralPageStateManager.setState( { component : this } );
	// }
	// getGeneratedPeptideContentsSelectedEncodedStateData() {
	// 	return this._value.generatedPeptideContentsSelectedEncodedStateData;
	// }


	/**
	 * generatedPeptideContentsSelectedEncodedStateData  For  SingleProteinOverlay
	 *
	 * @param generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay
	 */
	setGeneratedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay(
		{
			generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay
		} :{
			generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay: any
		} ) {
		this._value.generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay = generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	/**
	 * generatedPeptideContentsSelectedEncodedStateData  For  SingleProteinOverlay
	 */
	getGeneratedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay() {
		return this._value.generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay;
	}


	/**
	 * @param peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData
	 */
	set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData(
		{
			peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData
		} :{
			peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData: any
		} ) {
		this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}

	/**
	 * peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData
	 */
	get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData() {
		return this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;
	}


	/**
	 * @param generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay
	 */
	set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData(
		{
			scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData
		} :{
			scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData: any
		} ) {
		this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData
	 */
	get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData() {
		return this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;
	}

	/**
	 * @param generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay
	 */
	set_scan_RetentionTime_MZ_UserSelections_EncodedStateData(
		{
			scan_RetentionTime_MZ_UserSelections_EncodedStateData
		} :{
			scan_RetentionTime_MZ_UserSelections_EncodedStateData: any
		} ) {
		this._value.scan_RetentionTime_MZ_UserSelections_EncodedStateData = scan_RetentionTime_MZ_UserSelections_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * scan_RetentionTime_MZ_UserSelections_EncodedStateData
	 */
	get_scan_RetentionTime_MZ_UserSelections_EncodedStateData() {
		return this._value.scan_RetentionTime_MZ_UserSelections_EncodedStateData;
	}

	/**
	 *
	 */
	set_psm_Charge_Filter_UserSelection_EncodedStateData(
		{
			psm_Charge_Filter_UserSelection_EncodedStateData
		} :{
			psm_Charge_Filter_UserSelection_EncodedStateData: any
		} ) {
		this._value.psm_Charge_Filter_UserSelection_EncodedStateData = psm_Charge_Filter_UserSelection_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * psm_Charge_Filter_UserSelection_EncodedStateData
	 */
	get_psm_Charge_Filter_UserSelection_EncodedStateData() {
		return this._value.psm_Charge_Filter_UserSelection_EncodedStateData;
	}

	/**
	 *
	 */
	set_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData(
		{
			psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData
		} :{
			psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData: any
		} ) {
		this._value.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData = psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData
	 */
	get_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData() {
		return this._value.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData;
	}

	/**
	 *
	 */
	set_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData(
		{
			peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData
		} :{
			peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData: any
		} ) {
		this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData = peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData
	 */
	get_peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData() {
		return this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData;
	}

	/**
	 *
	 */
	set_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData(
		{
			peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData
		} :{
			peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData: any
		} ) {
		this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData = peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData
	 */
	get_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData() {
		return this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData;
	}

	/**
	 *
	 */
	set_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData(
		{
			scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData
		} :{
			scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData: any
		} ) {
		this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData = scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData
	 */
	get_scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData() {
		return this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData;
	}

	/**
	 *
	 */
	set_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData(
		{
			scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData
		} :{
			scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData: any
		} ) {
		this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData = scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData
	 */
	get_scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData() {
		return this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData;
	}

	/**
	 *
	 */
	set_modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection(
		{
			modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection
		} :{
			modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection: number
		} ) {
		this._value.modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection = modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection;

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection
	 */
	get_modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection() {
		return this._value.modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection;
	}


	/////////////////////

    /**
     * Called by Central State Manager and maybe other code
	 */
	getUniqueId() {
		return _COMPONENT_UNIQUE_ID;
	}
	
    /**
     * Called by Central State Manager and maybe other code
	 */
	getDataForEncoding() {

		const dataForEncoding: { [key: string]: any } = {}

		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		if ( this._value.reporterIonMassesSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.reporterIonMassesSelectedEncodedStateData;
		}
		if ( this._value.modsSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.modsSelectedEncodedStateData;
		}
		if ( this._value.peptideUniqueFilterSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideUniqueFilterSelectedEncodedStateData;
		}
		if ( this._value.peptideSequenceFilterSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideSequenceFilterSelectedEncodedStateData;
		}
		if ( this._value.proteinPositionFilter_UserSelections_EncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_POSITION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinPositionFilter_UserSelections_EncodedStateData
		}
		if ( this._value.proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_POSITION_OF_MODIFICATION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinPosition_Of_Modification_Filter_UserSelections_EncodedStateData
		}
		// if ( this._value.generatedPeptideContentsSelectedEncodedStateData !== undefined ) {
		// 	dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.generatedPeptideContentsSelectedEncodedStateData;
		// }
		if ( this._value.generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay !== undefined ) {
			dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS_SELECTION__SINGLE_PROTEIN_OVERLAY__ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay;
		}
		if ( this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;
		}
		if ( this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_FILENAME_ID_ON_PSM_FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;
		}
		if ( this._value.scan_RetentionTime_MZ_UserSelections_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_RETENTION_TIME_MZ__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.scan_RetentionTime_MZ_UserSelections_EncodedStateData;
		}
		if ( this._value.psm_Charge_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.psm_Charge_Filter_UserSelection_EncodedStateData;
		}
		if ( this._value.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _PSM_HIDE_INDEPENDENT_DECOY_PSMS__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_EncodedStateData;
		}
		if ( this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData;
		}
		if ( this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData;
		}
		if ( this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ] = this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData;
		}
		if ( this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ] = this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData;
		}
		if ( this._value.modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection !== undefined ) {
			dataForEncoding[ _MOD_MASS_ROUNDED_FROM_MOD_PAGE_MAIN_PAGE_FOR_SINGLE_PROTEIN_INITIAL_SELECTION ] = this._value.modMass_Rounded_From_ModPage_MainPage_For_SingleProtein_InitialSelection;
		}

		return dataForEncoding;
	}
}