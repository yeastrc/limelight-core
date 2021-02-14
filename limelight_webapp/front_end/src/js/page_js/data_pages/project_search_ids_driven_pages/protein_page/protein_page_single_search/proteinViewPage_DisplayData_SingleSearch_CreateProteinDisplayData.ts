/**
 * proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData.ts
 * 
 * Create Display Data for Protein List for Single Search
 */


import { SearchDetailsBlockDataMgmtProcessing } from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from "../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItem } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    SearchDataLookupParameters_Root,
} from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * returned from function createProteinDisplayData_SingleSearch
 */
export class ProteinDisplayData_From_createProteinDisplayData_SingleSearch {

    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch> 
    annotationTypeRecords_DisplayOrder: {psmAnnotationTypesForProteinListEntries: AnnotationTypeItem[], reportedPeptideAnnotationTypesForProteinListEntries: AnnotationTypeItem[]}
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
    proteinCoverageRatio : number 
    proteinCoverageRatioDisplay : string
};

/**
 * Entry in incoming Map 
 */
export class ProteinNameDescriptionCacheEntry_SingleSearch {
    name : string
    description: string
}

/**
 * Entry in incoming Map 
 */
export class CountsFor_proteinSequenceVersionIdEntry_SingleSearch {
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
export const createProteinDisplayData_SingleSearch = function({
    
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

    proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry_SingleSearch>
    proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry_SingleSearch>>
    peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry_SingleSearch>

} ) : ProteinDisplayData_From_createProteinDisplayData_SingleSearch {
    
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
            proteinCoverageRatio : undefined, 
            proteinCoverageRatioDisplay : undefined
        };
        
        {
            let proteinName : string = undefined;			//  For "," delimited string
            let proteinDescription : string = undefined;		//  For "," delimited string

            const proteinNamesAndDescriptionsArray : Array<ProteinNameDescriptionCacheEntry_SingleSearch> = [];  // For Tooltip

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
        const countsFor_proteinSequenceVersionId : CountsFor_proteinSequenceVersionIdEntry_SingleSearch = {
                numReportedPeptides,
                numReportedPeptidesUnique,
                numPsms
        }
        peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, countsFor_proteinSequenceVersionId );

        
        proteinItemForProjectSearch.numPsms = numPsms;
        proteinItemForProjectSearch.numReportedPeptides = numReportedPeptides;
        proteinItemForProjectSearch.numReportedPeptidesUnique = numReportedPeptidesUnique;
        
        proteinItemForProjectSearch.reportedPeptideIds = reportedPeptideIds;
        
        proteinItemForProjectSearch.proteinCoverageRatio = proteinCoverageRatio;
        proteinItemForProjectSearch.proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed( 3 );
        
        proteinResultListResult.push( proteinItemForProjectSearch );
    }


    //  Get AnnotationType records for Displaying Annotation data in display order in proteinList
    const annotationTypeRecords_DisplayOrder = _getAnnotationTypeRecords_DisplayOrder({ projectSearchId, searchDetailsBlockDataMgmtProcessing, annotationTypeData_ReturnSpecifiedTypes });

    _sortProteinList( { proteinList : proteinResultListResult } );

    const functionResult : ProteinDisplayData_From_createProteinDisplayData_SingleSearch = {
        proteinList : proteinResultListResult,
        annotationTypeRecords_DisplayOrder,
        reportedPeptideCount_TotalForSearch,
        psmCount_TotalForSearch
    }

    return functionResult;
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
        searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();
    
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
const _sortProteinList = function({ proteinList } : {

    proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>, 
} ) {

    //   Sort Proteins Array

    proteinList.sort( function( a : ProteinDataDisplay_ProteinListItem_SingleSearch, b : ProteinDataDisplay_ProteinListItem_SingleSearch ) {

        //  Sort On the following:

        // Descending
        if ( a.numPsms < b.numPsms ) {
            return 1;
        }
        if ( a.numPsms > b.numPsms ) {
            return -1;
        }

        // Descending
        if ( a.proteinCoverageRatio < b.proteinCoverageRatio ) {
            return 1;
        }
        if ( a.proteinCoverageRatio > b.proteinCoverageRatio ) {
            return -1;
        }

        if ( a.proteinName < b.proteinName ) {
            return -1;
        }
        if ( a.proteinName > b.proteinName ) {
            return 1;
        }

        if ( a.proteinSequenceVersionId < b.proteinSequenceVersionId ) {
            return -1;
        }
        if ( a.proteinSequenceVersionId > b.proteinSequenceVersionId ) {
            return 1;
        }
        return 0;

    });
}
