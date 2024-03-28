/**
 * qc_MultipleSearches_GoldStandard_Statistics_Section.tsx
 *
 * QC Page Multiple Searches - Section - Gold Standard Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";

import { QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections,
    qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues,
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { QcViewPage_MultipleSearches__GoldStandard_MainPageContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/jsx/qcViewPage_MultipleSearches__GoldStandard_MainPageContainer";
import { CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";
import { open_Qc_MultipleSearches_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_GoldStandard_Statistics_Section__GoldStandard_ShowDetails_Overlay_Component";
import { Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";

/**
 *
 */
export interface Qc_MultipleSearches_GoldStandard_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface Qc_MultipleSearches_GoldStandard_Statistics_Section_State {

    show_Section?: boolean  //  Only Show Section when have Gold Standard Entries

    sectionExpanded?: boolean
    show_LoadingData_Message?: boolean
    show_NoData_Message?: boolean

    force_Rerender?: object
}

/**
 *
 */
export class Qc_MultipleSearches_GoldStandard_Statistics_Section extends React.Component< Qc_MultipleSearches_GoldStandard_Statistics_Section_Props, Qc_MultipleSearches_GoldStandard_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);
    private _callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const callback__SelectGoldStandard_Component_SelectionChosen_Callback: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback
    }

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback
    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry>

    private _goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    private _goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: Map<number, Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>>

    private _goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>

    private _selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

    private _userOptions_Component_OptionsSelections: QcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections = qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues()

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_GoldStandard_Statistics_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1 ) {
            const msg = "ONLY valid for NOT 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback()

        this.state =  { show_Section: false, sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            //  Confirm have any Gold Standard Results before display Gold Standard Section

            this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearches()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_MultipleSearches_GoldStandard_Statistics_Section_Props>, nextState: Readonly<Qc_MultipleSearches_GoldStandard_Statistics_Section_State>, nextContext: any): boolean {

        if ( nextState.show_Section !== this.state.show_Section ) {
            return true;
        }
        if ( nextState.sectionExpanded !== this.state.sectionExpanded ) {
            return true;
        }
        if ( ! nextState.sectionExpanded ) {
            return false;
        }

        return true;
    }

    componentDidUpdate( prevProps: Readonly<Qc_MultipleSearches_GoldStandard_Statistics_Section_Props>, prevState: Readonly<Qc_MultipleSearches_GoldStandard_Statistics_Section_State>, snapshot?: any ) {
        try {

            if ( this._sectionEverExpanded ) {

                if (
                    prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                    || prevState.sectionExpanded !== this.state.sectionExpanded
                ) {

                    //  TODO  Need to do more to limit how often this is called

                    this.setState( { show_LoadingData_Message: true } );

                    this._data_For_GoldStandard_Display()

                } else {
                    return; // No changes need to be processed
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
    private _on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearches() {

        const projectSearchIds = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds;

        const promises: Array<Promise<void>> = [];

        const goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder> = new Map()

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
            }

            const get_GoldStandard_Root_AnyEntriesExistHolder_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist().get_GoldStandard_Root_AnyEntriesExistHolder()

            if ( get_GoldStandard_Root_AnyEntriesExistHolder_Result.data ) {

                goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_GoldStandard_Root_AnyEntriesExistHolder_Result.data.goldStandard_Root_AnyEntriesExist_Holder );

            } else if ( get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise.catch(reason => { reject(reason) })
                    get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise.then(value => { try {
                        goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.goldStandard_Root_AnyEntriesExist_Holder );
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("No value for get_GoldStandard_Root_AnyEntriesExistHolder_Result data or promise");
            }
        }

        if ( promises.length === 0 ) {

            this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearches_Process_HaveAnyEntries_Result({ goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId });

        } else {

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {

            })

            promisesAll.then(noValue => { try {
                this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearches_Process_HaveAnyEntries_Result({ goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        }
    }

    /**
     *
     */
    private _on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearches_Process_HaveAnyEntries_Result(
        {
            goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId
        } : {
            goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder>
        }
    ) {
        let show_Section = false

        for ( const goldStandard_Root_AnyEntriesExist_Holder of goldStandard_Root_AnyEntriesExist_Holder_Map_Key_ProjectSearchId.values() ) {

            if ( goldStandard_Root_AnyEntriesExist_Holder.get_GoldStandard_Root_AnyEntriesExist() ) {

                show_Section = true
            }
        }

        this.setState({ show_Section })
    }

    /**
     *
     */
    private _sectionHeaderRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( limelight__IsTextSelected() ) {
                //  Found a Selection so exit with no further action
                return; //  EARLY RETURN
            }

            this._sectionExpanded_Toggle();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _sectionExpanded_Toggle() {

        if ( !this._sectionEverExpanded ) {

            this._data_For_GoldStandard_Display()

            this._sectionEverExpanded = true
        }

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }


    private _data_For_GoldStandard_Display() {

        this.setState({ show_LoadingData_Message: true });

        let goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder> = new Map()

        let promises: Array<Promise<void>> = [];

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
            }

            const get_GoldStandard_Root_EntriesHolder_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries().get_GoldStandard_Root_EntriesHolder();

            if ( get_GoldStandard_Root_EntriesHolder_Result.data ) {

                goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.set( projectSearchId, get_GoldStandard_Root_EntriesHolder_Result.data.goldStandard_Root_Entries_Holder )
            } else if ( get_GoldStandard_Root_EntriesHolder_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_GoldStandard_Root_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                    get_GoldStandard_Root_EntriesHolder_Result.promise.then(value_get_GoldStandard_Root_EntriesHolder_Result => { try {
                        goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value_get_GoldStandard_Root_EntriesHolder_Result.goldStandard_Root_Entries_Holder )
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("No value for get_GoldStandard_Root_EntriesHolder_Result data or promise");
            }
        }

        if ( promises.length === 0 ) {

            this._process_GoldStandardEntriesForSearches({ goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId });

        } else {

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {

            })

            promisesAll.then(noValue => { try {
                this._process_GoldStandardEntriesForSearches({ goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        }
    }

    ////////////////////////////////

    /**
     *
     */
    private _process_GoldStandardEntriesForSearches(
        {
            goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId
        } : {
            goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder>
        }
    ) : void {

        {  //  If ALL Searches return NO DATA, set state 'show_NoData_Message: true' and RETURN

            let show_NoData_Message = true

            for ( const projectSearchId of this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds ) {

                const goldStandard_Root_Entries_Holder = goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

                if ( !goldStandard_Root_Entries_Holder ) {
                    const msg = "goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                    console.warn( msg )
                    throw Error( msg )
                }

                const goldStandard_Root_Entries = goldStandard_Root_Entries_Holder.get_GoldStandard_Root_Entries();

                if ( goldStandard_Root_Entries.length > 0 ) {

                    show_NoData_Message = false

                    break
                }
            }

            if ( show_NoData_Message ) {

                //  NO entries
                this.setState( { show_NoData_Message: true, show_LoadingData_Message: false } );

                return; // EARLY RETURN
            }
        }

        //  Have data for at least 1 Search so continue

        //  Combine goldStandard_Root_Entry across projectSearchId on gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

        const goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object___Map_Key___gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id:
            Map<number, {
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: number
                goldStandard_Root_Entry__Map_Key_ProjectSearchId: Map<number, {
                    goldStandard_Root_Entry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry
                    projectSearchId: number
                }>
        }> = new Map()

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds ) {

            const goldStandard_Root_Entries_Holder = goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.get( projectSearchId )

            if ( !goldStandard_Root_Entries_Holder ) {
                const msg = "goldStandard_Root_Entries_Holder_Map_Key_ProjectSearchId.get( projectSearchId ) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn( msg )
                throw Error( msg )
            }

            const goldStandard_Root_Entries = goldStandard_Root_Entries_Holder.get_GoldStandard_Root_Entries();

            for ( const goldStandard_Root_Entry of goldStandard_Root_Entries ) {

                const gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

                let goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object = goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object___Map_Key___gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )
                if ( ! goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object ) {
                    goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object = { gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, goldStandard_Root_Entry__Map_Key_ProjectSearchId: new Map() }
                    goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object___Map_Key___gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.set( gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object )
                }

                if ( goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object.goldStandard_Root_Entry__Map_Key_ProjectSearchId.has( projectSearchId ) ) {
                    const msg = "Map already has entry: ( goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object.goldStandard_Root_Entry__Map_Key_ProjectSearchId.has( projectSearchId ) ). projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }
                goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object.goldStandard_Root_Entry__Map_Key_ProjectSearchId.set( projectSearchId, {
                    goldStandard_Root_Entry,
                    projectSearchId
                } )
            }
        }

        //  Process goldStandard_Root_Entry for each projectSearchId on gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

        const goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry> = []

        this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = new Map()

        for ( const goldStandard_Root_Entry_Etc_Array_Object_Map_Value of goldStandard_Root_Entry_Etc_Map_Key_ProjectSearchId_Object___Map_Key___gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.values() ) {

            {
                const goldStandard_Root_Entry_Array: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry> = []
                for ( const goldStandard_Root_Entry__Map_Key_ProjectSearchId_Object of goldStandard_Root_Entry_Etc_Array_Object_Map_Value.goldStandard_Root_Entry__Map_Key_ProjectSearchId.values() ) {

                    // if ( ! goldStandard_Root_Entry_Array.find( value_goldStandard_Root_Entry => {
                    //     if ( value_goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id === goldStandard_Root_Entry__Map_Key_ProjectSearchId_Object.goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
                    //         return true
                    //     }
                    //     return false
                    // } ) ) {

                    //  Insert ALL records for this gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

                    goldStandard_Root_Entry_Array.push( goldStandard_Root_Entry__Map_Key_ProjectSearchId_Object.goldStandard_Root_Entry )

                    // }
                }

                this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.set( goldStandard_Root_Entry_Etc_Array_Object_Map_Value.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id, goldStandard_Root_Entry_Array )
            }

            const projectSearchId_Set: Set<number> = new Set()
            const searchScanFileIds_In_GoldStandardEntries: Set<number> = new Set()

            const goldStandard_Root_Entry_Array__For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry> = []

            let scanFilenames_CommaDelim: string

            {
                const scanFilenames_Set = new Set<string>()

                for ( const goldStandard_Root_Entry_Etc of goldStandard_Root_Entry_Etc_Array_Object_Map_Value.goldStandard_Root_Entry__Map_Key_ProjectSearchId.values() ) {

                    projectSearchId_Set.add( goldStandard_Root_Entry_Etc.projectSearchId )

                    const goldStandard_Root_Entry = goldStandard_Root_Entry_Etc.goldStandard_Root_Entry

                    goldStandard_Root_Entry_Array__For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.push( goldStandard_Root_Entry )

                    for ( const searchScanFileEntry of goldStandard_Root_Entry.searchScanFileEntries ) {
                        searchScanFileIds_In_GoldStandardEntries.add( searchScanFileEntry.searchScanFileId )
                    }

                    for ( const searchScanFileEntry of goldStandard_Root_Entry.searchScanFileEntries ) {
                        scanFilenames_Set.add( searchScanFileEntry.searchScanFilename )
                    }
                }

                const scanFilenames_Array = Array.from( scanFilenames_Set );

                scanFilenames_Array.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a,b)
                })

                scanFilenames_CommaDelim = scanFilenames_Array.join( ", " )
            }

            let goldStandard_Label: string
            let goldStandard_Description: string

            {
                if ( goldStandard_Root_Entry_Etc_Array_Object_Map_Value.goldStandard_Root_Entry__Map_Key_ProjectSearchId.size === 0 ) {
                    const msg = "( goldStandard_Root_Entry_Etc_Array_Object_Map_Value.goldStandard_Root_Entry__Map_Key_ProjectSearchId.size === 0 )"
                    console.warn(msg)
                    throw Error(msg)
                }

                //  Use First element in array since they are all the same for displayLabel and description
                const goldStandard_Root_Entry_Etc_IteratorResult = goldStandard_Root_Entry_Etc_Array_Object_Map_Value.goldStandard_Root_Entry__Map_Key_ProjectSearchId.values().next()

                const goldStandard_Root_Entry_Etc_FirstEntry = goldStandard_Root_Entry_Etc_IteratorResult.value
                if ( ! goldStandard_Root_Entry_Etc_FirstEntry ) {
                    const msg = "( ! goldStandard_Root_Entry_Etc_FirstEntry )"
                    console.warn(msg)
                    throw Error(msg)
                }

                goldStandard_Label = goldStandard_Root_Entry_Etc_FirstEntry.goldStandard_Root_Entry.displayLabel
                goldStandard_Description = goldStandard_Root_Entry_Etc_FirstEntry.goldStandard_Root_Entry.description
            }

            const selectionEntry : QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry = {
                currentlySelected: false,
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: goldStandard_Root_Entry_Etc_Array_Object_Map_Value.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
                searchScanFileIds_In_GoldStandardEntries,
                goldStandard_Label,
                goldStandard_Description,
                scanFilenames: scanFilenames_CommaDelim,
                goldStandard_Root_Entry_Array: goldStandard_Root_Entry_Array__For_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,

                projectSearchId_Set
            }

            goldStandard_Root_SelectionEntriesArray.push( selectionEntry )
        }

        goldStandard_Root_SelectionEntriesArray.sort( (a,b) => {
            const scanFilenamesCompare =
                limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.scanFilenames, b.scanFilenames)
            if ( scanFilenamesCompare !== 0 ) {
                return scanFilenamesCompare;
            }
            const goldStandard_Description_Compare = limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.goldStandard_Description, b.goldStandard_Description)
            if ( goldStandard_Description_Compare !== 0 ) {
                return goldStandard_Description_Compare;
            }
            if ( a.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id < b.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
                return -1
            }
            if ( a.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id > b.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
                return 1
            }
            return 0
        })

        const goldStandard_Root_InitialSelection = goldStandard_Root_SelectionEntriesArray[ 0 ]

        this._goldStandard_Root_SelectionEntry = goldStandard_Root_InitialSelection;

        this._goldStandard_Root_SelectionEntry.currentlySelected = true

        this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( goldStandard_Root_InitialSelection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )
        if ( ! this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
            throw Error("this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( goldStandard_Root_InitialSelection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) returned NOTHING")
        }

        this._goldStandard_Root_SelectionEntriesArray = goldStandard_Root_SelectionEntriesArray;

        // this.setState({ showUpdatingMessage: true })

        const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        })

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel

        // this._call__GetGoldStandardData({ goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry })


        this.setState({ show_LoadingData_Message: false });

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _callback__SelectGoldStandard_Component_SelectionChosen_Callback( params: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams ) {

        let goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry = undefined

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

        //  Update for newly selected gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
        this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id =
            this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id.get( params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id )


        if ( ! this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
            const msg = "No entry in this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id for params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: " +
                params.selectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id;
            console.warn(msg);
            throw Error(msg);
        }

        let selected_GoldStandardEntry: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

        for ( const goldStandard_Root_Entry of this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {
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

        window.setTimeout( ()=> { try {

            this._call__GetGoldStandardData({
                goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }}, 10 )

        this.setState({ force_Rerender: {} })
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

        this._goldStandard_Root_SelectionEntry = goldStandard_Root_Selection

        const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        })

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    render() {

        if ( ! this.state.show_Section ) {

            //  Show Section data not yet loaded OR NO Gold Standard Data for Search so display NOTHING

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
                            Gold Standard Statistics
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div className=" section--chart-container-block " >

                            <div className=" chart-container-multiple-on-same-row-block ">

                                {/*  NOT Used since NOT showing the section when there is no data  */}

                                {/*{ ( this.state.show_NoData_Message ) ? (*/}

                                {/*    <div style={ { marginBottom: 15 } }>*/}
                                {/*        No gold standard data have been created or uploaded for any scan files associated with these data.*/}
                                {/*        <br/>*/}
                                {/*        <br/>*/}
                                {/*        <span>To import Gold Standard data, go to the </span>*/}
                                {/*        <a href={*/}
                                {/*            "d/pg/project/" + this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.currentProjectId_FromDOM*/}
                                {/*        }>home page for this project</a>*/}
                                {/*        <span>, </span>*/}
                                {/*        <span>expand the "<b>View Scan Files</b>" section, and click the "<b>Import Gold Standard</b>"*/}
                                {/*        link next to the scan file(s) from which these search results were derived.</span>*/}
                                {/*    </div>*/}

                                {/*) : */}

                                { ( this.state.show_LoadingData_Message ) ? (
                                    <div >
                                        Loading Data
                                    </div>
                                ) : (
                                    <React.Fragment>

                                        <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                            { this._goldStandard_Root_SelectionEntry ? (

                                                <>
                                                    <div style={ { marginBottom: 16 } }>

                                                        <QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component
                                                            goldStandard_Root_SelectionEntry_InitialSelection={ this._goldStandard_Root_SelectionEntry }
                                                            selectionEntriesArray={ this._goldStandard_Root_SelectionEntriesArray }
                                                            selectionChosen_Callback={ this._callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis }
                                                        />
                                                    </div>

                                                    <div
                                                        className=" clickable "
                                                        style={ { display: "inline-block" } } //  "inline-block" to limit click area to actual chart
                                                        onClick={ event => {

                                                            open_Qc_MultipleSearches_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component({
                                                                params: {
                                                                    goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,

                                                                    selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly,

                                                                    goldStandard_Root_SelectionEntriesArray: this._goldStandard_Root_SelectionEntriesArray,

                                                                    goldStandard_Root_SelectionEntry: this._goldStandard_Root_SelectionEntry,

                                                                    userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,

                                                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                                                                    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                                                                }
                                                            })

                                                        }}
                                                    >
                                                        <QcViewPage_MultipleSearches__GoldStandard_MainPageContainer
                                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                            qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent={ this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent }
                                                            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel={ this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel }
                                                            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel={ this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel }
                                                            goldStandard_Root_SelectionEntry={ this._goldStandard_Root_SelectionEntry }
                                                            userOptions_Component_OptionsSelections={ this._userOptions_Component_OptionsSelections }
                                                        />
                                                    </div>


                                                    <div style={ { marginTop: 20 } }>
                                                        <button
                                                            onClick={ event => {
                                                                try {
                                                                    open_Qc_MultipleSearches_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component({
                                                                        params: {
                                                                            goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: this._goldStandard_Root_Entries_Array__Map_Key_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,

                                                                            selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly,

                                                                            goldStandard_Root_SelectionEntriesArray: this._goldStandard_Root_SelectionEntriesArray,

                                                                            goldStandard_Root_SelectionEntry: this._goldStandard_Root_SelectionEntry,

                                                                            userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,

                                                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                                                                            qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
                                                                        }
                                                                    })

                                                                } catch( e ) {
                                                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                                                    throw e;
                                                                }
                                                            }}
                                                        >
                                                            View Gold Standard Details
                                                        </button>
                                                    </div>
                                                </>
                                            ) : null }

                                        </div>

                                    </React.Fragment>
                                ) }

                            </div>
                        </div>
                    </div>

                ) : null }
            </div>
        );
    }

}
