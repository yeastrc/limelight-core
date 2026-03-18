/**
 * singleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject.ts
 *
 * Which Tab is selected of Protein Sequence, Protein Bar, Protein Structure
 */

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:
//

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a'

const _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME = 'b'

const _TAB_SELECTION_ENCODED_VALUES = {

     SELECTED_PROTEIN_SEQUENCE : 1,
     SELECTED_PROTEIN_BAR : 2,
     SELECTED_PROTEIN_STRUCTURE : 3

} as const

export class SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants {

    static readonly SELECTED_PROTEIN_SEQUENCE = new SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants( "SELECTED_PROTEIN_SEQUENCE" )
    static readonly SELECTED_PROTEIN_BAR = new SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants( "SELECTED_PROTEIN_BAR" )
    static readonly SELECTED_PROTEIN_STRUCTURE = new SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants( "SELECTED_PROTEIN_STRUCTURE" )

    readonly label: string

    constructor( label: string ) {
        this.label = label
    }
}

const _Tabs_Selection__DEFAULT = SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_SEQUENCE

/**
 *
 */
export class SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject {

    private _selected_Tab_Value = _Tabs_Selection__DEFAULT

    private _valueChangedCallback: () => void;

    /**
     *
     */
    constructor(
        {
            valueChangedCallback
        } : {
            valueChangedCallback: () => void
        }) {
        this._valueChangedCallback = valueChangedCallback;
    }


    ///////   show_TrypsinCutPoints

    /**
     * @param show_TrypsinCutPoints -
     */
    set_selected_Tab_Value( selected_Tab_Value: SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants ) : void {

        if ( selected_Tab_Value === undefined ) {
            const msg = "set_selected_Tab_Value: selected_Tab_Value: undefined";
            console.warn( msg );
            throw Error( msg );
        }

        this._selected_Tab_Value = selected_Tab_Value

        if ( ! this._valueChangedCallback ) {
            throw Error("set_show_TrypsinCutPoints::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    /**
     *
     */
    get_selected_Tab_Value() {

        return this._selected_Tab_Value;
    }


    /////////////

    //   set/get encoded data

    /**
     * @param encodedStateData - data returned by method 'getEncodedStateData' for storage on URL
     */
    set_encodedStateData({ encodedStateData }:{ encodedStateData: any }) : void {

        this._updateWithEncodedStateData({ encodedStateData });
    }

    /**
     * Get the state of this object to store on the URL
     *
     * Must return types that can be converted to JSON with JSON.stringify
     */
    getEncodedStateData() : any {

        const result: { [key: string]: any } = {}

        if ( this._selected_Tab_Value ) {

            if ( this._selected_Tab_Value === SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_SEQUENCE ) {

                result[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ] = _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_SEQUENCE
            } else if ( this._selected_Tab_Value === SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_BAR ) {

                result[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ] = _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_BAR
            } else if ( this._selected_Tab_Value === SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_STRUCTURE ) {

                result[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ] = _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_STRUCTURE
            } else {
                const msg = "getEncodedStateData: Unknown value for this._selected_Tab_Value: " + this._selected_Tab_Value
                console.warn(msg)
                throw Error(msg)
            }
        }

        if ( Object.keys( result ).length === 0 ) {

            return undefined;
        }

        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

        return result
    }

    /**
     * Update the state of this object with the value from the URL
     *
     */
    private _updateWithEncodedStateData({ encodedStateData }: { encodedStateData: any }) : void {

        if ( ! ( encodedStateData ) ) {
            //  No Encoded State Data
            // console.log( "_updateWithEncodedStateData(...): No value in encodedStateData.  Exiting" );
            return;  // EARLY EXIT
        }

        const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

        if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
            const msg = "_updateWithEncodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
            console.log( msg );
            throw Error( msg );
        }

        {
            const encodedValue = encodedStateData[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ]

            if ( encodedValue ) {

                if ( encodedValue === _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_SEQUENCE ) {

                    this._selected_Tab_Value = SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_SEQUENCE

                } else if ( encodedValue === _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_BAR ) {

                    this._selected_Tab_Value = SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_BAR


                } else if ( encodedValue === _TAB_SELECTION_ENCODED_VALUES.SELECTED_PROTEIN_STRUCTURE ) {

                    this._selected_Tab_Value = SingleProtein_ProteinSequence_Etc_Tabs_SelectedTab_StateObject__Enum_Constants.SELECTED_PROTEIN_STRUCTURE

                } else {
                    const msg = "_updateWithEncodedStateData: Unknown value for encodedStateData[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ]: " + encodedStateData[ _ENCODED_DATA__TAB_SELECTION__VALUE_ENCODING_PROPERTY_NAME ]
                    console.warn( msg )
                    throw Error( msg )
                }
            }
        }

        {
        }
    }
}