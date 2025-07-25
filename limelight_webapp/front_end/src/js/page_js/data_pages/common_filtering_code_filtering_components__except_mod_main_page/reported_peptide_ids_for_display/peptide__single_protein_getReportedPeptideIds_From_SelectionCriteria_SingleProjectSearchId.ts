/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.ts
 *
 * Javascript for protein_Experiment.jsp page - Get Reported Peptide Ids From Selection Criteria for a Single Project Search Id
 *
 * Selection Criteria:
 *  1) Variable and Static Modifications (and NO Variable Modifications as a part of this)
 *  2) Reporter Ions
 *  2) Search String(s) to search Peptide Sequences
 *  3) Protein Positions
 *
 * Companion file to Peptide and Single Protein
 *
 *
 * !!!!   WARNING:  Other functions re-create this data structure based on additional filtering:
 *
 *                      create_GeneratedReportedPeptideListData__SingleProtein(...)
 *
 */

import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType,
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections";
import {Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together";
import {Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections__For_ModificationSelections";
import {Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections__For_ReporterIonSelections";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_NO_PSM_Peptide_Protein_Filtering__sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered";


/////////   Returned Classes

/**
 *
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    private _projectSearchId: number
    private _entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>

    constructor(
        {
            projectSearchId, entriesMap_KeyReportedPeptideId
        } : {
            projectSearchId: number
            entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>
        }) {
        this._projectSearchId = projectSearchId;
        if (entriesMap_KeyReportedPeptideId) {
            this._entriesMap_KeyReportedPeptideId = entriesMap_KeyReportedPeptideId
        } else {
            this._entriesMap_KeyReportedPeptideId = new Map()
        }
    }

    get_projectSearchId() {
        return this._projectSearchId;
    }

    /**
     *
     */
    insert_Entry(entry: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId) : void {
        this._entriesMap_KeyReportedPeptideId.set(entry.reportedPeptideId, entry)
    }

    /**
     *
     */
    get_reportedPeptideIds(): ReadonlySet<number> {
        return  new Set(this._entriesMap_KeyReportedPeptideId.keys())
    }

    /**
     *
     */
    get_EntryFor_reportedPeptideId(reportedPeptideId: number): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {
        return this._entriesMap_KeyReportedPeptideId.get(reportedPeptideId);
    }

    /**
     *
     */
    get_Entries_IterableIterator(): IterableIterator<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> {

        return this._entriesMap_KeyReportedPeptideId.values()
    }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

/**
 *
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    readonly reportedPeptideId: number

    readonly psmCount_after_Include: number  //  Computed PSM Count after take into account Include and Exclude PSM Ids

    readonly psmCount_after_Include_Map_Key_SearchSubGroupId : ReadonlyMap<number,number>

    private _psmEntries_Include_Map_Key_PsmId: ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
    private _psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId: ReadonlyMap<number, Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>>

    //  Computed in constructor

    readonly psmIds_Include: ReadonlySet<number>
    readonly psmIds_IncludeSet_Map_Key_SearchSubGroupId: ReadonlyMap<number,ReadonlySet<number>>

    /**
     \*
     */
    constructor(
        {
            reportedPeptideId, psmCount_after_Include_Map_Key_SearchSubGroupId,
            psmEntries_Map_Key_PsmId,
            psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId,
            psmCount_after_Include
        }: {
            reportedPeptideId: number
            psmCount_after_Include_Map_Key_SearchSubGroupId? : ReadonlyMap<number,number>
            psmEntries_Map_Key_PsmId: ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
            psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId?: ReadonlyMap<number, Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>>
            psmCount_after_Include: number
        }) {
        this.reportedPeptideId = reportedPeptideId
        this.psmCount_after_Include_Map_Key_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId

        this._psmEntries_Include_Map_Key_PsmId = psmEntries_Map_Key_PsmId
        this._psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId = psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId
        this.psmCount_after_Include = psmCount_after_Include


        if ( psmEntries_Map_Key_PsmId ) {
            this.psmIds_Include = new Set( psmEntries_Map_Key_PsmId.keys() )
        }

        if ( psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId ) {

            const psmIds_IncludeSet_Map_Key_SearchSubGroupId: Map<number,Set<number>> = new Map()

            for ( const psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId_MapEntry of psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId.entries() ) {
                const searchSubGroupId = psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId_MapEntry[ 0 ]
                const psmEntries_Include_Map_Key_PsmId_Map = psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId_MapEntry[ 1 ]

                psmIds_IncludeSet_Map_Key_SearchSubGroupId.set( searchSubGroupId, new Set( psmEntries_Include_Map_Key_PsmId_Map.keys() ) )
            }

            this.psmIds_IncludeSet_Map_Key_SearchSubGroupId = psmIds_IncludeSet_Map_Key_SearchSubGroupId
        }
    }

    get psmEntries_Include_Map_Key_PsmId(): ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> {
        return this._psmEntries_Include_Map_Key_PsmId
    }
    get psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId(): ReadonlyMap<number, ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>> {
        return this._psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId
    }

}



export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId {

    readonly psmId: number

    /**
     * Initially created in the Filter that filters on Scan Peaks
     *
     * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
     */
    private _scanPeaks_That_PassFilters_Array: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>

    /**
     * Initially created in the Filter that filters on Scan Peaks
     *
     * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
     */
    private _scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>

    static constructFrom_FILTERING_INTERNAL_CLASS( filteringInternalClass_Object: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS ) {

        const newInstance = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId({
            psmId: filteringInternalClass_Object.psmId,
            scanPeaks_That_PassFilters_Array: filteringInternalClass_Object.scanPeaks_That_PassFilters_Array,
            scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: filteringInternalClass_Object.scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
        })

        return newInstance
    }

    static merge_ExistingObjectsOfThisType( existingObjectsOfThisType_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId {

        if ( ( ! existingObjectsOfThisType_Array ) || existingObjectsOfThisType_Array.length === 0 ) {
            throw Error("merge_ExistingObjectsOfThisType: ( ( ! existingObjectsOfThisType_Array ) || existingObjectsOfThisType_Array.length === 0 )")
        }

        const existingObjectsOfThisType_Array_FirstEntry = existingObjectsOfThisType_Array[ 0 ]

        if ( ! existingObjectsOfThisType_Array_FirstEntry ) {
            const msg = "merge_ExistingObjectsOfThisType(...): First Entry in 'existingObjectsOfThisType_Array' is undefined or null"
            console.warn(msg)
            throw Error(msg)
        }

        const psmId_FirstEntry = existingObjectsOfThisType_Array_FirstEntry.psmId

        let scanPeaks_That_PassFilters_Array: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak> = undefined

        let scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> = undefined

        for ( const existingEntry of existingObjectsOfThisType_Array ) {

            if ( ! existingEntry ) {
                const msg = "merge_ExistingObjectsOfThisType(...): Entry in 'existingObjectsOfThisType_Array' is undefined or null"
                console.warn(msg)
                throw Error(msg)
            }

            if ( existingEntry.psmId !== psmId_FirstEntry ) {
                throw Error( "merge_ExistingObjectsOfThisType: ( existingEntry.psmId !== psmId_FirstEntry )" )
            }

            if ( existingEntry._scanPeaks_That_PassFilters_Array ) {
                if ( scanPeaks_That_PassFilters_Array && ( scanPeaks_That_PassFilters_Array !== existingEntry._scanPeaks_That_PassFilters_Array ) ) {
                    throw Error( "( existingEntry._scanPeaks_That_PassFilters_Array ) AND ( scanPeaks_That_PassFilters_Array && ( scanPeaks_That_PassFilters_Array !== existingEntry._scanPeaks_That_PassFilters_Array ) ).  Already have saved value from previous existingEntry that is NOT same as current entry.  Assume that only one existing entry has value for _scanPeaks_That_PassFilters_Array" )
                }

                scanPeaks_That_PassFilters_Array = existingEntry._scanPeaks_That_PassFilters_Array
            }
            if ( existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) {
                if ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array && ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array !== existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) ) {
                    throw Error( "( existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) AND ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array && ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array !== existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) ).  Already have saved value from previous existingEntry that is NOT same as current entry.  Assume that only one existing entry has value for _scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array" )
                }

                scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array = existingEntry.scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
            }

        }

        const resultObject = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId({
            psmId: psmId_FirstEntry, scanPeaks_That_PassFilters_Array, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
        })

        return resultObject
    }

    constructor(
        {
            psmId, scanPeaks_That_PassFilters_Array, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
        } : {
            psmId: number
            scanPeaks_That_PassFilters_Array?: ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>

            /**
             * Initially created in the Filter that filters on Scan Peaks
             *
             * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
             */
            scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array?: ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>
        }
    ) {
        this.psmId = psmId
        this._scanPeaks_That_PassFilters_Array = scanPeaks_That_PassFilters_Array
        this._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array = scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
    }

    get scanPeaks_That_PassFilters_Array() : ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak> {
        return this._scanPeaks_That_PassFilters_Array
    }

    get scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array(): ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> {
        return this._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
    }

}

//////////////////////
//////////////////////  INTERNAL class to ONLY the Filtering Code
//////////////////////


/**
 *  INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {
    result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
    promise: Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
}

/**
 *  INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


    private _noFilter_OR_FilterHasNoData: boolean  //  Particular Filter not passed in or Filter contains NO user entries

    private _includeAll_ReportedPeptideIds: boolean  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)

    private _entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

    /**
     *
     * @param noFiltering - True when NO filtering applied for Single Filter or whole of OR or AND or NOT
     */
    constructor(
        {
            noFilter_OR_FilterHasNoData,  //  Particular Filter not passed in or Filter contains NO user entries
            includeAll_ReportedPeptideIds  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)

        } : {
            noFilter_OR_FilterHasNoData: boolean  //  Particular Filter not passed in or Filter contains NO user entries
            includeAll_ReportedPeptideIds: boolean  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)
        }
    ) {
        this._noFilter_OR_FilterHasNoData = noFilter_OR_FilterHasNoData;
        this._includeAll_ReportedPeptideIds = includeAll_ReportedPeptideIds;
    }

    clearAllEntries() : void {
        this._entriesMap_KeyReportedPeptideId.clear();
    }

    /**
     * Particular Filter not passed in or Filter contains NO user entries
     */
    is_noFilter_OR_FilterHasNoData() : boolean {
        return this._noFilter_OR_FilterHasNoData;
    }

    /**
     * When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)
     */
    is_includeAll_ReportedPeptideIds() : boolean {
        return this._includeAll_ReportedPeptideIds;
    }

    /**
     * Any per ReportedPeptideId entries
     */
    is_AnyEntries() : boolean {
        if ( this._entriesMap_KeyReportedPeptideId && this._entriesMap_KeyReportedPeptideId.size > 0 ) {
            return true;
        }
        return false;
    }

    /**
     * Get ReportedPeptideId entry from internal Map with key reportedPeptideId
     * @param reportedPeptideId
     */
    get_Entry_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._entriesMap_KeyReportedPeptideId.get( reportedPeptideId );
    }

    /**
     * Set ReportedPeptideId entry in internal Map with key entry.reportedPeptideId
     * @param entry
     */
    set_Entry_Using_entry_reportedPeptideId_AsKey( entry: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS ) : void {
        this._entriesMap_KeyReportedPeptideId.set( entry.reportedPeptideId, entry );
    }

    /**
     * Delete ReportedPeptideId entry from internal Map with key reportedPeptideId
     * @param reportedPeptideId
     */
    delete_Entry_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._entriesMap_KeyReportedPeptideId.delete( reportedPeptideId );
    }

    /**
     * get ReportedPeptideId entries iterator
     */
    get_Entries_IterableIterator(): IterableIterator<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS> {

        return this._entriesMap_KeyReportedPeptideId.values();
    }

    /**
     * get ReportedPeptideId entries iterator
     */
    get_Entries_Keys_ReportedPeptideIds() : IterableIterator<number> {

        return this._entriesMap_KeyReportedPeptideId.keys();
    }
}

/**
 * INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS {

    readonly reportedPeptideId: number

    private _psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS>

    constructor(
        {
            reportedPeptideId,
            psmEntries_Include_Map_Key_PsmId
        } : {
            reportedPeptideId: number
            psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId
        this._psmEntries_Include_Map_Key_PsmId = psmEntries_Include_Map_Key_PsmId;
    }

    get psmEntries_Include_Map_Key_PsmId() : ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> {
        return this._psmEntries_Include_Map_Key_PsmId
    }

    /**
     *
     * @param psmEntries_Include_Map_Key_PsmId
     */
    set_OVERRIDE_ONLYUSE_IN_FilteringCode__psmEntries_Include_Map_Key_PsmId( psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> ) {
        this._psmEntries_Include_Map_Key_PsmId = psmEntries_Include_Map_Key_PsmId
    }
}

/**
 * INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS {

    readonly psmId: number


    /**
     * Initially created in the Filter that filters on Scan Peaks
     *
     * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
     */
    private _scanPeaks_That_PassFilters_Array: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>

    /**
     * Initially created in the Filter that filters on Scan Peaks
     *
     * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
     */
    private _scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>


    static merge_ExistingObjectsOfThisType( existingObjectsOfThisType_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS {

        if ( ( ! existingObjectsOfThisType_Array ) || existingObjectsOfThisType_Array.length === 0 ) {
            throw Error("merge_ExistingObjectsOfThisType: ( ( ! existingObjectsOfThisType_Array ) || existingObjectsOfThisType_Array.length === 0 )")
        }

        const psmId_FirstEntry = existingObjectsOfThisType_Array[ 0 ].psmId

        let scanPeaks_That_PassFilters_Array: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak> = undefined

        let scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> = undefined

        for ( const existingEntry of existingObjectsOfThisType_Array ) {

            if ( existingEntry.psmId !== psmId_FirstEntry ) {
                throw Error( "merge_ExistingObjectsOfThisType: elements of 'existingObjectsOfThisType_Array' have different psmId values ( existingEntry.psmId !== psmId_FirstEntry )" )
            }

            if ( existingEntry._scanPeaks_That_PassFilters_Array ) {
                if ( scanPeaks_That_PassFilters_Array ) {
                    throw Error( "( existingEntry._scanPeaks_That_PassFilters_Array ) AND already have saved value from previous existingEntry.  Assume that only one existing entry has value for _scanPeaks_That_PassFilters_Array" )
                }
                scanPeaks_That_PassFilters_Array = existingEntry._scanPeaks_That_PassFilters_Array
            }

            if ( existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) {
                if ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) {
                    throw Error( "( existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array ) AND already have saved value from previous existingEntry.  Assume that only one existing entry has value for _scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array" )
                }
                scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array = existingEntry._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
            }
        }

        const resultObject = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
            psmId: psmId_FirstEntry, scanPeaks_That_PassFilters_Array, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
        })

        return resultObject
    }

    constructor(
        {
            psmId, scanPeaks_That_PassFilters_Array, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
        } : {
            psmId: number
            /**
             * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
             */
            scanPeaks_That_PassFilters_Array?: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>
            /**
             * IMPORTANT:  Assumed to be only on ONE object for a PSM ID.  There is NO plan to MERGE multiple values
             */
            scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array?: Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>
        }
    ) {
        this.psmId = psmId
        this._scanPeaks_That_PassFilters_Array = scanPeaks_That_PassFilters_Array
        this._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array = scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
    }

    get scanPeaks_That_PassFilters_Array() : ReadonlyArray<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak> {
        return this._scanPeaks_That_PassFilters_Array
    }

    get scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array(): ReadonlyArray<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> {
        return this._scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array
    }
}


///////////////

//  Class for input parameters to main method on main class

class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters {

    not_filtered_position_modification_selections: boolean
    dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
    proteinSequenceVersionId: number
    searchSubGroup_Ids_Selected: Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject: Scan_RetentionTime_MZ_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject: PeptideUnique_UserSelection_StateObject;
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
    peptideSequence_UserSelections_StateObject: PeptideSequence_UserSelections_StateObject
    peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
    proteinPositionFilter_UserSelections_StateObject: ProteinPositionFilter_UserSelections_StateObject
    proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
    userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
}


///////////////


//  Class for contents of returned from main method on main class

export class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
}

//  Class for returned from main method on main class

class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {
    data: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
    promise: Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>
}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//   !!! Main Class


/**
 * ONLY Instantiate in class GetReportedPeptideIdsForDisplay_AllProjectSearchIds
 */
export class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /////  OR/ANY processing

    //  Separate instances for OR/ANY and EXCLUDE/NOT since data is cached in the instances

    ///   Modifications

    /**
     * for OR/ANY processing
     */
    private _for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections

    /**
     * for EXCLUDE/NOT processing
     */
    private _for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections

    ///   Reporter Ions

    /**
     * for OR/ANY processing
     */
    private _for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections

    /**
     * for EXCLUDE/NOT processing
     */
    private _for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections

    /////
    //   ALL/AND Processing

    /**
     *  ALL/AND processing - Explicit.
     */
    private _peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class: Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class

    /**
     * ALL/AND processing - Implicit
     */
    private _peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class: Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;

        this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class =
            Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class =
            Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class.getNewInstance(({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            }))
    }

    /**
     * !!!!!!!!!!!  ONLY Instantiate in class GetReportedPeptideIdsForDisplay_AllProjectSearchIds
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }


    /**
     * !!!!!!!!!!!   Main Function / Method in class.  This is the external access point to code in this class   !!!!!!!!!!!!!!!!!!!
     *
     *
     * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
     *
     * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
     *
     * @returns class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class
     *
     *
     */
    peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId(
        {
            main_FunctionParams, reportedPeptideIds_Override__FromFirstFilteringRun
        } : {
            main_FunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters

            reportedPeptideIds_Override__FromFirstFilteringRun: Array<number>  //  Override reported peptide ids used as starting point for filtering
        }
    ): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

            //  !!!!!!!!!!  TODO   WHAT IS THIS,   Likely an optimization on Single Protein Overlay when user enters sequence that is not in the protein

        if ((!main_FunctionParams.not_filtered_position_modification_selections)
            && main_FunctionParams.userSearchString_LocationsOn_ProteinSequence_Root
            && (!main_FunctionParams.userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
            && ((!main_FunctionParams.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries)
                || main_FunctionParams.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0)) {
            //  Have User Protein Sequence Search String but it is not found in the protein sequence
            //  Return empty array
            return {    // EARLY RETURN
                data: {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                        projectSearchId: this._projectSearchId, entriesMap_KeyReportedPeptideId: undefined
                    })
                },
                promise: undefined
            };
        }

        //  Optimization for All Checkboxes deselected for Scan Filename, PSM Charge, Search Sub Group.  Return Empty

        if ( ( main_FunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject
                && main_FunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected()
                && main_FunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected().size == 0 )
            || ( main_FunctionParams.psm_Charge_Filter_UserSelection_StateObject
                && main_FunctionParams.psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected()
                && main_FunctionParams.psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected().size === 0 )
            || ( main_FunctionParams.searchSubGroup_Ids_Selected && main_FunctionParams.searchSubGroup_Ids_Selected.size === 0 ) ) {
            //  Empty Selection for Scan Filenames, PSM Charge, or Search Sub Groups so return EMPTY
            return {    // EARLY RETURN
                data: {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                        projectSearchId: this._projectSearchId, entriesMap_KeyReportedPeptideId: undefined
                    })
                },
                promise: undefined
            }
        }

        //   Use passed in reported peptide ids override if provided

        if ( reportedPeptideIds_Override__FromFirstFilteringRun ) {

            const reportedPeptideIds_ProteinId_Params_PassedIn = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn({
                reportedPeptideIds_StartingPointForFiltering: reportedPeptideIds_Override__FromFirstFilteringRun,
                proteinSequenceVersionId: undefined,
                reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum:
                Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.OTHER_FILTERED__FROM_FIRST_FILTERING_RUN
            })

            const filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main = {

                not_filtered_position_modification_selections: main_FunctionParams.not_filtered_position_modification_selections,
                dataPage_common_Flags_SingleSearch: main_FunctionParams.dataPage_common_Flags_SingleSearch,

                reportedPeptideIds_ProteinId_Params_PassedIn,

                searchSubGroup_Ids_Selected: main_FunctionParams.searchSubGroup_Ids_Selected,
                modificationMass_UserSelections_StateObject: main_FunctionParams.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: main_FunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject: main_FunctionParams.reporterIonMass_UserSelections_StateObject,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject: main_FunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: main_FunctionParams.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : main_FunctionParams.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject: main_FunctionParams.scan_RetentionTime_MZ_UserSelection_StateObject,
                peptideUnique_UserSelection_StateObject: main_FunctionParams.peptideUnique_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject : main_FunctionParams.psm_Charge_Filter_UserSelection_StateObject,
                psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : main_FunctionParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject: main_FunctionParams.peptideSequence_UserSelections_StateObject,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject : main_FunctionParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : main_FunctionParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                proteinSequenceWidget_StateObject: main_FunctionParams.proteinSequenceWidget_StateObject,
                proteinPositionFilter_UserSelections_StateObject: main_FunctionParams.proteinPositionFilter_UserSelections_StateObject,
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject: main_FunctionParams.proteinPosition_Of_Modification_Filter_UserSelections_StateObject
            }

            const result_processing_TopLevel = this._processing_TopLevel__With__FilteringParams_Object({
                filtering_Params_Main
            })
            return result_processing_TopLevel;  //  EARLY RETURN

        }

        //  Get Top level data and then call this._processing_TopLevel(...) to process it

        const result_processing_TopLevel__GetData = _processing_TopLevel__GetData({
            main_FunctionParams,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
        if ( result_processing_TopLevel__GetData.result ) {
            const result_processing_TopLevel = this._processing_TopLevel__With_Retrieved_reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId({
                main_FunctionParams,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: result_processing_TopLevel__GetData.result.reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
            })
            return result_processing_TopLevel;  //  EARLY RETURN

        } else if ( result_processing_TopLevel__GetData.promise ) {

            return {          //  EARLY RETURN
                data: undefined,
                promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                    result_processing_TopLevel__GetData.promise.catch(reason => {reject(reason)})
                    result_processing_TopLevel__GetData.promise.then(topLevelData => {try {
                        const result_processing_TopLevel = this._processing_TopLevel__With_Retrieved_reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId({
                            main_FunctionParams,
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: topLevelData.reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
                        })
                        if ( result_processing_TopLevel.data ) {
                            resolve( result_processing_TopLevel.data );  //   resolve
                        } else if ( result_processing_TopLevel.promise ) {
                            result_processing_TopLevel.promise.catch(reason => { reject(reason) })
                            result_processing_TopLevel.promise.then(processing_TopLevel_Value => {try {
                                resolve(processing_TopLevel_Value);  //  resolve
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } else {
                            throw Error("result_processing_TopLevel no data or promise")
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                })
            }
        } else {
            throw Error("result_processing_TopLevel__GetData no result or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     *
     */
    private _processing_TopLevel__With_Retrieved_reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId(
        {
            main_FunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
        } : {
            main_FunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType

        }) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        let reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum =
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.ALL_FOR_SEARCH

        if ( main_FunctionParams.proteinSequenceVersionId !== undefined && main_FunctionParams.proteinSequenceVersionId !== null ) {
            reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum =
                Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.ALL_FOR_SINGLE_PROTEIN_IN_SEARCH
        }

        const reportedPeptideIds_ProteinId_Params_PassedIn = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn({
            reportedPeptideIds_StartingPointForFiltering: reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId: main_FunctionParams.proteinSequenceVersionId,
            reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
        })

        const filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main = {

            not_filtered_position_modification_selections: main_FunctionParams.not_filtered_position_modification_selections,
            dataPage_common_Flags_SingleSearch: main_FunctionParams.dataPage_common_Flags_SingleSearch,

            reportedPeptideIds_ProteinId_Params_PassedIn,

            searchSubGroup_Ids_Selected: main_FunctionParams.searchSubGroup_Ids_Selected,
            modificationMass_UserSelections_StateObject: main_FunctionParams.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: main_FunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject: main_FunctionParams.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject: main_FunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: main_FunctionParams.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : main_FunctionParams.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject: main_FunctionParams.scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject: main_FunctionParams.peptideUnique_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject : main_FunctionParams.psm_Charge_Filter_UserSelection_StateObject,
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : main_FunctionParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject: main_FunctionParams.peptideSequence_UserSelections_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : main_FunctionParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : main_FunctionParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
            proteinSequenceWidget_StateObject: main_FunctionParams.proteinSequenceWidget_StateObject,
            proteinPositionFilter_UserSelections_StateObject: main_FunctionParams.proteinPositionFilter_UserSelections_StateObject,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject: main_FunctionParams.proteinPosition_Of_Modification_Filter_UserSelections_StateObject
        }

        return this._processing_TopLevel__With__FilteringParams_Object({ filtering_Params_Main })
    }

    /**
     * Top level processing.
     *
     * Create the combined (ANY, ALL, NOT) AKA (OR,AND,EXCLUDE)  and then convert to final output (populating Sub search data as needed)
     */
    private _processing_TopLevel__With__FilteringParams_Object(
        {
            filtering_Params_Main
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main

        }) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {



        const result_create__Combined__OR_AND_EXCLUDE = this._create__Combined__OR_AND_EXCLUDE({
            filtering_Params_Main
        })
        if ( result_create__Combined__OR_AND_EXCLUDE.result ) {

            return this._convertToFinalResult({
                filtering_Params_Main,
                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: result_create__Combined__OR_AND_EXCLUDE.result
            })
        } else if ( result_create__Combined__OR_AND_EXCLUDE.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => { try {
                result_create__Combined__OR_AND_EXCLUDE.promise.catch(reason => { reject(reason)})
                result_create__Combined__OR_AND_EXCLUDE.promise.then(value_result_create__Combined__OR_AND_EXCLUDE => {try {
                    const result_convertToFinalResult = this._convertToFinalResult({
                        filtering_Params_Main,
                        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: value_result_create__Combined__OR_AND_EXCLUDE
                    })
                    if ( result_convertToFinalResult.data ) {
                        resolve(result_convertToFinalResult.data)
                    } else if ( result_convertToFinalResult.promise ) {
                        result_convertToFinalResult.promise.catch(reason => { reject(reason)})
                        result_convertToFinalResult.promise.then(value_result_convertToFinalResult => {try {
                            resolve(value_result_convertToFinalResult)
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } else {
                        throw Error("result_convertToFinalResult no data or promise")
                    }
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}) }
        } else {
            throw Error("result_create__Combined__OR_AND_EXCLUDE no result or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * Create the combined (OR,AND,EXCLUDE) AKA (ANY, ALL, NOT)
     */
    private _create__Combined__OR_AND_EXCLUDE(
        {
            filtering_Params_Main
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( filtering_Params_Main.not_filtered_position_modification_selections ) {

            //  NO Filtering requested by calling function (likely for "Download All"

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: true
            });

            return { promise: undefined, result } //  EARLY RETURN
        }

        const OR_AND_Result = this._create__Combined__OR_AND({
            filtering_Params_Main
        })

        const merge__EXCLUDE_AKA_NOT__Result = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___Process_Result_Promise__From__OR_AND__Result({
            OR_AND_Result,
            filtering_Params_Main
        })

        return merge__EXCLUDE_AKA_NOT__Result;
    }

    /**
     * Create the combined (OR,AND) AKA (ANY, ALL)
     */
    private _create__Combined__OR_AND(
        {
            filtering_Params_Main
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        /////////

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        //   "ANY"/"OR" filtering   Modifications
        {
            const result =
                this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ModificationSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_UserSelections_StateObject: filtering_Params_Main.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: filtering_Params_Main.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                });
            if (!result) {
                const msg = "result is null or undefined from peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
        }

        //   "ANY"/"OR" filtering   Reporter Ions
        {
            const result =
                this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ReporterIonSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    reporterIonMass_UserSelections_StateObject: filtering_Params_Main.reporterIonMass_UserSelections_StateObject
                });
            if (!result) {
                const msg = "result is null or undefined from peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
        }


        { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
            const resultArray =
                this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class.
                peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together({
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_UserSelections_StateObject: filtering_Params_Main.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: filtering_Params_Main.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject: filtering_Params_Main.reporterIonMass_UserSelections_StateObject,
                });

            for (const result of resultArray) {
                if (!result) {
                    const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                    console.warn(msg);
                    throw Error(msg);
                }
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
            }
        }

        { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
            const resultArray =
                this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class.
                peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together({
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    dataPage_common_Flags_SingleSearch: filtering_Params_Main.dataPage_common_Flags_SingleSearch,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: filtering_Params_Main.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: filtering_Params_Main.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                    scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : filtering_Params_Main.scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: filtering_Params_Main.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: filtering_Params_Main.psm_Charge_Filter_UserSelection_StateObject,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: filtering_Params_Main.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject: filtering_Params_Main.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject: filtering_Params_Main.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject: filtering_Params_Main.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    proteinSequenceWidget_StateObject: filtering_Params_Main.proteinSequenceWidget_StateObject,
                    proteinPositionFilter_UserSelections_StateObject: filtering_Params_Main.proteinPositionFilter_UserSelections_StateObject,
                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject: filtering_Params_Main.proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: filtering_Params_Main.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            for (const result of resultArray) {
                if (!result) {
                    const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                    console.warn(msg);
                    throw Error(msg);
                }
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
            }
        }

        //  The Data result returned will be replaced if there are any "NOT"/"EXCLUDE" User Selections
        const merge__INTERSECTION__Result =
            _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
            });

        return merge__INTERSECTION__Result;
    }

    /////////////////////////////////

    ////   Apply EXCLUDE/NOT selections  (next few functions/methods)

    /**
     *
     * @param OR_AND_Result  --  From OR/AND selections
     * @param filtering_Params_Main
     * @param numPsmsForReportedPeptideIdMap
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @private
     */
    private _process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___Process_Result_Promise__From__OR_AND__Result(
        {
            OR_AND_Result,
            filtering_Params_Main
        } : {
            OR_AND_Result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( OR_AND_Result.result )  {

            const result_From_Not_Exclude = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude({
                filtering_Params_Main,
                OR_AND_Results: OR_AND_Result.result,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
            })

            return result_From_Not_Exclude;

        } else if ( OR_AND_Result.promise ) {

            const promise_Result = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
                try {
                    OR_AND_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    OR_AND_Result.promise.then(value => {
                        try {
                            const result_From_Not_Exclude = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude({
                                filtering_Params_Main,
                                OR_AND_Results: value,
                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
                            })

                            if ( result_From_Not_Exclude.result ) {

                                resolve(result_From_Not_Exclude.result)  //  EARLY RETURN

                            } else if ( result_From_Not_Exclude.promise ) {

                                result_From_Not_Exclude.promise.catch(reason => {
                                    reject(reason)
                                })
                                result_From_Not_Exclude.promise.then(value => {
                                    try {
                                        resolve(value);

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                })
                            } else {
                                throw Error("result_From_Not_Exclude: no 'data' or 'promise'")
                            }

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

            return { promise: promise_Result, result: undefined }

        } else {
            const msg = "OR_AND_Result no 'data' or 'promise'";
            console.warn(msg)
            throw Error(msg)
        }

    }

    /**
     * Actual   EXCLUDE processing
     *
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude(
        {
            filtering_Params_Main,
            OR_AND_Results,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        //  First an optimization,  Skip processing EXCLUDE if possible since may require more data from server.

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = false;

        if (!OR_AND_Results.is_noFilter_OR_FilterHasNoData()) {

            if (!OR_AND_Results.is_includeAll_ReportedPeptideIds()) {

                if (!OR_AND_Results.is_AnyEntries()) {

                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = true;
                }
            }
        }

        if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection) {

            //  Nothing in the input so return it.  Nothing from (OR/AND) processing.  EARLY RETURN

            return {    // EARLY RETURN
                result: OR_AND_Results,
                promise: undefined
            };
        }

        //  Execute following since not empty selection

        const NOT_Selection_Results__FUNCTION_RESULT__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = []

        {  //  "NOT" - For all "NOT" Modifications selections
            const NOT_Selection_Results__Modifications =
                this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ModificationSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    modificationMass_UserSelections_StateObject: filtering_Params_Main.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: filtering_Params_Main.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                });

            NOT_Selection_Results__FUNCTION_RESULT__Array.push( NOT_Selection_Results__Modifications )
        }

        {  //  "NOT" - For all "NOT" Reporter Ion selections
            const NOT_Selection_Results =
                this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ReporterIonSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
                    reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,
                    reporterIonMass_UserSelections_StateObject: filtering_Params_Main.reporterIonMass_UserSelections_StateObject
                });

            NOT_Selection_Results__FUNCTION_RESULT__Array.push( NOT_Selection_Results )
        }

        return this._removeEntries_for_NOT_EXCLUDE_Selections({
            filtering_Params_Main,
            OR_AND_Results,
            NOT_Selection_Results__FUNCTION_RESULT__Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }


    /**
     *
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param OR_AND_Results
     * @param NOT_Selection_Results
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     * @private
     */
    private _removeEntries_for_NOT_EXCLUDE_Selections(
        {
            filtering_Params_Main,
            OR_AND_Results,
            NOT_Selection_Results__FUNCTION_RESULT__Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            NOT_Selection_Results__FUNCTION_RESULT__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        const promises: Array<Promise<void>> = []

        const NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

        for ( const result__FUNCTION_RESULT of NOT_Selection_Results__FUNCTION_RESULT__Array ) {
            if ( result__FUNCTION_RESULT.result ) {
                NOT_Selection_Results_Array.push( result__FUNCTION_RESULT.result )
            } else if ( result__FUNCTION_RESULT.promise ) {
                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        result__FUNCTION_RESULT.promise.catch(reason => reject(reason))
                        result__FUNCTION_RESULT.promise.then(value_result__FUNCTION_RESULT => {
                            try {
                                NOT_Selection_Results_Array.push( value_result__FUNCTION_RESULT )
                                resolve()
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        })
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })
                promises.push(promise)
            } else {
                throw Error("result__FUNCTION_RESULT NO .result or .promise")
            }
        }

        if ( promises.length === 0 ) {

            const result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises = this._removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises({
                filtering_Params_Main,
                OR_AND_Results,    // ANY and AND Selected values
                NOT_Selection_Results_Array,       // NOT Selected values to remove
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

            return result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
            try {
                promises_All.catch(reason => {
                    reject(reason)
                })
                promises_All.then(noValue => {
                    try {
                        const result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises = this._removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises({
                            filtering_Params_Main,
                            OR_AND_Results,    // ANY and AND Selected values
                            NOT_Selection_Results_Array,       // NOT Selected values to remove
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                        });

                        if ( result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.result ) {
                            resolve(result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.result)
                        } else if ( result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise ) {
                            result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise.catch(reason => reject(reason))
                            result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise.then(value_result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises => {
                                try {
                                    resolve(value_result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises)

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                        } else {
                            throw Error("result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises no .result or .promise")
                        }
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
        return { result: undefined, promise: promise_Return }
    }

    /**
     *
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param OR_AND_Results
     * @param NOT_Selection_Results
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     * @private
     */
    private _removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises(
        {
            filtering_Params_Main,
            OR_AND_Results,
            NOT_Selection_Results_Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        let nothingIsExcluded = true;

        for ( const NOT_Selection_Results of NOT_Selection_Results_Array ) {

            if ( ( ! NOT_Selection_Results.is_noFilter_OR_FilterHasNoData() ) && ( NOT_Selection_Results.is_includeAll_ReportedPeptideIds() ) ) {

                //  Everything is Excluded so return empty

                const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });
                return { result, promise: undefined }  //  EARLY RETURN

            } else {
                if ( ( ! NOT_Selection_Results.is_noFilter_OR_FilterHasNoData() ) && ( NOT_Selection_Results.is_AnyEntries() ) ) {

                    //  Something is excluded

                    nothingIsExcluded = false;
                }
            }
        }

        if ( nothingIsExcluded ) {  //  Nothing to delete so return input

            return {  promise: undefined, result: OR_AND_Results }  //  EARLY RETURN
        }

        //  Remove all exclusions

        const resultsAfterRemoval =
            peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections({

                reportedPeptideIds_ProteinId_Params_PassedIn: filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn,

                OR_AND_Results,   // OR and AND Selected values

                NOT_Selection_Results_Array,    // NOT Selected values to remove

                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

        return resultsAfterRemoval;
    }

    ///////////////////

    /**
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult(
        {
            filtering_Params_Main,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final:
                Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        const result_convertToFinalResult_MainPart = this._convertToFinalResult_MainPart({
            filtering_Params_Main,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        })

        // Next add Search Sub Group data, if needed

        if ( result_convertToFinalResult_MainPart.data ) {
            const result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data({
                finalResultFormat__Input: result_convertToFinalResult_MainPart.data,
                filtering_Params_Main
            })
            //  Return if has data or has promise
            return result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids;  // !!  EARLY RETURN
        } else if ( result_convertToFinalResult_MainPart.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {try {
                    result_convertToFinalResult_MainPart.promise.catch(reason => { reject(reason)})
                    result_convertToFinalResult_MainPart.promise.then(value_result_convertToFinalResult_MainPart => { try {
                        const result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data({
                            finalResultFormat__Input: value_result_convertToFinalResult_MainPart,
                            filtering_Params_Main
                        })
                        if ( result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.data ) {
                            resolve(result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.data);  //    !! resolve
                        } else if ( result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise ) {
                            result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise.catch(reason => { reject(reason)})
                            result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise.then(value_result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids => { try {
                                resolve(value_result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids) //   !! resolve
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } else {
                            throw Error("result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids no data or promise")
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("result_convertToFinalResult_MainPart no data or promise")
        }
    }

    /**
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult_MainPart(
        {
            filtering_Params_Main,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS

        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        const result__convertToFinalResult_MainPart__GetData = _convertToFinalResult_MainPart__GetData({
            filtering_Params_Main, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        if ( result__convertToFinalResult_MainPart__GetData.result ) {
            return { promise: undefined, data: this._convertToFinalResult_MainPart_WithData({
                    filtering_Params_Main,
                    peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
                    numPsmsForReportedPeptideIdMap: result__convertToFinalResult_MainPart__GetData.result.numPsmsForReportedPeptideIdMap
                }) }
        } else if ( result__convertToFinalResult_MainPart__GetData.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                    result__convertToFinalResult_MainPart__GetData.promise.catch(reason => { reject(reason)})
                    result__convertToFinalResult_MainPart__GetData.promise.then(value_result__convertToFinalResult_MainPart__GetData => { try {
                        const result_convertToFinalResult_MainPart_WithData = this._convertToFinalResult_MainPart_WithData({
                            filtering_Params_Main,
                            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
                            numPsmsForReportedPeptideIdMap: value_result__convertToFinalResult_MainPart__GetData.numPsmsForReportedPeptideIdMap
                        })
                        resolve(result_convertToFinalResult_MainPart_WithData)

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                })}
        } else {
            throw Error("result__convertToFinalResult_MainPart__GetData: no result or promise")
        }
        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * @param filtering_Params_Main
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult_MainPart_WithData(
        {
            filtering_Params_Main,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
            numPsmsForReportedPeptideIdMap
        } : {
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType

        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {

        // Convert to function return value:   Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined;
        {
            const entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> = new Map()

            if (peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_noFilter_OR_FilterHasNoData()
                || peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_includeAll_ReportedPeptideIds()) {

                for (const reportedPeptideId of filtering_Params_Main.reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                    let numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if (numPsms === undefined || numPsms === null) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                    }
                    if (numPsms === 0) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === 0: reportedPeptideId: " + reportedPeptideId)
                    }

                    const result_For_ReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                        reportedPeptideId,
                        psmCount_after_Include: numPsms,
                        psmCount_after_Include_Map_Key_SearchSubGroupId: undefined,
                        psmEntries_Map_Key_PsmId: undefined,
                        psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId: undefined
                    });

                    entriesMap_KeyReportedPeptideId.set(reportedPeptideId, result_For_ReportedPeptideId);
                }

            } else {

                for (const entry of peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.get_Entries_IterableIterator()) {

                    const reportedPeptideId = entry.reportedPeptideId;
                    const psmEntries_Include_Map_Key_PsmId = entry.psmEntries_Include_Map_Key_PsmId;

                    let numPsms: number = undefined;

                    let psmEntries_Include_Map_Key_PsmId__Output: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>

                    if (psmEntries_Include_Map_Key_PsmId) {

                        numPsms = psmEntries_Include_Map_Key_PsmId.size;

                        if (numPsms === 0) {
                            throw Error("numPsms = psmIds_Include.size: numPsms === 0: reportedPeptideId: " + reportedPeptideId)
                        }

                        psmEntries_Include_Map_Key_PsmId__Output = new Map()

                        for ( const psm_Include of psmEntries_Include_Map_Key_PsmId.values() ) {

                            const psm_Include_Output = Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId.constructFrom_FILTERING_INTERNAL_CLASS(psm_Include)

                            if ( psmEntries_Include_Map_Key_PsmId__Output.has( psm_Include_Output.psmId ) ) {
                                const msg = "psmEntries_Include_Map_Key_PsmId__Output ALREADY HAS entry with key: psm_Include_Output.psmId: " + psm_Include_Output.psmId
                                console.warn(msg)
                                throw Error(msg)
                            }

                            psmEntries_Include_Map_Key_PsmId__Output.set( psm_Include_Output.psmId, psm_Include_Output )
                        }

                    } else {
                        numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                        if (numPsms === undefined || numPsms === null) {
                            throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                        }
                        if (numPsms === 0) {
                            throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === 0: reportedPeptideId: " + reportedPeptideId)
                        }
                    }

                    const result_For_ReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                        reportedPeptideId,
                        psmEntries_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId__Output,
                        psmCount_after_Include: numPsms,
                        psmCount_after_Include_Map_Key_SearchSubGroupId: undefined,
                        psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId: undefined
                    });

                    entriesMap_KeyReportedPeptideId.set(reportedPeptideId, result_For_ReportedPeptideId);
                }
            }

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                    projectSearchId: this._projectSearchId,
                    entriesMap_KeyReportedPeptideId
                });
        }

        return { reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId }
    }


    ////////////////////////////

    /**
     *
     *
     */
    private _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data(
        {
            finalResultFormat__Input,
            filtering_Params_Main
        }: {
            finalResultFormat__Input : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main

        }): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        const searchSubGroup_Ids_Selected : Set<number> = filtering_Params_Main.searchSubGroup_Ids_Selected;

        if ( ! searchSubGroup_Ids_Selected ) {

            //  No searchSubGroup_Ids_Selected so return input param

            return { promise: undefined, data: finalResultFormat__Input };  // EARLY RETURN
        }

        const getData_Result = _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__GetData({
            filtering_Params_Main, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        if ( getData_Result.result ) {
            return { promise: undefined, data: this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData({
                finalResultFormat__Input, filtering_Params_Main,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                searchSubGroupId_ForPSM_ID_Holder: getData_Result.result.searchSubGroupId_ForPSM_ID_Holder
            })}
        } else if ( getData_Result.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                getData_Result.promise.catch(reason => { reject(reason)})
                getData_Result.promise.then(value_getData_Result => {try {
                    const createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Result = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData({
                        finalResultFormat__Input, filtering_Params_Main,
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                        searchSubGroupId_ForPSM_ID_Holder: value_getData_Result.searchSubGroupId_ForPSM_ID_Holder
                    });
                    resolve( createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Result )  // RESOLVE
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            })}
        } else {
            throw Error("getData_Result no result or promise")
        }
    }

    /**
     *
     *
     */
    private _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData(
        {
            finalResultFormat__Input, filtering_Params_Main,

            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            searchSubGroupId_ForPSM_ID_Holder
        }: {
            finalResultFormat__Input : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
            filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main

            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder

        }): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {

        const searchSubGroup_Ids_Selected = filtering_Params_Main.searchSubGroup_Ids_Selected;

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result =  new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
            projectSearchId: this._projectSearchId,
            entriesMap_KeyReportedPeptideId: undefined, //  Constructor will create its own
        });

        for ( const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry of finalResultFormat__Input.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ){

            const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId;
            let psmCount_after_Include = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include;

            let psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>
            let psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId: Map<number, Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId>>

            const psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number, number> = new Map();


            // !!!!  IMPORTANT::  In Following code, use psmEntries_Include_Map_Key_PsmId__FOR__reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry INSTEAD OF reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmEntries_Include_Map_Key_PsmId

            const psmEntries_Include_Map_Key_PsmId__FOR__reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId> = new Map()

            if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmEntries_Include_Map_Key_PsmId ) {

                for ( const mapEntry of reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmEntries_Include_Map_Key_PsmId.entries() ) {
                    psmEntries_Include_Map_Key_PsmId__FOR__reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.set( mapEntry[ 0 ], mapEntry[ 1 ] )
                }
            } else {

                //  reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmEntries_Include_Map_Key_PsmId NOT populated

                //  Populate it to ensure that all downstream processing processes the PSM Ids ONLY for selected search sub group ids

                const psmIds_For_ReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId )
                if ( ! psmIds_For_ReportedPeptideId ) {
                    const msg = ".get_psmIds_For_ReportedPeptideId( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId ) returned NOTHING for reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId: " + reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                for ( const psmId of psmIds_For_ReportedPeptideId ) {
                    const psmEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__SingleReportedPeptideId_ForSinglePsmId({
                        psmId
                    })
                    psmEntries_Include_Map_Key_PsmId__FOR__reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.set( psmEntry.psmId, psmEntry )
                }
            }

            {
                psmEntries_Include_Map_Key_PsmId = new Map();  // psms Filtered on Selected searchSubGroup_Ids_Selected

                // Split psmIds_Include on searchSubGroup_Ids_Selected

                if ( ! searchSubGroupId_ForPSM_ID_Holder ) {
                    const msg = "searchSubGroupId_ForPSM_ID_Holder not populated "
                    console.warn(msg)
                    throw Error(msg)
                }

                psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId = new Map();

                for ( const psm_Include of psmEntries_Include_Map_Key_PsmId__FOR__reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.values() ) {

                    const subGroupId = searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psm_Include.psmId )

                    if ( ! subGroupId === undefined ) {
                        throw Error("searchSubGroupId_ForPSM_ID_Holder.get_subGroupId_For_PsmId( psm_Include.psmId ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). psm_Include.psmId: " + psm_Include.psmId + ", projectSearchId: " + this._projectSearchId );
                    }

                    if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                        //  Filtering Conditional

                        //  subGroupId is not selected so skip record

                        continue;  // EARLY CONTINUE - Skip to next psm_Include
                    }

                    let psmEntries_Include_Map_For__SearchSubGroupId = psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId.get( subGroupId );
                    if ( ! psmEntries_Include_Map_For__SearchSubGroupId ) {
                        psmEntries_Include_Map_For__SearchSubGroupId = new Map();
                        psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId.set( subGroupId, psmEntries_Include_Map_For__SearchSubGroupId );
                    }
                    psmEntries_Include_Map_For__SearchSubGroupId.set( psm_Include.psmId, psm_Include );

                    psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include );  //  add to new Map for overall for Reported Peptide Id
                }

                if ( psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId.size === 0 ) {

                    //  No psmIds_Include after filter on searchSubGroup_Ids_Selected so Skip Reported Peptide Id Entry

                    //   Skip to next reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry

                    continue;  // !!!  EARLY CONTINUE - Skip to next reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry
                }

                psmCount_after_Include = 0;

                for ( const mapEntry of psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId.entries() ) {

                    const subGroupId = mapEntry[ 0 ];
                    const psms_IncludeSet_For_SubGroupId = mapEntry[ 1 ];

                    psmCount_after_Include_Map_Key_SearchSubGroupId.set( subGroupId, psms_IncludeSet_For_SubGroupId.size );

                    psmCount_after_Include += psms_IncludeSet_For_SubGroupId.size;
                }

            }

            if ( psmCount_after_Include === 0 ) {
                //  No longer have any PSMs so SKIP

                continue;  // EARLY CONTINUE
            }

            const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId,
                psmEntries_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId,
                psmEntries_IncludeMap_Key_PsmId_Map_Key_SearchSubGroupId: psmEntries_Include_Map_Key_PsmId_Map_Key_SearchSubGroupId,
                psmCount_after_Include,
                psmCount_after_Include_Map_Key_SearchSubGroupId
            })

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result.insert_Entry( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New );

        }

        return {reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result}; //  Return new reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result
    }


}   //   End of MAIN Class

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////    NON-Class Functions

//  Get from server


/**
 * get data for _processing_TopLevel()
 */
const _processing_TopLevel__GetData = function(
    {
        main_FunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        main_FunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }
    promise: Promise<{
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }>
} {

    let reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType = undefined;

    const promises: Array<Promise<unknown>> = [];

    {
        //  Use All reportedPeptideIds that meet cutoff unless proteinSequenceVersionId is passed in for Protein Page

        if (main_FunctionParams.proteinSequenceVersionId !== undefined && main_FunctionParams.proteinSequenceVersionId !== null) {

            //  For Single Protein Overlay

            //  reportedPeptideIds for this proteinSequenceVersionId

            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()
            if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data) {
                const reportedPeptideIds_For_ProteinSequenceVersionId =
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(main_FunctionParams.proteinSequenceVersionId)
                if (!reportedPeptideIds_For_ProteinSequenceVersionId) {
                    //  No reported Peptides for this proteinSequenceVersionId for this project search id
                    //  Return empty array
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId =[]
                } else {
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = Array.from(reportedPeptideIds_For_ProteinSequenceVersionId)
                }
            } else if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => { try {
                        reject(reason);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(result => { try {
                        const reportedPeptideIds_For_ProteinSequenceVersionId =
                            result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(main_FunctionParams.proteinSequenceVersionId)
                        if (!reportedPeptideIds_For_ProteinSequenceVersionId) {
                            //  No reported Peptides for this proteinSequenceVersionId for this project search id
                            //  Return empty array
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId =[]
                        } else {
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = Array.from(reportedPeptideIds_For_ProteinSequenceVersionId)
                        }
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                })
                promises.push(promise);
            } else {
                const msg = "get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result Not data or promise";
                console.warn(msg)
                throw Error(msg)
            }

        } else {

            //  NOT  Single Protein so get Reported Peptide Ids for all of this search

            {  //  Get  Reported Peptide Ids

                const get_reportedPeptideIds_Result =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();
                if (get_reportedPeptideIds_Result.data) {
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = get_reportedPeptideIds_Result.data.reportedPeptideIds;
                } else if (get_reportedPeptideIds_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_reportedPeptideIds_Result.promise.catch(reason => {
                            try {
                                reject(reason);
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                        get_reportedPeptideIds_Result.promise.then(result => {
                            try {
                                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = result.reportedPeptideIds

                                resolve();

                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds(); Not return data or promise";
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        if ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {
            const msg = "In (promises.length === 0), ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId )"
            console.warn(msg)
            throw Error(msg)
        }

        return {
            result: {
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    if ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {
                        const msg = "promisesAll.then, ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    resolve({
                        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
}

/**
 * get data for _convertToFinalResult_MainPart()
 */
const _convertToFinalResult_MainPart__GetData = function(
    {
        filtering_Params_Main, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }
    promise: Promise<{
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }>
} {

    let numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = undefined;

    const promises: Array<Promise<unknown>> = [];

    {  //  Get Num PSMs for Reported Peptide Ids

        const get_numPsmsForReportedPeptideIdMap_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap();
        if (get_numPsmsForReportedPeptideIdMap_Result.data) {
            numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap;
        } else if (get_numPsmsForReportedPeptideIdMap_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                    try {
                        reject(reason);
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
                get_numPsmsForReportedPeptideIdMap_Result.promise.then(result => {
                    try {
                        numPsmsForReportedPeptideIdMap = result.numPsmsForReportedPeptideIdMap

                        resolve();

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            promises.push(promise);
        } else {
            const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
            console.warn(msg)
            throw Error(msg)
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        return {
            result: {
                numPsmsForReportedPeptideIdMap
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    resolve({
                        numPsmsForReportedPeptideIdMap
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
}




/**
 * get data for _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data()
 */
const _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__GetData = function(
    {
        filtering_Params_Main, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        filtering_Params_Main: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
    }
    promise: Promise<{
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
    }>
} {

    let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
    let searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder = undefined

    const promises: Array<Promise<unknown>> = [];

    {  //  Get num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

        const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch()
        if (get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
        } else if (get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                    try {
                        reject(reason);
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(result => {
                    try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                        resolve(); //  resolve
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            promises.push(promise);
        } else {
            const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
            console.warn(msg)
            throw Error(msg)
        }
    }

    {  //  Get searchSubGroupId_ForPSM_ID_Holder

        const projectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ProjectSearchId()

        const commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId)
        if ( ! commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId ) {
            const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_ParentObject().get__commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        const get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch__NO_PSM_Peptide_Protein_Filtering_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered().
            get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch();
        if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data ) {
            searchSubGroupId_ForPSM_ID_Holder = get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID_Holder
        } else if ( get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise ) {
            const promise = new Promise<void>((resolve, reject) => { try {
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.catch(reason => reject(reason));
                get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result.promise.then(value => { try {
                    searchSubGroupId_ForPSM_ID_Holder = value.searchSubGroupId_ForPSM_ID_Holder;
                    resolve();
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            promises.push(promise);
        } else {
            throw Error("get_SearchSubGroupId_ForPSM_IDHolder_AllForSearch_Result no data or promise")
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        return {
            result: {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                searchSubGroupId_ForPSM_ID_Holder
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID_NOT_Filtered_Holder
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    resolve({
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                        searchSubGroupId_ForPSM_ID_Holder
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
}


////////////

///   INTERSECTION

//    Merge Rules for merging INTERSECTION/ALL:

/**
 * Merge As INTERSECTION.
 *
 * Merge the "ALL"/"AND" entries with the single "ANY"/"OR" entry and apply the "NOT"/"EXCLUDE" entry
 *
 */
const _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION = function(
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array,  //  To be combined using Intersection
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    const entries__Have_Result__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []
    const entries__Have_Promise__Array: Array<Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>> = []

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.result ) {

            entries__Have_Result__Array.push(entry.result)

        } else if ( entry.promise ) {

            entries__Have_Promise__Array.push(entry.promise)

        } else {
            const msg = "no 'result' or 'promise in entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array"
            console.warn(msg);
            throw Error(msg)
        }
    }

    if ( entries__Have_Promise__Array.length === 0 ) {

        const mergeResult =
            _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entries__Have_Result__Array
            });

        return {result: mergeResult, promise: undefined} //  EARLY RETURN
    }

    const promisesAll = Promise.all( entries__Have_Promise__Array );

    const promiseReturn = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {

        promisesAll.catch(reason => {
            reject(reason)
        })
        promisesAll.then(entries => {
            try {
                for ( const entry of entries ) {
                    entries__Have_Result__Array.push(entry);
                }

                const mergeResult =
                    _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve({
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entries__Have_Result__Array
                    });

                resolve(mergeResult);

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })

    return {promise: promiseReturn, result: undefined} //  EARLY RETURN
}

/**
 *
 * @param reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
 */
const _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
    } : {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
    }
) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    //  Check for any that are just undefined or null and throw Error

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry === undefined || entry === null ) {

            //  Found entry Not populated.  Problem with return statement that generated it.

            const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION";
            console.warn(msg);
            throw Error(msg);
        }
    }

    //  Some Optimization checks

    {  // Anything of the INTERSECTION is Empty, return Empty

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ( ! entry.is_noFilter_OR_FilterHasNoData() ) && ( ! entry.is_AnyEntries() ) ) {

                //  Found entry with filter data and no entries so return empty

                const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });

                return result; // EARLY RETURN
            }
        }
    }

    {  //  If ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

        let all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = false;
                break;
            }
        }

        if ( all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE ) {

            ///  ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });

            return result; // EARLY RETURN
        }
    }
    {
        //  Check if all have ALL Reported Peptide Ids

        let allHave_is_includeAll_ReportedPeptideIds_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_includeAll_ReportedPeptideIds() ) {
                allHave_is_includeAll_ReportedPeptideIds_TRUE = false;
                break;
            }
        }

        if ( allHave_is_includeAll_ReportedPeptideIds_TRUE ) {

            ///  ALL entries have is_includeAll_ReportedPeptideIds() true, then return new entry with is_includeAll_ReportedPeptideIds() true

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
            });

            return result; // EARLY RETURN
        }
    }

    //  Start Computing INTERSECTION of values

    //  Filter reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array to exclude entry.is_noFilter_OR_FilterHasNoData() and entry.is_includeAll_ReportedPeptideIds()

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.is_noFilter_OR_FilterHasNoData() ) {

            continue; // EARLY CONTINUE
        }

        if ( entry.is_includeAll_ReportedPeptideIds() ) {

            //  Skip Include ALL since also have other than Include All

            continue; // EARLY CONTINUE
        }

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.push( entry );
    }

    if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 ) {

        const msg = "( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 )";
        console.warn(msg);
        throw Error(msg);
    }

    //  Get Reported Peptide Ids

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered[0];

    let reportedPeptideIds_FromAny_ArrayEntry = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement.get_Entries_Keys_ReportedPeptideIds());

    //  Intersection by reported peptide id.  Intersection of PSM Ids

    const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const reportedPeptideId of reportedPeptideIds_FromAny_ArrayEntry ) {

        let reportedPeptideId_FoundInAll_Entries = true;

        const psmEntries_Include_Map_Key_PsmId_Array: Array<ReadonlyMap<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS>> = []  // Only for entries with PSM Entries


        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered ) {

            const entry_For_ReportedPeptideId = entry.get_Entry_For_ReportedPeptideId( reportedPeptideId );
            if ( ! entry_For_ReportedPeptideId ) {
                reportedPeptideId_FoundInAll_Entries = false;
                break;
            }

            if ( entry_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId ) {
                psmEntries_Include_Map_Key_PsmId_Array.push( entry_For_ReportedPeptideId.psmEntries_Include_Map_Key_PsmId );
            }
        }

        if ( ! reportedPeptideId_FoundInAll_Entries ) {
            //  Not found in all entries so skip

            continue; // EARLY CONTINUE
        }

        if ( psmEntries_Include_Map_Key_PsmId_Array.length === 0 ) {

            //  No entries have psmIds_Include so output not have it either.

            const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId : reportedPeptideId,
                psmEntries_Include_Map_Key_PsmId : undefined
            });

            result.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);

            continue; // EARLY CONTINUE
        }

        //  Intersection of PSM Ids

        //  Accumulate all entries for each PSM ID so they can be merged
        const psmEntries_Include_Map_Key_PsmId_Result: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

        const psmEntries_Include_Map_Key_PsmId_Array_FirstEntry = psmEntries_Include_Map_Key_PsmId_Array[0];

        for ( const psmEntries_Include_Map_Key_PsmId_Array_FirstEntry_Value of psmEntries_Include_Map_Key_PsmId_Array_FirstEntry.values() ) {

            let psmId_FoundInAll_Entries = true;

            const psmEntries_ForPsmId_From_AllEntriesIn_psmEntries_Include_Map_Key_PsmId_Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = []

            for ( const psmEntries_Include_Map_Key_PsmId_Array_Entry of psmEntries_Include_Map_Key_PsmId_Array ) {

                const psmEntries_Include_Map_Key_PsmId_Array_Entry_Entry_ForPsmId = psmEntries_Include_Map_Key_PsmId_Array_Entry.get( psmEntries_Include_Map_Key_PsmId_Array_FirstEntry_Value.psmId )

                if ( ! psmEntries_Include_Map_Key_PsmId_Array_Entry_Entry_ForPsmId ) {

                    psmId_FoundInAll_Entries = false;
                    break;
                }

                psmEntries_ForPsmId_From_AllEntriesIn_psmEntries_Include_Map_Key_PsmId_Array.push( psmEntries_Include_Map_Key_PsmId_Array_Entry_Entry_ForPsmId )
            }

            if ( psmId_FoundInAll_Entries ) {

                const mergedEntries_ForPsmId =
                    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS.merge_ExistingObjectsOfThisType( psmEntries_ForPsmId_From_AllEntriesIn_psmEntries_Include_Map_Key_PsmId_Array )
                psmEntries_Include_Map_Key_PsmId_Result.set( mergedEntries_ForPsmId.psmId, mergedEntries_ForPsmId );
            }
        }

        if ( psmEntries_Include_Map_Key_PsmId_Result.size === 0 ) {

            //   Filter Conditional

            //  None of the PSM Ids were found in all filters so skip entry

            continue; // EARLY CONTINUE
        }

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmEntries_Include_Map_Key_PsmId : psmEntries_Include_Map_Key_PsmId_Result
        });

        result.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    return result;
}
