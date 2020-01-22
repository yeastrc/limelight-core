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


///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 * 
 */
export class ReporterIonMass_UserSelections_StateObject {

	private _initializeCalled = false;

	//  Set of Selected Reporter Ion Masses
	private _reporterIonsSelected : Set<number> = new Set();  // call .clear() to reset the selected

	/**
	 * 
	 */
	constructor() {

    }

	/**
     * 
	 */
    clear_selectedReporterIons() : void {

        this._reporterIonsSelected.clear(); // Reset to None
    }

    //////////////////////////////////

	/**
	 * 
	 */
    is_Any_ReporterIons_Selected() : boolean {
        return this._reporterIonsSelected.size !== 0;
    }

	/**
	 * 
	 */
    is_ReporterIon_Selected( mass : number ) : boolean {
        return this._reporterIonsSelected.has( mass );
    }

	/**
	 * @returns a Set of the currently selected Reporter Ion Masses
	 */
    get_ReporterIonssSelected() : Set<number> {
        const selectionCopy = new Set( this._reporterIonsSelected );
        
        return selectionCopy;
    }

	/**
	 * 
	 */
    add_ReporterIons_Selected( mass : number ) : void {
        this._reporterIonsSelected.add( mass );
    }

	/**
	 * 
	 */
    delete_ReporterIons_Selected( mass : number ) : void {
        this._reporterIonsSelected.delete( mass );
    }

    //////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() : any {

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this._reporterIonsSelected && this._reporterIonsSelected.size !== 0) {

            const reporterIons_Array = Array.from( this._reporterIonsSelected );

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

            result[ _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] = reporterIons_Array;
		}

		return result;
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	set_encodedStateData({ encodedStateData }) : void {

		if ( ! ( encodedStateData ) ) {
			const msg = "set_encodedStateData(...): No value in encodedStateData";
			console.warn( msg );
			throw Error( msg );
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "set_encodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.warn( msg );
			throw Error( msg );
		}

		const newSet_selectedReporterIonMasses : Set<number> = new Set();
        {
            const reporterIons_Array = encodedStateData[ _ENCODED_DATA__REPORTER_IONS_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( reporterIons_Array && reporterIons_Array.length !== 0 ) {

                for ( const reporterIon of reporterIons_Array ) {
					if ( ! variable_is_type_number_Check( reporterIon ) ) {
						const msg = "value in reporterIons_Array is not a number: " + reporterIon;
						console.warn( msg );
						throw Error( msg );
					}
                    newSet_selectedReporterIonMasses.add( reporterIon );
                }
            }
        }

        this._reporterIonsSelected = newSet_selectedReporterIonMasses;
	}
}

