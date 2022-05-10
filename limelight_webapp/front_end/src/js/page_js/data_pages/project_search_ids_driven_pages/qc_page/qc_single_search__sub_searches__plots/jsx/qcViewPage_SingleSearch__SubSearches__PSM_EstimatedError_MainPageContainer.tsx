/**
 * qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer.tsx
 *
 * QC Page Single Search : Sub Searches: PSM Estimated Error - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer_State {

    _placeholder
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer_Props, QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        // let annotationTypeId_Score_X: number = null;

        {
            const projectSearchId =
                props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId

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
                {/*        PSM Estimated Error: PSM Annotation Score vs PSM Annotation Score*/}
                {/*    </h2>*/}
                {/*</div>*/}
                { this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ? (
                    <div>
                        N/A: Currently excluding independent decoys
                    </div>
                ) : (
                    <QcPage_ChartBorder>
                        <QcViewPage_SingleSearch__SubSearches__PSM_EstimatedError_StatisticsPlot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                            isInSingleChartOverlay={ false }
                        />
                    </QcPage_ChartBorder>
                )}
            </div>
        );
    }


}
