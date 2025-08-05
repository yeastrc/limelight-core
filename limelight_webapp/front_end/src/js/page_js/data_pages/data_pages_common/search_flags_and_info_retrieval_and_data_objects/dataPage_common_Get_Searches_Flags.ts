/**
 * dataPage_common_Get_Searches_Flags.ts
 *
 * Get Flags for Searches - Currently from search_tbl so very fast, data may be cached in server memory
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {limelight__variable_is_type_number_Check} from "page_js/common_all_pages/limelight__variable_is_type_number_Check";


/**
 *
 */
export class DataPage_common_Searches_Flags {

    private _dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId: Map<number, DataPage_common_Flags_SingleSearch> = new Map();

    add_DataPage_common_Flags_SingleSearch(item: DataPage_common_Flags_SingleSearch ) {
        this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.set( item.projectSearchId, item );
    }

    get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId: number ) {
        return this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.get( projectSearchId );
    }

    get_DataPage_common_Flags_AllEntries() {
        return this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values()
    }

    /**
     * @returns - true if dataPage_common_Flags_SingleSearch.searchNotContainProteins is true for ALL searches
     */
    is__searchNotContainProteins_True__TrueFor_All_Searches() : boolean {

        let true_ForAllSearches = true

        for ( const dataPage_common_Flags_SingleSearch of this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values() ) {
            if ( ! dataPage_common_Flags_SingleSearch.searchNotContainProteins ) {

                true_ForAllSearches = false
            }
        }

        return true_ForAllSearches;
    }

    /**
     * @returns - true if dataPage_common_Flags_SingleSearch.searchNotContainProteins is true for any search
     */
    is__searchNotContainProteins_True__TrueFor_Any_Search() : boolean {
        for ( const dataPage_common_Flags_SingleSearch of this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values() ) {
            if ( dataPage_common_Flags_SingleSearch.searchNotContainProteins ) {

                return true; // EARLY RETURN
            }
        }

        return false;
    }

    /**
     * @returns - true if dataPage_common_Flags_SingleSearch.anyPsmHas_IsIndependentDecoy_True is true for any search
     */
    is__anyPsmHas_IsIndependentDecoy_True__TrueForAnySearch() : boolean {
        for ( const dataPage_common_Flags_SingleSearch of this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values() ) {
            if ( dataPage_common_Flags_SingleSearch.anyPsmHas_IsIndependentDecoy_True ) {

                return true; // EARLY RETURN
            }
        }

        return false;
    }

    /**
     * @returns - true if dataPage_common_Flags_SingleSearch.anyPsmHas_IsDecoy_True is true for any search
     */
    is__anyPsmHas_IsDecoy_True__TrueForAnySearch() : boolean {
        for ( const dataPage_common_Flags_SingleSearch of this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values() ) {
            if ( dataPage_common_Flags_SingleSearch.anyPsmHas_IsDecoy_True ) {

                return true; // EARLY RETURN
            }
        }

        return false;
    }

    /**
     * @returns - true if dataPage_common_Flags_SingleSearch.hasScanData is true for ALL Searches
     */
    is__All_Searches_Have_ScanData() : boolean {
        for ( const dataPage_common_Flags_SingleSearch of this._dataPage_common_Flags_SingleSearch_Map_Key_ProjectSearchId.values() ) {
            if ( ! dataPage_common_Flags_SingleSearch.hasScanData ) {

                return false; // EARLY RETURN
            }
        }

        return true;
    }

    private _ForceUseConstructor() {}
}

/**
 *
 */
export class DataPage_common_Flags_SingleSearch {
    
    projectSearchId: number;
    searchId: number;
    hasScanFilenames: boolean;
    hasScanData: boolean;
    hasIsotopeLabel: boolean;
    anyPsmHas_DynamicModifications: boolean;
    anyPsmHas_OpenModifications: boolean;
    anyPsmHas_ReporterIons: boolean;
    anyPsmHas_PsmPeptidePositionAnnotation: boolean

    anyPsmHas_IsDecoy_True: boolean;
    anyPsmHas_IsIndependentDecoy_True: boolean;

    allPsmHave_Precursor_RetentionTime_PossiblyNull: boolean;		//  null if not populated	//  NOT Populated Yet for Existing Searches
    allPsmHave_Precursor_M_Over_Z_PossiblyNull: boolean;			//  null if not populated	//  NOT Populated Yet for Existing Searches

    psmIds_AreSequential_PossiblyNull: boolean; //  null if not populated  // All PSM Ids for the search are sequential - can use PSM Id ranges  	//  NOT Populated Yet for Existing Searches

    searchNotContainProteins: boolean
}

/**
 *
 */
export const dataPage_common_Get_Searches_Flags = function (
    {
        projectSearchIds
    } : {
        projectSearchIds: Array<number>
    }) : Promise<DataPage_common_Searches_Flags> {

    return new Promise<DataPage_common_Searches_Flags>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/search-flags-list-from-psi";

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
                    const qcPage_Searches_Flags: DataPage_common_Searches_Flags = _populateResult({ responseData });

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
) : DataPage_common_Searches_Flags {

    const qcPage_Searches_Flags = new DataPage_common_Searches_Flags();

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
        const searchFlagsEntry : DataPage_common_Flags_SingleSearch = searchFlagsListEntry;
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
        if ( searchFlagsEntry.anyPsmHas_PsmPeptidePositionAnnotation ) {
            searchFlagsEntry.anyPsmHas_PsmPeptidePositionAnnotation = true;
        } else {
            searchFlagsEntry.anyPsmHas_PsmPeptidePositionAnnotation = false;
        }

        if ( searchFlagsEntry.anyPsmHas_IsDecoy_True ) {
            searchFlagsEntry.anyPsmHas_IsDecoy_True = true;
        } else {
            searchFlagsEntry.anyPsmHas_IsDecoy_True = false;
        }
        if ( searchFlagsEntry.anyPsmHas_IsIndependentDecoy_True ) {
            searchFlagsEntry.anyPsmHas_IsIndependentDecoy_True = true;
        } else {
            searchFlagsEntry.anyPsmHas_IsIndependentDecoy_True = false;
        }

        qcPage_Searches_Flags.add_DataPage_common_Flags_SingleSearch( searchFlagsEntry );
    }


    return qcPage_Searches_Flags;
}
