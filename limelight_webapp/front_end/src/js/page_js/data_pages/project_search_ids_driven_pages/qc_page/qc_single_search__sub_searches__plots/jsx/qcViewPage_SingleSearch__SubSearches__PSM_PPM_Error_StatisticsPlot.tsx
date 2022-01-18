/**
 * qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot.tsx
 *
 * QC Page Multiple Searches : PSM Count vs Peptide Length Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data";
import {qc_SingleSearch__SubSearches__Open_PSM_PPM_Error_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_OverlayContainer";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";


const chartTitle = "Distribution of Precursor error";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>>

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_State > {

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();

        this.state = {};
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            this._resizeWindow_Handler_Remove();
        } catch (e) {
            //  Eat Exception
        }

        try {
            this._removeChart();

        } catch (e) {
            //  Eat Exception
        }

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

            window.setTimeout( () => {
                try {
                    this._populateChart();

                    if ( this.props.isInSingleChartOverlay ) {
                        this._resizeWindow_Handler_Attach();
                    }

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId !== this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId
            || nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
            || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
        ) {
            //  Something changed so return true
            return true;
        }

        return false
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId !== this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId
                || prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
            ) {
            } else {
                //  Nothing changed so return

                return;  // EARLY RETURN
            }

            this.setState({ showUpdatingMessage: true });

            window.setTimeout( () => {
                try {
                    this._populateChart();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _resizeWindow_Handler_Attach() : void {

        //  Attach resize handler
        window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     *
     */
    private _resizeWindow_Handler_Remove() : void {

        //  Remove resize handler
        window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
     */
    private _resizeWindow_Handler() : void {
        try {
            this._populateChart()

        } catch( e ) {
            console.log("Exception caught in _resizeWindow_Handler()");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId = this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId;

        if ( ! psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId ) {
            //  NO Data yet to display
            return; // EARLY RETURN
        }

        if ( ! this.plot_Ref.current ) {
            const msg = "NO DOM element at this.plot_Ref.current to put the chart in.  class QcViewPage_SingleSearch__PSM_PPM_Error_StatisticsPlot."
            console.warn(msg);

            return; // EARLY RETURN
        }

        this.setState({ showUpdatingMessage: false });

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

        const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
        const searchSubGroupIds_DisplayOrder: Array<number> = [];
        const searchSubGroups_Map_Key_searchSubGroupId: Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Map();
        {
            const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
            for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                searchSubGroups_DisplayOrder.push(searchSubGroup);
                searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
                searchSubGroups_Map_Key_searchSubGroupId.set(searchSubGroup.searchSubGroup_Id, searchSubGroup);
            }
        }

        const qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const subGroupIdMap_Key_PsmId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId();
        if ( ! subGroupIdMap_Key_PsmId ) {
            throw Error("loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId(); returned NOTHING for projectSearchId: " + projectSearchId);
        }

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []


        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            const psm_PPM_Error_List_Filtered = this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId.get(searchSubGroup.searchSubGroup_Id);

            if ( ! psm_PPM_Error_List_Filtered ) {
                //  No Data for Project Search Id
                continue; // EARLY CONTINUE
            }

            const x_Label = searchSubGroup.subgroupName_Display;

            for ( const psm_PPM_Error_List_Filtered_Entry of psm_PPM_Error_List_Filtered ) {

                chart_X.push( x_Label )
                chart_Y.push( psm_PPM_Error_List_Filtered_Entry.ppmError );
            }
        }

        const transforms_styles: Array<any> = [];

        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            if ( ! this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  NOT a Found searchSubGroup_Id so SKIP
                continue; // EARLY CONTINUE
            }

            const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

            const x_Label = searchSubGroup.subgroupName_Display;

            transforms_styles.push({target: x_Label, value: {line: {color: color}}});
        }


        const chart_Data_Entry = {
            type: 'violin',
            x: chart_X,
            y: chart_Y,
            points: "outliers", // https://plotly.com/javascript/reference/violin/#violin-points
            box: {
                visible: true
            },
            line: {
                color: 'orange',
            },
            meanline: {
                visible: true
            },
            transforms: [{
                type: 'groupby',
                groups: chart_X,
                styles: transforms_styles
            }]
        }

        //  Single Search:
        // const chart_Data_Entry = {
        //     type: 'bar',
        //         x: chart_X,
        //     y: chart_Y,
        //     // text: chart_Bars_labels, //  Text put on each bar
        //     hoverinfo: "text", //  Hover contents
        //     hovertext: chart_Bars_Tooltips  //  Hover contents per bar
        // }

        const chart_Data = [
            chart_Data_Entry
        ];


        // Another way to color each bar, all in one trace
        //
        // https://plotly.com/javascript/bar-charts/#customizing-individual-bar-colors
        //     var trace1 = {
        //         x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
        //         y: [20, 14, 23, 25, 22],
        //         marker:{
        //             color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
        //         },
        //         type: 'bar'
        //     };

        const xAxisTitle = "Sub Search";

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: xAxisTitle,
            chart_X_Axis_IsTypeCategory: true,
            chart_Y_Axis_Label: "PPM Error",
            showlegend: false,
            search_SubSearch_Count_SizeFor: transforms_styles.length
        });

        try {
            //  First remove any existing plot, if it exists (And event listener on it)
            this._removeChart();
        } catch (e) {
            //  Eat Exception
        }

        if ( this.props.isInSingleChartOverlay ) {

            const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();

            /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

            // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
            // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
            // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
            // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

            const chart_Width = Math.floor( targetDOMElement_domRect.width );
            const chart_Height = Math.floor( targetDOMElement_domRect.height );

            //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

            // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
            //
            // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
            // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
            //
            // if ()

            chart_Layout.width = chart_Width;
            chart_Layout.height = chart_Height;
        }

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        {
            // const chart_Data_JSON = JSON.stringify( chart_Data );
            // const chart_Layout_JSON = JSON.stringify( chart_Layout );
            //
            // console.log("*********************************")
            // console.log("Data for Chart with Title: " + chartTitle );
            // console.log("chart_Data object: ", chart_Data );
            // console.log("chart_Data_JSON: " + chart_Data_JSON );
            // console.log("chart_Layout object: ", chart_Layout );
            // console.log("chart_Layout_JSON: " + chart_Layout_JSON );
            // console.log("chart_config object: ", chart_config );
            // console.log("*********************************")
        }

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config);

        {
            //  Adjust Plot Layout if needed so X Axis labels do not cover the X Axis title

            const xAxisLabels = new Set(chart_X);

            const  {
                updateLayoutNeeded, updateLayout
            } = qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object({
                plotRoot_DOM_Element: this.plot_Ref.current,
                xAxisLabels,
                xAxisTitle,
                adjustPlotHeight: ( ! this.props.isInSingleChartOverlay )
            });

            if ( updateLayoutNeeded ) {
                Plotly.relayout(this.plot_Ref.current, updateLayout);
            }
        }

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
                plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis
            });
        } catch (e) {
            //  Eat Exception
        }
        try {
            Plotly.purge(this.plot_Ref.current)
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _openChartInOverlay( event ) {
        try {
            event.stopPropagation()
            qc_SingleSearch__SubSearches__Open_PSM_PPM_Error_OverlayContainer({
                params: {
                    psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId: this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent,
                }
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const style : React.CSSProperties = { position: "relative" };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }

        return (
            <div style={ style }>
                <div ref={this.plot_Ref} style={ style }></div>
                {( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): null }
            </div>
        );
    }


}
