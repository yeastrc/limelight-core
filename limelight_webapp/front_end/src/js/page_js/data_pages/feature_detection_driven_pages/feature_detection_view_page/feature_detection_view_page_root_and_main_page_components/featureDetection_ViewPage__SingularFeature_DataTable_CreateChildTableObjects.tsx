/**
 * featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects.ts
 *
 *
 *
 */

import React from "react";

import {
    DataTable_Column,
    DataTable_Column_DownloadTable,
    DataTable_DataRow_ColumnEntry,
    DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params,
    DataTable_DataRow_ColumnEntry_SearchTableData,
    DataTable_DataRowEntry,
    DataTable_DataRowEntry_DownloadTable,
    DataTable_DataRowEntry_DownloadTable_SingleColumn,
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry
} from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer__FeatureDetection_SingularFeature_Entries";
import { scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc } from "page_js/data_pages/scan_file_driven_pages/scan_file_driven_pages__utils/scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc";
import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
import { FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results } from "page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root_and_main_page_components/featureDetection_ViewPage__SingularFeature_GetData_ForDataTable";
import { ScanFileBrowserPageRoot_CentralStateManagerObjectClass } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPageRoot_CentralStateManagerObjectClass";
import { ScanFileBrowserPage_SingleScan_UserSelections_StateObject } from "page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserPage_SingleScan_UserSelections_StateObject";
import { CentralPageStateManager } from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import { newURL_Build_PerProjectSearchIds_Or_ExperimentId } from "page_js/data_pages/data_pages_common/newURL_Build_PerProjectSearchIds_Or_ExperimentId";
import {
    _REFERRER_PATH_STRING,
    _STANDARD_PAGE_STATE_IDENTIFIER
} from "page_js/data_pages/data_pages_common/a_dataPagesCommonConstants";


////////////////

const dataTableId_ThisTable = "Feature Detection Persistent Features"


////////////////

/**
 *
 */
export class FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results {

    dataTable_Data: FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Result_DataTable_Data

    featureDetection_SingularFeature_Entries_For_PersistentId: Array<CommonData_LoadedFromServer__FeatureDetection_SingularFeature_Entry>
}


/**
 *
 */
export class FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Result_DataTable_Data {

    dataTable_RootTableObject: DataTable_RootTableObject
    dataTable_DataRowEntries_Map_Key_SingularFeature_Id : Map<number, DataTable_DataRowEntry>
}

/**
 *
 * @param params
 */
export const featureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects = function (
    {
        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results, singularFeature_Ids_Filter
    } : {
        featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results: FeatureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results
        singularFeature_Ids_Filter: Set<number>  //  Filter to only these Singular Feature Ids
    }
): FeatureDetection_ViewPage__SingularFeature_DataTable_CreateChildTableObjects_Results {
    try {
        const scanData_WholeFile_NO_Peaks_Data_Holder = featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results.scanData_WholeFile_NO_Peaks_Data_Holder

        let featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered = Array.from( featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results.featureDetection_SingularFeature_Entries_For_PersistentId )

        if ( singularFeature_Ids_Filter ) {

            //  Filter to only in singularFeature_Ids_Filter

            featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered = featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered.filter(value => {
                if ( singularFeature_Ids_Filter.has( value.id ) ) {
                    return true
                }
                return false
            })
        }

        featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered.sort( (a,b) => {
            if ( a.ms_1_scan_number < b.ms_1_scan_number ) {
                return -1
            }
            if ( a.ms_1_scan_number > b.ms_1_scan_number ) {
                return 1
            }
            if ( a.id < b.id ) {
                return -1
            }
            if ( a.id > b.id ) {
                return 1
            }
            return 0
        })

        /////////////

        //  Create Table Columns (Header info and Data Info)

        const dataTable_Columns : Array<DataTable_Column> = [];
        const dataTable_Column_DownloadTable_Entries : Array<DataTable_Column_DownloadTable> = [];

        {
            const dataTable_Column = new DataTable_Column({
                id : "viewScan", // Used for tracking sort order. Keep short
                displayName : "",
                width : 70,
                sortable : false,
                hideColumnHeader : true
            });
            dataTable_Columns.push( dataTable_Column );
        }

        {  //

            const displayName = "Feature Id";

            const dataTable_Column = new DataTable_Column({
                id : "id", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }
        {  //

            const displayName = "MS1 Scan Number";

            const dataTable_Column = new DataTable_Column({
                id : "ms_1_scan_number", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {  //

            const displayName = "MS1 Retention Time (Min)";

            const dataTable_Column = new DataTable_Column({
                id : "ms_1_Scan_RT_Minutes", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }


        {  //

            const displayName = "Monoisotopic Mass";

            const dataTable_Column = new DataTable_Column({
                id : "monoisotopic_mass", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {  //

            const displayName = "Charge";

            const dataTable_Column = new DataTable_Column({
                id : "charge", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {  //

            const displayName = "Intensity";

            const dataTable_Column = new DataTable_Column({
                id : "intensity", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        {  //

            const displayName = "Base Isotope Peak";

            const dataTable_Column = new DataTable_Column({
                id : "base_isotope_peak", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }

        //  Remove these Columns

        // {  //
        //
        //     const displayName = "analysis_window_start_m_z";
        //
        //     const dataTable_Column = new DataTable_Column({
        //         id : "analysis_window_start_m_z", // Used for tracking sort order. Keep short
        //         displayName,
        //         width : 200,
        //         sortable : true
        //     });
        //     dataTable_Columns.push( dataTable_Column );
        //
        //     const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        //     dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        // }
        //
        // {  //
        //
        //     const displayName = "analysis_window_end_m_z";
        //
        //     const dataTable_Column = new DataTable_Column({
        //         id : "analysis_window_end_m_z", // Used for tracking sort order. Keep short
        //         displayName,
        //         width : 200,
        //         sortable : true
        //     });
        //     dataTable_Columns.push( dataTable_Column );
        //
        //     const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
        //     dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        // }

        {  //

            const displayName = "Correlation Score";

            const dataTable_Column = new DataTable_Column({
                id : "correlation_score", // Used for tracking sort order. Keep short
                displayName,
                width : 200,
                sortable : true
            });
            dataTable_Columns.push( dataTable_Column );

            const dataTable_Column_DownloadTable = new DataTable_Column_DownloadTable({ cell_ColumnHeader_String : displayName });
            dataTable_Column_DownloadTable_Entries.push( dataTable_Column_DownloadTable );
        }


        //  Create Table Body

        const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

        const dataTable_DataRowEntries_Map_Key_SingularFeature_Id : Map<number, DataTable_DataRowEntry> = new Map()

        {
            let listCounter = 0;

            for ( const featureDetection_SingularFeature_Entry of featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered ) {

                listCounter++


                const spectralStorage_NO_Peaks_DataFor_ScanNumber =
                    scanData_WholeFile_NO_Peaks_Data_Holder.scanData.get_ScanData_NO_Peaks_For_ScanNumber(featureDetection_SingularFeature_Entry.ms_1_scan_number)

                if ( ! spectralStorage_NO_Peaks_DataFor_ScanNumber ) {
                    const msg = "scanFileBrowser__Get_SingleScanFileData_SpectralStorage_NO_Peaks_Data_LoadData_Result.get_SpectralStorage_NO_Peaks_DataFor_ScanNumber(featureDetection_SingularFeature_Entry.ms_1_scan_number) returned NOTHING for featureDetection_SingularFeature_Entry.ms_1_scan_number: " + featureDetection_SingularFeature_Entry.ms_1_scan_number
                    console.warn(msg)
                    throw Error(msg)
                }

                const dataTable_DataRow_ColumnEntries: Array<DataTable_DataRow_ColumnEntry> = [];
                const dataColumns_tableDownload : Array<DataTable_DataRowEntry_DownloadTable_SingleColumn> = [];

                { //  Open Scan Number Fake Link

                    const valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough =
                        ( params : DataTable_DataRow_ColumnEntry__valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough_Params ) : React.JSX.Element => {

                            return (
                                <span className="table-data-cell-property-value fake-link"
                                      onClick={ event => {
                                          event.preventDefault()
                                          event.stopPropagation()

                                          if ( limelight__IsTextSelected() ) {
                                              return
                                          }

                                          const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result =
                                              scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc({
                                                  projectScanFileId: featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.get_projectScanFileId(),
                                                  scanFile_Code_FirstSix: featureDetection_ViewPage__SingularFeature_GetData_ForDataTable_Results.featureDetection_ProjectScanFileId_From_feature_detection_root__project_scnfl_mapping_tbl__id_Holder.get_scanFile_Code_FirstSix()
                                              })

                                          const scanFileBrowserPage_SingleScan_UserSelections_StateObject = new ScanFileBrowserPage_SingleScan_UserSelections_StateObject({ valueChangedCallback: undefined })
                                          scanFileBrowserPage_SingleScan_UserSelections_StateObject.setScanNumber_Selected( featureDetection_SingularFeature_Entry.ms_1_scan_number )

                                          {
                                              scanFileBrowserPage_SingleScan_UserSelections_StateObject.set_featureDetection_IndividualFeature_OR_PSM__Root({
                                                  baseIsotopePeak__Containing_M_Over_Z: featureDetection_SingularFeature_Entry.base_isotope_peak,
                                                  charge: featureDetection_SingularFeature_Entry.charge,
                                                  monoisotopicMass: featureDetection_SingularFeature_Entry.monoisotopic_mass
                                              })
                                          }

                                          const singleSingleScanData = scanFileBrowserPage_SingleScan_UserSelections_StateObject.getEncodedStateData()

                                          const scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow = new ScanFileBrowserPageRoot_CentralStateManagerObjectClass({ centralPageStateManager: undefined, no_centralPageStateManager: true })
                                          scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow.set_SingleScanDataEncodedStateData({ singleSingleScanData })


                                          const centralPageStateManager = new CentralPageStateManager()

                                          const stateAsJSON_Compressed = centralPageStateManager.get_CurrentState_AsStringForUrl({ componentOverridesAdditions: [ scanFileBrowserPageRoot_CentralStateManagerObjectClass_ForNewWindow ]})

                                          let newWindowURL = newURL_Build_PerProjectSearchIds_Or_ExperimentId({
                                              pageControllerPath: scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.basePathURL,
                                              experimentId: undefined,
                                              featureDetectionId_Encoded: undefined,
                                              projectScanFileId_Encoded: scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc__Result.codeForProjectScanFileId,
                                              searchDataLookupParamsCode: undefined,
                                              pageStateIdentifier: _STANDARD_PAGE_STATE_IDENTIFIER,
                                              pageStateString: stateAsJSON_Compressed,
                                              referrer: _REFERRER_PATH_STRING
                                          });

                                          const newWindow = window.open( newWindowURL, "_blank", "noopener" );
                                      } }
                                >
                                    View Scan
                                </span>
                            )
                        }

                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay_FunctionCallback_Return_JSX_Element_NoDataPassThrough
                        //  NO Data for searchTableData
                    })
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
                }

                { //  id
                    const valueDisplay = featureDetection_SingularFeature_Entry.id.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.id
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }
                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.ms_1_scan_number.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.ms_1_scan_number
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                {
                    const ms_1_Scan_RT_Minutes = (spectralStorage_NO_Peaks_DataFor_ScanNumber.retentionTime_InSeconds / 60).toFixed( 2 )

                    const valueDisplay = ms_1_Scan_RT_Minutes.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: ms_1_Scan_RT_Minutes
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.monoisotopic_mass.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.monoisotopic_mass
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.charge.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.charge
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.intensity.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.intensity
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.base_isotope_peak.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.base_isotope_peak
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                //  Remove these Columns

                // {
                //     const valueDisplay = featureDetection_SingularFeature_Entry.analysis_window_start_m_z.toString();
                //     const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                //     const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                //     const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                //         searchTableData,
                //         valueDisplay,
                //         valueSort: featureDetection_SingularFeature_Entry.analysis_window_start_m_z
                //     });
                //     dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
                //
                //     const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                //     dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                // }
                //
                // {
                //     const valueDisplay = featureDetection_SingularFeature_Entry.analysis_window_end_m_z.toString();
                //     const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                //     const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                //     const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                //         searchTableData,
                //         valueDisplay,
                //         valueSort: featureDetection_SingularFeature_Entry.analysis_window_end_m_z
                //     });
                //     dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);
                //
                //     const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                //     dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                // }

                {
                    const valueDisplay = featureDetection_SingularFeature_Entry.correlation_score.toString();
                    const searchEntriesForColumn : Array<string> = [ valueDisplay ]
                    const searchTableData = new DataTable_DataRow_ColumnEntry_SearchTableData({ searchEntriesForColumn })
                    const dataTable_DataRow_ColumnEntry = new DataTable_DataRow_ColumnEntry({
                        searchTableData,
                        valueDisplay,
                        valueSort: featureDetection_SingularFeature_Entry.correlation_score
                    });
                    dataTable_DataRow_ColumnEntries.push(dataTable_DataRow_ColumnEntry);

                    const dataTable_DataRowEntry_DownloadTable_SingleColumn = new DataTable_DataRowEntry_DownloadTable_SingleColumn({ cell_ColumnData_String: valueDisplay })
                    dataColumns_tableDownload.push( dataTable_DataRowEntry_DownloadTable_SingleColumn );
                }

                const dataTable_DataRowEntry_DownloadTable = new DataTable_DataRowEntry_DownloadTable({ dataColumns_tableDownload });

                const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                    uniqueId: featureDetection_SingularFeature_Entry.id,
                    sortOrder_OnEquals: listCounter,  //  Preserve original sort order on sort with identical values  //  Must be sortable using Javascript < > comparators
                    columnEntries: dataTable_DataRow_ColumnEntries,
                    dataTable_DataRowEntry_DownloadTable
                });

                dataTable_DataRowEntries.push( dataTable_DataRowEntry );

                dataTable_DataRowEntries_Map_Key_SingularFeature_Id.set( featureDetection_SingularFeature_Entry.id, dataTable_DataRowEntry )
            }

        }

        const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
            columns : dataTable_Columns,
            columns_tableDownload: dataTable_Column_DownloadTable_Entries,
            dataTable_DataRowEntries
        });

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

        const dataTable_RootTableObject = new DataTable_RootTableObject({
            dataTableId : dataTableId_ThisTable,
            tableOptions,
            tableDataObject : dataTable_RootTableDataObject
        });

        return {
            dataTable_Data: {
                dataTable_RootTableObject,
                dataTable_DataRowEntries_Map_Key_SingularFeature_Id
            },
            featureDetection_SingularFeature_Entries_For_PersistentId: featureDetection_SingularFeature_Entries_For_PersistentId__Sorted_MaybeFiltered
        }


    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}
