/**
 * qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics - Only The Plot
 *
 */

import _common_template_bundle =
    require("../../../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    open_PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer,
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number
    annotationTypeId_Score_Y: number

    isInSingleChartOverlay: boolean

    chartType: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType
}


/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props {

    propsValue: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_State {

    _placeHolder?: number
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot extends React.Component< QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props, QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_State > {

    //  bind to 'this' for passing as parameters

    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private _renderChart = true; // Never changes

    private plot_Ref :  React.RefObject<HTMLDivElement>

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props) {
        super(props);

        if ( props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
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
            if ( this._renderChart ) {
                this._removeChart();
            }
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateChart();

                        if ( this.props.propsValue.isInSingleChartOverlay ) {
                            this._resizeWindow_Handler_Attach();
                        }

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_State>, nextContext: any): boolean {

        if ( this.props.propsValue !== nextProps.propsValue ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateChart();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }

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
    private _removeChart() : void {
        try {
            qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
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
    private _populateChart() {

        const projectSearchId = this.props.propsValue.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const psmFilterableAnnotationData_Unfiltered = this.props.propsValue.qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmFilterableAnnotationData_Unfiltered;

        console.log( "psmFilterableAnnotationData_Unfiltered: Number of Entries (Number of PSMs): " + psmFilterableAnnotationData_Unfiltered.get_Per_Psm_Holder_Entries_Size() );

        let psmTblData_Unfiltered: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root = undefined;

        if ( this.props.propsValue.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

            psmTblData_Unfiltered = this.props.propsValue.qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData_Unfiltered
        }

        const psmIds_Filtered = new Set<number>();

        {  //  Populate psmIds_Filtered
            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const psmTblData = this.props.propsValue.qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            for (const psmTblData_Entry of psmTblData_Filtered) {

                psmIds_Filtered.add(psmTblData_Entry.psmId);
            }
        }

        ///

        const annotationType_Name_Score_X : string = this._get_AnnotationTypeName_SearchProgramName( this.props.propsValue.annotationTypeId_Score_X );
        const annotationType_Name_Score_Y : string = this._get_AnnotationTypeName_SearchProgramName( this.props.propsValue.annotationTypeId_Score_Y );

        let min_Score_X = undefined;
        let max_Score_X = undefined;
        let min_Score_Y = undefined;
        let max_Score_Y = undefined;

        const psmFilterableAnnotationData_Entries_Meet_Filters: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder> = [];
        const psmFilterableAnnotationData_Entries_NOT_Meet_Filters: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmFilterableAnnotationData_Unfiltered__PSM_Entry_Holder> = [];

        for ( const psmFilterableAnnotationData_Unfiltered_Entry of psmFilterableAnnotationData_Unfiltered.get_Per_Psm_Holder_Entries_IterableIterator() ) {

            if ( this.props.propsValue.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                const psmData = psmTblData_Unfiltered.get_PsmTblData_Unfiltered_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId );
                if ( ! psmData ) {
                    const msg = "psmTblData.get_PsmTblData_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId ); returned nothing for psmFilterableAnnotationData_Unfiltered_Entry.psmId: " + psmFilterableAnnotationData_Unfiltered_Entry.psmId +
                        ", projectSearchId: " + this.props.propsValue.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( psmData.searchScanFileId !== undefined && psmData.searchScanFileId !== null ) {
                    if ( psmData.searchScanFileId !== this.props.propsValue.searchScanFileId_Selection ) {
                        //  Not selected searchScanFileId so SKIP

                        continue;  //  EARLY CONTINUE
                    }
                }
            }

            if ( psmIds_Filtered.has( psmFilterableAnnotationData_Unfiltered_Entry.psmId ) ) {

                psmFilterableAnnotationData_Entries_Meet_Filters.push( psmFilterableAnnotationData_Unfiltered_Entry );

            } else {
                psmFilterableAnnotationData_Entries_NOT_Meet_Filters.push( psmFilterableAnnotationData_Unfiltered_Entry );
            }
        }

        const chart_X_2D_DensityPlot : Array<number> = []
        const chart_Y_2D_DensityPlot : Array<number> = []

        const chart_X_Meet_PSM_Filters__ScatterPlot : Array<number> = []
        const chart_Y_Meet_PSM_Filters__ScatterPlot : Array<number> = []

        const chart_X_ALL__ScatterPlot : Array<number> = []
        const chart_Y_ALL__ScatterPlot : Array<number> = []

        for ( const psmFilterableAnnotationData_Entry of psmFilterableAnnotationData_Entries_NOT_Meet_Filters ) {

            const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_X );
            const psmFilterableAnnotationData_For_annotationTypeId_Score_Y =
                psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_Y );

            if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_X ); returned nothing. this.props.propsValue.annotationTypeId_Score_X: " + this.props.propsValue.annotationTypeId_Score_X;
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_Y ) {
                const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_Y ); returned nothing. this.props.propsValue.annotationTypeId_Score_Y: " + this.props.propsValue.annotationTypeId_Score_Y;
                console.warn(msg);
                throw Error(msg);
            }

            if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT ) {

                chart_X_2D_DensityPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber);
                chart_Y_2D_DensityPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber);

            } else if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

                chart_X_ALL__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber);
                chart_Y_ALL__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber);
            } else {
                const msg = "Unknown value for this.props.propsValue.chartType: " + this.props.propsValue.chartType;
                console.warn(msg);
                throw Error(msg);
            }

            {
                const score_X = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber;
                const score_Y = psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber;

                if (min_Score_X === undefined) {
                    min_Score_X = score_X;
                    max_Score_X = score_X;
                    min_Score_Y = score_Y;
                    max_Score_Y = score_Y;
                } else {
                    if ( min_Score_X > score_X ) {
                        min_Score_X = score_X;
                    }
                    if ( max_Score_X < score_X ) {
                        max_Score_X = score_X;
                    }
                    if ( min_Score_Y > score_Y ) {
                        min_Score_Y = score_Y;
                    }
                    if ( max_Score_Y < score_Y ) {
                        max_Score_Y = score_Y;
                    }
                }
            }

        }

        for ( const psmFilterableAnnotationData_Entry of psmFilterableAnnotationData_Entries_Meet_Filters ) {

            const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_X );
            const psmFilterableAnnotationData_For_annotationTypeId_Score_Y =
                psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_Y );

            if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_X ); returned nothing. this.props.propsValue.annotationTypeId_Score_X: " + this.props.propsValue.annotationTypeId_Score_X;
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_Y ) {
                const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.propsValue.annotationTypeId_Score_Y ); returned nothing. this.props.propsValue.annotationTypeId_Score_Y: " + this.props.propsValue.annotationTypeId_Score_Y;
                console.warn(msg);
                throw Error(msg);
            }

            if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT ) {

                chart_X_2D_DensityPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber);
                chart_Y_2D_DensityPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber);

            } else if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

                chart_X_Meet_PSM_Filters__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber);
                chart_Y_Meet_PSM_Filters__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber);

                //  Also put in "All"

                chart_X_ALL__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber);
                chart_Y_ALL__ScatterPlot.push(psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber);

            } else {
                const msg = "Unknown value for this.props.propsValue.chartType: " + this.props.propsValue.chartType;
                console.warn(msg);
                throw Error(msg);
            }

            {
                const score_X = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber;
                const score_Y = psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber;

                if (min_Score_X === undefined) {
                    min_Score_X = score_X;
                    max_Score_X = score_X;
                    min_Score_Y = score_Y;
                    max_Score_Y = score_Y;
                } else {
                    if ( min_Score_X > score_X ) {
                        min_Score_X = score_X;
                    }
                    if ( max_Score_X < score_X ) {
                        max_Score_X = score_X;
                    }
                    if ( min_Score_Y > score_Y ) {
                        min_Score_Y = score_Y;
                    }
                    if ( max_Score_Y < score_Y ) {
                        max_Score_Y = score_Y;
                    }
                }
            }

        }

        {
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: annotationType_Name_Score_X: " + annotationType_Name_Score_X );
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: annotationType_Name_Score_Y: " + annotationType_Name_Score_Y );
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: min_Score_X: " + min_Score_X + ", max_Score_X: " + max_Score_X + ", min_Score_Y: " + min_Score_Y + ", max_Score_Y: " + max_Score_Y );
        }


        const annotationType_Name_Score_X_HTMLEncoded = _common_template_bundle.genericSingleValueOnly({ value: annotationType_Name_Score_X });

        const annotationType_Name_Score_Y_HTMLEncoded = _common_template_bundle.genericSingleValueOnly({ value: annotationType_Name_Score_Y });


        let chart_Data = undefined;

        if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT ) {

            chart_Data = [
                {
                    name: '',
                    x: chart_X_2D_DensityPlot,
                    y: chart_Y_2D_DensityPlot,
                    hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                        '<b>' + annotationType_Name_Score_Y_HTMLEncoded + '</b>: %{y}' +
                        '<br><b>' + annotationType_Name_Score_X_HTMLEncoded + '</b>: %{x}' +
                        '<br><b>PSM Count</b>: %{z}<extra></extra>',
                    ncontours: 20,
                    colorscale: 'Hot',
                    reversescale: true,
                    showscale: true,
                    type: 'histogram2dcontour'  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram2dcontour'
                }
            ];

        } else if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

            //  Colors for Bars
            const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 2 });

            const chart_Color_All = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);
            const chart_Color_Filtered = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(1);

            const hovertemplate =  //  Added '<extra></extra>' to remove secondary box with trace name
                '<b>" + annotationType_Name_Score_Y_HTMLEncoded + "</b>: %{y}' +
                '<br><b>" + annotationType_Name_Score_X_HTMLEncoded + "</b>: %{x}<extra></extra>';

            chart_Data = [
                {
                    name: "Unfiltered",
                    x: chart_X_ALL__ScatterPlot,
                    y: chart_Y_ALL__ScatterPlot,
                    //  !!!!  hovertemplate is currently ignored since tooltips are disabled for scattergl chart due to Plotly performance problem
                    hovertemplate,
                    type: 'scattergl',
                    mode: 'markers',
                    marker: {
                        size: 2,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                        color: chart_Color_All  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                    }
                },
                {
                    name: "Filtered",
                    x: chart_X_Meet_PSM_Filters__ScatterPlot,
                    y: chart_Y_Meet_PSM_Filters__ScatterPlot,
                    //  !!!!  hovertemplate is currently ignored since tooltips are disabled for scattergl chart due to Plotly performance problem
                    hovertemplate,
                    type: 'scattergl',
                    mode: 'markers',
                    marker: {
                        size: 2,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                        color: chart_Color_Filtered,  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        symbol: "diamond"
                    }
                }
            ];

        } else {

            const msg = "Unknown value for this.props.propsValue.chartType: " + this.props.propsValue.chartType;
            console.warn(msg);
            throw Error(msg);
        }

        let showlegend_Chart = false;

        if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

            showlegend_Chart = true;
        }


        const chartTitle = "PSM " + annotationType_Name_Score_Y_HTMLEncoded + " vs " + annotationType_Name_Score_X_HTMLEncoded;

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: "PSM Score: " + annotationType_Name_Score_X_HTMLEncoded,
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
            chart_Y_Axis_Label: "PSM Score: " + annotationType_Name_Score_Y_HTMLEncoded,
            showlegend: showlegend_Chart
        });

        if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

            chart_Layout.hovermode = false;  //  TURN OFF Tooltips for Scatter Plot since get 100% CPU usage when too many points
        }

        try {
            //  First remove any existing plot, if it exists (And event listener on it)
            this._removeChart();
        } catch (e) {
            //  Eat Exception
        }

        if ( this.props.propsValue.isInSingleChartOverlay ) {

            const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();

            /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

            // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
            // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
            // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
            // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

            let chart_Width = Math.floor( targetDOMElement_domRect.width );
            let chart_Height = Math.floor( targetDOMElement_domRect.height );

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

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current, chartLayout: chart_Layout });

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

        const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );

        if ( ! this.props.propsValue.isInSingleChartOverlay ) {

            //  Add click handler on chart on main page to open chart in overlay

            qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
        }

    }

    /**
     *
     */
    private _openChartInOverlay( event ) {
        try {
            event.stopPropagation()
            open_PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.propsValue.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    annotationTypeId_Score_X: this.props.propsValue.annotationTypeId_Score_X,
                    annotationTypeId_Score_Y: this.props.propsValue.annotationTypeId_Score_Y
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _get_AnnotationTypeName_SearchProgramName( annotationTypeId: number ) : string {

        const projectSearchId = this.props.propsValue.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const annotationTypeItems_ForProjectSearchId =
            this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeItems_ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const searchProgramsPerSearchItems__ForProjectSearchId =
            this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! searchProgramsPerSearchItems__ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const psmFilterableAnnotationType = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId);
        if ( ! psmFilterableAnnotationType ) {
            const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get(annotationTypeId); returned nothing for annotationTypeId: " + annotationTypeId;
            console.warn(msg);
            throw Error(msg);
        }

        const searchProgramsPerSearchItem = searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId );
        if ( ! searchProgramsPerSearchItem ) {
            const msg = "searchProgramsPerSearchItems__ForProjectSearchId.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId ); returned nothing for psmFilterableAnnotationType.searchProgramsPerSearchId: " + psmFilterableAnnotationType.searchProgramsPerSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        return psmFilterableAnnotationType.name + " (" + searchProgramsPerSearchItem.name + ")"
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const style : React.CSSProperties = {};

        if ( this.props.propsValue.isInSingleChartOverlay ) {
            style.height = "100%";
        }

        return (
            <div style={ style }>
                <div ref={this.plot_Ref} style={ style }></div>
            </div>
        );
    }
}
