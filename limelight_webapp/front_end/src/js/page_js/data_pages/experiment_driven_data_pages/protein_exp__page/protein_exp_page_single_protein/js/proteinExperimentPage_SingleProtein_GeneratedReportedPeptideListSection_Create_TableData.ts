/**
 * proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table from Peptide List
 * 
 * Create Root Table with Generated Peptide String, and PSM Counts per condition in first condition group
 * 
 */

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_Column_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

//  Child Data Searches for Single Peptide show/hide


//  Used when > 1 Condition Group:  ...For_Last_ConditionGroup...



//  Used when only 1 Condition Group:  ...For_Last_ConditionGroup...

//  returns React Component to insert below current data row

import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup,
    CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter,
    GetDataTableDataObjects_All_But_Last_ConditionGroup_Result
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_all_but_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_All_But_Last_ConditionGroup_PerCondition_Rows_CreateListData";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup,
    CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter,
    GetDataTableDataObjects_Result_Last_ConditionGroup
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__entry_for_last_condition_group__per_condition_rows/js/generatedReportedPeptideList_For_Last_ConditionGroup_PerCondition_Rows_CreateListData";
import {
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {
    proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinNames_Column_Content,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function,
    ProteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Components___proteinName_Clicked_Callback_Function_Params
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Components_Other";
import {ProteinNameDescriptionCacheEntry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";


//////////////////

const dataTableId_ThisTable = "Experiment Single Protein Peptide List Root Table";







///////////////////

/**
 * Result from createReportedPeptideDisplayData call
 */
export class GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result {
    dataTable_RootTableObject : DataTable_RootTableObject;
}

/**
 * Create Reported Peptide Data for Display
 * 
 * Reported Peptide List Data Table Root
 */
export const createReportedPeptideDisplayData_DataTableDataObjects_GeneratedReportedPeptideListSection = function( { 
    
    create_GeneratedReportedPeptideListData_Result, 
    
    conditionGroupsContainer,
    conditionGroupsDataContainer,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    proteinSequenceVersionId, 
    projectSearchIds,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    dataPageStateManager,
    showProteins,
    proteinName_Clicked_Callback_Function
} : {
    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,

    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    dataPageStateManager : DataPageStateManager
    showProteins : boolean
    proteinName_Clicked_Callback_Function : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

} ) : GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result {

    const getDataTableDataObjects_Result = new GetDataTableDataObjects_GeneratedReportedPeptideListSection_Result();

    const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList;

    if ( peptideList.length === 0 ) {
        //  No data found so return
        return getDataTableDataObjects_Result;  // EARLY RETURN
    }

    const show_Protein_Pre_Post_Residues = _compute_show_Protein_Pre_Post_Residues({ peptideList });

    const first_conditionGroup = conditionGroupsContainer.conditionGroups[ 0 ];

    const first_conditionGroup_Conditions = first_conditionGroup.conditions;

    /////////////

    //  Create Table Columns (Header info and Data Info)

    const dataTable_Columns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {  // Generated Peptide sequence, including variable mods, etc

        const displayName = "Sequence";

        const dataTable_Column = new DataTable_Column({
            id : "Sequence", // Used for tracking sort order. Keep short
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
            return proteinExperimentPage_Display_SingleProtein_GeneratedReportedPeptideListSection_Components_Other.uniqueColumnHeader_Tooltip_Create();
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
                columnHeader_Tooltip_HTML_TitleAttribute: 'Residue immediately to the n-terminus of this peptide in the protein sequence.'
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
                columnHeader_Tooltip_HTML_TitleAttribute:'Residue immediately to the c-terminus of this peptide in the protein sequence.'

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
            sortable : true,
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    //  PSM counts for each ...
    for ( const condition of first_conditionGroup_Conditions ) {

        const displayName = "PSM Count (" + condition.label + ")";

        const dataTable_Column = new DataTable_Column({
            id : "psmCount_" + condition.id, // Used for tracking sort order. Keep short
            displayName,
            width : 70,
            sortable : true
        });
        dataTable_Columns.push( dataTable_Column );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    //  Create Table Body

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        let peptideListCounter = 0;
        for ( const peptideEntry of peptideList ) {
            
            peptideListCounter++;

            const dataTable_DataRow_ColumnEntries : Array<DataTable_DataRow_ColumnEntry> = [];
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const valueDisplay = peptideEntry.peptideSequenceDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : peptideEntry.peptideSequenceDisplay,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            { // Unique
                let value = "";
                let valueSort = 1;
                if (peptideEntry.peptideUnique) {
                    value = "*";  //  Display '*' if peptide unique
                    valueSort = 0;  // Sort unique above not unique
                }
                const valueDisplay = value;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort: valueSort
                });
                dataTable_DataRow_ColumnEntries.push(columnEntry);

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

                    const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
                    if (!loadedDataPerProjectSearchIdHolder) {

                        continue; // EARLY CONTINUE
                    }

                    const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId();

                    for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                        const dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                        const reportedPeptideId = dataPerReportedPeptideId.reportedPeptideId

                        const proteinSequenceVersionIds = proteinSequenceVersionIdsKeyReportedPeptideId.get(reportedPeptideId);
                        if (!proteinSequenceVersionIds) {

                            continue; // EARLY CONTINUE
                        }

                        for (const proteinSequenceVersionId of proteinSequenceVersionIds) {

                            const proteinInfo = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get(proteinSequenceVersionId);
                            if (!proteinInfo) {
                                const msg = "No value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
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

            //  Data for child tables

            for ( const condition of first_conditionGroup_Conditions ) {

                let psmCountAll = peptideEntry.psmCountsMap_Key_Condition_Id.get( condition.id );
                if ( ! psmCountAll ) {
                    psmCountAll = 0;
                }

                const psmCountDisplay = psmCountAll.toLocaleString();

                const valueDisplay = psmCountDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : psmCountAll,
                    // tooltipText : 
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );

                //  Data for child tables
                // if ( psmCount ) {
                //     projectSearchIds_ThatHavePsmCountsGtZero.push( projectSearchId );
                // }
            }


            const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

            //////////

            // Data for Child Tables for this row of this table

            const createReportedPeptideDisplayData_Result_Entry_ForThisRow : CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry = (
                create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay.get( peptideEntry.peptideSequenceDisplay )
            );
            if ( ! createReportedPeptideDisplayData_Result_Entry_ForThisRow ) {
                throw Error("proteinExperimentPage_SingleProtein_ReportedPeptideListSection_CreateListData.ts: No value for peptideEntry.peptideSequenceDisplay: " + peptideEntry.peptideSequenceDisplay );
            }

            if ( conditionGroupsContainer.conditionGroups.length > 1 ) {

                //  > 1 Condition Group:  Children table uses createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter

                const conditionIds_ParentPath : Array<number> = (
                    [] // Empty since top level
                );

                const reportedPeptideIdsMap_KeyProjectSearchId : Map<number, Set<number>> = new Map();

                for ( const per_ProjectSearchId_MapEntry of peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.entries() ) {
                    const projectSearchId = per_ProjectSearchId_MapEntry[ 0 ];
                    const per_ProjectSearchId_MapValue = per_ProjectSearchId_MapEntry[ 1 ];
                    const reportedPeptideIds = new Set( per_ProjectSearchId_MapValue.keys() );

                    reportedPeptideIdsMap_KeyProjectSearchId.set( projectSearchId, reportedPeptideIds )
                }

                const createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter = (
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForThisRow,
                        conditionIds_ParentPath,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIdsMap_KeyProjectSearchId,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                        const getDataTableDataObjects_All_But_Last_ConditionGroup_Result : GetDataTableDataObjects_All_But_Last_ConditionGroup_Result =
                            createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup({ createReportedPeptideDisplayData_DataTableDataObjects_All_But_Last_ConditionGroup_Parameter });

                        return  getDataTableDataObjects_All_But_Last_ConditionGroup_Result.dataTable_RootTableObject;
                    }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals : peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );

            } else {

                //  Only 1 Condition Group:  Children table uses createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter

                const conditionIds_ParentPath : Array<number> = (
                    [] // Empty since top level
                );

                const reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId : Map<number, Set<number>> = new Map();

                for ( const per_ProjectSearchId_MapEntry of peptideEntry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.entries() ) {
                    const projectSearchId = per_ProjectSearchId_MapEntry[ 0 ];
                    const per_ProjectSearchId_MapValue = per_ProjectSearchId_MapEntry[ 1 ];
                    const reportedPeptideIds = new Set( per_ProjectSearchId_MapValue.keys() );

                    reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId.set( projectSearchId, reportedPeptideIds )
                }
                
                const createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter = (
                    new CreateReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter({
                        
                        createReportedPeptideDisplayData_Result_Entry_ForTopLevelRow : createReportedPeptideDisplayData_Result_Entry_ForThisRow,
                        conditionIds_ParentPath,
                        
                        conditionGroupsContainer,
                        conditionGroupsDataContainer,

                        projectSearchIds,
                        reportedPeptideIds_ForDisplay_Map_KeyProjectSearchId,
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        searchDataLookupParamsRoot,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPageStateManager
                    })
                );

                const dataRow_GetChildTableData_Return_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject =
                    ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_RootTableObject => {

                    const getDataTableDataObjects_Result_Last_ConditionGroup : GetDataTableDataObjects_Result_Last_ConditionGroup =
                        createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup({
                            createReportedPeptideDisplayData_DataTableDataObjects_Last_ConditionGroup_Parameter
                        })

                        return getDataTableDataObjects_Result_Last_ConditionGroup.dataTable_RootTableObject;
                }

                const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                    uniqueId : peptideEntry.peptideSequenceDisplay,
                    sortOrder_OnEquals : peptideListCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries : dataTable_DataRow_ColumnEntries,
                    dataTable_DataRowEntry_DownloadTable,
                    dataRow_GetChildTableData_Return_DataTable_RootTableObject
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );
            }

            //  dataTable_DataRowEntries added to inside 'if' and 'else' immediately above

        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
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
