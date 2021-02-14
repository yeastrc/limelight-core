/**
 * proteinExperiment___createProteinDisplayData.ts
 * 
 * 
 * 
 */

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {ProteinGroup} from "page_js/data_pages/protein_inference/ProteinGroup";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {create_reportedPeptide_CommonValue_EncodedString} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";
import {ProteinInferenceUtils} from "page_js/data_pages/protein_inference/ProteinInferenceUtils";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";


/**
 *
 */
export class ProteinExperiment_CreateProteinDisplayData_Result {

    proteinList : Array<ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry>
    proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup>
}

/**
 * entry in CreateProteinDisplayData_Result.proteinList
 */
export class ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry {

    proteinSequenceVersionId: number
    numPsms : number //  numPsms to be consistent with single search code
    proteinNames : string
    proteinDescriptions : string
    proteinItemRecordsMap_Key_projectSearchId : Map<number, {
        proteinSequenceVersionId : number,
        proteinInfo: {
            proteinLength: number;
            annotations: {
                name: string;
                description: string;
                taxonomy: number;
            }[];
        },
        numPsms : number,
        numReportedPeptides : number,
        numReportedPeptidesUnique : number,
        reportedPeptideIds : Array<number>
    }>
}


/**
 * Create Protein Data for Display
 * 
 * Return:
 * Protein List
 * Number of Proteins
 * Number of Reported Peptides Total
 * Number of PSMs total
 */
export const proteinExperiment_CreateProteinDisplayData = function ( {
    projectSearchIds,
    proteinGrouping_CentralStateManagerObjectClass,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    proteinNameDescription_Key_ProteinSequenceVersionId,
    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId
} : { 
    projectSearchIds : Array<number>,
    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, { proteinSequenceVersionId : number, name : string, description : string }>,
    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId : Map < number, Array< { name : string, description : string } >>
}) : ProteinExperiment_CreateProteinDisplayData_Result {
    

    //  Validate loadedDataPerProjectSearchIdHolder populated for all projectSearchIds
    for ( const projectSearchId of projectSearchIds ) {
        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId ); // Must have loadedDataPerProjectSearchIdHolder populated
        }
    }

    //  Validate num PSMs populated for all projectSearchIds
    for ( const projectSearchId of projectSearchIds ) {
        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {
            throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated for projectSearchId: " + projectSearchId ); // Must have num PSMs populated
        }
    }

    //  Map<proteinSequenceVersionId,Map<projectSearchId,ProteinDataForSingleProjectSearchIdSingleProteinSequenceVersionId>>
    const proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId : (
        
        Map<number, Map<number, {
        proteinSequenceVersionId : number,
        proteinInfo: {
            proteinLength: number;
            annotations: {
                name: string;
                description: string;
                taxonomy: number;
            }[];
        },
        numPsms : number,
        numReportedPeptides : number,
        numReportedPeptidesUnique : number,
        reportedPeptideIds : Array<number>
    }>> ) = new Map();


    //  TODO  Currently not used

    //  Get Totals for All Searches: Search Values: Reported Peptide Count and PSM Count

    // let reportedPeptideCount_TotalForSearch_AllSearches = 0;
    // let psmCount_TotalForSearch_AllSearches = 0;		
    //  Track reported peptide ids to skip ones already processed under other proteins
    // const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch_AllSearches = new Set();
    

    
    //  Process for all projectSearchIds
    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("loadedDataPerProjectSearchIdHolder not populated for projectSearchId: " + projectSearchId ); // Must have loadedDataPerProjectSearchIdHolder populated
        }

        const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
        
        //  Used to determine if a reported peptide is unique (maps to only 1 protein)
        const proteinSequenceVersionIdsPerReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();
        
        const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
        
        //  Use proteinSequenceVersionIdsArray since it has the proteinSequenceVersionIds for the current Reported Peptide Ids for the current cutoffs/filters
        const proteinSequenceVersionIdsArray = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsArray();


        //  Get Totals for Search Values: Reported Peptide Count and PSM Count

        let reportedPeptideCount_TotalForSearch = 0;
        let psmCount_TotalForSearch = 0;		
        //  Track reported peptide ids to skip ones already processed under other proteins
        const reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch = new Set();
        

        for ( let proteinSequenceVersionId of proteinSequenceVersionIdsArray ) {

            let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( proteinInfo === undefined ) {
                throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
            }

            const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( proteinCoverageObject === undefined ) {
                throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
            }
            const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();

            let numReportedPeptides = 0;
            let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
            let numPsms = 0;
            
            //  reportedPeptideIds for proteinSequenceVersionId
            let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( proteinSequenceVersionId );
        
            for ( let reportedPeptideId of reportedPeptideIds ) {

                let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get( reportedPeptideId );
                                
                if ( numberOfPSMsForReportedPeptide === undefined || numberOfPSMsForReportedPeptide === null ) {
                    throw Error( "number of PSMs Not Found for reportedPeptideId: " + reportedPeptideId );
                }

                numReportedPeptides++;
                numPsms += numberOfPSMsForReportedPeptide;
                
                if ( ! reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.has( reportedPeptideId ) ) {
                    //  For totals for whole search
                    //  Not processed this reported peptide id yet so do so now
                    reportedPeptideIds_SetForTrackingAlreadyAddedToTotalForSearch.add( reportedPeptideId );
                    reportedPeptideCount_TotalForSearch++;
                    psmCount_TotalForSearch += numberOfPSMsForReportedPeptide;
                }
                
                //  Is this Reported Peptide Unique?
                // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
                const proteinSequenceVersionIds = proteinSequenceVersionIdsPerReportedPeptideId.get( reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
                }
                if ( proteinSequenceVersionIds.length === 1 ) {
                    numReportedPeptidesUnique++
                }
            }
            
            //  Stored computed values per proteinSequenceVersionId
            // const countsFor_proteinSequenceVersionId = {
            //         numReportedPeptides,
            //         numReportedPeptidesUnique,
            //         numPsms
            // }
            //  Does not appear to be used in proteinViewPage_DisplayData_MultipleSearches.js, which was likely copied from proteinViewPage_DisplayData_SingleSearch.js where this is used
            // this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, countsFor_proteinSequenceVersionId );

            
            //  output Protein Item for this projectSearchId
            
            const proteinItemForProjectSearch = { 
                proteinSequenceVersionId : proteinSequenceVersionId, 
                proteinInfo,
                numPsms,
                numReportedPeptides,
                numReportedPeptidesUnique,
                reportedPeptideIds
            };
            
            //  Insert Map Entry proteinItemForProjectSearch

            let proteinItemRecordsMap_Key_projectSearchId = proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( ! proteinItemRecordsMap_Key_projectSearchId ) {
                proteinItemRecordsMap_Key_projectSearchId = new Map();
                proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.set( proteinSequenceVersionId, proteinItemRecordsMap_Key_projectSearchId );
            }
            const outputRecordsMap_Entry = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );
            if ( outputRecordsMap_Entry ) {
                throw Error("Already have entry in proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
            }

            proteinItemRecordsMap_Key_projectSearchId.set( projectSearchId, proteinItemForProjectSearch );

        }
    }

    ////////////////////////
    ////////////////////////


    let proteinGroups_ArrayOf_ProteinGroup : Array<ProteinGroup> = undefined;

    if ( ! proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

        //  Grouping proteins so compute protein groups using Generated Encoded Reported Peptide String

        //  Compute Generated Encoded Reported Peptide String (from peptide id, not peptide string) to support protein grouping


        ///////  !!!!!!!!! If process groupProteinsSelection not NO, need to load the following data:

        //                  loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

        //                  loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId();

        const proteinPeptideMap : Map<number, Set<string>> = new Map(); // Map<proteinSequenceVersionId, Set<reportedPeptide_CommonValue_EncodedString>>

        //  Map< proteinSequenceVersionId, Map< generatedReportedPeptide, Map< projectSearchId, Set< reportedPeptideIds >
        const proteinSequenceVersionId_generatedReportedPeptide_projectSearchId_reportedPeptideIds_Map : Map<string,Map<number,Set<number>>> = new Map();

        //  Cached reportedPeptide_CommonValue_EncodedString : Map<projectSearchId, Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>>
        const  cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId : Map<number, Map<number, string>> = new Map();

        //  Process Map Key proteinSequenceVersionId first

        for ( const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.entries() ) {

            const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 0 ];
            const proteinItemRecordsMap_Key_projectSearchId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 1 ];

            const  reportedPeptide_CommonValue_EncodedString_ForProtein : Set<string> = new Set();  //  Set<reportedPeptide_CommonValue_EncodedString>

            for ( const projectSearchId of projectSearchIds ) {

                const proteinItemRecord = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

                if ( ! proteinItemRecord ) {
                    //  No protein item for this project search id
                    continue;
                }

                //  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
                let cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId : Map<number, string> = (
                    cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId.get( projectSearchId )
                );
                if ( ! cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId ) {
                    cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId = new Map();
                    cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId_Key_projectSearchId.set( projectSearchId, cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId );
                }

                const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

                if ( ! loadedDataPerProjectSearchIdHolder ) {
                    const msg = "proteinExperiment_CreateProteinDisplayData: 'Compute Generated Encoded Reported Peptide String': No value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                //  Dynamic/Variable Modifications Per Reported Peptide Id.   position is int, mass is double
                // Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>
                const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

                if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
                    const msg = "proteinExperiment_CreateProteinDisplayData: 'Compute Generated Encoded Reported Peptide String': No value in: loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId()"
                    console.warn( msg );
                    throw Error( msg );
                }

                //  Open Modifications Per Reported Peptide Id.   mass is double
                // Map <integer,[Object]> <reportedPeptideId,<[{ reportedPeptideId, mass }]>>
                const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

                if ( ! openModificationsOnReportedPeptide_KeyReportedPeptideId ) {
                    const msg = "proteinExperiment_CreateProteinDisplayData: 'Compute Generated Encoded Reported Peptide String': No value in: loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()"
                    console.warn( msg );
                    throw Error( msg );
                }

                const reportedPeptideIds = proteinItemRecord.reportedPeptideIds;

                for ( const reportedPeptideId of reportedPeptideIds ) {

                    //  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
                    let reportedPeptide_CommonValue_EncodedString = cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId.get( reportedPeptideId );

                    if ( ! reportedPeptide_CommonValue_EncodedString ) {

                        //  Not in cache so compute:

                        const variableMmodificationsRoundedArray_Map_KeyPosition: Map<number, Array<string>> = new Map();

                        {
                            const modsRoundedSet_KeyPosition: Map<number, Set<number>> = new Map();

                            const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
                            if (dynamicModificationsOnReportedPeptideArray) {

                                //  Have Mods for this reportedPeptideId
                                for (const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray) {

                                    const mass = dynamicModificationOnReportedPeptide.mass;
                                    const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

                                    let modsRoundedSet = modsRoundedSet_KeyPosition.get(positionOnReportedPeptide);
                                    if (!modsRoundedSet) {
                                        modsRoundedSet = new Set();
                                        modsRoundedSet_KeyPosition.set(positionOnReportedPeptide, modsRoundedSet);
                                    }

                                    const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
                                    modsRoundedSet.add(massRounded);
                                }

                                for (const modsRoundedSet_KeyPosition_Entry of modsRoundedSet_KeyPosition.entries()) {
                                    const positionOfModification = modsRoundedSet_KeyPosition_Entry[0];
                                    const modsRoundedSet = modsRoundedSet_KeyPosition_Entry[1];

                                    const modsRoundedArray = Array.from(modsRoundedSet);
                                    if (modsRoundedArray.length > 1) {
                                        modsRoundedArray.sort((a, b) => {
                                            if (a < b) {
                                                return -1;
                                            } else if (a > b) {
                                                return 1;
                                            } else {
                                                return 0;
                                            }
                                        });
                                    }
                                    const modsRoundedStringsArray: Array<string> = [];
                                    for (const modRounded of modsRoundedArray) {
                                        const modRoundedString = modRounded.toString();
                                        modsRoundedStringsArray.push(modRoundedString);
                                    }
                                    variableMmodificationsRoundedArray_Map_KeyPosition.set(positionOfModification, modsRoundedStringsArray);
                                }
                            }
                        }

                        const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({ reportedPeptideId });

                        if ( peptideId === undefined || peptideId === null ) {
                            const msg = "proteinExperiment_CreateProteinDisplayData: 'Compute Generated Encoded Reported Peptide String': No Peptide Id found for reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        reportedPeptide_CommonValue_EncodedString = create_reportedPeptide_CommonValue_EncodedString({

                            peptideId, variableModifications_Map_KeyPosition : variableMmodificationsRoundedArray_Map_KeyPosition, staticModifications_Map_KeyPosition : undefined
                        });

                        //  Cached reportedPeptide_CommonValue_EncodedString : Map<reportedPeptideId, reportedPeptide_CommonValue_EncodedString>
                        cached_reportedPeptide_CommonValue_EncodedString_key_reportedPeptideId.set( reportedPeptideId, reportedPeptide_CommonValue_EncodedString );
                    }

                    reportedPeptide_CommonValue_EncodedString_ForProtein.add( reportedPeptide_CommonValue_EncodedString );
                }
            }

            proteinPeptideMap.set( proteinSequenceVersionId, reportedPeptide_CommonValue_EncodedString_ForProtein );
        }

        if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {

            proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getProteinGroups({ proteinPeptideMap });

        } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

            proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getNonSubsetProteinGroupsFromProteinPeptideMap({ proteinPeptideMap });

        } else if ( proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {

            proteinGroups_ArrayOf_ProteinGroup = ProteinInferenceUtils.getParsimoniousProteinGroupsFromProteinPeptideMap({ proteinPeptideMap });

        } else {

            const msg = "proteinExperiment___createProteinDisplayData.ts:createProteinDisplayData: this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins... not === expected values.  this._proteinGrouping_CentralStateManagerObjectClass (Only in Log): " + this._proteinGrouping_CentralStateManagerObjectClass;
            console.warn( msg );
            throw Error( msg );
        }

        // for ( const proteinGroupEntry of proteinGroups_ArrayOf_ProteinGroup ) {
        // 	if ( proteinGroupEntry.proteins.size > 1 ) {
        // 		console.log( "proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject.ts: proteinGroupEntry.proteins.size > 1: proteinGroupEntry: ", proteinGroupEntry );
        // 	}
        // }

    }

    ////////////////////////
    ////////////////////////

    //  Build output array from Map of Maps

    let proteinResultListResult : Array<ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry> = [];

    for ( const outputRecordsMap_Per_proteinSequenceVersionId_Entry of proteinItemRecordsMap_Key_projectSearchId_Key_proteinSequenceVersionId.entries() ) {

        let psmCountForThis_proteinSequenceVersionId = 0;

        //  So add only once to result
        const proteinNamesUniqueSet = new Set();
        const proteinDescriptionsUniqueSet = new Set();

        //  To combine with "," separator
        const proteinNamesArray = [];
        const proteinDescriptionsArray = [];

        const proteinNamesAndDescriptionsArray = [];  // For Tooltip

        const proteinSequenceVersionId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 0 ];
        const proteinItemRecordsMap_Key_projectSearchId = outputRecordsMap_Per_proteinSequenceVersionId_Entry[ 1 ];

        for ( const projectSearchId of projectSearchIds ) {
            const proteinItem = proteinItemRecordsMap_Key_projectSearchId.get( projectSearchId );

            if ( ! proteinItem ) {
                //  No protein item for this project search id
                continue;
            }

            psmCountForThis_proteinSequenceVersionId += proteinItem.numPsms;

            //  Get Protein Names and Descriptions

            let foundProteinName = false;

            const proteinInfo = proteinItem.proteinInfo;
            if ( ! proteinInfo ) {
                throw Error("No proteinInfo property for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
            }
            const annotations = proteinInfo.annotations;
            if ( annotations ) {
                foundProteinName = true;
                for ( const annotation of annotations ) {
                    const name = annotation.name;
                    const description = annotation.description;
                    const taxonomy = annotation.taxonomy;
                    if ( ! proteinNamesUniqueSet.has( name ) ) {
                        proteinNamesUniqueSet.add( name );
                        proteinNamesArray.push( name );
                    }
                    if ( description ) {
                        if ( ! proteinDescriptionsUniqueSet.has( description ) ) {
                            proteinDescriptionsUniqueSet.add( description );
                            proteinDescriptionsArray.push( description );
                        }
                    }
                    { // For Tooltip, matches Tooltip template
                        const proteinNamesAndDescriptionsNewEntry = {
                            name : name,
                            description : description
                        };
                        //  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
                        let nameDescriptionComboFoundInArray = false;
                        for ( const entry of proteinNamesAndDescriptionsArray ) {
                            if ( entry.name === proteinNamesAndDescriptionsNewEntry.name && entry.description === proteinNamesAndDescriptionsNewEntry.description ) {
                                nameDescriptionComboFoundInArray = true;
                                break;
                            }
                        }
                        if ( ! nameDescriptionComboFoundInArray ) {
                            proteinNamesAndDescriptionsArray.push( proteinNamesAndDescriptionsNewEntry );
                        }
                    }
                }
            }

            if ( ! foundProteinName ) {
                throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
            }

        }

        const proteinNamesString = proteinNamesArray.join(",");
        const proteinDescriptionsString = proteinDescriptionsArray.join(",");

        const proteinNameDescriptionEntry = { proteinSequenceVersionId, name : proteinNamesString, description : proteinDescriptionsString };
        proteinNameDescription_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNameDescriptionEntry );

        //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        proteinNameDescriptionForTooltip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );

        const proteinResultEntry: ProteinExperiment_CreateProteinDisplayData_Result_ProteinListEntry = {
            proteinSequenceVersionId,
            numPsms : psmCountForThis_proteinSequenceVersionId, //  numPsms to be consistent with single search code
            proteinNames : proteinNamesString,
            proteinDescriptions : proteinDescriptionsString,
            proteinItemRecordsMap_Key_projectSearchId
        };

        proteinResultListResult.push( proteinResultEntry );
    }

    _sortProteinList( { proteinList : proteinResultListResult } );

    return { proteinList : proteinResultListResult, proteinGroups_ArrayOf_ProteinGroup };
}

//   Maybe not valid sort since not displaying the sorted on number of numPsms (Total across searches)

/**
 * 
 */
const _sortProteinList = function( { 
    proteinList 
} :  { 
    proteinList : Array<{
        proteinSequenceVersionId: number,
        numPsms : number, //  numPsms to be consistent with single search code
        proteinNames : string,
        proteinDescriptions : string,
        proteinItemRecordsMap_Key_projectSearchId : Map<number, { 
            proteinSequenceVersionId : number, 
            proteinInfo: {
                proteinLength: number;
                annotations: {
                    name: string;
                    description: string;
                    taxonomy: number;
                }[];
            },
            numPsms : number,
            numReportedPeptides : number,
            numReportedPeptidesUnique : number,
            reportedPeptideIds : Array<number>
        }>
    }> } ) {

    //   Sort Proteins Array on PSM Count Descending and then Protein Name then Protein Sequence Version Id

    proteinList.sort( function( a, b ) {

        // PSM Count (numPsms) Descending so reverse comparisons '>' '<'

        if ( a.numPsms > b.numPsms ) {
            return -1;
        }
        if ( a.numPsms < b.numPsms ) {
            return 1;
        }

        if ( a.proteinNames < b.proteinNames ) {
            return -1;
        }
        if ( a.proteinNames > b.proteinNames ) {
            return 1;
        }

        //  All others match so order on proteinSequenceVersionId
        if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
            return -1;
        }
        if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
            return 1;
        }
        return 0;

    });
}


