/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer.tsx
 *
 * QC Page Single Search : MS1 Ion Current vs Retention Time Statistics - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";

/**
 *
 */
export interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props {

    searchScanFileId_Selected: number
    searchScanFileName_Selected: string

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State {

    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData? : any  // No Type since comes from server from Spectr

    no_MS1_Data?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer extends React.Component< QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props, QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart: boolean = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state = {
            showUpdatingMessage: true
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateblock();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props>, nextState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State>, nextContext: any): boolean {

        if (
            nextProps.searchScanFileId_Selected !== this.props.searchScanFileId_Selected
            || nextProps.searchScanFileName_Selected !== this.props.searchScanFileName_Selected
            || nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || nextState.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.state.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
            || nextState.no_MS1_Data !== this.state.no_MS1_Data
            || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
        ) {
            //  Something changed so return true
            return true;
        }

        return false
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props>, prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    prevProps.searchScanFileId_Selected !== this.props.searchScanFileId_Selected
                    || prevProps.searchScanFileName_Selected !== this.props.searchScanFileName_Selected
                    || prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    // || nextState.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData !== this.state.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData
                    // || nextState.no_MS1_Data !== this.state.no_MS1_Data
                    // || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  No Change to inputs so Don't re-populate Block

                    return; // EARLY RETURN
                }

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State =>  {

                    if ( ! prevState.showUpdatingMessage ) {
                        return { showUpdatingMessage: true };
                    }
                    return null;
                });

                window.setTimeout(() => {
                    try {
                        this._populateblock();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

    }

    /**
     *
     */
    private _populateblock() {

        this._loadDataIfNeeded()
    }

    /**
     *
     */
    private _loadDataIfNeeded() {

        const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFile_MS1_PeakIntensityBinnedOn_RT_MZ({ searchScanFileId: this.props.searchScanFileId_Selected });

        promise.catch( reason => {

        })
        promise.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch => {
            try {
                const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData =
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_MS1_PeakIntensityBinnedOn_RT_MZ_Root.get_Data_For_SearchScanFileId( this.props.searchScanFileId_Selected );

                const summaryData = ms1_PeakIntensityBinnedOn_RT_MZ_OverallData.summaryData;

                if ( summaryData.binnedSummedIntensityCount === 0 ) {

                    //  NO MS1 Data

                    this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State =>  {

                        if ( ! prevState.no_MS1_Data ) {
                            return { no_MS1_Data: true };
                        }
                        return null;
                    });

                    return; //  EARLY RETURN
                }

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State>, props: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_Props>) : QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer_State =>  {

                    if ( prevState.no_MS1_Data ) {
                        return { no_MS1_Data: false };
                    }
                    return null;
                });

                this.setState({ ms1_PeakIntensityBinnedOn_RT_MZ_OverallData, showUpdatingMessage: false });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    render() {

        return (
            <div >
                {/*<div >*/}
                {/*    <h2>*/}
                {/*        M/Z Statistics*/}
                {/*    </h2>*/}
                {/*</div>*/}

                { ( this.state.no_MS1_Data ) ? (

                    <div>
                        {/*NO MS1 Scans*/}
                    </div>

                ) :  ( this.state.showUpdatingMessage ) ? (

                    <div style={
                        {
                            position: "relative",
                            width: qcPage_StandardChartLayout_StandardWidth(),
                            height: qcPage_StandardChartLayout_StandardHeight()
                        }
                    }>

                        <QcPage_UpdatingData_BlockCover/>

                    </div>

                ) : (
                    <React.Fragment>

                        <QcPage_ChartBorder>

                            <QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_StatisticsPlot
                                ms1_PeakIntensityBinnedOn_RT_MZ_OverallData={ this.state.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData }
                                searchScanFileName_Selected={ this.props.searchScanFileName_Selected }
                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                isInSingleChartOverlay={ false }
                            />
                        </QcPage_ChartBorder>

                    </React.Fragment>
                ) }
            </div>
        );
    }
}
