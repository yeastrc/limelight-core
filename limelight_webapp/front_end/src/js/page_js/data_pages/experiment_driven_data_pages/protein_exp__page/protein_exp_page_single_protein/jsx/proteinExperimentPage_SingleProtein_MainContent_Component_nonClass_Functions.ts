/**
 * proteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.ts
 * 
 * Functions for proteinExperimentPage_SingleProtein_MainContent_Component.tsx
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


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
    ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM_Entry
} from '../protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data__Build';
import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import { peptideSequence_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';
import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import { userSearchString_LocationsOn_ProteinSequence_Compute } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

import { modificationMass_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import { getSequenceCoverageBooleanArray_ForReportedPeptideIds } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds';
import { getSequenceCoverageBooleanArray_NotFiltered } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered';



import { ExperimentConditions_GraphicRepresentation_SelectedCells } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections';
import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


/**
 * return type of linksToExternalResources
 */  
class LinksToExternalResources {
    NCBI_Blast_URL : string
    PDR_Blast_URL : string
    UniProtKB_Search_URL : string
    NCBI_Search_URL : string
}

/**
 * 
 */  
const initialPopulate = function({

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchIds_All,
    projectSearchIds_PossiblyFiltered,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    peptideUnique_UserSelection_StateObject,
    peptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject,
    graphicRepresentation_SelectedCells //  may be NOT set ( null or undefined)
} : {
    proteinSequenceVersionId : number,
    proteinSequenceString : string,
    projectSearchIds_All : Array<number>,
    projectSearchIds_PossiblyFiltered : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
    graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells
}  ) :

{
    linksToExternalResources : LinksToExternalResources,
    protein_fractionCovered_Unfiltered : number,
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
}
{    
    const modificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({ 
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds : projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const reporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({

        reporterIonMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchIds : projectSearchIds_All,
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
        projectSearchIds : projectSearchIds_PossiblyFiltered,
        searchSubGroup_Ids_Selected : undefined,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root,
        proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined
    });

    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
    

    const sequenceCoverageBooleanArray_Unfiltered = getSequenceCoverageBooleanArray_NotFiltered({
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
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

        proteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data({

            proteinSequenceWidget_StateObject,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

            proteinSequenceVersionId,
            proteinSequenceString,
            projectSearchIds_All : projectSearchIds_All,
            projectSearchIds_PossiblyFiltered : projectSearchIds_PossiblyFiltered,
            proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
            proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            experimentConditionsSelected
        });
    }

    const linksToExternalResources = _createLinksToExternalResources({ proteinSequenceVersionId, proteinSequenceString, projectSearchIds : projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    const protein_fractionCovered_Unfiltered = _computeSequenceCoverageFractionForUnfiltered({ proteinSequenceString, sequenceCoverageBooleanArray_Unfiltered });
    
    const psmCountForUnfiltered = _computePsmCountForUnfiltered({ proteinSequenceVersionId, projectSearchIds : projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    return {
        linksToExternalResources,
        protein_fractionCovered_Unfiltered,
        psmCountForUnfiltered,
        modificationMass_UserSelections_ComponentData,
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
 * Create links to external resources
 */
const _createLinksToExternalResources = function({ 
    
    proteinSequenceVersionId, 
    proteinSequenceString, 
    projectSearchIds, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    proteinSequenceVersionId : number, 
    proteinSequenceString : string, 
    projectSearchIds : Array<number>, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : LinksToExternalResources {

    const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
    const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
    
    const proteinNames_URI_Encoded_Set = new Set();

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            const msg = "_createLinksToExternalResources(): No value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
        if ( ! proteinInfoMapKeyProteinSequenceVersionId ) {
            const msg = "_createLinksToExternalResources(): No value in loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId() for projectSearchId: " + projectSearchId;
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

    const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({
        modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : projectSearchIds, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber
    });
    
    return modificationMass_UserSelections_ComponentData;
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

    const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({ 

        reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject, 
        projectSearchIds : projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        reporterIonMass_CommonRounding_ReturnNumber // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
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
    projectSearchIds_All,
    projectSearchIds_PossiblyFiltered,
    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    experimentConditionsSelected
} : {
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

    proteinSequenceVersionId : number
    proteinSequenceString : string
    projectSearchIds_All : Array<number>
    projectSearchIds_PossiblyFiltered : Array<number>
    proteinCoverageArrayOfBoolean : Array<boolean> //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings : Array<boolean>
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
    experimentConditionsSelected : boolean

}) : ProteinSequenceWidgetDisplay_Component_Data {



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
        sequenceCoverageBooleanArray_ForReportedPeptideIds = getSequenceCoverageBooleanArray_ForReportedPeptideIds({ 
        
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            projectSearchIds : projectSearchIds_PossiblyFiltered
        });
    }

    //    Modification Mass Info for display

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
    const variableModificationMassesForProteinPositions = _get_variableModificationMasses_All_OnProteinByPosition({ 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : projectSearchIds_All, 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
    const staticModificationMassesForProteinPositions = _get_staticModificationMasses_All_OnProteinByPosition({ 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : projectSearchIds_All, 
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
        proteinSequenceVersionId : number
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
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

    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    searchDataLookupParamsRoot
} : {

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
                        getSearchSubGroupIds : undefined,
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

                                                     proteinSequenceVersionId,
                                                     projectSearchIds,
                                                     loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                                     loadedDataCommonHolder,
                                                     searchDataLookupParamsRoot
                                                 } : {

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
                        getSearchSubGroupIds : undefined,
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
        proteinSequenceVersionId : number
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM {

	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	// Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet: Set< mass (number)> >
	const modsOnProteinByPosition: ProteinSequenceWidgetDisplay_Component_Data__Build__staticModificationMassesForProteinPositions_PARAM = new Map();

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

				let resultDataForPosition = modsOnProteinByPosition.get( position );

				if ( ! resultDataForPosition ) {

					resultDataForPosition = { residue : dataForPosition.residue, massesSet : new Set<number>(), massesArray: undefined };
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


export { 
    initialPopulate, 
    create_ModificationMass_UserSelections_ComponentData, 
    create_ReporterIons_UserSelections_ComponentData, 
    create_PeptideSequence_UserSelections_ComponentData,
    create_ProteinSequenceWidgetDisplay_Component_Data, 
    load_ReporterIonMasses_IfNeeded,
    load_OpenModificationMasses_IfNeeded,
    LinksToExternalResources // return type
}
