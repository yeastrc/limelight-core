/**
 * qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer.tsx
 *
 * QC Page Single Search : PSM Count - PSM Annotation Score vs PSM Annotation Score Statistics - Overlay Container
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SearchScanFileData_Data";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";


const _Overlay_Title = "QC Plot: PSM Score Vs Score"

const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export enum QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType {
    CHART_TYPE_2D_DENSITY_PLOT = "CHART_TYPE_2D_DENSITY_PLOT",
    CHART_TYPE_SCATTER_PLOT = "CHART_TYPE_SCATTER_PLOT"
}

const _initial_ChartType = QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT;


/**
 *
 */
export const open_PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer
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
export interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__Component_Params {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    annotationTypeId_Score_X: number
    annotationTypeId_Score_Y: number
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer_State {

    loadingData?: boolean

    searchScanFileData_Entries?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId[]
    searchScanFileData_OnlyOne?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
    searchScanFileData_NoEntries?: boolean
    searchScanFileId_Selection?: number

    annotationTypeId_Score_X?: number
    annotationTypeId_Score_Y?: number

    forceRerender?: object

    chartType?: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType
}

/**
 *
 */
class QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer extends React.Component< QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer_Props, QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    private _X_Score_AnnotationTypeId_Changed_BindThis = this._X_Score_AnnotationTypeId_Changed.bind(this);
    private _Y_Score_AnnotationTypeId_Changed_BindThis = this._Y_Score_AnnotationTypeId_Changed.bind(this);

    private _inputFieldChanged_TimeoutId : number;

    private _select_X_Ref : React.RefObject<HTMLSelectElement>
    private _select_Y_Ref : React.RefObject<HTMLSelectElement>

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer_Props) {
        super(props);

        if ( props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._select_X_Ref = React.createRef();
        this._select_Y_Ref = React.createRef();

        const annotationTypeId_Score_X = props.params.annotationTypeId_Score_X
        const annotationTypeId_Score_Y = props.params.annotationTypeId_Score_Y

        this.state = {
            loadingData: true,
            annotationTypeId_Score_X,
            annotationTypeId_Score_Y,
            chartType: _initial_ChartType
        };
    }

    componentDidMount() {
        try {
            const promise =
                this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                qcPage_DataFromServer_AndDerivedData_SingleSearch.get_SearchScanFileData();

            promise.catch( reason => {

            })
            promise.then( result => {
                const searchScanFileData_Entries = result.searchScanFileData.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename()

                if ( searchScanFileData_Entries.length == 0 ) {

                    console.warn( "( searchScanFileData.length == 0 )");

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
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _X_Score_AnnotationTypeId_Changed() : void {
        try {
            const annotationTypeId_SelectValue_String = this._select_X_Ref.current.value;
            if ( annotationTypeId_SelectValue_String === undefined || annotationTypeId_SelectValue_String === null ) {
                const msg = "_X_Score_AnnotationTypeId_Changed: ( annotationTypeId_SelectValue_String === undefined || annotationTypeId_SelectValue_String === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( annotationTypeId_SelectValue_String === "" ) {
                const msg = '_X_Score_AnnotationTypeId_Changed: ( annotationTypeId_SelectValue_String === "" )';
                console.warn( msg );
                throw Error( msg );
            }

            const annotationTypeId_SelectValue = Number.parseInt( annotationTypeId_SelectValue_String );

            if ( Number.isNaN( annotationTypeId_SelectValue ) ) {
                const msg = "_X_Score_AnnotationTypeId_Changed: ( Number.isNaN( Number.parseInt( annotationTypeId_SelectValue_String ) ) ): annotationTypeId_SelectValue_String: ";
                console.warn( msg, annotationTypeId_SelectValue_String );
                throw Error( msg + annotationTypeId_SelectValue_String );
            }


            if ( this._inputFieldChanged_TimeoutId ) {
                window.clearTimeout( this._inputFieldChanged_TimeoutId );
            }

            this._inputFieldChanged_TimeoutId = window.setTimeout( () => {
                try {
                    this.setState({ annotationTypeId_Score_X: annotationTypeId_SelectValue });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _Y_Score_AnnotationTypeId_Changed() : void {
        try {
            const annotationTypeId_SelectValue_String = this._select_Y_Ref.current.value;
            if ( annotationTypeId_SelectValue_String === undefined || annotationTypeId_SelectValue_String === null ) {
                const msg = "_Y_Score_AnnotationTypeId_Changed: ( annotationTypeId_SelectValue_String === undefined || annotationTypeId_SelectValue_String === null )";
                console.warn( msg );
                throw Error( msg );
            }
            if ( annotationTypeId_SelectValue_String === "" ) {
                const msg = '_Y_Score_AnnotationTypeId_Changed: ( annotationTypeId_SelectValue_String === "" )';
                console.warn( msg );
                throw Error( msg );
            }

            const annotationTypeId_SelectValue = Number.parseInt( annotationTypeId_SelectValue_String );

            if ( Number.isNaN( annotationTypeId_SelectValue ) ) {
                const msg = "_Y_Score_AnnotationTypeId_Changed: ( Number.isNaN( Number.parseInt( annotationTypeId_SelectValue_String ) ) ): annotationTypeId_SelectValue_String: ";
                console.warn( msg, annotationTypeId_SelectValue_String );
                throw Error( msg + annotationTypeId_SelectValue_String );
            }

            window.setTimeout( () => {
                try {
                    this.setState({ annotationTypeId_Score_Y: annotationTypeId_SelectValue });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );
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

        const annotationNames_SelectOptionEntries: Array<JSX.Element> = [];
        {
            const projectSearchId = this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            const dataPageStateManager = this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager;
            const annotationTypeEntries = dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId);
            if ( ! annotationTypeEntries ) {
                const msg = "this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_annotationTypeData_Root().annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const searchProgramsPerSearchEntries = dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get(projectSearchId);
            if ( ! searchProgramsPerSearchEntries ) {
                const msg = "this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchProgramsPerSearchData_Root().searchProgramsPerSearchItems_PerProjectSearchId_Map.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            const selectItems_Array : Array<{
                annotationTypeId: number
                displayName: string
            }> = []

            for ( const psmFilterableAnnotationType of annotationTypeEntries.psmFilterableAnnotationTypes.values() ) {

                const searchProgramsPerSearchEntry = searchProgramsPerSearchEntries.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId );
                if ( ! searchProgramsPerSearchEntry ) {
                    const msg = "searchProgramsPerSearchEntries.searchProgramsPerSearchItem_Map.get( psmFilterableAnnotationType.searchProgramsPerSearchId ); returned nothing for psmFilterableAnnotationType.searchProgramsPerSearchId: " + psmFilterableAnnotationType.searchProgramsPerSearchId + ", projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const displayName = psmFilterableAnnotationType.name + " (" + searchProgramsPerSearchEntry.name + ")";

                const selectItem = {
                    annotationTypeId: psmFilterableAnnotationType.annotationTypeId,
                    displayName
                }

                selectItems_Array.push( selectItem );
            }

            selectItems_Array.sort( (a,b) => {
                return  a.displayName.localeCompare(b.displayName);
            })

            for ( const selectItem of selectItems_Array ) {

                const option = (
                    <option key={ selectItem.annotationTypeId } value={ selectItem.annotationTypeId }>{ selectItem.displayName }</option>
                );
                annotationNames_SelectOptionEntries.push(option);
            }
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
                close_OnBackgroundClick={ true } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12, height: "100%" } }
                        // style={ { padding : 6 } }
                    >

                        { ( this.state.loadingData ) ? (

                            <div style={ { textAlign: "center", marginTop: 40 } }>
                                Loading Data
                            </div>

                        ) : (
                            <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >

                                <div style={ { marginBottom: 5 } }>  {/*  marginBottom is distance to chart */}

                                    <div style={ { marginBottom: 5 } }>
                                        <span>Chart Type: </span>
                                        <label>
                                            <input
                                                type="radio" name="chart_type_score_vs_score" checked={ this.state.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT }
                                                onChange={ event => {
                                                    window.setTimeout( () => {
                                                        this.setState({chartType: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_SCATTER_PLOT});
                                                    }, 10 );
                                                } }
                                            />
                                            <span>Scatter Plot</span>
                                        </label>
                                        <span> </span>
                                        <span> </span>
                                        <label>
                                            <input
                                                type="radio" name="chart_type_score_vs_score" checked={ this.state.chartType === QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT }
                                                onChange={ event => {
                                                    window.setTimeout( () => {
                                                        this.setState({ chartType: QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_OverlayContainer__ChartType.CHART_TYPE_2D_DENSITY_PLOT });
                                                    }, 10 );
                                                } }
                                            />
                                            <span>2D Density Plot</span>
                                        </label>
                                    </div>

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

                                    <div style={ { marginBottom: 5 } }>
                                        <span>X-Axis Score:</span>
                                        <span> </span>
                                        <select
                                            ref={ this._select_X_Ref }
                                            value={ this.state.annotationTypeId_Score_X }
                                            onChange={ this._X_Score_AnnotationTypeId_Changed_BindThis }
                                        >
                                            { annotationNames_SelectOptionEntries }
                                        </select>
                                    </div>
                                    <div style={ { marginBottom: 5 } }>
                                        <span>Y-Axis Score:</span>
                                        <span> </span>
                                        <select
                                            ref={ this._select_Y_Ref }
                                            value={ this.state.annotationTypeId_Score_Y }
                                            onChange={ this._Y_Score_AnnotationTypeId_Changed_BindThis }
                                        >
                                            { annotationNames_SelectOptionEntries }
                                        </select>
                                    </div>
                                </div>
                                <div style={ { height: "100%" } }>
                                    <QcViewPage_SingleSearch__PSMCount__AnnotationScore_VS_AnnotationScore_StatisticsPlot
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        searchScanFileId_Selection={ this.state.searchScanFileId_Selection }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                        annotationTypeId_Score_Y={ this.state.annotationTypeId_Score_Y }
                                        isInSingleChartOverlay={ true }
                                        chartType={ this.state.chartType }
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
