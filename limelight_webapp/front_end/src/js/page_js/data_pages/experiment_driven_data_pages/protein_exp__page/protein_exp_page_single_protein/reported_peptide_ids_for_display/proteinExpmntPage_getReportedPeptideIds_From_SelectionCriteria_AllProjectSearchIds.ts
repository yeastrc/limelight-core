/**
 * proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds.ts
 * 
 * Javascript for protein_Experiment.jsp page - Get Reported Peptide Ids From Selection Criteria for All Project Search Ids
 * 
 * Selection Criteria:
 *  1) Variable and Static Modifications (and NO Variable Modifications as a part of this)
 *  2) Reporter Ions
 *  2) Search String(s) to search Peptide Sequences
 *  3) Protein Positions
 * 
 * Companion file to proteinExperimentPage_Display_SingleProtein.tsx
 * 
*/


import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import { UserSearchString_LocationsOn_ProteinSequence_Root, UserSearchString_LocationsOn_ProteinSequence_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';


import { ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId';


/**
 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
 * 
 * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
 * 
 * @returns {
 * 			reportedPeptides_Filtered_Array, // empty array if no reportedPeptideIds for proteinSequenceVersionId for projectSearchId
 * 			reporterIonMasses_AnySelected,
            peptideSearchStrings_AnyEntered,
            peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
            proteinPositions_CoveredBy_PeptideSearchStrings
 * }
 * 
 * 
 */
export const getReportedPeptideIdsForDisplay_AllProjectSearchIds = function( { 
    not_filtered_position_modification_selections, 
    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    proteinSequenceWidget_StateObject,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    userSearchString_LocationsOn_ProteinSequence_Root
} : { 
    not_filtered_position_modification_selections : boolean, 
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject,
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
} ) : {
    reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : Map<number, Array<number>>
} {


    //  return items:
    const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : Map<number, Array<number>> = new Map();

    const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
        forMultipleSearch : true,
        forSingleSearch : false,
        proteinSequenceVersionId,
		loadedDataCommonHolder,
		proteinSequenceWidget_StateObject, 
		modificationMass_UserSelections_StateObject,
		reporterIonMass_UserSelections_StateObject,
		userSearchString_LocationsOn_ProteinSequence_Root
    });


    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
        }

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
            proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
            getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                not_filtered_position_modification_selections, 
                loadedDataPerProjectSearchIdHolder,
                projectSearchId
            })
        );

        reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.set( projectSearchId, getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array );
    }

    return { 
        reportedPeptideIdsForDisplay_Map_KeyProjectSearchId
    };
}