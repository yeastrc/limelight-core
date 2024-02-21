/**
 * singleProtein_ExpPage_CentralStateManagerObjectClass.ts
 * 
 * Protein Experiment Page:
 * 
 * Holds the state of the Single Protein Overlay.  Registers with CentralPageStateManager
 * 
 * For use with:  centralPageStateManager.js
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";


import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';


import { SINGLE_PROTEIN_EXPERIMENT_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys';



const _COMPONENT_UNIQUE_ID = SINGLE_PROTEIN_EXPERIMENT_PAGE__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

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
const _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION = 'h';
const _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS = 'i';
const _EXPERIMENT__SELECTED_CONDITION_IDS_AND_PATHS__SINGLE_PROTEIN = 'j'
const _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'k';
const _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'l';
const _FILTER_ON_SCAN_RETENTION_TIME_MZ_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'm';
const _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'n';
const _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'o';
const _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME = 'p';
const _EXPERIMENT__CONDITION_GROUPS_ORDER__SINGLE_PROTEIN = 'q'

/**
 * for class property _value
 */
class InternalStateObject {

	proteinSequenceVersionId? : number
	proteinSequenceFormattedDisplayWidgetEncodedStateData?: any
	reporterIonMassesSelectedEncodedStateData?: any
	peptideUniqueFilterSelectedEncodedStateData?: any
	modsSelectedEncodedStateData?: any
	peptideSequenceFilterSelectedEncodedStateData?: any
	modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData?: any
	peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData?: any
	generatedPeptideContents_UserSelections__EncodedStateData?: any
	scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData?: any
	scan_RetentionTime_MZ_UserSelection_EncodedStateData?: any
	psm_Charge_Filter_UserSelection_EncodedStateData?: any  // Psm_Charge_Filter_UserSelection_StateObject
	peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData? : any // PeptideSequence_MissedCleavageCount_UserSelections_StateObject
	peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData?: any // PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
	experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData?: any // For Single Protein Overlay
	experiment_ConditionGroups_Order__EncodedStateData?: any // For Single Protein Overlay
}


/**
 * 
 */
export class SingleProtein_ExpPage_CentralStateManagerObjectClass {

	private _value : InternalStateObject = {};

	private _centralPageStateManager : CentralPageStateManager;

	/**
	 * IMPORTANT:
	 * 
	 * A value in initialProteinSequenceVersionId will not trigger a call to this._centralPageStateManager.setState(...).
	 *   Thus, those values will not automatically be reflected on the browser URL.
     * 
     * A value in initialProteinSequenceVersionId will be overlaid by any values on the URL for this component
	 */
	constructor( { centralPageStateManager, initialProteinSequenceVersionId } :  { centralPageStateManager : CentralPageStateManager, initialProteinSequenceVersionId : number } ) {

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
				reporterIonMassesSelectedEncodedStateData : encodedStateData[ _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modsSelectedEncodedStateData : encodedStateData[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequenceFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideUniqueFilterSelectedEncodedStateData : encodedStateData[ _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData: encodedStateData[ _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION ],
				peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData: encodedStateData[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				generatedPeptideContents_UserSelections__EncodedStateData: encodedStateData[ _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS ],
				scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData: encodedStateData[ _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				scan_RetentionTime_MZ_UserSelection_EncodedStateData: encodedStateData[ _FILTER_ON_SCAN_RETENTION_TIME_MZ_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				psm_Charge_Filter_UserSelection_EncodedStateData: encodedStateData[ _PSM_CHARGE__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				peptideSequence_MissedCleavageCount_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_SEQUENCE_MISSED_CLEAVAGE_COUNT__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData: encodedStateData[ _EXPERIMENT__SELECTED_CONDITION_IDS_AND_PATHS__SINGLE_PROTEIN ],
				peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_EncodedStateData: encodedStateData[ _PEPTIDE_MEETS_DIGESTION_AKA_TRYPTIC_PEPTIDE_ETC_USER_SELECTION__FILTER_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ],
				experiment_ConditionGroups_Order__EncodedStateData: encodedStateData[ _EXPERIMENT__CONDITION_GROUPS_ORDER__SINGLE_PROTEIN ]
			};
		}
	}

	clearAll() {

		this._value = {};
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState( { component : this } );
		}
	}
	
	setProteinSequenceVersionId( { proteinSequenceVersionId }: { proteinSequenceVersionId: number } ) {
		this._value.proteinSequenceVersionId = proteinSequenceVersionId;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}

	getProteinSequenceVersionId() {
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

	setPeptideSequenceFilterSelectedEncodedStateData( { peptideSequenceFilterSelectedEncodedStateData } :{ peptideSequenceFilterSelectedEncodedStateData: any } ) {
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

	setExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData( { experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData }: { experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData: any } ) {
		this._value.experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData = experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData() {
		return this._value.experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData;
	}

	setExperiment_ConditionGroups_Order__EncodedStateData( { experiment_ConditionGroups_Order__EncodedStateData }: { experiment_ConditionGroups_Order__EncodedStateData: any } ) {
		this._value.experiment_ConditionGroups_Order__EncodedStateData = experiment_ConditionGroups_Order__EncodedStateData;

		// if ( ! this._centralPageStateManager ) {
		// 	throw Error( "this._centralPageStateManager not set" );
		// }
		if ( this._centralPageStateManager ) {
			this._centralPageStateManager.setState({component: this});
		}
	}
	getExperiment_ConditionGroups_Order__EncodedStateData() {
		return this._value.experiment_ConditionGroups_Order__EncodedStateData;
	}

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

		if ( this._value.proteinSequenceVersionId !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_VERSION_ID_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceVersionId;
		}
		if ( this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData !== undefined ) {
			dataForEncoding[ _PROTEIN_SEQUENCE_FORMATTED_DISPLAY_WIDGET_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.proteinSequenceFormattedDisplayWidgetEncodedStateData;
		}
		if ( this._value.reporterIonMassesSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _REPORTER_ION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.reporterIonMassesSelectedEncodedStateData;
		}
		if ( this._value.modsSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _MODIFICATION_MASSES_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.modsSelectedEncodedStateData;
		}
		if ( this._value.peptideSequenceFilterSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_SEQUENCE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideSequenceFilterSelectedEncodedStateData;
		}
		if ( this._value.peptideUniqueFilterSelectedEncodedStateData !== undefined ) {
			dataForEncoding[ _PEPTIDE_UNIQUE_FILTER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideUniqueFilterSelectedEncodedStateData;
		}
		if ( this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData !== undefined ) {
			dataForEncoding[ _MODIFICATION_MASS_OPEN_MOD_MASS_ZERO_NOT_OPEN_MOD__USER_SELECTION ] = this._value.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData;
		}
		if ( this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_COUNTS_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData;
		}
		if ( this._value.generatedPeptideContents_UserSelections__EncodedStateData !== undefined ) {
			dataForEncoding[ _GENERATED_PEPTIDE_CONTENTS__USER_SELECTIONS ] = this._value.generatedPeptideContents_UserSelections__EncodedStateData;
		}
		if ( this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData !== undefined ) {
			dataForEncoding[ _FILTER_ON_SCAN_FILENAME_ID_ON_PSM_FILTER_USER_SELECTION_ENCODED_STATE_DATA_ENCODING_PROPERTY_NAME ] = this._value.scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData;
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
		if ( this._value.experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData !== undefined ) {
			dataForEncoding[ _EXPERIMENT__SELECTED_CONDITION_IDS_AND_PATHS__SINGLE_PROTEIN ] = this._value.experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData;
		}
		if ( this._value.experiment_ConditionGroups_Order__EncodedStateData ) {
			dataForEncoding[ _EXPERIMENT__CONDITION_GROUPS_ORDER__SINGLE_PROTEIN ] = this._value.experiment_ConditionGroups_Order__EncodedStateData
		}

		if ( Object.keys( dataForEncoding ).length === 0 ) {

			// NO properties on object to return so return undefined

			return undefined;  //  EARLY RETURN
		}

		dataForEncoding[ _ENCODED_DATA_VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODED_DATA_VERSION_NUMBER_CURRENT_VERSION;

		return dataForEncoding;
	}
}
