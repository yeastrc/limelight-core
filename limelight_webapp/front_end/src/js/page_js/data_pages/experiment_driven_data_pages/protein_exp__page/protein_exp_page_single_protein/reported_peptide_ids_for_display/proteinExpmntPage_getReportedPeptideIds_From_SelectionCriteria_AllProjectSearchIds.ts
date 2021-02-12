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

import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';


import {
    proteinExpmntPage_getReportedPeptideIdsForDisplay_SingleProjectSearchId,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";

/**
 *
 */
export class ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds {

    private _entriesMap_KeyProjectSearchId : Map<number, ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId>

    constructor( entriesMap_KeyProjectSearchId : Map<number, ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId> ) {
        if ( entriesMap_KeyProjectSearchId ) {
            this._entriesMap_KeyProjectSearchId = entriesMap_KeyProjectSearchId
        } else {
            this._entriesMap_KeyProjectSearchId = new Map()
        }
    }

    insert_Entry({ projectSearchId, entry } : { projectSearchId : number, entry : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId } ) {
        this._entriesMap_KeyProjectSearchId.set( projectSearchId, entry )
    }

    /**
     *
     */
    get_EntryFor_projectSearchId( projectSearchId : number ) : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {
        return this._entriesMap_KeyProjectSearchId.get( projectSearchId );
    }

    /**
     *
     */
    get_ProjectSearchIds() :  IterableIterator<number> {
        return this._entriesMap_KeyProjectSearchId.keys()
    }
}

/**
 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
 * 
 * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
 * 
 * @returns {
 *
 * }
 * 
 * 
 */
export const getReportedPeptideIdsForDisplay_AllProjectSearchIds = function(
    {
        not_filtered_position_modification_selections,
        proteinSequenceVersionId,  //  NOT populated for Peptide page
        projectSearchIds,
        searchSubGroup_Ids_Selected,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root,
        proteinPositionFilter_UserSelections_StateObject_Wrapper
    } : {
        not_filtered_position_modification_selections : boolean;
        proteinSequenceVersionId : number;  //  NOT populated for Peptide page
        projectSearchIds : Array<number>;
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
    } ) : {
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
} {

    //  return item:
    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds( undefined );

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
        }

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
            proteinExpmntPage_getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                not_filtered_position_modification_selections,
                proteinSequenceVersionId,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                projectSearchId,
                searchSubGroup_Ids_Selected,  //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject,
                proteinSequenceWidget_StateObject,
                proteinPositionFilter_UserSelections_StateObject_Wrapper,
                userSearchString_LocationsOn_ProteinSequence_Root
            })
        );

        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.insert_Entry({ projectSearchId, entry : getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId })
    }

    return { 
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    };
}
