/**
 * commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch.ts
 *
 * For Single Project Search
 *
 * Data loaded from server and code to load data from server
 *
 * Data loaded based on PSM/Reported Peptide/Protein(eventually) filters stored in this._searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
 *
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 */


import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch";
import {CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues";
import {CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {DataPage_common_Searches_Info_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";


/**
 * !!!!!  EXCLUDES  Mod Main Page (Other than Single Protein Overlay)
 *
 * For Single Project Search
 *
 * Data loaded from server and code to load data from server, For Single Project Search
 *
 */
export class CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId {

    //  !! If these values change, then create a new instance of this class

    private _projectSearchId: number
    private _searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
    private _common_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
    private _common_Searches_Info_SingleSearch_ForProjectSearchId: DataPage_common_Searches_Info_SingleSearch

    //  Parent object

    private _parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    //  Instantiated objects

    private _commonData_LoadedFromServer_SingleSearch__StaticModifications: CommonData_LoadedFromServer_SingleSearch__StaticModifications
    private _commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch
    private _commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data: CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data
    private _commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId
    private _commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters
    private _commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues
    private _commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues: CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues

    /**
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    private constructor(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, common_Flags_SingleSearch_ForProjectSearchId, common_Searches_Info_SingleSearch_ForProjectSearchId,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
            common_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
            common_Searches_Info_SingleSearch_ForProjectSearchId: DataPage_common_Searches_Info_SingleSearch
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._searchDataLookupParams_For_Single_ProjectSearchId = searchDataLookupParams_For_Single_ProjectSearchId;
        this._common_Flags_SingleSearch_ForProjectSearchId = common_Flags_SingleSearch_ForProjectSearchId;
        this._common_Searches_Info_SingleSearch_ForProjectSearchId = common_Searches_Info_SingleSearch_ForProjectSearchId;
        this._parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

        this._commonData_LoadedFromServer_SingleSearch__StaticModifications =
            CommonData_LoadedFromServer_SingleSearch__StaticModifications.getNewInstance({
                projectSearchId
            })

        this._commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch =
            CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch.getNewInstance({
                projectSearchId, parent_Object: this
            })

        this._commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId
            });

        this._commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            });

        this._commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            });

        this._commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            });

        this._commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            });

        this._commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            });

        this._commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters.getNewInstance({
                projectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters.getNewInstance({
                projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data =
            CommonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data.getNewInstance({ projectSearchId })

        this._commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId =
            CommonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters =
            CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this
            })

        this._commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues =
            CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues.getNewInstance({projectSearchId})

        this._commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues =
            CommonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues.getNewInstance({ projectSearchId })
    }

    /**
     * Create New Instance
     *
     * @param projectSearchIds
     * @param searchDataLookupParameters_Root
     */
    static getNewInstance(
        {
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, common_Flags_SingleSearch_ForProjectSearchId, common_Searches_Info_SingleSearch_ForProjectSearchId,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchId: number
            searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
            common_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
            common_Searches_Info_SingleSearch_ForProjectSearchId: DataPage_common_Searches_Info_SingleSearch
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        return new CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId({
            projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId, common_Flags_SingleSearch_ForProjectSearchId, common_Searches_Info_SingleSearch_ForProjectSearchId,
            parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });
    }

    get_common_Flags_SingleSearch_ForProjectSearchId() {
        return this._common_Flags_SingleSearch_ForProjectSearchId;
    }
    get_common_Searches_Info_SingleSearch_ForProjectSearchId() {
        return this._common_Searches_Info_SingleSearch_ForProjectSearchId;
    }


    get_ParentObject() {
        return this._parentObject_CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }

    get_commonData_LoadedFromServer_SingleSearch__StaticModifications() {
        return this._commonData_LoadedFromServer_SingleSearch__StaticModifications;
    }

    get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch() {
        return this._commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_Unique_In_All_OfSearch;
    }

    /**
     *
     */
    get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters;
    }

    /**
     *
     */
    get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__OpenModification_RollUp_On_ReportedPeptideLevel_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__ReporterIonMasses_On_PSM_For_MainFilters;
    }

    get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters
    }

    get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters
    }

    get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters
    }

    get_commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data() {
        return this._commonData_LoadedFromServer_SingleSearch__SpectralStorage_NO_Peaks_Data
    }

    get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters
    }

    get_commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId() {
        return this._commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId
    }

    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters() {
        return this._commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters
    }

    get_commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues() {
        return this._commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Filterable_AnnotationValues
    }

    get_commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues() {
        return this._commonData_LoadedFromServer_SingleSearch__ReportedPeptide_Descriptive_AnnotationValues
    }
}

