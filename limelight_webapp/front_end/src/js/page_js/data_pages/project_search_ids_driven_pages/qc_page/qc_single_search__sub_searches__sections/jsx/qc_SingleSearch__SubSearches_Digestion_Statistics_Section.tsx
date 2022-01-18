/**
 * qc_SingleSearch__SubSearches_Digestion_Statistics_Section.tsx
 *
 * QC Page SingleSearch__SubSearches - Section - Digestion Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
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

    private _load_PsmOpenModificationMasses_IfNeeded_DataLoadInProgress = false

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

        this.state =  {sectionExpanded: this._sectionExpanded };
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

        {
            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            if ( peptideDistinct_Array.length === 0 ) {

                //  NO DATA

                this.setState({ compute_MissedCleavages_Data_Result_Root: null });

                return;  // EARLY RETURN
            }
        }

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

            if ( ! this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue ) {

                //  NOT Selection_CurrentlyShownValue 'true' so update

                this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = true;

                if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE ) {

                    this._loadData_IfNeeded();
                } else {

                    this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT = this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__TRUE;

                    this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                }
            } else {
                if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT ) {

                    this._compute_MissedCleavages_InitialData(); // Compute Initial Data Which calls compute main data
                } else {
                    this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                }
            }
        } else {

            if ( this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue ) {

                //  NOT Selection_CurrentlyShownValue 'false' so update

                this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue = false;

                if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE ) {

                    this._loadData_IfNeeded();
                } else {

                    this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT = this._compute_MissedCleavages_Initial_Data_Result_Root__treatOpenModMassZeroAsUnmodified_Selection__FALSE;

                    this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                }
            } else {
                if ( ! this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT ) {

                    this._compute_MissedCleavages_InitialData(); // Compute Initial Data Which calls compute main data
                } else {
                    this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
                }
            }
        }
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

            this._TreatOpenModMassZeroAsUnmodified_Selection_CurrentlyShownValue =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection();

            this._loadData_IfNeeded();
        }

        this._sectionEverExpanded = true;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    private _loadData_IfNeeded() {

        {
            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            if ( peptideDistinct_Array.length === 0 ) {

                //  NO DATA

                this.setState({ compute_MissedCleavages_Data_Result_Root: null });

                return;  // EARLY RETURN
            }
        }

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;

        const qcPage_Flags = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags

        if ( ! qcPage_Flags ) {
            const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags holds  nothing.";
            console.warn(msg);
            throw Error(msg);
        }

        let anyPsmHas_OpenModifications = false;

        for ( const projectSearchId of projectSearchIds ) {
            const qcPage_Flags_SingleSearch = qcPage_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId );
            if ( ! qcPage_Flags_SingleSearch ) {
                const msg = "qcPage_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( qcPage_Flags_SingleSearch.anyPsmHas_OpenModifications ) {
                anyPsmHas_OpenModifications = true;
                break;
            }
        }

        if ( anyPsmHas_OpenModifications ) {

            if ( this._load_PsmOpenModificationMasses_IfNeeded_DataLoadInProgress ) {
                //  When the existing promise completes, the data will be computed so just exit
                return;
            }

            let promise = load_PsmOpenModificationMasses_IfNeeded({
                getSearchSubGroupIds: false,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchDataLookupParamsRoot
            });

            if ( promise ) {

                this._load_PsmOpenModificationMasses_IfNeeded_DataLoadInProgress = true;

                promise.catch( reason => {
                    this._load_PsmOpenModificationMasses_IfNeeded_DataLoadInProgress = false;
                })

                promise.then( result => {

                    this._load_PsmOpenModificationMasses_IfNeeded_DataLoadInProgress = false;

                    window.setTimeout(() => {
                        try {
                            //  Open Mod data loaded
                            this._compute_MissedCleavages_InitialData();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10);
                })

            } else {

                window.setTimeout(() => {
                    try {
                        //  Open Mod data Already loaded
                        this._compute_MissedCleavages_InitialData();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }, 10);
            }

        } else {

            window.setTimeout(() => {
                try {
                    //  No Open Mod data so no loading needed
                    this._compute_MissedCleavages_InitialData();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10);
        }

    }

    /**
     *
     */
    private _compute_MissedCleavages_InitialData() {

        //  Compute common data that the charts in this section will use.  Compute for all Reported Peptide Ids that meet cutoffs so no need to recompute for "Filter On"

        const compute_MissedCleavages_Initial_Data_Result_Root : Qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data_Result_Root =
            qc_Digestion_Statistics_Section_Compute_MissedCleavages_Initial_Data({
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

        this._compute_MissedCleavages_MainData(); // Compute Main Data to pass down to Plots
    }

    /**
     *  Compute Main Data to pass down to Plots
     */
    private _compute_MissedCleavages_MainData() {

        const compute_MissedCleavages_Data_Result_Root =
            qc_Digestion_Statistics_Section_Compute_MissedCleavages_Data__SingleSearch__SubSearches({
                compute_MissedCleavages_Initial_Data_Result_Root: this._compute_MissedCleavages_Initial_Data_Result_Root__CURRENT,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            });

        this.setState({ compute_MissedCleavages_Data_Result_Root });
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
                        Digestion Statistics
                    </div>
                </div>  {/* END: 2 column grid  */}

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block ">

                            <div className=" chart-container-multiple-on-same-row-block ">

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

                            </div>
                        </div>

                    </div>
                ) : null }
            </div>
        );
    }

}

