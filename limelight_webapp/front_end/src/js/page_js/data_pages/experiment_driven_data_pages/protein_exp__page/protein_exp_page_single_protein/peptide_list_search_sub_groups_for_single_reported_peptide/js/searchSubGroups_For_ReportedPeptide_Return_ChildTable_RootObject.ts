/**
 * searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject.ts
 *
 * Protein Page: Single Protein: show Search Sub Groups for Single Reported Peptide under Single Peptide in Peptide List
 *
 * Return React Data Table DataTable_RootTableObject that is shown for child of Single Reported Peptide for Single Peptide and will contain child table
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
    DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent,
    DataTable_DataRowEntry__Get_RowChildContent_CallParams,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    psmList_Wrapper__Get_RowChildContent_Return_ChildContent,
    PsmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/jsx/psmList_Wrapper_ChildReactComponent";

////////////////

const dataTableId_ThisTable = "Protein Single Protein Search Sub Groups under Reported Peptide Single Peptide Search List Table";

////////////////

export class SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter {

    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    projectSearchId : number
    reportedPeptideId_ForDisplay : number  // reportedPeptideId specific to Parent Reported Peptide Row
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     *
     */
    constructor(
        {
            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId,
            reportedPeptideId_ForDisplay,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
            dataPerReportedPeptideId_Map_Key_reportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            dataPageStateManager
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId : number
            reportedPeptideId_ForDisplay : number  // reportedPeptideId specific to Parent Reported Peptide Row
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root,
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
            dataPageStateManager : DataPageStateManager
        }) {

        this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
        this.projectSearchId = projectSearchId;
        this.reportedPeptideId_ForDisplay = reportedPeptideId_ForDisplay;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId;
        this.dataPerReportedPeptideId_Map_Key_reportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


}

/**
 *
 *
 */
export const searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject =

    ( searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter : SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter ) :

    DataTable_RootTableObject => {

    const searchSubGroup_Ids_Selected : Set<number> = //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.searchSubGroup_Ids_Selected;

    const projectSearchId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.projectSearchId;
    const reportedPeptideId_ForDisplay = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideId_ForDisplay;
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId;

    const dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry> =
        searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.dataPerReportedPeptideId_Map_Key_reportedPeptideId;
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    const searchDataLookupParamsRoot = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.searchDataLookupParamsRoot;

    const loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.loadedDataPerProjectSearchIdHolder;
    const loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.loadedDataCommonHolder;
    const dataPageStateManager : DataPageStateManager = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.dataPageStateManager;

    const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
        searchSubGroup_Ids_Selected,
        projectSearchId,
        reportedPeptideId_ForDisplay,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        searchDataLookupParamsRoot,
        dataPageStateManager
    });

    return dataTable_RootTableObject;
}

/**
 * Sort the Reported Peptide List.
 *
 */
const _create_dataTable_RootTableObject = function(
    {
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId,
        reportedPeptideId_ForDisplay,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager

    } : {
        searchSubGroup_Ids_Selected : Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId : number
        reportedPeptideId_ForDisplay : number
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId

        dataPerReportedPeptideId_Map_Key_reportedPeptideId : Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        dataPageStateManager : DataPageStateManager

    }) : DataTable_RootTableObject {

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__EntryFor_reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId_ForDisplay );
    if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__EntryFor_reportedPeptideId ) {
        const msg = "reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId_ForDisplay ); returned nothing. reportedPeptideId_ForDisplay: " + reportedPeptideId_ForDisplay + ", projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    ///////

    //  Create data for table

    //  Columns

    const dataTable_Columns : Array<DataTable_Column> = [];

    {
        {
            const dataTable_Column = new DataTable_Column({
                id : "srchSubGrpIds", // Used for tracking sort order. Keep short
                displayName : "Search Sub Group",
                width : 400,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }
        // {
        //     const dataTable_Column = new DataTable_Column({
        //         id : "unique", // Used for tracking sort order. Keep short
        //         displayName : "Unique",
        //         width : 55,
        //         sortable : true,
        //         style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
        //         // style_override_header_React : {},  // Optional
        //         // style_override_React : {},  // Optional
        //         // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
        //         // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        //     });
        //     dataTable_Columns.push( dataTable_Column );
        // }

        const dataTable_Column = new DataTable_Column({
            id : "psmCount", // Used for tracking sort order. Keep short
            displayName : "PSMs",
            width : 75,
            sortable : true,
            style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );

    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        const searchSubGroups_Root = dataPageStateManager.get_SearchSubGroups_Root();
        if ( ! searchSubGroups_Root ) {
            const msg = "( ! searchSubGroups_Root )";
            console.warn( msg );
            throw Error( msg );
        }
        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned nothing. projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__EntryFor_reportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId ) {
            const msg = "( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__EntryFor_reportedPeptideId.psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId ). projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        let psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include : Map<number,number> = undefined;

        if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
        && reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include.size > 0 ) {

            //  Create PSM Counts per search sub group id, using psmCount_after_Include

            psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include = new Map();

            if ( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ) {
                const msg = "( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() )"
                console.warn( msg )
                throw Error( msg )
            }
            const subGroupIdMap_Key_PsmId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId().get( reportedPeptideId_ForDisplay );
            if ( ! subGroupIdMap_Key_PsmId ) {
                const msg = "( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ).get( reportedPeptideId_ForDisplay ) not return a value. reportedPeptideId_ForDisplay: " + reportedPeptideId_ForDisplay + ", projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            for ( const psmId_Include of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include ) {

                const subGroupId = subGroupIdMap_Key_PsmId.get( psmId_Include );
                if ( ! subGroupId ) {
                    const msg = "( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ).get( reportedPeptideId_ForDisplay ).get( psmId_Include ) not return a value. psmId_Include: " + psmId_Include + ", reportedPeptideId_ForDisplay: " + reportedPeptideId_ForDisplay + ", projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                let psmCount_For_SubGroupId = psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include.get( subGroupId );
                if ( ! psmCount_For_SubGroupId ) {
                    psmCount_For_SubGroupId = 0;
                }
                psmCount_For_SubGroupId++;
                psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include.set( subGroupId, psmCount_For_SubGroupId );
            }
        }

        const psmCount_after_Include_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__EntryFor_reportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId;

        for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  Skip since not selected for display
                continue;  // EARLY CONTINUE
            }

            const searchSubGroup_Id = searchSubGroup.searchSubGroup_Id;

            let psmCount : number = undefined;

            if ( psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include ) {
                psmCount = psmCounts_Per_SubGroupId_ComputedFrom_psmCount_after_Include.get(searchSubGroup_Id);
            } else {
                psmCount = psmCount_after_Include_Map_Key_SearchSubGroupId.get(searchSubGroup_Id);
            }
            if ( psmCount === undefined ) {

                //  No PSM Count entry so skip Search Sub Group Id

                continue;
            }

            const dataTable_DataRow_ColumnEntries : DataTable_DataRow_ColumnEntry[] = [];

            {
                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroup_Id )
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroup_Id_Selected ) returned nothing. searchSubGroup_Id_Selected: " + searchSubGroup_Id + ", projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                const displayName = searchSubGroup.subgroupName_Display;

                const tooltipText = searchSubGroup.subgroupName_Display + "\n" + searchSubGroup.searchSubgroupName_fromImportFile;

                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : displayName,
                    valueSort : displayName,
                    tooltipText
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );
            }
            {


                const psmCountDisplay = psmCount.toLocaleString();

                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : psmCountDisplay,
                    valueSort : psmCount,
                    // tooltipText :
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );
            }

            //////////

            const psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter = new PsmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter({
                projectSearchId,
                reportedPeptideId : reportedPeptideId_ForDisplay,
                searchSubGroupId : searchSubGroup_Id,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                dataPageStateManager,
                forMultipleSearchesPage : true  // Always true for Experiment
            });

            const dataRow_Get_RowChildContent_Return_ChildContent : DataTable_DataRowEntry__Get_RowChildContent_Return_ChildContent =
                ( params : DataTable_DataRowEntry__Get_RowChildContent_CallParams ) : JSX.Element => {

                const { jsxElement } =
                    psmList_Wrapper__Get_RowChildContent_Return_ChildContent({
                        psmList_Wrapper__Get_RowChildContent_Return_ChildContent_Parameter,
                        dataTable_DataRowEntry__Get_RowChildContent_CallParams : params
                    });

                return jsxElement;
            }

            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                uniqueId : searchSubGroup_Id,
                sortOrder_OnEquals : searchSubGroup_Id,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                columnEntries : dataTable_DataRow_ColumnEntries,
                dataRow_Get_RowChildContent_Return_ChildContent
                // tableRowClickHandlerParameter : undefined,  //  Data passed to DataTable_TableOptions.dataRowClickHandler
                // searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter : undefined,   //  Data passed to DataTable_TableOptions.dataRow_GetChildTableData
            });

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    //  Display PSMs under this Reported Peptide

    const tableOptions = new DataTable_TableOptions({});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
