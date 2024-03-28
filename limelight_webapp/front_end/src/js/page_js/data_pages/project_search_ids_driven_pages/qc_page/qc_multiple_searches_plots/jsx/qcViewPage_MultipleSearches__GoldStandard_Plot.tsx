/**
 * qcViewPage_MultipleSearches__GoldStandard_Plot.tsx
 *
 * QC Page Multiple Searches : Gold Standard
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {qcPage_StandardChartLayout} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {qcPage_StandardChartConfig} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {QcViewPage_MultipleSearches__ComputeColorsForSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_MultipleSearches__ComputeColorsForSearches";
import {QcPage_CreatingPlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import {QcPage_ClickPlot_ForInteractivePlot_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {
    QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback,
    QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {
    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch,
    Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";
import { QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";


const chartTitle = "Precision vs/ Recall";

/**
 *
 */
export interface QcViewPage_MultipleSearches__GoldStandard_Plot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent

    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback
    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
    userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_MultipleSearches__GoldStandard_Plot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__GoldStandard_Plot
    extends React.Component< QcViewPage_MultipleSearches__GoldStandard_Plot_Props, QcViewPage_MultipleSearches__GoldStandard_Plot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result>

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel: QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__GoldStandard_Plot_Props) {
        super(props);

        const classObject_This = this;

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();
        this.image_Ref = React.createRef();

        //  Initialize to current passed value
        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

        props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register({ callbackItem: this })

        ///

        this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel = {
            set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {
                classObject_This._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel = item;
                classObject_This.setState({ showUpdatingMessage: true });
            }
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel =
            props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel

        if ( props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel ) {

            props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.register( {
                callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
            } )
        }

        this.state = { showCreatingMessage: true, showUpdatingMessage: false };
    }

    /**
     * From interface QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
     * @param item
     */
    set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback = item

        this.setState({ showUpdatingMessage: true });
    }

    /**
     *
     */
    componentWillUnmount() {

        try {
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.un_register({ callbackItem: this })
        } catch (e) {
            //  Eat Exception
        }

        try {
            if ( this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel ) {

                this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.un_register( {
                    callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
                } )
            }
        } catch (e) {
            //  Eat Exception
        }

        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }
        try {
            if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
            }
        } catch (e) {
            //  Eat Exception
        }

        try {
            this._resizeWindow_Handler_Remove();
        } catch (e) {
            //  Eat Exception
        }

        try {
            this._removeChart();

        } catch (e) {
            //  Eat Exception
        }

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidMount() {

        this._componentMounted = true;

        try {
            window.setTimeout( () => {
                try {
                    this._populateChart();

                    if ( this.props.isInSingleChartOverlay ) {
                        this._resizeWindow_Handler_Attach();
                    }

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__GoldStandard_Plot_Props>, nextState: Readonly<QcViewPage_MultipleSearches__GoldStandard_Plot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
            || nextProps.goldStandard_Root_SelectionEntry !== this.props.goldStandard_Root_SelectionEntry
            || nextProps.userOptions_Component_OptionsSelections !== this.props.userOptions_Component_OptionsSelections
            || nextProps.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel !== this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel
            || nextProps.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel !== this.props.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        || this.state.showCreatingMessage !== nextState.showCreatingMessage
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__GoldStandard_Plot_Props>, prevState: Readonly<QcViewPage_MultipleSearches__GoldStandard_Plot_State>, snapshot?: any) {
        try {
            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                || prevProps.goldStandard_Root_SelectionEntry !== this.props.goldStandard_Root_SelectionEntry
                || prevProps.userOptions_Component_OptionsSelections !== this.props.userOptions_Component_OptionsSelections
                // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                // || prevState.showUpdatingMessage !== this.state.showUpdatingMessage
            ) {
            } else {
                //  Nothing changed so return

                return;  // EARLY RETURN
            }

            try {
                if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params ) {
                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params.abort();
                }
            } catch (e) {
                //  Eat Exception
            }
            try {
                if ( this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params ) {
                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params.abort();
                }
            } catch (e) {
                //  Eat Exception
            }

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            this.setState({ showUpdatingMessage: true });

            window.setTimeout( () => {
                try {
                    if (
                        ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                        )) {
                        //  Skip these params since they are not the "Latest"
                        return; // EARLY RETURN
                    }

                    this._populateChart();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

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
    private _populateChart() {

        this._call__GetGoldStandardData({ goldStandard_Root_Selection: this.props.goldStandard_Root_SelectionEntry })
    }

    /**
     *
     * @param selected_GoldStandardEntry
     */
    private _call__GetGoldStandardData(
        {
            goldStandard_Root_Selection
        } : {
            goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
        }
    ) {
        const projectSearchIds = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds

        const gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

        window.setTimeout( ()=> { try {

            if (
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
            ) {

                //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                return;  // EARLY RETURN
            }

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result> = new Map()

            const promises: Array<Promise<any>> = []

            for ( const projectSearchId of this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds ) {

                if ( ! goldStandard_Root_Selection.projectSearchId_Set.has( projectSearchId ) ) {
                    //  projectSearchId NOT for this GoldStandard entry

                    continue // EARLY CONTINUE
                }

                const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result =
                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch({
                        goldStandard_Root_Selection,
                        userOptions_Component_OptionsSelections: this.props.userOptions_Component_OptionsSelections,
                        projectSearchId,
                        peptideDistinct_Array,
                        qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    })

                if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data ) {

                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId.set( projectSearchId, qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data )

                    this.setState({
                        showUpdatingMessage: false,
                        // showUpdatingMessage: false
                    });

                } else if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise ) {

                    const promise = new Promise<void>((resolve, reject) => { try {
                        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.catch( reason => {
                            try {
                                reject(reason)
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.then( value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result => { try {

                            qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId.set( projectSearchId, value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result )
                            resolve()

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                        });

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }})
                    promises.push(promise)

                } else {
                    throw Error("qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: no data or promise")
                }
            }

            if ( promises.length === 0 ) {

                if (
                    gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                ) {

                    //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                    return;  // EARLY RETURN
                }

                this._qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId

                this._populateChart_Actual()

                this.setState({
                    // show_LoadingData_Message: false,
                    showUpdatingMessage: false
                });

                return; // EARLY RETURN
            }

            const promisesAll = Promise.all( promises );
            promisesAll.catch( reason => {
                try {
                    // if ( ! _componentMounted ) {
                    //     //  Component no longer mounted so exit
                    //     return; // EARLY RETURN
                    // }

                    this.setState({
                        // show_LoadingData_Message: false,
                        showUpdatingMessage: false
                    });

                    console.warn( "promise.catch(...): reason: ", reason );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promisesAll.then( value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result => { try {

                // if ( ! _componentMounted ) {
                //     //  Component no longer mounted so exit
                //     return; // EARLY RETURN
                // }

                if (
                    gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                ) {

                    //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                    return;  // EARLY RETURN
                }

                this._qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId

                this._populateChart_Actual()

                this.setState({
                    // show_LoadingData_Message: false,
                    showUpdatingMessage: false
                });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
            });


        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }}, 10 )
    }

    /**
     *
     */
    private _populateChart_Actual() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        const projectSearchIds = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds

        const searchData_SearchName_Etc_Root = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root();

        const qcViewPage_MultipleSearches__ComputeColorsForSearches = new QcViewPage_MultipleSearches__ComputeColorsForSearches({ projectSearchIds });

        const chart_Data_Array: Array<any> = []

        for ( const projectSearchId of projectSearchIds ) {

            const chart_X : Array<number> = []
            const chart_Y : Array<number> = []
            const chart_Entries_Tooltips: Array<string> = [];
            const chart_Entries_Data_Labels_on_The_Plot: Array<string> = [];
            const chart_Colors : Array<string> = []

            const color = qcViewPage_MultipleSearches__ComputeColorsForSearches.get_Color_AsHexString_By_ProjectSearchId( projectSearchId )

            const searchData = searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchData ) {
                const msg = "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result =
                this._qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId.get( projectSearchId )

            if ( ( ! qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result ) || qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard ) {

                //  NO Data for Search.  SKIP Search

                continue;  //  EARLY CONTINUE

                // const msg = "this._qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                // console.warn(msg)
                // throw Error(msg)
            }

            let precision_Number = (
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.size /
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.size
            )
            let recall_Number = (
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.size /
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_Set.size
            )

            let precision_ResultDisplay: string
            let recall_ResultDisplay: string

            {
                const _NUMBER_FORMAT_PRECISION_RECALL = 4

                if ( Number.isNaN( precision_Number ) ) {

                    precision_Number = 0
                    precision_ResultDisplay = "0"

                } else {
                    if ( precision_Number < 0.01 ) {
                        precision_ResultDisplay = precision_Number.toPrecision( _NUMBER_FORMAT_PRECISION_RECALL )
                    } else {
                        precision_ResultDisplay = precision_Number.toFixed( _NUMBER_FORMAT_PRECISION_RECALL )
                    }
                }
                if ( Number.isNaN( recall_Number ) ) {

                    recall_Number = 0
                    recall_ResultDisplay = "0"

                } else {
                    if ( recall_Number < 0.01 ) {
                        recall_ResultDisplay = recall_Number.toPrecision( _NUMBER_FORMAT_PRECISION_RECALL )
                    } else {
                        recall_ResultDisplay = recall_Number.toFixed( _NUMBER_FORMAT_PRECISION_RECALL )
                    }
                }
            }

            // if ( Number.isNaN( precision_Number ) ) {
            //     const msg = "precision_Number is NaN for projectSearchId: " + projectSearchId
            //     console.warn(msg)
            //     throw Error(msg)
            // }
            // if ( Number.isNaN( recall_Number ) ) {
            //     const msg = "recall_Number is NaN for projectSearchId: " + projectSearchId
            //     console.warn(msg)
            //     throw Error(msg)
            // }

            let chart_Entries_Data_Label_on_The_Plot = "Search: " + searchData.searchId

            if ( searchData.searchShortName ) {

                chart_Entries_Data_Label_on_The_Plot = searchData.searchShortName
            }

            const tooltip =
                "<b>Search</b>: " + searchData.searchLabel__SearchShortName_OR_SearchId +
                "<br>" +
                "<b>Recall</b>: " + recall_ResultDisplay +
                "<br>" +
                "<b>Precision</b>: " + precision_ResultDisplay

            chart_X.push( recall_Number );
            chart_Y.push( precision_Number );
            chart_Entries_Data_Labels_on_The_Plot.push( chart_Entries_Data_Label_on_The_Plot )
            chart_Entries_Tooltips.push( tooltip );
            chart_Colors.push(color);

            chart_Data_Array.push( {
                name: chart_Entries_Data_Label_on_The_Plot,
                type: 'scatter',

                //  'range' Had NO effect here so moved to 'chart_Layout' below and changed the values

                // xaxis: {
                //     range: [ 0, 1 ]  //  Hard Code range to zero to one
                // },
                // yaxis: {
                //     range: [ 0, 1 ]  //  Hard Code range to zero to one
                // },


                // mode: 'markers',

                // START:  Change to display Data Labels on The Plot  https://plotly.com/javascript/line-and-scatter/#data-labels-on-the-plot
                mode: 'markers+text',
                text: [ chart_Entries_Data_Labels_on_The_Plot ],
                textfont : {
                    family: 'Arial', // 'Times New Roman'
                    // size: 24   default appears to be 12
                },
                textposition: 'bottom center',

                // END:  Change to display Data Labels on The Plot

                hoverinfo: "text", //  Hover contents
                hovertext: chart_Entries_Tooltips,  //  Hover contents per bar
                marker: {
                    size: 18, //  Default is 6 per  scatter SVG: https://plotly.com/javascript/reference/scatter/#scatter-marker-size scattergl WebGL https://plotly.com/javascript/reference/scattergl/#scattergl-marker-size
                    color: chart_Colors  // If not populated, ALL the bars for this element in array 'chart_Data' are the same color
                },
                x: chart_X,
                y: chart_Y
            } )
        }

        // Another way to color each bar, all in one trace
        //
        // https://plotly.com/javascript/bar-charts/#customizing-individual-bar-colors
        //     var trace1 = {
        //         x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
        //         y: [20, 14, 23, 25, 22],
        //         marker:{
        //             color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']
        //         },
        //         type: 'bar'
        //     };

        // const qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc__Result =
        //     qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc({
        //         projectSearchIds,
        //         searchData_SearchName_Etc_Root: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root()
        //     })

        // const xAxisTitle = qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc__Result.xAxisTitle;

        const chart_Layout = qcPage_StandardChartLayout({
            chartTitle,
            chart_X_Axis_Label: "Recall",
            chart_X_Axis_IsTypeCategory: false,
            chart_Y_Axis_Label: "Precision",
            showlegend: false,
            search_SubSearch_Count_SizeFor: chart_Data_Array.length
        });

        {
            const newRange = [ -0.1, 1.1 ]

            if ( chart_Layout.xaxis ) {
                chart_Layout.xaxis.range = newRange;
            } else {
                chart_Layout.xaxis = { range: newRange }
            }

            if ( chart_Layout.yaxis ) {
                chart_Layout.yaxis.range = newRange;
            } else {
                chart_Layout.yaxis = { range: newRange }
            }
        }

        ////////////

        //  Only Put Chart in DOM in Overlay so Only remove existing chart in Overlay.

        //  Have existing chart in overlay when re-populate chart when have window resize

        if ( this.props.isInSingleChartOverlay ) {
            try {
                //  First remove any existing plot, if it exists
                this._removeChart();
            } catch (e) {
                //  Eat Exception
            }
        }

        const chart_config = qcPage_StandardChartConfig({ chartContainer_DOM_Element: this.plot_Ref.current });

        {
            // console.log("Gold Standard chart Data currently commented out.  Data for Chart with Title: " + chartTitle );

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

        // const changePlotlyLayout_For_XaxisLabelLengths__Params: QcPage_Plotly__ChangePlotlyLayout_For_XaxisLabelLengths__Params = {
        //     xAxisLabels: new Set(chart_X), xAxisTitle
        // }

        if ( ! this.props.isInSingleChartOverlay ) {

            //  Main Page Plot

            this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                plotly_CreatePlot_Params: { chart_Data: chart_Data_Array, chart_Layout, chart_config },
                chart_Width: chart_Layout.width,
                chart_Height: chart_Layout.height,
                image_DOM_Element: this.image_Ref.current,
                changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                plotRendered_Success_Callback: () : void => {
                    this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                },
                plotRendered_Fail_Callback:  () : void => {
                    this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                }
            });

            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
            qcPage_Plotly_RenderPlotOnPage__RenderOn_MainPage__As_PNG({
                qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
            });

        } else {

            //  Overlay Plot

            this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params({
                plotly_CreatePlot_Params: { chart_Data: chart_Data_Array, chart_Layout, chart_config },
                chart_Width: chart_Layout.width,
                chart_Height: chart_Layout.height,
                plot_Div_DOM_Element: this.plot_Ref.current,
                changePlotlyLayout_For_XaxisLabelLengths__Params: undefined,
                plotRendered_Success_Callback: () : void => {
                    this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                },
                plotRendered_Fail_Callback:  () : void => {
                    this.setState({ showCreatingMessage: false, showUpdatingMessage: false }); // Do at end
                }
            });

            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
            qcPage_Plotly_RenderPlotOnPage__RenderOn_Overlay__As_PlotlyPlot({
                qcPage_Plotly_DOM_Updates___RenderPlotOnPage__RenderOn_Overlay_Params: this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
            });
        }

        this.setState({ showUpdatingMessage: false });
    }

    /**
     *
     */
    private _removeChart() : void {
        try {
            if ( this.plot_Ref.current ) {
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot.
                removeChart_InOverlay_FromDOM({ plot_Div_DOM_Element: this.plot_Ref.current });
            }
        } catch (e) {
            //  Eat Exception
        }
    }

    /**
     *
     */
    render() {

        return (

            <React.Fragment>

                {( this.props.isInSingleChartOverlay ) ? (
                    //  For Single Chart Overlay: div the chart will be rendered into
                    <div ref={this.plot_Ref} style={ { height: "100%" } } data-div-for-plot="the div for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></div>
                ) : (
                    //  For Main Page: img the chart will be inserted into
                    <img ref={this.image_Ref} className=" chart-main-page-image " data-img-for-plot="the img for the plot"  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }></img>
                )}

                {( this.state.showCreatingMessage ) ? (

                    <QcPage_CreatingPlot_BlockCover/>

                ): ( this.state.showUpdatingMessage ) ? (

                    <QcPage_UpdatingData_BlockCover/>

                ): ( ! this.props.isInSingleChartOverlay ) ? (

                     // Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click

                    //  Display even though NOT have click callback since the Section HAS a Click Handler
                    <QcPage_ClickPlot_ForInteractivePlot_BlockCover
                        clickHandler_Callback={ null /* this._openChartInOverlay_BindThis */ }
                        force_Render_WithoutCallback={ true }
                    />

                ) : null }

            </React.Fragment>
        );
    }
}