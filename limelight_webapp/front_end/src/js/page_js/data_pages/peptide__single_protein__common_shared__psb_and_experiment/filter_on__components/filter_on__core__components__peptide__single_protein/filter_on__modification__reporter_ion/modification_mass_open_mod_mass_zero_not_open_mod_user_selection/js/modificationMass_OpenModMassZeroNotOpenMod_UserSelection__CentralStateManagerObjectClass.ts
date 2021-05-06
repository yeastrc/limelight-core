import {
    MOD_SELECTION_TREAT_OPEN_MOD_MASS_ZERO_AS_UNMODIFIED__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY
} from "page_js/data_pages/central_page_state_manager/centralPageStateManager_Keys";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";

/**
 * modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.ts
 *
 * Treat Mass 0 As Unmodified:   User Input Checkbox Selection - State Object
 *
 *
 * State Object used in:
 *      modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component.tsx
 */

////////////////////

const _COMPONENT_UNIQUE_ID = MOD_SELECTION_TREAT_OPEN_MOD_MASS_ZERO_AS_UNMODIFIED__CENTRAL_STATE_MANAGER_OBJECT_CLASS__CENTRAL_STATE_MANAGER_KEY; // Key for use in Central State Manager

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME = 'b';


///////

/**
 *
 */
export class ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass {

    private _initializeCalled : boolean = false;

    private _for_SingleProtein : boolean = false;

    private _optionSelected : boolean = undefined; //  Set to undefined if no selection or false

    private _centralPageStateManager : CentralPageStateManager;

    /**
     * Create Instance for Main Page
     */
    static getNewInstance_MainPage( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass {

        if ( ! centralPageStateManager ) {
            const msg = "getNewInstance_MainPage: centralPageStateManager is required."
            console.warn( msg );
            throw Error(msg);
        }

        const instance = new ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass({ centralPageStateManager });

        return instance;
    }

    /**
     * Create Instance for Single Protein
     */
    static getNewInstance_SingleProtein() : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass {

        const instance = new ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass({ centralPageStateManager: undefined });

        instance._for_SingleProtein = true;

        return instance;
    }

    /**
     *
     */
    private constructor( { centralPageStateManager } : { centralPageStateManager : CentralPageStateManager } ) {

        //  No centralPageStateManager value if used for an override

        if ( centralPageStateManager ) {
            this._centralPageStateManager = centralPageStateManager;

            this._centralPageStateManager.register( { component : this } );
        }
    }

    /**
     *
     */
    initialize_MainPageInstance() : void {

        let encodedStateData = this._centralPageStateManager.getEncodedData( { component : this } );
        this._initialize_Internal({ encodedStateData });

        this._initializeCalled = true;
    }

    /**
     *
     */
    initialize_SingleProteinInstance(
        {
            encodedStateData
        } : {
            encodedStateData: any
        }) : void {

        this._initialize_Internal({ encodedStateData });

        this._initializeCalled = true;
    }


    /**
     * Update the state of this object with the value from the URL
     *
     */
    private _initialize_Internal(
        {
            encodedStateData
        } : {
            encodedStateData: any
        }) : void {

        if ( encodedStateData ) {

            const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

            if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
                const msg = "initialize(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
                console.warn( msg );
                throw Error( msg );
            }

            this._optionSelected = encodedStateData[ _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME ];
        }
    }

    /**
     *
     *
     */
    getTreatOpenModMassZeroAsUnmodified_Selection() : boolean {

        if ( ! this._initializeCalled ) {
            const msg = "Not Initialized and getTreatOpenModMassZeroAsUnmodified_Selection called"
            console.warn(msg)
            throw Error(msg)
        }

        if ( ! this._optionSelected ) {
            return false;
        }

        return this._optionSelected;
    }

    /**
     *
     *
     */
    setTreatOpenModMassZeroAsUnmodified_Selection( treatOpenModMassZeroAsUnmodified_Selection : boolean ) : void {

        if ( ! this._initializeCalled ) {
            const msg = "Not Initialized and setTreatOpenModMassZeroAsUnmodified_Selection called"
            console.warn(msg)
            throw Error(msg)
        }

        if ( ! treatOpenModMassZeroAsUnmodified_Selection ) {
            this._optionSelected = undefined;
        } else {
            this._optionSelected = treatOpenModMassZeroAsUnmodified_Selection;
        }

        // if ( ! this._centralPageStateManager ) {
        //     throw Error( "this._centralPageStateManager not set" );
        // }
        if ( this._centralPageStateManager ) {
            this._centralPageStateManager.setState({component: this});
        }
    }

    /**
     *
     *
     */
    clearTreatOpenModMassZeroAsUnmodified_Selection() {

        if ( ! this._initializeCalled ) {
            const msg = "Not Initialized and clearTreatOpenModMassZeroAsUnmodified_Selection called"
            console.warn(msg)
            throw Error(msg)
        }

        this._optionSelected = undefined;

        if ( ! this._centralPageStateManager ) {
            throw Error( "this._centralPageStateManager not set" );
        }
        this._centralPageStateManager.setState( { component : this } );
    }


    /**
     * Called by Central State Manager and maybe other code
     */
    getUniqueId() {
        return _COMPONENT_UNIQUE_ID;
    }

    //////////////////////////////////////

    /**
     * Called by Central State Manager and maybe other code
     */
    getDataForEncoding() {

        // MUST  return something if not selected if for Single Protein.  Processing for Single Protein requires it.

        if ( ( ! this._optionSelected ) && ( ! this._for_SingleProtein ) ) {

            //  NO need to return anything if not selected and not for Single Protein

            return undefined; // EARLY RETURN
        }

        const dataForEncoding = {}

        // @ts-ignore
        dataForEncoding[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;
        // @ts-ignore
        dataForEncoding[ _ENCODED_DATA__PEPTIDE_UNIQUE_ENCODING_PROPERTY_NAME ] = this._optionSelected;

        return dataForEncoding;
    }

}

