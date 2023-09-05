/**
 * qcViewPage_MultipleSearches__GoldStandard_MainPageContainer.tsx
 *
 * QC Page Multiple Searches : Gold Standard
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcViewPage_MultipleSearches__GoldStandard_Plot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__GoldStandard_Plot";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import { QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";

/**
 *
 */
export interface QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback
    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
    userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
}

/**
 *
 */
interface QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_State {

    show_NoData_Message?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__GoldStandard_MainPageContainer extends React.Component< QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props, QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props) {
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props>, prevState: Readonly<QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_State>, snapshot?: any) {

        const show_NoData_Message_NewValue = this._computeNew__show_NoData_Message(this.props);

        this.setState( (state: QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_State, props: QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props ) : QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_State => {

            if ( state.show_NoData_Message !== show_NoData_Message_NewValue ) {
                return { show_NoData_Message: show_NoData_Message_NewValue };
            }
            return null;
        });
    }

    /**
     *
     */
    private _computeNew__show_NoData_Message(props: QcViewPage_MultipleSearches__GoldStandard_MainPageContainer_Props) : boolean {

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

                <QcPage_ChartBorder >

                    {( this.state.show_NoData_Message ) ? (
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_MultipleSearches__GoldStandard_Plot.chartTitle } />
                    ) : (

                        <QcViewPage_MultipleSearches__GoldStandard_Plot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel={ this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel }
                            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel={ this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel }
                            goldStandard_Root_SelectionEntry={ this.props.goldStandard_Root_SelectionEntry }
                            userOptions_Component_OptionsSelections={ this.props.userOptions_Component_OptionsSelections }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
