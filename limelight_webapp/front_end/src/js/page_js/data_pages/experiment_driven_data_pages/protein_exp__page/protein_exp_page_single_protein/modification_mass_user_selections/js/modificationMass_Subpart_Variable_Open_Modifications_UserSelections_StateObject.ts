/**
 * modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.ts
 * 
 * Modification Selection - Sub Part for Variable Or Open Modifications - State Object
 * 
 *  !!!! React Version !!!!
 * 
 * 
 * State Object used in: 
 *      modificationMass_UserSelections_BuildData_ForReactComponent.ts
 *      modificationMass_UserSelections_Root.tsx
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";


////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:  

//  Selected Modification Masses are separated into Integer and non-Integer values
//    The Integer values are sorted ascending first and encoded in the following string
// '<first mod mass, base 35 encoded number>Z<Offset from first mod mass, base 35 encoded number>Z<Offset from second mod mass, base 35 encoded number>'
//  The non-Integer mod masses are sorted and stored in an Array

//  Selected Static Modification Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

//  Next 2 kept same as from original in   to keep backwards compatibility.  Existing remapped to 'ANY'
const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'c';

const _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED__OLD_ENTRY__ARRAY_ENCODING_PROPERTY_NAME = 'd'; // AKA Unmodified - OLD ENTRY

const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'e';
const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'f';

const _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ANY__ENCODING_PROPERTY_NAME = 'g'; // AKA Unmodified - CURRENT ENTRY
const _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ALL__ENCODING_PROPERTY_NAME = 'h'; // AKA Unmodified - CURRENT ENTRY

//  Add NOT (Select NOT containing)

const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'i';
const _ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'j';
const _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__NOT__ENCODING_PROPERTY_NAME = 'k';



const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_BASE = 35;         // Only specific Modifications
const _ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR = 'Z';   // Only specific Modifications


//  Kept for Backwards compatibility
const _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED = "U"; // A value that a mod mass can never be

///////

/**
 * 
 */
export class ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject {

    private _initializeCalled : boolean = false;

    /**
     *   Map of Selected Modification Masses Map<modification mass, SingleProtein_Filter_PerUniqueIdentifier_Entry>
     */
    private _modificationsSelected : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry> = new Map();  // call .clear() to reset the selected

    /**
     * "unmodified" selected
     */
    private _UN_Modified_Selected : SingleProtein_Filter_PerUniqueIdentifier_Entry = undefined;

	/**
	 * 
	 */
	constructor() {

    }

	/**
     * 
	 */
    clear_selectedModifications() : void {

        this._modificationsSelected.clear(); // Reset to None
        this._UN_Modified_Selected = undefined;
    }

    /**
     *
     */
    clear_selectedModifications_ExceptUnmodified() : void {

        this._modificationsSelected.clear(); // Reset to None
    }

	/**
	 * Includes check for Unmodified selected
	 */
    is_Any_Modification_Selected() : boolean {

        let anySelected = false;
        if ( this._UN_Modified_Selected ) {
            anySelected = true
        } else if ( this._modificationsSelected.size !== 0 ) {
            anySelected = true
        }
        return anySelected
    }

    /**
     * Is any selection of type singleProtein_Filter_SelectionType_Requested
     * Excludes check for Unmodified selected
     */
    is_Any__For_SelectionType__Modification_Selected_Excludes_UnmodifiedSelection({ singleProtein_Filter_SelectionType_Requested } : { singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType }) : boolean {

        let anySelected = false;
        if ( this._modificationsSelected.size !== 0 ) {
            for ( const mapEntry of this._modificationsSelected.entries() ) {
                const entryValue = mapEntry[ 1 ]
                if ( entryValue.selectionType === singleProtein_Filter_SelectionType_Requested ) {
                    anySelected = true
                    break;
                }
            }
        }
        return anySelected // any selection of type SelectionType.ANY
    }

	/**
	 * Did the user select to show reported peptides with no modification masses
	 */
    is_NO_Modification_AKA_Unmodified_Selected() : boolean {
        let result = false;
        if ( this._UN_Modified_Selected ) {
            result = true
        }
        return result;
    }

    /**
     * Get Entry for Unmodified
     */
    get_NO_Modification_AKA_Unmodified_Selected() : SingleProtein_Filter_PerUniqueIdentifier_Entry {
        return this._UN_Modified_Selected;
    }

	/**
	 * Generic "Is Any Selection Type", which may include "NONE" in the future
	 */
    is_Modification_Selected( modMass : number ) : boolean {
        return this._modificationsSelected.has( modMass );
    }

    /**
     * Get Entry for Mod Mass
     */
    get_Modification_Selected_Entry( modMass : number ) : SingleProtein_Filter_PerUniqueIdentifier_Entry {
        return this._modificationsSelected.get( modMass );
    }

    /**
     * @returns a Set of the currently selected Modification Masses for "ANY" and "ALL" and "NOT" combined, excluding the "No Modification" selection option
     */
    get_ModificationsSelected__OnlyModMasses_AsSet() : Set<number> {

        const selectionCopy : Set<number> = new Set( this._modificationsSelected.keys() );

        return selectionCopy;
    }

    /**
     * @returns a Set of the currently selected Modification Masses for "ANY" selection type, excluding the "No Modification" selection option
     */
    get_ModificationsSelected__OnlyModMasses_Only__ANY_SelectionType_AsSet() : Set<number> {

        const selectionCopy : Set<number> = new Set();

        for ( const entry of this._modificationsSelected ) {
            const value = entry[ 1 ]
            if ( value.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                const mass = entry[ 0 ]
                selectionCopy.add( mass )
            }
        }

        return selectionCopy;
    }

    /**
     * @returns a Set of the currently selected Modification Masses for "ALL" selection type, excluding the "No Modification" selection option
     */
    get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet() : Set<number> {

        const selectionCopy : Set<number> = new Set();

        for ( const entry of this._modificationsSelected ) {
            const value = entry[ 1 ]
            if ( value.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                const mass = entry[ 0 ]
                selectionCopy.add( mass )
            }
        }

        return selectionCopy;
    }

    /**
     * @returns a Set of the currently selected Modification Masses for "NOT" selection type, excluding the "No Modification" selection option
     */
    get_ModificationsSelected__OnlyModMasses_Only__NOT_SelectionType_AsSet() : Set<number> {

        const selectionCopy : Set<number> = new Set();

        for ( const entry of this._modificationsSelected ) {
            const value = entry[ 1 ]
            if ( value.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                const mass = entry[ 0 ]
                selectionCopy.add( mass )
            }
        }

        return selectionCopy;
    }

    /**
     * @returns a Map clone of the currently selected Modification Masses for "ANY" and "ALL" and "NOT" combined, excluding the "No Modification" selection option
     */
    get_ModificationsSelected__ExcludingNoModification_AsMapClone() : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry> {

        const modificationsSelected_Copy : Map<number, SingleProtein_Filter_PerUniqueIdentifier_Entry> = new Map()
        for ( const entry of this._modificationsSelected.entries() ) {
            const entryKey = entry[ 0 ]
            const entryValue = entry[ 1 ]
            modificationsSelected_Copy.set( entryKey, entryValue )
        }

        return modificationsSelected_Copy;
    }

	/**
	 * 
	 */
    set_Modification_Selected(modMass : number, entry : SingleProtein_Filter_PerUniqueIdentifier_Entry ) : void {
        if ( ! entry ) {
            const msg = "set_Modification_Selected(...): No value for entry"
            console.warn( msg )
            throw Error( msg )
        }
        if ( ! entry.selectionType ) {
            const msg = "set_Modification_Selected(...): No value for entry.selectionType"
            console.warn( msg )
            throw Error( msg )
        }
        this._modificationsSelected.set(modMass, entry);
    }

	/**
	 * 
	 */
    delete_Modification_Selected( modMass : number ) : void {
        this._modificationsSelected.delete( modMass );
    }

	/**
	 * Set the user select to show reported peptides with no modification masses
	 */
    set_NO_Modification_AKA_Unmodified_Selected( value : SingleProtein_Filter_PerUniqueIdentifier_Entry ) : void {
        if ( ! value ) {
            const msg = "set_NO_Modification_AKA_Unmodified_Selected(...): No value for value"
            console.warn( msg )
            throw Error( msg )
        }
        if ( ! value.selectionType ) {
            const msg = "set_NO_Modification_AKA_Unmodified_Selected(...): No value for value.selectionType"
            console.warn( msg )
            throw Error( msg )
        }
        this._UN_Modified_Selected = value;
    }

	/**
	 * Remove the user select to show reported peptides with no modification masses
	 */
    remove_NO_Modification_AKA_Unmodified_Selected() : void {
        this._UN_Modified_Selected = undefined;
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

		const result = {}
		// @ts-ignore
        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		if ( this._UN_Modified_Selected ) {
            if ( this._UN_Modified_Selected.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                // @ts-ignore
                result[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ANY__ENCODING_PROPERTY_NAME ] = true;
            } else if ( this._UN_Modified_Selected.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                // @ts-ignore
                result[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ALL__ENCODING_PROPERTY_NAME ] = true;
            } else if ( this._UN_Modified_Selected.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                // @ts-ignore
                result[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__NOT__ENCODING_PROPERTY_NAME ] = true;
            } else {
                const msg = "getEncodedStateData: Unknown Value for this._UN_Modified_Selected.selectionType: " + this._UN_Modified_Selected.selectionType
                console.warn( msg )
                throw Error( msg )
            }
        }
        {
            const { modificationsSelected_ANY, modificationsSelected_ALL, modificationsSelected_NOT } = this._getEncoded_SplitAnyAllNot();

            {  //  ANY
                const {modificationsDelimited, modificationsNonInteger} = this._getEncoded_AnyAll({modificationsSelected_ANY_ALL : modificationsSelected_ANY})

                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME] = modificationsDelimited;
                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME] = modificationsNonInteger;
            }
            {  //  ALL
                const {modificationsDelimited, modificationsNonInteger} = this._getEncoded_AnyAll({modificationsSelected_ANY_ALL : modificationsSelected_ALL})

                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME] = modificationsDelimited;
                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME] = modificationsNonInteger;
            }
            {  //  NOT
                const {modificationsDelimited, modificationsNonInteger} = this._getEncoded_AnyAll({modificationsSelected_ANY_ALL : modificationsSelected_NOT})

                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME] = modificationsDelimited;
                // @ts-ignore
                result[_ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME] = modificationsNonInteger;
            }
        }

		return result;
	}

    /**
     *
     */
    private _getEncoded_SplitAnyAllNot() : {
        modificationsSelected_ANY : Set<number>
        modificationsSelected_ALL : Set<number>
        modificationsSelected_NOT : Set<number>
    } {
        const modificationsSelected_ANY : Set<number> = new Set<number>();
        const modificationsSelected_ALL : Set<number> = new Set<number>();
        const modificationsSelected_NOT : Set<number> = new Set<number>();

        for ( const mapEntry of this._modificationsSelected.entries() ) {
            const modMass = mapEntry[ 0 ];
            const mapValue = mapEntry[ 1 ]
            if ( mapValue.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                modificationsSelected_ANY.add( modMass )
            } else if ( mapValue.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                modificationsSelected_ALL.add( modMass )
            } else if ( mapValue.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                modificationsSelected_NOT.add( modMass )
            } else {
                const msg = "mapValue.selectionType is unknown type.  mapValue.selectionType: " + mapValue.selectionType
                console.warn( msg )
                throw Error( msg )
            }
        }

        return { modificationsSelected_ANY, modificationsSelected_ALL, modificationsSelected_NOT }
    }

    /**
     *
     */
	private _getEncoded_AnyAll({ modificationsSelected_ANY_ALL } : { modificationsSelected_ANY_ALL : Set<number> }) : {
        modificationsDelimited : string
        modificationsNonInteger : Array<number>
    } {

	    let modificationsDelimited : string = undefined
        let modificationsNonInteger : Array<number> = []

        if (modificationsSelected_ANY_ALL && modificationsSelected_ANY_ALL.size !== 0) {

            //  Split selected modifications into Integer and non-integer
            const modificationsInteger : Array<number> = [];

            for ( const modificationSelected of modificationsSelected_ANY_ALL ) {

                if ( ! variable_is_type_number_Check( modificationSelected ) ) {
                    const msg = "entry in this._modificationsSelected is not is not number: " + modificationSelected;
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

                    modificationsDelimited = modificationsIntegerAsOffsetAndAltBase.join(_ENCODING_DATA__MOD_MASS_SELECTED_INTEGERS_SEPARATOR);
                }
            }

            {  //  Sort and Store Non Integer values to output object

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

                }
            }
        }

        if ( modificationsNonInteger && modificationsNonInteger.length === 0 ) {
            modificationsNonInteger = undefined
        }

        return { modificationsDelimited, modificationsNonInteger }
    }
	/**
	 * Update the state of this object with the value from the URL
	 * 
	 */
	set_encodedStateData({ encodedStateData }: { encodedStateData: any }) {

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

        this._modificationsSelected.clear()

        {  //  ANY
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ANY__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            this._set_encodedStateData_Internal({ modificationsAsOffsetAndAltBaseString, modificationsNonInteger, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.ANY })
        }
        {  //  ALL
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__ALL__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            this._set_encodedStateData_Internal({ modificationsAsOffsetAndAltBaseString, modificationsNonInteger, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.ALL })
        }
        {  //  NOT
            const modificationsAsOffsetAndAltBaseString = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];
            const modificationsNonInteger = encodedStateData[ _ENCODED_DATA__MODIFICATION_MASS_SELECTED__NOT__NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

            this._set_encodedStateData_Internal({ modificationsAsOffsetAndAltBaseString, modificationsNonInteger, singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType.NOT })
        }


        {
            if ( encodedStateData[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED__OLD_ENTRY__ARRAY_ENCODING_PROPERTY_NAME ] ) {
                this._UN_Modified_Selected = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ANY });
            }
            if ( encodedStateData[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ANY__ENCODING_PROPERTY_NAME ] ) {
                this._UN_Modified_Selected = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ANY });
            }
            if ( encodedStateData[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__ALL__ENCODING_PROPERTY_NAME ] ) {
                this._UN_Modified_Selected = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ALL });
            }
            if ( encodedStateData[ _ENCODED_DATA__NO_MODIFICATION_MASS_SELECTED_ENTRY__NOT__ENCODING_PROPERTY_NAME ] ) {
                this._UN_Modified_Selected = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.NOT });
            }
        }
	}

    /**
     *
     */
	private _set_encodedStateData_Internal({ modificationsAsOffsetAndAltBaseString, modificationsNonInteger, singleProtein_Filter_SelectionType } : {
	    modificationsAsOffsetAndAltBaseString : any
        modificationsNonInteger : any
        singleProtein_Filter_SelectionType : SingleProtein_Filter_SelectionType
	}) : void {

        const newSet_selectedModificationMasses : Set<number> = new Set();

        { //  Get Integer modifications and decode

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

            if ( modificationsNonInteger && modificationsNonInteger.length > 0 ) {

                for ( const modificationNonInteger of modificationsNonInteger ) {

                    if ( modificationNonInteger === _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED ) {

                        //  Special Case for Backwards compatibility

                        this._UN_Modified_Selected = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ANY });

                    } else {
                        //  Validate that array element is number

                        if ( ! variable_is_type_number_Check( modificationNonInteger ) ) {
                            const msg = "modificationNonInteger is not number (see 'for ( const modificationNonInteger of modificationsNonInteger ) {'): " + modificationNonInteger;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        newSet_selectedModificationMasses.add( modificationNonInteger );
                    }
                }
            }
        }

        for ( const modMass of newSet_selectedModificationMasses ) {

            const entry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({selectionType: singleProtein_Filter_SelectionType});

            this._modificationsSelected.set( modMass, entry )
        }

    }

}

