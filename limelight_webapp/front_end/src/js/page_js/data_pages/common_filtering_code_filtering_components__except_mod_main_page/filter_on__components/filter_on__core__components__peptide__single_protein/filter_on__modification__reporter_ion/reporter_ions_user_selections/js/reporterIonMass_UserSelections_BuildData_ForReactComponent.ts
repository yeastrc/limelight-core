/**
 * reporterIonMass_UserSelections_BuildData_ForReactComponent.ts
 * 
 * Reporter Ion Selection - Build Data for React Component
 * 
 *  !!!! React Version !!!!
 * 
 * Display Data used in: reporterIonMass_UserSelections_Root.tsx
 */

//  At bottom:  export { reporterIonMass_UserSelections_BuildData_ForReactComponent }


//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import {reporterIonMass_CommonRounding_ReturnNumber_Function} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import {ReporterIonMass_UserSelections_StateObject} from './reporterIonMass_UserSelections_StateObject';

import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch";

/**
 *  Result from call to reporterIonMass_UserSelections_BuildData_ForReactComponent
 * 
 */
interface ReporterIonMass_UserSelections_ComponentData { 
    reporterIonEntries? : Array< {
        reporterIonMass : number,
        selected : boolean
    } >,
    showNoReporterIonsMsg? : boolean
}

/**
 *
 *
 */
const reporterIonMass_UserSelections_BuildData_ForReactComponent = function(
    {
        reporterIonMass_UserSelections_StateObject,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        reporterIonMass_CommonRounding_ReturnNumber // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
    } : {
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search

    }) : Promise<ReporterIonMass_UserSelections_ComponentData> // Return Promise since use 'await'
{

    const reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder> = new Map()

    const promises: Array<Promise<void>> = [];

    for (const projectSearchId of projectSearchIds) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
            const msg = "reporterIonMass_UserSelections_BuildData_ForReactComponent: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned nothing for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }
        const get_ReporterIonMasses_ForSearchHolder_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch().get_ReporterIonMasses_ForSearchHolder()

        if (get_ReporterIonMasses_ForSearchHolder_Result.data) {
            reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId.set(
                projectSearchId,
                get_ReporterIonMasses_ForSearchHolder_Result.data.reporterIonMasses_ForSearch_Holder
            );
        } else if (get_ReporterIonMasses_ForSearchHolder_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                try {
                    get_ReporterIonMasses_ForSearchHolder_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_ReporterIonMasses_ForSearchHolder_Result.promise.then(value => {
                        try {
                            reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId,
                                value.reporterIonMasses_ForSearch_Holder
                            );
                            resolve()

                        } catch (e) {
                            console.warn("Exception caught", e);
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }
                    })
                } catch (e) {
                    console.warn("Exception caught", e);
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
            promises.push(promise);
        } else {
            throw Error("get_ReporterIonMasses_ForSearchHolder_Result no 'data' or 'promise'")
        }
    }

    if (promises.length === 0) {

        const result = _createResult({
            reporterIonMass_UserSelections_StateObject,
            projectSearchIds,
            reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId,
            reporterIonMass_CommonRounding_ReturnNumber
        })

        return Promise.resolve(result);            //  EARLY RETURN
    }

    const promises_All = Promise.all(promises);

    const promise_Return = new Promise<ReporterIonMass_UserSelections_ComponentData>((resolve, reject) => {
        promises_All.catch(reason => {
            reject(reason)
        })
        promises_All.then(value => {
            try {
                const result = _createResult({
                    reporterIonMass_UserSelections_StateObject,
                    projectSearchIds,
                    reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId,
                    reporterIonMass_CommonRounding_ReturnNumber
                })

                resolve(result)

            } catch (e) {
                console.warn("Exception caught", e);
                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                throw e;
            }
        })
    })

    return promise_Return;

}

const _createResult = function (
    {
        reporterIonMass_UserSelections_StateObject,
        projectSearchIds,
        reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId,
        reporterIonMass_CommonRounding_ReturnNumber
    } : {
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
        projectSearchIds : Array<number>
        reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch_Holder>
        reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
    }
) : ReporterIonMass_UserSelections_ComponentData {


    //  Unique Variable Mod masses for the protein or selected positions
    const reporterIonsUniqueMassesSet : Set<number> = new Set();

    for ( const projectSearchId of projectSearchIds ) {

        // const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        // if ( ! loadedDataPerProjectSearchIdHolder ) {
        //     throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        // }

        const reporterIonMasses_ForSearch_Holder = reporterIonMasses_ForSearch_Holder_Map_Key_ProjectSearchId.get(projectSearchId);

        if ( reporterIonMasses_ForSearch_Holder ) {

            const reporterIonMasses_ForSearch : Set<number> = reporterIonMasses_ForSearch_Holder.get_ReporterIonMasses_ForSearch();

            for ( const reporterIonMass of reporterIonMasses_ForSearch) {

                let mass = reporterIonMass;

                if ( reporterIonMass_CommonRounding_ReturnNumber ) {

                    //  Used in multiple searches to round the reporterIon mass
                    mass = reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
                }

                reporterIonsUniqueMassesSet.add( mass );
            }
        }
    }

    if ( ( ! reporterIonsUniqueMassesSet ) || reporterIonsUniqueMassesSet.size === 0 ) {

        //  No Reporter Ions so return here
        const result = { showNoReporterIonsMsg : true };

        return result; // EARLY EXIT
    }

    //  Masses as Array so can sort
    const reporterIonUniqueMassesArray = Array.from( reporterIonsUniqueMassesSet );

    //  Sort masses
    reporterIonUniqueMassesArray.sort( function(a, b) {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    const reporterIonEntries = [];  // mass with checked flag

    for ( const reporterIonUniqueMassEntry of reporterIonUniqueMassesArray ) {

        const selected = reporterIonMass_UserSelections_StateObject.is_ReporterIon_Selected( reporterIonUniqueMassEntry );

        const resultEntry = {
            reporterIonMass : reporterIonUniqueMassEntry,
            selected
        };
        reporterIonEntries.push( resultEntry );
    }

    const result = { 
        reporterIonEntries
    }; 

    return result;
}



export { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData }
