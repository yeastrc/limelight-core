/**
 * qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer.tsx
 *
 * QC Page SingleSearch__SubSearches : Charge State Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_State {

    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props, QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_State>, snapshot?: any) {

        const show_NoData_Message_NewValue = this._computeNew__show_NoData_Message(this.props);

        this.setState( (state: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_State, props: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props ) : QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_State => {

            if ( state.show_NoData_Message !== show_NoData_Message_NewValue ) {
                return { show_NoData_Message: show_NoData_Message_NewValue };
            }
            return null;
        });
    }

    /**
     *
     */
    private _computeNew__show_NoData_Message(props: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_MainPageContainer_Props) : boolean {

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

        return (
            <div >
                <div>
                    <h2>
                        Charge State Statistics
                    </h2>
                </div>
                <QcPage_ChartBorder >

                    {( this.state.show_NoData_Message ) ? (
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot.chartTitle } />
                    ) : (
                        <QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot
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
