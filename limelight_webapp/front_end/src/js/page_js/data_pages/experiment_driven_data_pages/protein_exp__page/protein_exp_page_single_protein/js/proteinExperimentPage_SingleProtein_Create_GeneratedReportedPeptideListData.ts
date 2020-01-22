/**
 * proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData.ts
 * 
 * Get Generated Reported Peptide List
 * 
 * Create Generated Reported Peptide String, and combine data per project search id and reported peptide id under them
 * 
 */

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts


//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';


//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber_Function,
    reporterIonMass_CommonRounding_ReturnString_Function,
    reporterIonMass_CommonRounding_ReturnNumber, 
    reporterIonMass_CommonRounding_ReturnString, 
    _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import { psm_ReporterIonMasses_FilterOnSelectedValues } from 'page_js/data_pages/data_pages_common/psm_ReporterIonMasses_FilterOnSelectedValues';

import { peptideSequence_CreateCommonDisplayString } from 'page_js/data_pages/peptide_sequence_display_string_common/peptideSequence_CreateCommonDisplayString';

//  Child Data Searches for Single Peptide show/hide


//  returns React Component to insert below current data row

// import { 
//     searchesForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent, SearchesForSinglePeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter 
// } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__searches_for_single_peptide/js/searchesForSinglePeptide_ReturnChildReactComponent';


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Root Table";







///////////////////

/**
 * Result from create_GeneratedReportedPeptideListData call
 */
export class Create_GeneratedReportedPeptideListData_Result {
    peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry>;
    entries_Key_peptideSequenceDisplay : Map<any , CreateReportedPeptideDisplayData_Result_Entry>; // AKA peptideItems_Map_Key_peptideSequenceDisplayString : Map<any , CreateReportedPeptideDisplayData_Result_Entry>
    numberOfReportedPeptides : number;
    numberOfPsmsForReportedPeptides : number;
}
// { // Return Object def:
//     peptideList, peptideItems_Map_Key_peptideSequenceDisplayString, numberOfReportedPeptides, numberOfPsmsForReportedPeptides
// } 
/**
 * Result from createReportedPeptideDisplayData call
 */
export class CreateReportedPeptideDisplayData_Result_Entry {
    peptideSequenceDisplay : string
    numPsmsTotal : number = 0;
    psmCountsMap_KeyProjectSearchId : Map<number, number>
    reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>>
}

/**
 * Create Reported Peptide Data for Display or Download
 * 
 * Reported Peptide List
 * Number of Reported Peptides
 * Number of PSMs total
 */
export const create_GeneratedReportedPeptideListData = function( { 
    
    reportedPeptideIdsForDisplay_Map_KeyProjectSearchId, 
    reporterIonMassesSelected, 
    staticModificationMassesToFilterOn, 
    proteinSequenceVersionId, 
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder
} : {
    reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : Map<number, Array<number>>, 
    reporterIonMassesSelected : Set<number>, 
    staticModificationMassesToFilterOn, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,

} ) : Create_GeneratedReportedPeptideListData_Result {

    const create_GeneratedReportedPeptideListData_Result = new Create_GeneratedReportedPeptideListData_Result();

    const peptideItems_Map_Key_peptideSequenceDisplayString : Map<any , CreateReportedPeptideDisplayData_Result_Entry> = new Map();

    const reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to external function psm_ReporterIonMasses_FilterOnSelectedValues
        transformMass_ReturnNumber : function({ mass }) {
            return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
        }
    }
    
    let numberOfPsmsForReportedPeptides = 0; // PSM Count Total
    
    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIdsForDisplay = reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.get( projectSearchId );
        if ( ! reportedPeptideIdsForDisplay ) {
            throw Error( "No reportedPeptideIdsForDisplay for projectSearchId: " + projectSearchId );
        }

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
        }

        //  Map<(reported peptide), Map<(position),Array<(mod mass rounded strings)>>
        const variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = ( 
            _getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({ 
                loadedDataPerProjectSearchIdHolder, 
                reportedPeptideIdsForDisplay, 
                proteinSequenceVersionId
            })
        );

        //   The selected static modifications, filtered for this project search id
        const selectedStaticModificationsForProjectSearchId = _get_selectedStaticModificationsForProjectSearchId({ staticModificationMassesToFilterOn, loadedDataPerProjectSearchIdHolder });

        // const numPsmsForProjectSearchId_ObjectPropertyName = _NUM_PSMS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

        // const reportedPeptideIdsForProjectSearchId_ObjectPropertyName = _REPORTED_PEPTIDE_IDS_JS_OBJECT_PROPERTY_NAME_PREFIX + projectSearchId;

        //  Various Maps, key Reported Peptide Id
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        let psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = undefined;

        if ( reporterIonMassesSelected && reporterIonMassesSelected.size !== 0 ) {
            //  User has selected Reporter Ion Masses so need to compute psm count

            psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                //  No psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs for this Project Search Id
                // throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs()" );
            }
        }

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
        
            let numPsms = undefined;
        
            if ( reporterIonMassesSelected && reporterIonMassesSelected.size !== 0 ) {
                //  User has selected Reporter Ion Masses so need to compute psm count

                if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
                    
                    //  loadedDataPerProjectSearchIdHolder not contain psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs for this Project Search Id
                    numPsms = 0;
                
                } else {

                    const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

                    if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                        // No data for this reported peptide
                        throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. nothing returned from psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId ). reportedPeptideId: " + reportedPeptideId );
                    }

                    const psmReporterIonMassesPerPSM_ForPsmIdMap = psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

                    const psm_ReporterIonMasses_FilterOnSelectedValues_Result = (
                        psm_ReporterIonMasses_FilterOnSelectedValues({ reporterIonMassesSelected, psmReporterIonMassesPerPSM_ForPsmIdMap, returnPsmIds : false, reporterIonMassTransformer })
                    );
                    const numPsmsLocal = psm_ReporterIonMasses_FilterOnSelectedValues_Result.count;

                    if ( ! numPsmsLocal ) {
                        throw Error("_createReportedPeptideDisplayData: reporterIonMassesSelected is populated. No numPsmsLocal for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
                    }

                    numPsms = numPsmsLocal;
                }
                
            } else {

                numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                if ( ! numPsms ) {
                    throw Error("_createReportedPeptideDisplayData: No numPsms for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
                }
            }

            numberOfPsmsForReportedPeptides += numPsms;

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
            if ( ! peptideId ) {
                throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
            }

            const peptideSequenceString : string = loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } );
            if ( ! peptideSequenceString ) {
                throw Error("_createReportedPeptideDisplayData: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
            }

            const variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;

            const staticModificationsRounded_KeyPosition = _get_staticModificationsRounded_KeyPosition_ForSelectedStaticModsAndPeptideSequence({ peptideSequenceString, selectedStaticModificationsForProjectSearchId });

            //   Call external function
            const peptideSequenceDisplay = peptideSequence_CreateCommonDisplayString({ peptideSequence : peptideSequenceString, variableModificationsRoundedArray_KeyPosition, staticModificationsRounded_KeyPosition });

            let peptideItemInMap : CreateReportedPeptideDisplayData_Result_Entry = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplay );
            if ( peptideItemInMap ) {

                peptideItemInMap.numPsmsTotal += numPsms;

                {
                    const psmCountsFromMap = peptideItemInMap.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                    if ( ! psmCountsFromMap ) {
                        peptideItemInMap.psmCountsMap_KeyProjectSearchId.set( projectSearchId, numPsms );
                    } else {
                        const new_psmCountsFromMap  = psmCountsFromMap + numPsms;
                        peptideItemInMap.psmCountsMap_KeyProjectSearchId.set( projectSearchId, new_psmCountsFromMap );
                    }
                }
                {
                    const reportedPeptideIdsFromMap = peptideItemInMap.reportedPeptideIdsMap_KeyProjectSearchId.get( projectSearchId );
                    if ( ! reportedPeptideIdsFromMap ) {
                        const reportedPeptideIds : Set<number> = new Set();
                        reportedPeptideIds.add( reportedPeptideId );
                        peptideItemInMap.reportedPeptideIdsMap_KeyProjectSearchId.set( projectSearchId, reportedPeptideIds );
                    } else {
                        reportedPeptideIdsFromMap.add( reportedPeptideId );
                    }
                }

                //  End Loop processing here

                continue;  // EARLY CONTINUE
            }

            //  Create and add new entry to peptideItems_Map_Key_peptideSequenceDisplayString

            //   peptideItemInMap is undefined from Get in Map
            
            //  peptideSequenceDisplay not already found in map so create new object and put in map

            const reportedPeptideIds : Set<number> = new Set();
            reportedPeptideIds.add( reportedPeptideId );

            const peptideItem = new CreateReportedPeptideDisplayData_Result_Entry();
            peptideItem.peptideSequenceDisplay = peptideSequenceDisplay;
            peptideItem.psmCountsMap_KeyProjectSearchId = new Map();
            peptideItem.psmCountsMap_KeyProjectSearchId.set( projectSearchId, numPsms );
            peptideItem.reportedPeptideIdsMap_KeyProjectSearchId = new Map();
            peptideItem.reportedPeptideIdsMap_KeyProjectSearchId.set( projectSearchId, reportedPeptideIds );

            peptideItems_Map_Key_peptideSequenceDisplayString.set( peptideSequenceDisplay, peptideItem );
        }
    }

    const peptideListResult : Array<CreateReportedPeptideDisplayData_Result_Entry> = [];

    //  Copy to array
    for ( const peptideItemsEntry of peptideItems_Map_Key_peptideSequenceDisplayString.entries() ) {
        const peptideItem = peptideItemsEntry[ 1 ];
        peptideListResult.push( peptideItem );
    }

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideListResult } );
    
    const numberOfReportedPeptides = peptideListResult.length;

    create_GeneratedReportedPeptideListData_Result.peptideList = peptideListResult;
    create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay = peptideItems_Map_Key_peptideSequenceDisplayString;
    
    create_GeneratedReportedPeptideListData_Result.numberOfReportedPeptides = numberOfReportedPeptides;
    create_GeneratedReportedPeptideListData_Result.numberOfPsmsForReportedPeptides = numberOfPsmsForReportedPeptides;

    return create_GeneratedReportedPeptideListData_Result;
}


/**
 * Sort Peptides Array on PSM Count then Reported Peptide Id
 */
const _sortPeptideListOnSortOrder = function( { peptideList } : { peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry> } ) {

    peptideList.sort( function( a, b ) {

        //  Sort on PSM Counts total for entry, Descending
        if ( a.numPsmsTotal > b.numPsmsTotal ) {
            return -1;
        }
        if ( a.numPsmsTotal < b.numPsmsTotal ) {
            return 1;
        }

        //  PSM Counts match so order on peptideSequenceDisplay, Ascending
        if ( a.peptideSequenceDisplay < b.peptideSequenceDisplay ) {
            return -1;
        }
        if ( a.peptideSequenceDisplay > b.peptideSequenceDisplay ) {
            return 1;
        }
        return 0;

    });
}


/////

/**
 * Get Static Modifications (rounded) String
 * 
 * @returns Map<residue, roundedMass>: subset of staticModificationMassesToFilterOn;
 */	
const _get_selectedStaticModificationsForProjectSearchId = function({ 
    
    staticModificationMassesToFilterOn, 
    loadedDataPerProjectSearchIdHolder 
} : { 
    
    staticModificationMassesToFilterOn, 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
}) {

    const selectedStaticModificationsForProjectSearchId = new Map();

    if ( ! staticModificationMassesToFilterOn || staticModificationMassesToFilterOn.size === 0 ) {
        return selectedStaticModificationsForProjectSearchId;
    }

    const staticMods = loadedDataPerProjectSearchIdHolder.get_staticMods(); // Array [{ String residue, BigDecimal mass }] : [Static Mods]

    const staticModsForSearchMap = new Map(); // Map<residue, roundedMass>

    // from staticMods: Build Map<residue, roundedMass>
    for ( const staticMod of staticMods ) {
        const massRounded = modificationMass_CommonRounding_ReturnNumber( staticMod.mass );  // Call external function
        staticModsForSearchMap.set( staticMod.residue, massRounded );
    }

    for ( const entry of staticModificationMassesToFilterOn.entries() ) {
        const residue = entry[ 0 ];
        const massesSet = entry[ 1 ];
        const staticModsForSearchMapEntry_mass = staticModsForSearchMap.get( residue );
        if ( staticModsForSearchMapEntry_mass ) {
            if ( massesSet.has( staticModsForSearchMapEntry_mass ) ) {
                selectedStaticModificationsForProjectSearchId.set( residue, staticModsForSearchMapEntry_mass );
            }
        }
    }

    return selectedStaticModificationsForProjectSearchId;
}

/**
 * Get Static Modifications (rounded) String
 * 
 * @param selectedStaticModificationsForProjectSearchId - Map<residue, roundedMass>: from this._get_selectedStaticModificationsForProjectSearchId(...)
 * 
 * @returns  Map<(position),(mod mass rounded string)>
 */	
const _get_staticModificationsRounded_KeyPosition_ForSelectedStaticModsAndPeptideSequence = function({ peptideSequenceString, selectedStaticModificationsForProjectSearchId }) {

    const staticModificationsRounded_KeyPosition = new Map();

    if ( ( ! selectedStaticModificationsForProjectSearchId ) || selectedStaticModificationsForProjectSearchId.size === 0 ) {
        //  User not select any modifications so return empty map
        return staticModificationsRounded_KeyPosition;
    }

    const peptideSequenceStringArray = peptideSequenceString.split(""); //  split into array with 1 char per element;
    const peptideSequenceStringArrayLength = peptideSequenceStringArray.length;

    for ( let index = 0; index < peptideSequenceStringArrayLength; index++ ) {
        const peptideResidueAtIndex = peptideSequenceStringArray[ index ];
        const staticModificationMass_ForResidue = selectedStaticModificationsForProjectSearchId.get( peptideResidueAtIndex );
        if ( staticModificationMass_ForResidue ) {
            const position = index + 1;  //  position is 1 based
            const massString = staticModificationMass_ForResidue.toString();
            staticModificationsRounded_KeyPosition.set( position, massString );
        }
    }

    return staticModificationsRounded_KeyPosition;
}


////////////////////////////////////

/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 * 
 * @returns  Map<(reported peptide), Map<(position),Array<(mod mass rounded strings sorted)>>
 */	
const _getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    reportedPeptideIdsForDisplay, 
    proteinSequenceVersionId
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    reportedPeptideIdsForDisplay : Array<number>, 
    proteinSequenceVersionId : number
}) 


{

            //  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
            // Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {

        return new Map(); //  EARLY RETURN
    }

    const reportedPeptideIdsForDisplay_Set = new Set( reportedPeptideIdsForDisplay );

    //  Use proteinCoverage_KeyProteinSequenceVersionId since by proteinSequenceVersionId

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinCoverageObject === undefined ) {

        return new Map(); //  EARLY RETURN
        //  Since Multiple Search, return instead of throw:  throw Error("_getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
    }
    const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

    if ( proteinCoverageEntries_PerReportedPeptideId_Array === undefined ) {

        return new Map(); //  EARLY RETURN
    }

    const modsRoundedSet_KeyPosition_KeyReportedPeptideId = new Map();

    for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

        const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;

        if ( ! reportedPeptideIdsForDisplay_Set.has( reportedPeptideId ) ) {
            // Not for selected reported peptide ids
            continue;  // EARLY CONTINUE
        }

        let modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId );
        if ( ! modsRoundedSet_KeyPosition ) {
            modsRoundedSet_KeyPosition = new Map();
            modsRoundedSet_KeyPosition_KeyReportedPeptideId.set( reportedPeptideId, modsRoundedSet_KeyPosition );
        }
        
        const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
        if ( dynamicModificationsOnReportedPeptideArray ) {
            
            //  Have Mods for this reportedPeptideId
            for ( const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray ) {
            
                const mass = dynamicModificationOnReportedPeptide.mass;
                const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

                //   Currently ignoring is_C_Terminal and is_N_Terminal
                // const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;
                // const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
                
                // if (  entry.is_N_Terminal !== undefined || entry.is_C_Terminal !== undefined ) {
                // 	const msg = "ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList: ERROR: entry.is_N_Terminal or entry.is_C_Terminal exists.  This code does not handle those properties being true.";
                // 	console.log( msg );
                // 	throw Error( msg );
                // }

                let modsRoundedSet = modsRoundedSet_KeyPosition.get( positionOnReportedPeptide );
                if ( ! modsRoundedSet ) {
                    modsRoundedSet = new Set();
                    modsRoundedSet_KeyPosition.set( positionOnReportedPeptide, modsRoundedSet );
                }

                const massRounded = modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
                modsRoundedSet.add( massRounded );
            }
        }
    }

    const modsRoundedArray_KeyPosition_KeyReportedPeptideId = new Map(); // Map<(reported peptide), Map<(position),Set<(mod mass rounded sorted, to strings )>>

    for ( const modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry of modsRoundedSet_KeyPosition_KeyReportedPeptideId.entries() ) {
        const modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 0 ];
        const modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId_Entry[ 1 ];

        const modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry = new Map();
        modsRoundedArray_KeyPosition_KeyReportedPeptideId.set( modsRoundedSet_KeyPosition_KeyReportedPeptideId_EntryKey, modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry );

        for ( const modsRoundedSet_KeyPosition_Entry of modsRoundedSet_KeyPosition.entries() ) {
            const modsRoundedSet_KeyPosition_EntryKey = modsRoundedSet_KeyPosition_Entry[ 0 ];
            const modsRoundedSet = modsRoundedSet_KeyPosition_Entry[ 1 ];

            const modsRoundedArray = Array.from( modsRoundedSet );
            modsRoundedArray.sort( (a,b) => {
                if ( a < b ) {
                    return -1;
                } else if ( a > b ) {
                    return 1;
                } else {
                    return 0;
                }
            });
            const modsRoundedStringsArray = [];
            for ( const modRounded of modsRoundedArray ) {
                const modRoundedString = modRounded.toString();
                modsRoundedStringsArray.push( modRoundedString );
            }
            modsRoundedArray_KeyPosition_KeyReportedPeptideId_Entry.set( modsRoundedSet_KeyPosition_EntryKey, modsRoundedStringsArray );
        }
    }

    return modsRoundedArray_KeyPosition_KeyReportedPeptideId
}
