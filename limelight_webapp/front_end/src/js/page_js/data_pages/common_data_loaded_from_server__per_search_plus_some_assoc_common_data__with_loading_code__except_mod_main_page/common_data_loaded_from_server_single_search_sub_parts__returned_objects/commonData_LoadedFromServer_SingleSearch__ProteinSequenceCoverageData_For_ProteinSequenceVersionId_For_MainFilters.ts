/**
 * commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters.ts.ts
 *
 * For Single Project Search  -  ProteinSequenceCoverageData_For_ProteinSequenceVersionId - ProteinSequenceCoverageData_For_ProteinSequenceVersionId objects per ProteinSequenceVersionId
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {ProteinSequenceCoverageData_For_ProteinSequenceVersionId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinSequenceCoverageData_For_ProteinSequenceVersionId";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder {

    //  Protein Sequence Coverage Per proteinSequenceVersionId - Each entry is an object of a Class has data per Reported Peptide Id
    private _proteinSequenceCoverageData_KeyProteinSequenceVersionId: Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId>; // - Map <integer,[Object]> <proteinSequenceVersionId, class ProteinSequenceCoverageData_For_ProteinSequenceVersionId>

    /**
     * 
     */
    constructor(
        {
            proteinSequenceCoverageData_KeyProteinSequenceVersionId
        } : {
            proteinSequenceCoverageData_KeyProteinSequenceVersionId: Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId>
        }
    ) {
        this._proteinSequenceCoverageData_KeyProteinSequenceVersionId = proteinSequenceCoverageData_KeyProteinSequenceVersionId;
    }

    /**
     *
     * @param proteinSequenceVersionId
     */
    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId( proteinSequenceVersionId: number ) {

        return this._proteinSequenceCoverageData_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    }

    /**
     * @returns true if any entries, false otherwise
     */
    is_Has_ProteinSequenceCoverageData_For_ProteinSequenceVersionId_Entries() {
        return this._proteinSequenceCoverageData_KeyProteinSequenceVersionId.size > 0
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult {

    proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
}

/**
 *  !!!!!!!!!!!!!!!!!    MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult

    private _promise_LoadProteinSequenceCoverageData_For_ProteinSequenceVersionId_Data_InProgress: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult>

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     * Get all for search for main filters
     */
    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_ReturnPromise(): Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult> {
        try {
            const result = this.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch();

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
     * Get all for search for main filters
     */
    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch():
        {
            data: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult>
        } {

        if (this._get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult) {

            //  Have loaded data so just return it
            return {
                data: this._get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult,
                promise: undefined
            };
        }

        if ( this._promise_LoadProteinSequenceCoverageData_For_ProteinSequenceVersionId_Data_InProgress ) {
            return {
                promise: this._promise_LoadProteinSequenceCoverageData_For_ProteinSequenceVersionId_Data_InProgress,
                data: undefined
            }
        }

        // Create and return new Promise that encompasses

        this._promise_LoadProteinSequenceCoverageData_For_ProteinSequenceVersionId_Data_InProgress =
            new Promise<CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters__get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult>(
                (resolve_TopLevel, reject_TopLevel) => {
                    try {
                        let reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
                        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
                        let proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder

                        const promises: Array<Promise<void>> = [];

                        {  //  Get proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                            const get_reportedPeptideIds_Result =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

                            if ( get_reportedPeptideIds_Result.data ) {
                                reportedPeptideIds = get_reportedPeptideIds_Result.data.reportedPeptideIds
                            } else if ( get_reportedPeptideIds_Result.promise ) {
                                const promise = new Promise<void>((resolve, reject) => { try {
                                    get_reportedPeptideIds_Result.promise.catch(reason => {reject(reason)})
                                    get_reportedPeptideIds_Result.promise.then( getResult_Value => { try {
                                        reportedPeptideIds = getResult_Value.reportedPeptideIds;
                                        resolve()
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }});
                                promises.push(promise);
                            } else {
                                throw Error("get_reportedPeptideIds_Result not data or promise")
                            }
                        }
                        {  //  Get proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                            const get_ProteinInfoHolder_AllForSearch_Result =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();
                            if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinInfoHolder_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                            } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                                const promise = new Promise<void>((resolve, reject) => { try {
                                    get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => {reject(reason)})
                                    get_ProteinInfoHolder_AllForSearch_Result.promise.then( getResult_Value => { try {
                                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = getResult_Value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                                        resolve()
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }});
                                promises.push(promise);
                            } else {
                                throw Error("get_ProteinInfoHolder_AllForSearch_Result not data or promise")
                            }
                        }

                        {  //  Get get_ProteinInfoHolder_AllForSearch
                            const get_ProteinInfoHolder_AllForSearch_Result =
                                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                                get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch()
                            if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                                proteinInfo_For_MainFilters_Holder = get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder
                            } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                                const  promise = new Promise<void>((resolve, reject) => { try {
                                    get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => {reject(reason)})
                                    get_ProteinInfoHolder_AllForSearch_Result.promise.then( getResult_Value => { try {
                                        proteinInfo_For_MainFilters_Holder = getResult_Value.proteinInfo_For_MainFilters_Holder;
                                        resolve()
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                promises.push(promise);
                            } else {
                                throw Error("get_ProteinInfoHolder_AllForSearch_Result not data or promise")
                            }
                        }

                        if ( promises.length === 0 ) {
                            this._create_Holder_After_GetData({ reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder, proteinInfo_For_MainFilters_Holder })
                            resolve_TopLevel( this._get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult )
                        }

                        const promises_All = Promise.all(promises);

                        promises_All.catch(reason => { reject_TopLevel(reason)})
                        promises_All.then(noValue => {  try {
                            this._create_Holder_After_GetData({ reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder, proteinInfo_For_MainFilters_Holder })

                            resolve_TopLevel( this._get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult )

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

        return {
            data: undefined, promise: this._promise_LoadProteinSequenceCoverageData_For_ProteinSequenceVersionId_Data_InProgress
        }
    }

    /**
     *
     */
    private _create_Holder_After_GetData(
        {
            reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder, proteinInfo_For_MainFilters_Holder
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
            proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder
        }
    ) : void {

        const proteinSequenceCoverage_Per_ProteinSequenceVersionId =
            Compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId.compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId({
                reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder, proteinInfo_For_MainFilters_Holder
            })

        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder = new CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder({
            proteinSequenceCoverageData_KeyProteinSequenceVersionId: proteinSequenceCoverage_Per_ProteinSequenceVersionId.proteinCoverage_KeyProteinSequenceVersionId
        })

        this._get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder__FunctionResult = {
            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
        }

    }
}

/////////////////////////////////////////


/**
 *
 */
class Compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId {

    /**
     *
     */
    constructor() {}

    /**
     *
     */
    initialize() {}

    /**
     * Compute Protein Sequence Coverage Per proteinSequenceVersionId
     *
     * Input:
     *  Current Reported Peptide Ids (based on current cutoffs/filters)
     *  Protein Sequence Coverage Per Reported Peptide Id
     *  proteinInfoMapKeyProteinSequenceVersionId - for protein lengths
     */
    static compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId(
        {
            reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder, proteinInfo_For_MainFilters_Holder
        } : {
            reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
            proteinInfo_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder

        } ) :  { proteinCoverage_KeyProteinSequenceVersionId : Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId> } {

        const instance = new Compute_proteinSequenceCoverage_Per_ProteinSequenceVersionId();

        const proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> >   = (
            instance._create_proteinSequenceCoverage_MapPer_proteinSequenceVersionId( { reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder } )
        );

        const proteinCoverageMergedRanges_KeyProteinSequenceVersionId : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> = (
            instance._proteinSequenceCoverage_MergeRanges_Per_proteinSequenceVersionId( { proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId } )
        );

        //  Create Map of objects of class ProteinSequenceCoverageData_For_ProteinSequenceVersionId to return as the result

        const proteinCoverageEntries_Result_Map : Map<number, ProteinSequenceCoverageData_For_ProteinSequenceVersionId> = new Map();

        for ( const proteinCoverageEntries_PerReportedPeptideId_MapEntry of proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId ) {

            const proteinSequenceVersionId = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 0 ]; // Map Key
            const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 1 ]; // Map Value

            const proteinCoverageMergedRanges_Entry = proteinCoverageMergedRanges_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteinCoverageMergedRanges_Entry ) {
                throw Error("Internal Error: No entry in proteinCoverageMergedRanges_KeyProteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId );
            }

            const proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId );
            if ( ! proteinInfo ) {
                throw Error("Internal Error: No entry in proteinInfo_For_MainFilters_Holder for proteinSequenceVersionId: " + proteinSequenceVersionId );
            }
            const proteinLength = proteinInfo.proteinLength;

            const proteinSequenceCoverageData_For_ProteinSequenceVersionId = new ProteinSequenceCoverageData_For_ProteinSequenceVersionId({
                proteinSequenceVersionId, proteinLength, proteinCoverageEntries_PerReportedPeptideId_Array, proteinCoverageMergedRanges : proteinCoverageMergedRanges_Entry
            } );

            proteinCoverageEntries_Result_Map.set( proteinSequenceVersionId, proteinSequenceCoverageData_For_ProteinSequenceVersionId );
        }

        return ( { proteinCoverage_KeyProteinSequenceVersionId : proteinCoverageEntries_Result_Map } );
    }


    /**
     * Map the protein sequence coverage to be per proteinSequenceVersionId
     */
    _create_proteinSequenceCoverage_MapPer_proteinSequenceVersionId( { reportedPeptideIds, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder } : {

        reportedPeptideIds: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

    }) : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> > {

        const proteinCoverage_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> > = new Map()

        for ( const reportedPeptideId of reportedPeptideIds ) {

            const proteinCoverage_Array = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId( reportedPeptideId );

            if ( ! proteinCoverage_Array ) {
                const msg = "proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); not return a value. reportedPeptideId: " + reportedPeptideId;
                console.warn( msg );
                throw Error( msg );
            }

            for ( const proteinCoverage_entry of proteinCoverage_Array ) {

                let proteinCoverage_NewMapEntry = proteinCoverage_KeyProteinSequenceVersionId.get( proteinCoverage_entry.proteinSequenceVersionId );
                if ( ! proteinCoverage_NewMapEntry ) {
                    proteinCoverage_NewMapEntry = [];
                    proteinCoverage_KeyProteinSequenceVersionId.set( proteinCoverage_entry.proteinSequenceVersionId, proteinCoverage_NewMapEntry );
                }
                proteinCoverage_NewMapEntry.push( proteinCoverage_entry );
            }
        }

        //  In result Map proteinCoverage_KeyProteinSequenceVersionId, sort each array

        //  Sort each array on Protein Start, Protein End, Reported Peptide Id

        for ( const proteinCoverage_KeyProteinSequenceVersionId_MapEntry of proteinCoverage_KeyProteinSequenceVersionId ) {

            // const reportedPeptideId = proteinCoverage_MapEntry[ 0 ]; // Map Key
            const proteinCoverage_Array = proteinCoverage_KeyProteinSequenceVersionId_MapEntry[ 1 ]; // Map Value

            proteinCoverage_Array.sort( function( a, b ) {
                //  Sort in order of proteinStartPosition, proteinEndPosition, reportedPeptideId
                if ( a.proteinStartPosition < b.proteinStartPosition ) {
                    return -1;
                }
                if ( a.proteinStartPosition > b.proteinStartPosition ) {
                    return 1;
                }
                if ( a.proteinEndPosition < b.proteinEndPosition ) {
                    return -1;
                }
                if ( a.proteinEndPosition > b.proteinEndPosition ) {
                    return 1;
                }
                if ( a.reportedPeptideId < b.reportedPeptideId ) {
                    return -1;
                }
                if ( a.reportedPeptideId > b.reportedPeptideId ) {
                    return 1;
                }
                return 0;
            } );
        }

        return proteinCoverage_KeyProteinSequenceVersionId;
    }

    /**
     * Merge the protein sequence coverage per proteinSequenceVersionId
     *
     * Merge the overlapping ranges into adjacent ranges with combined proteinCoverageDataItems (reported peptide ids)
     */
    _proteinSequenceCoverage_MergeRanges_Per_proteinSequenceVersionId( { proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId } : {
        proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId : Map<number, Array<{reportedPeptideId: number, proteinSequenceVersionId: number, proteinStartPosition: number, proteinEndPosition: number}> >
    }) : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> {

        const proteinCoverageMergedRanges_KeyProteinSequenceVersionId : Map<number, {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]> = new Map()

        for ( const proteinCoverageEntries_PerReportedPeptideId_MapEntry of proteinCoverageEntries_PerReportedPeptideId_KeyProteinSequenceVersionId ) {

            const proteinSequenceVersionId = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 0 ]; // Map Key
            const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageEntries_PerReportedPeptideId_MapEntry[ 1 ]; // Map Value

            //  Clone proteinCoverageEntries_PerReportedPeptideId_Array to proteinCoverageMergeRanges_Array

            const proteinCoverageMergeRanges_Array : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> = [];
            for ( const proteinCoverageEntries_PerReportedPeptideId_Item of proteinCoverageEntries_PerReportedPeptideId_Array ) {
                const proteinCoverage_Item_ForMerging = {
                    proteinStartPosition : proteinCoverageEntries_PerReportedPeptideId_Item.proteinStartPosition,
                    proteinEndPosition : proteinCoverageEntries_PerReportedPeptideId_Item.proteinEndPosition,
                    proteinSequenceVersionId : proteinCoverageEntries_PerReportedPeptideId_Item.proteinSequenceVersionId,
                    proteinCoverageDataItems : [ { reportedPeptideId : proteinCoverageEntries_PerReportedPeptideId_Item.reportedPeptideId } ]
                }
                proteinCoverageMergeRanges_Array.push( proteinCoverage_Item_ForMerging );
            }

            const combineOverlapsResult = this._combineOverlapsProteinPositionBased( proteinCoverageMergeRanges_Array );

            // const splitAnyEntries = combineOverlapsResult.splitAnyEntries;
            const outputList = combineOverlapsResult.outputList;

            proteinCoverageMergedRanges_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, outputList );
        }

        return proteinCoverageMergedRanges_KeyProteinSequenceVersionId;
    }

    /////////////////////////////////////////////////////////////////

    /*
     * Combine for single ProteinSequenceVersionId
     */
    _combineOverlapsProteinPositionBased( proteinCoverageItemsInputParam : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> )
        : { splitAnyEntries: boolean, outputList: {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[]  }
    {

        //  Sanity check to prevent infinite loop since have complicated loop exit control
        const MAX__numTimesSplitAnEntryLoop = 300;

        {
            //  Confirm all entries in proteinCoverageItemsInputParam have same value for proteinSequenceVersionId
            if ( proteinCoverageItemsInputParam && proteinCoverageItemsInputParam.length > 0 ) {
                const proteinSequenceVersionId_FirstEntry: number = proteinCoverageItemsInputParam[0].proteinSequenceVersionId;
                for (const proteinCoverageItemsInputParam_Entry of proteinCoverageItemsInputParam) {
                    if (proteinSequenceVersionId_FirstEntry !== proteinCoverageItemsInputParam_Entry.proteinSequenceVersionId) {
                        throw Error("_combineOverlapsProteinPositionBased(...): if ( proteinSequenceVersionId_FirstEntry !== proteinCoverageItemsInputParam_Entry.proteinSequenceVersionId ) {");
                    }
                }
            }
        }

        let splitAnyEntries = false;

        let splitAnEntryThisIterationOfLoop = true;

        let numTimesSplitAnEntryLoop = 0;

        //  Input is null since will be copied from Output in each iteration of the loop
        let proteinCoverageItemListInput : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[] = null;

        // Combine entries with same start and end positions - combine entries first to simplify later processing
        let proteinCoverageItemListOutput : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}[] = this._combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, proteinCoverageItemsInputParam );


        //   While ( entries have been split inside the loop )

        while ( splitAnEntryThisIterationOfLoop ) {

            numTimesSplitAnEntryLoop++;

            if ( numTimesSplitAnEntryLoop > MAX__numTimesSplitAnEntryLoop ) {

                try {
                    let errorMsg = "combineOverlapsProteinPositionBased(...):  numTimesSplitAnEntryLoop > " + MAX__numTimesSplitAnEntryLoop + " so throwing exception.  ";

                    throw Error( errorMsg );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }

            //   While entries have been split

            splitAnEntryThisIterationOfLoop = false;


            // Copy Output to Input for next creating of output
            proteinCoverageItemListInput = proteinCoverageItemListOutput;

            proteinCoverageItemListOutput = []; // New Output

            proteinCoverageItemListInput.sort( this._combineOverlaps_Z_compareForSortBlocks );

            //  Split entries if needed

            let index = -1;

            while ( ( ++index ) < proteinCoverageItemListInput.length ) {

                let proteinCoverageItem = proteinCoverageItemListInput[ index ];

                if ( index === ( proteinCoverageItemListInput.length - 1 ) ) {

                    //  Last entry, put in output list.

                    proteinCoverageItemListOutput.push( proteinCoverageItem );

                } else {

                    let proteinCoverageItemNext = proteinCoverageItemListInput[ index + 1 ];

                    if ( proteinCoverageItem.proteinEndPosition < proteinCoverageItemNext.proteinStartPosition ) {

                        //  No overlap next entry, put in output list.

                        proteinCoverageItemListOutput.push( proteinCoverageItem );

                    } else {

                        splitAnEntryThisIterationOfLoop = true;

                        splitAnyEntries = true;

                        if ( proteinCoverageItem.proteinStartPosition === proteinCoverageItemNext.proteinStartPosition ) {

                            //  Same start point, the current entry is longer so split to end of next and what is left

                            //  Split current entry to before next next entry and starts at next entry
                            let proteinCoverageItemSplitBefore = {
                                proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
                                proteinStartPosition: proteinCoverageItem.proteinStartPosition,
                                proteinEndPosition: proteinCoverageItemNext.proteinEndPosition,
                                proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
                            };
                            let proteinCoverageItemSplitAfter = {
                                proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
                                proteinStartPosition: proteinCoverageItemNext.proteinEndPosition + 1,
                                proteinEndPosition: proteinCoverageItem.proteinEndPosition,
                                proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
                            };

                            proteinCoverageItemListOutput.push( proteinCoverageItemSplitBefore );
                            proteinCoverageItemListOutput.push( proteinCoverageItemSplitAfter );

                        } else {
                            //  Split current entry to before next entry and starts at next entry

                            let proteinCoverageItemSplitBefore = {
                                proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
                                proteinStartPosition: proteinCoverageItem.proteinStartPosition,
                                proteinEndPosition: ( proteinCoverageItemNext.proteinStartPosition - 1 ),
                                proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
                            };
                            let proteinCoverageItemSplitAfter = {
                                proteinCoverageDataItems: this._copyArray( proteinCoverageItem.proteinCoverageDataItems ),
                                proteinStartPosition: proteinCoverageItemNext.proteinStartPosition,
                                proteinEndPosition: proteinCoverageItem.proteinEndPosition,
                                proteinSequenceVersionId : proteinCoverageItemNext.proteinSequenceVersionId
                            };
                            proteinCoverageItemListOutput.push( proteinCoverageItemSplitBefore );
                            proteinCoverageItemListOutput.push( proteinCoverageItemSplitAfter );
                        }
                    }
                }
            }
            // Combine entries with same start and end positions
            proteinCoverageItemListOutput = this._combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop, proteinCoverageItemListOutput);
        }
        return { splitAnyEntries: splitAnyEntries, outputList: proteinCoverageItemListOutput };
    };

    /*
     * Combine entries with same start and end positions
     */
    _combineEntriesProteinPositionBased( numTimesSplitAnEntryLoop : number, proteinCoverageItemListInput  : Array<{ proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }> )
        : Array<{proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}> {

        let proteinCoverageItemListOutput : Array<{proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]}> = [];

        proteinCoverageItemListInput.sort( this._combineOverlaps_Z_compareForSortBlocks );

        let index = -1; //  Incremented in outer and inner while loops

        while ( ( ++index ) < proteinCoverageItemListInput.length ) {

            let proteinCoverageItem : {proteinStartPosition: number, proteinEndPosition: number, proteinSequenceVersionId: number, proteinCoverageDataItems: {reportedPeptideId: number}[]} = proteinCoverageItemListInput[ index ];

            if ( index === ( proteinCoverageItemListInput.length - 1 ) ) {

                //  if is last entry( and not processed yet below ), put in output list.

                proteinCoverageItemListOutput.push( proteinCoverageItem );

            } else {

                let indexNext = index;

                while ( ( ++indexNext ) < proteinCoverageItemListInput.length ) {

                    let proteinCoverageItemNext = proteinCoverageItemListInput[ indexNext ];

                    if ( proteinCoverageItem.proteinStartPosition === proteinCoverageItemNext.proteinStartPosition
                        && proteinCoverageItem.proteinEndPosition === proteinCoverageItemNext.proteinEndPosition ) {

                        index = indexNext;
                        proteinCoverageItem.proteinCoverageDataItems =
                            this._concatArrays(
                                proteinCoverageItem.proteinCoverageDataItems, proteinCoverageItemNext.proteinCoverageDataItems );
                    } else {
                        break;
                    }
                }
                proteinCoverageItemListOutput.push( proteinCoverageItem );
            }
        }
        return proteinCoverageItemListOutput;
    }

    ///////////

    //  Utility functions

    /*
     * Sort Function: Sort by start position ascending then end position descending
     *
     * called by array.sort( this._combineOverlaps_Z_compareForSortBlocks )
     */
    _combineOverlaps_Z_compareForSortBlocks(
        a : { proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> },
        b : { proteinStartPosition : number, proteinEndPosition: number, proteinSequenceVersionId : number, proteinCoverageDataItems : Array<{ reportedPeptideId : number }> }
    ) {

        // StartPosition ascending
        if ( a.proteinStartPosition < b.proteinStartPosition ) {
            return -1;
        }
        if ( a.proteinStartPosition > b.proteinStartPosition ) {
            return 1;
        }

        // EndPosition descending
        if ( a.proteinEndPosition > b.proteinEndPosition ) {
            return -1;
        }
        if ( a.proteinEndPosition < b.proteinEndPosition ) {
            return 1;
        }

        //  Both Start and End Positions Match
        return 0;
    }

    /*
     * Shallow Copy Array
     */
    _copyArray( inputArray :  {reportedPeptideId: number}[] ) : {reportedPeptideId: number}[] {

        return inputArray.concat();
    }

    /*
     * Shallow Concat Two Arrays
     */
    _concatArrays( inputArray1 :  {reportedPeptideId: number}[], inputArray2 :  {reportedPeptideId: number}[] ) : {reportedPeptideId: number}[] {

        return inputArray1.concat( inputArray2 );
    }

}
