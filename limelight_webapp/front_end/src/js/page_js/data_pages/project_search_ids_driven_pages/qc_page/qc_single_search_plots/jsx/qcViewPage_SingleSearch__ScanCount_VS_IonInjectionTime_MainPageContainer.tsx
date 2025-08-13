/**
 * qcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer.tsx
 *
 * QC Page Single Search : PSM Count vs/ Ion Injection Time - Main Page Container
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcPage_ChartBorder} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import {QcPage_ChartFiller_NoData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartFiller_NoData";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data";
import {
    QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_StatisticsPlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_StatisticsPlot";

/**
 *
 */
export interface QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props {

    searchScanFileId_Selected: number
    searchScanFileName_Selected: string

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_State {

    show_NoData_Message?: boolean

    show_LoadingMessage?: boolean
    show_NO_IonInjectionTime?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer extends React.Component< QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props, QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {

            // No Data for chart so NOT render it

            this._renderChart = false;
        }

        const show_NoData_Message = this._computeNew__show_NoData_Message(props);

        this.state = {
            show_NoData_Message, show_LoadingMessage: true
        };
    }

    /**
     *
     */
    componentDidMount() { try {

        if ( this._renderChart ) {

            this._doesScanData_Have_IonInjectionTimeData()
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props>, prevState: Readonly<QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_State>, snapshot?: any) { try {

        const show_NoData_Message_NewValue = this._computeNew__show_NoData_Message(this.props);

        this.setState( (state: QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_State, props: QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props ) : QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_State => {

            if ( state.show_NoData_Message !== show_NoData_Message_NewValue ) {
                return { show_NoData_Message: show_NoData_Message_NewValue };
            }
            return null;
        });
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    private _doesScanData_Have_IonInjectionTimeData() {

        let scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder> = new Map()

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId

        const promise = new Promise<void>((resolve, reject) => { try {
            const promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().
                get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

            promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.catch(reason => reject(reason))
            promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.then( value_promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch => { try {

                const promises_ScanData_Array: Array<Promise<void>> = []

                for ( const scanFile_ProjectScanFileId_SearchScanFileId_Entry of value_promise_get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_All() ) {

                    const searchScanFileId = scanFile_ProjectScanFileId_SearchScanFileId_Entry.searchScanFileId

                    const get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data().
                        get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId({ searchScanFileId })
                    if ( get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.data ) {
                        scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.set( searchScanFileId, get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.data.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder )
                    } else if ( get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise ) {
                        const promise_For_Single_SearchScanFileId = new Promise<void>((resolve_For_Single_SearchScanFileId, reject_For_Single_SearchScanFileId) => { try {
                            get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise.catch( reason => reject_For_Single_SearchScanFileId(reason) )
                            get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result.promise.then( value => { try {
                                scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.set( searchScanFileId, value.scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder )
                                resolve_For_Single_SearchScanFileId()
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        promises_ScanData_Array.push(promise_For_Single_SearchScanFileId)
                    } else {
                        throw Error( "get_ScanData_ALL_For_Single_SearchScanFileId_NO_Peaks_Data_ForSearchScanFileId_Result NO data or promise" )
                    }
                }

                if ( promises_ScanData_Array.length === 0 ) {

                    resolve()

                } else {
                    const promises_ScanData_Array_All = Promise.all( promises_ScanData_Array )
                    promises_ScanData_Array_All.catch(reason => reject(reason))
                    promises_ScanData_Array_All.then(novalue => { try {
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                }

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        promise.catch(reason => { })
        promise.then(value => { try {

            //  TESTING ONLY:  Force show_NO_IonInjectionTime true
            // {
            //     this.setState({ show_LoadingMessage: false, show_NO_IonInjectionTime: true })
            //
            //     return
            // }

            for ( const scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder of scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.values() ) {

                for ( const scan of scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                    if ( scan.ionInjectionTime_InMilliseconds === undefined || scan.ionInjectionTime_InMilliseconds === null ) {

                        this.setState({ show_LoadingMessage: false, show_NO_IonInjectionTime: true })

                        return
                    }
                }
            }

            this.setState({ show_LoadingMessage: false })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    }

    /**
     *
     */
    private _computeNew__show_NoData_Message(props: QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_MainPageContainer_Props) : boolean {

        //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        if ( peptideDistinct_Array.length === 0 ) {
            //  NO Data
            return true;  // EARLY RETURN
        }

        //  YES Data
        return false;
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        return (
            <div >
                <QcPage_ChartBorder>
                    { ( this.state.show_NoData_Message ) ? ( // Search has NO Scan Data
                        <QcPage_ChartFiller_NoData chartTitle={ QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_StatisticsPlot.chartTitle } />
                    ) : ( this.state.show_LoadingMessage ) ? (
                        <div className=" create--update--chart--msg--cover-overlay ">
                            Creating Chart
                        </div>
                    ) : ( this.state.show_NO_IonInjectionTime ) ? (
                        <div className=" create--update--chart--msg--cover-overlay ">
                               <div>
                                { QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_StatisticsPlot.chartTitle }
                            </div>
                            <div style={ { marginTop: 15 } }>
                                Scan data does not have ion injection time
                            </div>
                        </div>
                    ) : (
                        <QcViewPage_SingleSearch__ScanCount_VS_IonInjectionTime_StatisticsPlot
                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                            qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                            searchScanFileId_Selected={ this.props.searchScanFileId_Selected }
                            searchScanFileName_Selected={ this.props.searchScanFileName_Selected }
                            isInSingleChartOverlay={ false }
                        />
                    )}
                </QcPage_ChartBorder>
            </div>
        );
    }
}
