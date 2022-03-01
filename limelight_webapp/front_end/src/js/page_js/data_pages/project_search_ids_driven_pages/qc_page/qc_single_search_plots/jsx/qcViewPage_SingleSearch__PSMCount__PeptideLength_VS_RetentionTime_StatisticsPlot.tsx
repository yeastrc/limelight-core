/**
 * qcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot.tsx
 *
 * QC Page Single Search : PSM Count - Peptide Length vs Retention Time Statistics
 *
 */

import React from "react";
import Plotly from 'plotly.js-dist/plotly'

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM,
    qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn,
    qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__AddRemove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM";
import {open_PSMCount__PeptideLength_VS_RetentionTime_OverlayContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_OverlayContainer";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";


const chartTitle = "Peptide Length vs/ Retention Time";


/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot extends React.Component< QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_Props, QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_State > {

    static chartTitle = chartTitle;


    //  bind to 'this' for passing as parameters
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _DONOTCALL() {

        const openChartInOverlay: qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM_CallbackFcn = this._openChartInOverlay;
    }

    private plot_Ref :  React.RefObject<HTMLDivElement>

    private _renderChart: boolean = true;

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }


        if ( ! ( props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ||
            props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) ) {
            // No Data for chart so NOT render it
                this._renderChart = false;
        } else {

            const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
            const qcPage_Flags_SingleSearch_ForProjectSearchId = props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId

            if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) {

            } else if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {


            } else {
                const msg = "Neither is true. qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull, qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                console.warn(msg);
                throw Error(msg)
            }

        }

        this.plot_Ref = React.createRef();

        this.state = {};
    }

    /**
     *
     */
    componentWillUnmount() {
        try {
            this._resizeWindow_Handler_Remove();
        } catch (e) {
            //  Eat Exception
        }

        try {
            if ( this._renderChart ) {
                this._removeChart();
            }

        } catch (e) {
            //  Eat Exception
        }

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

              if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populateChart();

                        if ( this.props.isInSingleChartOverlay ) {
                            this._resizeWindow_Handler_Attach();
                        }

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__PSMCount__PeptideLength_VS_RetentionTime_StatisticsPlot_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                //  ALWAYS remove check of state properties in 'componentDidUpdate'

                if (
                    prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                    // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
                ) {
                } else {
                    //  Nothing changed so return

                    return;  // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: true });

                window.setTimeout(() => {
                    try {
                        this._populateChart();

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
    private _resizeWindow_Handler_Attach() : void {

        //  Attach resize handler
        window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     *
     */
    private _resizeWindow_Handler_Remove() : void {

        //  Remove resize handler
        window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
    }

    /**
     * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
     */
    private _resizeWindow_Handler() : void {
        try {
            this._populateChart()

        } catch( e ) {
            console.log("Exception caught in _resizeWindow_Handler()");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private async _populateChart() : Promise<void> {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds;
            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            if ( projectSearchIds.length !== 1 ) {
                const msg = "Single Search chart so projectSearchIds.length must be 1. projectSearchIds.length: " + projectSearchIds.length;
                console.warn(msg)
                throw Error(msg)
            }

            const projectSearchId = projectSearchIds[0];  //  Allowed since Single Search chart

            let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            {
                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId:" + projectSearchId)
                }
                {
                    const get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result =
                        await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch_ReturnPromise();
                    peptideIds_For_MainFilters_Holder= get_PeptideIdsHolder_AllForSearch_ReturnPromise_Result.peptideIds_For_MainFilters_Holder
                }
            }

            let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder
            {
                const get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                    get__commonData_LoadedFromServer__CommonAcrossSearches().
                    get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().
                    get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise();
                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_ReturnPromise_Result.peptideSequences_For_MainFilters_Holder
            }


            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const promise_get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data =
                this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data();

            promise_get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data.catch( reason => {
                try {
                    console.warn( "promise_get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data.catch(...): reason: ", reason );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise_get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data.then( value => {
                try {
                    if ( ! this._componentMounted ) {
                        //  Component no longer mounted so exit
                        return; // EARLY RETURN
                    }

                    const psmTblData = value.psmTblData;
                    const spectralStorage_NO_Peaks_Data = value.spectralStorage_NO_Peaks_Data;

                    const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                        qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                            projectSearchId, peptideDistinct_Array, qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                        });

                    const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                    const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
                    const qcPage_Flags_SingleSearch_ForProjectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId

                    const chart_X : Array<number> = []
                    const chart_Y : Array<number> = []

                    if ( psmTblData_Filtered.length === 0 ) {
                        const msg = "psmTblData_Filtered is empty";
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) {
                        const psmTblData_Filtered_FirstEntry = psmTblData_Filtered[0];
                        if ( psmTblData_Filtered_FirstEntry.retentionTimeSeconds === undefined || psmTblData_Filtered_FirstEntry.retentionTimeSeconds === null ) {
                            const msg = "( psmTblData_Filtered_FirstEntry.retentionTimeSeconds === undefined || psmTblData_Filtered_FirstEntry.retentionTimeSeconds === null )";
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }

                    for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                        let retentionTimeSeconds: number = null;

                        if ( qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull ) {

                            retentionTimeSeconds = psmTblData_Filtered_Entry.retentionTimeSeconds;

                        } else if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

                            const spectralStorage_NO_Peaks_DataFor_SearchScanFileId = spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Filtered_Entry.searchScanFileId );
                            if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
                                const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Filtered_Entry.searchScanFileId ); returned nothing. searchScanFileId: " + psmTblData_Filtered_Entry.searchScanFileId;
                                console.warn(msg);
                                throw Error(msg);
                            }
                            const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                            if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                                const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing. scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            retentionTimeSeconds = spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds;

                        } else {
                            const msg = "Neither is true. qcPage_Searches_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull, qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
                            console.warn(msg);
                            throw Error(msg)
                        }

                        const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId( psmTblData_Filtered_Entry.reportedPeptideId );
                        const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId);
                        const peptideSequence_Length = peptideSequenceString.length;

                        const retentionTimeMinutes = retentionTimeSeconds / 60;

                        chart_X.push( retentionTimeMinutes );
                        chart_Y.push( peptideSequence_Length );
                    }

                    const chart_Data = [
                        {
                            name: '',
                            x: chart_X,
                            y: chart_Y,
                            hovertemplate:  //  Added '<extra></extra>' to remove secondary box with trace name
                                '<b>Peptide Length</b>: %{y}' +
                                '<br><b>Retention Time (minutes)</b>: %{x}' +
                                '<br><b>PSM Count</b>: %{z}<extra></extra>',
                            ncontours: 20,
                            colorscale: 'Hot',
                            reversescale: true,
                            showscale: true,
                            type: 'histogram2dcontour'  //  NO 'chart_X_Axis_IsTypeCategory: true' in Layout when 'histogram2dcontour'
                        }
                    ];

                    const chart_Layout = qcPage_StandardChartLayout({
                        chartTitle,
                        chart_X_Axis_Label: "Retention Time (minutes)",
                        //   NO 'chart_X_Axis_IsTypeCategory: true' when chart type 'histogram2dcontour'
                        chart_Y_Axis_Label: "Peptide Length",
                        showlegend: false
                    });

                    try {
                        //  First remove any existing plot, if it exists (And event listener on it)
                        this._removeChart();
                    } catch (e) {
                        //  Eat Exception
                    }

                    if ( this.props.isInSingleChartOverlay ) {

                        const targetDOMElement_domRect = this.plot_Ref.current.getBoundingClientRect();

                        /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

                        // const targetDOMElement_domRect_Left = targetDOMElement_domRect.left;
                        // const targetDOMElement_domRect_Right = targetDOMElement_domRect.right;
                        // const targetDOMElement_domRect_Top = targetDOMElement_domRect.top;
                        // const targetDOMElement_domRect_Bottom = targetDOMElement_domRect.bottom;

                        const chart_Width = Math.floor( targetDOMElement_domRect.width );
                        const chart_Height = Math.floor( targetDOMElement_domRect.height );

                        //  Lock Aspect Ratio to returned from qcPage_StandardChartLayout_ActualChartArea_AspectRatio();

                        // const chart_Standard_AspectRatio = qcPage_StandardChartLayout_ActualChartArea_AspectRatio();
                        //
                        // const chart_Width_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                        // const chart_Height_FromAspectRatio = chart_Height * chart_Standard_AspectRatio;
                        //
                        // if ()

                        chart_Layout.width = chart_Width;
                        chart_Layout.height = chart_Height;
                    }

                    const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

                    {
                        // const chart_Data_JSON = JSON.stringify( chart_Data );
                        // const chart_Layout_JSON = JSON.stringify( chart_Layout );
                        //
                        // console.log("*********************************")
                        // console.log("Data for Chart with Title: " + chartTitle );
                        // console.log("chart_Data object: ", chart_Data );
                        // console.log("chart_Data_JSON: " + chart_Data_JSON );
                        // console.log("chart_Layout object: ", chart_Layout );
                        // console.log("chart_Layout_JSON: " + chart_Layout_JSON );
                        // console.log("chart_config object: ", chart_config );
                        // console.log("*********************************")
                    }

                    const newPlotResult = Plotly.newPlot( this.plot_Ref.current, chart_Data, chart_Layout, chart_config );

                    if ( ! this.props.isInSingleChartOverlay ) {

                        //  Add click handler on chart on main page to open chart in overlay

                        qcViewPage_SingleSearch__Add_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({ plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis });
                    }

                    this.setState({ showUpdatingMessage: false });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            qcViewPage_SingleSearch__Remove_ClickListener_OnFirstSVG_InPlotlyInsertedDOM({
                plotContaining_DOM_Element: this.plot_Ref.current, callbackFcn_WhenClicked: this._openChartInOverlay_BindThis
            });
        } catch (e) {
            //  Eat Exception
        }
        try {
            Plotly.purge(this.plot_Ref.current)
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    private _openChartInOverlay( event ) {
        try {
            event.stopPropagation()
            open_PSMCount__PeptideLength_VS_RetentionTime_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent,
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        const style : React.CSSProperties = { position: "relative" };

        if ( this.props.isInSingleChartOverlay ) {
            style.height = "100%";
        }

        return (
            <div style={ style }>
                <div ref={this.plot_Ref} style={ style }></div>
                {( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): null }
            </div>
        );
    }

}
