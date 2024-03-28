/**
 * commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries.ts
 *
 * For Single Project Search  -  FeatureDetection Root Entries
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder {

    private _featureDetection_Root_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry>;

    constructor(
        {
            featureDetection_Root_Entries
        } : {
            featureDetection_Root_Entries : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry>
        }
    ) {
        this._featureDetection_Root_Entries = featureDetection_Root_Entries;
    }

    /**
     *
     */
    get_FeatureDetection_Root_Entries() {
        return this._featureDetection_Root_Entries;
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry {

    readonly feature_detection_root__project_scnfl_mapping_tbl__id: number;
    readonly project_scan_file_id: number;

    readonly displayLabel: string;
    readonly description: string;

    readonly searchScanFileEntries: Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root__Single_SearchScanFile_Entry>; // from search_scan_file_tbl
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root__Single_SearchScanFile_Entry {  // from search_scan_file_tbl

    readonly searchScanFileId: number;
    readonly searchScanFilename: string;
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult {

    featureDetection_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _get_FeatureDetection_Root_EntriesHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult

    private _promise_Load_FeatureDetection_Root_Entries_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        this._projectSearchId = projectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_FeatureDetection_Root_EntriesHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult> {

        const result = this.get_FeatureDetection_Root_EntriesHolder();

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_FeatureDetection_Root_EntriesHolder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult>
        } {

        if (this._get_FeatureDetection_Root_EntriesHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_FeatureDetection_Root_EntriesHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_FeatureDetection_Root_Entries_Data()
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FeatureDetection_Root_Entries_Data() : Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult> {
        try {
            if ( this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress ) {

                return this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress;
            }

            this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries__get_FeatureDetection_Root_EntriesHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId
                    };

                    const url = "d/rws/for-page/scan-file-feature-detection-root-entries-single-project-search-id";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_FeatureDetection_Root_EntriesHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress.catch( reason => {
                this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress = undefined;
            });
            this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress.then( valueIgnored => {
                this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress = undefined;
            })

            return this._promise_Load_FeatureDetection_Root_Entries_Data_InProgress;

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     * @param responseData
     * @private
     */
    private _process_WebserviceResponse({ responseData }: { responseData: any }) : void {

        const result_List = responseData.result_List;

        if ( result_List === undefined || result_List === null ) {
            const msg = "result_List is undefined or null. ";
            console.warn( msg + ". result_List: ", result_List )
            throw Error(msg);
        }
        if ( ! ( result_List instanceof  Array ) ) {
            const msg = "result_List is not an Array";
            console.warn( msg + ". featureDetection_Root_EntriesList_FromWebservice: ", result_List )
            throw Error(msg);
        }

        const featureDetection_Root_EntriesList : Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry> = [];

        //  Validate each entry is a number

        for ( const result_Entry of result_List ) {

            const entry = result_Entry as CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry;

            if ( entry.feature_detection_root__project_scnfl_mapping_tbl__id === undefined || entry.feature_detection_root__project_scnfl_mapping_tbl__id === null ) {
                const msg = "entry.feature_detection_root__project_scnfl_mapping_tbl__id is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
                const msg = "entry.feature_detection_root__project_scnfl_mapping_tbl__id in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.project_scan_file_id === undefined || entry.project_scan_file_id === null ) {
                const msg = "entry.project_scan_file_id is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.project_scan_file_id ) ) {
                const msg = "entry.project_scan_file_id in result_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.displayLabel === undefined || entry.displayLabel === null ) {
                const msg = "entry.displayLabel is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( entry.displayLabel ) ) {
                const msg = "entry.displayLabel in result_List is not a string. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( entry.description === undefined || entry.description === null ) {
                const msg = "entry.description is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( entry.description ) ) {
                const msg = "entry.description in result_List is not a string. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", result_List )
                throw Error(msg);
            }

            if ( entry.searchScanFileEntries === undefined || entry.searchScanFileEntries === null ) {
                const msg = "entry.searchScanFileEntries is undefined or null. ";
                console.warn( msg + ". result_List: ", result_List )
                throw Error(msg);
            }
            if ( ! ( entry.searchScanFileEntries instanceof  Array ) ) {
                const msg = "entry.searchScanFileEntries is not an Array";
                console.warn( msg + ". featureDetection_Root_EntriesList_FromWebservice: ", result_List )
                throw Error(msg);
            }

            for ( const searchScanFileEntry of entry.searchScanFileEntries ) {

                if ( searchScanFileEntry.searchScanFileId === undefined || searchScanFileEntry.searchScanFileId === null ) {
                    const msg = "searchScanFileEntry.searchScanFileId is undefined or null. ";
                    console.warn( msg + "searchScanFileEntry: " + searchScanFileEntry + ", result_List: ", result_List )
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( searchScanFileEntry.searchScanFileId ) ) {
                    const msg = "searchScanFileEntry.searchScanFileId in entry.searchScanFileEntries is not a number. ";
                    console.warn( msg + "searchScanFileEntry: " + searchScanFileEntry + ", result_List: ", result_List )
                    throw Error(msg);
                }

                if (!limelight__IsVariableAString(searchScanFileEntry.searchScanFilename)) {
                    const msg = "searchScanFileEntry.searchScanFilename in entry.searchScanFileEntries is not a string. ";
                    console.warn(msg + "entry: " + entry + ", result_List: ", result_List)
                    throw Error(msg);
                }
            }

            //  Sort
            entry.searchScanFileEntries.sort((a,b) => {
                return a.searchScanFilename.localeCompare( b.searchScanFilename );
            })

            featureDetection_Root_EntriesList.push( entry );
        }

        //  Sort

        featureDetection_Root_EntriesList.sort((a,b) => {
            return a.displayLabel.localeCompare( b.displayLabel );
        })

        const featureDetection_Root_Entries_Holder = new CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder({ featureDetection_Root_Entries: featureDetection_Root_EntriesList });

        this._get_FeatureDetection_Root_EntriesHolder__FunctionResult = {
            featureDetection_Root_Entries_Holder
        }
    }

}