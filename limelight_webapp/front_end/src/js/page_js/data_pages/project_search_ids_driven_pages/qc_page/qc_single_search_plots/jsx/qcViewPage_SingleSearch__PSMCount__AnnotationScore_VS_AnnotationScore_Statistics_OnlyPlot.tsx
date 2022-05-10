/**
 * qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics - Only The Plot
 *
 */

import React from "react";

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
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType,
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData";
import {
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId,
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData";
import {QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer";

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch

    psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
    psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number
    annotationTypeId_Score_Y: number

    transform_Score_X: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice
    transform_Score_Y: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice

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

    private _renderChart = true; // Never changes

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

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
        this.image_Ref = React.createRef();

        this.state = {};
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }
        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }

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

                try {
                    if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                        this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
                    }
                } catch (e) {
                    //  Eat Exception
                }
                try {
                    if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                        this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
                    }
                } catch (e) {
                    //  Eat Exception
                }

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
            if ( this.plot_Ref.current ) {
                this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                removeChart_InOverlay_FromDOM({ plot_Div_DOM_Element: this.plot_Ref.current });
            }
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _populateChart() {

        const projectSearchId = this.props.propsValue.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = this.props.propsValue.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;

        console.log( "psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: Number of Entries (Number of PSMs): " + psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_Entries_Size() );

        let psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder = undefined;

        if ( this.props.propsValue.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

            psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = this.props.propsValue.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder
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

        const psmFilterableAnnotationData_Entries_Meet_Filters: Array< CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId> = [];
        const psmFilterableAnnotationData_Entries_NOT_Meet_Filters: Array< CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_For_PSM_Holder__ForSinglePsmId> = [];

        for ( const psmFilterableAnnotationData_Unfiltered_Entry of psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_Entries_IterableIterator() ) {

            if ( this.props.propsValue.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                const psmData = psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId );
                if ( ! psmData ) {
                    const msg = "psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId ); returned nothing for psmFilterableAnnotationData_Unfiltered_Entry.psmId: " + psmFilterableAnnotationData_Unfiltered_Entry.psmId +
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

        const log10_Number_Min_Value = Math.log10( Number.MIN_VALUE )
        const negative_log10_Number_Min_Value = -Math.log10( Number.MIN_VALUE )

        const transform_ScoreValue_BasedOn_UserInput = (
            {
                score_X, score_Y
            } : {
                score_X: number
                score_Y: number
            }
        ) : {
            score_PossiblyTransformed__X: number
            score_PossiblyTransformed__Y: number
        } => {

            let score_PossiblyTransformed__X = score_X
            let score_PossiblyTransformed__Y = score_Y

            //  Transform Score values as requested

            if ( this.props.propsValue.transform_Score_X === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                if ( score_PossiblyTransformed__X === 0 ) {
                    score_PossiblyTransformed__X = log10_Number_Min_Value
                } else {
                    score_PossiblyTransformed__X = Math.log10( score_PossiblyTransformed__X )
                }

            } else if ( this.props.propsValue.transform_Score_X === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {

                if ( score_PossiblyTransformed__X === 0 ) {
                    score_PossiblyTransformed__X = negative_log10_Number_Min_Value
                } else {
                    score_PossiblyTransformed__X = -Math.log10( score_PossiblyTransformed__X )
                }
            }

            if ( this.props.propsValue.transform_Score_Y === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                if ( score_PossiblyTransformed__Y === 0 ) {
                    score_PossiblyTransformed__Y = log10_Number_Min_Value
                } else {
                    score_PossiblyTransformed__Y = Math.log10( score_PossiblyTransformed__Y )
                }

            } else if ( this.props.propsValue.transform_Score_Y === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {

                if ( score_PossiblyTransformed__Y === 0 ) {
                    score_PossiblyTransformed__Y = negative_log10_Number_Min_Value
                } else {
                    score_PossiblyTransformed__Y = -Math.log10( score_PossiblyTransformed__Y )
                }
            }

            return { score_PossiblyTransformed__X, score_PossiblyTransformed__Y }
        }

        //

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

            let score_X: number = undefined;
            let score_Y: number = undefined;
            {
                const {score_PossiblyTransformed__X, score_PossiblyTransformed__Y} = transform_ScoreValue_BasedOn_UserInput({
                    score_X: psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber,
                    score_Y: psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber
                })

                score_X = score_PossiblyTransformed__X;
                score_Y = score_PossiblyTransformed__Y;
            }

            if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT ) {

                chart_X_2D_DensityPlot.push(score_X);
                chart_Y_2D_DensityPlot.push(score_Y);

            } else if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

                chart_X_ALL__ScatterPlot.push(score_X);
                chart_Y_ALL__ScatterPlot.push(score_Y);
            } else {
                const msg = "Unknown value for this.props.propsValue.chartType: " + this.props.propsValue.chartType;
                console.warn(msg);
                throw Error(msg);
            }

            {
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

                let score_X: number = undefined;
                let score_Y: number = undefined;
                {
                    const {score_PossiblyTransformed__X, score_PossiblyTransformed__Y} = transform_ScoreValue_BasedOn_UserInput({
                        score_X: psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber,
                        score_Y: psmFilterableAnnotationData_For_annotationTypeId_Score_Y.annotationValueNumber
                    })

                    score_X = score_PossiblyTransformed__X;
                    score_Y = score_PossiblyTransformed__Y;
                }

                if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT ) {

                    chart_X_2D_DensityPlot.push(score_X);
                    chart_Y_2D_DensityPlot.push(score_Y);

                } else if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

                    chart_X_Meet_PSM_Filters__ScatterPlot.push(score_X);
                    chart_Y_Meet_PSM_Filters__ScatterPlot.push(score_Y);

                    //  Also put in "All"

                    chart_X_ALL__ScatterPlot.push(score_X);
                    chart_Y_ALL__ScatterPlot.push(score_Y);

                } else {
                    const msg = "Unknown value for this.props.propsValue.chartType: " + this.props.propsValue.chartType;
                    console.warn(msg);
                    throw Error(msg);
                }

                {
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
        }

        {
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: annotationType_Name_Score_X: " + annotationType_Name_Score_X );
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: annotationType_Name_Score_Y: " + annotationType_Name_Score_Y );
            console.log( "PSMCount__AnnotationScore_VS_AnnotationScore: min_Score_X: " + min_Score_X + ", max_Score_X: " + max_Score_X + ", min_Score_Y: " + min_Score_Y + ", max_Score_Y: " + max_Score_Y );
        }


        const annotationType_Name_Score_X_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score_X );

        const annotationType_Name_Score_Y_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score_Y );


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

            //  Marker Size
            let marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__MAIN_PAGE;
            if ( this.props.propsValue.isInSingleChartOverlay ) {
                marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__OVERLAY;
            }

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
                        size: marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
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
                        size: marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
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

        let chart_X_Axis_Label = annotationType_Name_Score_X_HTMLEncoded;
        let chart_Y_Axis_Label = annotationType_Name_Score_Y_HTMLEncoded

        if ( this.props.propsValue.transform_Score_X === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10 ) {
            chart_X_Axis_Label = "Log10(" + chart_X_Axis_Label + ")";

        } else if ( this.props.propsValue.transform_Score_X === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {
            chart_X_Axis_Label = "-Log10(" + chart_X_Axis_Label + ")";
        }

        if ( this.props.propsValue.transform_Score_Y === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10 ) {
            chart_Y_Axis_Label = "Log10(" + chart_Y_Axis_Label + ")";

        } else if ( this.props.propsValue.transform_Score_Y === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {
            chart_Y_Axis_Label = "-Log10(" + chart_Y_Axis_Label + ")";
        }

        chart_X_Axis_Label = "PSM Score: " + chart_X_Axis_Label;
        chart_Y_Axis_Label = "PSM Score: " + chart_Y_Axis_Label;

        const chartTitle = "PSM " + annotationType_Name_Score_Y_HTMLEncoded + " vs " + annotationType_Name_Score_X_HTMLEncoded;

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label,
            //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
            chart_Y_Axis_Label,
            showlegend: showlegend_Chart
        });

        if ( this.props.propsValue.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT ) {

            chart_Layout.hovermode = false;  //  TURN OFF Tooltips for Scatter Plot since get 100% CPU usage when too many points with very similar X or Y
        }

        ////////////

        //  Only Put Chart in DOM in Overlay so Only remove existing chart in Overlay.

        //  Have existing chart in overlay when re-populate chart when have window resize

        if ( this.props.propsValue.isInSingleChartOverlay ) {
            try {
                //  First remove any existing plot, if it exists
                this._removeChart();
            } catch (e) {
                //  Eat Exception
            }
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

        if ( ! this.props.propsValue.isInSingleChartOverlay ) {

            //  Main Page Plot

            this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
                chart_Width: chart_Layout.width,
                chart_Height: chart_Layout.height,
                image_DOM_Element: this.image_Ref.current,
                changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                plotRendered_Success_Callback: () : void => {
                    // this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                },
                plotRendered_Fail_Callback:  () : void => {
                    // this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                }
            });

            this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
            qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG({
                qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
            });

        } else {

            //  Overlay Plot

            this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params({
                plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
                chart_Width: chart_Layout.width,
                chart_Height: chart_Layout.height,
                plot_Div_DOM_Element: this.plot_Ref.current,
                changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                plotRendered_Success_Callback: () : void => {
                    // this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                },
                plotRendered_Fail_Callback:  () : void => {
                    // this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                }
            });

            this.props.propsValue.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
            qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot({
                qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
            });
        }

    }

    /**
     *
     */
    private _openChartInOverlay() {
        try {
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

        return (

            <React.Fragment>

                {( this.props.propsValue.isInSingleChartOverlay ) ? (
                    //  For Single Chart Overlay: div the chart will be rendered into
                    <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"></div>
                ) : (
                    //  For Main Page: img the chart will be inserted into
                    <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"></img>
                )}

                {
                    /*
                    ( this.state.showCreatingMessage ) ? (

                    <QcPage_CreatingPlot_BlockCover/>

                ): ( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ):
                */

                    ( ! this.props.propsValue.isInSingleChartOverlay ) ? (

                        //  Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click
                        <QcPage_ClickPlot_ForInteractivePlot_BlockCover
                            clickHandler_Callback={ this._openChartInOverlay_BindThis }
                        />

                    ) : null }

            </React.Fragment>
        );
    }
}
