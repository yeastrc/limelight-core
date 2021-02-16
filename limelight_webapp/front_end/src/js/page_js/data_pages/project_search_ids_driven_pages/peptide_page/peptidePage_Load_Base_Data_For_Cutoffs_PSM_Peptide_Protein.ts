/**
 * peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.ts
 *
 * Javascript for peptideView.jsp page - Load Data for Cutoffs in Search Details (PSM/Peptide/...)
 *
 */


import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {get_OpenModificationsForReportedPeptideIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides";
import {loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_PeptideSequences_LoadTo_loadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/loadPeptideSequencesForReportedPeptideIds_SingleSearch_LoadTo_loadedDataCommonHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";


/**
 *
 *
 */
export const peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein = function (
    {
        projectSearchIds,
        dataPageStateManager_DataFrom_Server,
        searchDetailsBlockDataMgmtProcessing,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,  //  Updated in this function
        loadedDataCommonHolder                                      //  Updated in this function
    } : {
        projectSearchIds : Array<number>
        dataPageStateManager_DataFrom_Server : DataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    }
) : Promise<any> {

    // const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = (
    //     searchDetailsBlockDataMgmtProcessing.
    //     getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined })
    // );

    return new Promise<void>( (resolve, reject) => {
        try {
            const getDataFromServer_AllPromises = [];

            for (const projectSearchId of projectSearchIds) {

                const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);

                let searchDataLookupParams_For_Single_ProjectSearchId = searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );

                if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
                    const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
                    console.log( msg );
                    throw Error( msg );
                }

                let load_searchSubGroupsData = false;
                if ( dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() ) {
                    load_searchSubGroupsData = true;
                }
                const promise_Single_ProjectSearchId = new Promise<void>( (resolve, reject) => {
                    try {
                        const promise_getDataFromServer = (
                            loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder( {
                                projectSearchId,
                                searchDataLookupParams_For_Single_ProjectSearchId,
                                loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
                                load_searchSubGroupsData,
                                forPeptidePage : true
                            } )
                        );

                        promise_getDataFromServer.catch((reason) => {
                            throw Error( "promise_getDataFromServer.catch reason: " + reason )
                        });

                        promise_getDataFromServer.then( (result) => {
                            try {

                                //  Process for all reportedPeptideIds for projectSearchId

                                const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
                                if (!reportedPeptideIds) {
                                    const msg = "PeptideViewPage: peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein: no value in loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() for projectSearchId: " + projectSearchId;
                                    console.warn(msg);
                                    throw Error(msg);
                                }

                                const promises__get_Array: Array<Promise<any>> = [];

                                {
                                    const promise_get__ = get_OpenModificationsForReportedPeptideIds({loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds});

                                    if (promise_get__) { //  May return null so test before add to array
                                        promises__get_Array.push(promise_get__);
                                    }
                                }
                                {
                                    const promise_get__ = loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder});

                                    if (promise_get__) { //  May return null so test before add to array
                                        promises__get_Array.push(promise_get__);
                                    }
                                }
                                {
                                    const promise_get__ = loadData_PeptideSequences_LoadTo_loadedDataCommonHolder( { projectSearchId, reportedPeptideIds, loadedDataCommonHolder } );
                                    if (promise_get__) { //  May return null so test before add to array
                                        promises__get_Array.push(promise_get__);
                                    }
                                }

                                if ( promises__get_Array.length === 0 ) { //  No Promises

                                    resolve();

                                } else {

                                    const promiseAll = Promise.all( promises__get_Array );

                                    promiseAll.catch((reason) => {
                                        throw Error( "promiseAll.catch reason: " + reason )
                                    });

                                    promiseAll.then( (result) => {
                                        try {
                                            resolve();

                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    });
                                }
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

                getDataFromServer_AllPromises.push(promise_Single_ProjectSearchId);
            }

            const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);

            promise_getDataFromServer_AllPromises.catch((reason) => {
                throw Error( "promise_getDataFromServer_AllPromises.catch reason: " + reason )
            });

            promise_getDataFromServer_AllPromises.then((value) => {
                try {

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}
