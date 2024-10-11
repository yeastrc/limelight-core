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
    psmIds_Include? : Array<number>; // Optional to filter using psmIds instead of using searchDataLookupParamsRoot
}

/**
 * 
 */
class DownloadPSMs_PerConditionGroupConditionData {

    // conditionGroupLabel : string;
    conditionLabel : string;
}

/**
 * Download PSMs for Project Search Ids, Filter Critera, Experiment Data and Optional Reported Peptide Ids and/or Optional Protein Sequence Version Ids.  
 * 
 * Open URL in new window to download from server
 * 
 * @param projectSearchIdsReportedPeptideIdsPsmIds - JS Array of { projectSearchId, Experiment Data per projectSearchId, and optionally reportedPeptideIdsAndTheirPsmIds }
 * @param searchDataLookupParamsRoot - 
 * @param proteinSequenceVersionIds - optional
 */
const download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds = function({
	
    searchDataLookupParamsRoot, projectSearchIdsReportedPeptideIdsPsmIds, proteinSequenceVersionIds, experimentId
} : {
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry>
    proteinSequenceVersionIds : Array<number>
    experimentId : number

}  ) {

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

    let toSend__projectSearchIdsReportedPeptideIdsPsmIds: Array<any> = undefined

    if ( projectSearchIdsReportedPeptideIdsPsmIds ) {

        toSend__projectSearchIdsReportedPeptideIdsPsmIds = []

        for ( const projectSearchIdsReportedPeptideIdsPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds ) {

            let reportedPeptideIdsAndTheirPsmIds__Encoded = undefined

            const minimum_PSM_ID_InRequest_For_Search__NOT_SET = undefined
            let minimum_PSM_ID_InRequest_For_Search: number = minimum_PSM_ID_InRequest_For_Search__NOT_SET

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
                }

                const reportedPeptideId_Block_Array : Array<string> = []

                const reportedPeptideId_Prev__NOT_SET = undefined
                let reportedPeptideId_Prev: number = reportedPeptideId_Prev__NOT_SET

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
                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {
                        limelight__Sort_ArrayOfNumbers_SortArrayInPlace( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include )

                        const psmId_Prev__NOT_SET = undefined
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

                    //  block is a reported peptide id and its PSM Ids
                    const reportedPeptideId_Block = reportedPeptideId_ForRequest_ToString_WithRadix + psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId

                    reportedPeptideId_Block_Array.push( reportedPeptideId_Block )
                }

                reportedPeptideIdsAndTheirPsmIds__Encoded = reportedPeptideId_Block_Array.join( _REPORTED_PEPTIDE_ID_BLOCK_SEPARATOR )
            }

            const projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry = {
                projectSearchId: projectSearchIdsReportedPeptideIdsPsmIds_Entry.projectSearchId,
                searchSubGroup_Ids_Selected : projectSearchIdsReportedPeptideIdsPsmIds_Entry.searchSubGroup_Ids_Selected,

                reportedPeptideIdsAndTheirPsmIds__Encoded,
                minimum_PSM_ID_InRequest_For_Search,

                experimentDataForSearch : projectSearchIdsReportedPeptideIdsPsmIds_Entry.experimentDataForSearch
            }
            toSend__projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry )
        }
    }

    const EXPECTED_REQUEST_VERSION = 3 // Keep in sync with server

    const requestJSONObject = {
        requestVersion: EXPECTED_REQUEST_VERSION,
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

}

export { 
    download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds,
    DownloadPSMs_PerProjectSearchId_Entry, 
    DownloadPSMs_PerReportedPeptideId,
    DownloadPSMs_PerConditionGroupConditionData
}
