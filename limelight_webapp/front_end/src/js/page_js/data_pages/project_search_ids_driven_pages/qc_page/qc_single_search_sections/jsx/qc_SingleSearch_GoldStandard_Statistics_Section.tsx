/**
 * qc_SingleSearch_GoldStandard_Statistics_Section.tsx
 *
 * QC Page Single Search - Section - Gold Standard Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";
import {
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries";
import {
    qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch,
    Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch";
import {
    qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component";
import { CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist";
import { open_Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_GoldStandard_Statistics_Section__GoldStandard_ShowDetails_Overlay_Component";
import { Qc_GoldStandard_NumberFormatting_Constants } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/js/qc_GoldStandard_NumberFormatting_Constants";
import {
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_CallbackParams,
    QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__gold_standard/jsx/qcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component";

/**
 *
 */
export interface Qc_SingleSearch_GoldStandard_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_GoldStandard_Statistics_Section_State {

    show_Section?: boolean  //  Only Show Section when have Gold Standard Entries

    sectionExpanded?: boolean
    show_LoadingData_Message?: boolean
    show_NoData_Message?: boolean

    force_Rerender?: object
}

/**
 *
 */
export class Qc_SingleSearch_GoldStandard_Statistics_Section extends React.Component< Qc_SingleSearch_GoldStandard_Statistics_Section_Props, Qc_SingleSearch_GoldStandard_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);
    private _callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback.bind(this);

    private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature

        const callback__SelectGoldStandard_Component_SelectionChosen_Callback: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionChosen_Callback = this._callback__SelectGoldStandard_Component_SelectionChosen_Callback
    }

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry>

    private _goldStandard_Root_SelectionEntry: QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry

    private _goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: Array<CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry>

    private _selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entry

    private _getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: Qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

    private _userOptions_Component_OptionsSelections = qcViewPage_Common__GoldStandard_Statistics_Section__UserOptions_Component_OptionsSelections__GetDefaultValues()

    /**
     *
     */
    constructor(props: Qc_SingleSearch_GoldStandard_Statistics_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        const noData = !  this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData;

        this.state =  { show_Section: false, show_NoData_Message: noData, sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            //  Confirm have any Gold Standard Results before display Gold Standard Section

            this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearch()

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_GoldStandard_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch_GoldStandard_Statistics_Section_State>, nextContext: any): boolean {

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

    /**
     *
     */
    componentDidUpdate( prevProps: Readonly<Qc_SingleSearch_GoldStandard_Statistics_Section_Props>, prevState: Readonly<Qc_SingleSearch_GoldStandard_Statistics_Section_State>, snapshot?: any ) {
        try {

            if ( this._sectionEverExpanded ) {

                if (
                    prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
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
    private _on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearch() {

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
        }

        let promises: Array<Promise<void>> = [];

        let goldStandard_Root_AnyEntriesExist_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder

        const get_GoldStandard_Root_AnyEntriesExistHolder_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist().get_GoldStandard_Root_AnyEntriesExistHolder()

        if ( get_GoldStandard_Root_AnyEntriesExistHolder_Result.data ) {

            goldStandard_Root_AnyEntriesExist_Holder = get_GoldStandard_Root_AnyEntriesExistHolder_Result.data.goldStandard_Root_AnyEntriesExist_Holder;
        } else if ( get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise.catch(reason => { reject(reason) })
                get_GoldStandard_Root_AnyEntriesExistHolder_Result.promise.then(value => { try {
                    goldStandard_Root_AnyEntriesExist_Holder = value.goldStandard_Root_AnyEntriesExist_Holder;
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        } else {
            throw Error("No value for get_GoldStandard_Root_AnyEntriesExistHolder_Result data or promise");
        }

        if ( promises.length === 0 ) {

            this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearch_Process_HaveAnyEntries_Result({ goldStandard_Root_AnyEntriesExist_Holder });

        } else {

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {

            })

            promisesAll.then(noValue => { try {
                this._on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearch_Process_HaveAnyEntries_Result({ goldStandard_Root_AnyEntriesExist_Holder });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        }
    }

    /**
     *
     */
    private _on_ComponentDidMount__UpdateFor_AnyGoldStandardEntries_ForSearch_Process_HaveAnyEntries_Result(
        {
            goldStandard_Root_AnyEntriesExist_Holder
        } : {
            goldStandard_Root_AnyEntriesExist_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_AnyEntriesExist_Holder
        }
    ) {
        if ( goldStandard_Root_AnyEntriesExist_Holder.get_GoldStandard_Root_AnyEntriesExist() ) {

            this.setState({ show_Section: true })
        } else {
            this.setState({ show_Section: false })
        }
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

            this._sectionEverExpanded = true;
        }


        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }


    private _data_For_GoldStandard_Display() {

        this.setState( { show_LoadingData_Message: true } );

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
        }

        let promises: Array<Promise<void>> = [];

        let goldStandard_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder

        const get_GoldStandard_Root_EntriesHolder_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries().get_GoldStandard_Root_EntriesHolder();

        if ( get_GoldStandard_Root_EntriesHolder_Result.data ) {

            goldStandard_Root_Entries_Holder = get_GoldStandard_Root_EntriesHolder_Result.data.goldStandard_Root_Entries_Holder;
        } else if ( get_GoldStandard_Root_EntriesHolder_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_GoldStandard_Root_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                get_GoldStandard_Root_EntriesHolder_Result.promise.then(value => { try {
                    goldStandard_Root_Entries_Holder = value.goldStandard_Root_Entries_Holder;
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        } else {
            throw Error("No value for get_GoldStandard_Root_EntriesHolder_Result data or promise");
        }

        if ( promises.length === 0 ) {

            this._process_GoldStandardEntriesForSearch({ goldStandard_Root_Entries_Holder });

        } else {

            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {

            })

            promisesAll.then(noValue => { try {
                this._process_GoldStandardEntriesForSearch({ goldStandard_Root_Entries_Holder });

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        }
    }

    ////////////////////////////////

    /**
     *
     */
    private _process_GoldStandardEntriesForSearch(
        {
            goldStandard_Root_Entries_Holder
        } : {
            goldStandard_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__GoldStandard_Root_Entries_Holder
        }
    ) : void {

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const goldStandard_Root_Entries = goldStandard_Root_Entries_Holder.get_GoldStandard_Root_Entries();

        if ( goldStandard_Root_Entries.length === 0 ) {
            //  NO entries
            this.setState({show_NoData_Message: true, show_LoadingData_Message: false});

            return; // EARLY RETURN
        }

        //  Have data for at Search so continue

        const goldStandard_Root_SelectionEntriesArray: Array<QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry> = []

        for ( const goldStandard_Root_Entry of goldStandard_Root_Entries ) {

            let currentlySelected = false

            let scanFilenames: string
            const searchScanFileIds_In_GoldStandardEntry: Set<number> = new Set()

            {
                const scanFilenamesArray: Array<string> = []

                for ( const searchScanFileEntry of goldStandard_Root_Entry.searchScanFileEntries ) {
                    scanFilenamesArray.push( searchScanFileEntry.searchScanFilename )
                    searchScanFileIds_In_GoldStandardEntry.add( searchScanFileEntry.searchScanFileId )
                }
                scanFilenamesArray.sort( (a,b) => {
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a,b)
                })

                scanFilenames = scanFilenamesArray.join( ", " )
            }

            const projectSearchId_Set = new Set<number>()
            projectSearchId_Set.add( projectSearchId )

            const selectionEntry : QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component_SelectionEntry = {
                currentlySelected,
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id: goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
                searchScanFileIds_In_GoldStandardEntries: searchScanFileIds_In_GoldStandardEntry,
                goldStandard_Label: goldStandard_Root_Entry.displayLabel,
                goldStandard_Description: goldStandard_Root_Entry.description,
                scanFilenames,
                goldStandard_Root_Entry_Array: [ goldStandard_Root_Entry ],
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

        this._goldStandard_Root_SelectionEntriesArray = goldStandard_Root_SelectionEntriesArray;

        this._goldStandard_Root_SelectionEntry = this._goldStandard_Root_SelectionEntriesArray[ 0 ]

        this._goldStandard_Root_SelectionEntry.currentlySelected = true

        this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = goldStandard_Root_Entries;

        for ( const goldStandard_Root_Entry of goldStandard_Root_Entries) {

            if ( goldStandard_Root_Entry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id === this._goldStandard_Root_SelectionEntry.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id ) {

                //  Set for initial entry
                this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly = goldStandard_Root_Entry;
                break
            }
        }

        this._call__GetGoldStandardData({ goldStandard_Root_Selection: this._goldStandard_Root_SelectionEntry })
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
        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id = goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id

        window.setTimeout( ()=> { try {

            if (
                gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                || projectSearchId !== projectSearchId
            ) {

                //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                return;  // EARLY RETURN
            }

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            const qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result =
                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch({
                    goldStandard_Root_Selection,
                    userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,
                    projectSearchId,
                    peptideDistinct_Array,
                    qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                })

            if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data ) {

                this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.data

                this.setState({
                    show_LoadingData_Message: false,
                    // showUpdatingMessage: false
                });

            } else if ( qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise ) {

                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.catch( reason => {
                    try {
                        // if ( ! _componentMounted ) {
                        //     //  Component no longer mounted so exit
                        //     return; // EARLY RETURN
                        // }

                        this.setState({
                            show_LoadingData_Message: false,
                            // showUpdatingMessage: false
                        });

                        console.warn( "promise.catch(...): reason: ", reason );

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.promise.then( value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result => { try {

                    // if ( ! _componentMounted ) {
                    //     //  Component no longer mounted so exit
                    //     return; // EARLY RETURN
                    // }

                    if (
                        gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id !== goldStandard_Root_Selection.gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id
                        || projectSearchId !== projectSearchId
                    ) {

                        //  Data retrieved gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id is NO Longer the gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id requested to be displayed

                        return;  // EARLY RETURN
                    }

                    this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result = value_GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result

                    this.setState({
                        show_LoadingData_Message: false,
                        // showUpdatingMessage: false
                    });


                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
                });

            } else {
                throw Error("qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: no data or promise")
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }}, 10 )
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
        }})

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

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const searchData_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId)

        if ( ! searchData_For_ProjectSearchId ) {
            const msg = "Returned NOTHING:  this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId) for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        let precision_ResultDisplay: string
        let recall_ResultDisplay: string

        if ( this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result && ( ! this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result.no_PSM_Data_For_ScanFile_AND_ScanNumbers_In_GoldStandard ) ) {

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
                        {/*            link next to the scan file(s) from which these search results were derived.</span>*/}
                        {/*    </div>*/}

                        {/*) : */}

                        { ( this.state.show_LoadingData_Message ) ? (
                            <div >
                                Loading Data
                            </div>
                        ) : (
                            <React.Fragment>

                                <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                    { this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly ? (

                                            <QcViewPage_Common__GoldStandard_Statistics_Section__SelectGoldStandard_Component
                                                goldStandard_Root_SelectionEntry_InitialSelection={ this._goldStandard_Root_SelectionEntry }
                                                selectionEntriesArray={ this._goldStandard_Root_SelectionEntriesArray }
                                                selectionChosen_Callback={ this._callback__SelectGoldStandard_Component_SelectionChosen_Callback_BindThis }
                                            />

                                    ) : null }

                                </div>

                                <div className=" section--chart-container-block ">

                                    <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                        { this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result ? (

                                            <>
                                                <div>
                                                    <h3>
                                                        Gold Standard Statistics
                                                    </h3>

                                                    <div>
                                                        <span>Recall: </span>
                                                        <span>{ recall_ResultDisplay }</span>
                                                    </div>
                                                    <div>
                                                        <span>Precision: </span>
                                                        <span>{ precision_ResultDisplay }</span>
                                                    </div>
                                                </div>

                                                <div style={ { marginTop: 20 } }>
                                                    <button
                                                        onClick={ event => {
                                                            try {
                                                                open_Qc_SingleSearch_GoldStandard_Statistics_Section__ShowDetails_Overlay_Component__ShowDetails_Overlay_Component({
                                                                    params: {
                                                                        qc_GoldStandard__GetData_And_Compute_Precision_And_Recall_For_SingleSearch_Result: this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result,
                                                                        goldStandardEntry_ALL: this._goldStandard_Root_Entries_Array__CurrentSelectionFor_gold_standard_for_scan_file_root__project_scnfl_mapping_tbl__id,
                                                                        selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly: this._selected_GoldStandardEntry__For_DisplayAndSelectComponentOnly,
                                                                        goldStandard_Root_SelectionEntriesArray: this._goldStandard_Root_SelectionEntriesArray,
                                                                        goldStandard_Root_SelectionEntry: this._goldStandard_Root_SelectionEntry,
                                                                        userOptions_Component_OptionsSelections: this._userOptions_Component_OptionsSelections,
                                                                        projectSearchId: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId,
                                                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent,
                                                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
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
                                        ) : (
                                            null
                                            // <div>
                                            //     NO Data in this._getData_And_Compute_Precision_And_Recall_For_SingleSearch_Result
                                            // </div>
                                        ) }

                                    </div>

                                </div>
                            </React.Fragment>
                        ) }

                    </div>

                ) : null }
            </div>
        );
    }

}
