/**
 * commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_OnProteinSequence_For_ProteinSequenceVersionId.ts
 *
 * For Single Project Search  -  StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId --  Residue Masses
 *
 * Data loaded from server and code to load data from server
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder {

    //  Static Modifications Per ProteinSequenceVersion Id.   position is int, mass is double.
    // 		- Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), residue_I_To_L, massesSet: Set< mass (number) > } >>
    //      - residue_I_To_L = residue.replace('I', 'L') Replace I with L
    private _staticModificationsOnProtein_KeyProteinSequenceVersionId : Map<number, Map<number, { residue : string, residue_I_To_L : string, massesSet : Set<number>, massesArray : Array<number> }>> = new Map()

    constructor() {
    }

    /**
     * @param proteinSequenceVersionId
     */
    get_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId(proteinSequenceVersionId: number) {
        return this._staticModificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
    }

    Internal_set_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId(
        {
            proteinSequenceVersionId, staticModificationsOnProtein
        } : {
            proteinSequenceVersionId: number
            staticModificationsOnProtein: Map<number, { residue : string, residue_I_To_L : string, massesSet : Set<number>, massesArray : Array<number> }>
        }
    ) : void {
        this._staticModificationsOnProtein_KeyProteinSequenceVersionId.set(proteinSequenceVersionId, staticModificationsOnProtein);
    }
}

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId__get_StaticModsHolder__FunctionResult {

    staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder
}

/**
 *  MAIN CLASS
 */
export class CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number

    //  Parent Object class
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    //

    private _staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder = new CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder()

    private _promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId: Promise<void>

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
        return new CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }

    /**
     * !!!  Always return promise
     *
     *  @param proteinSequenceVersionId
     */
    get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_ReturnPromise(proteinSequenceVersionId: number):
        Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId__get_StaticModsHolder__FunctionResult> {

        const result = this.get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId(proteinSequenceVersionId);

        if (result.data) {

            return Promise.resolve(result.data);
        }

        return result.promise;
    }

    /**
     * @param proteinSequenceVersionId
     */
    get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId(proteinSequenceVersionId: number):
        {
            data: CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId__get_StaticModsHolder__FunctionResult
            promise: Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId__get_StaticModsHolder__FunctionResult>
        } {

        if ( this._staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder.get_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId(proteinSequenceVersionId) ) {

            //  Have loaded data so just return it
            return {
                data: {
                    staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder: this._staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder
                },
                promise: undefined
            };
        }

        const promise = this._load_Process_Data(proteinSequenceVersionId)

        return {
            data: undefined,
            promise: new Promise<CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId__get_StaticModsHolder__FunctionResult>(
                (resolve, reject) => { try {
                    promise.catch(reason => { reject(reason)})
                    promise.then(noValue => { try {
                        resolve({ staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder: this._staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder })
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * Get Data For Single Project Search Id
     *
     */
    private _load_Process_Data(proteinSequenceVersionId: number) : Promise<void> {



        this._promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId = new Promise<void>((resolve_TopLevel, reject_TopLevel) => { try {

            let staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
            let proteinSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder

            const promises: Array<Promise<void>> = []

            { // staticMods_Holder
                const get_StaticModsHolder_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();
                if ( get_StaticModsHolder_Result.data ) {
                    staticMods_Holder = get_StaticModsHolder_Result.data.staticMods_Holder
                } else if ( get_StaticModsHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_StaticModsHolder_Result.promise.catch(reason => { reject(reason) })
                        get_StaticModsHolder_Result.promise.then(value => { try {
                            staticMods_Holder = value.staticMods_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_StaticModsHolder_Result no data or promise")
                }
            }
            {
                const get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                    get_commonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences().get_ProteinSequencesHolder_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data ) {
                    proteinSequences_For_MainFilters_Holder = get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.data.proteinSequences_For_MainFilters_Holder
                } else if ( get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.catch(reason => { reject(reason) })
                        get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result.promise.then(value => { try {
                            proteinSequences_For_MainFilters_Holder = value.proteinSequences_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_ProteinSequencesHolder_For_ProteinSequenceVersionId_Result no data or promise")
                }
            }

            if ( promises.length === 0 ) {
                //  No Promises
                this._process_RetrievedData({ proteinSequenceVersionId, staticMods_Holder, proteinSequences_For_MainFilters_Holder });

                this._promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId = undefined;

                resolve_TopLevel();
            }

            const promises_All = Promise.all(promises);
            promises_All.catch(reason => {
                this._promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId = undefined
                reject_TopLevel(reason)
            })
            promises_All.then(noValue => { try {
                this._process_RetrievedData({ proteinSequenceVersionId, staticMods_Holder, proteinSequences_For_MainFilters_Holder });

                this._promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId = undefined;

                resolve_TopLevel();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return this._promise_Load_StaticMods_Data_InProgress__Map_Key_ProteinSequenceVersionId;
    }

    /**
     *
     */
    private _process_RetrievedData(
        {
            proteinSequenceVersionId, staticMods_Holder, proteinSequences_For_MainFilters_Holder
        }: {
            proteinSequenceVersionId: number
            staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
            proteinSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__ProteinSequences_Holder
        }) : void {

        //  Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet : Set( mass (number) ) } >
        //      - residue_I_To_L = residue.replace('I', 'L') Replace I with L
        //  (Format for class ProteinSequenceFormattedDisplay_Main_displayWidget)

        const staticModificationMassesByProteinPosition : Map<number, { residue : string, residue_I_To_L : string, massesSet : Set<number>, massesArray : Array<number> }> = new Map();

        const staticModsForSearch = staticMods_Holder.get_StaticMods();

        if ( ( staticModsForSearch ) && staticModsForSearch.length !== 0 ) {
            //  Yes Static Modifications

            const proteinSequenceString_I_To_L = proteinSequences_For_MainFilters_Holder.get_ProteinSequence_I_To_L__For_ProteinSequenceVersionId(proteinSequenceVersionId)

            for ( const staticModForSearch of staticModsForSearch ) {

                const staticModResidue = staticModForSearch.residue;
                const staticModMass = staticModForSearch.mass;

                const staticModResidue_I_To_L = staticModResidue.replace('I', 'L');

                //  Search for static mod residue in protein
                let residueFoundIndex = undefined;
                let searchStartIndex = 0;
                while ( ( residueFoundIndex = proteinSequenceString_I_To_L.indexOf( staticModResidue_I_To_L, searchStartIndex ) ) != -1 ) {

                    const proteinPosition = residueFoundIndex + 1; // '1' based
                    let staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPosition.get( proteinPosition );
                    if ( ! staticModificationResiduesMassesForProteinPosition ) {
                        staticModificationResiduesMassesForProteinPosition = { residue : staticModResidue, residue_I_To_L: staticModResidue, massesSet: new Set(), massesArray : undefined };
                        staticModificationMassesByProteinPosition.set( proteinPosition, staticModificationResiduesMassesForProteinPosition );
                    }
                    staticModificationResiduesMassesForProteinPosition.massesSet.add( staticModMass );

                    searchStartIndex = residueFoundIndex + 1; // advance to searching to after last found index
                }
            }

            //  Sort masses at each position
            for ( const staticModificationMassesByProteinPositionEntry of staticModificationMassesByProteinPosition.entries() ) {
                const position = staticModificationMassesByProteinPositionEntry[ 0 ];
                const staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPositionEntry[ 1 ];
                const residue = staticModificationResiduesMassesForProteinPosition.residue;
                const massesAtPositionSet = staticModificationResiduesMassesForProteinPosition.massesSet;
                const massesAtPositionArray = Array.from( massesAtPositionSet );
                massesAtPositionArray.sort( function(a, b) {
                    if ( a < b ) {
                        return -1;
                    }
                    if ( a > b ) {
                        return 1;
                    }
                    return 0;
                });
                //  Place the sorted Array in the final output Object in the map

                staticModificationResiduesMassesForProteinPosition.massesArray = massesAtPositionArray;
            }

        }

        this._staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder.Internal_set_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId({
            proteinSequenceVersionId, staticModificationsOnProtein: staticModificationMassesByProteinPosition
        })
    }

}