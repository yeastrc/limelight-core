/**
 * peptidePage_Display_MainContent_Component_nonClass_Functions.ts
 *
 * peptidePage_Display_MainContent_Component.tsx
 *
 */


// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import {reporterIonMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {PeptideSequence_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import {peptideSequence_UserSelections_BuildData_ForReactComponent} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';

import {modificationMass_UserSelections_BuildData_ForReactComponent} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ModificationMass_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import {
    reporterIonMass_UserSelections_BuildData_ForReactComponent,
    ReporterIonMass_UserSelections_ComponentData
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Are_All_SearchSubGroupIds_Selected";
import {PeptidePage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import {SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {
    ProteinPositionFilter_UserSelections_StateObject,
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";

//////////////
//////////////

/**
 * 'async' function
 */
const compute_FullPage_Except_SearchDetails = async function(
    {
        propsValue,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        psm_Charge_Filter_UserSelection_StateObject
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    }  ) :

    Promise<{
        searchSubGroup_Ids_Selected : Set<number>
        searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
        searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
        modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
        reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
        peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
        peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    }>
{
    try {
        const searchSubGroup_Ids_Selected : Set<number> = compute_searchSubGroup_Ids_Selected({ propsValue });

        const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue });

        const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = compute_searchSubGroup_PropValue({ propsValue });

        const modificationMass_UserSelections_ComponentData = await create_ModificationMass_UserSelections_ComponentData({
            modificationMass_UserSelections_StateObject,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = await create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        const reporterIons_UserSelections_ComponentData = await create_ReporterIons_UserSelections_ComponentData({

            reporterIonMass_UserSelections_StateObject,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject
        });

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({

            peptideSequence_UserSelections_StateObject
        });

        //  Create initial instance.  Updated instance will be created in peptideSequence_UserSelections.tsx when user changes the input field value

        //  await

        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = await getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({

            not_filtered_position_modification_selections : false,
            proteinSequenceVersionId : undefined,
            searchSubGroup_Ids_Selected,
            proteinSequenceWidget_StateObject : undefined,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root : null,
            proteinPositionFilter_UserSelections_StateObject,
            psm_Charge_Filter_UserSelection_StateObject
        });

        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

        return {
            searchSubGroup_Ids_Selected,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue,
            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        }

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

///////////////////////////

/**
 * Create searchSubGroup_Ids_Selected
 */
const compute_searchSubGroup_Ids_Selected = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    }) :  Set<number>
{
    let searchSubGroup_Ids_Selected : Set<number> = undefined;

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
            searchSubGroup_CentralStateManagerObjectClass : propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    return searchSubGroup_Ids_Selected;
}

/**
 * Create searchSubGroup_Are_All_SearchSubGroupIds_Selected
 */
const compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    }) :  boolean
{
    let searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = true; // Default to true for when Merged Search or No Search SUb Groups

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_Are_All_SearchSubGroupIds_Selected = searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn({
            searchSubGroup_CentralStateManagerObjectClass : propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
        })
    }

    return searchSubGroup_Are_All_SearchSubGroupIds_Selected;
}

/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchSubGroup_PropValue = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop

    }) : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    let searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = null;

    if ( propsValue.projectSearchIds.length === 1 && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

        //  Only display for 1 search

        const projectSearchId = propsValue.projectSearchIds[ 0 ];

        const searchSubGroups_ForProjectSearchId = propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "returned nothing: propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }

        searchSubGroup_PropValue = searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData({
            searchSubGroups_EntryFor_ProjectSearchId__DataPageStateManagerEntry : searchSubGroups_ForProjectSearchId,
            searchSubGroup_CentralStateManagerObjectClass: propsValue.searchSubGroup_CentralStateManagerObjectClass
        });
    }

    return searchSubGroup_PropValue;
}


/**
 * Create searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
 */
const compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = function (
    {
        propsValue
    } : {
        propsValue : PeptidePage_Display_MainContent_Component_Props_Prop

    }) : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
{

    let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

    const filterValuesChanged_Callback = (params: SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param) : void => {

        console.warn("filterValuesChanged_Callback called: params: ", params )

        // throw Error("filterValuesChanged_Callback callback not handled")

        window.location.reload( true );  // TODO
    }

    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
        displayOnly : false,
        dataPages_LoggedInUser_CommonObjectsFactory : propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
        dataPageStateManager_DataFrom_Server : propsValue.dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : propsValue.searchDetailsBlockDataMgmtProcessing,
        filterValuesChanged_Callback,
        searchSubGroup_PropValue,
        limelight_Colors_For_MultipleSearches: undefined
    }

    return searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}

///////////////////////////

/**
 *
 */
const create_ModificationMass_UserSelections_ComponentData = async function({

                                                                                modificationMass_UserSelections_StateObject,
                                                                                projectSearchIds,
                                                                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                                                                            } : {
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    projectSearchIds : Array<number>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}) : Promise<ModificationMass_UserSelections_ComponentData> {
    try {
        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({
            modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject,
            proteinSequenceVersionId : undefined,
            projectSearchIds : projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Param
        });

        return modificationMass_UserSelections_ComponentData;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *
 */
const create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData> {

    const result = modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    });

    if ( result.data ) {
        Promise.resolve(result.data)
        return
    }

    return result.promise
}

/**
 *
 */
const create_ReporterIons_UserSelections_ComponentData = async function( {

                                                                             reporterIonMass_UserSelections_StateObject,
                                                                             projectSearchIds,
                                                                             commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                                                                         } : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    projectSearchIds : Array<number>,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}) : Promise<ReporterIonMass_UserSelections_ComponentData> {
    try {
        let reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

        const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({

            reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject,
            projectSearchIds : projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Param // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
        });

        return reporterIons_UserSelections_ComponentData;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *
 */
const create_PeptideSequence_UserSelections_ComponentData = function( {

                                                                          peptideSequence_UserSelections_StateObject
                                                                      } : {
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
}) : PeptideSequence_UserSelections_ComponentData {

    const peptideSequence_UserSelections_ComponentData = peptideSequence_UserSelections_BuildData_ForReactComponent({

        peptideSequence_UserSelections_StateObject : peptideSequence_UserSelections_StateObject
    });

    return peptideSequence_UserSelections_ComponentData;
}

////////////////////////////////////////////////////////



/////////

//  Modification Mass Info for display


//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

// /**
//  * All Variable modification masses by protein position
//  *
//  * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
//  */
// const _get_variableModificationMasses_All_OnProteinByPosition = function({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }) {
//
// 	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
// 	const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
//
// 	{
// 		//  Start with Map of Sets to remove duplicates
// 		const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.
//
// 		for ( const projectSearchId of projectSearchIds ) {
//
// 			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
//
// 			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
// 			if ( ! dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
// 				//  No data for projectSearchId so skip to next
// 				continue; // EARLY CONTINUE
// 			}
//
// 			const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
// 			if ( ! dynamicModificationsOnProtein ) {
// 				// No Data for _proteinSequenceVersionId so skip to next
// 				continue; // EARLY CONTINUE
// 			}
//
// 			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
// 				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
//
// 				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }
//
// 				const position = modificationOnProtein.position;
// 				const mass = modificationOnProtein.mass;
// 				let massesAtPosition = modsOnProteinByPosition_Sets.get( position );
// 				if ( ! massesAtPosition ) {
// 					massesAtPosition = new Set();
// 					modsOnProteinByPosition_Sets.set( position, massesAtPosition );
// 				}
// 				//  Round mass since Multiple Search
// 				const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
// 				massesAtPosition.add( roundedMass );
// 			}
// 		}
//
// 		//  Sort masses at each position
// 		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
// 			const position = modsOnProteinByPositionEntry[ 0 ];
// 			const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
// 			const massesAtPositionArray = Array.from( massesAtPositionSet );
// 			massesAtPositionArray.sort( function(a, b) {
// 				if ( a < b ) {
// 					return -1;
// 				}
// 				if ( a > b ) {
// 					return 1;
// 				}
// 				return 0;
// 			});
// 			//  Place the sorted Array in the final output Map
// 			modsOnProteinByPosition.set( position, massesAtPositionArray );
// 		}
// 	}
//
// 	return modsOnProteinByPosition;
// }



///////////////////////////////////////////////


class PeptidePage_Display_MainContent_Component_nonClass_Functions {
    static compute_FullPage_Except_SearchDetails = compute_FullPage_Except_SearchDetails
    static compute_searchSubGroup_Ids_Selected = compute_searchSubGroup_Ids_Selected
    static compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected
    static compute_searchSubGroup_PropValue = compute_searchSubGroup_PropValue
    static compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    static create_ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData
    static create_ReporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData
    static create_PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData
}

export { PeptidePage_Display_MainContent_Component_nonClass_Functions }
