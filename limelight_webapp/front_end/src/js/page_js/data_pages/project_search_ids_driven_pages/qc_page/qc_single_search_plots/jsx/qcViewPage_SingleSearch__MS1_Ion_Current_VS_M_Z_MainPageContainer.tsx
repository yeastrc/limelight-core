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
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcPage_StandardChartLayout_StandardHeight,
    qcPage_StandardChartLayout_StandardWidth
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import { CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId";

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

        const searchScanFileId = this.props.searchScanFileId_Selected;

        const get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId().get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data({ searchScanFileId })

        if ( get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result.data ) {

            this._process_AfterLoadData({
                searchScanFileId_InProgress: searchScanFileId,
                scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result.data.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
            })

        } else if ( get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result.promise ) {

            get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result.promise.catch( reason => {

            })
            get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result.promise.then( value => {
                try {
                    this._process_AfterLoadData({
                        searchScanFileId_InProgress: searchScanFileId,
                        scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: value.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
                    })

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

        } else {
            throw Error("get_MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Data_Result no 'data' or 'promise'")
        }
    }

    /**
     *
     * @param searchScanFileId_InProgress
     */
    private _process_AfterLoadData(
        {
            searchScanFileId_InProgress, scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder
        } : {
            searchScanFileId_InProgress: number
            scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData__MS1_PeakIntensityBinnedOn_RT_MZ_For_Single_SearchScanFileId_Holder
        }
    ) {
        if ( searchScanFileId_InProgress !== this.props.searchScanFileId_Selected ) {

            //  Data NOT loaded for currently selected searchScanFileId_Selected so SKIP - USER Likely changed selection while data was loading

            return; // EARLY RETURN
        }

        const ms1_PeakIntensityBinnedOn_RT_MZ_OverallData = scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder.scanData_MS1_PeakIntensityBinnedOn_RT_MZ_Holder.scanData_ForSingle_ProjectScanFileId

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
    }

    /**
     *
     */
    render() {

        return (
            <div >
                {/*<div >*/}
                {/*    <h2>*/}
                {/*        m/z Statistics*/}
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
