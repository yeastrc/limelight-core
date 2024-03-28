/**
 * qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer.tsx
 *
 * QC Page Common : Feature Detection: Feature Count Y Axis VS Total Ion Current X Axis Statistics - Overlay Container
 *
 */

import React from "react";

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot,
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType,
    QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import { QcViewPage_Common__FeatureDetection__DataToPlot_Parameters } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters";


const _Overlay_Title = "QC Plot: Feature Detection Statistics"


const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export enum QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice {
    NONE = "NONE",
    LOG_10 = "LOG_10"
}

export const QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT =
    QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10;

/**
 *
 */
export const open_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer
            params={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}

/**
 *
 */
export interface QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__Component_Params {

    dataToPlot : QcViewPage_Common__FeatureDetection__DataToPlot_Parameters

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer_State {

    transform_Score?: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice
    force_Rerender?: {}
}

/**
 *
 */
class QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer extends React.Component< QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer_Props, QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters
    private _qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function_BindThis =
        this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function.bind(this);

    private _DONOTCALL() {

        //  Validate local functions meet function type

        const qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType =
            this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function
    }

    private _show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection: {
        feature_detection_root__project_scnfl_mapping_tbl__id: number
        no_TotalIonCurrent: boolean
    } = null

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer_Props) {
        super(props);

        this.state = {
            transform_Score: QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice__DEFAULT,
            force_Rerender: {}
        };
    }

    // componentDidMount() {
    //     try {
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }

    /**
     *  Called from main chart code when scan not have Total Ion Current
     */
    private _qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function(
        params: QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_FunctionType_Params
    ) : void {

        this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection =
            {
                feature_detection_root__project_scnfl_mapping_tbl__id: this.props.params.dataToPlot.feature_detection_root__project_scnfl_mapping_tbl__id,
                no_TotalIonCurrent: params.scans_NotContain_TotalIonCurrent
            }

        this.setState({ force_Rerender: {} } )
    }

    /**
     *
     */
    render() {
        try {
            if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection &&
                ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id !== this.props.params.dataToPlot.feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
                this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection = null;  // reset to null since not currently selected id
            }

            let noData_Element: JSX.Element = null;

            if ( this._show_No_TotalIonCurrent_Data_Message_For_FeatureDetection_Root_Entry_Selection ) {

                const displayMessages_Replace_NoData_Message: Array<string> = [ "Data for scan file does not have required Total Ion Current" ];

                noData_Element = (

                    <QcPage_ChartFiller_NoData
                        chartTitle={ QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot.chartTitle }
                        displayMessages_Replace_NoData_Message={ displayMessages_Replace_NoData_Message }
                    />
                )
            }

            let scanFilenames = ""

            for ( const scanFilename of this.props.params.dataToPlot.scanFilenames_Unique_Sorted_Array ) {
                if ( scanFilenames ) {
                    scanFilenames += ", "
                }
                scanFilenames += scanFilename
            }

            let searchNameDisplay: string = null

            if ( this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent && this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ) {
                const projectSearchId = this.props.params.dataToPlot.projectSearchId
                const searchData = this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId)
                if ( ! searchData ) {
                    const msg = "returned NOTHING: this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId) for projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                let searchShortNameDisplay = ""
                if ( searchData.searchShortName ) {
                    searchShortNameDisplay = " (" + searchData.searchShortName + ")"
                }

                searchNameDisplay = searchData.name + searchShortNameDisplay + " (" + searchData.searchId + ")"
            }

            ///

            return (

                <ModalOverlay_Limelight_Component_v001_B_FlexBox
                    widthMinimum={ _Overlay_Width_Min }
                    widthMaximum={ _Overlay_Width_Max }
                    heightMinimum={ _Overlay_Height_Min }
                    heightMaximum={ _Overlay_Height_Max }
                    title={ _Overlay_Title }
                    set_CSS_Position_Fixed={ false }
                    callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                    close_OnBackgroundClick={ false } >

                    <React.Fragment>

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { height: "100%" } }
                        >

                            <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >

                                {/*  First row for Grid Template Rows  */}

                                {/*  For any content above the chart  */}
                                <div >
                                    <div>
                                        <span style={ { fontWeight: "bold" } }>Scan File: </span>
                                        <span>
                                            { scanFilenames }
                                        </span>
                                    </div>
                                    { searchNameDisplay ? (
                                        <div>
                                            <span style={ { fontWeight: "bold" } }>Search: </span>
                                            <span>
                                                { searchNameDisplay }
                                            </span>
                                        </div>
                                    ) : null }
                                    <div >
                                        <span style={ { fontWeight: "bold" } }>Feature Detection Run: </span>
                                        <span>
                                            { this.props.params.dataToPlot.featureDetection_Description }
                                        </span>
                                        <span> (</span>
                                        <span>
                                            { this.props.params.dataToPlot.featureDetection_DisplayLabel }
                                        </span>
                                        <span>)</span>
                                    </div>

                                    <div style={ { marginTop: 5 } }>
                                        <span style={ { paddingRight: 10  } }>
                                            Transform score:
                                        </span>
                                        <span>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice"
                                                    checked={
                                                        this.state.transform_Score ===
                                                        QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.NONE
                                                    }
                                                    onChange={ event => {
                                                        window.setTimeout( () => {
                                                            this.setState({
                                                                transform_Score:
                                                                QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.NONE
                                                            });
                                                        }, 10 );
                                                    }}
                                                />
                                                <span>
                                                    No transformation
                                                </span>
                                            </label>
                                        </span>
                                        <span>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice"
                                                    checked={
                                                        this.state.transform_Score ===
                                                        QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10
                                                    }
                                                    onChange={ event => {
                                                        window.setTimeout( () => {
                                                            this.setState({
                                                                transform_Score:
                                                                QcViewPage_SingleSearch__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_OverlayContainer__TransformScoreChoice.LOG_10
                                                            });
                                                        }, 10 );
                                                    }}
                                                />
                                                <span>
                                                    Log10
                                                </span>
                                            </label>
                                        </span>
                                    </div>
                                </div>

                                {/*  Second row for Grid Template Rows  */}

                                <div style={ { height: "100%" } }>

                                    {( noData_Element ) ? (

                                        <QcPage_ChartBorder >
                                            {noData_Element}
                                        </QcPage_ChartBorder >

                                    ) : (
                                        <QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot
                                            dataToPlot={ this.props.params.dataToPlot }
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                            transform_Score={ this.state.transform_Score }
                                            qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function={
                                                this._qcViewPage_FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MissingData_Callback_Function_BindThis
                                            }
                                            isInSingleChartOverlay={ true }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                </ModalOverlay_Limelight_Component_v001_B_FlexBox>
            );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
