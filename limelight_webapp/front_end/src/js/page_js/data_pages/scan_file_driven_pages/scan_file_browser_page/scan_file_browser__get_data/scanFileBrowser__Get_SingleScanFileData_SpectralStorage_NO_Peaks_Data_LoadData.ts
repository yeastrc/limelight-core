/**
 * scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData.ts
 *
 * Scan File Browser Page - Spectral Storage Data - Single Project Id - Single Scan File Id - NO Scan Peaks - Load Data
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";


/**
 *
 */
export class ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root{

    private _singleScanEntry_Map_Key_ScanNumber: Map<number, ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber> = new Map();

    private _scanNumber_Max: number = undefined

    private _scanNumbers_Set: Set<number> = new Set()

    private _scanNumbers_Set__Map_Key_ScanLevel: Map<number, Set<number>> = new Map()

    private _scanLevels: Set<number> = new Set()
    private _scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

    constructor() {}

    get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanNumber: number) {
        return this._singleScanEntry_Map_Key_ScanNumber.get(scanNumber);
    }

    /**
     *
     */
    get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator(): IterableIterator<ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber> {

        return this._singleScanEntry_Map_Key_ScanNumber.values()
    }

    get_scanNumber_Max() {
        return this._scanNumber_Max
    }

    /**
     *
     */
    get_scanNumbers_Set() : Set<number> {
        return this._scanNumbers_Set;
    }

    /**
     *
     */
    get_scanLevels_Set() : Set<number> {
        return this._scanLevels;
    }

    /**
     *
     */
    get_scanLevels_Sorted() : Array<number> {
        const scanLevels_Sorted = Array.from( this._scanLevels )
        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( scanLevels_Sorted )
        return scanLevels_Sorted;
    }

    /**
     * @returns undefined if scanLevel not found
     */
    get_ScanCount_ForScanLevel( scanLevel: number ) : number {
        return this._scanCount_Map_Key_ScanLevel.get( scanLevel );
    }

    /**
     * @returns undefined if scanLevel not found
     */
    get_ScanNumbers_For_ScanLevel( scanLevel: number ) {

        return this._scanNumbers_Set__Map_Key_ScanLevel.get( scanLevel )
    }

    ///  Add/Set

    add_SpectralStorage_NO_Peaks_DataFor_ScanNumber( item : ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber ) {

        this._singleScanEntry_Map_Key_ScanNumber.set( item.scanNumber, item );

        if ( this._scanNumber_Max === undefined ) {
            this._scanNumber_Max = item.scanNumber
        } else {
            if ( this._scanNumber_Max < item.scanNumber ) {
                this._scanNumber_Max = item.scanNumber
            }
        }

        this._scanNumbers_Set.add( item.scanNumber )

        let scanNumbersForLevel = this._scanNumbers_Set__Map_Key_ScanLevel.get( item.level );
        if ( ! scanNumbersForLevel ) {
            scanNumbersForLevel = new Set()
            this._scanNumbers_Set__Map_Key_ScanLevel.set( item.level, scanNumbersForLevel );
        }
        scanNumbersForLevel.add( item.scanNumber )
    }

    set_scanLevels( scanLevels: Set<number> ) : void {
        this._scanLevels = scanLevels;
    }
    set_scanCount_Map_Key_ScanLevel( scanCount_Map_Key_ScanLevel: Map<number,number> ) : void {
        this._scanCount_Map_Key_ScanLevel = scanCount_Map_Key_ScanLevel;
    }
}

/**
 *
 */
export class ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber {

    readonly scanNumber: number;
    readonly level: number;
    readonly retentionTime_InSeconds: number;
    readonly totalIonCurrent_ForScan: number; // Can be null

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    readonly ionInjectionTime_InMilliseconds: number;  // In Milliseconds // Can be null

    //  Only applicable where level > 1

    readonly parentScanNumber: number; // Can be null
    readonly precursorCharge: number; // Can be null
    readonly precursor_M_Over_Z: number; // Can be null
}


/**
 * Common Data - Data From Server - Single Search - Spectral Storage Data - NO Scan Peaks - Load Data
 *
 * @param projectScanFileId
 */
export const scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData = function(
    {
        projectScanFileId
    } : {
        projectScanFileId: number
    }
) : Promise<ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root> {

    const promise = new Promise<ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root> ( (resolve, reject) => {
        try {

            const url = "d/rws/for-page/ptsb/spectral-storage-data--no-peaks--project-scan-file-id";

            console.log( "START: getting data from URL: " + url );

            const requestData = { projectScanFileId };

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                try {
                    console.log( "END: REJECTED: getting data from URL: " + url );

                    reject()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    console.log( "END: Successful: getting data from URL: " + url );

                    const result = _populate_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root({ responseData });

                    resolve( result );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            } );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return promise;
}

/**
 *
 */
const _populate_DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root = function (
    {
        responseData
    } : {
        responseData: any
    }) : ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root {

    let dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId: ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root

    if ( responseData.scanEntries ) {

        if ( responseData.scanEntries === undefined || responseData.scanEntries === null ) {
            const msg = "( responseData.scanEntries === undefined || responseData.scanEntries === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! ( responseData.scanEntries instanceof Array ) ) {
            const msg = "( ! ( responseData.scanEntries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId =
            new ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_Root();

        const scanLevels_Set : Set<number> = new Set()
        const scanCount_Map_Key_ScanLevel: Map<number,number> = new Map();

        dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanLevels( scanLevels_Set );
        dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.set_scanCount_Map_Key_ScanLevel( scanCount_Map_Key_ScanLevel );

        for ( const scanEntryFromArray of responseData.scanEntries ) {

            const scanEntry : ScanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_ForSingleScanNumber = scanEntryFromArray;

            if ( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null ) {
                const msg = "( scanEntry.scanNumber === undefined || scanEntry.scanNumber === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanEntry.scanNumber ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.scanNumber ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanEntry.level === undefined || scanEntry.level === null ) {
                const msg = "( scanEntry.level === undefined || scanEntry.level === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanEntry.level ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.level ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null ) {
                const msg = "( scanEntry.retentionTime_InSeconds === undefined || scanEntry.retentionTime_InSeconds === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) ) {
                const msg = "( ! variable_is_type_number_Check( scanEntry.retentionTime_InSeconds ) )";
                console.warn(msg);
                throw Error(msg);
            }
            //  Optional values
            if ( scanEntry.totalIonCurrent_ForScan !== undefined && scanEntry.totalIonCurrent_ForScan !== null ) {
                if ( ! variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanEntry.totalIonCurrent_ForScan ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            if ( scanEntry.ionInjectionTime_InMilliseconds !== undefined && scanEntry.ionInjectionTime_InMilliseconds !== null ) {
                if ( ! variable_is_type_number_Check( scanEntry.ionInjectionTime_InMilliseconds ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanEntry.ionInjectionTime_InMilliseconds ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            if ( scanEntry.parentScanNumber !== undefined && scanEntry.parentScanNumber !== null ) {
                if ( ! variable_is_type_number_Check( scanEntry.parentScanNumber ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanEntry.parentScanNumber ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            if ( scanEntry.precursorCharge !== undefined && scanEntry.precursorCharge !== null ) {
                if ( ! variable_is_type_number_Check( scanEntry.precursorCharge ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanEntry.precursorCharge ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            if ( scanEntry.precursor_M_Over_Z !== undefined && scanEntry.precursor_M_Over_Z !== null ) {
                if ( ! variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanEntry.precursor_M_Over_Z ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }

            dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId.add_SpectralStorage_NO_Peaks_DataFor_ScanNumber(scanEntry);

            scanLevels_Set.add( scanEntry.level );
            {
                const scanCount = scanCount_Map_Key_ScanLevel.get(scanEntry.level);
                if ( ! scanCount ) {
                    scanCount_Map_Key_ScanLevel.set(scanEntry.level, 1);
                } else {
                    scanCount_Map_Key_ScanLevel.set(scanEntry.level, scanCount + 1);
                }
            }
        }
    }

    return  dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_DataForSingleSearchScanFileId;
}