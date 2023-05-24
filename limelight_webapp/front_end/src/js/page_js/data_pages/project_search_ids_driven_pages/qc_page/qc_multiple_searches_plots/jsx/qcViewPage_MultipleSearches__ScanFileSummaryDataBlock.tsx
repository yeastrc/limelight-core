/**
 * qcViewPage_MultipleSearches__ScanFileSummaryDataBlock.tsx
 *
 * QC Page Multiple Searches : Scan File Summary Data Block
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import {qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_plots/js/qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc";
import {QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";

/**
 *
 */
export interface QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State {

    dataComputed?: DataComputed
    showUpdatingMessage?: boolean
}

/**
 *
 */
export class QcViewPage_MultipleSearches__ScanFileSummaryDataBlock
    extends React.Component< QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props, QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    /**
     *
     */
    constructor(props: QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props>, nextState: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State>, nextContext: any): boolean {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
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
    componentDidUpdate(prevProps: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props>, prevState: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State>, snapshot?: any) {
        try {
            // Comment out this.state. properties checks in componentDidUpdate

            if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                || this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
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

            window.setTimeout( () => {
                try {
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

        this.setState((prevState: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props>) : QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State =>  {

            if ( ! prevState.showUpdatingMessage ) {
                return { showUpdatingMessage: true };
            }
            return null;
        });

        const promise =
            this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_MultipleSearches.get_SearchScanFileData();

        promise.catch( reason => {

        })
        promise.then( qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches => {

            const promise_2 =
                this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.
                qcPage_DataFromServer_AndDerivedData_MultipleSearches.get_ScanFileSummaryPerLevelData();

            promise_2.catch( reason => {

            })
            promise_2.then( qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches => {

                this.setState((prevState: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props>) : QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State =>  {
                    if ( prevState.showUpdatingMessage ) {
                        return { showUpdatingMessage: false };
                    }
                    return null;
                });

                this._compute_Data({ qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches });
            })
        });

    }

    /**
     *
     */
    private _compute_Data (
        {
            qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches: QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches
        }
    ) {

        const dataPerSearchArray: Array<DataPerSearch> = [];

        const peptideDistinct_Array: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry[] =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const projectSearchIds = this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds;
        const qcPage_Searches_Flags = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcPage_Searches_Flags

        let largest_ScanLevel = 0;

        let allScans_Have_TotalIonCurrent__For_ANY_Search = false;

        const allScans_Have_TotalIonCurrent__Map_Key_ProjectSearchId: Map<number, boolean> = new Map()

        for ( const projectSearchId of projectSearchIds ) {

            const searchData = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId );
            if ( ! searchData ) {
                const msg = "searchData_SearchName_Etc_Root.get_SearchData_For_ProjectSearchId( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const qcPage_Searches_Flags_SingleSearch = qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Searches_Flags_SingleSearch ) {
                const msg = "qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! qcPage_Searches_Flags_SingleSearch.hasScanData ) {

                //  NO Scan Data for Search so SKIP

                const dataPerSearch: DataPerSearch = {

                    searchId: searchData.searchId,
                    searchLabel__SearchShortName_OR_SearchId: searchData.searchLabel__SearchShortName_OR_SearchId,

                    searchHasScanData: false,

                    scanCount_PSM_MeetsCutoff: undefined,
                    totalIonCurrent_ForSearch: undefined,
                    totalScanCount_AtHighestLevelNumber: undefined,
                    allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId: false,
                    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel: undefined,

                    dataPerScanLevel: undefined
                }

                dataPerSearchArray.push( dataPerSearch );

                continue;  //  EARLY CONTINUE
            }

            const qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch = qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId});
            if ( ! qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch ) {
                const msg = "qcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches.get_Holder_For_projectSearchId({projectSearchId}); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }


            let allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId = true;

            {
                const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data;

                for ( const spectralStorage_NO_Peaks_DataEntry of spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataEntries_IterableIterator() ) {
                    for ( const scan of spectralStorage_NO_Peaks_DataEntry.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {
                        if ( scan.totalIonCurrent_ForScan === undefined || scan.totalIonCurrent_ForScan === null ) {
                            allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId = false;
                            break;
                        }
                    }
                    if ( ! allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId ) {
                        break;
                    }
                }

                if ( allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId ) {
                    allScans_Have_TotalIonCurrent__For_ANY_Search = true;
                }

                allScans_Have_TotalIonCurrent__Map_Key_ProjectSearchId.set( projectSearchId, allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId );
            }

            const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const scanNumbers_Per_searchScanFileId : Map<number,Set<number>> = new Map();

            const totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel: Map<number, number> = new Map();

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
                const searchScanFileId = psmTblData_Entry.searchScanFileId;
                const scanNumber = psmTblData_Entry.scanNumber;

                let scanNumbers_For_searchScanFileId = scanNumbers_Per_searchScanFileId.get(searchScanFileId);
                if ( ! scanNumbers_For_searchScanFileId ) {
                    scanNumbers_For_searchScanFileId = new Set();
                    scanNumbers_Per_searchScanFileId.set(searchScanFileId, scanNumbers_For_searchScanFileId);
                }

                scanNumbers_For_searchScanFileId.add( scanNumber );

                if ( allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId ) {

                    let scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId = scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.get(searchScanFileId);
                    if ( ! scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId ) {
                        scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId = new Set();
                        scanNumbers_TotalIonCurrent_Tracking__Map_Key_searchScanFileId.set(searchScanFileId, scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId);
                    }

                    if ( ! scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId.has( scanNumber ) ) {
                        //  NOT processed this scan number so process now

                        scanNumbers_TotalIonCurrent_Tracking___For_searchScanFileId.add( scanNumber );

                        const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data;

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

            let scanCount_PSM_MeetsCutoff = 0;

            for ( const scanNumbers_For_searchScanFileId of scanNumbers_Per_searchScanFileId.values() ) {
                scanCount_PSM_MeetsCutoff += scanNumbers_For_searchScanFileId.size
            }

            //  Get Per Scan Level data and totalIonCurrent_ForSearch

            let totalIonCurrent_ForSearch = 0;

            const dataPerSearch_PerScanLevel_Map_Key_ScanLevel: Map<number,DataPerSearch_PerScanLevel> = new Map();

            for ( const summaryPerLevelData_Entry of qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root.get_ScanFileData_IterableIterator() ) {

                // summaryPerLevelData_Entry.searchScanFileId

                for ( const summaryPerLevelData of summaryPerLevelData_Entry.get_ScanLevel_IterableIterator() ) {

                    let dataPerSearch_ForScanLevel = dataPerSearch_PerScanLevel_Map_Key_ScanLevel.get(summaryPerLevelData.scanLevel);
                    if ( ! dataPerSearch_ForScanLevel ) {
                        dataPerSearch_ForScanLevel = {
                            scanLevel: summaryPerLevelData.scanLevel,
                            scanCount: 0,
                            totalIonCurrent: 0
                        };
                        dataPerSearch_PerScanLevel_Map_Key_ScanLevel.set(summaryPerLevelData.scanLevel, dataPerSearch_ForScanLevel);
                    }
                    dataPerSearch_ForScanLevel.scanCount += summaryPerLevelData.numberOfScans;
                    dataPerSearch_ForScanLevel.totalIonCurrent += summaryPerLevelData.totalIonCurrent;

                    totalIonCurrent_ForSearch += summaryPerLevelData.totalIonCurrent;
                }
            }

            const dataPerSearch_PerScanLevel_Array = Array.from( dataPerSearch_PerScanLevel_Map_Key_ScanLevel.values() );
            dataPerSearch_PerScanLevel_Array.sort( (a,b) => {
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
                const lastEntry = dataPerSearch_PerScanLevel_Array[dataPerSearch_PerScanLevel_Array.length - 1];
                if (largest_ScanLevel < lastEntry.scanLevel) {
                    largest_ScanLevel = lastEntry.scanLevel;
                }
                totalScanCount_AtHighestLevelNumber = lastEntry.scanCount;
            }

            const dataPerSearch: DataPerSearch = {

                searchId: searchData.searchId,
                searchLabel__SearchShortName_OR_SearchId: searchData.searchLabel__SearchShortName_OR_SearchId,

                searchHasScanData: true,

                scanCount_PSM_MeetsCutoff: scanCount_PSM_MeetsCutoff,
                totalIonCurrent_ForSearch,
                totalScanCount_AtHighestLevelNumber,
                allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId,
                totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel,

                dataPerScanLevel: dataPerSearch_PerScanLevel_Array
            }

            dataPerSearchArray.push( dataPerSearch );
        }

        const dataComputed: DataComputed = {
            dataPerSearchArray, largest_ScanLevel, allScans_Have_TotalIonCurrent__For_ANY_Search
        }

        this.setState({ dataComputed });
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

            const dataPerSearchArray = this.state.dataComputed.dataPerSearchArray;

            const perSearch_HeaderRow: Array<JSX.Element> = [];
            const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];
            const perLevel_Count_DisplayEntries: Array<JSX.Element> = [];

            const qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc_Result =
                qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc({
                    projectSearchIds: this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds,
                    searchData_SearchName_Etc_Root : this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root()
                })

            const searchLabel = qcViewPage_MultipleSearches__Compute_Chart_X_Axis_Title_Etc_Result.xAxisTitle

            {
                const perSearch_HeaderRow_LeftLabel = (
                    <div
                        key={ "LeftLabel" }
                        style={ { paddingBottom: paddingBottom_SeparateSections } }
                    >
                        { searchLabel }:
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

            for ( const dataPerSearchEntry of dataPerSearchArray ) {
                { //  Search Ids
                    const perSearch_HeaderRow_Column = (
                        <div
                            key={ dataPerSearchEntry.searchId }
                            style={{ textAlign: "right", paddingBottom: paddingBottom_SeparateSections, paddingLeft: 15 }}
                        >
                            {dataPerSearchEntry.searchLabel__SearchShortName_OR_SearchId }
                        </div>
                    )
                    perSearch_HeaderRow.push(perSearch_HeaderRow_Column);
                }
                {  //  Total ION Current per search
                    let totalIonCurrent_Value = "N/A"
                    if (dataPerSearchEntry.searchHasScanData && dataPerSearchEntry.totalIonCurrent_ForSearch) {
                        totalIonCurrent_Value = dataPerSearchEntry.totalIonCurrent_ForSearch.toExponential(3)
                    }

                    const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                    const perLevel_TotalIonCurrent_DisplayEntry = (
                        <div
                            key={"total_" + dataPerSearchEntry.searchId}
                            style={style_Value}
                        >
                            { totalIonCurrent_Value }
                        </div>
                    )
                    perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                }
            }

            //  "Total MS{scanLevel} Ion Current"  AND  "MS{scanLevel} TIC with PSM":  Per Scan Level Data

            for ( let scanLevel = 1; scanLevel <= this.state.dataComputed.largest_ScanLevel; scanLevel++ ) {

                let display__totalIonCurrent_ForScanLevel_FilteredScans__Row = false;

                if ( scanLevel !== 1 ) {  // skip for scanLevel 1

                    if ( this.state.dataComputed.allScans_Have_TotalIonCurrent__For_ANY_Search ) {

                        if ( scanLevel === this.state.dataComputed.largest_ScanLevel ) {
                            display__totalIonCurrent_ForScanLevel_FilteredScans__Row = true;
                        } else {
                            for ( const dataPerSearchEntry of dataPerSearchArray ) {
                                const totalIonCurrent_ForScanLevel_FilteredScans = dataPerSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get(scanLevel);
                                if ( ( ! totalIonCurrent_ForScanLevel_FilteredScans ) ) {
                                    display__totalIonCurrent_ForScanLevel_FilteredScans__Row = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                let paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup = 0;

                if ( display__totalIonCurrent_ForScanLevel_FilteredScans__Row ) {
                    //  Add padding between this scan level data and previous since next will have a second row
                    paddingTop_TotalIonCurrentMain_OuterDiv_FromPrevGroup = 5 //  adds to paddingBottom5 of previous line/group
                }

                const style_Label: React.CSSProperties = { paddingRight: paddingRight_Labels, paddingBottom: paddingBottom };
                const style_Value: React.CSSProperties = { textAlign: "right", whiteSpace: "nowrap", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

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

                for ( const dataPerSearchEntry of dataPerSearchArray ) {

                    let summaryPerScanLevelData :  DataPerSearch_PerScanLevel = undefined;

                    if ( dataPerSearchEntry.searchHasScanData ) {
                        // Find summaryPerScanLevelData for scanLevel for this search
                        for (const summaryPerScanLevelData_ForSearch of dataPerSearchEntry.dataPerScanLevel) {
                            if (summaryPerScanLevelData_ForSearch.scanLevel === scanLevel) {
                                summaryPerScanLevelData = summaryPerScanLevelData_ForSearch;
                                break;
                            }
                        }
                    }
                    {
                        let totalIonCurrent_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            totalIonCurrent_Value = summaryPerScanLevelData.totalIonCurrent.toExponential(3)
                        }
                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSearchEntry.searchId}
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

                    for ( const dataPerSearchEntry of dataPerSearchArray ) {

                        let summaryPerScanLevelData :  DataPerSearch_PerScanLevel = undefined;

                        if ( dataPerSearchEntry.searchHasScanData ) {
                            // Find summaryPerScanLevelData for scanLevel for this search
                            for (const summaryPerScanLevelData_ForSearch of dataPerSearchEntry.dataPerScanLevel) {
                                if (summaryPerScanLevelData_ForSearch.scanLevel === scanLevel) {
                                    summaryPerScanLevelData = summaryPerScanLevelData_ForSearch;
                                    break;
                                }
                            }
                        }
                        {
                            let value_Display = "N/A";

                            if ( dataPerSearchEntry.allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId ) {
                                if ( summaryPerScanLevelData && dataPerSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel ) {
                                    const totalIonCurrent_ForScanLevel_FilteredScans = dataPerSearchEntry.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get(scanLevel);
                                    if ( totalIonCurrent_ForScanLevel_FilteredScans !== undefined && totalIonCurrent_ForScanLevel_FilteredScans !== null
                                        && summaryPerScanLevelData.totalIonCurrent !== undefined && summaryPerScanLevelData.totalIonCurrent !== null ) {

                                        value_Display = totalIonCurrent_ForScanLevel_FilteredScans.toExponential(3) +
                                            " (" +
                                            ( ( totalIonCurrent_ForScanLevel_FilteredScans / summaryPerScanLevelData.totalIonCurrent ) * 100 ).toFixed( 1 ) +
                                            "%)"
                                    }
                                }
                            }

                            const perLevel_TotalIonCurrent_DisplayEntry = (
                                <div
                                    key={scanLevel + "_" + dataPerSearchEntry.searchId + "_TIC with PSM"}
                                >
                                    <div
                                        style={style_Value}
                                    >
                                        { value_Display }
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

                for ( const dataPerSearchEntry of dataPerSearchArray ) {

                    let summaryPerScanLevelData :  DataPerSearch_PerScanLevel = undefined;

                    if ( dataPerSearchEntry.searchHasScanData ) {
                        // Find summaryPerScanLevelData for scanLevel for this search
                        for (const summaryPerScanLevelData_ForSearch of dataPerSearchEntry.dataPerScanLevel) {
                            if (summaryPerScanLevelData_ForSearch.scanLevel === scanLevel) {
                                summaryPerScanLevelData = summaryPerScanLevelData_ForSearch;
                                break;
                            }
                        }
                    }
                    {
                        let numberOfScans_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            numberOfScans_Value = summaryPerScanLevelData.scanCount.toLocaleString();
                        }
                        const perLevel_Count_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSearchEntry.searchId}
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

            for ( const dataPerSearchEntry of dataPerSearchArray ) {

                let scanNumbersCount_For_FilteredPSMs_Percentage_String: string = undefined;

                if ( dataPerSearchEntry.searchHasScanData ) {

                    const percentage = ( dataPerSearchEntry.scanCount_PSM_MeetsCutoff / dataPerSearchEntry.totalScanCount_AtHighestLevelNumber ) * 100;

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
                        key={ dataPerSearchEntry.searchId }
                        style={ { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values  } }
                    >
                        {(dataPerSearchEntry.searchHasScanData) ? (
                            <React.Fragment>
                                <span>{dataPerSearchEntry.scanCount_PSM_MeetsCutoff.toLocaleString()}</span>
                                <span> (</span>
                                <span>{scanNumbersCount_For_FilteredPSMs_Percentage_String}</span>
                                <span>%)</span>
                            </React.Fragment>
                        ) : (
                            <span>N/A</span>
                        )
                        }
                    </div>
                )

                scanNumbersCount_For_FilteredPSMs_Percentage_JSX.push( entryJSX );
            }

            const gridTemplateColumns_String = "max-content ".repeat( dataPerSearchArray.length + 1 );

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
            <div   data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }>
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

    dataPerSearchArray: Array<DataPerSearch>
    largest_ScanLevel: number
    allScans_Have_TotalIonCurrent__For_ANY_Search: boolean
}

class DataPerSearch {

    searchId: number
    searchLabel__SearchShortName_OR_SearchId: string

    searchHasScanData: boolean;

    scanCount_PSM_MeetsCutoff: number
    totalIonCurrent_ForSearch: number
    totalScanCount_AtHighestLevelNumber: number

    allScans_Have_TotalIonCurrent__For_THIS_ProjectSearchId: boolean
    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel: Map<number, number>

    dataPerScanLevel: Array<DataPerSearch_PerScanLevel>
}

class DataPerSearch_PerScanLevel {

    scanLevel: number
    scanCount: number
    totalIonCurrent: number
}
