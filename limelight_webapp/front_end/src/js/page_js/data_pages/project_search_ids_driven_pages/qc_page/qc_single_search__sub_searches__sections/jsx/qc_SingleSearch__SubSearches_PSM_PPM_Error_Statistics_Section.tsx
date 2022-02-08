/**
 * qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section.tsx
 *
 * QC Page SingleSearch__SubSearches - Section - PSM Level PPM Error Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {mean, deviation} from "d3";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer";

/**
 *
 */
export interface Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props {

    //  Update componentDidUpdate with new props
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State {

    sectionExpanded?: boolean
    loadingData?: boolean
    show_NoData_Message?: boolean
    psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId?: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>>
}

/**
 *
 */
export class Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section extends React.Component< Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props, Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _renderSection = true;

    private _psm_PPM_Error_Data: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root


    /**
     *
     */
    constructor(props: Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props) {
        super(props);


        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        {
            const qcPage_Flags_SingleSearch = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Flags_SingleSearch_ForProjectSearchId;
            const qcPage_Searches_Info_SingleSearch = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;

            if (
                ! ( qcPage_Flags_SingleSearch.hasScanData
                    || ( qcPage_Searches_Info_SingleSearch.precursor_m_z__NotNull && qcPage_Searches_Info_SingleSearch.precursor_retention_time__NotNull ) ) ) {

                // No Data for section so NOT render it
                this._renderSection = false;
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
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State>, nextContext: any): boolean {

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
    componentDidUpdate(prevProps: Readonly<Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props>, prevState: Readonly<Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State>, snapshot?: any) {
        try {
            if ( this._renderSection ) {
                if ( this._psm_PPM_Error_Data ) {

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                        || this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent ) {

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
    //
    // /**
    //  *
    //  */
    // private _loadData() {
    //
    //     window.setTimeout( () => {
    //
    //         const promise_get_Psm_PPM_Error_Statistics_Data =
    //             this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
    //             qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.get_Psm_PPM_Error_Statistics_Data();
    //
    //         promise_get_Psm_PPM_Error_Statistics_Data.catch( reason => {
    //             try {
    //
    //             } catch( e ) {
    //                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //                 throw e;
    //             }
    //         });
    //
    //         promise_get_Psm_PPM_Error_Statistics_Data.then(  qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => {
    //             try {
    //                 const psm_PPM_Error_Data_Map_Key_ProjectSearchId: Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root> = new Map();

    /**
     *
     */
    private _loadData() {

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        if ( peptideDistinct_Array.length === 0 ) {

            //  NO Data

            this.setState( (state: Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State, props: Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props ) : Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State => {

                if ( ! state.show_NoData_Message ) {
                    return { show_NoData_Message: true };
                }
                return null;
            });

            this.setState({ loadingData: false, psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId: null });

            return; // EARLY RETURN
        }

        //  YES Data

        this.setState( (state: Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State, props: Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_Props ) : Qc_SingleSearch__SubSearches_PSM_PPM_Error_Statistics_Section_State => {

            if ( state.show_NoData_Message ) {
                return { show_NoData_Message: false };
            }
            return null;
        });


        //   !!!! ONLY Continue if peptideDistinct_Array.length > 0



        window.setTimeout( () => {

            const promise_get_Psm_PPM_Error_Statistics_Data =
                this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.get_Psm_PPM_Error_Statistics_Data();

            promise_get_Psm_PPM_Error_Statistics_Data.catch( reason => {
                try {

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise_get_Psm_PPM_Error_Statistics_Data.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => {
                try {
                    const psm_PPM_Error_Data: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_Root =
                        qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch().psm_PPM_Error_Data;

                    this._psm_PPM_Error_Data = psm_PPM_Error_Data;

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

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];


        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;

        const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if (!loadedDataPerProjectSearchIdHolder) {
            const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        const subGroupIdMap_Key_PsmId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId();
        if (!subGroupIdMap_Key_PsmId) {
            const msg = "loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId(); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;


        const psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>> = new Map();

        for (const peptideDistinct_Entry of peptideDistinct_Array) {

            for ( const dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue of peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_SearchSubgroupId_Map_Key_reportedPeptideId.values() ) {

                for ( const dataPerReportedPeptideId_MapEntry of dataPerReportedPeptideId_Map_Key_SearchSubgroupId_MapValue.entries() ) {

                    const searchSubgroupId = dataPerReportedPeptideId_MapEntry[0];
                    const data_PerReportedPeptideId_SearchSubGroupId_Value = dataPerReportedPeptideId_MapEntry[1];
                    const reportedPeptideId = data_PerReportedPeptideId_SearchSubGroupId_Value.reportedPeptideId;

                    if ( ! searchSubGroup_Ids_Selected.has( searchSubgroupId ) ) {
                        // Not Selected so skip
                        continue; // EARLY CONTINUE
                    }

                    if (data_PerReportedPeptideId_SearchSubGroupId_Value.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId) {

                        const psmTblData_For_ReportedPeptideId = this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_ReportedPeptideId(reportedPeptideId);
                        if ( ! psmTblData_For_ReportedPeptideId ) {
                            const msg = "this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_ReportedPeptideId(reportedPeptideId); returned nothing: reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        for ( const psm_PPM_Error_DataEntry of psmTblData_For_ReportedPeptideId.get_Psm_PPM_Error_Data_Entries_IterableIterator() ) {

                            const searchSubgroupId_For_PSM = subGroupIdMap_Key_PsmId.get( psm_PPM_Error_DataEntry.psmId );
                            if ( ! searchSubgroupId_For_PSM ) {
                                const msg = "subGroupIdMap_Key_PsmId.get( psm_PPM_Error_DataEntry.psmId ); returned nothing: psm_PPM_Error_DataEntry.psmId: + " + psm_PPM_Error_DataEntry.psmId + ", reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            if ( searchSubgroupId != searchSubgroupId_For_PSM ) {
                                // Not searchSubgroupId being processed so SKIP
                                continue;  // EARLY CONINTUE
                            }

                            let psm_PPM_Error_List_Filtered_Array = psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId.get( searchSubgroupId_For_PSM );

                            if ( ! psm_PPM_Error_List_Filtered_Array ) {
                                psm_PPM_Error_List_Filtered_Array = []
                                psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId.set(searchSubgroupId_For_PSM, psm_PPM_Error_List_Filtered_Array)
                            }

                            psm_PPM_Error_List_Filtered_Array.push( psm_PPM_Error_DataEntry );
                        }

                    } else {
                        if (data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet) {

                            for ( const psmId of data_PerReportedPeptideId_SearchSubGroupId_Value.psmIdsSet ) {

                                const psm_PPM_Error_Data_For_PsmId = this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_PsmId(psmId);
                                if ( ! psm_PPM_Error_Data_For_PsmId ) {
                                    const msg = "this._psm_PPM_Error_Data.get_Psm_PPM_Error_Data_For_PsmId(psmId); returned nothing: psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                let psm_PPM_Error_List_Filtered_Array = psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId.get( searchSubgroupId );

                                if ( ! psm_PPM_Error_List_Filtered_Array ) {
                                    psm_PPM_Error_List_Filtered_Array = []
                                    psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId.set(searchSubgroupId, psm_PPM_Error_List_Filtered_Array)
                                }

                                psm_PPM_Error_List_Filtered_Array.push( psm_PPM_Error_Data_For_PsmId );
                            }
                        }
                    }
                }
            }
        }

        //  Next remove outliers before first quartile and after 3rd quartile

        const psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId__RemovedOutliers: Map<number, Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId>> = new Map();

        {
            for ( const psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId_MapEntry of psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId.entries() ) {

                const searchSubGroupId = psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId_MapEntry[0];
                const psm_PPM_Error_List_Filtered_Array = psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId_MapEntry[1];

                const data_array_ForQuartile : Array<number> = [];
                for ( const psm_PPM_Error of psm_PPM_Error_List_Filtered_Array ) {

                    data_array_ForQuartile.push( psm_PPM_Error.ppmError );
                }

                const psm_PPM_Error_Mean = mean(data_array_ForQuartile);
                const psm_PPM_Error_StandardDeviation = deviation(data_array_ForQuartile);

                const psm_PPM_Error_List_Filtered_Array___RemovedOutliers: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_Psm_PPM_Error_Data_ForSinglePsmId> = [];

                for ( const psm_PPM_Error of psm_PPM_Error_List_Filtered_Array ) {

                    //  Keep everything within 2

                    const psmDeviation = Math.abs( psm_PPM_Error.ppmError - psm_PPM_Error_Mean )

                    if ( psmDeviation < ( 2 * psm_PPM_Error_StandardDeviation ) ) {
                        psm_PPM_Error_List_Filtered_Array___RemovedOutliers.push( psm_PPM_Error );
                    }
                }

                psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId__RemovedOutliers.set( searchSubGroupId, psm_PPM_Error_List_Filtered_Array___RemovedOutliers);
            }
        }

        this.setState({ loadingData: false, psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId: psm_PPM_Error_List_Filtered_Array__Map_Key_SearchSubGroupId__RemovedOutliers })
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

                                    <QcViewPage_SingleSearch__SubSearches__PSM_PPM_Error_MainPageContainer
                                        psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId={ this.state.psm_PPM_Error_List_Filtered_Map_Key_SearchSubGroupId }
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
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
