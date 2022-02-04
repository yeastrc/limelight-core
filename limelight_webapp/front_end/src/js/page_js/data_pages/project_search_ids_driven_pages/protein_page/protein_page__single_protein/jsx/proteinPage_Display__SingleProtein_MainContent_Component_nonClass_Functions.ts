/**
 * proteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.ts
 * 
 * Functions for proteinPage_Display__SingleProtein_MainContent_Component.tsx
 * 
 */


// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber,
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber,
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


import {
    proteinSequenceWidgetDisplay_Component_Data__Build,
    ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM,
    ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry,
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data__Build';
import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import { peptideSequence_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';
import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import { userSearchString_LocationsOn_ProteinSequence_Compute } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

import { modificationMass_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import { getSequenceCoverageBooleanArray_ForReportedPeptideIds } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds';
import { getSequenceCoverageBooleanArray_NotFiltered } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered';
import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_Create__SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData";
import {SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {searchSubGroup_Are_All_SearchSubGroupIds_Selected__Fcn} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Are_All_SearchSubGroupIds_Selected";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {SearchSubGroups_Root__DataPageStateManagerEntry} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_MainContent_Component";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";


/**
 * return type of linksToExternalResources
 */  
class ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class {
    NCBI_Blast_URL : string
    PDR_Blast_URL : string
    UniProtKB_Search_URL : string
    NCBI_Search_URL : string
}

/**
 * 
 */  
const initialPopulate = function(
    {
    propsValue,
    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    modificationMass_UserSelections_StateObject,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
    reporterIonMass_UserSelections_StateObject,
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
    scan_RetentionTime_MZ_UserSelection_StateObject,
    peptideUnique_UserSelection_StateObject,
    peptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject
} : {
    propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
    proteinSequenceVersionId : number,
    proteinSequenceString : string,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
}  ) :

{
    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    searchSubGroup_Ids_Selected : Set<number>
    searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
    searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
    linksToExternalResources : ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class,
    protein_fractionCovered_Unfiltered : number,
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
}
{
    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({ propsValue });

    const searchSubGroup_Ids_Selected : Set<number> = compute_searchSubGroup_Ids_Selected({ propsValue });

    const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue });

    const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = compute_searchSubGroup_PropValue({ propsValue });

    const modificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData({
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    })

    const reporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({

        reporterIonMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
        peptideUnique_UserSelection_StateObject
    })

    const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({

        peptideSequence_UserSelections_StateObject
    });

    //  Create initial instance.  Updated instance will be created in peptideSequence_UserSelections.tsx when user changes the input field value
    const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Compute({
        proteinSequenceString,
        searchStrings : peptideSequence_UserSelections_StateObject.getPeptideSearchStrings()
    });

    const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({
        not_filtered_position_modification_selections : false,
        proteinSequenceVersionId,
        projectSearchIds,
        searchSubGroup_Ids_Selected,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root,
        proteinPositionFilter_UserSelections_StateObject : undefined
    });

    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
    

    const sequenceCoverageBooleanArray_Unfiltered = getSequenceCoverageBooleanArray_NotFiltered({
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        projectSearchIds
    });

    let proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data = undefined;

    {
        let proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings;
        if ( proteinPositions_CoveredBy_SearchStrings.length < 1 ) {
            proteinPositions_CoveredBy_SearchStrings = undefined;
        }

        proteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data({

            proteinSequenceWidget_StateObject,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

            proteinSequenceVersionId,
            proteinSequenceString,
            projectSearchIds,
            proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
            proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected
        });
    }

    const linksToExternalResources = _createProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class({ proteinSequenceVersionId, proteinSequenceString, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    const protein_fractionCovered_Unfiltered = _computeSequenceCoverageFractionForUnfiltered({ proteinSequenceString, sequenceCoverageBooleanArray_Unfiltered });
    
    const psmCountForUnfiltered = _computePsmCountForUnfiltered({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    return {
        searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
        searchSubGroup_Ids_Selected,
        searchSubGroup_Are_All_SearchSubGroupIds_Selected,
        searchSubGroup_PropValue,
        linksToExternalResources,
        protein_fractionCovered_Unfiltered,
        psmCountForUnfiltered,
        modificationMass_UserSelections_ComponentData,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
        reporterIons_UserSelections_ComponentData,
        peptideUnique_UserSelection_ComponentData,
        peptideSequence_UserSelections_ComponentData,
        userSearchString_LocationsOn_ProteinSequence_Root,
        proteinSequenceWidgetDisplay_Component_Data,
        sequenceCoverageBooleanArray_Unfiltered,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    }
}        

///////////////////////////

/**
 * Create searchSubGroup_Ids_Selected
 */
const compute_searchSubGroup_Ids_Selected = function (
    {
        propsValue
    } : {
        propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
    }) :  Set<number>
{
    if ( ! propsValue.searchSubGroup_CentralStateManagerObjectClass ) {
        // If NO Page State Object, nothing can be selected
        return undefined;
    }

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
        propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop
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
        propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop

    }) : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    let searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = null;

    if (
        propsValue.searchSubGroup_CentralStateManagerObjectClass
        && propsValue.projectSearchIds.length === 1
        && propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

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
        propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop

    }) : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
{

    let searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData = undefined;

    const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =  {
        displayOnly : true,
        dataPages_LoggedInUser_CommonObjectsFactory : propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
        dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
        dataPageStateManager_DataFrom_Server : propsValue.dataPageStateManager,
        searchDetailsBlockDataMgmtProcessing : propsValue.searchDetailsBlockDataMgmtProcessing,
        filterValuesChanged_Callback : undefined,
        searchSubGroup_PropValue,
        limelight_Colors_For_MultipleSearches: undefined
    }

    return searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue;
}


/**
 * Create links to external resources
 */
const _createProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class = function({ 
    
    proteinSequenceVersionId, 
    proteinSequenceString, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    proteinSequenceVersionId : number, 
    proteinSequenceString : string, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class {

    const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
    const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
    
    const proteinNames_URI_Encoded_Set = new Set();

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "_createProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class(): No value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
        if ( ! proteinInfoMapKeyProteinSequenceVersionId ) {
            const msg = "_createProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class(): No value in loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId() for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( proteinInfo ) {
            const annotations = proteinInfo.annotations;
            if ( annotations ) {
                for ( const annotation of annotations ) {
                    const name = annotation.name;
    //				const description = annotation.description;
    //				const taxonomy = annotation.taxonomy;
                    const proteinName_URI_Encoded = window.encodeURIComponent( name );
                    proteinNames_URI_Encoded_Set.add( proteinName_URI_Encoded );
                }
            }
        }
    }

    if ( proteinNames_URI_Encoded_Set.size === 0 ) {
        throw Error("No Protein names found for any searches.");
    }

    const proteinNames_URI_Encoded_Array = Array.from( proteinNames_URI_Encoded_Set );

    const proteinNamesForQueries = proteinNames_URI_Encoded_Array.join("+or+");

    // (if more than one name for this sequence, separate they by "+or+")
    const UniProtKB_Search_URL ="https://www.uniprot.org/uniprot/?query=" + proteinNamesForQueries + "&sort=score";

    const NCBI_Search_URL ="https://www.ncbi.nlm.nih.gov/protein/?term=" + proteinNamesForQueries;

        
    const linksToExternalResources = {
            NCBI_Blast_URL,
            PDR_Blast_URL,
            UniProtKB_Search_URL,
            NCBI_Search_URL
    }
    
    return linksToExternalResources;
}


/**
 * Create links to external resources
 */
const _computeSequenceCoverageFractionForUnfiltered = function({ 
    
    proteinSequenceString, 
    sequenceCoverageBooleanArray_Unfiltered 
} : { 
    proteinSequenceString : string, 
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>
}) : number {

    //  Array of data is 1 based for protein position that starts at 1

    const proteinSequenceString_length = proteinSequenceString.length;

    let positionsCoveredCount = 0;

    for ( let position = 1; position <= proteinSequenceString_length; position++ ) {
        if ( sequenceCoverageBooleanArray_Unfiltered[ position ] ) {
            positionsCoveredCount++;
        }
    }

    const fractionCovered = ( positionsCoveredCount / proteinSequenceString_length )

    return fractionCovered;
}


/**
 * Compute PSM Count for Protein for All Project Search Ids - No Filtering for any user choices on this single protein or in protein list
 */
const _computePsmCountForUnfiltered = function({ 
    
    proteinSequenceVersionId, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : number {

    let psmCount = 0;

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            //  No entry for this projectSearchId
            continue; // EARLY CONTINUE
        }

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
        if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
            //  No entry 
            continue; // EARLY CONTINUE
        }

        const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( ! reportedPeptideIds ) {
            //  No entry 
            continue; // EARLY CONTINUE
        }

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
        if ( ! numPsmsForReportedPeptideIdMap ) {
            //  No entry 
            continue; // EARLY CONTINUE
        }

        for ( const reportedPeptideId of reportedPeptideIds ) {
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
            if ( numPsmsForReportedPeptideId ) {
                psmCount += numPsmsForReportedPeptideId;
            }
        }
    }

    return psmCount;
}





///////////////////////////

/**
 * 
 */
const create_ModificationMass_UserSelections_ComponentData = function({

    modificationMass_UserSelections_StateObject,
    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ModificationMass_UserSelections_ComponentData {

    let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

    const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({ 
        modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Param
    });
    
    return modificationMass_UserSelections_ComponentData;
}

/**
 *
 */
const create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData {

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    });

    return modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData;
}

/**
 * 
 */
const create_ReporterIons_UserSelections_ComponentData = function( {

    reporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ReporterIonMass_UserSelections_ComponentData {

    let reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

    const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({ 

        reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject, 
        projectSearchIds : projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Param // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
    });

    return reporterIons_UserSelections_ComponentData;
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

/**
 * 
 */
const create_ProteinSequenceWidgetDisplay_Component_Data = function({

    proteinSequenceWidget_StateObject,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchIds,
    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    peptideUnique_UserSelection_StateObject,
    searchSubGroup_Are_All_SearchSubGroupIds_Selected
} : {
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    proteinSequenceVersionId : number
    proteinSequenceString : string
    projectSearchIds : Array<number>
    proteinCoverageArrayOfBoolean : Array<boolean> //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings : Array<boolean>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean

}) : ProteinSequenceWidgetDisplay_Component_Data {



    let sequenceCoverageBooleanArray_ForReportedPeptideIds : Array<boolean> = null;
    
    if ( 
        modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected()
        || modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
        || modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected()
        || reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected()
        || peptideUnique_UserSelection_StateObject.getPeptideUnique()
        || proteinPositions_CoveredBy_PeptideSearchStrings
        || proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
        || ( ! searchSubGroup_Are_All_SearchSubGroupIds_Selected )
    ) { 
        //  Populate since have user selection
        sequenceCoverageBooleanArray_ForReportedPeptideIds = getSequenceCoverageBooleanArray_ForReportedPeptideIds({ 
        
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            projectSearchIds
        });
    }

    //    Modification Mass Info for display

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
    const variableModificationMassesForProteinPositions = _get_variableModificationMasses_All_OnProteinByPosition({ 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
    const staticModificationMassesForProteinPositions : ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM =
        _get_staticModificationMasses_All_OnProteinByPosition({
            proteinSequenceVersionId : proteinSequenceVersionId,
            projectSearchIds : projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

    const staticModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set();
        
    const variableModificationSelectionUnmodifiedSelected = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_NO_Modification_AKA_Unmodified_Selected();
    const variableModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_ModificationsSelected__OnlyModMasses_AsSet();

    
    const proteinSequenceWidgetDisplay_Component_Data = proteinSequenceWidgetDisplay_Component_Data__Build({  //  External Function Call
        proteinSequenceString, 
        proteinSequenceWidget_StateObject : proteinSequenceWidget_StateObject, 
        proteinCoverageArrayOfBoolean,
        proteinCoverageArrayOfBoolean_UserSelectedPeptides : sequenceCoverageBooleanArray_ForReportedPeptideIds,  // - null or undefined if not set - Only User Selected Peptides 
        variableModificationSelectionUnmodifiedSelected,
        variableModificationMassesToFilterOn,
        staticModificationMassesToFilterOn : staticModificationMassesToFilterOn,
        variableModificationMassesForProteinPositions,
        staticModificationMassesForProteinPositions,
        proteinPositions_CoveredBy_PeptideSearchStrings  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
    });

    return proteinSequenceWidgetDisplay_Component_Data;
}


////////////////////////////////////////////////////////



/////////

//  Modification Mass Info for display


//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

/**
 * All Variable modification masses by protein position
 * 
 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
 */
const _get_variableModificationMasses_All_OnProteinByPosition = function(
    {
        proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    }: {
        proteinSequenceVersionId: number
        projectSearchIds: Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    }) {

	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

	{
		//  Start with Map of Sets to remove duplicates
		const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
			if ( ! dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
				//  No data for projectSearchId so skip to next
				continue; // EARLY CONTINUE
			}

			const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! dynamicModificationsOnProtein ) {
				// No Data for _proteinSequenceVersionId so skip to next
				continue; // EARLY CONTINUE
			}

			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

				const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				let massesAtPosition = modsOnProteinByPosition_Sets.get( position );
				if ( ! massesAtPosition ) {
					massesAtPosition = new Set();
					modsOnProteinByPosition_Sets.set( position, massesAtPosition );
				}
				//  Round mass since Multiple Search
				const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
				massesAtPosition.add( roundedMass );
			}
		}

		//  Sort masses at each position
		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
			const position = modsOnProteinByPositionEntry[ 0 ];
			const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
			const massesAtPositionArray = Array.from( massesAtPositionSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			});
			//  Place the sorted Array in the final output Map
			modsOnProteinByPosition.set( position, massesAtPositionArray );
		}
	}

	return modsOnProteinByPosition;
}

//////////////////////////////////

///   Get Reporter Ion Mass Info


/**
 * 
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ReporterIonMasses_IfNeeded = function({

    searchSubGroups_Root,
    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    searchDataLookupParamsRoot
} : {
    searchSubGroups_Root: SearchSubGroups_Root__DataPageStateManagerEntry
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        let getSearchSubGroupIds = false;
        if ( projectSearchIds.length === 1 && searchSubGroups_Root ) {
            const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( searchSubGroups_ForProjectSearchId ) {
                const searchSubGroups_Array__ = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode();
                if (searchSubGroups_Array__ && searchSubGroups_Array__.length > 0) {
                    getSearchSubGroupIds = true;
                }
            }
        }
        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
        if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

            //  reportedPeptideIds for this proteinSequenceVersionId
            let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

                const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
                const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;
            
                let searchDataLookupParams_For_projectSearchId = undefined;
                for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

                    if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
                        searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
                        break;
                    }
                }
                if ( ! searchDataLookupParams_For_projectSearchId ) {
                    const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const promise = (
                    loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
                        getSearchSubGroupIds,
                        anyReporterIonMassesSelected : true,
                        anyOpenModificationMassesSelected : false,
                        proteinSequenceVersionId : proteinSequenceVersionId,
                        projectSearchId,
                        searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                        loadedDataPerProjectSearchIdHolder
                    })
                );
                if (promise) {
                    promises_LoadData_Array.push(promise);
                }
            }
        }

    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}

//////////////////////////////////

///   Get Open Modification Mass Info


/**
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_OpenModificationMasses_IfNeeded = function({

     getSearchSubGroupIds,
     proteinSequenceVersionId,
     projectSearchIds,
     loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
     loadedDataCommonHolder,
     searchDataLookupParamsRoot
 } : {
    getSearchSubGroupIds : boolean
    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
        if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

            //  reportedPeptideIds for this proteinSequenceVersionId
            let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

                const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
                const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;

                let searchDataLookupParams_For_projectSearchId = undefined;
                for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

                    if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
                        searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
                        break;
                    }
                }
                if ( ! searchDataLookupParams_For_projectSearchId ) {
                    const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const promise = (
                    loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
                        getSearchSubGroupIds,
                        anyReporterIonMassesSelected : false,
                        anyOpenModificationMassesSelected : true,
                        proteinSequenceVersionId : proteinSequenceVersionId,
                        projectSearchId,
                        searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                        loadedDataPerProjectSearchIdHolder
                    })
                );
                if (promise) {
                    promises_LoadData_Array.push(promise);
                }
            }
        }

    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}



/////////////////////////////////

//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>

/**
 * All Static modification masses by protein position
 * 
 * Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  
 * 		 Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >
 * 
 * Match format from loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
 * 
 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
 */
const _get_staticModificationMasses_All_OnProteinByPosition = function(
    {
        proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    }: {
        proteinSequenceVersionId: number
        projectSearchIds: Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    }) : ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM {

	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	// Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet: Set< mass (number)> >
	const modsOnProteinByPosition : ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM = new Map();

	{
		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
			const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
			if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
				//  no data for project search id
				continue;  //  EARLY CONTINUE
			}
			const staticModificationMassesForProteinPositions = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! staticModificationMassesForProteinPositions ) {
				//  no data for proteinSequenceVersionId for project search id
				continue;  //  EARLY CONTINUE
			}

			for ( const mapEntry of staticModificationMassesForProteinPositions.entries() ) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

				const position = mapEntry[ 0 ];
				const dataForPosition = mapEntry[ 1 ];

				let resultDataForPosition: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry = modsOnProteinByPosition.get( position );

				if ( ! resultDataForPosition ) {

					resultDataForPosition = { residue : dataForPosition.residue, massesSet : new Set(), massesArray: undefined };
					modsOnProteinByPosition.set( position, resultDataForPosition );
				}

				//  Copy all masses from entry for project search id to output Set
				//     Round the mass since Multiple Search
				for ( const mass of dataForPosition.massesSet ) {
					const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
					resultDataForPosition.massesSet.add( roundedMass );
				}
			}
			
		}

		//  Sort masses at each position
		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition.entries() ) {
			const position = modsOnProteinByPositionEntry[ 0 ];
			const dataForPosition = modsOnProteinByPositionEntry[ 1 ];
			const massesAtPositionArray = Array.from( dataForPosition.massesSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			});
			//  Place the sorted Array in the final output Map
			dataForPosition.massesArray = massesAtPositionArray;
		}
	}

	return modsOnProteinByPosition;
}

////////////////////////////////////////////
	
//   Modification Mass Rounding to provide some level of commonality between searches

/**
 * 
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({ mass }: { mass: number }) {
	return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
}

	

///////////////////////////////////////////////


class ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions {
    static initialPopulate = initialPopulate
    static compute_searchSubGroup_Ids_Selected = compute_searchSubGroup_Ids_Selected
    static compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected = compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected
    static compute_searchSubGroup_PropValue = compute_searchSubGroup_PropValue
    static compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue = compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    static create_ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData
    static create_ReporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData
    static create_PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData
    static create_ProteinSequenceWidgetDisplay_Component_Data =  create_ProteinSequenceWidgetDisplay_Component_Data
    static load_ReporterIonMasses_IfNeeded = load_ReporterIonMasses_IfNeeded
    static load_OpenModificationMasses_IfNeeded = load_OpenModificationMasses_IfNeeded
}

export {
    ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions,
    ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class // return type
}
