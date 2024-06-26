/**
 * qc_MultipleSearches_FeatureDetection_Statistics_Section.tsx
 *
 * QC Page Multiple Searches - Section - Feature Detection Statistics
 *
 */

import React from "react";
import { QcViewPage_CommonData_To_AllComponents_From_MainComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import { CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import {
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import {
    open_QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_Callback,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_CallbackParams,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import { QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import { QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component";
import { QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component";
import { QcViewPage_Common__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_MainPageContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer";
import { QcViewPage_Common__FeatureDetection_IonCount_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_IonCount_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer";
import { QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer";
import { QcViewPage_Common__FeatureDetection__DataToPlot_Parameters } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/js/qcViewPage_Common__FeatureDetection__DataToPlot_Parameters";
import { CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";
import { CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";

/**
 *
 */
export interface Qc_MultipleSearches_FeatureDetection_Statistics_Section_Props {

    //  Update shouldComponentUpdate

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent: QcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
}

/**
 *
 */
interface Qc_MultipleSearches_FeatureDetection_Statistics_Section_State {

    //  Update shouldComponentUpdate

    sectionExpanded?: boolean
    show_LoadingData_Message?: boolean

    // showUpdatingMessage?: boolean
    show_NoData_Message?: boolean

    statisticsTable_DataToPlot?: QcViewPage_Common__FeatureDetection__DataToPlot_Parameters

    force_Rerender?: object
}

/**
 *
 */
class INTERNAL__FeatureDetectionEntry_And_ProjectSearchId {

    featureDetection_Root_Entry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
    projectSearchId: number
}

/**
 *
 */
export class Qc_MultipleSearches_FeatureDetection_Statistics_Section extends React.Component< Qc_MultipleSearches_FeatureDetection_Statistics_Section_Props, Qc_MultipleSearches_FeatureDetection_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);
    private _callback__FeatureDetectionEntryClickedForChange_BindThis = this._callback__FeatureDetectionEntryClickedForChange.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;

    private _featureDetection_Root_SelectionEntriesArray: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry>

    private _featureDetectionEntry_And_ProjectSearchId_ALL: Array<INTERNAL__FeatureDetectionEntry_And_ProjectSearchId>
    private _selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly: INTERNAL__FeatureDetectionEntry_And_ProjectSearchId

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback

    /**
     *
     */
    constructor(props: Qc_MultipleSearches_FeatureDetection_Statistics_Section_Props) {
        super(props);

        if (props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length === 1) {
            const msg = "ONLY valid for more than 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback()

        let show_NoData_Message = true;

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.projectSearchIds ) {

            const common_Flags_SingleSearch_ForProjectSearchId =
                this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.
                qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId )
            if ( ! common_Flags_SingleSearch_ForProjectSearchId ) {
                const msg = "Returned NOTHING: this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId( projectSearchId ): projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            if ( common_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
                show_NoData_Message = false;
                break;
            }
        }

        this.state =  {sectionExpanded: this._sectionExpanded, show_LoadingData_Message: true, show_NoData_Message };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_MultipleSearches_FeatureDetection_Statistics_Section_Props>, nextState: Readonly<Qc_MultipleSearches_FeatureDetection_Statistics_Section_State>, nextContext: any): boolean {

        if ( nextState.sectionExpanded !== this.state.sectionExpanded ) {
            return true;
        }
        if ( ! nextState.sectionExpanded ) {
            return false;
        }

        if ( nextProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || nextProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
            || nextState.sectionExpanded !== this.state.sectionExpanded
            || nextState.show_LoadingData_Message !== this.state.show_LoadingData_Message
            // || nextState.showUpdatingMessage !== this.state.showUpdatingMessage
            || nextState.show_NoData_Message !== this.state.show_NoData_Message
            || nextState.statisticsTable_DataToPlot !== this.state.statisticsTable_DataToPlot
            || nextState.force_Rerender !== this.state.force_Rerender
        ) {
            return true;
        }

        return false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<Qc_MultipleSearches_FeatureDetection_Statistics_Section_Props>, prevState: Readonly<Qc_MultipleSearches_FeatureDetection_Statistics_Section_State>, snapshot?: any) {

        if (
            prevProps.qcViewPage_CommonData_To_AllComponents_From_MainComponent !== this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent
            || prevProps.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent !== this.props.qcViewPage_CommonData_To_All_MultipleSearches_Components_From_MainMultipleSearchesComponent
            || prevState.sectionExpanded !== this.state.sectionExpanded
        ) {
        } else {
            return; // No changes need to be processed
        }

        //   Need to do something here if start processing the props values affected by the filters in this component
    }

    /**
     *
     */
    private _sectionHeaderRowClicked( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( limelight__IsTextSelected() ) {
                //  Found a Selection so exit with no further action
                return; //  EARLY RETURN
            }

            this._sectionExpanded_Toggle();  // Ignore returned Promise<void>

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

            this.setState({ show_LoadingData_Message: true });

            let featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder> = new Map()

            let promises: Array<Promise<void>> = [];

            for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                    get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
                }

                const get_FeatureDetection_Root_EntriesHolder_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries().get_FeatureDetection_Root_EntriesHolder();

                if ( get_FeatureDetection_Root_EntriesHolder_Result.data ) {

                    featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId.set(projectSearchId, get_FeatureDetection_Root_EntriesHolder_Result.data.featureDetection_Root_Entries_Holder );
                } else if ( get_FeatureDetection_Root_EntriesHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_FeatureDetection_Root_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                        get_FeatureDetection_Root_EntriesHolder_Result.promise.then(value => { try {
                            featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId.set(projectSearchId, value.featureDetection_Root_Entries_Holder );
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("No value for get_FeatureDetection_Root_EntriesHolder_Result data or promise");
                }
            }

            if ( promises.length === 0 ) {

                this._process_FeatureDetectionEntriesForSearches({ featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId });

            } else {

                const promisesAll = Promise.all(promises);

                promisesAll.catch(reason => {

                })

                promisesAll.then(noValue => { try {
                    this._process_FeatureDetectionEntriesForSearches({ featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId });

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }

            this._sectionEverExpanded = true;
        }

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    /**
     *
     */
    private _process_FeatureDetectionEntriesForSearches(
        {
            featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId
        } : {
            featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder>
        }
    ) : void {

        let show_NoData_Message = true;

        let featureDetection_Root_FirstEntry : CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry = undefined
        let projectSearchId_For_FeatureDetectFirstEntry: number = undefined

        const featureDetectionEntry_And_ProjectSearchId_ALL: Array<INTERNAL__FeatureDetectionEntry_And_ProjectSearchId> = []
        const featureDetection_Root_SelectionEntriesArray: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry> = []

        for ( const projectSearchId of this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds ) {

            const featureDetection_Root_Entries_Holder = featureDetection_Root_Entries_Holder_Map_Key_ProjectSearchId.get( projectSearchId );

            if ( ! featureDetection_Root_Entries_Holder ) {
                //  No entry
                continue; // EARLY CONTINUE

            }

            const featureDetection_Root_Entries = featureDetection_Root_Entries_Holder.get_FeatureDetection_Root_Entries();

            if ( featureDetection_Root_Entries.length > 0 ) {
                //  Have Entries

                show_NoData_Message = false

                //  Put in this Array first since sort all the entries for each search
                const featureDetection_Root_SelectionEntriesArray__ForSingleSearch: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry> = []

                for ( const featureDetection_Root_Entry of featureDetection_Root_Entries ) {

                    const featureDetectionEntry_And_ProjectSearchId_Entry: INTERNAL__FeatureDetectionEntry_And_ProjectSearchId = {
                        projectSearchId, featureDetection_Root_Entry
                    }
                    featureDetectionEntry_And_ProjectSearchId_ALL.push( featureDetectionEntry_And_ProjectSearchId_Entry )

                    ///
                    let currentlySelected = false

                    if ( featureDetection_Root_FirstEntry === undefined ) {
                        //  First entry not set so set it
                        featureDetection_Root_FirstEntry = featureDetection_Root_Entries[0]
                        projectSearchId_For_FeatureDetectFirstEntry = projectSearchId

                        currentlySelected = true
                    }

                    ////

                    let searchNameIdEtc: string

                    if ( this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length > 1 ) {

                        const searchData =
                            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.
                            get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId( projectSearchId )

                        let searchShortName = "";
                        if ( searchData.searchShortName ) {
                            searchShortName = " (" + searchData.searchShortName + ")";
                        }

                        searchNameIdEtc = searchData.name + searchShortName + " (" + searchData.searchId + ")"
                    }

                    let scanFilenames: string

                    {
                        const scanFilenamesArray: Array<string> = []
                        for ( const searchScanFileEntry of featureDetection_Root_Entry.searchScanFileEntries ) {
                            scanFilenamesArray.push( searchScanFileEntry.searchScanFilename )
                        }
                        scanFilenamesArray.sort( (a,b) => {
                            return a.localeCompare(b)
                        })

                        scanFilenames = scanFilenamesArray.join( ", " )
                    }

                    const selectionEntry : QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry = {
                        currentlySelected,
                        feature_detection_root__project_scnfl_mapping_tbl__id: featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id,
                        featureDetection_Label: featureDetection_Root_Entry.displayLabel,
                        featureDetection_Description: featureDetection_Root_Entry.description,
                        scanFilenames,
                        searchNameIdEtc,
                        projectSearchId
                    }

                    featureDetection_Root_SelectionEntriesArray__ForSingleSearch.push( selectionEntry )
                }

                //  Sort entries for Single Search
                featureDetection_Root_SelectionEntriesArray__ForSingleSearch.sort( (a,b) => {
                    const scanFilenamesCompare = a.scanFilenames.localeCompare(b.scanFilenames);
                    if ( scanFilenamesCompare !== 0 ) {
                        return scanFilenamesCompare;
                    }
                    return  a.featureDetection_Description.localeCompare(b.featureDetection_Description)
                })

                //  After sort, Copy entries for Single Search to main Array

                for ( const selectionEntry of featureDetection_Root_SelectionEntriesArray__ForSingleSearch ) {
                    featureDetection_Root_SelectionEntriesArray.push( selectionEntry )
                }
            }
        }

        this._featureDetectionEntry_And_ProjectSearchId_ALL = featureDetectionEntry_And_ProjectSearchId_ALL;

        this._featureDetection_Root_SelectionEntriesArray = featureDetection_Root_SelectionEntriesArray;

        this.setState({
            show_NoData_Message
        });

        if ( ! show_NoData_Message ) {

            this._selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly = {
                featureDetection_Root_Entry: featureDetection_Root_FirstEntry,
                projectSearchId: projectSearchId_For_FeatureDetectFirstEntry
            }

            // this.setState({ showUpdatingMessage: true })

            const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
            })

            window.setTimeout( ()=> { try {

                this._call__GetFeatureDetectionData ({
                    selected_FeatureDetectionEntry_And_ProjectSearchId: {
                        featureDetection_Root_Entry: featureDetection_Root_FirstEntry,
                        projectSearchId: projectSearchId_For_FeatureDetectFirstEntry
                    },
                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
                })

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }})
        }

    }

    /**
     *
     */
    private _call__GetFeatureDetectionData (
        {
            selected_FeatureDetectionEntry_And_ProjectSearchId, qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        } : {
            selected_FeatureDetectionEntry_And_ProjectSearchId: INTERNAL__FeatureDetectionEntry_And_ProjectSearchId
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        }
    ) {
        try {
            const projectSearchId = selected_FeatureDetectionEntry_And_ProjectSearchId.projectSearchId;

            const feature_detection_root__project_scnfl_mapping_tbl__id =
                selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
            }

            let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

            let scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder

            let featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries_Holder
            let featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries_Holder
            let featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder

            let commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder

            const promises: Array<Promise<void>> = [] // Always has at least 1 entry from first promise

            {
                const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch()
                if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    const msg = "get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result NO data or promise"
                    console.warn(msg)
                    throw Error(msg)
                }
            }

            {
                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)

                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    const msg = "Returned NOTHING:  this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId). projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch()

                if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data ) {
                    scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder = get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder;
                } else if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.catch(reason => { reject(reason) })
                        get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.then(value => { try {
                            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder = value.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result no data or promise")
                }
            }

            {
                const get_FeatureDetection_SingleFeature_EntriesHolder_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_ParentObject().get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT().
                    get_commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries().
                    get_FeatureDetection_SingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

                if ( get_FeatureDetection_SingleFeature_EntriesHolder_Result.data ) {
                    featureDetection_SingularFeature_Entries_Holder = get_FeatureDetection_SingleFeature_EntriesHolder_Result.data.featureDetection_SingularFeature_Entries_Holder;
                } else if ( get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                        get_FeatureDetection_SingleFeature_EntriesHolder_Result.promise.then(value => { try {
                            featureDetection_SingularFeature_Entries_Holder = value.featureDetection_SingularFeature_Entries_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_FeatureDetection_SingleFeature_EntriesHolder_Result no data or promise")
                }
            }
            {
                const get_FeatureDetection_PersistentFeature_EntriesHolder_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_ParentObject().get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT().
                    get_commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries().
                    get_FeatureDetection_PersistentFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

                if ( get_FeatureDetection_PersistentFeature_EntriesHolder_Result.data ) {
                    featureDetection_PersistentFeature_Entries_Holder = get_FeatureDetection_PersistentFeature_EntriesHolder_Result.data.featureDetection_PersistentFeature_Entries_Holder;
                } else if ( get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                        get_FeatureDetection_PersistentFeature_EntriesHolder_Result.promise.then(value => { try {
                            featureDetection_PersistentFeature_Entries_Holder = value.featureDetection_PersistentFeature_Entries_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_FeatureDetection_PersistentFeature_EntriesHolder_Result no data or promise")
                }
            }
            {
                const get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_ParentObject().get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT().
                    get_commonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries().
                    get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder({ feature_detection_root__project_scnfl_mapping_tbl__id });

                if ( get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.data ) {
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.data.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder;
                } else if ( get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise.catch(reason => { reject(reason) })
                        get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result.promise.then(value => { try {
                            featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder = value.featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result no data or promise")
                }
            }

            {
                const projectScanFileId = selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.project_scan_file_id

                const get_ScanData_NO_Peaks_DataHolder_Result =
                    this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().
                    get_commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data().
                    get_ScanData_NO_Peaks_DataHolder({ projectScanFileId, retrieved_ALL_Scans_ForFile: true, scanNumbers_RetrievedDataFor: undefined, get_ParentScanData: undefined })

                if ( get_ScanData_NO_Peaks_DataHolder_Result.data ) {
                    commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = get_ScanData_NO_Peaks_DataHolder_Result.data.scanData_NO_Peaks_Data_Holder
                } else if ( get_ScanData_NO_Peaks_DataHolder_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_ScanData_NO_Peaks_DataHolder_Result.promise.catch(reason => { reject(reason) })
                        get_ScanData_NO_Peaks_DataHolder_Result.promise.then(value => { try {
                            commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder = value.scanData_NO_Peaks_Data_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise);
                } else {
                    throw Error("get_FeatureDetection_MappingOf_PersistentToSingularFeature_EntriesHolder_Result no data or promise")
                }
            }

            const promisesAll = Promise.all( promises );

            promisesAll.catch( reason => {
                try {
                    // if ( ! this._componentMounted ) {
                    //     //  Component no longer mounted so exit
                    //     return; // EARLY RETURN
                    // }

                    // this.setState({ showUpdatingMessage: false });

                    this.setState({
                        show_LoadingData_Message: false,
                        // showUpdatingMessage: false
                    });

                    // this._selected_FeatureDetectionEntry_And_ProjectSearchId = selected_FeatureDetectionEntry_And_ProjectSearchId

                    console.warn( "promise.catch(...): reason: ", reason );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promisesAll.then( noValue => { try {
                // if ( ! this._componentMounted ) {
                //     //  Component no longer mounted so exit
                //     return; // EARLY RETURN
                // }

                const scanFilenames_Unique_Sorted_Set = new Set<string>()
                for ( const entry of selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.searchScanFileEntries ) {
                    scanFilenames_Unique_Sorted_Set.add( entry.searchScanFilename )
                }
                const scanFilenames_Unique_Sorted_Array = Array.from( scanFilenames_Unique_Sorted_Set )
                scanFilenames_Unique_Sorted_Array.sort()


                const searchScanFileId_EntriesFor_projectScanFileId_Set = new Set<number>()
                {
                    const projectScanFileId = selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.project_scan_file_id

                    const scanFile_ProjectScanFileId_SearchScanFileId_For_ProjectScanFileId = scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_ProjectScanFileId(projectScanFileId)

                    if ( ! scanFile_ProjectScanFileId_SearchScanFileId_For_ProjectScanFileId ) {
                        const msg = "Returned NOTHING:  this.props.dataToPlot.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_ProjectScanFileId(projectScanFileId). projectScanFileId: " + projectScanFileId
                        console.warn(msg)
                        throw Error(msg)
                    }
                    searchScanFileId_EntriesFor_projectScanFileId_Set.add( scanFile_ProjectScanFileId_SearchScanFileId_For_ProjectScanFileId.searchScanFileId )
                }



                const statisticsTable_DataToPlot: QcViewPage_Common__FeatureDetection__DataToPlot_Parameters = {

                    featureDetection_Root_Entry_Selection__ONLY_UsedIn_TableComponent: selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry,

                    feature_detection_root__project_scnfl_mapping_tbl__id: selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id,
                    featureDetection_DisplayLabel: selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.displayLabel,
                    featureDetection_Description: selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.description,
                    scanFilenames_Unique_Sorted_Array,

                    projectScanFileId: selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.project_scan_file_id,
                    searchScanFileId_EntriesFor_projectScanFileId_Set,

                    commonData_LoadedFromServer_From_ProjectScanFileId__ScanData_NO_Peaks_Data_Holder,

                    projectSearchId: selected_FeatureDetectionEntry_And_ProjectSearchId.projectSearchId,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,

                    featureDetection_SingularFeature_Entries_Holder,
                    featureDetection_PersistentFeature_Entries_Holder,
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder,

                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel,
                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel,
                    qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot__Override: undefined
                }

                if (
                    feature_detection_root__project_scnfl_mapping_tbl__id !== selected_FeatureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id
                    || projectSearchId !== selected_FeatureDetectionEntry_And_ProjectSearchId.projectSearchId
                ) {

                    //  Data retrieved feature_detection_root__project_scnfl_mapping_tbl__id is NO Longer the feature_detection_root__project_scnfl_mapping_tbl__id requested to be displayed

                    return;  // EARLY RETURN
                }

                this.setState({
                    show_LoadingData_Message: false,
                    // showUpdatingMessage: false
                });

                this.setState({ statisticsTable_DataToPlot })

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _callback__FeatureDetectionEntryClickedForChange() {

        const selectionChosen_Callback: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_Callback =
            ( params: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_CallbackParams ) : void => {

                let selected_FeatureDetectionEntry_And_ProjectSearchId: INTERNAL__FeatureDetectionEntry_And_ProjectSearchId

                for ( const featureDetectionEntry_And_ProjectSearchId of this._featureDetectionEntry_And_ProjectSearchId_ALL ) {
                    if ( featureDetectionEntry_And_ProjectSearchId.featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id ===
                        params.selectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id
                        && featureDetectionEntry_And_ProjectSearchId.projectSearchId ===
                        params.selectionEntry.projectSearchId
                    ) {
                        selected_FeatureDetectionEntry_And_ProjectSearchId = featureDetectionEntry_And_ProjectSearchId;
                        break;
                    }
                }
                if ( selected_FeatureDetectionEntry_And_ProjectSearchId === undefined ) {
                    const msg = "No entry in this._featureDetectionEntry_And_ProjectSearchId_ALL for featureDetection_Root_Id_Selection: " +
                        params.selectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id +
                        " and projectSearchId: " + params.selectionEntry.projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                this._selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly = selected_FeatureDetectionEntry_And_ProjectSearchId

                // this.setState({ showUpdatingMessage: true })

                const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
                })

                window.setTimeout( ()=> { try {

                    this._call__GetFeatureDetectionData({
                        selected_FeatureDetectionEntry_And_ProjectSearchId,
                        qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
                    })

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }})

                this.setState({ force_Rerender: {} })
            }

        const params: QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params = {

            selectionEntriesArray: this._featureDetection_Root_SelectionEntriesArray,
            selectionChosen_Callback
        }

        open_QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component({ params })
    }

    /**
     *
     */
    render() {

        return (

            <div >
                <div style={ { display: "inline-block" } }
                     onClick={ this._sectionHeaderRowClicked_BindThis }
                >
                    <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                        {/*  2 column grid  */}
                        <div>
                            { ( this.state.sectionExpanded ) ? (
                                <img src="static/images/pointer-down.png" className=" icon-large fake-link-image " />
                            ) : (
                                <img src="static/images/pointer-right.png" className=" icon-large fake-link-image " />
                            )}
                        </div>
                        <div className=" top-level-label clickable " >
                            Feature Detection Statistics
                        </div>
                    </div>  {/* END: 2 column grid  */}
                </div>

                <div className="top-level-label-bottom-border"></div>

                { ( this._sectionEverExpanded ) ? (

                    <div className=" section-content-block " style={ { display: ( ! this.state.sectionExpanded ) ? ( "none" ) : null } }>

                        { ( this.state.show_NoData_Message ) ? (

                            <div style={ { marginBottom: 15 } }>
                                No feature detection data have been created or uploaded for any scan files associated with these data.
                                <br/>
                                <br/>
                                <span>To run the Hardklor and Bullseye feature detection pipeline, go to the </span>
                                <a href={
                                    "d/pg/project/" + this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.currentProjectId_FromDOM
                                }>home page for this project</a>
                                <span>, </span>
                                <span>expand the "<b>View Scan Files</b>" section, and click the "<b>Run Feature Detection</b>"
                                    link next to the scan file(s) from which these search results were derived.</span>
                            </div>

                        ) : ( this.state.show_LoadingData_Message ) ? (

                            <div style={ { marginBottom: 20 } }>
                                Loading Data
                            </div>
                        ) : (

                            <React.Fragment>

                                <div className=" section--chart-container-block ">

                                    <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                        { this._selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly ? (

                                            <QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component
                                                selected_FeatureDetection_Root_Entry={ this._selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly.featureDetection_Root_Entry }
                                                projectSearchId__For__selected_FeatureDetection_Root_Entry={ this._selected_FeatureDetectionEntry_And_ProjectSearchId__For_DisplayAndSelectComponentOnly.projectSearchId }
                                                callback__FeatureDetectionEntryClickedForChange={
                                                    this._featureDetection_Root_SelectionEntriesArray && this._featureDetection_Root_SelectionEntriesArray.length > 1 ?
                                                        this._callback__FeatureDetectionEntryClickedForChange_BindThis : null
                                                }
                                                qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                            />
                                        ) : null }

                                    </div>

                                    { ( this.state.statisticsTable_DataToPlot ) ? (

                                            <React.Fragment>

                                                <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                                    <QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component
                                                        dataToPlot={ this.state.statisticsTable_DataToPlot }
                                                        qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                    />

                                                </div>


                                                <div className=" chart-container-multiple-on-same-row-block ">

                                                    <div className=" chart-container-multiple-on-same-row ">
                                                        <QcViewPage_Common__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_MainPageContainer
                                                            dataToPlot={ this.state.statisticsTable_DataToPlot }
                                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                        />
                                                    </div>

                                                    <div className=" chart-container-multiple-on-same-row ">
                                                        <QcViewPage_Common__FeatureDetection_IonCount_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer
                                                            dataToPlot={ this.state.statisticsTable_DataToPlot }
                                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                        />
                                                    </div>

                                                    <div className=" chart-container-multiple-on-same-row ">
                                                        <QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer
                                                            dataToPlot={ this.state.statisticsTable_DataToPlot }
                                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                                        />

                                                    </div>

                                                    <div className=" chart-container-multiple-on-same-row-stop-float "></div>
                                                </div>

                                                {/*
                                                    Comment out since each child component is now responsible for displaying its own "Updating"
                                                    Children components are called when the section updates via an instance of the callback object at the section level
                                                    */}
                                                {/*{( this.state.showUpdatingMessage ) ? (*/}

                                                {/*    <QcPage_UpdatingData_BlockCover/>*/}
                                                {/*) : null }*/}

                                            </React.Fragment>

                                    ) : null }

                                </div>
                            </React.Fragment>
                        ) }

                    </div>

                ) : null }
            </div>
        );
    }

}

