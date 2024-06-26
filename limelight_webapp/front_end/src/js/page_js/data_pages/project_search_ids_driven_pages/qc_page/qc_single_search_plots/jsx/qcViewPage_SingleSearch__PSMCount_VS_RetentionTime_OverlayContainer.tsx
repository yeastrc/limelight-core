/**
 * qcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer.tsx
 *
 * QC Page Single Search : PSM Count VS PSM Annotation Score Statistics - Overlay Container
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount_VS_RetentionTime_StatisticsPlot";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";


const _Overlay_Title = "QC Plot: Retention Time"


const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export const open_PSMCount_VS_RetentionTime_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer
            params={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });
}

/**
 *
 */
export interface QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer__Component_Params {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer_State {

    loadingData?: boolean

    searchScanFileData_Entries?: Array<CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry>
    searchScanFileData_OnlyOne?: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_SingleSearch_SingleScanFile_Entry
    searchScanFileData_NoEntries?: boolean
    searchScanFileId_Selection?: number
}

/**
 *
 */
class QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer extends React.Component< QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer_Props, QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_OverlayContainer_Props) {
        super(props);

        if ( props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state = {
            loadingData: true
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            const promise =
                this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer__Multiple_ProjectSearchIds().
                get_commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId().get_ScanFileDataHolder_ReturnPromise()

            promise.catch( reason => {

            })
            promise.then( result => { try {

                const projectSearchId = this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId
                const scanFileData_Holder_For_ProjectSearchId = result.scanFileData_Holder.get_For_ProjectSearchId( projectSearchId )

                if ( ! scanFileData_Holder_For_ProjectSearchId ) {

                    this.setState({ searchScanFileData_NoEntries: true, loadingData: false });

                    return;
                }

                const searchScanFileData_Entries = scanFileData_Holder_For_ProjectSearchId.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename()

                if ( searchScanFileData_Entries.length == 0 ) {

                    this.setState({ searchScanFileData_NoEntries: true, loadingData: false });

                    return;
                }

                const searchScanFileData_FirstEntry = searchScanFileData_Entries[0];

                this.setState({
                    searchScanFileData_Entries,
                    searchScanFileId_Selection: QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES,
                    loadingData: false
                });

                if ( searchScanFileData_Entries.length == 1 ) {

                    this.setState({ searchScanFileData_OnlyOne: searchScanFileData_FirstEntry });
                }
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        const searchScanFileData_Entries_OptionEntriesJSX: Array<JSX.Element> = []

        if ( ( ! this.state.loadingData ) && ( ! this.state.searchScanFileData_NoEntries ) && ( ! this.state.searchScanFileData_OnlyOne ) ) {

            {  //  Add Entry for "All" files
                const searchScanFileId_Selection__ALL_FILES = QcViewPage_CommonAll_Constants.SEARCH_SCAN_FILE_ID_SELECTION__ALL_FILES;
                const entry = (
                    <option key={ searchScanFileId_Selection__ALL_FILES } value={ searchScanFileId_Selection__ALL_FILES }>All</option>
                );
                searchScanFileData_Entries_OptionEntriesJSX.push( entry );
            }

            for ( const searchScanFileData_Entry of this.state.searchScanFileData_Entries ) {
                const entry = (
                    <option key={ searchScanFileData_Entry.searchScanFileId } value={ searchScanFileData_Entry.searchScanFileId }>{ searchScanFileData_Entry.filename }</option>
                );
                searchScanFileData_Entries_OptionEntriesJSX.push( entry );
            }
        }

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                set_CSS_Position_Fixed={ false }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { height: "100%" } }
                    >

                        { ( this.state.loadingData ) ? (

                            <div style={ { textAlign: "center", marginTop: 40 } }>
                                Loading Data
                            </div>

                        ) : (
                            <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >

                                <div style={ { marginBottom: 5 } }>  {/*  marginBottom is distance to chart */}

                                    { ( ! this.state.searchScanFileData_NoEntries ) ? (
                                        <div style={ { marginBottom: 5 } }>
                                            <span>File: </span>
                                            {( this.state.searchScanFileData_OnlyOne ) ? (
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
                                                        this.setState({ searchScanFileId_Selection });
                                                    }}
                                                >
                                                    {  //  <option> entries
                                                        searchScanFileData_Entries_OptionEntriesJSX
                                                    }
                                                </select>
                                            )}
                                        </div>
                                    ): null }
                                </div>
                                <div style={ { height: "100%" } }>
                                    <QcViewPage_SingleSearch__PSMCount_VS_RetentionTime_StatisticsPlot
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        searchScanFileId_Selection={ this.state.searchScanFileId_Selection }
                                        isInSingleChartOverlay={ true }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
