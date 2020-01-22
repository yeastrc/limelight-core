/**
 * proteinExperiment___createProteinDisplayData.ts
 * 
 * 
 * 
 */

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


/**
 * Create Protein Data for Display
 * 
 * Return:
 * Protein List
 * Number of Proteins
 * Number of Reported Peptides Total
 * Number of PSMs total
 */
const createProteinDisplayData = function ( { 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    proteinNameDescription_Key_ProteinSequenceVersionId,
    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId
} : { 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, { proteinSequenceVersionId : number, name : string, description : string }>,
    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map < number, Array< { name : string, description : string } >>
}) {
    

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

    //  Build output array from Map of Maps

    let proteinResultListResult : Array<{
        proteinSequenceVersionId,
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
    }> = [];

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
        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );

        const proteinResultEntry = {
            proteinSequenceVersionId,
            numPsms : psmCountForThis_proteinSequenceVersionId, //  numPsms to be consistent with single search code
            proteinNames : proteinNamesString,
            proteinDescriptions : proteinDescriptionsString,
            proteinItemRecordsMap_Key_projectSearchId
        };

        proteinResultListResult.push( proteinResultEntry );
    }

    _sortProteinList( { proteinList : proteinResultListResult } );

    return { proteinList : proteinResultListResult };
}

//   Maybe not valid sort since not displaying the sorted on number of numPsms (Total across searches)

/**
 * 
 */
const _sortProteinList = function( { 
    proteinList 
} :  { 
    proteinList : Array<{
        proteinSequenceVersionId,
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

///////////////////////

export { createProteinDisplayData }
