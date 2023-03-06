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

import {variable_is_type_number_Check} from 'page_js/variable_is_type_number_Check';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback_Params,
    ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM,
    ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback,
    ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";


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

//  Kept For backwards compatibility
const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME = 'c';

const _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME = 'd';

const _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME = 'e';
const _ENCODED_DATA__OPEN_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME = 'f';
const _ENCODED_DATA__SHOW_OTHER_PEPTIDES__ETC__SELECTION_TYPE__NOT__PROPERTY_NAME = "g"

//  Sub parts of Static Mod Mass Selection
const _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_MASS_PROPERTY_NAME = "a"
const _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE_PROPERTY_NAME = "b"

//  Values in ...SELECTION_TYPE_PROPERTY_NAME
const _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ANY__PROPERTY_NAME = "a"
const _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ALL__PROPERTY_NAME = "b"
const _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__NOT__PROPERTY_NAME = "c"

///////

/**
 * 
 */
export class ModificationMass_UserSelections_StateObject {

    private _initializeCalled : boolean = false;

    //  Selected Variable Modification
    private _variableModificationsSelected : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;

    //  Selected Open Modification
    private _openModificationsSelected : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject;

    //  Map of Selected Static Modification Residue Letter And Mass <String, Map<Number,SingleProtein_Filter_PerUniqueIdentifier_Entry>> <Residue Letter, <Mass, Entry>>
    private _staticModificationsSelected : Map<string, Map<number,SingleProtein_Filter_PerUniqueIdentifier_Entry>> = new Map();  // call .clear() to reset the selected

    private _showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection : boolean = undefined; //  Set to undefined if not selected or false

    //////

    //  Maps of callbacks to External for changes to Page State of this and sub parts

    private _selection__Added__Pre_Set_Callbacks :
        Map<ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback,ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback> =
        new Map();

    private _selection__Updated_Callbacks :
        Map<ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback,ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback> =
        new Map();

    ///  Bind local callback functions that are passed to the sub part objects for Variable and Open Modifications

    //  Callbacks from Modifications State Object on on change
    private _selection__Added__Pre_Set_Callback_BindThis = this._selection__Added__Pre_Set_Callback.bind(this);
    private _selection__Updated_Callback_BindThis = this._selection__Updated_Callback.bind(this);

    private _DO_NOT_CALL() {

        const _selection__Added__Pre_Set_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback = this._selection__Added__Pre_Set_Callback;
        const _selection__Updated_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback = this._selection__Updated_Callback;
    }

    //  Callbacks from this object and sub parts on change

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

        //  Selected Variable Modification
        this._variableModificationsSelected = new ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject({
            selection__Added__Pre_Set_Callback: this._selection__Added__Pre_Set_Callback_BindThis,
            selection__Updated__Callback : this._selection__Updated_Callback_BindThis
        });

        //  Selected Open Modification
        this._openModificationsSelected = new ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject({
            selection__Added__Pre_Set_Callback: this._selection__Added__Pre_Set_Callback_BindThis,
            selection__Updated__Callback : this._selection__Updated_Callback_BindThis
        });

    }

    /**
     * callback
     * @param callback
     */
    add__ModificationMass_UserSelections_StateObject__Selection__Added__Pre_Post_Set_Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback) {
	    this._selection__Added__Pre_Set_Callbacks.set( callback, callback );
    }
    /**  MUST pass same function reference as was passed to add__...
     */
    remove__ModificationMass_UserSelections_StateObject__Selection__Added__Pre_Set_Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_Callback) {
        this._selection__Added__Pre_Set_Callbacks.delete( callback );
    }
    /**
     * callback
     * @param callback
     */
    add__ModificationMass_UserSelections_StateObject__Selection__Updated__Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback) {
        this._selection__Updated_Callbacks.set( callback, callback );
    }
    /**  MUST pass same function reference as was passed to add__...
     */
    remove__ModificationMass_UserSelections_StateObject__Selection__Updated__Callback(callback: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Updated__Callback) {
        this._selection__Updated_Callbacks.delete( callback );
    }

	/**
     * 
	 */
    clear_selectedModifications() : void {

        this._variableModificationsSelected.clear_selectedModifications(); // Reset to None
        this._openModificationsSelected.clear_selectedModifications(); // Reset to None
        this._staticModificationsSelected.clear(); // Reset to None
        this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection = undefined

        this._selection__Updated_Callback();
    }

    /**
     *
     */
    clear_selected_Static_Modifications() : void {

        this._staticModificationsSelected.clear(); // Reset to None

        this._selection__Updated_Callback();
    }

    //   For ALL Mods Selections

    /**
     * Return number of selections of type ANY or ALL
     */
    get_NumberOf_ANY_ALL_Selections() : number {

        let count = 0;

        //  First count static mods
        if ( this._staticModificationsSelected && this._staticModificationsSelected.size !== 0 ) {
            for ( const mapEntry of this._staticModificationsSelected.entries() ) {
                const entryValue = mapEntry[ 1 ]
                for ( const mapEntrySecondary of entryValue.entries() ) {
                    const entryValueSecondary = mapEntrySecondary[1]
                    if (entryValueSecondary.selectionType === SingleProtein_Filter_SelectionType.ANY
                        || entryValueSecondary.selectionType === SingleProtein_Filter_SelectionType.ALL) {
                        count++;
                    }
                }
            }
        }

        count += this._variableModificationsSelected.get_NumberOf_ANY_ALL_Selections();

        count += this._openModificationsSelected.get_NumberOf_ANY_ALL_Selections();

        return count;
    }

    /**
     *
     * @param entry -
     */
    forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(forceUpdate_To_SelectionType : SingleProtein_Filter_SelectionType) {

        //  First process static mods
        if ( this._staticModificationsSelected && this._staticModificationsSelected.size !== 0 ) {
            for ( const mapEntry of this._staticModificationsSelected.entries() ) {

                const mapSecondary = mapEntry[ 1 ]

                const mapSecondary_MapKeys = new Set( mapSecondary.keys() );
                for ( const mapKey of mapSecondary_MapKeys ) {
                    const mapValue = mapSecondary.get( mapKey );
                    if ( ! mapValue ) {
                        throw Error("forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter: ( ! mapValue )")
                    }
                    const mapEntry_SelectionType = mapValue.selectionType;
                    if ( mapEntry_SelectionType === SingleProtein_Filter_SelectionType.ANY || mapEntry_SelectionType === SingleProtein_Filter_SelectionType.ALL ) {

                        const newMapEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({selectionType: forceUpdate_To_SelectionType});
                        mapSecondary.set( mapKey, newMapEntry);
                    }
                }
            }
        }


        this._variableModificationsSelected.forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(forceUpdate_To_SelectionType);

        this._openModificationsSelected.forceUpdate_SetEvery_ANY_ALL_Entries_To_SingleProtein_Filter_SelectionType_Parameter(forceUpdate_To_SelectionType);

    }

    //////////////////////////////////

    /**
     * return true if any modification selected of any type (variable, open, static) of any condition (OR, AND, NOT)
     */
    is_Any_Modification_Selected() : boolean {
        if ( this._variableModificationsSelected ) {
            if ( this._variableModificationsSelected.is_Any_Modification_Selected() ) {
                return true; // EARLY RETURN
            }
        }
        if ( this._openModificationsSelected ) {
            if ( this._openModificationsSelected.is_Any_Modification_Selected() ) {
                return true; // EARLY RETURN
            }
        }
        if ( this.is_Any_StaticModification_Selected() ) {
            return true; // EARLY RETURN
        }

        return  false;
    }

    //   Variable Mods External

    /**
     * Return object for managing Variable Modification (and unmodified) selections
     */
    get_VariableModificationSelections() : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject {
        return this._variableModificationsSelected
    }

    //   Open Mods External

    /**
     * Return object for managing Open Modification (and unmodified) selections
     */
    get_OpenModificationSelections() : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject {
        return this._openModificationsSelected
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
     * @returns true if any Static Modifications currently selected of type singleProtein_Filter_SelectionType_Requested
     */
    is_Any_StaticModification_Selected__For_SelectionType({ singleProtein_Filter_SelectionType_Requested } : { singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType }) : boolean {

        let anySelected = false;
        if ( this._staticModificationsSelected.size !== 0 ) {
            for ( const mapEntry_Key_ResidueLetter of this._staticModificationsSelected.entries() ) {
                const map_Key_ModMass = mapEntry_Key_ResidueLetter[ 1 ]
                for ( const mapEntry_Key_ModMass of map_Key_ModMass.entries() ) {
                    const selectionEntry = mapEntry_Key_ModMass[1]
                    if (selectionEntry.selectionType === singleProtein_Filter_SelectionType_Requested) {
                        anySelected = true
                        break;
                    }
                }
                if ( anySelected ) {
                    break
                }
            }
        }
        return anySelected // any selection of type singleProtein_Filter_SelectionType_Requested
    }

	/**
	 * @returns a Map of the currently selected Static Modifications.  Just Residues and Masses:
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
	 */
    get_StaticModifications_Selected_Residue_Mass_Map_Set() : Map<string, Set<number>> {
        const result : Map<string, Set<number>> = new Map()
        for ( const entryResidueMapEntry of this._staticModificationsSelected.entries() ) {
            const entryResidue = entryResidueMapEntry[ 0 ]
            const entryResidueMapValue = entryResidueMapEntry[ 1 ];
            const resultMassSet = new Set<number>();
            result.set( entryResidue, resultMassSet );
            for ( const massMapEntry of entryResidueMapValue ) {
                const mass = massMapEntry[ 0 ]
                resultMassSet.add( mass )
            }
        }
        return result;
    }

    /**
     * @returns a Map of the currently selected Static Modifications.  Just Residues and Masses:  Only for "ANY" Selection type SingleProtein_Filter_SelectionType.ANY
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
     */
    get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ANY_SelectionType() : Map<string, Set<number>> {
        const result : Map<string, Set<number>> = new Map()
        for ( const entryResidueMapEntry of this._staticModificationsSelected.entries() ) {
            const entryResidue = entryResidueMapEntry[ 0 ]
            const entryResidueMapValue = entryResidueMapEntry[ 1 ];
            const resultMassSet = new Set<number>();
            result.set( entryResidue, resultMassSet );
            for ( const massMapEntry of entryResidueMapValue ) {
                const selectionTypeEntry = massMapEntry[ 1 ]
                if ( selectionTypeEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                    const mass = massMapEntry[0]
                    resultMassSet.add(mass)
                }
            }
        }
        return result;
    }

    /**
     * @returns a Map of the currently selected Static Modifications.  Just Residues and Masses:  Only for "ALL" Selection type SingleProtein_Filter_SelectionType.ALL
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
     */
    get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType() : Map<string, Set<number>> {
        const result : Map<string, Set<number>> = new Map()
        for ( const entryResidueMapEntry of this._staticModificationsSelected.entries() ) {
            const entryResidue = entryResidueMapEntry[ 0 ]
            const entryResidueMapValue = entryResidueMapEntry[ 1 ];
            const resultMassSet = new Set<number>();
            result.set( entryResidue, resultMassSet );
            for ( const massMapEntry of entryResidueMapValue ) {
                const selectionTypeEntry = massMapEntry[ 1 ]
                if ( selectionTypeEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
                    const mass = massMapEntry[0]
                    resultMassSet.add(mass)
                }
            }
        }
        return result;
    }

    /**
     * @returns a Map of the currently selected Static Modifications.  Just Residues and Masses:  Only for "NOT" Selection type SingleProtein_Filter_SelectionType.NOT
     *     Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
     */
    get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__NOT_SelectionType() : Map<string, Set<number>> {
        const result : Map<string, Set<number>> = new Map()
        for ( const entryResidueMapEntry of this._staticModificationsSelected.entries() ) {
            const entryResidue = entryResidueMapEntry[ 0 ]
            const entryResidueMapValue = entryResidueMapEntry[ 1 ];
            const resultMassSet = new Set<number>();
            result.set( entryResidue, resultMassSet );
            for ( const massMapEntry of entryResidueMapValue ) {
                const selectionTypeEntry = massMapEntry[ 1 ]
                if ( selectionTypeEntry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
                    const mass = massMapEntry[0]
                    resultMassSet.add(mass)
                }
            }
        }
        return result;
    }

    /**
     *
     */
    get_StaticModification_Selected({ residueLetter, modMass } : { residueLetter : string, modMass : number }) : SingleProtein_Filter_PerUniqueIdentifier_Entry {

        let result : SingleProtein_Filter_PerUniqueIdentifier_Entry = undefined

        const entryFor_ResidueLetter = this._staticModificationsSelected.get( residueLetter );
        if ( entryFor_ResidueLetter ) {
            result = entryFor_ResidueLetter.get( modMass );
        }

        return result
    }

    /**
	 * 
	 */
    set_StaticModification_Selected({ residueLetter, modMass, entry } : { residueLetter : string, modMass : number, entry : SingleProtein_Filter_PerUniqueIdentifier_Entry }) : void {

        //  Create Parent Map if not exist
        let entryFor_ResidueLetter = this._staticModificationsSelected.get( residueLetter );
        if ( ! entryFor_ResidueLetter ) {
            entryFor_ResidueLetter = new Map();
            this._staticModificationsSelected.set( residueLetter, entryFor_ResidueLetter )
        }

        let oldEntry_selectionType: SingleProtein_Filter_SelectionType = null;
        {
            const oldEntry = entryFor_ResidueLetter.get(modMass);
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
        entryFor_ResidueLetter.set( modMass, entry );

        //  Update callback
        this._selection__Added__Pre_Set_Callback({
            oldValue_singleProtein_Filter_SelectionType: oldEntry_selectionType,
            newValue_singleProtein_Filter_SelectionType: entry.selectionType,
            pre_post_Set: ModificationMass_ReporterIon__UserSelections__Coordinator__Selection__Set__Pre_Post_Set_ENUM.POST_SET
        });

        this._selection__Updated_Callback();
    }

    /**
     *
     */
    delete_StaticModification_Selected_AllFor_ResidueLetter({ residueLetter }: { residueLetter: string }) {
        this._staticModificationsSelected.delete( residueLetter );

        this._selection__Updated_Callback();
    }

	/**
	 * 
	 */
    delete_StaticModification_Selected({ residueLetter, modMass }: { residueLetter: string, modMass: number }) {
        let entryFor_ResidueLetter = this._staticModificationsSelected.get( residueLetter );
        if ( ! entryFor_ResidueLetter ) {
            return; // EARLY EXIT
        }
        entryFor_ResidueLetter.delete( modMass );
        if ( entryFor_ResidueLetter.size === 0 ) {
            this._staticModificationsSelected.delete( residueLetter );
        }

        this._selection__Updated_Callback();
    }

    get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection() {
        return this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection
    }

    set_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection( value: boolean ) {
        this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection = value

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
	getEncodedStateData() {

        //  This has to deal with the value for _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED (which is currently "U") in the array this._variableModificationsSelected
        //        (which ends up in the array modificationsNonInteger)
        //     This results in the array modificationsNonInteger probably not being sorted properly, which isn't a big deal

		const result = {}
		// @ts-ignore
        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

		{
			const variableModificationsSelected_Encoded = this._variableModificationsSelected.getEncodedStateData();

			if ( variableModificationsSelected_Encoded ) {
                // @ts-ignore
				result[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] = variableModificationsSelected_Encoded;
			}
		}
        {
            const openModificationsSelected_Encoded = this._openModificationsSelected.getEncodedStateData();

            if ( openModificationsSelected_Encoded ) {
                result[ _ENCODED_DATA__OPEN_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] = openModificationsSelected_Encoded;
            }
        }
        if ( this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection ) {
            result[ _ENCODED_DATA__SHOW_OTHER_PEPTIDES__ETC__SELECTION_TYPE__NOT__PROPERTY_NAME ] = this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection;
        }

        // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
		if ( this._staticModificationsSelected && this._staticModificationsSelected.size !== 0 ) {

            //  Convert to Javascript Object and Arrays for JSON encoding

            const staticModificationsSelectedForEncoding = {};

            for ( const mapEntry of this._staticModificationsSelected.entries() ) {

                const mapKey = mapEntry[ 0 ];
                const mapValue = mapEntry[ 1 ];

                const staticModificationsSelectedMassesKeysArray = Array.from( mapValue.keys() );
                staticModificationsSelectedMassesKeysArray.sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    // a must be equal to b
                    return 0;
                });

                const resultArray = []

                for ( const massKey of staticModificationsSelectedMassesKeysArray ) {

                    const selectEntry = mapValue.get( massKey );
                    if ( ! selectEntry ) {
                        const  msg = "BUG: mapValue.get( massKey ) not return a value"
                        console.warn( msg )
                        throw Error( msg )
                    }

                    const selectEntryEncoded = _encodeStaticModSelection( selectEntry )

                    const resultEntry = {}
                    // @ts-ignore
                    resultEntry[ _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_MASS_PROPERTY_NAME ] = massKey;
                    // @ts-ignore
                    resultEntry[ _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE_PROPERTY_NAME ] = selectEntryEncoded;

                    resultArray.push( resultEntry )
                }

                // @ts-ignore
                staticModificationsSelectedForEncoding[ mapKey ] = resultArray;
            }

            // @ts-ignore
            result[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] = staticModificationsSelectedForEncoding;

        }

		return result;
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

		{  //  Old Variable Mods Selections for backwards compatibility

			if ( encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ] ||
				encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] ) {

				const encodedStateData_For_VariableModificationsSelections = {}
				// @ts-ignore
                encodedStateData_For_VariableModificationsSelections[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];
                // @ts-ignore
				encodedStateData_For_VariableModificationsSelections[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ] = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_INTEGERS_ENCODED_ENCODING_PROPERTY_NAME ];
                // @ts-ignore
				encodedStateData_For_VariableModificationsSelections[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ] = encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_NON_INTEGERS_ARRAY_ENCODING_PROPERTY_NAME ];

				this._variableModificationsSelected.set_encodedStateData({ encodedStateData : encodedStateData_For_VariableModificationsSelections })
			}
		}
		{  //  Current Variable Modifications Selections
			if ( encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] ) {

				this._variableModificationsSelected.set_encodedStateData({ encodedStateData : encodedStateData[ _ENCODED_DATA__VARIABLE_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] })
			}
		}
        {  //  Open Modifications Selections
            if ( encodedStateData[ _ENCODED_DATA__OPEN_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] ) {

                this._openModificationsSelected.set_encodedStateData({ encodedStateData : encodedStateData[ _ENCODED_DATA__OPEN_MODIFICATION_MASS_SELECTED_OBJECT_PROPERTY_NAME ] })
            }
        }


        { //  Static Mods

            // this._staticModificationsSelected: Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>

            const staticModificationsSelectedEncoded = encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ];

            if ( staticModificationsSelectedEncoded ) { // local_staticModificationsSelected is Object of Arrays if populated

                const local_staticModificationsSelected : Map<string, Map<number,SingleProtein_Filter_PerUniqueIdentifier_Entry>> = new Map();

                const objectKeys = Object.keys( staticModificationsSelectedEncoded );
                for ( const objectKey of objectKeys ) {

                    //  Either currently an Array<{a:mass,b:selectionTypeEncoded}  or previously, Array<mass>
                    const staticModificationsSelectedMassesArray = staticModificationsSelectedEncoded[ objectKey ];
                    if ( ! ( staticModificationsSelectedMassesArray instanceof Array ) ) {
                        const msg = "( ! ( staticModificationsSelectedMassesArray instanceof Array ) )"
                        console.warn( msg )
                        throw Error( msg )
                    }
                    const staticModificationsSelectedMassesMap : Map<number,SingleProtein_Filter_PerUniqueIdentifier_Entry> = new Map();
                    for ( const entry of staticModificationsSelectedMassesArray ) {
                        if ( variable_is_type_number_Check( entry ) ) {
                            //  Old version with just the mass as a number
                            const selectionEntry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType : SingleProtein_Filter_SelectionType.ANY });
                            staticModificationsSelectedMassesMap.set( entry, selectionEntry )

                        } else if ( entry[ _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_MASS_PROPERTY_NAME ] ) {
                            //  Have 'current' entry
                            const mass = entry[ _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_MASS_PROPERTY_NAME ]
                            const selectionEncoded = entry[ _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE_PROPERTY_NAME ];
                            let selectionEntry = _decodeStaticModSelection( selectionEncoded )
                            staticModificationsSelectedMassesMap.set( mass, selectionEntry )

                        } else {
                            const msg = "entry in encodedStateData[ _ENCODED_DATA__STATIC_MODIFICATION_MASS_SELECTED_OBJECT_AND_ARRAY_ENCODING_PROPERTY_NAME ] is not number and is not an object with property '" +
                                _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_MASS_PROPERTY_NAME +
                                "'  entry: " + entry + ", objectKey: " + objectKey;
                            console.warn( msg );
                            throw Error( msg );
                        }

                    }
                    if ( staticModificationsSelectedMassesMap.size > 0 ) {
                        local_staticModificationsSelected.set(objectKey, staticModificationsSelectedMassesMap);
                    }
                }
                this._staticModificationsSelected = local_staticModificationsSelected;
            }
        }

        {  //  _showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection
            if ( encodedStateData[ _ENCODED_DATA__SHOW_OTHER_PEPTIDES__ETC__SELECTION_TYPE__NOT__PROPERTY_NAME ] ) {

                this._showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection = encodedStateData[ _ENCODED_DATA__SHOW_OTHER_PEPTIDES__ETC__SELECTION_TYPE__NOT__PROPERTY_NAME ]
            }
        }
    }

}

//////

//  Private functions

/**
 *
 */
const _decodeStaticModSelection = function( selectionEncoded : string ) : SingleProtein_Filter_PerUniqueIdentifier_Entry {

    let selectionType : SingleProtein_Filter_SelectionType = null

    if ( selectionEncoded === _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ANY__PROPERTY_NAME ) {
        selectionType = SingleProtein_Filter_SelectionType.ANY
    } else if ( selectionEncoded === _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ALL__PROPERTY_NAME ) {
        selectionType = SingleProtein_Filter_SelectionType.ALL
    } else if ( selectionEncoded === _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__NOT__PROPERTY_NAME ) {
        selectionType = SingleProtein_Filter_SelectionType.NOT
    } else {
        const msg = "_decodeStaticModSelection: Unknown value for selectionEncoded: " + selectionEncoded
        console.warn( msg )
        throw Error( msg )
    }

    const entry = new SingleProtein_Filter_PerUniqueIdentifier_Entry({ selectionType })

    return  entry
}

/**
 *
 */
const _encodeStaticModSelection = function ( selectionEntry : SingleProtein_Filter_PerUniqueIdentifier_Entry ) : string {

    let selectionEntryEncoded = undefined;

    if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
        selectionEntryEncoded = _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ANY__PROPERTY_NAME
    } else if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
        selectionEntryEncoded = _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__ALL__PROPERTY_NAME
    } else if ( selectionEntry.selectionType === SingleProtein_Filter_SelectionType.NOT ) {
        selectionEntryEncoded = _SUBPART__ENCODED_DATA__STATIC_MODIFICATION_SELECTION_TYPE__NOT__PROPERTY_NAME
    } else {
        const msg = "_encodeStaticModSelection: Unknown value for selectionEntry.selectionType: " + selectionEntry.selectionType
        console.warn( msg )
        throw Error( msg )
    }

    return selectionEntryEncoded
}
