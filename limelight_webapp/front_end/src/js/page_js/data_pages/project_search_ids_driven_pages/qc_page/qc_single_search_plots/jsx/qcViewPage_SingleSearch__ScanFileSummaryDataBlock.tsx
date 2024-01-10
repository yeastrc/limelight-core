/**
 * qcViewPage_SingleSearch__ScanFileSummaryDataBlock.tsx
 *
 * QC Page Single Search : Scan File Summary Data Block
 *
 */

import React from "react";

import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { qcPage_StandardChartLayout_StandardWidth } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { QcPage_ChartBorder } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";

/**
 *
 */
export interface QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
    searchScanFileId_Selected: number
}

/**
 *
 */
interface QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State {

    scanFile_SummaryPerLevelData_Root?: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root
    scanNumbersCount_For_FilteredPSMs?: ScanNumbersCount_For_FilteredPSMs
    totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel?: Map<number, number>
    allScans_Have_TotalIonCurrent?: boolean
    showUpdatingMessage?: boolean
}

class ScanNumbersCount_For_FilteredPSMs {
    scanNumbersCount_For_FilteredPSMs: number
}

/**
 *
 */
export class QcViewPage_SingleSearch__ScanFileSummaryDataBlock
    extends React.Component< QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props, QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput


    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props>, nextState: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State>, nextContext: any): boolean {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== nextProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
            || this.props.searchScanFileId_Selected !== nextProps.searchScanFileId_Selected
            || this.state.scanFile_SummaryPerLevelData_Root !== nextState.scanFile_SummaryPerLevelData_Root
            || this.state.scanNumbersCount_For_FilteredPSMs !== nextState.scanNumbersCount_For_FilteredPSMs
        ) {
            return true;
        }
        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props>, prevState: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State>, snapshot?: any) {
        try {
            window.setTimeout( () => {
                try {

                    // Comment out this.state. properties checks in componentDidUpdate

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                        || this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent !== prevProps.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
                        || this.props.searchScanFileId_Selected !== prevProps.searchScanFileId_Selected
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

        this.setState((prevState: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State =>  {

            if ( ! prevState.showUpdatingMessage ) {
                return { showUpdatingMessage: true };
            }
            return null;
        });

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const searchScanFileId = this.props.searchScanFileId_Selected;

        let qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        { // get_PsmStatistics_PSMCount__PeptideLength_VS_RetentionTime_Statistics_Data
            const promise = new Promise<void>((resolve, reject) => { try {
                const promise_Result =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileSummaryPerLevelData({ searchScanFileId });
                promise_Result.catch(reason => { reject(reason) })
                promise_Result.then(value => { try {
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch = value
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        }
        { // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        resolve()
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result NO data or promise"
                console.warn(msg)
                throw Error(msg)
            }
        }

        const promisesAll = Promise.all(promises)


        promisesAll.catch( reason => {
            try {
                console.warn( "_populateChart():: catch(...): reason: ", reason );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        promisesAll.then( novalue => {

            if ( searchScanFileId !== this.props.searchScanFileId_Selected ) {

                //  Data NOT loaded for currently selected searchScanFileId_Selected so SKIP - USER Likely changed selection while data was loading

                return; // EARLY RETURN
            }

            if (
                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                )) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }

            this.setState((prevState: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State =>  {

                if ( prevState.showUpdatingMessage ) {
                    return { showUpdatingMessage: false };
                }
                return null;
            });

            this.setState({ scanFile_SummaryPerLevelData_Root: qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root });

            this._compute_ScanCount_ForFilteredPSMs({ qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
        })

    }

    /**
     *
     */
    private _compute_ScanCount_ForFilteredPSMs (
        {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
    ) {

        const spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data;

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const spectralStorage_NO_Peaks_DataFor_SearchScanFileId = spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( this.props.searchScanFileId_Selected );
        if ( ! spectralStorage_NO_Peaks_DataFor_SearchScanFileId ) {
            const msg = "spectralStorage_NO_Peaks_Data.get_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( this.props.searchScanFileId_Selected ); returned nothing. searchScanFileId: " + this.props.searchScanFileId_Selected;
            console.warn(msg);
            throw Error(msg);
        }

        let allScans_Have_TotalIonCurrent = true;

        for ( const scan of spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataForSingleScanNumberEntries_IterableIterator() ) {
            if ( scan.totalIonCurrent_ForScan === undefined || scan.totalIonCurrent_ForScan === null ) {
                allScans_Have_TotalIonCurrent = false;
                break;
            }
        }

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
            qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                projectSearchId,
                peptideDistinct_Array,
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            });

        const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

        const scanNumbers : Set<number> = new Set()

        const totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel: Map<number, number> = new Map();

        for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

            if ( ! psmTblData_Filtered_Entry.searchScanFileId ) {
                const msg = "( ! psmTblData_Filtered_Entry.searchScanFileId ) projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! psmTblData_Filtered_Entry.scanNumber ) {
                const msg = "( ! psmTblData_Filtered_Entry.scanNumber ) projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const searchScanFileId = psmTblData_Filtered_Entry.searchScanFileId;
            const scanNumber = psmTblData_Filtered_Entry.scanNumber;

            if ( searchScanFileId !== this.props.searchScanFileId_Selected ) {

                // PSM NOT for selected searchScanFileId_Selected
                continue;  // EARLY CONTINUE
            }

            if ( ! scanNumbers.has( scanNumber ) ) {

                scanNumbers.add( scanNumber );

                if ( allScans_Have_TotalIonCurrent ) {

                    const spectralStorage_NO_Peaks_DataFor_ScanNumber = spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber );
                    if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                        const msg = "spectralStorage_NO_Peaks_DataFor_SearchScanFileId.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber( psmTblData_Filtered_Entry.scanNumber ); returned nothing. scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
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

        const scanNumbersCount_For_FilteredPSMs: ScanNumbersCount_For_FilteredPSMs = {
            scanNumbersCount_For_FilteredPSMs: scanNumbers.size
        };

        this.setState({ scanNumbersCount_For_FilteredPSMs, totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel, allScans_Have_TotalIonCurrent });
    }

    /**
     *
     */
    render() {


        let dataDisplay: JSX.Element = null;

        if ( this.state.scanFile_SummaryPerLevelData_Root && this.state.scanNumbersCount_For_FilteredPSMs ) {

            const scanFileData_For_SearchScanFileId = this.state.scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId(this.props.searchScanFileId_Selected);
            if ( scanFileData_For_SearchScanFileId ) {
                const summaryPerLevelData_Array: Array<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel> = [];
                for ( const entry of scanFileData_For_SearchScanFileId.get_ScanLevel_IterableIterator() ) {
                    summaryPerLevelData_Array.push(entry);
                }
                summaryPerLevelData_Array.sort( (a,b) => {
                    if ( a.scanLevel < b.scanLevel ) {
                        return -1;
                    }
                    if ( a.scanLevel > b.scanLevel ) {
                        return 1;
                    }
                    return 0
                })

                let totalIonCurrentAllLevels = 0;

                const perLevel_TotalIonCurrent_DisplayEntries: Array<JSX.Element> = [];
                const perLevel_Count_DisplayEntries: Array<JSX.Element> = [];

                const summaryPerLevelData_Array_Length = summaryPerLevelData_Array.length;
                let summaryPerLevelData_Array_Counter = 0;

                let totalScanCount_AtHighestLevelNumber = undefined;

                const paddingBottom = 5;

                for ( const summaryPerLevelData of summaryPerLevelData_Array ) {

                    totalScanCount_AtHighestLevelNumber = summaryPerLevelData.numberOfScans; //  Keep assigning for each Array entry

                    summaryPerLevelData_Array_Counter++;

                    totalIonCurrentAllLevels += summaryPerLevelData.totalIonCurrent;

                    const style_Label: React.CSSProperties = { paddingRight: 30, paddingBottom: paddingBottom };
                    const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom };

                    let paddingBottom_OuterDiv_ToNextGroup = 0;
                    {
                        if ( this.state.allScans_Have_TotalIonCurrent
                            && ( this.state.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.has( summaryPerLevelData.scanLevel + 1 )
                                //  add  '|| ...' since always put second row on last scan level
                                || summaryPerLevelData_Array_Counter + 1 === summaryPerLevelData_Array_Length ) ) {
                            //  Add padding between this scan level data and next since next will have a second row
                            paddingBottom_OuterDiv_ToNextGroup = 10
                        }
                    }

                    if ( summaryPerLevelData_Array_Counter === summaryPerLevelData_Array_Length ) {
                        paddingBottom_OuterDiv_ToNextGroup = 14;
                    }

                    let willDisplay__FilteredPsmEntry = false;

                    const style_OuterDiv_MainEntry_AllColumns__TotalIonCurrent: React.CSSProperties = {}
                    const style_OuterDiv_FilteredPsmEntry_AllColumns__TotalIonCurrent: React.CSSProperties = {}

                    if ( this.state.allScans_Have_TotalIonCurrent
                        && ( summaryPerLevelData_Array_Counter === summaryPerLevelData_Array_Length
                            || this.state.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.has( summaryPerLevelData.scanLevel ) ) ) {
                        willDisplay__FilteredPsmEntry = true;
                        style_OuterDiv_FilteredPsmEntry_AllColumns__TotalIonCurrent.paddingBottom = paddingBottom_OuterDiv_ToNextGroup;
                    } else {
                        style_OuterDiv_MainEntry_AllColumns__TotalIonCurrent.paddingBottom = paddingBottom_OuterDiv_ToNextGroup;
                    }

                    {
                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <React.Fragment key={ summaryPerLevelData.scanLevel + "_main" }>
                                <div style={ style_OuterDiv_MainEntry_AllColumns__TotalIonCurrent }>
                                    <div style={ style_Label }>
                                        Total MS{ summaryPerLevelData.scanLevel } Ion Current:
                                    </div>
                                </div>
                                <div style={ style_OuterDiv_MainEntry_AllColumns__TotalIonCurrent }>
                                    <div style={ style_Value }>
                                        { summaryPerLevelData.totalIonCurrent.toExponential( 3 ) }
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push( perLevel_TotalIonCurrent_DisplayEntry );
                    }
                    {
                        const totalIonCurrent_ForScanLevel_FilteredScans = this.state.totalIonCurrent_ForScanLevel_FilteredScans_Map_Key_ScanLevel.get( summaryPerLevelData.scanLevel )
                        //  always put second row on last scan level
                        if ( this.state.allScans_Have_TotalIonCurrent && summaryPerLevelData.scanLevel > 1
                            && ( totalIonCurrent_ForScanLevel_FilteredScans
                                || ( this.state.allScans_Have_TotalIonCurrent && summaryPerLevelData_Array_Counter === summaryPerLevelData_Array_Length ) ) ) {
                            //  Scan Level > 1  AND  This level has Total Ion Current that is for filtered PSMs
                            const perLevel_TotalIonCurrent_DisplayEntry = (
                                <React.Fragment key={ summaryPerLevelData.scanLevel + "_filtered" }>
                                    <div style={ style_OuterDiv_FilteredPsmEntry_AllColumns__TotalIonCurrent }>
                                        <div style={ style_Label }>
                                            MS{ summaryPerLevelData.scanLevel } TIC with PSM:
                                        </div>
                                    </div>
                                    <div style={ style_OuterDiv_FilteredPsmEntry_AllColumns__TotalIonCurrent }>
                                        <div style={ style_Value }>
                                            <span>
                                                { ( ! totalIonCurrent_ForScanLevel_FilteredScans ) ? "0" :
                                                    totalIonCurrent_ForScanLevel_FilteredScans.toExponential( 3 ) }
                                            </span>
                                            <span> </span>
                                            <span>(</span>
                                            <span>
                                                { ( ( ! totalIonCurrent_ForScanLevel_FilteredScans ) || ( ! summaryPerLevelData.totalIonCurrent ) ) ? "0" :
                                                    ( ( totalIonCurrent_ForScanLevel_FilteredScans / summaryPerLevelData.totalIonCurrent ) * 100 ).toFixed( 1 ) }
                                            </span>
                                            <span>%</span>
                                            <span>)</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                            perLevel_TotalIonCurrent_DisplayEntries.push( perLevel_TotalIonCurrent_DisplayEntry );
                        }
                    }

                    {
                        const perLevel_Count_DisplayEntry = (
                            <React.Fragment key={ summaryPerLevelData.scanLevel }>
                                <div style={ style_Label }>
                                    Number MS{ summaryPerLevelData.scanLevel } Scans:
                                </div>
                                <div style={ style_Value }>
                                    { summaryPerLevelData.numberOfScans.toLocaleString() }
                                </div>
                            </React.Fragment>
                        )
                        perLevel_Count_DisplayEntries.push( perLevel_Count_DisplayEntry );
                    }
                }

                let scanNumbersCount_For_FilteredPSMs_Percentage_String : string = undefined;
                {
                    const percentage = ( this.state.scanNumbersCount_For_FilteredPSMs.scanNumbersCount_For_FilteredPSMs / totalScanCount_AtHighestLevelNumber ) * 100;

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

                dataDisplay = (
                    <div style={ { display: "grid", gridTemplateColumns: "max-content max-content" } }>
                        {/* Two column Grid */}
                        <div style={ { paddingBottom: paddingBottom } }>
                            Total Ion Current:
                        </div>
                        <div style={ { textAlign: "right" } }>
                            { totalIonCurrentAllLevels.toExponential(3) }
                        </div>
                        { perLevel_TotalIonCurrent_DisplayEntries }
                        { perLevel_Count_DisplayEntries }

                        {/*  Remove paddingBottom: paddingBottom from both columns of last row since now in border and padding all around */}
                        <div >
                            Scans with a <br/>PSM meeting filters
                        </div>
                        <div style={ { textAlign: "right" } }>
                            <span>{ this.state.scanNumbersCount_For_FilteredPSMs.scanNumbersCount_For_FilteredPSMs.toLocaleString() }</span>
                            <span> (</span>
                            <span>{ scanNumbersCount_For_FilteredPSMs_Percentage_String }</span>
                            <span>%)</span>
                        </div>
                    </div>
                )
            } else {
                // console.warn( "else of 'if ( scanFileData_For_SearchScanFileId )'")
            }
        }

        if ( this.state.showUpdatingMessage ) {
            console.warn( " ( this.state.showUpdatingMessage ) true IN QcViewPage_SingleSearch__ScanFileSummaryDataBlock:render() ")
        }

        return (

            <div  //  This div is used as container for "Updating" message overlay at bottom of this div

                style={ { position: "relative", display: "inline-block", minWidth: qcPage_StandardChartLayout_StandardWidth() } }
            >

                <QcPage_ChartBorder no_Min_Height={ true }>

                    <div style={ { padding: 15 } }  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }>

                        <div
                            style={ { fontSize: 16, fontWeight: "bold", marginBottom: 10 } }
                        >
                            Scan File Statistics
                        </div>
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

                </QcPage_ChartBorder>
            </div>
        );
    }


}
