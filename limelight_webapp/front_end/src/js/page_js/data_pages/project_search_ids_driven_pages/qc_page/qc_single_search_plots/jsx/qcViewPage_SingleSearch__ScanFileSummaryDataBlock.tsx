/**
 * qcViewPage_SingleSearch__ScanFileSummaryDataBlock.tsx
 *
 * QC Page Single Search : Scan File Summary Data Block
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import {qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";

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
    showUpdatingMessage?: boolean
}

class ScanNumbersCount_For_FilteredPSMs {
    scanNumbersCount_For_FilteredPSMs: number
}

/**
 *
 */
export class QcViewPage_SingleSearch__ScanFileSummaryDataBlock extends React.Component< QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props, QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State > {

    //  bind to 'this' for passing as parameters


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

        const searchScanFileId = this.props.searchScanFileId_Selected;

        const promise =
            this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
            qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileSummaryPerLevelData({ searchScanFileId });

        promise.catch( reason => {

        })
        promise.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch => {

            if ( searchScanFileId !== this.props.searchScanFileId_Selected ) {

                //  Data NOT loaded for currently selected searchScanFileId_Selected so SKIP - USER Likely changed selection while data was loading

                return; // EARLY RETURN
            }

            this.setState((prevState: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State>, props: Readonly<QcViewPage_SingleSearch__ScanFileSummaryDataBlock_Props>) : QcViewPage_SingleSearch__ScanFileSummaryDataBlock_State =>  {

                if ( prevState.showUpdatingMessage ) {
                    return { showUpdatingMessage: false };
                }
                return null;
            });

            this.setState({ scanFile_SummaryPerLevelData_Root: qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root });

            this._compute_ScanCount_ForFilteredPSMs({ qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch });
        })

    }

    /**
     *
     */
    private _compute_ScanCount_ForFilteredPSMs (
        {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        } : {
            qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) {

        const psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const peptideDistinct_Array =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

        const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
            qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                projectSearchId,
                peptideDistinct_Array,
                qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root: psmTblData
            });

        const psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

        const scanNumbers : Set<number> = new Set()

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

            if ( searchScanFileId !== this.props.searchScanFileId_Selected ) {

                // PSM NOT for selected searchScanFileId_Selected
                continue;  // EARLY CONTINUE
            }

            scanNumbers.add( scanNumber );
        }

        const scanNumbersCount_For_FilteredPSMs: ScanNumbersCount_For_FilteredPSMs = {
            scanNumbersCount_For_FilteredPSMs: scanNumbers.size
        };

        this.setState({ scanNumbersCount_For_FilteredPSMs });
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

                    if ( summaryPerLevelData_Array_Counter === summaryPerLevelData_Array_Length ) {
                        style_Label.paddingBottom = 14;
                        style_Value.paddingBottom = 14;
                    }

                    const perLevel_TotalIonCurrent_DisplayEntry = (
                        <React.Fragment key={ summaryPerLevelData.scanLevel }>
                            <div style={ style_Label }>
                                Total MS{ summaryPerLevelData.scanLevel } Ion Current:
                            </div>
                            <div style={ style_Value }>
                                { summaryPerLevelData.totalIonCurrent.toExponential( 3 ) }
                            </div>
                        </React.Fragment>
                    )
                    perLevel_TotalIonCurrent_DisplayEntries.push( perLevel_TotalIonCurrent_DisplayEntry );

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
                        <div  style={ { paddingBottom: paddingBottom } }>
                            Scans with a <br/>PSM meeting filters
                        </div>
                        <div style={ { textAlign: "right", paddingBottom: paddingBottom } }>
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

        return (
            <div >
                <h3>
                    Scan File Statistics
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
