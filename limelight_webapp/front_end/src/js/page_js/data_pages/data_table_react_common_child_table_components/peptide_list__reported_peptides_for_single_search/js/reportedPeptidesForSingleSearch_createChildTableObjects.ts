/**
 * reportedPeptidesForSingleSearch_createChildTableObjects.ts
 *
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 *
 * Create     DataTable_RootTableObject for child table
 */

import {limelight__variable_is_type_number_Check} from 'page_js/common_all_pages/limelight__variable_is_type_number_Check';
//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';
import {createReportedPeptideDisplayData} from 'page_js/data_pages/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';
import {Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject,
    SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/peptide_list_search_sub_groups_for_single_reported_peptide/js/searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject";
import {reportedPeptidesForSingleSearch_ChildReactComponents_Other} from "page_js/data_pages/data_table_react_common_child_table_components/peptide_list__reported_peptides_for_single_search/jsx/reportedPeptidesForSingleSearch_ChildReactComponents_Other";
import {CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter
} from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import { psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
import { PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component";

//  Local

////////////////

const dataTableId_ThisTable = "Reported Peptides For Single Search List Table";

////////////////

/**
 * Used as class for object in call to reportedPeptidesForSingleSearch_createChildTableObjects
 */
export class ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter {

    for_MultipleSearches_Overall: boolean   //  Used to control what is displayed
    for_SingleProtein: boolean              //  Used to control what is displayed

    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    projectSearchId : number
    reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
    dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object in call to reportedPeptidesForSingleSearch_createChildTableObjects
     */
    constructor(
        {
            for_MultipleSearches_Overall,
            for_SingleProtein,

            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId,
            reportedPeptideIds_ForDisplay,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager
        } : {
            for_MultipleSearches_Overall: boolean   //  Used to control what is displayed
            for_SingleProtein: boolean              //  Used to control what is displayed

            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId : number
            reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
            dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root,
            dataPageStateManager : DataPageStateManager
        }) {
        this.for_MultipleSearches_Overall = for_MultipleSearches_Overall
        this.for_SingleProtein = for_SingleProtein

        this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
        this.projectSearchId = projectSearchId;
        this.reportedPeptideIds_ForDisplay = reportedPeptideIds_ForDisplay;
        this.dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
        this.dataPageStateManager = dataPageStateManager;
    }
}

/**
 *
 * @returns ReportedPeptidesForSingleSearch_createChildTableObjects_Result
 */
export const reportedPeptidesForSingleSearch_createChildTableObjects = async function({

                                                                                          reportedPeptidesForSingleSearch_createChildTableObjects_Parameter
                                                                                      } : {
    reportedPeptidesForSingleSearch_createChildTableObjects_Parameter : ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter

}) : Promise<DataTable_RootTableObject> /* return a promise */ {
    try {

        let show_Protein_Pre_Post_Residues = false;

        //  reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.dataPageStateManager.get_projectSearchIds()  returns undefined so do not use

        if ( reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.for_MultipleSearches_Overall
            && ( ! reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.for_SingleProtein ) ) {

            show_Protein_Pre_Post_Residues = true;  // Hard code to true
        }

        const searchSubGroup_Ids_Selected : Set<number> = //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.searchSubGroup_Ids_Selected;

        const projectSearchId = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.projectSearchId;
        const reportedPeptideIds_ForDisplay = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.reportedPeptideIds_ForDisplay;
        const dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry> =
            reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.dataPerReportedPeptideId_Map_Key_reportedPeptideId;
        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        const searchDataLookupParamsRoot = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.searchDataLookupParamsRoot;
        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
            reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
        const dataPageStateManager : DataPageStateManager = reportedPeptidesForSingleSearch_createChildTableObjects_Parameter.dataPageStateManager;

        let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId : Array<number> = undefined;  //  Reported Peptide Ann Type Ids To Display

        {
            const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
            const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
            for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
                if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {
                    reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = paramsForProjectSearchId.reportedPeptideAnnTypeDisplay
                    break;
                }
            }
            if ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
                const msg = "reportedPeptidesForSingleSearch_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain entry for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
            //  Validate all are numbers
            for ( const reportedPeptideAnnTypeId of reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
                if ( ! limelight__variable_is_type_number_Check( reportedPeptideAnnTypeId) ) {
                    const msg = "reportedPeptidesForSingleSearch_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList[X].reportedPeptideAnnTypeDisplay contains a non-number: |" + reportedPeptideAnnTypeId + "|, projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }
            }
        }

        const createReportedPeptideDisplayData_result = await createReportedPeptideDisplayData({
            show_Protein_Pre_Post_Residues,
            reportedPeptideIds_ForDisplay,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            proteinSequenceVersionId : undefined/* Only for error reporting */,
            projectSearchId,
            searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager
        });


        const searchProgramsPerSearchItems_For_ProjectSearchId =
            dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId )
        if ( ! searchProgramsPerSearchItems_For_ProjectSearchId ) {
            const msg = "_getDataTableColumns(...): dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        //  Columns

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {
            {
                const displayName = "Reported Peptide";

                const dataTable_Column = new DataTable_Column({
                    id : "repPeptIds", // Used for tracking sort order. Keep short
                    displayName,
                    width : 400,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            {
                const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => {
                    return reportedPeptidesForSingleSearch_ChildReactComponents_Other.uniqueColumnHeader_Tooltip_Create();
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


            {
                let displayName = "PSMs";

                if ( searchSubGroup_Ids_Selected ) {

                    displayName = "Total PSMs";
                }

                const dataTable_Column = new DataTable_Column({
                    id : "psmCount", // Used for tracking sort order. Keep short
                    displayName,
                    width : 75,
                    sortable : true
                });
                dataTable_Columns.push( dataTable_Column );

                const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
            }
            //  Score Columns
            const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;
            // annotationTypeRecords_DisplayOrder { psmAnnotationTypesForPeptideListEntries, reportedPeptideAnnotationTypesForPeptideListEntries

            {  //  Reported Peptide Scores
                const reportedPeptideAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;

                const annotationNames_MoreThanOneInstance_InAnnotationList: Set<string> = new Set()

                {
                    const annotationNames_All: Set<string> = new Set()

                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
                    for ( const annotation of annotationTypesForPeptideListEntries ) {

                        const displayName = annotation.name;

                        if ( annotationNames_All.has( displayName ) ) {
                            annotationNames_MoreThanOneInstance_InAnnotationList.add( displayName )
                        } else {
                            annotationNames_All.add( displayName )
                        }
                    }
                }

                for ( const reportedPeptideAnnotationType of reportedPeptideAnnotationTypesForPeptideListEntries ) {

                    let displayName = reportedPeptideAnnotationType.name;

                    if ( annotationNames_MoreThanOneInstance_InAnnotationList.has( displayName ) ) {
                        //  Same displayName more than once in list so add the search program name to the display

                        const searchProgramsPerSearchItem = searchProgramsPerSearchItems_For_ProjectSearchId.searchProgramsPerSearchItem_Map.get( reportedPeptideAnnotationType.searchProgramsPerSearchId )
                        if ( ! searchProgramsPerSearchItem ) {
                            const msg = "searchProgramsPerSearchItems_For_ProjectSearchId.searchProgramsPerSearchItem_Map.get( reportedPeptideAnnotationType.searchProgramsPerSearchId ) returned NOTHING for reportedPeptideAnnotationType.searchProgramsPerSearchId: " + reportedPeptideAnnotationType.searchProgramsPerSearchId
                            console.warn(msg)
                            throw Error(msg)
                        }

                        displayName += " (" + searchProgramsPerSearchItem.name + ")"
                    }

                    const dataTable_Column = new DataTable_Column({
                        id : "rp_" + reportedPeptideAnnotationType.name, // Used for tracking sort order. Keep short
                        displayName,
                        width : 105,
                        sortable : true
                    });
                    dataTable_Columns.push( dataTable_Column );

                    const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
                    dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
                }
            }
        }

        //  Data Rows

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        {
            for ( const peptideEntry of createReportedPeptideDisplayData_result.peptideList ) {

                if ( ! peptideEntry.numPsms ) {

                    //  Skip where numPsms is zero or undefined or null

                    continue;  // EARLY CONTINUE
                }

                const reportedPeptideId = peptideEntry.reportedPeptideId;

                const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = peptideEntry.peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId

                const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
                {
                    { // reportedPeptideSequence

                        const valueDisplay = peptideEntry.reportedPeptideSequence;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort : peptideEntry.reportedPeptideSequence
                        })
                        columnEntries.push( columnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }

                    { // Unique
                        let value = "";
                        let valueSort = 1;
                        if (  peptideEntry.peptideUnique ) {
                            value = "*";  //  Display '*' if peptide unique
                            valueSort = 0;  // Sort unique above not unique
                        }

                        const valueDisplay = value;
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort : valueSort
                        });
                        columnEntries.push( columnEntry );

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
                            columnEntries.push( columnEntry );

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
                            columnEntries.push( columnEntry );

                            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                        }
                    }

                    { // numPsms

                        const valueDisplay = peptideEntry.numPsms.toLocaleString();
                        const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                        const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            searchTableData,
                            valueDisplay,
                            valueSort : peptideEntry.numPsms
                        })
                        columnEntries.push( columnEntry );

                        const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                        dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                    }
                }
                { //  Score Columns

                    const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;

                    {  //  Reported Peptide Scores
                        const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForAnnotationTypeIds;
                        for ( const annotationType of annotationTypesForPeptideListEntries ) {
                            if ( peptideEntry.peptideAnnotationMap_KeyAnnType === undefined || peptideEntry.peptideAnnotationMap_KeyAnnType === null ) {
                                const msg = "( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null )"
                                console.warn( msg );
                                throw Error( msg );
                            }
                            const annotationEntry = peptideEntry.peptideAnnotationMap_KeyAnnType.get( annotationType.annotationTypeId );
                            let valueSort : any = annotationEntry.valueDouble;
                            if ( valueSort === undefined || valueSort === null ) {
                                valueSort = annotationEntry.valueString; //  Needed for Descriptive Annotation Types
                            }

                            const valueDisplay = annotationEntry.valueString;
                            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                            const columnEntry = new DataTable_DataRow_ColumnEntry({
                                searchTableData,
                                valueDisplay,
                                valueSort
                            })
                            columnEntries.push( columnEntry );

                            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                        }
                    }
                }

                if ( searchSubGroup_Ids_Selected ) {

                    const dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject =
                        ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue => {

                            const searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter = new SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter({
                                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                                projectSearchId,
                                reportedPeptideId_ForDisplay : reportedPeptideId,
                                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                                searchDataLookupParamsRoot,
                                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                                dataPageStateManager
                            });

                            const dataTable_RootTableObject_OR_Promise_DataTable_RootTableObject =
                                searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject(
                                    searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter
                                );

                            return dataTable_RootTableObject_OR_Promise_DataTable_RootTableObject;
                        }

                    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId : reportedPeptideId,
                        sortOrder_OnEquals : reportedPeptideId,
                        columnEntries,
                        dataTable_DataRowEntry_DownloadTable,
                        dataRow_GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject
                    });

                    dataTable_DataRowEntries.push( dataTable_DataRowEntry );

                } else {

                    const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
                        projectSearchId,
                        reportedPeptideId,
                        searchSubGroupId : undefined,
                        psmIds_Include : peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include,
                        openModPositionOverride: undefined,
                        searchDataLookupParamsRoot,
                        dataPageStateManager,
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                    });

                    const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params = {
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
                    }

                    const dataRow_Get_RowChildContent_Return_Promise_ChildContent: DataTable_DataRowEntry__Get_RowChildContent_Return_Promise_ChildContent =
                        ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ): Promise<DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent> => {

                            return psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent({
                                psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter,
                                psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params,
                                params_DataTableCallback: params
                            })
                        }

                    const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                    const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                        uniqueId : reportedPeptideId,
                        sortOrder_OnEquals : reportedPeptideId,
                        columnEntries,
                        dataTable_DataRowEntry_DownloadTable,
                        dataRow_Get_RowChildContent_Return_Promise_ChildContent
                    });

                    dataTable_DataRowEntries.push( dataTable_DataRowEntry );
                }

                //  dataTable_DataRowEntries added to inside both 'if' 'else'

            }
        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_Columns,
            columns_tableDownload : dataTable_Column_DownloadTable_Entries,
            dataTable_DataRowEntries
        });

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        return dataTable_RootTableObject;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}
