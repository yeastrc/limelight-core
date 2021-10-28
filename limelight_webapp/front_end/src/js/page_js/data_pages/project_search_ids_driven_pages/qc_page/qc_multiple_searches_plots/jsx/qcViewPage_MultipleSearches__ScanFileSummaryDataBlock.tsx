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
export class QcViewPage_MultipleSearches__ScanFileSummaryDataBlock extends React.Component< QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_Props, QcViewPage_MultipleSearches__ScanFileSummaryDataBlock_State > {

    //  bind to 'this' for passing as parameters


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

        this.state = { showUpdatingMessage: false };
    }

    /**
     *
     */
    // componentWillUnmount() {
    //
    // }

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
            window.setTimeout( () => {
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

        for ( const projectSearchId of projectSearchIds ) {

            const searchData = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchNames_AsMap().get( projectSearchId );
            if ( ! searchData ) {
                const msg = "this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchNames_AsMap().get( projectSearchId ); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const qcPage_Searches_Flags_SingleSearch = qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Searches_Flags_SingleSearch ) {
                const msg = "qcPage_Searches_Flags.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! qcPage_Searches_Flags_SingleSearch.hasScanData ) {

                //  NO Scan Data for Search so SKIP

                const dataPerSearch: DataPerSearch = {

                    searchId: searchData.searchId,

                    searchHasScanData: false,

                    scanCount_PSM_MeetsCutoff: undefined,
                    totalIonCurrent_ForSearch: undefined,
                    totalScanCount_AtHighestLevelNumber: undefined,

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

            const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId,
                    peptideDistinct_Array,
                    qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
                });

            const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            const scanNumbers_Per_searchScanFileId : Map<number,Set<number>> = new Map();

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

                searchHasScanData: true,

                scanCount_PSM_MeetsCutoff: scanCount_PSM_MeetsCutoff,
                totalIonCurrent_ForSearch,
                totalScanCount_AtHighestLevelNumber,

                dataPerScanLevel: dataPerSearch_PerScanLevel_Array
            }

            dataPerSearchArray.push( dataPerSearch );
        }

        const dataComputed: DataComputed = {
            dataPerSearchArray, largest_ScanLevel
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

            {
                const perSearch_HeaderRow_LeftLabel = (
                    <div
                        key={ "LeftLabel" }
                        style={ { paddingBottom: paddingBottom_SeparateSections } }
                    >
                        Search Id:
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
                            style={{ textAlign: "right", paddingBottom: paddingBottom_SeparateSections}}
                        >
                            {dataPerSearchEntry.searchId}
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

            for ( let scanLevel = 1; scanLevel <= this.state.dataComputed.largest_ScanLevel; scanLevel++ ) {

                const style_Label: React.CSSProperties = { paddingRight: paddingRight_Labels, paddingBottom: paddingBottom };
                const style_Value: React.CSSProperties = { textAlign: "right", paddingBottom: paddingBottom, paddingLeft: paddingLeft_Values };

                if ( scanLevel === this.state.dataComputed.largest_ScanLevel ) {
                    style_Label.paddingBottom = paddingBottom_SeparateSections;
                    style_Value.paddingBottom = paddingBottom_SeparateSections;
                }

                {
                    const perLevel_TotalIonCurrent_DisplayEntry = (
                        <div
                            key={scanLevel + "_label"}
                            style={style_Label}
                        >
                            Total MS{scanLevel} Ion Current:
                        </div>
                    )
                    perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                }
                {
                    const perLevel_Count_DisplayEntry = (
                        <div
                            key={scanLevel + "_label"}
                            style={style_Label}
                        >
                            Number MS{scanLevel} Scans:
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
                        let totalIonCurrent_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            totalIonCurrent_Value = summaryPerScanLevelData.totalIonCurrent.toExponential(3)
                        }
                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSearchEntry.searchId}
                                style={style_Value}
                            >
                                { totalIonCurrent_Value }
                            </div>
                        )
                        perLevel_TotalIonCurrent_DisplayEntries.push(perLevel_TotalIonCurrent_DisplayEntry);
                    }
                    {
                        let numberOfScans_Value = "N/A"
                        if (summaryPerScanLevelData) {
                            numberOfScans_Value = summaryPerScanLevelData.scanCount.toLocaleString();
                        }
                        const perLevel_Count_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSearchEntry.searchId}
                                style={style_Value}
                            >
                                { numberOfScans_Value }
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
            console.warn( "else of 'if ( scanFileData_For_SearchScanFileId )'")
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

    dataPerSearchArray: Array<DataPerSearch>
    largest_ScanLevel: number
}

class DataPerSearch {

    searchId: number

    searchHasScanData: boolean;

    scanCount_PSM_MeetsCutoff: number
    totalIonCurrent_ForSearch: number
    totalScanCount_AtHighestLevelNumber: number

    dataPerScanLevel: Array<DataPerSearch_PerScanLevel>
}

class DataPerSearch_PerScanLevel {

    scanLevel: number
    scanCount: number
    totalIonCurrent: number
}
