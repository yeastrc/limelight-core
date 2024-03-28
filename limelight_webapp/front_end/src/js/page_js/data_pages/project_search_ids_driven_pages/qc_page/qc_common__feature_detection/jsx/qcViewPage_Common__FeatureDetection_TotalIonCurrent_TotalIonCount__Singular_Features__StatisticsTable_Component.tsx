/**
 * qcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component.tsx
 * 
 * QC Page Common : Feature Detection: Total Ion Current AND Total Ion Count Statistics Table
 *
 * Displays data for a Single Search
 *
 * Used by Single Search, Multiple Searches
 *
 */


import React from "react";

import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { QcPage_UpdatingData_BlockCover } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import { qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_filter/qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { qcPage_StandardChartLayout_StandardWidth } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_utils/qcPage_StandardChartLayout";
import { QcPage_ChartBorder } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_ChartBorder";
import { ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry } from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {
    CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder,
    CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import { QcViewPage_Common__FeatureDetection__DataToPlot_Parameters } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
    CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";


/**
 *
 */
export interface QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_Props {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    dataToPlot: QcViewPage_Common__FeatureDetection__DataToPlot_Parameters
}

/**
 *
 */
interface QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_State {

    //  Update 'shouldComponentUpdate' and 'componentDidUpdate' if change

    showCreatingMessage?: boolean
    showUpdatingMessage?: boolean
    show_NoData_Message?: boolean

    displayTableContents?: DisplayTableContents
}

/**
 *
 */
export class QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component
    extends React.Component< QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_Props, QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_State >
    implements QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface
{

    //  bind to 'this' for passing as parameters

    private _renderChart: boolean = true;

    private _render_SearchBased_Parts = false

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    private _qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel: QcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface

    private _componentMounted = false;

    /**
     *
     */
    constructor(props: QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_Props) {
        super(props);

        const classObject_This = this;

        // if ( ! ( props.dataToPlot.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) ) {
        //
        //     // No Data for chart so NOT render it
        //
        //     const msg = "No Data for Chart";
        //     console.warn(msg);
        //     throw Error(msg)
        //
        //     this._renderChart = false;
        //
        // } else {
        //
        //     const qcPage_Flags_SingleSearch_ForProjectSearchId = props.dataToPlot.qcPage_Flags_SingleSearch_ForProjectSearchId
        //     if ( qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
        //
        //     } else {
        //         const msg = "Not true. qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData "
        //         console.warn(msg);
        //         throw Error(msg)
        //     }
        // }

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

            //  Property in props is passed when have one or more searches.

            this._render_SearchBased_Parts = true
        }

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

            //  Initialize to current passed value
            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback =
                props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

            props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.register( { callbackItem: this } )
        }

        /////

        this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel = {
            set_Current_QcViewPage__Track_LatestUpdates_For_UserInput(item: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput) {
                classObject_This._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel = item;
                classObject_This.setState({ showUpdatingMessage: true });
            }
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel =
            props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel

        props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.register({
            callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
        })

        this.state = {
            showCreatingMessage: true,
            showUpdatingMessage: false
        };
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

        try {
            this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.un_register({
                callbackItem: this._qcViewPage__Track_LatestUpdates_For_UserInput_CentralRegistration_And_Callback_Interface__SectionLevel
            })
        } catch (e) {
            //  Eat Exception
        }

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

            if ( this._renderChart ) {

                window.setTimeout(() => {
                    try {
                        this._populate_DisplayTable();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
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
    shouldComponentUpdate(nextProps: Readonly<QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_Props>, nextState: Readonly<QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_State>, nextContext: any): boolean {

        if (
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || this.props.dataToPlot !== nextProps.dataToPlot
            || this.state.showCreatingMessage !== nextState.showCreatingMessage
            || this.state.showUpdatingMessage !== nextState.showUpdatingMessage
            || this.state.show_NoData_Message !== nextState.show_NoData_Message

            || this.state.displayTableContents !== nextState.displayTableContents
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_Props>, prevState: Readonly<QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_State>, snapshot?: any) {
        try {
            if ( this._renderChart ) {

                if (
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent
                    || this.props.dataToPlot !== prevProps.dataToPlot
                    // || this.state.showCreatingMessage !== prevState.showCreatingMessage  //  ALWAYS remove check of state properties in 'componentDidUpdate'
                    // || this.state.showUpdatingMessage !== prevState.showUpdatingMessage  // Always remove state property checks in 'componentDidUpdate'
                ) {
                } else {
                    //  Nothing changed so return

                    return;  // EARLY RETURN
                }

                if (
                    (
                        ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                        )
                    )
                    || (
                        ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                        )
                    )
                ) {
                    //  Skip these params since they are not the "Latest"
                    return; // EARLY RETURN
                }

                this.setState({ showUpdatingMessage: true });

                window.setTimeout(() => {
                    try {
                        if (
                            (
                                ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                                )
                            )
                            || (
                                ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                                    this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                                )
                            )
                        ) {
                            //  Skip these params since they are not the "Latest"
                            return; // EARLY RETURN
                        }

                        this._populate_DisplayTable();

                    } catch (e) {
                        console.warn("Exception caught in componentDidMount inside setTimeout");
                        console.warn(e);
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                }, 10);
            }
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
    private _populate_DisplayTable() {

        if ( ! this._componentMounted ) {
            //  Component no longer mounted so exit
            return; // EARLY RETURN
        }

        if ( ! this.props.dataToPlot ) {
            throw Error(" ( ! this.props.dataToPlot ) ")
        }

        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = this.props.dataToPlot.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        const searchScanFileId_EntriesFor_projectScanFileId_Set = this.props.dataToPlot.searchScanFileId_EntriesFor_projectScanFileId_Set

        const commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = this.props.dataToPlot.commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

        const featureDetection_SingularFeature_Entries_Holder = this.props.dataToPlot.featureDetection_SingularFeature_Entries_Holder
        const featureDetection_PersistentFeature_Entries_Holder = this.props.dataToPlot.featureDetection_PersistentFeature_Entries_Holder
        const featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = this.props.dataToPlot.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder

        this._populateChart__Actual({
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            searchScanFileId_EntriesFor_projectScanFileId_Set,
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
            featureDetection_SingularFeature_Entries_Holder,
            featureDetection_PersistentFeature_Entries_Holder,
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
        });

    }

    /**
     *
     */
    private _populateChart__Actual(
        {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            searchScanFileId_EntriesFor_projectScanFileId_Set,
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,
            featureDetection_SingularFeature_Entries_Holder,
            featureDetection_PersistentFeature_Entries_Holder,
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder
        } : {
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            searchScanFileId_EntriesFor_projectScanFileId_Set: Set<number>
            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder
            featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder
            featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder
            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder
        }
    ) {

        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {
            if (
                (
                    ! this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback
                    )
                )
                || (
                    ! this.props.dataToPlot.qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel.equals(
                        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__PassedViaRegistrationCallback__SectionLevel
                    )
                )
            ) {
                //  Skip these params since they are not the "Latest"
                return; // EARLY RETURN
            }
        }

        let ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = true;

        {  //  First confirm all scans have total ion current and ion injection time

            for ( const dataForSingleScanNumberEntry of commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                if ( dataForSingleScanNumberEntry.totalIonCurrent_ForScan === undefined || dataForSingleScanNumberEntry.totalIonCurrent_ForScan === null ) {

                    console.warn( "No totalIonCurrent_ForScan for scanNumber: " + dataForSingleScanNumberEntry.scanNumber +
                        ", project_scan_file_id: " + this.props.dataToPlot.projectScanFileId );

                    this.setState({ show_NoData_Message: true })

                    //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                    return; // EARLY RETURN
                }

                if ( dataForSingleScanNumberEntry.level === 1 &&
                    ( dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === undefined || dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds === null ) ) {

                    ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = false;
                }
            }
        }

        ////////////

        //    Map PSM Id to it's Peptide Distinct Entry

        let peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId: Map<number, {
            peptideDistinct_Entry: ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
        }> = undefined

        let psmTblData_Filtered: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId[]


        if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) {

            peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId = new Map()

            const projectSearchId = this.props.dataToPlot.projectSearchId;

            //  result.peptideList contains the 'Distinct' peptides as chosen in State object for "Distinct Peptide Includes:"

            const peptideDistinct_Array =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result.peptideList;

            ////////////

            const qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT =
                qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array({
                    projectSearchId, peptideDistinct_Array, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                });

            psmTblData_Filtered = qcPage_DataFromServer_SingleSearch_PsmTblData_Filter_PeptideDistinct_Array_RESULT.psmTblData_Filtered;

            for ( const peptideDistinct_Entry of peptideDistinct_Array ) {

                const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideDistinct_Entry.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );

                if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                    // No data for this projectSearchId so skip
                    continue // EARLY CONTINUE
                }

                for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                    if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                        const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId.reportedPeptideId )
                        if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_For_ReportedPeptideId ) {
                            const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( dataPerReportedPeptideId.reportedPeptideId ) returned NOTHING for dataPerReportedPeptideId.reportedPeptideId " +
                                dataPerReportedPeptideId.reportedPeptideId +
                                ", projectSearchId: " + projectSearchId;
                            console.warn(msg)
                            throw Error(msg)
                        }

                        for ( const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry of psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_For_ReportedPeptideId.get_PsmTblData_Entries_IterableIterator() ) {
                            peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId.set( psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry.psmId, { peptideDistinct_Entry, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry } );
                        }

                    } else if ( dataPerReportedPeptideId.psmIdsSet ) {

                        for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                            const psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_ForPsmId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId);
                            if ( ! psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_ForPsmId ) {
                                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_PsmId(psmId); returned NOTHING for psmId: " + psmId +
                                    ", dataPerReportedPeptideId.reportedPeptideId " +
                                    dataPerReportedPeptideId.reportedPeptideId +
                                    ", projectSearchId: " + projectSearchId;
                                console.warn(msg)
                                throw Error(msg)
                            }
                            peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId.set( psmId, { peptideDistinct_Entry, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry: psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_ForPsmId } );
                        }

                    } else {
                        const msg = "NEITHER SET: dataPerReportedPeptideId.psmIdsSet, dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId. dataPerReportedPeptideId.reportedPeptideId " +
                            dataPerReportedPeptideId.reportedPeptideId +
                            ", projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }
                }
            }
        }

        ////////////

        let found_PSM_NotForDisplayed_ScanFile = false;

        const scans_For_Selected_searchScanFileId_Map_Key_ScanNumber : Map<number,  CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map();

        {  // Populate scans_For_Selected_searchScanFileId_Map_Key_ScanNumber

            for ( const spectralStorage_NO_Peaks_DataEntry of commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.set(spectralStorage_NO_Peaks_DataEntry.scanNumber, spectralStorage_NO_Peaks_DataEntry)
            }
        }

        ////  Create Display Table Data

        const displayTableContents = new DisplayTableContents();

        displayTableContents.found_PSM_NotForDisplayed_ScanFile = found_PSM_NotForDisplayed_ScanFile;

        displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans = ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans;

        //  Collected MS 1 Scans from Spectral Storage
        const ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId: Array<CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = []

        {
            for ( const spectralStorage_NO_Peaks_DataEntry of commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder.scanData.scansArray ) {

                if ( spectralStorage_NO_Peaks_DataEntry.level === 1 ) {
                    //  Level is === 1
                    ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId.push( spectralStorage_NO_Peaks_DataEntry );
                }
            }
        }

        {
            ///  Sum MS 1 Total Ion Current, all MS 1 from Spectral Storage for scan file

            let totalIonCurrent__All_MS_1_Scans = 0;
            let ionCount__All_MS_1_Scans = 0;

            for ( const dataForSingleScanNumberEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {

                let totalIonCurrent = dataForSingleScanNumberEntry.totalIonCurrent_ForScan;

                totalIonCurrent__All_MS_1_Scans += totalIonCurrent;

                if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {

                    // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).

                    let ionsPerSecond = dataForSingleScanNumberEntry.totalIonCurrent_ForScan * dataForSingleScanNumberEntry.ionInjectionTime_InMilliseconds / 1000

                    ionCount__All_MS_1_Scans += ionsPerSecond;
                }
            }

            displayTableContents.totalIonCurrent__All_MS_1_Scans = totalIonCurrent__All_MS_1_Scans;
            displayTableContents.ionCount__All_MS_1_Scans = ionCount__All_MS_1_Scans;
        }

        {
            ///  Create Feature Detection Total Ion Current, all Feature Detection Entries

            const featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber: Map<number, Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>> = new Map()

            for ( const featureDetection_SingleFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

                let featureDetection_SingleFeature_Array_Entry = featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.get( featureDetection_SingleFeature_Entry.ms_1_scan_number );
                if ( ! featureDetection_SingleFeature_Array_Entry ) {
                    featureDetection_SingleFeature_Array_Entry = [];
                    featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.set(featureDetection_SingleFeature_Entry.ms_1_scan_number, featureDetection_SingleFeature_Array_Entry);
                }
                featureDetection_SingleFeature_Array_Entry.push( featureDetection_SingleFeature_Entry );
            }

            //  Only for Debugging:
            let featureDetection_SingleFeature_Entry__intensity_Max = undefined
            let featureDetection_SingleFeature_Entry__intensity_Min = undefined

            //  Sum up values for display table

            let totalIonCurrent__Singular_Predicted_Features = 0;
            let ionCount__Singular_Predicted_Features = 0;

            for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {

                const featureDetection_SingleFeature_Array_Entry = featureDetection_SingleFeature_Array_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
                if ( ! featureDetection_SingleFeature_Array_Entry ) {
                    //  No Feature Detection entries for MS 1 Scan Number

                    //  SKip plot when not found

                } else {
                    //  Yes Feature Detection entries for MS 1 Scan Number

                    let intensitySummed_TotalIonCurrent = 0;

                    let ionsPerSecondSummed = 0; // Ion Count

                    for ( const featureDetection_SingleFeature_Entry of featureDetection_SingleFeature_Array_Entry ) {

                        intensitySummed_TotalIonCurrent += featureDetection_SingleFeature_Entry.intensity;


                        const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity

                        if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {

                            // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).

                            const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000

                            ionsPerSecondSummed += ionsPerSecond;
                        }
                    }

                    totalIonCurrent__Singular_Predicted_Features += intensitySummed_TotalIonCurrent;

                    ionCount__Singular_Predicted_Features += ionsPerSecondSummed;

                    //  Debugging Code

                    if ( featureDetection_SingleFeature_Entry__intensity_Max === undefined ) {
                        featureDetection_SingleFeature_Entry__intensity_Max = intensitySummed_TotalIonCurrent
                        featureDetection_SingleFeature_Entry__intensity_Min = intensitySummed_TotalIonCurrent
                    } else {
                        if ( featureDetection_SingleFeature_Entry__intensity_Min > intensitySummed_TotalIonCurrent ) {
                            featureDetection_SingleFeature_Entry__intensity_Min = intensitySummed_TotalIonCurrent
                        }
                        if ( featureDetection_SingleFeature_Entry__intensity_Max < intensitySummed_TotalIonCurrent ) {
                            featureDetection_SingleFeature_Entry__intensity_Max = intensitySummed_TotalIonCurrent
                        }
                    }
                }
            }

            displayTableContents.totalIonCurrent__Singular_Predicted_Features = totalIonCurrent__Singular_Predicted_Features;
            displayTableContents.ionCount__Singular_Predicted_Features = ionCount__Singular_Predicted_Features;
        }

        //  Get MS 2 Scan Data Incl Scan Number for each PSM ID

        // const ms_2_ScanData_Incl_ScanNumber_Map_Key_PsmId: Map<number, { ms_2_scanData: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber }> = new Map()

        //   Get Psm Id Set for each MS 2 Scan Number

        let psmId_Set__Map_Key_MS_2_ScanNumber: Map<number, Set<number>> = undefined

        if ( psmTblData_Filtered ) {

            ///  Create Feature Detection Total Ion Current,  Feature Detection Entries Filtered on PSMs using MS 2 in Feature Detection entry

            psmId_Set__Map_Key_MS_2_ScanNumber = new Map()

            const ms_2_scanData_For_PSMs_Map_Key_ScanNumber: Map<number, CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_DataForSingleScanNumber> = new Map();

            for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                if ( ! searchScanFileId_EntriesFor_projectScanFileId_Set.has( psmTblData_Filtered_Entry.searchScanFileId ) ) {

                    //  Skip since not for Scan File this Feature Detection is for
                    continue; // EARLY CONTINUE
                }

                //  variable named ms_2_scanData but scan object initially assigned may have scan level > 2

                let ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber );

                if ( ! ms_2_scanData) {
                    const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber ); returned nothing for psmTblData_Filtered_Entry.scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                while ( ms_2_scanData.level > 2 ) {

                    //  ms_2_scanData Not hold scan with MS 2 level scan data so get parent scan until get MS 2 level scan

                    if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                        const msg = "In ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const parentScanNumber = ms_2_scanData.parentScanNumber

                    ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber );
                    if ( ! ms_2_scanData) {
                        const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber ); returned nothing for parentScanNumber: " + parentScanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                    const msg = "After ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                ms_2_scanData_For_PSMs_Map_Key_ScanNumber.set( ms_2_scanData.scanNumber, ms_2_scanData );
            }

            const featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber: Map<number, Map<number, CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>> = new Map()

            for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

                const featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array =  //  All Mapping entries for Singular Id
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.
                    get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeature_Entry.id)

                if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                    for ( const featureDetection_MappingOf_PersistentToSingularFeature_Entry of featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                        const featureDetection_PersistentFeature_Entry =
                            featureDetection_PersistentFeature_Entries_Holder.
                            get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry(featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id)

                        if ( ! featureDetection_PersistentFeature_Entry) {
                            const msg = "featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id ); returned nothing for featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id: " + featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id;
                            console.warn(msg);
                            throw Error(msg);
                        }

                        if ( featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                            const ms_1_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );

                            if ( ! ms_1_scanData) {
                                const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingleFeature_Entry.ms_1_scan_number ); returned nothing for featureDetection_SingleFeature_Entry.ms_1_scan_number: " + featureDetection_SingularFeature_Entry.ms_1_scan_number;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            let foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = false;

                            for ( const ms_2_scan_number_FromFeatureDetection of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                                const ms_2_scanData_For_PSM = ms_2_scanData_For_PSMs_Map_Key_ScanNumber.get( ms_2_scan_number_FromFeatureDetection );

                                if ( ms_2_scanData_For_PSM ) {
                                    //  Scan for PSM from filter found.

                                    foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry = true;
                                    break;

                                }
                            }
                            if ( foundEntry_For_Any_ms_2_in_Array_On_featureDetection_PersistentFeature_Entry ) {

                                //  Save featureDetection_SingleFeature_Entry

                                let featureDetection_SingularFeature_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );
                                if ( ! featureDetection_SingularFeature_Map_Key_SingularFeatureId ) {
                                    featureDetection_SingularFeature_Map_Key_SingularFeatureId = new Map();
                                    featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.set(featureDetection_SingularFeature_Entry.ms_1_scan_number, featureDetection_SingularFeature_Map_Key_SingularFeatureId);
                                }

                                featureDetection_SingularFeature_Map_Key_SingularFeatureId.set( featureDetection_SingularFeature_Entry.id, featureDetection_SingularFeature_Entry);
                            }
                        }
                    }
                }
            }

            let totalIonCurrent__Features_With_PSMs = 0;
            let ionCount__Features_With_PSMs = 0;

            for ( const ms_1_ScanEntry of ms_1_ScanEntries_From_SpectralStorage_FilteredTo_Selected_SearchScanFileId ) {

                const featureDetection_SingularFeature_Map_Key_SingularFeatureId = featureDetection_SingularFeature_Map_Key_SingularFeatureId_Map_Key_MS_1_ScanNumber.get( ms_1_ScanEntry.scanNumber );
                if ( ! featureDetection_SingularFeature_Map_Key_SingularFeatureId ) {
                    //  No Feature Detection entries for MS 1 Scan Number

                    //  SKip  when not found

                } else {
                    //  Yes Feature Detection entries for MS 1 Scan Number

                    let intensitySummed_TotalIonCurrent = 0;

                    let ionsPerSecondSummed = 0;

                    for ( const featureDetection_SingleFeature_Entry of featureDetection_SingularFeature_Map_Key_SingularFeatureId.values() ) {

                        intensitySummed_TotalIonCurrent += featureDetection_SingleFeature_Entry.intensity;

                        if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {

                            const featureDetection_SingleFeature_Entry__intensity = featureDetection_SingleFeature_Entry.intensity

                            // ions per second = total ion current (or intensity of a specific feature) * ion injection time / 1000 (because total ion current is in ions/second and ion injection time is in milliseconds).

                            const ionsPerSecond = featureDetection_SingleFeature_Entry__intensity * ms_1_ScanEntry.ionInjectionTime_InMilliseconds / 1000

                            ionsPerSecondSummed += ionsPerSecond;
                        }
                    }

                    totalIonCurrent__Features_With_PSMs += intensitySummed_TotalIonCurrent;
                    ionCount__Features_With_PSMs += ionsPerSecondSummed;
                }

            }

            displayTableContents.totalIonCurrent__Features_With_PSMs = totalIonCurrent__Features_With_PSMs;
            displayTableContents.ionCount__Features_With_PSMs = ionCount__Features_With_PSMs;
        }

        if ( psmTblData_Filtered ) {

            ///  Populate numberPSMs_with_no_predicted_feature, numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs

            //  Get all MS2 scan numbers for Features

            const ms2_ScanNumbers_For_Features = new Set<number>();

            {
                for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_Holder.get_FeatureDetection_SingularFeature_Entries() ) {

                    const featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array =  //  All Mapping entries for Singular Id
                        featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder.
                        get_FeatureDetection_MappingOf_PersistentToSingularFeature_Entry_FOR_FeatureDetection_SingularFeatureEntry_Id(featureDetection_SingularFeature_Entry.id)

                    if ( featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                        for ( const featureDetection_MappingOf_PersistentToSingularFeature_Entry of featureDetection_MappingOf_PersistentToSingularFeature_Entry_Array ) {

                            const featureDetection_PersistentFeature_Entry =
                                featureDetection_PersistentFeature_Entries_Holder.
                                get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry(featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id)

                            if ( ! featureDetection_PersistentFeature_Entry) {
                                const msg = "featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entry_FOR_Id_PersistentFeature_Entry( featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id ); returned nothing for featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id: " + featureDetection_MappingOf_PersistentToSingularFeature_Entry.featureDetection_PersistentFeatureEntry_Id;
                                console.warn(msg);
                                throw Error(msg);
                            }

                            if ( featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                                const ms_1_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingularFeature_Entry.ms_1_scan_number );

                                if ( ! ms_1_scanData) {
                                    const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( featureDetection_SingleFeature_Entry.ms_1_scan_number ); returned nothing for featureDetection_SingleFeature_Entry.ms_1_scan_number: " + featureDetection_SingularFeature_Entry.ms_1_scan_number;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                for ( const ms_2_scan_number_FromFeatureDetection of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                                    ms2_ScanNumbers_For_Features.add( ms_2_scan_number_FromFeatureDetection );
                                }
                            }
                        }
                    }
                }
            }

            ////////////

            //  compute output values:  numberPSMs_with_no_predicted_feature, numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs

            let totalNumber_PSMs_For_searchScanFileId_For_searchScanFileEntry__featureDetection_Root_Entry = 0;

            let numberPSMs_with_no_predicted_feature = 0;

            for ( const psmTblData_Filtered_Entry of psmTblData_Filtered ) {

                {
                    if ( ! this.props.dataToPlot.searchScanFileId_EntriesFor_projectScanFileId_Set.has( psmTblData_Filtered_Entry.searchScanFileId ) ) {
                        //  SKIP since PSM searchScanFileId NOT in featureDetection_Root_Entry_Selection.searchScanFileEntries

                        continue;  // EARLY CONTINUE
                    }
                }

                totalNumber_PSMs_For_searchScanFileId_For_searchScanFileEntry__featureDetection_Root_Entry++;  //  Increment Total PSM Count ...

                let ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber );

                if ( ! ms_2_scanData) {
                    const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( psmTblData_Filtered_Entry.scanNumber ); returned nothing for psmTblData_Filtered_Entry.scanNumber: " + psmTblData_Filtered_Entry.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                while ( ms_2_scanData.level > 2 ) {
                    //  Not MS 2 level scan data so get parent scan
                    if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                        const msg = "In ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const parentScanNumber = ms_2_scanData.parentScanNumber

                    ms_2_scanData = scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber );
                    if ( ! ms_2_scanData) {
                        const msg = "scans_For_Selected_searchScanFileId_Map_Key_ScanNumber.get( parentScanNumber ); returned nothing for parentScanNumber: " + parentScanNumber;
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

                if ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ) {
                    const msg = "After ( ms_2_scanData.level > 2 ).  ( ms_2_scanData.parentScanNumber === undefined || ms_2_scanData.parentScanNumber === null ).  ms_2_scanData.scanNumber: " + ms_2_scanData.scanNumber;
                    console.warn(msg);
                    throw Error(msg);
                }

                const ms_2_scanData_scanNumber = ms_2_scanData.scanNumber;

                // ms_2_ScanData_Incl_ScanNumber_Map_Key_PsmId.set( psmTblData_Filtered_Entry.psmId, { ms_2_scanData })

                {
                    let psmId_Set = psmId_Set__Map_Key_MS_2_ScanNumber.get( ms_2_scanData_scanNumber )
                    if ( ! psmId_Set ) {
                        psmId_Set = new Set()
                        psmId_Set__Map_Key_MS_2_ScanNumber.set( ms_2_scanData_scanNumber, psmId_Set )
                    }

                    psmId_Set.add( psmTblData_Filtered_Entry.psmId )
                }

                if ( ! ms2_ScanNumbers_For_Features.has( ms_2_scanData_scanNumber ) ) {

                    numberPSMs_with_no_predicted_feature++;
                }
            }

            displayTableContents.numberPSMs_with_no_predicted_feature = numberPSMs_with_no_predicted_feature;

            {
                let numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs = 0;
                if ( totalNumber_PSMs_For_searchScanFileId_For_searchScanFileEntry__featureDetection_Root_Entry !== 0 ) {
                    numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs =
                        ( displayTableContents.numberPSMs_with_no_predicted_feature / totalNumber_PSMs_For_searchScanFileId_For_searchScanFileEntry__featureDetection_Root_Entry ) * 100;
                }
                displayTableContents.numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs = numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs;
            }
        }

        ////////////

        if ( peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId ) {   //  Compute Percentage of Persistent Features with multiple distinct peptides ("distinct peptide" as specified on page in option: "Distinct Peptide Includes:")

            let persistentFeatures_With_NO_PSMs_Count = 0;
            let persistentFeatures_With_OneDistinctPeptides_Count = 0;

            for ( const featureDetection_PersistentFeature_Entry of featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries() ) {

                const reportedPeptide_CommonValue_EncodedString_All_Set: Set<string> = new Set()

                if ( featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {

                    for ( const ms_2_scanNumber of featureDetection_PersistentFeature_Entry.ms_2_scanNumbers_Array ) {
                        const psmId_Set = psmId_Set__Map_Key_MS_2_ScanNumber.get( ms_2_scanNumber );
                        if ( psmId_Set ) {

                            for ( const psmId of psmId_Set ) {

                                const peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry = peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId.get( psmId );
                                if ( ! peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry ) {
                                    const msg = "peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry_Map_Key_PsmId.get( psmId ); returned NOTHING. psmId: " + psmId;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                reportedPeptide_CommonValue_EncodedString_All_Set.add( peptideDistinct_Entry_psmTblData_For_ReportedPeptideId_For_MainFilters_Holder_Entry.peptideDistinct_Entry.reportedPeptide_CommonValue_EncodedString )
                            }

                        }
                    }
                }

                if ( reportedPeptide_CommonValue_EncodedString_All_Set.size === 0 ) {
                    //  NO Distinct Peptide since no MS 2 scan numbers found in PSM - or no MS 2 records
                    persistentFeatures_With_NO_PSMs_Count++

                } else if ( reportedPeptide_CommonValue_EncodedString_All_Set.size === 1 ) {
                    //  One Distinct Peptide
                    persistentFeatures_With_OneDistinctPeptides_Count++
                } else {
                    var z = 0;
                }
            }

            displayTableContents.persistentFeatures_With_NO_PSMs_Percentage = (
                persistentFeatures_With_NO_PSMs_Count /
                featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries().length
            ) * 100

            displayTableContents.persistentFeatures_With_ONE_DistinctPeptides_Percentage = (
                persistentFeatures_With_OneDistinctPeptides_Count /
                featureDetection_PersistentFeature_Entries_Holder.get_FeatureDetection_PersistentFeature_Entries().length
            ) * 100
        }

        displayTableContents.totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent =
            ( displayTableContents.totalIonCurrent__Features_With_PSMs / displayTableContents.totalIonCurrent__All_MS_1_Scans ) * 100

        if ( ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ) {
            displayTableContents.ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount =
                ( displayTableContents.ionCount__Features_With_PSMs / displayTableContents.ionCount__All_MS_1_Scans ) * 100
        }

        this.setState({ displayTableContents, showCreatingMessage: false, showUpdatingMessage: false })
    }

    /**
     *
     */
    render() {

        if ( ! this._renderChart ) {
            //  Skip render Chart
            return null; // EARLY RETURN
        }

        if ( this.state.show_NoData_Message ) {

            //  EARLY RETURN

            return (
                <div>
                    No Total Ion Current On Each Scan.  Re-import the scan file to re-process to have Total Ion Current for each scan.
                </div>
            )
        }

        if ( this.state.showCreatingMessage ) {

            //  EARLY RETURN

            return (
                <div>
                    Getting Data
                </div>
            )
        }

        const _NumberToExponential = 3;
        const _NumberToFixed = 1;

        const rowLabel_MarginRight = 30;
        const rowData_IonCount_MarginLeft = 20;

        const row_MarginBottom = 5

        return (

            <React.Fragment>

                { ( this.state.displayTableContents ) ? (

                    <div  //  This div is used as container for "Updating" message overlay at bottom of this div

                        style={ { position: "relative", display: "inline-block", minWidth: qcPage_StandardChartLayout_StandardWidth() } }
                    >

                        <QcPage_ChartBorder no_Min_Height={ true }>

                            <div style={ { padding: 15 } }  data-plot-class-name={ this.constructor ? this.constructor.name : "Unknown: No this.constructor" }>

                                <div style={ { display: "grid", gridTemplateColumns: this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? "min-content min-content min-content" : "min-content min-content " }}>
                                    {/*  Header Row */}
                                    <div>
                                    </div>
                                    <div style={ { whiteSpace: "nowrap", marginRight: 10, marginBottom: 10 } }>
                                        Total Ion Current
                                    </div>
                                    { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
                                        <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
                                            Ion Count
                                        </div>
                                    ) : null }
                                    {/*  Data Rows */}

                                    <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
                                        All MS1

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={
                                                <span>
                                                    Total MS1 ion current in scan file.
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div style={ { whiteSpace: "nowrap" } }>
                                        { this.state.displayTableContents.totalIonCurrent__All_MS_1_Scans.toExponential( _NumberToExponential ) }
                                    </div>
                                    { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
                                        <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
                                            { this.state.displayTableContents.ionCount__All_MS_1_Scans.toExponential( _NumberToExponential ) }
                                        </div>
                                    ) : null }

                                    <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
                                        Predicted Features

                                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                            title={
                                                <span>
                                                    Total MS1 ion current for predicted features.
                                                </span>
                                            }
                                        />
                                    </div>
                                    <div style={ { whiteSpace: "nowrap" } }>
                                        { this.state.displayTableContents.totalIonCurrent__Singular_Predicted_Features.toExponential( _NumberToExponential ) }
                                    </div>

                                    { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
                                        <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
                                            { this.state.displayTableContents.ionCount__Singular_Predicted_Features.toExponential( _NumberToExponential ) }
                                        </div>
                                    ) : null }

                                    { this._render_SearchBased_Parts ? (
                                        <>
                                            <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
                                                Features w/ PSMs

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={
                                                        <span>
                                                            Total MS1 ion current for predicted features with at least 1 PSM.
                                                        </span>
                                                    }
                                                />
                                            </div>
                                            <div style={ { whiteSpace: "nowrap" } }>
                                                { this.state.displayTableContents.totalIonCurrent__Features_With_PSMs.toExponential( _NumberToExponential ) }
                                            </div>
                                            { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
                                                <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
                                                    { this.state.displayTableContents.ionCount__Features_With_PSMs.toExponential( _NumberToExponential ) }
                                                </div>
                                            ) : null }

                                            <div style={ { whiteSpace: "nowrap", marginRight: rowLabel_MarginRight, marginBottom: row_MarginBottom } }>
                                                % MS1 w/ PSMs

                                                <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                                                    title={
                                                        <span>
                                                            Fraction of total MS1 ion current represented by a feature with at least 1 PSM.
                                                        </span>
                                                    }
                                                />
                                            </div>
                                            <div style={ { whiteSpace: "nowrap" } }>
                                                { this.state.displayTableContents.totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent.toFixed( _NumberToFixed ) }%
                                            </div>
                                            { this.state.displayTableContents.ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans ? (
                                                <div style={ { whiteSpace: "nowrap", marginLeft: rowData_IonCount_MarginLeft } }>
                                                    { this.state.displayTableContents.ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount.toFixed( _NumberToFixed ) }%
                                                </div>
                                            ) : null }

                                        </>
                                    ) : null }
                                </div>

                                <div>&nbsp;</div>  {/* Blank Line */}


                                { this._render_SearchBased_Parts ? (
                                    <>
                                    <div>
                                        <span># PSMs </span>

                                        { this.state.displayTableContents.found_PSM_NotForDisplayed_ScanFile ? (

                                            <span>
                                                        <span> from </span>

                                                { this.props.dataToPlot.featureDetection_Root_Entry_Selection__ONLY_UsedIn_TableComponent.searchScanFileEntries.map((value, index) => {
                                                    return (
                                                        <React.Fragment key={ value.searchScanFileId }>
                                                            { index !== 0 ? (
                                                                <span>, </span>
                                                            ) : null }
                                                            <span>
                                                                        { value.searchScanFilename }
                                                                    </span>
                                                        </React.Fragment>
                                                    )
                                                }) }
                                                    </span>

                                        ) : null }

                                        <span> with no predicted feature: </span>
                                        <span>{ this.state.displayTableContents.numberPSMs_with_no_predicted_feature.toLocaleString() }</span>
                                        <span> (</span>
                                        <span>{ this.state.displayTableContents.numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs.toFixed( _NumberToFixed ) }</span>
                                        <span>%)</span>
                                    </div>

                                    <div>&nbsp;</div>  {/* Blank Line */}

                                    <div>
                                        <span>% persistent features with no PSMs: </span>
                                        <span>{ this.state.displayTableContents.persistentFeatures_With_NO_PSMs_Percentage.toFixed( _NumberToFixed ) }</span>
                                        <span>%</span>
                                    </div>


                                    <div>
                                        <span>% persistent features with one distinct peptide: </span>
                                        <span>{ this.state.displayTableContents.persistentFeatures_With_ONE_DistinctPeptides_Percentage.toFixed( _NumberToFixed ) }</span>
                                        <span>%</span>
                                    </div>
                                    </>
                                ): null }

                            </div>

                        </QcPage_ChartBorder>

                        {( this.state.showUpdatingMessage ) ? (

                            <QcPage_UpdatingData_BlockCover/>
                        ) : null }
                    </div>

                ) : null }
            </React.Fragment>
        );
    }


}


// Internal class

class DisplayTableContents {

    found_PSM_NotForDisplayed_ScanFile: boolean

    scanFileNames: Array<string>

    totalIonCurrent__All_MS_1_Scans: number
    totalIonCurrent__Singular_Predicted_Features: number
    totalIonCurrent__Features_With_PSMs: number
    totalIonCurrent__Features_With_PSMs_Percentage_Of_MS1_TotalIonCurrent: number

    ionCount__All_MS_1_Scans: number
    ionCount__Singular_Predicted_Features: number
    ionCount__Features_With_PSMs: number
    ionCount__Features_With_PSMs_Percentage_Of_MS1_IonCount: number

    ionInjectionTime_InMilliseconds_On_ALL_MS_1_Scans: boolean

    //  Displayed under the table instead of in it

    numberPSMs_with_no_predicted_feature: number
    numberPSMs_with_no_predicted_feature_PercentageOfTotalNumberPSMs: number

    persistentFeatures_With_NO_PSMs_Percentage: number
    persistentFeatures_With_ONE_DistinctPeptides_Percentage: number
}
