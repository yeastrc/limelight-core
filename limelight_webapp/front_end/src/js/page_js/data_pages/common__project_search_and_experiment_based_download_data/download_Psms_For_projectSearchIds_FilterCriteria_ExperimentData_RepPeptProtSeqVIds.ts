/**
 * download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds.ts
 * 
 * Javascript for download PSM data
 * 
 */

//  JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

/**
 * 
 */
class DownloadPSMs_PerProjectSearchId_Entry {

    projectSearchId : number;

    searchSubGroup_Ids_Selected? : Array<number>; // Optional
		
    reportedPeptideIdsAndTheirPsmIds? : Array<DownloadPSMs_PerReportedPeptideId>;  // Optional

    experimentDataForSearch? : Array<DownloadPSMs_PerConditionGroupConditionData>;  // Optional
}

/**
 * 
 */
class DownloadPSMs_PerReportedPeptideId {
    reportedPeptideId : number;

    /**
     * Optional to filter using psmIds instead of using searchDataLookupParamsRoot
     *
     * Cannot have both 'psmIds_Include' and 'psmEntries_Include_Map_Key_PsmId'
     */
    psmIds_Include? : Array<number>; //

    /**
     * Optional to filter using psmIds instead of using searchDataLookupParamsRoot
     *
     * Cannot have both 'psmIds_Include' and 'psmEntries_Include_Map_Key_PsmId'
     */
    psmEntries_Include_Map_Key_PsmId?: ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
}

/**
 * 
 */
class DownloadPSMs_PerConditionGroupConditionData {

    conditionGroupLabel : string;
    conditionLabel : string;
}

/**
 * Download PSMs for Project Search Ids, Filter Criteria, Experiment Data and Optional Reported Peptide Ids and/or Optional Protein Sequence Version Ids.
 * 
 * Open URL in new window to download from server
 * 
 * @param projectSearchIdsReportedPeptideIdsPsmIds - JS Array of { projectSearchId, Experiment Data per projectSearchId, and optionally reportedPeptideIdsAndTheirPsmIds }
 * @param searchDataLookupParamsRoot - 
 * @param proteinSequenceVersionIds - optional
 */
const download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds = function(
    {
        searchDataLookupParamsRoot, projectSearchIdsReportedPeptideIdsPsmIds, proteinSequenceVersionIds, experimentId
    } : {
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry>
        proteinSequenceVersionIds : Array<number>
        experimentId : number

    }  ) : void {


    let requestObj = {
        weuonklUUUQSJDVCWvweyhizwoqy: true
    };

    const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-new-download-identifier-string";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => {  }  );

    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
        try {
            _doActual__download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds({
                searchDataLookupParamsRoot, projectSearchIdsReportedPeptideIdsPsmIds, proteinSequenceVersionIds, experimentId,
                downloadIdentifier: responseData.downloadIdentifier
            })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
            throw e;
        }
    });
}


const _doActual__download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds = function(
    {
        searchDataLookupParamsRoot, projectSearchIdsReportedPeptideIdsPsmIds, proteinSequenceVersionIds, experimentId, downloadIdentifier
    } : {
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry>
        proteinSequenceVersionIds : Array<number>
        experimentId : number
        downloadIdentifier: string

    }  ) : void {

    //  Encode projectSearchIdsReportedPeptideIdsPsmIds

    //  Make sure the NUMBER_ENCODING_RADIX does NOT include any of the Separator letters.
    //      - Is likely that all .toString( radix ) only outputs lower case letters so using upper case letters as separators
    //          should never result in collision but avoiding the same letters makes it for sure.

    //   Separators are letters since This string will go into a <form> and characters other than letters are form encoded and result in many times the bytes compared to what is form encoded.

    //        NOTE: JSON has been found to result in the form encoded being many times the bytes compared to what is form encoded.

    const _PSM_ID_SEPARATOR = "Z"  // Between PSM Ids
    const _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR = "Y" // Between Reported Peptide Ids and its PSM Ids
    const _REPORTED_PEPTIDE_ID_BLOCK_SEPARATOR = "X"   // Between Reported Peptide Id Blocks (block is a reported peptide id and its PSM Ids)

    const _REPORTED_PEPTIDE_ID_TO_PSM_ID__NUMBER_ENCODING_RADIX = 30  //  for .toString()
    const _SCAN_PEAKS_M_OVER_Z_SELECTIONS__NUMBER_ENCODING_RADIX = 30  //  for .toString() // scanPeak_M_Over_Z__Selections

    let toSend__projectSearchIdsReportedPeptideIdsPsmIds: Array<any> = undefined

    if ( projectSearchIdsReportedPeptideIdsPsmIds ) {

        toSend__projectSearchIdsReportedPeptideIdsPsmIds = []

        for ( const projectSearchIdsReportedPeptideIdsPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds ) {

            let reportedPeptideIdsAndTheirPsmIds__Encoded = undefined

            const minimum_PSM_ID_InRequest_For_Search__NOT_SET: number = undefined
            let minimum_PSM_ID_InRequest_For_Search: number = minimum_PSM_ID_InRequest_For_Search__NOT_SET

            const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds: Array<ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>> = []
            let scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_FoundAnyPopulated = false

            if ( projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds ) {

                projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds.sort( (a,b) => {
                    if ( a.reportedPeptideId < b.reportedPeptideId ) {
                        return -1
                    }
                    if ( a.reportedPeptideId > b.reportedPeptideId ) {
                        return 1
                    }
                    return 0
                })

                //  Compute minimum_PSM_ID_InRequest_For_Search

                {
                    for ( const reportedPeptideIdsAndTheirPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds ) {
                        if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {
                            for ( const psmId of reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {
                                if ( minimum_PSM_ID_InRequest_For_Search === minimum_PSM_ID_InRequest_For_Search__NOT_SET ) {
                                    minimum_PSM_ID_InRequest_For_Search = psmId
                                } else if ( minimum_PSM_ID_InRequest_For_Search > psmId ) {
                                    minimum_PSM_ID_InRequest_For_Search = psmId
                                }
                            }
                        }
                        if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId ) {
                            for ( const psmEntry of reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId.values() ) {
                                if ( minimum_PSM_ID_InRequest_For_Search === minimum_PSM_ID_InRequest_For_Search__NOT_SET ) {
                                    minimum_PSM_ID_InRequest_For_Search = psmEntry.psmId
                                } else if ( minimum_PSM_ID_InRequest_For_Search > psmEntry.psmId ) {
                                    minimum_PSM_ID_InRequest_For_Search = psmEntry.psmId
                                }
                            }
                        }
                    }
                }

                const reportedPeptideId_Block_Array : Array<string> = []

                const reportedPeptideId_Prev__NOT_SET: number = undefined
                let reportedPeptideId_Prev: number = reportedPeptideId_Prev__NOT_SET

                let found_psmIds_Include = false
                let found_psmEntries_Include_Map_Key_PsmId = false

                for ( const reportedPeptideIdsAndTheirPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds ) {

                    const reportedPeptideId = reportedPeptideIdsAndTheirPsmIds_Entry.reportedPeptideId

                    let reportedPeptideId_ForRequest_Integer: number
                    if ( reportedPeptideId_Prev === reportedPeptideId_Prev__NOT_SET ) {
                        reportedPeptideId_ForRequest_Integer = reportedPeptideId //  First one
                    } else {
                        reportedPeptideId_ForRequest_Integer = reportedPeptideId - reportedPeptideId_Prev
                    }
                    reportedPeptideId_Prev = reportedPeptideId

                    const reportedPeptideId_ForRequest_ToString_WithRadix = reportedPeptideId_ForRequest_Integer.toString( _REPORTED_PEPTIDE_ID_TO_PSM_ID__NUMBER_ENCODING_RADIX )

                    let psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId = ""

                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include && reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId ) {

                        const msg = "Invalid to populate BOTH 'reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include' AND 'reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId'"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {

                        found_psmIds_Include = true

                        if ( found_psmEntries_Include_Map_Key_PsmId ) {

                            const msg = "Invalid to populate BOTH 'reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include' AND 'reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId' across entries in projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds"
                            console.warn(msg)
                            throw Error(msg)
                        }
                    }

                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId ) {

                        found_psmEntries_Include_Map_Key_PsmId = true

                        if ( found_psmIds_Include ) {

                            const msg = "Invalid to populate BOTH 'reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include' AND 'reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId' across entries in projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds"
                            console.warn(msg)
                            throw Error(msg)
                        }
                    }

                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {

                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include )

                        const psmId_Prev__NOT_SET: number = undefined
                        let psmId_Prev: number = psmId_Prev__NOT_SET

                        const psmIds_ForRequest: Array<string> = []
                        for ( const psmId of reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {

                            let psmId_ForRequest_Integer: number
                            if ( psmId_Prev === psmId_Prev__NOT_SET ) {
                                psmId_ForRequest_Integer = psmId - minimum_PSM_ID_InRequest_For_Search //  First one
                            } else {
                                psmId_ForRequest_Integer = psmId - psmId_Prev
                            }
                            psmId_Prev = psmId

                            const psmId_ForRequest_ToString_WithRadix = psmId_ForRequest_Integer.toString( _REPORTED_PEPTIDE_ID_TO_PSM_ID__NUMBER_ENCODING_RADIX )

                            psmIds_ForRequest.push( psmId_ForRequest_ToString_WithRadix )
                        }
                        psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId = _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR + psmIds_ForRequest.join( _PSM_ID_SEPARATOR )
                    }

                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId ) {

                        const psmEntries_Include_Array = Array.from( reportedPeptideIdsAndTheirPsmIds_Entry.psmEntries_Include_Map_Key_PsmId.values() )

                        psmEntries_Include_Array.sort( (a,b) => {
                            if ( a.psmId < b.psmId ) {
                                return -1
                            }
                            if ( a.psmId > b.psmId ) {
                                return 1
                            }
                            return 0 //should not get here
                        })

                        const psmId_Prev__NOT_SET: number = undefined
                        let psmId_Prev: number = psmId_Prev__NOT_SET

                        const psmIds_ForRequest: Array<string> = []
                        for ( const psmEntry of psmEntries_Include_Array ) {

                            let psmId_ForRequest_Integer: number
                            if ( psmId_Prev === psmId_Prev__NOT_SET ) {
                                psmId_ForRequest_Integer = psmEntry.psmId - minimum_PSM_ID_InRequest_For_Search //  First one
                            } else {
                                psmId_ForRequest_Integer = psmEntry.psmId - psmId_Prev
                            }
                            psmId_Prev = psmEntry.psmId

                            const psmId_ForRequest_ToString_WithRadix = psmId_ForRequest_Integer.toString( _REPORTED_PEPTIDE_ID_TO_PSM_ID__NUMBER_ENCODING_RADIX )

                            psmIds_ForRequest.push( psmId_ForRequest_ToString_WithRadix )

                            if ( psmEntry.scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) {
                                scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_FoundAnyPopulated = true
                            } else {
                                // var z = 0
                            }

                            // Always push to array since need the empty entries as well
                            scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds.push( psmEntry.scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array )
                        }
                        psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId = _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR + psmIds_ForRequest.join( _PSM_ID_SEPARATOR )
                    }

                    //  block is a reported peptide id and its PSM Ids
                    const reportedPeptideId_Block = reportedPeptideId_ForRequest_ToString_WithRadix + psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId

                    reportedPeptideId_Block_Array.push( reportedPeptideId_Block )
                }

                reportedPeptideIdsAndTheirPsmIds__Encoded = reportedPeptideId_Block_Array.join( _REPORTED_PEPTIDE_ID_BLOCK_SEPARATOR )
            }

            //  Each sub array is the unique values for m/z from scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds
            let scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array: Array<Array<number>> = undefined

            //  Pad start with zeros or if undefined then replace with spaces to max length

            let scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded: string = undefined
            let scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_IndividualEntryLength: number = undefined

            if ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_FoundAnyPopulated ) {

                //  Encode for send to server

                //  Each sub array is the unique values for m/z from scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds
                scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = []

                const scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM: Array<number> = []

                for ( let index = 0; index < scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds.length; index++ ) {

                    const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ForPsmId = scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ArrayInOrderOfPsmIds[ index ]

                    if ( ! scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ForPsmId ) {

                        //  NO entry for this specific Psm Id so push undefined into output array and then skip to next entry

                        scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM.push( undefined )

                        continue  // EARLY CONTINUE
                    }

                    const newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array: Array<number> = []

                    for ( const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ForPsmId_Entry of scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ForPsmId ) {
                        newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array.push( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_ForPsmId_Entry.massOverCharge )
                    }

                    limelight__Sort_ArrayOfNumbers_SortArrayInPlace( newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array )

                    //  Search scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM for scanPeak_M_Over_Z__Selections_UniqueValues_Array_NewEntry

                    const index_NOT_FOUND: number = undefined
                    let toUse_index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = index_NOT_FOUND

                    for ( let index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = 0; index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array < scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array.length; index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array++ ) {

                        const existingEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array[ index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array ]

                        // does existingEntry_... equal newEntry_...
                        let existingEntry_Equal_newEntry = true

                        if ( existingEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array.length !== newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array.length ) {
                            existingEntry_Equal_newEntry = false
                        } else {
                            //  Compare element values
                            for ( let index_newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array = 0; index_newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array < newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array.length; index_newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array++ ) {
                                if ( newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array[ index_newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array ] !== existingEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array[ index_newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array ] ) {
                                    existingEntry_Equal_newEntry = false
                                    break
                                } else {
                                    // var z = 0
                                }
                            }
                        }

                        if ( existingEntry_Equal_newEntry ) {

                            toUse_index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array

                            break
                        } else {
                            // var z = 0
                        }
                    }

                    if ( toUse_index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array === index_NOT_FOUND ) {
                        // NOT found in scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array so add it

                        scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array.push( newEntry_scanPeak_M_Over_Z__Selections_UniqueValues_Array )

                        toUse_index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array = scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array.length - 1 // the newly added entry
                    }

                    scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM.push( toUse_index_scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array )
                }

                //  Encode scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM as string

                const scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix: Array<string> = []

                let maxEntryEncodedLength = 0

                for ( const entry of scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM ) {

                    if ( entry === undefined || entry === null ) {
                        scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix.push( undefined )

                    } else {
                        const entryEncoded = entry.toString( _SCAN_PEAKS_M_OVER_Z_SELECTIONS__NUMBER_ENCODING_RADIX )
                        scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix.push( entryEncoded )

                        if ( maxEntryEncodedLength < entryEncoded.length ) {
                            maxEntryEncodedLength = entryEncoded.length
                        }
                    }
                }

                //  TODO FAKE
                // maxEntryEncodedLength = 3

                //  Pad start with zeros or if undefined then replace with spaces to max length

                const scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded: Array<string> = []

                {
                    //  Entry used for NO Selections and thus NO index value
                    const fullPaddedSpaces = " ".repeat( maxEntryEncodedLength )

                    for ( const entry of scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix ) {

                        if ( entry === undefined || entry === null ) {
                            scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded.push( fullPaddedSpaces )

                        } else {
                            let padding = ""
                            if ( maxEntryEncodedLength > entry.length ) {
                                //  left pad the number with zeros
                                padding = "0".repeat( maxEntryEncodedLength - entry.length )
                            }

                            const entryPadded = padding + entry
                            scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded.push( entryPadded )
                        }
                    }
                }

                scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded = scanPeak_M_Over_Z__Selections_UniqueValues_Array_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded.join("")

                scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_IndividualEntryLength = maxEntryEncodedLength
            }

            const projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry = {
                projectSearchId: projectSearchIdsReportedPeptideIdsPsmIds_Entry.projectSearchId,
                searchSubGroup_Ids_Selected : projectSearchIdsReportedPeptideIdsPsmIds_Entry.searchSubGroup_Ids_Selected,

                reportedPeptideIdsAndTheirPsmIds__Encoded,

                scanPeak_M_Over_Z__Selections_UniqueValues_Array_Array,
                scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded__Encoded: scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_Padded,
                scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_Per_PSM_EntriesAsString_EncodedToRadix_IndividualEntryLength,
                scanPeak_M_Over_Z__Selections_UniqueValues_IndexValues_EncodingRadix: _SCAN_PEAKS_M_OVER_Z_SELECTIONS__NUMBER_ENCODING_RADIX,

                minimum_PSM_ID_InRequest_For_Search,

                experimentDataForSearch : projectSearchIdsReportedPeptideIdsPsmIds_Entry.experimentDataForSearch
            }
            toSend__projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry )
        }
    }

    const EXPECTED_REQUEST_VERSION = 4 // Keep in sync with server

    const requestJSONObject = {
        requestVersion: EXPECTED_REQUEST_VERSION,
        downloadIdentifier,
        projectSearchIdsReportedPeptideIdsPsmIds: toSend__projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot,
        proteinSequenceVersionIds,
        experimentId,
        psmId_SeparatorString: _PSM_ID_SEPARATOR,
        reportedPeptideId_To_PsmId_SeparatorString: _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR,
        reportedPeptideId_Block_SeparatorString: _REPORTED_PEPTIDE_ID_BLOCK_SEPARATOR,
        reportedPeptideId_PsmId_NumberEncoding_Radix: _REPORTED_PEPTIDE_ID_TO_PSM_ID__NUMBER_ENCODING_RADIX,
    }
    
    const requestJSONString = JSON.stringify( requestJSONObject );

    //  Create and submit form
    
    const form = document.createElement( "form" );

    form.style.display = "none"

    form.setAttribute( "method", "post" );
    form.setAttribute( "action", "d/dnld/psb/psms-for-project-search-ids-search-criteria-experiment-data" );
    form.setAttribute( "target", "_blank" );

    const requestJSONStringField = document.createElement( "textarea" );
    requestJSONStringField.setAttribute("name", "requestJSONString");

    requestJSONStringField.value = requestJSONString

    form.appendChild( requestJSONStringField );

    document.body.appendChild(form);    // Not entirely sure if this is necessary			

    try { 
        form.submit();
    } finally {

        document.body.removeChild( form );
    }

    _getDownloadStatus_AfterSubmitForm({ downloadIdentifier, retryCount: 0 })
}

/**
 *
 * @param downloadIdentifier
 * @param retryCount
 */
const _getDownloadStatus_AfterSubmitForm = function (
    {
        downloadIdentifier, retryCount
    } : {
        downloadIdentifier: string
        retryCount: number
    }
) {


    let requestObj = {
        downloadIdentifier
    };

    const url = "d/rws/for-page/sddfs/support-data-download-via-form-submit-get-after-status";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => {  }  );

    promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
        try {

            if ( responseData.statusAboutToSubmit || responseData.statusInProgress ) {

                console.log( "_getDownloadStatus_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                const _RETRY_COUNT_MAX = 20

                const _MIN_DELAY_IN_SECONDS = 3

                if ( retryCount > _RETRY_COUNT_MAX ) {

                    console.log( "_getDownloadStatus_AfterSubmitForm(): responseData.statusAboutToSubmit || responseData.statusInProgress: URL: " + url +
                        ", downloadIdentifier: " + downloadIdentifier +
                        ", retryCount: " + retryCount + ", 'retryCount > _RETRY_COUNT_MAX' so exit. _RETRY_COUNT_MAX: " + _RETRY_COUNT_MAX )

                    return // EARLY RETURN
                }

                const timeoutDelay = ( _MIN_DELAY_IN_SECONDS + retryCount ) * 1000   // In Milliseconds

                //  Retry after wait
                window.setTimeout( () => {

                    _getDownloadStatus_AfterSubmitForm({ downloadIdentifier, retryCount: ( retryCount + 1 ) })

                }, timeoutDelay )

                return  // EARLY RETURN
            }

            if ( responseData.statusSuccess ) {

                //  Successful

                console.log( "_getDownloadStatus_AfterSubmitForm(): responseData.statusSuccess: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                return  // EARLY RETURN
            }

            if ( responseData.statusFail ) {

                //  Fail

                console.log( "_getDownloadStatus_AfterSubmitForm(): responseData.statusFail: URL: " + url + ", downloadIdentifier: " + downloadIdentifier + ", retryCount: " + retryCount )

                window.alert( "PSM Download processing failed on the server side.  If any data was downloaded it is likely incomplete.  Ignore this message if the download was canceled." )

                return  // EARLY RETURN
            }

            //  NOT expect to get here

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
            throw e;
        }
    });
}





///////////////////

export { 
    download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds,
    DownloadPSMs_PerProjectSearchId_Entry, 
    DownloadPSMs_PerReportedPeptideId,
    DownloadPSMs_PerConditionGroupConditionData
}
