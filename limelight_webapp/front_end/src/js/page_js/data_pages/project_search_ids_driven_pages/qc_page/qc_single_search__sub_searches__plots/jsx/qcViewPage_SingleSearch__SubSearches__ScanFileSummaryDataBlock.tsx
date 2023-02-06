/**
 * qcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock.tsx
 *
 * QC Page SingleSearch__SubSearches : Scan File Summary Data Block
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch__SubSearches";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";

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

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput


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

        const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
            get_SearchScanFileData();

        promise.catch( reason => {

        })
        promise.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => {

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            const promise_2 =
                this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
                get_ScanFileSummaryPerLevelData();

            promise_2.catch( reason => {

            })
            promise_2.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => { try {

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

                this._compute_Data({ qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches });

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        });

    }

    /**
     * ALSO: use 'await' in this method to load more data
     */
    private async _compute_Data (
        {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        }
    ) : Promise<void> {

        try {
            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

            const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

            const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch().spectralStorage_NO_Peaks_Data;

            let allScans_Have_TotalIonCurrent = true;

            for ( const spectralStorage_NO_Peaks_DataEntry of spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator() ) {
                for ( const scan of spectralStorage_NO_Peaks_DataEntry.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {
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

            //   'await':  get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise()

            const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().
                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise();

            const searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_ReturnPromise_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder;

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

            const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch();

            const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
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
                const searchScanFileId = psmTblData_Entry.searchScanFileId;
                const scanNumber = psmTblData_Entry.scanNumber;

                const subGroupId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupId_For_PsmId(psmId);
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
                let scanNumbers_For_searchScanFileId = scanNumbers_Map_Key_searchScanFileId_Map.get(searchScanFileId);
                if ( ! scanNumbers_For_searchScanFileId ) {
                    scanNumbers_For_searchScanFileId = new Set();
                    scanNumbers_Map_Key_searchScanFileId_Map.set(searchScanFileId, scanNumbers_For_searchScanFileId);
                }

                if ( ! scanNumbers_For_searchScanFileId.has( scanNumber ) ) {

                    scanNumbers_For_searchScanFileId.add( scanNumber );
                }

                if ( allScans_Have_TotalIonCurrent ) {

                    let scanNumbers_For_searchScanFileId = scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.get(searchScanFileId);
                    if ( ! scanNumbers_For_searchScanFileId ) {
                        scanNumbers_For_searchScanFileId = new Set();
                        scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.set(searchScanFileId, scanNumbers_For_searchScanFileId);
                    }

                    if ( ! scanNumbers_For_searchScanFileId.has( scanNumber ) ) {
                        //  NOT processed this scan number so process now

                        scanNumbers_For_searchScanFileId.add( scanNumber );

                        const spectralStorage_NO_Peaks_DataFor_SearchScanFileId = spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Entry.searchScanFileId );
                        if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
                            const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( psmTblData_Entry.searchScanFileId ); returned nothing. searchScanFileId: " + psmTblData_Entry.searchScanFileId;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( scanNumber );
                        if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                            const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( scanNumber ); returned nothing. scanNumber: " + scanNumber;
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

                    const summaryPerLevelData_Entry = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId(searchScanFileId);
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
    render() {

        let dataDisplay: JSX.Element = null;

        if ( this.state.dataComputed  ) {

            const paddingBottom = 5;
            const paddingBottom_SeparateSections = 14;

            const paddingRight_Labels = 30;
            const paddingLeft_Values = 15;

            const dataPerSubSearchArray = this.state.dataComputed.dataPerSubSearchArray;

            const perSearch_HeaderRow: Array<JSX.Element> = [];
            const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];
            const perLevel_Count_DisplayEntries: Array<JSX.Element> = [];

            {
                const perSearch_HeaderRow_LeftLabel = (
                    <div
                        key={ "LeftLabel" }
                        style={ { paddingBottom: paddingBottom_SeparateSections } }
                    >
                        Sub Search:
                    </div>
                )
                perSearch_HeaderRow.push( perSearch_HeaderRow_LeftLabel );
            }
            {
                const perLevel_TotalIonCurrent_LeftLabel = (
                    <div
                        key={ "Total Ion Current" }
                    >
                        Total Ion Current:
                    </div>
                );
                perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_LeftLabel);
            }

            for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {
                { //  Sub Search Display Name
                    const perSearch_HeaderRow_Column = (
                        <div
                            key={ dataPerSubSearchEntry.searchSubGroup_Id }
                            style={{ textAlign: "right", paddingBottom: paddingBottom_SeparateSections}}
                        >
                            {dataPerSubSearchEntry.subgroupName_Display}
                        </div>
                    )
                    perSearch_HeaderRow.push(perSearch_HeaderRow_Column);
                }
                {  //  Total ION Current per Sub search
                    const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                    const perLevel_TotalIonCurrent_DisplayEntry = (
                        <div
                            key={"total_" + dataPerSubSearchEntry.searchSubGroup_Id}
                            style={style_Value}
                        >
                            { dataPerSubSearchEntry.totalIonCurrent_ForSearch.toExponential(3) }
                        </div>
                    )
                    perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                }
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
                    const perLevel_TotalIonCurrent_DisplayEntry = (
                        <div
                            key={scanLevel + "_label"}
                            style={ { paddingTop: paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup } }
                        >
                            <div
                                style={style_Label}
                            >
                                Total MS{scanLevel} Ion Current:
                            </div>
                        </div>
                    )
                    perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                }

                for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                    const summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = dataPerSubSearchEntry.dataPerScanLevel_Map_Key_ScanLevel.get( scanLevel );

                    {
                        let totalIonCurrent_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            totalIonCurrent_Value = summaryPerScanLevelData.totalIonCurrent.toExponential(3)
                        }

                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
                                style={ { paddingTop: paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup } }
                            >
                                <div
                                    style={style_Value}
                                >
                                    { totalIonCurrent_Value }
                                </div>
                            </div>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                    }
                }

                if ( display__totalIonCurrent_ForScanLevel_FilteredScans__Row ) {

                    //  "MS{scanLevel} TIC with PSM" row

                    {
                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <div
                                key={scanLevel + "_label_TIC with PSM"}
                            >
                                <div
                                    style={style_Label}
                                >
                                    MS{scanLevel} TIC with PSM:
                                </div>
                            </div>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
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
                                        ")"
                                }
                            }

                            const perLevel_TotalIonCurrent_DisplayEntry = (
                                <div
                                    key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id + "_TIC with PSM"}
                                >
                                    <div
                                        style={style_Value}
                                    >
                                        <span>
                                             {value_Display}
                                        </span>
                                    </div>
                                </div>
                            )
                            perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                        }
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
                    const perLevel_Count_DisplayEntry = (
                        <div
                            key={scanLevel + "_label"}
                            style={ {
                                paddingTop: scanLevel === 1 ? paddingBottom_SeparateSections : 0  //  Space from prev section
                            } }
                        >
                            <div
                                style={style_Label}
                            >
                                Number MS{scanLevel} Scans:
                            </div>
                        </div>
                    )
                    perLevel_Count_DisplayEntries.push(perLevel_Count_DisplayEntry);
                }

                for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                    const summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = dataPerSubSearchEntry.dataPerScanLevel_Map_Key_ScanLevel.get( scanLevel );

                    {
                        let numberOfScans_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            numberOfScans_Value = summaryPerScanLevelData.scanCount.toLocaleString();
                        }
                        const perLevel_Count_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
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
                        )
                        perLevel_Count_DisplayEntries.push(perLevel_Count_DisplayEntry);
                    }
                }
            }

            const scanNumbersCount_For_FilteredPSMs_Percentage_JSX: Array<JSX.Element> = [];

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

                const entryJSX = (
                    <div
                        key={ dataPerSubSearchEntry.searchSubGroup_Id }
                        style={ { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values  } }
                    >
                        <React.Fragment>
                            <span>{dataPerSubSearchEntry.scanCount_PSM_MeetsCutoff.toLocaleString()}</span>
                            <span> (</span>
                            <span>{scanNumbersCount_For_FilteredPSMs_Percentage_String}</span>
                            <span>%)</span>
                        </React.Fragment>
                    </div>
                )

                scanNumbersCount_For_FilteredPSMs_Percentage_JSX.push( entryJSX );
            }

            const gridTemplateColumns_String = "max-content ".repeat( dataPerSubSearchArray.length + 1 );

            dataDisplay = (
                <div style={ { display: "grid", gridTemplateColumns: gridTemplateColumns_String } }>
                    {/* Two column Grid */}
                    { perSearch_HeaderRow }
                    { perLevel_TotalIonCurrent_DisplayEntries }
                    { perLevel_Count_DisplayEntries }
                    <div  style={ { paddingBottom: paddingBottom, paddingRight: paddingRight_Labels } }>
                        Scans with a <br/>PSM meeting filters
                    </div>
                    { scanNumbersCount_For_FilteredPSMs_Percentage_JSX }
                </div>
            );

        } else {
            // console.warn( "else of 'if ( scanFileData_For_SearchScanFileId )'")
        }


        return (
            <div >
                <h3>
                    Scan Statistics
                </h3>
                <div style={ { position: "relative" } }>
                    { ( dataDisplay ) ? (
                        <React.Fragment>
                            {dataDisplay}
                            {( this.state.showUpdatingMessage ) ? (
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
                    )}
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
