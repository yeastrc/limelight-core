/**
 * protein_Page_FiltersDisplay_ComponentData.ts
 * 
 * Component Data for: protein_Page_FiltersDisplay.tsx
 * 
 */

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {
	DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";


/**
 * 
 */
export interface Protein_Page_FiltersDisplay_ComponentData {

	modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass;
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
	peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject;
	proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject : ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
	dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root //  Use with scanFilenameId_On_PSM_Filter_UserSelection_StateObject
	scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
	scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
	psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
	psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
	searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean;
	searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;  // Use to determine which Search Sub Groups Selected along with the display name
}
