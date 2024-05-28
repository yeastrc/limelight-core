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


    const _PSM_ID_SEPARATOR = "p"  // Between PSM Ids
    const _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR = "q" // Between Reported Peptide Ids and its PSM Ids
    const _REPORTED_PEPTIDE_ID_SEPARATOR = "r"   // Between Reported Peptide Id Blocks (block is a reported peptide id and its PSM Ids)

    let toSend__projectSearchIdsReportedPeptideIdsPsmIds: Array<any> = undefined

    if ( projectSearchIdsReportedPeptideIdsPsmIds ) {

        toSend__projectSearchIdsReportedPeptideIdsPsmIds = []

        for ( const projectSearchIdsReportedPeptideIdsPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds ) {

            let reportedPeptideIdsAndTheirPsmIds__Encoded = undefined

            if ( projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds ) {

                const reportedPeptideId_Block_Array : Array<string> = []

                for ( const reportedPeptideIdsAndTheirPsmIds_Entry of projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds ) {

                    let psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId = ""
                    if ( reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include ) {
                        psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId = _REPORTED_PEPTIDE_ID_TO_PSM_ID_SEPARATOR + reportedPeptideIdsAndTheirPsmIds_Entry.psmIds_Include.join( _PSM_ID_SEPARATOR )
                    }

                    //  block is a reported peptide id and its PSM Ids
                    const reportedPeptideId_Block = reportedPeptideIdsAndTheirPsmIds_Entry.reportedPeptideId.toString() + psmIds_Include_Encoded_With_SeparatorFrom_ReportedPeptideId

                    reportedPeptideId_Block_Array.push( reportedPeptideId_Block )
                }

                reportedPeptideIdsAndTheirPsmIds__Encoded = reportedPeptideId_Block_Array.join( _REPORTED_PEPTIDE_ID_SEPARATOR )
            }

            const projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry = {
                projectSearchId: projectSearchIdsReportedPeptideIdsPsmIds_Entry.projectSearchId,
                searchSubGroup_Ids_Selected : projectSearchIdsReportedPeptideIdsPsmIds_Entry.searchSubGroup_Ids_Selected,

                reportedPeptideIdsAndTheirPsmIds : undefined, // projectSearchIdsReportedPeptideIdsPsmIds_Entry.reportedPeptideIdsAndTheirPsmIds

                reportedPeptideIdsAndTheirPsmIds__Encoded,

                experimentDataForSearch : projectSearchIdsReportedPeptideIdsPsmIds_Entry.experimentDataForSearch
            }
            toSend__projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_ToSend_Entry )
        }
    }

    const requestJSONObject = {
        projectSearchIdsReportedPeptideIdsPsmIds: toSend__projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot,
        proteinSequenceVersionIds,
        experimentId
    }
    
    const requestJSONString = JSON.stringify( requestJSONObject );

    //  Create and submit form
    
    const form = document.createElement( "form" );

    $( form ).hide();

    form.setAttribute( "method", "post" );
    form.setAttribute( "action", "d/dnld/psb/psms-for-project-search-ids-search-criteria-experiment-data" );
    form.setAttribute( "target", "_blank" );

    const requestJSONStringField = document.createElement( "textarea" );
    requestJSONStringField.setAttribute("name", "requestJSONString");

    $( requestJSONStringField ).text( requestJSONString );

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
