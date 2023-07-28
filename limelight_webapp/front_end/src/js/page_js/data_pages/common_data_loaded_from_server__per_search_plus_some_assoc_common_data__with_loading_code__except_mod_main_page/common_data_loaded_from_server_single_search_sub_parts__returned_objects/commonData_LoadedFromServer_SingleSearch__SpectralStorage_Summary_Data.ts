/**
 * commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data.ts
 *
 * For Single Project Search  -  SpectralStorage Summary Data
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId {

    readonly searchScanFileId: number;
 
    readonly scanLevelEntries: ReadonlyArray<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId_SingleScanLevel>
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId_SingleScanLevel {

    readonly scanLevel: number
    readonly numberOfScans: number
    readonly totalIonCurrent: number
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder {

    private _spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId = new Map<number, CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId>()

    /**
     *
     * @param searchScanFileId
     */
    get_SpectralStorage_Summary_Data_For_SearchScanFileId( searchScanFileId: number ) {
        return this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     * !!!  For Use Only within the TS file this class is in
     * @param entry
     */
    InternalUse__InsertEntry( entry: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId ) {

        this._spectralStorageData_PerSearchScanFileId_Map_Key_SearchScanFileId.set( entry.searchScanFileId, entry )
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder__FunctionResult {

    commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder
}

/**
 *  !!!!!!  MAIN CLASS  !!!!!!!!
 */
export class CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder

    private _promise_LoadingInProgress_Map_Key_SearchScanFileId: Map<number, Promise<void>> = new Map()

    /**
     *
     * @param projectSearchId
     */
    private constructor(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        this._projectSearchId = projectSearchId;

        this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder = new CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder()
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for searchScanFileId
     */
    get_SpectralStorage_Summary_DataHolder_For_SearchScanFileId_ReturnPromise(searchScanFileId: number): Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder__FunctionResult> {
        try {
            const result = this.get_SpectralStorage_Summary_DataHolder_For_SearchScanFileId(searchScanFileId);

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch (e) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }


    /**
     * Get all for search for main filters
     */
    get_SpectralStorage_Summary_DataHolder_For_SearchScanFileId(searchScanFileId: number):
        {
            data: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder__FunctionResult>
        } {

    // private _commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder
    //
    // private _promise_LoadingInProgress_Map_Key_SearchScanFileId: Map<number, Promise<void>> = new Map()

        if (this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder.get_SpectralStorage_Summary_Data_For_SearchScanFileId(searchScanFileId) ) {

            //  Have loaded data so just return it
            return {
                data: {
                    commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder: this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder
                },
                promise: undefined
            };
        }

        let promise_LoadingInProgress_For_SearchScanFileId = this._promise_LoadingInProgress_Map_Key_SearchScanFileId.get(searchScanFileId)

        if ( ! promise_LoadingInProgress_For_SearchScanFileId ) {
            promise_LoadingInProgress_For_SearchScanFileId = this._loadData_For_SearchScanFileId(searchScanFileId)
            this._promise_LoadingInProgress_Map_Key_SearchScanFileId.set(searchScanFileId, promise_LoadingInProgress_For_SearchScanFileId)
        }

        return {data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder__FunctionResult>((resolve, reject) => { try {
                promise_LoadingInProgress_For_SearchScanFileId.catch(reason => reject(reason))
                promise_LoadingInProgress_For_SearchScanFileId.then(novalue => { try {

                    resolve({ commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder: this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder })

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        };
    }

    /**
     *
     * @param searchScanFileId
     */
    private _loadData_For_SearchScanFileId(searchScanFileId: number) : Promise<void> {

        return new Promise<void>((resolve, reject) => { try {

            const requestObject = {
                projectSearchId: this._projectSearchId, searchScanFileId
            };
            const url = "d/rws/for-page/psb/scan-file-summary-data-from-spectral-storage-data--search-scan-file-id-single-project-search-id";

            console.log("START: getting data from URL: " + url);

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObject, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch(() => {
                this._promise_LoadingInProgress_Map_Key_SearchScanFileId.delete(searchScanFileId)
                reject()
            });

            promise_webserviceCallStandardPost.then(({responseData}: { responseData: any }) => { try {

                this._promise_LoadingInProgress_Map_Key_SearchScanFileId.delete(searchScanFileId)

                console.log("END: REJECTED: getting data from URL: " + url);

                this._process_WebserviceResponse({responseData});

                resolve();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({responseData}: { responseData: any }): void {

        const spectralStorage_Summary_DataFor_SingleSearchScanFileId: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_DataFor_SingleSearchScanFileId = responseData

        if ( spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId === undefined || spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId === null ) {
            const msg = "( spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId === undefined || spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId ) ) {
            const msg = "( ! variable_is_type_number_Check( spectralStorage_Summary_DataFor_SingleSearchScanFileId.searchScanFileId ) )";
            console.warn(msg);
            throw Error(msg);
        }

        if ( spectralStorage_Summary_DataFor_SingleSearchScanFileId.scanLevelEntries ) {
            if ( ! ( spectralStorage_Summary_DataFor_SingleSearchScanFileId.scanLevelEntries instanceof Array ) ) {
                const msg = "( ! ( spectralStorage_Summary_DataFor_SingleSearchScanFileId.scanLevelEntries instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }

            for ( const scanLevelEntry of spectralStorage_Summary_DataFor_SingleSearchScanFileId.scanLevelEntries ) {

                if ( scanLevelEntry.scanLevel === undefined || scanLevelEntry.scanLevel === null ) {
                    const msg = "( scanLevelEntry.scanLevel === undefined || scanLevelEntry.scanLevel === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( scanLevelEntry.scanLevel ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanLevelEntry.scanLevel ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanLevelEntry.numberOfScans === undefined || scanLevelEntry.numberOfScans === null ) {
                    const msg = "( scanLevelEntry.numberOfScans === undefined || scanLevelEntry.numberOfScans === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( scanLevelEntry.numberOfScans ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.numberOfScans ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanLevelEntry.totalIonCurrent === undefined || scanLevelEntry.totalIonCurrent === null ) {
                    const msg = "( scanLevelEntry.totalIonCurrent === undefined || scanLevelEntry.totalIonCurrent === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( scanLevelEntry.totalIonCurrent ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.totalIonCurrent ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_Summary_Data_Holder.InternalUse__InsertEntry(spectralStorage_Summary_DataFor_SingleSearchScanFileId)
    }
}