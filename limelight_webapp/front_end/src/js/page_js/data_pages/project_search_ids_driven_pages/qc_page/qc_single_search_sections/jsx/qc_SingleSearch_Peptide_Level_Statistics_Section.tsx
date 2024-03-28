/**
 * qc_SingleSearch_Peptide_Level_Statistics_Section.tsx
 *
 * QC Page Single Search - Section - Peptide Level Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__PeptideCount_VS_PeptideLength_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PeptideCount_PeptideLength_MainPageContainer";


/**
 *
 */
export interface Qc_SingleSearch_Peptide_Level_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_Peptide_Level_Statistics_Section_State {

    sectionExpanded?: boolean
}

/**
 *
 */
export class Qc_SingleSearch_Peptide_Level_Statistics_Section extends React.Component< Qc_SingleSearch_Peptide_Level_Statistics_Section_Props, Qc_SingleSearch_Peptide_Level_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    /**
     *
     */
    constructor(props: Qc_SingleSearch_Peptide_Level_Statistics_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state =  {sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_Peptide_Level_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch_Peptide_Level_Statistics_Section_State>, nextContext: any): boolean {

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
        return (

            <div >
                <div style={ { display: "inline-block" } }
                     onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                        {/*  2 column grid  */}
                        <div>
                            { ( this.state.sectionExpanded ) ? (
                                <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                            ) : (
                                <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                            )}
                        </div>
                        <div className=" top-level-label clickable " >
                            Peptide Level Statistics
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <div className=" section--chart-block--single-chart-no-margin-bottom-container ">

                                <QcViewPage_SingleSearch__PeptideCount_VS_PeptideLength_MainPageContainer
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                />

                            </div>

                        </div>

                    </div>
                ) : null }
            </div>
        );
    }

}

