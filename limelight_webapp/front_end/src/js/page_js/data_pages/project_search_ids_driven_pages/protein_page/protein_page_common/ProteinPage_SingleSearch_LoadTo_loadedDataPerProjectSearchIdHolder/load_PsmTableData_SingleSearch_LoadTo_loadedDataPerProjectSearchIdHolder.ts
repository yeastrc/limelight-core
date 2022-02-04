/**
 * load_PsmTableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {dataPage_common_Data_Holder_SingleSearch_PsmTblData_LoadData} from "page_js/data_pages/data_pages_common/psm_data_from_server/dataPage_common_Data_Holder_SingleSearch_PsmTblData_LoadData";

/**
 * Get PSM Table Data from Reported Peptide Ids
 *
 * return null if no loading of data needed
 */
export const load_PsmTableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        loadedDataPerProjectSearchIdHolder,
        searchDataLookupParams_For_Single_ProjectSearchId
    } : {
        projectSearchId: number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId

    }) : Promise<unknown> {

    const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if ( ! reportedPeptideIds ) {
        const msg = "loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() not return a value: load_PsmTableData_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
        console.warn( msg );
        throw Error( msg );
    }

    if ( reportedPeptideIds.length === 0 ) {
        //  No reportedPeptideIds

        return null; // EARLY RETURN
    }

    if ( loadedDataPerProjectSearchIdHolder.get_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root() ) {
        //  Have loaded data

        return null; // EARLY RETURN
    }

    return new Promise<void>( (resolve, reject) => {
        try {
            const promise = dataPage_common_Data_Holder_SingleSearch_PsmTblData_LoadData({ projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId });

            promise.catch( function(reason) {
                try {
                    // Catches the reject from any promise in the chain
                    reject( reason );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise.then(function( psmData ) {
                try {
                    loadedDataPerProjectSearchIdHolder.set_DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root(psmData);
                    resolve();
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
