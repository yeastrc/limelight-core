import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";

/**
 * qc_compute_Cache_create_GeneratedReportedPeptideListData.ts
 *
 * QC Page - Common Compute - create GeneratedReportedPeptideListData so have Generated Reported Peptide Strings and associated data
 *
 * Call and then cache results from: create_GeneratedReportedPeptideListData__SingleProtein
 *
 */


export class Qc_compute_Cache_create_GeneratedReportedPeptideListData {

    private _cachedResult: Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result

    private _reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    private _modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    private _projectSearchIds : Array<number>
    private _loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

    /**
     *
     */
    constructor(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            projectSearchIds : Array<number>
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) {
        this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject = proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject;
        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
        this._projectSearchIds = projectSearchIds;
        this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        this._loadedDataCommonHolder = loadedDataCommonHolder;
    }

    /**
     *
     */
    compute_And_Cache_create_GeneratedReportedPeptideListData() : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result {

        if ( ! this._cachedResult ) {
            this._computeCachedResult();
        }

        return this._cachedResult;
    }

    /**
     *
     */
    private _computeCachedResult() : void {

        //  copy from proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject to generatedPeptideContents_UserSelections_StateObject

        const proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject =
            this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject;

        const valueChangedCallback_Fake = () => {}
        const generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({ valueChangedCallback: valueChangedCallback_Fake });

        if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
            generatedPeptideContents_UserSelections_StateObject.setVariableModifications_Selected(true);
        } else {
            generatedPeptideContents_UserSelections_StateObject.setVariableModifications_Selected(false);
        }
        if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
            generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected(true);
            generatedPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected(true);
        } else {
            generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected(false);
            generatedPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected(false);
        }

        // Always set false since proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject does not have a static option
        generatedPeptideContents_UserSelections_StateObject.setStaticModifications_Selected(false);

        this._cachedResult =
            create_GeneratedReportedPeptideListData__SingleProtein({
                forPeptidePage: true,

                psmMinimumCount_Filter_UserEntry: undefined,  // Never pass a value

                searchSubGroup_Ids_Selected: undefined, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                proteinSequenceVersionId: undefined,  // Not Populated on Peptide Page
                projectSearchIds: this._projectSearchIds,
                conditionGroupsContainer: undefined,     // Only populated for experiment Page
                conditionGroupsDataContainer: undefined, // Only populated for experiment Page
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder: this._loadedDataCommonHolder
            });

    }
}
