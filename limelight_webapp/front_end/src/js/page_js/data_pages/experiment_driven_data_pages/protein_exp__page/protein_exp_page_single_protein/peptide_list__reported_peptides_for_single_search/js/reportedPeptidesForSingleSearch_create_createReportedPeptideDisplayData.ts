/**
 * reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Create     ReportedPeptideDisplayData Objects for child table
 */

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';

import { ReportedPeptideStringData_For_ReportedPeptideId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/reportedPeptideStringData_For_ReportedPeptideId'
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";

export class CreateReportedPeptideDisplayData_PeptideItem {
    reportedPeptideId : number
    proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    reportedPeptideSequence? : string
    numPsms? : number
    peptideAnnotationMap? : any
    psmAnnotationMap? : any
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
export const createReportedPeptideDisplayData = function({

    reportedPeptideIds_ForDisplay,
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    proteinSequenceVersionId/* Only for error reporting */, 
    projectSearchId, 
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    dataPageStateManager
} :  {
    reportedPeptideIds_ForDisplay : Set<number>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    proteinSequenceVersionId : number /* Only for error reporting */
    projectSearchId : number
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    dataPageStateManager : DataPageStateManager
}  ) {

    const peptideListResult : Array<CreateReportedPeptideDisplayData_PeptideItem> = [];
    
    //  Various Maps, key Reported Peptide Id
    //  These 3 may be undefined if not populated since not applicable.
    const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
    const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();
    const psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();

    //  reportedPeptideIds filtered if applicable so now create display peptide row objects

    for ( const reportedPeptideId of reportedPeptideIds_ForDisplay ) {

        const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId );
        if ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId ) {
            throw Error("_createReportedPeptideDisplayData: No proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }

        const peptideItem : CreateReportedPeptideDisplayData_PeptideItem = {
            reportedPeptideId, proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        };

        const reportedPeptideStringData : ReportedPeptideStringData_For_ReportedPeptideId = loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );
        if ( ! reportedPeptideStringData ) {
            throw Error("_createReportedPeptideDisplayData: No reportedPeptideStringData for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }
        peptideItem.reportedPeptideSequence = reportedPeptideStringData.getReportedPeptideString();

        peptideItem.numPsms = proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include_Exclude;

        {
            //  Reported Peptide Ann Values
            
            //  Create Object from Map since that is expected in other code
            let peptideAnnotationData = undefined; // property name will be ann type id

            { //  Reported Peptide Filterable Ann Data
                if ( reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
                    const reportedPeptideFilterable_annData_KeyAnnTypeId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
                    if ( reportedPeptideFilterable_annData_KeyAnnTypeId ) {

                        for ( const annDataEntry of reportedPeptideFilterable_annData_KeyAnnTypeId ) {
                            const annTypeId = annDataEntry[ 0 ]; // key
                            const annData = annDataEntry[ 1 ]; // value
                            const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                            if ( ! peptideAnnotationData ) {
                                peptideAnnotationData = {};
                            }
                            peptideAnnotationData[ annTypeId ] = annDataForDisplay;
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
                            const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                            if ( ! peptideAnnotationData ) {
                                peptideAnnotationData = {};
                            }
                            peptideAnnotationData[ annTypeId ] = annDataForDisplay;
                        }
                    }
                }
            }
            peptideItem.peptideAnnotationMap = peptideAnnotationData;
        }

        {
            //  Best PSM Ann Values
            if ( psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
                //  Create Object from Map since that is expected in other code
                const psmBestFilterable_annData_KeyAnnTypeId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
                if ( psmBestFilterable_annData_KeyAnnTypeId ) {

                    const psmAnnotationData = {}; // property name will be ann type id
                    for ( const annDataEntry of psmBestFilterable_annData_KeyAnnTypeId ) {
                        const annTypeId = annDataEntry[ 0 ]; // key
                        const annData = annDataEntry[ 1 ]; // value
                        const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                        psmAnnotationData[ annTypeId ] = annDataForDisplay;
                    }
                    peptideItem.psmAnnotationMap = psmAnnotationData;
                }
            }
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
    let annotationTypeRecords_DisplayOrder = getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList : peptideListResult, annotationTypeData_ReturnSpecifiedTypes } );

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } );
    
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
const sortPeptideListOnSortOrder = function( { peptideList, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } ) {

    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
    let psmAnnotationTypesForPeptideListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.length;

    peptideList.sort( function( a, b ) {

        //  Compare Reported Peptide Ann Values, if they are populated
        let a_peptideAnnotationMap = a.peptideAnnotationMap;
        let b_peptideAnnotationMap = b.peptideAnnotationMap;
        if ( a_peptideAnnotationMap && b_peptideAnnotationMap ) {

            for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
                let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
                let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
                let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap[ annotationTypeId ];
                let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap[ annotationTypeId ];

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

        //  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
        let a_psmAnnotationMap = a.psmAnnotationMap;
        let b_psmAnnotationMap = b.psmAnnotationMap;
        if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

            for ( let psmAnnotationTypesForPeptideListEntriesLength_Index = 0; psmAnnotationTypesForPeptideListEntriesLength_Index < psmAnnotationTypesForPeptideListEntriesLength; psmAnnotationTypesForPeptideListEntriesLength_Index++ ) {
                let psmAnnotationTypesForPeptideListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries[ psmAnnotationTypesForPeptideListEntriesLength_Index ];
                let annotationTypeId = psmAnnotationTypesForPeptideListEntries_Entry.annotationTypeId;
                let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
                let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];

                if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
                    if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionBelow ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionAbove ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else {
                        throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }

        //  All Reported Peptide and PSM Ann Type Values match so order on reported peptide id
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
const getAnnotationTypeRecords_DisplayOrder = function( { projectSearchId, peptideList, annotationTypeData_ReturnSpecifiedTypes } ) {

    //   Get all annotation type ids returned in all entries and produce a list of them to put in columns

    //  First get all Unique Reported Peptide and PSM Annotation Type Ids in the Peptide List
    
    let uniquePSMAnnotationTypeIds_InPeptideList = new Set();
    let uniqueReportedPeptideAnnotationTypeIds_InPeptideList = new Set();
//		let uniqueMatchedProteinAnnotationTypeIds_InPeptideList = new Set; // Not populated yet

    peptideList.forEach( function( peptideListItem, index, array ) {
        let psmAnnotationMap = peptideListItem.psmAnnotationMap;
        if ( psmAnnotationMap ) {
            Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
                let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
                uniquePSMAnnotationTypeIds_InPeptideList.add( psmAnnotationDTOItem.annotationTypeId );
            }, this );
        }
        let peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
        if ( peptideAnnotationMap ) {
            Object.keys ( peptideAnnotationMap ).forEach( function( peptideAnnotationMapKeyItem, index, array ) {
                let peptideAnnotationDTOItem = peptideAnnotationMap[ peptideAnnotationMapKeyItem ];
                uniqueReportedPeptideAnnotationTypeIds_InPeptideList.add( peptideAnnotationDTOItem.annotationTypeId );
            }, this );
        }
    }, this );
    
    //  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let psmAnnotationTypesForPeptideListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InPeptideList } );
    let reportedPeptideAnnotationTypesForPeptideListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_InPeptideList } );

    return {
        psmAnnotationTypesForPeptideListEntries : psmAnnotationTypesForPeptideListEntries,
        reportedPeptideAnnotationTypesForPeptideListEntries : reportedPeptideAnnotationTypesForPeptideListEntries
    };
}