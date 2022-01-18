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
export class QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock extends React.Component< QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props, QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State > {

    //  bind to 'this' for passing as parameters


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

        const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
            get_SearchScanFileData();

        promise.catch( reason => {

        })
        promise.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => {

            const promise_2 =
                this.props.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches.
                get_ScanFileSummaryPerLevelData();

            promise_2.catch( reason => {

            })
            promise_2.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches => {

                this.setState((prevState: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__SubSearches__ScanFileSummaryDataBlock_State =>  {
                    if ( prevState.showUpdatingMessage ) {
                        return { showUpdatingMessage: false };
                    }
                    return null;
                });

                this._compute_Data({ qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches });
            })
        });

    }

    /**
     *
     */
    private _compute_Data (
        {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        }
    ) {

        const projectSearchId = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const searchSubGroup_Ids_Selected = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected;

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

        const loadedDataPerProjectSearchIdHolder = this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId);
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error("loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId);
        }
        const subGroupIdMap_Key_PsmId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId();
        if ( ! subGroupIdMap_Key_PsmId ) {
            throw Error("loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId(); returned NOTHING for projectSearchId: " + projectSearchId);
        }

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

            const subGroupId = subGroupIdMap_Key_PsmId.get(psmId);
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
            scanNumbers_For_searchScanFileId.add( scanNumber );
        }

        //  Get Scan Count

        for (const searchSubGroup of searchSubGroups_DisplayOrder) {

            if ( ! searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                //  NOT a Selected searchSubGroup_Id so SKIP
                continue; // EARLY CONTINUE
            }

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

                dataPerScanLevel: dataPerSubSearch_PerScanLevel_Array
            }

            dataPerSubSearchArray.push( dataPerSubSearch );
        }

        const dataComputed: DataComputed = {
            dataPerSubSearchArray, largest_ScanLevel
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

                for ( const dataPerSubSearchEntry of dataPerSubSearchArray ) {

                    let summaryPerScanLevelData :  DataPerSubSearch_PerScanLevel = undefined;

                    // Find summaryPerScanLevelData for scanLevel for this search
                    for (const summaryPerScanLevelData_ForSearch of dataPerSubSearchEntry.dataPerScanLevel) {
                        if (summaryPerScanLevelData_ForSearch.scanLevel === scanLevel) {
                            summaryPerScanLevelData = summaryPerScanLevelData_ForSearch;
                            break;
                        }
                    }

                    {
                        const perLevel_TotalIonCurrent_DisplayEntry = (
                            <div
                                key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
                                style={style_Value}
                            >
                                { summaryPerScanLevelData.totalIonCurrent.toExponential(3) }
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
                                key={scanLevel + "_" + dataPerSubSearchEntry.searchSubGroup_Id}
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
}

class DataPerSubSearch {

    searchSubGroup_Id: number
    subgroupName_Display: string

    scanCount_PSM_MeetsCutoff: number
    totalIonCurrent_ForSearch: number
    totalScanCount_AtHighestLevelNumber: number

    dataPerScanLevel: Array<DataPerSubSearch_PerScanLevel>
}

class DataPerSubSearch_PerScanLevel {

    scanLevel: number
    scanCount: number
    totalIonCurrent: number
}
