/**
 * qcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics
 *
 */


import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    qcPage_StandardChartLayout,
    qcPage_StandardChartLayout_ActualChartArea_Width,
    qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {AnnotationTypeItem} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {open_PSMCount_VS_AnnotationScore_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";

const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE = "\u2265"; // ">=" as a single character
const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW = "\u2264"; // "<=" as a single character

// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE_ASCII = ">=";
// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW_ASCII = "<=";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number
    // rawCounts_Percentage_Choice: QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_RawCounts_Percentage_Choice_ENUM

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_State > {

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private _renderChart = true;

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const projectSearchId =
                props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

            const annotationTypeItems_ForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
            if ( ! annotationTypeItems_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.size < 1 ) {
                // No Data for chart so NOT render it
                this._renderChart = false;

            } else {

            }
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

            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateChart();

                        if ( this.props.isInSingleChartOverlay ) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.annotationTypeId_Score_X !== nextProps.annotationTypeId_Score_X
            // || this.props.rawCounts_Percentage_Choice !== nextProps.rawCounts_Percentage_Choice
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.annotationTypeId_Score_X !== prevProps.annotationTypeId_Score_X
                    // || this.props.rawCounts_Percentage_Choice !== prevProps.rawCounts_Percentage_Choice
                    || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                    // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                ) {
                } else {
                    //  Nothing changed so return

                    return;  // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: true });

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
    private _populateChart() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();

        psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_X );

        const promises: Array<Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>> = []

        {
            const promise =
                this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData_Unfiltered({ psmFilterableAnnotationTypeIds_Requested });

            promises.push(promise);
        }
        {
            if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                const promise =
                    this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                    qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData_Unfiltered__PsmTblData();

                promises.push(promise);
            }
        }

        const promisesAll = Promise.all( promises );

        promisesAll.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: false });

                console.warn( "promise.catch(...): reason: ", reason );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promisesAll.then( values => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                const value = values[0]; // Just use first entry

                const psmFilterableAnnotationData_Unfiltered = value.psmFilterableAnnotationData_Unfiltered;

                let psmTblData_Unfiltered: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root = undefined;

                if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                    psmTblData_Unfiltered = value.psmTblData_Unfiltered
                }

                let  annotationTypeItem_ForDisplayScore: AnnotationTypeItem = undefined;
                {
                    const annotationTypeItems_ForProjectSearchId =
                        this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                        dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
                    if ( ! annotationTypeItems_ForProjectSearchId ) {
                        const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    annotationTypeItem_ForDisplayScore = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( this.props.annotationTypeId_Score_X );
                    if ( ! annotationTypeItem_ForDisplayScore ) {
                        const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( this.props.annotationTypeId_Score_X ); returned nothing for this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ). this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ). this.props.annotationTypeId_Score_X: + " + this.props.annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let chart_Width : number = undefined
                let chart_Height : number = undefined

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

                    chart_Width = Math.floor( targetDOMElement_domRect.width );
                    chart_Height = Math.floor( targetDOMElement_domRect.height );

                    //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

                    // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
                    //
                    // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                    // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                    //
                    // if ()
                } else {

                    chart_Width = qcPage_StandardChartLayout_StandardWidth();
                    chart_Height = qcPage_StandardChartLayout_StandardHeight();
                }

                let psmFilterableAnnotation_Scores : Array<number> = [];
                let psmFilterableAnnotation_Score_Min : number = undefined
                let psmFilterableAnnotation_Score_Max : number = undefined

                for ( const psmFilterableAnnotationData_Unfiltered_Entry of psmFilterableAnnotationData_Unfiltered.get_Per_Psm_Holder_Entries_IterableIterator() ) {

                    if ( this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES ) {

                        const psmData = psmTblData_Unfiltered.get_PsmTblData_Unfiltered_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId );
                        if ( ! psmData ) {
                            const msg = "psmTblData.get_PsmTblData_For_PsmId( psmFilterableAnnotationData_Unfiltered_Entry.psmId ); returned nothing for psmFilterableAnnotationData_Unfiltered_Entry.psmId: " + psmFilterableAnnotationData_Unfiltered_Entry.psmId +
                                ", projectSearchId: " + this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        if ( psmData.searchScanFileId !== undefined && psmData.searchScanFileId !== null ) {
                            if ( psmData.searchScanFileId !== this.props.searchScanFileId_Selection ) {
                                //  Not selected searchScanFileId so SKIP

                                continue;  //  EARLY CONTINUE
                            }
                        }
                    }

                    const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                        psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_X );

                    if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                        const msg = "psmFilterableAnnotationData_Unfiltered_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( this.props.annotationTypeId_Score_X ); returned nothing. this.props.annotationTypeId_Score_X: " + this.props.annotationTypeId_Score_X;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const psmFilterableAnnotation_Score = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber

                    psmFilterableAnnotation_Scores.push( psmFilterableAnnotation_Score );

                    if ( psmFilterableAnnotation_Score_Min === undefined ) {
                        psmFilterableAnnotation_Score_Min = psmFilterableAnnotation_Score;
                        psmFilterableAnnotation_Score_Max = psmFilterableAnnotation_Score;
                    } else {
                        if ( psmFilterableAnnotation_Score_Min > psmFilterableAnnotation_Score ) {
                            psmFilterableAnnotation_Score_Min = psmFilterableAnnotation_Score
                        }
                        if ( psmFilterableAnnotation_Score_Max < psmFilterableAnnotation_Score ) {
                            psmFilterableAnnotation_Score_Max = psmFilterableAnnotation_Score
                        }
                    }
                }

                //  Change Min/Max to include Zero if needed
                if ( psmFilterableAnnotation_Score_Min > 0 ) {
                    psmFilterableAnnotation_Score_Min = 0;
                }
                if ( psmFilterableAnnotation_Score_Max < 0 ) {
                    psmFilterableAnnotation_Score_Max = 0;
                }

                //  Bin the values into buckets

                const binCount = Math.floor( ( chart_Width - ( qcPage_StandardChartLayout_StandardWidth() - qcPage_StandardChartLayout_ActualChartArea_Width() ) ) * 2 );
                const binSize = ( psmFilterableAnnotation_Score_Max - psmFilterableAnnotation_Score_Min ) / binCount;

                //  Process data into bins

                let scoreValueMinValueCount = 0;
                const scoreValueCounts = new Array<number>();
                for ( const scoreValue of psmFilterableAnnotation_Scores ) {
                    const scoreValueFraction = ( scoreValue - psmFilterableAnnotation_Score_Min ) / ( psmFilterableAnnotation_Score_Max - psmFilterableAnnotation_Score_Min );
                    let bin = Math.floor( ( scoreValueFraction ) * binCount );
                    if ( bin < 0 ) {
                        bin = 0;
                    } else if ( bin >= binCount ) {
                        bin = binCount - 1;
                    }
                    if ( scoreValueCounts[ bin ] ) {
                        scoreValueCounts[bin]++;
                    } else {
                        scoreValueCounts[bin] = 1;
                    }
                    if ( scoreValue === psmFilterableAnnotation_Score_Min ) {
                        scoreValueMinValueCount++;
                    }
                }

                const chartBucketArray = new Array<{ binStart: number, binEnd: number, totalScoreValueCount: number}>()

                if ( annotationTypeItem_ForDisplayScore.filterDirectionBelow && psmFilterableAnnotation_Score_Min == 0 ) {
                    //  Special case bucket for left edge, originally for Q-Value value of zero
                    //  Only create if FilterDirectionType.BELOW and min value is zero
                    const chartBucket = { binStart: psmFilterableAnnotation_Score_Min, binEnd: psmFilterableAnnotation_Score_Min, totalScoreValueCount: scoreValueMinValueCount };
                    chartBucketArray.push( chartBucket );
                }

                //  Take the data in the bins and  create "buckets" in the format required for the charting API
                let totalScoreValueCount = 0;
                // TODO
                if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
                    totalScoreValueCount = psmFilterableAnnotation_Scores.length;
                }
                for ( let binIndex = 0; binIndex < binCount; binIndex++ ) {
                    const scoreValueCount = scoreValueCounts[ binIndex ];
                    if ( scoreValueCount === undefined ) {
                        //  !!  NO Value at binIndex
                        continue; // EARLY CONTINUE
                    }
                    if ( annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                        //  Increment it before taking the value
                        totalScoreValueCount += scoreValueCount;
                    }

                    const binStart_Calculated = ( ( binIndex * binSize ) + psmFilterableAnnotation_Score_Min );
                    let binStart = binStart_Calculated;
                    if ( binIndex === 0 && binStart_Calculated < psmFilterableAnnotation_Score_Min ) {
                        binStart =  psmFilterableAnnotation_Score_Min;
                    }
                    const binEnd = ( binIndex + 1 ) * binSize + psmFilterableAnnotation_Score_Min ;
                    const chartBucket = { binStart, binEnd, totalScoreValueCount };
                    chartBucketArray.push( chartBucket );

                    if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
                        //  Decrement it after taking the value
                        totalScoreValueCount -= scoreValueCount;
                    }
                }


                let comparisonDirectionString = _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW;
                if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
                    comparisonDirectionString = _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE;
                }

                const chart_X : Array<number> = []
                const chart_Y : Array<number> = []
                const chart_Bars_Tooltips : Array<string> = []

                const annotationType_Name_Score_X : string = this._get_AnnotationTypeName_SearchProgramName( this.props.annotationTypeId_Score_X );

                const annotationType_Name_Score_X_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score_X );

                {
                    const psmFilterableAnnotation_Scores_Length = psmFilterableAnnotation_Scores.length;

                    for ( const chartBucket of chartBucketArray ) {

                        let chartDataValue = chartBucket.totalScoreValueCount;
                        // if ( this.props.rawCounts_Percentage_Choice === QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_RawCounts_Percentage_Choice_ENUM.PERCENTAGE ) {
                        //     chartDataValue = chartDataValue / psmFilterableAnnotation_Scores_Length * 100;
                        // }
                        //  For "above" display the left edge of the bucket, otherwise the right edge
                        let bucketStartOrEndForDisplayNumber;
                        if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove ) {
                            bucketStartOrEndForDisplayNumber = chartBucket.binStart;
                        } else {
                            bucketStartOrEndForDisplayNumber = chartBucket.binEnd;
                        }

                        chart_X.push( bucketStartOrEndForDisplayNumber );
                        chart_Y.push( chartDataValue );

                        // let tooltipContent = '<b>Raw Count</b>: ' + chartBucket.totalScoreValueCount.toLocaleString();
                        // if ( this.props.rawCounts_Percentage_Choice === QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_RawCounts_Percentage_Choice_ENUM.PERCENTAGE ) {
                        //     tooltipContent += '<br><b>Percentage of Max</b>: ' + chartDataValue.toFixed( 4 );
                        // }
                        // tooltipContent += '<br>' + annotationType_Name_Score_X_HTMLEncoded + ' ' + comparisonDirectionString + ' ' + bucketStartOrEndForDisplayNumber.toFixed( 4 );

                        const tooltipContent = '<b>PSM Count</b>: ' + chartBucket.totalScoreValueCount.toLocaleString() +
                            '<br>' + annotationType_Name_Score_X_HTMLEncoded + ' ' + comparisonDirectionString + ' ' + bucketStartOrEndForDisplayNumber.toFixed( 4 );

                        chart_Bars_Tooltips.push( tooltipContent );
                    }
                }

                //  Colors for Bars
                const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

                const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

                const chart_Data = [
                    {
                        x: chart_X,
                        y: chart_Y,
                        type: 'scatter',  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'scatter'
                        hoverinfo: "text", //  Hover contents
                        hovertext: chart_Bars_Tooltips,  //  Hover contents per bar
                        marker: {
                            color: chart_Color  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        }
                    }
                ];

                const chartTitle = "Cumulative PSM Count vs " + annotationType_Name_Score_X_HTMLEncoded + "<br><sup>Note: Data in plot are not filtered.</sup>";
                const chart_X_Axis_Label = "PSM Score: " + annotationType_Name_Score_X_HTMLEncoded;
                let chart_Y_Axis_Label = "# PSM " + comparisonDirectionString + " " + annotationType_Name_Score_X_HTMLEncoded;
                // if ( this.props.rawCounts_Percentage_Choice === QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot_RawCounts_Percentage_Choice_ENUM.PERCENTAGE ) {
                //     chart_Y_Axis_Label = "# PSM " + comparisonDirectionString + " " + annotationType_Name_Score_X_HTMLEncoded + " (% of max)";
                // }

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label,
                    //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
                    chart_Y_Axis_Label,
                    showlegend: false
                });

                if ( this.props.isInSingleChartOverlay ) {

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

                const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );

                this.setState({ showUpdatingMessage: false });

                if ( ! this.props.isInSingleChartOverlay ) {

                    //  Add click handler on chart on main page to open chart in overlay

                    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
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
    private _openChartInOverlay( event ) {
        try {
            event.stopPropagation()
            open_PSMCount_VS_AnnotationScore_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    annotationTypeId_Score_X: this.props.annotationTypeId_Score_X
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

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const annotationTypeItems_ForProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeItems_ForProjectSearchId ) {
            const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }
        const searchProgramsPerSearchItems__ForProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
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
