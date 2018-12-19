/**
 * psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js
 * 
 * Javascript for download PSM data 
 * 
 */

//  JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * Download PSMs for Single Project Search Id, Filter Critera, and Optional Reported Peptide Ids and/or Optional Protein Sequence Version Ids.  
 * 
 * Open URL in new window to download from server
 * 
 * @param reportedPeptideIdsPerProjectSearchId - optional - JS object where property names are ProjectSearchId and property values are Array of reportedPeptideIds 
 * @param proteinSequenceVersionIds - optional
 */
const downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds = function( { 
	
	projectSearchIds, searchDataLookupParamsRoot, reportedPeptideIdsPerProjectSearchId, proteinSequenceVersionIds } ) {
    
    const requestJSONObject = {
    		projectSearchIds : projectSearchIds,
    		searchDataLookupParamsRoot : searchDataLookupParamsRoot,
    		reportedPeptideIdsPerProjectSearchId : reportedPeptideIdsPerProjectSearchId,
            proteinSequenceVersionIds : proteinSequenceVersionIds
    }
    
    const requestJSONString = JSON.stringify( requestJSONObject );

    //  Create and submit form
    
    const form = document.createElement( "form" );

    $( form ).hide();

    form.setAttribute( "method", "post" );
    form.setAttribute( "action", "d/dnld/psb/psms-for-project-search-ids-search-criteria" );
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
