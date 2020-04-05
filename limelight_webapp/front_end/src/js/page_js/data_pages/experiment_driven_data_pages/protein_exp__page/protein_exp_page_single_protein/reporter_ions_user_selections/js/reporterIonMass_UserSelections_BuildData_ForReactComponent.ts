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
import { 
    reporterIonMass_CommonRounding_ReturnNumber_Function,
    reporterIonMass_CommonRounding_ReturnString_Function,
    // reporterIonMass_CommonRounding_ReturnNumber, 
    reporterIonMass_CommonRounding_ReturnString, 
    _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ReporterIonMass_UserSelections_StateObject } from './reporterIonMass_UserSelections_StateObject';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

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
const reporterIonMass_UserSelections_BuildData_ForReactComponent = function({ 
    
    reporterIonMass_UserSelections_StateObject, 
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    reporterIonMass_CommonRounding_ReturnNumber // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
} : { 
    
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
}) : ReporterIonMass_UserSelections_ComponentData {

    const reporterIonsUniqueMassesSet = _create_reporterIonsUniqueMassesSet({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, reporterIonMass_CommonRounding_ReturnNumber });

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


/**
 * Get Unique Reporter Ions Set for all searches
 */
const _create_reporterIonsUniqueMassesSet = function({ 
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
    reporterIonMass_CommonRounding_ReturnNumber 
} : { 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Function
}) : Set<number> {

 

    //  Unique Variable Mod masses for the protein or selected positions
    const reporterIonsUniqueMassesSet : Set<number> = new Set(); 

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        const reporterIonMasses_ForSearch : Set<number> = loadedDataPerProjectSearchIdHolder.get_reporterIonMasses_ForSearch();

        if ( reporterIonMasses_ForSearch ) {

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

    return reporterIonsUniqueMassesSet;
}


export { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData }
