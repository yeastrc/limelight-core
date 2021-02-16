/**
 * loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * called for Single Protein after initial show for a single search ( single project search id )
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 * Javascript for proteinView.jsp page - Get data from Server and Process/Reformat it before storing it
 *
 * Companion file to proteinViewPage_DisplayData_SingleSearch.js
 *
 *
 * !!!!!!!!!!   Also used in Multiple Search page, with flags like 'retrieveForMultipleSearches'   !!!!!!!!!!!!!!
 *
 * Also includes export function loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {AnnotationTypeData_Root, AnnotationTypeItem, DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";



/**
 * @param retrieveForSingleSearch : boolean, true if retrieving for use with Single Search
 * @param retrieveForMultipleSearches : boolean, true if retrieving for use with Multiple Searches
 */
export const loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        retrieveForSingleSearch, retrieveForMultipleSearches,

        proteinSequenceVersionId, projectSearchId,
        searchDetailsBlockDataMgmtProcessing, loadedDataPerProjectSearchIdHolder, loadedDataCommonHolder,
        dataPageStateManager_DataFrom_Server,
        // Optional
        searchDataLookupParamsRoot // , reportedPeptideIds_Override
    } :  {
        retrieveForSingleSearch: boolean
        retrieveForMultipleSearches: boolean

        proteinSequenceVersionId: number
        projectSearchId: number
        searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        dataPageStateManager_DataFrom_Server : DataPageStateManager

        // Optional
        searchDataLookupParamsRoot?: SearchDataLookupParameters_Root
        // reportedPeptideIds_Override? : Array<number>
    } ) {

    let reportedPeptideIds : Array<number> = undefined;
    //
    // if ( reportedPeptideIds_Override ) {
    //
    //     //  Use parameter since populated
    //     reportedPeptideIds = reportedPeptideIds_Override;
    //
    // } else {

        //  Get Reported Peptide Ids

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

        const reportedPeptideIds_FromHolder = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( reportedPeptideIds_FromHolder === undefined || reportedPeptideIds_FromHolder.length === 0 ) {

            // No Reported Peptide Ids so skip

            return new Promise<void>( ( resolve, reject) => {
                try {
                    resolve();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            // EARLY RETURN
        }

        reportedPeptideIds = Array.from( reportedPeptideIds_FromHolder );
    // }

    let reportedPeptideIds_Set = new Set( reportedPeptideIds );


    return new Promise<void>( ( resolve, reject) => {
        try {
            const promises_LoadData_Array = [];

            if ( retrieveForSingleSearch ) {
                //  Called from display of Single Search

                //  Get Ann Type Ids for Ann Types that are to be displayed, Default or User chosen

                let searchDataLookupParams_For_Single_ProjectSearchId = undefined;


                if ( searchDataLookupParamsRoot ) {

                    const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
                    const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

                    for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
                        if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {

                            searchDataLookupParams_For_Single_ProjectSearchId = paramsForProjectSearchId;
                            break;
                        }
                    }
                    if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
                        const msg = "No entry in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
                        console.warn( msg )
                        throw Error( msg )
                    }

                } else {

                    searchDataLookupParams_For_Single_ProjectSearchId =
                        searchDetailsBlockDataMgmtProcessing.
                        getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined /* , optional dataPageStateManager */ } );
                }

                //  Array of Ann Type Ids
                const reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId: Array<number> = searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay;

                if ( ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) || reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId.length === 0 ) {
                    //  No Ann Type Ids to display Data for so Skip

                } else {
                    const promise_loadReportedPeptideAnnotationDataIfNeeded = _loadReportedPeptideAnnotationDataIfNeeded( {
                        reportedPeptideIds: reportedPeptideIds_Set,
                        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId,
                        projectSearchId,
                        loadedDataPerProjectSearchIdHolder,
                        dataPageStateManager_DataFrom_Server
                    } );
                    if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
                        promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
                    }
                }
            }

            if ( retrieveForMultipleSearches ) {
                //  Called from display of Multiple Searches

                const promise_loadPeptideIdsIfNeeded = loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder(
                    {
                        reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
                    } );
                if ( promise_loadPeptideIdsIfNeeded ) {
                    promises_LoadData_Array.push( promise_loadPeptideIdsIfNeeded );
                }
            }

            if ( promises_LoadData_Array.length !== 0 ) {

                const promisesAll = Promise.all( promises_LoadData_Array );

                promisesAll.catch( (reason) => {
                    reject( reason );
                })

                promisesAll.then( (value) => {
                    try {
                        resolve();
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

            } else {

                resolve();
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}


/**
 *
 * @param reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param - Optional.  If not passed, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId retrieved from searchDetailsBlockDataMgmtProcessing
 *             value: { reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId }
 */
export const loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param, projectSearchId,
        searchDetailsBlockDataMgmtProcessing,
        loadedDataPerProjectSearchIdHolder, loadedDataCommonHolder,
        dataPageStateManager_DataFrom_Server
    } : {
        reportedPeptideIds: Set<number>
        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param: {
            reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId : Array<number>
        }
        projectSearchId: number
        searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    } ) {

    return new Promise( ( resolve, reject) => {
        try {
            const promises_LoadData_Array = [];

            const promise_loadReportedPeptideStringsIfNeeded = loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( { reportedPeptideIds, projectSearchId, loadedDataCommonHolder } );
            if ( promise_loadReportedPeptideStringsIfNeeded ) {
                promises_LoadData_Array.push( promise_loadReportedPeptideStringsIfNeeded );
            }

            //  Get Ann Type Ids for Ann Types that are to be displayed, Default or User chosen

            let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = undefined;

            if ( reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param ) {

                //  Get reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId from function param reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param

                reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param.reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId;

            } else if ( searchDetailsBlockDataMgmtProcessing ) {

                //  Get reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId from searchDetailsBlockDataMgmtProcessing...

                const searchDataLookupParams_For_Single_ProjectSearchId = (
                    searchDetailsBlockDataMgmtProcessing.
                    getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined /* , optional dataPageStateManager */ } )
                );

                //  Array of Ann Type Ids
                reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = searchDataLookupParams_For_Single_ProjectSearchId.reportedPeptideAnnTypeDisplay;

            } else {
                const msg = "ERROR: loadData_MultipleSearches_ShowReportedPeptidesForSingleSearch(...): Neither is populated reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId_Param or searchDetailsBlockDataMgmtProcessing";
                console.warn( msg );
                throw Error( msg );
            }

            if ( ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) || reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId.length === 0 ) {
                //  No Ann Type Ids to display Data for so Skip

            } else {
                const promise_loadReportedPeptideAnnotationDataIfNeeded = _loadReportedPeptideAnnotationDataIfNeeded({
                    reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId, projectSearchId,
                    loadedDataPerProjectSearchIdHolder,
                    dataPageStateManager_DataFrom_Server
                } );
                if ( promise_loadReportedPeptideAnnotationDataIfNeeded ) {
                    promises_LoadData_Array.push( promise_loadReportedPeptideAnnotationDataIfNeeded );
                }
            }

            if ( promises_LoadData_Array.length !== 0 ) {

                const promisesAll = Promise.all( promises_LoadData_Array );

                promisesAll.catch( (reason) => {
                    try {
                        reject( reason );
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

                promisesAll.then( (value) => {
                    try {
                        resolve( value );
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })

            } else {

                resolve(null);
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}



//   Single Search Retrievals

/**
 * Load Reported Peptide Annotation Data If Not Already Loaded, based on defaultVisible
 */
const _loadReportedPeptideAnnotationDataIfNeeded = function (
    {
        reportedPeptideIds, reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId, projectSearchId,
        loadedDataPerProjectSearchIdHolder,
        dataPageStateManager_DataFrom_Server
    } : {
        reportedPeptideIds: Set<number>
        reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId: Array<number>
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    } ) {

    //  Get Annotation Types

    const annotationTypeData_Root : AnnotationTypeData_Root = dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();
    if ( ( ! annotationTypeData_Root ) ) {
        throw Error("No annotation type data loaded." );
    }

    const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ( ! annotationTypeDataForProjectSearchId ) ) {
        throw Error("No annotation type data for projectSearchId: " + projectSearchId );
    }
    //  Objects: Keys are Annotation Type Id.  Properties: defaultVisible, 1
    const reportedPeptideFilterableAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes;
    const reportedPeptideDescriptiveAnnotationTypes_Map : Map<number, AnnotationTypeItem> = annotationTypeDataForProjectSearchId.reportedPeptideDescriptiveAnnotationTypes;

    // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
    const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId =
        loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();

    // Map <integer,<integer,Object>> <reportedPeptideId,<<annTypeId,{ valueDouble, valueString }>>
    const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId =
        loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();

    const promiseAll_Array = [];

    {
        //  Process Reported Peptide Filterable Annotation Types

        // { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
        const dataToLoad =
            _getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading(
                {
                    reportedPeptideIds : reportedPeptideIds,
                    reportedPeptideAnnTypeIdsDisplay: reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId,
                    annotationTypes_Map : reportedPeptideFilterableAnnotationTypes_Map,
                    reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId : reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId
                } );

        if ( dataToLoad && dataToLoad.reportedPeptideIdsToLoadDataFor && dataToLoad.annotationTypeIdsToLoadDataFor_Set ) {

            //  Load data for specified ids

            //  Convert to arrays for convert to JSON
            const reportedPeptideIds = Array.from( dataToLoad.reportedPeptideIdsToLoadDataFor );
            const annTypeIds = Array.from( dataToLoad.annotationTypeIdsToLoadDataFor_Set );

            const promise_loadData = loadReportedPeptideAnnotationFilterableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( { reportedPeptideIds, annTypeIds, projectSearchId, loadedDataPerProjectSearchIdHolder } );

            promiseAll_Array.push( promise_loadData );
        }
    }

    {
        //  Process Reported Peptide Descriptive Annotation Types

        // { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
        const dataToLoad =
            _getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading(
                { reportedPeptideIds : reportedPeptideIds,
                    reportedPeptideAnnTypeIdsDisplay: reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId,
                    annotationTypes_Map : reportedPeptideDescriptiveAnnotationTypes_Map,
                    reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId : reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId } );

        if ( dataToLoad && dataToLoad.reportedPeptideIdsToLoadDataFor && dataToLoad.annotationTypeIdsToLoadDataFor_Set ) {

            //  Load data for specified ids

            //  Convert to arrays for convert to JSON
            const reportedPeptideIds = Array.from( dataToLoad.reportedPeptideIdsToLoadDataFor );
            const annTypeIds = Array.from( dataToLoad.annotationTypeIdsToLoadDataFor_Set );

            const promise_loadData = _loadReportedPeptideAnnotationDescriptiveData( { reportedPeptideIds, annTypeIds, projectSearchId, loadedDataPerProjectSearchIdHolder } );

            promiseAll_Array.push( promise_loadData );
        }
    }

    if ( promiseAll_Array.length === 0 ) {
        return null;
    }

    return Promise.all( promiseAll_Array );
}


/**
 * Load Reported Peptide Descriptive Ann Data
 */
const _loadReportedPeptideAnnotationDescriptiveData = function (
    {
        reportedPeptideIds, annTypeIds, projectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideIds: Array<number>
        annTypeIds: Array<number>
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    } ) {

    return new Promise<void>(function(resolve, reject) {
        try {
            const promise_LoadData =
                _getReportedPeptideDescriptiveAnnData_From_ReportedPeptideIds_AnnTypeIds(
                    { projectSearchId,
                        reportedPeptideIds : reportedPeptideIds,
                        annTypeIds : annTypeIds } );

            promise_LoadData.then(function( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer ) {
                try {
                    _processReportedPeptideDescriptiveAnnDataFromServer_Populate_loadedData( { annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer, loadedDataPerProjectSearchIdHolder } );

                    resolve();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise_LoadData.catch( function(reason) {
                try {
                    // Catches the reject from any promise in the chain
                    reject( reason );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })
}


/**
 * Populate loadedData with data from dataFromServer.
 *
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId : Map Key reportedPeptideIdInt, Value: Map <annTypeIdInt, { valueDouble, valueString }
 *
 */
const _processReportedPeptideDescriptiveAnnDataFromServer_Populate_loadedData = function (
    {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer,
        loadedDataPerProjectSearchIdHolder
    } : {
        annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer: any
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : void {

    //  JS Object.   <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

    //  Translate to Map, parsing object keys to int

    let annData_KeyAnnTypeId_KeyReportedPeptideId =
        loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();

    if ( ! annData_KeyAnnTypeId_KeyReportedPeptideId ) {
        annData_KeyAnnTypeId_KeyReportedPeptideId = new Map();
    }

    let reportedPeptideIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer );

    for ( const reportedPeptideIdString of reportedPeptideIdsFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const annData_KeyAnnTypeId_FromServer = annData_KeyAnnTypeId_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];

        let annData_KeyAnnTypeId = annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideIdInt );
        if ( ! annData_KeyAnnTypeId ) {
            annData_KeyAnnTypeId = new Map();
            annData_KeyAnnTypeId_KeyReportedPeptideId.set( reportedPeptideIdInt, annData_KeyAnnTypeId );
        }

        let annTypeIdsFromServer_Keys = Object.keys( annData_KeyAnnTypeId_FromServer );

        for ( const annTypeIdString of annTypeIdsFromServer_Keys ) {
            const annTypeIdInt = Number.parseInt( annTypeIdString );
            const annData_FromServer = annData_KeyAnnTypeId_FromServer[ annTypeIdString ];

            const annData = { valueString : annData_FromServer.valueString, valueDouble : annData_FromServer.valueDouble }; //  Not applicable to Descriptive Annotation values: valueDouble : annData_FromServer.valueDouble,

            annData_KeyAnnTypeId.set( annTypeIdInt, annData );
        }
    }

    loadedDataPerProjectSearchIdHolder.set_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId( annData_KeyAnnTypeId_KeyReportedPeptideId );
}



/**
 * Get Reported Peptide Descriptive Annotation Data From Reported Peptide Ids, Ann Type Ids
 */
const _getReportedPeptideDescriptiveAnnData_From_ReportedPeptideIds_AnnTypeIds = function (
    {
        projectSearchId, reportedPeptideIds, annTypeIds
    }: {
        reportedPeptideIds: Array<number>
        annTypeIds: Array<number>
        projectSearchId: number
    } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds,
                annotationTypeIds : annTypeIds
            };

            console.log("AJAX Call to get reported-peptide-descriptive-ann-data START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/reported-peptide-descriptive-ann-data-list-rep-pept-ids-ann-type-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get reported-peptide-descriptive-ann-data END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, <Ann Type Id, SearchReportedPeptideDescriptiveAnnotationDTO>> annData_KeyAnnTypeId_KeyReportedPeptideId;

                    resolve( responseData.annData_KeyAnnTypeId_KeyReportedPeptideId );

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

    return promise;
}

/**
 * return Ann Type Ids and Reported Peptide Ids to Load for either Filterable or Descriptive
 *
 * @param reportedPeptideAnnTypeIdsDisplay is Array of Ann Type Ids
 * @param annotationTypes - Object of Ann Type data for either Filterable or Descriptive, keys are Ann Type Ids
 */
const _getReportedPeptideIdsAnnotationTypeIdsThatNeedLoading = function (
    {
        reportedPeptideIds,
        reportedPeptideAnnTypeIdsDisplay,
        annotationTypes_Map,
        reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId
    } : {
        reportedPeptideIds: Set<number>
        reportedPeptideAnnTypeIdsDisplay: Array<number>
        annotationTypes_Map : Map<number, AnnotationTypeItem>
        reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId: Map<number, Map<number, {valueDouble: number, valueString: string}>>
    } ) {

    //  reportedPeptideAnnTypeIdsDisplay is Array of Ann Type Ids
    //  

    if ( ( ! reportedPeptideAnnTypeIdsDisplay ) || reportedPeptideAnnTypeIdsDisplay.length === 0 ) {

        // No Chosen Reported Peptide Annotation data so skip
        return null; // EARLY RETURN
    }

    //  Create set of Ann Type Ids from reportedPeptideAnnTypeIdsDisplay 
    //     that is specific to Filterable or Descriptive Ann Types 
    //     as specified by contents of annotationTypes

    const annTypeIdsToProcess = new Set<number>();

    for ( const annTypeIdDisplay of reportedPeptideAnnTypeIdsDisplay ) {

        //  Can remove this check when add type to reportedPeptideAnnTypeIdsDisplay
        if ( ! variable_is_type_number_Check( annTypeIdDisplay ) ) {
            const msg = "annTypeIdDisplay from reportedPeptideAnnTypeIdsDisplay it not a number type variable.  annTypeIdDisplay: " + annTypeIdDisplay;
            console.warn( msg );
            throw Error( msg );
        }
        const annotationType = annotationTypes_Map.get( annTypeIdDisplay );
        if ( annotationType ) {
            annTypeIdsToProcess.add( annTypeIdDisplay );
        }
    }

    if ( annTypeIdsToProcess.size === 0 ) {

        // No Annotation Type Ids To Process so skip
        return null; // EARLY RETURN
    }

    //  This is not highly optimized and may result in loading some data that is already loaded.

    //  Any Annotation Type Ids that are missing for any of the Reported Peptide Ids 
    //    will be loaded for all the Reported Peptide Ids.

    let reportedPeptideIdsToLoadDataFor: Set<number> = undefined;

    let annotationTypeIdsToLoadDataFor_Set: Set<number> = undefined;

    //  Search for Reported Peptide Ids and Annotation Data to be loaded

    if ( ! reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId ) {

        //  No Ann Data so need to load for all Ann Type Ids To Process and All Reported Peptide Ids
        annotationTypeIdsToLoadDataFor_Set = new Set( annTypeIdsToProcess );
        reportedPeptideIdsToLoadDataFor = new Set( reportedPeptideIds );

    } else {

        for ( const reportedPeptideId of reportedPeptideIds ) {

            let peptideAnnotationMap = reportedPeptideAnnData_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );

            if ( ! peptideAnnotationMap ) {

                //  No Data for this Reported Peptide Id so need all Ann data for all reported Peptide Ids
                //  No Ann Data so need to load for all Ann Type Ids To Process and All Reported Peptide Ids
                annotationTypeIdsToLoadDataFor_Set = new Set( annTypeIdsToProcess );
                reportedPeptideIdsToLoadDataFor = new Set( reportedPeptideIds );

                break; //  Exit Loop since need to load for all Default Visible Ann Type Ids and All Reported Peptide Ids

            } else {
                for ( const annotationTypeId of annTypeIdsToProcess ) {

                    const annData = peptideAnnotationMap.get( annotationTypeId );
                    if ( ! annData ) {

                        if ( ! reportedPeptideIdsToLoadDataFor ) {
                            reportedPeptideIdsToLoadDataFor = reportedPeptideIdsToLoadDataFor = new Set();
                        }
                        if ( ! annotationTypeIdsToLoadDataFor_Set ) {
                            annotationTypeIdsToLoadDataFor_Set = new Set();
                        }
                        annotationTypeIdsToLoadDataFor_Set.add( annotationTypeId );
                        reportedPeptideIdsToLoadDataFor.add( reportedPeptideId );
                    }
                }
            }
        }
    }

    //  If empty, reset to undefined
    if ( reportedPeptideIdsToLoadDataFor && reportedPeptideIdsToLoadDataFor.size === 0 ) {
        reportedPeptideIdsToLoadDataFor = undefined;
    }
    //  If empty, reset to undefined
    if ( annotationTypeIdsToLoadDataFor_Set && annotationTypeIdsToLoadDataFor_Set.size === 0 ) {
        annotationTypeIdsToLoadDataFor_Set = undefined;
    }

    return { reportedPeptideIdsToLoadDataFor, annotationTypeIdsToLoadDataFor_Set };
}

