/**
 * reporterIonMass_UserSelections_StateObject.ts
 * 
 * Reporter Ion Selection - State Object
 * 
 *  !!!! React Version !!!!
 * 
 * 
 * State Object used in: 
 *      proteinSequenceWidget_BuildDisplayObject.ts
 *      proteinSequenceWidgetDisplay_Component_React.tsx
 */

////////////////////

import {variable_is_type_number_Check} from 'page_js/variable_is_type_number_Check';
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {
	ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback,
	ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params,
	ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM,
	ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";


///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ANY__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'b';  //  Existing mapped to ANY
const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ALL__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__NOT__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'd';

/**
 * 
 */
export class ReporterIonMass_UserSelections_StateObject {

	private _initializeCalled = false;

	/**
	 *   Map of Selected Reporter Ion Masses Map<reporer ion mass, SingleProtein_Filter_PerUniqueIdentifier_Entry>
	 */
	private _reporterIonsSelected: Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry> = new Map();  // call .clear() to reset the selected

	//////

	//  Maps of callbacks to External for changes to Page State of this and sub parts

	private _selection__Added__Pre_Set_Callbacks :
		Map<ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback,ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback> =
		new Map();

	private _selection__Updated_Callbacks :
		Map<ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback,ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback> =
		new Map();


	//  Callbacks from this object on change

	private _selection__Added__Pre_Set_Callback( params : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params) : void {

		for ( const entry of this._selection__Added__Pre_Set_Callbacks.entries() )  {
			const callbackFunction = entry[ 1 ]
			callbackFunction(params);
		}
	}
	private _selection__Updated_Callback() : void {

		for ( const entry of this._selection__Updated_Callbacks.entries() )  {
			const callbackFunction = entry[ 1 ]
			callbackFunction();
		}
	}

	/**
	 *
	 */
	constructor() {

	}

	/**
	 * callback
	 * @param callback
	 */
	add__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback) {
		this._selection__Added__Pre_Set_Callbacks.set( callback, callback );
	}
	/**  MUST pass same function reference as was passed to add__...
	 */
	remove__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Set_Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback) {
		this._selection__Added__Pre_Set_Callbacks.delete( callback );
	}
	/**
	 * callback
	 * @param callback
	 */
	add__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback) {
		this._selection__Updated_Callbacks.set( callback, callback );
	}
	/**  MUST pass same function reference as was passed to add__...
	 */
	remove__ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback) {
		this._selection__Updated_Callbacks.delete( callback );
	}

	/**
	 *
	 */
	clear_selectedReporterIons(): void {

		this._reporterIonsSelected.clear(); // Reset to None

		this._selection__Updated_Callback();
	}

	//////////////////////////////////

	/**
	 * Return number of selections of type ANY or ALL
	 */
	get_NumberOf_ANY_ALL_Selections() : number {

		let count = 0;

		if ( this._reporterIonsSelected.size !== 0 ) {
			for ( const mapEntry of this._reporterIonsSelected.entries() ) {
				const entryValue = mapEntry[ 1 ]
				if ( entryValue.selectionType === SingleProtein_Filter_SelectionType.ANY
					|| entryValue.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
					count++;
				}
			}
		}
		return count;
	}

	/**
	 *
	 */
	is_Any_ReporterIons_Selected(): boolean {
		return this._reporterIonsSelected.size !== 0;
	}

	/**
	 * Is any selection of type singleProtein_Filter_SelectionType_Requested
	 */
	is_Any_ReporterIons_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested } : { singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType }): boolean {

		let anySelected = false;
		if ( this._reporterIonsSelected.size !== 0 ) {
			for ( const mapEntry of this._reporterIonsSelected.entries() ) {
				const entryValue = mapEntry[ 1 ]
				if ( entryValue.selectionType === singleProtein_Filter_SelectionType_Requested ) {
					anySelected = true
					break;
				}
			}
		}
		return anySelected // any selection of type singleProtein_Filter_SelectionType_Requested
	}

	/**
	 *
	 */
	is_ReporterIon_Selected(mass: number): boolean {
		return this._reporterIonsSelected.has(mass);
	}

	get_ReporterIon_SelectionEntries() : Array<{ mass: number, selectionType: SingleProtein_Filter_PerUniqueIdentifier_Entry  }> {

		const result : Array<{ mass: number, selectionType: SingleProtein_Filter_PerUniqueIdentifier_Entry  }> = []
		for ( const mapEntry of this._reporterIonsSelected.entries() ) {
			result.push({ mass: mapEntry[0], selectionType: mapEntry[1] })
		}
		return result;
	}

	/**
	 * Get Entry for Mass
	 */
	get_ReporterIon_Selected_Entry( mass : number ) : SingleProtein_Filter_PerUniqueIdentifier_Entry {
		return this._reporterIonsSelected.get( mass );
	}

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses
	 */
	get_ReporterIonssSelected_MassesOnly_AsSet(): Set<number> {
		const selectionCopy = new Set(this._reporterIonsSelected.keys());

		return selectionCopy;
	}

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses for Selection Type ANY
	 */
	get_ReporterIonssSelected_MassesOnly__SelectionType__ANY__AsSet(): Set<number> {
		const selectionCopy = new Set<number>();
		for ( const entry of this._reporterIonsSelected.entries() ) {
			const selectionEntry = entry[1]
			if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
				const selectionMass = entry[ 0 ]
				selectionCopy.add( selectionMass )
			}
		}
		return selectionCopy;
	}

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses for Selection Type ALL
	 */
	get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet(): Set<number> {
		const selectionCopy = new Set<number>();
		for ( const entry of this._reporterIonsSelected.entries() ) {
			const selectionEntry = entry[1]
			if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
				const selectionMass = entry[ 0 ]
				selectionCopy.add( selectionMass )
			}
		}
		return selectionCopy;
	}

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses for Selection Type NOT
	 */
	get_ReporterIonssSelected_MassesOnly__SelectionType__NOT__AsSet(): Set<number> {
		const selectionCopy = new Set<number>();
		for ( const entry of this._reporterIonsSelected.entries() ) {
			const selectionEntry = entry[1]
			if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
				const selectionMass = entry[ 0 ]
				selectionCopy.add( selectionMass )
			}
		}
		return selectionCopy;
	}

	/**
	 *
	 */
	set_ReporterIons_Selected(mass: number, entry: SingleProtein_Filter_PerUniqueIdentifier_Entry): void {
		if (!entry) {
			const msg = "set_ReporterIons_Selected(...): No value for entry"
			console.warn(msg)
			throw Error(msg)
		}
		if (!entry.selectionType) {
			const msg = "set_ReporterIons_Selected(...): No value for entry.selectionType"
			console.warn(msg)
			throw Error(msg)
		}

		let oldEntry_selectionType: SingleProtein_Filter_SelectionType = null;
		{
			const oldEntry = this._reporterIonsSelected.get(mass);
			if (oldEntry) {
				oldEntry_selectionType = oldEntry.selectionType;
			}
		}

		//  Update callback
		this._selection__Added__Pre_Set_Callback({
			oldValue_singleProtein_Filter_SelectionType: oldEntry_selectionType,
			newValue_singleProtein_Filter_SelectionType: entry.selectionType,
			pre_post_Set: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM.PRE_SET
		});

		//  Actual UPDATE
		this._reporterIonsSelected.set(mass, entry);

		//  Update callback
		this._selection__Added__Pre_Set_Callback({
			oldValue_singleProtein_Filter_SelectionType: oldEntry_selectionType,
			newValue_singleProtein_Filter_SelectionType: entry.selectionType,
			pre_post_Set: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM.POST_SET
		});

		//  Update callback
		this._selection__Updated_Callback();
	}

	/**
	 *
	 * @param entry -
	 */
	forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(forceUpdate_To_SelectionType : SingleProtein_Filter_SelectionType) {

		const reporterIonsSelected_MapKeys = new Set( this._reporterIonsSelected.keys() );
		for ( const mapKey of reporterIonsSelected_MapKeys ) {
			const mapValue = this._reporterIonsSelected.get( mapKey );
			if ( ! mapValue ) {
				throw Error("forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter: ( ! mapValue )")
			}
			const mapEntry_SelectionType = mapValue.selectionType;
			if ( mapEntry_SelectionType === SingleProtein_Filter_SelectionType.ANY || mapEntry_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {

				const newMapEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({selectionType: forceUpdate_To_SelectionType});
				this._reporterIonsSelected.set( mapKey, newMapEntry);
			}
		}
	}

	/**
	 *
	 */
	delete_ReporterIons_Selected(mass: number): void {
		this._reporterIonsSelected.delete(mass);

		this._selection__Updated_Callback();
	}

	//////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 *
	 * Currently returns a String for most compact storage of state
	 *
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData(): any {

		const result = {}
		// @ts-ignore
		result[_ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this._reporterIonsSelected && this._reporterIonsSelected.size !== 0) {

			const {reporterIonsSelected_ANY, reporterIonsSelected_ALL, reporterIonsSelected_NOT} = this._getEncoded_SplitAnyAllNot();

			// @ts-ignore
			result[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ANY__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME] = this._getEncoded_SetToArrayAndSort(reporterIonsSelected_ANY);
			// @ts-ignore
			result[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ALL__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME] = this._getEncoded_SetToArrayAndSort(reporterIonsSelected_ALL);
			// @ts-ignore
			result[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__NOT__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME] = this._getEncoded_SetToArrayAndSort(reporterIonsSelected_NOT);
		}

		return result;
	}


	/**
	 *
	 */
	private _getEncoded_SetToArrayAndSort(dataAsSet: Set<number>): Array<number> {

		const reporterIons_Array = Array.from(dataAsSet);

		//  Sort and Store values to output object

		reporterIons_Array.sort(function (a, b) {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});

		return reporterIons_Array
	}

	/**
	 *
	 */
	private _getEncoded_SplitAnyAllNot(): {
		reporterIonsSelected_ANY: Set<number>
		reporterIonsSelected_ALL: Set<number>
		reporterIonsSelected_NOT: Set<number>
	} {
		const reporterIonsSelected_ANY: Set<number> = new Set<number>();
		const reporterIonsSelected_ALL: Set<number> = new Set<number>();
		const reporterIonsSelected_NOT: Set<number> = new Set<number>();

		for (const mapEntry of this._reporterIonsSelected.entries()) {
			const modMass = mapEntry[0];
			const mapValue = mapEntry[1]
			if (mapValue.selectionType === SingleProtein_Filter_SelectionType.ANY) {
				reporterIonsSelected_ANY.add(modMass)
			} else if (mapValue.selectionType === SingleProtein_Filter_SelectionType.ALL) {
				reporterIonsSelected_ALL.add(modMass)
			} else if (mapValue.selectionType === SingleProtein_Filter_SelectionType.NOT) {
				reporterIonsSelected_NOT.add(modMass)
			} else {
				const msg = "mapValue.selectionType is unknown type.  mapValue.selectionType: " + mapValue.selectionType
				console.warn(msg)
				throw Error(msg)
			}
		}

		return {reporterIonsSelected_ANY, reporterIonsSelected_ALL, reporterIonsSelected_NOT}
	}

	/**
	 * Update the state of this object with the value from the URL
	 *
	 */
	set_encodedStateData({encodedStateData}: {encodedStateData: any}): void {

		if (!(encodedStateData)) {
			const msg = "set_encodedStateData(...): No value in encodedStateData";
			console.warn(msg);
			throw Error(msg);
		}

		const version = encodedStateData[_ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME];

		if (version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION) {
			const msg = "set_encodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.warn(msg);
			throw Error(msg);
		}

		this._reporterIonsSelected.clear()

		{ // ANY
			const reporterIons_Array = encodedStateData[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ANY__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME];
			this._set_encodedStateData_Internal({ reporterIons_Array, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.ANY })
		}
		{ // ALL
			const reporterIons_Array = encodedStateData[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ALL__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME];
			this._set_encodedStateData_Internal({ reporterIons_Array, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.ALL })
		}
		{ // NOT
			const reporterIons_Array = encodedStateData[_ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__NOT__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME];
			this._set_encodedStateData_Internal({ reporterIons_Array, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.NOT })
		}
	}

	/**
	 *
	 */
	private _set_encodedStateData_Internal({reporterIons_Array, singleProtein_Filter_SelectionType}: {
		reporterIons_Array: any
		singleProtein_Filter_SelectionType: SingleProtein_Filter_SelectionType
	}): void {

		const newSet_selectedReporterIonMasses: Set<number> = new Set();
		{
			if (reporterIons_Array && reporterIons_Array.length !== 0) {

				for (const reporterIon of reporterIons_Array) {
					if (!variable_is_type_number_Check(reporterIon)) {
						const msg = "value in reporterIons_Array is not a number: " + reporterIon;
						console.warn(msg);
						throw Error(msg);
					}
					newSet_selectedReporterIonMasses.add(reporterIon);
				}
			}
		}


		for ( const mass of newSet_selectedReporterIonMasses ) {

			const entry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({selectionType: singleProtein_Filter_SelectionType});

			this._reporterIonsSelected.set( mass, entry )
		}
	}

}
