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
    // modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';

import {
    ModificationMass_UserSelections_ComponentData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData,
    ModificationMass_UserSelections_ComponentData_StaticModificationsData_Entry,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData,
    ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData_Entry
} from './modificationMass_UserSelections_ComponentData';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";

const _MAX_MODS_DISPLAY_NON_SELECTED__VARIABLE_MODS = 20;

// for Open Mods: Always display Add/Change Links. Never initially show not selected mass values
const _MAX_MODS_DISPLAY_NON_SELECTED__OPEN_MODS = 0;


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
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : modificationMass_UserSelections_StateObject.get_VariableModificationSelections(),
        proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, modificationMass_CommonRounding_ReturnNumber
    })

    const open_ModificationsData = _open_modificationMass_UserSelections_BuildData_ForReactComponent({
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
        proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, modificationMass_CommonRounding_ReturnNumber
    })

    const result : ModificationMass_UserSelections_ComponentData = {
        staticModificationsData,
        variableModificationsData,
        open_ModificationsData
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
}) : ModificationMass_UserSelections_ComponentData_StaticModificationsData {

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
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
    modificationMass_CommonRounding_ReturnNumber
} : {
    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>, 
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData {

    const modificationsUniqueMassesSet = _create_variableModificationsUniqueMassesSet({
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    });

    if (modificationsUniqueMassesSet.size === 0) {

        //  No Modifications so return here
        const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

        return result; // EARLY EXIT
    }

    return _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
        maxModsDisplay_Unselected : _MAX_MODS_DISPLAY_NON_SELECTED__VARIABLE_MODS,
        modificationsUniqueMassesSet,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    })
}

///


/**
 *
 *
 */
const _open_modificationMass_UserSelections_BuildData_ForReactComponent = function(
    {
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject: ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId: number,
        projectSearchIds: Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        modificationMass_CommonRounding_ReturnNumber: modificationMass_CommonRounding_ReturnNumber_Function
    }) : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData {

    const modificationsUniqueMassesSet = _create_openModificationsUniqueMassesSet({
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    });

    if (modificationsUniqueMassesSet.size === 0) {

        //  No Modifications so return here
        const result: ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {showNo_Variable_or_Open_ModificationsMsg: true};

        return result; // EARLY EXIT
    }

    return _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent({
        maxModsDisplay_Unselected : _MAX_MODS_DISPLAY_NON_SELECTED__OPEN_MODS,
        modificationsUniqueMassesSet,
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    })
}


///

/**
 *
 *
 */
const _variable_or_open_modificationMass_UserSelections_BuildData_ForReactComponent = function({

   maxModsDisplay_Unselected,
   modificationsUniqueMassesSet,
   modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
   proteinSequenceVersionId,
   projectSearchIds,
   loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
   modificationMass_CommonRounding_ReturnNumber
} : {
    maxModsDisplay_Unselected : number
    modificationsUniqueMassesSet: Set<number>
    modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
}) : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData {

    const unmodified_Selection_Variable_or_Open_Modifications : SingleProtein_Filter_PerUniqueIdentifier_Entry = modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_NO_Modification_AKA_Unmodified_Selected();

    //   Set
    const modificationsSelected__OnlyModMasses_AsSet = modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject.get_ModificationsSelected__OnlyModMasses_AsSet()

    const result : ModificationMass_UserSelections_ComponentData_Variable_or_Open_ModificationsData = {
        unmodified_Selection_Variable_or_Open_Modifications,
        showAdd_Variable_or_Open_ModificationsSelectionLink : false,
        variable_or_Open_ModificationEntries : undefined,
        showChange_Variable_or_Open_ModificationsSelectionLink : undefined,
    
        modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject,
        proteinSequenceVersionId, 
        projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
        modificationMass_CommonRounding_ReturnNumber
    }; 

    if ( ( modificationsSelected__OnlyModMasses_AsSet.size === 0 ) && ( modificationsUniqueMassesSet.size > maxModsDisplay_Unselected ) ) {

        result.showAdd_Variable_or_Open_ModificationsSelectionLink = true;
        return result; // EARLY EXIT
    }

    let showChange_Variable_or_Open_ModificationsSelectionLink = false;

    if ( ( modificationsUniqueMassesSet.size > maxModsDisplay_Unselected )
        && ( modificationsUniqueMassesSet.size !== ( modificationsSelected__OnlyModMasses_AsSet.size ) ) ) {
        //  more mod masses than normally display and not all are selected
        showChange_Variable_or_Open_ModificationsSelectionLink = true;
    }

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

        if ( ( ! showChange_Variable_or_Open_ModificationsSelectionLink ) || ( selectionType ) ) {
            //  Either not > _MAX_MODS_DISPLAY_NON_SELECTED mod masses OR the mod has has been selected
            variable_or_Open_ModificationEntries.push( resultEntry );
        }
    }

    result.variable_or_Open_ModificationEntries = variable_or_Open_ModificationEntries;
    result.showChange_Variable_or_Open_ModificationsSelectionLink = showChange_Variable_or_Open_ModificationsSelectionLink;

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
}) : Set<number> {

    //  Unique Variable Mod masses for the protein
    const variableModificationsUniqueMassesSet : Set<any> = new Set(); 

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );

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
        } else {

            //  NO proteinSequenceVersionId

            const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

            if ( dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
                for ( const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.entries() ) {

                    const dynamicModificationsOnReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry[ 1 ];
                    for ( const dynamicModificationArrayEntry of dynamicModificationsOnReportedPeptide ) {
                        let mass = dynamicModificationArrayEntry.mass;

                        if ( modificationMass_CommonRounding_ReturnNumber ) {

                            //  Used in multiple searches to round the modification mass
                            mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
                        }

                        variableModificationsUniqueMassesSet.add( mass );
                    }
                }
            }
        }
    }

    return variableModificationsUniqueMassesSet;
}

/**
 * Get Unique Open Mods Set for whole protein
 */
const _create_openModificationsUniqueMassesSet = function(
    {
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    } : {
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Function
    }) : Set<number> {

    //  Unique Variable Mod masses for the protein
    const modificationsUniqueMassesSet : Set<any> = new Set();

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
        }

        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

            const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();

            if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {

                const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );

                if ( modificationsOnProtein ) {
                    for ( const modificationOnProtein of modificationsOnProtein) {
                        //  Currently a single array of all  mods for the protein.
                        let mass = modificationOnProtein.mass;
                        // const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                        if ( modificationMass_CommonRounding_ReturnNumber ) {

                            //  Used in multiple searches to round the modification mass
                            mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
                        }

                        modificationsUniqueMassesSet.add( mass );
                    }
                }
            }
        } else {

            //  NO proteinSequenceVersionId

            const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();
            if ( openModificationsOnReportedPeptide_KeyReportedPeptideId ) {
                for ( const openModificationsOnReportedPeptide_KeyReportedPeptideId_MapEntry of openModificationsOnReportedPeptide_KeyReportedPeptideId.entries() ) {
                    const openModificationsOnReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId_MapEntry[ 1 ];
                    for ( const massEntry of openModificationsOnReportedPeptide ) {
                        let mass = massEntry.mass;

                        if ( modificationMass_CommonRounding_ReturnNumber ) {

                            //  Used in multiple searches to round the modification mass
                            mass = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
                        }

                        modificationsUniqueMassesSet.add( mass );
                    }
                }
            }


        }
    }

    return modificationsUniqueMassesSet;
}


export { modificationMass_UserSelections_BuildData_ForReactComponent }
