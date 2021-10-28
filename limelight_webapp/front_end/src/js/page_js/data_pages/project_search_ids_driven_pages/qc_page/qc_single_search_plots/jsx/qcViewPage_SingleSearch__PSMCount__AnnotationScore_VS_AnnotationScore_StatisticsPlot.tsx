/**
 * qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot,
    QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot";
import {QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";


/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...)

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selection: number
    annotationTypeId_Score_X: number
    annotationTypeId_Score_Y: number

    isInSingleChartOverlay: boolean

    chartType: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...)

    showUpdatingMessage?: boolean
    onlyPlot_PropsValue?: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    private _prevProps: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const searchDataLookupParamsForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchDataLookupParamsRoot.
                    paramsForProjectSearchIds.paramsForProjectSearchIdsList[0];

            const projectSearchId = searchDataLookupParamsForProjectSearchId.projectSearchId;

            const annotationTypeItems_ForProjectSearchId =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
            if ( ! annotationTypeItems_ForProjectSearchId ) {
                const msg = "dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes.size < 2 ) {
                // No Data for chart so NOT render it
                this._renderChart = false;

            } else {

            }
        }

        this._prevProps = props;

        this.state = { };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateChartData();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State>, nextContext: any): boolean {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selection !== nextProps.searchScanFileId_Selection
            || this.props.annotationTypeId_Score_X !== nextProps.annotationTypeId_Score_X
            || this.props.annotationTypeId_Score_Y !== nextProps.annotationTypeId_Score_Y
            || this.props.chartType !== nextProps.chartType
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
            || this.state.onlyPlot_PropsValue !== nextState.onlyPlot_PropsValue
        ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //   REMOVE ALL State property checks in componentDidUpdate

                if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    || this.props.searchScanFileId_Selection !== prevProps.searchScanFileId_Selection
                    || this.props.annotationTypeId_Score_X !== prevProps.annotationTypeId_Score_X
                    || this.props.annotationTypeId_Score_Y !== prevProps.annotationTypeId_Score_Y
                    || this.props.chartType !== prevProps.chartType
                    // || this.state.onlyPlot_PropsValue !== prevState.onlyPlot_PropsValue  //   REMOVE ALL State property checks in componentDidUpdate
                    // || this.state.showUpdatingMessage !== nextState.showUpdatingMessage  //   REMOVE ALL State property checks in componentDidUpdate
                ) {
                } else {
                    return;
                }

                this._prevProps = this.props;

                this.setState({ showUpdatingMessage: true });

                window.setTimeout(() => {
                    try {
                        this._populateChartData();

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
    private _populateChartData() {

        const promises: Array<Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>> = []
        {
            const psmFilterableAnnotationTypeIds_Requested: Set<number> = new Set();

            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_X )
            psmFilterableAnnotationTypeIds_Requested.add( this.props.annotationTypeId_Score_Y );

            const promise =
                this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmFilterableAnnotationData_Unfiltered({ psmFilterableAnnotationTypeIds_Requested });

            promises.push(promise);
        }
        {
            const promise =
                this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PerScore_Statistics_PsmTblData();

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
                this.setState({ showUpdatingMessage: false });

                console.warn( "promise.catch(...): reason: ", reason );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promisesAll.then( values => {
            try {
                const value = values[0]; // Just use first entry

                this.setState({ showUpdatingMessage: false });

                const onlyPlot_PropsValue : QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot_Props_PropsValue = {

                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: value,

                    searchScanFileId_Selection: this.props.searchScanFileId_Selection,
                    annotationTypeId_Score_X: this.props.annotationTypeId_Score_X,
                    annotationTypeId_Score_Y: this.props.annotationTypeId_Score_Y,

                    isInSingleChartOverlay: this.props.isInSingleChartOverlay,

                    chartType: this.props.chartType
                }

                this.setState({ onlyPlot_PropsValue });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
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
            <div style={ style } >
                { ( this.state.onlyPlot_PropsValue ) ? (
                    <div style={ style }>
                        <QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_Statistics_OnlyPlot
                            propsValue={ this.state.onlyPlot_PropsValue }
                        />
                        {( this.state.showUpdatingMessage ) ? (

                            <QcPage_UpdatingData_BlockCover/>
                            
                        ): null }
                    </div>
                ): (
                    <div>
                        LOADING DATA
                    </div>
                ) }
            </div>
        );
    }
}


