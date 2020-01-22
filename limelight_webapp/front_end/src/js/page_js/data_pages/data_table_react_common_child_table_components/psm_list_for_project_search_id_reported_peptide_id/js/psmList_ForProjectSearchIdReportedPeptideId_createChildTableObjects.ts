/**
 * psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects.ts
 * 
 * 
 * Common Child Table: show PSMs for Project Search Id and Reported Peptide Id and PSM Filters and maybe PSM Ids
 * 
 * React Component that is shown for child of Data Table Row and will contain child table 
 * 
 * Create     DataTable_RootTableObject for child table
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { WebserviceCallStandardPost_ApiObject_Class, WebserviceCallStandardPost_ApiObject_Holder_Class } from 'page_js/webservice_call_common/webserviceCallStandardPost_ApiObject_Class';


import {

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTableData_RequestParm,
    DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm,
    
    DataTable_Column,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent
    
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { PsmList_ViewSpectrumCell_ExternalReactComponent } from 'page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/psm_list_view_spectrum_cell_ExternalComponent/jsx/psm_list_view_spectrum_cell_ExternalComponent';

import { PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent'

import { getPSMDataFromServer } from './psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer';

const dataTableId_ThisTable = "Child Table PSM List Table";


const LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT = 4;

const LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT = 2;



export class PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult {

    dataTable_RootTableObject : DataTable_RootTableObject
}

export class PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result {

    promise_DataTable_RootTableObject : Promise<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult>
}

/**
 * test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__CreateChildTableDataObjects.ts
 * 
 * Create the Data Table objects for use in Data Table in FAKE_dataRow_ChildTable_ReactComponent from file test_ChildDataTable_ViaCall_dataRow_GetChildTable_ReturnReactComponent__ChildTableContainingReactComponent.tsx
 * 
 * Test creating a React Cmponent that is shown for show/hide row child data using call to tableOptions.dataRow_GetChildTable_ReturnReactComponent(...) which returns React.Component
 */
export const psmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects = ({

    dataRow_GetChildTable_ReturnReactComponent_Parameter,
    webserviceCallStandardPost_ApiObject_Holder_Class
} : {
    dataRow_GetChildTable_ReturnReactComponent_Parameter :PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter
    webserviceCallStandardPost_ApiObject_Holder_Class : WebserviceCallStandardPost_ApiObject_Holder_Class

}) : PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result => {

    const promise : Promise<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult> = new Promise<PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult>( ( resolve, reject ) => {
        try {

            const projectSearchId = dataRow_GetChildTable_ReturnReactComponent_Parameter.projectSearchId
            const psmIds = dataRow_GetChildTable_ReturnReactComponent_Parameter.psmIds;
            const reportedPeptideId = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideId;
            const searchDataLookupParamsRoot = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot;
            const dataPageStateManager = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;
            const alwaysShow_ReporterIonMasses_Column = dataRow_GetChildTable_ReturnReactComponent_Parameter.alwaysShow_ReporterIonMasses_Column;

            const loadPromise = getPSMDataFromServer({ projectSearchId, psmIds, reportedPeptideId, searchDataLookupParamsRoot, dataPageStateManager, webserviceCallStandardPost_ApiObject_Holder_Class });

            loadPromise.catch( (reason) => { 
                reject( reason ) 
            });

            loadPromise.then( ( ajaxResponse ) => {
                try {
                    const dataTable_RootTableObject = _create_DataTable_RootTableObject({
                        alwaysShow_ReporterIonMasses_Column,
                        ajaxResponse, 
                        dataPageStateManager, 
                        projectSearchId
                    });

                    const promiseResult = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_PromiseResult();
                    promiseResult.dataTable_RootTableObject = dataTable_RootTableObject;

                    resolve( promiseResult );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    const result = new PsmList_ForProjectSearchIdReportedPeptideId_createChildTableObjects_Result();
    result.promise_DataTable_RootTableObject = promise;

    return result;
}


/**
 * Get DataTable_RootTableObject for the PSM table.
 * 
 */
const _create_DataTable_RootTableObject = function({

    alwaysShow_ReporterIonMasses_Column,
    ajaxResponse, 
    dataPageStateManager, 
    projectSearchId

} : {
    alwaysShow_ReporterIonMasses_Column : boolean,
    ajaxResponse, 
    dataPageStateManager : DataPageStateManager, 
    projectSearchId : number

}) : DataTable_RootTableObject {

    // ajaxResponse.resultList;
    // ajaxResponse.searchHasScanData;
    // ajaxResponse.search_anyPsmHas_DynamicModifications;
    // ajaxResponse.search_anyPsmHas_ReporterIons;
    // ajaxResponse.search_hasIsotopeLabel;
    // ajaxResponse.search_hasScanFilenames

    let psmList = ajaxResponse.resultList;
    let searchHasScanData = ajaxResponse.searchHasScanData;

    //  Get AnnotationType records for Displaying Annotation data in display order in psmList
    let annotationTypeRecords_DisplayOrder = _getAnnotationTypeRecords_DisplayOrder( { projectSearchId, psmList, dataPageStateManager } );
    let psmAnnotationTypesForPsmListEntries_DisplayOrder = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPsmListEntries;

    const get_DataTable_DataRowEntries_Result = _get_DataTable_DataRowEntries({ psmList, projectSearchId, dataPageStateManager, psmAnnotationTypesForPsmListEntries_DisplayOrder, ajaxResponse });
    const dataTable_DataRowEntries = get_DataTable_DataRowEntries_Result.dataTable_DataRowEntries;

    const dataTable_Columns : Array<DataTable_Column> = _getDataTableColumns({ 

        alwaysShow_ReporterIonMasses_Column : false,  //  Set arbitrarily for now
        ajaxResponse, 
        dataPageStateManager, 
        projectSearchId,
        psmAnnotationTypesForPsmListEntries_DisplayOrder,
        anyPsmsHave_precursor_M_Over_Z : get_DataTable_DataRowEntries_Result.anyPsmsHave_precursor_M_Over_Z,
        anyPsmsHave_retentionTime : get_DataTable_DataRowEntries_Result.anyPsmsHave_retentionTime,
        anyPsmsHave_reporterIonMassesDisplay : get_DataTable_DataRowEntries_Result.anyPsmsHave_reporterIonMassesDisplay
    });

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });
    
    // const fake_dataRow_GetChildTableData = ( param: DataTable_TableOptions_dataRow_GetChildTableData_RequestParm ) : DataTable_RootTableObject => { return null }

    const tableOptions = new DataTable_TableOptions({
        //  Comment out since no further drill down to child table
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return dataTable_RootTableObject;
}

////////////////////////////////////////////////////////////////////

/**
 * Get the columns for the PSM table.
 * 
 */
const _getDataTableColumns = function({ 
    
    alwaysShow_ReporterIonMasses_Column, 
    ajaxResponse, 
    dataPageStateManager, 
    projectSearchId,
    psmAnnotationTypesForPsmListEntries_DisplayOrder,
    anyPsmsHave_precursor_M_Over_Z,
    anyPsmsHave_retentionTime,
    anyPsmsHave_reporterIonMassesDisplay

} : { 
    
    alwaysShow_ReporterIonMasses_Column : boolean, 
    ajaxResponse, 
    dataPageStateManager : DataPageStateManager, 
    projectSearchId : number
    psmAnnotationTypesForPsmListEntries_DisplayOrder
    anyPsmsHave_precursor_M_Over_Z? : boolean
    anyPsmsHave_retentionTime? : boolean
    anyPsmsHave_reporterIonMassesDisplay? : boolean

}) : Array<DataTable_Column> {

    const dataTable_Columns : Array<DataTable_Column> = [];
    
    //  view spectrum link
    if ( ajaxResponse.searchHasScanData ) {
        {
            const dataTable_Column = new DataTable_Column({
                id : "viewScan", // Used for tracking sort order. Keep short
                displayName : "",
                width : 70,
                sortable : false,
                hideColumnHeader : true,
                style_override_DataRowCell_React : { fontSize: 12 },
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
                cellMgmt_ExternalReactComponent : { reactComponent : PsmList_ViewSpectrumCell_ExternalReactComponent }
            });
            dataTable_Columns.push( dataTable_Column );
        }
        //  WAS
        // let column = {
        //     id :           'viewScan',
        //     width :        '70px',
        //     displayName :  '',
        //     hideColumnHeader : true,
        //     dataProperty : 'viewScanLink',
        //     sort : false,
        //     style_override : 'font-size:12px;',
        //     css_class : 'fake-link selector_view_scan_item',
        // };

        // columns.push( column );
    }
    {
        const dataTable_Column = new DataTable_Column({
            id : "scnNmbr", // Used for tracking sort order. Keep short
            displayName : "Scan Number",
            width : 100,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
            // style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    if ( anyPsmsHave_precursor_M_Over_Z ) {
        const dataTable_Column = new DataTable_Column({
            id : "mz", // Used for tracking sort order. Keep short
            displayName : "Obs. m/z",
            width : 100,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
            // style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    } 
    
    {
        const dataTable_Column = new DataTable_Column({
            id : "charge", // Used for tracking sort order. Keep short
            displayName : "Charge",
            width : 55,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
            // style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    } 
    
    if ( anyPsmsHave_retentionTime ) {
        const dataTable_Column = new DataTable_Column({
            id : "rt", // Used for tracking sort order. Keep short
            displayName : "RT(min)",
            width : 60,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
            // style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    } 
    
    if ( anyPsmsHave_reporterIonMassesDisplay ) {
        const dataTable_Column = new DataTable_Column({
            id : "reporterIons", // Used for tracking sort order. Keep short
            displayName : "Reporter Ions",
            width : 65,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
            // style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
            // style_override_header_React : {},  // Optional
            // style_override_React : {},  // Optional
            // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
            // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
        });
        dataTable_Columns.push( dataTable_Column );
    }

    for ( const annotation of psmAnnotationTypesForPsmListEntries_DisplayOrder ) {

        const dataTable_Column = new DataTable_Column({
            id :           annotation.annotationTypeId,
            displayName :  annotation.name,
            width :        100,
            sortable : true,
            style_override_DataRowCell_React : { fontSize: 12 },
        });

        dataTable_Columns.push( dataTable_Column );
    }

    return dataTable_Columns;
}


///////////////////////////////////////////

interface Get_DataTable_DataRowEntries_Result {
    dataTable_DataRowEntries : Array<DataTable_DataRowEntry>
    anyPsmsHave_precursor_M_Over_Z? : boolean
    anyPsmsHave_retentionTime? : boolean
    anyPsmsHave_reporterIonMassesDisplay? : boolean
}

/**
 * Get DataTable_DataRowEntry entries
 * 
 */
const _get_DataTable_DataRowEntries = function({ 
    
    psmList,
    projectSearchId,
    dataPageStateManager,
    psmAnnotationTypesForPsmListEntries_DisplayOrder,
    ajaxResponse
} : { 
    psmList : Array<any>,
    projectSearchId : number,
    dataPageStateManager : DataPageStateManager
    psmAnnotationTypesForPsmListEntries_DisplayOrder,
    ajaxResponse

}) : Get_DataTable_DataRowEntries_Result {

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];
    
    if ( ( ! psmList ) || psmList.length === 0 ) {

        return { dataTable_DataRowEntries };
    }

    if ( psmList.length === undefined ) {
        const msg = "psmList is not an array: psmList.length === undefined"
        console.warn( msg )
        throw Error( msg )
    }

    _sort_psmList({ psmList, projectSearchId, dataPageStateManager });

    //  Determine anyPsmsHave_precursor_M_Over_Z and anyPsmsHave_retentionTime
    
    let anyPsmsHave_precursor_M_Over_Z : boolean = false; 
    let anyPsmsHave_retentionTime : boolean = false;
    let anyPsmsHave_reporterIonMassesDisplay : boolean = false;

    for ( const psmListItem of psmList ) {

        if ( psmListItem.precursor_M_Over_Z !== undefined && psmListItem.precursor_M_Over_Z !== null ) {
            anyPsmsHave_precursor_M_Over_Z = true;
        }
        if ( psmListItem.retentionTimeSeconds !== undefined && psmListItem.retentionTimeSeconds !== null ) {
            anyPsmsHave_retentionTime = true;
        }
        if ( psmListItem.reporterIonMassList ) {
            anyPsmsHave_reporterIonMassesDisplay = true;
        }
    }


    //  Process each entry in psm list from server and create rows in data table

    let psmCounter = 0;

    for ( const psmListItem of psmList ) {

        psmCounter++;

        //  Column entries for this data row in data table
        const columnEntries : DataTable_DataRow_ColumnEntry[] = [];

        //  View Spectrum link
        if ( ajaxResponse.searchHasScanData ) {

            const psmId = psmListItem.psmId

            const cellMgmt_ExternalReactComponent_Data = { psmId, projectSearchId }

            const columnEntry = new DataTable_DataRow_ColumnEntry({
                cellMgmt_ExternalReactComponent_Data
            })
            columnEntries.push( columnEntry );
        }

        {  // Scan Number
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay : psmListItem.scanNumber,
                valueSort : psmListItem.scanNumber
            })
            columnEntries.push( columnEntry );
        }
        //  Precursor M/Z
        if ( anyPsmsHave_precursor_M_Over_Z ) {
            let valueDisplay = "";
            let valueSort = 0;
            if ( psmListItem.precursor_M_Over_Z !== undefined && psmListItem.precursor_M_Over_Z !== null ) {
                valueDisplay = psmListItem.precursor_M_Over_Z.toFixed( LOCAL__PRECURSOR_M_OVER_Z_DIGITS_AFTER_DECIMAL_POINT );
                valueSort = psmListItem.precursor_M_Over_Z
            }
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay,
                valueSort
            })
            columnEntries.push( columnEntry );
        }
        {  //  Charge
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay : psmListItem.charge,
                valueSort : psmListItem.charge
            })
            columnEntries.push( columnEntry );
        }
        // RetentionTime
        if ( anyPsmsHave_retentionTime ) {
            let valueDisplay = "";
            let valueSort = 0;
            if ( psmListItem.retentionTimeSeconds !== undefined && psmListItem.retentionTimeSeconds !== null ) {
                const retentionTimeMinutesNumber = psmListItem.retentionTimeSeconds / 60;
                valueDisplay = retentionTimeMinutesNumber.toFixed( LOCAL__RETENTION_TIME_MINUTES_DIGITS_AFTER_DECIMAL_POINT );
                valueSort = retentionTimeMinutesNumber
            }
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay,
                valueSort
            })
            columnEntries.push( columnEntry );
        }

        if ( anyPsmsHave_reporterIonMassesDisplay ) {
            let valueDisplay = "";
            let valueSort = "";
            if ( psmListItem.reporterIonMassList ) {
                const reporterIonMassAsString_List = [];
                for ( const reporterIonMass of psmListItem.reporterIonMassList ) {
                    const reporterIonMass_String = reporterIonMass.toString();
                    reporterIonMassAsString_List.push( reporterIonMass_String );
                }
                valueDisplay = reporterIonMassAsString_List.join(", ");
            }
            const columnEntry = new DataTable_DataRow_ColumnEntry({
                valueDisplay,
                valueSort
            })
            columnEntries.push( columnEntry );
        }
        
        //  Put PSM annotations into a list for display matching table headers

        // let psmAnnotationDisplayEntries = [];

        let psmAnnotationMap = psmListItem.psmAnnotationMap;  //  psmAnnotationMap is an Object
        if ( psmAnnotationMap ) {
            for ( const annTypeItem of psmAnnotationTypesForPsmListEntries_DisplayOrder ) {
                const entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
                let valueSort = entryForAnnTypeId.valueDouble;
                if ( valueSort === undefined || valueSort === null ) {
                    valueSort = entryForAnnTypeId.valueString;
                }
                const columnEntry = new DataTable_DataRow_ColumnEntry({
                    valueDisplay : entryForAnnTypeId.valueString,
                    valueSort
                });
                columnEntries.push( columnEntry );
            }
        }

        //  Add the data row

        const dataTable_DataRowEntry = new DataTable_DataRowEntry({
            uniqueId : psmListItem.psmId,
            sortOrder_OnEquals : psmCounter, // Original Sort Order
            columnEntries
        })
        dataTable_DataRowEntries.push( dataTable_DataRowEntry );
    }

    return {
        dataTable_DataRowEntries,
        anyPsmsHave_precursor_M_Over_Z,
        anyPsmsHave_retentionTime,
        anyPsmsHave_reporterIonMassesDisplay
    }
}

/**
 * Sort the PSM List.
 * 
 */
const _sort_psmList = function({

    psmList,
    projectSearchId,
    dataPageStateManager
} : {
    psmList
    projectSearchId : number
    dataPageStateManager : DataPageStateManager 
}) {

    //   Sort PSM Array on PSM Ann Types Sort Order then PSM Id

    /**
     * Return array ann type entries, sorted on sortOrder
     */
    let psm_AnnotationTypeRecords_WhereSortOrderPopulated = _get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });

    let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Length = psm_AnnotationTypeRecords_WhereSortOrderPopulated.length;

    psmList.sort( function( a, b ) {

        //  Compare PSM Ann Values, if they are populated
        let a_psmAnnotationMap = a.psmAnnotationMap;
        let b_psmAnnotationMap = b.psmAnnotationMap;
        if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

            for ( let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index < psm_AnnotationTypeRecords_WhereSortOrderPopulated_Length; psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
                let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = psm_AnnotationTypeRecords_WhereSortOrderPopulated[ psm_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
                let annotationTypeId = psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
                let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
                let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];
                
                if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
                    if ( psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else if ( psm_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return -1;
                        }
                        if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
                            return 1;
                        }
                        //  Values match so go to next ann type values
                    } else {
                        throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
                    }
                }
            }
        }
        
        //  All PSM Ann Type Values match so order on psm id
        if ( a.psmId < b.psmId ) {
            return -1;
        }
        if ( a.psmId > b.psmId ) {
            return 1;
        }
        return 0;
    });
}

/**
 * Return array ann type entries, sorted on sortOrder
 */
const _get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated = function({ 
    
    projectSearchId, 
    dataPageStateManager
} : { 
    projectSearchId : number, 
    dataPageStateManager : DataPageStateManager 
}) {

    //   Get all Psm annotation type records with sortOrder set

    let annotationTypeData = dataPageStateManager.get_annotationTypeData();

    let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }


    const psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
    const psmDescriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;

    if ( ( ! psmFilterableAnnotationTypes ) && ( ! psmDescriptiveAnnotationTypes ) ) {
        //  No data so return empty array
        return []; //  EARLY RETURN
    }
    
    //  Get AnnotationType Records where sortOrder is populated
    
    let psmAnnotationTypes_SortOrderPopulated = [];
    
    {
        let psmFilterableAnnotationTypes_Keys = Object.keys ( psmFilterableAnnotationTypes );
        
        psmFilterableAnnotationTypes_Keys.forEach( function( psmFilterableAnnotationTypesKeyItem, index, array ) {
            let annotationTypeEntryForKey = psmFilterableAnnotationTypes[ psmFilterableAnnotationTypesKeyItem ];
            if ( annotationTypeEntryForKey.sortOrder ) {
                psmAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
            }
        }, this );
    }

    {
        let psmDescriptiveAnnotationTypes_Keys = Object.keys ( psmDescriptiveAnnotationTypes );
        
        psmDescriptiveAnnotationTypes_Keys.forEach( function( psmDescriptiveAnnotationTypesKeyItem, index, array ) {
            let annotationTypeEntryForKey = psmDescriptiveAnnotationTypes[ psmDescriptiveAnnotationTypesKeyItem ];
            if ( annotationTypeEntryForKey.sortOrder ) {
                psmAnnotationTypes_SortOrderPopulated.push( annotationTypeEntryForKey );
            }
        }, this );
    }

    
    //  Sort on sort order
    
    psmAnnotationTypes_SortOrderPopulated.sort(function(a, b) {
        if ( a.sortOrder < b.sortOrder ) {
            return -1;
        }
        if ( a.sortOrder > b.sortOrder ) {
            return 1;
        }
        return 0;
    })
    
    return psmAnnotationTypes_SortOrderPopulated;
};

/////////////////////////////////////////////////


/**
 * 
 */
const _getAnnotationTypeRecords_DisplayOrder = function({ 
    
    psmList, 
    projectSearchId,
    dataPageStateManager
} : { 
    psmList : Array<any>, 
    projectSearchId : number,
    dataPageStateManager : DataPageStateManager
} ) {

    //   Get all annotation type ids returned in all entries and produce a list of them to put in columns
    
    let annotationTypeData = dataPageStateManager.get_annotationTypeData();

    let annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ];
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }
    
    let allPSMAnnotationTypeIds_InPsmList = {};

    psmList.forEach( function( psmListItem, index, array ) {
        let psmAnnotationMap = psmListItem.psmAnnotationMap;
        if ( psmAnnotationMap ) {
            Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
                let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
                allPSMAnnotationTypeIds_InPsmList[ psmAnnotationDTOItem.annotationTypeId ] = psmAnnotationDTOItem.annotationTypeId;
            }, this );
        }
    }, this );
    
    //  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let psmAnnotationTypesForPsmListEntries = [];
    
    //  PSM
    
    let allPSMAnnotationTypeIds_InPsmListKeys = Object.keys ( allPSMAnnotationTypeIds_InPsmList );
    if ( allPSMAnnotationTypeIds_InPsmListKeys.length > 0 ) {
        //  Have PSM AnnotationType entries in Peptide list so must have PSM AnnotationType records
        let psmFilterableAnnotationTypes = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes
        let psmDescriptiveAnnotationTypes = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes
        if ( ( ! psmFilterableAnnotationTypes ) && ( ! psmDescriptiveAnnotationTypes ) ) {
            throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have allPSMAnnotationTypeIds_InPsmList entries");
        }
        //  Get AnnotationTypeRecords for AnnotationTypeIds
        Object.keys ( allPSMAnnotationTypeIds_InPsmList ).forEach( function( allPSMAnnotationTypeIds_InPsmListKeyItem, index, array ) {
            let annotationTypeEntryForKey = psmFilterableAnnotationTypes[ allPSMAnnotationTypeIds_InPsmListKeyItem ];
            if ( ! annotationTypeEntryForKey ) {
                annotationTypeEntryForKey = psmDescriptiveAnnotationTypes[ allPSMAnnotationTypeIds_InPsmListKeyItem ];
                if ( ! annotationTypeEntryForKey ) {
                    throw Error( "No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes entry for key: " + allPSMAnnotationTypeIds_InPsmListKeyItem );
                }
            }
            psmAnnotationTypesForPsmListEntries.push( annotationTypeEntryForKey );
        }, this );
    }

    //  Sort this result array, on display order, then by ann type name
    
    _sort_AnnotationTypes_OnDisplayOrderAnnTypeName( { annTypesArray : psmAnnotationTypesForPsmListEntries } );
    
    return {
        psmAnnotationTypesForPsmListEntries : psmAnnotationTypesForPsmListEntries
    };
}


/**
 * 
 */
const _sort_AnnotationTypes_OnDisplayOrderAnnTypeName = function( { annTypesArray } ) {

    annTypesArray.sort( function( a, b ) {
        if ( a.displayOrder && b.displayOrder ) {
            //  both a and b have display order so order them
            if ( a.displayOrder < b.displayOrder ) {
                return -1;
            }
            if ( a.displayOrder > b.displayOrder ) {
                return 1;
            }
            return 0;
        }
        if ( a.displayOrder ) {
            //  Only a has display order so order it first
            return -1;
        }
        if ( b.displayOrder ) {
            //  Only b has display order so order it first
            return 1;
        }
        //  Order on ann type name
        let nameCompare = a.name.localeCompare( b.name );
        return nameCompare;
    });
}
