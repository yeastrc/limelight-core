/**
 * qcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer.tsx
 *
 * QC Page Single Search : PSM Count VS PSM Annotation Score Statistics - Overlay Container
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {QcViewPage_SingleSearch__SubSearches__PSM_Target_VS_Decoy_SplitViolin_ByAnnScore_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__plots/jsx/qcViewPage_SingleSearch__SubSearches__PSM_Target_VS_Decoy_SplitViolin_ByAnnScore_StatisticsPlot";

////////

const _Overlay_Title = "QC Plot: PSM Counts"

const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export enum QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice {
    NONE = "NONE",
    LOG_10 = "LOG_10",
    NEGATIVE_LOG_10 = "NEGATIVE_LOG_10"
}

/**
 *
 */
export const open_PSMCount_VS_AnnotationScore_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer
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
export interface QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__Component_Params {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    annotationTypeId_Score_X: number
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_State {

    loadingData?: boolean

    searchScanFileData_Entries?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId[]
    searchScanFileData_OnlyOne?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
    searchScanFileData_NoEntries?: boolean
    searchScanFileId_Selection?: number

    annotationTypeId_Score_X?: number
    transform_Score?: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice

    scoreContains_NegativeValues?: boolean // Always populated from this._scoreContains_NegativeValues
    show_Message_CannotShow_Log_For_NegativeValues?: boolean

    forceRerender?: object
}

/**
 *
 */
class QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer extends React.Component< QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_Props, QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    private _X_Score_AnnotationTypeId_Changed_BindThis = this._X_Score_AnnotationTypeId_Changed.bind(this);

    //  Called from child Plot component
    private _score_Contains_NegativeValues_Callback_BindThis = this._score_Contains_NegativeValues_Callback.bind(this);

    private _inputFieldChanged_TimeoutId : number;

    private _select_X_Ref : React.RefObject<HTMLSelectElement>

    private _scoreContains_NegativeValues = false;

    private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_Props) {
        super(props);

        if ( props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._select_X_Ref = React.createRef();

        const annotationTypeId_Score_X = props.params.annotationTypeId_Score_X

        this._scoreContains_NegativeValues = false;

        this.state = {
            loadingData: true,
            annotationTypeId_Score_X,
            transform_Score: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE,
            scoreContains_NegativeValues: this._scoreContains_NegativeValues
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

                if ( ( ! result.searchScanFileData ) || result.searchScanFileData.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename().length == 0 ) {

                    console.log( "( ! result.searchScanFileData ) || result.searchScanFileData.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename().length == 0 )");

                    this.setState({ searchScanFileData_NoEntries: true, loadingData: false });

                    return;
                }

                const searchScanFileData_Entries = result.searchScanFileData.get_SearchScanFileData_PerSearchScanFileId_Array_OrderedBy_Filename()

                const searchScanFileData_FirstEntry = searchScanFileData_Entries[0];
                // const searchScanFileDataId_FirstEntry = searchScanFileData_FirstEntry.searchScanFileId;

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
     *  Called from child Plot component
     *
     * @param score_Contains_NegativeValues
     * @private
     */
    private _score_Contains_NegativeValues_Callback( score_Contains_NegativeValues: boolean ) {

        if ( this._scoreContains_NegativeValues === score_Contains_NegativeValues ) {
            // No change so exit
            return; // EARLY RETURN
        }

        this._scoreContains_NegativeValues = score_Contains_NegativeValues;

        if ( this.state.transform_Score !== QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE ) {
            this.setState({
                show_Message_CannotShow_Log_For_NegativeValues: true,
                transform_Score: QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE
            })
        }

        this.setState({scoreContains_NegativeValues: this._scoreContains_NegativeValues})
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

                                    <div style={ { display: "grid", gridTemplateColumns: "max-content auto" } } >

                                        {/* 2 Column Grid  */}

                                        { ( ! this.state.searchScanFileData_NoEntries ) ? (
                                            <React.Fragment>
                                                <div style={ { marginBottom: 5 } }>
                                                    <span>Scan File: </span>
                                                </div>
                                                <div style={ { marginBottom: 5 } }>
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
                                            </React.Fragment>
                                        ): null }

                                        <div style={ { marginBottom: 5, paddingRight: 10 } }>
                                            Choose score:
                                        </div>
                                        <div style={ { marginBottom: 5 } }>
                                            <select
                                                ref={ this._select_X_Ref }
                                                value={ this.state.annotationTypeId_Score_X }
                                                onChange={ this._X_Score_AnnotationTypeId_Changed_BindThis }
                                            >
                                                { annotationNames_SelectOptionEntries }
                                            </select>
                                        </div>
                                        <div style={ { paddingRight: 10  } }>
                                            Transform score:
                                        </div>
                                        <div>
                                            { this.state.scoreContains_NegativeValues ? (

                                                <span>
                                                    Score contains negative values so no log10 transform allowed
                                                </span>

                                            ) : (

                                                <React.Fragment>
                                                    <span>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_State__TransformScoreChoice"
                                                                checked={
                                                                    this.state.transform_Score ===
                                                                    QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE
                                                                }
                                                                onChange={ event => {
                                                                    window.setTimeout( () => {
                                                                        this.setState({
                                                                            transform_Score:
                                                                            QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NONE
                                                                        });
                                                                    }, 10 );
                                                                }}
                                                            />
                                                            <span>
                                                                No transformation
                                                            </span>
                                                        </label>
                                                    </span>
                                                    <span>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_State__TransformScoreChoice"
                                                                checked={
                                                                    this.state.transform_Score ===
                                                                    QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10
                                                                }
                                                                onChange={ event => {
                                                                    window.setTimeout( () => {
                                                                        this.setState({
                                                                            transform_Score:
                                                                            QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.LOG_10
                                                                        });
                                                                    }, 10 );
                                                                }}
                                                            />
                                                            <span>
                                                                Log10
                                                            </span>
                                                        </label>
                                                    </span>
                                                    <span>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer_State__TransformScoreChoice"
                                                                checked={
                                                                    this.state.transform_Score ===
                                                                    QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10
                                                                }
                                                                onChange={ event => {
                                                                    window.setTimeout( () => {
                                                                        this.setState({
                                                                            transform_Score:
                                                                            QcViewPage_SingleSearch__PSMCount_VS_AnnotationScore_OverlayContainer__TransformScoreChoice.NEGATIVE_LOG_10
                                                                        });
                                                                    }, 10 );
                                                                }}
                                                            />
                                                            <span>
                                                                -Log10
                                                            </span>
                                                        </label>
                                                    </span>
                                                </React.Fragment>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div style={ { height: "100%", position: "relative" } }>
                                    <QcViewPage_SingleSearch__PSMCount__VS_AnnotationScore_StatisticsPlot
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }
                                        searchScanFileId_Selection={ this.state.searchScanFileId_Selection }
                                        annotationTypeId_Score_X={ this.state.annotationTypeId_Score_X }
                                        transform_Score={ this.state.transform_Score }
                                        score_Contains_NegativeValues_Callback={ this._score_Contains_NegativeValues_Callback_BindThis }
                                        isInSingleChartOverlay={ true }
                                    />
                                    { this.state.show_Message_CannotShow_Log_For_NegativeValues ? (

                                        <div
                                            className=" create--update--chart--msg--cover-overlay "
                                        >
                                            <div>
                                                <div>
                                                    The score chosen contains negative values so unable to transform the values using log10.
                                                </div>
                                                <div>
                                                    The transform has been removed.
                                                </div>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={ event => {
                                                        this.setState({ show_Message_CannotShow_Log_For_NegativeValues: false })
                                                    }}
                                                >
                                                    Continue
                                                </button>
                                            </div>
                                        </div>

                                    ) : null }
                                </div>
                            </div>
                        )}
                    </div>
                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }


}
