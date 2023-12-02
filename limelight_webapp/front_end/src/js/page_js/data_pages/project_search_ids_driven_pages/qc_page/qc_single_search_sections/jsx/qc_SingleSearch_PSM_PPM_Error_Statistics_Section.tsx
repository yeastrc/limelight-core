/**
 * qc_SingleSearch_PSM_PPM_Error_Statistics_Section.tsx
 *
 * QC Page Single Search - Section - PSM Level PPM Error Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__PSM_PPM_Error_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_PPM_Error_MainPageContainer";
import {QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_RetentionTime_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_RetentionTime_MainPageContainer";
import {QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer";
import {
    qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch,
    Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result,
    Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__psm__ppm_error/qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch";

/**
 *
 */
export interface Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_Props {

    //  Update componentDidUpdate with new props
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_State {

    sectionExpanded?: boolean
    loadingData?: boolean
    psm_PPM_Error_List_Filtered_New?: Array<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM>
}

/**
 *
 */
export class Qc_SingleSearch_PSM_PPM_Error_Statistics_Section extends React.Component< Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_Props, Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderSection = true;

    private _projectSearchId: number

    private _psm_PPM_Error_Data: Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result

    /**
     *
     */
    constructor(props: Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_Props) {
        super(props);

        try {
            if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
                const msg = "ONLY valid for 1 search";
                console.warn(msg);
                throw Error(msg);
            }


            if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData
                || ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull
                    && props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) ) ) {
                // No Data for section so NOT render it
                this._renderSection = false;
            } else {

                const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
                const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId

                if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull && qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) {

                } else if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {


                } else {
                    const msg = "Neither is true. qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull, qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                    console.warn(msg);
                    throw Error(msg)
                }

            }

            this._projectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            this.state =  {
                sectionExpanded: this._sectionExpanded,
                loadingData: true
            };

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_Props>, prevState: Readonly<Qc_SingleSearch_PSM_PPM_Error_Statistics_Section_State>, snapshot?: any) {
        try {
            if ( this._renderSection ) {
                if ( this._psm_PPM_Error_Data ) {

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                        || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent ) {

                        this._filterPSMs();
                    }
                }
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
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

    private _sectionExpanded_Toggle() {

        this._sectionExpanded = ! this._sectionExpanded;

        if ( this._sectionExpanded && ( ! this._sectionEverExpanded ) ) {
            // first time expanded so load data

            this._loadData();
        }

        this._sectionEverExpanded = true;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    private _loadData() {

        window.setTimeout( () => {

            const promise__qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch =
                qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch({
                    projectSearchId: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                })

            promise__qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.catch(reason => {})
            promise__qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch.then(value => {
                try {
                    this._psm_PPM_Error_Data = value

                    this._filterPSMs()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

        }, 10 )
    }

    /**
     *
     */
    private _filterPSMs() {

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const psm_PPM_Error_List_Filtered: Array<Qc_Psm_PPM_Error__GetData_And_Compute_PPM_Error_All_PSMs_For_MainFilters_For_SingleSearch__Result__Single_PSM> = [];

        for (const peptideDistinct_Entry of peptideDistinct_Array) {

            const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
            if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                continue; // EARLY CONTINUE
            }

            for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

                if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                    const psmTblData_For_ReportedPeptideId = this._psm_PPM_Error_Data.get_PPM_Error__PSMs_For_ReportedPeptideId(reportedPeptideId);
                    if ( ! psmTblData_For_ReportedPeptideId ) {
                        const msg = "this._psm_PPM_Error_Data.get_PPM_Error__PSMs_For_ReportedPeptideId(reportedPeptideId); returned nothing: reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    for ( const psm_PPM_Error_DataEntry of psmTblData_For_ReportedPeptideId.dataForPsms_For_ReportedPeptideId_Array ) {
                        psm_PPM_Error_List_Filtered.push( psm_PPM_Error_DataEntry );
                    }

                } else {
                    if (dataPerReportedPeptideId_Value.psmIdsSet) {

                        for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {

                            const psm_PPM_Error_Data_For_PsmId = this._psm_PPM_Error_Data.get_PPM_Error_For_PsmId(psmId);
                            if ( ! psm_PPM_Error_Data_For_PsmId ) {
                                const msg = "this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_PsmId(psmId); returned nothing: psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                console.warn(msg);
                                throw Error(msg);
                            }
                            psm_PPM_Error_List_Filtered.push( psm_PPM_Error_Data_For_PsmId );
                        }
                    }
                }
            }
        }

        this.setState({ loadingData: false, psm_PPM_Error_List_Filtered_New: psm_PPM_Error_List_Filtered })
    }

    /**
     *
     */
    render() {

        if ( ! this._renderSection ) {
            //  Skip render section
            return null; // EARLY RETURN
        }

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
                            PSM Error Estimates
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>
                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    ( this.state.loadingData ) ? (

                        ( this.state.sectionExpanded ) ? (
                            <div className=" section-content-block " style={ { marginBottom: 20 } } >
                                LOADING DATA
                            </div>
                        ) : null

                    ) : (
                        <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                            <div className=" section--chart-container-block ">

                                <div className=" chart-container-multiple-on-same-row-block ">

                                    <div className=" chart-container-multiple-on-same-row ">
                                        <QcViewPage_SingleSearch__PSM_PPM_Error_MainPageContainer
                                            psm_PPM_Error_List_Filtered={ this.state.psm_PPM_Error_List_Filtered_New }
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        />
                                    </div>

                                    <div className=" chart-container-multiple-on-same-row ">
                                        <QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_RetentionTime_MainPageContainer
                                            psm_PPM_Error_List_Filtered={ this.state.psm_PPM_Error_List_Filtered_New }
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        />
                                    </div>

                                    <div className=" chart-container-multiple-on-same-row ">
                                        <QcViewPage_SingleSearch__PSM_Count__PSM_PPM_Error_VS_M_Z_MainPageContainer
                                            psm_PPM_Error_List_Filtered={ this.state.psm_PPM_Error_List_Filtered_New }
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        />
                                    </div>

                                    <div className=" chart-container-multiple-on-same-row-stop-float "></div>

                                </div>

                            </div>

                        </div>
                    )
                ) : null }
            </div>
        );
    }

}

