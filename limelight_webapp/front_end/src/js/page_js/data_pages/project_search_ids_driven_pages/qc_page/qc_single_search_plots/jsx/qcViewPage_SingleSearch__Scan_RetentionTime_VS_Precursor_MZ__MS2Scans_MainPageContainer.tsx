/**
 * qcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer.tsx
 *
 * QC Page Single Search : Scan (MS2) Retention Time vs/ Precursor M/Z  for MS 2 Scans - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_StatisticsPlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_StatisticsPlot";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data";

/**
 *
 */
export interface QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props {

    searchScanFileId_Selected: number
    searchScanFileName_Selected: string

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_State {

    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer extends React.Component< QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props, QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {

            // No Data for chart so NOT render it

            this._renderChart = false;
        }

        const show_NoData_Message = this._computeNew__show_NoData_Message(props);

        this.state = {
            show_NoData_Message
        };
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_State>, snapshot?: any) { try {

        const show_NoData_Message_NewValue = this._computeNew__show_NoData_Message(this.props);

        this.setState( (state: QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_State, props: QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props ) : QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_State => {

            if ( state.show_NoData_Message !== show_NoData_Message_NewValue ) {
                return { show_NoData_Message: show_NoData_Message_NewValue };
            }
            return null;
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _computeNew__show_NoData_Message(props: QcViewPage_SingleSearch__PSM_RetentionTime_VS_Precursor_MZ__MS2Scans_MainPageContainer_Props) : boolean {

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        if ( peptideDistinct_Array.length === 0 ) {
            //  NO Data
            return true;  // EARLY RETURN
        }

        //  YES Data
        return false;
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
                <QcPage_ChartBorder>
                    { ( this.state.show_NoData_Message ) ? ( // Search has NO Scan Data
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_StatisticsPlot.chartTitle } />
                    ) : (
                        <QcViewPage_SingleSearch__Scan_RetentionTime_VS_Precursor_MZ__MS2Scans_StatisticsPlot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                            searchScanFileId_Selection={ this.props.searchScanFileId_Selected }
                            searchScanFileName_Selected={ this.props.searchScanFileName_Selected }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
