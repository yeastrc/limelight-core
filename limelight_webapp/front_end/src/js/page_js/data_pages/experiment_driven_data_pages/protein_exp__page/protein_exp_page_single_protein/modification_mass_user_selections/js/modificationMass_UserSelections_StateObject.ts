/**
 * modificationMass_UserSelections_StateObject.ts
 * 
 * Modification Selection - State Object
 * 
 *  !!!! React Version !!!!
 * 
 * 
 * State Object used in: 
 *      modificationMass_UserSelections_BuildData_ForReactComponent.ts
 *      modificationMass_UserSelections_Root.tsx
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED } from '../jsx/modificationMass_UserSelections_Constants';



////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Variable Modification Masses are separated into Integer and non-Integer values
//    The Integer values are sorted ascending first and encoded in the following string
// '<first mod mass, base 35 encoded number>Z<Offset from first mod mass, base 35 encoded number>Z<Offset from second mod mass, base 35 encoded number>'
//  The non-Integer mod masses are sorted and stored in an Array

//  Selected Static Modification Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'c';
const _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'd';

const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE = 35;         // Only specific Variable Modifications
const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR = 'Z';   // Only specific Variable Modifications

///////

/**
 * 
 */
export class ModificationMass_UserSelections_StateObject {

    private _initializeCalled : boolean = false;

    //  Set of Selected Variable Modification Masses
    private _variableModificationsSelected : Set<number | string> = new Set();  // call .clear() to reset the selected

    //  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
    private _staticModificationsSelected : Map<string, Set<number>> = new Map();  // call .clear() to reset the selected

	/**
	 * 
	 */
	constructor() {

    }

	/**
     * 
	 */
    clear_selectedModifications() : void {

        this._variableModificationsSelected.clear(); // Reset to None
        this._staticModificationsSelected.clear(); // Reset to None
    }

	/**
     * 
	 */
    clear_selectedVariableModifications() : void {

        this._variableModificationsSelected.clear(); // Reset to None
    }

    //////////////////////////////////

    //   Variable Mods External

	/**
	 * Includes check for Unmodified selected
	 */
    is_Any_VariableModification_Selected() : boolean {
        return this._variableModificationsSelected.size !== 0;
    }

	/**
	 * Did the user select to show reported peptides with no modification masses
	 */
    is_NO_VariableModification_AKA_Unmodified_Selected() : boolean {
        return this._variableModificationsSelected.has( _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED );
    }

	/**
	 * 
	 */
    is_VariableModification_Selected( modMass : number ) : boolean {
        return this._variableModificationsSelected.has( modMass );
    }

	/**
	 * @returns a Set of the currently selected Variable Modifications, excluding the "No Modification" selection option
	 */
    get_VariableModificationsSelected_ExcludingNoModificationOption() : Set<number> {
        
        const selectionCopy : Set<number> = new Set();

        if ( this._variableModificationsSelected.size !== 0 ) {
            for ( const entry of this._variableModificationsSelected ) {
                if ( entry !== _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED ) {
                    if ( ! variable_is_type_number_Check( entry ) ) {
                        const msg = "entry in this._variableModificationsSelected is not _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED and is not number: " + entry;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const entry_Number : number = entry as number;

                    selectionCopy.add( entry_Number );
                }
            }
        }
        
        return selectionCopy;
    }

	/**
	 * 
	 */
    add_VariableModification_Selected( modMass : number ) : void {
        this._variableModificationsSelected.add( modMass );
    }

	/**
	 * 
	 */
    delete_VariableModification_Selected( modMass : number ) : void {
        this._variableModificationsSelected.delete( modMass );
    }

	/**
	 * Set the user select to show reported peptides with no modification masses
	 */
    set_NO_VariableModification_AKA_Unmodified_Selected() : void {
        this._variableModificationsSelected.add( _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED );
    }

	/**
	 * Remove the user select to show reported peptides with no modification masses
	 */
    remove_NO_VariableModification_AKA_Unmodified_Selected() : void {
        this._variableModificationsSelected.delete( _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED );
    }

    ///////////////

    //   Static Mods External

	/**
	 * @returns true if any Static Modifications currently selected
	 */
    is_Any_StaticModification_Selected() : boolean {
        return this._staticModificationsSelected.size !== 0;
    }

	/**
	 * @returns a Map of the currently selected Static Modifications: 
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
	 */
    get_StaticModifications_Selected() : Map<string, Set<number>> {
        return this._staticModificationsSelected;
    }

	/**
	 * 
	 */
    add_StaticModification_Selected({ residueLetter, modMass } : { residueLetter : string, modMass : number }) : void {
        let entryFor_ResidueLetter = this._staticModificationsSelected.get( residueLetter );
        if ( ! entryFor_ResidueLetter ) {
            entryFor_ResidueLetter = new Set();
            this._staticModificationsSelected.set( residueLetter, entryFor_ResidueLetter )
        }
        entryFor_ResidueLetter.add( modMass );
    }

	/**
	 * 
	 */
    delete_StaticModification_Selected({ residueLetter, modMass }) {
        let entryFor_ResidueLetter = this._staticModificationsSelected.get( residueLetter );
        if ( ! entryFor_ResidueLetter ) {
            return; // EARLY EXIT
        }
        entryFor_ResidueLetter.delete( modMass );
        if ( entryFor_ResidueLetter.size === 0 ) {
            this._staticModificationsSelected.delete( residueLetter );
        }
    }


    //////////////////////////////////////

	/**
	 * Get the state of this object to store on the URL
	 * 
	 * Currently returns a String for most compact storage of state
	 * 
	 * Must return types that can be converted to JSON with JSON.stringify
	 */
	getEncodedStateData() {

        //  This has to deal with the value for _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED (which is currently "U") in the array this._variableModificationsSelected
        //        (which ends up in the array modificationsNonInteger)
        //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

		const result = {}
		result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if (this._variableModificationsSelected && this._variableModificationsSelected.size !== 0) {

            //  Split selected modifications into Integer and non-integer
            const modificationsInteger : Array<number> = [];
            const modificationsNonInteger : Array<number | string> = [];  //  Allow String since _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED is a string

			for ( const modificationSelected of this._variableModificationsSelected ) {

                if ( modificationSelected === _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED ) {
                    //  Special case for _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED since is not numeric / Is a string
                    modificationsNonInteger.push( modificationSelected );

                } else {
                    if ( ! variable_is_type_number_Check( modificationSelected ) ) {
                        const msg = "entry in this._variableModificationsSelected is not _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED and is not number: " + modificationSelected;
                        console.warn( msg );
                        throw Error( msg );
                    }
                    const modificationSelected_Number : number = modificationSelected as number;

                    if ( Number.isSafeInteger( modificationSelected_Number ) ) {
                        modificationsInteger.push( modificationSelected_Number );
                    } else {
                        modificationsNonInteger.push( modificationSelected );
                    }
                }
            }

            {  //  Encode Integer values to string and store to output object

                if ( modificationsInteger && modificationsInteger.length !== 0 ) {
                
                    modificationsInteger.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    });

                    const modificationsIntegerAsOffsetAndAltBase = [];
                    let prevModification = undefined;
                    for (const modification of modificationsInteger) {

                        let modificationValueToSave = modification;
                        if (prevModification !== undefined) {
                            modificationValueToSave = modification - prevModification; // Not first so save offset
                        }
                        prevModification = modification;

                        const modificationValueToSaveAsAltBase = modificationValueToSave.toString(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE);
                        modificationsIntegerAsOffsetAndAltBase.push(modificationValueToSaveAsAltBase);
                    }

                    const modificationsDelimited = modificationsIntegerAsOffsetAndAltBase.join(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR);

                    result[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ] = modificationsDelimited;
                }
            }

            {  //  Sort and Store Non Integer values to output object
                    
                    //  This has to deal with the value for _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED (which is currently "U") in the array modificationsNonInteger
                    //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

                if ( modificationsNonInteger && modificationsNonInteger.length !== 0 ) {

                        modificationsNonInteger.sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    });

                    result[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] = modificationsNonInteger;
                }
            }
		}

        // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
		if ( this._staticModificationsSelected && this._staticModificationsSelected.size !== 0 ) {

            //  Convert to Javascript Object and Arrays for JSON encoding

            const staticModificationsSelectedForEncoding = {};

            for ( const mapEntry of this._staticModificationsSelected.entries() ) {

                const mapKey = mapEntry[ 0 ];
                const mapValue = mapEntry[ 1 ];

                const staticModificationsSelectedArray = Array.from( mapValue );
                staticModificationsSelectedArray.sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });

                staticModificationsSelectedForEncoding[ mapKey ] = staticModificationsSelectedArray;
            }

            result[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] = staticModificationsSelectedForEncoding;

        }

		return result;
	}
	
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	set_encodedStateData({ encodedStateData }) {

		if ( ! ( encodedStateData ) ) {
			const msg = "set_encodedStateData(...): No value in encodedStateData";
			console.log( msg );
			throw Error( msg );
		}

		const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

		if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
			const msg = "set_encodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
			console.log( msg );
			throw Error( msg );
		}

		const newSet_selectedModificationMasses : Set<number | string> = new Set();
        
        { //  Get Integer modifications and decode
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];

            if ( modificationsAsOffsetAndAltBaseString ) {
                //  Have positions (first is position, rest are offsets) so convert to Number and compute positions
                const modificationsAsOffsetAndAltBaseString_Split = modificationsAsOffsetAndAltBaseString.split(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR);

                let prevModificationValue : number = undefined;
                for ( const modificationsAsOffsetAndAltBase of modificationsAsOffsetAndAltBaseString_Split ) {
                    //  modificationAsOffset: all but first are offset
                    const modificationAsOffset : number = Number.parseInt( modificationsAsOffsetAndAltBase, _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE);
                    if ( Number.isNaN(modificationAsOffset) ) {
                        const msg = "set_encodedStateData(...): modificationsOffset failed to parse: " + modificationsAsOffsetAndAltBase;
                        console.log( msg );
                        throw Error( msg );
                    }
                    let modification : number = undefined;
                    if ( prevModificationValue === undefined ) {
                        //  First modification so not offset
                        modification = modificationAsOffset;
                    } else {
                        modification = modificationAsOffset + prevModificationValue;
                    }
                    newSet_selectedModificationMasses.add( modification );
                    prevModificationValue = modification;
                }
            }
        }
        { //  Get Non Integer modifications and add to set
            
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( modificationsNonInteger && modificationsNonInteger.length !== 0 ) {

                for ( const modificationNonInteger of modificationsNonInteger ) {

                    //  Validate that array element is number or _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED
                    if ( modificationNonInteger !== _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED ) {
                        if ( ! variable_is_type_number_Check( modificationNonInteger ) ) {
                            const msg = "entry in encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] is not _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED and is not number: " + modificationNonInteger;
                            console.warn( msg );
                            throw Error( msg );
                        }
                    }
    
                    newSet_selectedModificationMasses.add( modificationNonInteger );
                }
            }
        }

        this._variableModificationsSelected = newSet_selectedModificationMasses;


        { //  Static Mods

            // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>

            const staticModificationsSelectedEncoded = encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( staticModificationsSelectedEncoded ) { // local_staticModificationsSelected is Object of Arrays if populated

                const local_staticModificationsSelected : Map<string, Set<number>> = new Map();

                const objectKeys = Object.keys( staticModificationsSelectedEncoded );
                for ( const objectKey of objectKeys ) {
                    const staticModificationsSelectedMassesArray = staticModificationsSelectedEncoded[ objectKey ];
                    const staticModificationsSelectedMassesSet : Set<number> = new Set( staticModificationsSelectedMassesArray );
                    for ( const entry of staticModificationsSelectedMassesSet ) {
                        if ( ! variable_is_type_number_Check( entry ) ) {
                            const msg = "entry in encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] is not number: " + entry + ", objectKey: " + objectKey;
                            console.warn( msg );
                            throw Error( msg );
                        }
                    }
                    local_staticModificationsSelected.set( objectKey, staticModificationsSelectedMassesSet );
                }
                this._staticModificationsSelected = local_staticModificationsSelected;
            }
        }
        
        this._initialVariableModificationsSelectedCleanup();
	}

	/**
	 * Clean up this._variableModificationsSelected due to not allowing unmodified to be selected when anything else is selected.
     * 
     * If any mass selected, the unmodified will be removed.
	 */
	private _initialVariableModificationsSelectedCleanup() : void {

        if ( this._variableModificationsSelected.size > 1 ) {
            //  If the set contains _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED and anything else, remove _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED
            this._variableModificationsSelected.delete( _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED );
        }
    }
}

