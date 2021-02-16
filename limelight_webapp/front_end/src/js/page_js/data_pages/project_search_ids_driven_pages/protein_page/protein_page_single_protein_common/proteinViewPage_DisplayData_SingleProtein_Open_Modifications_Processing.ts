/**
 * proteinViewPage_DisplayData_SingleProtein_Open_Modifications_Processing.ts
 * 
 * Javascript for proteinView.jsp page - Open Modifications - Single Search Display usage currently
 * 
 * calls function in another file to:  
 *      Get Open Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 * Combines those Open Modifications for the Protein Sequence Version Id
 *      and adds that to the same instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId } from './proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides';

/**
 * Open Modifications
 * 
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Modification per Reported Peptide Id
 *   and create Open Modifications Per proteinSequenceVersionId
 * 
 * Map the Open Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param proteinSequenceVersionId 
 * @param projectSearchId 
 * 
 * @returns null or Promise that resolves when loadedDataPerProjectSearchIdHolder is updated 
 *          with Open Modifications for parameter Reported Peptide Ids 
 *                  which are also mapped together and stored for the parameter protein sequence version id
 *          * returns null if no data needs loading and all processing has been completed
 */
const getOpenModificationsForProteinSequenceVersionId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId, 
    projectSearchId 
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    proteinSequenceVersionId, 
    projectSearchId 
}) {

    //  First check if Open Modifications for Protein already computed and stored
    let openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
    if ( openModificationsOnProtein_KeyProteinSequenceVersionId !== undefined ) {
        if ( openModificationsOnProtein_KeyProteinSequenceVersionId.has( proteinSequenceVersionId ) ) {
            // No Promise to return since already have data loaded and processed
            return null; //  EARLY EXIT
        }
    }

    return _getOpenModificationsForRepPeptIds_CombineAndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId });
}

/**
 * Get Open Modifications Data for Reported Peptide Ids and projectSearchId
 */
const _getOpenModificationsForRepPeptIds_CombineAndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId, 
    projectSearchId
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    proteinSequenceVersionId : number
    projectSearchId : number
}) {

    const promise_getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId });

    if ( promise_getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId === null ) {
        //  Nothing to load
        //  Have all Open Modification data for reported peptide ids so process to get for protein sequence version id
        _combine_OpenModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
        //  No Promise to return since not retrieve anything from server
        return null; //  EARLY EXIT
    }

    return new Promise<void>(function(resolve, reject) {
        try {
            promise_getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId.catch((reason) => {
                reject(reason);
            })

            promise_getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId.then((result) => {
                try {
                    _combine_OpenModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
                    resolve();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Open Modification per Reported Peptide Id
 *   and create Open Modifications Per proteinSequenceVersionId
 * 
 * Map the Open Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * 
 * Updates input parameter property from loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId()
 * 
 *    to contain: Map<proteinSequenceVersionId, [{ mass, positionOnProtein, reportedPeptideId }]>
 *      One entry in the array for each combination of the properties.
 */
const _combine_OpenModificationsForRepPeptIds_AndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId
}) {

        //  Param reportedPeptideIds_For_proteinSequenceVersionId not needed here since working from protein coverage for protein
        //              - proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array()

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
    const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

    const openModificationsOnProtein : Array<{ mass : number, reportedPeptideId : number }> = [];

    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinCoverageObject === undefined ) {
        throw Error("_combine_OpenModificationsForRepPeptIds_AndStoreForProtSeqVId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId );
    }
    
    const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

    if ( proteinCoverageEntries_PerReportedPeptideId_Array !== undefined ) {
        
        for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;

            const openModificationsOnReportedPeptideArray = openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( openModificationsOnReportedPeptideArray ) {
                
                //  Have Mods for this reportedPeptideId
                for ( const openModificationOnReportedPeptide of openModificationsOnReportedPeptideArray ) {
                
                    const mass = openModificationOnReportedPeptide.mass;

                    const openModificationOnProtein = { mass : mass, reportedPeptideId : reportedPeptideId };
                    openModificationsOnProtein.push( openModificationOnProtein );
                }
            }
        }
    }

    if ( openModificationsOnProtein.length > 0 ) {

        //  Add openModificationsOnProtein_KeyProteinSequenceVersionId to holder if not exist
        let openModificationsOnProtein_KeyProteinSequenceVersionId : Map<number, Array<{ mass : number, reportedPeptideId : number }>> = (
            loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId()
        );
        if ( ! openModificationsOnProtein_KeyProteinSequenceVersionId ) {
            openModificationsOnProtein_KeyProteinSequenceVersionId = new Map();
            loadedDataPerProjectSearchIdHolder.set_openModificationsOnProtein_KeyProteinSequenceVersionId( openModificationsOnProtein_KeyProteinSequenceVersionId );
        }

        openModificationsOnProtein_KeyProteinSequenceVersionId.set(proteinSequenceVersionId, openModificationsOnProtein);
    }

}

		

export { getOpenModificationsForProteinSequenceVersionId }
