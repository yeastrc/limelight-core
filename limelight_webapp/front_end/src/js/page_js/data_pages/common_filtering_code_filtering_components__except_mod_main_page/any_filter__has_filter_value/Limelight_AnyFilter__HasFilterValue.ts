/**
 * Limelight_AnyFilter__HasFilterValue.ts
 *
 * Any filter has a filter value - so has User specified any filter value for any of the filters passed in
 *
 * Relatively new so not widely used
 */


import {
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
    PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import { ModificationMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import { ReporterIonMass_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import { PeptideUnique_UserSelection_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import { PeptideSequence_MissedCleavageCount_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import { PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import { ScanFilenameId_On_PSM_Filter_UserSelection_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import { Scan_RetentionTime_MZ_UserSelections_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import { Psm_Charge_Filter_UserSelection_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import { ProteinSequenceWidget_StateObject } from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";

/**
 *
 */
export class Limelight_AnyFilter__HasFilterValue {

    private readonly modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    private readonly reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    private readonly peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    private readonly peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
    private readonly peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject;
    private readonly peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
    private readonly scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    private readonly scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    private readonly psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

    private readonly proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    constructor(
        {
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelections_StateObject,
            psm_Charge_Filter_UserSelection_StateObject,

            proteinSequenceWidget_StateObject,
        } : {
            modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
            reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject;
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
            scan_RetentionTime_MZ_UserSelections_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
            psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

            proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
        }
    ) {

        this.modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject
        this.reporterIonMass_UserSelections_StateObject = reporterIonMass_UserSelections_StateObject
        this.peptideUnique_UserSelection_StateObject = peptideUnique_UserSelection_StateObject
        this.peptideSequence_MissedCleavageCount_UserSelections_StateObject = peptideSequence_MissedCleavageCount_UserSelections_StateObject
        this.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject = peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject;
        this.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject = peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
        this.scanFilenameId_On_PSM_Filter_UserSelection_StateObject = scanFilenameId_On_PSM_Filter_UserSelection_StateObject
        this.scan_RetentionTime_MZ_UserSelections_StateObject = scan_RetentionTime_MZ_UserSelections_StateObject
        this.psm_Charge_Filter_UserSelection_StateObject = psm_Charge_Filter_UserSelection_StateObject

        this.proteinSequenceWidget_StateObject = proteinSequenceWidget_StateObject
    }

    /**
     *
     *
     *
     */
    is_AnyFilter__HasFilterValue() {

        if ( this.modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected()
            || this.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
            || this.modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected()
            || this.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected()
            || this.peptideUnique_UserSelection_StateObject.getPeptideUnique()
            || this.peptideSequence_MissedCleavageCount_UserSelections_StateObject.is_Any_FilterHaveValue()
            || this.proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
            || this.proteinSequenceWidget_StateObject.is_Any_selected_Protein_StartEnd_Position()
            || this.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.get_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelection() !== PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject__SelectionEnum.NONE
            || ( this.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter() !== undefined && this.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter() !== null )
            || ( ! this.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() )
            || this.scan_RetentionTime_MZ_UserSelections_StateObject && this.scan_RetentionTime_MZ_UserSelections_StateObject.is_Any_FilterHaveValue()
            || ( ! this.psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs() ) ) {


            return true
        }

        return false
    }


}