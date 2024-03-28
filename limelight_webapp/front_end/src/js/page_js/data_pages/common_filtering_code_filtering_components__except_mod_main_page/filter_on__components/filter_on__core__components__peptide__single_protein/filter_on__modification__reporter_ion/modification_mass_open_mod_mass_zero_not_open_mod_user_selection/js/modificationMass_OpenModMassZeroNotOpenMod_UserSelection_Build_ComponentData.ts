/**
 * modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData.ts
 *
 * Peptide Unique Selection - Build Data for React Component
 *
 * Display Data used in: modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Component.tsx
 */

import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

/**
 * build object of class ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
 *
 */
export const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_ReturnPromise = async function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {

        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData>
{
    try {
        const result = modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        if (result.promise) {
            return result.promise
        }

        return Promise.resolve(result.data)

    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
        throw e;
    }
}

/**
 * build object of class ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
 *
 */
export const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent = function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {

        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : {
    data: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    promise: Promise<ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData>
} {

    const treatOpenModMassZeroAsUnmodified_UserSelection = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection();

    const openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder> = new Map()

    const promises: Array<Promise<void>> = [];

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned nothing for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }
        const get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters().get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch()

        if ( get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.data ) {
            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                projectSearchId,
                get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.data.openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
            );
        } else if ( get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => {
                try {
                    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result.promise.then(value => {
                        try {
                            openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId,
                                value.openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder
                            );
                            resolve()

                        } catch( e ) {
                            console.warn("Exception caught", e);
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    console.warn("Exception caught", e);
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
            promises.push(promise);
        } else {
            throw Error("get_OpenModification_RollUp_On_ReportedPeptideLevelHolder_AllForSearch_Result no 'data' or 'promise'")
        }
    }

    if ( promises.length === 0 ) {

        const searchesHaveOpenModMassEntries = _compute_searchesHaveOpenModMassEntries({
            projectSearchIds, openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId
        })

        return {            //  EARLY RETURN
            data: {
                treatOpenModMassZeroAsUnmodified_UserSelection, searchesHaveOpenModMassEntries
            },
            promise: undefined
        };
    }

    const promises_All = Promise.all(promises);

    const promise_Return = new Promise<ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData>((resolve, reject) => {
        promises_All.catch(reason => {
            reject(reason)
        })
        promises_All.then(value => {
            try {
                const searchesHaveOpenModMassEntries = _compute_searchesHaveOpenModMassEntries({
                    projectSearchIds, openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId
                })

                resolve({ searchesHaveOpenModMassEntries, treatOpenModMassZeroAsUnmodified_UserSelection})

            } catch( e ) {
                console.warn("Exception caught", e);
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })

    return {
        promise: promise_Return, data: undefined
    };
}

const _compute_searchesHaveOpenModMassEntries = function(
    {
        projectSearchIds, openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId
    } : {
        projectSearchIds : Array<number>
        openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder>
    }
): boolean {

    let searchesHaveOpenModMassEntries = false;

    for ( const projectSearchId of projectSearchIds ) {

        // const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        // if (!loadedDataPerProjectSearchIdHolder) {
        //     throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId);
        // }

        const openModificationsOnReportedPeptide_KeyReportedPeptideId = openModification_RollUp_On_ReportedPeptideLevel_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);

        if (openModificationsOnReportedPeptide_KeyReportedPeptideId && openModificationsOnReportedPeptide_KeyReportedPeptideId.is_Has_OpenModificationsOnReportedPeptide_Entries() ) {

            searchesHaveOpenModMassEntries = true;
            break;
        }
    }

    return searchesHaveOpenModMassEntries;
}

