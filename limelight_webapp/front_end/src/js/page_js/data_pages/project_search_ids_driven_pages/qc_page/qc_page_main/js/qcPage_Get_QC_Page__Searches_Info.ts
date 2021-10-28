/**
 * qcPage_Get_QC_Page__Searches_Info.ts
 *
 * Get Flags for Searches
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class QcPage_Searches_Info {

    private _qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId: Map<number, QcPage_Searches_Info_SingleSearch> = new Map();

    add_QcPage_Searches_Info_SingleSearch( item: QcPage_Searches_Info_SingleSearch ) {
        this._qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId.set( item.projectSearchId, item );
    }

    get_QcPage_Searches_Info_SingleSearch_ForProjectSearchId( projectSearchId: number ) {
        return this._qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    private _ForceUseConstructor() {}
}

/**
 *
 */
export class QcPage_Searches_Info_SingleSearch {
    
    projectSearchId: number;
    searchId: number;
    precursor_retention_time__NotNull: boolean;
    precursor_m_z__NotNull: boolean;
}

/**
 *
 */
export const qcPage_Get_Searches_Info = function (
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }) : Promise<QcPage_Searches_Info> {

    return new Promise<QcPage_Searches_Info>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/qc-page-search-info-list-from-psi";

            const requestData = { projectSearchIds };

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => {
                try {
                    reject(reason)

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    const qcPage_Searches_Info: QcPage_Searches_Info = _populateResult({ responseData });

                    resolve( qcPage_Searches_Info );

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

}

const _populateResult = function(
    {
        responseData
    } : {
        responseData: any
    }
) : QcPage_Searches_Info {

    const qcPage_Searches_Info = new QcPage_Searches_Info();

    if ( ! responseData.searchInfoList ) {
        const msg = "( ! responseData.searchInfoList )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! ( responseData.searchInfoList instanceof Array ) ) {
        const msg = "( ! ( responseData.searchInfoList instanceof Array ) )";
        console.warn(msg);
        throw Error(msg);
    }

    for ( const searchInfoListEntry of responseData.searchInfoList ) {
        const searchFlagsEntry : QcPage_Searches_Info_SingleSearch = searchInfoListEntry;
        if ( searchFlagsEntry.projectSearchId === undefined || searchFlagsEntry.projectSearchId === null ) {
            const msg = "( searchFlagsEntry.projectSearchId === undefined || searchFlagsEntry.projectSearchId === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( searchFlagsEntry.searchId === undefined || searchFlagsEntry.searchId === null ) {
            const msg = "( searchFlagsEntry.searchId === undefined || searchFlagsEntry.searchId === null )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( searchFlagsEntry.projectSearchId ) ) {
            const msg = "( ! variable_is_type_number_Check( searchFlagsEntry.projectSearchId ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! variable_is_type_number_Check( searchFlagsEntry.searchId ) ) {
            const msg = "( ! variable_is_type_number_Check( searchFlagsEntry.searchId ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( searchFlagsEntry.precursor_retention_time__NotNull ) {
            searchFlagsEntry.precursor_retention_time__NotNull = true;
        } else {
            searchFlagsEntry.precursor_retention_time__NotNull = false;
        }
        if ( searchFlagsEntry.precursor_m_z__NotNull ) {
            searchFlagsEntry.precursor_m_z__NotNull = true;
        } else {
            searchFlagsEntry.precursor_m_z__NotNull = false;
        }

        qcPage_Searches_Info.add_QcPage_Searches_Info_SingleSearch( searchFlagsEntry );
    }


    return qcPage_Searches_Info;
}
