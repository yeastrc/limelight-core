/**
 * qc_MultipleSearches_ErrorEstimation_Section.tsx
 *
 * QC Page Multiple Searches - Section - Error Estimation
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcViewPage_MultipleSearches__PSM_EstimatedError_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSM_EstimatedError_MainPageContainer";
import {QcViewPage_MultipleSearches__Peptide_EstimatedError_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__Peptide_EstimatedError_MainPageContainer";

/**
 *
 */
export interface Qc_MultipleSearches_ErrorEstimation_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface Qc_MultipleSearches_ErrorEstimation_Section_State {

    sectionExpanded?: boolean
}

/**
 *
 */
export class Qc_MultipleSearches_ErrorEstimation_Section extends React.Component< Qc_MultipleSearches_ErrorEstimation_Section_Props, Qc_MultipleSearches_ErrorEstimation_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderComponent = false

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_ErrorEstimation_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1 ) {
            const msg = "ONLY valid for NOT 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_DataPage_common_Searches_Flags().is__anyPsmHas_IsIndependentDecoy_True__TrueForAnySearch() ) {

            //  Importer validation that if any PSM has Independent Decoy true that search contains FASTA file statistics

            this._renderComponent = true;
        }

        this.state = {
            sectionExpanded: this._sectionExpanded
        };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_MultipleSearches_ErrorEstimation_Section_Props>, nextState: Readonly<Qc_MultipleSearches_ErrorEstimation_Section_State>, nextContext: any): boolean {

        if ( ! this._renderComponent ) {
            return false;
        }

        if ( nextState.sectionExpanded !== this.state.sectionExpanded ) {
            return true;
        }
        if ( ! nextState.sectionExpanded ) {
            return false;
        }

        return true;
    }

    /**
     *
     */
    private _sectionHeaderRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            try { // In try/catch block in case not supported in browser
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if (selection) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }

            } catch (e) {
                //  Eat exception
                const znothing = 0;
            }

            this._sectionExpanded_Toggle();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _sectionExpanded_Toggle() {

        this._sectionEverExpanded = true;

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    render() {

        if ( ! this._renderComponent ) {
            return null; // EARLY RETURN
        }

        return (

            <div >
                <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }
                    onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    {/*  2 column grid  */}
                    <div>
                        { ( this.state.sectionExpanded ) ? (
                            <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                        ) : (
                            <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                        )}
                    </div>
                    <div className=" top-level-label clickable " >
                        Error Estimation
                    </div>
                </div>  {/* END: 2 column grid  */}

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <h2>
                                PSM Level
                            </h2>

                            <div className=" section--chart-block--single-chart-no-margin-bottom-container ">

                                <QcViewPage_MultipleSearches__PSM_EstimatedError_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                                />
                            </div>

                            <h2>
                                Peptide Level
                            </h2>

                            <div className=" section--chart-block--single-chart-no-margin-bottom-container ">

                                <QcViewPage_MultipleSearches__Peptide_EstimatedError_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                                />
                            </div>
                        </div>

                    </div>
                ) : null }

            </div>
        );
    }

}

