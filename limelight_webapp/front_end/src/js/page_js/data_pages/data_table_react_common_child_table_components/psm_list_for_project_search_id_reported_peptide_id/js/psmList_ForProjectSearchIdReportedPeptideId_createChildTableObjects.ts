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

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeData_Root, AnnotationTypeItem }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { WebserviceCallStandardPost_ApiObject_Holder_Class } from 'page_js/webservice_call_common/webserviceCallStandardPost_ApiObject_Class';

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { PsmList_ViewSpectrumCell_ExternalReactComponent } from 'page_js/data_pages/data_table_react_common_child_table_components/psm_list_for_project_search_id_reported_peptide_id/psm_list_view_spectrum_cell_ExternalComponent/jsx/psm_list_view_spectrum_cell_ExternalComponent';

import { PsmList_ForProjectSearchIdReportedPeptideId__dataRow_GetChildTable_ReturnReactComponent_Parameter } from '../js/psmList_ForProjectSearchIdReportedPeptideId_ReturnChildReactComponent'

import { getPSMDataFromServer } from './psmList_ForProjectSearchIdReportedPeptideId_GetDataFromServer';
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';
import {OpenModPosition_DataType} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";

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
            const psmIds_Include = dataRow_GetChildTable_ReturnReactComponent_Parameter.psmIds_Include;
            const reportedPeptideId = dataRow_GetChildTable_ReturnReactComponent_Parameter.reportedPeptideId;
            const searchSubGroupId = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchSubGroupId;
            const searchDataLookupParamsRoot = dataRow_GetChildTable_ReturnReactComponent_Parameter.searchDataLookupParamsRoot;
            const dataPageStateManager = dataRow_GetChildTable_ReturnReactComponent_Parameter.dataPageStateManager;
            const alwaysShow_ReporterIonMasses_Column = dataRow_GetChildTable_ReturnReactComponent_Parameter.alwaysShow_ReporterIonMasses_Column;
            const openModPositionOverride = dataRow_GetChildTable_ReturnReactComponent_Parameter.openModPositionOverride;

            const loadPromise = getPSMDataFromServer({ projectSearchId, psmIds_Include, reportedPeptideId, searchSubGroupId, searchDataLookupParamsRoot, dataPageStateManager, webserviceCallStandardPost_ApiObject_Holder_Class });

            loadPromise.catch( (reason) => { 
                reject( reason ) 
            });

            loadPromise.then( ( ajaxResponse ) => {
                try {
                    const dataTable_RootTableObject = _create_DataTable_RootTableObject({
                        alwaysShow_ReporterIonMasses_Column,
                        ajaxResponse, 
                        dataPageStateManager, 
                        projectSearchId,
                        openModPositionOverride
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
    projectSearchId,
    openModPositionOverride

} : {
    alwaysShow_ReporterIonMasses_Column : boolean,
    ajaxResponse: any,
    dataPageStateManager : DataPageStateManager, 
    projectSearchId : number,
    openModPositionOverride : OpenModPosition_DataType

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
    let annotationTypeRecords_DisplayOrder : { psmAnnotationTypesForPsmListEntries : Array<AnnotationTypeItem> } = _getAnnotationTypeRecords_DisplayOrder( { projectSearchId, psmList, dataPageStateManager } );
    let psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem> = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPsmListEntries;

    const get_DataTable_DataRowEntries_Result = _get_DataTable_DataRowEntries({ psmList, projectSearchId, dataPageStateManager, psmAnnotationTypesForPsmListEntries_DisplayOrder, ajaxResponse, openModPositionOverride });
    const dataTable_DataRowEntries = get_DataTable_DataRowEntries_Result.dataTable_DataRowEntries;

    const dataTable_Columns : Array<DataTable_Column> = _getDataTableColumns({ 

        alwaysShow_ReporterIonMasses_Column : false,  //  Set arbitrarily for now
        ajaxResponse, 
        dataPageStateManager, 
        projectSearchId,
        psmAnnotationTypesForPsmListEntries_DisplayOrder,
        anyPsmsHave_precursor_M_Over_Z : get_DataTable_DataRowEntries_Result.anyPsmsHave_precursor_M_Over_Z,
        anyPsmsHave_retentionTime : get_DataTable_DataRowEntries_Result.anyPsmsHave_retentionTime,
        anyPsmsHave_reporterIonMassesDisplay : get_DataTable_DataRowEntries_Result.anyPsmsHave_reporterIonMassesDisplay,
        anyPsmsHave_openModificationMassesDisplay : get_DataTable_DataRowEntries_Result.anyPsmsHave_openModificationMassesDisplay
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
    anyPsmsHave_reporterIonMassesDisplay,
    anyPsmsHave_openModificationMassesDisplay

} : { 
    
    alwaysShow_ReporterIonMasses_Column : boolean, 
    ajaxResponse: any,
    dataPageStateManager : DataPageStateManager, 
    projectSearchId : number
    psmAnnotationTypesForPsmListEntries_DisplayOrder : Array<AnnotationTypeItem>
    anyPsmsHave_precursor_M_Over_Z? : boolean
    anyPsmsHave_retentionTime? : boolean
    anyPsmsHave_reporterIonMassesDisplay? : boolean
    anyPsmsHave_openModificationMassesDisplay? : boolean

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

    if ( anyPsmsHave_openModificationMassesDisplay ) {
        const dataTable_Column = new DataTable_Column({
            id : "openModifications", // Used for tracking sort order. Keep short
            displayName : "Open Modifications",
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
            id :           annotation.annotationTypeId.toString(),
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
    anyPsmsHave_openModificationMassesDisplay? : boolean
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
    openModPositionOverride,
    ajaxResponse
} : { 
    psmList : Array<any>,
    projectSearchId : number,
    dataPageStateManager : DataPageStateManager
    psmAnnotationTypesForPsmListEntries_DisplayOrder: any,
    ajaxResponse: any,
    openModPositionOverride: OpenModPosition_DataType

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
    let anyPsmsHave_openModificationMassesDisplay = false;

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
        if ( psmListItem.openModificationMassAndPositionsList ) {
            anyPsmsHave_openModificationMassesDisplay = true;
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

            /*
                If there is an open mod mass associated w/ this PSM and it localizes to a single position,
                pass that position through to the lorikeet spectrum viewer link construction

                Mike Riffle (01-2021)
             */
            let openModPosition: OpenModPosition_DataType = null;
            if ( anyPsmsHave_openModificationMassesDisplay ) {

                if(openModPositionOverride) {
                    openModPosition = openModPositionOverride;

                } else {

                    if (psmListItem.openModificationMassAndPositionsList && psmListItem.openModificationMassAndPositionsList.length === 1) {
                        const positionEntries_Optional = psmListItem.openModificationMassAndPositionsList[0].positionEntries_Optional;

                        if (positionEntries_Optional && positionEntries_Optional.length === 1) {
                            const positionEntry = positionEntries_Optional[0];

                            if (positionEntry.is_N_Terminal) {
                                openModPosition = 'n';
                            } else if (positionEntry.is_C_Terminal) {
                                openModPosition = 'c';
                            } else {
                                openModPosition = positionEntry.position;
                            }
                        }
                    }
                }
            }

            const cellMgmt_ExternalReactComponent_Data = { psmId, projectSearchId, openModPosition }

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

        if ( anyPsmsHave_openModificationMassesDisplay ) {
            let valueDisplay = "";
            let valueSort = "";
            if ( psmListItem.openModificationMassAndPositionsList && psmListItem.openModificationMassAndPositionsList.length > 0 ) {

                const openModificationMassAsString_List = [];
                for ( const openModificationMassAndPositionsEntry of psmListItem.openModificationMassAndPositionsList ) {
                    const openModMass = openModificationMassAndPositionsEntry.openModMass;
                    const positionEntries_Optional = openModificationMassAndPositionsEntry.positionEntries_Optional;
                    const openModificationMass_String = openModMass.toString();
                    let outputEntry_positionsSubstring = "";
                    if ( positionEntries_Optional ) {
                        const positionNumbers = [];
                        let is_N_Terminal = false;
                        let is_C_Terminal = false;
                        for ( const positionEntry of positionEntries_Optional ) { // positionEntry : { position, is_N_Terminal, is_C_Terminal }
                            if ( positionEntry.is_N_Terminal ) {
                                is_N_Terminal = true;
                            } else if ( positionEntry.is_C_Terminal ) {
                                is_C_Terminal = true;
                            }
                            if ( ( ! positionEntry.is_N_Terminal ) && ( ! positionEntry.is_C_Terminal ) ) {
                                positionNumbers.push(positionEntry.position);
                            }
                        }

                        let positionNumbers_JoinString = "";

                        if ( positionNumbers.length > 0 ) {
                            positionNumbers.sort((a, b) => {
                                if (a < b) {
                                    return -1;
                                }
                                if (a > b) {
                                    return 1;
                                }
                                return 0;
                            });

                            positionNumbers_JoinString = positionNumbers.join(", ");
                        }

                        let n_TerminalLabel = ""
                        let n_TerminalSeparator = ""
                        if ( is_N_Terminal ) {
                            n_TerminalLabel = "n-term"
                            if ( positionNumbers_JoinString.length > 0 ) {
                                n_TerminalSeparator = ", "
                            }
                        }
                        let c_TerminalLabel = ""
                        let c_TerminalSeparator = ""
                        if ( is_C_Terminal ) {
                            c_TerminalLabel = "c-term"
                            if ( positionNumbers_JoinString.length > 0 ) {
                                c_TerminalSeparator = ", "
                            }
                        }
                        outputEntry_positionsSubstring = " (" + n_TerminalLabel + n_TerminalSeparator + positionNumbers_JoinString + c_TerminalSeparator + c_TerminalLabel + ")";
                    }
                    const outputEntryString = openModificationMass_String + outputEntry_positionsSubstring
                    openModificationMassAsString_List.push( outputEntryString );
                }
                valueDisplay = openModificationMassAsString_List.join(", ");
                valueSort = psmListItem.openModificationMassAndPositionsList[ 0 ]; // Sort on first entry mass
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
        anyPsmsHave_reporterIonMassesDisplay,
        anyPsmsHave_openModificationMassesDisplay
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
    psmList: any
    projectSearchId : number
    dataPageStateManager : DataPageStateManager 
}) {

    //   Sort PSM Array on PSM Ann Types Sort Order then PSM Id

    /**
     * Return array ann type entries, sorted on sortOrder
     */
    let psm_AnnotationTypeRecords_WhereSortOrderPopulated : Array<AnnotationTypeItem> = _get_Psm_AnnotationTypeRecords_WhereSortOrderPopulated({ projectSearchId, dataPageStateManager });

    let psm_AnnotationTypeRecords_WhereSortOrderPopulated_Length = psm_AnnotationTypeRecords_WhereSortOrderPopulated.length;

    psmList.sort( function( a: any, b: any ) {

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
}) : Array<AnnotationTypeItem> {

    //   Get all Psm annotation type records with sortOrder set

    let annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

    let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }


    const psmFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes;
    const psmDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes;

    if ( ( ! psmFilterableAnnotationTypes_Map ) && ( ! psmDescriptiveAnnotationTypes_Map ) ) {
        //  No data so return empty array
        return []; //  EARLY RETURN
    }
    
    //  Get AnnotationType Records where sortOrder is populated
    
    let psmAnnotationTypes_SortOrderPopulated : Array<AnnotationTypeItem> = [];
    
    {
        for ( const psmFilterableAnnotationTypes_MapEntry of psmFilterableAnnotationTypes_Map.entries() ) {

            const psmFilterableAnnotationType : AnnotationTypeItem = psmFilterableAnnotationTypes_MapEntry[ 1 ];
        
            if ( psmFilterableAnnotationType.sortOrder ) {
                psmAnnotationTypes_SortOrderPopulated.push( psmFilterableAnnotationType );
            }
        }
    }
    {
        for ( const psmDescriptiveAnnotationTypes_MapEntry of psmDescriptiveAnnotationTypes_Map.entries() ) {

            const psmDescriptiveAnnotationType : AnnotationTypeItem = psmDescriptiveAnnotationTypes_MapEntry[ 1 ];
        
            if ( psmDescriptiveAnnotationType.sortOrder ) {
                psmAnnotationTypes_SortOrderPopulated.push( psmDescriptiveAnnotationType );
            }
        }
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
} ) : { psmAnnotationTypesForPsmListEntries : Array<AnnotationTypeItem> } {

    //   Get all annotation type ids returned in all entries and produce a list of them to put in columns
    
    let annotationTypeData : AnnotationTypeData_Root = dataPageStateManager.get_annotationTypeData_Root();

    let annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = annotationTypeData.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }
    
    const allPSMAnnotationTypeIds_InPsmList_Set : Set<number> = new Set();

    psmList.forEach( function( psmListItem, index, array ) {
        let psmAnnotationMap = psmListItem.psmAnnotationMap;
        if ( psmAnnotationMap ) {
            Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
                const psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
                if ( ! variable_is_type_number_Check( psmAnnotationDTOItem.annotationTypeId ) ) {
                    const msg = "Entry in psmAnnotationMap: psmAnnotationDTOItem.annotationTypeId is not a number. psmAnnotationDTOItem.annotationTypeId: " + psmAnnotationDTOItem.annotationTypeId;
                    console.warn( msg );
                    throw Error( msg );
                }
                allPSMAnnotationTypeIds_InPsmList_Set.add( psmAnnotationDTOItem.annotationTypeId );
            }, this );
        }
    }, this );
    
    //  Pull AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
    
    let psmAnnotationTypesForPsmListEntries : Array<AnnotationTypeItem> = [];
    
    //  PSM
    
    if ( allPSMAnnotationTypeIds_InPsmList_Set.size > 0 ) {
        //  Have PSM AnnotationType entries in Peptide list so must have PSM AnnotationType records

        let psmFilterableAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes
        let psmDescriptiveAnnotationTypes : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.psmDescriptiveAnnotationTypes
        if ( ( ! psmFilterableAnnotationTypes ) && ( ! psmDescriptiveAnnotationTypes ) ) {
            throw Error("No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes but have allPSMAnnotationTypeIds_InPsmList entries");
        }
        //  Get AnnotationTypeRecords for AnnotationTypeIds
        for ( const allPSMAnnotationTypeIds_InPsmListKeyItem of allPSMAnnotationTypeIds_InPsmList_Set ) {
            let annotationTypeEntryForKey = psmFilterableAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
            if ( ! annotationTypeEntryForKey ) {
                annotationTypeEntryForKey = psmDescriptiveAnnotationTypes.get( allPSMAnnotationTypeIds_InPsmListKeyItem );
                if ( ! annotationTypeEntryForKey ) {
                    throw Error( "No psmFilterableAnnotationTypes or psmDescriptiveAnnotationTypes entry for key: " + allPSMAnnotationTypeIds_InPsmListKeyItem );
                }
            }
            psmAnnotationTypesForPsmListEntries.push( annotationTypeEntryForKey );
        }
    }

    //  Sort this result array, on display order, then by ann type name
    
    _sort_AnnotationTypes_OnDisplayOrderAnnTypeName( psmAnnotationTypesForPsmListEntries );
    
    return {
        psmAnnotationTypesForPsmListEntries : psmAnnotationTypesForPsmListEntries
    };
}


/**
 * 
 */
const _sort_AnnotationTypes_OnDisplayOrderAnnTypeName = function( annTypesArray : Array<AnnotationTypeItem> ) {

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
