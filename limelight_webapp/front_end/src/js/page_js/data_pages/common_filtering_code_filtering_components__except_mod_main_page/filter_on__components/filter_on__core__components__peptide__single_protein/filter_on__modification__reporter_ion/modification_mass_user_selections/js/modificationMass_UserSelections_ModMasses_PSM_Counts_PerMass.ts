/**
 * modificationMass_UserSelections_ModMasses_PSM_Counts_PerMass.ts
 *
 * Variable or Open Modification Mass Selection - Compute Mod Masses and their PSM Counts
 *
 */

import {modificationMass_CommonRounding_ReturnNumber_Function} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType,
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";


//  At Bottom of file:

//      export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass {

//          static  create... = create...

/**
 *
 */
export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result {
    entries: Array<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_ResultEntry>
}

/**
 *
 */
class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_ResultEntry {
    mass : number
    psmCount: number
}


////////////////////////////////
////////////////////////////////

////////  Variable Mods processing


/**
 * Create Variable Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const createModsAndPsmCountsList_VariableModifications = function (
    {
        proteinSequenceVersionId,  //  Not always populated
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number  //  Not always populated
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : {
    data: ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
    promise: Promise<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result>
} {

    const getResult = _createModsAndPsmCountsList_VariableModifications({
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    })

    if ( getResult.data ) {

        const result = _createModsAndPsmCountsList_Variable_or_Open_Modifications__Final_Create({ modUniqueMassesWithTheirPsmCountsMap: getResult.data })

        return { data: result, promise: undefined};

    } else if ( getResult.promise ) {

        const promise = new  Promise<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result>((resolve, reject) => {
            getResult.promise.catch(reason => {
                reject(reason)
            })
            getResult.promise.then(value => {
                try {
                    const result = _createModsAndPsmCountsList_Variable_or_Open_Modifications__Final_Create({ modUniqueMassesWithTheirPsmCountsMap: value })
                    resolve(result)

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        })
        return { promise, data: undefined};

    } else {
        throw Error("getResult: no 'data' or 'promise'")
    }
}

/**
 * Create Variable Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const _createModsAndPsmCountsList_VariableModifications = function (
    {
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number  //  Not always populated
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : {
    data: Map<number, {mass : number, psmCount: number}>
    promise: Promise<Map<number, {mass : number, psmCount: number}>>
} {  //  return modUniqueMassesWithTheirPsmCountsMap

    const reportedPeptideIds_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType> = new Map();
    const numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType> = new Map();
    const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder> = new Map();

    const promises: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

            //  Have proteinSequenceVersionId

            { // reportedPeptideIds for Single Protein at main filters

                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters()
                        .get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

                if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data) {
                    const reportedPeptideIds =
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                    if ( reportedPeptideIds ) {
                        reportedPeptideIds_Map_Key_ProjectSearchId.set(projectSearchId, Array.from( reportedPeptideIds ) );
                    }
                } else if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => {
                            try {
                                const reportedPeptideIds =
                                    value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                if ( reportedPeptideIds ) {
                                    reportedPeptideIds_Map_Key_ProjectSearchId.set(projectSearchId, Array.from( reportedPeptideIds ) );
                                }
                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    })
                    promises.push(promise);
                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no 'data' or 'promise'")
                }
            }

        } else {
            { // reportedPeptideIds  for Whole search at main filters
                const get_reportedPeptideIds_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

                if (get_reportedPeptideIds_Result.data) {
                    reportedPeptideIds_Map_Key_ProjectSearchId.set( projectSearchId, get_reportedPeptideIds_Result.data.reportedPeptideIds);
                } else if (get_reportedPeptideIds_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_reportedPeptideIds_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_reportedPeptideIds_Result.promise.then(value => {
                            try {
                                reportedPeptideIds_Map_Key_ProjectSearchId.set( projectSearchId, value.reportedPeptideIds );
                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    })
                    promises.push(promise);
                } else {
                    throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result no 'data' or 'promise'")
                }
            }
        }
        { // numPsmsForReportedPeptideIdMap
            const get_numPsmsForReportedPeptideIdMap_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap()
            if (get_numPsmsForReportedPeptideIdMap_Result.data) {
                numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set( projectSearchId, get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap);
            } else if (get_numPsmsForReportedPeptideIdMap_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_numPsmsForReportedPeptideIdMap_Result.promise.then(value => {
                        try {
                            numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.set( projectSearchId, value.numPsmsForReportedPeptideIdMap);
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                })
                promises.push(promise);
            } else {
                throw Error("get_numPsmsForReportedPeptideIdMap_Result no 'data' or 'promise'")
            }
        }

        { // variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()
            if (get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder);
            } else if (get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder);
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                })
                promises.push(promise);
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }

    }

    if ( promises.length === 0 ) {

        //  NO Promises.  Run immediately

        const result = _createModsAndPsmCountsList_VariableModifications__AfterDataLoad({
            projectSearchIds,
            reportedPeptideIds_Map_Key_ProjectSearchId,
            numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            modificationMass_CommonRounding_ReturnNumber
        })

        return {data: result, promise: undefined};  // EARLY RETURN
    }

    const promises_All = Promise.all(promises);

    const promise_Return = new Promise<Map<number, {mass : number, psmCount: number}>>((resolve, reject) => {
        try {
            promises_All.catch(reason => {
                reject(reason)
            })
            promises_All.then(noValue => {
                try {
                    const result = _createModsAndPsmCountsList_VariableModifications__AfterDataLoad({
                        projectSearchIds,
                        reportedPeptideIds_Map_Key_ProjectSearchId,
                        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        modificationMass_CommonRounding_ReturnNumber
                    })
                    resolve(result)

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return {promise: promise_Return, data: undefined}
}


/**
 * Create Variable Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const _createModsAndPsmCountsList_VariableModifications__AfterDataLoad = function (
    {
        projectSearchIds,
        reportedPeptideIds_Map_Key_ProjectSearchId,
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId,
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        projectSearchIds : Array<number>
        reportedPeptideIds_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType>
        numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType>
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder>
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : Map<number, {mass : number, psmCount: number}> {  //  return modUniqueMassesWithTheirPsmCountsMap {

    //    For Overlay

    //  Unique Mod masses And their PSM Counts for the protein or selected positions
    const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

    for ( const projectSearchId of projectSearchIds ) {

        const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder )
            || ( ! variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) ) {
            //  NO variable/dynamic mods for this search so skip
            continue; // EARLY CONTINUE;
        }

        const reportedPeptideIds = reportedPeptideIds_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! reportedPeptideIds ) {
            //  No reportedPeptideIds for search.  For Single Protein that means no reportedPeptideIds for that protein for that search so skip
            continue;  // EARLY CONTINUE
        }

        const numPsmsForReportedPeptideIdMap = numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! reportedPeptideIds ) {
            throw Error("No entry in numPsmsForReportedPeptideIdMap_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }

        //   Only process a const reportedPeptideId / ModMass (PossiblyRounded) Combination so only process once
        const reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed = new Map<number,Set<number>>();

        for ( const reportedPeptideId of reportedPeptideIds ) {

            const variable_Dynamic_ModificationsOnReportedPeptide =
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.
                get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId );

            if ( ! variable_Dynamic_ModificationsOnReportedPeptide ) {
                //  No variable_Dynamic_ModificationsOnReportedPeptide for reportedPeptideId so skip
                continue // EARLY CONTINUE
            }

            for ( const variable_Dynamic_ModificationsOnReportedPeptide_Entry of variable_Dynamic_ModificationsOnReportedPeptide ) {

                const reportedPeptideId = variable_Dynamic_ModificationsOnReportedPeptide_Entry.reportedPeptideId;

                let mass = variable_Dynamic_ModificationsOnReportedPeptide_Entry.mass;

                if ( modificationMass_CommonRounding_ReturnNumber ) {  //  Transform Modification masses before using

                    //  Used in multiple searches to round the modification mass
                    mass = modificationMass_CommonRounding_ReturnNumber( mass );
                }

                {
                    let modMass_PossiblyRounded_Set = reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.get(reportedPeptideId);
                    if ( ! modMass_PossiblyRounded_Set ) {
                        modMass_PossiblyRounded_Set = new Set();
                        reportedPeptideId_ModMass_PossiblyRounded_Combination_Processed.set(reportedPeptideId, modMass_PossiblyRounded_Set);
                    } else {
                        if ( modMass_PossiblyRounded_Set.has( mass ) ) {
                            //  reportedPeptideId / mass  combination has already been processed so skip

                            continue; // EARLY CONTINUE
                        }
                    }
                    modMass_PossiblyRounded_Set.add( mass ); //  Add to processed
                }

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                if ( ! numPsmsForReportedPeptideId ) {
                    throw Error("No entry found in numPsmsForReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId + ", not filtered on protein id" );
                }

                let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                if ( ! modMassPsmCount ) {
                    modMassPsmCount = { mass: mass, psmCount : 0 };
                    modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                }
                modMassPsmCount.psmCount += numPsmsForReportedPeptideId;
            }
        }
    }

    return modUniqueMassesWithTheirPsmCountsMap
}


////////////////////////////////
////////////////////////////////

////////  Open Mods processing


/**
 * Create Open Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const createModsAndPsmCountsList_OpenModifications = function (
    {
        proteinSequenceVersionId,  //  Not always populated
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number  //  Not always populated
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }
) : {
    data: ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result
    promise: Promise<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result>
} {

    const getResult = _createModsAndPsmCountsList_OpenModifications({
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    })

    if ( getResult.data ) {

        const result = _createModsAndPsmCountsList_Variable_or_Open_Modifications__Final_Create({ modUniqueMassesWithTheirPsmCountsMap: getResult.data })

        return { data: result, promise: undefined};  //  EARLY RETURN

    } else if ( getResult.promise ) {

        const promise = new  Promise<ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result>((resolve, reject) => {
            getResult.promise.catch(reason => {
                reject(reason)
            })
            getResult.promise.then(value => {
                try {
                    const result = _createModsAndPsmCountsList_Variable_or_Open_Modifications__Final_Create({ modUniqueMassesWithTheirPsmCountsMap: value })
                    resolve(result)

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        })
        return { promise, data: undefined};  //  EARLY RETURN

    } else {
        throw Error("getResult: no 'data' or 'promise'")
    }

    console.warn("SHOULD NOT GET HERE")
    throw Error("SHOULD NOT GET HERE")
}


/**
 * Create Open Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const _createModsAndPsmCountsList_OpenModifications = function (
    {
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        proteinSequenceVersionId : number  //  Not always populated
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : {
    data: Map<number, {mass : number, psmCount: number}>
    promise: Promise<Map<number, {mass : number, psmCount: number}>>
} {  //  return modUniqueMassesWithTheirPsmCountsMap

    const reportedPeptideIds_Map_Key_ProjectSearchId: Map<number, Array<number>> = new Map();
    const openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder> = new Map();
    const openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder> = new Map();

    const promises: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            { // reportedPeptideIds for Single Protein

                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters()
                        .get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

                if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data) {
                    const reportedPeptideIds =
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                    if ( reportedPeptideIds ) {
                        reportedPeptideIds_Map_Key_ProjectSearchId.set(projectSearchId, Array.from( reportedPeptideIds ) );
                    }
                } else if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => {
                            try {
                                const reportedPeptideIds =
                                    value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                if ( reportedPeptideIds ) {
                                    reportedPeptideIds_Map_Key_ProjectSearchId.set(projectSearchId, Array.from( reportedPeptideIds ) );
                                }
                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    })
                    promises.push(promise);
                } else {
                    throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no 'data' or 'promise'")
                }
            }

        } else {

            { // reportedPeptideIds for Whole Search Main filters

                const get_reportedPeptideIds_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();

                if (get_reportedPeptideIds_Result.data) {
                    reportedPeptideIds_Map_Key_ProjectSearchId.set( projectSearchId, get_reportedPeptideIds_Result.data.reportedPeptideIds);
                } else if (get_reportedPeptideIds_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_reportedPeptideIds_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_reportedPeptideIds_Result.promise.then(value => {
                            try {
                                reportedPeptideIds_Map_Key_ProjectSearchId.set( projectSearchId, value.reportedPeptideIds );
                                resolve();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    })
                    promises.push(promise);
                } else {
                    throw Error("get_reportedPeptideIds_Result no 'data' or 'promise'")
                }
            }
        }

        { // openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
            const get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters().get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch();
            if (get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.data) {
                openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.data.openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder);
            } else if (get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder);
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                })
                promises.push(promise);
            } else {
                throw Error("get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }

        { // openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
            const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().get_OpenModifications_On_PSMHolder_AllForSearch();
            if (get_OpenModifications_On_PSMHolder_AllForSearch_Result.data) {
                openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder);
            } else if (get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.openModifications_On_PSM_For_MainFilters_Holder);
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                })
                promises.push(promise);
            } else {
                throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result no 'data' or 'promise'")
            }
        }

    }

    if ( promises.length === 0 ) {

        //  NO Promises.  Run immediately

        const result = _createModsAndPsmCountsList_OpenModifications__AfterDataLoad({
            projectSearchIds,
            reportedPeptideIds_Map_Key_ProjectSearchId,
            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId,
            openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId
        })

        return {data: result, promise: undefined};  // EARLY RETURN
    }

    const promises_All = Promise.all(promises);

    const promise_Return = new Promise<Map<number, {mass : number, psmCount: number}>>((resolve, reject) => {
        try {
            promises_All.catch(reason => {
                reject(reason)
            })
            promises_All.then(noValue => {
                try {
                    const result = _createModsAndPsmCountsList_OpenModifications__AfterDataLoad({
                        projectSearchIds,
                        reportedPeptideIds_Map_Key_ProjectSearchId,
                        openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId
                    })
                    resolve(result)

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return {promise: promise_Return, data: undefined}
}


/**
 * Create Open Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const _createModsAndPsmCountsList_OpenModifications__AfterDataLoad = function (
    {
        projectSearchIds,
        reportedPeptideIds_Map_Key_ProjectSearchId,
        openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId,
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId,
    } : {
        projectSearchIds : Array<number>
        reportedPeptideIds_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType>
        openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder>
        openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder>
    }
) : Map<number, {mass : number, psmCount: number}> {  //  return modUniqueMassesWithTheirPsmCountsMap

    //    For Overlay
    //  Unique Mod masses And their PSM Counts for the protein or selected positions
    const modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}> = new Map(); // <mass, {mass, psmCount}>

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_ForSearch = reportedPeptideIds_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! reportedPeptideIds_ForSearch ) {
            //  No reportedPeptideIds_ForSearch - When Single Protein this means no reportedPeptideIds ForSearch for that protein
            continue;  // EARLY CONTINUE
        }

        const openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder = openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder ) {
            throw Error("No entry in openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }
        const openModifications_On_PSM_For_MainFilters_Holder = openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! openModifications_On_PSM_For_MainFilters_Holder ) {
            throw Error("No entry in openModifications_On_PSM_For_MainFilters_Holder_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId );
        }


        if ( ! openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder.is_Has_OpenModificationsOnReportedPeptide_Entries() ) {

            //  No Open Mods for this search so skip search

            continue // EARLY CONTINUE
        }

        for ( const reportedPeptideId of reportedPeptideIds_ForSearch ) {

            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject =
                openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId)

            const openModificationsOnReportedPeptide =
                openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder.get_openModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId)

            if ( ! openModificationsOnReportedPeptide ) {
                //  No data for reportedPeptideId so skip
                continue;  // EARLY CONTINUE
            }

            for ( const openModificationEntry of openModificationsOnReportedPeptide ) {

                const mass = openModificationEntry.mass

                //  No Mass rounding since for Open Mod all mass at Reported Peptide level have been rounded to whole number

                let modMassPsmCount = modUniqueMassesWithTheirPsmCountsMap.get( mass );
                if ( ! modMassPsmCount ) {
                    modMassPsmCount = { mass: mass, psmCount : 0 };
                    modUniqueMassesWithTheirPsmCountsMap.set( mass, modMassPsmCount );
                }

                if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject ) {
                    //  No PsmIds (containing any Open Mod Mass) for Reported Peptide Id at current Main Reported Peptide / PSM filters
                    continue // EARLY CONTINUE
                }
                const psmOpenModificationMasses_PsmIdSetObject = psmOpenModificationMasses_PsmIdSet_Per_RoundedMassObject.openModificationMass_RoundedMap.get( mass )
                if ( ! psmOpenModificationMasses_PsmIdSetObject ) {
                    //  No PsmIds for this 'mass' Open Mod Mass for Reported Peptide at current Main Reported Peptide / PSM filters
                    continue // EARLY CONTINUE
                }

                modMassPsmCount.psmCount += psmOpenModificationMasses_PsmIdSetObject.psmIds_Set.size;
            }
        }
    }

    return modUniqueMassesWithTheirPsmCountsMap;
}

///   Common to Variable and Open Mods

/**
 * Create Open Mods and PSM Counts List
 *
 * @returns Array<{mass : number, psmCount: number}>
 */
const _createModsAndPsmCountsList_Variable_or_Open_Modifications__Final_Create = function (
    {
        modUniqueMassesWithTheirPsmCountsMap
    } : {
        modUniqueMassesWithTheirPsmCountsMap : Map<number, {mass : number, psmCount: number}>
    }
) : ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass_Result {

    const modUniqueMassesWithTheirPsmCountsArray : Array<{mass : number, psmCount: number}> = []; // {mass, psmCount}

    for ( const entry of modUniqueMassesWithTheirPsmCountsMap.entries() ) {
        modUniqueMassesWithTheirPsmCountsArray.push( entry[ 1 ] );  // Put 'value' of Map entry into Array
    }

//  Sort on masses
    modUniqueMassesWithTheirPsmCountsArray.sort( function(a, b) {
        if ( a.mass < b.mass ) {
            return -1;
        }
        if ( a.mass > b.mass ) {
            return 1;
        }
        return 0;
    });

    return { entries: modUniqueMassesWithTheirPsmCountsArray };
}



export class ModificationMass_UserSelections_ModMasses_PSM_Counts_PerMass {

    static createModsAndPsmCountsList_VariableModifications = createModsAndPsmCountsList_VariableModifications
    static createModsAndPsmCountsList_OpenModifications = createModsAndPsmCountsList_OpenModifications;
}