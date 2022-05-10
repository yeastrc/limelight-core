/**
 * qcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Target Y Axis VS Decoy X Axis by Annotation Score Statistics
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
import {AnnotationTypeItem} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {limelight__Encode_TextString_Escaping_HTML} from "page_js/common_all_pages/limelight__Encode_TextString_Escaping_HTML";
import {QcViewPage__ComputeColorsForCategories} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ComputeColorsForCategories";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {
    qcViewPage_SingleSearch__Open_PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer,
    QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_OverlayContainer";
import {CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData";
import {
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder,
    CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage__ReferenceLine_Y_equals_X_Calculation_Class";

// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE = "\u2265"; // ">=" as a single character
// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW = "\u2264"; // "<=" as a single character

// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_ABOVE_ASCII = ">=";
// const _PSM_COUNT_VS_SCORE_CHART_COMPARISON_DIRECTION_STRING_BELOW_ASCII = "<=";

// const _CHART_BIN_SIZE = 2;  //  xbins: { size: _CHART_BIN_SIZE }

/**
 *
 */
export interface QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number

    annotationTypeId_Score_X: number
    transform_Score: QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice

    score_Contains_NegativeValues_Callback: ( score_Contains_NegativeValues: boolean ) => void

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_Props, QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_State > {

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);

    private _renderChart = true;

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_Props) {
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
        this.image_Ref = React.createRef();

        this.state = {
            showCreatingMessage: true, showUpdatingMessage: false
        };
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.annotationTypeId_Score_X !== nextProps.annotationTypeId_Score_X  // new Array created when values change
            || this.props.transform_Score !== nextProps.transform_Score
            || this.props.isInSingleChartOverlay !== nextProps.isInSingleChartOverlay
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.annotationTypeId_Score_X !== prevProps.annotationTypeId_Score_X
                    || this.props.transform_Score !== prevProps.transform_Score
                    || this.props.isInSingleChartOverlay !== prevProps.isInSingleChartOverlay
                    // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                    // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                ) {
                } else {
                    //  Nothing changed so return

                    return;  // EARLY RETURN
                }

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

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const promises: Array<Promise<void>> = []

        let psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData_Holder
        {
            //  Get PSM_FilterableAnnotationData Unfiltered, including Decoy

            const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();

            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_X );

            const get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_FilterableAnnotationData().
                get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder({ psmFilterableAnnotationTypeIds_Requested });

            if ( get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.data ) {
                psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.data.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;
            } else if ( get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.then(value => { try {
                        psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder = value.psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder;
                        resolve(null);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_FilterableAnnotationData_Unfiltered__Include_DecoyPSMs__Holder_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }

        let psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder: CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder;
        {
            //  Get PSM_TblData Unfiltered, including Decoy

            const get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result =
                commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData().
                get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder();

            if ( get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result.data ) {
                psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result.data.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder;
            } else if ( get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise ) {
                const promise = new Promise<void>( (resolve, reject) => { try {
                    get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result.promise.then(value => { try {
                        psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder = value.psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder;
                        resolve(null);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                const msg = "get_PSM_TblData_Unfiltered__Include_DecoyPSMs__Holder_Result no data or promise";
                console.warn(msg);
                throw Error(msg);
            }
        }

        const promisesAll = Promise.all( promises );

        promisesAll.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                this.setState({ showCreatingMessage: false, showUpdatingMessage: false });

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

                ////////////

                //  Only Put Chart in DOM in Overlay so Only remove existing chart in Overlay.

                //  Have existing chart in overlay when re-populate chart when have window resize

                if ( this.props.isInSingleChartOverlay ) {
                    try {
                        //  First remove any existing plot, if it exists
                        this._removeChart();
                    } catch (e) {
                        //  Eat Exception
                    }
                }

                //  Colors for Bars
                const qcViewPage__ComputeColorsForCategories = new QcViewPage__ComputeColorsForCategories({ categoryCount: 1 });

                const annotationTypeId_Score_X = this.props.annotationTypeId_Score_X;

                //  Create Chart Data

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
                    annotationTypeItem_ForDisplayScore = annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( annotationTypeId_Score_X );
                    if ( ! annotationTypeItem_ForDisplayScore ) {
                        const msg = "annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.get( annotationTypeId_Score_X ); returned nothing for annotationTypeId_Score_X: + " + annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( ! annotationTypeItem_ForDisplayScore.filterDirectionAbove && ! annotationTypeItem_ForDisplayScore.filterDirectionBelow ). annotationTypeId_Score_X: + " + annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ) {
                    const msg = "( annotationTypeItem_ForDisplayScore.filterDirectionAbove && annotationTypeItem_ForDisplayScore.filterDirectionBelow ). annotationTypeId_Score_X: + " + annotationTypeId_Score_X + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let psmFilterableAnnotation_Score_Min : number = undefined
                let psmFilterableAnnotation_Score_Max : number = undefined

                const  psmTblData_Entries_ForProcessing: Array<CommonData_LoadedFromServer_SingleSearch__NO_PSM_Peptide_Protein_Filtering__PSM_TblData_Holder__ForSinglePsmId> = []

                {   //  Apply any filtering first

                    for (const psmTblData_Entry of psmTblData__NO_PSM_Peptide_Protein_Filtering__Holder.get_PsmTblData_Entries_IterableIterator()) {

                        if (this.props.searchScanFileId_Selection !== QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES) {
                            //  NOT 'All Files' selected

                            if (psmTblData_Entry.searchScanFileId !== undefined && psmTblData_Entry.searchScanFileId !== null) {

                                if (psmTblData_Entry.searchScanFileId !== this.props.searchScanFileId_Selection) {
                                    //  Not selected searchScanFileId so SKIP

                                    continue;  //  EARLY CONTINUE
                                }
                            }
                        }

                        psmTblData_Entries_ForProcessing.push( psmTblData_Entry );

                        //  Compute Min/Max values

                        const psmFilterableAnnotationData_Entry = psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId)
                        if ( ! psmFilterableAnnotationData_Entry ) {
                            const msg = "psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId); returned nothing. psmTblData_Entry.psmId: " + psmTblData_Entry.psmId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const psmFilterableAnnotationData_For_annotationTypeId_Score_X =
                            psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId_Score_X );

                        if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                            const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId ); returned nothing. annotationTypeId_Score_X: " + annotationTypeId_Score_X;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const psmFilterableAnnotation_Score = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber

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
                }

                if ( psmFilterableAnnotation_Score_Min < 0 ) {

                    //  Found Score < 0

                    const transform_Score_Local = this.props.transform_Score;  //  Save off since calling callback changes this.props.transform_Score

                    if ( this.props.score_Contains_NegativeValues_Callback ) {
                        this.props.score_Contains_NegativeValues_Callback(true)
                    }

                    if ( transform_Score_Local === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10
                        || transform_Score_Local === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {

                        //  Cannot create chart with Score < 0 and Transform Score to Log so return.  Parent component will change to not transform
                        return;  // EARLY RETURN
                    }

                } else {
                    //  NOT found Score < 0

                    if ( this.props.score_Contains_NegativeValues_Callback ) {
                        this.props.score_Contains_NegativeValues_Callback(false)
                    }
                }

                let annotationScores__Target_or_IndependentDecoy__Array: Array<number> = [];
                let annotationScores__Decoy__Array: Array<number> = [];

                for (const psmTblData_Entry of psmTblData_Entries_ForProcessing) {

                    const psmFilterableAnnotationData_Entry = psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId)
                    if ( ! psmFilterableAnnotationData_Entry ) {
                        const msg = "psmFilterableAnnotationData__NO_PSM_Peptide_Protein_Filtering__Holder.get_Per_Psm_Holder_For_PsmId(psmTblData_Entry.psmId); returned nothing. psmTblData_Entry.psmId: " + psmTblData_Entry.psmId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const psmFilterableAnnotationData_For_annotationTypeId_Score_X = psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId_Score_X );
                    if ( ! psmFilterableAnnotationData_For_annotationTypeId_Score_X ) {
                        const msg = "psmFilterableAnnotationData_Entry.get_PsmFilterableAnnotationData_For_AnnotationTypeId( annotationTypeId ); returned nothing. annotationTypeId_Score_X: " + annotationTypeId_Score_X;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const annotationScore = psmFilterableAnnotationData_For_annotationTypeId_Score_X.annotationValueNumber

                    if ( psmTblData_Entry.decoyPSM ) {
                        annotationScores__Decoy__Array.push(annotationScore)
                    } else {
                        annotationScores__Target_or_IndependentDecoy__Array.push(annotationScore)
                    }
                }

                if ( this.props.transform_Score === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                    const annotationScores__Target_or_IndependentDecoy__Array__New: Array<number> = [];
                    const annotationScores__Decoy__Array__New: Array<number> = [];

                    const log10_of_MinValue = Math.log10( Number.MIN_VALUE )

                    for ( const annotationScore of annotationScores__Target_or_IndependentDecoy__Array ) {
                        if ( annotationScore === 0 ) {

                            annotationScores__Target_or_IndependentDecoy__Array__New.push( log10_of_MinValue )
                        } else {

                            const log10_of_annotationScore = Math.log10( annotationScore )

                            annotationScores__Target_or_IndependentDecoy__Array__New.push( log10_of_annotationScore )
                        }
                    }
                    for ( const annotationScore of annotationScores__Decoy__Array ) {

                        if ( annotationScore === 0 ) {

                            annotationScores__Decoy__Array__New.push( Math.log10( log10_of_MinValue ) )
                        } else {

                            const log10_of_annotationScore = Math.log10( annotationScore )

                            annotationScores__Decoy__Array__New.push( log10_of_annotationScore )
                        }
                    }

                    annotationScores__Target_or_IndependentDecoy__Array = annotationScores__Target_or_IndependentDecoy__Array__New;
                    annotationScores__Decoy__Array = annotationScores__Decoy__Array__New;

                } else if ( this.props.transform_Score === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {

                    const annotationScores__Target_or_IndependentDecoy__Array__New: Array<number> = [];
                    const annotationScores__Decoy__Array__New: Array<number> = [];

                    const negative_log10_of_MinValue = -Math.log10( Number.MIN_VALUE )

                    for ( const annotationScore of annotationScores__Target_or_IndependentDecoy__Array ) {
                        if ( annotationScore === 0 ) {

                            annotationScores__Target_or_IndependentDecoy__Array__New.push( negative_log10_of_MinValue )
                        } else {
                            const negative_log10_of_annotationScore = -Math.log10( annotationScore )

                            annotationScores__Target_or_IndependentDecoy__Array__New.push( negative_log10_of_annotationScore )
                        }
                    }
                    for ( const annotationScore of annotationScores__Decoy__Array ) {
                        if ( annotationScore === 0 ) {

                            annotationScores__Decoy__Array__New.push( negative_log10_of_MinValue )
                        } else {

                            const negative_log10_of_annotationScore = -Math.log10( annotationScore )

                            annotationScores__Decoy__Array__New.push( negative_log10_of_annotationScore )
                        }
                    }

                    annotationScores__Target_or_IndependentDecoy__Array = annotationScores__Target_or_IndependentDecoy__Array__New;
                    annotationScores__Decoy__Array = annotationScores__Decoy__Array__New;
                }

                limelight__Sort_ArrayOfNumbers_SortArrayInPlace( annotationScores__Target_or_IndependentDecoy__Array );
                limelight__Sort_ArrayOfNumbers_SortArrayInPlace( annotationScores__Decoy__Array );


                const referenceLine_Y_equals_X_Calculation_Class = new QcViewPage__ReferenceLine_Y_equals_X_Calculation_Class()

                const chart_X: Array<number> = [];
                const chart_Y: Array<number> = [];

                {  //  Get elements from Target and Decoy arrays using an index at same 'proportion' of the array lengths

                    const annotationScores__Target_or_IndependentDecoy__Array__Length = annotationScores__Target_or_IndependentDecoy__Array.length
                    const annotationScores__Decoy__Array__Length = annotationScores__Decoy__Array.length

                    const shortest_AnnotationScores__Array_Length = Math.min( annotationScores__Target_or_IndependentDecoy__Array__Length, annotationScores__Decoy__Array__Length );
                    const largest_AnnotationScores__Array_Length = Math.max( annotationScores__Target_or_IndependentDecoy__Array__Length, annotationScores__Decoy__Array__Length );

                    const arrayLength_Scale = largest_AnnotationScores__Array_Length / shortest_AnnotationScores__Array_Length;

                    for ( let index_ShortestArray = 0; index_ShortestArray < shortest_AnnotationScores__Array_Length; index_ShortestArray++ ){

                        let lastIndex_Of_ShortestArray = false;
                        if ( index_ShortestArray >= ( shortest_AnnotationScores__Array_Length - 1 ) ) {
                            lastIndex_Of_ShortestArray = true;
                        }

                        { // Target - chart_Y

                            let annotationScore: number = undefined;

                            if ( annotationScores__Target_or_IndependentDecoy__Array__Length === shortest_AnnotationScores__Array_Length ) {

                                //  annotationScores__Target_or_IndependentDecoy__Array IS shortest array so use index index_ShortestArray

                                annotationScore = annotationScores__Target_or_IndependentDecoy__Array[ index_ShortestArray ];

                            } else {

                                //  annotationScores__Target_or_IndependentDecoy__Array is NOT shortest array so use index_ShortestArray * arrayLength_Scale

                                let index: number

                                if ( lastIndex_Of_ShortestArray ) {
                                    //  At last entry of Shortest Array.  Get LAST element of annotationScores__Target_or_IndependentDecoy__Array
                                    index = annotationScores__Target_or_IndependentDecoy__Array__Length - 1;

                                } else {

                                    index = Math.floor(index_ShortestArray * arrayLength_Scale);
                                }

                                annotationScore = annotationScores__Target_or_IndependentDecoy__Array[ index ];
                            }

                            chart_Y.push( annotationScore )

                            referenceLine_Y_equals_X_Calculation_Class.y_Entry( annotationScore )
                        }

                        { // Decoy - chart_X

                            let annotationScore: number = undefined;

                            if ( annotationScores__Decoy__Array__Length === shortest_AnnotationScores__Array_Length ) {

                                //  annotationScores__Decoy__Array IS shortest array so use index index_ShortestArray

                                annotationScore = annotationScores__Decoy__Array[ index_ShortestArray ];

                            } else {

                                //  annotationScores__Decoy__Array is NOT shortest array so use index_ShortestArray * arrayLength_Scale

                                let index: number

                                if ( lastIndex_Of_ShortestArray ) {
                                    //  At last entry of Shortest Array.  Get LAST element of annotationScores__Decoy__Array
                                    index = annotationScores__Decoy__Array__Length - 1;

                                } else {

                                    index = Math.floor(index_ShortestArray * arrayLength_Scale);
                                }

                                annotationScore = annotationScores__Decoy__Array[ index ];
                            }

                            chart_X.push( annotationScore )

                            referenceLine_Y_equals_X_Calculation_Class.x_Entry( annotationScore )
                        }
                    }
                }

                const chart_Data = []

                const annotationType_Name_Score : string = this._get_AnnotationTypeName_SearchProgramName( this.props.annotationTypeId_Score_X );

                const annotationType_Name_Score_HTMLEncoded = limelight__Encode_TextString_Escaping_HTML( annotationType_Name_Score );

                let axisLabel__AnnotationTypeName = annotationType_Name_Score_HTMLEncoded;

                if ( this.props.transform_Score === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10 ) {

                    axisLabel__AnnotationTypeName = "Log10(" + axisLabel__AnnotationTypeName + ")";

                } else if ( this.props.transform_Score === QcViewPage_SingleSearch__PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10 ) {

                    axisLabel__AnnotationTypeName = "-Log10(" + axisLabel__AnnotationTypeName + ")";
                }

                {  //  Plot Reference Line

                    const referenceLine_XY = referenceLine_Y_equals_X_Calculation_Class.get_ReferenceLine_XY();

                    const chart_Entry =    {
                        x: [ referenceLine_XY.referenceLine_BottomLeft_XY, referenceLine_XY.referenceLine_TopRight_XY ],
                        y: [ referenceLine_XY.referenceLine_BottomLeft_XY, referenceLine_XY.referenceLine_TopRight_XY ],
                        type: 'scattergl',
                        mode: 'lines',
                        marker: {
                            size: 2,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                            color: "#FFDDDD"  // Color of Reference line.  If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                        },
                        name: "Reference Line: y = x"
                    }

                    chart_Data.push( chart_Entry )
                }

                {  //  Plot Data
                    const chart_Color = "#" + qcViewPage__ComputeColorsForCategories.get_Color_AsHexString_By_Index(0);

                    //  Marker Size
                    let marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__MAIN_PAGE;
                    if ( this.props.isInSingleChartOverlay ) {
                        marker_Size = QcViewPage_CommonAll_Constants.SCATTERPLOT_MARKER_SIZE__OVERLAY;
                    }

                    const chart_Entry =    {
                        x: chart_X,
                        y: chart_Y,
                        type: 'scattergl',
                        mode: 'markers',
                        marker: {
                            size: marker_Size,  //  https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                            color: chart_Color
                        },
                        name: "Unfiltered Data",
                    }

                    chart_Data.push( chart_Entry )
                }


                const chartTitle = "Target-Decoy Q-Q Plot by Score" + "<br><sup>Note: Data in plot are not filtered.</sup>";

                const chart_X_Axis_Label = "Decoy Score: " + axisLabel__AnnotationTypeName;
                const chart_Y_Axis_Label = "Target Score: " + axisLabel__AnnotationTypeName;

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label,
                    //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
                    chart_Y_Axis_Label,
                    showlegend: true
                });

                chart_Layout.hovermode = false;  //  TURN OFF Tooltips for Scatter Plot GL since get 100% CPU usage when too many points with very similar X or Y

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

                if ( ! this.props.isInSingleChartOverlay ) {

                    //  Main Page Plot

                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                        plotly_CreatePlot_Params: { chart_Data, chart_Layout, chart_config },
                        chart_Width: chart_Layout.width,
                        chart_Height: chart_Layout.height,
                        image_DOM_Element: this.image_Ref.current,
                        changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                        plotRendered_Success_Callback: () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        },
                        plotRendered_Fail_Callback:  () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        }
                    });

                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
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
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        },
                        plotRendered_Fail_Callback:  () : void => {
                            this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                        }
                    });

                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                    qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot({
                        qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
                    });
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
            if ( this.plot_Ref.current ) {
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                removeChart_InOverlay_FromDOM({ plot_Div_DOM_Element: this.plot_Ref.current });
            }
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _openChartInOverlay() {
        try {
            qcViewPage_SingleSearch__Open_PSM_Target_Yaxis_VS_Decoy_Xaxis_ByAnnScore_StatisticsPlot_OverlayContainer({
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

        return (

            <React.Fragment>

                {( this.props.isInSingleChartOverlay ) ? (
                    //  For Single Chart Overlay: div the chart will be rendered into
                    <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"></div>
                ) : (
                    //  For Main Page: img the chart will be inserted into
                    <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"></img>
                )}

                {( this.state.showCreatingMessage ) ? (

                    <QcPage_CreatingPlot_BlockCover/>

                ): ( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): ( ! this.props.isInSingleChartOverlay ) ? (

                    //  Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click
                    <QcPage_ClickPlot_ForInteractivePlot_BlockCover
                        clickHandler_Callback={ this._openChartInOverlay_BindThis }
                    />

                ) : null }

            </React.Fragment>
        );
    }


}
