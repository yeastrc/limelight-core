/**
 * qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component.tsx
 *
 * QC Page Common - Section - Gold Standard Statistics - Select Gold Standard entry
 *
 */

import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch,
    Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component,
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections,
    qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues,
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback,
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback_Params
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { Qc_GoldStandard_NumberFormatting_Constants } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard_NumberFormatting_Constants";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import { CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";
import {
    qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch,
    Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch";
import { qc_GoldStandard_MatchedData_Table_Create } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qc_GoldStandard_MatchedData_Table_Create";


const _Overlay_Title = "Gold Standard"

const _Overlay_Width_Min = 300;
const _Overlay_Width_Max = 2200;

const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1800;


/**
 *
 */
export const open_Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component = function (
    {
        params
    } : {
        params: Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Close = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component
            params={ params }
            callbackOn_Close={ callbackOn_Close }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}

/**
 *
 */
export interface Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Params {

    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

    goldStandardEntry_ALL: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>

    selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

    goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry>

    goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections
    projectSearchId
    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/////////

//  React Component

/**
 *
 */
interface Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Props {

    params: Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Params
    callbackOn_Close: () => void
}

/**
 *
 */
interface Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_State {

    forceRerenderObject: object      //  Force Rerender object
}

/**
 *
 */
class Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component extends React.Component< Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Props, Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_State > {

    //  bind to 'this' for passing as parameters

    private _callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback.bind(this);

    private _userOptions_Changed_Callback_BindThis = this._userOptions_Changed_Callback.bind(this)

    // _userOptions_Changed_Callback( params: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback_Params

    private _DO_NOT_CALL() {

        const userOptions_Changed_Callback: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback = this._userOptions_Changed_Callback

        const callback__SelectGoldStandard_Component_SelectionChosen_Callback: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback
    }

    private _goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry>

    private _goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    private _goldStandardEntry_ALL: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>

    private _selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

    private _goldStandard_FileContents_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry

    private _getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

    private _getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result

    private _userOptions_Component_OptionsSelections = qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues()

    private _componentMounted: boolean = false


    private _show_LoadingData_Message: boolean = true

    private _showUpdatingMessage: boolean

    private _current_Initial_OR_User_Request_TrackingObject: object


    /**
     *
     */
    constructor(props: Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component_Props) {
        super(props);

        this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = props.params.qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

        this._goldStandardEntry_ALL = props.params.goldStandardEntry_ALL
        this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly = props.params.selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly

        this._goldStandard_Root_SelectionEntriesArray = props.params.goldStandard_Root_SelectionEntriesArray
        this._goldStandard_Root_SelectionEntry = props.params.goldStandard_Root_SelectionEntry

        this.state = {
            forceRerenderObject: {}
        };
    }

    /**
     *
     */
    componentWillUnmount() {

        this._componentMounted = false
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true

            this._current_Initial_OR_User_Request_TrackingObject = {}

            this._call__GetGoldStandardData({ goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry, current_Initial_OR_User_Request_TrackingObject_Parameter: this._current_Initial_OR_User_Request_TrackingObject })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _callback__SelectGoldStandard_Component_SelectionChosen_Callback( params: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams ) {

        let goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

        for ( const goldStandard_Root_SelectionEntry_InArray of this._goldStandard_Root_SelectionEntriesArray ) {
            if ( goldStandard_Root_SelectionEntry_InArray.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ===
                params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
            ) {
                goldStandard_Root_SelectionEntry = goldStandard_Root_SelectionEntry_InArray;
                break;
            }
        }
        if ( goldStandard_Root_SelectionEntry === undefined ) {
            const msg = "No entry in this._goldStandard_Root_SelectionEntriesArray for goldStandard_Root_Id_Selection: " +
                params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id;
            console.warn(msg);
            throw Error(msg);
        }

        this._goldStandard_Root_SelectionEntry = goldStandard_Root_SelectionEntry

        let selected_GoldStandardEntry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

        for ( const goldStandard_Root_Entry of this._goldStandardEntry_ALL ) {
            if ( goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ===
                params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                // && this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId ===
                // params.selectionEntry.projectSearchId_Set
            ) {
                selected_GoldStandardEntry = goldStandard_Root_Entry;
                break;
            }
        }
        if ( selected_GoldStandardEntry === undefined ) {
            const msg = "No entry in this._goldStandardEntry_And_ProjectSearchId_ALL for goldStandard_Root_Id_Selection: " +
                params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
            // " and projectSearchId: " + params.selectionEntry.projectSearchId_Set
            console.warn(msg);
            throw Error(msg);
        }

        this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly = selected_GoldStandardEntry

        this._current_Initial_OR_User_Request_TrackingObject = {}

        const current_Initial_OR_User_Request_TrackingObject_Parameter = this._current_Initial_OR_User_Request_TrackingObject

        this._showUpdatingMessage = true
        this.setState({ forceRerenderObject: {} })

        window.setTimeout( ()=> { try {

            this._call__GetGoldStandardData({
                goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry, current_Initial_OR_User_Request_TrackingObject_Parameter
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        this.setState({ forceRerenderObject: {} })
    }

    /**
     *
     * @param params
     */
    private _userOptions_Changed_Callback( params: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections_Callback_Params ) {

        this._userOptions_Component_OptionsSelections = params.userOptions;

        this._current_Initial_OR_User_Request_TrackingObject = {}

        const current_Initial_OR_User_Request_TrackingObject_Parameter = this._current_Initial_OR_User_Request_TrackingObject

        this._showUpdatingMessage = true
        this.setState({ forceRerenderObject: {} })

        window.setTimeout( ()=> { try {

            this._call__GetGoldStandardData({
                goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry, current_Initial_OR_User_Request_TrackingObject_Parameter
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param selected_GoldStandardEntry
     */
    private _call__GetGoldStandardData(
        {
            goldStandard_Root_Selection, current_Initial_OR_User_Request_TrackingObject_Parameter
        } : {
            goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

            current_Initial_OR_User_Request_TrackingObject_Parameter: object
        }
    ) {

        const projectSearchId = this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

        window.setTimeout( ()=> { try {

            this._call__GetGoldStandardData__After__setTimeout({
                goldStandard_Root_Selection,

                projectSearchId, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
                current_Initial_OR_User_Request_TrackingObject_Parameter
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }}, 10 )
    }

    /**
     *
     * @param selected_GoldStandardEntry
     */
    private _call__GetGoldStandardData__After__setTimeout(
        {
            goldStandard_Root_Selection,

            projectSearchId, gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
            current_Initial_OR_User_Request_TrackingObject_Parameter
        } : {
            goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

            projectSearchId: number
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number

            current_Initial_OR_User_Request_TrackingObject_Parameter: object
        }
    ) {

        if (
            gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
            || projectSearchId !== this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId
        ) {

            //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

            return;  // EARLY RETURN
        }

        let goldStandard_FileContents_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
        let getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

        const promises: Array<Promise<void>> = []

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(this.props.params.projectSearchId);

        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + this.props.params.projectSearchId )
        }

        { //  goldStandard_FileContents_Entry

            const get_GoldStandard_FileContents_EntriesHolder_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entries().
                get_GoldStandard_FileContents_EntriesHolder({ gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id })

            if ( get_GoldStandard_FileContents_EntriesHolder_Result.data ) {

                const goldStandard_FileContents_Entries_Holder = get_GoldStandard_FileContents_EntriesHolder_Result.data.goldStandard_FileContents_Entries_Holder

                goldStandard_FileContents_Entry =
                    goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )

                if ( ! goldStandard_FileContents_Entry ) {
                    const msg = "goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) returned NOTHING for gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: " + gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                    console.warn(msg)
                    throw Error(msg)
                }

            } else if ( get_GoldStandard_FileContents_EntriesHolder_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {

                    get_GoldStandard_FileContents_EntriesHolder_Result.promise.catch(reason => { reject(reason)})
                    get_GoldStandard_FileContents_EntriesHolder_Result.promise.then(value_get_GoldStandard_FileContents_EntriesHolder_Result => { try {

                        goldStandard_FileContents_Entry =
                            value_get_GoldStandard_FileContents_EntriesHolder_Result.goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )

                        if ( ! goldStandard_FileContents_Entry ) {
                            const msg = "_goldStandard_FileContents_Entries_Holder.get_GoldStandard_FileContents_Entry_For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id( goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) returned NOTHING for gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: " + gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                            console.warn(msg)
                            throw Error(msg)
                        }

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push( promise )

            } else {
                const msg = "get_GoldStandard_FileContents_EntriesHolder_Result no data or promise"
                console.warn(msg)
                throw Error(msg)
            }
        }



        {
            const peptideDistinct_Array =
                this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result =
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch({
                    goldStandard_Root_Selection,
                    userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,
                    projectSearchId,
                    peptideDistinct_Array,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                })

            if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data ) {

                getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data

            } else if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {

                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.catch( reason => {
                        try {
                            if ( ! this._componentMounted ) {
                                //  Component no longer mounted so exit
                                return; // EARLY RETURN
                            }

                            this._show_LoadingData_Message = false
                            this._showUpdatingMessage = false

                            this.setState({ forceRerenderObject: {} });

                            console.warn( "promise.catch(...): reason: ", reason );

                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
                    });

                    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.then( value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result => { try {

                        getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }});

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }});

                promises.push( promise )

            } else {
                throw Error("qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            this._get__qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result({
                goldStandard_FileContents_Entry,
                getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
                goldStandard_Root_Selection, projectSearchId,
                current_Initial_OR_User_Request_TrackingObject_Parameter
            })

            return; // EARLY RETURN
        }

        const promisesAll = Promise.all( promises )

        promisesAll.catch(reason => {  })
        promisesAll.then(value => { try {

            if ( ! this._componentMounted ) {
                //  Component no longer mounted so exit
                return; // EARLY RETURN
            }

            if (
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== this._goldStandard_Root_SelectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                || projectSearchId !== projectSearchId
            ) {

                //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                return;  // EARLY RETURN
            }

            this._get__qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result({
                goldStandard_FileContents_Entry,
                getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
                goldStandard_Root_Selection, projectSearchId,
                current_Initial_OR_User_Request_TrackingObject_Parameter
            })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     * @param goldStandard_Root_Selection
     * @param projectSearchId
     * @private
     */
    private _get__qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result(
        {
            goldStandard_FileContents_Entry, getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result, goldStandard_Root_Selection, projectSearchId, current_Initial_OR_User_Request_TrackingObject_Parameter
        } : {
            goldStandard_FileContents_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry
            getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
            goldStandard_Root_Selection: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
            projectSearchId: number

            current_Initial_OR_User_Request_TrackingObject_Parameter: object
        }
    ) {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        if (
            goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== this._goldStandard_Root_SelectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
            || projectSearchId !== this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId
        ) {

            //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

            return;  // EARLY RETURN
        }

        const peptideDistinct_Array =
            this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;


        const qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result =
            qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch({
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
                goldStandard_Root_Selection,
                userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,
                projectSearchId,
                peptideDistinct_Array,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            })

        qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.data
        qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.promise

        if ( qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.data ) {

            if ( current_Initial_OR_User_Request_TrackingObject_Parameter !== this._current_Initial_OR_User_Request_TrackingObject ) {

                //  User changed parameters so stop processing this request to wait for following request for latest User parameters

                return;
            }

            this._goldStandard_FileContents_Entry = goldStandard_FileContents_Entry

            this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

            this._getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result = qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.data


            this._show_LoadingData_Message = false
            this._showUpdatingMessage = false

            this.setState({ forceRerenderObject: {} });

        } else if ( qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.promise ) {

            qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.promise.catch( reason => {
                try {
                    if ( ! this._componentMounted ) {
                        //  Component no longer mounted so exit
                        return; // EARLY RETURN
                    }

                    this._show_LoadingData_Message = false
                    this._showUpdatingMessage = false

                    this.setState({ forceRerenderObject: {} });

                    console.warn( "promise.catch(...): reason: ", reason );

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            });

            qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result.promise.then( value_GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result => { try {

                if ( ! this._componentMounted ) {
                    //  Component no longer mounted so exit
                    return; // EARLY RETURN
                }

                if (
                    goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== this._goldStandard_Root_SelectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                    || projectSearchId !== projectSearchId
                ) {

                    //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                    return;  // EARLY RETURN
                }

                if ( current_Initial_OR_User_Request_TrackingObject_Parameter !== this._current_Initial_OR_User_Request_TrackingObject ) {

                    //  User changed parameters so stop processing this request to wait for following request for latest User parameters

                    return;
                }

                this._goldStandard_FileContents_Entry = goldStandard_FileContents_Entry

                this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

                this._getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result = value_GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result

                this._show_LoadingData_Message = false
                this._showUpdatingMessage = false

                this.setState({ forceRerenderObject: {} });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
            });

        } else {
            throw Error("qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result: no data or promise")
        }
    }

    /**
     *
     */
    render() {
        try {

            let precision_ResultDisplay: string
            let recall_ResultDisplay: string


            let matchedTableContents: JSX.Element

            if ( ( ! this._show_LoadingData_Message ) && ( ! this._showUpdatingMessage ) && this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result ) {

                const projectSearchId = this.props.params.projectSearchId

                if ( ! this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result ) {
                    const msg = "( ! this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result ) in render()"
                    console.warn(msg)
                    throw Error(msg)
                }

                const getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result> = new Map()
                getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId.set( projectSearchId, this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result )

                if ( ! this._getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result ) {
                    const msg = "( ! this._getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result ) in render()"
                    console.warn(msg)
                    throw Error(msg)
                }

                const getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId: Map<number, Qc_GoldStandard__GetData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result> = new Map()
                getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId.set( projectSearchId, this._getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result )

                if ( ! this._goldStandard_FileContents_Entry ) {
                    const msg = "( ! this._goldStandard_FileContents_Entry ) in render()"
                    console.warn(msg)
                    throw Error(msg)
                }

                const goldStandard_FileContents_Entry_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_FileContents_Entry> = new Map()
                goldStandard_FileContents_Entry_Map_Key_ProjectSearchId.set( projectSearchId, this._goldStandard_FileContents_Entry )

                matchedTableContents = qc_GoldStandard_MatchedData_Table_Create({
                    getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId: getData_And_Compute_MatchesTable_Objects_For_SingleSearch_Result_Map_Key_ProjectSearchId,
                    getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId: getData_And_Compute_Precision_And_Recall_For_MultipleSearches_Result_Map_Key_ProjectSearchId,
                    goldStandard_FileContents_Entry_Map_Key_ProjectSearchId: goldStandard_FileContents_Entry_Map_Key_ProjectSearchId,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                })

                {
                    const precision_Number = (
                        this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.size /
                        this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOne_PSM__Map_Key_ScanNumber.size
                    )

                    if ( Number.isNaN( precision_Number ) ) {
                        precision_ResultDisplay = "0"
                    } else {
                        if ( precision_Number < 0.01 ) {
                            precision_ResultDisplay = precision_Number.toPrecision( Qc_GoldStandard_NumberFormatting_Constants._NUMBER_FORMAT_PRECISION_RECALL )
                        } else {
                            precision_ResultDisplay = precision_Number.toFixed( Qc_GoldStandard_NumberFormatting_Constants._NUMBER_FORMAT_PRECISION_RECALL )
                        }
                    }
                }
                {
                    const recall_Number = (
                        this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_WhichHave_AtLeastOneCorrect_PSM__Map_Key_ScanNumber.size /
                        this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.scanNumbers_InGoldStandard_Set.size
                    )

                    if ( Number.isNaN( recall_Number ) ) {
                        recall_ResultDisplay = "0"
                    } else {
                        if ( recall_Number < 0.01 ) {
                            recall_ResultDisplay = recall_Number.toPrecision( Qc_GoldStandard_NumberFormatting_Constants._NUMBER_FORMAT_PRECISION_RECALL )
                        } else {
                            recall_ResultDisplay = recall_Number.toFixed( Qc_GoldStandard_NumberFormatting_Constants._NUMBER_FORMAT_PRECISION_RECALL )
                        }
                    }
                }

                // Precision:
                //
                //     Y = # of scan numbers (in gold standard) for which you have at least one correct PSM
                //
                //     X = # of scan numbers (in gold standard) for which you have at least one PSM
                //
                // Precision = Y / X
                //
                // () is true when limiting evaluation to scan numbers in gold standard
                //
                // Recall:
                //
                //     Y = # of scan numbers in the gold standard for which you have at least one correct PSM
                //
                //     X = # of scan numbers in the gold standard
                //
                // Recall = Y / X
            }

            return (

                <ModalOverlay_Limelight_Component_v001_B_FlexBox
                    widthMinimum={ _Overlay_Width_Min }
                    widthMaximum={ _Overlay_Width_Max }
                    heightMinimum={ _Overlay_Height_Min }
                    heightMaximum={ _Overlay_Height_Max }
                    title={ _Overlay_Title }
                    set_CSS_Position_Fixed={ true }
                    callbackOnClicked_Close={ this.props.callbackOn_Close }
                    close_OnBackgroundClick={ false } >

                    <React.Fragment>

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                        >

                            <>
                                <QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component
                                    goldStandard_Root_SelectionEntry_InitialSelection={ this._goldStandard_Root_SelectionEntry }
                                    selectionEntriesArray={ this._goldStandard_Root_SelectionEntriesArray }
                                    selectionChosen_Callback={ this._callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis }
                                />
                            </>

                            <QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component
                                callback__UserOptionsChanged={ this._userOptions_Changed_Callback_BindThis }
                            />

                            { this._show_LoadingData_Message ? (

                                <div>
                                    LOADING DATA
                                </div>

                            ) : (

                                <div>
                                    <h3>
                                        Gold Standard Statistics
                                    </h3>

                                    <div style={ { position: "relative" } }>
                                        <div>
                                            <span>Recall: </span>
                                            <span>{ recall_ResultDisplay }</span>
                                        </div>
                                        <div>
                                            <span>Precision: </span>
                                            <span>{ precision_ResultDisplay }</span>
                                        </div>

                                        { this._showUpdatingMessage ? (
                                            <div
                                                className=" standard-background-color "
                                                style={ { position: "absolute", inset: 0 } }
                                            >
                                                Updating...
                                            </div>
                                        ) : null }
                                    </div>
                                </div>
                            )}
                        </div>


                        { ! this._show_LoadingData_Message ? (

                            <div
                                className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right modal-overlay-body-standard-margin-bottom standard-border-color-medium"
                                style={ { overflowY: "auto", overflowX: "auto", borderStyle: "solid", borderWidth: 1 } }
                            >
                                {/*  Main Body:  Scrollable Div  */}

                                <div style={ { position: "relative" } }>
                                    { matchedTableContents }

                                    { this._showUpdatingMessage ? (
                                        <div className=" block-updating-overlay-container ">
                                            Updating...
                                        </div>
                                    ) : null }
                                </div>
                            </div>
                            ) : null }

    {/*
                                Warning: IF uncomment next block, need to remove from previous block 'modal-overlay-body-standard-margin-bottom'

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginTop: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                <button
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this.props.callbackOn_Close();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
    */}
                    </React.Fragment>
                </ModalOverlay_Limelight_Component_v001_B_FlexBox>
            );

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
}

