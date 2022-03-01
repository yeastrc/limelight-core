import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";

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
    private _dataPageStateManager : DataPageStateManager
    private _projectSearchIds : Array<number>
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    /**
     *
     */
    constructor(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            dataPageStateManager,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            dataPageStateManager : DataPageStateManager
            projectSearchIds : Array<number>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject = proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject;
        this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
        this._dataPageStateManager = dataPageStateManager;
        this._projectSearchIds = projectSearchIds;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;
    }

    /**
     *
     */
    async compute_And_Cache_create_GeneratedReportedPeptideListData() : Promise<Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result> {

        if ( ! this._cachedResult ) {
            await this._computeCachedResult();
        }

        return this._cachedResult;
    }

    /**
     *
     */
    private async _computeCachedResult() : Promise<void> {

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
            await create_GeneratedReportedPeptideListData__SingleProtein({
                forPeptidePage: true,

                //  !!!  Important:   result from create_GeneratedReportedPeptideListData__SingleProtein has updated reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds if psmMinimumCount_Filter_UserEntry > 1

                psmMinimumCount_Filter_UserEntry: undefined,  // Never pass a value

                searchSubGroup_Ids_Selected: undefined, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: this._reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                dataPageStateManager: this._dataPageStateManager,
                proteinSequenceVersionId: undefined,  // Not Populated on Peptide Page
                projectSearchIds: this._projectSearchIds,
                conditionGroupsContainer: undefined,     // Only populated for experiment Page
                conditionGroupsDataContainer: undefined, // Only populated for experiment Page
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });

    }
}
