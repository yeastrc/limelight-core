/**
 * qc_SingleSearch_FeatureDetection_Statistics_Section.tsx
 *
 * QC Page Single Search - Section - Feature Detection Statistics
 *
 */

import React from "react";
import {QcViewPage_CommonData_To_AllComponents_From_MainComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_main/jsx/qcViewPage_DisplayData__Main_Component";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder,
    CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries";
import {
    open_QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_Params,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_Callback,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionChosen_CallbackParams,
    QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData";
import {DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data";
import { CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_PersistentFeature_Entries";
import { CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_MappingOf_PersistentToSingularFeature_Entries";
import {
    QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component,
    QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_DataToPlot
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component";
import {QcViewPage_Common__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__Plot_Zero_Entries__StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_TotalIonCurrent_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer";
import {QcViewPage_Common__FeatureDetection_IonCount_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_IonCount_VS_RetentionTime__Singular_Features__LineChart__Plot_Zero_Entries__StatisticsPlot_MainPageContainer";
import {QcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__feature_detection/jsx/qcViewPage_Common__FeatureDetection_FeatureCount_VS_FeatureTotalIonCurrent__Singular_Features__StatisticsPlot_MainPageContainer";
import {limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam} from "page_js/common_all_pages/limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam";

/**
 *
 */
export interface Qc_SingleSearch_FeatureDetection_Statistics_Section_Props {

    qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent
    qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent: QcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent
}

/**
 *
 */
interface Qc_SingleSearch_FeatureDetection_Statistics_Section_State {

    sectionExpanded?: boolean
    show_LoadingData_Message?: boolean
    show_NoData_Message?: boolean

    // featureDetection_Root_Entries?: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry[]
    // featureDetection_Root_Entry_Selection?: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry

    statisticsTable_DataToPlot?: QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_DataToPlot

    force_Rerender?: object
}

/**
 *
 */
export class Qc_SingleSearch_FeatureDetection_Statistics_Section extends React.Component< Qc_SingleSearch_FeatureDetection_Statistics_Section_Props, Qc_SingleSearch_FeatureDetection_Statistics_Section_State > {

    //  bind to 'this' for passing as parameters

    private _sectionHeaderRowClicked_BindThis = this._sectionHeaderRowClicked.bind(this);
    private _callback__FeatureDetectionEntryClickedForChange_BindThis = this._callback__FeatureDetectionEntryClickedForChange.bind(this);

    private _sectionExpanded = false;
    private _sectionEverExpanded = false;


    private _featureDetection_Root_SelectionEntriesArray: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry>

    private _featureDetectionEntry_ALL: Array<CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry>
    private _selected_FeatureDetectionEntry__For_DisplayAndSelectComponentOnly: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback

    /**
     *
     */
    constructor(props: Qc_SingleSearch_FeatureDetection_Statistics_Section_Props) {
        super(props);

        if ( props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.projectSearchIds.length !== 1 ) {
            const msg = "ONLY valid for 1 search";
            console.warn(msg);
            throw Error(msg);
        }

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback()

        const noData = !  this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData;

        this.state =  {show_NoData_Message: noData, sectionExpanded: this._sectionExpanded };
    }

    /**
     *
     */
    shouldComponentUpdate(nextProps: Readonly<Qc_SingleSearch_FeatureDetection_Statistics_Section_Props>, nextState: Readonly<Qc_SingleSearch_FeatureDetection_Statistics_Section_State>, nextContext: any): boolean {

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

            if ( limelight__IsTextSelected() ) {
                //  Found a Selection so exit with no further action
                return; //  EARLY RETURN
            }

            this._sectionExpanded_Toggle();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    private _sectionExpanded_Toggle() {

        if ( ! this._sectionEverExpanded ) {

            this.setState({ show_LoadingData_Message: true });

            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
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

                this._process_FeatureDetectionEntriesForSearches({ featureDetection_Root_Entries_Holder });

            } else {

                const promisesAll = Promise.all(promises);

                promisesAll.catch(reason => {

                })

                promisesAll.then(noValue => { try {
                    this._process_FeatureDetectionEntriesForSearches({ featureDetection_Root_Entries_Holder });

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            }

            this._sectionEverExpanded = true;
        }

        this._sectionExpanded = ! this._sectionExpanded;

        this.setState({ sectionExpanded: this._sectionExpanded });
    }

    ////////////////////////////////

    /**
     *
     */
    private _process_FeatureDetectionEntriesForSearches(
        {
            featureDetection_Root_Entries_Holder
        } : {
            featureDetection_Root_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entries_Holder
        }
    ) : void {

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const featureDetection_Root_Entries = featureDetection_Root_Entries_Holder.get_FeatureDetection_Root_Entries();

        if ( featureDetection_Root_Entries.length === 0 ) {
            //  NO entries
            this.setState({show_NoData_Message: true, show_LoadingData_Message: false});
            return; // EARLY RETURN
        }

        //  Initial selection is first entry in array
        const featureDetection_Root_InitialSelection = featureDetection_Root_Entries[0];

        const featureDetection_Root_SelectionEntriesArray: Array<QcViewPage_Common__FeatureDetection_Statistics_Section__SelectFeatureDetectionOverlay_Component__SelectFeatureDetectionOverlay_Component_SelectionEntry> = []

        for ( const featureDetection_Root_Entry of featureDetection_Root_Entries ) {

            let currentlySelected = false
            if ( featureDetection_Root_Entry === featureDetection_Root_InitialSelection ) {
                //  Entry is initially selected entry
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
                    return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a,b)
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

            featureDetection_Root_SelectionEntriesArray.push( selectionEntry )
        }

        featureDetection_Root_SelectionEntriesArray.sort( (a,b) => {
            const scanFilenamesCompare =
                limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.scanFilenames, b.scanFilenames)
            if ( scanFilenamesCompare !== 0 ) {
                return scanFilenamesCompare;
            }
            return limelight__CompareStrings_CaseInsensitive_LocaleCompareWIthCaseInsensitiveParam(a.featureDetection_Description, b.featureDetection_Description)
        })

        this._featureDetection_Root_SelectionEntriesArray = featureDetection_Root_SelectionEntriesArray;

        this._featureDetectionEntry_ALL = featureDetection_Root_Entries;

        this._selected_FeatureDetectionEntry__For_DisplayAndSelectComponentOnly = featureDetection_Root_InitialSelection;

        // this.setState({ showUpdatingMessage: true })

        const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        })

        window.setTimeout( ()=> { try {

            this._call__GetFeatureDetectionData ({
                selected_FeatureDetectionEntry: featureDetection_Root_InitialSelection,
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }})
    }

    /**
     *
     */
    private _call__GetFeatureDetectionData (
        {
            selected_FeatureDetectionEntry, qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
        } : {
            selected_FeatureDetectionEntry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        }
    ) {
        try {
            const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId;

            const feature_detection_root__project_scnfl_mapping_tbl__id =
                selected_FeatureDetectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id;

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.
                get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw Error("commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId : " + projectSearchId )
            }

            let psmTblData: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
            let spectralStorage_NO_Peaks_Data: DataPage_common_Data_Holder_SingleSearch_SpectralStorage_NO_Peaks_Data_Root

            let featureDetection_SingularFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_SingularFeature_Entries_Holder
            let featureDetection_PersistentFeature_Entries_Holder: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_PersistentFeature_Entries_Holder
            let featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder: CommonData_LoadedFromServer_FeatureDetection__MappingOf_PersistentToSingularFeature_Entries_Holder

            const promises: Array<Promise<void>> = [] // Always has at least 1 entry from first promise

            {
                const promise = new Promise<void>((resolve, reject) => { try {
                    const promise_FromFunction =
                        this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.
                        qcPage_DataFromServer_AndDerivedData_SingleSearch.get_ScanFileStatistics_RetentionTime_Statistics_Data();   //  Call This to get MS1 data from Spectral Storage, retention time and total ion current
                    promise_FromFunction.catch(reason => { reject(reason) })
                    promise_FromFunction.then( qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch => { try {

                        psmTblData = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.psmTblData;
                        spectralStorage_NO_Peaks_Data = qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch.spectralStorage_NO_Peaks_Data

                        resolve();

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
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


                const statisticsTable_DataToPlot: QcViewPage_Common__FeatureDetection_TotalIonCurrent_TotalIonCount__Singular_Features__StatisticsTable_Component_DataToPlot = {

                    featureDetection_Root_Entry_Selection: selected_FeatureDetectionEntry,
                    projectSearchId: this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId,
                    psmTblData,
                    spectralStorage_NO_Peaks_Data,

                    featureDetection_SingularFeature_Entries_Holder,
                    featureDetection_PersistentFeature_Entries_Holder,
                    featureDetection_MappingOf_PersistentToSingularFeature_Entries_Holder,

                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel: this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel,
                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
                }

                if (
                    feature_detection_root__project_scnfl_mapping_tbl__id !== selected_FeatureDetectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id
                    || projectSearchId !== this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId
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

                let selected_FeatureDetectionEntry: CommonData_LoadedFromServer_SingleSearch__FeatureDetection_Root_Entry

                for ( const featureDetection_Root_Entry of this._featureDetectionEntry_ALL ) {
                    if ( featureDetection_Root_Entry.feature_detection_root__project_scnfl_mapping_tbl__id ===
                        params.selectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id
                        && this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId ===
                        params.selectionEntry.projectSearchId
                    ) {
                        selected_FeatureDetectionEntry = featureDetection_Root_Entry;
                        break;
                    }
                }
                if ( selected_FeatureDetectionEntry === undefined ) {
                    const msg = "No entry in this._featureDetectionEntry_And_ProjectSearchId_ALL for featureDetection_Root_Id_Selection: " +
                        params.selectionEntry.feature_detection_root__project_scnfl_mapping_tbl__id +
                        " and projectSearchId: " + params.selectionEntry.projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                this._selected_FeatureDetectionEntry__For_DisplayAndSelectComponentOnly = selected_FeatureDetectionEntry

                // this.setState({ showUpdatingMessage: true })

                const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

                this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback__SectionLevel.call_AllRegistered({
                    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput__SectionLevel
                })

                window.setTimeout( ()=> { try {

                    this._call__GetFeatureDetectionData({
                        selected_FeatureDetectionEntry,
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

        const projectSearchId = this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId

        const searchData_For_ProjectSearchId =
            this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId)

        if ( ! searchData_For_ProjectSearchId ) {
            const msg = "Returned NOTHING:  this.props.qcViewPage_CommonData_To_AllComponents_From_MainComponent.dataPageStateManager.get_searchData_SearchName_Etc_Root().get_SearchData_For_ProjectSearchId(projectSearchId) for projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

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
                            <div >
                                Loading Data
                            </div>
                        ) : (
                            <React.Fragment>

                                <div className=" section--chart-container-block ">

                                    <div className=" section--single-chart-not-in-multiple-in-row-container ">

                                        { this._selected_FeatureDetectionEntry__For_DisplayAndSelectComponentOnly ? (

                                            <QcViewPage_Common__FeatureDetection_Statistics_Section__ShownItem_DisplaySelect_Component
                                                selected_FeatureDetection_Root_Entry={ this._selected_FeatureDetectionEntry__For_DisplayAndSelectComponentOnly }
                                                projectSearchId__For__selected_FeatureDetection_Root_Entry={ this.props.qcViewPage_CommonData_To_All_SingleSearch_Components_From_MainSingleSearchComponent.projectSearchId }
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
