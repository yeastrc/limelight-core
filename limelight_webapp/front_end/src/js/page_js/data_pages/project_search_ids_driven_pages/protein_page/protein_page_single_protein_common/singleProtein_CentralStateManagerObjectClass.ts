/**
 * singleProtein_CentralStateManagerObjectClass.ts
 * 
 * Holds the state of the Single Protein Overlay.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { SINGLE_PROTEIN__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";




const _COMPONENT_UNIQUE_ID = SINGLE_PROTEIN__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

////

//  Encoded Data 

const _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION = 1;

//  Encoded Data Property Names.  Keep short to keep data smaller

const _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME = 'b';
const _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'c';
const _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'd';
const _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'e';
const _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'f';
const _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'g';
const _SEARCH_SUB_GROUP_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'h';
const _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION = 'i';
const _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS = 'j';
const _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'k';
const _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'l';
const _FILTER_ON_SCAN_RETENTION_TIME_MZ_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'm';
const _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'n';
const _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'o';
const _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'p';
const _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME = 'q';
const _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME = 'r';
const _PROTEIN_SEQUENCE_BAR_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 's';
const _SINGLEPROTEIN_PROTEINSEQUENCE_ETC_TABS_SELECTEDTAB_STATEOBJECT_ENCODING_PROPERTY_NAME = "t"

/**
 * 
 */
export class SingleProtein_CentralStateManagerObjectClass {

	private _value : {
		proteinSequenceVersionId? : number
		proteinSequenceFormattedDisplayWidgetEncodedStateData? : any
		proteinSequence_Bar_Widget_EncodedStateData? : any
		reporterIonMassesSelectedEncodedStateData? : any
		modsSelectedEncodedStateData? : any
		peptideUniqueFilterSelectedEncodedStateData? : any
		peptideSequenceFilterSelectedEncodedStateData? : any
		searchSubGroupSelection_EncodedStateData?: any
		modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData?: any
		generatedPeptideContents_UserSelections__EncodedStateData?: any
		peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData?: any
		scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData?: any
		scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData? : any // ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
		scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData? : any // ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
		scan_RetentionTime_MZ_UserSelection_EncodedStateData?: any
		psm_Charge_Filter_UserSelection_EncodedStateData?: any
		peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData? : any // PeptideSequence_MissedCleavageCount_UserSelections_StateObject
		peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData?: any // PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
		singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData?: any  // _singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject
	}

	_centralPageStateManager? : CentralPageStateManager

	/**
	 * IMPORTANT:
	 * 
	 * A value in initialProteinSequenceVersionId will not trigger a call to this._centralPageStateManager.setState(...).
	 *   Thus, those values will not automatically be reflected on the browser URL.
     * 
     * A value in initialProteinSequenceVersionId will be overlaid by any values on the URL for this component
	 */
	constructor(
		{
			centralPageStateManager, initialProteinSequenceVersionId
		}: {
			centralPageStateManager: CentralPageStateManager
			initialProteinSequenceVersionId: number
		} ) {

		this._value = {};

		if ( initialProteinSequenceVersionId !== undefined ) {
			this._value.proteinSequenceVersionId = initialProteinSequenceVersionId;
		}

		//  No centralPageStateManager value if used for an override

		if ( centralPageStateManager ) {
			this._centralPageStateManager = centralPageStateManager;
			
			this._centralPageStateManager.register( { component : this } );
		}
	}
	
	initialize() {
		let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
		if ( encodedStateData ) {
            this._value = {
				proteinSequenceVersionId : encodedStateData[ _PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME ],
				proteinSequenceFormattedDisplayWidgetEncodedStateData : encodedStateData[ _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				proteinSequence_Bar_Widget_EncodedStateData : encodedStateData[ _PROTEIN_SEQUENCE_BAR_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				reporterIonMassesSelectedEncodedStateData : encodedStateData[ _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modsSelectedEncodedStateData : encodedStateData[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideUniqueFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequenceFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				searchSubGroupSelection_EncodedStateData: encodedStateData[ _SEARCH_SUB_GROUP_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData: encodedStateData[ _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION ],
				generatedPeptideContents_UserSelections__EncodedStateData: encodedStateData[ _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS ],
				peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData: encodedStateData[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData: encodedStateData[ _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData: encodedStateData[ _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ],
				scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData: encodedStateData[ _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ],
				scan_RetentionTime_MZ_UserSelection_EncodedStateData: encodedStateData[ _FILTER_ON_SCAN_RETENTION_TIME_MZ_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				psm_Charge_Filter_UserSelection_EncodedStateData: encodedStateData[ _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData: encodedStateData[ _SINGLEPROTEIN_PROTEINSEQUENCE_ETC_TABS_SELECTEDTAB_STATEOBJECT_ENCODING_PROPERTY_NAME ]
			};
		} else {
			this._value = {}
		}
	}

	clearAll() {

		if ( ( ! this._value ) || ( Object.keys( this._value ).length === 0 ) ) {
			//  Nothing set so just return
			return; // EARLY RETURN
		}

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}
	
	setProteinSequenceVersionId( { proteinSequenceVersionId } : { proteinSequenceVersionId: number } ) {
		this._value.proteinSequenceVersionId = proteinSequenceVersionId;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	getProteinSequenceVersionId(): number {
		return this._value.proteinSequenceVersionId;
	}

	setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData }: { proteinSequenceFormattedDisplayWidgetEncodedStateData: any } ) {
		this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData = proteinSequenceFormattedDisplayWidgetEncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	getProteinSequenceFormattedDisplayWidgetEncodedStateData() {
		return this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData;
	}

	set_ProteinSequence_Bar_Widget_EncodedStateData( { proteinSequence_Bar_Widget_EncodedStateData }: { proteinSequence_Bar_Widget_EncodedStateData: any } ) {
		this._value.proteinSequence_Bar_Widget_EncodedStateData = proteinSequence_Bar_Widget_EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	get_ProteinSequence_Bar_Widget_EncodedStateData() {
		return this._value.proteinSequence_Bar_Widget_EncodedStateData;
	}

	setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData }: { reporterIonMassesSelectedEncodedStateData: any } ) {
		this._value.reporterIonMassesSelectedEncodedStateData = reporterIonMassesSelectedEncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	getReporterIonMassesSelectedEncodedStateData() {
		return this._value.reporterIonMassesSelectedEncodedStateData;
	}

	setModsSelectedEncodedStateData( { modsSelectedEncodedStateData }: { modsSelectedEncodedStateData: any } ) {
		this._value.modsSelectedEncodedStateData = modsSelectedEncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	getModsSelectedEncodedStateData() {
		return this._value.modsSelectedEncodedStateData;
	}

	setPeptideUniqueFilterSelectedEncodedStateData( { peptideUniqueFilterSelectedEncodedStateData }: { peptideUniqueFilterSelectedEncodedStateData: any } ) {
		this._value.peptideUniqueFilterSelectedEncodedStateData = peptideUniqueFilterSelectedEncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getPeptideUniqueFilterSelectedEncodedStateData() {
		return this._value.peptideUniqueFilterSelectedEncodedStateData;
	}

	setPeptideSequenceFilterSelectedEncodedStateData( { peptideSequenceFilterSelectedEncodedStateData }: { peptideSequenceFilterSelectedEncodedStateData: any } ) {
		this._value.peptideSequenceFilterSelectedEncodedStateData = peptideSequenceFilterSelectedEncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getPeptideSequenceFilterSelectedEncodedStateData() {
		return this._value.peptideSequenceFilterSelectedEncodedStateData;
	}

	set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData( { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData }: { peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData: any } ) {
		this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	get_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData() {
		return this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;
	}

	setSearchSubGroupSelection_EncodedStateData( { searchSubGroupSelection_EncodedStateData }: { searchSubGroupSelection_EncodedStateData: any } ) {
		this._value.searchSubGroupSelection_EncodedStateData = searchSubGroupSelection_EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getSearchSubGroupSelection_EncodedStateData() {
		return this._value.searchSubGroupSelection_EncodedStateData;
	}

	setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData }: { modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData: any } ) {
		this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData() {
		return this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData;
	}

	setGeneratedPeptideContents_UserSelections__EncodedStateData( { generatedPeptideContents_UserSelections__EncodedStateData }: { generatedPeptideContents_UserSelections__EncodedStateData: any } ) {
		this._value.generatedPeptideContents_UserSelections__EncodedStateData = generatedPeptideContents_UserSelections__EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getGeneratedPeptideContents_UserSelections__EncodedStateData() {
		return this._value.generatedPeptideContents_UserSelections__EncodedStateData;
	}

	set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData( { scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData }: { scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData: any } ) {
		this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	get_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData() {
		return this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;
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

	set_scan_RetentionTime_MZ_UserSelection_EncodedStateData( { scan_RetentionTime_MZ_UserSelection_EncodedStateData }: { scan_RetentionTime_MZ_UserSelection_EncodedStateData: any } ) {
		this._value.scan_RetentionTime_MZ_UserSelection_EncodedStateData = scan_RetentionTime_MZ_UserSelection_EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	get_scan_RetentionTime_MZ_UserSelection_EncodedStateData() {
		return this._value.scan_RetentionTime_MZ_UserSelection_EncodedStateData;
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
	set_singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData(
		{
			singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData
		} :{
			singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData: any
		} ) {
		this._value.singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData = singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData

		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}

	/**
	 * singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData
	 */
	get_singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData() {
		return this._value.singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData;
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

		if ( this._value.proteinSequenceVersionId !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceVersionId;
		}
		if ( this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData;
		}
		if ( this._value.proteinSequence_Bar_Widget_EncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_BAR_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinSequence_Bar_Widget_EncodedStateData;
		}

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
		if ( this._value.searchSubGroupSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _SEARCH_SUB_GROUP_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.searchSubGroupSelection_EncodedStateData;
		}
		if ( this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData !== undefined ) {
			dataForEncoding[ _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION ] = this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData;
		}
		if ( this._value.generatedPeptideContents_UserSelections__EncodedStateData !== undefined ) {
			dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS ] = this._value.generatedPeptideContents_UserSelections__EncodedStateData;
		}
		if ( this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;
		}
		if ( this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;
		}
		if ( this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_NUMBER_SCAN_FILE_NAME_ID_PROJECT_SEARCH_ID_ON_PSM_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ] = this._value.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject_EncodedStateData;
		}
		if ( this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _SCAN_PEAK_M_OVER_Z_INTENSITY_FILTER_USER_SELECTION_STATE_OBJECT_ENCODED_STATE_DATA_PROPERTY_NAME ] = this._value.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_EncodedStateData
		}
		if ( this._value.scan_RetentionTime_MZ_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_SCAN_RETENTION_TIME_MZ_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.scan_RetentionTime_MZ_UserSelection_EncodedStateData;
		}
		if ( this._value.psm_Charge_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.psm_Charge_Filter_UserSelection_EncodedStateData;
		}
		if ( this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData;
		}
		if ( this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData;
		}
		if ( this._value.singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData !== undefined ) {
			dataForEncoding[ _SINGLEPROTEIN_PROTEINSEQUENCE_ETC_TABS_SELECTEDTAB_STATEOBJECT_ENCODING_PROPERTY_NAME ] = this._value.singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject_EncodedStateData;
		}

		return dataForEncoding;
	}
}