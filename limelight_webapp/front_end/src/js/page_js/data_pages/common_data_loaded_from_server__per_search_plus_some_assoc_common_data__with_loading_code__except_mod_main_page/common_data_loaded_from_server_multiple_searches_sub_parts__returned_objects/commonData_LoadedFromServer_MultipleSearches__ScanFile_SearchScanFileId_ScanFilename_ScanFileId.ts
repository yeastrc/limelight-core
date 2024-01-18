/**
 * commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId.ts
 *
 * For Single Project Search  -  Scan File Data Per Search
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import { limelight__IsVariableAString } from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder {

    private _searchScanFileData_PerSearch_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry> = new Map();

    constructor(
        {
            searchScanFileData_PerSearch_Map_Key_ProjectSearchId
        } : {
            searchScanFileData_PerSearch_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry>
        }
    ) {
        this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId = searchScanFileData_PerSearch_Map_Key_ProjectSearchId;
    }

    /**
     *
     */
    get_total_SearchScanFileCount() : number {

        let total_SearchScanFileCount = 0;

        for ( const searchScanFileData_PerSearch of this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values() ) {
            total_SearchScanFileCount += searchScanFileData_PerSearch.get_SearchScanFileData_EntryCount();
        }

        return total_SearchScanFileCount;
    }

    /**
     *
     */
    get_All_SearchScanFileIds() : Set<number> {

        const all_SearchScanFileIds : Set<number> = new Set()

        for ( const searchScanFileData_PerSearch of this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values() ) {
            for ( const searchScanFileData_Entry of searchScanFileData_PerSearch.get_SearchScanFileData_IterableIterator() ) {
                all_SearchScanFileIds.add( searchScanFileData_Entry.searchScanFileId )
            }
        }

        return all_SearchScanFileIds;
    }

    /**
     *
     * @param projectSearchId
     */
    get_For_ProjectSearchId( projectSearchId: number ) {
        return this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    /**
     *
     */
    get_All_IterableIterator() {
        return this._searchScanFileData_PerSearch_Map_Key_ProjectSearchId.values();
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry {

    readonly projectSearchId: number;
    readonly searchId: number;
    private _searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>
    private _searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE: Array<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>;

    constructor(
        {
            projectSearchId, searchId, searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId
        } : {
            projectSearchId: number
            searchId: number
            searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>
        }
    ) {
        this.projectSearchId = projectSearchId
        this.searchId = searchId;
        this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId = searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId
    }

    /**
     *
     */
    get_SearchScanFileDataFor_SearchScanFileId(searchScanFileId: number) {
        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.get(searchScanFileId);
    }

    /**
     *
     */
    get_SearchScanFileData_EntryCount() : number {
        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.size;
    }

    /**
     *
     */
    get_SearchScanFileData_IterableIterator() {

        return this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.values();
    }

    get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename() {

        if ( this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE !== undefined && this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE !== null ) {
            return this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE;
        }
        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE = [];

        for ( const item of this._searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.values() ) {
            this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE.push(item);
        }
        this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE.sort( (a,b) => {
            return a.filename.localeCompare( b.filename );
        });

        return this._searchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename__CACHE;
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry{

    readonly searchScanFileId: number;
    readonly projectSearchId: number;
    readonly searchId: number;
    readonly filename: string;
    readonly scanFileId: number;  // Only Populated when Scan File is imported
}

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

/**
 *
 */
export class CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult {

    scanFileData_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>;

    //

    private _get_ScanFileDataHolder__FunctionResult: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult

    private _promise_Load_ScanFileData_Data_InProgress: Promise<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult>

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
        return new CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId({
            projectSearchIds
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_ScanFileDataHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult> {

        const result = this.get_ScanFileDataHolder();

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_ScanFileDataHolder():
        {
            data: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult>
        } {

        if (this._get_ScanFileDataHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ScanFileDataHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_ScanFileData_Data()
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_ScanFileData_Data() : Promise<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult> {
        try {
            if ( this._promise_Load_ScanFileData_Data_InProgress ) {

                return this._promise_Load_ScanFileData_Data_InProgress;
            }

            this._promise_Load_ScanFileData_Data_InProgress = new Promise<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId__get_ScanFileDataHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchIdList : this._projectSearchIds
                    };

                    const url = "d/rws/for-page/psb/get-search-scan-file-data-for-project-search-id-list";

                    console.log("AJAX Call START, Now: " + new Date() + " URL: " + url );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("AJAX Call END, Now: " + new Date() + " URL: " + url );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_ScanFileDataHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_ScanFileData_Data_InProgress.catch( reason => {
                this._promise_Load_ScanFileData_Data_InProgress = undefined;
            });
            this._promise_Load_ScanFileData_Data_InProgress.then( valueIgnored => {
                this._promise_Load_ScanFileData_Data_InProgress = undefined;
            })

            return this._promise_Load_ScanFileData_Data_InProgress;

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

        const scanFileData_List_FromWebservice = responseData.scanFilenameEntries;

        if ( ! ( scanFileData_List_FromWebservice instanceof  Array ) ) {
            const msg = "scanFileData_List_FromWebservice is not an Array";
            console.warn( msg + ". scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
            throw Error(msg);
        }

        const projectSearchIds_For_DoAllHaveData_Set = new Set( this._projectSearchIds );

        const scanFileData_ForSingleSearch_Map_Key_ProjectSearchId: Map<number, INTERNAL__SingleSearch_Entry> = new Map();

        //  Validate each entry is a number

        for ( const entry_InList of scanFileData_List_FromWebservice ) {

            const entry = entry_InList as CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry;

            if ( entry.searchId === undefined || entry.searchId === null ) {
                const msg = "entry.searchId in scanFileData_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.searchId ) ) {
                const msg = "entry.searchId in scanFileData_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }
            if ( entry.projectSearchId === undefined || entry.projectSearchId === null ) {
                const msg = "entry.projectSearchId in scanFileData_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.projectSearchId ) ) {
                const msg = "entry.projectSearchId in scanFileData_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.searchScanFileId === undefined || entry.searchScanFileId === null ) {
                const msg = "entry.searchScanFileId in scanFileData_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( entry.searchScanFileId ) ) {
                const msg = "entry.searchScanFileId in scanFileData_List_FromWebservice is not a number. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.filename === undefined || entry.filename === null ) {
                const msg = "entry.filename in scanFileData_List_FromWebservice is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( entry.filename ) ) {
                const msg = "entry.filename in scanFileData_List_FromWebservice is not a string. ";
                console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                throw Error(msg);
            }

            if ( entry.scanFileId !== undefined && entry.scanFileId !== null ) {
                if ( ! variable_is_type_number_Check( entry.scanFileId ) ) {
                    const msg = "entry.scanFileId in scanFileData_List_FromWebservice is not undefined or null and is not a number. ";
                    console.warn( msg + "entry: " + entry + ", scanFileData_List_FromWebservice: ", scanFileData_List_FromWebservice )
                    throw Error( msg );
                }
            }

            let scanFileData_ForSingleSearch = scanFileData_ForSingleSearch_Map_Key_ProjectSearchId.get( entry.projectSearchId )
            if ( ! scanFileData_ForSingleSearch ) {
                scanFileData_ForSingleSearch = {
                    projectSearchId: entry.projectSearchId,
                    searchId: entry.searchId,
                    searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: new Map()
                }
                scanFileData_ForSingleSearch_Map_Key_ProjectSearchId.set( entry.projectSearchId, scanFileData_ForSingleSearch )
            }

            scanFileData_ForSingleSearch.searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId.set( entry.searchScanFileId, entry )

            projectSearchIds_For_DoAllHaveData_Set.delete( entry.projectSearchId );
        }

        let have_ScanFileData_For_ALL_ProjectSearchIds = true;

        if ( projectSearchIds_For_DoAllHaveData_Set.size > 0 ) {  //  Deleted each entry in set that have data for
            have_ScanFileData_For_ALL_ProjectSearchIds = false;
        }

        // let have_ScanFileData_For_ANY_ProjectSearchIds = false;
        // if ( scanFileData_Map_Key_SearchId.size > 0 ) {
        //     have_ScanFileData_For_ANY_ProjectSearchIds = true;
        // }

        const searchScanFileData_PerSearch_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry> = new Map();

        for ( const mapValue of scanFileData_ForSingleSearch_Map_Key_ProjectSearchId.values() ) {

            const saveEntry = new CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_Entry({
                projectSearchId: mapValue.projectSearchId,
                searchId: mapValue.searchId,
                searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: mapValue.searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId
            })
            searchScanFileData_PerSearch_Map_Key_ProjectSearchId.set( mapValue.projectSearchId, saveEntry )
        }

        const scanFileData_Holder = new CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder({
            searchScanFileData_PerSearch_Map_Key_ProjectSearchId
        });

        this._get_ScanFileDataHolder__FunctionResult = {
            scanFileData_Holder
        }
    }

}




/**
 *
 */
class INTERNAL__SingleSearch_Entry {

    readonly projectSearchId: number;
    readonly searchId: number;
    searchScanFileData_PerSearchScanFileId_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>
}