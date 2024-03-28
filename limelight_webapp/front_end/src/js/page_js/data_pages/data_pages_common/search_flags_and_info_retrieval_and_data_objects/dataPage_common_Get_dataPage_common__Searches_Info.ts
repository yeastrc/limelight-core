/**
 * dataPage_common_Get_dataPage_common__Searches_Info.ts
 *
 * Get Search Info for Searches - Other than in search_tbl table - less efficient so only retrieve when needed
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class DataPage_common_Searches_Info {

    private _dataPage_common_Searches_Info_SingleSearch_Map_Key_ProjectSearchId: Map<number, DataPage_common_Searches_Info_SingleSearch> = new Map();

    add_DataPage_common_Searches_Info_SingleSearch(item: DataPage_common_Searches_Info_SingleSearch ) {
        this._dataPage_common_Searches_Info_SingleSearch_Map_Key_ProjectSearchId.set( item.projectSearchId, item );
    }

    get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId: number ) {
        return this._dataPage_common_Searches_Info_SingleSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    private _ForceUseConstructor() {}
}

/**
 *
 */
export class DataPage_common_Searches_Info_SingleSearch {
    
    projectSearchId: number;
    searchId: number;
    precursor_retention_time__NotNull: boolean;
    precursor_m_z__NotNull: boolean;
}

/**
 *
 */
export const dataPage_common_Get_Searches_Info = function (
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }) : Promise<DataPage_common_Searches_Info> {

    return new Promise<DataPage_common_Searches_Info>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/search-info-list-from-psi";

            const requestData = { projectSearchIds };

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: true }) ;

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
                    const qcPage_Searches_Info: DataPage_common_Searches_Info = _populateResult({ responseData });

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
) : DataPage_common_Searches_Info {

    const qcPage_Searches_Info = new DataPage_common_Searches_Info();

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
        const searchFlagsEntry : DataPage_common_Searches_Info_SingleSearch = searchInfoListEntry;
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
        if ( ! limelight__variable_is_type_number_Check( searchFlagsEntry.projectSearchId ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( searchFlagsEntry.projectSearchId ) )";
            console.warn(msg);
            throw Error(msg);
        }
        if ( ! limelight__variable_is_type_number_Check( searchFlagsEntry.searchId ) ) {
            const msg = "( ! limelight__variable_is_type_number_Check( searchFlagsEntry.searchId ) )";
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

        qcPage_Searches_Info.add_DataPage_common_Searches_Info_SingleSearch( searchFlagsEntry );
    }


    return qcPage_Searches_Info;
}
