/**
 * proteinExperiment___loadData.ts
 * 
 * 
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

// import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder.js';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


/**
 * 
 * 
 * @returns { loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
 */
const loadProteinDisplayData_Per_ProjectSearchId = function ( { 
    projectSearchIds, 
    searchDataLookupParamsRoot
}:  {
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
} ) {

    return new Promise( (resolve, reject) =>  {
        try {
            const promises_Per_projectSearchId = [];
                
            const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();

            const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
            const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

            for ( const projectSearchId of projectSearchIds ) {

                let searchDataLookupParams_For_Single_ProjectSearchId = undefined;

                for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
                    if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {
                        searchDataLookupParams_For_Single_ProjectSearchId = paramsForProjectSearchId;
                    }
                }

                if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
                    const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
                    console.log( msg );
                    throw Error( msg );
                }

                const  loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();

                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );

                const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = (
                    loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder( { 
                    	projectSearchId, load_searchSubGroupsData : false, searchDataLookupParams_For_Single_ProjectSearchId, loadedDataPerProjectSearchIdHolder 
                    } )
                    //  load_searchSubGroupsData : false since for now not processing subgroup data
                );

                promises_Per_projectSearchId.push( promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer );
            }

            const promises_All = Promise.all( promises_Per_projectSearchId );

            promises_All.catch( (reason) => {  });

            promises_All.then( (promises_All_result) => {
                try {
                    resolve({ loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds })
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
}


export { loadProteinDisplayData_Per_ProjectSearchId }
