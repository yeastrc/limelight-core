/**
 * qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer.tsx
 *
 * QC Page Single Search : PSM Count - PSM PPM Error vs M/Z Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot";
import { Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__psm__ppm_error/qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer_Props {

    psm_PPM_Error_List_Filtered: Array<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer_State {

    placeHolder?: any
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer extends React.Component< QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer_Props, QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state = {};
    }

    /**
     *
     */
    render() {

        let show_NoData_Message = false;

        if ( this.props.psm_PPM_Error_List_Filtered.length === 0 ) {
            show_NoData_Message = true;
        }

        return (
            <div >
                {/*<div >*/}
                {/*    <h2>*/}
                {/*        Error Vs m/z*/}
                {/*    </h2>*/}
                {/*</div>*/}
                <QcPage_ChartBorder>

                    {( show_NoData_Message ) ? (
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot.chartTitle } />
                    ) : (
                        <QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_StatisticsPlot
                            psm_PPM_Error_List_Filtered={ this.props.psm_PPM_Error_List_Filtered }
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
