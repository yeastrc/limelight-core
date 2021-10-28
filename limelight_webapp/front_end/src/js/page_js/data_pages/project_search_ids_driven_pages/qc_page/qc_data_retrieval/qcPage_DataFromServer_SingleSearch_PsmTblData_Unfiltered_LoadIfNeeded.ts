/**
 * qcPage_DataFromServer_SingleSearch_PsmTblData_Unfiltered_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - PSM Tbl Data - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSingleReportedPeptideId,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered";


/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_PsmTblData_Unfiltered_LoadIfNeeded {

    private _promiseInProgress : Promise<void>

    /**
     * @returns null if no promise needed
     */
    singleSearch_PsmTblData_Unfiltered_LoadIfNeeded(
        {
            retrievalParams, data_Holder_SingleSearch
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.psmTblData_Unfiltered ) {
            //  Data already loaded so return null
            return null
        }

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const projectSearchId = retrievalParams.projectSearchId;

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/psm-table-data-unfiltered-for-single-project-search-id-version-0001";

                const requestData = { projectSearchId };

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

    const psmTblData_Unfiltered_Root = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_Root();

    if ( responseData.psms ) {
        if ( ! ( responseData.psms instanceof Array ) ) {
            const msg = "( ! ( responseData.psms instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const psmEntry of responseData.psms ) {

            const psm : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSinglePsmId = psmEntry;

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

            psmTblData_Unfiltered_Root.add_PsmTblData_Unfiltered_For_PsmId( psm );

            let single_ReportedPeptideId_Entry = psmTblData_Unfiltered_Root.get_PsmTblData_Unfiltered_For_ReportedPeptideId( psm.reportedPeptideId );
            if ( ! single_ReportedPeptideId_Entry ) {
                single_ReportedPeptideId_Entry = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_PsmTblData_Unfiltered_ForSingleReportedPeptideId({
                    reportedPeptideId: psm.reportedPeptideId
                })
                psmTblData_Unfiltered_Root.add_PsmTblData_Unfiltered_For_ReportedPeptideId( single_ReportedPeptideId_Entry );
            }
            single_ReportedPeptideId_Entry.add_PsmTblData_Unfiltered_For_PsmId( psm )
        }
    }

    data_Holder_SingleSearch.psmTblData_Unfiltered = psmTblData_Unfiltered_Root;
}