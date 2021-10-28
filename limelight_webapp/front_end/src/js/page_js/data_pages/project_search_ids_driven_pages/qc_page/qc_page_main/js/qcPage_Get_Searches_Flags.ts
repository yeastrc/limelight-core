/**
 * qcPage_Get_Searches_Flags.ts
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
export class QcPage_Searches_Flags {

    private _qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId: Map<number, QcPage_Flags_SingleSearch> = new Map();

    add_QcPage_Flags_SingleSearch( item: QcPage_Flags_SingleSearch ) {
        this._qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId.set( item.projectSearchId, item );
    }

    get_QcPage_Flags_SingleSearch_ForProjectSearchId( projectSearchId: number ) {
        return this._qcPage_Flags_SingleSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    private _ForceUseConstructor() {}
}

/**
 *
 */
export class QcPage_Flags_SingleSearch {
    
    projectSearchId: number;
    searchId: number;
    hasScanFilenames: boolean;
    hasScanData: boolean;
    hasIsotopeLabel: boolean;
    anyPsmHas_DynamicModifications: boolean;
    anyPsmHas_OpenModifications: boolean;
    anyPsmHas_ReporterIons: boolean;
}

/**
 *
 */
export const qcPage_Get_Searches_Flags = function (
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }) : Promise<QcPage_Searches_Flags> {

    return new Promise<QcPage_Searches_Flags>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/search-flags-list-from-psi";

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
                    const qcPage_Searches_Flags: QcPage_Searches_Flags = _populateResult({ responseData });

                    resolve( qcPage_Searches_Flags );

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
) : QcPage_Searches_Flags {

    const qcPage_Searches_Flags = new QcPage_Searches_Flags();

    if ( ! responseData.searchFlagsList ) {
        const msg = "( ! responseData.searchFlagsList )";
        console.warn(msg);
        throw Error(msg);
    }
    if ( ! ( responseData.searchFlagsList instanceof Array ) ) {
        const msg = "( ! ( responseData.searchFlagsList instanceof Array ) )";
        console.warn(msg);
        throw Error(msg);
    }

    for ( const searchFlagsListEntry of responseData.searchFlagsList ) {
        const searchFlagsEntry : QcPage_Flags_SingleSearch = searchFlagsListEntry;
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
        if ( searchFlagsEntry.hasScanFilenames ) {
            searchFlagsEntry.hasScanFilenames = true;
        } else {
            searchFlagsEntry.hasScanFilenames = false;
        }
        if ( searchFlagsEntry.hasScanData ) {
            searchFlagsEntry.hasScanData = true;
        } else {
            searchFlagsEntry.hasScanData = false;
        }
        if ( searchFlagsEntry.hasIsotopeLabel ) {
            searchFlagsEntry.hasIsotopeLabel = true;
        } else {
            searchFlagsEntry.hasIsotopeLabel = false;
        }
        if ( searchFlagsEntry.anyPsmHas_DynamicModifications ) {
            searchFlagsEntry.anyPsmHas_DynamicModifications = true;
        } else {
            searchFlagsEntry.anyPsmHas_DynamicModifications = false;
        }
        if ( searchFlagsEntry.anyPsmHas_OpenModifications ) {
            searchFlagsEntry.anyPsmHas_OpenModifications = true;
        } else {
            searchFlagsEntry.anyPsmHas_OpenModifications = false;
        }
        if ( searchFlagsEntry.anyPsmHas_ReporterIons ) {
            searchFlagsEntry.anyPsmHas_ReporterIons = true;
        } else {
            searchFlagsEntry.anyPsmHas_ReporterIons = false;
        }

        qcPage_Searches_Flags.add_QcPage_Flags_SingleSearch( searchFlagsEntry );
    }


    return qcPage_Searches_Flags;
}
