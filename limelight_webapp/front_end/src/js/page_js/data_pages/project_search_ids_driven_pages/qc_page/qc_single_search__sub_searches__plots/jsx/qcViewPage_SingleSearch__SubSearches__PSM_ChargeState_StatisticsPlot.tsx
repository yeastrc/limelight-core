/**
 * qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot.tsx
 *
 * QC Page SingleSearch__SubSearches : Charge State Statistics
 *
 */

import React from "react";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { qcPage_StandardChartLayout } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { qcPage_StandardChartConfig } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartConfig";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcPage_UpdatingData_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import { qc_SingleSearch__SubSearches__Open_PSM_ChargeState_OverlayContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_ChargeState_OverlayContainer";
import { SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches";
import { QcPage_CreatingPlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_CreatingPlot_BlockCover";
import { QcPage_ClickPlot_ForInteractivePlot_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ClickPlot_ForInteractivePlot_BlockCover";
import {
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params,
    QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import Plotly from "plotly.js-dist-min";


const chartTitle = "Fraction of PSMs with Charge";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    isInSingleChartOverlay: boolean
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State {

    //  Update shouldComponentUpdate(...) and componentDidUpdate(...) if this changes

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot
    extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props, QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    static chartTitle = chartTitle;

    //  bind to 'this' for passing as parameters
    private _openChartInOverlay_BindThis = this._openChartInOverlay.bind(this);
    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private plot_Ref :  React.RefObject<HTMLDivElement>
    private image_Ref : React.RefObject<HTMLImageElement>

    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params
    private _qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params: QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_Overlay_Params

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.plot_Ref = React.createRef();
        this.image_Ref = React.createRef();

        //  Initialize to current passed value
        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

        props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register({ callbackItem: this })

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
        try {
            this._componentMounted = true;

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State>, nextContext: any): boolean {

        if (
            nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__PSM_ChargeState_StatisticsPlot_State>, snapshot?: any) {
        try {
            //  ALWAYS remove check of state properties in 'componentDidUpdate'

            if (
                prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
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

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        if (
            ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
            )) {
            //  Skip these params since they are not the "Latest"
            return; // EARLY RETURN
        }


        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];


        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
        if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
            const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }


        const promise_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()

        promise_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.catch( reason => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promise_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.then( async get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => {
            try {
                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                if (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                this.setState({showUpdatingMessage: false});

                const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

                const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

                const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

                const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
                const searchSubGroupIds_DisplayOrder: Array<number> = [];
                const searchSubGroups_Map_Key_searchSubGroupId: Map<number, SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = new Map();
                {
                    const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
                    for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                        searchSubGroups_DisplayOrder.push(searchSubGroup);
                        searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
                        searchSubGroups_Map_Key_searchSubGroupId.set(searchSubGroup.searchSubGroup_Id, searchSubGroup);
                    }
                }

                const qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches = new QcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches({searchSubGroupIds: searchSubGroupIds_DisplayOrder});

                const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                        get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise()

                const searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result.searchSubGroupId_ForPSM_ID_Holder;

                //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

                const peptideDistinct_Array =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

                let charge_Min_AcrossAllSearches = undefined;
                let charge_Max_AcrossAllSearches = undefined;

                const charge_Count_Map_Key_Charge_Map_Key_SubSearchId = new Map<number, Map<number, Charge_Count_Entry>>();

                const psm_Count_Map_Key_SubSearchId = new Map<number, number>();

                const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                    qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                        projectSearchId,
                        peptideDistinct_Array,
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                    });

                const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

                for (const psmTblData_Filtered_Entry of psmTblData_Filtered) {

                    const subGroupId = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmTblData_Filtered_Entry.psmId);
                    if ( ! subGroupId ) {
                        const msg = "( ! subGroupId ) psmId: " + psmTblData_Filtered_Entry.psmId + ", projectSearchId: " + projectSearchId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {
                        //  NOT a Selected searchSubGroup_Id so SKIP
                        continue; // EARLY CONTINUE
                    }

                    {
                        const psm_Count = psm_Count_Map_Key_SubSearchId.get(subGroupId);
                        if ( psm_Count ) {
                            const new_psm_Count = psm_Count + 1;
                            psm_Count_Map_Key_SubSearchId.set(subGroupId, new_psm_Count);
                        } else {
                            psm_Count_Map_Key_SubSearchId.set(subGroupId, 1);
                        }
                    }

                    let charge_Count_Map_Key_Charge = charge_Count_Map_Key_Charge_Map_Key_SubSearchId.get(subGroupId);
                    if ( ! charge_Count_Map_Key_Charge ) {
                        charge_Count_Map_Key_Charge = new Map();
                        charge_Count_Map_Key_Charge_Map_Key_SubSearchId.set(subGroupId, charge_Count_Map_Key_Charge);
                    }

                    let charge_Count_Entry = charge_Count_Map_Key_Charge.get(psmTblData_Filtered_Entry.charge);
                    if (!charge_Count_Entry) {
                        charge_Count_Entry = {
                            charge : psmTblData_Filtered_Entry.charge,
                            psmCountForEntry : 0
                        };
                        charge_Count_Map_Key_Charge.set(psmTblData_Filtered_Entry.charge, charge_Count_Entry);
                    }
                    charge_Count_Entry.psmCountForEntry++;

                    //  Compute Min and Max Charge
                    if (charge_Min_AcrossAllSearches === undefined) {
                        charge_Min_AcrossAllSearches = charge_Count_Entry.charge;
                        charge_Max_AcrossAllSearches = charge_Count_Entry.charge;
                    } else {
                        if (charge_Min_AcrossAllSearches > charge_Count_Entry.charge) {
                            charge_Min_AcrossAllSearches = charge_Count_Entry.charge
                        }
                        if (charge_Max_AcrossAllSearches < charge_Count_Entry.charge) {
                            charge_Max_AcrossAllSearches = charge_Count_Entry.charge
                        }
                    }
                }

                const chartData_MainTraces_Array: Plotly.Data[] = [];


                for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                    if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                        //  NOT a Selected searchSubGroup_Id so SKIP
                        continue; // EARLY CONTINUE
                    }

                    const color = "#" + qcViewPage_SingleSearch__SubSearches__ComputeColorsFor_SubSearches.get_Color_AsHexString_By_SearchSubGroupId(searchSubGroup.searchSubGroup_Id)

                    const chart_Data_ForSearch__TraceName = searchSubGroup.subgroupName_Display;

                    const charge_Count_Map_Key_Charge_Map = charge_Count_Map_Key_Charge_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id);
                    if ( ! charge_Count_Map_Key_Charge_Map ) {

                        continue; // EARLY CONTINUE

                        // const msg = "charge_Count_Map_Key_Charge_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for searchSubGroup.searchSubGroup_Id: " + searchSubGroup.searchSubGroup_Id;
                        // console.warn(msg);
                        // throw Error(msg);
                    }

                    const psm_Count_TotalForSubSearch = psm_Count_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id);
                    if ( psm_Count_TotalForSubSearch === undefined ) {

                        continue; // EARLY CONTINUE

                        // const msg = "psm_Count_TotalForSubSearch = psm_Count_Map_Key_SubSearchId.get(searchSubGroup.searchSubGroup_Id); returned NOTHING for projectSearchId: " + searchSubGroup.searchSubGroup_Id;
                        // console.warn(msg);
                        // throw Error(msg);
                    }

                    const chart_X: Array<string> = []
                    const chart_Y: Array<number> = []
                    const chart_Bars_labels: Array<string> = [];
                    const chart_Bars_Tooltips: Array<string> = [];

                    for (let charge = charge_Min_AcrossAllSearches; charge <= charge_Max_AcrossAllSearches; charge++) {

                        let psmCount_ForEntry = 0;
                        let psmCount_Fraction_ForEntry = 0;
                        {
                            const charge_Count_Entry = charge_Count_Map_Key_Charge_Map.get(charge);
                            if (charge_Count_Entry) {
                                psmCount_ForEntry = charge_Count_Entry.psmCountForEntry;
                                psmCount_Fraction_ForEntry = charge_Count_Entry.psmCountForEntry / psm_Count_TotalForSubSearch;
                            }
                        }
                        chart_X.push("+" + charge.toString());
                        chart_Y.push(psmCount_Fraction_ForEntry);
                        chart_Bars_labels.push(psmCount_Fraction_ForEntry.toFixed(3));

                        let psmCount_Fraction_TooltipString: string = undefined;
                        if ( psmCount_Fraction_ForEntry === 0 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(1);
                        } else if (psmCount_Fraction_ForEntry < 0.1 ) {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(3);
                        } else {
                            psmCount_Fraction_TooltipString = psmCount_Fraction_ForEntry.toFixed(2);
                        }

                        const tooltip =
                            "Sub Search: " + chart_Data_ForSearch__TraceName +
                            "<br>Charge: +" + charge +
                            "<br>Fraction: " + psmCount_Fraction_TooltipString +
                            "<br>Count: " + psmCount_ForEntry.toLocaleString() +
                            "<br>Total Count: " + psm_Count_TotalForSubSearch.toLocaleString();

                        chart_Bars_Tooltips.push(tooltip);
                    }

                    const chart_Data_ForSearch: Plotly.Data =
                        {
                            name: chart_Data_ForSearch__TraceName,
                            type: 'scatter',
                            marker: {
                                color
                            },
                            x: chart_X,
                            y: chart_Y,
                            text: chart_Bars_labels, //  Text put on each bar
                            hoverinfo: "text", //  Hover contents
                            hovertext: chart_Bars_Tooltips  //  Hover contents per bar
                        };

                    chartData_MainTraces_Array.push(chart_Data_ForSearch)
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

                const chart_Layout = qcPage_StandardChartLayout({
                    chartTitle,
                    chart_X_Axis_Label: "Charge",
                    chart_X_Axis_IsTypeCategory: true,
                    chart_Y_Axis_Label: "Fraction",
                    showlegend: true
                });

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

                const chart_config = qcPage_StandardChartConfig({chartContainer_DOM_Element: this.plot_Ref.current});

                {
                    // const chart_Data_JSON = JSON.stringify(chartData_MainTraces_Array);
                    // const chart_Layout_JSON = JSON.stringify(chart_Layout);
                    //
                    // console.log("*********************************")
                    // console.log("Data for Chart with Title: " + chartTitle);
                    // console.log("chart_Data object: ", chartData_MainTraces_Array);
                    // console.log("chart_Data_JSON: " + chart_Data_JSON);
                    // console.log("chart_Layout object: ", chart_Layout);
                    // console.log("chart_Layout_JSON: " + chart_Layout_JSON);
                    // console.log("chart_config object: ", chart_config);
                    // console.log("*********************************")
                }

                if ( ! this.props.isInSingleChartOverlay ) {

                    //  Main Page Plot

                    this._qcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params = new QcPage_Plotly_DOM_Updates__RenderPlotOnPage__RenderOn_MainPage_Params({
                        plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
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
                        plotly_CreatePlot_Params: { chart_Data: chartData_MainTraces_Array, chart_Layout, chart_config },
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


            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
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
    private _openChartInOverlay() {
        try {
            qc_SingleSearch__SubSearches__Open_PSM_ChargeState_OverlayContainer({
                params: {
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent,
                }
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
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

                    //  Component on main page that goes on top of <img> to show message on hover and call clickHandler_Callback on click
                    <QcPage_ClickPlot_ForInteractivePlot_BlockCover
                        clickHandler_Callback={ this._openChartInOverlay_BindThis }
                    />

                ) : null }

            </React.Fragment>
        );
    }


}

/**
 *
 */
class Charge_Count_Entry {

    charge: number
    psmCountForEntry: number
}
