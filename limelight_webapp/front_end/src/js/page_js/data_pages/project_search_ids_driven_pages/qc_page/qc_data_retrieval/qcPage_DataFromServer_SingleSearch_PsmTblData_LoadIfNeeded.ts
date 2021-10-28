/**
 * qcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - PSM Tbl Data - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData";


/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_PsmTblData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>

    /**
     * @returns null if no promise needed
     */
    singleSearch_PsmTblData_LoadIfNeeded(
        {
            retrievalParams, data_Holder_SingleSearch
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.psmTblData ) {
            //  Data already loaded so return null
            return null
        }

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const projectSearchId = retrievalParams.projectSearchId;
        const reportedPeptideIds: Array<number> = retrievalParams.loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();
        let searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId = null;

        for ( const entry of retrievalParams.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {
            if ( entry.projectSearchId === projectSearchId ) {
                searchDataLookupParams_For_Single_ProjectSearchId = entry;
                break;
            }
        }
        if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
            const msg = "No entry found in retrievalParams.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList for projectSearchId: " + projectSearchId;
            console.warn(msg);
            throw Error(msg);
        }

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/psm-table-data-per-reported-peptide-id-for-searchcriteria-single-project-search-id-version-0001";

                const requestData = { projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId };

                console.log( "START: getting data from URL: " + url );

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        this._promiseInProgress = null;

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        this._promiseInProgress = null;

                        console.log( "END: Successful: getting data from URL: " + url );

                        _populateHolder({ responseData, data_Holder_SingleSearch });

                        resolve();

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

        return this._promiseInProgress;
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        responseData, data_Holder_SingleSearch
    } : {
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    const psmTblData_Map_Key_ReportedPeptideId = new Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId>();
    const psmTblData_Map_Key_PsmId = new Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>();

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

            const psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId = new Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId>();

            for ( const psmEntry of reportedPeptideId_psmTblDataList_Entry.psms ) {

                //  Copy in from Parent reportedPeptideId_psmTblDataList_Entry
                psmEntry.reportedPeptideId = reportedPeptideId;

                const psm : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSinglePsmId = psmEntry;

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

            const single_ReportedPeptideId_Entry = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_ForSingleReportedPeptideId({
                reportedPeptideId, psmTblData_Map_Key_PsmId: psmTblData_Map_Key_PsmId__For_Single_ReportedPeptideId
            })

            psmTblData_Map_Key_ReportedPeptideId.set( reportedPeptideId, single_ReportedPeptideId_Entry )
        }
    }

    const psmTblData = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Root({ psmTblData_Map_Key_ReportedPeptideId, psmTblData_Map_Key_PsmId });

    data_Holder_SingleSearch.psmTblData = psmTblData;
}