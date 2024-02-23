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
    
    const requestJSONObject = {
        projectSearchIdsReportedPeptideIdsPsmIds,
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
