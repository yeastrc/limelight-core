/**
 * commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries.ts
 *
 * For Single Project Search  -  GoldStandard FileContents Entries
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
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder {

    private _goldStandard_FileContents_Entry_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id : Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry> = new Map()

    constructor() { }

    INTERNAL__AddEntry( entry : CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry ) {
        this._goldStandard_FileContents_Entry_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.set( entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, entry )
    }

    /**
     *
     */
    get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id : number ) {
        return this._goldStandard_FileContents_Entry_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry {

    readonly gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number;

    readonly goldStandard_File_Entries: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry>;
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry {

    readonly scanNumber: number;
    readonly peptideSequence: string;

    readonly modification: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification {

    readonly entries: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry>;
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry {

    readonly modificationMass: number;
    readonly positionList: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry>;
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry {

    position: number
    position_Is_n: boolean
    position_Is_c: boolean
    //  OR
    position_Range_Start: number
    position_Range_End: number
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries__get_GoldStandard_FileContents_EntriesHolder__FunctionResult {

    goldStandard_FileContents_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //

    private _goldStandard_FileContents_EntriesHolder = new CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries_Holder()

    private _promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: Map<number, Promise<void>> = new Map()

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_FileContents
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
     * @param searchDataLookupParameters_FileContents
     */
    static getNewInstance(
        {
            projectSearchId
        }: {
            projectSearchId: number
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries({
            projectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     */
    get_GoldStandard_FileContents_EntriesHolder_ReturnPromise(
        {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        } : {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
        }
    ): Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries__get_GoldStandard_FileContents_EntriesHolder__FunctionResult> {

        const result = this.get_GoldStandard_FileContents_EntriesHolder({ gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id });

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }


    /**
     * 
     */
    get_GoldStandard_FileContents_EntriesHolder(
        {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        } : {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
        }
        ):
        {
            data: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries__get_GoldStandard_FileContents_EntriesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries__get_GoldStandard_FileContents_EntriesHolder__FunctionResult>
        } {

        if ( this._goldStandard_FileContents_EntriesHolder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) ) {

            //  Have loaded data so just return it
            return {
                promise: undefined, data: { goldStandard_FileContents_Entries_Holder: this._goldStandard_FileContents_EntriesHolder }
            }
        }

        {
            if ( ! this._promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.has( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) ) {
                const promise = this._load_GoldStandard_FileContents_Entries_Data({ gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id })
                this._promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.set( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, promise )
            }
        }

        {
            const promise = this._promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id );

            if ( ! promise ) {
                const msg = "Invalid to NOT have promise here"
                console.warn(msg)
                throw Error(msg)
            }

            return {
                data: undefined, promise: new Promise<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries__get_GoldStandard_FileContents_EntriesHolder__FunctionResult>((resolve, reject) => { try {

                    promise.catch(reason => { reject(reason)})
                    promise.then(novalue => { try {

                        resolve( { goldStandard_FileContents_Entries_Holder: this._goldStandard_FileContents_EntriesHolder } )

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        }
    }

    /**
     * Get Data For Mapping Id
     *
     */
    private _load_GoldStandard_FileContents_Entries_Data(
        {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        } : {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
        }
    ) : Promise<void> {
        try {
              const promise = new Promise<void>(
                ( resolve, reject ) => { try {
                    const requestObject = {
                        gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                    };

                    const url = "d/rws/for-page/scan-file-gold-standard-root-file-contents-for-id";

                    console.log("START:  AJAX Call to get " + url + ", Now: " + new Date() );

                    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url, dataRetrieval_CanRetry: true }) ;

                    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                    promise_webserviceCallStandardPost.catch( () => { reject() }  );

                    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {

                        console.log("END:  AJAX Call to get " + url + ", Now: " + new Date() );

                        this._process_WebserviceResponse({ responseData, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id });
                        resolve();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            promise.catch( reason => {
                this._promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.delete( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )
            });
            promise.then( valueIgnored => {
                this._promise_Map_Key__gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.delete( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )
            })

            return promise;

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
    private _process_WebserviceResponse(
        {
            responseData, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        }: {
            responseData: INTERNAL_FromServer__GoldStandard_Data_Root_Data_JSON_V001
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
        }) : void {

        if ( responseData.versionNumber !== 1 ) {
            const msg = "responseData.versionNumber is NOT 1, is: " + responseData.versionNumber;
            console.warn(msg)
            throw Error(msg)
        }
        if ( responseData.singleEntry_List === undefined || responseData.singleEntry_List === null ) {
            const msg = "responseData.singleEntry_List is undefined or null. ";
            console.warn( msg + ". responseData.singleEntry_List: ", responseData.singleEntry_List )
            throw Error(msg);
        }
        if ( ! ( responseData.singleEntry_List instanceof  Array ) ) {
            const msg = "responseData.singleEntry_List is not an Array";
            console.warn( msg + ". responseData.singleEntry_List: ", responseData.singleEntry_List )
            throw Error(msg);
        }


        const scanNumbers_Unique_Set: Set<number> = new Set()

        const goldStandard_FileContents_EntriesList : Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry> = [];

        //  Process each entry

        for ( const entry_FromServer of responseData.singleEntry_List ) {

            let modification: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification = undefined

            if ( entry_FromServer.m ) {
                //  Have Variable and Open Mods, combined

                modification = this._processSingle_Variable_AND_Open_Modification_Combined( entry_FromServer.m )
            }

            const entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Entry = {

                scanNumber: entry_FromServer.sn,
                peptideSequence: entry_FromServer.ps,

                modification
            }

            if ( entry.scanNumber === undefined || entry.scanNumber === null ) {
                const msg = "entry.scanNumber is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", entry_FromServer: " + entry_FromServer + ", responseData.singleEntry_List: ", responseData.singleEntry_List )
                throw Error(msg);
            }
            if ( ! limelight__variable_is_type_number_Check( entry.scanNumber ) ) {
                const msg = "entry.scanNumber in responseData.singleEntry_List is not a number. ";
                console.warn( msg + "entry: " + entry + ", responseData.singleEntry_List: ", responseData.singleEntry_List )
                throw Error(msg);
            }
            if ( entry.peptideSequence === undefined || entry.peptideSequence === null ) {
                const msg = "entry.peptideSequence is undefined or null. ";
                console.warn( msg + "entry: " + entry + ", entry_FromServer: " + entry_FromServer + ", responseData.singleEntry_List: ", responseData.singleEntry_List )
                throw Error(msg);
            }
            if ( ! limelight__IsVariableAString( entry.peptideSequence ) ) {
                const msg = "entry.peptideSequence in responseData.singleEntry_List is not a string. ";
                console.warn( msg + "entry: " + entry + ", result_List: ", responseData.singleEntry_List )
                throw Error(msg);
            }

            goldStandard_FileContents_EntriesList.push(entry)

            //  WARNING: If remove this duplicate check, other code needs changing that assumes the records have unique scan number

            {
                if ( scanNumbers_Unique_Set.has( entry.scanNumber ) ) {
                    const msg = "entry.scanNumber in responseData.singleEntry_List is duplicate scan number. entry.scanNumber: " + entry.scanNumber;
                    console.warn( msg + "entry: " + entry + ", responseData.singleEntry_List: ", responseData.singleEntry_List )
                    throw Error( msg );
                }

                scanNumbers_Unique_Set.add( entry.scanNumber )
            }
        }

        const entry : CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry = {
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
            goldStandard_File_Entries: goldStandard_FileContents_EntriesList
        }

        this._goldStandard_FileContents_EntriesHolder.INTERNAL__AddEntry( entry )
    }

    /**
     *
     * @param variable_OR_OpenMod_FromServer
     */
    private _processSingle_Variable_AND_Open_Modification_Combined( variable_OR_OpenMod_FromServer: INTERNAL_FromServer__GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 ) : CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification {

        if ( ( ! variable_OR_OpenMod_FromServer ) || ( ! variable_OR_OpenMod_FromServer.e ) || ( ! Array.isArray( variable_OR_OpenMod_FromServer.e ) ) || ( ! ( variable_OR_OpenMod_FromServer.e.length > 0 ) ) ) {

            return undefined // EARLY RETURN
        }

        if ( variable_OR_OpenMod_FromServer && variable_OR_OpenMod_FromServer.e && Array.isArray( variable_OR_OpenMod_FromServer.e ) && variable_OR_OpenMod_FromServer.e.length > 0 ) {

            const entries: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry> = []

            for ( const entry_Variable_OR_OpenMod_FromServer of variable_OR_OpenMod_FromServer.e ) {

                let positionList: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry> = []

                if ( entry_Variable_OR_OpenMod_FromServer.pln && Array.isArray( entry_Variable_OR_OpenMod_FromServer.pln ) && entry_Variable_OR_OpenMod_FromServer.pln.length > 0 ) {

                    for ( const positionNumber_FromServer of entry_Variable_OR_OpenMod_FromServer.pln ) {

                        const position: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry = {
                            position: positionNumber_FromServer,
                            position_Is_n: undefined,
                            position_Is_c: undefined,
                            position_Range_Start: undefined,
                            position_Range_End: undefined
                        }

                        if ( position.position === undefined || position.position === null ) {
                            const msg = "position.position is undefined or null. ";
                            console.warn( msg + "entry: " + position + ", positionNumber_FromServer: " + positionNumber_FromServer + ", entry_Variable_OR_OpenMod_FromServer: " + entry_Variable_OR_OpenMod_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                            throw Error(msg);
                        }
                        if ( ! limelight__variable_is_type_number_Check( position.position ) ) {
                            const msg = "position.position in variable_OR_OpenMod_FromServer.e is not a number. ";
                            console.warn( msg + "position: " + position + ", positionNumber_FromServer: " + positionNumber_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                            throw Error(msg);
                        }

                        positionList.push( position )
                    }
                }

                if ( entry_Variable_OR_OpenMod_FromServer.pl && Array.isArray( entry_Variable_OR_OpenMod_FromServer.pl ) && entry_Variable_OR_OpenMod_FromServer.pl.length > 0 ) {

                    for ( const position_FromServer of entry_Variable_OR_OpenMod_FromServer.pl ) {

                        if ( position_FromServer.ps !== undefined && position_FromServer.ps !== null &&
                            position_FromServer.pe !== undefined && position_FromServer.pe !== null ) {

                            //  YES have Position Range Start and End

                            const position: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry = {
                                position_Range_Start: position_FromServer.ps,
                                position_Range_End: position_FromServer.pe,
                                position: undefined,
                                position_Is_n: undefined,
                                position_Is_c: undefined
                            }

                            if ( ! limelight__variable_is_type_number_Check( position.position_Range_Start ) ) {
                                const msg = "position.position_Range_Start in position_FromServer is not a number. ";
                                console.warn( msg + "position: " + position + ", position_FromServer: " + position_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                                throw Error(msg);
                            }
                            if ( ! limelight__variable_is_type_number_Check( position.position_Range_End ) ) {
                                const msg = "position.position_Range_End in position_FromServer is not a number. ";
                                console.warn( msg + "position: " + position + ", position_FromServer: " + position_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                                throw Error(msg);
                            }

                            positionList.push( position )

                        } else {
                            //  NO Position Range Start AND End

                            const position: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Position_Entry = {
                                position: position_FromServer.p,
                                position_Is_n: position_FromServer.pn,
                                position_Is_c: position_FromServer.pc,
                                position_Range_Start: undefined,
                                position_Range_End: undefined
                            }

                            if ( position.position === undefined || position.position === null ) {
                                const msg = "position.position is undefined or null. ";
                                console.warn( msg + "entry: " + position + ", position_FromServer: " + position_FromServer + ", entry_Variable_OR_OpenMod_FromServer: " + entry_Variable_OR_OpenMod_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                                throw Error(msg);
                            }
                            if ( ! limelight__variable_is_type_number_Check( position.position ) ) {
                                const msg = "position.position in position_FromServer is not a number. ";
                                console.warn( msg + "position: " + position + ", position_FromServer: " + position_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                                throw Error(msg);
                            }

                            positionList.push( position )
                        }

                    }
                }

                if ( positionList.length === 0 ) {
                    positionList = undefined
                }

                const entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification_Entry = {
                    modificationMass: entry_Variable_OR_OpenMod_FromServer.m,
                    positionList
                }

                if ( entry.modificationMass === undefined || entry.modificationMass === null ) {
                    const msg = "entry.modificationMass is undefined or null. ";
                    console.warn( msg + "entry: " + entry + ", entry_Variable_OR_OpenMod_FromServer: " + entry_Variable_OR_OpenMod_FromServer + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                    throw Error(msg);
                }
                if ( ! limelight__variable_is_type_number_Check( entry.modificationMass ) ) {
                    const msg = "entry.modificationMass in variable_OR_OpenMod_FromServer.e is not a number. ";
                    console.warn( msg + "entry: " + entry + ", variable_OR_OpenMod_FromServer.e: ", variable_OR_OpenMod_FromServer.e )
                    throw Error(msg);
                }

                entries.push(entry)
            }

            if ( entries.length > 0 ) {

                const result: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents__Single_GoldStandard_File_Variable_Open_Modification = {

                    entries
                }

                return result; // EARLY RETURN
            }
        }

        return undefined;
    }

}




const INTERNAL_FromServer__GoldStandard_Data_Root_Data_JSON_V001__VERSION_NUMBER = 1;

/**
 *
 * Use short property names to generate small JSON
 *
 */
class INTERNAL_FromServer__GoldStandard_Data_Root_Data_JSON_V001 {

    versionNumber: number;
    singleEntry_List: Array<INTERNAL_FromServer__GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001> ;
}

/**
 * For Single Entry - Single Line in Gold Standard Import
 *
 */
class INTERNAL_FromServer__GoldStandard_ScanNumber_PeptideSequence_Variable_Open_Modification_Root_Data_JSON_V001 {

    sn: number;      //  Scan Number
    ps: string;   //  Peptide Sequence

    m: INTERNAL_FromServer__GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001; //  Variable and Open Mods, combined
}


/**
 * For Variable AND Open Modifications, Combined
 *
 */
class INTERNAL_FromServer__GoldStandard_Variable_AND_Open_Modification_Root_Data_JSON_V001 {

    e: Array<INTERNAL_FromServer__GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001> ; // Entries
}

class INTERNAL_FromServer__GoldStandard_Variable_Open_Modification_Data_JSON_SingleModificationAndPositions_V001 {

    m: number;

    pln: Array<number>;  //  Position List of Numbers.  For positions that are a single number (No Range or 'n' or 'c' or 'u')
    pl: Array<INTERNAL_FromServer__GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001> ; // Position List
}


/**
 * Position Entry - Used when position entry is other than single number
 *
 */
class INTERNAL_FromServer__GoldStandard_Variable_Open_Modification_Data_JSON_PositionEntry_V001 {


    //  NOT all of the following will always be populated

    p: number; // position
     pn: boolean; // position - is n term
    pc: boolean; // position - is c term
    //  OR
    ps: number; // Position Range Start
    pe: number; // Position Range End


    //  Server

    //  NOT all of the following will always be populated

    // private Integer p; // position
    // private Boolean pn; // position - is n term
    // private Boolean pc; // position - is c term
    // //  OR
    // private Integer ps; // Position Range Start
    // private Integer pe; // Position Range End

}