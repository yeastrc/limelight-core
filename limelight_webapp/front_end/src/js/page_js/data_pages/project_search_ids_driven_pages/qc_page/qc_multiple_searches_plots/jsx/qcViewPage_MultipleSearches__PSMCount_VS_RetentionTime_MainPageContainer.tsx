/**
 * qcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer.tsx
 *
 * QC Page Multiple Searches : PSM Count vs Retention Time Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_StatisticsPlot";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";

/**
 *
 */
export interface QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_State {

    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer extends React.Component< QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props, QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        const show_NoData_Message = this._computeNew__show_NoData_Message(props);

        this.state = {
            show_NoData_Message
        };
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props>, prevState: Readonly<QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_State>, snapshot?: any) {

        const show_NoData_Message_NewValue = this._computeNew__show_NoData_Message(this.props);

        this.setState( (state: QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_State, props: QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props ) : QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_State => {

            if ( state.show_NoData_Message !== show_NoData_Message_NewValue ) {
                return { show_NoData_Message: show_NoData_Message_NewValue };
            }
            return null;
        });
    }

    /**
     *
     */
    private _computeNew__show_NoData_Message(props: QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_MainPageContainer_Props) : boolean {

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

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {
            const qcPage_Flags_SingleSearch = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if (!qcPage_Flags_SingleSearch) {
                const msg = "this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Flags_MultipleSearches.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
            if (!qcPage_Searches_Info_SingleSearch) {
                const msg = "this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ((!qcPage_Flags_SingleSearch.hasScanData) && ((!qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull)||(!qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull))) {

                //  No Scan Data or PSM Retention Time or M/Z data for search so skip chart.  Skipping if no M/Z since combined the retrieval code
                return null;
            }
        }

        return (
            <div >
                <div>
                    <h2>
                        Distribution of PSM Retention Time
                    </h2>
                </div>

                <QcPage_ChartBorder >

                    {( this.state.show_NoData_Message ) ? (
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_StatisticsPlot.chartTitle } />
                    ) : (
                        <QcViewPage_MultipleSearches__PSMCount_VS_RetentionTime_StatisticsPlot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
