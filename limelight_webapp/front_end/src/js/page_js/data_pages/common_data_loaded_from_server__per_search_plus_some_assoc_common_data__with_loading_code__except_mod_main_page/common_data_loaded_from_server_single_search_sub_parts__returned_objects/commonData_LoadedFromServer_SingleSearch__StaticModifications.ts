/**
 * commonData_LoadedFromServer_SingleSearch__StaticModifications.ts
 *
 * For Single Project Search  -  StaticModifications
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder {

    private _staticMods : Array<{ residue: string, mass : number }>;

    constructor(
        {
            staticMods
        } : {
            staticMods : Array<{ residue: string, mass : number }>
        }
    ) {
        this._staticMods = staticMods;
    }

    /**
     *
     */
    get_StaticMods() {
        return this._staticMods;
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult {

    staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _get_StaticModsHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult

    private _promise_Load_StaticMods_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult>

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
        return new CommonData_LoadedFromServer_SingleSearch__StaticModifications({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_StaticModsHolder_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult> {

        const result = this.get_StaticModsHolder();

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_StaticModsHolder():
        {
            data: CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult>
        } {

        if (this._get_StaticModsHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_StaticModsHolder__FunctionResult,
                promise: undefined
            };
        }

        return {
            data: undefined,
            promise: this._load_StaticMods_Data()
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_StaticMods_Data() : Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult> {
        try {
            if ( this._promise_Load_StaticMods_Data_InProgress ) {

                return this._promise_Load_StaticMods_Data_InProgress;
            }

            this._promise_Load_StaticMods_Data_InProgress = new Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications__get_StaticModsHolder__FunctionResult>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        projectSearchId : this._projectSearchId
                    };

                    console.log("AJAX Call to get Static Mods List START, Now: " + new Date() );

                    const url = "d/rws/for-page/psb/static-mods-single-project-search-id";

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                        console.log("AJAX Call to get Static Mods List END, Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData });
                        resolve( this._get_StaticModsHolder__FunctionResult );

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._promise_Load_StaticMods_Data_InProgress.catch( reason => {
                this._promise_Load_StaticMods_Data_InProgress = undefined;
            });
            this._promise_Load_StaticMods_Data_InProgress.then( valueIgnored => {
                this._promise_Load_StaticMods_Data_InProgress = undefined;
            })

            return this._promise_Load_StaticMods_Data_InProgress;

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

        const staticModsList_FromWebservice = responseData.staticModsList;

        if ( ! ( staticModsList_FromWebservice instanceof  Array ) ) {
            const msg = "staticModsList_FromWebservice is not an Array";
            console.warn( msg + ". staticModsList_FromWebservice: ", staticModsList_FromWebservice )
            throw Error(msg);
        }

        const staticModsList : Array<{ residue: string, mass : number }> = [];

        //  Validate each entry is a number

        for ( const entry of staticModsList_FromWebservice ) {
            const residue = entry.residue;
            const mass = entry.mass;

            if ( residue === undefined || residue === null ) {
                const msg = "entry.residue in staticModsList is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", staticModsList: ", staticModsList )
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( residue ) ) {
                const msg = "entry.residue in staticModsList is not a string. ";
                console.warn( msg + "entry: " + entry + ", staticModsList: ", staticModsList )
                throw Error(msg);
            }
            if ( mass === undefined || mass === null ) {
                const msg = "entry.mass in staticModsList is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", staticModsList: ", staticModsList )
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( mass ) ) {
                const msg = "entry.mass in staticModsList is not a number. ";
                console.warn( msg + "entry: " + entry + ", staticModsList: ", staticModsList )
                throw Error(msg);
            }

            const staticModsList_Entry = { residue, mass };

            staticModsList.push( staticModsList_Entry );
        }

        const staticMods_Holder = new CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder({ staticMods: staticModsList });

        this._get_StaticModsHolder__FunctionResult = {
            staticMods_Holder
        }
    }

}