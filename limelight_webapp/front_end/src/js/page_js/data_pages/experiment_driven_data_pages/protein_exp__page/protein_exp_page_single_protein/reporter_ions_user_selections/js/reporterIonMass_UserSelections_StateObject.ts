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

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";


///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ANY__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'b';  //  Existing mapped to ANY
const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__ALL__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED__NOT__OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'd';


///////

/**
 * 
 */
export class ReporterIonMass_UserSelections_StateObject {

	private _initializeCalled = false;

	/**
	 *   Map of Selected Reporter Ion Masses Map<reporer ion mass, SingleProtein_Filter_PerUniqueIdentifier_Entry>
	 */
	private _reporterIonsSelected: Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry> = new Map();  // call .clear() to reset the selected

	/**
	 *
	 */
	constructor() {

	}

	/**
	 *
	 */
	clear_selectedReporterIons(): void {

		this._reporterIonsSelected.clear(); // Reset to None
	}

	//////////////////////////////////

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
		this._reporterIonsSelected.set(mass, entry);
	}

	/**
	 *
	 */
	delete_ReporterIons_Selected(mass: number): void {
		this._reporterIonsSelected.delete(mass);
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
