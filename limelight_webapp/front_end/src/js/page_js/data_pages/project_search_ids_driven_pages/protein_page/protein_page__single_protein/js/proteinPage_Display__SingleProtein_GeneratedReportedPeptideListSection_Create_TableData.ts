/**
 * proteinPage_Display__SingleProteinGeneratedReportedPeptideListSection_Create_TableData.ts
 *
 * Get Data Table from Peptide List  --   PSB:  Single Protein AND Peptide Page
 *
 * Create Root Table with Generated Peptide String, and PSM Counts per condition in first condition group
 *
 */

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {
    DataTable_Column,
    DataTable_Column_DownloadTable, DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from './proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData';
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content,
    proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___uniqueColumnHeader_Tooltip_Create,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {
    proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects,
    ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/protein_page__single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData";
import {
    annotationName_Prefix_BestOfPsmValues_TextLabel
} from "page_js/constants_across_webapp/annotation_constants/annotationName_Prefix_BestOfPsmValues";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {
    get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";
import {
    limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage
} from "page_js/common_all_pages/annotation_data_display_common_formatting/limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage";


//  Child Data Searches for Single Peptide show/hide


//////////////////

const dataTableId_ThisTable = "Single Protein Peptide List Root Table";



/**
 *
 */
class ProteinNameDescriptionCacheEntry {
    name : string
    description: string
}




export class CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params {
    proteinSequenceVersionId: number
    ctrlKey_From_ClickEvent: boolean
    metaKey_From_ClickEvent: boolean
}

export type CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function =
    ( params : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params ) => void;



///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_MultipleSearch_SingleProtein_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 *
 *   --   PSB:  Single Protein AND Peptide Page
 *
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein = function(
    {
        create_GeneratedReportedPeptideListData_Result,

        for_SingleProtein,

        searchSubGroup_Ids_Selected,

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
        projectSearchIds,
        searchDataLookupParamsRoot,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager,
        showProteins,
        proteinName_Clicked_Callback_Function
    } : {
        create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

        for_SingleProtein: boolean              //  Used to control what is displayed

        searchSubGroup_Ids_Selected : Set<number>

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds : Array<number>
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        dataPageStateManager : DataPageStateManager
        showProteins : boolean
        proteinName_Clicked_Callback_Function : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    } ) : Promise<GetDataTableDataObjects_MultipleSearch_SingleProtein_Result> {
    try {
        if ( create_GeneratedReportedPeptideListData_Result.peptideList.length === 0 ) {
            //  No data found so return

            return Promise.resolve( new GetDataTableDataObjects_MultipleSearch_SingleProtein_Result() );  // EARLY RETURN
        }

        let internal__get_DataFromServer__For_If_ShowProteins_Result: Internal__get_DataFromServer__For_If_ShowProteins_Result = undefined;
        let internal__get_Best_PSM_Values_Computation_Result: Internal__get_Best_PSM_Values_Computation_Result = undefined

        const promises: Array<Promise<void>> = []

        if ( showProteins ) {
            //  Get Data for when showProteins is true
            const promise = new Promise<void>( (resolve, reject) => { try {
                const getResultPromise = _get_DataFromServer__For_If_ShowProteins({
                    projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                })
                getResultPromise.catch(reason => { reject(reason)})
                getResultPromise.then(value => { try {
                    internal__get_DataFromServer__For_If_ShowProteins_Result = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })
            promises.push(promise)
        }

        {
            const getResult = _compute_Best_PSM_Values({

                create_GeneratedReportedPeptideListData_Result,

                searchSubGroup_Ids_Selected,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
                projectSearchIds,
                searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                dataPageStateManager
            })


            const getResult_data_noDataToDisplay = getResult.data?.noDataToDisplay

            if ( getResult_data_noDataToDisplay ) {

                //  Skip since no data to retrieve

            } else {
                if ( getResult.data ) {
                    internal__get_Best_PSM_Values_Computation_Result = getResult.data
                } else if ( getResult.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {

                        getResult.promise.catch(reason => { reject(reason)})
                        getResult.promise.then(value => { try {
                            internal__get_Best_PSM_Values_Computation_Result = value
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })
                    promises.push(promise)
                } else {
                    throw Error("getResult neither data nor promise populated")
                }
            }
        }

        if ( promises.length === 0 ) {

            const returnValue = _create_AfterDataLoaded({
                create_GeneratedReportedPeptideListData_Result,

                for_SingleProtein,

                searchSubGroup_Ids_Selected,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
                projectSearchIds,
                searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                dataPageStateManager,
                showProteins,
                proteinName_Clicked_Callback_Function,

                internal__get_DataFromServer__For_If_ShowProteins_Result,
                internal__get_Best_PSM_Values_Computation_Result
            })

            return Promise.resolve( returnValue )
        }

        const promisesAll = Promise.all(promises)

        return new Promise<GetDataTableDataObjects_MultipleSearch_SingleProtein_Result>((resolve, reject) => { try {

            promisesAll.catch(reason => { reject(reason)})
            promisesAll.then(novalue => { try {
                const returnValue = _create_AfterDataLoaded({
                    create_GeneratedReportedPeptideListData_Result,

                    for_SingleProtein,

                    searchSubGroup_Ids_Selected,

                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
                    projectSearchIds,
                    searchDataLookupParamsRoot,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    dataPageStateManager,
                    showProteins,
                    proteinName_Clicked_Callback_Function,

                    internal__get_DataFromServer__For_If_ShowProteins_Result,
                    internal__get_Best_PSM_Values_Computation_Result
                })

                resolve( returnValue )

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } })

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}


const _create_AfterDataLoaded = function (
    {
        create_GeneratedReportedPeptideListData_Result,

        for_SingleProtein,

        searchSubGroup_Ids_Selected,

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
        projectSearchIds,
        searchDataLookupParamsRoot,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager,
        showProteins,
        proteinName_Clicked_Callback_Function,

        internal__get_DataFromServer__For_If_ShowProteins_Result,
        internal__get_Best_PSM_Values_Computation_Result
    } : {
        create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

        for_SingleProtein: boolean              //  Used to control what is displayed

        searchSubGroup_Ids_Selected : Set<number>

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds : Array<number>
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        dataPageStateManager : DataPageStateManager
        showProteins : boolean
        proteinName_Clicked_Callback_Function : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

        internal__get_DataFromServer__For_If_ShowProteins_Result: Internal__get_DataFromServer__For_If_ShowProteins_Result
        internal__get_Best_PSM_Values_Computation_Result: Internal__get_Best_PSM_Values_Computation_Result
    }
) : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result {
    try {
        const peptideList = create_GeneratedReportedPeptideListData_Result.peptideList

        const show_Protein_Pre_Post_Residues = _compute_show_Protein_Pre_Post_Residues({ peptideList });

        const searchData_SearchName_Etc_Root = dataPageStateManager.get_searchData_SearchName_Etc_Root();

        //  PSM counts by search in each PSM Count Column

        /////////////

        //  Create Table Columns (Header info and Data Info)

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {  // Generated Peptide sequence, including variable mods, etc

            const displayName = "Peptide Sequence";

            const dataTable_Column = new DataTable_Column({
                id : "Peptide_Sequence", // Used for tracking sort order. Keep short
                displayName,
                width : 500,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {
            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {
                return proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___uniqueColumnHeader_Tooltip_Create();
            }

            const displayName = "Unique";

            const dataTable_Column = new DataTable_Column({
                id : "unique", // Used for tracking sort order. Keep short
                displayName,
                width : 55,
                sortable : true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        if ( show_Protein_Pre_Post_Residues ) {

            //  Protein Pre and Post Residues

            {
                const displayName = "Pre";

                const dataTableColumn = new DataTable_Column({
                    id : "pre-residue", // Used for tracking sort order. Keep short
                    displayName,
                    width : 40,
                    sortable : true,
                    columnHeader_Tooltip_HTML_TitleAttribute: 'Residue immediately to the n-terminus of this peptide in the protein(s) sequence.'
                });
                dataTable_Columns.push( dataTableColumn );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

            {
                const displayName = "Post";

                const dataTableColumn = new DataTable_Column({
                    id : "post-residue", // Used for tracking sort order. Keep short
                    displayName,
                    width : 40,
                    sortable : true,
                    columnHeader_Tooltip_HTML_TitleAttribute: 'Residue immediately to the c-terminus of this peptide in the protein(s) sequence.'

                });
                dataTable_Columns.push( dataTableColumn );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        if ( showProteins ) {

            const displayName = "Protein(s)";

            const dataTable_Column = new DataTable_Column({
                id : "Proteins", // Used for tracking sort order. Keep short
                displayName,
                width : 220,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        //  PSM Count(s)

        if ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) {

            const projectSearchId = projectSearchIds[ 0 ];

            const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
            if ( ! searchSubGroups_Root ) {
                const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
                console.warn( msg );
                throw Error( msg );
            }
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

                if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  Skip since not selected for display
                    continue;  // EARLY CONTINUE
                }

                const displayName = get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Text_DataTable_Component({ searchSubGroup });

                const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                    return get_proteinPage_Display__SingleProtein_SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component({ searchSubGroup });
                }

                const dataTable_Column = new DataTable_Column({
                    id: "psmCount_" + searchSubGroup.searchSubGroup_Id, // Used for tracking sort order. Keep short
                    displayName,
                    columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
                    width: 70,
                    sortable: true
                });
                dataTable_Columns.push(dataTable_Column);

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }

        } else {

            //  PSM counts for each search
            for ( const projectSearchId of projectSearchIds ) {

                //  searchNames // Object with property name is projectSearchId as number

                const searchNameObj = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchNameObj ) {
                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): No value in searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                let displayName : string = undefined;

                if ( projectSearchIds.length > 1 ) {
                    const searchLabel__SearchShortName_OR_SearchId = searchNameObj.searchLabel__SearchShortName_OR_SearchId;
                    displayName = "PSM Count (" + searchLabel__SearchShortName_OR_SearchId + ")";
                } else {
                    // Special value when only 1 search for Single Search
                    displayName = "PSM Count";
                }

                const dataTable_Column = new DataTable_Column({
                    id : "psmCount_" + projectSearchId, // Used for tracking sort order. Keep short
                    displayName,
                    width : 70,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
        }

        ///////////////////////////////

        //   Best PSM Values

        if ( internal__get_Best_PSM_Values_Computation_Result && ( ! internal__get_Best_PSM_Values_Computation_Result.noDataToDisplay ) ) {

            if ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) {

                //  Single Search with Sub Groups - List Per Search Sub Group

                const projectSearchId = projectSearchIds[ 0 ];

                const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
                if ( ! searchSubGroups_Root ) {
                    const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
                    console.warn( msg );
                    throw Error( msg );
                }
                const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

                    if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                        //  Skip since not selected for display
                        continue;  // EARLY CONTINUE
                    }

                    let bestPsm_FilterableAnnotationTypeIdsArray: Array<number> = undefined;

                    {
                        for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                            if ( searchDataLookupParams_For_ProjectSearchId.projectSearchId === projectSearchId ) {
                                if ( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay && searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay.length > 0 ) {
                                    bestPsm_FilterableAnnotationTypeIdsArray = searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay
                                }
                                break
                            }
                        }
                    }

                    if ( ! bestPsm_FilterableAnnotationTypeIdsArray ) {
                        //  No ann type ids so skip project search id
                        continue  // EARLY CONTINUE
                    }

                    const annotationTypeItems_ForProjectSearchId =
                        dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId)
                    if ( ! annotationTypeItems_ForProjectSearchId ) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                        const annotationTypeItem = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId )
                        if ( ! annotationTypeItem ) {
                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        let sort_Null_BeforeValues_AfterValues_Enum: DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum = undefined

                        if ( annotationTypeItem.filterDirectionBelow ) {

                            sort_Null_BeforeValues_AfterValues_Enum = DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_AFTER_LARGEST_VALUE

                        } else if ( annotationTypeItem.filterDirectionAbove ) {

                            sort_Null_BeforeValues_AfterValues_Enum = DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_BEFORE_SMALLEST_VALUE

                        } else {
                            throw Error("NEITHER OF annotationTypeItem.filterDirectionBelow annotationTypeItem.filterDirectionAbove")
                        }

                        const displayName_Start = annotationName_Prefix_BestOfPsmValues_TextLabel + annotationTypeItem.name;

                        const displayName = displayName_Start + " (" + searchSubGroup.subgroupName_Display + ")";

                        const dataTable_Column = new DataTable_Column({
                            id: "bestPsmAnn_" + annotationTypeItem.annotationTypeId + "_" + searchSubGroup.searchSubGroup_Id, // Used for tracking sort order. Keep short
                            displayName,
                            width: 100,
                            sortable: true,
                            sort_Null_BeforeValues_AfterValues_Enum
                        });
                        dataTable_Columns.push(dataTable_Column);

                        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
                    }
                }
            } else {

                //  Single Search with NO Sub Groups OR Multiple Searches - List Per Search

                for ( const projectSearchId of projectSearchIds ) {

                    let bestPsm_FilterableAnnotationTypeIdsArray: Array<number> = undefined;

                    {
                        for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                            if ( searchDataLookupParams_For_ProjectSearchId.projectSearchId === projectSearchId ) {
                                if ( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay && searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay.length > 0 ) {
                                    bestPsm_FilterableAnnotationTypeIdsArray = searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay
                                }
                                break
                            }
                        }
                    }

                    if ( ! bestPsm_FilterableAnnotationTypeIdsArray ) {
                        //  No ann type ids so skip project search id
                        continue  // EARLY CONTINUE
                    }

                    //  searchNames // Object with property name is projectSearchId as number

                    const searchNameObj = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
                    if ( ! searchNameObj ) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): No value in searchData_SearchName_Etc_Root for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    const annotationTypeItems_ForProjectSearchId =
                        dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId)
                    if ( ! annotationTypeItems_ForProjectSearchId ) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                        const annotationTypeItem = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId )
                        if ( ! annotationTypeItem ) {
                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        let sort_Null_BeforeValues_AfterValues_Enum: DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum = undefined

                        if ( annotationTypeItem.filterDirectionBelow ) {

                            sort_Null_BeforeValues_AfterValues_Enum = DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_AFTER_LARGEST_VALUE

                        } else if ( annotationTypeItem.filterDirectionAbove ) {

                            sort_Null_BeforeValues_AfterValues_Enum = DataTable_Column_Sort_Null_BeforeSmallestValue_AfterLargestValue_Enum.SORT_NULL_BEFORE_SMALLEST_VALUE

                        } else {
                            throw Error("NEITHER OF annotationTypeItem.filterDirectionBelow annotationTypeItem.filterDirectionAbove")
                        }

                        const displayName_Start = annotationName_Prefix_BestOfPsmValues_TextLabel + annotationTypeItem.name;

                        let displayName: string = undefined;

                        if ( projectSearchIds.length > 1 ) {
                            const searchLabel__SearchShortName_OR_SearchId = searchNameObj.searchLabel__SearchShortName_OR_SearchId;
                            displayName = displayName_Start + " (" + searchLabel__SearchShortName_OR_SearchId + ")";
                        } else {
                            // Special value when only 1 search for Single Search
                            displayName = displayName_Start;
                        }

                        const dataTable_Column = new DataTable_Column( {
                            id: "bestPsmAnn_" + annotationTypeItem.annotationTypeId + "_" + projectSearchId, // Used for tracking sort order. Keep short
                            displayName,
                            width: 100,
                            sortable: true,
                            sort_Null_BeforeValues_AfterValues_Enum
                        } );
                        dataTable_Columns.push( dataTable_Column );

                        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable( { cell_ColumnHeader_String: displayName } );
                        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
                    }
                }
            }
        }


        //  Create Table Body

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

        {
            let peptideListCounter = 0;

            for ( const peptideEntry of peptideList ) {

                peptideListCounter++;

                const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];
                const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                {
                    const valueDisplay = peptideEntry.peptideSequenceDisplay;
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: peptideEntry.peptideSequenceDisplay
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                { // Unique
                    let valueDisplay = "";
                    let valueSort = 1;
                    if (peptideEntry.peptideUnique) {
                        valueDisplay = "*";  //  Display '*' if peptide unique
                        valueSort = 0;  // Sort unique above not unique
                    }
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: valueSort
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                if ( show_Protein_Pre_Post_Residues ) {

                    // add the Protein pre residue
                    {
                        let valueDisplay : string = undefined;
                        {
                            const residues = Array.from( peptideEntry.protein_Pre_Residues ).sort();
                            if ( peptideEntry.protein_Pre_Residue_N_Term ) {
                                residues.unshift("n");
                            }
                            valueDisplay = residues.join(",");
                        }
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort : valueDisplay
                        });
                        dataTable_DataRow_ColumnEntries.push( columnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    // add the post residue
                    {
                        let valueDisplay : string = undefined;
                        {
                            const residues = Array.from( peptideEntry.protein_Post_Residues ).sort();
                            if ( peptideEntry.protein_Post_Residue_C_Term ) {
                                residues.push("c");
                            }
                            valueDisplay = residues.join(",");
                        }
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort : valueDisplay
                        });
                        dataTable_DataRow_ColumnEntries.push( columnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }

                if (showProteins) { // Protein(s)

                    //   proteinNames_Data : Map< { Protein Name String }, Set< { Protein sequence version id > >

                    const proteinNames_Data: Map<string,Set<number>> = new Map();

                    const proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = new Map();

                    for (const projectSearchId of projectSearchIds) {

                        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                        if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                            continue; // EARLY CONTINUE
                        }

                        if ( ! internal__get_DataFromServer__For_If_ShowProteins_Result ) {
                            const msg = "showProteins is true and internal__get_DataFromServer__For_If_ShowProteins_Result is not populated";
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder =
                            internal__get_DataFromServer__For_If_ShowProteins_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)

                        if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
                            const msg = "showProteins is true and internal__get_DataFromServer__For_If_ShowProteins_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId) returned nothing for projectSearchId: " + projectSearchId;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const proteinInfo_For_MainFilters_Holder =
                            internal__get_DataFromServer__For_If_ShowProteins_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)

                        if ( ! proteinInfo_For_MainFilters_Holder ) {
                            const msg = "showProteins is true and internal__get_DataFromServer__For_If_ShowProteins_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId) returned nothing for projectSearchId: " + projectSearchId;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                            const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                            const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId

                            const proteinSequenceVersionIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
                            if (!proteinSequenceVersionIds) {

                                continue; // EARLY CONTINUE
                            }

                            for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                                const proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId(proteinSequenceVersionId);
                                if (!proteinInfo) {
                                    const msg = "No value from proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                const annotations = proteinInfo.annotations;
                                if (annotations) {

                                    let proteinNamesAndDescriptionsArray: Array<{ name: string, description: string }> = proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
                                    if ( ! proteinNamesAndDescriptionsArray ) {
                                        proteinNamesAndDescriptionsArray = [];
                                        proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.set( proteinSequenceVersionId, proteinNamesAndDescriptionsArray );
                                    }

                                    for (const annotation of annotations) {

                                        const annotation_name = annotation.name;
                                        const annotation_description = annotation.description;

                                        //   proteinNames_Data : Map< { Protein Name String }, Set< { Protein sequence version id > >

                                        let proteinSequenceVersionIds_FOR_annotation_name = proteinNames_Data.get( annotation_name );
                                        if ( !proteinSequenceVersionIds_FOR_annotation_name ) {
                                            proteinSequenceVersionIds_FOR_annotation_name = new Set<number>();
                                            proteinNames_Data.set( annotation_name, proteinSequenceVersionIds_FOR_annotation_name );
                                        }

                                        proteinSequenceVersionIds_FOR_annotation_name.add(proteinSequenceVersionId);


                                        { // For Tooltip, matches Tooltip template
                                            const proteinNamesAndDescriptionsNewEntry = {
                                                name: annotation_name,
                                                description: annotation_description
                                            };
                                            //  Only add to proteinNamesAndDescriptionsArray if combination of name and description is not already in array
                                            let nameDescriptionComboFoundInArray = false;
                                            for (const entry of proteinNamesAndDescriptionsArray) {
                                                if (entry.name === proteinNamesAndDescriptionsNewEntry.name && entry.description === proteinNamesAndDescriptionsNewEntry.description) {
                                                    nameDescriptionComboFoundInArray = true;
                                                    break;
                                                }
                                            }
                                            if (!nameDescriptionComboFoundInArray) {
                                                proteinNamesAndDescriptionsArray.push(proteinNamesAndDescriptionsNewEntry);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    const proteinNames_Array : Array<{ proteinName: string,proteinSequenceVersionIds : Array<number> }> = [];

                    for ( const entry of proteinNames_Data.entries() ) {
                        const proteinName = entry[ 0 ];
                        const proteinSequenceVersionIds_Set = entry[ 1 ];
                        const proteinSequenceVersionIds = Array.from( proteinSequenceVersionIds_Set );
                        proteinSequenceVersionIds.sort( (a,b) => {
                            if ( a < b ){
                                return -1;
                            }
                            if ( a > b ){
                                return 1;
                            }
                            return 0;
                        })

                        const proteinNameEntry = {
                            proteinName, proteinSequenceVersionIds
                        }
                        proteinNames_Array.push( proteinNameEntry )
                    }

                    proteinNames_Array.sort((a,b) => {
                        if ( a.proteinName < b.proteinName ){
                            return -1;
                        }
                        if ( a.proteinName > b.proteinName ){
                            return 1;
                        }
                        return 0;
                    });

                    const proteinNames_Sort_Search_DownloadStringArray: Array<string> = [];
                    for ( const proteinNames_Entry of proteinNames_Array ) {
                        proteinNames_Sort_Search_DownloadStringArray.push( proteinNames_Entry.proteinName );
                    }
                    const proteinNames_Sort_DownloadString = proteinNames_Sort_Search_DownloadStringArray.join(", ");

                    const proteinName_Clicked_Callback : ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function =
                        (params: ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params ) : void => {

                            proteinName_Clicked_Callback_Function({
                                proteinSequenceVersionId: params.proteinSequenceVersionId,
                                ctrlKey_From_ClickEvent: params.ctrlKey_From_ClickEvent,
                                metaKey_From_ClickEvent: params.metaKey_From_ClickEvent
                            });
                        }

                    const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                        ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                            return proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content({
                                proteinNames_Array, proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId, proteinName_Clicked_Callback
                            });
                        };

                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn: proteinNames_Sort_Search_DownloadStringArray });
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                        valueSort: proteinNames_Sort_DownloadString
                    })
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: proteinNames_Sort_DownloadString });
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                //  PSM Count(s)

                if (projectSearchIds.length === 1 && searchSubGroup_Ids_Selected) {

                    const projectSearchId = projectSearchIds[0];

                    const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
                    if (!searchSubGroups_Root) {
                        const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                    const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId(projectSearchId);
                    if (!searchSubGroups_ForProjectSearchId) {
                        const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if (!peptideEntry.psmCountsMap_Key_SubSearchGroup_Id) {
                        const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and ( ! peptideEntry.psmCountsMap_Key_SubSearchGroup_Id ). projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    let psmCount_Total_Across_SearchSubGroups = 0;

                    for (const searchSubGroup_Id_Selected of searchSubGroup_Ids_Selected) {

                        let psmCount = peptideEntry.psmCountsMap_Key_SubSearchGroup_Id.get(searchSubGroup_Id_Selected);
                        if (psmCount === undefined) {
                            psmCount = 0;
                        }

                        psmCount_Total_Across_SearchSubGroups += psmCount;

                        const psmCountDisplay = psmCount.toLocaleString();

                        const valueDisplay = psmCountDisplay;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: psmCount
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    if ( psmCount_Total_Across_SearchSubGroups === 0 ) {
                        const msg = (
                            "( psmCount_Total_Across_SearchSubGroups === 0 ): peptideEntry.peptideSequenceDisplay: "
                            + peptideEntry.peptideSequenceDisplay
                            + ", projectSearchId: " + projectSearchId
                        );
                        console.warn(msg);
                        throw new Error(msg);
                    }

                } else {

                    let psmCount_Total_Across_Searches = 0;

                    for (const projectSearchId of projectSearchIds) {

                        let psmCount = peptideEntry.psmCountsMap_KeyProjectSearchId.get(projectSearchId);

                        if ( psmCount === undefined || psmCount === null ) {

                            // Compute psmCount from peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId

                            psmCount = 0;   //  initialize to zero before adding to it

                            const reportedPeptideIds: Array<number> = [];

                            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                            if (dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                                for (const dataPerReportedPeptideId_MapEntry_Value of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values()) {
                                    reportedPeptideIds.push(dataPerReportedPeptideId_MapEntry_Value.reportedPeptideId)
                                    const psmIdsSet = dataPerReportedPeptideId_MapEntry_Value.psmIdsSet;
                                    if (psmIdsSet) {
                                        psmCount += psmIdsSet.size;  // add to psmCount
                                    } else {
                                        const msg = (
                                            "No Value in dataPerReportedPeptideId_MapEntry_Value.psmIdsSet: reportedPeptideId: "
                                            + dataPerReportedPeptideId_MapEntry_Value.reportedPeptideId
                                            + ", projectSearchId: " + projectSearchId
                                        );
                                        console.warn(msg);
                                        throw new Error(msg);
                                    }
                                }
                            }
                        }

                        psmCount_Total_Across_Searches += psmCount;

                        const psmCountDisplay = psmCount.toLocaleString();

                        const valueDisplay = psmCountDisplay;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort: psmCount
                        });
                        dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }


                    if ( psmCount_Total_Across_Searches === 0 ) {
                        const msg = (
                            "( psmCount_Total_Across_Searches === 0 ): peptideEntry.peptideSequenceDisplay: "
                            + peptideEntry.peptideSequenceDisplay
                            + ", projectSearchIds: " + projectSearchIds.join(",")
                        );
                        console.warn(msg);
                        throw new Error(msg);
                    }
                }

                ///////////////////////////////

                //   Best PSM Values

                if ( internal__get_Best_PSM_Values_Computation_Result && ( ! internal__get_Best_PSM_Values_Computation_Result.noDataToDisplay ) ) {

                    if (projectSearchIds.length === 1 && searchSubGroup_Ids_Selected) {

                        //  Single Search with Sub Groups - List Per Search Sub Group

                        const projectSearchId = projectSearchIds[ 0 ];

                        let bestPsm_FilterableAnnotationTypeIdsArray: Array<number> = undefined;

                        {
                            for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                                if ( searchDataLookupParams_For_ProjectSearchId.projectSearchId === projectSearchId ) {
                                    if ( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay && searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay.length > 0 ) {
                                        bestPsm_FilterableAnnotationTypeIdsArray = searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay
                                    }
                                    break
                                }
                            }
                        }

                        if ( bestPsm_FilterableAnnotationTypeIdsArray ) {

                            //  YES ann type ids so process project search id

                            if ( ! internal__get_Best_PSM_Values_Computation_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): Processing Single Search Sub Groups but searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder NOT populated for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            const annotationTypeItems_ForProjectSearchId =
                                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId)
                            if ( ! annotationTypeItems_ForProjectSearchId ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            const psmFilterableAnnotationData__Holder = internal__get_Best_PSM_Values_Computation_Result.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.get( projectSearchId)
                            if ( ! psmFilterableAnnotationData__Holder ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): internal__get_Best_PSM_Values_Computation_Result.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.get( projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

                            if ( internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
                            }

                            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
                            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
                            if ( ! searchSubGroups_Root ) {
                                const msg = "( ! searchSubGroups_Root ) and ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected )";
                                console.warn( msg );
                                throw Error( msg );
                            }
                            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
                            if ( ! searchSubGroups_ForProjectSearchId ) {
                                const msg = "( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) and searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            for ( const searchSubGroup_Id_Selected of searchSubGroup_Ids_Selected ) {

                                const psmIds_For_PeptideEntry_For_SearchSubGroup: Set<number> = new Set()

                                {
                                    const psmIds_For_PeptideEntry: Set<number> = new Set()

                                    for ( const dataForReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                                        if ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                                            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId;
                                                console.warn( msg );
                                                throw Error( msg );
                                            }

                                            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataForReportedPeptideId.reportedPeptideId )
                                            if ( ! psmTblData_For_ReportedPeptideId ) {
                                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataForReportedPeptideId.reportedPeptideId ) returned NOTHING fo dataForReportedPeptideId.reportedPeptideId: " + dataForReportedPeptideId.reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                                console.warn( msg );
                                                throw Error( msg );
                                            }

                                            for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                                                psmIds_For_PeptideEntry.add( psmTblData.psmId )
                                            }
                                        } else {
                                            for ( const psmId of dataForReportedPeptideId.psmIdsSet ) {
                                                psmIds_For_PeptideEntry.add( psmId )
                                            }
                                        }
                                    }

                                    //  Filter to just current Search Sub Group

                                    for ( const psmId of psmIds_For_PeptideEntry ) {

                                        const subGroupId_For_PsmId = internal__get_Best_PSM_Values_Computation_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId )
                                        if ( ! subGroupId_For_PsmId ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): internal__get_Best_PSM_Values_Computation_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId( psmId ) returned NOTHING fo psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        if ( searchSubGroup_Id_Selected === subGroupId_For_PsmId ) {
                                            psmIds_For_PeptideEntry_For_SearchSubGroup.add( psmId )
                                        }
                                    }

                                    if ( psmIds_For_PeptideEntry_For_SearchSubGroup.size === 0 ) {

                                        //  NO PSMs for searchSubGroup_Id_Selected so print "N/A"

                                        //  Create "N/A" cells for selected Best PSM Annotation display

                                        for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                            const cellValue = "N/A"

                                            const valueDisplay = cellValue.toString();
                                            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                                            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                                            const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                                                searchTableData,
                                                valueDisplay,
                                                valueSort: null
                                            });
                                            dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                                            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                                            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                                        }

                                        continue  // EARLY CONTINUE
                                    }
                                }

                                const bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType: Map<number, number> = new Map()

                                for ( const psmId of psmIds_For_PeptideEntry_For_SearchSubGroup ) {

                                    const psmFilterableAnnotationData__Holder_For_PsmId = psmFilterableAnnotationData__Holder.get_Per_Psm_Holder_For_PsmId( psmId )
                                    if ( ! psmFilterableAnnotationData__Holder_For_PsmId ) {
                                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): psmFilterableAnnotationData__Holder.get_Per_Psm_Holder_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                        console.warn( msg );
                                        throw Error( msg );
                                    }

                                    for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                        const psmFilterableAnnotationData_For_AnnotationTypeId = psmFilterableAnnotationData__Holder_For_PsmId.get_PsmFilterableAnnotationData_For_AnnotationTypeId( bestPsm_FilterableAnnotationTypeId )
                                        if ( ! psmFilterableAnnotationData_For_AnnotationTypeId ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): psmFilterableAnnotationData__Holder_For_PsmId.get_PsmFilterableAnnotationData_For_AnnotationTypeId( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        const newValue_annotationValueNumber = psmFilterableAnnotationData_For_AnnotationTypeId.annotationValueNumber

                                        if ( ! bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.has( bestPsm_FilterableAnnotationTypeId ) ) {
                                            bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.set( bestPsm_FilterableAnnotationTypeId, newValue_annotationValueNumber )
                                        } else {
                                            const bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId = bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId )
                                            if ( bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId === undefined ) {
                                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId ) returned undefined for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                                console.warn( msg );
                                                throw Error( msg );
                                            }

                                            const annotationTypeItem = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId )
                                            if ( ! annotationTypeItem ) {
                                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                                console.warn( msg );
                                                throw Error( msg );
                                            }

                                            let newValue_BetterThan_OldValue = false
                                            {
                                                // From XSD: The direction a filterable annotation type is sorted in.  If set to "below", attributes with lower values are considered more significant (such as in the case of p-values). If set to "above", attributes with higher values are considered more significant (such as in the case of XCorr).</xs:documentation>

                                                if ( annotationTypeItem.filterDirectionAbove ) {
                                                    if ( newValue_annotationValueNumber > bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId ) {
                                                        newValue_BetterThan_OldValue = true
                                                    }
                                                } else if ( annotationTypeItem.filterDirectionBelow ) {
                                                    if ( newValue_annotationValueNumber < bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId ) {
                                                        newValue_BetterThan_OldValue = true
                                                    }
                                                } else {
                                                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): NOT ( annotationTypeItem.filterDirectionAbove ) OR ( annotationTypeItem.filterDirectionBelow ) for  bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                                    console.warn( msg );
                                                    throw Error( msg );
                                                }
                                            }
                                            if ( newValue_BetterThan_OldValue ) {
                                                bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.set( bestPsm_FilterableAnnotationTypeId, newValue_annotationValueNumber )
                                            }
                                        }
                                    }
                                }

                                for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                    const bestPsm_FilterableValue_ForAllPSMs_ForPeptide = bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId )
                                    if ( bestPsm_FilterableValue_ForAllPSMs_ForPeptide === undefined ) {
                                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                        console.warn( msg );
                                        throw Error( msg );
                                    }

                                    const cellValue = bestPsm_FilterableValue_ForAllPSMs_ForPeptide

                                    const valueDisplay = limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( cellValue )
                                    const valueDisplay_Download = cellValue.toString();

                                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                                        searchTableData,
                                        valueDisplay,
                                        valueSort: cellValue
                                    });
                                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay_Download })
                                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                                }
                            }
                        }
                    } else {

                        //  Single Search with NO Sub Groups OR Multiple Searches - List Per Search

                        for (const projectSearchId of projectSearchIds) {

                            let bestPsm_FilterableAnnotationTypeIdsArray: Array<number> = undefined;

                            {
                                for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                                    if ( searchDataLookupParams_For_ProjectSearchId.projectSearchId === projectSearchId ) {
                                        if ( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay && searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay.length > 0 ) {
                                            bestPsm_FilterableAnnotationTypeIdsArray = searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay
                                        }
                                        break
                                    }
                                }
                            }

                            if ( ! bestPsm_FilterableAnnotationTypeIdsArray ) {
                                //  No ann type ids so skip project search id
                                continue  // EARLY CONTINUE
                            }

                            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
                            if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                                //  No Reported Peptides and their PSM Ids so skip project search id

                                //  Create "N/A" cells for selected Best PSM Annotation display

                                for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                    const cellValue = "N/A"

                                    const valueDisplay = cellValue.toString();
                                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                                        searchTableData,
                                        valueDisplay,
                                        valueSort: null
                                    });
                                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                                }

                                continue  // EARLY CONTINUE
                            }

                            const annotationTypeItems_ForProjectSearchId =
                                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId)
                            if ( ! annotationTypeItems_ForProjectSearchId ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            const psmFilterableAnnotationData__Holder = internal__get_Best_PSM_Values_Computation_Result.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.get( projectSearchId)
                            if ( ! psmFilterableAnnotationData__Holder ) {
                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): internal__get_Best_PSM_Values_Computation_Result.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.get( projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                                console.warn( msg );
                                throw Error( msg );
                            }

                            let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

                            if ( internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId ) {
                                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
                            }

                            const psmIds_For_PeptideEntry: Set<number> = new Set()

                            {
                                for ( const dataForReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                                    if ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                                        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND internal__get_Best_PSM_Values_Computation_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataForReportedPeptideId.reportedPeptideId )
                                        if ( ! psmTblData_For_ReportedPeptideId ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): ( dataForReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) AND psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataForReportedPeptideId.reportedPeptideId ) returned NOTHING fo dataForReportedPeptideId.reportedPeptideId: " + dataForReportedPeptideId.reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        for ( const psmTblData of psmTblData_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                                            psmIds_For_PeptideEntry.add( psmTblData.psmId )
                                        }
                                    } else {
                                        for ( const psmId of dataForReportedPeptideId.psmIdsSet ) {
                                            psmIds_For_PeptideEntry.add( psmId )
                                        }
                                    }
                                }
                            }

                            const bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType: Map<number, number> = new Map()

                            for ( const psmId of psmIds_For_PeptideEntry ) {

                                const psmFilterableAnnotationData__Holder_For_PsmId = psmFilterableAnnotationData__Holder.get_Per_Psm_Holder_For_PsmId( psmId )
                                if ( ! psmFilterableAnnotationData__Holder_For_PsmId ) {
                                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): psmFilterableAnnotationData__Holder.get_Per_Psm_Holder_For_PsmId( psmId ) returned NOTHING for psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                    console.warn( msg );
                                    throw Error( msg );
                                }

                                for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                    const psmFilterableAnnotationData_For_AnnotationTypeId = psmFilterableAnnotationData__Holder_For_PsmId.get_PsmFilterableAnnotationData_For_AnnotationTypeId( bestPsm_FilterableAnnotationTypeId )
                                    if ( ! psmFilterableAnnotationData_For_AnnotationTypeId ) {
                                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): psmFilterableAnnotationData__Holder_For_PsmId.get_PsmFilterableAnnotationData_For_AnnotationTypeId( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                        console.warn( msg );
                                        throw Error( msg );
                                    }

                                    const newValue_annotationValueNumber = psmFilterableAnnotationData_For_AnnotationTypeId.annotationValueNumber

                                    if ( ! bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.has( bestPsm_FilterableAnnotationTypeId ) ) {
                                        bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.set( bestPsm_FilterableAnnotationTypeId, newValue_annotationValueNumber )
                                    } else {
                                        const bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId = bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId )
                                        if ( bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId === undefined ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId ) returned undefined for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        const annotationTypeItem = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId )
                                        if ( ! annotationTypeItem ) {
                                            const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                            console.warn( msg );
                                            throw Error( msg );
                                        }

                                        let newValue_BetterThan_OldValue = false
                                        {
                                            // From XSD: The direction a filterable annotation type is sorted in.  If set to "below", attributes with lower values are considered more significant (such as in the case of p-values). If set to "above", attributes with higher values are considered more significant (such as in the case of XCorr).</xs:documentation>

                                            if ( annotationTypeItem.filterDirectionAbove ) {
                                                if ( newValue_annotationValueNumber > bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId ) {
                                                    newValue_BetterThan_OldValue = true
                                                }
                                            } else if ( annotationTypeItem.filterDirectionBelow ) {
                                                if ( newValue_annotationValueNumber < bestPsm_FilterableValue_Map_CurrentValueForAnnTypeId ) {
                                                    newValue_BetterThan_OldValue = true
                                                }
                                            } else {
                                                const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): NOT ( annotationTypeItem.filterDirectionAbove ) OR ( annotationTypeItem.filterDirectionBelow ) for  bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                                console.warn( msg );
                                                throw Error( msg );
                                            }
                                        }
                                        if ( newValue_BetterThan_OldValue ) {
                                            bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.set( bestPsm_FilterableAnnotationTypeId, newValue_annotationValueNumber )
                                        }
                                    }
                                }
                            }

                            for ( const bestPsm_FilterableAnnotationTypeId of bestPsm_FilterableAnnotationTypeIdsArray ) {

                                const bestPsm_FilterableValue_ForAllPSMs_ForPeptide = bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId )
                                if ( bestPsm_FilterableValue_ForAllPSMs_ForPeptide === undefined ) {
                                    const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein(...): bestPsm_FilterableValue_ForAllPSMs_ForPeptide_Map_Key_AnnotationType.get( bestPsm_FilterableAnnotationTypeId ) returned NOTHING for bestPsm_FilterableAnnotationTypeId: " + bestPsm_FilterableAnnotationTypeId + ", for projectSearchId: " + projectSearchId;
                                    console.warn( msg );
                                    throw Error( msg );
                                }

                                const cellValue = bestPsm_FilterableValue_ForAllPSMs_ForPeptide

                                const valueDisplay = limelight__AnnotationDisplay_CommonFormatting_FilterableAnnotation_NumberFormatting_ForDisplayOnPage( cellValue )
                                const valueDisplay_Download = cellValue.toString();

                                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                                    searchTableData,
                                    valueDisplay,
                                    valueSort: cellValue
                                });
                                dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay_Download })
                                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                            }
                        }
                    }
                }

                //////////

                // Data for Child Tables for this row of this table

                let dataRow_GetChildTableData_Return_DataTable_RootTableObject: DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject = undefined;

                let dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject: DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject = undefined;

                if (projectSearchIds.length > 1) {

                    const createReportedPeptideDisplayData_Result_Entry_ForThisRow: CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = (
                        create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay.get(peptideEntry.peptideSequenceDisplay)
                    );
                    if (!createReportedPeptideDisplayData_Result_Entry_ForThisRow) {
                        throw Error("proteinPage_Display__SingleProteinReportedPeptideListSection_CreateListData.ts: No value for peptideEntry.peptideSequenceDisplay: " + peptideEntry.peptideSequenceDisplay);
                    }

                    const params_createChildTableObjects = (
                        new ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter({

                            createReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry_ForParentRow: createReportedPeptideDisplayData_Result_Entry_ForThisRow,

                            for_SingleProtein,

                            projectSearchIds,
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId: peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId,
                            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                            searchDataLookupParamsRoot,
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                            dataPageStateManager
                        })
                    );

                    dataRow_GetChildTableData_Return_DataTable_RootTableObject = (params_callback: DataTable_DataRowEntry__GetChildTableData_CallbackParams): DataTable_RootTableObject => {

                        const dataTable_RootTableObject: DataTable_RootTableObject = proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects({params: params_createChildTableObjects});

                        return dataTable_RootTableObject;
                    }

                } else {

                    //  Special Value for when only 1 search

                    if (!(projectSearchIds.length > 0)) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: ( ! ( projectSearchIds.length > 0 ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const projectSearchId = projectSearchIds[0];

                    const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId)
                    if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId);
                    if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
                    if (!commonData_LoadedFromServer_PerSearch_For_ProjectSearchId) {
                        const msg = "createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId ); returned no value. projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const reportedPeptidesForSingleSearch_createChildTableObjects_Parameter = (
                        new ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter({
                            for_MultipleSearches_Overall: projectSearchIds.length > 1,
                            for_SingleProtein,
                            searchSubGroup_Ids_Selected,
                            projectSearchId,
                            reportedPeptideIds_ForDisplay: undefined,
                            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                            searchDataLookupParamsRoot: searchDataLookupParamsRoot,
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                            dataPageStateManager: dataPageStateManager
                        })
                    );

                    dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
                        (params: DataTable_DataRowEntry__GetChildTableData_CallbackParams): Promise<DataTable_RootTableObject> => {
                            const result: Promise<DataTable_RootTableObject> =
                                reportedPeptidesForSingleSearch_createChildTableObjects({reportedPeptidesForSingleSearch_createChildTableObjects_Parameter});

                            return result;
                        }
                }

                //////////

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                //  Create 1 of the next 2 entries based on the values set

                let dataTable_DataRowEntry: DataTable_DataRowEntry = undefined;

                if (dataRow_GetChildTableData_Return_DataTable_RootTableObject) {

                    dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId: peptideEntry.peptideSequenceDisplay,
                        sortOrder_OnEquals: peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                        columnEntries: dataTable_DataRow_ColumnEntries,
                        dataTable_DataRowEntry_DownloadTable,

                        dataRow_GetChildTableData_Return_DataTable_RootTableObject,
                    });

                } else if (dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject) {

                    dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId: peptideEntry.peptideSequenceDisplay,
                        sortOrder_OnEquals: peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                        columnEntries: dataTable_DataRow_ColumnEntries,
                        dataTable_DataRowEntry_DownloadTable,

                        dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject,
                    });
                } else {
                    const msg = "Neither variable is set: dataRow_GetChildTableData_Return_DataTable_RootTableObject or dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject ";
                    console.warn(msg)
                    throw Error(msg)
                }

                if ( ! dataTable_DataRowEntry ) {
                    const msg = "dataTable_DataRowEntry is not set, for dataTable_DataRowEntries.push( dataTable_DataRowEntry );";
                    console.warn(msg)
                    throw Error(msg)
                }

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_Columns,
            columns_tableDownload: dataTable_Column_DownloadTable_Entries,
            dataTable_DataRowEntries
        });

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        const getDataTableDataObjects_Result = new GetDataTableDataObjects_MultipleSearch_SingleProtein_Result()

        getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

        return getDataTableDataObjects_Result;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *  Get data from server, Only called when showProteins is true;
 */
const _get_DataFromServer__For_If_ShowProteins = function(
    {
        projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Internal__get_DataFromServer__For_If_ShowProteins_Result> {
    try {
        const get_DataFromServer__For_If_ShowProteins_Result = new Internal__get_DataFromServer__For_If_ShowProteins_Result()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("_get_DataFromServer__For_If_ShowProteins: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId)
            }

            {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

                if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                    get_DataFromServer__For_If_ShowProteins_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                    set( projectSearchId, get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                            get_DataFromServer__For_If_ShowProteins_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                            set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    const msg = "get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no data or promise";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
            {
                const get_ProteinInfoHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch()

                if ( get_ProteinInfoHolder_AllForSearch_Result.data ) {
                    get_DataFromServer__For_If_ShowProteins_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                    set( projectSearchId, get_ProteinInfoHolder_AllForSearch_Result.data.proteinInfo_For_MainFilters_Holder )
                } else if ( get_ProteinInfoHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        get_ProteinInfoHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_ProteinInfoHolder_AllForSearch_Result.promise.then(value => { try {
                            get_DataFromServer__For_If_ShowProteins_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.
                            set( projectSearchId, value.proteinInfo_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    const msg = "get_ProteinInfoHolder_AllForSearch_Result no data or promise";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        if ( promises.length === 0 ) {
            return Promise.resolve( get_DataFromServer__For_If_ShowProteins_Result )
        }

        const promisesAll = Promise.all( promises )

        return new Promise<Internal__get_DataFromServer__For_If_ShowProteins_Result>((resolve, reject) => { try {
            promisesAll.catch(reason => { reject(reason) })
            promisesAll.then(novalue => { try {
                resolve( get_DataFromServer__For_If_ShowProteins_Result );

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

class Internal__get_DataFromServer__For_If_ShowProteins_Result {
    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()
    proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder> = new Map()
    _FAKE_FORCE_USE_Constructor() {}
}

/**
 *
 * @param peptideList
 */
const _compute_show_Protein_Pre_Post_Residues = function (
    {
        peptideList
    } : {
        peptideList: Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry>
    }
) : boolean {

    let show_Protein_Pre_Post_Residues = false

    for ( const peptideEntry of peptideList ) {

        if ( peptideEntry.protein_Pre_Residue_N_Term || peptideEntry.protein_Pre_Residues.size > 0 ) {
            show_Protein_Pre_Post_Residues = true;
            break;
        }
    }

    return show_Protein_Pre_Post_Residues;
}

/////////////////////////////

//    Best PSM Values Computation

class Internal__get_Best_PSM_Values_Computation_Result {

    noDataToDisplay: boolean
    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder>
    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder>
    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
}


const _compute_Best_PSM_Values = function (
    {
        create_GeneratedReportedPeptideListData_Result,

        searchSubGroup_Ids_Selected,

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
        projectSearchIds,
        searchDataLookupParamsRoot,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        dataPageStateManager
    } : {
        create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

        searchSubGroup_Ids_Selected : Set<number>

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds : Array<number>
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        dataPageStateManager : DataPageStateManager
    }
) : {
    data: Internal__get_Best_PSM_Values_Computation_Result
    promise: Promise<Internal__get_Best_PSM_Values_Computation_Result>
} {
    const bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set__Map_Key_ProjectSearchId: Map<number, Set<number>> = new Map()

    {
        //  First get annotation types

        for ( const projectSearchId of projectSearchIds ) {
            for ( const searchDataLookupParams_For_ProjectSearchId of searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
                if ( searchDataLookupParams_For_ProjectSearchId.projectSearchId === projectSearchId ) {
                    if ( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay && searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay.length > 0 ) {
                        const bestPsm_FilterableAnnotationTypeIds_ToRetrieve = new Set( searchDataLookupParams_For_ProjectSearchId.bestPsm_AnnTypeDisplay )
                        bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set__Map_Key_ProjectSearchId.set( projectSearchId, bestPsm_FilterableAnnotationTypeIds_ToRetrieve )
                    }
                    break
                }
            }
        }
    }

    if ( bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set__Map_Key_ProjectSearchId.size === 0 ) {
        //  Return noDataToDisplay: true when no entries in selection

        //  EARLY RETURN
        return { data: {
                noDataToDisplay: true,
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId: undefined,
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: undefined,
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: undefined
            }, promise: undefined }
    }

    const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder> = new Map()
    const psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder> = new Map()

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set = bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set__Map_Key_ProjectSearchId.get( projectSearchId )
        if ( ! bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set ) {
            // No data for projectSearchId so skip
            continue  // EARLY CONTINUE
        }

        {
            //  For projectSearchId, if any peptide does not have PSM IDs, need to load the Psm Ids from server

            let reportedPeptideOnly_Found = false

            for ( const peptideEntry of create_GeneratedReportedPeptideListData_Result.peptideList ) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId )
                if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                    continue // EARLY CONTINUE
                }

                for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {
                    if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {
                        reportedPeptideOnly_Found = true
                        break
                    }
                }
                if ( reportedPeptideOnly_Found ) {
                    break
                }
            }


            if ( reportedPeptideOnly_Found ) {

                //  Load the PSM Ids by loading the PSM Table data

                const commonData_LoadedFromServer_ForSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
                if ( ! commonData_LoadedFromServer_ForSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
                }

                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_ForSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder )
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no data or promise";
                    console.warn(msg);
                    throw Error(msg);
                }
            }
        }

        //  TODO  Need to change this to load from a new Webservice for ONLY the PSM Ids needed

        // const commonData_LoadedFromServer_ForSearch_For_ProjectSearchId =
        //     commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        // if ( ! commonData_LoadedFromServer_ForSearch_For_ProjectSearchId ) {
        //     throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
        // }

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        {
            const get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData().
                get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested: bestPsm_FilterableAnnotationTypeIds_ToRetrieve_Set });

            if ( get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.data ) {
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.data.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder )
            } else if ( get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.then(value => { try {
                        psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder )
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }
    }

    let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = undefined


    {
        if ( projectSearchIds.length === 1 && searchSubGroup_Ids_Selected ) {

            //  Load PsmId to SearchSubGroupId mapping

            const projectSearchId = projectSearchIds[ 0 ];

            const commonData_LoadedFromServer_ForSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if ( ! commonData_LoadedFromServer_ForSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId )
            }

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_ForSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch()

            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = value.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }
    }

    if ( promises.length === 0 ) {

        return { promise: undefined, data: {
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId,
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                noDataToDisplay: false
        } }
    }

    const promisesAll = Promise.all( promises )

    return {
        data: undefined,
        promise: new Promise((resolve, reject) => { try {
            promisesAll.catch(reason => reject(reason))
            promisesAll.then(novalue => { try {
                resolve({
                    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder_Map_Key_ProjectSearchId,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder,
                    noDataToDisplay: false
                })
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}
