/**
 * qcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer.tsx
 *
 * QC Page Single Search : PSM Count vs PSM Annotation Score Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";


/**
 *
 */
export interface QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer_Props {

    searchScanFileId_Selected: number
    searchScanFileName_Selected: string

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer_State {

    placeHolder?: any
}

/**
 *
 */
export class QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer extends React.Component< QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer_Props, QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ||
            props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) ) {

            // No Data for chart so NOT render it

            this._renderChart = false;
        }

        this.state = {};
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
            <div >
                {/*<div >*/}
                {/*    <h2>*/}
                {/*        Scan Statistics*/}
                {/*    </h2>*/}
                {/*</div>*/}

                <QcPage_ChartBorder >

                    <QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_StatisticsPlot
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                        searchScanFileId_Selection={ this.props.searchScanFileId_Selected }
                        searchScanFileName_Selected={ this.props.searchScanFileName_Selected }
                        isInSingleChartOverlay={ false }
                    />
                </QcPage_ChartBorder>
            </div>
        );
    }


}
