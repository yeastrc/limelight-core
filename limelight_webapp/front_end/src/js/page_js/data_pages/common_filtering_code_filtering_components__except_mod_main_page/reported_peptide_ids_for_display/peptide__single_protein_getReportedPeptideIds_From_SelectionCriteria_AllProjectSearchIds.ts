/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds.ts
 * 
 * Javascript for data pages - Get Reported Peptide Ids From Selection Criteria for All Project Search Ids
 * 
 * Selection Criteria:
 *  1) Variable and Static Modifications (and NO Variable Modifications as a part of this)
 *  2) Reporter Ions
 *  2) Search String(s) to search Peptide Sequences
 *  3) Protein Positions
 *
 * Peptide, Protein, QC and Single Protein
 *
 * !!!!   WARNING:  Other functions re-create this data structure based on additional filtering:
 *
 *                      create_GeneratedReportedPeptideListData__SingleProtein(...)
*/


import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';


import {
    GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class,
    GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {DataPage_common_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import {Peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";

/**
 * object of this class is returned from function 'getReportedPeptideIdsForDisplay_AllProjectSearchIds' which is in this file
 */
export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds {

    private _entriesMap_KeyProjectSearchId : Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId>

    constructor( entriesMap_KeyProjectSearchId : Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId> ) {
        if ( entriesMap_KeyProjectSearchId ) {
            this._entriesMap_KeyProjectSearchId = entriesMap_KeyProjectSearchId
        } else {
            this._entriesMap_KeyProjectSearchId = new Map()
        }
    }

    insert_Entry({ projectSearchId, entry } : { projectSearchId : number, entry : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId } ) {
        this._entriesMap_KeyProjectSearchId.set( projectSearchId, entry )
    }

    /**
     *
     */
    get_EntryFor_projectSearchId( projectSearchId : number ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {
        return this._entriesMap_KeyProjectSearchId.get( projectSearchId );
    }

    /**
     *
     */
    get_ProjectSearchIds() :  IterableIterator<number> {
        return this._entriesMap_KeyProjectSearchId.keys()
    }
}

///////////////////

class GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams {

    //  Update method 'cloneThisObject()' when add new properties

    not_filtered_position_modification_selections : boolean;
    proteinSequenceVersionId : number;  //  NOT populated for Peptide page
    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
    peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
}

//  Class for contents of returned from main method on main class

export class GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class {
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
}

//  Class for returned from main method on main class

class GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class {
    data: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
    promise: Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>
}

/////////  MAIN CLASS

/**
 * GetReportedPeptideIdsForDisplay_AllProjectSearchIds
 */
export class GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class {

    private _projectSearchIds : Array<number>;
    private _dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    private _getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class>
    private _peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter: Peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter

    private constructor(
        {
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>;
            dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        this._projectSearchIds = projectSearchIds;
        this._dataPage_common_Searches_Flags = dataPage_common_Searches_Flags;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;

        const create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result =
            this._create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId({
                projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })

        this._getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId =
            create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result.getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId;

        this._peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter =
            Peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter.getNewInstance({
                projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            })
    }

    /**
     * !!!  Used in constructor  !!!
     *
     * @param projectSearchIds
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     * @private
     */
    private _create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId(
        {
            projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) :
        {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class>
        } {

        const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class> = new Map();

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class.getNewInstance({
                    projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.set(projectSearchId, peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId )
        }

        return {
            getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId
        }
    }

    /**
     *
     * @param projectSearchIds
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     */
    static getNewInstance(
        {
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        } : {
            projectSearchIds : Array<number>;
            dataPage_common_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        }
    ) {
        return new GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class({
            projectSearchIds, dataPage_common_Searches_Flags, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });
    }

    /**
     * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
     *
     * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
     *
     */
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise(requestParams: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams )
        : Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class> {

        try {
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result = this.getReportedPeptideIdsForDisplay_AllProjectSearchIds(requestParams);

            if ( getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result.promise ) {

                return getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result.promise;
            }

            return Promise.resolve( getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result.data );

        } catch( e ) {
            console.warn("Exception caught in getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise: ", e);
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
     *
     * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
     *
     */
    getReportedPeptideIdsForDisplay_AllProjectSearchIds(requestParams: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams )
        : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class {

        if ( ( ! requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject )
            || requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.is_NoneSelection() ) {

            //  Do if no filter on Peptide Meets Digestion

            return this._get_All_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic( requestParams )

        }

        const all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic = this._get_All_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic( requestParams )

        if ( all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic.data ) {

            return this._peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter.
            peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter({
                proteinSequenceVersionId: requestParams.proteinSequenceVersionId,
                data_MainMethod_ReturnContents_FilteredToThisPoint: all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic.data,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject:  requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
            })

        } else if ( all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic.promise ) {

            return {
                data: undefined,
                promise: new Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                    try {
                        all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic.promise.catch(reason => reject(reason))
                        all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic.promise.then(value_mainSearchResultPromise => {
                            try {
                                const peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result =
                                    this._peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter.
                                    peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter({
                                        proteinSequenceVersionId: requestParams.proteinSequenceVersionId,
                                        data_MainMethod_ReturnContents_FilteredToThisPoint: value_mainSearchResultPromise,
                                        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject:  requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
                                    })

                                if ( peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result.data ) {

                                    resolve( peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result.data )

                                } else if ( peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result.promise ) {

                                    peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result.promise.catch( reason => { reject(reason)})
                                    peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result.promise.then(value_FilterOn_peptideMeetsDigestion_Result => {
                                        try {
                                            resolve(value_FilterOn_peptideMeetsDigestion_Result)
                                        } catch (e) {
                                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                            throw e
                                        }
                                    })
                                } else {
                                    throw Error("peptide__Single_Protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds_For_PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_Filter__Result  no data or promise")
                                }
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e
                            }
                        })
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e
                    }
                })
            }
        } else {
            throw Error("all_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic  data or promise NOT populated")
        }

    }

    /**
     *
     * @param requestParams
     * @private
     */
    private _get_All_Data_Before_Apply_DigestionFilter_Aka_PeptideTryptic(requestParams: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams )
        : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class {

        if ( ( ! requestParams.modificationMass_UserSelections_StateObject )
            || (
                (
                    ( ! requestParams.modificationMass_UserSelections_StateObject.get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection() )
                    || ( ! requestParams.modificationMass_UserSelections_StateObject.get_showOtherPeptidesWherePeptideSequenceMatchPeptidesMeetModFilters_UserSelection() )
                )
            ) || ( ! requestParams.modificationMass_UserSelections_StateObject.is_Any_Modification_Selected() )
        ) {
            //  Do if:
            //   1) NO modifications State object passed in
            //   2) User NOT selected "Show other peptides..."
            //   3) User NOT select any modifications (or Unmodified) for filtering (AND/OR/NOT)

            //   No additional processing required so just return this result

            return this._process_AllProjectSearchIds_ForPassedIn_Selection({ requestParams, reportedPeptideIds_Override_Map_Key_ProjectSearchId: undefined });  //  EARLY RETURN

        }

        /**
         * Create for Secondary Filtering
         *
         * Make a clone of this object to remove mod filters
         */
        const requestParams_Clone_RemoveModFilters: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams = {

            not_filtered_position_modification_selections: requestParams.not_filtered_position_modification_selections ,
            proteinSequenceVersionId: requestParams.proteinSequenceVersionId ,
            searchSubGroup_Ids_Selected: requestParams.searchSubGroup_Ids_Selected ,
            proteinSequenceWidget_StateObject: requestParams.proteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject: requestParams.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: requestParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject: requestParams.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject: requestParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: requestParams.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject: requestParams.scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject: requestParams.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject: requestParams.peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root: requestParams.userSearchString_LocationsOn_ProteinSequence_Root,
            proteinPositionFilter_UserSelections_StateObject: requestParams.proteinPositionFilter_UserSelections_StateObject,
            psm_Charge_Filter_UserSelection_StateObject: requestParams.psm_Charge_Filter_UserSelection_StateObject,
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: requestParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject: requestParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
        }

        requestParams_Clone_RemoveModFilters.modificationMass_UserSelections_StateObject = undefined; // Remove so not filter on

        ///////////////////////////////////////////
        ///////////////////////////////////////////

        //  First do main search using original requestParam

        const mainSearchResult = this._process_AllProjectSearchIds_ForPassedIn_Selection({ requestParams, reportedPeptideIds_Override_Map_Key_ProjectSearchId: undefined });

        if ( mainSearchResult.data ) {

            //  Do Secondary filtering and return result of Secondary Filtering

            return this._process_MainSearchData_RecomputeUsing_requestParams_Clone_RemoveModFilters__ReturnFinalResult({
                mainSearchData: mainSearchResult.data, proteinSequenceVersionId: requestParams.proteinSequenceVersionId, requestParams_Clone_RemoveModFilters
            })
        }

        return {
            data: undefined,
            promise: new Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                try {
                    mainSearchResult.promise.catch(reason => reject(reason))
                    mainSearchResult.promise.then(value_mainSearchResultPromise => { try {

                        //  Do Secondary filtering and return result of Secondary Filtering

                        const finalResult =
                            this._process_MainSearchData_RecomputeUsing_requestParams_Clone_RemoveModFilters__ReturnFinalResult({
                                mainSearchData: value_mainSearchResultPromise, proteinSequenceVersionId: requestParams.proteinSequenceVersionId, requestParams_Clone_RemoveModFilters
                            })

                        if ( finalResult.data ) {
                            resolve(finalResult.data)
                            return // EARLY RETURN
                        }

                        finalResult.promise.catch(reason => reject(reason))
                        finalResult.promise.then(value_finalResult_Promise => { try {

                            resolve(value_finalResult_Promise)

                        } catch (e) {
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e
                        }})

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e
                    }})
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e
                }
            })
        }
    }

    /**
     *
     * @param mainSearchData
     * @private
     */
    private _process_MainSearchData_RecomputeUsing_requestParams_Clone_RemoveModFilters__ReturnFinalResult(
        {
            mainSearchData, proteinSequenceVersionId, requestParams_Clone_RemoveModFilters
        } : {
            mainSearchData: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class

            proteinSequenceVersionId: number // Only populated when Single Protein
            requestParams_Clone_RemoveModFilters: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams
        }
    ) : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class {

        const reportedPeptideIds_SecondSearch_ReturnDataOrPromise =
            this._get_ReportedPeptideIds_From_PeptideIds_From_SearchResults_ReportedPeptideIds_ReturnDataOrPromise({ mainSearchData, proteinSequenceVersionId })

        if ( reportedPeptideIds_SecondSearch_ReturnDataOrPromise.data ) {

           return this._process_AllProjectSearchIds_ForPassedIn_Selection(
               {
                   requestParams: requestParams_Clone_RemoveModFilters,
                   reportedPeptideIds_Override_Map_Key_ProjectSearchId: reportedPeptideIds_SecondSearch_ReturnDataOrPromise.data.reportedPeptideIds_Override_Map_Key_ProjectSearchId
               })

        } else if ( reportedPeptideIds_SecondSearch_ReturnDataOrPromise.promise ) {

            return {
                data: undefined,
                promise: new Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>((resolve, reject) => { try {
                    reportedPeptideIds_SecondSearch_ReturnDataOrPromise.promise.catch(reason => { reject(reason)})
                    reportedPeptideIds_SecondSearch_ReturnDataOrPromise.promise.then(value_reportedPeptideIds_SecondSearch_ReturnDataOrPromise => { try {

                        const process_AllProjectSearchIds_ForPassedIn_Selection_Result = this._process_AllProjectSearchIds_ForPassedIn_Selection({
                            requestParams: requestParams_Clone_RemoveModFilters,
                            reportedPeptideIds_Override_Map_Key_ProjectSearchId: value_reportedPeptideIds_SecondSearch_ReturnDataOrPromise.data.reportedPeptideIds_Override_Map_Key_ProjectSearchId
                        })

                        if ( process_AllProjectSearchIds_ForPassedIn_Selection_Result.data ) {
                            resolve(process_AllProjectSearchIds_ForPassedIn_Selection_Result.data)

                        } else if ( process_AllProjectSearchIds_ForPassedIn_Selection_Result.promise ) {
                            process_AllProjectSearchIds_ForPassedIn_Selection_Result.promise.catch(reason => reject(reason))
                            process_AllProjectSearchIds_ForPassedIn_Selection_Result.promise.then(value_process_AllProjectSearchIds_ForPassedIn_Selection_Result => { try {

                                resolve(value_process_AllProjectSearchIds_ForPassedIn_Selection_Result)

                            } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })

                        } else {
                            throw Error("process_AllProjectSearchIds_ForPassedIn_Selection_Result no .data or .promise")
                        }
                    } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
                } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
            }
        } else {
            throw Error("reportedPeptideIds_SecondSearch_ReturnDataOrPromise: No .data or .promise")
        }
    }

    /**
     *
     * @param data
     * @private
     */
    private _get_ReportedPeptideIds_From_PeptideIds_From_SearchResults_ReportedPeptideIds_ReturnDataOrPromise(
        {
            mainSearchData, proteinSequenceVersionId
        } : {
            mainSearchData: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
            proteinSequenceVersionId: number // Only populated when Single Protein
        }
    ) : {
        data: {
            reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>>
        },
        promise: Promise<{
            data: {
                reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>>
            }
        }>
    } {

        const peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder> = new Map()

        //  ONLY populated if  proteinSequenceVersionId
        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder> = new Map()

        const promises: Array<Promise<void>> = []

        for ( const projectSearchId of this._projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            {
                const peptideIdsHolder_AllForSearch_Result =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch()

                if ( peptideIdsHolder_AllForSearch_Result.data ) {
                    peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, peptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder );

                } else if ( peptideIdsHolder_AllForSearch_Result.promise ) {

                    const promise = new Promise<void>((resolve, reject) => { try {
                        peptideIdsHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                        peptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                            peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.set( projectSearchId, value.peptideIds_For_MainFilters_Holder );
                            resolve()
                        } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
                    } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
                    promises.push(promise)

                } else {
                    const msg = "peptideIdsHolder_AllForSearch_Result NOT .data or .promise populated";
                    console.warn(msg)
                    throw Error(msg)
                }
            }

            if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {
                const proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

                if ( proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch.data ) {
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId.set(projectSearchId, proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder)
                } else if ( proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch.promise ) {

                    const promise = new Promise<void>((resolve, reject) => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch.promise.catch(reason => { reject(reason)})
                        proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch.promise.then(value => { try {
                            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId.set( projectSearchId, value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder );
                            resolve()
                        } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
                    } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
                    promises.push(promise)

                } else {
                    throw Error("proteinSequenceVersionIds_And_ProteinCoverage_AllForSearch NO .data or .promise")
                }
            }

        }

        if ( promises.length === 0 ) {
            const result = this._get_ReportedPeptideIds_From_PeptideIds_From_SearchResults_ReportedPeptideIds_ReturnData({
                data: mainSearchData, peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                proteinSequenceVersionId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId
            })
            return {
                promise: undefined, data: result
            }
        }

        const promiseAll = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                data: {
                    reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>>
                }
            }>((resolve, reject) => { try {

                promiseAll.catch(reason => reject(reason) )
                promiseAll.then(value => { try {
                    const result = this._get_ReportedPeptideIds_From_PeptideIds_From_SearchResults_ReportedPeptideIds_ReturnData({
                        data: mainSearchData, peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId,
                        proteinSequenceVersionId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId
                    })
                    resolve({ data: result })
                } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })

            } catch( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } ); throw e;} })
        }
    }

    /**
     *
     * @param data
     * @private
     */
    private _get_ReportedPeptideIds_From_PeptideIds_From_SearchResults_ReportedPeptideIds_ReturnData(
        {
            data, peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId, proteinSequenceVersionId, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId
        } : {
            data: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class
            peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder>

            //  ONLY populated if  proteinSequenceVersionId
            proteinSequenceVersionId: number // Only populated when Single Protein
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder>
        }
    ) : {
        reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>>
    } {

        const reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>> = new Map()

        for ( const projectSearchId of this._projectSearchIds ) {
            const reportedPeptideIds_AndTheir_PSM_IDs = data.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId(projectSearchId)
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs ) {
                continue;
            }

            const peptideIds_For_MainFilters_Holder = peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId)

            if ( ! peptideIds_For_MainFilters_Holder ) {
                const msg = "peptideIds_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            let reportedPeptideIds_For_ProteinSequenceVersionId: Set<number>

            if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

                // Single Protein

                const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId.get(projectSearchId)
                if ( ! proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder ) {
                    const msg = "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder_Key_ProjectSearchId.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                reportedPeptideIds_For_ProteinSequenceVersionId =
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId)
                if ( ! reportedPeptideIds_For_ProteinSequenceVersionId ) {
                    const msg = "proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(proteinSequenceVersionId) returned nothing for proteinSequenceVersionId: " + proteinSequenceVersionId;
                    console.warn(msg)
                    throw Error(msg)
                }
            }

            const reportedPeptideIds_Result: Set<number> = new Set()

            for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs.get_reportedPeptideIds() ) {

                //  Get peptide id and then all reported peptide ids for that peptide id

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId)
                if ( peptideId === undefined || peptideId === null ) {
                    const msg = "peptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId); returned nothing for reportedPeptideId: " + reportedPeptideId;
                    console.warn(msg)
                    throw Error(msg)
                }

                const reportedPeptideIdEntries_For_PeptideId = peptideIds_For_MainFilters_Holder.get_ReportedPeptideIdEntries_For_PeptideId(peptideId)
                if ( reportedPeptideIdEntries_For_PeptideId === undefined || reportedPeptideIdEntries_For_PeptideId === null ) {
                    const msg = "peptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder.get_ReportedPeptideIdEntries_For_PeptideId(peptideId); returned nothing for peptideId: " + peptideId;
                    console.warn(msg)
                    throw Error(msg)
                }

                for ( const reportedPeptideId of reportedPeptideIdEntries_For_PeptideId ) {

                    if ( reportedPeptideIds_For_ProteinSequenceVersionId && ( ! reportedPeptideIds_For_ProteinSequenceVersionId.has(reportedPeptideId) ) ) {
                        //  SKIP NOT a reportedPeptideId for the Protein Sequence Version Id if Protein Sequence Version Id was passed in
                        continue
                    }
                    reportedPeptideIds_Result.add( reportedPeptideId )
                }
            }

            reportedPeptideIds_Override_Map_Key_ProjectSearchId.set(projectSearchId, Array.from( reportedPeptideIds_Result ) )
        }

        return { reportedPeptideIds_Override_Map_Key_ProjectSearchId };
    }

    /**
     *
     * @param requestParams
     * @private
     */
    private _process_AllProjectSearchIds_ForPassedIn_Selection(
        {
            requestParams, reportedPeptideIds_Override_Map_Key_ProjectSearchId
        } : {
            requestParams: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_RequestParams
            reportedPeptideIds_Override_Map_Key_ProjectSearchId: Map<number, Array<number>>
        })
        : GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class {

        //  return item:
        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds( undefined );

        const promises: Array<Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>> = []

        for ( const projectSearchId of this._projectSearchIds ) {

            let reportedPeptideIds_Override: Array<number>  //  Override reported peptide ids used as starting point for filtering

            if ( reportedPeptideIds_Override_Map_Key_ProjectSearchId ) {
                reportedPeptideIds_Override = reportedPeptideIds_Override_Map_Key_ProjectSearchId.get(projectSearchId)
                if ( ! reportedPeptideIds_Override ) {
                    throw Error( "reportedPeptideIds_Override_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId );
                }
            }

            //  In Second Processing, instantiate new per search FILTER object
            //     (commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId)
            //  since do NOT want to have any Caching from main processing

            const create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result =
                this._create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId({
                    projectSearchIds: this._projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                })

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId =
                create_getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId_Result.
                    getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.get(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                throw Error( "getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId );
            }

            const dataPage_common_Flags_SingleSearch = this._dataPage_common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! dataPage_common_Flags_SingleSearch ) {
                throw Error( "this._dataPage_common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId )
            }

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId({

                    main_FunctionParams: {

                        not_filtered_position_modification_selections: requestParams.not_filtered_position_modification_selections,
                        dataPage_common_Flags_SingleSearch,
                        proteinSequenceVersionId: requestParams.proteinSequenceVersionId,

                        //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                        searchSubGroup_Ids_Selected: requestParams.searchSubGroup_Ids_Selected,

                        modificationMass_UserSelections_StateObject: requestParams.modificationMass_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: requestParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                        reporterIonMass_UserSelections_StateObject: requestParams.reporterIonMass_UserSelections_StateObject,
                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject: requestParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                        scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject: requestParams.scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                        scan_RetentionTime_MZ_UserSelection_StateObject: requestParams.scan_RetentionTime_MZ_UserSelection_StateObject,
                        peptideUnique_UserSelection_StateObject: requestParams.peptideUnique_UserSelection_StateObject,
                        psm_Charge_Filter_UserSelection_StateObject: requestParams.psm_Charge_Filter_UserSelection_StateObject,
                        psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: requestParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                        peptideSequence_UserSelections_StateObject: requestParams.peptideSequence_UserSelections_StateObject,
                        peptideSequence_MissedCleavageCount_UserSelections_StateObject: requestParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : requestParams.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                        proteinSequenceWidget_StateObject: requestParams.proteinSequenceWidget_StateObject,
                        proteinPositionFilter_UserSelections_StateObject: requestParams.proteinPositionFilter_UserSelections_StateObject,
                        userSearchString_LocationsOn_ProteinSequence_Root: requestParams.userSearchString_LocationsOn_ProteinSequence_Root
                    },
                    reportedPeptideIds_Override__FromFirstFilteringRun: reportedPeptideIds_Override
                });


            if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.data ) {

                //  Have data so insert it

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.insert_Entry({
                    projectSearchId: getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.data.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_projectSearchId(),
                    entry : getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.data.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                });

            } else if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.promise ) {

                //  Have promise so add to promises

                promises.push( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.promise );

            } else {
                const msg = "On getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result, neither of 'data' or 'promise' set ";
                console.warn(msg);
                throw Error(msg);
            }
        }

        if ( promises.length === 0 ) {

            //  NO promises so just return

            const immediateResult: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class = {
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
            };

            return {                     // EARLY RETURN
                data: immediateResult,
                promise: undefined
            };
        }

        const promisesAll = Promise.all( promises );

        const promiseToReturn = new Promise<GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class>( (resolve, reject) => {

            promisesAll.catch( reason => {
                reject(reason);
            });
            promisesAll.then( resultArray => {
                try {
                    for ( const resultItem of resultArray ) {

                        if ( ! resultItem ) {
                            const msg = "resultItem is undefined or null: from promisesAll.then from commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId"
                            console.warn(msg);
                            throw Error(msg)
                        }

                        if ( ! resultItem.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
                            const msg = "resultItem.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId is undefined or null: from promisesAll.then from commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId"
                            console.warn(msg);
                            throw Error(msg)
                        }

                        //  'reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds'
                        //     - populated above for results returned immediately
                        //     - only populated here where the functions called returned a promise.

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.insert_Entry({
                            projectSearchId: resultItem.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_projectSearchId(),
                            entry : resultItem.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                        });
                    }

                    const finalResult: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnContents_Class = {
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
                    };

                    resolve( finalResult );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        });

        const result: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class__MainMethod_ReturnObject_Class = {
            data: undefined,
            promise: promiseToReturn
        }

        return result;
    }
}