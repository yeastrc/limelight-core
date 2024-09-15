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
    AnnotationTypeItem,
    AnnotationTypeItems_PerProjectSearchId,
    DataPageStateManager
} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

//  Returned Data classes

export class CreateReportedPeptideDisplayData_PeptideItem {
    reportedPeptideId : number

    protein_Pre_Residues : Set<string> = new Set()
    protein_Pre_Residue_N_Term : boolean
    protein_Post_Residues : Set<string> = new Set()
    protein_Post_Residue_C_Term : boolean

    peptideUnique : boolean
    peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    reportedPeptideSequence? : string
    numPsms? : number
    peptideAnnotationMap_KeyAnnType? : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId>
}

export class CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId {
    annotationTypeId : number
    valueDouble : number
    valueString :  string
}

//   Result Class - Returned from main function createReportedPeptideDisplayData

class CreateReportedPeptideDisplayData_Result_Class {
    peptideList : Array<CreateReportedPeptideDisplayData_PeptideItem>
    numberOfReportedPeptides : number
    numberOfPsmsForReportedPeptides : number
    annotationTypeRecords_DisplayOrder : Internal_AnnotationTypeRecords_DisplayOrder
}

/**
 * !!!!!!!!!!   MAIN FUNCTION  !!!!!!!!!!!!!!!
 *
 *
 * Create Reported Peptide Data for Display or Download
 * 
 * return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
 * Returns:
 *    Reported Peptide List
 *    Number of Reported Peptides
 *    Number of PSMs total
 */
export const createReportedPeptideDisplayData = async function(
    {
        show_Protein_Pre_Post_Residues,
        projectSearchId,
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId, // Only for error reporting
        searchDataLookupParamsRoot,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
        dataPageStateManager,

    } : {
        show_Protein_Pre_Post_Residues: boolean
        projectSearchId : number
        reportedPeptideIds_ForDisplay : Set<number>
        dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId : number // Only for error reporting
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        dataPageStateManager : DataPageStateManager
    }
) : Promise<CreateReportedPeptideDisplayData_Result_Class> {
    try {
        let reportedPeptideIds_ToProcess = reportedPeptideIds_ForDisplay;
        if ( dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
            reportedPeptideIds_ToProcess = new Set( dataPerReportedPeptideId_Map_Key_reportedPeptideId.keys() );
        }

        const peptideListResult : Array<CreateReportedPeptideDisplayData_PeptideItem> = [];

        const annotationTypeItems_For_ProjectSearchId = dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId)
        if ( ! annotationTypeItems_For_ProjectSearchId ) {
            const msg = "No entry in dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const annotationTypeData_ReturnSpecifiedTypes = dataPageStateManager.get_util_AnnotationTypeData_ReturnSpecifiedTypes();

        /**
         * Get array ann type entries, sorted on sortOrder
         */
        const reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_For_ProjectSearchId = (
            annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId: projectSearchId } )
        );
        if ( ! reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_For_ProjectSearchId ) {
            const msg = "No entry in annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        let searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
        {
            for (const paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList) {
                if (paramsForProjectSearchIdsList_Entry.projectSearchId === projectSearchId) {
                    searchDataLookupParams_For_Single_ProjectSearchId = paramsForProjectSearchIdsList_Entry;
                    break;
                }
            }
            if (!searchDataLookupParams_For_Single_ProjectSearchId) {
                const msg = "No entry in searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }
        }

        //  Retrieve data for these AnnotationTypeIds
        const reportedPeptide_Filterable_AnnotationTypeIds_ToRetrieve_Set: Set<number> = new Set()
        const reportedPeptide_Descriptive_AnnotationTypeIds_ToRetrieve_Set: Set<number> = new Set()

        //  Add AnnotationTypeIds Used For Display
        for ( const reportedPeptideAnnTypeIdDisplay_Entry of searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay ) {
            if ( annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes.get( reportedPeptideAnnTypeIdDisplay_Entry ) ) {
                reportedPeptide_Filterable_AnnotationTypeIds_ToRetrieve_Set.add(reportedPeptideAnnTypeIdDisplay_Entry)
            } else if ( annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes.get( reportedPeptideAnnTypeIdDisplay_Entry ) ) {
                reportedPeptide_Descriptive_AnnotationTypeIds_ToRetrieve_Set.add(reportedPeptideAnnTypeIdDisplay_Entry)
            } else {
                const msg = "reportedPeptideAnnTypeIdDisplay_Entry not found in annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes or annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes. reportedPeptideAnnTypeIdDisplay_Entry: " + reportedPeptideAnnTypeIdDisplay_Entry
                console.warn(msg)
                throw Error(msg)
            }
        }

        //  Add AnnotationTypeIds Used For Sorting - May not be displayed
        for ( const annotationTypeRecords__Entry of reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_For_ProjectSearchId ) {
            if ( annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes.get( annotationTypeRecords__Entry.annotationTypeId ) ) {
                reportedPeptide_Filterable_AnnotationTypeIds_ToRetrieve_Set.add(annotationTypeRecords__Entry.annotationTypeId)
            } else if ( annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes.get( annotationTypeRecords__Entry.annotationTypeId ) ) {
                reportedPeptide_Descriptive_AnnotationTypeIds_ToRetrieve_Set.add(annotationTypeRecords__Entry.annotationTypeId)
            } else {
                const msg = "annotationTypeRecords__Entry.annotationTypeId not found in annotationTypeItems_For_ProjectSearchId.reportedPeptideFilterableAnnotationTypes or annotationTypeItems_For_ProjectSearchId.reportedPeptideDescriptiveAnnotationTypes. annotationTypeRecords__Entry.annotationTypeId: " + annotationTypeRecords__Entry.annotationTypeId
                console.warn(msg)
                throw Error(msg)
            }
        }

        ////  Get Data from server

        let reportedPeptide_Filterable_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues_Holder
        if ( reportedPeptide_Filterable_AnnotationTypeIds_ToRetrieve_Set.size > 0 ) {
            const get_ReportedPeptide_Filterable_AnnotationValues_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues().
                get_ReportedPeptide_Filterable_AnnotationValues_ReturnPromise({
                    reportedPeptideIds: reportedPeptideIds_ToProcess, annotationTypeIds: reportedPeptide_Filterable_AnnotationTypeIds_ToRetrieve_Set
                });
            reportedPeptide_Filterable_AnnotationValues_Holder = get_ReportedPeptide_Filterable_AnnotationValues_ReturnPromise_Result.reportedPeptide_Filterable_AnnotationValues_Holder;
        }

        let reportedPeptide_Descriptive_AnnotationValues_Holder: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues_Holder
        if ( reportedPeptide_Descriptive_AnnotationTypeIds_ToRetrieve_Set.size > 0 ) {
            const get_ReportedPeptide_Descriptive_AnnotationValues_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues().
                get_ReportedPeptide_Descriptive_AnnotationValues_ReturnPromise({
                    reportedPeptideIds: reportedPeptideIds_ToProcess, annotationTypeIds: reportedPeptide_Descriptive_AnnotationTypeIds_ToRetrieve_Set
                });
            reportedPeptide_Descriptive_AnnotationValues_Holder = get_ReportedPeptide_Descriptive_AnnotationValues_ReturnPromise_Result.reportedPeptide_Descriptive_AnnotationValues_Holder;
        }

        const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
            await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise();
        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder

        const get_ReportedPeptideSequences_ReturnPromise_Result =
            await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
            get_commonData_LoadedFromServer_CommonAcrossSearches__ReportedPeptideSequences().get_ReportedPeptideSequences_ReturnPromise({ reportedPeptideIds: reportedPeptideIds_ToProcess });
        const reportedPeptideSequences_Holder = get_ReportedPeptideSequences_ReturnPromise_Result.reportedPeptideSequences_Holder;

        /////////

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

                const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId);

                if ( peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include ) {

                    filteringOn_PsmIds = true;
                    break;
                }
            }
        }

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideId of reportedPeptideIds_ToProcess ) {

            let peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = undefined

            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId =
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId );
            if ( ! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId ) {
                throw Error("_createReportedPeptideDisplayData: No peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
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
                    psmIds_Include = new Set( peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include );
                    psmCount_after_Include = peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;
                }
                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId, psmIds_Include, psmCount_after_Include,
                    scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get___scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch__FOR_COPY_ONLY()
                });
            }

            //  Is this Reported Peptide Unique?
            let peptideUnique = true;
            {
                // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
                const proteinSequenceVersionIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId( reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
                }
                if ( proteinSequenceVersionIds.size !== 1 ) {
                    peptideUnique = false;
                }
            }

            const peptideItem : CreateReportedPeptideDisplayData_PeptideItem = {
                reportedPeptideId, peptideUnique, peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                protein_Pre_Residues : new Set(),
                protein_Pre_Residue_N_Term : false,
                protein_Post_Residues : new Set(),
                protein_Post_Residue_C_Term : false
            };

            const reportedPeptideString = reportedPeptideSequences_Holder.get_ReportedPeptideSequence_For_ReportedPeptideId( reportedPeptideId );
            if ( ! reportedPeptideString ) {
                throw Error("_createReportedPeptideDisplayData: No reportedPeptideString for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
            }
            peptideItem.reportedPeptideSequence = reportedPeptideString;

            peptideItem.numPsms = peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

            if ( show_Protein_Pre_Post_Residues ) {

                //  Protein Pre and Post Residues

                if ( !proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
                    //  Coverage Data NOT loaded

                    throw Error("( !proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) ")
                }

                const proteinCoverage_For_ReportedPeptideId =
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId);

                if (proteinCoverage_For_ReportedPeptideId) {
                    for (const proteinCoverageEntry of proteinCoverage_For_ReportedPeptideId) {

                        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null
                            && proteinSequenceVersionId !== proteinCoverageEntry.proteinSequenceVersionId ) {

                            //  Processing this function specifically for proteinSequenceVersionId (Single Protein Page)
                            //     AND the proteinSequenceVersionId for this Coverage Entry does NOT match SO SKIP

                            continue;  // EARLY CONTINUE
                        }

                        if ( proteinCoverageEntry.peptideAtProteinStart_Flag ) {

                            peptideItem.protein_Pre_Residue_N_Term = true
                        } else {

                            peptideItem.protein_Pre_Residues.add( proteinCoverageEntry.protein_PreResidue );

                        }

                        if ( proteinCoverageEntry.peptideAtProteinEnd_Flag ) {

                            peptideItem.protein_Post_Residue_C_Term = true
                        } else {

                            peptideItem.protein_Post_Residues.add( proteinCoverageEntry.protein_PostResidue );
                        }
                    }
                }
            }

            {
                //  Reported Peptide Ann Values

                //  Create Object from Map since that is expected in other code
                let peptideAnnotationMap_KeyAnnType : Map<number, CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId> = undefined; // property name will be ann type id

                { //  Reported Peptide Filterable Ann Data

                    if ( reportedPeptide_Filterable_AnnotationValues_Holder ) {
                        const reportedPeptideFilterable_annData_KeyAnnTypeId = reportedPeptide_Filterable_AnnotationValues_Holder.get_ReportedPeptide_Filterable_AnnotationValues_For_ReportedPeptideId( reportedPeptideId );
                        if ( reportedPeptideFilterable_annData_KeyAnnTypeId ) {

                            for ( const annDataEntry of reportedPeptideFilterable_annData_KeyAnnTypeId.get_ReportedPeptide_Filterable_AnnotationValues_All() ) {
                                const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId =
                                    { annotationTypeId : annDataEntry.annotationTypeId, valueDouble : annDataEntry.valueDouble, valueString : annDataEntry.valueString };
                                if ( ! peptideAnnotationMap_KeyAnnType ) {
                                    peptideAnnotationMap_KeyAnnType = new Map();
                                }
                                peptideAnnotationMap_KeyAnnType.set( annDataEntry.annotationTypeId, annDataForDisplay );
                            }
                        }
                    }
                }

                { //  Reported Peptide Descriptive Ann Data

                    if ( reportedPeptide_Descriptive_AnnotationValues_Holder ) {
                        const reportedPeptideDescriptive_annData_KeyAnnTypeId = reportedPeptide_Descriptive_AnnotationValues_Holder.get_ReportedPeptide_Descriptive_AnnotationValues_For_ReportedPeptideId( reportedPeptideId );
                        if ( reportedPeptideDescriptive_annData_KeyAnnTypeId ) {

                            for ( const annDataEntry of reportedPeptideDescriptive_annData_KeyAnnTypeId.get_ReportedPeptide_Descriptive_AnnotationValues_All() ) {
                                const annDataForDisplay : CreateReportedPeptideDisplayData_Item_For_AnnotationTypeId =
                                    { annotationTypeId : annDataEntry.annotationTypeId, valueDouble : undefined, valueString : annDataEntry.valueString };
                                if ( ! peptideAnnotationMap_KeyAnnType ) {
                                    peptideAnnotationMap_KeyAnnType = new Map();
                                }
                                peptideAnnotationMap_KeyAnnType.set( annDataEntry.annotationTypeId, annDataForDisplay );
                            }
                        }
                    }
                }
                peptideItem.peptideAnnotationMap_KeyAnnType = peptideAnnotationMap_KeyAnnType;
            }

            peptideListResult.push( peptideItem )
        }

        //  Get AnnotationType records for Displaying Annotation data in display order in peptideList
        const annotationTypeRecords_DisplayOrder : Internal_AnnotationTypeRecords_DisplayOrder =
            _getAnnotationTypeRecords_DisplayOrder( { projectSearchId: projectSearchId, searchDataLookupParamsRoot: searchDataLookupParamsRoot, dataPageStateManager: dataPageStateManager } );

        // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
        _sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated: reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_For_ProjectSearchId } );

        const numberOfReportedPeptides = peptideListResult.length;

        let numberOfPsmsForReportedPeptides = 0;

        for ( const peptideItem of peptideListResult ) {
            numberOfPsmsForReportedPeptides += peptideItem.numPsms;
        }

        return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
 * Return Reported Peptide Type Records in Display Order
 */
const _getAnnotationTypeRecords_DisplayOrder = function( { projectSearchId, searchDataLookupParamsRoot, dataPageStateManager } : {

    projectSearchId : number
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    dataPageStateManager : DataPageStateManager

} ) : Internal_AnnotationTypeRecords_DisplayOrder {

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
    if ( ( ! searchDataLookupParams_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay ) || searchDataLookupParams_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay.length === 0 ) {
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

    const result : Internal_AnnotationTypeRecords_DisplayOrder = {
        reportedPeptideAnnotationTypesForAnnotationTypeIds
    };

    return result;
}

/**
 * Internal class
 *
 * Returned from internal function _getAnnotationTypeRecords_DisplayOrder
 */
class Internal_AnnotationTypeRecords_DisplayOrder {

    reportedPeptideAnnotationTypesForAnnotationTypeIds : AnnotationTypeItem[]
}