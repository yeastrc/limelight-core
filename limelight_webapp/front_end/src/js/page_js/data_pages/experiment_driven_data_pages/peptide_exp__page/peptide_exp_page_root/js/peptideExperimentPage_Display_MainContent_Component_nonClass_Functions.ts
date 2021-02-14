/**
 * peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.ts
 * 
 * peptideExperimentPage_Display_MainContent_Component.tsx
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

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import { peptideSequence_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';

import { modificationMass_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {ProteinPositionFilter_UserSelections_ComponentData} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_ComponentData";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
import {proteinPositionFilter_UserSelections_BuildData_ForComponent} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_BuildData_ForComponent";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent";
import {load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {PeptideExperimentPage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/jsx/peptideExperimentPage_Display_MainContent_Component";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

/**
 * 
 */  
const compute_FullPage_Except_ExperimentGraphic = function(
    {
        propsValue,
        projectSearchIds_All,
        projectSearchIds_PossiblyFiltered,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Wrapper
    } : {
        propsValue : PeptideExperimentPage_Display_MainContent_Component_Props_Prop
        projectSearchIds_All : Array<number>,
        projectSearchIds_PossiblyFiltered : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper;
    }  ) :

{
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
    proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData;
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
}
{
    const modificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({
        modificationMass_UserSelections_StateObject,
        projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const reporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({

        reporterIonMass_UserSelections_StateObject,
        projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
        peptideUnique_UserSelection_StateObject
    });

    const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({

        peptideSequence_UserSelections_StateObject
    });

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data = create_ProteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({

        projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
    })

    const proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData = create_ProteinPositionFilter_UserSelections_ComponentData({

        proteinPositionFilter_UserSelections_StateObject_Wrapper, proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
    })



    //  Create initial instance.  Updated instance will be created in peptideSequence_UserSelections.tsx when user changes the input field value

    const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({
        not_filtered_position_modification_selections : false,
        proteinSequenceVersionId : undefined,
        projectSearchIds : projectSearchIds_PossiblyFiltered,
        searchSubGroup_Ids_Selected : undefined,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject : undefined,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root : null,
        proteinPositionFilter_UserSelections_StateObject_Wrapper
    });

    const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds =
        getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

    const psmCountForUnfiltered = _computePsmCountForUnfiltered({ projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    return {
        psmCountForUnfiltered,
        modificationMass_UserSelections_ComponentData,
        reporterIons_UserSelections_ComponentData,
        peptideUnique_UserSelection_ComponentData,
        peptideSequence_UserSelections_ComponentData,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        proteinPositionFilter_UserSelections_ComponentData,
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
    }
}        

/**
 * Compute PSM Count for All Project Search Ids - No Filtering for any user choices
 */
const _computePsmCountForUnfiltered = function({ 

    projectSearchIds_All, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    projectSearchIds_All : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : number {

    let psmCount = 0;

    for ( const projectSearchId of projectSearchIds_All ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            //  No entry for this projectSearchId
            continue; // EARLY CONTINUE
        }

        const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

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
    projectSearchIds_All,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    projectSearchIds_All : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ModificationMass_UserSelections_ComponentData {

    let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

    const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({ 
        modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId : undefined,
        projectSearchIds : projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Param
    });
    
    return modificationMass_UserSelections_ComponentData;
}

/**
 * 
 */
const create_ReporterIons_UserSelections_ComponentData = function( {

    reporterIonMass_UserSelections_StateObject,
    projectSearchIds_All,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
} : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    projectSearchIds_All : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
}) : ReporterIonMass_UserSelections_ComponentData {

    let reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

    const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({ 

        reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject, 
        projectSearchIds : projectSearchIds_All,
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
 *
 */
const create_ProteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent = function(
    {
        projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder
    } : {
        projectSearchIds_All : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

    }) : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data {

    const proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data =
        proteinPositionFilter_UserSelections_Build_ProteinNamesLengths_Data_ForComponent({ projectSearchIds : projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds});

    return proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
}

/**
 *
 */
const create_ProteinPositionFilter_UserSelections_ComponentData = function(
    {
        proteinPositionFilter_UserSelections_StateObject_Wrapper,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder
    } : {
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper,
        proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    }) : ProteinPositionFilter_UserSelections_ComponentData {

    const proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData = proteinPositionFilter_UserSelections_BuildData_ForComponent({

        proteinPositionFilter_UserSelections_StateObject_Wrapper, proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
    })

    return proteinPositionFilter_UserSelections_ComponentData;
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
// const _get_variableModificationMasses_All_OnProteinByPosition = function({ proteinSequenceVersionId, projectSearchIds_All, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }) {
//
// 	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
// 	const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
//
// 	{
// 		//  Start with Map of Sets to remove duplicates
// 		const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.
//
// 		for ( const projectSearchId of projectSearchIds_All ) {
//
// 			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
//
// 			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId: Map<number, Array<{ mass : number, position : number, reportedPeptideId : number }>> =
//                 loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
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

//////////////////////////////////

///   Get Reporter Ion Mass Info


/**
 * 
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ReporterIonMasses_IfNeeded = function({

    getSearchSubGroupIds,
    projectSearchIds_All,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    searchDataLookupParamsRoot
} : {
    getSearchSubGroupIds : boolean
    projectSearchIds_All : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds_All ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

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
                proteinSequenceVersionId : null,
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        );
        if (promise) {
            promises_LoadData_Array.push(promise);
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
     projectSearchIds_All,
     loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
     searchDataLookupParamsRoot
 } : {
    getSearchSubGroupIds : boolean
    projectSearchIds_All : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds_All ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

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
                proteinSequenceVersionId : undefined,
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        );
        if (promise) {
            promises_LoadData_Array.push(promise);
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}


//////////////////////////////////

///   Get Protein Coverage Info


/**
 *
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ProteinCoverage_IfNeeded = function(
    {
        projectSearchIds_All,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
    } : {
        projectSearchIds_All : Array<number>,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,

    }) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds_All ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const promise = load_ProteinCoverage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder( {
            projectSearchId, loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
        } );
        if (promise) {
            promises_LoadData_Array.push(promise);
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}


////////////////////////////////////////////
	
//   Modification Mass Rounding to provide some level of commonality between searches

/**
 * 
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({ mass } : { mass: number }) {
	return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
}

	

///////////////////////////////////////////////


const peptideExperimentPage_Display_MainContent_Component_nonClass_Functions = {
    compute_FullPage_Except_ExperimentGraphic,
    create_ModificationMass_UserSelections_ComponentData,
    create_ReporterIons_UserSelections_ComponentData, 
    create_PeptideSequence_UserSelections_ComponentData,
    create_ProteinPositionFilter_UserSelections_ComponentData,
    load_ReporterIonMasses_IfNeeded,
    load_OpenModificationMasses_IfNeeded,
    load_ProteinCoverage_IfNeeded
}

export { peptideExperimentPage_Display_MainContent_Component_nonClass_Functions }
