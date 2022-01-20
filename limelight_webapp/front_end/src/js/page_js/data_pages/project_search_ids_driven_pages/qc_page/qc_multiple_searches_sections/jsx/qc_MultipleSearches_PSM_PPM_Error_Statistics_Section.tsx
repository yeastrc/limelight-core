/**
 * qc_MultipleSearches_PSM_PPM_Error_Statistics_Section.tsx
 *
 * QC Page Multiple Searches - Section - PSM Level PPM Error Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {mean, deviation} from "d3";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data";
import {QcViewPage_MultipleSearches__PSM_PPM_Error_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__PSM_PPM_Error_MainPageContainer";

/**
 *
 */
export interface Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_Props {

    //  Update componentDidUpdate with new props
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_State {

    sectionExpanded?: boolean
    loadingData?: boolean
    psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId?: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>>
}

/**
 *
 */
export class Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section extends React.Component< Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_Props, Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderSection = true;

    private _psm_PPM_Error_Data_Map_Key_ProjectSearchId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root>

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_Props) {
        super(props);


        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        for ( const projectSearchId of props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds) {

            const qcPage_Flags_SingleSearch = props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Flags_SingleSearch) {
                const msg = "props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Flags_MultipleSearches.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Searches_Info_SingleSearch = props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Searches_Info_SingleSearch) {
                const msg = "props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if (
                ! ( qcPage_Flags_SingleSearch.hasScanData
                    || ( qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull && qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) ) ) {

                // No Data for section so NOT render it
                this._renderSection = false;
                break;
            }
        }

        this.state =  {
            sectionExpanded: this._sectionExpanded,
            loadingData: true
        };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_Props>, nextState: Readonly<Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_Props>, prevState: Readonly<Qc_MultipleSearches_PSM_PPM_Error_Statistics_Section_State>, snapshot?: any) {
        try {
            if ( this._renderSection ) {
                if ( this._psm_PPM_Error_Data_Map_Key_ProjectSearchId ) {

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                        || this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent ) {

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

            const promise_get_Psm_PPM_Error_Statistics_Data =
                this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.
                qcPage_DataFromServer_AndDerivedData_MultipleSearches.get_Psm_PPM_Error_Statistics_Data();

            promise_get_Psm_PPM_Error_Statistics_Data.catch( reason => {
                try {

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise_get_Psm_PPM_Error_Statistics_Data.then(  qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches => {
                try {
                    const psm_PPM_Error_Data_Map_Key_ProjectSearchId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root> = new Map();

                    for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds) {
                        const holder_For_projectSearchId = qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId});
                        if ( ! holder_For_projectSearchId ) {
                            const msg = "qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId}); returned NOTHING for projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                        const psm_PPM_Error_Data: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root = holder_For_projectSearchId.psm_PPM_Error_Data;

                        psm_PPM_Error_Data_Map_Key_ProjectSearchId.set(projectSearchId, psm_PPM_Error_Data);
                    }

                    this._psm_PPM_Error_Data_Map_Key_ProjectSearchId = psm_PPM_Error_Data_Map_Key_ProjectSearchId;

                    this._filterPSMs();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }, 10 )
    }

    /**
     *
     */
    private _filterPSMs() {

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;


        const psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>> = new Map();

        for (const peptideDistinct_Entry of peptideDistinct_Array) {

            for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get(projectSearchId);
                if (!dataPerReportedPeptideId_Map_Key_reportedPeptideId) {

                    continue; // EARLY CONTINUE
                }

                const psm_PPM_Error_Data_SingleSearch = this._psm_PPM_Error_Data_Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! psm_PPM_Error_Data_SingleSearch ) {
                    const msg = "this._psm_PPM_Error_Data_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let psm_PPM_Error_List_Filtered = psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId.get(projectSearchId);
                if ( ! psm_PPM_Error_List_Filtered ) {
                    psm_PPM_Error_List_Filtered = [];
                    psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId.set(projectSearchId, psm_PPM_Error_List_Filtered);
                }

                for (const dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry of dataPerReportedPeptideId_Map_Key_reportedPeptideId.entries()) {

                    const dataPerReportedPeptideId_Value = dataPerReportedPeptideId_Map_Key_reportedPeptideId_Entry[1];
                    const reportedPeptideId = dataPerReportedPeptideId_Value.reportedPeptideId;

                    if (dataPerReportedPeptideId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                        const psmTblData_For_ReportedPeptideId = psm_PPM_Error_Data_SingleSearch.get_Psm_PPM_Error_Data_For_ReportedPeptideId(reportedPeptideId);
                        if ( ! psmTblData_For_ReportedPeptideId ) {
                            const msg = "this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_ReportedPeptideId(reportedPeptideId);; returned nothing: reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        for ( const psm_PPM_Error_DataEntry of psmTblData_For_ReportedPeptideId.get_Psm_PPM_Error_Data_Entries_IterableIterator() ) {
                            psm_PPM_Error_List_Filtered.push( psm_PPM_Error_DataEntry );
                        }

                    } else {
                        if (dataPerReportedPeptideId_Value.psmIdsSet) {

                            for ( const psmId of dataPerReportedPeptideId_Value.psmIdsSet ) {

                                const psm_PPM_Error_Data_For_PsmId = psm_PPM_Error_Data_SingleSearch.get_Psm_PPM_Error_Data_For_PsmId(psmId);
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
        }

        //  Next remove outliers before first quartile and after 3rd quartile

        const psm_PPM_Error_List_Filtered_RemovedOutliers_Map_Key_ProjectSearchId: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>> = new Map();

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

            const psm_PPM_Error_List_Filtered = psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! psm_PPM_Error_List_Filtered ) {
                //  NO data for projectSearchId so skip
                continue;
            }

            const psm_PPM_Error_List_Filtered_RemovedOutliers: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId> = [];
            psm_PPM_Error_List_Filtered_RemovedOutliers_Map_Key_ProjectSearchId.set(projectSearchId, psm_PPM_Error_List_Filtered_RemovedOutliers);

            const data_array_ForQuartile : Array<number> = [];
            for ( const psm_PPM_Error of psm_PPM_Error_List_Filtered ) {

                data_array_ForQuartile.push( psm_PPM_Error.ppmError );
            }

            const psm_PPM_Error_Mean = mean(data_array_ForQuartile);
            const psm_PPM_Error_StandardDeviation = deviation(data_array_ForQuartile);

            for ( const psm_PPM_Error of psm_PPM_Error_List_Filtered ) {

                //  Keep everything within 2

                const psmDeviation = Math.abs( psm_PPM_Error.ppmError - psm_PPM_Error_Mean )

                if ( psmDeviation < ( 2 * psm_PPM_Error_StandardDeviation ) ) {
                    psm_PPM_Error_List_Filtered_RemovedOutliers.push( psm_PPM_Error );
                }
            }
        }

        this.setState({ loadingData: false, psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId: psm_PPM_Error_List_Filtered_RemovedOutliers_Map_Key_ProjectSearchId })
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
                        PSM Error Estimates
                    </div>
                </div>  {/* END: 2 column grid  */}

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

                                <div className=" section--chart-block--single-chart-no-margin-bottom-container ">

                                    <QcViewPage_MultipleSearches__PSM_PPM_Error_MainPageContainer
                                        psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId={ this.state.psm_PPM_Error_List_Filtered_Map_Key_ProjectSearchId }
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                                    />

                                </div>

                            </div>

                        </div>
                    )
                ) : null }
            </div>
        );
    }

}

