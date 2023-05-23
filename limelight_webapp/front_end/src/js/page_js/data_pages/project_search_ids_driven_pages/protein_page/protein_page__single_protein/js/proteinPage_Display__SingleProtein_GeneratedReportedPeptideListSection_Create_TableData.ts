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
    DataTable_Column_DownloadTable,
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
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component,
    get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/jsx/proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_And_Tooltip_DataTable_Component";
import {
    proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content,
    proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___uniqueColumnHeader_Tooltip_Create,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {
    reportedPeptidesForSingleSearch_createChildTableObjects,
    ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_createChildTableObjects";
import {
    proteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects,
    ProteinPage_SingleProtein_searchesForSinglePeptide_createChildTableObjects_Parameter
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/protein_page__single_protein_searches_for_generated_reported_peptide/js/proteinPage_SingleProtein_searchesForGeneratedSinglePeptide_createChildTableObjects";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";


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
export const createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein = async function( {
    
    create_GeneratedReportedPeptideListData_Result,

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
        const getDataTableDataObjects_Result = new GetDataTableDataObjects_MultipleSearch_SingleProtein_Result();

        const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList;

        if ( peptideList.length === 0 ) {
            //  No data found so return
            return getDataTableDataObjects_Result;  // EARLY RETURN
        }

        const show_Protein_Pre_Post_Residues = _compute_show_Protein_Pre_Post_Residues({ peptideList });

        let internal__get_DataFromServer__For_If_ShowProteins_Result: Internal__get_DataFromServer__For_If_ShowProteins_Result = undefined;

        if ( showProteins ) {
            //  Get Data for when showProteins is true
            internal__get_DataFromServer__For_If_ShowProteins_Result = await _get_DataFromServer__For_If_ShowProteins({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });
        }

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

                const displayName = get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Text_DataTable_Component({ searchSubGroup });

                const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {

                    return get_proteinViewPage_DisplayData__SearchSubGroup_PSM_Count_Header_Tooltip_DataTable_Component({ searchSubGroup });
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

        getDataTableDataObjects_Result.dataTable_RootTableObject = dataTable_RootTableObject;

        return getDataTableDataObjects_Result;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *  Get data from server, Only called when showProteins is true;
 */
const _get_DataFromServer__For_If_ShowProteins = async function(
    {
        projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }
) : Promise<Internal__get_DataFromServer__For_If_ShowProteins_Result> {
    try {
        const get_DataFromServer__For_If_ShowProteins_Result = new Internal__get_DataFromServer__For_If_ShowProteins_Result()

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("_get_DataFromServer__For_If_ShowProteins: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId)
            }

            {
                const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise()
                const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                get_DataFromServer__For_If_ShowProteins_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(projectSearchId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder)
            }
            {
                const get_ProteinInfoHolder_AllForSearch_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().get_ProteinInfoHolder_AllForSearch_ReturnPromise();
                const proteinInfo_For_MainFilters_Holder = get_ProteinInfoHolder_AllForSearch_ReturnPromise_Result.proteinInfo_For_MainFilters_Holder
                get_DataFromServer__For_If_ShowProteins_Result.proteinInfo_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(projectSearchId, proteinInfo_For_MainFilters_Holder);
            }
        }

        return get_DataFromServer__For_If_ShowProteins_Result;

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
