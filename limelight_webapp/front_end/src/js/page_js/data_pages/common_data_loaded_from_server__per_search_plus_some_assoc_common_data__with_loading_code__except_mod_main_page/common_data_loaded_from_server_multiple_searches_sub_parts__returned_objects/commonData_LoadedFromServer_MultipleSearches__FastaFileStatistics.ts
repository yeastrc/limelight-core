/**
 * commonData_LoadedFromServer_MultipleSearches__FastaFileStatistics.ts
 *
 * For Single Project Search  -  Fasta File Statistics
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";


export class CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry {

    readonly searchId: number;
    readonly projectSearchId: number;
    readonly numTargets: number;
    readonly numDecoys: number;
    readonly numIndependentDecoys: number;
}

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder {

    private _fastaFileStatistics_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry>
    private _fastaFileStatistics_Map_Key_SearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry>

    readonly have_FastaFileStatistics_For_ALL_ProjectSearchIds: boolean
    readonly have_FastaFileStatistics_For_ANY_ProjectSearchIds: boolean

    constructor(
        {
            fastaFileStatistics_Map_Key_ProjectSearchId, fastaFileStatistics_Map_Key_SearchId, have_FastaFileStatistics_For_ALL_ProjectSearchIds, have_FastaFileStatistics_For_ANY_ProjectSearchIds
        } : {
            fastaFileStatistics_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry>
            fastaFileStatistics_Map_Key_SearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry>
            have_FastaFileStatistics_For_ALL_ProjectSearchIds: boolean
            have_FastaFileStatistics_For_ANY_ProjectSearchIds: boolean
        }
    ) {
        this._fastaFileStatistics_Map_Key_ProjectSearchId = fastaFileStatistics_Map_Key_ProjectSearchId;
        this._fastaFileStatistics_Map_Key_SearchId = fastaFileStatistics_Map_Key_SearchId;
        this.have_FastaFileStatistics_For_ALL_ProjectSearchIds = have_FastaFileStatistics_For_ALL_ProjectSearchIds;
        this.have_FastaFileStatistics_For_ANY_ProjectSearchIds = have_FastaFileStatistics_For_ANY_ProjectSearchIds
    }

    /**
     *
     * @param projectSearchId
     */
    get_FastaFileStatistics_For_ProjectSearchId( projectSearchId: number ) {
        return this._fastaFileStatistics_Map_Key_ProjectSearchId.get(projectSearchId);
    }

    /**
     *
     * @param searchId
     */
    get_FastaFileStatistics_For_SearchId( searchId: number ) {
        return this._fastaFileStatistics_Map_Key_ProjectSearchId.get(searchId);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult {

    fastaFileStatistics_Holder: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>;

    //

    private _get_FastaFileStatisticsHolder__FunctionResult: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult

    private _promise_Load_FastaFileStatistics_Data_InProgress: Promise<CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchIds
        }: {
            projectSearchIds: Array<number>;
        }
    ) {
        this._projectSearchIds = projectSearchIds;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchIds
        }: {
            projectSearchIds: Array<number>;
        }
    ) {
        return new CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics({
            projectSearchIds
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_FastaFileStatisticsHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult> {

        const result = this.get_FastaFileStatisticsHolder();

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_FastaFileStatisticsHolder():
        {
            data: CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult>
        } {

        if (this._get_FastaFileStatisticsHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_FastaFileStatisticsHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_FastaFileStatistics_Data()
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_FastaFileStatistics_Data() : Promise<CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult> {
        try {
            if ( this._promise_Load_FastaFileStatistics_Data_InProgress ) {

                return this._promise_Load_FastaFileStatistics_Data_InProgress;
            }

            this._promise_Load_FastaFileStatistics_Data_InProgress = new Promise<CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics__get_FastaFileStatisticsHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchIds : this._projectSearchIds
                    };

                    console.log("AJAX Call to get FASTA File Statistics List START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/fasta-file-statistics-project-search-id-list";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get FASTA File Statistics List END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_FastaFileStatisticsHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_FastaFileStatistics_Data_InProgress.catch( reason => {
                this._promise_Load_FastaFileStatistics_Data_InProgress = undefined;
            });
            this._promise_Load_FastaFileStatistics_Data_InProgress.then( valueIgnored => {
                this._promise_Load_FastaFileStatistics_Data_InProgress = undefined;
            })

            return this._promise_Load_FastaFileStatistics_Data_InProgress;

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

        const fastaFileStatistics_List_FromWebservice = responseData.items;

        if ( ! ( fastaFileStatistics_List_FromWebservice instanceof  Array ) ) {
            const msg = "fastaFileStatistics_List_FromWebservice is not an Array";
            console.warn( msg + ". fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
            throw Error(msg);
        }

        const projectSearchIds_For_DoAllHaveData_Set = new Set( this._projectSearchIds );

        const fastaFileStatistics_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry> = new Map();
        const fastaFileStatistics_Map_Key_SearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry> = new Map();

        //  Validate each entry is a number

        for ( const entry_InList of fastaFileStatistics_List_FromWebservice ) {

            const entry = entry_InList as CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_SingleSearch_Entry;

            if ( entry.searchId === undefined || entry.searchId === null ) {
                const msg = "entry.searchId in fastaFileStatistics_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.searchId ) ) {
                const msg = "entry.searchId in fastaFileStatistics_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( entry.projectSearchId === undefined || entry.projectSearchId === null ) {
                const msg = "entry.projectSearchId in fastaFileStatistics_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.projectSearchId ) ) {
                const msg = "entry.projectSearchId in fastaFileStatistics_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.numTargets === undefined || entry.numTargets === null ) {
                const msg = "entry.numTargets in fastaFileStatistics_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.numTargets ) ) {
                const msg = "entry.numTargets in fastaFileStatistics_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.numDecoys === undefined || entry.numDecoys === null ) {
                const msg = "entry.numDecoys in fastaFileStatistics_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.numDecoys ) ) {
                const msg = "entry.numDecoys in fastaFileStatistics_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.numIndependentDecoys === undefined || entry.numIndependentDecoys === null ) {
                const msg = "entry.numIndependentDecoys in fastaFileStatistics_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.numIndependentDecoys ) ) {
                const msg = "entry.numIndependentDecoys in fastaFileStatistics_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", fastaFileStatistics_List_FromWebservice: ", fastaFileStatistics_List_FromWebservice )
                throw Error(msg);
            }

            fastaFileStatistics_Map_Key_SearchId.set( entry.searchId, entry );

            fastaFileStatistics_Map_Key_ProjectSearchId.set( entry.projectSearchId, entry );

            projectSearchIds_For_DoAllHaveData_Set.delete( entry.projectSearchId );
        }

        let have_FastaFileStatistics_For_ALL_ProjectSearchIds = true;

        if ( projectSearchIds_For_DoAllHaveData_Set.size > 0 ) {  //  Deleted each entry in set that have data for
            have_FastaFileStatistics_For_ALL_ProjectSearchIds = false;
        }

        let have_FastaFileStatistics_For_ANY_ProjectSearchIds = false;
        if ( fastaFileStatistics_Map_Key_SearchId.size > 0 ) {
            have_FastaFileStatistics_For_ANY_ProjectSearchIds = true;
        }

        const fastaFileStatistics_Holder = new CommonData_LoadedFromServer_MultipleSearches__FastaFileStatistics_Holder({
            fastaFileStatistics_Map_Key_SearchId,
            fastaFileStatistics_Map_Key_ProjectSearchId,
            have_FastaFileStatistics_For_ALL_ProjectSearchIds,
            have_FastaFileStatistics_For_ANY_ProjectSearchIds
        });

        this._get_FastaFileStatisticsHolder__FunctionResult = {
            fastaFileStatistics_Holder
        }
    }

}