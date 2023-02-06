/**
 * qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer.tsx
 *
 * QC Page Single Search : MS1 Ion Current - Retention Time vs M/Z Statistics - Overlay Container
 *
 */

import React from "react";

import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {qcPage_ChartOverlayDimensions} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/jsx/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot";
import {QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_plots/js/qcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data";
import {
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

////////////////////////////////

const _Overlay_Title = "QC Plot: MS1 Ion Current:  Retention Time VS m/z  Statistics"


const qcPage_ChartOverlayDimensions_Value = qcPage_ChartOverlayDimensions();

const _Overlay_Width_Min = qcPage_ChartOverlayDimensions_Value.min_Width;
const _Overlay_Width_Max = qcPage_ChartOverlayDimensions_Value.max_Width;

const _Overlay_Height_Min = qcPage_ChartOverlayDimensions_Value.min_Height;
const _Overlay_Height_Max = qcPage_ChartOverlayDimensions_Value.max_Height;

/**
 *
 */
export const open_MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer = function (
    {
        params
    } : {
        params: QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer__Component_Params

    }) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const overlayComponent = (
        <QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer
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
export interface QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer__Component_Params {

    //  Primary Data
    ms1_PeakIntensityBinnedOn_RT_MZ_OverallData : any  // No Type since comes from server from Spectr

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent

    searchScanFileId_Selected: number
    searchScanFileName_Selected: string
    searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds: boolean

    cached_MS1_ChartData__ProjectSearchId: number
    cached_MS1_ChartData_Map_Key_SearchScanFileId: Map<number, QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot__MS1_Data_Root>
}

/**
 *
 */
interface QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_Props {

    params: QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer__Component_Params
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
interface QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_State {

    show_LoadingData_Message?: boolean
    forceRerender?: object

    no_FeatureDetection_Root_Entries?: boolean

    featureDetection_Root_Entries__AllFor_Search?: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry[]
    featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected?: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry[]

    featureDetection_Root_Entry_Selection?: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry

    show_Individual_MS_1_Features?: boolean
    show_Persistent_FeatureBoundaries?: boolean
}

/**
 *
 */
class QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer extends React.Component< QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_Props, QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_State > {

    //  bind to 'this' for passing as parameters

    /**
     *
     */
    constructor(props: QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_Props) {
        super(props);

        if ( props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this.state = {
            show_LoadingData_Message: true,
            show_Individual_MS_1_Features: false,
            show_Persistent_FeatureBoundaries: false
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._load_DataFromServer();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_Props>, prevState: Readonly<QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_OverlayContainer_State>, snapshot?: any) {
        try {
            if ( prevProps.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId !== this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId ) {

                this._load_DataFromServer();

            } else if ( prevProps.params.searchScanFileId_Selected !== this.props.params.searchScanFileId_Selected ) {

                this._update_Filter_featureDetection_Root_Entries__On_Current__searchScanFileId_Selected({
                    featureDetection_Root_Entries__AllFor_Search: this.state.featureDetection_Root_Entries__AllFor_Search
                });
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _load_DataFromServer() {

        //  Load Feature Detection Root Entries

        const projectSearchId = this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
            this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
            get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

        if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
            throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
        }

        let promises: Array<Promise<void>> = [];

        let featureDetection_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder

        const get_FeatureDetection_Root_EntriesHolder_Result =
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries().get_FeatureDetection_Root_EntriesHolder();

        if ( get_FeatureDetection_Root_EntriesHolder_Result.data ) {

            featureDetection_Root_Entries_Holder = get_FeatureDetection_Root_EntriesHolder_Result.data.featureDetection_Root_Entries_Holder;
        } else if ( get_FeatureDetection_Root_EntriesHolder_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_FeatureDetection_Root_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                get_FeatureDetection_Root_EntriesHolder_Result.promise.then(value => { try {
                    featureDetection_Root_Entries_Holder = value.featureDetection_Root_Entries_Holder;
                    resolve()
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise)
        } else {
            throw Error("No value for get_FeatureDetection_Root_EntriesHolder_Result data or promise");
        }

        if ( promises.length === 0 ) {

            this._dataLoadedFromServer({ featureDetection_Root_Entries_Holder });

            return; // EARLY RETURN
        }

        const promisesAll = Promise.all(promises);

        promisesAll.catch(reason => {

        })

        promisesAll.then(noValue => { try {
            this._dataLoadedFromServer({ featureDetection_Root_Entries_Holder });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _dataLoadedFromServer(
        {
            featureDetection_Root_Entries_Holder
        } : {
            featureDetection_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder
        }
    ) : void {

        const featureDetection_Root_Entries = featureDetection_Root_Entries_Holder.get_FeatureDetection_Root_Entries();

        if ( featureDetection_Root_Entries.length === 0 ) {
            //  NO entries
            this.setState({no_FeatureDetection_Root_Entries: true, show_LoadingData_Message: false});

            return; // EARLY RETURN
        }

        const featureDetection_Root_FirstEntry = featureDetection_Root_Entries[0];

        this.setState({
            featureDetection_Root_Entries__AllFor_Search: featureDetection_Root_Entries,
            featureDetection_Root_Entry_Selection: featureDetection_Root_FirstEntry,
            show_LoadingData_Message: false
        });

        this._update_Filter_featureDetection_Root_Entries__On_Current__searchScanFileId_Selected({
            featureDetection_Root_Entries__AllFor_Search: featureDetection_Root_Entries
        })
    }

    /**
     *
     */
    private _update_Filter_featureDetection_Root_Entries__On_Current__searchScanFileId_Selected(
        {
            featureDetection_Root_Entries__AllFor_Search
        } : {
            featureDetection_Root_Entries__AllFor_Search: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry[]
        }
    ) {
        const searchScanFileId_Selected = this.props.params.searchScanFileId_Selected

        const featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry[] = [];

        for ( const featureDetection_Root_Entry of featureDetection_Root_Entries__AllFor_Search ) {
            let found_searchScanFileId_Selected = false;
            for ( const searchScanFileEntry of featureDetection_Root_Entry.searchScanFileEntries ) {
                if ( searchScanFileEntry.searchScanFileId === searchScanFileId_Selected ) {
                    found_searchScanFileId_Selected = true;
                    break;
                }
            }
            if ( found_searchScanFileId_Selected ) {
                featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected.push( featureDetection_Root_Entry );
            }
        }

        this.setState({ featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected });
    }

    /**
     *
     */
    render() {

        let show_Individual_MS_1_Features = false;
        let show_Persistent_FeatureBoundaries = false;

        if ( this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected && this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected.length > 0 ) {
            //  Only copied from state when there are featureDetection_Root_Entries for Current_SearchScanFileId_Selected
            show_Individual_MS_1_Features = this.state.show_Individual_MS_1_Features
            show_Persistent_FeatureBoundaries = this.state.show_Persistent_FeatureBoundaries
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

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { height: "100%" } }
                    >
                        { this.state.show_LoadingData_Message ? (

                            <div>
                                <div style={ { textAlign: "center", fontSize: 18, fontWeight: "bold" } }>
                                    Loading Data
                                </div>
                                <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                                    <Spinner_Limelight_Component/>
                                </div>
                            </div>

                        ) : (

                            <div style={ { height: "100%", display: "grid", gridTemplateRows: "min-content auto" } } >

                                {/*  For any content above the chart  */}
                                <div >
                                    <div>
                                        <span>File: </span>
                                        <span>{ this.props.params.searchScanFileName_Selected }</span>
                                    </div>

                                    <div>

                                        { this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected && this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected.length > 0 ? (
                                            // Have FeatureDetection_Root_Entries

                                            <div>
                                                <div>
                                                    <span>Feature Detection: </span>
                                                    { ( this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected.length === 1 ) ? (
                                                        <span>
                                                            { this.state.featureDetection_Root_Entry_Selection.displayLabel }
                                                        </span>
                                                    ) : (
                                                        <select
                                                            value={ this.state.featureDetection_Root_Entry_Selection.feature_detection_root__project_scnfl_mapping_tbl__id }
                                                            onChange={ event => {
                                                                const feature_detection_root__project_scnfl_mapping_tbl__idString = event.target.value
                                                                const feature_detection_root__project_scnfl_mapping_tbl__id = Number.parseInt( feature_detection_root__project_scnfl_mapping_tbl__idString );
                                                                if ( Number.isNaN( feature_detection_root__project_scnfl_mapping_tbl__id ) ) {
                                                                    const msg = "<select onChange: true ( Number.isNaN( feature_detection_root__project_scnfl_mapping_tbl__id ) ). feature_detection_root__project_scnfl_mapping_tbl__idString: " + feature_detection_root__project_scnfl_mapping_tbl__idString;
                                                                    console.warn(msg);
                                                                    throw Error(msg);
                                                                }

                                                                let featureDetection_Root_Entry_Selection_New: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry

                                                                for ( const featureDetection_Root_Entry of this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected ) {
                                                                    if ( featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id === feature_detection_root__project_scnfl_mapping_tbl__id ) {
                                                                        featureDetection_Root_Entry_Selection_New = featureDetection_Root_Entry;
                                                                        break;
                                                                    }
                                                                }
                                                                if ( featureDetection_Root_Entry_Selection_New === undefined ) {
                                                                    const msg = "No entry in this.state.featureDetection_Root_Entries for feature_detection_root__project_scnfl_mapping_tbl__id: " + feature_detection_root__project_scnfl_mapping_tbl__id;
                                                                    console.warn(msg);
                                                                    throw Error(msg);
                                                                }

                                                                this.setState({ featureDetection_Root_Entry_Selection: featureDetection_Root_Entry_Selection_New })
                                                            }}
                                                        >
                                                            {
                                                                this.state.featureDetection_Root_Entries__AllFor_Current_SearchScanFileId_Selected.map( value => {
                                                                    return (
                                                                        <option
                                                                            key={ value.feature_detection_root__project_scnfl_mapping_tbl__id }
                                                                            value={ value.feature_detection_root__project_scnfl_mapping_tbl__id }
                                                                        >
                                                                            { value.displayLabel }
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={ this.state.show_Persistent_FeatureBoundaries }
                                                            onChange={ event => {
                                                                event.stopPropagation();
                                                                this.setState({ show_Persistent_FeatureBoundaries: event.target.checked })
                                                            }}
                                                        />
                                                        <span>Show persistent feature boundaries</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={ this.state.show_Individual_MS_1_Features }
                                                            onChange={ event => {
                                                                event.stopPropagation();
                                                                this.setState({ show_Individual_MS_1_Features: event.target.checked })
                                                            }}
                                                        />
                                                        <span>Show individual MS1 features</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ): null }
                                    </div>
                                </div>

                                <div style={ { height: "100%" } }>
                                    <QcViewPage_SingleSearch__MS1_Ion_Current_RetentionTime_VS_M_Z_StatisticsPlot
                                        ms1_PeakIntensityBinnedOn_RT_MZ_OverallData={ this.props.params.ms1_PeakIntensityBinnedOn_RT_MZ_OverallData }
                                        searchScanFileId_Selected={ this.props.params.searchScanFileId_Selected }
                                        searchScanFileName_Selected={ this.props.params.searchScanFileName_Selected }
                                        searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds={ this.props.params.searchScanFileId_Selected_IsFrom_Multiple_SearchScanFileIds }
                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.params.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent={ this.props.params.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent }

                                        onlyForOverlay={ {
                                            cached_MS1_ChartData__ProjectSearchId: this.props.params.cached_MS1_ChartData__ProjectSearchId,
                                            cached_MS1_ChartData_Map_Key_SearchScanFileId: this.props.params.cached_MS1_ChartData_Map_Key_SearchScanFileId
                                        } }

                                        featureDetection_Root_Entry_Selection={ this.state.featureDetection_Root_Entry_Selection }
                                        show_Individual_MS_1_Features={ show_Individual_MS_1_Features }
                                        show_Persistent_FeatureBoundaries={ show_Persistent_FeatureBoundaries }

                                        isInSingleChartOverlay={ true }
                                    />
                                </div>
                            </div>

                        ) }

                    </div>
                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
