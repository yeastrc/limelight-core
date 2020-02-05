/**
 * proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData.ts
 * 
 * Create Display Data for Protein List for Single Search
 */


import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { SearchDetailsBlockDataMgmtProcessing } from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from "../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItem } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * returned from function createProteinDisplayData
 */
export class ProteinDisplayData_From_createProteinDisplayData { 

    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> 
    annotationTypeRecords_DisplayOrder
    reportedPeptideCount_TotalForSearch : number
    psmCount_TotalForSearch : number

}

export class ProteinDataDisplay_ProteinListItem_SingleSearch {
    proteinSequenceVersionId : number
    proteinName : string 
    proteinDescription : string
    numPsms : number 
    numReportedPeptides : number 
    numReportedPeptidesUnique : number 
    reportedPeptideIds : Array<number> 
    psmAnnotationMap : Map<number, BestAnnotationDataEntry> 
    peptideAnnotationMap : Map<number, BestAnnotationDataEntry>
    proteinCoverageRatio : number 
    proteinCoverageRatioDisplay : string
};

/**
 * Entry in Result Map 
 */
export class BestAnnotationDataEntry {

    valueDouble : number
    valueString : string
}

/**
 * Entry in incoming Map 
 */
export class ProteinNameDescriptionCacheEntry {
    name : string
    description: string
}

/**
 * Entry in incoming Map 
 */
export class CountsFor_proteinSequenceVersionIdEntry {
    numReportedPeptides : number
    numReportedPeptidesUnique : number
    numPsms : number
}

	/////////////

/**
 * Create Protein Data for Display
 * 
 * Return:
 * Protein List
 * Number of Proteins
 * Number of Reported Peptides Total
 * Number of PSMs total
 */
export const createProteinDisplayData = function( { 
    
    projectSearchId, 
    loadedDataPerProjectSearchIdHolder, 
    dataPageStateManager_DataFrom_Server, 
    searchDetailsBlockDataMgmtProcessing,
    annotationTypeData_ReturnSpecifiedTypes,

    proteinNameDescription_Key_ProteinSequenceVersionId, 
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
    peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
} : { 
    projectSearchId : number 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    dataPageStateManager_DataFrom_Server : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes

    proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry>
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>>
    peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry>

} ) : ProteinDisplayData_From_createProteinDisplayData {
    
    if ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() ) {
        throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not populated"); // Must have num PSMs populated
    }

    //  Get Annotation Types

    const annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();
    if ( ( ! annotationTypeData_Root ) ) {
        throw Error("No annotation type data loaded." );
    }

    const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }
    const reportedPeptideFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
    const psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
    
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
    


    //  Final output Protein List
    
    let proteinResultListResult : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> = [];

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

        //  Final output Protein Item
        
        let proteinItemForProjectSearch : ProteinDataDisplay_ProteinListItem_SingleSearch = { 
            proteinSequenceVersionId : proteinSequenceVersionId, 
            // proteinInfo : undefined, 
            proteinName : undefined, 
            proteinDescription : undefined,
            numPsms : undefined, 
            numReportedPeptides : undefined, 
            numReportedPeptidesUnique : undefined, 
            reportedPeptideIds : undefined, 
            psmAnnotationMap : undefined, 
            peptideAnnotationMap : undefined, 
            proteinCoverageRatio : undefined, 
            proteinCoverageRatioDisplay : undefined
        };
        
        {
            let proteinName : string = undefined;			//  For "," delimited string
            let proteinDescription : string = undefined;		//  For "," delimited string

            const proteinNamesAndDescriptionsArray : Array<ProteinNameDescriptionCacheEntry> = [];  // For Tooltip

            // proteinItemForProjectSearch.proteinInfo = proteinInfo;

            const annotations = proteinInfo.annotations;
            if ( annotations ) {
                for ( const annotation of annotations ) {
                    const name = annotation.name;
                    const description = annotation.description;
                    const taxonomy = annotation.taxonomy;
                    if ( proteinName === undefined ) {
                        proteinName = name;
                    } else {
                        proteinName += "," + name;
                    }
                    if ( description ) {
                        if ( proteinDescription === undefined ) {
                            proteinDescription = description;
                        } else {
                            proteinDescription += "," + description;
                        }
                    }
                    // For Tooltip, matches Tooltip template
                    const proteinNamesAndDescriptionsEntry = {
                        name : name,
                        description : description
                    };
                    proteinNamesAndDescriptionsArray.push( proteinNamesAndDescriptionsEntry );
                }
            }

            if ( proteinName === "" ) {
                throw Error("No Data found for protein name.  proteinSequenceVersionId: " + proteinSequenceVersionId );
            }

            proteinItemForProjectSearch.proteinName = proteinName;
            proteinItemForProjectSearch.proteinDescription = proteinDescription;
            
            
            const proteinNameDescriptionCacheEntry = { name : proteinName, description : proteinDescription };

            //   Protein Name and Description in a Map, Key ProteinSequenceVersionId
            proteinNameDescription_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNameDescriptionCacheEntry );

            //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );
        }
        
        let numReportedPeptides = 0;
        let numReportedPeptidesUnique = 0; // 'Unique' == map to only one protein
        let numPsms = 0;
        
        let annotationBestData_ForReportedPeptidesMap : Map<number, BestAnnotationDataEntry> = new Map();
        let annotationBestData_ForPsmsMap : Map<number, BestAnnotationDataEntry> = new Map();
        
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
            ////////////
            
            if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() ) {
                //  Skip if Not Populated if no User cutoffs for type

                let peptideAnnotationMap = loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId().get( reportedPeptideId );

                //  Update Reported Peptide Best Values
                _updateBestAnnotationValues( {
                    bestAnnotationDataMap : annotationBestData_ForReportedPeptidesMap, // best values 
                    entryAnnotationDataMap : peptideAnnotationMap, // values for current Reported Peptide Entry
                    filterableAnnotationTypes_Map : reportedPeptideFilterableAnnotationTypes_Map // Reported Peptide or PSM Filterable Annotation type records
                } );
            }

            if ( loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId() ) {
                //  Skip if Not Populated if no User cutoffs for type

                let psmBestAnnotationMap = loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId().get( reportedPeptideId );

                //  Update PSM Best Values
                _updateBestAnnotationValues( {
                    bestAnnotationDataMap : annotationBestData_ForPsmsMap, // best values 
                    entryAnnotationDataMap : psmBestAnnotationMap, // values for current Reported Peptide Entry
                    filterableAnnotationTypes_Map : psmFilterableAnnotationTypes_Map // Reported Peptide or PSM Filterable Annotation type records
                } );
            }
        }
        
        //  Stored computed values per proteinSequenceVersionId
        const countsFor_proteinSequenceVersionId : CountsFor_proteinSequenceVersionIdEntry = {
                numReportedPeptides,
                numReportedPeptidesUnique,
                numPsms
        }
        peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, countsFor_proteinSequenceVersionId );

        
        proteinItemForProjectSearch.numPsms = numPsms;
        proteinItemForProjectSearch.numReportedPeptides = numReportedPeptides;
        proteinItemForProjectSearch.numReportedPeptidesUnique = numReportedPeptidesUnique;
        
        proteinItemForProjectSearch.reportedPeptideIds = reportedPeptideIds;
        
        proteinItemForProjectSearch.psmAnnotationMap = annotationBestData_ForPsmsMap;
        proteinItemForProjectSearch.peptideAnnotationMap = annotationBestData_ForReportedPeptidesMap;
        
        proteinItemForProjectSearch.proteinCoverageRatio = proteinCoverageRatio;
        proteinItemForProjectSearch.proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed( 3 );
        
        proteinResultListResult.push( proteinItemForProjectSearch );
    }


    //  Get AnnotationType records for Displaying Annotation data in display order in proteinList
    const annotationTypeRecords_DisplayOrder = _getAnnotationTypeRecords_DisplayOrder({ projectSearchId, searchDetailsBlockDataMgmtProcessing, annotationTypeData_ReturnSpecifiedTypes });

    _sortProteinList( { proteinList : proteinResultListResult, projectSearchId, annotationTypeRecords_DisplayOrder, annotationTypeData_ReturnSpecifiedTypes } );

    return { proteinList : proteinResultListResult, annotationTypeRecords_DisplayOrder, reportedPeptideCount_TotalForSearch, psmCount_TotalForSearch };
}


/**
 * Update Best Annotation Type values for a single type of Reported Peptide or PSM
 */
const _updateBestAnnotationValues = function({

    bestAnnotationDataMap, // Updated in this function: best values
    entryAnnotationDataMap, // values for current Reported Peptide - Map<annotationTypeId, {valueDouble: 0, valueString: "0.000000"}>
    filterableAnnotationTypes_Map // Reported Peptide or PSM Filterable Annotation type records
} : {
    bestAnnotationDataMap : Map<number, BestAnnotationDataEntry> // Updated in this function: best values
    entryAnnotationDataMap 
    filterableAnnotationTypes_Map : Map<number, AnnotationTypeItem>
} ) : void {

    for ( const entryAnnotationData_Entry of entryAnnotationDataMap ) {

        const annotationTypeId = entryAnnotationData_Entry[ 0 ]; // key
        const entryAnnotationData = entryAnnotationData_Entry[ 1 ]; // Value
        const entryAnnotationData_valueDouble = entryAnnotationData.valueDouble;
        // const entryAnnotationData_valueString = entryAnnotationData.valueString;
        
        if ( ! variable_is_type_number_Check( annotationTypeId ) ) {
            throw Error("_updateBestAnnotationValues(...): annotationTypeId not number: " + annotationTypeId );
        }
        if ( ! variable_is_type_number_Check( entryAnnotationData_valueDouble ) ) {
            throw Error("_updateBestAnnotationValues(...): entryAnnotationData_valueDouble not number: " + annotationTypeId );
        }

        const entryAnnotationData_valueDouble_Number_PostNumberCheck : number = entryAnnotationData_valueDouble;

        const bestAnnotationData = bestAnnotationDataMap.get( annotationTypeId );
        if ( ! bestAnnotationData ) {
            bestAnnotationDataMap.set( annotationTypeId, _compute_BestAnnotationDataEntry( entryAnnotationData_valueDouble_Number_PostNumberCheck ) );
        } else {
            let annotationType : AnnotationTypeItem = filterableAnnotationTypes_Map.get( annotationTypeId );
            if ( ! annotationType ) {
                throw Error( "annotationTypeId not found in filterableAnnotationTypes: " + annotationTypeId );
            }
            if ( annotationType.filterDirectionAbove ) {
                if ( entryAnnotationData.valueDouble > bestAnnotationData.valueDouble ) {
                    //  entry has a better value than best so replace best with entry
                    bestAnnotationDataMap.set( annotationTypeId, _compute_BestAnnotationDataEntry( entryAnnotationData_valueDouble_Number_PostNumberCheck ) );
                }
            } else {
                if ( entryAnnotationData.valueDouble < bestAnnotationData.valueDouble ) {
                    //  entry has a better value than best so replace best with entry
                    bestAnnotationDataMap.set( annotationTypeId, _compute_BestAnnotationDataEntry( entryAnnotationData_valueDouble_Number_PostNumberCheck ) );
                }
            }
        }
    }
}

const _compute_BestAnnotationDataEntry = function( entryAnnotationData_valueDouble_Number_PostNumberCheck : number ) : BestAnnotationDataEntry {

    const result = new BestAnnotationDataEntry();
    result.valueDouble = entryAnnotationData_valueDouble_Number_PostNumberCheck;
    result.valueString = _computeBestValue__valueString({ valueDouble : entryAnnotationData_valueDouble_Number_PostNumberCheck });
    return result;
}


const _computeBestValue__valueString = function({ valueDouble } : { valueDouble : number }) : string {

    //  Reformat value string to look like what went into best fields in DB,  Drop trailing zeros after decimal point
    
    //  Convert number to string and then parse that as float then convert that to string
    const bestData_valueString = Number.parseFloat( valueDouble.toString() ).toString();

    return bestData_valueString;
}



/**
 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
 */
const _getAnnotationTypeRecords_DisplayOrder = function({ projectSearchId, searchDetailsBlockDataMgmtProcessing, annotationTypeData_ReturnSpecifiedTypes } : { 
    
    projectSearchId : number 
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes
}) : {
    psmAnnotationTypesForProteinListEntries : AnnotationTypeItem[]
    reportedPeptideAnnotationTypesForProteinListEntries : AnnotationTypeItem[]
} {

    let searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = 
        searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });
    
    let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

    //  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
    let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

    let filtersAnnTypeDisplay_For_ProjectSearchId = undefined;
    
    for ( let filtersAnnTypeDisplay_For_Single_ProjectSearchId of filtersAnnTypeDisplayPerProjectSearchIds ) {
        
        if ( projectSearchId === filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId ) {
            filtersAnnTypeDisplay_For_ProjectSearchId = filtersAnnTypeDisplay_For_Single_ProjectSearchId;
            break;
        }
    }
    
    if ( ! filtersAnnTypeDisplay_For_ProjectSearchId ) {
        const msg = "Method _getAnnotationTypeRecords_DisplayOrder( { projectSearchId } ): No entry found in filtersAnnTypeDisplayPerProjectSearchIds for projectSearchId: " + projectSearchId;
        console.log( msg );
        throw Error( msg );
    }
    
    let uniquePSMAnnotationTypeIds_PSM_Filters = new Set();
    if ( filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) {
        for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.psmFilters ) {
            uniquePSMAnnotationTypeIds_PSM_Filters.add( filterEntry.annTypeId );
        }
    }
    
    let uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters = new Set();
    if ( filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
        for ( const filterEntry of filtersAnnTypeDisplay_For_ProjectSearchId.reportedPeptideFilters ) {
            uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters.add( filterEntry.annTypeId );
        }
    }
    
    //  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let psmAnnotationTypesForProteinListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_PSM_Filters } );
    let reportedPeptideAnnotationTypesForProteinListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_Peptide_Filters } );

    return {
        psmAnnotationTypesForProteinListEntries : psmAnnotationTypesForProteinListEntries,
        reportedPeptideAnnotationTypesForProteinListEntries : reportedPeptideAnnotationTypesForProteinListEntries
    };
}


/**
 * 
 */
const _sortProteinList = function({ proteinList, projectSearchId, annotationTypeRecords_DisplayOrder, annotationTypeData_ReturnSpecifiedTypes } : {

    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>, 
    projectSearchId : number
    annotationTypeRecords_DisplayOrder
    annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes
} ) {

    //   Sort Proteins Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id

    /**
     * Return array ann type entries, sorted on sortOrder
     */
    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated =
        annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
    let psmAnnotationTypesForProteinListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries.length;
    
    proteinList.sort( function( a : ProteinDataDisplay_ProteinListItem_SingleSearch, b : ProteinDataDisplay_ProteinListItem_SingleSearch ) {

        //  Compare Reported Peptide Ann Values, if they are populated
        let a_peptideAnnotationMap = a.peptideAnnotationMap;
        let b_peptideAnnotationMap = b.peptideAnnotationMap;
        if ( a_peptideAnnotationMap && b_peptideAnnotationMap ) {

            for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
                let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
                let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
                let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap.get( annotationTypeId );
                let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap.get( annotationTypeId );
                
                if ( a_peptideAnnotationMap_ForAnnType && b_peptideAnnotationMap_ForAnnType ) {
                    if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
                        if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
                        if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else {
                        throw Error( "Protein Single Search: _sortProteinList(...): filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }
        
        //  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
        let a_psmAnnotationMap = a.psmAnnotationMap;
        let b_psmAnnotationMap = b.psmAnnotationMap;
        if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

            for ( let psmAnnotationTypesForProteinListEntriesLength_Index = 0; psmAnnotationTypesForProteinListEntriesLength_Index < psmAnnotationTypesForProteinListEntriesLength; psmAnnotationTypesForProteinListEntriesLength_Index++ ) {
                let psmAnnotationTypesForProteinListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries[ psmAnnotationTypesForProteinListEntriesLength_Index ];
                let annotationTypeId = psmAnnotationTypesForProteinListEntries_Entry.annotationTypeId;
                let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap.get( annotationTypeId );
                let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap.get( annotationTypeId );
                
                if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
                    if ( psmAnnotationTypesForProteinListEntries_Entry.filterDirectionBelow ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else if ( psmAnnotationTypesForProteinListEntries_Entry.filterDirectionAbove ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else {
                        throw Error( "Protein Single Search: _sortProteinList(...): filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }
        

        //  All Reported Peptide and PSM Ann Type Values match so order on Protein Name
        if ( a.proteinName < b.proteinName ) {
            return -1;
        }
        if ( a.proteinName > b.proteinName ) {
            return 1;
        }

        //  All Reported Peptide and PSM Ann Type Values and Protein Name match so order on proteinSequenceVersionId
        if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
            return -1;
        }
        if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
            return 1;
        }
        return 0;

    });
}
