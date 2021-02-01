
/**
 * proteinPage_Display_MultipleSearches__SingleProtein_Create_GeneratedReportedPeptideListData.ts
 * 
 * Get Generated Reported Peptide List
 * 
 * Create Generated Reported Peptide String, and combine data per project search id and reported peptide id under them
 * 
 */

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber, modificationMass_CommonRounding_ReturnString
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches, reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from 'page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches';
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";

///////////////////

/**
 * Result from create_GeneratedReportedPeptideListData call
 */
export class Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result {
    peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry>;
    entries_Key_peptideSequenceDisplay : Map<string , CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry>; // AKA peptideItems_Map_Key_peptideSequenceDisplayString : Map<any , CreateReportedPeptideDisplayData_Result_Entry>
    peptideList_Length : number;
    numberOfUniquePeptides : number;
    numberOfPsmIds_NonRedundant_AcrossAllPeptides : number;
}

/**
 * Result from createReportedPeptideDisplayData call
 */
export class CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry {

    peptideSequenceDisplay : string
    peptideUnique : boolean;
    numPsmsTotal : number = 0;  //  Can NOT be summed across all Peptide List entries to get numberOfPsmIds_NonRedundant_AcrossAllPeptides
    psmCountsMap_KeyProjectSearchId : Map<number, number>
    psmCountsMap_Key_SubSearchGroup_Id : Map<number, number>
    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry>>
}

/**
 * Result from createReportedPeptideDisplayData call
 */
export class CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry {

    reportedPeptideId : Readonly<number>

    //  Only 1 of the next 2 is set
    no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
    psmIdsSet : Set<number>

    constructor({ reportedPeptideId, no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId, psmIdsSet } : {
        reportedPeptideId : Readonly<number>
        //  Only 1 of the next 2 is set
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId : Readonly<boolean>
        psmIdsSet : Set<number>
    }) {
        if ( no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ) {
            const msg = "( allPsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ): CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry. "
            console.warn( msg )
            throw Error( msg )
        }
        this.reportedPeptideId = reportedPeptideId
        this.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
        this.psmIdsSet = psmIdsSet
    }
}

/**
 * Create Reported Peptide Data for Display or Download
 * 
 * Reported Peptide List
 * Number of Reported Peptides
 * Number of PSMs total
 */
export const create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein = function(
    {
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        generatedPeptideContents_UserSelections_StateObject,
        proteinSequenceVersionId,  // Not Populated on Peptide Page
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        loadedDataCommonHolder
    } : {
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
        proteinSequenceVersionId : number  // Not Populated on Peptide Page
        projectSearchIds : Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder

} ) : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result {

    const create_GeneratedReportedPeptideListData_Result = new Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result();

    const peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> = new Map();

    let numberOfPsmsForReportedPeptides = 0; // PSM Count Total
    
    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            throw Error( "No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
        }

        //  Map<(reported peptide), Map<(position),Set<(mod mass rounded number)>>
        let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>> = undefined;

        if ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = (
                _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({
                    loadedDataPerProjectSearchIdHolder,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                    proteinSequenceVersionId  // Not Populated on Peptide Page
                })
            );
        }

        //   The static modifications
        let staticModificationsForProjectSearchId_Key_ResidueLetter : Map<string, number> = undefined;

        if ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected() ) {
            staticModificationsForProjectSearchId_Key_ResidueLetter = _get_StaticModifications_ByResidueLetter_ForProjectSearchId({loadedDataPerProjectSearchIdHolder});
        }

        //  Various Maps, key Reported Peptide Id
        // const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId // : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
              of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId =  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.reportedPeptideId
            const psmIds_Include = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
            const psmCount_after_Include_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId
            const psmIds_IncludeSet_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_IncludeSet_Map_Key_SearchSubGroupId

            //  Is this Reported Peptide Unique?
            let peptideUnique = true;
            {
                // proteinSequenceVersionIds array of proteinSequenceVersionIds for this reported peptide id
                const proteinSequenceVersionIds = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId().get( reportedPeptideId );
                if ( ! proteinSequenceVersionIds ) {
                    throw Error( "No proteinSequenceVersionIds for reportedPeptideId: " + reportedPeptideId );
                }
                if ( proteinSequenceVersionIds.length !== 1 ) {
                    peptideUnique = false;
                }
            }

            let numPsms = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

            numberOfPsmsForReportedPeptides += numPsms;

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
            if ( ! peptideId ) {
                throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
            }

            const peptideSequenceString : string = loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } );
            if ( ! peptideSequenceString ) {
                throw Error("_createReportedPeptideDisplayData: No peptideSequenceString for peptideId: " + peptideId + ", for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds );
            }

            let variableModificationsRoundedArray_KeyPosition :  Map<number, Set<number>> = undefined;

            if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId ) {
                variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;
            }

            if ( _anyOpenMods_For_ReportedPeptide({ reportedPeptideId, loadedDataPerProjectSearchIdHolder })
                && ( ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected() )
                    || ( generatedPeptideContents_UserSelections_StateObject && generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) ) {

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods({
                    reportedPeptideId,
                    psmIds_ToProcess : psmIds_Include,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms,
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId: staticModificationsForProjectSearchId_Key_ResidueLetter,
                    loadedDataPerProjectSearchIdHolder,
                    generatedPeptideContents_UserSelections_StateObject,

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });

            } else {
                //  No Open Mods or Not showing Open Mods

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({
                    reportedPeptideId,
                    psmIds_ToAdd : undefined,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms,
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId: staticModificationsForProjectSearchId_Key_ResidueLetter,
                    open_Modification_Rounded : undefined,
                    open_Modification_Rounded_Position : undefined,
                    open_Modification_Rounded_NoPosition : undefined,

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });
            }
        }
    }

    const peptideListResult : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> = [];
    let numberOfUniquePeptides = 0;

    //  Copy to array
    for ( const peptideItemsEntry of peptideItems_Map_Key_peptideSequenceDisplayString.entries() ) {
        const peptideItem = peptideItemsEntry[ 1 ];
        peptideListResult.push( peptideItem );
        if ( peptideItem.peptideUnique ) {
            numberOfUniquePeptides++;
        }
    }

    // Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
    _sortPeptideListOnSortOrder( { peptideList : peptideListResult } );
    
    const numberOfReportedPeptides = peptideListResult.length;

    create_GeneratedReportedPeptideListData_Result.peptideList = peptideListResult;
    create_GeneratedReportedPeptideListData_Result.entries_Key_peptideSequenceDisplay = peptideItems_Map_Key_peptideSequenceDisplayString;
    
    create_GeneratedReportedPeptideListData_Result.peptideList_Length = numberOfReportedPeptides;
    create_GeneratedReportedPeptideListData_Result.numberOfUniquePeptides = numberOfUniquePeptides;
    create_GeneratedReportedPeptideListData_Result.numberOfPsmIds_NonRedundant_AcrossAllPeptides = numberOfPsmsForReportedPeptides;

    return create_GeneratedReportedPeptideListData_Result;
}

/**
 *
 */
const _anyOpenMods_For_ReportedPeptide = function (
    {
        reportedPeptideId,
        loadedDataPerProjectSearchIdHolder
    } : {
        reportedPeptideId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    }) : boolean {

    const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs =
        loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();

    if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
        //  No Open Mods for search
        return false;  // EARLY RETURN
    }
    if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.has( reportedPeptideId ) ) {
        //  No Open Mods for reportedPeptideId
        return false;  // EARLY RETURN
    }
    return true;
}

/**
 *
 */
const _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods = function (
    {
        reportedPeptideId,
        psmIds_ToProcess,
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId,
        psmIds_IncludeSet_Map_Key_SearchSubGroupId,

        peptideSequenceString,
        peptideUnique,
        projectSearchId,
        numPsms,
        variableModificationsRoundedArray_KeyPosition,
        staticModificationsForProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        generatedPeptideContents_UserSelections_StateObject,

        peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
    } : {
        reportedPeptideId : number
        psmIds_ToProcess : ReadonlySet<number>  // Optional

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>
        psmIds_IncludeSet_Map_Key_SearchSubGroupId: ReadonlyMap<number,ReadonlySet<number>>

        peptideSequenceString : string
        peptideUnique : boolean
        projectSearchId : number
        numPsms : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Set<number>>
        staticModificationsForProjectSearchId : Map<string, number>
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject

        peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> //  UPDATED
    }) {

    const psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs =
        loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();


    let subGroupIdMap_Key_PsmId : Map<number, number> = undefined;

    if ( searchSubGroup_Ids_Selected ) {
        if ( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ) {
            const msg = "( searchSubGroup_Ids_Selected ) and ( ! loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId() ): projectSearchId " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }
        subGroupIdMap_Key_PsmId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId().get( reportedPeptideId )
        if ( ! subGroupIdMap_Key_PsmId ) {
            const msg = "( searchSubGroup_Ids_Selected ) and ( ! subGroupIdMap_Key_PsmId ): reportedPeptideId: " + reportedPeptideId + ", projectSearchId " + projectSearchId;
            console.warn( msg )
            throw Error( msg )
        }
    }


    let psmIds_ToProcess_Local = psmIds_ToProcess;
    if ( ! psmIds_ToProcess_Local ) {
        const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
        if ( ! psmIdsForReportedPeptideIdMap ) {
            throw new Error("loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap() not set. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. projectSearchId: " + projectSearchId )
        }
        const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get( reportedPeptideId );
        if ( ! psmIdsForReportedPeptideIdMap ) {
            throw new Error("loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap().get( reportedPeptideId ) not return a value. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            )
        }

        if ( searchSubGroup_Ids_Selected ) {

            const psmIds_ToProcess_Temp = new Set<number>();

            for ( const psmId of psmIdsForReportedPeptideId ) {

                const subGroupId = subGroupIdMap_Key_PsmId.get( psmId );
                if ( ! subGroupId ) {
                    const msg = "( searchSubGroup_Ids_Selected ) and subGroupIdMap_Key_PsmId.get( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }
                if ( searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                    psmIds_ToProcess_Temp.add( psmId );
                }

                psmIds_ToProcess_Local = new Set( psmIds_ToProcess_Temp );
            }
        } else {
            psmIds_ToProcess_Local = new Set( psmIdsForReportedPeptideId );
        }
    }

    const psmOpenModificationMassPerPSM_ForPsmIdMap = psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
    if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap ) {
        throw new Error("loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs().get( reportedPeptideId ) not return a value. _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods. reportedPeptideId: "
            + reportedPeptideId
            + ", projectSearchId: " + projectSearchId
        )
    }


    for ( const psmId of psmIds_ToProcess_Local ) {

        const psmIds_ToAdd = new Set<number>();
        psmIds_ToAdd.add( psmId );

        let psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall : Map<number,number> = undefined;

        if ( searchSubGroup_Ids_Selected ) {
            psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall = new Map<number, number>();

            const subGroupId = subGroupIdMap_Key_PsmId.get( psmId );
            if ( ! subGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) and subGroupIdMap_Key_PsmId.get( psmId ) not return a value: psmId: " + psmId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }
            if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {
                const msg = "( searchSubGroup_Ids_Selected ) and ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ): psmId: " + psmId + ", projectSearchId " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }
            psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall.set( subGroupId, 1 );
        }

        const psmOpenModificationMassForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId );

        if ( ! psmOpenModificationMassForPsmId ) {

            //  NO Open Mods for PSM

            _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({
                reportedPeptideId,
                psmIds_ToAdd,

                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                peptideSequenceString,
                peptideUnique,
                projectSearchId,
                numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                variableModificationsRoundedArray_KeyPosition,
                staticModificationsForProjectSearchId,
                open_Modification_Rounded : undefined,
                open_Modification_Rounded_Position : undefined,
                open_Modification_Rounded_NoPosition : undefined,

                peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
            });

        } else {

            if ( ( ! psmOpenModificationMassForPsmId.positionsMap_KeyPosition )
                || ! generatedPeptideContents_UserSelections_StateObject
                || ( ! generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) {

                //  No Position OR WithLocalization NOT selected

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({
                    reportedPeptideId,
                    psmIds_ToAdd,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                    peptideSequenceString,
                    peptideUnique,
                    projectSearchId,
                    numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                    variableModificationsRoundedArray_KeyPosition,
                    staticModificationsForProjectSearchId,
                    open_Modification_Rounded: undefined,
                    open_Modification_Rounded_Position: undefined,
                    open_Modification_Rounded_NoPosition: psmOpenModificationMassForPsmId.openModificationMass_Rounded.toString(),

                    peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                });

            } else {
                // Process Positions

                for ( const positionMapEntry of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.entries() ) {

                    const positionEntries_AtPosition = positionMapEntry[1];

                    for (const positionEntry of positionEntries_AtPosition) {

                        let open_Modification_Rounded_Position = positionEntry.position;
                        if (positionEntry.isNTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                        } else if (positionEntry.isCTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                        }
                        _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({
                            reportedPeptideId,
                            psmIds_ToAdd,

                            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                            psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                            peptideSequenceString,
                            peptideUnique,
                            projectSearchId,
                            numPsms : psmIds_ToAdd.size, // TODO  Is this right?
                            variableModificationsRoundedArray_KeyPosition,
                            staticModificationsForProjectSearchId,
                            open_Modification_Rounded: psmOpenModificationMassForPsmId.openModificationMass_Rounded,
                            open_Modification_Rounded_Position,
                            open_Modification_Rounded_NoPosition: undefined,

                            peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
                        });
                    }
                }
            }
        }
    }

}

/**
 *
 *
 */
const _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM = function (
    {
        reportedPeptideId,
        psmIds_ToAdd,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId,

        peptideSequenceString,
        peptideUnique,
        projectSearchId,
        numPsms,
        variableModificationsRoundedArray_KeyPosition,
        staticModificationsForProjectSearchId,
        open_Modification_Rounded,
        open_Modification_Rounded_Position,
        open_Modification_Rounded_NoPosition,

        peptideItems_Map_Key_peptideSequenceDisplayString //  UPDATED
    } : {
        reportedPeptideId : number
        psmIds_ToAdd : Set<number>  // Optional

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>

        peptideSequenceString : string
        peptideUnique : boolean
        projectSearchId : number
        numPsms : number                //  Ignored if psmIds_ToAdd provided
        variableModificationsRoundedArray_KeyPosition: Map<number, Set<number>>
        staticModificationsForProjectSearchId : Map<string, number>
        open_Modification_Rounded : number
        open_Modification_Rounded_Position : number
        open_Modification_Rounded_NoPosition : string

        peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> //  UPDATED
    }) {

    if ( searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined ) {
        const msg = "searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined."
        console.warn( msg )
        throw Error( msg );
    }

    //  First combine all positional mods together into single map since will display all as Variable Mods in '[' ']'

    const modifications_combine_temp : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();

    if ( variableModificationsRoundedArray_KeyPosition ) {
        for ( const entry of variableModificationsRoundedArray_KeyPosition.entries() ) {
            const position : number = entry[ 0 ];
            const massesNumber : Set<number> = entry[ 1 ];

            let modifications_combine_temp_Entry = modifications_combine_temp.get( position );
            if ( ! modifications_combine_temp_Entry ) {
                modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                modifications_combine_temp.set( position, modifications_combine_temp_Entry );
            }
            for ( const massNumber of massesNumber ) {
                const massString = modificationMass_CommonRounding_ReturnString( massNumber );
                modifications_combine_temp_Entry.push({massNumber, massString})
            }
        }
    }

    if ( staticModificationsForProjectSearchId ) {

        //  Peptide Sequence as Array of characters.  From MDN: .split():  If separator is an empty string, str is converted to an array of characters

        const peptideSequence_AsArray = peptideSequenceString.split("");
        const peptideSequence_Length = peptideSequenceString.length;

        for ( let peptideSequenceIndex = 0; peptideSequenceIndex < peptideSequence_Length; peptideSequenceIndex++ ) {

            const peptideSequencePosition = peptideSequenceIndex + 1; // positions are 1 based (start at 1)

            const peptideSequenceAtIndex = peptideSequence_AsArray[ peptideSequenceIndex ];

            const staticModificationRoundedNumber: number = staticModificationsForProjectSearchId.get( peptideSequenceAtIndex );
            if ( staticModificationRoundedNumber ) {

                let modifications_combine_temp_Entry = modifications_combine_temp.get( peptideSequencePosition );
                if ( ! modifications_combine_temp_Entry ) {
                    modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                    modifications_combine_temp.set( peptideSequencePosition, modifications_combine_temp_Entry );
                }

                const massString = modificationMass_CommonRounding_ReturnString( staticModificationRoundedNumber );
                modifications_combine_temp_Entry.push({massNumber : staticModificationRoundedNumber, massString})
            }
        }
    }

    if ( open_Modification_Rounded !== undefined && open_Modification_Rounded !== null ) {

        let modifications_combine_temp_Entry = modifications_combine_temp.get( open_Modification_Rounded_Position );
        if ( ! modifications_combine_temp_Entry ) {
            modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
            modifications_combine_temp.set( open_Modification_Rounded_Position, modifications_combine_temp_Entry );
        }
        const massString = modificationMass_CommonRounding_ReturnString( open_Modification_Rounded );
        modifications_combine_temp_Entry.push({massNumber : open_Modification_Rounded, massString})
    }

    const variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall : Map<number, Array<string>> = new Map();

    for (const modifications_combine_temp_Entry of modifications_combine_temp.entries()) {
        const modifications_combine_tempKey = modifications_combine_temp_Entry[0];
        const modsRounded_ObjectsArray = modifications_combine_temp_Entry[1];

        modsRounded_ObjectsArray.sort((a, b) => {
            if (a.massNumber < b.massNumber) {
                return -1;
            } else if (a.massNumber > b.massNumber) {
                return 1;
            } else {
                return 0;
            }
        });
        const modsRoundedStringsArray : Array<string> = [];
        for (const modRounded of modsRounded_ObjectsArray) {
            const modRoundedString = modRounded.massString.toString();
            modsRoundedStringsArray.push(modRoundedString);
        }
        variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall.set(modifications_combine_tempKey, modsRoundedStringsArray);
    }



    //   Call external function
    const peptideSequenceDisplay = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
        peptideSequence : peptideSequenceString,
        variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,
        open_Modification_Rounded : undefined,
        open_Modification_Rounded_Position : undefined,
        open_Modification_Rounded_NoPosition,
        staticModificationsRounded_KeyPosition : undefined
    });

    // peptideSequence : string,
    //     variable_Modifications_RoundedArray_KeyPosition : Map<number, Array<string>> //  Map<position, Array<mass rounded as string>> - N and C Terminus positions see const above
    // open_Modifications_RoundedArray_KeyPosition : Map<number, Array<string>> //  Map<position, Array<mass rounded as string>> - N and C Terminus positions see const above
    // open_Modification_NoPosition : string
    // staticModificationsRounded_KeyPosition : Map<number, string> //  Map<position, mass rounded as string>


    let peptideItem : CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry = peptideItems_Map_Key_peptideSequenceDisplayString.get( peptideSequenceDisplay );
    if ( ! peptideItem ) {

        peptideItem = new CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry();
        peptideItem.peptideSequenceDisplay = peptideSequenceDisplay;
        peptideItem.peptideUnique = peptideUnique;
        peptideItem.psmCountsMap_KeyProjectSearchId = new Map();
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = new Map();

        peptideItems_Map_Key_peptideSequenceDisplayString.set( peptideSequenceDisplay, peptideItem );
    }

    if ( numPsms !== undefined ) {
        peptideItem.numPsmsTotal += numPsms;  // TODO  Maybe do something different instead
    }

    {
        if ( ! peptideUnique ) {
            peptideItem.peptideUnique = false;  // Set to false since can no longer be true
        }
    }
    {  //  PSM Count per search
        const psmCountFromMap = peptideItem.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
        if ( psmCountFromMap === undefined ) {
            peptideItem.psmCountsMap_KeyProjectSearchId.set( projectSearchId, numPsms );
        } else {
            const new_psmCountFromMap  = psmCountFromMap + numPsms;
            peptideItem.psmCountsMap_KeyProjectSearchId.set( projectSearchId, new_psmCountFromMap );
        }
    }
    {  //  PSM Count per Search Sub Group
        if ( searchSubGroup_Ids_Selected ) {

            if ( ! psmCount_after_Include_Map_Key_SearchSubGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) AND ( ! psmCount_after_Include_Map_Key_SearchSubGroupId )"
                console.warn( msg )
                throw Error( msg )
            }

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                const psmCount_NO_PsmId_Filtering_For_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId.get( searchSubGroup_Id )
                if ( psmCount_NO_PsmId_Filtering_For_SearchSubGroupId !== undefined ) {

                    if ( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) {
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id = new Map();
                    }

                    const psmCountFromMap = peptideItem.psmCountsMap_Key_SubSearchGroup_Id.get( searchSubGroup_Id );
                    if ( psmCountFromMap === undefined ) {
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id.set( searchSubGroup_Id, psmCount_NO_PsmId_Filtering_For_SearchSubGroupId );
                    } else {
                        const new_psmCountFromMap  = psmCountFromMap + psmCount_NO_PsmId_Filtering_For_SearchSubGroupId;
                        peptideItem.psmCountsMap_Key_SubSearchGroup_Id.set( searchSubGroup_Id, new_psmCountFromMap );
                    }
                }
            }

            if ( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) {
                const msg = "( ! peptideItem.psmCountsMap_Key_SubSearchGroup_Id ) after supposed to populate it inside "
                console.warn( msg )
                throw Error( msg )
            }
        }
    }

    let dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
    if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
        dataPerReportedPeptideId_Map_Key_reportedPeptideId = new Map()
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.set( projectSearchId, dataPerReportedPeptideId_Map_Key_reportedPeptideId );
    }

    let psmIdsSet : Set<number> = undefined
    let no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = false;

    if ( psmIds_ToAdd ) {
        psmIdsSet = new Set( psmIds_ToAdd )
    } else {
        no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = true;
    }

    let dataPerReportedPeptideId = dataPerReportedPeptideId_Map_Key_reportedPeptideId.get( reportedPeptideId );
    if ( ! dataPerReportedPeptideId ) {
        dataPerReportedPeptideId = new CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry({
            reportedPeptideId,
            no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId,
            psmIdsSet
        });
        dataPerReportedPeptideId_Map_Key_reportedPeptideId.set( reportedPeptideId, dataPerReportedPeptideId );
    } else {
        if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {
            throw new Error( "( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId && no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). reportedPeptideId: "
                + reportedPeptideId
                + ", projectSearchId: " + projectSearchId
            );
        }
        if ( psmIds_ToAdd ) {
            for ( const psmId_ToAdd of psmIds_ToAdd ) {
                dataPerReportedPeptideId.psmIdsSet.add( psmId_ToAdd );
            }
        }
    }
}

///////////

/**
 * Sort Peptides Array on PSM Count then Reported Peptide Id
 */
const _sortPeptideListOnSortOrder = function( { peptideList } : { peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> } ) {

    peptideList.sort( function( a, b ) {

        //  Sort on PSM Counts total for entry, Descending
        if ( a.numPsmsTotal > b.numPsmsTotal ) {
            return -1;
        }
        if ( a.numPsmsTotal < b.numPsmsTotal ) {
            return 1;
        }

        //  PSM Counts match so order on peptideSequenceDisplay, Ascending
        if ( a.peptideSequenceDisplay < b.peptideSequenceDisplay ) {
            return -1;
        }
        if ( a.peptideSequenceDisplay > b.peptideSequenceDisplay ) {
            return 1;
        }
        return 0;

    });
}


/////

/**
 * Get Static Modifications (rounded) Number
 * 
 * @returns Map<residue, roundedMass>: subset of staticModificationMassesToFilterOn;
 */	
const _get_StaticModifications_ByResidueLetter_ForProjectSearchId = function({

    loadedDataPerProjectSearchIdHolder 
} : {
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
}) : Map<string, number> {

    const staticMods = loadedDataPerProjectSearchIdHolder.get_staticMods(); // Array [{ String residue, BigDecimal mass }] : [Static Mods]

    const staticModsForSearchMap : Map<string, number> = new Map(); // Map<residue, roundedMass>

    // from staticMods: Build Map<residue, roundedMass>
    for ( const staticMod of staticMods ) {
        const massRounded = modificationMass_CommonRounding_ReturnNumber( staticMod.mass );  // Call external function
        staticModsForSearchMap.set( staticMod.residue, massRounded );
    }

    return staticModsForSearchMap;
}

////////////////////////////////////

/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 * 
 * @returns  Map<(reported peptide), Map<(position),Set<(mod mass rounded numbers)>>
 */	
const _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId = function({
    loadedDataPerProjectSearchIdHolder,
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    proteinSequenceVersionId  // Not Populated on Peptide Page
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    proteinSequenceVersionId : number  // Not Populated on Peptide Page

}) :  Map<number, Map<number, Set<number>>>


{
    const modsRoundedSet_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>> = new Map();

    _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId_SubPart({
        loadedDataPerProjectSearchIdHolder,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,  // Not Populated on Peptide Page
        modsRoundedSet_KeyPosition_KeyReportedPeptideId //  UPDATED in this function
    })

    return modsRoundedSet_KeyPosition_KeyReportedPeptideId;
}


/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 *
 *  @param modsRoundedSet_KeyPosition_KeyReportedPeptideId - UPDATED in this function
 */
const _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId_SubPart = function(
    {
        loadedDataPerProjectSearchIdHolder,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,  // Not Populated on Peptide Page
        modsRoundedSet_KeyPosition_KeyReportedPeptideId //  UPDATED in this function
    } : {
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        proteinSequenceVersionId : number  // Not Populated on Peptide Page

        modsRoundedSet_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>>

    }) :  void {

    if ( ! loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() ) {

        return; //  EARLY RETURN
    }

    const reportedPeptideIdsForDisplay_Set: ReadonlySet<number> = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds();

    if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

        //  Use proteinCoverage_KeyProteinSequenceVersionId since by proteinSequenceVersionId

        const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

        const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (proteinCoverageObject === undefined) {

            return; //  EARLY RETURN
            //  Since Multiple Search, return instead of throw:  throw Error("_getVariableModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }
        const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

        if (proteinCoverageEntries_PerReportedPeptideId_Array === undefined) {

            return; //  EARLY RETURN
        }

        for (const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;

            if (!reportedPeptideIdsForDisplay_Set.has(reportedPeptideId)) {
                // Not for selected reported peptide ids
                continue;  // EARLY CONTINUE
            }

            _process_ForSingleReportedPeptideId({ reportedPeptideId, loadedDataPerProjectSearchIdHolder, modsRoundedSet_KeyPosition_KeyReportedPeptideId });
        }
    } else {

        // NO proteinSequenceVersionId

        for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ) {

            _process_ForSingleReportedPeptideId({ reportedPeptideId, loadedDataPerProjectSearchIdHolder, modsRoundedSet_KeyPosition_KeyReportedPeptideId });
        }
    }
}


const _process_ForSingleReportedPeptideId = function (
    {
        reportedPeptideId,
        loadedDataPerProjectSearchIdHolder,
        modsRoundedSet_KeyPosition_KeyReportedPeptideId
    } : {
        reportedPeptideId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modsRoundedSet_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Set<number>>>
    }
) : void {

    let modsRoundedSet_KeyPosition = modsRoundedSet_KeyPosition_KeyReportedPeptideId.get(reportedPeptideId);
    if (!modsRoundedSet_KeyPosition) {
        modsRoundedSet_KeyPosition = new Map();
        modsRoundedSet_KeyPosition_KeyReportedPeptideId.set(reportedPeptideId, modsRoundedSet_KeyPosition);
    }

    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
    if (dynamicModificationsOnReportedPeptideArray) {

        //  Have Mods for this reportedPeptideId
        for (const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray) {

            //   is_N_Terminal and is_C_Terminal
            const is_N_Terminal = dynamicModificationOnReportedPeptide.is_N_Terminal;
            const is_C_Terminal = dynamicModificationOnReportedPeptide.is_C_Terminal;

            const mass = dynamicModificationOnReportedPeptide.mass;
            let positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

            if ( is_N_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;

            } else if ( is_C_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
            }

            let modsRoundedSet = modsRoundedSet_KeyPosition.get(positionOnReportedPeptide);
            if (!modsRoundedSet) {
                modsRoundedSet = new Set();
                modsRoundedSet_KeyPosition.set(positionOnReportedPeptide, modsRoundedSet);
            }

            const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
            modsRoundedSet.add(massRounded);
        }
    }
}