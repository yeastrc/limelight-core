/**
 * qcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock.tsx
 *
 * QC Page SingleSearch__SubSearches : Scan File Summary Data Block
 *
 */

import React from "react";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry } from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import { QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import { SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded";
import { CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_NO_Peaks_Data";
import { StringDownloadUtils } from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/**
 *
 */
export interface QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State {

    dataComputed?: DataComputed
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock
    extends React.Component< QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props, QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _downloadData_Clicked_BindThis = this._downloadData_Clicked.bind(this)

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _scanFile_SummaryPerLevelData_Root = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root()
    private _qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded()

    private _tableDownloadData: Array<Array<string>>

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        //  Initialize to current passed value
        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

        props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register({ callbackItem: this })

        this.state = { showUpdatingMessage: false };
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
    }

    /**
     *
     */
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._populateblock();

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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props>, nextState: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State>, nextContext: any): boolean {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
            || this.state.dataComputed !== nextState.dataComputed
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
        ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props>, prevState: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State>, snapshot?: any) {
        try {
            window.setTimeout( () => {
                try {

                    // Comment out this.state. properties checks in componentDidUpdate

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                        || this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent
                        // || this.state.scanFile_SummaryPerLevelData_Root !== prevState.scanFile_SummaryPerLevelData_Root
                        // || this.state.scanNumbersCount_For_FilteredPSMs !== prevState.scanNumbersCount_For_FilteredPSMs
                    ) {

                    } else {
                        return;
                    }

                    if (
                        ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                        )) {
                        //  Skip these params since they are not the "Latest"
                        return; // EARLY RETURN
                    }

                    this._populateblock();

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
    private _populateblock() {

        this._loadDataIfNeeded()
    }

    /**
     *
     */
    private _loadDataIfNeeded() {

        this.setState((prevState: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State =>  {

            if ( ! prevState.showUpdatingMessage ) {
                return { showUpdatingMessage: true };
            }
            return null;
        });

        //  ALSO: use 'await' below in method '_compute_Data(...)' to load more data

        let scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder> = new Map()

        const promises_Step_2 : Array<Promise<void>> = []

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        { // scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId

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

            promises_Step_2.push(promise)

        }
        {
            const promise = this._qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded.singleSearch__SubSearches_ScanSummaryData_LoadIfNeeded({
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                qcPage_Flags_SingleSearch_ForProjectSearchId: this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.qcPage_Flags_SingleSearch_ForProjectSearchId,
                scanFile_SummaryPerLevelData_Root: this._scanFile_SummaryPerLevelData_Root  //  UPDATED
            });
            if ( promise ) {
                promises_Step_2.push(promise);
            }
        }

        const promises_Step_2_All = Promise.all( promises_Step_2 )

        promises_Step_2_All.catch( reason => {

        })
        promises_Step_2_All.then( novalue => { try {

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            this.setState((prevState: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State =>  {
                if ( prevState.showUpdatingMessage ) {
                    return { showUpdatingMessage: false };
                }
                return null;
            });

            //  Ignore returned Promise
            this._compute_Data({
                scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    }

    /**
     * ALSO: use 'await' in this method to load more data
     */
    private async _compute_Data (
        {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId
        } : {
            scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanData_Single_SearchScanFileId_NO_Peaks_Data_Holder>
        }
    ) : Promise<void> {

        try {
            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

            const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

            let allScans_Have_TotalIonCurrent = true;

            for ( const scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder of scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.values() ) {
                for ( const scan of scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.scansArray ) {
                    if ( scan.totalIonCurrent_ForScan === undefined || scan.totalIonCurrent_ForScan === null ) {
                        allScans_Have_TotalIonCurrent = false;
                        break;
                    }
                }
                if ( ! allScans_Have_TotalIonCurrent ) {
                    break;
                }
            }

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId);
            }

            const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId);
            if (!commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId); returned nothing. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            //   'await':  get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()

            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                await
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            //   'await':  get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()


            const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering__For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise()

            const searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch__ReturnPromise_Result.searchSubGroupId_ForPSM_ID_Holder;

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            const searchSubGroups_DisplayOrder: Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry> = [];
            const searchSubGroupIds_DisplayOrder: Array<number> = [];
            {
                const searchSubGroups = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
                for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                    searchSubGroups_DisplayOrder.push(searchSubGroup);
                    searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
                }
            }

            const dataPerSubSearchArray: Array<DataPerSubSearch> = [];

            const peptideDistinct_Array: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry[] =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            let largest_ScanLevel = 0;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId : Map<number,Map<number,Set<number>>> = new Map();

            const totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel_Map_Key_SearchSubGroupId: Map<number, Map<number, number>> = new Map();

            const scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId : Map<number,Set<number>> = new Map();

            for ( const psmTblData_Entry of psmTblData_Filtered ) {

                if ( ! psmTblData_Entry.searchScanFileId ) {
                    const msg = "( ! psmTblData_Entry.searchScanFileId ) projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! psmTblData_Entry.scanNumber ) {
                    const msg = "( ! psmTblData_Entry.scanNumber ) projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const psmId = psmTblData_Entry.psmId
                const scanNumber = psmTblData_Entry.scanNumber;

                const subGroupId = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId(psmId);
                if ( ! subGroupId ) {
                    const msg = "( ! subGroupId ) psmId: " + psmId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let scanNumbers_Map_Key_searchScanFileId_Map = scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.get(subGroupId);
                if ( ! scanNumbers_Map_Key_searchScanFileId_Map ) {
                    scanNumbers_Map_Key_searchScanFileId_Map = new Map();
                    scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.set(subGroupId, scanNumbers_Map_Key_searchScanFileId_Map);
                }
                let scanNumbers_For_searchScanFileId = scanNumbers_Map_Key_searchScanFileId_Map.get( psmTblData_Entry.searchScanFileId );
                if ( ! scanNumbers_For_searchScanFileId ) {
                    scanNumbers_For_searchScanFileId = new Set();
                    scanNumbers_Map_Key_searchScanFileId_Map.set( psmTblData_Entry.searchScanFileId, scanNumbers_For_searchScanFileId);
                }

                if ( ! scanNumbers_For_searchScanFileId.has( scanNumber ) ) {

                    scanNumbers_For_searchScanFileId.add( scanNumber );
                }

                if ( allScans_Have_TotalIonCurrent ) {

                    let scanNumbers_For_searchScanFileId = scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.get( psmTblData_Entry.searchScanFileId );
                    if ( ! scanNumbers_For_searchScanFileId ) {
                        scanNumbers_For_searchScanFileId = new Set();
                        scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.set( psmTblData_Entry.searchScanFileId, scanNumbers_For_searchScanFileId);
                    }

                    if ( ! scanNumbers_For_searchScanFileId.has( scanNumber ) ) {
                        //  NOT processed this scan number so process now

                        scanNumbers_For_searchScanFileId.add( scanNumber );

                        const scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder = scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get( psmTblData_Entry.searchScanFileId )
                        if ( ! scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder ) {
                            const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder_Map_Key_SearchScanFileId.get( psmTblData_Entry.searchScanFileId ); returned nothing. searchScanFileId: " + psmTblData_Entry.searchScanFileId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const spectralStorage_NO_Peaks_DataFor_ScanNumber = scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Entry.scanNumber );
                        if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                            const msg = "scanData_Single_SearchScanFileId_NO_Peaks_Data_Holder.scanData_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_Entry.scanNumber ); returned nothing. scanNumber: " + psmTblData_Entry.scanNumber;
                            console.warn(msg);
                            throw Error(msg);
                        }


                        let totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel = totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel_Map_Key_SearchSubGroupId.get( subGroupId );
                        if ( ! totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel ) {
                            totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel = new Map()
                            totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel_Map_Key_SearchSubGroupId.set( subGroupId, totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel );
                        }

                        let totalIonCurrent_ForScanLevel_FilteredScans = totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get( spectralStorage_NO_Peaks_DataFor_ScanNumber.level )
                        if ( ! totalIonCurrent_ForScanLevel_FilteredScans ) {
                            totalIonCurrent_ForScanLevel_FilteredScans = 0;  //  Set to zero when undefined or zero
                        }
                        const new_totalIonCurrent_ForScanLevel_FilteredScans = totalIonCurrent_ForScanLevel_FilteredScans + spectralStorage_NO_Peaks_DataFor_ScanNumber.totalIonCurrent_ForScan;
                        //  save new value to Map
                        totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.set( spectralStorage_NO_Peaks_DataFor_ScanNumber.level, new_totalIonCurrent_ForScanLevel_FilteredScans )
                    }
                }
            }

            //  Get Scan Count

            for (const searchSubGroup of searchSubGroups_DisplayOrder) {

                if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                    //  NOT a Selected searchSubGroup_Id so SKIP
                    continue; // EARLY CONTINUE
                }

                const totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel =
                    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel_Map_Key_SearchSubGroupId.get( searchSubGroup.searchSubGroup_Id );

                let scanCount_PSM_MeetsCutoff = 0;
                const searchScanFileIds_For_SearchSubGroupId = new Set<number>();
                {
                    const scanNumbers_Map_Key_searchScanFileId_Map = scanNumbers_Map_Key_searchScanFileId_Map_Key_SearchSubGroupId.get(searchSubGroup.searchSubGroup_Id);
                    if ( ! scanNumbers_Map_Key_searchScanFileId_Map) {
                        //  no data so skip
                        continue;  // EARLY CONTINUE
                    }
                    for ( const scanNumbers_Map_Key_searchScanFileId_MapEntry of scanNumbers_Map_Key_searchScanFileId_Map.entries() ) {
                        const searchScanFileId = scanNumbers_Map_Key_searchScanFileId_MapEntry[0];
                        const scanNumbers_For_searchScanFileId = scanNumbers_Map_Key_searchScanFileId_MapEntry[1];
                        scanCount_PSM_MeetsCutoff += scanNumbers_For_searchScanFileId.size;
                        searchScanFileIds_For_SearchSubGroupId.add(searchScanFileId);
                    }
                }

                //  Get Per Scan Level data and totalIonCurrent_ForSearch

                let totalIonCurrent_ForSearch = 0;

                const dataPerSubSearch_PerScanLevel_Map_Key_ScanLevel: Map<number,DataPerSubSearch_PerScanLevel> = new Map();

                for ( const searchScanFileId of searchScanFileIds_For_SearchSubGroupId ) {

                    const summaryPerLevelData_Entry = this._scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId(searchScanFileId);
                    if ( ! summaryPerLevelData_Entry ) {
                        throw Error("qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId(searchScanFileId); returned NOTHING. searchScanFileId: " + searchScanFileId);
                    }

                    for ( const summaryPerLevelData of summaryPerLevelData_Entry.get_ScanLevel_IterableIterator() ) {

                        let dataPerSubSearch_ForScanLevel = dataPerSubSearch_PerScanLevel_Map_Key_ScanLevel.get(summaryPerLevelData.scanLevel);
                        if ( ! dataPerSubSearch_ForScanLevel ) {
                            dataPerSubSearch_ForScanLevel = {
                                scanLevel: summaryPerLevelData.scanLevel,
                                scanCount: 0,
                                totalIonCurrent: 0
                            };
                            dataPerSubSearch_PerScanLevel_Map_Key_ScanLevel.set(summaryPerLevelData.scanLevel, dataPerSubSearch_ForScanLevel);
                        }
                        dataPerSubSearch_ForScanLevel.scanCount += summaryPerLevelData.numberOfScans;
                        dataPerSubSearch_ForScanLevel.totalIonCurrent += summaryPerLevelData.totalIonCurrent;

                        totalIonCurrent_ForSearch += summaryPerLevelData.totalIonCurrent;
                    }
                }

                const dataPerSubSearch_PerScanLevel_Array = Array.from( dataPerSubSearch_PerScanLevel_Map_Key_ScanLevel.values() );
                dataPerSubSearch_PerScanLevel_Array.sort( (a,b) => {
                    if ( a.scanLevel < b.scanLevel ) {
                        return -1;
                    }
                    if ( a.scanLevel > b.scanLevel ) {
                        return 1;
                    }
                    return 0
                });

                let totalScanCount_AtHighestLevelNumber = 0;

                {
                    const lastEntry = dataPerSubSearch_PerScanLevel_Array[dataPerSubSearch_PerScanLevel_Array.length - 1];
                    if (largest_ScanLevel < lastEntry.scanLevel) {
                        largest_ScanLevel = lastEntry.scanLevel;
                    }
                    totalScanCount_AtHighestLevelNumber = lastEntry.scanCount;
                }

                const dataPerSubSearch: DataPerSubSearch = {

                    searchSubGroup_Id: searchSubGroup.searchSubGroup_Id,
                    subgroupName_Display: searchSubGroup.subgroupName_Display,

                    scanCount_PSM_MeetsCutoff: scanCount_PSM_MeetsCutoff,
                    totalIonCurrent_ForSearch,
                    totalScanCount_AtHighestLevelNumber,
                    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel,

                    dataPerScanLevel_Map_Key_ScanLevel: dataPerSubSearch_PerScanLevel_Map_Key_ScanLevel
                }

                dataPerSubSearchArray.push( dataPerSubSearch );
            }

            const dataComputed: DataComputed = {
                dataPerSubSearchArray, largest_ScanLevel, allScans_Have_TotalIonCurrent
            }

            this.setState({ dataComputed });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _downloadData_Clicked( event: React.MouseEvent<HTMLSpanElement, MouseEvent> ) { try {

        if ( ! this._tableDownloadData ) {
            return
        }

        // combine the columns into rows

        const rows: Array<string> = []

        for ( const rowInData of this._tableDownloadData ) {

            const rowOutput = rowInData.join( "\t" )

            rows.push( rowOutput )
        }

        rows.push( "" ) // to add \n on last line

        const downloadString = rows.join( "\n" )

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : downloadString, filename: 'ScanFileStatistics.txt' });

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

    /**
     *
     */
    render() {

        let dataDisplay: JSX.Element = null;

        if ( this.state.dataComputed  ) {

            const table_TD_Style: React.CSSProperties = { verticalAlign: "top", whiteSpace: "nowrap" }

            const paddingBottom = 5;
            const paddingBottom_SeparateSections = 14;

            const paddingRight_Labels = 30;
            const paddingLeft_Values = 15;

            const dataPerSubSearchArray = this.state.dataComputed.dataPerSubSearchArray;

            const perSearch_HeaderRow: Array<JSX.Element> = [];

            const perSearch_HeaderRow_Download: Array<string> = [];

            const perLevel_TotalIonCurrent_DisplayRows: Array<JSX.Element> = [];
            const perLevel_TotalIonCurrent_DisplayRows_DownloadRows: Array<Array<string>> = [];


            const perLevel_Count_DisplayRows: Array<JSX.Element> = [];

            const perLevel_Count_DisplayRows_DownloadRows: Array<Array<string>> = [];

            {
                const label = "Sub Search:"

                const perSearch_HeaderRow_LeftLabel = (
                    <React.Fragment
                        key={ "LeftLabel" }
                    >
                        <td style={ table_TD_Style }>
                            <div
                                style={ { paddingBottom: paddingBottom_SeparateSections } }
                            >
                                { label }
                            </div>
                        </td>
                    </React.Fragment>
                )
                perSearch_HeaderRow.push( perSearch_HeaderRow_LeftLabel );

                perSearch_HeaderRow_Download.push( label )
            }

            {
                const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];

                const perLevel_TotalIonCurrent_DisplayEntries_DownloadCells: Array<string> = [];

                {
                    const label = "Total Ion Current:"

                    const perLevel_TotalIonCurrent_LeftLabel = (
                        <React.Fragment
                            key={ "Total Ion Current" }
                        >
                            <td style={ table_TD_Style }>
                                <div
                                    key={ "Total Ion Current" }
                                >
                                    { label }
                                </div>
                            </td>
                        </React.Fragment>
                    );
                    perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_LeftLabel);

                    perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( label )
                }

                for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {
                    { //  Sub Search Display Name

                        const value = dataPerSubSearchEntry.subgroupName_Display

                        const perSearch_HeaderRow_Column = (
                            <React.Fragment
                                key={ "LeftLabel" }
                            >
                                <td style={ table_TD_Style }>
                                    <div
                                        key={ dataPerSubSearchEntry.searchSubGroup_Id }
                                        style={{ textAlign: "right", paddingBottom: paddingBottom_SeparateSections}}
                                    >
                                        { value }
                                    </div>
                                </td>
                            </React.Fragment>
                        )
                        perSearch_HeaderRow.push(perSearch_HeaderRow_Column);

                        perSearch_HeaderRow_Download.push( value )
                    }
                    {  //  Total ION Current per Sub search

                        const value = dataPerSubSearchEntry.totalIonCurrent_ForSearch.toExponential(3)

                        const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <React.Fragment
                                key={ "LeftLabel" }
                            >
                                <td style={ table_TD_Style }>
                                    <div
                                        key={"total_" + dataPerSubSearchEntry.searchSubGroup_Id}
                                        style={style_Value}
                                    >
                                        { value }
                                    </div>
                                </td>
                            </React.Fragment>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);

                        perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( value )
                    }
                }

                perLevel_TotalIonCurrent_DisplayRows.push(
                    <React.Fragment
                        key={ "Total Ion Current" }
                    >
                        <tr>
                            { perLevel_TotalIonCurrent_DisplayEntries }
                        </tr>
                    </React.Fragment>
                )

                perLevel_TotalIonCurrent_DisplayRows_DownloadRows.push( perLevel_TotalIonCurrent_DisplayEntries_DownloadCells )
            }

            //  "Total MS{scanLevel} Ion Current"  AND  "MS{scanLevel} TIC with PSM":  Per Scan Level Data

            for ( let scanLevel = 1; scanLevel <= this.state.dataComputed.largest_ScanLevel; scanLevel++ ) {

                let display__totalIonCurrent_ForScanLevel_FilteredScans__Row = false;

                if ( this.state.dataComputed.allScans_Have_TotalIonCurrent && scanLevel !== 1 ) {  // skip for scanLevel 1
                    for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {
                        const totalIonCurrent_ForScanLevel_FilteredScans = dataPerSubSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get(scanLevel);
                        if ( ( ! totalIonCurrent_ForScanLevel_FilteredScans )
                        || ( scanLevel === this.state.dataComputed.largest_ScanLevel && this.state.dataComputed.allScans_Have_TotalIonCurrent ) ) {
                            display__totalIonCurrent_ForScanLevel_FilteredScans__Row = true;
                            break;
                        }
                    }
                }

                let paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup = 0;

                if ( display__totalIonCurrent_ForScanLevel_FilteredScans__Row ) {
                    //  Add padding between this scan level data and previous since next will have a second row
                    paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup = 5 //  adds to paddingBottom5 of previous line/group
                }

                const style_Label: React.CSSProperties = { paddingRight: paddingRight_Labels, paddingBottom: paddingBottom };
                const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                {
                    const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];

                    const perLevel_TotalIonCurrent_DisplayEntries_DownloadCells: Array<string> = [];

                    {
                        const label = "Total MS" + scanLevel + " Ion Current:"

                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <React.Fragment
                                key={scanLevel + "_label"}
                            >
                                <td style={ table_TD_Style }>
                                    <div
                                        key={scanLevel + "_label"}
                                        style={ { paddingTop: paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup } }
                                    >
                                        <div
                                            style={style_Label}
                                        >
                                            { label }
                                        </div>
                                    </div>
                                </td>
                            </React.Fragment>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);

                        perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( label )
                    }

                    for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                        const summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = dataPerSubSearchEntry.dataPerScanLevel_Map_Key_ScanLevel.get( scanLevel );

                        {
                            let totalIonCurrent_Value = "N/A"
                            if (summaryPerScanLevelData) {
                                totalIonCurrent_Value = summaryPerScanLevelData.totalIonCurrent.toExponential(3)
                            }

                            const perLevel_TotalIonCurrent_DisplayEntry = (
                                <React.Fragment
                                    key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
                                >
                                    <td style={ table_TD_Style }>
                                        <div
                                            style={ { paddingTop: paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup } }
                                        >
                                            <div
                                                style={style_Value}
                                            >
                                                { totalIonCurrent_Value }
                                            </div>
                                        </div>
                                    </td>
                                </React.Fragment>
                            )
                            perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);

                            perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( totalIonCurrent_Value )
                        }
                    }

                    perLevel_TotalIonCurrent_DisplayRows.push(
                        <React.Fragment
                            key={scanLevel + "_label"}
                        >
                            <tr>
                                { perLevel_TotalIonCurrent_DisplayEntries }
                            </tr>
                        </React.Fragment>
                    )

                    perLevel_TotalIonCurrent_DisplayRows_DownloadRows.push( perLevel_TotalIonCurrent_DisplayEntries_DownloadCells )
                }

                if ( display__totalIonCurrent_ForScanLevel_FilteredScans__Row ) {

                    {
                        const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];

                        const perLevel_TotalIonCurrent_DisplayEntries_DownloadCells: Array<string> = [];

                        //  "MS{scanLevel} TIC with PSM" row

                        {
                            const label = "MS" + scanLevel + " TIC with PSM:"

                            const perLevel_TotalIonCurrent_DisplayEntry = (
                                <React.Fragment
                                    key={scanLevel + "_label_TIC with PSM"}
                                >
                                    <td style={ table_TD_Style }>
                                        <div
                                        >
                                            <div
                                                style={style_Label}
                                            >
                                                { label }
                                            </div>
                                        </div>
                                    </td>
                                </React.Fragment>
                            )
                            perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);

                            perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( label )
                        }

                        for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                            const summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = dataPerSubSearchEntry.dataPerScanLevel_Map_Key_ScanLevel.get( scanLevel );

                            {
                                let value_Display = "N/A";
                                if ( summaryPerScanLevelData && dataPerSubSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel ) {
                                    const totalIonCurrent_ForScanLevel_FilteredScans = dataPerSubSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get(scanLevel);
                                    if ( totalIonCurrent_ForScanLevel_FilteredScans !== undefined && totalIonCurrent_ForScanLevel_FilteredScans !== null
                                        && summaryPerScanLevelData.totalIonCurrent !== undefined && summaryPerScanLevelData.totalIonCurrent !== null ) {

                                        value_Display = totalIonCurrent_ForScanLevel_FilteredScans.toExponential(3) +
                                            " (" +
                                            ( ( totalIonCurrent_ForScanLevel_FilteredScans / summaryPerScanLevelData.totalIonCurrent ) * 100 ).toFixed( 1 ) +
                                            "%)"
                                    }
                                }

                                const perLevel_TotalIonCurrent_DisplayEntry = (
                                    <React.Fragment
                                        key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id + "_TIC with PSM"}
                                    >
                                        <td style={ table_TD_Style }>
                                            <div
                                            >
                                                <div
                                                    style={style_Value}
                                                >
                                                    <span>
                                                        {value_Display}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                    </React.Fragment>
                                )
                                perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);

                                perLevel_TotalIonCurrent_DisplayEntries_DownloadCells.push( value_Display )
                            }
                        }

                        perLevel_TotalIonCurrent_DisplayRows.push(
                            <React.Fragment
                                key={scanLevel + "_label_TIC with PSM"}
                            >
                                <tr>
                                    { perLevel_TotalIonCurrent_DisplayEntries }
                                </tr>
                            </React.Fragment>
                        )

                        perLevel_TotalIonCurrent_DisplayRows_DownloadRows.push( perLevel_TotalIonCurrent_DisplayEntries_DownloadCells )
                    }
                }
            }

            //  Number MS{scanLevel} Scans:  Per Scan Level Data

            for ( let scanLevel = 1; scanLevel <= this.state.dataComputed.largest_ScanLevel; scanLevel++ ) {

                const style_Label: React.CSSProperties = { paddingRight: paddingRight_Labels, paddingBottom: paddingBottom };
                const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                if ( scanLevel === this.state.dataComputed.largest_ScanLevel ) {
                    style_Label.paddingBottom = paddingBottom_SeparateSections;
                    style_Value.paddingBottom = paddingBottom_SeparateSections;
                }

                {
                    const perLevel_Count_DisplayEntries: Array<JSX.Element> = [];

                    const perLevel_Count_DisplayEntries_DownloadCells: Array<string> = [];

                    {
                        const label = "Number MS" + scanLevel + " Scans:"

                        const perLevel_Count_DisplayEntry = (
                            <React.Fragment
                                key={scanLevel + "_label"}
                            >
                                <td style={ table_TD_Style }>
                                    <div
                                        style={ {
                                            paddingTop: scanLevel === 1 ? paddingBottom_SeparateSections : 0  //  Space from prev section
                                        } }
                                    >
                                        <div
                                            style={style_Label}
                                        >
                                            { label }
                                        </div>
                                    </div>
                                </td>
                            </React.Fragment>
                        )
                        perLevel_Count_DisplayEntries.push(perLevel_Count_DisplayEntry);

                        perLevel_Count_DisplayEntries_DownloadCells.push( label )
                    }

                    for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                        const summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = dataPerSubSearchEntry.dataPerScanLevel_Map_Key_ScanLevel.get( scanLevel );

                        {
                            let numberOfScans_Value = "N/A"
                            if (summaryPerScanLevelData) {
                                numberOfScans_Value = summaryPerScanLevelData.scanCount.toLocaleString();
                            }
                            const perLevel_Count_DisplayEntry = (
                                <React.Fragment
                                    key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
                                >
                                    <td style={ table_TD_Style }>
                                        <div
                                            style={ {
                                                paddingTop: scanLevel === 1 ? paddingBottom_SeparateSections : 0  //  Space from prev section
                                            } }
                                        >
                                            <div
                                                style={style_Value}
                                            >
                                                { numberOfScans_Value }
                                            </div>
                                        </div>
                                    </td>
                                </React.Fragment>
                            )
                            perLevel_Count_DisplayEntries.push(perLevel_Count_DisplayEntry);

                            perLevel_Count_DisplayEntries_DownloadCells.push( numberOfScans_Value )
                        }
                    }

                    perLevel_Count_DisplayRows.push(
                        <React.Fragment
                            key={scanLevel + "_label"}
                        >
                            <tr>
                                { perLevel_Count_DisplayEntries }
                            </tr>
                        </React.Fragment>
                    )

                    perLevel_Count_DisplayRows_DownloadRows.push( perLevel_Count_DisplayEntries_DownloadCells )
                }
            }

            let scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow: JSX.Element = undefined

            let scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow_DownloadRow: Array<string> = undefined

            {
                const scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells: Array<JSX.Element> = [];

                const scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells_DownloadCells: Array<string> = [];

                const label = "Scans with a PSM meeting filters"

                const labelCell = (
                    <td style={ table_TD_Style }>
                        <div style={ { paddingBottom: paddingBottom, paddingRight: paddingRight_Labels } }>
                            Scans with a <br/>PSM meeting filters
                        </div>
                    </td>
                )

                scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells_DownloadCells.push( label )

                for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                    let scanNumbersCount_For_FilteredPSMs_Percentage_String: string = undefined;

                    {
                        const percentage = ( dataPerSubSearchEntry.scanCount_PSM_MeetsCutoff / dataPerSubSearchEntry.totalScanCount_AtHighestLevelNumber ) * 100;

                        let decimalPlaces = 1;
                        if ( percentage < 1 ) {
                            decimalPlaces = 2;
                        }
                        scanNumbersCount_For_FilteredPSMs_Percentage_String = percentage.toFixed( decimalPlaces );

                        if ( decimalPlaces == 2 && scanNumbersCount_For_FilteredPSMs_Percentage_String.endsWith( "0" ) ) {
                            scanNumbersCount_For_FilteredPSMs_Percentage_String = scanNumbersCount_For_FilteredPSMs_Percentage_String.substring( 0, scanNumbersCount_For_FilteredPSMs_Percentage_String.length - 1 );
                        }
                        if ( scanNumbersCount_For_FilteredPSMs_Percentage_String.endsWith( ".0" ) ) {
                            scanNumbersCount_For_FilteredPSMs_Percentage_String = scanNumbersCount_For_FilteredPSMs_Percentage_String.substring( 0, scanNumbersCount_For_FilteredPSMs_Percentage_String.length - 2 );
                        }
                    }

                    const value = dataPerSubSearchEntry.scanCount_PSM_MeetsCutoff.toLocaleString() +
                        " (" +
                        scanNumbersCount_For_FilteredPSMs_Percentage_String +
                        "%)"

                    const entryJSX = (
                        <React.Fragment
                            key={ dataPerSubSearchEntry.searchSubGroup_Id }
                        >
                            <td style={ table_TD_Style }>
                                <div
                                    style={ { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values  } }
                                >
                                    { value }
                                </div>
                            </td>
                        </React.Fragment>
                    )

                    scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells.push( entryJSX );

                    scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells_DownloadCells.push( value )
                }


                scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow = (
                    <React.Fragment>
                        <tr>
                            { labelCell }
                            { scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells }
                        </tr>
                    </React.Fragment>
                )

                scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow_DownloadRow = scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRowCells_DownloadCells
            }

            this._tableDownloadData = [
                perSearch_HeaderRow_Download,
                ...perLevel_TotalIonCurrent_DisplayRows_DownloadRows,
                ...perLevel_Count_DisplayRows_DownloadRows,
                scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow_DownloadRow
            ]

            // const gridTemplateColumns_String = " repeat( " + ( dataPerSubSearchArray.length + 1 ) + ", max-content ) ";

            dataDisplay = (
                <div style={ { display: "inline-block", paddingRight: 30 } }>  {/*  Style to add some padding to right of grid  */}

                    { scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow ? (
                        //  YES have data
                        <table cellPadding={ 0 } cellSpacing={ 0 }>
                            <tbody>
                            {/*<div style={ { display: "grid", gridTemplateColumns: gridTemplateColumns_String } }>*/ }
                            {/* Multi column Grid */ }
                            { perSearch_HeaderRow }
                            { perLevel_TotalIonCurrent_DisplayRows }
                            { perLevel_Count_DisplayRows }
                            { scanNumbersCount_For_FilteredPSMs_Percentage_JSX_SingleRow }
                            {/*</div>*/ }
                            </tbody>
                        </table>
                    ) : (
                        //  NO have data - Likely since NO PSMs passed filters
                        <div>
                            No PSMs passed filters so unable to separate data by sub search.
                        </div>
                    ) }
                </div>
            );

        } else {
            // console.warn( "else of 'if ( scanFileData_For_SearchScanFileId )'")
        }


        return (
            <div>
                <div style={ { marginTop: 16, marginBottom: 16 } }>
                    <span
                        style={ { fontSize: 16, fontWeight: "bold", marginBottom: 10 } }
                    >
                        Scan Statistics
                    </span>
                    { this._tableDownloadData ? (

                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            placement={ "top" }
                            title={ <span>Download Scan Statistics as tab delimited table</span> }
                        >
                            <span
                                className=" fake-link "
                                style={ { marginLeft: 20 } }
                                onClick={ this._downloadData_Clicked_BindThis }
                            >
                                download
                            </span>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    ) : null }
                </div>
                <div style={ { position: "relative" } }>
                    { ( dataDisplay ) ? (
                        <React.Fragment>
                            { dataDisplay }
                            { ( this.state.showUpdatingMessage ) ? (
                                <div className=" block-updating-overlay-container ">
                                    <div style={ { textAlign: "center", marginTop: 40 } }>
                                        Updating Data
                                    </div>
                                </div>
                            ) : null }
                        </React.Fragment>
                    ) : (
                        <div>
                            LOADING DATA
                        </div>
                    ) }
                </div>

            </div>
        );
    }


}


class DataComputed {

    dataPerSubSearchArray: Array<DataPerSubSearch>
    largest_ScanLevel: number
    allScans_Have_TotalIonCurrent: boolean
}

class DataPerSubSearch {

    searchSubGroup_Id: number
    subgroupName_Display: string

    scanCount_PSM_MeetsCutoff: number
    totalIonCurrent_ForSearch: number
    totalScanCount_AtHighestLevelNumber: number
    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel: Map<number, number>

    dataPerScanLevel_Map_Key_ScanLevel: Map<number, DataPerSubSearch_PerScanLevel>
}

class DataPerSubSearch_PerScanLevel {

    scanLevel: number
    scanCount: number
    totalIonCurrent: number
}
