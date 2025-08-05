/**
 * modPage_Create_GeneratedReportedPeptideEntries_String_Etc.ts
 *
 *
 */

import {
    OpenModPosition_DataType
} from "page_js/data_pages/data_pages__common_data_types_typescript/openModPosition_DataType_Typescript";
import {
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass,
    ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/modViewPage_ComputeData_For_ModMassViz_And_TopLevelTable";
import {
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX,
    reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
} from "page_js/data_pages/reported_peptide__generated_common__across_searches/reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches";
import {
    ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__sub_tables_code/modPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass";
import {
    ModPage_Mod_Unlocalized_StartEnd_ContainerClass
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page__container_classes_js/ModPage_Mod_Unlocalized_StartEnd_ContainerClass";
import {
    limelight__Sort_ArrayOfNumbers_SortArrayInPlace
} from "page_js/common_all_pages/limelight__Sort_ArrayOfNumbers_SortArrayInPlace";
import {
    CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {
    modPage_ModMass_Rounding_UTIL
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/mod_page__js/mod_page_mod_mass_rounding_UTIL/modPage_ModMass_Rounding_UTIL";
import {
    CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {
    ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root";


export class ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters {

    peptideSequence: string
    reportedPeptideId: number
    dataFor_SinglePsm: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_Psm
    data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass

    all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root: ModViewPage_Display_All_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
}

////////  Function Result Classes

export class ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result {
    generatedReportedPeptideString_Result_Entries: Array<ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry>
}

export class ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry {

    readonly peptideDisplayString: string

    readonly openModPositionOverride_ToPassTo_PsmTableCreationCode: OpenModPosition_DataType //  Passed to psmList_Etc_Block_DataTable_ExpandChild_ReactComponent__ReturnsComponent

    readonly modification_ProteinPositions: Set<number>

    readonly unlocalized_Protein_PositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass>

    readonly modification_Residues: Set<string>
}

////////  Function --  MAIN

/**
 *
 * @param commonInputParameters
 */
export const modPage_Create_GeneratedReportedPeptideEntries_String_Etc = function (
    {
        proteinSequenceVersionId,  //  'undefined' when NO Proteins
        /**
         * This is data For Single Mod Mass Single Search or Sub Search Singe PSM Single Protein
         */
        data_ForProtein_ForSinglePsm,  //  'undefined' when NO Proteins

        data_For_ModMass,
        commonInputParameters,
        projectSearchId_ForUseWhereRequire_projectSearchId
    } : {
        proteinSequenceVersionId: number
        projectSearchId_ForUseWhereRequire_projectSearchId: number
        data_ForProtein_ForSinglePsm: ModPage_GetProtein_Positions_Residues_PerPsm_For_SingleModMass_Result_For_SinglePsm_SingleProtein
        data_For_ModMass: ModViewPage_ComputeData_For_ModMassViz_And_TopLevelTable_Result_ForSingle_ModMass
        commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters
    }) : ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result {

    if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected() ) {
        const msg = "Static Mods NOT coded and have ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.generatedPeptideContents_UserSelections_StateObject.getStaticModifications_Selected() )"
        console.warn(msg)
        throw Error(msg)
    }

    const psmTblData = commonInputParameters.dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.psmTblData

    const variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = commonInputParameters.dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
    const openModifications_On_PSM_For_MainFilters_Holder = commonInputParameters.dataFor_SinglePsm.modViewPage_ComputeData_Per_ModMass_And_ProjectSearchId_Result_ForSingle_Psm.openModifications_On_PSM_For_MainFilters_Holder

    const generatedReportedPeptideString_Result_Entries: Array<ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry> = []

    const variable_Modifications_RoundedArray_KeyPosition : Map<number, Array<string>> = new Map() //  Map<position, Array<mass rounded as string>> - N and C Terminus positions see const above

    const modification_ProteinPositions_Set_VariableModificationsOnly: Set<number> = new Set()
    const modification_Residues_Set_VariableModificationsOnly: Set<string> = new Set()

    if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.generatedPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() // 'getVariableModifications_Selected()' Currently always true since NO User input on Mod page to change it
        && variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder ) {

        const variable_Modifications_Rounded_Number_Array_KeyPosition : Map<number, Array<number>> = new Map() //  Map<position, Array<mass rounded as number>> - N and C Terminus positions see const above

        const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( psmTblData.reportedPeptideId )
        if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

            for ( const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                // variable_Dynamic_ModificationsOnReportedPeptide_Entry.modMass_Rounded_ForModPage_Processing

                let variableMod_Position: number

                if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_N_Terminal ) {
                    variableMod_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX
                } else if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.is_C_Terminal ) {
                    variableMod_Position = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX
                } else {
                    variableMod_Position = variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position
                }

                const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.mass )

                let variable_Modifications_RoundedArray = variable_Modifications_Rounded_Number_Array_KeyPosition.get( variableMod_Position )
                if ( ! variable_Modifications_RoundedArray ) {
                    variable_Modifications_RoundedArray = []
                    variable_Modifications_Rounded_Number_Array_KeyPosition.set( variableMod_Position, variable_Modifications_RoundedArray )
                }
                variable_Modifications_RoundedArray.push( modMass_Rounded_ForModPage_Processing )

                if ( data_For_ModMass.modMass === modMass_Rounded_ForModPage_Processing ) {

                    if ( proteinSequenceVersionId ) {

                        //  Save Positions and Residues of this mod and position since this mod mass is same as expanded top level table row

                        //  substring start -1 since position is 1 based
                        const modPosition_PeptideResidue = commonInputParameters.peptideSequence.substring( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position - 1, variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )


                        const proteinCoverage_Entry_Map_Key_ProteinStartPosition = data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId )
                        if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                            throw Error( "data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
                        }
                        for ( const proteinCoverage_Entry of proteinCoverage_Entry_Map_Key_ProteinStartPosition.values() ) {

                            const proteinModPosition = variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position + proteinCoverage_Entry.proteinStartPosition - 1

                            if ( _validate_ModificationPositionRange_OnProtein_Passes_ProteinPositionFilters( {
                                modificationPositionRange_OnProtein_START: proteinModPosition,
                                modificationPositionRange_OnProtein_END: proteinModPosition,
                                proteinCoverage_Entry,
                                proteinSequenceVersionId,
                                commonInputParameters
                            } ) ) {

                                modification_ProteinPositions_Set_VariableModificationsOnly.add( proteinModPosition )
                                modification_Residues_Set_VariableModificationsOnly.add( modPosition_PeptideResidue )  // Add here since ONLY when find Coverage Entry that passes all rules
                            }
                        }

                    } else {
                        //  Save Residues of this mod and position since this mod mass is same as expanded top level table row

                        //  substring start -1 since position is 1 based
                        const modPosition_PeptideResidue = commonInputParameters.peptideSequence.substring( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position - 1, variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId_Entry.position )

                        modification_Residues_Set_VariableModificationsOnly.add( modPosition_PeptideResidue )  // Add here since ONLY when find Coverage Entry that passes all rules
                    }
                }
            }
        }

        //  Make variable_Modifications_RoundedArray_KeyPosition (Masses as Strings) From  variable_Modifications_Rounded_Number_Array_KeyPosition

        for ( const mapEntry of variable_Modifications_Rounded_Number_Array_KeyPosition.entries() ) {

            const position = mapEntry[ 0 ]
            const massNumber_Array = mapEntry[ 1 ]

            limelight__Sort_ArrayOfNumbers_SortArrayInPlace( massNumber_Array )

            const massString_Array: Array<string> = []

            for ( const massNumber of massNumber_Array )  {
                massString_Array.push( massNumber.toString() )
            }

            variable_Modifications_RoundedArray_KeyPosition.set( position, massString_Array )
        }
    }

    //  Start Processing Open Modification Mass if selected for display and search has open mod masses

    let foundOpenMod = false

    if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()  // 'getOpenModifications_Selected()' Currently always true since NO User input on Mod page to change it
        && openModifications_On_PSM_For_MainFilters_Holder ) {

        const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( psmTblData.reportedPeptideId )

        if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {

            const psmOpenModificationMassPerPSM_ForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmTblData.psmId )
            if ( psmOpenModificationMassPerPSM_ForPsmId ) {

                let skip_Entry_Since_ModMassRoundsToZero_AND_SelectionIs_Skip_OpenModMassRoundToZero = false

                if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                    const modMass_Rounded = Math.round( psmOpenModificationMassPerPSM_ForPsmId.openModificationMass )

                    if ( modMass_Rounded === 0 ) {
                        //  Skip any Mod mass that rounds to zero

                        skip_Entry_Since_ModMassRoundsToZero_AND_SelectionIs_Skip_OpenModMassRoundToZero = true
                    }
                }

                if ( ! skip_Entry_Since_ModMassRoundsToZero_AND_SelectionIs_Skip_OpenModMassRoundToZero ) {

                    const modMass_Rounded_ForModPage_Processing = modPage_ModMass_Rounding_UTIL( psmOpenModificationMassPerPSM_ForPsmId.openModificationMass )

                    // if ( data_For_ModMass.modMass === modMass_Rounded_ForModPage_Processing ) {

                    //   Only show the open mods that round to match the expanded mod mass in the top level table

                    foundOpenMod = true

                    if ( ( ! psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition ) || psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition.size === 0 ) {

                        //  NO Open Mod positions

                        const peptideDisplayString = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches( {
                            peptideSequence: commonInputParameters.peptideSequence,
                            variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition,
                            open_Modification_Rounded: undefined,
                            open_Modification_Rounded_Position: undefined,
                            open_Modification_Rounded_NoPosition: modMass_Rounded_ForModPage_Processing.toString(),
                            staticModificationsRounded_KeyPosition: undefined
                        } );

                        const unlocalized_Protein_PositionRanges: Array<ModPage_Mod_Unlocalized_StartEnd_ContainerClass> = []

                        if ( proteinSequenceVersionId ) {

                            if ( data_For_ModMass.modMass === modMass_Rounded_ForModPage_Processing ) {

                                //  Save Positions  of this mod and position since this mod mass is same as expanded top level table row

                                const proteinCoverage_Entry_Map_Key_ProteinStartPosition = data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId )
                                if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                                    throw Error( "data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
                                }
                                for ( const proteinCoverage_Entry of proteinCoverage_Entry_Map_Key_ProteinStartPosition.values() ) {

                                    //  Open Modification is NOT localized (unlocalized) so use the start and end positions of the peptide on the protein

                                    if ( _validate_ModificationPositionRange_OnProtein_Passes_ProteinPositionFilters( {
                                        modificationPositionRange_OnProtein_START: proteinCoverage_Entry.proteinStartPosition,
                                        modificationPositionRange_OnProtein_END: proteinCoverage_Entry.proteinEndPosition,
                                        proteinCoverage_Entry,
                                        proteinSequenceVersionId,
                                        commonInputParameters
                                    } ) ) {

                                        unlocalized_Protein_PositionRanges.push(
                                            new ModPage_Mod_Unlocalized_StartEnd_ContainerClass( {
                                                start: proteinCoverage_Entry.proteinStartPosition,
                                                end: proteinCoverage_Entry.proteinEndPosition
                                            } )
                                        )
                                    }
                                }
                            }
                        }

                        const singleEntry: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry = {
                            peptideDisplayString,
                            openModPositionOverride_ToPassTo_PsmTableCreationCode: undefined,

                            modification_ProteinPositions: modification_ProteinPositions_Set_VariableModificationsOnly,
                            modification_Residues: modification_Residues_Set_VariableModificationsOnly,
                            unlocalized_Protein_PositionRanges
                        }

                        generatedReportedPeptideString_Result_Entries.push( singleEntry )

                    } else {

                        //  YES Open Mod positions

                        for ( const positionsMap_KeyPosition_Value of psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition.values() ) {

                            for ( const positionEntry of positionsMap_KeyPosition_Value ) {

                                let open_Modification_Position_For_GeneratedPeptideString: number
                                let openModPositionOverride_ToPassTo_PsmTableCreationCode: OpenModPosition_DataType

                                if ( positionEntry.isNTerminal ) {

                                    open_Modification_Position_For_GeneratedPeptideString = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_N_TERMINUS_POSITION_INDEX;
                                    openModPositionOverride_ToPassTo_PsmTableCreationCode = 'n'

                                } else if ( positionEntry.isCTerminal ) {

                                    open_Modification_Position_For_GeneratedPeptideString = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches_C_TERMINUS_POSITION_INDEX;
                                    openModPositionOverride_ToPassTo_PsmTableCreationCode = 'c'
                                } else {

                                    open_Modification_Position_For_GeneratedPeptideString = positionEntry.position
                                    openModPositionOverride_ToPassTo_PsmTableCreationCode = positionEntry.position
                                }

                                const peptideDisplayString = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches( {
                                    peptideSequence: commonInputParameters.peptideSequence,
                                    variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition,
                                    open_Modification_Rounded: modMass_Rounded_ForModPage_Processing.toString(),
                                    open_Modification_Rounded_Position: open_Modification_Position_For_GeneratedPeptideString,
                                    open_Modification_Rounded_NoPosition: undefined,
                                    staticModificationsRounded_KeyPosition: undefined
                                } );

                                const modification_ProteinPositions_Set_Open_And_Variable_Modification_forModMass: Set<number> = new Set()
                                const modification_Residues_Set_Open_And_Variable_Modification_forModMass: Set<string> = new Set()

                                //  Copy in Variable Mod Only Values

                                for ( const proteinPosition of modification_ProteinPositions_Set_VariableModificationsOnly ) {
                                    modification_ProteinPositions_Set_Open_And_Variable_Modification_forModMass.add( proteinPosition )
                                }
                                for ( const residue of modification_Residues_Set_VariableModificationsOnly ) {
                                    modification_Residues_Set_Open_And_Variable_Modification_forModMass.add( residue )
                                }

                                let openMod_Position_PassesPositionFilters_When_OpenModMass_Is_ExpandedTopLevelModMass = true

                                if ( data_For_ModMass.modMass === modMass_Rounded_ForModPage_Processing ) {

                                    if ( proteinSequenceVersionId ) {

                                        //  Save Positions and Residues of this mod and position since this mod mass is same as expanded top level table row

                                        //  substring start (position - 1) since position is 1 based
                                        const modPosition_PeptideResidue = commonInputParameters.peptideSequence.substring( positionEntry.position - 1, positionEntry.position )

                                        const proteinCoverage_Entry_Map_Key_ProteinStartPosition = data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId )
                                        if ( ! proteinCoverage_Entry_Map_Key_ProteinStartPosition ) {
                                            throw Error( "data_ForProtein_ForSinglePsm.get_proteinCoverage_Entry_Map_Key_ProteinStartPosition_Map_Key_ReportedPeptideId().get( psmTblData.reportedPeptideId ) returned NOTHING for psmTblData.reportedPeptideId: " + psmTblData.reportedPeptideId )
                                        }
                                        for ( const proteinCoverage_Entry of proteinCoverage_Entry_Map_Key_ProteinStartPosition.values() ) {

                                            const proteinModPosition = positionEntry.position + proteinCoverage_Entry.proteinStartPosition - 1


                                            if ( _validate_ModificationPositionRange_OnProtein_Passes_ProteinPositionFilters( {
                                                modificationPositionRange_OnProtein_START: proteinModPosition,
                                                modificationPositionRange_OnProtein_END: proteinModPosition,
                                                proteinCoverage_Entry,
                                                proteinSequenceVersionId,
                                                commonInputParameters
                                            } ) ) {

                                                modification_ProteinPositions_Set_Open_And_Variable_Modification_forModMass.add( proteinModPosition )
                                                modification_Residues_Set_Open_And_Variable_Modification_forModMass.add( modPosition_PeptideResidue )  // Add here since ONLY when find Coverage Entry that passes all rules

                                            } else {

                                                //  Skip this Open Mod Position
                                                //  since NOT pass Position Filters AND Mod Mass rounds to Mod Mass in Top Level Table this entry is under
                                                openMod_Position_PassesPositionFilters_When_OpenModMass_Is_ExpandedTopLevelModMass = false
                                            }
                                        }
                                    } else {

                                        //  Save Positions and Residues of this mod and position since this mod mass is same as expanded top level table row

                                        //  substring start (position - 1) since position is 1 based
                                        const modPosition_PeptideResidue = commonInputParameters.peptideSequence.substring( positionEntry.position - 1, positionEntry.position )

                                        modification_Residues_Set_Open_And_Variable_Modification_forModMass.add( modPosition_PeptideResidue )  // Add here since ONLY when find Coverage Entry that passes all rules
                                    }
                                }

                                if ( openMod_Position_PassesPositionFilters_When_OpenModMass_Is_ExpandedTopLevelModMass ) {

                                    const singleEntry: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry = {
                                        peptideDisplayString,
                                        openModPositionOverride_ToPassTo_PsmTableCreationCode,

                                        modification_ProteinPositions: modification_ProteinPositions_Set_Open_And_Variable_Modification_forModMass,
                                        modification_Residues: modification_Residues_Set_Open_And_Variable_Modification_forModMass,
                                        unlocalized_Protein_PositionRanges: undefined
                                    }

                                    generatedReportedPeptideString_Result_Entries.push( singleEntry )
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if ( ! foundOpenMod ) {

        //  NO open mod found to be used in peptideDisplayString so generate from only Variable Modifications (Or NO modifications if there are no Variable modifications)

        const peptideDisplayString = reportedPeptideDisplay_CreateCommonDisplayString_AcrossSearches({
            peptideSequence : commonInputParameters.peptideSequence,
            variable_Modifications_RoundedArray_KeyPosition: variable_Modifications_RoundedArray_KeyPosition,
            open_Modification_Rounded : undefined,
            open_Modification_Rounded_Position : undefined,
            open_Modification_Rounded_NoPosition: undefined,
            staticModificationsRounded_KeyPosition : undefined
        });

        const singleEntry: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_Result_SingleEntry = {
            peptideDisplayString: peptideDisplayString,
            openModPositionOverride_ToPassTo_PsmTableCreationCode: undefined,

            modification_ProteinPositions: modification_ProteinPositions_Set_VariableModificationsOnly,
            modification_Residues: modification_Residues_Set_VariableModificationsOnly,
            unlocalized_Protein_PositionRanges: undefined
        }

        generatedReportedPeptideString_Result_Entries.push( singleEntry )
    }

    return {
        generatedReportedPeptideString_Result_Entries
    }
}

/**
 * @returns true if passes filters or no filters
 *
 *  Start and End are same except for Unlocalized Mods
 */
const _validate_ModificationPositionRange_OnProtein_Passes_ProteinPositionFilters = function (
    {
        modificationPositionRange_OnProtein_START,
        modificationPositionRange_OnProtein_END,
        proteinCoverage_Entry,
        proteinSequenceVersionId,
        commonInputParameters
    } : {
        modificationPositionRange_OnProtein_START: number
        modificationPositionRange_OnProtein_END: number
        /**
         * proteinCoverage_Entry is used with proteinPositionFilter_UserSelections_StateObject
         */
        proteinCoverage_Entry: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder__ProteinCoverage_Entry
        proteinSequenceVersionId: number
        commonInputParameters: ModPage_Create_GeneratedReportedPeptideEntries_String_Etc_InputParameters
    }
) : boolean {

    if ( ! commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections()
        && ! commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

        //  NO Filtering so return true

        return true // EARLY RETURN
    }

    if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) {

        let passesAnyFilterSelections = false

        const filterEntries_Entry = commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId.get( proteinSequenceVersionId )

        if ( ! filterEntries_Entry ) {

            //  NO Filter Entries for proteinSequenceVersionId so return false

            return false // EARLY RETURN
        }

        if ( filterEntries_Entry.fullProteinSelected ) {

            passesAnyFilterSelections = true // Since can be anywhere on the protein

        } else if ( filterEntries_Entry.rangeEntries ) {

            for ( const filterEntry of filterEntries_Entry.rangeEntries ) {

                //  x1 <= y2 && y1 <= x2
                if (filterEntry.proteinPosition_Start <= modificationPositionRange_OnProtein_END && modificationPositionRange_OnProtein_START <= filterEntry.proteinPosition_End ) { // Mod entry overlaps select range
                    passesAnyFilterSelections = true;
                    break
                }
            }
        }

        if ( ! passesAnyFilterSelections ) {

            //  NOT Pass ANY Filtering proteinPosition_Of_Modification so return false

            return false // EARLY RETURN
        }
    }


    if ( commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

        let passesAnyFilterSelections = false

        const filterEntries_Entry = commonInputParameters.all_Common_ProjectSearchIdsAll_PageStateObjects_Etc_From_Root.proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()?.entriesMap_Key_proteinSequenceVersionId.get( proteinSequenceVersionId )

        if ( ! filterEntries_Entry ) {

            //  NO Filter Entries for proteinSequenceVersionId so return false

            return false // EARLY RETURN
        }

        if ( filterEntries_Entry.fullProteinSelected ) {

            passesAnyFilterSelections = true // Since can be anywhere on the protein

        } else if ( filterEntries_Entry.rangeEntries ) {

            for ( const filterEntry of filterEntries_Entry.rangeEntries ) {

                //  x1 <= y2 && y1 <= x2
                if (filterEntry.proteinPosition_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= filterEntry.proteinPosition_End ) { // Coverage entry overlaps select range
                    passesAnyFilterSelections = true;
                    break
                }
            }
        }

        if ( ! passesAnyFilterSelections ) {

            //  NOT Pass ANY Filtering proteinPosition_Of_Modification so return false

            return false // EARLY RETURN
        }
    }

    return true
}

