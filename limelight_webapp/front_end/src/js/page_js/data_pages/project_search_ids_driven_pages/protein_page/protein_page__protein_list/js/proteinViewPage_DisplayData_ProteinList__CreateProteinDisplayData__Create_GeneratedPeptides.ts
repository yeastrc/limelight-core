/**
 * proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__NonSubGroup_Part__Create_GeneratedPeptides.ts
 *
 * Create Generated Peptide List for Protein List for Single Search or Multiple Searches ( NOT Single Search Sub Groups )
 */

//  Import Peptide__single_protein_... classes since for reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds which is passed in

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {
    modificationMass_CommonRounding_ReturnNumber,
    modificationMass_CommonRounding_ReturnString
} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {
    create_reportedPeptide_CommonValue_EncodedString,
    reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptide_CommonValue_AcrossSearches";



/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result {
    peptideList : Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>;
    entries_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry>; // AKA peptideItems_Map_Key_peptideSequenceDisplayString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__NonSubGroup_Part__Create_GeneratedPeptides_Result_PeptideList_Entry>
    // numberOfPsmIds_NonRedundant_AcrossAllPeptides : number;
}

/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry {

    reportedPeptide_CommonValue_EncodedString : string

    dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId : Map<number, Map<number, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry>>

    psmCountsMap_Key_SubSearchGroup_Id: Map<number,number> // Only populated when input param 'searchSubGroup_Ids_Selected' is populated

    // numPsmsTotal : number = 0;  //  Can NOT be summed across all Peptide List entries to get numberOfPsmIds_NonRedundant_AcrossAllPeptides
    // psmCountsMap_KeyProjectSearchId : Map<number, number>

}

/**
 * Result from proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides call
 */
export class ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry {

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
            const msg = "( allPsmIds_For_ReportedPeptideId_within_ProjectSearchId && psmIdsSet ): CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_PerReportedPeptideId_Entry. "
            console.warn( msg )
            throw Error( msg )
        }
        this.reportedPeptideId = reportedPeptideId
        this.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId = no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId
        this.psmIdsSet = psmIdsSet
    }
}


/**
 *
 */
export const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides = function (
    {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
        projectSearchIds,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    }: {
        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
        projectSearchIds: Array<number>
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

    }) : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result {


    const peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string, ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> = new Map();

    for ( const projectSearchId of projectSearchIds ) {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId );
        if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId ) {
            throw Error( "No reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for projectSearchId: " + projectSearchId );
        }

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
        if ( ! loadedDataPerProjectSearchIdHolder ) {
            throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
        }

        //  Map<(reported peptide), Map<(position),Array<(mod mass rounded number)>>
        let variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Array<number>>> = undefined;

        if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
            variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId = (
                _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId({
                    loadedDataPerProjectSearchIdHolder,
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                })
            );
        }

        //  reportedPeptideIds filtered if applicable so now create display peptide row objects

        for ( const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId // : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
            of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ) {

            const reportedPeptideId =  reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.reportedPeptideId
            const psmIds_Include = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_Include
            const psmCount_after_Include_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include_Map_Key_SearchSubGroupId
            const psmIds_IncludeSet_Map_Key_SearchSubGroupId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmIds_IncludeSet_Map_Key_SearchSubGroupId

            let numPsms = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId.psmCount_after_Include;

            const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
            if ( ! peptideId ) {
                throw Error("_createReportedPeptideDisplayData: No peptideId for reportedPeptideId: " + reportedPeptideId + ", projectSearchIds: " + projectSearchIds );
            }

            let variableModificationsRoundedArray_KeyPosition :  Map<number, Array<number>> = undefined;

            if ( variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId ) {
                variableModificationsRoundedArray_KeyPosition = variableModificationsRoundedArray_KeyPosition_KeyReportedPeptideId.get( reportedPeptideId ) ;
            }

            const anyOpenMods_For_ReportedPeptide = _anyOpenMods_For_ReportedPeptide({ reportedPeptideId, loadedDataPerProjectSearchIdHolder });

            let generatedReportedPeptide_UserSelected_Add_Variable_Modifications = false;
            if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() ) {
                generatedReportedPeptide_UserSelected_Add_Variable_Modifications = true;
            }

            let generatedReportedPeptide_UserSelected_Add_Open_Modifications = false;
            if ( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject && proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {
                generatedReportedPeptide_UserSelected_Add_Open_Modifications = true;
            }

            if ( anyOpenMods_For_ReportedPeptide ) {

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSMIds_AndOpenMods({

                    reportedPeptideId,
                    psmIds_ToProcess : psmIds_Include,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    loadedDataPerProjectSearchIdHolder,
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });

            } else {
                //  No Open Mods

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    reportedPeptideId,
                    psmIds_ToAdd : undefined,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId,

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    open_Modification_Rounded : undefined,
                    open_Modification_Rounded_Position : undefined,
                    open_Modification_Rounded_NoPosition : undefined,
                    loadedDataPerProjectSearchIdHolder,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });
            }
        }
    }

    const peptideListResult : Array<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> = [];

    //  Copy to array
    for ( const peptideItemsEntry of peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.entries() ) {
        const peptideItem = peptideItemsEntry[ 1 ];
        peptideListResult.push( peptideItem );
    }

    const result = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result();

    result.peptideList = peptideListResult;
    result.entries_Key_reportedPeptide_CommonValue_EncodedString = peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString;

    return result;
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

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
        generatedReportedPeptide_UserSelected_Add_Open_Modifications,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        peptideId,
        projectSearchId,
        variableModificationsRoundedArray_KeyPosition,
        loadedDataPerProjectSearchIdHolder,

        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
    } : {
        reportedPeptideId : number
        psmIds_ToProcess : ReadonlySet<number>  // Optional

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications: boolean  //  True when add Variable Modifications to the Generated Distinct Peptide
        generatedReportedPeptide_UserSelected_Add_Open_Modifications: boolean  //  True when add Open Modifications to the Generated Distinct Peptide

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection

        peptideId : number
        projectSearchId : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Array<number>>
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> //  UPDATED
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

        let psmOpenModificationMassForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId );

        if ( psmOpenModificationMassForPsmId && psmOpenModificationMassForPsmId.openModificationMass_Rounded === 0
            && modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

            //  Open Mod Mass Rounded is Zero and User has selected to Treat Open Mod Mass Zero as Unmodified
            //    So Remove Open Mod Mass from for PSM from Generation of this Generated Reported Peptide for this PSM.

            psmOpenModificationMassForPsmId = null;
        }

        if ( ! psmOpenModificationMassForPsmId ) {

            //  NO Open Mods for PSM

            _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                reportedPeptideId,
                psmIds_ToAdd,

                generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                peptideId,
                projectSearchId,
                variableModificationsRoundedArray_KeyPosition,
                open_Modification_Rounded : undefined,
                open_Modification_Rounded_Position : undefined,
                open_Modification_Rounded_NoPosition : undefined,
                loadedDataPerProjectSearchIdHolder,

                peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
            });

        } else {

            if ( ( ! psmOpenModificationMassForPsmId.positionsMap_KeyPosition )
                || ! proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
                || ( ! proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) ) {

                //  No Position OR WithLocalization NOT selected

                _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                    reportedPeptideId,
                    psmIds_ToAdd,

                    generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                    generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                    peptideId,
                    projectSearchId,
                    variableModificationsRoundedArray_KeyPosition,
                    open_Modification_Rounded: undefined,
                    open_Modification_Rounded_Position: undefined,
                    open_Modification_Rounded_NoPosition: psmOpenModificationMassForPsmId.openModificationMass_Rounded.toString(),
                    loadedDataPerProjectSearchIdHolder,

                    peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
                });

            } else {
                // Process Positions

                for ( const positionMapEntry of psmOpenModificationMassForPsmId.positionsMap_KeyPosition.entries() ) {

                    const positionEntries_AtPosition = positionMapEntry[1];

                    for (const positionEntry of positionEntries_AtPosition) {

                        let open_Modification_Rounded_Position = positionEntry.position;
                        if (positionEntry.isNTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                        } else if (positionEntry.isCTerminal) {
                            open_Modification_Rounded_Position = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                        }
                        _generatedReportedPeptide_Process_Single_ReportedPeptide_And_Possibly_PSM({

                            reportedPeptideId,
                            psmIds_ToAdd,

                            generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
                            generatedReportedPeptide_UserSelected_Add_Open_Modifications,

                            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                            psmCount_after_Include_Map_Key_SearchSubGroupId : psmCount_after_Include_Map_Key_SearchSubGroupId__ForChildFunctionCall,

                            peptideId,
                            projectSearchId,
                            variableModificationsRoundedArray_KeyPosition,
                            open_Modification_Rounded: psmOpenModificationMassForPsmId.openModificationMass_Rounded,
                            open_Modification_Rounded_Position,
                            open_Modification_Rounded_NoPosition: undefined,
                            loadedDataPerProjectSearchIdHolder,

                            peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
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

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications,
        generatedReportedPeptide_UserSelected_Add_Open_Modifications,

        searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId,

        peptideId,
        projectSearchId,
        variableModificationsRoundedArray_KeyPosition,
        open_Modification_Rounded,
        open_Modification_Rounded_Position,
        open_Modification_Rounded_NoPosition,
        loadedDataPerProjectSearchIdHolder,

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString //  UPDATED
    } : {
        reportedPeptideId : number

        psmIds_ToAdd : ReadonlySet<number>  // Optional

        generatedReportedPeptide_UserSelected_Add_Variable_Modifications: boolean  //  True when add Variable Modifications to the Generated Distinct Peptide
        generatedReportedPeptide_UserSelected_Add_Open_Modifications: boolean  //  True when add Open Modifications to the Generated Distinct Peptide

        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        psmCount_after_Include_Map_Key_SearchSubGroupId: ReadonlyMap<number, number>

        peptideId : number
        projectSearchId : number
        variableModificationsRoundedArray_KeyPosition: Map<number, Array<number>>
        open_Modification_Rounded : number
        open_Modification_Rounded_Position : number
        open_Modification_Rounded_NoPosition : string
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString : Map<string , ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry> //  UPDATED

    })  {

    if ( searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined ) {
        const msg = "searchSubGroup_Ids_Selected && psmCount_after_Include_Map_Key_SearchSubGroupId === undefined."
        console.warn( msg )
        throw Error( msg );
    }

    //  First combine all positional mods (Variable and Open) together into single map since will display all as Variable Mods in '[' ']'

    const modifications_combine_temp : Map<number, Array<{ massNumber : number, massString : string }>> = new Map();

    if ( generatedReportedPeptide_UserSelected_Add_Variable_Modifications ) {

        //  Add Variable Mod masses to Modifications for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Variable Modifications"

        if ( variableModificationsRoundedArray_KeyPosition ) {
            for ( const entry of variableModificationsRoundedArray_KeyPosition.entries() ) {
                const position : number = entry[ 0 ];
                const massesNumber : Array<number> = entry[ 1 ];

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
    }

    if ( generatedReportedPeptide_UserSelected_Add_Open_Modifications ) {

        //  Add Open Mod mass to Modifications for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Open Modifications"

        if ( open_Modification_Rounded !== undefined && open_Modification_Rounded !== null ) {

            let modifications_combine_temp_Entry = modifications_combine_temp.get( open_Modification_Rounded_Position );
            if ( ! modifications_combine_temp_Entry ) {
                modifications_combine_temp_Entry = new Array<{massNumber: number; massString: string}>()
                modifications_combine_temp.set( open_Modification_Rounded_Position, modifications_combine_temp_Entry );
            }
            const massString = modificationMass_CommonRounding_ReturnString( open_Modification_Rounded );
            modifications_combine_temp_Entry.push({massNumber : open_Modification_Rounded, massString})
        }
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

    let open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString = undefined;
    if ( generatedReportedPeptide_UserSelected_Add_Open_Modifications ) {

        //  Add Open Mod mass No Position for reportedPeptide_CommonValue_EncodedString SINCE user has selected "Distinct Peptide Includes:" "Open Modifications"

        open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString = open_Modification_Rounded_NoPosition
    }

    //  Create a string that represents the peptide with optionally variable and open mods and possibly others based on user selection

    const reportedPeptide_CommonValue_EncodedString = create_reportedPeptide_CommonValue_EncodedString({

        peptideId,
        variableModifications_Map_KeyPosition: variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall,  //  Variable Mods and Open Mod at Position
        staticModifications_Map_KeyPosition: undefined,
        //  No Open Mod at Position passed in since included with the Variable Modifications
        open_Modification_Rounded: undefined, //  Currently added to variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall
        open_Modification_Rounded_Position: undefined, //  Currently added to variable_Modifications_RoundedArray_KeyPosition_FinalForFunctionCall
        open_Modification_Rounded_NoPosition: open_Modification_Rounded_NoPosition__For_reportedPeptide_CommonValue_EncodedString
    });

    let peptideItem : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry =
        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.get( reportedPeptide_CommonValue_EncodedString );

    if ( ! peptideItem ) {

        peptideItem = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_Entry();
        peptideItem.reportedPeptide_CommonValue_EncodedString = reportedPeptide_CommonValue_EncodedString;
        peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId = new Map();

        peptideItems_Map_Key_reportedPeptide_CommonValue_EncodedString.set( reportedPeptide_CommonValue_EncodedString, peptideItem );
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
        dataPerReportedPeptideId = new ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result_PeptideList_PerReportedPeptideId_Entry({
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

    //   Per Search Sub Group Id (If populated)

    {  //  PSM Count per Search Sub Group
        if ( searchSubGroup_Ids_Selected ) {

            const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
            if ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) {

                const msg = "createProteinDisplayData_SingleSearch_SearchSubGroup(...) ( ! loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map() ). projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }

            const psmCountsMap_Key_SubSearchGroup_Id: Map<number,number> = new Map();

            peptideItem.psmCountsMap_Key_SubSearchGroup_Id = psmCountsMap_Key_SubSearchGroup_Id;

            if ( ! psmCount_after_Include_Map_Key_SearchSubGroupId ) {
                const msg = "( searchSubGroup_Ids_Selected ) AND ( ! psmCount_after_Include_Map_Key_SearchSubGroupId )"
                console.warn( msg )
                throw Error( msg )
            }

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {

                const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get(reportedPeptideId)
                if ( numPsmsFor_SearchSubGroupId ) {

                    const numPsms = numPsmsFor_SearchSubGroupId.get(searchSubGroup_Id);
                    if (numPsms !== undefined && numPsms !== 0) {

                        const psmCount_NO_PsmId_Filtering_For_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId.get(searchSubGroup_Id)
                        if (psmCount_NO_PsmId_Filtering_For_SearchSubGroupId !== undefined) {

                            //  Add numPsms to Per searchSubGroup_Id Map

                            let numPsms_Map_Key_SearchSubGroupId_Entry = psmCountsMap_Key_SubSearchGroup_Id.get(searchSubGroup_Id);
                            if (!numPsms_Map_Key_SearchSubGroupId_Entry) {
                                numPsms_Map_Key_SearchSubGroupId_Entry = 0;  // was undefined since not in map. change to zero so can add to numPsms
                            }
                            const numPsms_Map_Key_SearchSubGroupId_Entry_NewValue = numPsms_Map_Key_SearchSubGroupId_Entry + numPsms;
                            psmCountsMap_Key_SubSearchGroup_Id.set(searchSubGroup_Id, numPsms_Map_Key_SearchSubGroupId_Entry_NewValue);
                        }
                    }
                }
            }
        }
    }
}

////////////////////////////////////

/**
 * Get Variable Modifications (rounded) Strings: By Reported Peptide Id and Position _ For Single Project Search Id
 *
 * @returns  Map<(reported peptide), Map<(position),Array<(mod mass rounded numbers)>>
 */
const _get_Variable_ModificationsRoundedByReportedPeptideIdPosition_ForSingleProjectSearchId = function(
    {
        loadedDataPerProjectSearchIdHolder,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    } : {
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

    }) :  Map<number, Map<number, Array<number>>>
{
    const modsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Array<number>>> = new Map();

    if ( ! loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() ) {

        return; //  EARLY RETURN
    }

    for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() ) {

        _process_VariableModifications_ForSingleReportedPeptideId({ reportedPeptideId, loadedDataPerProjectSearchIdHolder, modsRoundedArray_KeyPosition_KeyReportedPeptideId });
    }

    return modsRoundedArray_KeyPosition_KeyReportedPeptideId;
}

/**
 *
 */
const _process_VariableModifications_ForSingleReportedPeptideId = function (
    {
        reportedPeptideId,
        loadedDataPerProjectSearchIdHolder,
        modsRoundedArray_KeyPosition_KeyReportedPeptideId
    } : {
        reportedPeptideId : number
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        modsRoundedArray_KeyPosition_KeyReportedPeptideId : Map<number, Map<number, Array<number>>>
    }
) : void {

    let modsRoundedArray_KeyPosition = modsRoundedArray_KeyPosition_KeyReportedPeptideId.get(reportedPeptideId);
    if (!modsRoundedArray_KeyPosition) {
        modsRoundedArray_KeyPosition = new Map();
        modsRoundedArray_KeyPosition_KeyReportedPeptideId.set(reportedPeptideId, modsRoundedArray_KeyPosition);
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

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_C_TERMINUS_POSITION_INDEX;

            } else if ( is_C_Terminal ) {

                positionOnReportedPeptide = reportedPeptideDisplay_CommonValue_AcrossSearches_N_TERMINUS_POSITION_INDEX;
            }

            let modsRoundedArray = modsRoundedArray_KeyPosition.get(positionOnReportedPeptide);
            if (!modsRoundedArray) {
                modsRoundedArray = new Array();
                modsRoundedArray_KeyPosition.set(positionOnReportedPeptide, modsRoundedArray);
            }

            const massRounded = modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
            modsRoundedArray.push(massRounded);
        }
    }
}