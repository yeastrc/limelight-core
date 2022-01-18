/**
 * qcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : PSM Count vs M/Z Statistics
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
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch__SubSearches";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {qc_SingleSearch__SubSearches__Open_PSMCount_VS_M_Z_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_OverlayContainer";
import {
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__SubSearches__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__SubSearches__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/js/qcViewPage_SingleSearch__SubSearches__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qc_Page_ChangePlotlyLayout_For_XaxisLabelLengths__Create_Plotly_ReLayout_Object";

const chartTitle = "Distribution of PSM Precursor M/Z";


/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_State > {

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
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_Props) {
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
                    this._loadData_IfNeeded_ThenCall_populateChart();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSMCount_VS_M_Z_StatisticsPlot_State>, snapshot?: any) {
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
                    this._loadData_IfNeeded_ThenCall_populateChart();

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
            this._loadData_IfNeeded_ThenCall_populateChart()

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
    private _loadData_IfNeeded_ThenCall_populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.get_PsmStatistics_RetentionTime_M_Z_Statistics_Data();

        promise.catch( reason => {
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

        promise.then( data_Holder_SingleSearch__SubSearches => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this._populateChart({ data_Holder_SingleSearch__SubSearches });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _populateChart(
        {
            data_Holder_SingleSearch__SubSearches
        } : {
            data_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        }
    ) : void {

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

        const data_Holder_SingleSearch = data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch();

        let search__PSMS_precursor_m_z__NotNull = false;
        {
            const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
            if (qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull) {
                //  PSM M/Z data for search IS SET
                search__PSMS_precursor_m_z__NotNull = true;
            }
        }

        let spectralStorage_NO_Peaks_Data: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root = undefined;
        if ( ! search__PSMS_precursor_m_z__NotNull ) {
            spectralStorage_NO_Peaks_Data = data_Holder_SingleSearch.spectralStorage_NO_Peaks_Data
            if (!spectralStorage_NO_Peaks_Data) {
                const msg = " ( ! search__PSMS_precursor_m_z__NotNull ) AND (!spectralStorage_NO_Peaks_Data) for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
        }

        const psmTblData = data_Holder_SingleSearch.psmTblData

        const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
            qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                projectSearchId,
                peptideDistinct_Array,
                qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
            });

        const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

        const searchSubGroup_Ids_Found = new Set<number>()

        //  Collect values by subgroupName_Display in a map
        const subgroupName_Display__precursor_M_Over_Z__EntryArray_Map_Key_subgroupName_Display : Map<string, Array<{

            subgroupName_Display: string
            precursor_M_Over_Z: number
        }>> = new Map();

        for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

            let precursor_M_Over_Z: number = undefined;

            if ( search__PSMS_precursor_m_z__NotNull ) {
                // get from PSM
                precursor_M_Over_Z = psmTblData_Filtered_Entry.precursor_M_Over_Z;
            } else {
                // Get from Scan
                if ( ! psmTblData_Filtered_Entry.searchScanFileId ) {
                    const msg = "( ! psmTblData_Filtered_Entry.searchScanFileId )  projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! psmTblData_Filtered_Entry.scanNumber ) {
                    const msg = "( ! psmTblData_Filtered_Entry.scanNumber )  projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                const spectralStorage_NO_Peaks_DataFor_SearchScanFileId = spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(psmTblData_Filtered_Entry.searchScanFileId);
                if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
                    const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId(psmTblData_Filtered_Entry.searchScanFileId); returned nothing for searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                    const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing for scanNumber: " + psmTblData_Filtered_Entry.scanNumber + ", searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                precursor_M_Over_Z = spectralStorage_NO_Peaks_DataFor_ScanNumber.precursor_M_Over_Z;
            }

            const searchSubGroup_Id = subGroupIdMap_Key_PsmId.get(psmTblData_Filtered_Entry.psmId);
            if ( ! searchSubGroup_Id ) {
                const msg = "( ! searchSubGroup_Id ). psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup_Id ) ) {
                //  NOT a Selected searchSubGroup_Id so SKIP
                continue; // EARLY CONTINUE
            }

            const searchSubGroup = searchSubGroups_Map_Key_searchSubGroupId.get(searchSubGroup_Id);
            if ( ! searchSubGroup ) {
                const msg = "( ! searchSubGroup ). searchSubGroup_Id: " + searchSubGroup_Id + ", psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            searchSubGroup_Ids_Found.add(searchSubGroup_Id);

            const subgroupName_Display = searchSubGroup.subgroupName_Display;

            let subgroupName_Display__precursor_M_Over_Z__EntryArray = subgroupName_Display__precursor_M_Over_Z__EntryArray_Map_Key_subgroupName_Display.get( subgroupName_Display );
            if ( ! subgroupName_Display__precursor_M_Over_Z__EntryArray ) {
                subgroupName_Display__precursor_M_Over_Z__EntryArray = [];
                subgroupName_Display__precursor_M_Over_Z__EntryArray_Map_Key_subgroupName_Display.set( subgroupName_Display, subgroupName_Display__precursor_M_Over_Z__EntryArray );
            }

            const subgroupName_Display__precursor_M_Over_Z__Entry = { subgroupName_Display, precursor_M_Over_Z };

            subgroupName_Display__precursor_M_Over_Z__EntryArray.push( subgroupName_Display__precursor_M_Over_Z__Entry );
        }

        //  Must add to chart_X, chart_Y in the order they will be shown in the chart

        const chart_X : Array<string> = []
        const chart_Y : Array<number> = []

        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            if ( ! searchSubGroup_Ids_Found.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  NOT a Found searchSubGroup_Id so SKIP
                continue; // EARLY CONTINUE
            }

            const subgroupName_Display__precursor_M_Over_Z__EntryArray = subgroupName_Display__precursor_M_Over_Z__EntryArray_Map_Key_subgroupName_Display.get( searchSubGroup.subgroupName_Display );

            for ( const subgroupName_Display__precursor_M_Over_Z__Entry of subgroupName_Display__precursor_M_Over_Z__EntryArray ) {

                chart_X.push( subgroupName_Display__precursor_M_Over_Z__Entry.subgroupName_Display );
                chart_Y.push( subgroupName_Display__precursor_M_Over_Z__Entry.precursor_M_Over_Z );
            }
        }



        const transforms_styles: Array<any> = [];

        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            if ( ! searchSubGroup_Ids_Found.has( searchSubGroup.searchSubGroup_Id ) ) {
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
                color: 'green',
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
            chart_Y_Axis_Label: "M/Z",
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
            qc_SingleSearch__SubSearches__Open_PSMCount_VS_M_Z_OverlayContainer({
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

class Peptide_LengthCount_Entry {
    peptideLength: number
    reportedPeptideIds_Where_no_SubFiltering_On_PsmIds: Set<number>
    psmIds_Map_Key_ReportedPeptideId: Map<number,Set<number>>

    psmCountForEntry: number  // Computed from properties in this object

    constructor({ peptideLength } : { peptideLength: number }) {
        this.peptideLength = peptideLength;
        this.reportedPeptideIds_Where_no_SubFiltering_On_PsmIds = new Set();
        this.psmIds_Map_Key_ReportedPeptideId = new Map();
    }

    private _ONLY_FORCE_USE_Constructor() {}
}
