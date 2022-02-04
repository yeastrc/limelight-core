/**
 * dataPage_common_Data_Holder_SingleSearch_PsmTblData_LoadData.ts
 *
 * Common Data - Data Loaded - From Server - Single Search - PSM Table Data - Load Data
 *
 */
import {
    DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSinglePsmId,
    DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId,
    DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root
} from "page_js/data_pages/data_pages_common/psm_data_from_server/dataPage_common_Data_Holder_SingleSearch_PsmTblData";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


/**
 *
 * @param projectSearchId
 * @param reportedPeptideIds
 * @param searchDataLookupParams_For_Single_ProjectSearchId
 */
export const dataPage_common_Data_Holder_SingleSearch_PsmTblData_LoadData = function (
    {
        projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId
    } : {
        projectSearchId: number
        reportedPeptideIds: Array<number>
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId

    }
) : Promise<DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root> {

    const reportedPeptideIds_Local = Array.from( reportedPeptideIds );

    //  Sort numbers ascending so the same request always sent to the server to match prev request for caching.

    reportedPeptideIds_Local.sort( (a,b) => {
        if ( a < b ) {
            return  -1;
        }
        if ( a > b ) {
            return  1;
        }
        return 0;
    } );

    const promise = new Promise<DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

            const requestData = { projectSearchId, reportedPeptideIds: reportedPeptideIds_Local, searchDataLookupParams_For_Single_ProjectSearchId };

            console.log( "START: getting data from URL: " + url );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                try {
                    console.log( "END: REJECTED: getting data from URL: " + url );

                    reject()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    console.log( "END: Successful: getting data from URL: " + url );

                    const psmTblData = _populateHolder({ responseData });

                    resolve(psmTblData);

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            } );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

    return promise;
}


/**
 *
 */
const _populateHolder = function (
    {
        responseData
    } : {
        responseData: any

    }) : DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root {

    const psmTblData_Map_Key_ReportedPeptideId = new Map<number, DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId>();
    const psmTblData_Map_Key_PsmId = new Map<number, DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSinglePsmId>();

    if ( responseData.reportedPeptideId_psmTblDataList_List ) {
        if ( ! ( responseData.reportedPeptideId_psmTblDataList_List instanceof Array ) ) {
            const msg = "( ! ( responseData.reportedPeptideId_psmTblDataList_List instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const reportedPeptideId_psmTblDataList_Entry of responseData.reportedPeptideId_psmTblDataList_List ) {
            if ( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === undefined || reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === null ) {
                const msg = "( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === undefined || reportedPeptideId_psmTblDataList_Entry.reportedPeptideId === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId ) ) {
                const msg = "( ! variable_is_type_number_Check( reportedPeptideId_psmTblDataList_Entry.reportedPeptideId ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( reportedPeptideId_psmTblDataList_Entry.psms === undefined || reportedPeptideId_psmTblDataList_Entry.psms === null ) {
                const msg = "( reportedPeptideId_psmTblDataList_Entry.psms === undefined || reportedPeptideId_psmTblDataList_Entry.psms === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! ( reportedPeptideId_psmTblDataList_Entry.psms instanceof Array ) ) {
                const msg = "( ! ( reportedPeptideId_psmTblDataList_Entry.psms instanceof Array ) )";
                console.warn(msg);
                throw Error(msg);
            }

            const reportedPeptideId = reportedPeptideId_psmTblDataList_Entry.reportedPeptideId;

            const psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId = new Map<number, DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSinglePsmId>();

            for ( const psmEntry of reportedPeptideId_psmTblDataList_Entry.psms ) {

                //  Copy in from Parent reportedPeptideId_psmTblDataList_Entry
                psmEntry.reportedPeptideId = reportedPeptideId;

                const psm : DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSinglePsmId = psmEntry;

                if ( psm.psmId === undefined || psm.psmId === null ) {
                    const msg = "( psm.psmId === undefined || psm.psmId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( psm.psmId ) ) {
                    const msg = "( ! variable_is_type_number_Check( psm.psmId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null ) {
                    const msg = "( psm.reportedPeptideId === undefined || psm.reportedPeptideId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( psm.reportedPeptideId ) ) {
                    const msg = "( ! variable_is_type_number_Check( psm.reportedPeptideId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.charge === undefined || psm.charge === null ) {
                    const msg = "( psm.charge === undefined || psm.charge === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( psm.charge ) ) {
                    const msg = "( ! variable_is_type_number_Check( psm.charge ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.scanNumber === undefined || psm.scanNumber === null ) {
                    const msg = "( psm.scanNumber === undefined || psm.scanNumber === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( psm.scanNumber ) ) {
                    const msg = "( ! variable_is_type_number_Check( psm.scanNumber ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                //  Optional values
                if ( psm.searchScanFileId !== undefined && psm.searchScanFileId !== null ) {
                    if ( ! variable_is_type_number_Check( psm.searchScanFileId ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.searchScanFileId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( psm.retentionTimeSeconds !== undefined && psm.retentionTimeSeconds !== null ) {
                    if ( ! variable_is_type_number_Check( psm.retentionTimeSeconds ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.retentionTimeSeconds ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                if ( psm.precursor_M_Over_Z !== undefined && psm.precursor_M_Over_Z !== null ) {
                    if ( ! variable_is_type_number_Check( psm.precursor_M_Over_Z ) ) {
                        const msg = "( ! variable_is_type_number_Check( psm.precursor_M_Over_Z ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }
                //  Boolean values
                if ( psm.hasModifications === undefined || psm.hasModifications === null ) {
                    const msg = "( psm.hasModifications === undefined || psm.hasModifications === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null ) {
                    const msg = "( psm.hasOpenModifications === undefined || psm.hasOpenModifications === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( psm.hasReporterIons === undefined || psm.hasReporterIons === null ) {
                    const msg = "( psm.hasReporterIons === undefined || psm.hasReporterIons === null )";
                    console.warn(msg);
                    throw Error(msg);
                }

                psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId.set( psm.psmId, psm );

                psmTblData_Map_Key_PsmId.set( psm.psmId, psm );
            }

            const single_ReportedPeptideId_Entry = new DataPage_common_Data_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId({
                reportedPeptideId, psmTblData_Map_Key_PsmId: psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId
            })

            psmTblData_Map_Key_ReportedPeptideId.set( reportedPeptideId, single_ReportedPeptideId_Entry )
        }
    }

    const psmTblData = new DataPage_common_Data_Holder_SingleSearch_PsmTblData_Root({ psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId });

    return psmTblData;
}