/**
 * commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences.ts
 *
 * For Common Across Searches  -  ProteinSequences
 *
 * Data loaded from server and code to load data from server
 *
 *      Data is loaded for Single ProteinSequenceVersionId for Search(es)
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches";

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder  {

    private _proteinSequence_Map_Key_ProteinSequenceVersionId: Map<number,string> = new Map()

    private _proteinSequenceString_I_To_L_KeyProteinSequenceVersionId: Map<number, string> = new Map()

    constructor() {}

    /**
     *
     * @param proteinSequenceVersionId
     */
    get_ProteinSequence_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
        return this._proteinSequence_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
    }

    /**
     *
     * @param proteinSequenceVersionId
     * @returns - String where all "I" have been converted to "L"
     */
    get_ProteinSequence_I_To_L__For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {
        {
            const existing_proteinSequenceString_I_To_L = this._proteinSequenceString_I_To_L_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( existing_proteinSequenceString_I_To_L ) {
                return existing_proteinSequenceString_I_To_L; // EARLY RETURN
            }
        }
        const proteinSequenceString = this._proteinSequence_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! proteinSequenceString ) {
            return undefined;
        }

        const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

        //  The Peptide Search Strings will be used to search the protein sequence.
        //  Reported Peptides will be selected where their Protein Coverage records fully contain
        //     the locations of the search strings on the protein sequence.

        //  The amino acid letters I and L will be equivalent.

        const proteinSequenceString_I_To_L = proteinSequenceString.replace(findAll_I_Regex,'L');
        this._proteinSequenceString_I_To_L_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, proteinSequenceString_I_To_L );
        return proteinSequenceString_I_To_L;

        return this._proteinSequence_Map_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
    }

    /**
     * Internal to CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences
     */
    InternalUse_Only__insert_ProteinSequence_For_ProteinSequenceVersionId(
        {
            proteinSequenceVersionId, proteinSequence
        } : {
            proteinSequenceVersionId: number
            proteinSequence: string
        }
    ) : void {
        this._proteinSequence_Map_Key_ProteinSequenceVersionId.set(proteinSequenceVersionId, proteinSequence);
    }

}

/**
 *
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult {

    proteinSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder
}

/**
 *  !!!!!!!!   Main Class  !!!!!!!!!!!!
 */
export class CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchIds: Array<number>

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches

    //  One Common CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder instance that will be added to for each requested ProteinSequenceVersionId

    private _proteinSequences_For_MainFilters_Holder = new CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder();

    private _get_ProteinSequence_Promises_Map_Key_ProteinSequenceVersionId: Map<number, Promise<void>> = new Map()

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
     */
    static getNewInstance(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }: {
            projectSearchIds: Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        }
    ) {
        return new CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences({
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__CommonAcrossSearches
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get for proteinSequenceVersionId which must be in the searches
     */
    get_ProteinSequencesHolder_For_ProteinSequenceVersionId_ReturnPromise(proteinSequenceVersionId: number): Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult> {
        try {
            const result = this.get_ProteinSequencesHolder_For_ProteinSequenceVersionId(proteinSequenceVersionId);

            if (result.data) {

                return Promise.resolve(result.data);
            }

            return result.promise;

        } catch( e ) {
            console.warn("Exception caught: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     * Get for proteinSequenceVersionId which must be in the searches
     */
    get_ProteinSequencesHolder_For_ProteinSequenceVersionId(proteinSequenceVersionId: number):
        {
            data: CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult>
        } {

        if (this._proteinSequences_For_MainFilters_Holder.get_ProteinSequence_For_ProteinSequenceVersionId(proteinSequenceVersionId)) {

            //  Have loaded data so just return it
            return {
                data: {
                    proteinSequences_For_MainFilters_Holder: this._proteinSequences_For_MainFilters_Holder
                },
                promise: undefined
            };
        }

        // Create and return new Promise that encompasses all to do

        const existingPromise_For_ProteinSequenceVersionId = this._get_ProteinSequence_Promises_Map_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( existingPromise_For_ProteinSequenceVersionId ) {

            //  EARLY RETURN

            return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult>(
                    (resolve, reject) => { try {
                        existingPromise_For_ProteinSequenceVersionId.catch(reason => { reject(reason)})
                        existingPromise_For_ProteinSequenceVersionId.then(noValue => { try {
                            resolve({
                                proteinSequences_For_MainFilters_Holder: this._proteinSequences_For_MainFilters_Holder
                            });
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        }

        //  Get data for proteinSequenceVersionId from server

        const promise = this._get_ProteinSequences_Data_For_ProteinSequenceVersionId({ proteinSequenceVersionId });

        return { data: undefined, promise: new Promise<CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences__get_ProteinSequencesHolder__FunctionResult>(
                (resolve, reject) => {try {
                    promise.catch(reason => { reject(reason)})
                    promise.then(noValue => { try {
                        resolve({
                            proteinSequences_For_MainFilters_Holder: this._proteinSequences_For_MainFilters_Holder
                        })
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    //////////////////////////////////

    ///    Get and process actual Protein Sequence

    /**
     * Get Data For proteinSequenceVersionId
     *
     */
    private _get_ProteinSequences_Data_For_ProteinSequenceVersionId(
        {
            proteinSequenceVersionId
        } : {
            proteinSequenceVersionId: number
        }
    ) : Promise<void> {
        try {
            const promise = new Promise<void>( ( resolve, reject ) => { try {

                const requestObject = {
                    projectSearchIds: this._projectSearchIds,
                    proteinSequenceVersionIds: [ proteinSequenceVersionId ],
                };

                console.log("AJAX Call to get protein-sequences-for-prot-seq-ver-ids START, Now: " + new Date() );

                const url = "d/rws/for-page/psb/protein-sequences-for-prot-seq-ver-ids";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    this._get_ProteinSequence_Promises_Map_Key_ProteinSequenceVersionId.delete( proteinSequenceVersionId )
                    reject()
                });

                promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => { try {
                    console.log("AJAX Call to get protein-sequences-for-prot-seq-ver-ids END, Now: " + new Date() );
                    this._get_ProteinSequence_Promises_Map_Key_ProteinSequenceVersionId.delete( proteinSequenceVersionId )
                    this._process_WebserviceResponse({ responseData, proteinSequenceVersionId });
                    resolve();

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            this._get_ProteinSequence_Promises_Map_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, promise )

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
    private _process_WebserviceResponse({ responseData, proteinSequenceVersionId }: { responseData: any, proteinSequenceVersionId: number }) : void {

        const proteinSequences_Key_proteinSequenceVersionId = responseData.proteinSequences
        // const foundAllProteinSequenceVersionIdsForProjectSearchIds = responseData.foundAllProteinSequenceVersionIdsForProjectSearchIds;

        const proteinSequenceObject = proteinSequences_Key_proteinSequenceVersionId[ proteinSequenceVersionId ];
        if ( proteinSequenceObject === undefined ) {
            throw Error("No Protein sequence for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
        }
        const proteinSequenceString = proteinSequenceObject.sequence;

        this._proteinSequences_For_MainFilters_Holder.InternalUse_Only__insert_ProteinSequence_For_ProteinSequenceVersionId({ proteinSequenceVersionId, proteinSequence: proteinSequenceString })

    }

}

