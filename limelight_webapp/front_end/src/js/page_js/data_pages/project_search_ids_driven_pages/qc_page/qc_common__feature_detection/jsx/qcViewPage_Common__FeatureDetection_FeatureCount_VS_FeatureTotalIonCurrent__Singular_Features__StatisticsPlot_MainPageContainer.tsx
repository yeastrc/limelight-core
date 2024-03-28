/**
 * qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer.tsx
 *
 * QC Page Common : Feature Detection: Feature Count Y Axis VS Total Ion Current X Axis Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot,
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType,
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer";
import { QcViewPage_Common__FeatureDetection__DataToPlot_Parameters } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters";

/**
 *
 */
export interface QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer_Props {

    dataToPlot : QcViewPage_Common__FeatureDetection__DataToPlot_Parameters

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer_State {

    force_Rerender?: {}
}

/**
 *
 */
export class QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer extends React.Component< QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer_Props, QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters
    private _qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function_BindThis =
        this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function.bind(this);

    private _DONOTCALL() {

        //  Validate local functions meet function type

        const qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType =
            this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function
    }

    private _renderChart = true;

    private _show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection: {
        feature_detection_root__project_scnfl_mapping_tbl__id: number
        scans_NotContain_TotalIonCurrent: boolean
    } = null

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer_Props) {
        super(props);

        // if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ||
        //     props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) ) {
        //
        //     // No Data for chart so NOT render it
        //
        //     this._renderChart = false;
        // }

        this.state = {
            force_Rerender: {}
        };
    }

    /**
     *  Called from main chart code when scan not have Total Ion Current
     */
    private _qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function(
        params: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params
    ) : void {

        this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection =
            {
                feature_detection_root__project_scnfl_mapping_tbl__id: this.props.dataToPlot.feature_detection_root__project_scnfl_mapping_tbl__id,
                scans_NotContain_TotalIonCurrent: params.scans_NotContain_TotalIonCurrent
            }

        this.setState({ force_Rerender: {} } )
    }

    /**
     *
     */
    render() {
        try {
            if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection &&
                ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id !== this.props.dataToPlot.feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
                this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = null;  // reset to null since not currently selected id
            }

            if ( ! this._renderChart ) {
                //  Skip render Chart
                return null; // EARLY RETURN
            }

            let noData_Element: JSX.Element = null;

            if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection ) {

                const displayMessages_Replace_NoData_Message: Array<string> = [];

                if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection.scans_NotContain_TotalIonCurrent ) {
                    displayMessages_Replace_NoData_Message.push( "Data for scan file does not have required Total Ion Current" )
                }

                if ( ! ( displayMessages_Replace_NoData_Message.length > 0 ) ) {
                    const msg = "Have this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection but displayMessages_Replace_NoData_Message.length is zero"
                    console.warn(msg)
                    throw Error(msg)
                }

                noData_Element = (

                    <QcPage_ChartFiller_NoData
                        chartTitle={ QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot.chartTitle }
                        displayMessages_Replace_NoData_Message={ displayMessages_Replace_NoData_Message }
                    />
                )
            }

            return (
                <div >
                    {/*<div >*/}
                    {/*    <h2>*/}
                    {/*        XXXXX*/}
                    {/*    </h2>*/}
                    {/*</div>*/}
                    {( noData_Element ) ? (

                        <QcPage_ChartBorder >
                            {noData_Element}
                        </QcPage_ChartBorder >

                    ) : (
                        <QcPage_ChartBorder >

                            <QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot
                                dataToPlot={ this.props.dataToPlot }
                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                transform_Score={ QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT }
                                qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function={
                                    this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function_BindThis
                                }
                                isInSingleChartOverlay={ false }
                            />
                        </QcPage_ChartBorder>
                    )}
                </div>
            );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
