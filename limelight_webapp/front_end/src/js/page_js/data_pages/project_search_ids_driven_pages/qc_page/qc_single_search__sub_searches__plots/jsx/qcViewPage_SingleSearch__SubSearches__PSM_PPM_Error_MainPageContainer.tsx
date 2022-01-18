/**
 * qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer.tsx
 *
 * QC Page SingleSearch__SubSearches : PSM Count vs Peptide Length Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer_Props {

    psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>>
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer_State {

    placeHolder?: any
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer_Props, QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
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

        if ( this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId.size === 0 ) {
            //  NO Data
            show_NoData_Message = true;
        }

        return (
            <div >
                <div>
                    <h2>
                        PPM Error
                    </h2>
                </div>
                <QcPage_ChartBorder >

                    {( show_NoData_Message ) ? (
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot.chartTitle } />
                    ) : (
                        <QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_StatisticsPlot
                            psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId={ this.props.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId }
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
