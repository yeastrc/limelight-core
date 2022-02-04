/**
 * peptidePageRoot_CentralStateManagerObjectClass.ts
 * 
 * Holds the state of the Peptide Page.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { PEPTIDE_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";




const _COMPONENT_UNIQUE_ID = PEPTIDE_LIST__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'b';
const _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'c';
const _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';
const _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'e';
const _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'f';
const _PROTEIN_POSITION_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'g';
const _GENERATED_PEPTIDE_CONTENTS_SELECTION__SINGLE_PROTEIN_OVERLAY__ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'h';
const _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'i';
const _SCAN_FILENAME_ID_ON_PSM_FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'j';
const _SCAN_RETENTION_TIME_MZ__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'k';


class PeptidePageRoot_CentralStateManagerObjectClass__InitializeMethod_OptionalParam {
	optional_encodedStateData?: any
}

/**
 * 
 */
export class PeptidePageRoot_CentralStateManagerObjectClass {

	private _value : {
		reporterIonMassesSelectedEncodedStateData? : any
		modsSelectedEncodedStateData? : any
		peptideUniqueFilterSelectedEncodedStateData? : any
		peptideSequenceFilterSelectedEncodedStateData? : any
		proteinPositionFilter_UserSelections_EncodedStateData? : any
		generatedPeptideContentsSelectedEncodedStateData? : any
		peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData?: any // PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
		scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData?: any  // ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
		scan_RetentionTime_MZ_UserSelections_EncodedStateData?: any // Scan_RetentionTime_MZ_UserSelections_StateObject
		generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay? : any
	}

	_centralPageStateManager? : CentralPageStateManager

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
	initialize( param? : PeptidePageRoot_CentralStateManagerObjectClass__InitializeMethod_OptionalParam ) {

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
				generatedPeptideContentsSelectedEncodedStateData : encodedStateData[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				generatedPeptideContentsSelectedEncodedStateData__FOR__SingleProteinOverlay :
					encodedStateData[ _GENERATED_PEPTIDE_CONTENTS_SELECTION__SINGLE_PROTEIN_OVERLAY__ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData : encodedStateData[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData : encodedStateData[ _SCAN_FILENAME_ID_ON_PSM_FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scan_RetentionTime_MZ_UserSelections_EncodedStateData : encodedStateData[ _SCAN_RETENTION_TIME_MZ__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ]
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


	setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData } :{ generatedPeptideContentsSelectedEncodedStateData: any } ) {
		this._value.generatedPeptideContentsSelectedEncodedStateData = generatedPeptideContentsSelectedEncodedStateData;

		if ( ! this._centralPageStateManager ) {
			throw Error( "this._centralPageStateManager not set" );
		}
		this._centralPageStateManager.setState( { component : this } );
	}
	getGeneratedPeptideContentsSelectedEncodedStateData() {
		return this._value.generatedPeptideContentsSelectedEncodedStateData;
	}


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

		const dataForEncoding = {}

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
		if ( this._value.generatedPeptideContentsSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.generatedPeptideContentsSelectedEncodedStateData;
		}
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

		return dataForEncoding;
	}
}