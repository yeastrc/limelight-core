/**
 * ModPage_ZScore_ReplicateReport_DataTable_Component.tsx
 */


//  Use to get Typescript typings, but then switch since it does NOT build with this import
// import Plotly from "plotly.js"

//  Plotly ONLY imports successfully for a Build using this import
import Plotly from "plotly.js-dist-min";

import React from "react";
import {
    ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";
import {
    SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result,
    ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/mod_page__compute__total__psm_id__counts__per__project_search_id__or__sub_search_id__from__mod_view_page__compute_data__for__mod_mass_viz__and__top_level_table__result__root";
import {
    modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root";
import {
    ModPage_ModStatsUtils
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/ModPage_ModStatsUtils";
import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry__GetChildTableData_CallbackParams,
    DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { DataTable_TableRoot } from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    modPage_GetSearchNameForProjectSearchId
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_util_js/modPage_GetSearchNameForProjectSearchId";
import {
    qcPage_StandardChartConfig
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";
import {
    modViewDataTableRenderer_MultiSearch_Subcomponents__Cell_ExternalModLinks_Contents
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__jsx/modViewDataTableRenderer_MultiSearch_Subcomponents";
import {
    ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_Display_MainContent_Component";
import {
    modPage_get_ZScore_Tab_GroupsFor_SingleModMass_SubTable
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_get_ZScore_Tab_GroupsFor_SingleModMass_SubTable";

//////


/**
 *
 */
interface ModPage_ZScore_ReplicateReport_DataTable_Component_Props {

    forceUpdate_Object: unknown

    projectSearchIds_AllForPage: Array<number>

    group_1_ProjectSearchIds_OR_SubSearchIds: Array<number>
    group_2_ProjectSearchIds_OR_SubSearchIds: Array<number>

    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
}

/**
 *
 */
interface ModPage_ZScore_ReplicateReport_DataTable_Component_State {

    forceReRender_Object?: unknown
}

/**
 *
 */
export class ModPage_ZScore_ReplicateReport_DataTable_Component extends React.Component< ModPage_ZScore_ReplicateReport_DataTable_Component_Props, ModPage_ZScore_ReplicateReport_DataTable_Component_State > {

    private readonly _volcanoPlot_1_Div_Ref :  React.RefObject<HTMLDivElement>
    private readonly _volcanoPlot_2_Div_Ref :  React.RefObject<HTMLDivElement>

    private _INTERNAL__Compute_SignificantMods_CombineReps__Result: INTERNAL__Compute_SignificantMods_CombineReps__Result

    private _dataTable_RootTableObject: DataTable_RootTableObject

    private _group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered: ReadonlySet<number>
    private _group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered: ReadonlySet<number>

    private _show_UpdatingMessage = false

    /**
     *
     */
    constructor( props: ModPage_ZScore_ReplicateReport_DataTable_Component_Props ) { try {

        super( props );

        this._volcanoPlot_1_Div_Ref = React.createRef();
        this._volcanoPlot_2_Div_Ref = React.createRef();

        const searchGroups = props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        this._group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered = searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set
        this._group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered = searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set

        this.state = { forceReRender_Object: {} };

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentWillUnmount() { try {

        try {
            if ( this._volcanoPlot_1_Div_Ref.current ) {

                Plotly.purge( this._volcanoPlot_1_Div_Ref.current )
            }
        } catch ( e ) {
            console.warn( "Failed to remove Plotly chart for this._volcanoPlot_1_Div_Ref.current. Error: ", e )
            //  Eat Error. NOT rethrow
        }

        try {
            if ( this._volcanoPlot_2_Div_Ref.current ) {

                Plotly.purge( this._volcanoPlot_2_Div_Ref.current )
            }
        } catch ( e ) {
            console.warn( "Failed to remove Plotly chart for this._volcanoPlot_2_Div_Ref.current. Error: ", e )
            //  Eat Error. NOT rethrow
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentDidMount() { try {

        this._compute_DataFor_NewTableData_ThenCallToDisplay()

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    componentDidUpdate( prevProps: Readonly<ModPage_ZScore_ReplicateReport_DataTable_Component_Props>, prevState: Readonly<ModPage_ZScore_ReplicateReport_DataTable_Component_State>, snapshot?: any ) { try {

        //  Compare Search Groups (Prev vs Current) for changes

        let searchGroupsDifferent = false

        const searchGroups = this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set !== this._group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered
            || searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set !== this._group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered ) {

            searchGroupsDifferent = true

        } else if ( searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size !== this._group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered.size
            || searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.size !== this._group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered.size ) {

            searchGroupsDifferent = true
        } else {

            for ( const projectSearchId_Or_SubSearchId of this._group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered ) {
                if ( ! searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                    searchGroupsDifferent = true
                    break
                }
            }
            for ( const projectSearchId_Or_SubSearchId of this._group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered ) {
                if ( ! searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set.has( projectSearchId_Or_SubSearchId ) ) {
                    searchGroupsDifferent = true
                    break
                }
            }
        }

        if ( searchGroupsDifferent ) {

            //  Search Groups changed so save new Search Groups

            this._group_1_ProjectSearchIds_Or_SubSearchIds_PrevRendered = searchGroups.group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set
            this._group_2_ProjectSearchIds_Or_SubSearchIds_PrevRendered = searchGroups.group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set
        }

        //  If Any changes, recompute data for table then display

        if ( searchGroupsDifferent
            || prevProps.forceUpdate_Object !== this.props.forceUpdate_Object
            ||  prevProps.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root !== this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root
            ||  prevProps.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager !== this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager
            ||  prevProps.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server !== this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
            ||  prevProps.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass !== this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
            ||  prevProps.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root !== this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        ) {
            //  Recompute data and display

            this._show_UpdatingMessage = true

            this.setState({ forceReRender_Object: {} })

            window.setTimeout( () => { try {

                this._compute_DataFor_NewTableData_ThenCallToDisplay()

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     */
    private _compute_DataFor_NewTableData_ThenCallToDisplay() {

        const result = _compute_SignificantMods_CombineReps({
            group_1_ProjectSearchIds_Or_SubSearchIds: this.props.group_1_ProjectSearchIds_OR_SubSearchIds,
            group_2_ProjectSearchIds_Or_SubSearchIds: this.props.group_2_ProjectSearchIds_OR_SubSearchIds,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root: this.props.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: this.props.modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        })

        if ( result.data ) {

            this._INTERNAL__Compute_SignificantMods_CombineReps__Result = result.data

            this._create_VolcanoPlot()

            this._dataTable_RootTableObject = _create_DataTable_Data(
                {
                    tableRows: result.data.tableRows,
                    group_1_ProjectSearchIds_Or_SubSearchIds: this.props.group_1_ProjectSearchIds_OR_SubSearchIds,
                    group_2_ProjectSearchIds_Or_SubSearchIds: this.props.group_2_ProjectSearchIds_OR_SubSearchIds,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                })

            this._show_UpdatingMessage = false

            this.setState({ forceReRender_Object: {} })

        } else if ( result.promise ) {
            result.promise.catch(reason => {})
            result.promise.then(value => { try {

                this._INTERNAL__Compute_SignificantMods_CombineReps__Result = value

                this._create_VolcanoPlot()

                this._dataTable_RootTableObject = _create_DataTable_Data(
                    {
                        tableRows: value.tableRows,
                        group_1_ProjectSearchIds_Or_SubSearchIds: this.props.group_1_ProjectSearchIds_OR_SubSearchIds,
                        group_2_ProjectSearchIds_Or_SubSearchIds: this.props.group_2_ProjectSearchIds_OR_SubSearchIds,
                        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: this.props.modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
                        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: this.props.modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                    })

                this._show_UpdatingMessage = false

                this.setState({ forceReRender_Object: {} })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("_compute_SignificantMods_CombineReps(...) result.  no data or promise")
        }
    }

    /**
     *
     */
    private _create_VolcanoPlot() {

        this._create_VolcanoPlot_Each({
            subtract_GroupRatios_Log2: true,
            domElement_ToPut_PlotIn: this._volcanoPlot_1_Div_Ref.current
        })


        this._create_VolcanoPlot_Each({
            subtract_GroupRatios_Log2: false,
            domElement_ToPut_PlotIn: this._volcanoPlot_2_Div_Ref.current
        })

    }


    /**
     *
     */
    private _create_VolcanoPlot_Each(
        {
            subtract_GroupRatios_Log2,
            domElement_ToPut_PlotIn
        } : {
            subtract_GroupRatios_Log2: boolean
            domElement_ToPut_PlotIn: HTMLDivElement
        }
    ) {

        const compute_Result = this._INTERNAL__Compute_SignificantMods_CombineReps__Result

        if ( ! domElement_ToPut_PlotIn ) {
            // NO DOM element to put volcano plot in
            return // EARLY RETURN
        }

        const _P_VALUE_SIGNIFICANT_LINE = 0.01

        const _P_VALUE_SIGNIFICANT_LINE__CHART_Y = -Math.log10( _P_VALUE_SIGNIFICANT_LINE )


        const chart_Entries: Array<{
            chart_X: number
            chart_Y: number

            chart_Marker_Label_Text: string
            chart_TooltipText: string

            pvalue_For_Chart_Y_Calculation: number  // Only when using p-value

            modMass: number

        }> = []

        // const _Z_SCORE_SIGNIFICANT_LINE = 2.576

        for ( const tableRow of compute_Result.tableRows ) {

            const psm_Or_Scan_Count_ForRatio_ALL_Groups = tableRow.psm_Or_Scan_Count_ForRatio_Group_1 + tableRow.psm_Or_Scan_Count_ForRatio_Group_2

            let chart_X: number = undefined

            if ( subtract_GroupRatios_Log2 ) {

                //  Add to handle Ratio of zero so log2 not result in infinity
                const addTo_GroupRatio = 1 / psm_Or_Scan_Count_ForRatio_ALL_Groups

                const groupRatio_1__Log2 = Math.log2( tableRow.groupRatio_1 + addTo_GroupRatio )
                const groupRatio_2__Log2 = Math.log2( tableRow.groupRatio_2 + addTo_GroupRatio )

                chart_X = groupRatio_2__Log2 - groupRatio_1__Log2

            } else {
                chart_X = tableRow.groupRatio_2 - tableRow.groupRatio_1
            }

            let chart_Y: number = undefined

            let tooltipText_Part: string = undefined

            let pvalue_For_Chart_Y_Calculation: number = undefined

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE ) {

                tooltipText_Part = "p-value: " + tableRow.pvalue.toExponential( 2 ) + "<br>"

                pvalue_For_Chart_Y_Calculation = tableRow.pvalue

                const _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST = Number.EPSILON / 2 // was 1.11e-16

                //  Following 'if' is ONLY for testing.  Was briefly used for testing.

                // if ( pvalue_For_Chart_Y_Calculation > 0 && pvalue_For_Chart_Y_Calculation <  _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST ) {
                //
                //     const msg = "Unexpected p-value value: ( pvalue_For_Chart_Y_Calculation > 0 && pvalue_For_Chart_Y_Calculation <  _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST ). p-value: " +
                //         pvalue_For_Chart_Y_Calculation +
                //         + ", _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST: " + _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST
                //     console.warn(msg)
                //     throw Error(msg)
                // }

                if ( pvalue_For_Chart_Y_Calculation === 0 ) {

                    pvalue_For_Chart_Y_Calculation = _ASSUMED_SMALLEST_NUMBER_FROM_JSTAT_TEST  // special for computing chart 'y' value
                }

                chart_Y = -Math.log10( pvalue_For_Chart_Y_Calculation )

            } else {

                tooltipText_Part = "zscore: " + tableRow.zscore.toFixed( 2 ) + "<br>"
                // +
                // "zscore (abs): " + Math.abs( tableRow.zscore ).toFixed( 2 ) + "<br>"

                chart_Y = Math.abs( tableRow.zscore )
            }

            const chart_TooltipText =
                "Mod mass: " + tableRow.modMass + "<br>" +
                tooltipText_Part +
                "group 1 ratio: " + tableRow.groupRatio_1.toExponential( 2 ) + "<br>" +
                "group 2 ratio: " + tableRow.groupRatio_2.toExponential( 2 ) + "<br>"

            chart_Entries.push( {
                chart_X,
                chart_Y,
                chart_Marker_Label_Text: undefined,
                chart_TooltipText,
                pvalue_For_Chart_Y_Calculation,
                modMass: tableRow.modMass
            } )
        }


        const chart_Data__AboveLine: {
            chart_X: Array<number>
            chart_Y: Array<number>
            chart_Marker_Label_Text: Array<string>
            chart_TooltipText: Array<string>
        } = {
            chart_X: [],
            chart_Y: [],
            chart_Marker_Label_Text: [],
            chart_TooltipText: []
        }

        const chart_Data__BelowLine: {
            chart_X: Array<number>
            chart_Y: Array<number>
            chart_Marker_Label_Text: Array<string>
            chart_TooltipText: Array<string>
        } = {
            chart_X: [],
            chart_Y: [],
            chart_Marker_Label_Text: [],
            chart_TooltipText: []
        }

        //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels

        //    Remove sorting and adding labels to specific points

        // chart_Entries.sort( ( a, b ) => {
        //     //  Sort on chart_Y descending, chart_X ascending, modMass ascending
        //     if ( a.chart_Y > b.chart_Y ) {
        //         return -1
        //     }
        //     if ( a.chart_Y < b.chart_Y ) {
        //         return 1
        //     }
        //     if ( a.chart_X < b.chart_X ) {
        //         return -1
        //     }
        //     if ( a.chart_X > b.chart_X ) {
        //         return 1
        //     }
        //     if ( a.modMass < b.modMass ) {
        //         return -1
        //     }
        //     if ( a.modMass > b.modMass ) {
        //         return 1
        //     }
        //     return 0
        // } )
        //
        // let max_Chart_Y: number = undefined
        //
        // if ( chart_Entries.length > 0 ) {
        //     max_Chart_Y = chart_Entries[ 0 ].chart_Y
        // }
        //
        // { //  Set chart_Marker_Label_Text to modMass for first 10 entries
        //
        //     let counter = 1;
        //
        //     for ( const chart_Entry of chart_Entries ) {
        //
        //         if ( counter > 10 && chart_Entry.chart_Y !== max_Chart_Y ) {
        //             //  Exit loop after 10 entries
        //             break
        //         }
        //
        //         chart_Entry.chart_Marker_Label_Text = chart_Entry.modMass.toString()
        //
        //         counter++
        //
        //     }
        // }

        for ( const chart_Entry of chart_Entries ) {

            if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE ) {

                if ( chart_Entry.pvalue_For_Chart_Y_Calculation < _P_VALUE_SIGNIFICANT_LINE ) {

                    chart_Data__AboveLine.chart_X.push( chart_Entry.chart_X )
                    chart_Data__AboveLine.chart_Y.push( chart_Entry.chart_Y )

                    chart_Data__AboveLine.chart_TooltipText.push( chart_Entry.chart_TooltipText )

                    //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels
                    // chart_Data__AboveLine.chart_Marker_Label_Text.push( chart_Entry.chart_Marker_Label_Text )

                } else {

                    chart_Data__BelowLine.chart_X.push( chart_Entry.chart_X )
                    chart_Data__BelowLine.chart_Y.push( chart_Entry.chart_Y )

                    chart_Data__BelowLine.chart_TooltipText.push( chart_Entry.chart_TooltipText )

                    //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels
                    chart_Data__BelowLine.chart_Marker_Label_Text.push( chart_Entry.chart_Marker_Label_Text )
                }
            } else {

                chart_Data__AboveLine.chart_X.push( chart_Entry.chart_X )
                chart_Data__AboveLine.chart_Y.push( chart_Entry.chart_Y )

                chart_Data__AboveLine.chart_TooltipText.push( chart_Entry.chart_TooltipText )

                //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels
                // chart_Data__AboveLine.chart_Marker_Label_Text.push( chart_Entry.chart_Marker_Label_Text )
            }
        }


        let chart_Data__AboveLine_PlotlyTrace_TraceName = "Significant"
        let chart_Data__AboveLine_PlotlyTrace_Color = "red"

        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE ) {

            chart_Data__AboveLine_PlotlyTrace_TraceName = "Mod Masses"
        }


        const _PLOTLY_MARKER_SIZE = 12 // default 6 per https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size

        const _PLOTLY_MARKER_OPACITY = .5

        const chart_Data__AboveLine_PlotlyTrace = {

            name: chart_Data__AboveLine_PlotlyTrace_TraceName,
            type: 'scatter',
            mode: 'markers+text', // Include markers and text
            marker: {
                size: _PLOTLY_MARKER_SIZE, //   https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                color: chart_Data__AboveLine_PlotlyTrace_Color,
                opacity: _PLOTLY_MARKER_OPACITY
                // symbol: "x" // https://plotly.com/javascript/reference/scattergl/#scattergl-marker-symbol
            },
            // xaxis: {
            //     range: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ]
            // },
            // yaxis: {
            //     range: [ ms1_ChartData.chart_Y_Min, ms1_ChartData.chart_Y_Max ]
            // },
            x: chart_Data__AboveLine.chart_X,
            y: chart_Data__AboveLine.chart_Y,

            //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels
            // text: chart_Data__AboveLine.chart_Marker_Label_Text,
            // textposition: 'top center', // Position of the labels (e.g., 'top center', 'bottom left')

            hovertext: chart_Data__AboveLine.chart_TooltipText,
            hoverinfo: 'text',
            // 'hovertemplate' is INCORRECT. Needs changing if used.
            // hovertemplate: //  Added '<extra></extra>' to remove secondary box with trace name
            //     // Remove this line: '<b>MS' + MS_2_Plus_PrecursorData_ScanLevel_String + ' data for PSM</b>' +
            //     '<br><b>m/z</b>: %{y}' +
            //     '<br><b>Retention Time</b>: %{x}<extra></extra>'
        }

        const chart_Data__BelowLine_PlotlyTrace = {

            name: "Not Significant",
            type: 'scatter',
            mode: 'markers+text', // Include markers and text
            marker: {
                size: _PLOTLY_MARKER_SIZE, //   https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                color: "gray",
                opacity: _PLOTLY_MARKER_OPACITY
                // symbol: "x" // https://plotly.com/javascript/reference/scattergl/#scattergl-marker-symbol
            },
            // xaxis: {
            //     range: [ ms1_ChartData.chart_X_Min, ms1_ChartData.chart_X_Max ]
            // },
            // yaxis: {
            //     range: [ ms1_ChartData.chart_Y_Min, ms1_ChartData.chart_Y_Max ]
            // },
            x: chart_Data__BelowLine.chart_X,
            y: chart_Data__BelowLine.chart_Y,

            //  Remove Setting chart_Marker_Label_Text since Plotly has NO logic to prevent labels from overlapping labels
            // text: chart_Data__BelowLine.chart_Marker_Label_Text,
            // textposition: 'top center', // Position of the labels (e.g., 'top center', 'bottom left')

            hovertext: chart_Data__BelowLine.chart_TooltipText,
            hoverinfo: 'text',
            // 'hovertemplate' is INCORRECT. Needs changing if used.
            // hovertemplate: //  Added '<extra></extra>' to remove secondary box with trace name
            //     // Remove this line: '<b>MS' + MS_2_Plus_PrecursorData_ScanLevel_String + ' data for PSM</b>' +
            //     '<br><b>m/z</b>: %{y}' +
            //     '<br><b>Retention Time</b>: %{x}<extra></extra>'
        }

        // Total Chart Data

        //  Plot "Below" first so if an Above dot and Below dot overlap the Above will be on top

        const chart_Data: Array<any> = []


        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE ) {

            chart_Data.push( chart_Data__BelowLine_PlotlyTrace )
        }

        chart_Data.push( chart_Data__AboveLine_PlotlyTrace )


        ///////

        //  General Chart

        const _CHART_WIDTH = 600
        const _CHART_HEIGHT = 600

        let chartTitle_PValue_ZScore_Label = "P-value"

        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE ) {
            chartTitle_PValue_ZScore_Label = "Z-score"
        }

        let chartTitle_Log2_Difference_Label = "Log2-Fold Change"

        if ( ! subtract_GroupRatios_Log2 ) {
            chartTitle_Log2_Difference_Label = "Difference of Ratios"
        }

        const chartTitle = "Volcano Plot: " + chartTitle_PValue_ZScore_Label + " vs/ " + chartTitle_Log2_Difference_Label

        let chart_X_Axis_Label = "log2-fold change of ratios"

        if ( ! subtract_GroupRatios_Log2 ) {
            chart_X_Axis_Label = "difference of ratios"
        }

        let chart_Y_Axis_Label = "-log10(p-value)"

        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE ) {

            chart_Y_Axis_Label = "abs(z-score)"
        }

        const showlegend_Local = true

        const chart_Layout: any = {
            title:{
                text: chartTitle
            },
            autosize: false,
            width: _CHART_WIDTH,
            height: _CHART_HEIGHT,
            xaxis: {
                title: {
                    text: chart_X_Axis_Label
                },
                // range: [ retentionTimeSeconds_Range_ForChart_Min / 60, retentionTimeSeconds_Range_ForChart_Max / 60 ],

                exponentformat: 'e'  // https://plotly.com/javascript/tick-formatting/#using-exponentformat
            },
            yaxis: {
                title: {
                    text: chart_Y_Axis_Label
                },
                exponentformat: 'e'
            },
            showlegend: showlegend_Local,
            legend: {
                traceorder: "reversed"  // reverse so "Above" is shown first in the legend.  "Below" trace is first in chart data so that overlapping dots will have "Above on top.
            }

        }


        if ( this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE ) {

            chart_Layout.shapes = [ {
                name: _P_VALUE_SIGNIFICANT_LINE,    //  Shown in legend
                showlegend: true,           //  Add to legend.  requires min Plotly version 2.27.0
                type: 'line',
                xref: 'paper',
                yref: 'y',
                x0: 0,
                x1: 1,
                // x0: chart_X_MIN,
                y0: _P_VALUE_SIGNIFICANT_LINE__CHART_Y,
                // x1: chart_X_MAX,
                // yref: 'paper',
                y1: _P_VALUE_SIGNIFICANT_LINE__CHART_Y,
                line: {
                    color: 'black',
                    width: 1.5,
                    dash: 'dot'
                }
            } ]
        } else {

            // chart_Layout.shapes = [ {
            //     name: _Z_SCORE_SIGNIFICANT_LINE,    //  Shown in legend
            //     showlegend: true,           //  Add to legend.  requires min Plotly version 2.27.0
            //     type: 'line',
            //     xref: 'paper',
            //     yref: 'y',
            //     x0: 0,
            //     x1: 1,
            //     // x0: chart_X_MIN,
            //     y0: _Z_SCORE_SIGNIFICANT_LINE,
            //     // x1: chart_X_MAX,
            //     // yref: 'paper',
            //     y1: _Z_SCORE_SIGNIFICANT_LINE,
            //     line: {
            //         color: 'black',
            //         width: 1.5,
            //         dash: 'dot'
            //     }
            // } ]
        }



        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: domElement_ToPut_PlotIn });

        const newPlotResulting_Promise = Plotly.newPlot(
            domElement_ToPut_PlotIn,
            chart_Data,
            chart_Layout,
            chart_config
        )

    }



    /**
     *
     */
    render() {

        return (

            <div>
                <div>
                    Significance Metric:

                    <span> </span>
                    <label>
                        <input
                            type="radio"
                            name="ModPage_ZScore_ReplicateReport_DataTable_Component__p-value-zscore-radio-button"
                            checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE }
                            onChange={ ( event: React.ChangeEvent<HTMLElement> ) => {
                                try {
                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_significance_metric_chart_type( ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.ZSCORE )

                                    this._create_VolcanoPlot()

                                    this.setState( { forceReRender_Object: {} } )
                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            } }
                        />
                        Z-score
                    </label>
                    <span> </span>
                    <label>
                        <input
                            type="radio"
                            name="ModPage_ZScore_ReplicateReport_DataTable_Component__p-value-zscore-radio-button"
                            checked={ this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_significance_metric_chart_type() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE }
                            onChange={ ( event: React.ChangeEvent<HTMLElement> ) => {
                                try {
                                    this.props.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.set_significance_metric_chart_type( ModViewPage_DataVizOptions_VizSelections_PageStateManager__SIGNIFICANCE_METRIC_CHART_TYPE_Values_PValue_Zscore_Enum.PVALUE )

                                    this._create_VolcanoPlot()

                                    this.setState( { forceReRender_Object: {} } )
                                } catch ( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
                                    throw e
                                }
                            } }
                        />
                        P-value
                    </label>
                </div>

                <div style={ { position: "relative", width: "fit-content" } }>

                    <div
                        style={ { display: "flex", flexWrap: "wrap" } }
                    >
                        {/*  Div to hold Volcano Plot - Plotly  */ }
                        <div
                            ref={ this._volcanoPlot_1_Div_Ref }
                            style={ { flexGrow: 0, flexShrink: 0 } }
                        >
                        </div>
                        {/*  Div to hold Volcano Plot - Plotly  */ }
                        <div
                            ref={ this._volcanoPlot_2_Div_Ref }
                            style={ { flexGrow: 0, flexShrink: 0 } }
                        >
                        </div>
                    </div>

                    { ! this._dataTable_RootTableObject ? (
                        <div>
                            Loading Data
                        </div>
                    ) : (
                        <DataTable_TableRoot tableObject={ this._dataTable_RootTableObject }/>
                    ) }

                    {/*   "Updating Message" Cover <div>  */ }

                    { this._show_UpdatingMessage ? (
                        <div className=" block-updating-overlay-container ">
                            Updating
                        </div>
                    ) : null }
                </div>

            </div>
        )
    }
}


////////////////

///////////    Functions NOT in the Class



const _create_DataTable_Data = function (
    {
        tableRows,
        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,
        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
    } : {
        tableRows: INTERNAL_TableRow[]

        group_1_ProjectSearchIds_Or_SubSearchIds : Array<number>
        group_2_ProjectSearchIds_Or_SubSearchIds : Array<number>

        modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function: ModPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function

    }): DataTable_RootTableObject {

    let processing_SubSearches = false

    let searchSubGroups_ForProjectSearchId: SearchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry = undefined
    {
        const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()
        if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            processing_SubSearches = true

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length !== 1 ) {
                throw Error("if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND if ( projectSearchIds_AllForPage.length !== 1 ) {")
            }

            const projectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
            if ( ! searchSubGroups_Root ) {
                throw Error( "if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING" )
            }
            searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                throw Error("searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING")
            }
        }
    }

    const dataTableId_ThisTable = "Mod View ZScore Table";

    const dataTableColumns : Array<DataTable_Column> = [];
    const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

    const psmQuantType = (
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )
    const quantTypeString = psmQuantType ? 'PSM' : 'Scan';

    let group_1_ColumnHeader_Addition = " Group 1"
    let group_2_ColumnHeader_Addition = " Group 2"

    if ( group_1_ProjectSearchIds_Or_SubSearchIds.length === 1 && group_2_ProjectSearchIds_Or_SubSearchIds.length === 1 ) {

        //  Both groups have ONE search or sub search

        const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()

        if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

            //  Put the sub search label in the column header

            if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage.length !== 1 ) {
                const msg = "if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND ( projectSearchIds_AllForPage.length !== 1 )"
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.projectSearchIds_AllForPage[ 0 ]

            const searchSubGroups_Root = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
            if ( ! searchSubGroups_Root ) {
                const msg = "if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND dataPageStateManager.get_SearchSubGroups_Root() returned NOTHING"
                console.warn(msg)
                throw Error(msg)
            }
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) { AND searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            {
                const subSearchId = group_1_ProjectSearchIds_Or_SubSearchIds[ 0 ]

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )

                group_1_ColumnHeader_Addition = " (" + searchSubGroup.subgroupName_Display + ")"
            }

            {
                const subSearchId = group_2_ProjectSearchIds_Or_SubSearchIds[ 0 ]

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )

                group_2_ColumnHeader_Addition = " (" + searchSubGroup.subgroupName_Display + ")"
            }

        } else {

            //  Put the search id in the column header

            {
                const projectSearchId = group_1_ProjectSearchIds_Or_SubSearchIds[ 0 ]

                const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                group_1_ColumnHeader_Addition = " (" + searchData_For_ProjectSearchId.searchId + ")"
            }

            {
                const projectSearchId = group_2_ProjectSearchIds_Or_SubSearchIds[ 0 ]

                const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                group_2_ColumnHeader_Addition = " (" + searchData_For_ProjectSearchId.searchId + ")"
            }
        }
    }

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

    {
        const displayName = "Residues";

        const dataTableColumn = new DataTable_Column({
            id : "Residues", // Used for tracking sort order. Keep short
            displayName,
            width : 100,
            sortable : false
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    const quantTypeString_With_Count_String = quantTypeString + " Count"

    {
        const displayName = quantTypeString_With_Count_String + " " + group_1_ColumnHeader_Addition;

        let searchesOrSubSearches_Label_String = "Searches"

        const searchName_Or_SubSearchLabels: Array<JSX.Element> = []

        if ( processing_SubSearches ) {

            searchesOrSubSearches_Label_String = "Sub searches"

            for ( const subSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )
                if ( ! searchSubGroup ) {
                    throw Error("searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId ) returned NOTHING for subSearchId: " + subSearchId )
                }

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )
            }

        } else {

            for ( const projectSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {

                const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchData_For_ProjectSearchId.projectSearchId }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchData_For_ProjectSearchId.searchId }) { searchData_For_ProjectSearchId.name }
                    </li>
                )
            }
        }

        const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => (
            <div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    { quantTypeString_With_Count_String }
                </div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    Group 1 { searchesOrSubSearches_Label_String }:
                </div>
                <div>
                    <ul>
                        { searchName_Or_SubSearchLabels }
                    </ul>
                </div>
            </div>
        )

        const dataTableColumn = new DataTable_Column( {
            id: "count_1", // Used for tracking sort order. Keep short
            displayName,
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
            width : 85,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = quantTypeString_With_Count_String + " " + group_2_ColumnHeader_Addition;

        let searchesOrSubSearches_Label_String = "Searches"

        const searchName_Or_SubSearchLabels: Array<JSX.Element> = []

        if ( processing_SubSearches ) {

            searchesOrSubSearches_Label_String = "Sub searches"

            for ( const subSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {

                const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )
                if ( ! searchSubGroup ) {
                    throw Error("searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId ) returned NOTHING for subSearchId: " + subSearchId )
                }

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchSubGroup.subgroupName_Display }) { searchSubGroup.searchSubgroupName_fromImportFile }
                    </li>
                )
            }

        } else {

            for ( const projectSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {

                const searchData_For_ProjectSearchId = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                searchName_Or_SubSearchLabels.push(
                    <li
                        key={ searchData_For_ProjectSearchId.projectSearchId }
                        style={ { marginBottom: 8 } }
                    >
                        ({ searchData_For_ProjectSearchId.searchId }) { searchData_For_ProjectSearchId.name }
                    </li>
                )
            }
        }

        const columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element = () : JSX.Element => (
            <div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    { quantTypeString + " Count " }
                </div>
                <div style={ { fontWeight: "bold", marginBottom: 6 } }>
                    Group 2 { searchesOrSubSearches_Label_String }:
                </div>
                <div>
                    <ul>
                        { searchName_Or_SubSearchLabels }
                    </ul>
                </div>
            </div>
        )

        const dataTableColumn = new DataTable_Column( {
            id: "count_2", // Used for tracking sort order. Keep short
            displayName,
            columnHeader_Tooltip_Fcn_NoInputParam_Return_JSX_Element,
            width : 85,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "z-score";

        const dataTableColumn = new DataTable_Column({
            id : "z-score", // Used for tracking sort order. Keep short
            displayName,
            width : 130,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "p-value";

        const dataTableColumn = new DataTable_Column({
            id : "p-value", // Used for tracking sort order. Keep short
            displayName,
            width : 130,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    {
        const displayName = "rank";

        const dataTableColumn = new DataTable_Column({
            id : "rank", // Used for tracking sort order. Keep short
            displayName,
            width : 75,
            sortable : true
        });
        dataTableColumns.push( dataTableColumn );

        const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
    }

    /////////////////

    //  Populate dataTableRows

    const dataTableRows : Array<DataTable_DataRowEntry> = [];


    for ( const tableRow of tableRows ) {

        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
        const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

        {
            const valueDisplay = tableRow.modMass.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.modMass
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const modMass = tableRow.modMass

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

        const modMass = tableRow.modMass

        const data_For_ModMass = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root.get_Data_For_ModMass( modMass )

        {  // add modded residues

            const valueDisplay = Array.from( data_For_ModMass.modifiedResidues ).sort().join(', ');
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.count_1.toLocaleString()
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.count_1
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }
        {
            const valueDisplay = tableRow.count_2.toLocaleString()
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.count_2
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        //  The 'tableRow.zscore' and 'tableRow.pvalue' may be set to filtered based on user input

        {
            const valueDisplay = tableRow.zscore.toFixed( 2 );
            const searchEntriesForColumn: Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
            const columnEntry = new DataTable_DataRow_ColumnEntry( {
                searchTableData,
                valueDisplay,
                valueSort: tableRow.zscore
            } );
            columnEntries.push( columnEntry );

            const valueDisplay_Download = tableRow.zscore.toString()

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay_Download } )
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.pvalue.toExponential( 2 );
            const searchEntriesForColumn: Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData( { searchEntriesForColumn } )
            const columnEntry = new DataTable_DataRow_ColumnEntry( {
                searchTableData,
                valueDisplay,
                valueSort: tableRow.pvalue
            } );
            columnEntries.push( columnEntry );

            const valueDisplay_Download = tableRow.pvalue.toString()

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn( { cell_ColumnData_String: valueDisplay_Download } )
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }

        {
            const valueDisplay = tableRow.rank.toString();
            const searchEntriesForColumn : Array<string> = [ valueDisplay ]
            const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                searchTableData,
                valueDisplay,
                valueSort : tableRow.rank
            });
            columnEntries.push( columnEntry );

            const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
            dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
        }


        const dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject : DataTable_DataRowEntry__GetChildTableData_Return_Promise_DataTable_RootTableObject =
            ( params : DataTable_DataRowEntry__GetChildTableData_CallbackParams ) : Promise<DataTable_RootTableObject> => {

                return modPage_get_ZScore_Tab_GroupsFor_SingleModMass_SubTable({
                    data_For_ModMass,
                    modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root,

                    quantTypeString_With_Count_String,

                    group_1_ProjectSearchIds_Or_SubSearchIds,
                    group_2_ProjectSearchIds_Or_SubSearchIds,

                    group_1_CountValue: tableRow.count_1,
                    group_2_CountValue: tableRow.count_2,

                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,

                    modPage_MainContent_SingleProtein_proteinName_Clicked_Callback_Function
                })
            };

        const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

        // add this row to the rows
        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : tableRow.modMass,
            sortOrder_OnEquals : tableRow.modMass,
            columnEntries,
            dataTable_DataRowEntry_DownloadTable,
            dataRow_GetChildTableData_Return_Promise_DataTable_RootTableObject
        })

        dataTableRows.push( dataTable_DataRowEntry );
    }

    const dataTable_Download_Content_PrefixLines: Array<string> = []

    {
        dataTable_Download_Content_PrefixLines.push( "# ZScore Data" )

        //  Blank line
        dataTable_Download_Content_PrefixLines.push( "#" )

        const searchName_IndentSpaces = " ".repeat( 10 ) //  Indent the # of spaces in the 'repeat'

        if ( processing_SubSearches ) {

            { //  Group 1 sub searches
                dataTable_Download_Content_PrefixLines.push( "#   Group 1 sub searches" )

                for ( const subSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {

                    const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )

                    dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile )
                }
            }

            { //  Group 2 sub searches
                dataTable_Download_Content_PrefixLines.push( "#   Group 2 sub searches" )

                for ( const subSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {
                    const searchSubGroup = searchSubGroups_ForProjectSearchId.get_searchSubGroup_For_SearchSubGroup_Id( subSearchId )
                    dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile )
                }
            }

        } else {

            { //  Group 1 searches
                dataTable_Download_Content_PrefixLines.push( "#   Group 1 searches" )

                for ( const projectSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {
                    const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                        projectSearchId,
                        dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                    } )
                    dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + searchNameForProjectSearchId )
                }
            }

            { //  Group 2 searches
                dataTable_Download_Content_PrefixLines.push( "#   Group 2 searches" )

                for ( const projectSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {
                    const searchNameForProjectSearchId = modPage_GetSearchNameForProjectSearchId( {
                        projectSearchId,
                        dataPageStateManager_DataFrom_Server: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.dataPageStateManager_DataFrom_Server
                    } )
                    dataTable_Download_Content_PrefixLines.push( "#" + searchName_IndentSpaces + searchNameForProjectSearchId )
                }
            }
        }
        //  Blank line
        dataTable_Download_Content_PrefixLines.push( "#" )
    }

    // assemble the table
    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTableColumns,
        columns_tableDownload : dataTable_Column_DownloadTable_Entries,
        dataTable_DataRowEntries: dataTableRows,
        download_Content_PrefixLines: dataTable_Download_Content_PrefixLines
    });

    const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject
}


/////////////////////////////////

class INTERNAL__Compute_SignificantMods_CombineReps__Result {
    tableRows: Array<INTERNAL_TableRow>
}

/**
 *
 */
const _compute_SignificantMods_CombineReps = function (
    {
        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,

        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass,
    } : {
        group_1_ProjectSearchIds_Or_SubSearchIds: Array<number>
        group_2_ProjectSearchIds_Or_SubSearchIds: Array<number>

        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
    }
) : {
    data: INTERNAL__Compute_SignificantMods_CombineReps__Result
    promise: Promise<INTERNAL__Compute_SignificantMods_CombineReps__Result>
} {

    /////////

    let computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root

    //  ONLY for PSM Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result

    //  ONLY for Scans Ratios
    let modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result

    const promises: Array<Promise<void>> = []

    //  Call 'modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable' with 'override_UserInput...' to get specific results

    const modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable(
        {
            override_UserInput_For_PsmQuant_ToUse_Counts_Boolean: true,
            override_UserInput_For_DataTransformation_ToUse_NONE_Boolean: true,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root: modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass
        } )

    if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.data ) {

        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio = modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.data

    } else if ( modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise ) {
        const promise = new Promise<void>( (resolve, reject) => { try {
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise.catch(reason => { reject(reason)})
            modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs.promise.then(value => { try {
                computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio = value
                resolve()
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        promises.push( promise )
    } else {
        throw Error( "modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ExecutedWith_OverrideUserInputs no 'data' or 'promise" )
    }

    if ( ! all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSM Quant is Ratio AND QuantType is PSMs.  Need Total PSM Count per Project SearchId

            {
                const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

                const getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result =
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.getPsmCount_ForRatiosDenominator_For_ProjectSearchIds( projectSearchIds )

                if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data ) {
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.data
                } else if ( getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise ) {
                    const promise = new Promise<void>( (resolve, reject) => { try {
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                        getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result.promise.then(value => { try {
                            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result = value
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push( promise )
                } else {
                    throw Error("getPsmCount_ForRatiosDenominator_For_ProjectSearchIds_Result no 'data' or 'promise'")
                }
            }

        } else if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  PSM Quant is Ratio AND QuantType is Scans.  Need Total Scan Count per Project SearchId for computing Total Count of: Scan Number / Search Scan File Id Pair Count

            const projectSearchIds = Array.from( modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ProjectSearchId_ForUseWhereRequire_projectSearchId_AcrossAllModMasses() )

            const getScanCount_For_ProjectSearchIds_Result =
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass.get_ScanNumber_SearchScanFileId_Pair_Unique_Count__ForRatiosDenominator__Map_Key_ProjectSearchId_For_ProjectSearchIds( projectSearchIds )

            if ( getScanCount_For_ProjectSearchIds_Result.data ) {
                modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = getScanCount_For_ProjectSearchIds_Result.data
            } else if ( getScanCount_For_ProjectSearchIds_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    getScanCount_For_ProjectSearchIds_Result.promise.catch(reason => { reject(reason)})
                    getScanCount_For_ProjectSearchIds_Result.promise.then(value => { try {
                        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result = value
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push( promise )
            } else {
                throw Error("getScanCount_For_ProjectSearchIds_Result no 'data' or 'promise'")
            }
        }
    }

    if ( promises.length === 0 ) {

        const result = _modPage_View_SignificantMods_CombineReps_After_GetData({
            group_1_ProjectSearchIds_Or_SubSearchIds,
            group_2_ProjectSearchIds_Or_SubSearchIds,
            computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
            modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
            modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
            all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
        })

        return {                    // EARLY RETURN
            promise: undefined,
            data: result
        }
    }

    const promisesAll = Promise.all(promises)

    return {
        data: undefined,
        promise: new Promise<{tableRows: Array<INTERNAL_TableRow>}>( (resolve, reject) => { try {

            promisesAll.catch(reason => { reject(reason) })
            promisesAll.then(novalue => { try {

                const result = _modPage_View_SignificantMods_CombineReps_After_GetData({
                    group_1_ProjectSearchIds_Or_SubSearchIds,
                    group_2_ProjectSearchIds_Or_SubSearchIds,
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
                    modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
                    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
                })

                resolve(result)

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
}

/////////////

/**
 *
 */
const _modPage_View_SignificantMods_CombineReps_After_GetData = function (
    {
        group_1_ProjectSearchIds_Or_SubSearchIds,
        group_2_ProjectSearchIds_Or_SubSearchIds,
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result,
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result,
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    } : {
        group_1_ProjectSearchIds_Or_SubSearchIds : Array<number>
        group_2_ProjectSearchIds_Or_SubSearchIds : Array<number>
        computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root
        modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root : ModViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Or_SubSearchId_PerformingFiltering_Result_Root
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_or_SubSearchIds_Result
        modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result: ModViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_or_SubSearchIds_Result
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
    }
): {
    tableRows: Array<INTERNAL_TableRow>
} {

    const psmQuantType = (
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === undefined ||
        all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms
    )


    const resultsArray: Array<INTERNAL_TableRow> = []

    let filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId: Map<number, number> = undefined

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.psms ) {

            //  PSMs  quantType

            filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_PsmId_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_PsmId_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {

                if ( filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.has( result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId ) ) {
                    const msg = "PSMs  quantType: filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ALREADY has entry for result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId: " + result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.uniquePsmIdCount_AcrossAllModMasses_And_UnmodifiedPSMs_WhenNoModMassMinMaxFilters
                )
            }

        } else if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType()
            === ModViewPage_DataVizOptions_VizSelections_PageStateManager__QUANT_TYPE_Values_Enum.scans ) {

            //  Scans  quantType

            filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId = new Map()

            const resultRoot =
                modPage_Compute_Total_Scan_Counts_Per_ProjectSearchId_Or_SubSearchId_From_ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_Root({
                    computeData_For_ModMassViz_And_TopLevelTable_Result_Root: computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio,
                    modViewPage_DataVizOptions_VizSelections_PageStateManager: all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager
                })
            for ( const result_Single_ProjectSearchId_Or_SubSearchId of resultRoot.result_Total_Scan_Counts_For_Single_ProjectSearchId_Or_SubSearchId_Map_Key_ProjectSearchId_Or_SubSearchId.values() ) {

                if ( filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.has( result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId ) ) {
                    const msg = "Scans  quantType: filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ALREADY has entry for result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId: " + result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.set(
                    result_Single_ProjectSearchId_Or_SubSearchId.projectSearchId_Or_SubSearchId,
                    result_Single_ProjectSearchId_Or_SubSearchId.unique_ScanNumber_SearchScanFileId_Pair_Count_AcrossAllModMasses_And_ForUnmodifiedPSMs_WhenNoModMassMinMaxFilters
                )
            }

        } else {
            throw Error("modViewPage_DataVizOptions_VizSelections_PageStateManager.get_quantType() is NOT 'psms' or 'scans'" )
        }
    }


    const combinedModMap__GROUP_KEY_1 = 1
    const combinedModMap__GROUP_KEY_2 = 2

    // combine psm counts for reps into single row in new mod map
    const combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass: Map<number, Map<number, number>> = new Map();

    for ( const result_ForSingle_ModMass of computeData_For_ModMassViz_And_TopLevelTable_Result_Root__Special_Override_PsmQuant_ToUse_Counts_NotRatio.get_Data_AllValues() ) {

        const combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2: Map<number, number> = new Map()

        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2.set( combinedModMap__GROUP_KEY_1, topLevelTable_DisplayValue_Summed )
        }
        {
            let topLevelTable_DisplayValue_Summed = 0

            for ( const projectSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {

                const data_For__ProjectSearchId_Or_SubSearchId = result_ForSingle_ModMass.get_For__ProjectSearchId_Or_SubSearchId( projectSearchId )
                if ( data_For__ProjectSearchId_Or_SubSearchId ) {

                    topLevelTable_DisplayValue_Summed += data_For__ProjectSearchId_Or_SubSearchId.topLevelTable_DisplayValue
                }
            }

            combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2.set( combinedModMap__GROUP_KEY_2, topLevelTable_DisplayValue_Summed )
        }

        combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.set( result_ForSingle_ModMass.modMass, combinedModMap__PsmCount_Or_ScanCount_Map_Key_Group_1_or_2 )
    }

    // get combined total psm count for each rep group, and ALL Together

    let psm_Or_Scan_Count_Group_1: number = undefined
    let psm_Or_Scan_Count_Group_2: number = undefined

    if ( ! all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        psm_Or_Scan_Count_Group_1 = 0;
        psm_Or_Scan_Count_Group_2 = 0;

        for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {

            let countForSearch: number = undefined

            if ( psmQuantType ) {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set.   AFTER: if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId_Or_SubSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {

                    const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()
                    if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                        //  With Sub Searches, if there is NO data for that SubSearch then there will be NO entry in the map so set to zero
                        countForSearch = 0
                    } else {
                        throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_Or_SubSearchId ) returned undefined or null for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
                    }
                }
            } else {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set.  AFTER if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {" )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId_Or_SubSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {

                    const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()
                    if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                        //  With Sub Searches, if there is NO data for that SubSearch then there will be NO entry in the map so set to zero
                        countForSearch = 0
                    } else {
                        throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ResultsFrom_FiltersAndOptionsCollapsibleBlock_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_Or_SubSearchId ) returned undefined or null for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
                    }
                }
            }

            psm_Or_Scan_Count_Group_1 += countForSearch
        }

        for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {

            let countForSearch: number = undefined

            if ( psmQuantType ) {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds ) {': in 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result is NOT set.  AFTER if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId_Or_SubSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {

                    const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()
                    if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                        //  With Sub Searches, if there is NO data for that SubSearch then there will be NO entry in the map so set to zero
                        countForSearch = 0
                    } else {
                        throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds ) {': in 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__PsmCount_For_ProjectSearchIds_Result.psmCount_Map_Key_ProjectSearchId.get( projectSearchId_Or_SubSearchId ) returned undefined or null for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
                    }
                }
            } else {
                if ( ! modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result ) {
                    throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )': modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result is NOT set.  AFTER  if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) { " )
                }
                countForSearch = modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId_or_SubSearchId.get( projectSearchId_Or_SubSearchId )
                if ( countForSearch === undefined || countForSearch === null ) {

                    const searchGroups = all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_Selections().get_SearchGroups()
                    if ( searchGroups.projectSearchIds_Or_SubSearchIds_Enum === ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS ) {

                        //  With Sub Searches, if there is NO data for that SubSearch then there will be NO entry in the map so set to zero
                        countForSearch = 0
                    } else {
                        throw Error( "In 'for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds ) {': in 'else' of 'if ( psmQuantType )':  modViewPage_ContainerFor_ContentsTo_Compute_TotalPsmCountAndTotalScansCount_For_Ratios_ContainerClass__ScanCount_For_ProjectSearchIds_Result.scanNumber_SearchScanFileId_Pair_Unique_Count__Map_Key_ProjectSearchId.get( projectSearchId_Or_SubSearchId ) returned undefined or null for projectSearchId_Or_SubSearchId: " + projectSearchId_Or_SubSearchId )
                    }
                }
            }

            psm_Or_Scan_Count_Group_2 += countForSearch
        }
    }

    // get combined filtered psm count for each rep group
    let filtered_Psm_Or_Scan_Count_1 = undefined
    let filtered_Psm_Or_Scan_Count_2 = undefined

    if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

        if ( ! filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ) {
            throw Error("if ( ! filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId ) {   AFTER 'let filtered_Psm_Or_Scan_Count_2 = undefined'")
        }

        filtered_Psm_Or_Scan_Count_1 = 0;
        filtered_Psm_Or_Scan_Count_2 = 0;

        for ( const projectSearchId_Or_SubSearchId of group_1_ProjectSearchIds_Or_SubSearchIds ) {
            const n = filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId );
            if ( n ) {
                filtered_Psm_Or_Scan_Count_1 += n;
            }
        }
        for ( const projectSearchId_Or_SubSearchId of group_2_ProjectSearchIds_Or_SubSearchIds ) {
            const n = filtered_Psm_Or_Scan_Count_Map_Key_ProjectSearchId_Or_SubSearchId.get( projectSearchId_Or_SubSearchId );
            if ( n ) {
                filtered_Psm_Or_Scan_Count_2 += n;
            }
        }
    }

    //     //  TESTING ONLY:  This variable 'TESTING__DataToLog_Lines'   ONLY for creating an output to 'console' for showing intermediate results
    //
    // const TESTING__DataToLog_Lines: Array<string> = []
    //
    //
    // TESTING__DataToLog_Lines.push( [
    //     "Mod Mass", "count_1", "count_2",
    //     "z-score", "z-score numerator", "z-score denominator",
    //     "z-score x1", "z-score n1", "z-score x2", "z-score n2",
    //     "p-value", "p-value x1", "p-value n1", "p-value x2", "p-value n2",
    //     "filtered z-score", "filtered z-score numerator", "filtered z-score denominator",
    //     "filtered z-score x1", "filtered z-score n1", "filtered z-score x2", "filtered z-score n2",
    //     "filtered p-value", "filtered p-value x1", "filtered p-value n1", "filtered p-value x2", "filtered p-value n2"
    // ].join("\t") )


    const sortedModMasses = modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_Root.get_ModMass_Values_OrderedArray()

    for ( const modMass of sortedModMasses ) {

        let x_1 = combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.get( modMass )?.get( combinedModMap__GROUP_KEY_1 );
        if (x_1 === undefined) {
            x_1 = 0;
        }

        let x_2 = combinedModMap__PsmCount_Map_Key_Group_1_or_2_Map_Key_ModMass.get( modMass )?.get( combinedModMap__GROUP_KEY_2 );
        if (x_2 === undefined) {
            x_2 = 0;
        }

        let zscore: number = undefined
        let pvalue: number = undefined

        let filteredZscore: number = undefined
        let filteredPvalue: number = undefined

        let psm_Or_Scan_Count_ForRatio_Group_1: number = undefined
        let psm_Or_Scan_Count_ForRatio_Group_2: number = undefined

        let groupRatio_1: number = undefined
        let groupRatio_2: number = undefined

        if ( ! all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

            if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {
                throw Error("if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {")
            }

            //  Flip 1 & 2
            zscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_2, n1: psm_Or_Scan_Count_Group_2, x2: x_1, n2: psm_Or_Scan_Count_Group_1 });

            //  WAS
            // zscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_1, n1: psm_Or_Scan_Count_Group_1, x2: x_2, n2: psm_Or_Scan_Count_Group_2 });

            pvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({ x1: x_1, n1: psm_Or_Scan_Count_Group_1, x2: x_2, n2: psm_Or_Scan_Count_Group_2 });
            pvalue = pvalue * sortedModMasses.length;
            if (pvalue > 1) {
                pvalue = 1;
            }

            psm_Or_Scan_Count_ForRatio_Group_1 = psm_Or_Scan_Count_Group_1
            psm_Or_Scan_Count_ForRatio_Group_2 = psm_Or_Scan_Count_Group_2

            groupRatio_1 = x_1 / psm_Or_Scan_Count_Group_1
            groupRatio_2 = x_2 / psm_Or_Scan_Count_Group_2

            if ( groupRatio_1 === 0 || groupRatio_2 === 0 ) {
                var z = 0
            }

        } else {

            if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {
                throw Error("if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {")
            }

            //  Flip 1 & 2
            filteredZscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_2, n1: filtered_Psm_Or_Scan_Count_2, x2: x_1, n2: filtered_Psm_Or_Scan_Count_1 });

            //  WAS
            // filteredZscore = ModPage_ModStatsUtils.getZScoreForTwoRatios({ x1: x_1, n1: filtered_Psm_Or_Scan_Count_1, x2: x_2, n2: filtered_Psm_Or_Scan_Count_2 });

            filteredPvalue = ModPage_ModStatsUtils.getPValueForTwoRatios({ x1: x_1, n1: filtered_Psm_Or_Scan_Count_1, x2: x_2, n2: filtered_Psm_Or_Scan_Count_2 });
            filteredPvalue = filteredPvalue * sortedModMasses.length;
            if (filteredPvalue > 1) {
                filteredPvalue = 1;
            }

            psm_Or_Scan_Count_ForRatio_Group_1 = filtered_Psm_Or_Scan_Count_1
            psm_Or_Scan_Count_ForRatio_Group_2 = filtered_Psm_Or_Scan_Count_2

            groupRatio_1 = x_1 / filtered_Psm_Or_Scan_Count_1
            groupRatio_2 = x_2 / filtered_Psm_Or_Scan_Count_2

            if ( groupRatio_1 === 0 || groupRatio_2 === 0 ) {
                var z = 0
            }
        }

        // {
        //     //  TESTING ONLY:  This block ONLY for creating an output to 'console' for showing intermediate results
        //
        //     //  numerator and denominator calculated values code COPIED from other code:   export const ModPage_ModStatsUtils
        //
        //     //  numerator and denominator calculated values
        //
        //     // NOT Filtered
        //
        //     let numerator: number
        //     let denominator: number
        //
        //     // YES Filtered
        //
        //     let numerator_Filtered: number
        //     let denominator_Filtered: number
        //
        //     if ( ! modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {
        //
        //         if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {
        //             throw Error("if ( psm_Or_Scan_Count_Group_1 === undefined || psm_Or_Scan_Count_Group_2 === undefined ) {")
        //         }
        //
        //         const x1 = x_1
        //         const x2 = x_2
        //
        //         const n1 = psm_Or_Scan_Count_Group_1
        //         const n2 = psm_Or_Scan_Count_Group_2
        //
        //         const p = ( x1 + x2 ) / ( n1 + n2 );
        //         numerator = ( x1 / n1 ) - ( x2 / n2 );
        //         denominator = Math.sqrt( p * ( 1 - p ) * ( 1 / n1 + 1 / n2 ) );
        //
        //     } else {
        //
        //         // YES Filtered
        //
        //         if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {
        //             throw Error("if ( filtered_Psm_Or_Scan_Count_1 === undefined || filtered_Psm_Or_Scan_Count_2 === undefined ) {")
        //         }
        //
        //         const x1 = x_1
        //         const x2 = x_2
        //
        //         const n1 = filtered_Psm_Or_Scan_Count_1
        //         const n2 = filtered_Psm_Or_Scan_Count_2
        //
        //         const p = ( x1 + x2 ) / ( n1 + n2 );
        //         numerator_Filtered = ( x1 / n1 ) - ( x2 / n2 );
        //         denominator_Filtered = Math.sqrt( p * ( 1 - p ) * ( 1 / n1 + 1 / n2 ) );
        //     }
        //
        //     //  Commented out copy of Push of header line from above for easy comparison
        //
        //     // TESTING__DataToLog_Lines.push( [
        //     //     "Mod Mass", "count_1", "count_2",
        //     //     "z-score", "z-score numerator", "z-score denominator",
        //     //     "z-score x1", "z-score n1", "z-score x2", "z-score n2",
        //     //     "p-value", "p-value x1", "p-value n1", "p-value x2", "p-value n2",
        //     //     "filtered z-score", "filtered z-score numerator", "filtered z-score denominator",
        //     //     "filtered z-score x1", "filtered z-score n1", "filtered z-score x2", "filtered z-score n2",
        //     //     "filtered p-value",
        //     //     "filtered p-value x1", "filtered p-value n1", "filtered p-value x2", "filtered p-value n2"
        //     // ].join("\t") )
        //
        //     const TESTING__DataToLog_Line = [
        //         modMass, x_1, x_2,
        //         zscore, numerator, denominator,
        //         x_1, psm_Or_Scan_Count_Group_1, x_2, psm_Or_Scan_Count_Group_2,
        //         pvalue,
        //         x_1, psm_Or_Scan_Count_Group_1, x_2, psm_Or_Scan_Count_Group_2,
        //         // Filtered
        //         filteredZscore,
        //         numerator_Filtered, denominator_Filtered,
        //         x_1, filtered_Psm_Or_Scan_Count_1, x_2, filtered_Psm_Or_Scan_Count_2,
        //         filteredPvalue,
        //         x_1, filtered_Psm_Or_Scan_Count_1, x_2, filtered_Psm_Or_Scan_Count_2,
        //     ].join( "\t" )
        //
        //     TESTING__DataToLog_Lines.push( TESTING__DataToLog_Line )
        // }

        if ( all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_zScore_DataTab_DataTable_ZScore_Pvalue_For_FilteredData() ) {

            zscore = filteredZscore
            pvalue = filteredPvalue
        }

        const ob: INTERNAL_TableRow = {
            modMass: modMass,
            count_1: x_1,
            count_2: x_2,
            zscore: zscore,
            pvalue: pvalue,

            psm_Or_Scan_Count_ForRatio_Group_1,
            psm_Or_Scan_Count_ForRatio_Group_2,
            groupRatio_1,
            groupRatio_2,

            rank: undefined  //  Set later
        };

        resultsArray.push(ob);
    }

    // {
    //     TESTING__DataToLog_Lines.push("") // to add final \n
    //     const TESTING_StringToLog = TESTING__DataToLog_Lines.join("\n")
    //
    //     console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     console.log( "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //     console.log( "!!!!!!!!!!!!!!!!!! Log of Data for ZScore Table: \n\n", TESTING_StringToLog )
    // }

    resultsArray.sort(function(a,b) {

        // sort on the magnitude of the zscore (asc) first, then p-value (desc) second

        if (Math.abs(a.zscore) > Math.abs(b.zscore)) {
            return -1;
        }
        if (Math.abs(a.zscore) < Math.abs(b.zscore)) {
            return 1;
        }
        return a.pvalue - b.pvalue;
    });

    //  Create Table and open overlay

    const tableRows: Array<INTERNAL_TableRow> = []

    {
        // assemble the table rows

        let rank = 1;

        for ( const tableRow of resultsArray ) {

            tableRow.rank = rank

            tableRows.push( tableRow )

            rank++;
        }
    }

    return {
        tableRows
    }
}




/**
 *
 */
type INTERNAL_TableRow = {

    modMass: number
    count_1: number
    count_2: number
    zscore: number
    pvalue: number

    psm_Or_Scan_Count_ForRatio_Group_1: number
    psm_Or_Scan_Count_ForRatio_Group_2: number

    groupRatio_1: number
    groupRatio_2: number

    rank: number
}
