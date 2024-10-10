/**
 * sscanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.ts
 *
 * Filter on Scan Peak m/z and intensity - State Object
 *
 *
 * State Object used in:   Peptide List - Peptide page and Single Protein  - Search Based and Experiment
 *
 */
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import { PeptideMassCalculator } from "page_js/data_pages/peptide_mass_utils/PeptideMassCalculator";

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected SCAN_FILENAME_IDS are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME = 'b';


//  Encoding for Single entry

const _ENCODED_DATA__SINGLE_ENTRY__MONOISOPIC_MASS = 'a'
const _ENCODED_DATA__SINGLE_ENTRY__PLUS_MINUS_MASS_RANGE_IN_PPM = 'b'
const _ENCODED_DATA__SINGLE_ENTRY__SCAN_PEAK_INTENSITY_MINIMUM_PERCENTAGE_OF_MAX_SCAN_PEAK_INTENSITY_IN_SCAN = 'c'
const _ENCODED_DATA__CHARGE_ENTRIES = 'd'
const _ENCODED_DATA__SINGLE_ENTRY__MASS_OVER_CHARGE = 'e'

///////


export class ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY {

    massOverCharge: number
    plus_Minus_MassRange_In_PPM: number
    scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: number
}


///////

/**
 *
 */
export class ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject {

    private _selections : Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> = undefined;

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

    is_AnySelections() : boolean {

        if ( this._selections ) {
            return true
        }
        return false
    }

    /**
     * @returns undefined if default
     */
    get__Selections() {

        return this._selections;
    }

    set__Selections( selections : Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> ) {

        this._selections = selections

        if ( ! this._valueChangedCallback ) {
            throw Error("set__Selections::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
    }

    //  Validate if Uncomment this

    // /**
    //  *
    //  */
    // add_Entry( entry: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY ) : void {
    //
    //     if ( ! this._selections ) {
    //         this._selections = []
    //     }
    //
    //     this._selections.push( entry )
    //
    //     if ( ! this._valueChangedCallback ) {
    //         throw Error("add_Entry::( ! this._valueChangedCallback )")
    //     }
    //
    //     this._valueChangedCallback();
    // }
    //
    // /**
    //  * Uses Object Reference to delete
    //  *
    //  * @param entry_ToDelete
    //  */
    // delete_Entry( entry_ToDelete: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY ) : void {
    //
    //     this._selections = this._selections.filter( (entry_InArray) => {
    //         if ( entry_InArray !== entry_ToDelete ) {
    //             return true
    //         }
    //         return  false
    //     })
    //
    //     if ( this._selections.length === 0 ) {
    //         this._selections = undefined
    //     }
    //
    //     if ( ! this._valueChangedCallback ) {
    //         throw Error("add_Entry::( ! this._valueChangedCallback )")
    //     }
    //
    //     this._valueChangedCallback();
    // }

    /**
     *
     *
     */
    clearAll() {

        this._selections = undefined;

        if ( ! this._valueChangedCallback ) {
            throw Error("clearAll::( ! this._valueChangedCallback )")
        }

        this._valueChangedCallback();
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

        if ( this._selections !== undefined && this._selections.length > 0 ) {

            const encoded_Entry_Array: Array<any> = []

            for ( const selection_Entry of this._selections ) {

                const encoded_Entry: any = {}
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__MONOISOPIC_MASS ] =  selection_Entry.massOverCharge
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__PLUS_MINUS_MASS_RANGE_IN_PPM ] =  selection_Entry.plus_Minus_MassRange_In_PPM
                encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SCAN_PEAK_INTENSITY_MINIMUM_PERCENTAGE_OF_MAX_SCAN_PEAK_INTENSITY_IN_SCAN ] =  selection_Entry.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan

                encoded_Entry_Array.push( encoded_Entry )
            }

            result[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ] = encoded_Entry_Array;
        }

        if ( Object.keys(result).length === 0 ) {
            return undefined;
        }

        result[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ] = _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION;

        return result;
    }

    /**
     * Update the state of this object with the value from the URL
     *
     */
    set_encodedStateData({ encodedStateData }: { encodedStateData: any }) : void {

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

        this._selections = undefined

        if ( encodedStateData[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ] ) {

            const encoded_Entry_Array = encodedStateData[ _ENCODED_DATA__SELECTED_DATA__ENCODING_PROPERTY_NAME ];

            if ( encoded_Entry_Array && ( encoded_Entry_Array instanceof Array ) && encoded_Entry_Array.length > 0 ) {

                this._selections = []

                for ( const encoded_Entry of encoded_Entry_Array ) {

                    const monoisotopicMass = encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__MONOISOPIC_MASS ]

                    if ( monoisotopicMass !== undefined ) {

                        //  Have OLD entry so need to convert to new entry(ies)

                        let chargeEntries = undefined

                        {
                            const chargeEntries_Array = encoded_Entry[ _ENCODED_DATA__CHARGE_ENTRIES ]
                            if ( ! chargeEntries_Array ) {
                                //  Not expected but to support early testing URLs
                                chargeEntries = _get_ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY__DEFAULT_CHARGE_ENTRIES()
                            } else {
                                chargeEntries = new Set( chargeEntries_Array )
                            }
                        }

                        const chargeEntries_Array = Array.from( chargeEntries ) as Array<number>
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( chargeEntries_Array )

                        for ( const chargeEntry of chargeEntries_Array ) {

                            const m_Over_Z_Mass_Base =
                                PeptideMassCalculator.calculateMZ_From_MonoisotopicMass_Charge( {
                                    monoisotopicMass: monoisotopicMass,
                                    charge: chargeEntry
                                } )


                            const stateEntry: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY = {
                                massOverCharge: m_Over_Z_Mass_Base,
                                plus_Minus_MassRange_In_PPM: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__PLUS_MINUS_MASS_RANGE_IN_PPM ],
                                scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SCAN_PEAK_INTENSITY_MINIMUM_PERCENTAGE_OF_MAX_SCAN_PEAK_INTENSITY_IN_SCAN ],
                            }

                            this._selections.push( stateEntry )
                        }
                    } else {

                        //  Have Current Entry

                        const stateEntry: ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY = {
                            massOverCharge: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__MASS_OVER_CHARGE ],
                            plus_Minus_MassRange_In_PPM: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__PLUS_MINUS_MASS_RANGE_IN_PPM ],
                            scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan: encoded_Entry[ _ENCODED_DATA__SINGLE_ENTRY__SCAN_PEAK_INTENSITY_MINIMUM_PERCENTAGE_OF_MAX_SCAN_PEAK_INTENSITY_IN_SCAN ],
                        }

                        this._selections.push( stateEntry )
                    }
                }
            }
        }
    }
}

//  For OLD URLs

const _CHARGE_ENTRIES_DEFAULT_AS_ARRAY = [ 1 ]

const _get_ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY__DEFAULT_CHARGE_ENTRIES = function () {
    return new Set( _CHARGE_ENTRIES_DEFAULT_AS_ARRAY )
}