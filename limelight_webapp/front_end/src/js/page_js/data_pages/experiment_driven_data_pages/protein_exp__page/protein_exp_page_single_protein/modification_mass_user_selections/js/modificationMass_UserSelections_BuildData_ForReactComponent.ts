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
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


import { _VARIABLE_MODIFICATION__UNMODIFIED_SELECTED } from '../jsx/modificationMass_UserSelections_Constants';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';

import { ModificationMass_UserSelections_ComponentData } from './modificationMass_UserSelections_ComponentData';

const _MAX_MODS_DISPLAY_NON_SELECTED = 20;


/**
 * 
 * 
 */
const modificationMass_UserSelections_BuildData_ForReactComponent = function({ 
    
    modificationMass_UserSelections_StateObject, 
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    modificationMass_CommonRounding_ReturnNumber // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
} : { 
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
}) : ModificationMass_UserSelections_ComponentData {

    const staticModificationsData = _create_staticModificationsUniqueResidueLettersMassesMapSet({ 
        modificationMass_UserSelections_StateObject, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, modificationMass_CommonRounding_ReturnNumber
    });

    const variableModificationsData = _variable_modificationMass_UserSelections_BuildData_ForReactComponent({ 
        modificationMass_UserSelections_StateObject, proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, modificationMass_CommonRounding_ReturnNumber
    })

    const result = {
        staticModificationsData,
        variableModificationsData
    }

    return result;
}


///////////////////////////////////////////////////////////

/**
 * Get Unique Static Mod  Map<Residue Letter, <Set<Mod Mass>> for the Searches
 */
const _create_staticModificationsUniqueResidueLettersMassesMapSet = function({ 
    modificationMass_UserSelections_StateObject, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
    modificationMass_CommonRounding_ReturnNumber
} : { 
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) {

    //  Unique Static Mod Residue Letter/ masses for the Searches:  Map<Residue Letter, <Set<Mod Mass>>
    const staticModificationsUniqueResidueLettersMassesMapSet = new Map(); 

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        const staticModsForSearch = loadedDataPerProjectSearchIdHolder.get_staticMods();

        if ( staticModsForSearch ) {
            for ( const staticModEntry of staticModsForSearch ) { // mass: 57.021464, residue: "C"
                const residue = staticModEntry.residue;
                let massesSet = staticModificationsUniqueResidueLettersMassesMapSet.get( residue );
                if ( ! massesSet ) {
                    massesSet = new Set();
                    staticModificationsUniqueResidueLettersMassesMapSet.set( residue, massesSet );
                }

                let mass = staticModEntry.mass;

                //  Used in multiple searches to round the modification mass
                mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function

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

    const residueLetterMassArrayForDisplay = [];

    //  Masses as Array so can sort

    for ( const mapEntry of staticModificationsUniqueResidueLettersMassesMapSet.entries() ) {

        const residueLetter = mapEntry[ 0 ];
        const modMasses = mapEntry[ 1 ];
        for ( const modMass of modMasses ) {

            const displayEntry = { residueLetter, modMass };
            
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
        const staticModificationsSelected = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected();

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
    
    modificationMass_UserSelections_StateObject, 
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
    modificationMass_CommonRounding_ReturnNumber
} : { 
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) {

    const variableModificationsUniqueMassesSet = _create_variableModificationsUniqueMassesSet({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, modificationMass_CommonRounding_ReturnNumber });

    if ( variableModificationsUniqueMassesSet.size === 0 ) {

        //  No Modifications so return here
        const result = { showNoVariableModificationsMsg : true };

        return result; // EARLY EXIT
    }

    const is_NO_VariableModification_AKA_Unmodified_Selected : boolean = modificationMass_UserSelections_StateObject.is_NO_VariableModification_AKA_Unmodified_Selected();

    //   Set
    const variableModificationsSelected_ExcludingNoModificationOption = modificationMass_UserSelections_StateObject.get_VariableModificationsSelected_ExcludingNoModificationOption()

    const result = { 
        is_NO_VariableModification_AKA_Unmodified_Selected,
        showAddVariableModificationsSelectionLink : false,
        variableModificationEntries : undefined,
        showChangeVariableModificationsSelectionLink : undefined,
    
        modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId, 
        projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
        modificationMass_CommonRounding_ReturnNumber
    }; 

    if ( ( variableModificationsSelected_ExcludingNoModificationOption.size === 0 ) && ( variableModificationsUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) ) {

        result.showAddVariableModificationsSelectionLink = true;
        return result; // EARLY EXIT
    }

    let showChangeVariableModificationsSelectionLink = false;

    if ( ( variableModificationsUniqueMassesSet.size > _MAX_MODS_DISPLAY_NON_SELECTED ) && ( variableModificationsUniqueMassesSet.size !== variableModificationsSelected_ExcludingNoModificationOption.size ) ) {
        //  more mod masses than normally display and not all are selected
        showChangeVariableModificationsSelectionLink = true;
    }

    //  Masses as Array so can sort
    const modUniqueMassesArray = Array.from( variableModificationsUniqueMassesSet );

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

    const variableModificationEntries = [];  // mass with checked flag

    for ( const modUniqueMassEntry of modUniqueMassesArray ) {

        const selected = variableModificationsSelected_ExcludingNoModificationOption.has( modUniqueMassEntry );

        const resultEntry = {
            modMass : modUniqueMassEntry,
            selected
        };

        if ( ( ! showChangeVariableModificationsSelectionLink ) || ( selected ) ) {
            //  Either not > _MAX_MODS_DISPLAY_NON_SELECTED mod masses OR the mod has has been selected
            variableModificationEntries.push( resultEntry );
        }
    }

    result.variableModificationEntries = variableModificationEntries;
    result.showChangeVariableModificationsSelectionLink = showChangeVariableModificationsSelectionLink;

    return result;
}


/**
 * Get Unique Variable Mods Set for whole protein
 */
const _create_variableModificationsUniqueMassesSet = function({ 
    
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
    modificationMass_CommonRounding_ReturnNumber 
} : { 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) : Set<any> {

    //  Unique Variable Mod masses for the protein or selected positions
    const variableModificationsUniqueMassesSet : Set<any> = new Set(); 

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

        if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

            const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );

            if ( modificationsOnProtein ) {
                for ( const modificationOnProtein of modificationsOnProtein) {
                    //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                    const position = modificationOnProtein.position;
                    let mass = modificationOnProtein.mass;
                    // const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                    //  Used in multiple searches to round the modification mass
                    mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function

                    variableModificationsUniqueMassesSet.add( mass );
                }
            }
        }
    }

    return variableModificationsUniqueMassesSet;
}


export { modificationMass_UserSelections_BuildData_ForReactComponent }
