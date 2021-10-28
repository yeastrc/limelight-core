/**
 * qc_SingleSearch_ScanFile_Statistics_Section.tsx
 *
 * QC Page Single Search - Section - Scan File Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData_Data";
import {QcViewPage_SingleSearch__ScanFileSummaryDataBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanFileSummaryDataBlock";
import {QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_MainPageContainer";
import {QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer";
import {QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer";
import {QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_MainPageContainer";

/**
 *
 */
export interface Qc_SingleSearch_ScanFile_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_ScanFile_Statistics_Section_State {

    sectionExpanded?: boolean
    loadingData?: boolean
    noData?: boolean

    searchScanFileData_Entries?: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId[]
    searchScanFileData_OnlyOne?: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
    searchScanFileId_Selection?: number
    searchScanFileName_Selection?: string
}

/**
 *
 */
export class Qc_SingleSearch_ScanFile_Statistics_Section extends React.Component< Qc_SingleSearch_ScanFile_Statistics_Section_Props, Qc_SingleSearch_ScanFile_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _projectSearchId: number

    /**
     *
     */
    constructor(props: Qc_SingleSearch_ScanFile_Statistics_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._projectSearchId = props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds[0];

        const noData = !  this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData;

        this.state =  {noData, sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_ScanFile_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch_ScanFile_Statistics_Section_State>, nextContext: any): boolean {

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
    private _sectionHeaderRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            try { // In try/catch block in case not supported in browser
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if (selection) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }

            } catch (e) {
                //  Eat exception
                const znothing = 0;
            }

            this._sectionExpanded_Toggle();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _sectionExpanded_Toggle() {

        if ( ! this._sectionEverExpanded ) {

            if ( this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {

                this.setState({ loadingData: true });

                const promise =
                    this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                    qcPage_DataFromServer_AndDerivedData_SingleSearch.get_SearchScanFileData();

                promise.catch( reason => {

                })
                promise.then( result => {
                    const searchScanFileData_Entries = result.searchScanFileData.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename()

                    if ( searchScanFileData_Entries.length == 0 ) {

                        console.warn( "( searchScanFileData.length == 0 )");

                        this.setState({ noData: true, loadingData: false });

                        return;
                    }

                    const searchScanFileData_FirstEntry = searchScanFileData_Entries[0];

                    this.setState({
                        searchScanFileData_Entries,
                        searchScanFileId_Selection: searchScanFileData_FirstEntry.searchScanFileId,
                        searchScanFileName_Selection: searchScanFileData_FirstEntry.filename,
                        loadingData: false
                    });

                    if ( searchScanFileData_Entries.length == 1 ) {

                        this.setState({ searchScanFileData_OnlyOne: searchScanFileData_FirstEntry });
                    }
                })
            }

            this._sectionEverExpanded = true;
        }

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    render() {

        return (

            <div >
                <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }
                     onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    {/*  2 column grid  */}
                    <div>
                        { ( this.state.sectionExpanded ) ? (
                            <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                        ) : (
                            <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                        )}
                    </div>
                    <div className=" top-level-label clickable " >
                        Scan File Statistics
                    </div>
                </div>  {/* END: 2 column grid  */}

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        <div style={ { marginBottom: 20 } } >

                            { ( this.state.noData ) ? (

                                <div >
                                    No Scan Files
                                </div>

                            ) : ( this.state.loadingData ) ? (
                                <div >
                                    Loading scan file data
                                </div>
                            ) : (
                                //  Main Display of Data When have Data and Data is Loaded
                                <div >
                                    <h2>
                                        <span>File: </span>
                                        { ( this.state.searchScanFileData_OnlyOne ) ? (
                                            <span>
                                                { this.state.searchScanFileData_OnlyOne.filename }
                                            </span>
                                        ) : (
                                            <select
                                                value={ this.state.searchScanFileId_Selection }
                                                onChange={ event => {
                                                    const searchScanFileId_SelectionString = event.target.value
                                                    const searchScanFileId_Selection = Number.parseInt( searchScanFileId_SelectionString );
                                                    if ( Number.isNaN( searchScanFileId_Selection ) ) {
                                                        const msg = "<select onChange: true ( Number.isNaN( searchScanFileId_Selection ) ). searchScanFileId_SelectionString: " + searchScanFileId_SelectionString;
                                                        console.warn(msg);
                                                        throw Error(msg);
                                                    }

                                                    let searchScanFileName_Selection = undefined;
                                                    for ( const searchScanFileData_Entry of this.state.searchScanFileData_Entries ) {
                                                        if ( searchScanFileData_Entry.searchScanFileId === searchScanFileId_Selection ) {
                                                            searchScanFileName_Selection = searchScanFileData_Entry.filename;
                                                            break;
                                                        }
                                                    }
                                                    if ( searchScanFileName_Selection === undefined ) {
                                                        const msg = "No entry in this.state.searchScanFileData_Entries for searchScanFileId_Selection: " + searchScanFileId_Selection;
                                                        console.warn(msg);
                                                        throw Error(msg);
                                                    }

                                                    this.setState({ searchScanFileId_Selection, searchScanFileName_Selection })
                                                }}
                                            >
                                                {
                                                    this.state.searchScanFileData_Entries.map( value => {
                                                        return (
                                                            <option key={ value.searchScanFileId } value={ value.searchScanFileId }>{ value.filename }</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        )}
                                    </h2>

                                    <div className=" section--chart-container-block ">

                                        <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                            <QcViewPage_SingleSearch__ScanFileSummaryDataBlock
                                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                                searchScanFileId_Selected={ this.state.searchScanFileId_Selection }
                                            />
                                        </div>

                                        <div className=" chart-container-multiple-on-same-row-block ">

                                            <div className=" chart-container-multiple-on-same-row ">
                                                <QcViewPage_SingleSearch__MS1_Ion_Current_VS_RetentionTime_MainPageContainer
                                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                                    searchScanFileId_Selected={ this.state.searchScanFileId_Selection }
                                                    searchScanFileName_Selected={ this.state.searchScanFileName_Selection }
                                                />
                                            </div>
                                            <div className=" chart-container-multiple-on-same-row ">
                                                <QcViewPage_SingleSearch__MS1_Ion_Current_VS_M_Z_MainPageContainer
                                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                                    searchScanFileId_Selected={ this.state.searchScanFileId_Selection }
                                                    searchScanFileName_Selected={ this.state.searchScanFileName_Selection }
                                                />
                                            </div>
                                            <div className=" chart-container-multiple-on-same-row ">
                                                <QcViewPage_SingleSearch__ScanCount_VS_RetentionTime_MainPageContainer
                                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                                    searchScanFileId_Selected={ this.state.searchScanFileId_Selection }
                                                    searchScanFileName_Selected={ this.state.searchScanFileName_Selection }
                                                />
                                            </div>

                                            <div className=" chart-container-multiple-on-same-row-stop-float "></div>

                                        </div>

                                    </div>
                                </div>
                            ) }
                        </div>
                    </div>

                ) : null }
            </div>
        );
    }

}

