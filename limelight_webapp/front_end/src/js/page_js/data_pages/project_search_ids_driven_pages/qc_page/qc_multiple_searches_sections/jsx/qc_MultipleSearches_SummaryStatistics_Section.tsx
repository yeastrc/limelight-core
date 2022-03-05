/**
 * qc_MultipleSearches_SummaryStatistics_Section.tsx
 *
 * QC Page Multiple Searches - Section - Summary Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_MultipleSearches__SummaryCounts_PSM_Counts_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__SummaryCounts_PSM_Counts_MainPageContainer";
import {QcViewPage_MultipleSearches__SummaryCounts_Protein_Counts_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__SummaryCounts_Protein_Counts_MainPageContainer";
import {QcViewPage_MultipleSearches__SummaryCounts_DistinctPeptide_Counts_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__SummaryCounts_DistinctPeptide_Counts_MainPageContainer";
import {QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_MainPageContainer";


/**
 *
 */
export interface Qc_MultipleSearches_SummaryStatistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
}

/**
 *
 */
interface Qc_MultipleSearches_SummaryStatistics_Section_State {

    sectionExpanded?: boolean
}

/**
 *
 */
export class Qc_MultipleSearches_SummaryStatistics_Section extends React.Component< Qc_MultipleSearches_SummaryStatistics_Section_Props, Qc_MultipleSearches_SummaryStatistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = true;

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_SummaryStatistics_Section_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state =  {sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_MultipleSearches_SummaryStatistics_Section_Props>, nextState: Readonly<Qc_MultipleSearches_SummaryStatistics_Section_State>, nextContext: any): boolean {

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

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }


    /**
     *
     */
    render() {
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
                        Summary Statistics
                    </div>
                </div>  {/* END: 2 column grid  */}

                <div className="top-level-label-bottom-border"></div>

                <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                    <div className=" section--chart-container-block ">

                        <div className=" chart-container-multiple-on-same-row-block ">

                            <div className=" chart-container-multiple-on-same-row ">
                                <QcViewPage_MultipleSearches__SummaryCounts_Distinct_Scan_Counts_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            </div>
                            <div className=" chart-container-multiple-on-same-row ">
                                <QcViewPage_MultipleSearches__SummaryCounts_PSM_Counts_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            </div>
                            <div className=" chart-container-multiple-on-same-row ">
                                <QcViewPage_MultipleSearches__SummaryCounts_DistinctPeptide_Counts_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            </div>
                            <div className=" chart-container-multiple-on-same-row ">
                                <QcViewPage_MultipleSearches__SummaryCounts_Protein_Counts_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            </div>

                            <div className=" chart-container-multiple-on-same-row-stop-float "></div>

                        </div>

                    </div>

                </div>
            </div>
        );
    }

}

