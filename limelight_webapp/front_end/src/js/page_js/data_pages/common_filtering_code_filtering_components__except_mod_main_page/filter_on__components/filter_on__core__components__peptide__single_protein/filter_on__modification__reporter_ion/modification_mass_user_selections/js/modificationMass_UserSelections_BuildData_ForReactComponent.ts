/**
 * modificationMass_UserSelections_BuildData_ForReactComponent.ts
 * 
 * Modification Selection - Build Data for React Component
 * 
 *  !!!! React Version !!!!
 * 
 * Display Data used in: modificationMass_UserSelections_Root.tsx
 */

//  At bottom:  export { modificationMass_UserSelections_BuildData_ForReactComponent }


//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber_Function,} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';

import {
    ModificationMass_UserSelections_ComponentData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry
} from './modificationMass_UserSelections_ComponentData';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters";


/**
 * @param proteinSequenceVersionId - optional
 *
 * @returns Promise since called with 'await'
 */
const modificationMass_UserSelections_BuildData_ForReactComponent = function({
    
    modificationMass_UserSelections_StateObject, 
    proteinSequenceVersionId, //  Optional
    projectSearchIds,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    modificationMass_CommonRounding_ReturnNumber // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
} : { 
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search

}) : Promise<ModificationMass_UserSelections_ComponentData> {

    return new Promise<ModificationMass_UserSelections_ComponentData>( (resolve_TopLevel, reject_TopLevel) => {
        try {

            let staticModificationsData : ModificationMass_UserSelections_ComponentData_StaticModificationsData = undefined
            let variableModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = undefined
            let open_ModificationsData : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = undefined

            const promises: Array<Promise<void>> = [];
            {
                const create_staticModificationsUniqueResidueLettersMassesMapSet_Result = _create_staticModificationsUniqueResidueLettersMassesMapSet({
                    modificationMass_UserSelections_StateObject, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, modificationMass_CommonRounding_ReturnNumber
                });
                if ( create_staticModificationsUniqueResidueLettersMassesMapSet_Result.data ) {
                    staticModificationsData = create_staticModificationsUniqueResidueLettersMassesMapSet_Result.data
                } else if ( create_staticModificationsUniqueResidueLettersMassesMapSet_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => {
                        create_staticModificationsUniqueResidueLettersMassesMapSet_Result.promise.catch(reason => {
                            reject(reason);
                        });
                        create_staticModificationsUniqueResidueLettersMassesMapSet_Result.promise.then(value => {
                            try {
                                staticModificationsData = value;
                                resolve()
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    throw Error("create_staticModificationsUniqueResidueLettersMassesMapSet_Result: 'data' 'promise' both not populated")
                }
            }
            {
                const variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result = _variable_modificationMass_UserSelections_BuildData_ForReactComponent({
                    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : modificationMass_UserSelections_StateObject.get_VariableModificationSelections(),
                    proteinSequenceVersionId, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, modificationMass_CommonRounding_ReturnNumber
                })
                if ( variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result.data ) {
                    variableModificationsData = variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result.data
                } else if ( variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => {
                        variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise.catch(reason => {
                            reject(reason);
                        });
                        variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise.then(value => {
                            try {
                                variableModificationsData = value;
                                resolve()
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    throw Error("variable_modificationMass_UserSelections_BuildData_ForReactComponent_Result: 'data' 'promise' both not populated")
                }
            }

            {
                const open_modificationMass_UserSelections_BuildData_ForReactComponent_Result = _open_modificationMass_UserSelections_BuildData_ForReactComponent({
                    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
                    proteinSequenceVersionId, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, modificationMass_CommonRounding_ReturnNumber
                })
                if ( open_modificationMass_UserSelections_BuildData_ForReactComponent_Result.data ) {
                    open_ModificationsData = open_modificationMass_UserSelections_BuildData_ForReactComponent_Result.data
                } else if ( open_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => {
                        open_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise.catch(reason => {
                            reject(reason);
                        });
                        open_modificationMass_UserSelections_BuildData_ForReactComponent_Result.promise.then(value => {
                            try {
                                open_ModificationsData = value;
                                resolve()
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    throw Error("open_modificationMass_UserSelections_BuildData_ForReactComponent_Result: 'data' 'promise' both not populated")
                }
            }

            if ( promises.length === 0 ) {

                const result : ModificationMass_UserSelections_ComponentData = {
                    staticModificationsData,
                    variableModificationsData,
                    open_ModificationsData
                }

                resolve_TopLevel(result);

                return;  //  EARLY RETURN
            }

            const promises_All = Promise.all(promises);

            promises_All.catch(reason => {
                reject_TopLevel(reason)
            })
            promises_All.then(noValue => {
                try {
                    const result : ModificationMass_UserSelections_ComponentData = {
                        staticModificationsData,
                        variableModificationsData,
                        open_ModificationsData
                    }

                    resolve_TopLevel(result);

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
}


///////////////////////////////////////////////////////////

/**
 * Get Unique Static Mod  Map<Residue Letter, <Set<Mod Mass>> for the Searches
 */
const _create_staticModificationsUniqueResidueLettersMassesMapSet = function(
    {
        modificationMass_UserSelections_StateObject,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }) : {
    data: ModificationMass_UserSelections_ComponentData_StaticModificationsData
    promise: Promise<ModificationMass_UserSelections_ComponentData_StaticModificationsData>
} {

    const staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder> = new Map();

    const promises: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId)
        }

        {
            const get_StaticModsHolder_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().
                get_StaticModsHolder();
            if ( get_StaticModsHolder_Result.data ) {
                staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId.set( projectSearchId, get_StaticModsHolder_Result.data.staticMods_Holder );
            } else if ( get_StaticModsHolder_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_StaticModsHolder_Result.promise.catch(reason => {
                            reject(reason)
                        });
                        get_StaticModsHolder_Result.promise.then(value => {
                            try {
                                staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId.set( projectSearchId, value.staticMods_Holder );
                                resolve();
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
                promises.push(promise);

            } else {
                throw Error("get_StaticModsHolder_Result: 'data' and 'promise' both not populated")
            }
        }
    }

    if ( promises.length === 0 ) {
        const result = _create_staticModificationsUniqueResidueLettersMassesMapSet__AfterLoadedData({
            modificationMass_UserSelections_StateObject,
            projectSearchIds,
            modificationMass_CommonRounding_ReturnNumber,
            staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId
        })

        return {            //  EARLY RETURN
            data: result,
            promise: undefined
        }
    }

    const promisesAll = Promise.all(promises);

    const promise_Return = new Promise<ModificationMass_UserSelections_ComponentData_StaticModificationsData>((resolve, reject) => {
        promisesAll.catch(reason => {
            reject(reason);
        })
        promisesAll.then(noValue => {
            try {
                const result = _create_staticModificationsUniqueResidueLettersMassesMapSet__AfterLoadedData({
                    modificationMass_UserSelections_StateObject,
                    projectSearchIds,
                    modificationMass_CommonRounding_ReturnNumber,
                    staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId
                })

                resolve(result);

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })

    return {
        promise: promise_Return,
        data: undefined
    }
}


/**
 * Get Unique Static Mod  Map<Residue Letter, <Set<Mod Mass>> for the Searches
 */
const _create_staticModificationsUniqueResidueLettersMassesMapSet__AfterLoadedData = function(
    {
        modificationMass_UserSelections_StateObject,
        projectSearchIds,
        staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        projectSearchIds : Array<number>,
        staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder>
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function

    }) : ModificationMass_UserSelections_ComponentData_StaticModificationsData
{

    //  Unique Static Mod Residue Letter/ masses for the Searches:  Map<Residue Letter, <Set<Mod Mass>>
    const staticModificationsUniqueResidueLettersMassesMapSet = new Map(); 

    for ( const projectSearchId of projectSearchIds ) {

        const staticModifications__get_StaticModsHolder = staticModifications__get_StaticModsHolder_Map_Key_ProjectSearchId.get( projectSearchId );
        if ( ! staticModifications__get_StaticModsHolder ) {
            throw Error("No entry in staticModifications__get_StaticModsHolder for projectSearchId: " + projectSearchId );
        }

        const staticModsForSearch = staticModifications__get_StaticModsHolder.get_StaticMods();

        if ( staticModsForSearch ) {
            for ( const staticModEntry of staticModsForSearch ) { // mass: 57.021464, residue: "C"
                const residue = staticModEntry.residue;
                let massesSet = staticModificationsUniqueResidueLettersMassesMapSet.get( residue );
                if ( ! massesSet ) {
                    massesSet = new Set();
                    staticModificationsUniqueResidueLettersMassesMapSet.set( residue, massesSet );
                }

                let mass = staticModEntry.mass;

                if ( modificationMass_CommonRounding_ReturnNumber ) {
                    //  Used in multiple searches to round the modification mass
                    mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
                }

                massesSet.add( mass );
            }
        }
    }

    if ( staticModificationsUniqueResidueLettersMassesMapSet.size === 0 ) {

        //  No Modifications so return here
        const result = { showNoStaticModificationsMsg : true };

        return result; // EARLY EXIT
    }

    //  Convert to array of objects for display

    const residueLetterMassArrayForDisplay : Array<ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry>= [];

    //  Masses as Array so can sort

    for ( const mapEntry of staticModificationsUniqueResidueLettersMassesMapSet.entries() ) {

        const residueLetter = mapEntry[ 0 ];
        const modMasses = mapEntry[ 1 ];
        for ( const modMass of modMasses ) {

            const displayEntry : ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry = { residueLetter, modMass, selected : false };
            
            residueLetterMassArrayForDisplay.push( displayEntry );
        }
    }

    //  Sort on modMass, then residue letter
    residueLetterMassArrayForDisplay.sort( function(a, b) {
        if ( a.modMass < b.modMass ) {
            return -1;
        }
        if ( a.modMass > b.modMass ) {
            return 1;
        }
        if ( a.residueLetter < b.residueLetter ) {
            return -1;
        }
        if ( a.residueLetter > b.residueLetter ) {
            return 1;
        }
        return 0;
    });

        // staticModificationsSelected:  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
        const staticModificationsSelected = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set();

    for ( const modEntry of residueLetterMassArrayForDisplay ) {

        {
            const selectedMassesForResidueLetter = staticModificationsSelected.get( modEntry.residueLetter );
            if ( selectedMassesForResidueLetter && selectedMassesForResidueLetter.has( modEntry.modMass ) ) {
                modEntry.selected = true;
            }
        }
    }

    return { staticModificationEntries : residueLetterMassArrayForDisplay };
}

///////////////////////////////////////////////////////////

/**
 * 
 * 
 */
const _variable_modificationMass_UserSelections_BuildData_ForReactComponent = function({

    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
    proteinSequenceVersionId,       //  Optional
    projectSearchIds,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    modificationMass_CommonRounding_ReturnNumber
} : {
    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) : {
    data: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData
    promise: Promise<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData>
} {

    const create_variableModificationsUniqueMassesSet_Result = _create_variableModificationsUniqueMassesSet({
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    });

    if ( create_variableModificationsUniqueMassesSet_Result.data ) {

        const modificationsUniqueMassesSet = create_variableModificationsUniqueMassesSet_Result.data

        if (modificationsUniqueMassesSet.size === 0) {

            //  No Modifications so return here
            const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

            return { data: result, promise: undefined }; // EARLY EXIT
        }

        const result = _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
            modificationsUniqueMassesSet,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            proteinSequenceVersionId,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
            modificationMass_CommonRounding_ReturnNumber
        })

        return { data: result, promise: undefined }; // EARLY EXIT

    } else if ( create_variableModificationsUniqueMassesSet_Result.promise ) {

        const promise = new Promise<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData>((resolve, reject) => {
            try {
                create_variableModificationsUniqueMassesSet_Result.promise.catch(reason => {
                    reject(reason)
                })
                create_variableModificationsUniqueMassesSet_Result.promise.then(value => {
                    try {

                        const modificationsUniqueMassesSet = value

                        if (modificationsUniqueMassesSet.size === 0) {

                            //  No Modifications so return here
                            const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

                            resolve(result);

                            return; // EARLY EXIT
                        }

                        const result = _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
                            modificationsUniqueMassesSet,
                            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
                            proteinSequenceVersionId,
                            projectSearchIds,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
                            modificationMass_CommonRounding_ReturnNumber
                        })

                        resolve(result);

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


        return { data: undefined, promise }; // EARLY EXIT


    } else {
        throw Error("create_variableModificationsUniqueMassesSet_Result  no 'data' or 'promise'")
    }

}

///


/**
 *
 *
 */
const _open_modificationMass_UserSelections_BuildData_ForReactComponent = function(
    {
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId,       //  Optional
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject: ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId: number,
        projectSearchIds: Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber: modificationMass_CommonRounding_ReturnNumber_Function
    }) : {
    data: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData
    promise: Promise<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData>
}  {

    const create_openModificationsUniqueMassesSet_Result = _create_openModificationsUniqueMassesSet({
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    });

    if ( create_openModificationsUniqueMassesSet_Result.data ) {

        const modificationsUniqueMassesSet = create_openModificationsUniqueMassesSet_Result.data

        if (modificationsUniqueMassesSet.size === 0) {

            //  No Modifications so return here
            const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

            return { data: result, promise: undefined }; // EARLY EXIT
        }

        const result = _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
            modificationsUniqueMassesSet,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
            proteinSequenceVersionId,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
            modificationMass_CommonRounding_ReturnNumber
        })

        return { data: result, promise: undefined }; // EARLY EXIT

    } else if ( create_openModificationsUniqueMassesSet_Result.promise ) {

        const promise = new Promise<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData>((resolve, reject) => {
            try {
                create_openModificationsUniqueMassesSet_Result.promise.catch(reason => {
                    reject(reason)
                })
                create_openModificationsUniqueMassesSet_Result.promise.then(value => {
                    try {

                    const modificationsUniqueMassesSet = value

                        if (modificationsUniqueMassesSet.size === 0) {

                            //  No Modifications so return here
                            const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

                            resolve(result);

                            return; // EARLY EXIT
                        }

                        const result = _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
                            modificationsUniqueMassesSet,
                            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
                            proteinSequenceVersionId,
                            projectSearchIds,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
                            modificationMass_CommonRounding_ReturnNumber
                        })

                        resolve(result);

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


        return { data: undefined, promise }; // EARLY EXIT


    } else {
        throw Error("create_openModificationsUniqueMassesSet_Result  no 'data' or 'promise'")
    }

}


///   VARIABLE Mods

/**
 *
 *
 */
const _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent = function(
    {
        modificationsUniqueMassesSet,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modificationsUniqueMassesSet: Set<number>
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }) : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData {

    const unmodified_Selection_Variable_or_Open_Modifications : SingleProtein_Filter_PerUniqueIdentifier_Entry = modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected();

    const result : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {
        unmodified_Selection_Variable_or_Open_Modifications,
        showAdd_Variable_or_Open_ModificationsSelectionLink : false,
        variable_or_Open_ModificationEntries : undefined,

        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId, 
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, //  Pass along for use in overlay
        modificationMass_CommonRounding_ReturnNumber
    }; 

    //  Masses as Array so can sort
    const modUniqueMassesArray = Array.from( modificationsUniqueMassesSet );

    //  Sort masses
    modUniqueMassesArray.sort( function(a, b) {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    const variable_or_Open_ModificationEntries : Array<ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry> = [];

    for ( const modUniqueMassEntry of modUniqueMassesArray ) {

        let selectionType : SingleProtein_Filter_SelectionType = null

        {
            const selected_Entry = modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_Modification_Selected_Entry( modUniqueMassEntry )
            if ( selected_Entry ) {
                selectionType = selected_Entry.selectionType
            }
        }

        const resultEntry : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry = {
            modMass : modUniqueMassEntry,
            selectionType
        };

        variable_or_Open_ModificationEntries.push( resultEntry );
    }

    result.variable_or_Open_ModificationEntries = variable_or_Open_ModificationEntries;

    return result;
}


/**
 * Get Unique Variable Mods Set for whole protein
 */
const _create_variableModificationsUniqueMassesSet = function(
    {
        proteinSequenceVersionId,        //  Optional
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }) : {
    data: Set<number>
    promise: Promise<Set<number>>
}{

    //  Unique Variable Mod masses for the protein
    const variableModificationsUniqueMassesSet : Set<number> = new Set();

    const promises: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("No entry in commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root for projectSearchId: " + projectSearchId );
        }

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            const get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch();

            if ( get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.data ) {

                const variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder =
                    get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder

                _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_Protein_Level_For_MainFilters_Holder({
                    proteinSequenceVersionId,
                    variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder,
                    modificationMass_CommonRounding_ReturnNumber,
                    variableModificationsUniqueMassesSet  // Updated
                });

            } else if ( get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise.then(value => { try {

                            const variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder;
                            _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_Protein_Level_For_MainFilters_Holder({
                                proteinSequenceVersionId,
                                variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder,
                                modificationMass_CommonRounding_ReturnNumber,
                                variableModificationsUniqueMassesSet  // Updated
                            });
                            resolve()

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
                promises.push(promise)

            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result neither 'data' 'promise");
            }

        } else {

            //  NO proteinSequenceVersionId

            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {

                const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

                _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder({
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    modificationMass_CommonRounding_ReturnNumber,
                    variableModificationsUniqueMassesSet  // Updated
                });

            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => {
                            try {

                                const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder =
                                    value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder

                                _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder({
                                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                                    modificationMass_CommonRounding_ReturnNumber,
                                    variableModificationsUniqueMassesSet  // Updated
                                });

                                resolve()

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
                promises.push(promise)

            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result neither 'data' 'promise");
            }
        }
    }

    if ( promises.length === 0 ) {
        return { data: variableModificationsUniqueMassesSet, promise: undefined };
    }

    const promisesAll = Promise.all(promises);

    const promiseReturn = new Promise<Set<number>>((resolve, reject) => {
        promisesAll.catch(reason => {
            reject(reason)
        })
        promisesAll.then(noValue => {
            try {
                resolve(variableModificationsUniqueMassesSet)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })
    return { data: undefined, promise: promiseReturn };
}



/**
 * Get Unique Variable Mods Set for whole protein - process variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
 */
const _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_Protein_Level_For_MainFilters_Holder = function(
    {
        proteinSequenceVersionId,
        variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder,
        modificationMass_CommonRounding_ReturnNumber,
        variableModificationsUniqueMassesSet  // Updated
    } : {
        proteinSequenceVersionId: number
        variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
        variableModificationsUniqueMassesSet : Set<number>
    }) : void {

    const modificationsOnProtein =
        variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder.get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId(proteinSequenceVersionId)

    if ( modificationsOnProtein ) {
        for ( const modificationOnProtein of modificationsOnProtein) {
            //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
            const position = modificationOnProtein.position;
            let mass = modificationOnProtein.mass;
            // const reportedPeptideId = modificationOnProtein.reportedPeptideId;

            if ( modificationMass_CommonRounding_ReturnNumber ) {

                //  Used in multiple searches to round the modification mass
                mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
            }

            variableModificationsUniqueMassesSet.add( mass );
        }
    }
}

/**
 * Get Unique Variable Mods Set for whole protein - process variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
 */
const _create_variableModificationsUniqueMassesSet_Process_variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = function(
    {
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
        modificationMass_CommonRounding_ReturnNumber,
        variableModificationsUniqueMassesSet  // Updated
    } : {
        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
        variableModificationsUniqueMassesSet : Set<number>
    }) : void {

    for ( const entryForReportedPeptide of variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) {

        for ( const entry of entryForReportedPeptide ) {

            let mass = entry.mass;

            if ( modificationMass_CommonRounding_ReturnNumber ) {

                //  Used in multiple searches to round the modification mass
                mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
            }

            variableModificationsUniqueMassesSet.add( mass );
        }
    }
}



////////////////////////////////

//   !!!   OPEN Mods


/**
 * Get Unique Open Mods Set for whole protein
 */
const _create_openModificationsUniqueMassesSet = function(
    {
        proteinSequenceVersionId,        //  Optional
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    } : {
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : {
    data: Set<number>
    promise: Promise<Set<number>>
} {

    //  Unique Open Mod masses for the protein
    const openModificationsUniqueMassesSet: Set<number> = new Set();

    if (proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null) {

        const promise = _create_openModificationsUniqueMassesSet__Have__proteinSequenceVersionId({
            proteinSequenceVersionId,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

            openModificationsUniqueMassesSet  // Updated
        })

        //  EARLY RETURN
        return { data: undefined, promise: new Promise<Set<number>>((resolve, reject) => { try {
                promise.catch(reason => reject(reason))
                promise.then(noValue => { try {
                    resolve(openModificationsUniqueMassesSet)
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        };
    }

    //  NO proteinSequenceVersionId

    return _create_openModificationsUniqueMassesSet__NO__proteinSequenceVersionId({
        projectSearchIds, openModificationsUniqueMassesSet, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    })

}

/**
 * 'async' function
 *
 * Get Unique Open Mods Set   --  Have proteinSequenceVersionId
 *
 */
const _create_openModificationsUniqueMassesSet__Have__proteinSequenceVersionId = async function(
    {
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        openModificationsUniqueMassesSet  // Updated
    } : {
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        openModificationsUniqueMassesSet: Set<number> // Updated
    }) : Promise<void> {
    try {
        if ( ! proteinSequenceVersionId ) {
            const msg = "_create_openModificationsUniqueMassesSet__Have__proteinSequenceVersionId: ( ! proteinSequenceVersionId )"
            console.warn(msg)
            throw Error(msg)
        }

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("No entry in commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root for projectSearchId: " + projectSearchId );
            }

            //  Get Reported Peptide Ids for proteinSequenceVersionId

            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise();

            const reportedPeptideIds_For_ProteinSequenceVersionId =
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.
                get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId)

            if ( ! reportedPeptideIds_For_ProteinSequenceVersionId ) {
                //  No data for protein so skip
                continue;
            }

            const get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise();

            const openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_ReturnPromise_Result.openModifications_On_PSM_For_MainFilters_Holder;

            for ( const reportedPeptideId of reportedPeptideIds_For_ProteinSequenceVersionId) {

                const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap =
                    openModifications_On_PSM_For_MainFilters_Holder.get_psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);

                if ( ! psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap ) {
                    //  No data for reportedPeptideId so skip
                    continue;  // EARLY CONTINUE
                }

                for ( const psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmId_MapValue of psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmIdMap.openModificationMass_RoundedMap.values() ) {
                    openModificationsUniqueMassesSet.add( psm_ROUNDED_MASS_OpenModificationMassPerPSM_ForPsmId_MapValue.openModificationMass_Rounded )
                }
            }
        }

        return;  //  return void

    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
        throw e;
    }
}


/**
 * Get Unique Open Mods Set   --  NO proteinSequenceVersionId
 */
const _create_openModificationsUniqueMassesSet__NO__proteinSequenceVersionId = function(
    {
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        openModificationsUniqueMassesSet // Updated
    } : {
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        openModificationsUniqueMassesSet: Set<number> // Updated
    }) : {
    data: Set<number>
    promise: Promise<Set<number>>
} {

    const promises_TopLevel_AllSearches: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("No entry in commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root for projectSearchId: " + projectSearchId );
        }

        const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
            get_OpenModifications_On_PSMHolder_AllForSearch();

        if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {

            const openModifications_On_PSM_For_MainFilters_Holder =
                get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder

            _create_openModificationsUniqueMassesSet_Process_WholeSearch_For_MainFilters({
                openModifications_On_PSM_For_MainFilters_Holder,
                openModificationsUniqueMassesSet  // Updated
            });

        } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {

            const promise = new Promise<void>((resolve, reject) => {
                try {
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            const openModifications_On_PSM_For_MainFilters_Holder =
                                value.openModifications_On_PSM_For_MainFilters_Holder
                            _create_openModificationsUniqueMassesSet_Process_WholeSearch_For_MainFilters({
                                openModifications_On_PSM_For_MainFilters_Holder,
                                openModificationsUniqueMassesSet  // Updated
                            });
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promises_TopLevel_AllSearches.push(promise)

        } else {
            throw Error("get_penModifications_On_PSMHolder_AllForSearch_Result neither 'data' 'promise");
        }
    }

    if ( promises_TopLevel_AllSearches.length === 0 ) {
        return { data: openModificationsUniqueMassesSet, promise: undefined };
    }

    const promisesAll = Promise.all(promises_TopLevel_AllSearches);

    const promiseReturn = new Promise<Set<number>>((resolve, reject) => {
        promisesAll.catch(reason => {
            reject(reason)
        })
        promisesAll.then(noValue => {
            try {
                resolve(openModificationsUniqueMassesSet)
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })
    return { data: undefined, promise: promiseReturn };
}

/**
 * Get Unique Open Mods Set for Whole SearchFor MainFilters - process OpenModifications_On_PSM_For_MainFilters_Holder --  No Protein Id
 */
const _create_openModificationsUniqueMassesSet_Process_WholeSearch_For_MainFilters = function(
    {
        openModifications_On_PSM_For_MainFilters_Holder,
        openModificationsUniqueMassesSet  // Updated
    } : {
        openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
        openModificationsUniqueMassesSet : Set<number>
    }) : void {

    for ( const entryForReportedPeptide of openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_Entries() ) {

        for ( const entry of entryForReportedPeptide.psmOpenModificationMassPerPSM_ForPsmIdMap.values() ) {

            openModificationsUniqueMassesSet.add( entry.openModificationMass_Rounded );
        }
    }
}

export { modificationMass_UserSelections_BuildData_ForReactComponent }
