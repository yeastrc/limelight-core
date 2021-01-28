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
    modificationMass_CommonRounding_ReturnNumber,
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';


//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber,
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import { reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches } from 'page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches';
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";

//  Child Data Searches for Single Peptide show/hide


//  returns React Component to insert below current data row

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
    numberOfUniquePeptides : number;
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
    peptideUnique : boolean
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

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    reporterIonMassesSelected, 
    staticModificationMassesToFilterOn, 
    proteinSequenceVersionId, 
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder
} : {
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    reporterIonMassesSelected : Set<number>
    staticModificationMassesToFilterOn
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

} ) : Create_GeneratedReportedPeptideListData_Result {

    const create_GeneratedReportedPeptideListData_Result = new Create_GeneratedReportedPeptideListData_Result();

    const peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData_Result_Entry> = new Map();

    const reporterIonMassTransformer = { //  Transform Reporter Ion Mass function passed to external function psm_ReporterIonMasses_FilterOnSelectedValues
        transformMass_ReturnNumber : function({ mass }) {
            return reporterIonMass_CommonRounding_ReturnNumber( mass );  // Call external function
        }
    }
    
    let numberOfPsmsForReportedPeptides = 0; // PSM Count Total
    
    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId ) {
            throw Error( "No reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const reportedPeptideIdsForDisplay = reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_reportedPeptideIds()

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
        // const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();


        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId // : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            of reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId =  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.reportedPeptideId

            let numPsms = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

            //  Is this Reported Peptide Unique?
            let peptideUnique = true;
            {
                // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
                const proteinSequenceVersionIds = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId().get( reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
                }
                if ( proteinSequenceVersionIds.length !== 1 ) {
                    peptideUnique = false;
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
            const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
                peptideSequence : peptideSequenceString,
                variable_Modifications_RoundedArray_KeyPosition: variableModificationsRoundedArray_KeyPosition,
                open_Modification_Rounded : undefined,
                open_Modification_Rounded_Position : undefined,
                open_Modification_Rounded_NoPosition : undefined,
                staticModificationsRounded_KeyPosition
            });

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
            peptideItem.peptideUnique = peptideUnique;
            peptideItem.reportedPeptideIdsMap_KeyProjectSearchId = new Map();
            peptideItem.reportedPeptideIdsMap_KeyProjectSearchId.set( projectSearchId, reportedPeptideIds );

            peptideItems_Map_Key_peptideSequenceDisplayString.set( peptideSequenceDisplay, peptideItem );
        }
    }

    const peptideListResult : Array<CreateReportedPeptideDisplayData_Result_Entry> = [];
    let numberOfUniquePeptides = 0;

    //  Copy to array
    for ( const peptideItemsEntry of peptideItems_Map_Key_peptideSequenceDisplayString.entries() ) {
        const peptideItem = peptideItemsEntry[ 1 ];
        peptideListResult.push( peptideItem );
        if ( peptideItem.peptideUnique ) {
            numberOfUniquePeptides++;
        }
    }

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideListResult } );
    
    const numberOfReportedPeptides = peptideListResult.length;

    create_GeneratedReportedPeptideListData_Result.peptideList = peptideListResult;
    create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay = peptideItems_Map_Key_peptideSequenceDisplayString;
    
    create_GeneratedReportedPeptideListData_Result.numberOfReportedPeptides = numberOfReportedPeptides;
    create_GeneratedReportedPeptideListData_Result.numberOfUniquePeptides = numberOfUniquePeptides;
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
const _get_staticModificationsRounded_KeyPosition_ForSelectedStaticModsAndPeptideSequence = function(
    {
        peptideSequenceString,
        selectedStaticModificationsForProjectSearchId
    }) {

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
    reportedPeptideIdsForDisplay : ReadonlySet<number>,
    proteinSequenceVersionId : number
}) 


{

            //  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
            // Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {

        return new Map(); //  EARLY RETURN
    }

    const reportedPeptideIdsForDisplay_Set = reportedPeptideIdsForDisplay;

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
