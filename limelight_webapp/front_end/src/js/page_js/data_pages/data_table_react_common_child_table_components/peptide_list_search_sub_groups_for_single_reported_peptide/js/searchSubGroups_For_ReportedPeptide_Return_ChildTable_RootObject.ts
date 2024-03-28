/**
 * searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject.ts
 *
 * Protein Page: Single Protein: show Search Sub Groups for Single Reported Peptide under Single Peptide in Peptide List
 *
 * Return React Data Table DataTable_RootTableObject that is shown for child of Single Reported Peptide for Single Peptide and will contain child table
 */

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
    DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/psm_list/js/psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects";
import { psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__root_component_and_code/psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent";
import { PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Component_Params } from "page_js/data_pages/data_table_react_common_child_table_components/psm_list_etc_block__under_standard_project_search_id_peptide_or_reported_peptide_id_psm_ids_search_sub_groups/psm_list_etc_block__sub_components/chromatogram/psmList_Etc_Block__Chromatogram_BasedOnPSMs_Component";

////////////////

const dataTableId_ThisTable = "Protein Single Protein Search Sub Groups under Reported Peptide Single Peptide Search List Table";

////////////////

export class SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter {

    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    projectSearchId : number
    reportedPeptideId_ForDisplay : number  // reportedPeptideId specific to Parent Reported Peptide Row
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
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
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager
        } : {
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            projectSearchId : number
            reportedPeptideId_ForDisplay : number  // reportedPeptideId specific to Parent Reported Peptide Row
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            dataPageStateManager : DataPageStateManager
        }) {

        this.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
        this.projectSearchId = projectSearchId;
        this.reportedPeptideId_ForDisplay = reportedPeptideId_ForDisplay;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
        this.dataPageStateManager = dataPageStateManager;
    }
}

/**
 *
 *
 */
export const searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject = function (
     searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter : SearchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter
) : DataTable_DataRowEntry__GetChildTableData_Return_DataTable_RootTableObject_OR_Promise_DataTable_RootTableObject_ReturnValue {

    const searchSubGroup_Ids_Selected : Set<number> = //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.searchSubGroup_Ids_Selected;

    const projectSearchId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.projectSearchId;
    const reportedPeptideId_ForDisplay = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideId_ForDisplay;
    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId;

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    const searchDataLookupParamsRoot = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.searchDataLookupParamsRoot;

    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
    const dataPageStateManager : DataPageStateManager = searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.dataPageStateManager;

    const dataFromServer_Root = _getDataFromServer({ projectSearchId, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId });

    if ( dataFromServer_Root.data ) {

        const dataFromServer = dataFromServer_Root.data;

        const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
            searchSubGroup_Ids_Selected,
            projectSearchId,
            reportedPeptideId_ForDisplay,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            searchDataLookupParamsRoot,
            dataPageStateManager,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataFromServer
        });

        return {dataTable_RootTableObject};

    } else if ( dataFromServer_Root.promise ) {

        const promise_Containing_dataTable_RootTableObject = new Promise<DataTable_RootTableObject>((resolve, reject) => { try {
            dataFromServer_Root.promise.catch(reason => { reject(reason)})
            dataFromServer_Root.promise.then(value => { try {

                const dataFromServer = value;

                const dataTable_RootTableObject : DataTable_RootTableObject = _create_dataTable_RootTableObject({
                    searchSubGroup_Ids_Selected,
                    projectSearchId,
                    reportedPeptideId_ForDisplay,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                    searchDataLookupParamsRoot,
                    dataPageStateManager,
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: searchSubGroups_For_ReportedPeptide_Return_ChildTable_RootObject__Parameter.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                    dataFromServer
                });

                resolve(dataTable_RootTableObject)
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return {promise_Containing_dataTable_RootTableObject};

    } else {
        throw Error("dataFromServer_Root no data or promise")
    }

    console.warn("SHOULD NOT GET HERE")
    throw Error("SHOULD NOT GET HERE")

}

/**
 *
 */
const _getDataFromServer = function (
    {
        projectSearchId, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    } : {
        projectSearchId : number
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    data: {
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
    }
    promise: Promise<{
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
    }>
} {
    let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

    const promises: Array<Promise<void>> = []

    {
        const get_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
            get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch();

        if ( get_Result.data ) {

            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

        } else if ( get_Result.promise ) {

            const promise = new Promise<void>( (resolve, reject) => { try {
                    get_Result.promise.catch( reason =>  { reject(reason)})
                    get_Result.promise.then( value => { try {

                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
            )
            promises.push(promise)
        } else {
            throw Error("get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch() Result no data or promise")
        }
    }

    if ( promises.length === 0 ) {

        //  EARLY RETURN
        return {
            promise: undefined, data: {
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
            }
        }
    }

    const promisesAll = Promise.all(promises)

    return { data: undefined, promise: new Promise<{
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        }>((resolve, reject) => {
            promisesAll.catch(reason => { reject(reason)})
            promisesAll.then(novalue => { try {

                resolve({
                    searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        })
    }
}

/**
 *
 *
 */
const _create_dataTable_RootTableObject = function(
    {
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId,
        reportedPeptideId_ForDisplay,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        searchDataLookupParamsRoot,
        dataPageStateManager,
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
        dataFromServer

    } : {
        searchSubGroup_Ids_Selected : Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        projectSearchId : number
        reportedPeptideId_ForDisplay : number
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root

        dataPageStateManager : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        dataFromServer: {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        }

    }) : DataTable_RootTableObject {

    const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = dataFromServer.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

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
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        {
            const displayName = "Sub Search";

            const dataTable_Column = new DataTable_Column({
                id : "srchSubGrpIds", // Used for tracking sort order. Keep short
                displayName,
                width : 400,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        // {
        //     const displayName = "Unique";
        //
        //     const dataTable_Column = new DataTable_Column({
        //         id : "unique", // Used for tracking sort order. Keep short
        //         displayName,
        //         width : 55,
        //         sortable : true
        //     });
        //     dataTable_Columns.push( dataTable_Column );
        //
        //     const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        //     dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        // }
        {
            const displayName = "PSMs";

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

            const subGroupIdMap_Key_PsmId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId_ForDisplay );
            if ( ! subGroupIdMap_Key_PsmId ) {
                const msg = "( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId_ForDisplay ) not return a value. reportedPeptideId_ForDisplay: " + reportedPeptideId_ForDisplay + ", projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            for ( const psmId_Include of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include ) {

                const subGroupId = subGroupIdMap_Key_PsmId.get( psmId_Include );
                if ( ! subGroupId ) {
                    const msg = "( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId_ForDisplay ).get( psmId_Include ) not return a value. psmId_Include: " + psmId_Include + ", reportedPeptideId_ForDisplay: " + reportedPeptideId_ForDisplay + ", projectSearchId: " + projectSearchId;
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
            const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

            {
                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroup_Id )
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( searchSubGroup_Id_Selected ) returned nothing. searchSubGroup_Id_Selected: " + searchSubGroup_Id + ", projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                const displayName = searchSubGroup.subgroupName_Display;

                const tooltipText = searchSubGroup.subgroupName_Display + "\n" + searchSubGroup.searchSubgroupName_fromImportFile;

                const valueDisplay = displayName;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : displayName,
                    tooltipText
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
            {
                const psmCountDisplay = psmCount.toLocaleString();

                const valueDisplay = psmCountDisplay;
                const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueDisplay,
                    valueSort : psmCount
                });
                dataTable_DataRow_ColumnEntries.push( dataTable_DataRow_ColumnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }

            //////////

            const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Parameter({
                projectSearchId,
                reportedPeptideId : reportedPeptideId_ForDisplay,
                searchSubGroupId : searchSubGroup_Id,
                psmIds_Include : reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include,
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

            const dataTable_DataRowEntry = new DataTable_DataRowEntry( {
                uniqueId : searchSubGroup_Id,
                sortOrder_OnEquals : searchSubGroup_Id,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                columnEntries : dataTable_DataRow_ColumnEntries,
                dataTable_DataRowEntry_DownloadTable,
                dataRow_Get_RowChildContent_Return_Promise_ChildContent
            });

            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries
    });

    //  Display PSMs under this Reported Peptide

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: false});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}
