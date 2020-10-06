/**
 * reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Create     ReportedPeptideDisplayData Objects for child table
 */

//   From data_pages_common
import {AnnotationTypeData_Root, AnnotationTypeItem, DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

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
    peptideAnnotationMap_KeyAnnType? : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId>
    psmAnnotationMap_KeyAnnType? : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId>
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
export const createReportedPeptideDisplayData = function({

    reportedPeptideIds_ForDisplay,
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    proteinSequenceVersionId, //  Only for error reporting
    projectSearchId, 
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    dataPageStateManager
} :  {
    reportedPeptideIds_ForDisplay : Set<number>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    proteinSequenceVersionId : number // Only for error reporting
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



    let filteringOn_PsmIds = false;  //  Track for different functionality below

    for ( const reportedPeptideId of reportedPeptideIds_ForDisplay ) {

        const proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId);

        if ( proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
            || proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Exclude ) {

            filteringOn_PsmIds = true;
            break;
        }
    }

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

        { //  Best PSM Ann Values.

            if ( ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include )
                    && ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Exclude ) ) {

                //  Best PSM Ann Values precomputed at Reported Peptide level.   Used when NOT filtering on PSMs (Currently Open Mod and Reporter Ion filters do filtering on PSMs)

                if ( psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {

                    const psmBestFilterable_annData_KeyAnnTypeId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
                    if ( psmBestFilterable_annData_KeyAnnTypeId ) {

                        const psmAnnotationMap_KeyAnnType : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId> = new Map();
                        for ( const annDataEntry of psmBestFilterable_annData_KeyAnnTypeId ) {
                            const annTypeId = annDataEntry[ 0 ]; // key
                            const annData = annDataEntry[ 1 ]; // value
                            const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId = { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
                            psmAnnotationMap_KeyAnnType.set( annTypeId, annDataForDisplay );
                        }
                        peptideItem.psmAnnotationMap_KeyAnnType = psmAnnotationMap_KeyAnnType;
                    }
                }
            } else {

                //  Filtering on PSM Ids so need to determine Best PSM Annotation values from values on PSMs with PSM Ids filtered to

                peptideItem.psmAnnotationMap_KeyAnnType = _compute_BestPSMs_Using_PSM_Filtering({
                    reportedPeptideId, proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                    loadedDataPerProjectSearchIdHolder, dataPageStateManager, projectSearchId
                });
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
    let annotationTypeRecords_DisplayOrder : AnnotationTypeRecords_DisplayOrder =
        _getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList : peptideListResult, annotationTypeData_ReturnSpecifiedTypes } );

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } );
    
    const numberOfReportedPeptides = peptideListResult.length;
    
    let numberOfPsmsForReportedPeptides = 0;
    
    for ( const peptideItem of peptideListResult ) {
        numberOfPsmsForReportedPeptides += peptideItem.numPsms;
    }
    
    return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
}

/**
 * Get Best PSMs for the reported peptide id based on the PSM filtering
 */
const _compute_BestPSMs_Using_PSM_Filtering = function(
    {
        reportedPeptideId,
        proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
        loadedDataPerProjectSearchIdHolder,
        dataPageStateManager,
        projectSearchId  // For Error reporting
    } : {
        reportedPeptideId : number
        proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        dataPageStateManager : DataPageStateManager
        projectSearchId : number  // For Error reporting

    }) : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId> {

    if ( ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include )
        && ( ! proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Exclude ) ) {
        const msg = "( ! psmIds_Include && ! psmIds_Exclude. _compute_BestPSMs_Using_PSM_Filtering(...). projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }

    if ( ! loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap() ) {
        const msg = "( ! loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap() ) so not loaded. _compute_BestPSMs_Using_PSM_Filtering(...). projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }
    const psmIds_For_MainPSMFilter_For_ReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap().get( reportedPeptideId );
    if ( ! psmIds_For_MainPSMFilter_For_ReportedPeptideId ) {

        // return undefined;

        const msg = "( loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap().get( reportedPeptideId ) NOT return a value. _compute_BestPSMs_Using_PSM_Filtering. reportedPeptideId: " +
            reportedPeptideId +
            ", projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }

    const psmAnnotationMap_KeyAnnType : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId> = new Map();

    const psmIds_Include = proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
    const psmIds_Exclude = proteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Exclude

    for ( const psmId of psmIds_For_MainPSMFilter_For_ReportedPeptideId ) {

        if ( psmIds_Include ) { //  Have Include so process here and then skip to next

            if ( psmIds_Include.has( psmId ) ) {

                _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId({ psmId, psmAnnotationMap_KeyAnnType, loadedDataPerProjectSearchIdHolder, dataPageStateManager, reportedPeptideId, projectSearchId })
            }
            continue;  // EARLY CONTINUE
        }
        if ( psmIds_Exclude ) {

            if ( ! psmIds_Include.has( psmId ) ) {

                _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId({ psmId, psmAnnotationMap_KeyAnnType, loadedDataPerProjectSearchIdHolder, dataPageStateManager, reportedPeptideId, projectSearchId })
            }
            continue;  // EARLY CONTINUE
        }
        const msg = "( ! psmIds_Include && ! psmIds_Exclude. _compute_BestPSMs_Using_PSM_Filtering(...). projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }

    return psmAnnotationMap_KeyAnnType;
}

/**
 * Get Best PSMs for the reported peptide id based on the PSM filtering
 */
const _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId = function(
    {
        psmId,
        psmAnnotationMap_KeyAnnType,
        loadedDataPerProjectSearchIdHolder,
        dataPageStateManager,
        reportedPeptideId,
        projectSearchId
} : {
        psmId : number
        psmAnnotationMap_KeyAnnType : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId>
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        dataPageStateManager : DataPageStateManager
        reportedPeptideId : number  // For Error reporting
        projectSearchId : number  // For Error reporting

    }) : void {

    if ( ! loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap() ) {
        const msg = "( ! loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap() ) so not loaded. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId(...). projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }
    const psmFilterableAnnotationValuesForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap().get( reportedPeptideId );
    if ( ! psmFilterableAnnotationValuesForReportedPeptideIdMap ) {

        // return undefined;

        const msg = "( loadedDataPerProjectSearchIdHolder.get_psmFilterableAnnotationValuesForReportedPeptideIdMap().get( reportedPeptideId ) NOT return a value. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId. reportedPeptideId: " +
            reportedPeptideId +
            ", projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }
    const psmFilterableAnnotationValuesForPsmIdMap_Key_AnnTypeId = psmFilterableAnnotationValuesForReportedPeptideIdMap.get( psmId );
    if ( ! psmFilterableAnnotationValuesForPsmIdMap_Key_AnnTypeId ) {

        // return undefined;

        const msg = "( psmFilterableAnnotationValuesForReportedPeptideIdMap.get( psmId ) NOT return a value. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId. psmId: " +
            psmId +
            ", reportedPeptideId: " + reportedPeptideId +
            ", projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }

    const annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();
    const annotationTypeItems_ForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId )
    if ( ! annotationTypeItems_ForProjectSearchId ) {
        const msg = "( annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ) NOT return a value. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId. psmId: " +
            psmId +
            ", reportedPeptideId: " + reportedPeptideId +
            ", projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }
    const psmFilterableAnnotationTypes = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes
    if ( ! psmFilterableAnnotationTypes ) {
        const msg = "( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes NOT contain a value. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId. psmId: " +
            psmId +
            ", reportedPeptideId: " + reportedPeptideId +
            ", projectSearchId: " + projectSearchId
        console.warn( msg )
        throw Error( msg )
    }

    for ( const mapEntry of psmFilterableAnnotationValuesForPsmIdMap_Key_AnnTypeId.entries() ) {

        const annotationTypeId = mapEntry[ 0 ];
        const annValueNumber = mapEntry[ 1 ];

        let add_Current_AnnValue_ToMap = true;

        {
            const psmFilterableAnnotationType = psmFilterableAnnotationTypes.get( annotationTypeId );
            if ( ! psmFilterableAnnotationTypes ) {
                const msg = "( psmFilterableAnnotationTypes.get( annotationTypeId ); NOT return a value. _compute_BestPSMs_Using_PSM_Filtering__processSinglePsmId. annotationTypeId: " +
                    annotationTypeId +
                    ", psmId: " + psmId +
                    ", reportedPeptideId: " + reportedPeptideId +
                    ", projectSearchId: " + projectSearchId
                console.warn( msg )
                throw Error( msg )
            }

            const annDataForDisplay_ExistingEntry = psmAnnotationMap_KeyAnnType.get( annotationTypeId );
            if ( annDataForDisplay_ExistingEntry ) {
                // Have existing entry so have to compare to current entry to determine which is 'better'

                //  Set add_Current_AnnValue_ToMap = false if existing entry is not worse than current entry

                if ( psmFilterableAnnotationType.filterDirectionBelow ) {
                    if ( annDataForDisplay_ExistingEntry.valueDouble <= annValueNumber ) {
                        add_Current_AnnValue_ToMap = false;
                    }
                } else if ( psmFilterableAnnotationType.filterDirectionAbove ) {
                    if ( annDataForDisplay_ExistingEntry.valueDouble >= annValueNumber ) {
                        add_Current_AnnValue_ToMap = false;
                    }
                } else {
                    throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                }
            }
        }

        if ( add_Current_AnnValue_ToMap ) {

            //  create and add to Map
            const annValueString = annValueNumber.toString()
            const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId = { annotationTypeId, valueDouble : annValueNumber, valueString : annValueString };
            psmAnnotationMap_KeyAnnType.set( annotationTypeId, annDataForDisplay );
        }
    }
}

/**
 * Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
 */
const _sortPeptideListOnSortOrder = function( { peptideList, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } : {
    peptideList : Array<CreateReportedPeptideDisplayData_PeptideItem>
    reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated : AnnotationTypeItem[]
    annotationTypeRecords_DisplayOrder : AnnotationTypeRecords_DisplayOrder
} ) {

    let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
    let psmAnnotationTypesForPeptideListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.length;

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

        //  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
        let a_psmAnnotationMap_KeyAnnType = a.psmAnnotationMap_KeyAnnType;
        let b_psmAnnotationMap_KeyAnnType = b.psmAnnotationMap_KeyAnnType;
        if ( a_psmAnnotationMap_KeyAnnType && b_psmAnnotationMap_KeyAnnType ) {

            for ( let psmAnnotationTypesForPeptideListEntriesLength_Index = 0; psmAnnotationTypesForPeptideListEntriesLength_Index < psmAnnotationTypesForPeptideListEntriesLength; psmAnnotationTypesForPeptideListEntriesLength_Index++ ) {
                let psmAnnotationTypesForPeptideListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries[ psmAnnotationTypesForPeptideListEntriesLength_Index ];
                let annotationTypeId = psmAnnotationTypesForPeptideListEntries_Entry.annotationTypeId;
                let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap_KeyAnnType.get( annotationTypeId );
                let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap_KeyAnnType.get( annotationTypeId );

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
const _getAnnotationTypeRecords_DisplayOrder = function( { projectSearchId, peptideList, annotationTypeData_ReturnSpecifiedTypes } : {

    projectSearchId : number
    peptideList : Array<CreateReportedPeptideDisplayData_PeptideItem>
    annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes
} ) {

    //   Get all annotation type ids returned in all entries and produce a list of them to put in columns

    //  First get all Unique Reported Peptide and PSM Annotation Type Ids in the Peptide List
    
    let uniquePSMAnnotationTypeIds_InPeptideList = new Set();
    let uniqueReportedPeptideAnnotationTypeIds_InPeptideList = new Set();
//		let uniqueMatchedProteinAnnotationTypeIds_InPeptideList = new Set; // Not populated yet

    for( const peptideListItem of peptideList ) {
        {
            let psmAnnotationMap_KeyAnnType = peptideListItem.psmAnnotationMap_KeyAnnType;
            if ( psmAnnotationMap_KeyAnnType ) {
                for ( const mapEntry of psmAnnotationMap_KeyAnnType.entries() ) {
                    const mapEntryValue = mapEntry[ 1 ];
                    const annotationTypeId = mapEntryValue.annotationTypeId;
                    uniquePSMAnnotationTypeIds_InPeptideList.add( annotationTypeId );
                }
            }
        }
        {
            let peptideAnnotationMap_KeyAnnType = peptideListItem.peptideAnnotationMap_KeyAnnType;
            if ( peptideAnnotationMap_KeyAnnType ) {
                for ( const mapEntry of peptideAnnotationMap_KeyAnnType.entries() ) {
                    const mapEntryValue = mapEntry[ 1 ];
                    const annotationTypeId = mapEntryValue.annotationTypeId;
                    uniqueReportedPeptideAnnotationTypeIds_InPeptideList.add( annotationTypeId );
                }
            }
        }
    }
    
    //  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let psmAnnotationTypesForPeptideListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InPeptideList } );
    let reportedPeptideAnnotationTypesForPeptideListEntries = 
        annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
            projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_InPeptideList } );

    const result : AnnotationTypeRecords_DisplayOrder = {
        psmAnnotationTypesForPeptideListEntries,
        reportedPeptideAnnotationTypesForPeptideListEntries
    };

    return result;
}

/**
 * Internal class
 *
 * Returned from internal function _getAnnotationTypeRecords_DisplayOrder
 */
class AnnotationTypeRecords_DisplayOrder {

    psmAnnotationTypesForPeptideListEntries : AnnotationTypeItem[]
    reportedPeptideAnnotationTypesForPeptideListEntries : AnnotationTypeItem[]
}