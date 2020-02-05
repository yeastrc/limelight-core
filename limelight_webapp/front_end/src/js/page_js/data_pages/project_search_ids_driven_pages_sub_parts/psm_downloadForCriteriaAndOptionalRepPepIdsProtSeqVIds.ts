/**
 * psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.ts
 * 
 * Javascript for download PSM data 
 * 
 */

//  JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { SearchDataLookupParameters_Root } from "../data_pages__common_data_classes/searchDataLookupParameters";

///////////////////////////////////////////

/**
 * Download PSMs for Single Project Search Id, Filter Critera, and Optional Reported Peptide Ids and/or Optional Protein Sequence Version Ids.  
 * 
 * Open URL in new window to download from server
 * 
 * @param projectSearchIdsReportedPeptideIdsPsmIds - JS Array of { projectSearchId, and optionally reportedPeptideIdsAndTheirPsmIds }
 * @param searchDataLookupParamsRoot - 
 * @param proteinSequenceVersionIds - optional
 */
const downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds = function( { 
	
    searchDataLookupParamsRoot, projectSearchIdsReportedPeptideIdsPsmIds, proteinSequenceVersionIds
} :  { 
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    projectSearchIdsReportedPeptideIdsPsmIds, 
    proteinSequenceVersionIds
} ) : void {
    
    const requestJSONObject = {
        projectSearchIdsReportedPeptideIdsPsmIds,
        searchDataLookupParamsRoot,
        proteinSequenceVersionIds
    }
    
    const requestJSONString = JSON.stringify( requestJSONObject );

    //  Create and submit form

    // const formActionURL = "d/dnld/psb/psms-for-project-search-ids-search-criteria";  // Use Original Server Controller Code
    
    const formActionURL = "d/dnld/psb/psms-for-project-search-ids-search-criteria-experiment-data";  // Use New Server Controller Code that is used by Experiment pages
    // window.alert("Using new Server Controller Code URL: " +  formActionURL )
    
    const form = document.createElement( "form" );

    $( form ).hide();

    form.setAttribute( "method", "post" );
    form.setAttribute( "action", formActionURL );
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

export { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds }
