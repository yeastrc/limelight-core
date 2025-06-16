/**
 * qcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer.tsx
 *
 * QC Page Single Search : PSM Cumulative Error vs PSM Rank by Annotation Score Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    annotationTypeId_Score_1: number
    annotationTypeId_Score_2: number
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer_State {

    _placeholder: unknown
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer extends React.Component< QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer_Props, QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _annotationTypeId_Array: Array<number>

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        // let annotationTypeId_Score_X: number = null;

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

        if ( this._renderChart ) {

            this._annotationTypeId_Array = [];

            this._annotationTypeId_Array.push( props.annotationTypeId_Score_1 );

            if ( props.annotationTypeId_Score_2 ) {
                this._annotationTypeId_Array.push( props.annotationTypeId_Score_2 )
            }
        }

        // this.state = {
        // };
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
            <div>
                {/*<div >*/}
                {/*    <h2>*/}
                {/*        PSM Estimated Error vs PSM Annotation Score*/}
                {/*    </h2>*/}
                {/*</div>*/}
                { this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ? (
                    <div>
                        N/A: Currently excluding independent decoys
                    </div>
                ) : (
                    <QcPage_ChartBorder>
                        <QcViewPage_SingleSearch__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                            searchScanFileId_Selection={ QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES }
                            annotationTypeId_Array={ this._annotationTypeId_Array }
                            isInSingleChartOverlay={ false }
                        />
                    </QcPage_ChartBorder>
                )}
            </div>
        );
    }


}
