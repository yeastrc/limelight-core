/**
 * qc_SingleSearch__SubSearches_Digestion_Statistics_Section.tsx
 *
 * QC Page SingleSearch__SubSearches - Section - Digestion Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data,
    Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__MissedCleavages_DistinctPeptideFraction_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__MissedCleavages_DistinctPeptideFraction_MainPageContainer";
import {qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches";
import {Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/digestion_compute/qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result";
import {QcViewPage_SingleSearch__SubSearches__MissedCleavages_PSM_Fraction_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__MissedCleavages_PSM_Fraction_MainPageContainer";
import {QcViewPage_SingleSearch__SubSearches__MissedCleavages_MissedCleavagesOnPSMs_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__MissedCleavages_MissedCleavagesOnPSMs_MainPageContainer";

/**
 *
 */
export interface Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_State {

    sectionExpanded?: boolean
    show_LoadingData_Message?: boolean

    compute_MissedCleavages_Data_Result_Root?: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches__Result
}

/**
 *
 */
export class Qc_SingleSearch__SubSearches_Digestion_Statistics_Section extends React.Component< Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_Props, Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue: boolean

    private _compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root
    private _compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root

    /**
     * The current entry to use
     */
    private _compute_MissedCleavages_Initial_Data_Result_Root__CURRENT: Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root

    /**
     *
     */
    constructor(props: Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state =  {sectionExpanded: this._sectionExpanded, show_LoadingData_Message: true };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_State>, nextContext: any): boolean {

        if ( nextState.sectionExpanded !== this.state.sectionExpanded ) {
            return true;
        }
        if ( ! nextState.sectionExpanded ) {
            return false;
        }

        if (this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection()) {

            if (!this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue) {
                return true;
            }
        } else {

            if (this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue) {
                return true;
            }
        }

        if ( nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
            || nextState.compute_MissedCleavages_Data_Result_Root !== this.state.compute_MissedCleavages_Data_Result_Root
            || nextState.sectionExpanded !== this.state.sectionExpanded
            || nextState.show_LoadingData_Message !== this.state.show_LoadingData_Message
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_Props>, prevState: Readonly<Qc_SingleSearch__SubSearches_Digestion_Statistics_Section_State>, snapshot?: any) {

        let updatesNeededForTreatmentSelectionChange = false;

        if (this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection()) {

            if ( !this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue) {
                updatesNeededForTreatmentSelectionChange = true;
            }
        } else {

            if (this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue) {
                updatesNeededForTreatmentSelectionChange = true;
            }
        }

        if (
            updatesNeededForTreatmentSelectionChange
            || prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
            || prevState.sectionExpanded !== this.state.sectionExpanded
            // || nextState.compute_MissedCleavages_Data_Result_Root !== this.state.compute_MissedCleavages_Data_Result_Root
        ) {
        } else {
            return; // No changes need to be processed
        }

        //  Returns Promise which is ignored
        this._call__compute_MissedCleavages_InitialData_OR__compute_MissedCleavages_MainData__Handle_Empty_peptideDistinct_Array()
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

    /**
     *
     */
    private _sectionExpanded_Toggle() {

        this._sectionExpanded = ! this._sectionExpanded;

        if ( this._sectionExpanded && ( ! this._sectionEverExpanded ) ) {
            // first time expanded so load data

            window.setTimeout( async () =>{ try {

                this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.
                    getTreatOpenModMassZeroAsUnmodified_Selection();

                await this._call__compute_MissedCleavages_InitialData_OR__compute_MissedCleavages_MainData__Handle_Empty_peptideDistinct_Array();

                this.setState({ show_LoadingData_Message: false });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}
            , 60 )
        }

        this._sectionEverExpanded = true;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     * 'async' function so can have await
     */
    private async _call__compute_MissedCleavages_InitialData_OR__compute_MissedCleavages_MainData__Handle_Empty_peptideDistinct_Array () {
        try {
            {
                const peptideDistinct_Array =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

                if ( peptideDistinct_Array.length === 0 ) {

                    //  NO DATA

                    this.setState( (prevState, props) => {
                        if ( prevState.compute_MissedCleavages_Data_Result_Root !== null ) {
                            return { compute_MissedCleavages_Data_Result_Root: null }
                        }
                        return null;
                    });

                    return;  // EARLY RETURN
                }
            }

            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                if ( ! this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue ) {

                    //  NOT Selection_CurrentlyShownValue 'true' so update

                    this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = true;

                    if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE ) {

                        await this._compute_MissedCleavages_InitialData();
                    } else {

                        this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT = this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE;

                        await this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                    }
                } else {
                    if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT ) {

                        await this._compute_MissedCleavages_InitialData(); // Compute Initial Data Which calls compute main data
                    } else {
                        await this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                    }
                }
            } else {

                if ( this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue ) {

                    //  NOT Selection_CurrentlyShownValue 'false' so update

                    this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = false;

                    if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE ) {

                        await this._compute_MissedCleavages_InitialData();
                    } else {

                        this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT = this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE;

                        await this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                    }
                } else {
                    if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT ) {

                        await this._compute_MissedCleavages_InitialData(); // Compute Initial Data Which calls compute main data
                    } else {
                        await this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                    }
                }
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _compute_MissedCleavages_InitialData() : Promise<void> {
        try {
            //  Compute common data that the charts in this section will use.  Compute for all Reported Peptide Ids that meet cutoffs so no need to recompute for "Filter On"

            const compute_MissedCleavages_Initial_Data_Result_Root : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root =
                await qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data({
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                });

            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = true;

                this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE = compute_MissedCleavages_Initial_Data_Result_Root;

            } else {
                this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = false;

                this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE = compute_MissedCleavages_Initial_Data_Result_Root;
            }

            this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT = compute_MissedCleavages_Initial_Data_Result_Root

            //  returns Promise that is ignored
            this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * 'async'
     *
     *  Compute Main Data to pass down to Plots
     */
    private async _compute_MissedCleavages_MainData() : Promise<void>{
        try {
            const compute_MissedCleavages_Data_Result_Root =
                await qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches({
                    compute_MissedCleavages_Initial_Data_Result_Root: this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                });

            this.setState({ compute_MissedCleavages_Data_Result_Root });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
                            Digestion Statistics
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <div className=" chart-container-multiple-on-same-row-block ">

                                { ( this.state.show_LoadingData_Message ) ? (

                                    <div style={ { marginBottom: 20 } }>
                                        Loading Data
                                    </div>
                                ) : (

                                    <React.Fragment>
                                        <div className=" chart-container-multiple-on-same-row ">
                                            <QcViewPage_SingleSearch__SubSearches__MissedCleavages_DistinctPeptideFraction_MainPageContainer
                                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                                compute_MissedCleavages_Data_Result_Root={ this.state.compute_MissedCleavages_Data_Result_Root }
                                            />
                                        </div>
                                        <div className=" chart-container-multiple-on-same-row ">
                                            <QcViewPage_SingleSearch__SubSearches__MissedCleavages_PSM_Fraction_MainPageContainer
                                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                                compute_MissedCleavages_Data_Result_Root={ this.state.compute_MissedCleavages_Data_Result_Root }
                                            />
                                        </div>
                                        <div className=" chart-container-multiple-on-same-row ">
                                            <QcViewPage_SingleSearch__SubSearches__MissedCleavages_MissedCleavagesOnPSMs_MainPageContainer
                                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                                compute_MissedCleavages_Data_Result_Root={ this.state.compute_MissedCleavages_Data_Result_Root }
                                            />
                                        </div>

                                        <div className=" chart-container-multiple-on-same-row-stop-float "></div>
                                    </React.Fragment>
                                )}
                            </div>
                        </div>

                    </div>
                ) : null }
            </div>
        );
    }

}

