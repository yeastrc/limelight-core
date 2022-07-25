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
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {DataPage_common_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";

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

    not_filtered_position_modification_selections : boolean;
    proteinSequenceVersionId : number;  //  NOT populated for Peptide page
    searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
    peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
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

    private _getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId: Map<number, GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class> = new Map();

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

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                const msg = "this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            const peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class.getNewInstance({
                    projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            this._getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.set(projectSearchId, peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId )
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

        //  return item:
        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = new Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds( undefined );

        const promises: Array<Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>> = []

        for ( const projectSearchId of this._projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId =
                this._getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId ) {
                throw Error( "this._getReportedPeptideIdsForDisplay_SingleProjectSearchId_Class_Map_Key_ProjectSearchId.get(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId );
            }

            const dataPage_common_Flags_SingleSearch = this._dataPage_common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! dataPage_common_Flags_SingleSearch ) {
                throw Error( "this._dataPage_common_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned nothing for projectSearchId: " + projectSearchId )
            }

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId({

                    not_filtered_position_modification_selections: requestParams.not_filtered_position_modification_selections,
                    dataPage_common_Flags_SingleSearch,
                    proteinSequenceVersionId: requestParams.proteinSequenceVersionId,

                    //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    searchSubGroup_Ids_Selected: requestParams.searchSubGroup_Ids_Selected,

                    modificationMass_UserSelections_StateObject: requestParams.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: requestParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject: requestParams.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: requestParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: requestParams.scan_RetentionTime_MZ_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject: requestParams.peptideUnique_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: requestParams.psm_Charge_Filter_UserSelection_StateObject,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: requestParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject: requestParams.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject: requestParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    proteinSequenceWidget_StateObject: requestParams.proteinSequenceWidget_StateObject,
                    proteinPositionFilter_UserSelections_StateObject: requestParams.proteinPositionFilter_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root: requestParams.userSearchString_LocationsOn_ProteinSequence_Root
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