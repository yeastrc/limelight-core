/**
 * reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Create     ReportedPeptideDisplayData Objects for child table
 */

//   From data_pages_common
import {
    AnnotationTypeData_Root,
    AnnotationTypeItem, AnnotationTypeItems_PerProjectSearchId,
    DataPageStateManager
} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { ReportedPeptideStringData_For_ReportedPeptideId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/reportedPeptideStringData_For_ReportedPeptideId'
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

export class CreateReportedPeptideDisplayData_PeptideItem {
    reportedPeptideId : number
    peptideUnique : boolean
    proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    reportedPeptideSequence? : string
    numPsms? : number
    peptideAnnotationMap_KeyAnnType? : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId>
}

export class CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId {
    annotationTypeId : number
    valueDouble : number
    valueString :  string
}

/**
 * Create Reported Peptide Data for Display or Download
 * 
 * return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
 * Returns:
 *    Reported Peptide List
 *    Number of Reported Peptides
 *    Number of PSMs total
 */
export const createReportedPeptideDisplayData = function(
    {
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId, //  Only for error reporting
        projectSearchId,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    } :  {
        reportedPeptideIds_ForDisplay : Set<number>
        dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId : number // Only for error reporting
        projectSearchId : number
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        dataPageStateManager : DataPageStateManager

    } ) : {
    peptideList : Array<CreateReportedPeptideDisplayData_PeptideItem>
    numberOfReportedPeptides : number
    numberOfPsmsForReportedPeptides : number
    annotationTypeRecords_DisplayOrder : AnnotationTypeRecords_DisplayOrder
} {

    const peptideListResult : Array<CreateReportedPeptideDisplayData_PeptideItem> = [];
    
    //  Various Maps, key Reported Peptide Id
    //  These 3 may be undefined if not populated since not applicable.
    const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
    const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();

    let reportedPeptideIds_ToProcess = reportedPeptideIds_ForDisplay;
    if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
        reportedPeptideIds_ToProcess = new Set( dataPerReportedPeptideId_Map_Key_reportedPeptideId.keys() );
    }

    let filteringOn_PsmIds = false;  //  Track for different functionality below

    if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {

        for ( const mapEntry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries() ) {
            const mapEntry_Value = mapEntry[ 1 ];
            if ( mapEntry_Value.psmIdsSet ) {

                filteringOn_PsmIds = true;
                break;
            }
        }
    } else {
        for ( const reportedPeptideId of reportedPeptideIds_ForDisplay ) {

            const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId);

            if ( proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include ) {

                filteringOn_PsmIds = true;
                break;
            }
        }
    }

    //  reportedPeptideIds filtered if applicable so now create display peptide row objects

    for ( const reportedPeptideId of reportedPeptideIds_ToProcess ) {

        let proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = undefined

        proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId );
        if ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId ) {
            throw Error("_createReportedPeptideDisplayData: No proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }

        if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {

            const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId.get( reportedPeptideId )
            if ( ! dataPerReportedPeptideId ) {
                throw Error("_createReportedPeptideDisplayData: No dataPerReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
            }
            let psmIds_Include : Set<number> = undefined;
            let psmCount_after_Include : number = undefined;
            if (  dataPerReportedPeptideId.psmIdsSet !== undefined ) {
                psmIds_Include = dataPerReportedPeptideId.psmIdsSet;
                psmCount_after_Include = dataPerReportedPeptideId.psmIdsSet.size;
            }  else {
                psmIds_Include = new Set( proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include );
                psmCount_after_Include = proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;
            }
            proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId, psmIds_Include, psmCount_after_Include
            });
        }

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

        const peptideItem : CreateReportedPeptideDisplayData_PeptideItem = {
            reportedPeptideId, peptideUnique, proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        };

        const reportedPeptideStringData : ReportedPeptideStringData_For_ReportedPeptideId = loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );
        if ( ! reportedPeptideStringData ) {
            throw Error("_createReportedPeptideDisplayData: No reportedPeptideStringData for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }
        peptideItem.reportedPeptideSequence = reportedPeptideStringData.getReportedPeptideString();

        peptideItem.numPsms = proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

        {
            //  Reported Peptide Ann Values
            
            //  Create Object from Map since that is expected in other code
            let peptideAnnotationMap_KeyAnnType : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId> = undefined; // property name will be ann type id

            { //  Reported Peptide Filterable Ann Data
                if ( reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
                    const reportedPeptideFilterable_annData_KeyAnnTypeId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
                    if ( reportedPeptideFilterable_annData_KeyAnnTypeId ) {

                        for ( const annDataEntry of reportedPeptideFilterable_annData_KeyAnnTypeId ) {
                            const annTypeId = annDataEntry[ 0 ]; // key
                            const annData = annDataEntry[ 1 ]; // value
                            const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                            if ( ! peptideAnnotationMap_KeyAnnType ) {
                                peptideAnnotationMap_KeyAnnType = new Map();
                            }
                            peptideAnnotationMap_KeyAnnType.set( annTypeId, annDataForDisplay );
                        }
                    }
                }
            }

            { //  Reported Peptide Descriptive Ann Data
                if ( reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
                    const reportedPeptideDescriptive_annData_KeyAnnTypeId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
                    if ( reportedPeptideDescriptive_annData_KeyAnnTypeId ) {

                        for ( const annDataEntry of reportedPeptideDescriptive_annData_KeyAnnTypeId ) {
                            const annTypeId = annDataEntry[ 0 ]; // key
                            const annData = annDataEntry[ 1 ]; // value
                            const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId = { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                            if ( ! peptideAnnotationMap_KeyAnnType ) {
                                peptideAnnotationMap_KeyAnnType = new Map();
                            }
                            peptideAnnotationMap_KeyAnnType.set( annTypeId, annDataForDisplay );
                        }
                    }
                }
            }
            peptideItem.peptideAnnotationMap_KeyAnnType = peptideAnnotationMap_KeyAnnType;
        }

        peptideListResult.push( peptideItem )
    }

    const annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
        dataPageStateManager_DataFrom_Server : dataPageStateManager
    } );

    /**
     * Get array ann type entries, sorted on sortOrder
     */
    const reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated = (
        annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } )
    );

    //  Get AnnotationType records for Displaying Annotation data in display order in peptideList
    let annotationTypeRecords_DisplayOrder : AnnotationTypeRecords_DisplayOrder =
        _getAnnotationTypeRecords_DisplayOrder( { projectSearchId, searchDataLookupParamsRoot, dataPageStateManager } );

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated } );
    
    const numberOfReportedPeptides = peptideListResult.length;
    
    let numberOfPsmsForReportedPeptides = 0;
    
    for ( const peptideItem of peptideListResult ) {
        numberOfPsmsForReportedPeptides += peptideItem.numPsms;
    }
    
    return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
}

/**
 * Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
 */
const _sortPeptideListOnSortOrder = function( { peptideList, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated } : {
    peptideList : Array<CreateReportedPeptideDisplayData_PeptideItem>
    reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated : AnnotationTypeItem[]
} ) {

    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;

    peptideList.sort( function( a, b ) {

        //  Compare Reported Peptide Ann Values, if they are populated
        let a_peptideAnnotationMap_KeyAnnType = a.peptideAnnotationMap_KeyAnnType;
        let b_peptideAnnotationMap_KeyAnnType = b.peptideAnnotationMap_KeyAnnType;
        if ( a_peptideAnnotationMap_KeyAnnType && b_peptideAnnotationMap_KeyAnnType ) {

            for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
                let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
                let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
                let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap_KeyAnnType.get( annotationTypeId );
                let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap_KeyAnnType.get( annotationTypeId );

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
                        throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }

        //  Sort On the following:

        // Descending
        if ( a.numPsms < b.numPsms ) {
            return 1;
        }
        if ( a.numPsms > b.numPsms ) {
            return -1;
        }

        if ( a.reportedPeptideId < b.reportedPeptideId ) {
            return -1;
        }
        if ( a.reportedPeptideId > b.reportedPeptideId ) {
            return 1;
        }
        return 0;
    });
}


/**
 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
 */
const _getAnnotationTypeRecords_DisplayOrder = function( { projectSearchId, searchDataLookupParamsRoot, dataPageStateManager } : {

    projectSearchId : number
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    dataPageStateManager : DataPageStateManager

} ) : AnnotationTypeRecords_DisplayOrder {

    //   Get annotation types in display order

    let searchDataLookupParams_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId = undefined;
    for ( const searchDataLookupParamsListEntry of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
        if ( searchDataLookupParamsListEntry.projectSearchId === projectSearchId ) {
            searchDataLookupParams_Single_ProjectSearchId = searchDataLookupParamsListEntry;
            break;
        }
    }
    if ( ! searchDataLookupParams_Single_ProjectSearchId ) {
        throw Error("searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain projectSearchId: " + projectSearchId )
    }
    if ( ( ! searchDataLookupParams_Single_ProjectSearchId.psmAnnTypeDisplay ) || searchDataLookupParams_Single_ProjectSearchId.psmAnnTypeDisplay.length === 0 ) {
        //  NOTHING to display so return empty array
        return { reportedPeptideAnnotationTypesForAnnotationTypeIds : [] }; // EARLY RETURN
    }

    const annotationTypeData : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

    const annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }

    //  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names

    const reportedPeptideAnnotationTypesForAnnotationTypeIds : Array<AnnotationTypeItem> = [];

    //  PSM

    const reportedPeptideFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes
    const reportedPeptideDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes
    if ( ( ! reportedPeptideFilterableAnnotationTypes ) && ( ! reportedPeptideDescriptiveAnnotationTypes ) ) {
        throw Error("No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes but have allPSMAnnotationTypeIds_InPsmList entries");
    }
    //  Get AnnotationTypeRecords for AnnotationTypeIds
    for ( const allPSMAnnotationTypeIds_InPsmListKeyItem of searchDataLookupParams_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay ) {
        let annotationTypeEntryForKey = reportedPeptideFilterableAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
        if ( ! annotationTypeEntryForKey ) {
            annotationTypeEntryForKey = reportedPeptideDescriptiveAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
            if ( ! annotationTypeEntryForKey ) {
                throw Error( "No reportedPeptideFilterableAnnotationTypes or reportedPeptideDescriptiveAnnotationTypes entry for key: " + allPSMAnnotationTypeIds_InPsmListKeyItem );
            }
        }
        reportedPeptideAnnotationTypesForAnnotationTypeIds.push( annotationTypeEntryForKey );
    }

    const result : AnnotationTypeRecords_DisplayOrder = {
        reportedPeptideAnnotationTypesForAnnotationTypeIds
    };

    return result;
}

/**
 * Internal class
 *
 * Returned from internal function _getAnnotationTypeRecords_DisplayOrder
 */
class AnnotationTypeRecords_DisplayOrder {

    reportedPeptideAnnotationTypesForAnnotationTypeIds : AnnotationTypeItem[]
}