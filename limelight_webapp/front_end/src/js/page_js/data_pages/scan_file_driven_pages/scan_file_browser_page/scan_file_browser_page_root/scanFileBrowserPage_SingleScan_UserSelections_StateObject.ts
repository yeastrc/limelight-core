/**
 * scanFileBrowserPage_SingleScan_UserSelections_StateObject.ts
 *
 * Scan File Browser Page - Single Scan User Selections - State Object
 *
 * State Object used in:
 */

////////////////////

///  Constants for encoding/decoding state for storage on URL

// VERSION 1 ENCODING STRING:

//  Selected Reporter Ion Masses are sorted and stored in an Array

const _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION = 1;


const _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME = 'a';

const _ENCODED_DATA__SCAN_NUMBER_SELECTED__ENCODING_PROPERTY_NAME = 'b';
const _ENCODED_DATA__ZOOM_RANGE_SELECTED__ENCODING_PROPERTY_NAME = 'c';
//  NO LONGER USED  // const _ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE_SELECTED__ENCODING_PROPERTY_NAME = 'd';
const _ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__ENCODING_PROPERTY_NAME = 'e';

//  Sub Encoded:  ZOOM_RANGE

const _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MIN__ENCODING_PROPERTY_NAME = 'a';
const _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MAX__ENCODING_PROPERTY_NAME = 'b';
const _SUB_ENCODED_DATA__ZOOM_RANGE_TIC_MAX__ENCODING_PROPERTY_NAME = 'c';

//  Sub Encoded:  FEATURE_DETECTION_INDIVIDUAL_FEATURE

const _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__BASE_ISOTOPE_PEAK__ENCODING_PROPERTY_NAME = 'a';
const _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__CHARGE__ENCODING_PROPERTY_NAME = 'b';
const _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__MONOISOTOPIC_MASS__ENCODING_PROPERTY_NAME = 'c';

///////


/**
 *
 */
export class ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange {

    readonly mz_Min_ZoomRange: number
    readonly mz_Max_ZoomRange: number

    readonly tic_Max_ZoomRange: number
}

/**
 *  MUST Populate monoisotopicMass or baseIsotopePeak__Containing_M_Over_Z or both
 *  MUST Populate charge
 */
export class ScanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_OR_PSM_Root {

    readonly monoisotopicMass                                           // YES  populated for Feature Detection AND PSM
    readonly baseIsotopePeak__Containing_M_Over_Z: number  //  m/z  --  Maybe populated for PSM.  YES populated for Feature Detection
    readonly charge: number
}

/**
 *
 */
export class ScanFileBrowserPage_SingleScan_UserSelections_StateObject {

    // private _initializeCalled : boolean = false;

    private _scanNumber_Selected : number = undefined

    private _zoomRange_Selected : ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange = undefined

    private _featureDetection_IndividualFeature_OR_PSM_Root : ScanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_OR_PSM_Root;

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

    /**
     * @returns undefined if not set
     *
     */
    getScanNumber_Selected() : number {

        return  this._scanNumber_Selected;
    }
    /**
     */
    setScanNumber_Selected( scanNumber : number ) : void {

        this._scanNumber_Selected = scanNumber;

        this._zoomRange_Selected = undefined //  clear when change scan number selection

        this._featureDetection_IndividualFeature_OR_PSM_Root = undefined //  clear when change scan number selection

        // if ( ! this._valueChangedCallback ) {
        //     throw Error("setStaticModifications_Selected::( ! this._valueChangedCallback )")
        // }

        if ( this._valueChangedCallback ) {
            this._valueChangedCallback();
        }
    }

    /**
     * @returns undefined if not set
     *
     */
    getZoomRange_Selected() : ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange {

        return  this._zoomRange_Selected;
    }
    /**
     */
    setZoomRange_Selected( zoomRange_Selected: ScanFileBrowserPage_SingleScan_UserSelections_StateObject__ZoomRange ) : void {

        this._zoomRange_Selected = zoomRange_Selected;

        // if ( ! this._valueChangedCallback ) {
        //     throw Error("setZoomRange_Selected::( ! this._valueChangedCallback )")
        // }

        if ( this._valueChangedCallback ) {
            this._valueChangedCallback();
        }
    }

    /**
     * @returns undefined if not set
     *
     */
    get_featureDetection_IndividualFeature_OR_PSM_Root() {
        return this._featureDetection_IndividualFeature_OR_PSM_Root
    }

    /**
     *
     * @param featureDetection_IndividualFeature_OR_PSM__Root
     */
    set_featureDetection_IndividualFeature_OR_PSM__Root( featureDetection_IndividualFeature_OR_PSM__Root : ScanFileBrowserPage_SingleScan_UserSelections_StateObject__FeatureDetection_IndividualFeature_OR_PSM_Root ) {

        if ( featureDetection_IndividualFeature_OR_PSM__Root ) {

            if ( ( featureDetection_IndividualFeature_OR_PSM__Root.baseIsotopePeak__Containing_M_Over_Z === undefined || featureDetection_IndividualFeature_OR_PSM__Root.baseIsotopePeak__Containing_M_Over_Z === null )
                && ( featureDetection_IndividualFeature_OR_PSM__Root.monoisotopicMass === undefined || featureDetection_IndividualFeature_OR_PSM__Root.monoisotopicMass === null ) ) {

                const msg = "set_featureDetection_IndividualFeature_OR_PSM__Root(...): featureDetection_IndividualFeature_OR_PSM__Root has a value AND featureDetection_IndividualFeature_OR_PSM__Root.baseIsotopePeak__Containing_M_Over_Z is undefined or null AND featureDetection_IndividualFeature_OR_PSM__Root.monoisotopicMass is undefined or null"
                console.warn( msg )
                throw Error( msg )
            }

            if ( featureDetection_IndividualFeature_OR_PSM__Root.charge === undefined || featureDetection_IndividualFeature_OR_PSM__Root.charge === null ) {

                const msg = "set_featureDetection_IndividualFeature_OR_PSM__Root(...): featureDetection_IndividualFeature_OR_PSM__Root has a value AND featureDetection_IndividualFeature_OR_PSM__Root.charge is undefined or null"
                console.warn( msg )
                throw Error( msg )
            }
        }

        this._featureDetection_IndividualFeature_OR_PSM_Root = featureDetection_IndividualFeature_OR_PSM__Root;

        // if ( ! this._valueChangedCallback ) {
        //     throw Error("setZoomRange_Selected::( ! this._valueChangedCallback )")
        // }

        if ( this._valueChangedCallback ) {
            this._valueChangedCallback();
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
    getEncodedStateData() : any {

        const result = {}

        if ( this._scanNumber_Selected !== undefined && this._scanNumber_Selected !== null ) {
            result[ _ENCODED_DATA__SCAN_NUMBER_SELECTED__ENCODING_PROPERTY_NAME ] = this._scanNumber_Selected;
        }

        if (  this._zoomRange_Selected ) {

            const zoomRange_Encoded: any = {}

            if ( this._zoomRange_Selected.mz_Min_ZoomRange !== undefined ) {
                zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MIN__ENCODING_PROPERTY_NAME ] = this._zoomRange_Selected.mz_Min_ZoomRange
            }
            if ( this._zoomRange_Selected.mz_Max_ZoomRange !== undefined ) {
                zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MAX__ENCODING_PROPERTY_NAME ] = this._zoomRange_Selected.mz_Max_ZoomRange
            }
            if ( this._zoomRange_Selected.tic_Max_ZoomRange !== undefined ) {
                zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_TIC_MAX__ENCODING_PROPERTY_NAME ] = this._zoomRange_Selected.tic_Max_ZoomRange
            }

            if ( Object.keys( zoomRange_Encoded ).length > 0 ) {
                //  Only set property on 'result' when any keys added to 'zoomRange_Encoded'
                result[ _ENCODED_DATA__ZOOM_RANGE_SELECTED__ENCODING_PROPERTY_NAME ] = zoomRange_Encoded;
            }
        }

        if ( this._featureDetection_IndividualFeature_OR_PSM_Root ) {

            const entry_Encoded: any = {}

            if ( this._featureDetection_IndividualFeature_OR_PSM_Root.baseIsotopePeak__Containing_M_Over_Z !== undefined ) {
                entry_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__BASE_ISOTOPE_PEAK__ENCODING_PROPERTY_NAME ] = this._featureDetection_IndividualFeature_OR_PSM_Root.baseIsotopePeak__Containing_M_Over_Z
            }
            if ( this._featureDetection_IndividualFeature_OR_PSM_Root.charge !== undefined ) {
                entry_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__CHARGE__ENCODING_PROPERTY_NAME ] = this._featureDetection_IndividualFeature_OR_PSM_Root.charge
            }
            if ( this._featureDetection_IndividualFeature_OR_PSM_Root.monoisotopicMass !== undefined ) {
                entry_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__MONOISOTOPIC_MASS__ENCODING_PROPERTY_NAME ] = this._featureDetection_IndividualFeature_OR_PSM_Root.monoisotopicMass
            }

            if ( Object.keys( entry_Encoded ).length > 0 ) {

                result[ _ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__ENCODING_PROPERTY_NAME ] = entry_Encoded;
            }
        }

        if ( Object.keys( result ).length === 0 ) {
            //  No keys added to result so return undefined
            return  undefined
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

            return; // EARLY RETURN

            // const msg = "set_encodedStateData(...): No value in encodedStateData";
            // console.warn( msg );
            // throw Error( msg );
        }

        const version = encodedStateData[ _ENCODED_DATA__VERSION_NUMBER_ENCODING_PROPERTY_NAME ];

        if ( version !== _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION ) {
            const msg = "set_encodedStateData(...): Version in encodedStateData is not '" + _ENCODING_DATA__VERSION_NUMBER__CURRENT_VERSION + "'.  version is: " + version;
            console.warn( msg );
            throw Error( msg );
        }

        this._scanNumber_Selected = encodedStateData[ _ENCODED_DATA__SCAN_NUMBER_SELECTED__ENCODING_PROPERTY_NAME ]

        { // this._zoomRange_Selected

            const zoomRange_Encoded = encodedStateData[ _ENCODED_DATA__ZOOM_RANGE_SELECTED__ENCODING_PROPERTY_NAME ]
            if ( zoomRange_Encoded ) {
                this._zoomRange_Selected = {
                    mz_Min_ZoomRange: zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MIN__ENCODING_PROPERTY_NAME ],
                    mz_Max_ZoomRange: zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_MZ_MAX__ENCODING_PROPERTY_NAME ],
                    tic_Max_ZoomRange: zoomRange_Encoded[ _SUB_ENCODED_DATA__ZOOM_RANGE_TIC_MAX__ENCODING_PROPERTY_NAME ],
                }
            }
        }
        { // this._featureDetection_IndividualFeature_Root

            const featureDetection_IndividualFeature_Encoded = encodedStateData[ _ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__ENCODING_PROPERTY_NAME ]
            if ( featureDetection_IndividualFeature_Encoded ) {
                this._featureDetection_IndividualFeature_OR_PSM_Root = {
                    baseIsotopePeak__Containing_M_Over_Z: featureDetection_IndividualFeature_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__BASE_ISOTOPE_PEAK__ENCODING_PROPERTY_NAME ],
                    charge: featureDetection_IndividualFeature_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__CHARGE__ENCODING_PROPERTY_NAME ],
                    monoisotopicMass: featureDetection_IndividualFeature_Encoded[ _SUB_ENCODED_DATA__FEATURE_DETECTION_INDIVIDUAL_FEATURE__MONOISOTOPIC_MASS__ENCODING_PROPERTY_NAME ]
                }
            }
        }
    }
}

