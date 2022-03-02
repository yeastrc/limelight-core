/**
 * proteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.ts
 * 
 * Functions for proteinExperimentPage_SingleProtein_MainContent_Component.tsx
 *
 *  At Bottom of file:  export class ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions {   static initialPopulate = initialPopulate ...  }
 *
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import {reporterIonMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';


import {
    proteinSequenceWidgetDisplay_Component_Data__Build,
    ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM,
    ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry
} from '../../../../common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data__Build';
import {ProteinSequenceWidgetDisplay_Component_Data} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {PeptideSequence_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import {peptideSequence_UserSelections_BuildData_ForReactComponent} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';
import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {userSearchString_LocationsOn_ProteinSequence_Compute} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

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

import {getSequenceCoverageBooleanArray_ForReportedPeptideIds} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds';
import {getSequenceCoverageBooleanArray_NotFiltered} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered';


import {ExperimentConditions_GraphicRepresentation_SelectedCells} from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {limelight__Sort_ArrayOfNumbers_SortArrayInPlace} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";


/**
 * return type of linksToExternalResources
 */
export class ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources {
    NCBI_Blast_URL : string
    PDR_Blast_URL : string
    UniProtKB_Search_URL : string
    NCBI_Search_URL : string
}

//  At Bottom of file:  export class ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions {   static initialPopulate = initialPopulate ...  }

/**
 * 'async'
 */  
const initialPopulate = async function({

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchIds_All,
    projectSearchIds_PossiblyFiltered,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
    modificationMass_UserSelections_StateObject,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
    reporterIonMass_UserSelections_StateObject,
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
    scan_RetentionTime_MZ_UserSelection_StateObject,
    psm_Charge_Filter_UserSelection_StateObject,
    peptideUnique_UserSelection_StateObject,
    peptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject,
    graphicRepresentation_SelectedCells //  may be NOT set ( null or undefined)
} : {
    proteinSequenceVersionId : number,
    proteinSequenceString : string,
    projectSearchIds_All : Array<number>,
    projectSearchIds_PossiblyFiltered : Array<number>,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
    graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells
}  ) :

Promise<{
    linksToExternalResources : ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources,
    protein_fractionCovered_Unfiltered : number,
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
}>
{
    try {
        const modificationMass_UserSelections_ComponentData = await create_ModificationMass_UserSelections_ComponentData({
            modificationMass_UserSelections_StateObject,
            proteinSequenceVersionId,
            projectSearchIds : projectSearchIds_All,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = await create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds : projectSearchIds_All,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        })

        const reporterIons_UserSelections_ComponentData = await create_ReporterIons_UserSelections_ComponentData({

            reporterIonMass_UserSelections_StateObject,
            proteinSequenceVersionId,
            projectSearchIds : projectSearchIds_All,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
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

        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise_result = await getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({
            not_filtered_position_modification_selections : false,
            proteinSequenceVersionId,
            searchSubGroup_Ids_Selected : undefined,
            proteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root,
            proteinPositionFilter_UserSelections_StateObject : undefined
        });

        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;


        const sequenceCoverageBooleanArray_Unfiltered = await getSequenceCoverageBooleanArray_NotFiltered({
            proteinSequenceVersionId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            projectSearchIds : projectSearchIds_All
        });

        let proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data = undefined;

        {
            let proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings;
            if ( proteinPositions_CoveredBy_SearchStrings.length < 1 ) {
                proteinPositions_CoveredBy_SearchStrings = undefined;
            }

            let experimentConditionsSelected : boolean = false;

            if ( graphicRepresentation_SelectedCells &&
                ( graphicRepresentation_SelectedCells.get_selected_ConditionCells_First_ConditionGroup().is_Any_ConditionCell_Selected() ||
                    graphicRepresentation_SelectedCells.get_selected_ConditionCells_OtherThanFirst_ConditionGroup().is_Any_ConditionCell_Selected() ) ) {

                experimentConditionsSelected = true;
            }

            proteinSequenceWidgetDisplay_Component_Data = await create_ProteinSequenceWidgetDisplay_Component_Data({

                proteinSequenceWidget_StateObject,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                proteinSequenceVersionId,
                proteinSequenceString,
                projectSearchIds_All : projectSearchIds_All,
                projectSearchIds_PossiblyFiltered : projectSearchIds_PossiblyFiltered,
                proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
                proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject,
                experimentConditionsSelected
            });
        }

        const linksToExternalResources = await _createProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources({
            proteinSequenceVersionId, proteinSequenceString, projectSearchIds : projectSearchIds_All, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        const protein_fractionCovered_Unfiltered = _computeSequenceCoverageFractionForUnfiltered({ proteinSequenceString, sequenceCoverageBooleanArray_Unfiltered });

        const psmCountForUnfiltered = await _computePsmCountForUnfiltered({
            proteinSequenceVersionId, projectSearchIds : projectSearchIds_All, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        return {
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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}        

///////////////////////////



/**
 * Create links to external resources
 */
const _createProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources = async function({
    
    proteinSequenceVersionId, 
    proteinSequenceString, 
    projectSearchIds, 
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} : {
    proteinSequenceVersionId : number, 
    proteinSequenceString : string, 
    projectSearchIds : Array<number>,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

}) : Promise<ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources> {
    try {
        const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
        const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;

        const proteinNames_URI_Encoded_Set = new Set();

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)

            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "_createProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class(): No value in commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root for projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const get_ProteinInfoHolder_AllForSearch_ReturnPromise_Result = await
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinInfo_For_MainFilters().
            get_ProteinInfoHolder_AllForSearch_ReturnPromise();

            const proteinInfo_For_MainFilters_Holder = get_ProteinInfoHolder_AllForSearch_ReturnPromise_Result.proteinInfo_For_MainFilters_Holder

            const proteinInfo = proteinInfo_For_MainFilters_Holder.get_ProteinInfo_For_ProteinSequenceVersionId( proteinSequenceVersionId );
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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
const _computePsmCountForUnfiltered = async function(
    {
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<number> {
    try {
        let psmCount = 0;

        for ( const projectSearchId of projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId( projectSearchId );
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                //  No entry for this projectSearchId
                continue; // EARLY CONTINUE
            }

            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise();
            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_ReturnPromise_Result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder

            const reportedPeptideIds = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId( proteinSequenceVersionId );
            if ( ! reportedPeptideIds ) {
                //  No entry
                continue; // EARLY CONTINUE
            }

            const get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result =
                await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap_ReturnPromise();

            const numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_ReturnPromise_Result.numPsmsForReportedPeptideIdMap

            for ( const reportedPeptideId of reportedPeptideIds ) {
                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                if ( numPsmsForReportedPeptideId ) {
                    psmCount += numPsmsForReportedPeptideId;
                }
            }
        }

        return psmCount;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

///////////////////////////

/**
 * 
 */
const create_ModificationMass_UserSelections_ComponentData = async function(
    {
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        proteinSequenceVersionId : number,
        projectSearchIds : Array<number>,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : Promise<ModificationMass_UserSelections_ComponentData> {
    try {
        const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({
            modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject,
            proteinSequenceVersionId : proteinSequenceVersionId,
            projectSearchIds : projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_CommonRounding_ReturnNumber
        });

        return modificationMass_UserSelections_ComponentData;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 *
 */
const create_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = async function(
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        projectSearchIds,
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    }) : Promise<ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData> {
    try {
        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result = modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise ) {

            return modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise
        } else if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data ) {
            return Promise.resolve(modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data)
        } else {
            throw Error("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result no promise or data")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
}

/**
 * 
 */
const create_ReporterIons_UserSelections_ComponentData = async function( {

    reporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId,
    projectSearchIds,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId : number,
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

/**
 * 
 */
const create_ProteinSequenceWidgetDisplay_Component_Data = async function({

    proteinSequenceWidget_StateObject,

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchIds_All,
    projectSearchIds_PossiblyFiltered,
    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings,
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    experimentConditionsSelected
} : {
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    proteinSequenceVersionId : number
    proteinSequenceString : string
    projectSearchIds_All : Array<number>
    projectSearchIds_PossiblyFiltered : Array<number>
    proteinCoverageArrayOfBoolean : Array<boolean> //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings : Array<boolean>
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    experimentConditionsSelected : boolean

}) : Promise<ProteinSequenceWidgetDisplay_Component_Data> {
    try {
        let sequenceCoverageBooleanArray_ForReportedPeptideIds : Array<boolean> = null;

        if (
            modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_Modification_Selected()
            || modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
            || modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected()
            || reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected()
            || proteinPositions_CoveredBy_PeptideSearchStrings
            || proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
            || experimentConditionsSelected
        ) {
            //  Populate since have user selection
            sequenceCoverageBooleanArray_ForReportedPeptideIds = await getSequenceCoverageBooleanArray_ForReportedPeptideIds({

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                proteinSequenceVersionId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                projectSearchIds : projectSearchIds_PossiblyFiltered
            });
        }

        //    Modification Mass Info for display

        //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
        const variableModificationMassesForProteinPositions = await _get_variableModificationMasses_All_OnProteinByPosition({
            proteinSequenceVersionId : proteinSequenceVersionId,
            projectSearchIds : projectSearchIds_All,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
        const staticModificationMassesForProteinPositions = await _get_staticModificationMasses_All_OnProteinByPosition({
            proteinSequenceVersionId : proteinSequenceVersionId,
            projectSearchIds : projectSearchIds_All,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
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

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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
        proteinSequenceVersionId, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }: {
        proteinSequenceVersionId: number
        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : Promise<Map<number, Array<number>>> {

    //  Start with Map of Sets to remove duplicates  -  Passed to Processing for Each Search where it is updated
    const modsOnProteinByPosition_Sets: Map<number, Set<number>> = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

    const promises: Array<Promise<void>> = []

    for ( const projectSearchId of projectSearchIds ) {

        const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)

        //  promise is null if no promise
        const promise = _get_variableModificationMasses_All_OnProteinByPosition__LoadDataAndProcess__SingleSearch({
            proteinSequenceVersionId, modsOnProteinByPosition_Sets, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
        })
        if ( promise ) {
            promises.push(promise)
        }
    }

    if ( promises.length === 0 ) {

        //  Processing for Each Search is complete,  Create final result and return it

        const modsOnProteinByPosition =
            _get_variableModificationMasses_All_OnProteinByPosition__Process_AfterAllSearches({modsOnProteinByPosition_Sets})

        //   Returned Promise
        return Promise.resolve(modsOnProteinByPosition);  //  EARLY RETURN  //  Return resolved Promise
    }

    const promises_All = Promise.all(promises);

    //   Returned Promise
    return new Promise<Map<number, Array<number>>>((resolve, reject) => { try {
        promises_All.catch(reason => {reject(reason)})
        promises_All.then(noValue => { try {

            //  Processing for Each Search is complete,  Create final result and return it

            const modsOnProteinByPosition = _get_variableModificationMasses_All_OnProteinByPosition__Process_AfterAllSearches({modsOnProteinByPosition_Sets})

            resolve(modsOnProteinByPosition);  //  resolve

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

/**
 *
 * @param modsOnProteinByPosition_Sets
 * @param commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
 */
const _get_variableModificationMasses_All_OnProteinByPosition__Process_AfterAllSearches = function (
    {
        modsOnProteinByPosition_Sets
    } : {
        modsOnProteinByPosition_Sets: Map<number, Set<number>>
    }) : Map<number, Array<number>> {

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
    const modsOnProteinByPosition: Map<number, Array<number>> = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

    //  Sort masses at each position
    for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
        const position = modsOnProteinByPositionEntry[ 0 ];
        const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
        const massesAtPositionArray = Array.from( massesAtPositionSet );
        limelight__Sort_ArrayOfNumbers_SortArrayInPlace(massesAtPositionArray);
        //  Place the sorted Array in the final output Map
        modsOnProteinByPosition.set( position, massesAtPositionArray );
    }

    return modsOnProteinByPosition;
}

/**
 *
 * @param modsOnProteinByPosition_Sets
 * @param commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
 */
const _get_variableModificationMasses_All_OnProteinByPosition__LoadDataAndProcess__SingleSearch = function (
    {
        proteinSequenceVersionId, modsOnProteinByPosition_Sets, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
    } : {
        proteinSequenceVersionId: number
        modsOnProteinByPosition_Sets: Map<number, Set<number>> // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : Promise<void> {
    const get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result =
        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
        get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters()
            .get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch();

    if ( get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.data ) {
        _get_variableModificationMasses_All_OnProteinByPosition__AfterLoadData__SingleSearch({
            proteinSequenceVersionId,
            modsOnProteinByPosition_Sets,
            variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder:
            get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
        })
        return null;
    } else if ( get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise ) {
        return new Promise<void>((resolve, reject) => {  try {
            get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
            get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result.promise.then(value => { try {
                _get_variableModificationMasses_All_OnProteinByPosition__AfterLoadData__SingleSearch({
                    proteinSequenceVersionId,
                    modsOnProteinByPosition_Sets,
                    variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder:
                    value.variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
                })
                resolve();
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    } else {
        throw Error("get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_LevelHolder_AllForSearch_Result no data or promise")
    }
}

/**
 *
 * @param modsOnProteinByPosition_Sets
 * @param variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
 */
const _get_variableModificationMasses_All_OnProteinByPosition__AfterLoadData__SingleSearch = function (
    {
        proteinSequenceVersionId, modsOnProteinByPosition_Sets, variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
    } : {
        proteinSequenceVersionId: number
        modsOnProteinByPosition_Sets: Map<number, Set<number>> // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.
        variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder
    }
) {

    if ( ! variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Entries() ) {
        //  No data for projectSearchId so skip to next
        return; // EARLY RETURN
    }

    const dynamicModificationsOnProtein =
        variable_Dynamic_Modifications_At_ProteinSequenceVersionId_Level_For_MainFilters_Holder.
        get_Variable_Dynamic_Modifications_At_ProteinSequenceVersionId_For_ProteinSequenceVersionId( proteinSequenceVersionId );

    if ( ! dynamicModificationsOnProtein ) {
        // No Data for _proteinSequenceVersionId so skip to next
        return; // EARLY RETURN
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
const _get_staticModificationMasses_All_OnProteinByPosition = async function(
    {
        proteinSequenceVersionId, projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }: {
        proteinSequenceVersionId: number
        projectSearchIds: Array<number>
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    }) : Promise<ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM> {
    try {
        //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
        // Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet: Set< mass (number)> >
        const modsOnProteinByPosition : ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM = new Map();

        {
            for ( const projectSearchId of projectSearchIds ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);

                const get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder_ReturnPromise_Result =
                    await commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId().
                    get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder__For_ProteinSequenceVersionId_ReturnPromise(proteinSequenceVersionId);

                const staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder =
                    get_StaticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder_ReturnPromise_Result.staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder

                const staticModificationMassesForProteinPositions =
                    staticModifications_OnProteinSequence_For_ProteinSequenceVersionId_Holder.get_StaticModifications_ResiduesPositions_For_ProteinSequenceVersionId(proteinSequenceVersionId)

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
                limelight__Sort_ArrayOfNumbers_SortArrayInPlace(massesAtPositionArray);
                //  Place the sorted Array in the final output Map
                dataForPosition.massesArray = massesAtPositionArray;
            }
        }

        return modsOnProteinByPosition;

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
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


export class ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions { 
    static initialPopulate = initialPopulate
    static create_ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData
    static create_ReporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData
    static create_PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData
    static create_ProteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data
}
