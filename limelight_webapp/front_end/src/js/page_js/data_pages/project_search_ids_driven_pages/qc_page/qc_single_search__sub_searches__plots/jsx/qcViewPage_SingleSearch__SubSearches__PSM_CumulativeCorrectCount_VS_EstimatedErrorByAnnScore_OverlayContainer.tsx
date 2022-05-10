/**
 * qcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer.tsx
 *
 * QC Page Single Search : PSM Cumulative Error vs PSM Rank by Annotation Score Statistics - Overlay Container
 *
 */

import React from "react";

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {QcViewPage_CommonAll_Constants} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_all/qcViewPage_CommonAll_Constants";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import { QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot } from "./qcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot";
import {QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";

////////

const _Overlay_Title = "QC Plot: Est. # Correct vs/ Est. Error By Score"

const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

////////   Number of "Select Score" to render

const _NUMBER_OF_Select_Score_To_Render = 3;


const _NO_AnnotationId_Selected = -1;


/**
 *
 */
export const qcViewPage_SingleSearch__SubSearches__Open_PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer
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
export interface QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer__Component_Params {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent: QcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent

    annotationTypeId_Array: Array<number>
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer_State {

    loadingData?: boolean

    searchScanFileData_Entries?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId[]
    searchScanFileData_OnlyOne?: DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
    searchScanFileData_NoEntries?: boolean
    searchScanFileId_Selection?: number

    annotationTypeIds_ForDisplay_Array?: Array<number>  //  Passed to Sub Component to be displayed

    forceRerender?: object
}

/**
 *
 */
class QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer extends React.Component< QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer_Props, QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    private _annotationTypeIds_ForSelection_Array: Array<number> // Used for <select>

    private _select_AnnotationTypeId_Ref_Array : Array<React.RefObject<HTMLSelectElement>>

     private _renderChart = true;

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_OverlayContainer_Props) {
        super(props);

        if (props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._select_AnnotationTypeId_Ref_Array = []

        for (let index = 0; index < _NUMBER_OF_Select_Score_To_Render; index++) {
            this._select_AnnotationTypeId_Ref_Array[index] = React.createRef();
        }

        //  For <select> in this component
        this._annotationTypeIds_ForSelection_Array = Array.from( props.params.annotationTypeId_Array );

        // Initial value for child component
        const annotationTypeIds_ForDisplay_Array = Array.from( props.params.annotationTypeId_Array );

        this.state = {
            loadingData: true,
            annotationTypeIds_ForDisplay_Array
        };
    }

    componentDidMount() {
        try {
            const promise =
                this.props.params.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.
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

                if ( searchScanFileData_Entries.length === 1 ) {

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
    private _annotationTypeId_Changed({ index } : { index: number }) : void {
        try {
            const annotationTypeId_SelectValue_String = this._select_AnnotationTypeId_Ref_Array[ index ].current.value;
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

            //  Save new value

            this._annotationTypeIds_ForSelection_Array[ index ] = annotationTypeId_SelectValue;

            //  rebuild state object for child component

            const annotationTypeIds_ForDisplay_Array: Array<number> = [];

            for ( const annotationTypeId_ForSelection of this._annotationTypeIds_ForSelection_Array ) {
                if ( annotationTypeId_ForSelection && annotationTypeId_ForSelection !== _NO_AnnotationId_Selected ) {
                    annotationTypeIds_ForDisplay_Array.push( annotationTypeId_ForSelection );
                }
            }

            this.setState({ annotationTypeIds_ForDisplay_Array });

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
        const annotationNames_SelectOptionEntries__Plus_NoEntrySelected: Array<JSX.Element> = [];

        {
            const option = (
                <option key={ _NO_AnnotationId_Selected } value={ _NO_AnnotationId_Selected }>Select a score</option>
            );
            annotationNames_SelectOptionEntries__Plus_NoEntrySelected.push( option );
        }
        {
            const projectSearchId = this.props.params.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent.projectSearchId;

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
                annotationNames_SelectOptionEntries__Plus_NoEntrySelected.push(option);
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

        const selectElements: Array<JSX.Element> = [];

        for (let index = 0; index < _NUMBER_OF_Select_Score_To_Render; index++) {

            let selectionEntries = annotationNames_SelectOptionEntries__Plus_NoEntrySelected

            if ( index < 1 ) {
                selectionEntries = annotationNames_SelectOptionEntries
            }

            let annotationTypeId_ForSelection = this._annotationTypeIds_ForSelection_Array[ index ]

            if ( annotationTypeId_ForSelection === undefined || annotationTypeId_ForSelection === null ) {
                annotationTypeId_ForSelection = _NO_AnnotationId_Selected
            }

            const element = (

                <React.Fragment key={ index }>
                    <div style={ { marginBottom: 5, paddingRight: 10 } }>
                        Choose score:
                    </div>
                    <div style={ { marginBottom: 5 } }>
                        <select
                            ref={ this._select_AnnotationTypeId_Ref_Array[ index ] }
                            value={ annotationTypeId_ForSelection }
                            onChange={ event => {
                                this._annotationTypeId_Changed({ index });
                            } }
                        >
                            { selectionEntries }
                        </select>
                    </div>
                </React.Fragment>
            )

            selectElements.push( element )
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

                                        { selectElements }
                                    </div>
                                </div>
                                <div style={ { height: "100%" } }>
                                    <QcViewPage_SingleSearch__SubSearches__PSM_CumulativeCorrectCount_VS_EstimatedErrorByAnnScore_StatisticsPlot
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch__SubSearches_Components_From_MainSingleSearch__SubSearchesComponent }
                                        searchScanFileId_Selection={ this.state.searchScanFileId_Selection }
                                        annotationTypeId_Array={ this.state.annotationTypeIds_ForDisplay_Array }
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
