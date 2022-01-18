/**
 * qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : Charge State Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {qc_SingleSearch__SubSearches__Open_PSM_ChargeState_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_OverlayContainer";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";


const chartTitle = "Fraction of PSMs with Charge";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
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

        const promise_get_PsmStatistics_ChargeStateStatistics_Data =
            this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.get_PsmStatistics_ChargeStateStatistics_Data();

        promise_get_PsmStatistics_ChargeStateStatistics_Data.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_get_PsmStatistics_ChargeStateStatistics_Data.then( data_Holder_SingleSearch__SubSearches => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({showUpdatingMessage: false});

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

                //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

                const peptideDistinct_Array =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

                let charge_Min_AcrossAllSearches = undefined;
                let charge_Max_AcrossAllSearches = undefined;

                const charge_Count_Map_Key_Charge_Map_Key_SubSearchId = new Map<number, Map<number, Charge_Count_Entry>>();

                const psm_Count_Map_Key_SubSearchId = new Map<number, number>();

                const data_Holder_SingleSearch = data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch();

                const psmTblData = data_Holder_SingleSearch.psmTblData

                const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                    qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                        projectSearchId,
                        peptideDistinct_Array,
                        qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                    });

                const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

                    const subGroupId = subGroupIdMap_Key_PsmId.get(psmTblData_Filtered_Entry.psmId);
                    if ( ! subGroupId ) {
                        const msg = "( ! subGroupId ) psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {
                        //  NOT a Selected searchSubGroup_Id so SKIP
                        continue; // EARLY CONTINUE
                    }

                    {
                        const psm_Count = psm_Count_Map_Key_SubSearchId.get(subGroupId);
                        if ( psm_Count ) {
                            const new_psm_Count = psm_Count + 1;
                            psm_Count_Map_Key_SubSearchId.set(subGroupId, new_psm_Count);
                        } else {
                            psm_Count_Map_Key_SubSearchId.set(subGroupId, 1);
                        }
                    }

                    let charge_Count_Map_Key_Charge = charge_Count_Map_Key_Charge_Map_Key_SubSearchId.get(subGroupId);
                    if ( ! charge_Count_Map_Key_Charge ) {
                        charge_Count_Map_Key_Charge = new Map();
                        charge_Count_Map_Key_Charge_Map_Key_SubSearchId.set(subGroupId, charge_Count_Map_Key_Charge);
                    }

                    let charge_Count_Entry = charge_Count_Map_Key_Charge.get(psmTblData_Filtered_Entry.charge);
                    if (!charge_Count_Entry) {
                        charge_Count_Entry = {
                            charge : psmTblData_Filtered_Entry.charge,
                            psmCountForEntry : 0
                        };
                        charge_Count_Map_Key_Charge.set(psmTblData_Filtered_Entry.charge, charge_Count_Entry);
                    }
                    charge_Count_Entry.psmCountForEntry++;

                    //  Compute Min and Max Charge
                    if (charge_Min_AcrossAllSearches === undefined) {
                        charge_Min_AcrossAllSearches = charge_Count_Entry.charge;
                        charge_Max_AcrossAllSearches = charge_Count_Entry.charge;
                    } else {
                        if (charge_Min_AcrossAllSearches > charge_Count_Entry.charge) {
                            charge_Min_AcrossAllSearches = charge_Count_Entry.charge
                        }
                        if (charge_Max_AcrossAllSearches < charge_Count_Entry.charge) {
                            charge_Max_AcrossAllSearches = charge_Count_Entry.charge
                        }
                    }
                }

                const chartData_MainTraces_Array = [];


                for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                    if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                        //  NOT a Selected searchSubGroup_Id so SKIP
                        continue; // EARLY CONTINUE
                    }

                    const color = qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                    const x_Label = searchSubGroup.subgroupName_Display;

                    const charge_Count_Map_Key_Charge_Map = charge_Count_Map_Key_Charge_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id);
                    if ( ! charge_Count_Map_Key_Charge_Map ) {
                        const msg = "charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for searchSubGroup.searchSubGroup_Id: " + searchSubGroup.searchSubGroup_Id;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const psm_Count_TotalForSubSearch = psm_Count_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id);
                    if ( ! charge_Count_Map_Key_Charge_Map ) {
                        const msg = "psm_Count_TotalForSubSearch = psm_Count_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id); returned NOTHING for projectSearchId: " + searchSubGroup.searchSubGroup_Id;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const chart_X: Array<string> = []
                    const chart_Y: Array<number> = []
                    const chart_Bars_labels: Array<string> = [];
                    const chart_Bars_Tooltips: Array<string> = [];

                    for (let charge = charge_Min_AcrossAllSearches; charge <= charge_Max_AcrossAllSearches; charge++) {

                        let psmCount_ForEntry = 0;
                        let psmCount_Fraction_ForEntry = 0;
                        {
                            const charge_Count_Entry = charge_Count_Map_Key_Charge_Map.get(charge);
                            if (charge_Count_Entry) {
                                psmCount_ForEntry = charge_Count_Entry.psmCountForEntry;
                                psmCount_Fraction_ForEntry = charge_Count_Entry.psmCountForEntry / psm_Count_TotalForSubSearch;
                            }
                        }
                        chart_X.push("+" + charge.toString());
                        chart_Y.push(psmCount_Fraction_ForEntry);
                        chart_Bars_labels.push(psmCount_Fraction_ForEntry.toFixed(3));

                        let psmCount_Fraction_TooltipString: string = undefined;
                        if ( psmCount_Fraction_ForEntry === 0 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(1);
                        } else if (psmCount_Fraction_ForEntry < 0.1 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(3);
                        } else {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(2);
                        }

                        const tooltip =
                            "Sub Search: " + x_Label +
                            "<br>Charge: +" + charge +
                            "<br>Fraction: " + psmCount_Fraction_TooltipString +
                            "<br>Count: " + psmCount_ForEntry.toLocaleString() +
                            "<br>Total Count: " + psm_Count_TotalForSubSearch.toLocaleString();

                        chart_Bars_Tooltips.push(tooltip);
                    }

                    const chart_Data_ForSearch =
                        {
                            name: x_Label,
                            type: 'scatter',
                            marker: {
                                color
                            },
                            x: chart_X,
                            y: chart_Y,
                            text: chart_Bars_labels, //  Text put on each bar
                            hoverinfo: "text", //  Hover contents
                            hovertext: chart_Bars_Tooltips  //  Hover contents per bar
                        };

                    chartData_MainTraces_Array.push(chart_Data_ForSearch)
                }

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

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label: "Charge",
                    chart_X_Axis_IsTypeCategory: true,
                    chart_Y_Axis_Label: "Fraction",
                    showlegend: true
                });

                try {
                    //  First remove any existing plot, if it exists (And event listener on it)
                    this._removeChart();
                } catch (e) {
                    //  Eat Exception
                }

                if (this.props.isInSingleChartOverlay) {

                    const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();

                    /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

                    // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
                    // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
                    // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
                    // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

                    const chart_Width = Math.floor(targetDOMElement_domRect.width);
                    const chart_Height = Math.floor(targetDOMElement_domRect.height);

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

                const chart_config = qcPage_StandardChartConfig({chartContainer_DOM_Element: this.plot_Ref.current});

                {
                    // const chart_Data_JSON = JSON.stringify(chartData_MainTraces_Array);
                    // const chart_Layout_JSON = JSON.stringify(chart_Layout);
                    //
                    // console.log("*********************************")
                    // console.log("Data for Chart with Title: " + chartTitle);
                    // console.log("chart_Data object: ", chartData_MainTraces_Array);
                    // console.log("chart_Data_JSON: " + chart_Data_JSON);
                    // console.log("chart_Layout object: ", chart_Layout);
                    // console.log("chart_Layout_JSON: " + chart_Layout_JSON);
                    // console.log("chart_config object: ", chart_config);
                    // console.log("*********************************")
                }

                const newPlotResult = Plotly.newPlot(this.plot_Ref.current, chartData_MainTraces_Array, chart_Layout, chart_config);

                if (!this.props.isInSingleChartOverlay) {

                    //  Add click handler on chart on main page to open chart in overlay

                    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
                        plotContaining_DOM_Element: this.plot_Ref.current,
                        callbackFcn_WhenClicked: this._openChartInOverlay_BindThis
                    });
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
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
            qc_SingleSearch__SubSearches__Open_PSM_ChargeState_OverlayContainer({
                params: {
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

/**
 *
 */
class Charge_Count_Entry {

    charge: number
    psmCountForEntry: number
}
