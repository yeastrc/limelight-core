/**
 * ModPage_TopLevel_ModificationList_DataTable_Component.tsx
 *
 * The table of mod masses
 */

import React from "react";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

import {
    ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/ModView_DataViz_Compute_ColorScale_WidthHeight_Etc";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    DataPageStateManager,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    DataTable_Column, DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableDataObject_Both_ColumnArrays,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modViewDataTableRenderer_MultiSearch_Subcomponents";
import {
    modPage_Get_WholeModTable_ShowCount_ExternalReactComponent
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modPage_Whole_mod_table_show_count_External_Component";
import {
    modPage_Get_DataTransformationType_DisplayLabel
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_DataTransformationType_DisplayLabel";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    ProteinPositionFilter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {
    modPage_get_ProteinList_SubTable
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_get_ProteinList_SubTable";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    SearchDataLookupParameters_Root
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    GeneratedPeptideContents_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {
    ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId";
import {
    searchSubGroup_Get_Selected_SearchSubGroupIds
} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {
    SearchSubGroup_CentralStateManagerObjectClass
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";

/**
 *
 */
export interface ModPage_TopLevel_ModificationList_DataTable_Component_Props {

    force_RecomputeTableData_Object: object
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
    projectSearchIds: Array<number>

    modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
    searchDataLookupParameters_Root : SearchDataLookupParameters_Root

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject  //  To limit which proteins are displayed when expand mod mass table row
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
}

/**
 *
 */
interface ModPage_TopLevel_ModificationList_DataTable_Component_State {

    forceReRender_Object? : object
}

/**
 *
 */
export class ModPage_TopLevel_ModificationList_DataTable_Component extends React.Component< ModPage_TopLevel_ModificationList_DataTable_Component_Props, ModPage_TopLevel_ModificationList_DataTable_Component_State > {

    //  bind to 'this' for passing as parameters

    // private _clear_Clicked_Callback_BindThis = this._clear_Clicked_Callback.bind( this )

    private _projectSearchIds_For_DisplayOrder: Array<number>

    private _dataTable_RootTableObject: DataTable_RootTableObject

    private _show_FullComponent_UpdatingMessage = false

    /**
     *
     */
    constructor( props: ModPage_TopLevel_ModificationList_DataTable_Component_Props ) { try {
        super( props );

        this._projectSearchIds_For_DisplayOrder = props.projectSearchIds

        {  //  Allow for projectSearchIds_OrderOverride_Deprecated ( OLD Functionality but since stored in URL needs to be supported )
            const projectSearchIds_OrderOverride_Deprecated = props.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_projectSearchIds_OrderOverride_Deprecated()

            if ( projectSearchIds_OrderOverride_Deprecated ) {
                this._projectSearchIds_For_DisplayOrder = projectSearchIds_OrderOverride_Deprecated
            }
        }

        this.state = {
            forceReRender_Object: {}
        };
    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    componentDidMount() { try {

        this._createNewTableData_ForceRerender()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<ModPage_TopLevel_ModificationList_DataTable_Component_Props>, prevState: Readonly<ModPage_TopLevel_ModificationList_DataTable_Component_State>, snapshot?: any ) { try {

        //  Keep these in sync with parent component as parent component will hold the previous instance of these until this tab is shown again

        if ( prevProps.force_RecomputeTableData_Object !== this.props.force_RecomputeTableData_Object
            || prevProps.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result !== this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
            || prevProps.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root !== this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root ) {

            this._show_FullComponent_UpdatingMessage = true

            this.setState({ forceReRender_Object: {} })

            window.setTimeout( () => { try {

                this._createNewTableData_ForceRerender()

            } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }, 10 )

        }

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _createNewTableData_ForceRerender() {

        this._dataTable_RootTableObject =
            _generateDataTable({
                dataPageStateManager_DataFrom_Server: this.props.dataPageStateManager_DataFrom_Server,
                modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: this.props.modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                searchDataLookupParameters_Root: this.props.searchDataLookupParameters_Root,
                searchSubGroup_CentralStateManagerObjectClass: this.props.searchSubGroup_CentralStateManagerObjectClass,
                generatedPeptideContents_UserSelections_StateObject: this.props.generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                modViewPage_DataVizOptions_VizSelections_PageStateManager: this.props.modViewPage_DataVizOptions_VizSelections_PageStateManager,
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject: this.props.proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject: this.props.proteinPositionFilter_UserSelections_StateObject,
                modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                projectSearchIds: this._projectSearchIds_For_DisplayOrder,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
            })


        this._show_FullComponent_UpdatingMessage = false

        this.setState({ forceReRender_Object: {} })
    }

    /**
     *
     */
    render() {
        return (
            <div style={ { position: "relative" } }>
                { this._dataTable_RootTableObject ? (
                    <>
                        <div>
                            <DataTable_TableRoot tableObject={ this._dataTable_RootTableObject }/>
                        </div>

                        {/*   "Updating Message" Cover <div>  */ }

                        { this._show_FullComponent_UpdatingMessage ? (
                            <div className=" block-updating-overlay-container ">
                                Updating
                            </div>
                        ) : null }
                    </>
                ) : null }
            </div>
        );
    }
}


////////////////////////////

//  NOT in any Class

/**
 *
 * @param dataPageStateManager_DataFrom_Server
 * @param modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
 * @param modViewPage_DataVizOptions_VizSelections_PageStateManager
 * @param modMap
 * @param projectSearchIds
 */
const _generateDataTable = function (
    {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        dataPageStateManager_DataFrom_Server,
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
        searchDataLookupParameters_Root,

        searchSubGroup_CentralStateManagerObjectClass,
        generatedPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        modViewPage_DataVizOptions_VizSelections_PageStateManager,
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

        projectSearchIds,

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result: ModView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result
        searchDataLookupParameters_Root : SearchDataLookupParameters_Root

        searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject  //  To limit which proteins are displayed when expand mod mass table row
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject //  To limit which proteins are displayed when expand mod mass table row
        dataPageStateManager_DataFrom_Server : DataPageStateManager
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        projectSearchIds: Array<number>

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function

    }) : DataTable_RootTableObject {

    const dataTableId_ThisTable = "Mod View Show Mods Table";


    const projectSearchIdsToDisplay = _getProjectSearchIdsToDisplay({projectSearchIds, modViewPage_DataVizOptions_VizSelections_PageStateManager});

    let searchSubGroups_DisplayOrder_Filtered: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>

    if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum
        === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) {

        //  Only display for 1 search

        if ( projectSearchIds.length !== 1 ) {
            const msg = "if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.projectSearchId_Or_SubSearchId_Enum === ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result___ProjectSearchId_Or_SubSearchId_Enum.SubSearchId ) { AND if ( projectSearchIds.length !== 1 ) {"
            console.warn(msg)
            throw Error(msg)
        }

        const projectSearchId = projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        const searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
            searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })

        searchSubGroups_DisplayOrder_Filtered = []

        const searchSubGroups = dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
        for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {

            if ( searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {

                searchSubGroups_DisplayOrder_Filtered.push( searchSubGroup )
            }
        }
    }

    const sortedModMasses = modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result.sortedModMasses
    const sortedModsToDisplay = _getSortedModsToDisplay({ sortedModMasses, modViewPage_DataVizOptions_VizSelections_PageStateManager });


    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    {
        const displayName = "Mod Mass";

        const dataTableColumn = new DataTable_Column({
            id : "modMass", // Used for tracking sort order. Keep short
            displayName,
            width : 75,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "Info";

        const dataTableColumn = new DataTable_Column({
            id : "info", // Used for tracking sort order. Keep short
            displayName,
            width : 85,
            sortable : false,
            columnHeader_Tooltip_HTML_TitleAttribute : "Links to annotations for this modification mass in external sites."
        });
        dataTableColumns.push( dataTableColumn );

    }

    if ( searchSubGroups_DisplayOrder_Filtered ) {

        // add a column for each project search id
        for ( const searchSubGroup of searchSubGroups_DisplayOrder_Filtered ) {


            const displayName = _getDisplayNameFor_SubSearch_Column( {
                searchSubGroup,
                modViewPage_DataVizOptions_VizSelections_PageStateManager
            } );

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () => {

                return (
                    <>
                        <div style={ { marginTop: 5, fontWeight: "bold" } }>
                            Sub Search:
                        </div>
                        <div style={ { marginTop: 2 } }>
                            { searchSubGroup.subgroupName_Display }
                        </div>
                        <div style={ { marginTop: 2 } }>
                            { searchSubGroup.searchSubgroupName_fromImportFile }
                        </div>
                    </>
                )
            }

            const dataTableColumn = new DataTable_Column( {
                id: searchSubGroup.searchSubGroup_Id + "_val", // Used for tracking sort order. Keep short
                displayName,
                width: 100,
                sortable: true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            } );
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable( { cell_ColumnHeader_String: displayName } );
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

    } else {

        // add a column for each project search id
        for ( const projectSearchId of projectSearchIdsToDisplay ) {

            const displayName = _getDisplayNameFor_Search_Column( {
                projectSearchId,
                dataPageStateManager_DataFrom_Server,
                modViewPage_DataVizOptions_VizSelections_PageStateManager
            } );

            const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () => {

                const searchData = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
                if ( ! searchData ) {
                    const msg = "dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                let searchShortName_Label = ""

                if ( searchData.searchShortName ) {
                    searchShortName_Label = "(" + searchData.searchShortName + ") "
                }

                const searchLabel = "(" + searchData.searchId + ") " + searchShortName_Label + searchData.name

                return (
                    <>
                        <div style={ { fontWeight: "bold" } }>
                            { displayName }
                        </div>
                        <div style={ { marginTop: 5, fontWeight: "bold" } }>
                            Search:
                        </div>
                        <div style={ { marginTop: 2 } }>
                            { searchLabel }
                        </div>
                    </>
                )
            }

            const dataTableColumn = new DataTable_Column( {
                id: projectSearchId + "_val", // Used for tracking sort order. Keep short
                displayName,
                width: 100,
                sortable: true,
                columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element
            } );
            dataTableColumns.push( dataTableColumn );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable( { cell_ColumnHeader_String: displayName } );
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
    }

    //   Data Table Rows

    const dataTableRows : Array<DataTable_DataRowEntry> = [];

    // create a row for each mod mass

    for ( const modMass of sortedModsToDisplay ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        {
            const valueDisplay = modMass.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : modMass
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const searchTableData_SearchContent = '';		// not searchable

            const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                    return modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents({ modMass });
                };

            const searchEntriesForColumn : Array<string> = [ searchTableData_SearchContent ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                valueSort : modMass
            });
            columnEntries.push( columnEntry );

        }


        const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )

        if ( searchSubGroups_DisplayOrder_Filtered ) {

            // add a column for each sub search id
            for ( const searchSubGroup of searchSubGroups_DisplayOrder_Filtered ) {

                const showInt =
                    ( ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === undefined
                            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none )
                        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                    ) ? true : false;

                let value_ForDisplay_For_ModMass_ProjectSearchId: number = undefined

                {
                    if ( data_For_ModMass ) {
                        const data_For__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( searchSubGroup.searchSubGroup_Id )
                        if ( data_For__ProjectSearchId_Or_SubSearchId ) {
                            value_ForDisplay_For_ModMass_ProjectSearchId = data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                        }
                    }
                }

                const value_ForDisplay_Formatted = showInt ? value_ForDisplay_For_ModMass_ProjectSearchId : value_ForDisplay_For_ModMass_ProjectSearchId.toExponential( 2 );

                const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                    ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                        return modPage_Get_WholeModTable_ShowCount_ExternalReactComponent({
                            modMass: modMass,
                            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                            numericValue : value_ForDisplay_For_ModMass_ProjectSearchId,
                            displayedValue : value_ForDisplay_Formatted
                        });
                    };

                //   Tooltip for the cell for each Mod Mass data row.  Never deployed NOT Commented out.
                //
                //   Commented out since may be too distracting or use too many resources

                const tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = () => {

                    return (
                        <>
                            <div style={ { fontWeight: "bold" } }>
                                { searchSubGroup.subgroupName_Display }
                            </div>
                            <div style={ { marginTop: 2 } }>
                                { searchSubGroup.searchSubgroupName_fromImportFile }
                            </div>
                        </>
                    )
                }



                let valueDisplay__Search_Download : string = "";
                if ( value_ForDisplay_Formatted !== undefined && value_ForDisplay_Formatted !== null ) {
                    valueDisplay__Search_Download = value_ForDisplay_Formatted.toString();
                }
                const searchEntriesForColumn : Array<string> = [ valueDisplay__Search_Download ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueSort : value_ForDisplay_For_ModMass_ProjectSearchId,
                    valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                    tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay__Search_Download })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );

            }

        } else {

            // add a value for each project search id
            for ( const projectSearchId of projectSearchIdsToDisplay) {

                const showInt =
                    ( ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === undefined
                            || modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none )
                        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                    ) ? true : false;

                let value_ForDisplay_For_ModMass_ProjectSearchId: number = undefined

                {
                    if ( data_For_ModMass ) {
                        const data_For__ProjectSearchId_Or_SubSearchId = data_For_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                        if ( data_For__ProjectSearchId_Or_SubSearchId ) {
                            value_ForDisplay_For_ModMass_ProjectSearchId = data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                        }
                    }
                }

                const value_ForDisplay_Formatted = showInt ? value_ForDisplay_For_ModMass_ProjectSearchId : value_ForDisplay_For_ModMass_ProjectSearchId.toExponential( 2 );

                const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                    ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : JSX.Element => {

                        return modPage_Get_WholeModTable_ShowCount_ExternalReactComponent({
                            modMass: modMass,
                            modView_DataViz_Compute_ColorScale_WidthHeight_Etc_Result,
                            numericValue : value_ForDisplay_For_ModMass_ProjectSearchId,
                            displayedValue : value_ForDisplay_Formatted
                        });
                    };

                //   Tooltip for the cell for each Mod Mass data row.  Never deployed NOT Commented out.
                //
                //   Commented out since may be too distracting or use too many resources

                const tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough = () => {

                    const searchData = dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
                    if ( ! searchData ) {
                        const msg = "dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    let searchShortName_Label = ""

                    if ( searchData.searchShortName ) {
                        searchShortName_Label = "(" + searchData.searchShortName + ") "
                    }

                    const searchLabel = "(" + searchData.searchId + ") " + searchShortName_Label + searchData.name

                    return (
                        <>
                            <div style={ { fontWeight: "bold" } }>
                                Search:
                            </div>
                            <div style={ { marginTop: 2 } }>
                                { searchLabel }
                            </div>
                        </>
                    )

                };


                let valueDisplay__Search_Download : string = "";
                if ( value_ForDisplay_Formatted !== undefined && value_ForDisplay_Formatted !== null ) {
                    valueDisplay__Search_Download = value_ForDisplay_Formatted.toString();
                }
                const searchEntriesForColumn : Array<string> = [ valueDisplay__Search_Download ]
                const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    searchTableData,
                    valueSort : value_ForDisplay_For_ModMass_ProjectSearchId,
                    valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
                    tooltipDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                });
                columnEntries.push( columnEntry );

                const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay__Search_Download })
                dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
            }
        }

        const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject =
            ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                return modPage_get_ProteinList_SubTable({
                    data_For_ModMass,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                    projectSearchIds,
                    searchDataLookupParameters_Root,

                    searchSubGroup_CentralStateManagerObjectClass,
                    generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager,
                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                    proteinPositionFilter_UserSelections_StateObject,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    dataPageStateManager_DataFrom_Server,
                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                })
            };

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : modMass,
            sortOrder_OnEquals : modMass,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
        })

        dataTableRows.push( dataTable_DataRowEntry );
    }


    // assemble the table
    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns: dataTableColumns,
        columns_tableDownload: dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries: dataTableRows
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject

}


const _getDisplayNameFor_SubSearch_Column = function (
    {
        searchSubGroup, modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        searchSubGroup: SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    }) : string  {

    const column_LabelStart = _getDisplayName_Start_For_Search_Or_SubSearch_Column({ modViewPage_DataVizOptions_VizSelections_PageStateManager })

    const columnLabel = column_LabelStart + " (" + searchSubGroup.subgroupName_Display + ")";

    return columnLabel;
}

const _getDisplayNameFor_Search_Column = function (
    {
        projectSearchId, modViewPage_DataVizOptions_VizSelections_PageStateManager, dataPageStateManager_DataFrom_Server
    } : {
        projectSearchId:number
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    }) : string  {

    const searchIdXorShortName = modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId({projectSearchId, dataPageStateManager_DataFrom_Server});

    const column_LabelStart = _getDisplayName_Start_For_Search_Or_SubSearch_Column({ modViewPage_DataVizOptions_VizSelections_PageStateManager })

    const columnLabel = column_LabelStart + " (" + searchIdXorShortName + ")";

    return columnLabel;
}

const _getDisplayName_Start_For_Search_Or_SubSearch_Column = function (
    {
        modViewPage_DataVizOptions_VizSelections_PageStateManager
    } : {
        modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    }
) {
    let column_LabelStart: string = undefined;

    if ( modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== undefined
        && modViewPage_DataVizOptions_VizSelections_PageStateManager.get_dataTransformation() !== ModViewPage_DataVizOptions_VizSelections_PageStateManager__DATA_TRANSFORMATION_Values_Enum.none ) {

        column_LabelStart = modPage_Get_DataTransformationType_DisplayLabel({ modViewPage_DataVizOptions_VizSelections_PageStateManager });
    } else {
        const psmQuantType = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
            modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
        const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

        column_LabelStart = quantTypeString + ' ' +
            (modViewPage_DataVizOptions_VizSelections_PageStateManager.get_psmQuant() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__PSM_QUANT_METHOD_Values_Enum.counts
                ? "count" : "ratio");
    }

    return column_LabelStart
}

const _getSortedModsToDisplay = function ({ sortedModMasses, modViewPage_DataVizOptions_VizSelections_PageStateManager } : {

    sortedModMasses: ReadonlyArray<number>
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
}) : ReadonlyArray<number> {

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    // console.log('called getSortedModsToDisplay()');
    // console.log('sortedModMasses', sortedModMasses);
    // console.log('modMasses_ProjectSearchIds_Visualization_Selections_Root', modMasses_ProjectSearchIds_Visualization_Selections_Root );

    if ( ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root )
        || ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) ) {

        return sortedModMasses; // EARLY RETURN
    }

    let sortedModsToDisplay : Array<number> = [ ];
    for( const modMass of sortedModMasses ) {

        for ( const projectSearchId of modMasses_ProjectSearchIds_Visualization_Selections_Root.get_Selection_ProjectSearchIds() ) {
            if ( modMasses_ProjectSearchIds_Visualization_Selections_Root.get_SelectedModMasses_Set_For_ProjectSearchId(projectSearchId).has(modMass) ) {
                sortedModsToDisplay.push(modMass);
                break;
            }
        }
    }

    return sortedModsToDisplay;
}

const _getProjectSearchIdsToDisplay = function ({ projectSearchIds, modViewPage_DataVizOptions_VizSelections_PageStateManager } : {
    projectSearchIds: Array<number>,
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
}) : Array<number> {

    const modMasses_ProjectSearchIds_Visualization_Selections_Root = modViewPage_DataVizOptions_VizSelections_PageStateManager.get_modMasses_ProjectSearchIds_Visualization_Selections_Root()

    if ( ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root )
        || ( ! modMasses_ProjectSearchIds_Visualization_Selections_Root.is_AnySelections() ) ) {
        return projectSearchIds;
    }

    const selection_ProjectSearchIds_Set = new Set( modMasses_ProjectSearchIds_Visualization_Selections_Root.get_Selection_ProjectSearchIds() )

    const projectSearchIdsToDisplay : Array<number> = [ ];

    for ( const projectSearchId of projectSearchIds ) {

        if ( selection_ProjectSearchIds_Set.has( projectSearchId ) ) {
            projectSearchIdsToDisplay.push( projectSearchId );
        }
    }

    return projectSearchIdsToDisplay;
}
