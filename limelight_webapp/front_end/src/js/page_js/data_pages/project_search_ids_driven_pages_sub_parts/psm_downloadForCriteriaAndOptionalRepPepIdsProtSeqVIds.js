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
 * @param reportedPeptideIds - optional
 * @param proteinSequenceVersionIds - optional
 */
var downloadPsmsFor_projectSearchId_FilterCriteria_RepPeptProtSeqVIds = function( { 
    projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, reportedPeptideIds, proteinSequenceVersionIds } ) {
    
    const requestJSONObject = {
            projectSearchId : projectSearchId,
            searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            reportedPeptideIds : reportedPeptideIds,
            proteinSequenceVersionIds : proteinSequenceVersionIds
    }
    
    const requestJSONString = JSON.stringify( requestJSONObject );

    //  Create and submit form
    
    const form = document.createElement( "form" );

    $( form ).hide();

    form.setAttribute( "method", "post" );
    form.setAttribute( "action", "d/dnld/psb/psms-for-single-project-search-id-search-criteria" );
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

export { downloadPsmsFor_projectSearchId_FilterCriteria_RepPeptProtSeqVIds }
